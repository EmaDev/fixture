export interface Trivia {
    pregunta: string;
    opciones: OpcionTrivia[];
    correcta?: number;
}
interface OpcionTrivia {
    id: number;
    texto: string;
    correcta: boolean;
}

export const triviaDb: Trivia[] = [
    {
        pregunta: `¿Cuál de estos rivales no jugará con Argentina en este Mundial?`,
        opciones: [
            { id: 1, correcta: true, texto: 'vrverv' }
        ]
    },
    {
        pregunta: '¿Qué día arranca la Copa del Mundo?',
        opciones:[
            {id: 1, texto: '19 de noviembre', correcta: false},
            {id: 2, texto: '20 de noviembre', correcta: false},
            {id: 3, texto: '21 de noviembre', correcta: true},
            {id: 4, texto: '22 de noviembre', correcta: false}
        ]
    },
    {
        pregunta: '¿Cuándo es la final y dónde?',
        opciones:[
            {id: 1, texto: '16 de diciembre en Doha', correcta: false},
            {id: 2, texto: '18 de diciembre en Doha', correcta: false},
            {id: 3, texto: '18 de diciembre en Lusail', correcta: true},
            {id: 4, texto:'19 de diciembre en Lusail', correcta: false}
        ]
    },
    {
        pregunta: '¿En qué grupo está Francia, el campeón defensor?',
        opciones: [
            {id: 1, texto: 'Grupo D', correcta: true},
            {id: 2, texto: 'Grupo A', correcta: false},
            {id: 3, texto: 'Grupo F', correcta: false},
            {id: 4, texto: 'Grupo B', correcta: false}
        ]
    },
    {
        pregunta: '¿Cuál de estos rivales no jugará con Argentina en este Mundial?',
        opciones: [
            {id: 1, texto: 'Arabia Saudita', correcta: false},
            {id: 2, texto: 'Nigeria', correcta: true},
            {id: 3, texto: 'Polonia', correcta: false},
            {id: 4, texto: 'Mexico', correcta: false},
        ]
    },
    {
        pregunta: '¿Ante qué rival debuta la Scaloneta en Qatar 2022?',
        opciones: [
            {id: 1, texto: 'Brasil', correcta: false},
            {id: 2, texto: 'Arabia Saudita', correcta: true},
            {id: 3, texto: 'Polonia', correcta: false},
            {id: 4, texto: 'Mexico', correcta: false},
        ]
    },
    {
        pregunta: '¿Cuál de estos árbitros argentinos estará en el Mundial?',
        opciones:[
            {id: 1, texto: 'Pitana', correcta: false},
            {id:2, texto: 'Rapallini', correcta:true},
            {id:3, texto: 'Loustau', correcta:false},
            {id:4, texto: ' Claudi Basso', correcta:false},
        ]
    },
    {
        pregunta: '¿Cuál de estos rivales de Brasil no se repite respecto al Mundial anterior?',
        opciones: [
            {id:1, texto: 'Serbia', correcta:false},
            {id:2, texto: 'Suiza', correcta:false},
            {id:3, texto: 'Camerun', correcta:true},
        ]
    },
    {
        pregunta: '¿En qué instancia podría darse un Argentina - Brasil si los dos pasan como primeros de grupo?',
        opciones:[
            {id:1, texto: 'Octavos', correcta:false},
            {id:2, texto: 'Cuartos', correcta:false},
            {id:3, texto: 'Semifinales', correcta:true},
            {id:4, texto: 'Final', correcta:false},
        ]
    },
    {
        pregunta: '¿Cuántos finales de Copa del Mundo jugó la Selección ?',
        opciones: [
            {id:1, texto: '2', correcta:false},
            {id:2, texto: '3', correcta:false},
            {id:3, texto: '4', correcta:false},
            {id:4, texto: '5', correcta:true},
        ]
    },
    {
        pregunta: '¿A quién le convirtió un gol Messi en el Mundial 2018? ',
        opciones: [
            {id:1, texto: 'Islandia', correcta:false},
            {id:2, texto: 'Nigeria', correcta:true},
            {id:3, texto: 'Croacia', correcta:false},
            {id:4, texto: 'Francia', correcta:false},
        ]
    },
    {
        pregunta: '¿Quién hizo el gol en la final de la Copa América 2021? ',
        opciones: [
            {id:1, texto: 'Messi', correcta:false},
            {id:2, texto: 'Di Maria', correcta:true},
            {id:3, texto: 'Paredes', correcta:false},
            {id:4, texto: 'De Paul', correcta:false},
        ]
    },{
        pregunta: '¿Cuál de estos técnicos nunca dirigió a la Selección?',
        opciones: [
            {id:1, texto: 'Bauza', correcta:false},
            {id:2, texto: 'Simeone', correcta:true},
            {id:3, texto: 'Martino', correcta:false},
            {id:4, texto: 'Scaloni', correcta:false},
        ]
    },{
        pregunta: '¿Quién hizo el 3-2 de Argentina para ganar México 86? ',
        opciones: [
            {id:1, texto: 'Maradona', correcta:false},
            {id:2, texto: 'Brown', correcta:false},
            {id:3, texto: 'Valdano', correcta:false},
            {id:4, texto: 'Burruchaga', correcta:true},
        ]
    },{
        pregunta: '¿Goleador de la Selección en la final del Mundial 78? ',
        opciones: [
            {id:1, texto: 'Kempes', correcta:true},
            {id:2, texto: 'Bertoni', correcta:false},
            {id:3, texto: 'Luque', correcta:false},
            {id:4, texto: 'Passarella', correcta:false},
        ]
    },{
        pregunta: 'Uno de estos ex jugadores está en el cuerpo técnico de Scaloni',
        opciones: [
            {id:1, texto: 'Juan Pablo Sorin', correcta:false},
            {id:2, texto: 'Julio Cruz', correcta:false},
            {id:3, texto: 'Pablo Aimar', correcta:true},
            {id:4, texto: 'Hernan Crespo', correcta:false},
        ]
    },{
        pregunta: '¿Cuántos países participarán en el Mundial de Qatar?',
        opciones: [
            {id:1, texto: '20', correcta:false},
            {id:2, texto: '24', correcta:false},
            {id:3, texto: '28', correcta:false},
            {id:4, texto: '32', correcta:true},
        ]
    },{
        pregunta: '',
        opciones: [
            {id:1, texto: '', correcta:false},
            {id:2, texto: '', correcta:false},
            {id:3, texto: '', correcta:false},
            {id:4, texto: '', correcta:false},
        ]
    },{
        pregunta: '',
        opciones: [
            {id:1, texto: '', correcta:false},
            {id:2, texto: '', correcta:false},
            {id:3, texto: '', correcta:false},
            {id:4, texto: '', correcta:false},
        ]
    },
]