import React from 'react';
import styled from 'styled-components';

const Container = styled.section`
   background-color: #e1e1e1;
   padding: 2rem 0;
   color: #000;
`;

const Title = styled.h2`
   text-align:center;
   font-family: 'Oswald', sans-serif;
   font-size: 2.2rem;
   text-transform: uppercase;
`;

const CounterContainer = styled.div`
   padding: 1rem;
   max-width: 500px;
   display: flex;
   justify-content: center;
   align-items:center;
`;

const CounterItem = styled.div`
   margin:auto;
   text-align:center;
   font-family: 'Oswald', sans-serif;
   position:relative;
    
   p{
    margin: -5px 0;
    font-size: 4.2rem;
    padding:0;
   }
   span{
    font-size: 2rem;
    text-transform: uppercase;
    margin:0;
   }

   &:not(:last-of-type):before{
    position:absolute;
    content: '';
    display:block;
    width: 18px;
    height: 18px;
    top: 0; bottom: 0;
    right: -80%;
    margin:auto;
    background: #4b0e1e;
    transform: rotate(45deg);
   }
`;
export const Counter = () => {
  return (
    <Container>
        <Title>El torneo comienza en</Title>
        <CounterContainer>
          <CounterItem>
            <p>80</p><span>Dias</span>
          </CounterItem>
          <CounterItem>
            <p>15</p><span>horas</span>
          </CounterItem>
          <CounterItem>
            <p>43</p><span>minutos</span>
          </CounterItem>
        </CounterContainer>
    </Container>
  )
}
