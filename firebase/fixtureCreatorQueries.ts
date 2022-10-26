import { getFirestore, doc, getDoc, setDoc, addDoc, collection, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { FixtureState } from "../context/creatorReducer";
import { app } from './config';
const db = getFirestore(app);

interface Response {
    ok: boolean;
    msg: string;
}

export const createUserFixture = async (fixture: FixtureState, uid: string, groupId: string = '') => {

    const docRef = doc(db, "fixtures", `fixture-user=${uid}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return {
            ok: false,
            msg: 'Este usuario ya tiene un fixture creado'
        }
    }

    try {
        const data = {
            user: uid,
            grupo: groupId ? groupId : null,
            fixture,
            fecha: {
                dia: '',
                mes: ''
            }
        }
        await setDoc(doc(db, "fixtures", `fixture-user=${uid}`), data);

        if(groupId !== ''){
            await addUserOnGroup(groupId, `fixture-user=${uid}`, uid );
        }

        return {
            ok: true,
            msg: 'Fixture creado correctamente'
        }
        
    } catch (error: any) {
        console.log(error.message);
        return {
            ok: false,
            msg: 'Ocurrio un error en la base de datos, consulte con el administrador'
        }
    }

}

const addUserOnGroup = async (groupId: string, fixtureId: string, uid:string) => {

    const docRef = doc(db, "groups", groupId);

    await updateDoc(docRef, {
        users: arrayUnion({ fixtureId, uid })
    });
}

const removeUserOnGroup = async (groupId: string, fixtureId: string, uid: string) => {
    
    const docRef = doc(db, "groups", groupId);

    await updateDoc(docRef, {
        users: arrayRemove({ fixtureId, uid })
    });
}

export const verifyIfGroupExist = async(groupId: string) => {
    const docRef = doc(db, "groups", groupId);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists() ){
        return {
            ok:true
        }
    }
    return {
        ok:false
    }
}

export const createProdeGroup = async (uid: string, groupName: string, description: string) => {
    try {
        const docRef = await addDoc(collection(db, "groups"), {
            creator: uid,
            name: groupName,
            description,
            users: []
        });

        return {
            ok: true,
            groupId: docRef.id
        }

    } catch (error: any) {
        return {
            ok: false,
            msg: error.message
        }
    }
}