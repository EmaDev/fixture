import React, { useContext, useEffect } from 'react';
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

const SignUpPage: NextPage = () => {

  const { isAuthenticated, logIn } = useContext(AuthContext);
  const { push } = useRouter();

  const { formValues, handleInputChange } = useForm({ name: '', email: '', pass: '', pass2: '' });
  const { name, email, pass, pass2 } = formValues;

  useEffect(() => {
    if (isAuthenticated) {
      push('/home');
    }
  }, [isAuthenticated]);

  const handleRegisterWithEmail = async(e:any) => {
    e.preventDefault();
    if(name.trim() === '' || email.trim() === '' || pass.trim() === ''){
      return Swal.fire({
        icon: 'error',
        text: 'Todos los campos son obligatorios'
      })
    }
    if(pass !== pass2){
      return Swal.fire({
        icon: 'error',
        text: 'Las contraseñas son distintas'
      })
    }

    const resp = await createAnUserWithEmailAndPassword(name, email, pass);
    if(!resp.ok){
      return Swal.fire({
        icon: 'error',
        text: resp.msg
      })
    }

    logIn(resp.uid);
  }

  const handleRegisterWithProvider = async() => {
    const resp = await signInWithGoogleAccount();
    if(!resp.ok){
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
            placeholder='Ej: ejemplo@gmail.com' />
        </Input>
        <Input>
          <label>Contraseña</label>
          <input
          type={'password'}
            onChange={handleInputChange}
            value={pass}
            name='pass'
            placeholder='Ej: DtrdjF22' />
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
