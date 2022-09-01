import Image from 'next/image';
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

const Card = styled.div`
   width: 90%;
   padding-top: 2rem;
   background-color: #e1e1e1;
   margin:auto;
   border-radius: 30px;
   display: flex;
   flex-direction:column;
   justify-content:center;
   align-items:center;
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
        <CardsContainer>
          <Card>
            <div><Image src={require('../../assets/register.png')}/></div>
            <h4>Registrate</h4>
          </Card>
          <Card>
          <div><Image src={require('../../assets/registered.png')}/></div>
          <h4>Crea tu fixture</h4>
          </Card>
        </CardsContainer>
        <Button>Comenzar</Button>
    </Container>
  )
}


