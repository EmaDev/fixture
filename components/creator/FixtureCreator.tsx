import React, { useContext, useState } from 'react';
import { CreatorContext } from '../../context/CreatorContext';
import { Fase } from '../../context/creatorReducer';
import { createUserFixture } from '../../firebase/fixtureCreatorQueries';
import { CreateFixtureCard } from '../CreateFixtureCard';
import { PrimaryButton, PrimearyTilte } from '../Fixture.module';
import { CreateCuartos } from './CreateCuartos';
import { CreateFinal } from './CreateFinal';
import { CreateOctavos } from './CreateOctavos';
import { CreateSemis } from './CreateSemis';

interface FaseStep {
    name: Fase;
    step: number;
}
const fasesSteps: FaseStep[] = [
    { name: 'fasegrupos', step: 1 },
    { name: 'octavos', step: 2 },
    { name: 'cuartos', step: 3 },
    { name: 'semifinal', step: 4 },
    { name: 'final', step: 5 },
    { name: 'tercerpuesto', step: 6 }
]
export const FixtureCreator = () => {

    const { fixtureState, setCurrentStep } = useContext(CreatorContext);
    const [step, setStep] = useState<number>(0);

    const handleNextStep = () => {
        setCurrentStep(fasesSteps[step + 1].name);
        setStep(prev => prev + 1);
    }

    const handlePrevStep = () => {
        setCurrentStep(fasesSteps[step - 1].name);
        setStep(prev => prev - 1);
    }
    const handleSaveFixture = async() => {
        const resp = await createUserFixture(fixtureState, 'pepito');
        console.log(resp);
    }

    const showStepActual = () => {
        switch (step) {
            case 1:
                return (<CreateOctavos/>);
            case 2:
                return (<CreateCuartos />);
            case 3:
                return (<CreateSemis />);
            case 4:
                return (<CreateFinal />);
            default:
                return (
                    <div>
                        <h1>Procesar fixture</h1>
                        <button onClick={handleSaveFixture}>procesar</button>
                    </div>
                );
        }
    }

    return (
        <>
            <PrimearyTilte>Crea tu Fixture</PrimearyTilte>
            {(step === 0) ?
                fixtureState.fasegrupos.groups.map(group => (
                    <CreateFixtureCard
                        key={group.title + group.id}
                        title={group.title}
                        id={group.id}
                        matches={group.matches}
                        showTitle={true}
                    />
                ))
                :
                <>
                    {showStepActual()}
                </>
            }
            
            <PrimaryButton onClick={handleNextStep}>Siguiente</PrimaryButton>

        </>
    )
}
