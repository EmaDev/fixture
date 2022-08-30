export interface Group {
    id: string;
    members?: Country[];
    matches: Match[];
}
interface Country {
    name: string;
    group: string;
    icon: string;
}

interface Match {
    id: number;
    day?: string;
    local: Country;
    visitor: Country;
}

const matchesGrupaA: Match[] = [
    {
        id: 1,
        local: { name: 'Qatar', group: 'A', icon: 'qatar' },
        visitor: { name: 'Ecuador', group: 'A', icon: 'ecuador' },
    },
    {
        id: 2,
        local: { name: 'Senegal', group: 'A', icon: 'senegal' },
        visitor: { name: 'Holanda', group: 'A', icon: 'holanda' }
    },
    {
        id: 3,
        local: { name: 'Qatar', group: 'A', icon: 'qatar' },
        visitor: { name: 'Senegal', group: 'A', icon: 'senegal' },   
    },
    {
        id: 4,
        local: { name: 'Holanda', group: 'A', icon: 'holanda' },
        visitor: { name: 'Ecuador', group: 'A', icon: 'ecuador' },
    },
    {
        id: 5,
       local: { name: 'Holanda', group: 'A', icon: 'holanda' },
       visitor: { name: 'Qatar', group: 'A', icon: 'qatar' },
    },
    {
        id: 6,
        local: { name: 'Ecuador', group: 'A', icon: 'ecuador' },
        visitor: { name: 'Senegal', group: 'A', icon: 'senegal' }
    }
]

const grupoA: Group = {
    id: 'A',
    members: [
        { name: 'Qatar', group: 'A', icon: 'qatar' },
        { name: 'Ecuador', group: 'A', icon: 'ecuador' },
        { name: 'Senegal', group: 'A', icon: 'senegal' },
        { name: 'Holanda', group: 'A', icon: 'holanda' }
    ],
    matches: matchesGrupaA,
}

export const grupos: Group[] = [
    grupoA,
    grupoA,
    grupoA,
    grupoA,
]

