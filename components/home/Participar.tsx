import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const Container = styled.section`
   padding: 3rem 0;
`;

const Title = styled.h2`
   text-align:center;
   font-family: 'Oswald', sans-serif;
   font-size: 2.6rem;
   text-transform: uppercase;
`;

const CardsContainer = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    margin: 2rem auto;
    max-width: 500px;
`;
const CardSlider = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  padding: 1rem 0;
  margin: 2rem auto;
  overflow-x: auto;
`;
const Card = styled.div`
   min-width: 160px;
   height: 215px;
   padding-top: 2rem;
   background-color: #e1e1e1;
   margin: auto .5rem;
   border-radius: 30px;
   display: flex;
   flex-direction:column;
   justify-content:center;
   align-items:center;
   box-shadow: 2px 2px 6px #430a1e;
   h4{
    text-align: center;
    color: #1A1A1A;
    font-size: 1.8rem;

   }
   div{
    width: 100px;
    heigth: 120px;
    margin:auto;
    padding-left: 1rem;
    filter: drop-shadow(rgb(34,34,34) 2px 2px 4px);
   }
`;
const Button = styled.button`
  border-style: none;
  display: block;
  margin:auto;
  padding: 1rem 2rem;  
  clip-path: polygon(2% 0,100% 0,98% 100%,0 100%);
  font-size: 2.2rem;
  background-color: #470d1c;
  color: #e1e1e1;

  &:hover{
    background-color: #3f0a1a;
    box-shadow: 2px 2px 10px #000;
    padding: 1.5rem 2.5rem;
    transition: .5s;
  }
`

export const Participar = () => {
  return (
    <Container>
      <Title>Como participar</Title>
      <CardSlider>
        <Card>
          <div><Image src={require('../../assets/register.png')} /></div>
          <h4>Registrate</h4>
        </Card>
        <Card>
          <div><Image src={require('../../assets/registered.png')} /></div>
          <h4>Crea tu fixture</h4>
        </Card>
        <Card>
          <div><Image src={require('../../assets/paymentcard.png')} /></div>
          <h4>Pago la inscripcion</h4>
        </Card>
      </CardSlider>
      <Link href={'/login'}>
        <Button>Comenzar</Button>
      </Link>
    </Container>
  )
}


