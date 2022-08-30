import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { AuthContext } from '../context/authContext';

const SignUpPage: NextPage = () => {

  const { isAuthenticated } = useContext(AuthContext);
  const { push } = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      push('/home');
    }
  }, []);

  return (
    <Layout>
      <h1>Sign Up</h1>
      <div style={{ display: 'flex', flexDirection: 'column', width: '70%', margin: 'auto' }}>
      <input placeholder='Nombre' />
        <input placeholder='email' />
        <input placeholder='contraseña' />
        <input placeholder='repite la contraseña' />

        <Link href={'/login'}>Tenes una cuenta?</Link>
      </div>
    </Layout>
  )
}
export default SignUpPage;
