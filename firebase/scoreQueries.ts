import { collection, query, where, getDocs, getFirestore, doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
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


const punjesClasicos = {
    exacto: 3,
    ganador: 1
}

export const setScore = async (match: Match, matchResult: CorrectResult) => {

    const q = query(collection(db, "fixtures"));
    let usuariosActualizados = 0;
    let usuariosTotales = 0;

    const querySnapshot = await getDocs(q);
    usuariosTotales = querySnapshot.size;
    querySnapshot.forEach(async (doc) => {
        const fase: FaseInterface = doc.data().fixture[match.faseId];
        const groupSearched = fase.groups.find(group => group.id == match.groupId);
        if (groupSearched) {
            const matchSearched = groupSearched.matches.find(matchDb => matchDb.id == match.matchId);
            if (matchSearched) {
                let puntaje = 0;
                const puntosMatch = {
                    local: (matchSearched.local.goals.toString() === '') ? 0 : parseInt(matchSearched.local.goals.toString()),
                    visitor: (matchSearched.visitor.goals.toString() === '') ? 0 : parseInt(matchSearched.visitor.goals.toString())
                }

                if (puntosMatch.local === matchResult.local && puntosMatch.visitor === matchResult.visitor) {
                    //puntaje += puntajes.resultadoExacto;
                    puntaje += punjesClasicos.exacto;
                } else {
                    /*if (puntosMatch.local == matchResult.local || puntosMatch.visitor == matchResult.visitor) {
                        puntaje += puntajes.golesDeUnEquipoCorrecto;
                    }*/

                    if (puntosMatch.local > puntosMatch.visitor && matchResult.local > matchResult.visitor) {
                        //puntaje += puntajes.resultadoCorrecto;
                        puntaje += punjesClasicos.ganador;
                    } else if (puntosMatch.local < puntosMatch.visitor && matchResult.local < matchResult.visitor) {
                        //puntaje += puntajes.resultadoCorrecto;
                        puntaje += punjesClasicos.ganador;
                    } else if (puntosMatch.local == puntosMatch.visitor && matchResult.local == matchResult.visitor) {
                        //puntaje += puntajes.resultadoCorrecto;
                        puntaje += punjesClasicos.ganador;
                    }
                }

                console.log({
                    parido: matchSearched,
                    puntaje,
                    usuario: doc.data().user,
                    grupo: doc.data().grupo
                });

                const {ok} = await setUserScore(doc.id, doc.data().puntos,puntaje, match, matchResult);
                console.log(ok);
                if(ok){
                    usuariosActualizados += 1;
                }
            }
        }
    });

    return {
        usuariosTotales,
        usuariosActualizados
    }
}

export const setUserScore = async (fixtureId: string, prevScore: number, score: number, match: Match, matchResult:CorrectResult) => {
    try {
        const history = {
            fecha: new Date,
            puntos: score,
            match,
            real: matchResult
        }
        const docRef = doc(db, "fixtures", fixtureId);

        await updateDoc(docRef, {
            puntos:  prevScore + score,
            historial: arrayUnion(history)
        });
        return {
            ok: true
        }
    } catch (error: any) {
        console.log(error.message);
        return {
            ok: false
        }
    }
}
