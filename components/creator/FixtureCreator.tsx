import Image from 'next/image';
import React, { useContext, useState } from 'react';
import { CreatorContext } from '../../context/CreatorContext';
import { Fase } from '../../context/creatorReducer';
import { CreateFixtureCard } from '../CreateFixtureCard';
import { Container, ImageMetodoPago, ModalPagoDescription, ModalProcesarPago, PrimaryButton, PrimearyTilte, TerminosPago } from '../Fixture.module';
import { CreateCuartos } from './CreateCuartos';
import { CreateFinal } from './CreateFinal';
import { CreateOctavos } from './CreateOctavos';
import { CreateSemis } from './CreateSemis';
import { CreateTercerPuesto } from './CreateTercerPuesto';
import { ProcesarInscripcion } from './ProcesarInscripcion';

interface FaseStep {
    name: Fase;
    step: number;
}

interface Props {
    actualStep: number;
}

export const FixtureCreator = ({actualStep}:Props) => {

    const { fixtureState } = useContext(CreatorContext);
    
    const showStepActual = () => {
        switch (actualStep) {
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
                    /*<Payment/>*/
                    <ProcesarInscripcion/>
                );
        }
    }

    return (
        <Container>
            {(actualStep < 6) && <PrimearyTilte>Crea tu Fixture</PrimearyTilte>}
            {(actualStep === 0) ?
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
        
        </Container>
    )
}
