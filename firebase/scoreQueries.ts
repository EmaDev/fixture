import { collection, query, where, getDocs, getFirestore, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { FaseInterface } from "../interfaces";
import { app } from './config';
const db = getFirestore(app);

interface CorrectResult {
    local: number;
    visitor: number;
}
interface Match {
    faseId: string;
    groupId: string;
    matchId: string;
}
interface Response {
    ok: boolean;
    msg: string;
}

const puntajes = {
    resultadoExacto: 100,
    resultadoCorrecto: 50,
    golesDeUnEquipoCorrecto: 20,
}
export const setScore = (match: {}) => {
    let usuriosActualizados = 0;
}
export const getAllFixtures = async (match: Match, matchResult: CorrectResult) => {

    const faseBuscada = "fasegrupos";

    const q = query(collection(db, "fixtures"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async(doc) => {
        const fase: FaseInterface = doc.data().fixture[faseBuscada];
        const groupSearched = fase.groups.find(group => group.id == match.groupId);
        if (groupSearched) {
            const matchSearched = groupSearched.matches.find(match => match.id == match.id);
            if (matchSearched) {
                let puntaje = 0;
                if (matchSearched.local.goals == matchResult.local && matchSearched.visitor.goals == matchResult.visitor) {
                    puntaje = puntajes.resultadoExacto;
                } else {
                    if (matchSearched.local.goals == matchResult.local || matchSearched.visitor.goals == matchResult.visitor) {
                        puntaje = puntajes.golesDeUnEquipoCorrecto;
                    }
                    if (matchSearched.local.goals >= matchSearched.visitor.goals && matchResult.local >= matchResult.visitor) {
                        puntaje += puntajes.resultadoCorrecto;
                    } else if (matchSearched.local.goals < matchSearched.visitor.goals && matchResult.local < matchResult.visitor) {
                        puntaje += puntajes.resultadoCorrecto;
                    }
                }
                
                puntaje += doc.data().puntos;

                await setUserScore(doc.id, puntaje,match);
            }
        }
    });
}

export const setUserScore = async (fixtureId: string, score: number, match: Match) => {
    try {
        const history = {
            fecha: new Date,
            match
        }
        const docRef = doc(db, "fixtures", fixtureId);
    
        await updateDoc(docRef, {
            puntos: score,
            historial: arrayUnion(history)
        });
        console.log("fixture: " + fixtureId + " actualizado")
    } catch (error:any) {
        console.log(error.message);
    }
}
