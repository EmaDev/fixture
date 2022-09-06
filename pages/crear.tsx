import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import { FixtureCreator } from '../components/creator/FixtureCreator';
import { Layout } from '../components/Layout';
import { AuthContext } from '../context/authContext';
import { CreatorProvider } from '../context/CreatorContext';

const initialSteps = [
  { title: 'Fase de grupos', active: true },
  { title: 'Octavos de final', active: false },
  { title: 'Cuartos de final', active: false },
  { title: 'Semifinal', active: false },
  { title: 'Final', active: false }
]
const CreateFixturePage: NextPage = () => {

  const {isAuthenticated} = useContext(AuthContext);
  const { push } = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      push('/login');
    }
  }, [isAuthenticated]);

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
