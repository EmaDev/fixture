import { FixtureState } from "../context/creatorReducer";

export interface FaseInterface {
    title: string;
    id: number;
    groups: Group[];
}

export interface Group {
    id: string;
    title:string;
    matches: Match[];
}
export interface Match {
    id: string;
    local: LocalVisitor;
    visitor: LocalVisitor;
}
export interface LocalVisitor {
    name: Countries;
    goals: number;
}
export type Countries = 
| 'qatar' | 'holanda'| 'senegal'|'ecuador'
| 'inglaterra'|'iran'|'usa'|'gales'
| 'argentina'|'arabia'|'mexico'|'polonia'
| 'francia'|'dinamarca'|'tunez'|'australia'
| 'espana'|'alemania'|'japon'|'costa rica'
|'belgica'| 'canada'|'marruecos'|'croacia'
| 'brasil'|'serbia'|'suiza'|'camerun'
| 'portugal'|'ghana'|'uruguay'|'corea';


export interface FixtureData {
    grupo: string;
    fecha: {
        dia: string; mes: string;
    };
    user:string;
    fixture: FixtureState;
} 