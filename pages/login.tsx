import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { AuthContext } from '../context/authContext';

const LoginPage: NextPage = () => {

  const { isAuthenticated, logIn } = useContext(AuthContext);
  const { push } = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      push('/home');
    }
  }, [isAuthenticated]);

  return (
    <Layout>
      <h1>Login</h1>
      <div style={{ display: 'flex', flexDirection: 'column', width: '70%', margin: 'auto' }}>

        <input placeholder='email' />
        <input placeholder='contraseña' />
        <br/>
        <button onClick={logIn}>Acceder</button>
        <br/><br/>
        <Link href={'/register'}>No tenes una cuenta?</Link>
      </div>
    </Layout>
  )
}
export default LoginPage;
