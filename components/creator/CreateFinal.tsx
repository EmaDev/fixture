import React, { useContext, useEffect } from 'react';
import { CreatorContext } from '../../context/CreatorContext';
import { firstLetterToCapitalize, orderFinalMatch } from '../../helpers';
import { CreateFixtureCard } from '../CreateFixtureCard';
import { StepTitle } from '../Fixture.module';

export const CreateFinal = () => {

    const { fixtureState, setFase, currentStep } = useContext(CreatorContext);

    useEffect(() => {

        const {final, tercerPuesto} = orderFinalMatch(fixtureState.semifinal.groups);
        setFase('final', final);
        setFase('tercerpuesto', tercerPuesto);

    }, []);

    return (
        <>
            <StepTitle>{firstLetterToCapitalize(currentStep)}</StepTitle>
            {
                fixtureState.final.groups.map(group => (
                    <CreateFixtureCard
                        key={group.title + group.id}
                        title={group.title}
                        id={group.id}
                        matches={group.matches}
                    />
                ))
            }
            <br />
            <StepTitle>{firstLetterToCapitalize('Tercer puesto')}</StepTitle>
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
