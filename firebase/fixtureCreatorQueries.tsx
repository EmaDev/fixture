import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { FixtureState } from "../context/creatorReducer";
import { app } from './config';
const db = getFirestore(app);

interface Response {
    ok: boolean;
    msg: string;
}

export const createUserFixture = async (fixture: FixtureState, uid: string, groupId?: string) => {

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
                dia: new Date().getDay,
                mes: new Date().getMonth 
            }
        }

        await setDoc(doc(db, "fixtures", `fixture-user=${uid}`), data);

        return {
            ok: true,
            msg: 'Fixture creado correctamente'
        }
    } catch (error:any) {
        console.log(error.message);
        return {
            ok: false,
            msg: 'Ocurrio un error en la base de datos, consulte con el administrador'
        }
    }

}