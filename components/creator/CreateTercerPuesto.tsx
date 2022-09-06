import React, { useContext, useEffect } from 'react';
import { CreatorContext } from '../../context/CreatorContext';
import { firstLetterToCapitalize, orderFinalMatch } from '../../helpers';
import { CreateFixtureCard } from '../CreateFixtureCard';
import { StepTitle } from '../Fixture.module';

export const CreateTercerPuesto = () => {

    const { fixtureState, setFase, currentStep } = useContext(CreatorContext);

    useEffect(() => {

        const {tercerPuesto} = orderFinalMatch(fixtureState.semifinal.groups);
        setFase('tercerpuesto', tercerPuesto);

    }, []);

    return (
        <>
            <StepTitle>{firstLetterToCapitalize(currentStep)}</StepTitle>
            {
                fixtureState.tercerpuesto.groups.map(group => (
                    <CreateFixtureCard
                        key={group.title + group.id}
                        title={group.title}
                        id={group.id}
                        matches={group.matches}
                    />
                ))
            }
        </>
    )
}
