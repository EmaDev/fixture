import React, { useContext, useEffect } from 'react';
import { CreatorContext } from '../../context/CreatorContext';
import { firstLetterToCapitalize, orderMatchesCuartos } from '../../helpers';
import { FaseInterface, Group } from '../../interfaces';
import { CreateFixtureCard } from '../CreateFixtureCard';
import { StepTitle } from '../Fixture.module';

export const CreateCuartos = () => {

    const { currentStep, fixtureState, setFase } = useContext(CreatorContext);

    useEffect(() => {
        if (fixtureState.cuartos.groups.length === 0) {
            setCuartosGroups();
        }
    }, [fixtureState.octavos.groups]);

    const setCuartosGroups = () => {
        const prevGroups = fixtureState.octavos;
        const finalGroups: Group[] = [];

        prevGroups.groups.forEach((group, i) => {
            finalGroups.push(orderMatchesCuartos(group, i + 1));
        });

        const cuartos: FaseInterface = {
            id: 3,
            title: 'Cuartos de final',
            groups: finalGroups
        }

        setFase('cuartos', cuartos);
    }
    return (
        <>
            <StepTitle>{firstLetterToCapitalize(currentStep)}</StepTitle>
            {
                fixtureState.cuartos.groups.map(group => (
                    <CreateFixtureCard
                        key={group.title + group.id}
                        title={group.title}
                        id={group.id}
                        matches={group.matches}
                        lado
                        showTitle
                    />
                ))
            }
        </>
    )
}
