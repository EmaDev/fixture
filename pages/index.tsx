import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { Footer } from '../components/Footer';
import { AboutQatar } from '../components/home/AboutQatar';
import { Counter } from '../components/home/Counter';
import { Header } from '../components/home/Header';
import { Participar } from '../components/home/Participar';
import { Layout } from '../components/Layout';
import { AuthContext } from '../context/authContext';

const Home: NextPage = () => {

  const {isAuthenticated, isLoading} = useContext(AuthContext);
  const router = useRouter();

  useEffect( () => {
    
    if(isAuthenticated && !isLoading) {
       router.push('/home');
    }

  },[isAuthenticated]);

  return (
    <Layout>
      <Header/>
      <Counter/>
      <Participar/>
      <AboutQatar/>
      <Footer/>
    </Layout>
  )
}

export default Home;                                                                                         
