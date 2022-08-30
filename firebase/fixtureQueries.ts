import { getFirestore, doc, getDoc, query, collection, getDocs } from "firebase/firestore";
import { FixtureState } from "../context/creatorReducer";
import { ordernarArray } from "../helpers";
import { app } from './config';
const db = getFirestore(app);


export const getAllFixtures = async () => {

    const q = query(collection(db, "fixtures", "fixture-cer8v1re8v15", "jugadas"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        console.log(doc.data());
    });

};

export const getFaseDeGrupos = async (fixtureId: string) => {

    const docRef = doc(db, "fixtures", fixtureId, "jugadas", "fase-grupos");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        //return docSnap.data();
        const data = Object.values(docSnap.data());
        return ordernarArray(data, 'id');
    } else {
        console.log("No such document!");
        return [];
    }
}

export const getOctavosDeFinal = async (fixtureId: string) => {

    const docRef = doc(db, "fixtures", fixtureId, "jugadas", "octavos");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const data = Object.values(docSnap.data());
        return ordernarArray(data, 'id');
    } else {
        console.log("No such document!");
        return [];
    }
}

export const getFixtureByUid = async (uid: string) => {

    const docRef = doc(db, "fixtures", `fixture-user=${uid}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        
        const fixture: any = docSnap.data();
        return {
            ok: true,
            data: fixture,
            msg: 'Ok'
        };
    } 

    return {
        ok: false,
        data: null,
        msg: 'El fixture buscado no existe'
    }

}