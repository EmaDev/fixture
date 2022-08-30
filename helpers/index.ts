import { Group, Match, Countries, FaseInterface } from "../interfaces";

export const ordernarArray = (arr: any[], ordenador: string) => {
    arr.sort((a, b) => {
        return a[ordenador] - b[ordenador];
    });

    return arr;
}

export const idToGroupName = (id: string) => {
    switch (parseInt(id)) {
        case 1: return 'A';
        case 2: return 'B';
        case 3: return 'C';
        case 4: return 'D';
        case 5: return 'E';
        case 6: return 'F';
        case 7: return 'G';
        default: return 'H';
    }
}

export const firstLetterToCapitalize = (str: string) => {

    return str.charAt(0).toUpperCase() + str.slice(1);
}


export const scoreCalculator = (group: Group) => {

    const countries: any = {}

    group.matches.forEach(match => {
        if (!countries[match.local.name]) {
            countries[match.local.name] = 0;
        }
        if (!countries[match.visitor.name]) {
            countries[match.visitor.name] = 0;
        }
    });

    group.matches.forEach(match => {
        if (match.local.goals > match.visitor.goals) {
            countries[match.local.name] += 3;
        } else if (match.local.goals < match.visitor.goals) {
            countries[match.visitor.name] += 3;
        } else {
            countries[match.local.name] += 1;
            countries[match.visitor.name] += 1;
        }
    });

    const arrayCountries = Object.entries(countries);

    arrayCountries.sort((a: any, b: any) => {
        return b[1] - a[1];
    });

    return {
        group: group.id,
        first: arrayCountries[0][0],
        second: arrayCountries[1][0]
    };

}
export const orderMatchesOctavos = (arr: any[]) => {

    const orderArr: any[] = [[0, 1], [2, 3], [4, 5], [6, 7], [3, 2], [1, 0], [5, 4], [7, 6]];

    const matches: Match[] = [];

    orderArr.forEach((order, i) => {
        matches.push({
            id: `octavos-partido${(i + 1)}`,
            local: { name: arr[order[0]].first, goals: 0 },
            visitor: { name: arr[order[1]].second, goals: 0 }
        });
    });

    return matches;
}

export const orderMatchesCuartos = (prevGroup: Group, groupId: number) => {
    const matchesArr: Match[] = [];
    const winners: Countries[] = [];

    prevGroup.matches.forEach(match => {
        if (match.local.goals > match.visitor.goals) {
            winners.push(match.local.name);
        } else {
            winners.push(match.visitor.name);
        }
    });

    for (let i = 0; i < 2; i++) {

        matchesArr.push({
            id: `cuartos-lado${groupId}-partido${i + 1}`,
            local: { goals: 0, name: (i === 0) ? winners[i] : winners[i + 1] },
            visitor: { goals: 0, name: (i === 0) ? winners[i + 1] : winners[i + 2] }
        })
    }

    return {
        id: prevGroup.id,
        title: `Lado ${prevGroup.id} cuartos`,
        matches: matchesArr
    }

}

export const orderMatchesSemis = (prevGroup: Group, groupId: number) => {

    const winners: Countries[] = [];
    prevGroup.matches.forEach(match => {
        if (match.local.goals > match.visitor.goals) {
            winners.push(match.local.name);
        } else {
            winners.push(match.visitor.name);
        }
    });

    return {
        id: prevGroup.id,
        title: `Lado ${prevGroup.id} cuartos`,
        matches: [{
            id: `semifinal-lado${groupId}-partido1`,
            local: { goals: 0, name: winners[0] },
            visitor: { goals: 0, name: winners[1] }
        }]
    }

}

export const orderFinalMatch = (groups: Group[]) => {
    const winners: Countries[] = [];
    const losers: Countries[] = [];

    groups.forEach(group => {
        group.matches.forEach(match => {
            if (match.local.goals > match.visitor.goals) {
                winners.push(match.local.name);
                losers.push(match.visitor.name);
            } else {
                winners.push(match.visitor.name);
                losers.push(match.local.name);
            }
        });
    });

    const final: FaseInterface = {
        id: 5,
        title: 'Final',
        groups: [
            {
                id: '1',
                matches: [{
                    id: 'final-grupo1-partido1',
                    local: { goals: 0, name: winners[0] },
                    visitor: { goals: 0, name: winners[1] }
                }],
                title: 'Final unico grupo'
            },
        ]
    }
    const tercerPuesto: FaseInterface = {
        id: 6,
        title: 'Tercer Pueto',
        groups: [
            {
                id: '1',
                matches: [{
                    id: 'tercerpuesto-grupo1-partido1',
                    local: { goals: 0, name: losers[0] },
                    visitor: { goals: 0, name: losers[1] }
                }],
                title: 'Tercer puesto unico grupo'
            },
        ]
    }

    return {final, tercerPuesto};

}

