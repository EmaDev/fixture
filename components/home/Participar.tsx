import React from 'react';
import styled from 'styled-components';

const Container = styled.section`
   padding: 2rem 0;
`;

const Title = styled.h2`
   text-align:center;
   font-family: 'Oswald', sans-serif;
   font-size: 2.6rem;
   text-transform: uppercase;
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
        <Button>Comenzar</Button>
    </Container>
  )
}
