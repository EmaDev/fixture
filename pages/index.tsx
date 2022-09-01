import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { AboutQatar } from '../components/home/AboutQatar';
import { Counter } from '../components/home/Counter';
import { Header } from '../components/home/Header';
import { Participar } from '../components/home/Participar';
import { Layout } from '../components/Layout';
import { AuthContext } from '../context/authContext';

const Home: NextPage = () => {

  const {isAuthenticated} = useContext(AuthContext);
  const router = useRouter();

  useEffect( () => {
    if(isAuthenticated) {
       router.push('/home');
    }
  },[isAuthenticated])
  return (
    <Layout>
      <Header/>
      <Counter/>
      <Participar/>
      <AboutQatar/>
    </Layout>
  )
}

export default Home;                                                                                         
