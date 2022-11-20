import { getFirestore, doc, getDoc, query, collection, getDocs, where, limit } from "firebase/firestore";
import { RankingItem } from "../components/others/RankingCard";
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

interface Resp {
    ok:boolean;
    data: RankingItem[];
}
export const getRankingByGroup = async (group: string = '', limite: number = 1000) => {

    try {
        const q = query(collection(db, "fixtures"),where("grupo", "==", group));
        const ranking: any = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async(doc) => {
            const {ok, data}:any = await getUserByUid(doc.data().user);
            if(ok){
                ranking.push({
                    fixtureId: doc.id,
                    userData: {
                        user: data.uid,
                        name: data.name,
                        photoURL: data.photoURL,
                        score:data.score
                    }
                })
            }
            ranking.sort( (a:any, b:any) => {
                return b.userData.score.total - a.userData.score.total
            });
        });
        
        return<Resp> {
            ok: true,
            data: ranking
        }
    } catch (error:any) {
        console.log(error);
        return<Resp> {
            ok:false,
            data: []
        }
    }
} 


const getUserByUid = async(uid:string) => {
    try {
        const docSnap = await getDoc(doc(db, 'users', uid));
        if (docSnap.exists()) {
            return{
                ok: true,
                data: docSnap.data()
            }
        }else{
            return{
                ok:false,
                data: null
            }
        }
    } catch (error) {
        return {
            ok:false,
            data: null
        }
    }
}


export const getGruposCreadosPorUnUsaurio = async(uid: string) => {
    try {
        const q = query(collection(db, "groups"),where("creator", "==", uid));
        const querySnapshot = await getDocs(q);
        const grupos:any = [];
        querySnapshot.forEach( doc => {
            grupos.push({
                nombre: doc.data().name,
                id: doc.id
            })
        });
        return grupos;
    } catch (e:any) {
        console.log(e.message);
    }
}
