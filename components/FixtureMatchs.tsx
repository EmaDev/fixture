import Image from 'next/image';
import React, { useEffect } from 'react'
import { firstLetterToCapitalize, ordernarArray } from '../helpers';
import { MatchItem } from './Fixture.module';

interface Props {
    matches: Match[];
}
interface Match {
    id: string;
    local: any;
    visitor: any;
}


export const FixtureMatchs = ({ matches }: Props) => {

    const orderedMatches = ordernarArray(matches, 'orden');

    const textInput = (goles:number) => {
        let txt = goles.toString();
        if(goles.toString() === ''){
            txt = '0';
        }
        return txt;
    }
    return (
        <>
            {
                orderedMatches.map(match => (
                    <MatchItem key={match.id}>
                        <div>
                            <Image width={'25px'} height={'25px'}
                                src={
                                    (match.local.name.length > 12) ?
                                        require(`../assets/flags/no-flag.png`)
                                        :
                                        require(`../assets/flags/${match.local.name}.png`)
                                } />
                            <p>{firstLetterToCapitalize(match.local.name)}</p>
                        </div>
                        <input type={'number'} placeholder={textInput(match.local.goals)} disabled />
                        <input type={'number'} placeholder={textInput(match.visitor.goals)} disabled />
                        <div>
                            <Image width={'25px'} height={'25px'}
                                src={
                                    (match.local.name.length > 12) ?
                                        require(`../assets/flags/no-flag.png`)
                                        :
                                        require(`../assets/flags/${match.visitor.name}.png`)
                                } />
                            <p>{firstLetterToCapitalize(match.visitor.name)}</p>
                        </div>
                    </MatchItem>
                ))
            }
        </>
    )
}
