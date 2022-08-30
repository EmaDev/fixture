import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
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
  },[])
  return (
    <Layout>
      <h1>Tu Fixture OnLine</h1>
      <Link href={'/register'}>
        comenzar
      </Link>
    </Layout>
  )
}

export default Home;                                                                                         
