import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useContext } from 'react';
import { useState } from 'react';
import { text } from 'stream/consumers';
import Swal from 'sweetalert2';
import { FixtureCreator } from '../components/creator/FixtureCreator';
import { PrimaryButton } from '../components/Fixture.module';
import { BigButton } from '../components/Global.module';
import { Layout } from '../components/Layout';
import { AuthContext } from '../context/authContext';
import { CreatorContext } from '../context/CreatorContext';
import { Fase } from '../context/creatorReducer';

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
];

const CreateFixturePage: NextPage = () => {

  const { isAuthenticated } = useContext(AuthContext);
  const { setCurrentStep } = useContext(CreatorContext);
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    Swal.fire({
      icon: 'info',
      title: `Ingresa los resultados para cada partido`,
      text: `Al momento de computar los puntos unicamente se tomara en cuenta 
      los partidos de fase de grupos. No es necesario que completes las fases siguientes,
      pero si deseas opcionalemente podes completar las fases que quieras`
    })
  }, []);

  const handleNextStep = () => {
    if (step < 5) {
      setCurrentStep(fasesSteps[step + 1].name);
      setStep(prev => prev + 1);
    } else {
      setStep(prev => prev + 1);
    }
  }

  const goToLastStep = () => {
    setStep(7);
  }

  return (
    <Layout>
      <FixtureCreator actualStep={step} />
      {
        (step < 6) &&
        <>
          <PrimaryButton onClick={handleNextStep}>
            {(step < 5) ? 'Siguiente fase' : 'Procesar'}
          </PrimaryButton>
          <BigButton onClick={goToLastStep}>Terminar</BigButton>
        </>
      }


    </Layout>
  )
}

export default CreateFixturePage;
