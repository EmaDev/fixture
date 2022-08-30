import React, { useContext, useEffect } from 'react';
import { CreatorContext } from '../../context/CreatorContext';
import { firstLetterToCapitalize, orderMatchesSemis } from '../../helpers';
import { FaseInterface, Group } from '../../interfaces';
import { CreateFixtureCard } from '../CreateFixtureCard';
import { StepTitle } from '../Fixture.module';

export const CreateSemis = () => {

    const { fixtureState, currentStep, setFase } = useContext(CreatorContext);
    useEffect(() => {
        setSemisGroups();
    }, []);

    const setSemisGroups = () => {
        const prevGroups = fixtureState.cuartos;
        const finalGroups: Group[] = [];

        prevGroups.groups.forEach((group, i) => {
            finalGroups.push(orderMatchesSemis(group, i + 1));
        });

        const semis: FaseInterface = {
            id: 4,
            title: 'Semifinal',
            groups: finalGroups
        }

        setFase('semifinal', semis);
    }
    return (
        <>
            <StepTitle>{firstLetterToCapitalize(currentStep)}</StepTitle>
            {
                fixtureState.semifinal.groups.map(group => (
                    <CreateFixtureCard
                        key={group.title + group.id}
                        title={group.title}
                        id={group.id}
                        matches={group.matches}
                        showTitle
                        lado
                    />
                ))
            }
        </>
    )
}
