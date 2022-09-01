import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { app } from './config';
const db = getFirestore(app);
const auth = getAuth(app);

interface UserData {
    uid: string;
    name: string;
    email: string;
    phone: string;
    photoURL: string;
    createdAt: {
        lastLoginAt: string;
        creationTime: string;
    },
    score: {
        total: number;
        history: [];
    }
}

export const detectarCambiosEnLaSesion = async(logIn:any) => {
    
    onAuthStateChanged(auth, (user) => {
        if(user) {
            logIn(user.uid);
        }
    });

}

export const createAnUserWithEmailAndPassword = async (name: string, email: string, password: string) => {

    try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);

        const userData: UserData = {
            uid: user.uid,
            email: (user.email) ? user.email : '',
            name,
            phone: user.phoneNumber || '',
            photoURL: user.photoURL || '',
            createdAt: {
                creationTime: user.metadata.creationTime || '',
                lastLoginAt: user.metadata.lastSignInTime || ''
            },
            score: {
                total: 0,
                history: []
            }
        }

        await setDoc(doc(db, "users", user.uid), userData);
        return {
            ok: true,
            uid: user.uid,
            msg: 'Usuario creado correctamente'
        }
    } catch (error: any) {
        return {
            ok: false,
            msg: error.code,
            uid: ''
        }
    }

}

export const signInWithGoogleAccount = async () => {

    const provider = new GoogleAuthProvider();
    try {
        const { user } = await signInWithPopup(auth, provider);

        const docSnap = await getDoc(doc(db, 'users', user.uid));

        if (docSnap.exists()) {
            return {
                ok: true,
                uid: user.uid,
                msg: 'Ingreso correcto'
            }
        }
        const userData: UserData = {
            uid: user.uid,
            email: (user.email) ? user.email : '',
            name: user.displayName || '',
            phone: user.phoneNumber || '',
            photoURL: user.photoURL || '',
            createdAt: {
                creationTime: user.metadata.creationTime || '',
                lastLoginAt: user.metadata.lastSignInTime || ''
            },
            score: {
                total: 0,
                history: []
            }
        }
        await setDoc(doc(db, "users", user.uid), userData);
        return {
            ok: true,
            uid: user.uid,
            msg: 'Usuario creado correctamente'
        }
    } catch (error: any) {
        return {
            ok: false,
            msg: error.code,
            uid: ''
        }
    }

}

export const loginWithEmailAndPassword = async (email: string, password: string) => {
    try {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        return {
            ok: true,
            msg: 'Ingreso correcto',
            uid: user.uid
        }
    } catch (error: any) {
        return {
            ok: false,
            msg: error.code,
            uid: ''
        }
    }
}

export const logOut = () => {
    signOut(auth).then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
}

export const getUserData = async (uid: string) => {

    try {
        const docSnap = await getDoc(doc(db, 'users', uid));

        if (docSnap.exists()) {
             
            return {
                ok: true,
                data: docSnap.data()
            }
        }else{
            return {
                ok:false,
                msg: 'Uusario no encontrado'
            }
        }

    } catch (error:any) {
        return {
            ok:false,
            msg: error.message
        }
    }
}