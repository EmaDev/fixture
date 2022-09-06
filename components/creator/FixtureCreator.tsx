import Image from 'next/image';
import React, { useContext, useState } from 'react';
import {HiLockClosed, HiOutlineCreditCard, } from 'react-icons/hi';
import {ImCreditCard} from 'react-icons/im';
import { AuthContext } from '../../context/authContext';
import { CreatorContext } from '../../context/CreatorContext';
import { Fase } from '../../context/creatorReducer';
import { createUserFixture } from '../../firebase/fixtureCreatorQueries';
import { CreateFixtureCard } from '../CreateFixtureCard';
import { Container, ImageMetodoPago, ModalPagoDescription, ModalProcesarPago, PrimaryButton, PrimearyTilte, TerminosPago } from '../Fixture.module';
import { CreateCuartos } from './CreateCuartos';
import { CreateFinal } from './CreateFinal';
import { CreateOctavos } from './CreateOctavos';
import { CreateSemis } from './CreateSemis';
import { CreateTercerPuesto } from './CreateTercerPuesto';
import { Payment } from './Payment';

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
    const { user } = useContext(AuthContext);
    const [step, setStep] = useState<number>(0);

    const handleNextStep = () => {
        if (step < 5) {
            setCurrentStep(fasesSteps[step + 1].name);
            setStep(prev => prev + 1);
        } else {
            setStep(prev => prev + 1);
        }
    }

    const handleSaveFixture = async () => {
        if (user) {
            const resp = await createUserFixture(fixtureState, user.uid);
            console.log(resp);
        }
    }

    const showStepActual = () => {
        switch (step) {
            case 1:
                return (<CreateOctavos />);
            case 2:
                return (<CreateCuartos />);
            case 3:
                return (<CreateSemis />);
            case 4:
                return (<CreateFinal />);
            case 5:
                return (<CreateTercerPuesto />);
            default:
                return (
                    <Payment/>
                );
        }
    }

    return (
        <Container>
            {(step < 6) && <PrimearyTilte>Crea tu Fixture</PrimearyTilte>}
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

            {
                (step < 6) &&
                <PrimaryButton onClick={handleNextStep}>Siguiente</PrimaryButton>
            }
        
        </Container>
    )
}
