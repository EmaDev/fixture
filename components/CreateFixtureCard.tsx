import React, { FC, useContext, useState } from 'react';
import { CreatorContext } from '../context/CreatorContext';
import { idToGroupName } from '../helpers';
import { Match } from '../interfaces';
import { CreateMatchItem } from './creator/CreateMatchItem';
import { FixtureCardItem, Title } from './Fixture.module';

interface Props {
    title: string;
    id: string;
    matches: Match[];
    lado?:boolean;
    showTitle?:boolean;
}

export const CreateFixtureCard: FC<Props> = ({ id, showTitle, matches, lado }) => {

    const [groupValues, setGroupValues] = useState({id, matches});
    const {setMatch, currentStep} = useContext(CreatorContext);

    const handleChangeGroupValues = (dataMatch:Match) => {
        setMatch(currentStep, id.toString(), dataMatch);  
    }

    return (

        <FixtureCardItem margin={true}>
            {
                (showTitle) ? <Title>{`${ lado ? 'Lado' : 'Grupo'} ${idToGroupName(id.toString())}`}</Title>
                : <></>
            }
            {
                groupValues.matches.map(match => (
                    <CreateMatchItem key={match.id}
                        id={match.id}
                        local={match.local}
                        visitor={match.visitor}
                        setDataMatch={handleChangeGroupValues}
                    />
                ))
            }
        </FixtureCardItem>

    )
}
