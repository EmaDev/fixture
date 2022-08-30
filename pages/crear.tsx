import { NextPage } from 'next';
import React, { useState } from 'react';
import { FixtureCreator } from '../components/creator/FixtureCreator';
import { Layout } from '../components/Layout';
import { CreatorContext, CreatorProvider } from '../context/CreatorContext';

const initialSteps = [
  { title: 'Fase de grupos', active: true },
  { title: 'Octavos de final', active: false },
  { title: 'Cuartos de final', active: false },
  { title: 'Semifinal', active: false },
  { title: 'Final', active: false }
]
const CreateFixturePage: NextPage = () => {

  const [stepActual, setStepActual] = useState(initialSteps);
 
  return (
    <CreatorProvider>
      <Layout>
        <FixtureCreator/>
      </Layout>
    </CreatorProvider>
  )
}

export default CreateFixturePage;
