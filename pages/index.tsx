import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { Counter } from '../components/home/Counter';
import { Header } from '../components/home/Header';
import { Participar } from '../components/home/Participar';
import { Layout } from '../components/Layout';
import { AuthContext } from '../context/authContext';
//import styles from '../styles/Home.module.css'

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
    </Layout>
  )
}

export default Home;                                                                                         
