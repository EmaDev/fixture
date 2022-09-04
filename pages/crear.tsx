import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { icons } from 'react-icons/lib';
import Swal from 'sweetalert2';
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

  useEffect(() => {
    Swal.fire({
      icon: 'info',
      title: 'Ingresa los resultados de cada partido para cada fase'
    })
  }, []);
  return (
    <CreatorProvider>
      <Layout>
        <FixtureCreator />
      </Layout>
    </CreatorProvider>
  )
}

export default CreateFixturePage;
