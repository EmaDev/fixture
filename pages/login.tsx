import React, { useContext, useEffect, useState } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Layout } from '../components/Layout';
import { AlternativeSigIn, Button, Container, Form, Input, QuestionLink, Title } from '../components/Register.module';
import { AuthContext } from '../context/authContext';
import googleIcon from '../assets/google.png';
import { useForm } from '../hooks/useForm';
import Swal from 'sweetalert2';
import { loginWithEmailAndPassword, signInWithGoogleAccount } from '../firebase/authQueries';
import { Spinner } from '../components/Spinner';

const LoginPage: NextPage = () => {

  const { isAuthenticated, logIn } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(false); 
  const { push } = useRouter();
  const { formValues, handleInputChange } = useForm({ email: '', pass: '' });
  const { email, pass } = formValues;

  useEffect(() => {
    if (isAuthenticated) {
      push('/home');
    }
  }, [isAuthenticated]);

  const handleLogIn = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    if (email.trim() === '' || pass.trim() === '') {
      setIsLoading(false);
      return Swal.fire({
        icon: 'error',
        text: 'Completa todos los campos'
      })
    }

    const resp = await loginWithEmailAndPassword(email, pass);
    setIsLoading(false);
    if (!resp.ok) {
      return Swal.fire({
        icon: 'error',
        text: resp.msg
      })
    }

    logIn(resp.uid);

  }

  const handleLoginWithProvider = async () => {
    setIsLoading(true);
    const resp = await signInWithGoogleAccount();
    setIsLoading(false);
    if (!resp.ok) {
      return Swal.fire({
        icon: 'error',
        text: resp.msg
      });
    }

    logIn(resp.uid);
  }

  if(isLoading){
    return(<Layout>
      <Spinner/>
    </Layout>)
  }
  return (
    <Layout>
      <Title>Ingresar</Title>
      <Form>
        <Input>
          <label>Email</label>
          <input
            placeholder='ejemplo@gmail.com'
            onChange={handleInputChange}
            name='email'
            value={email}
            type={'email'} />
        </Input>
        <Input>
          <label>Contraseña</label>
          <input
            placeholder='*****'
            onChange={handleInputChange}
            name='pass'
            value={pass}
            type={'password'} />
        </Input>
        <Button onClick={handleLogIn}>Confirmar</Button>
      </Form>

      <AlternativeSigIn>o ingresa con</AlternativeSigIn>
      <Button onClick={handleLoginWithProvider} bg={true} txt={true}>
        <img src={googleIcon.src} />
        <p>Google</p>
      </Button>

      <QuestionLink>No tenes un cuenta?<Link href={'/register'}>Registrate aqui</Link></QuestionLink>
    </Layout>
  )
}
export default LoginPage;
