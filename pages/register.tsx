import React, { useContext, useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Layout } from '../components/Layout';
import { AuthContext } from '../context/authContext';
import Swal from 'sweetalert2';
import { AlternativeSigIn, Button, Form, Input, QuestionLink, Title } from '../components/Register.module';
import googleIcon from '../assets/google.png';
import { useForm } from '../hooks/useForm';
import { createAnUserWithEmailAndPassword, signInWithGoogleAccount } from '../firebase/authQueries';
import { Spinner } from '../components/Spinner';

const SignUpPage: NextPage = () => {

  const { isAuthenticated, logIn} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { push } = useRouter();

  const { formValues, handleInputChange } = useForm({ name: '', email: '', pass: '', pass2: '' });
  const { name, email, pass, pass2 } = formValues;

  useEffect(() => {
    if (isAuthenticated) {
      push('/home');
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <Layout>
        <div className='spinner'>
          <Spinner />
        </div>
      </Layout>
    )
  }
  const handleRegisterWithEmail = async(e:any) => {
    e.preventDefault();
    setIsLoading(true);
    if(name.trim() === '' || email.trim() === '' || pass.trim() === ''){
      setIsLoading(false);
      return Swal.fire({
        icon: 'error',
        text: 'Todos los campos son obligatorios'
      })
    }
    if(pass !== pass2){
      setIsLoading(false);
      return Swal.fire({
        icon: 'error',
        text: 'Las contraseñas son distintas'
      })
    }

    const resp = await createAnUserWithEmailAndPassword(name, email, pass);
    if(!resp.ok){
      setIsLoading(false);
      return Swal.fire({
        icon: 'error',
        text: resp.msg
      })
    }
    logIn(resp.uid);
  }

  const handleRegisterWithProvider = async() => {
    setIsLoading(true);
    const resp = await signInWithGoogleAccount();
    if(!resp.ok){
      setIsLoading(false);
      return Swal.fire({
        icon: 'error',
        text: resp.msg
      });
    }

    logIn(resp.uid);
  }

  return (
    <Layout>
      <Title>Registrate</Title>
      <Form>
        <Input>
          <label>Nombre</label>
          <input
            type={'text'}
            onChange={handleInputChange}
            value={name}
            name='name'
            placeholder='ej: Leo Messi' />
        </Input>
        <Input>
          <label>Email</label>
          <input
            type={'email'}
            onChange={handleInputChange}
            value={email}
            name='email'
            placeholder='ejemplo@gmail.com' />
        </Input>
        <Input>
          <label>Contraseña</label>
          <input
          type={'password'}
            onChange={handleInputChange}
            value={pass}
            name='pass'
            placeholder='*****' />
          <input
          type={'password'}
            onChange={handleInputChange}
            value={pass2}
            name='pass2'
            placeholder='Repite la contraseña' />
        </Input>

        <Button onClick={handleRegisterWithEmail}>Confirmar</Button>
      </Form>

      <AlternativeSigIn>o registrate con</AlternativeSigIn>
      <Button onClick={handleRegisterWithProvider} bg={true} txt={true}>
        <img src={googleIcon.src} />
        <p>Google</p>
      </Button>

      <QuestionLink>Tenes un cuenta?<Link href={'/login'}>Ingresa aqui</Link></QuestionLink>

    </Layout>
  )
}
export default SignUpPage;
