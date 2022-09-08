import { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';
import { Layout } from '../../components/Layout';

const Container = styled.section`
    min-height: 90vh;
    width: 90%;
    max-width: 500px;
    margin: auto;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`;

const Question = styled.div`
   width: 100%;
   border-radius: 8px;
   background-color: #e1e1e1;
   padding: 2rem;
   position:relative;
   margin: 1rem auto;
   p{
    margin: 0;
    text-align:center;
    font-size: 2.2rem;
    color: #3A3A3A;
    font-weight: 500;
   }
`; 
const Timer = styled.div`
    height: 70px;
    width: 70px;
    border-radius: 100%;
    background-color: #e1e1e1;
    border: 2px solid #3A3A3A;
    position: absolute;
    top: -5rem;
    left: 0; right: 0;
    margin:auto;
    p{
        font-size: 4rem;
        margin:0;
        font-weight: 700;
        color: #3A3A3A;
    }
`;

const Answer = styled.button`
   width: 90%;
   padding: 1rem;
   display: block;
   margin: 1rem auto; 
   background-color: #e1e1e1;
   border-radius: 8px;
   font-size: 1.8rem;
   color: #3A3A3A;
   font-weight: 500;
`;

const ButtonNext = styled.button`
   display: block;
   padding: 1rem;
   margin: 2rem auto;
   width: 80%;
   border-style: none;
   border-radius: 8px;
   font-size: 2rem;
   font-weight: 500;
   background-color: #49061d;
   color: #e1e1e1;
   box-shadow: 2px 2px 6px #26040f;
`;
const TriviaPage:NextPage = () => {
  return (
    <Layout>
        <Container>
            <Question>
                <Timer><p>15</p></Timer>
                <p>Quien es el mayor goleador de Brasil?</p>
            </Question>
            <Answer>Casemiro</Answer>
            <Answer>Neymar</Answer>
            <Answer>Ronaldo</Answer>
            
            <ButtonNext>Saltar</ButtonNext>
        </Container>
    </Layout>
  )
}

export default TriviaPage;
