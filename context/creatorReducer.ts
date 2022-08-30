import { FaseInterface, Group, Match } from "../interfaces";

export interface FixtureState {
    fasegrupos: FaseInterface;
    octavos: FaseInterface;
    cuartos: FaseInterface;
    semifinal: FaseInterface;
    final: FaseInterface;
    tercerpuesto: FaseInterface;
}
export type Fase =
    "fasegrupos" |
    "octavos" |
    "cuartos" |
    "semifinal" |
    "final" |
    "tercerpuesto";
    
export type FixtureAction =
    | { type: 'setFase', payload: { fase: Fase; data: FaseInterface } }
    | { type: 'setMatch', payload: { fase: Fase; groupId: string; match: Match } }
    ;

export const creatorReducer = (state: FixtureState, action: FixtureAction) => {

    switch (action.type) {
        case 'setFase':
            return {
                ...state,
                [action.payload.fase]: action.payload.data
            };
        case 'setMatch':
            return {
                ...state,
                [action.payload.fase]: {
                    ...state[action.payload.fase],
                    groups: [
                        ...state[action.payload.fase].groups.map(group => group.id ===
                            action.payload.groupId ?
                            {
                                matches: group.matches.map(match => match.id === action.payload.match.id
                                    ? action.payload.match
                                    : match
                                ),
                                id: group.id
                            }
                            : group
                        )
                    ]
                }
            }

        default: return state;
    }
}