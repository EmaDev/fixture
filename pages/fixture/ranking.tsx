import { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';
import { Layout } from '../../components/Layout';
import { RankingCard } from '../../components/others/RankingCard';

const Container = styled.div`
   min-height: 100vh;
   padding: 1rem;
   max-width: 400px;
   display: flex;
   flex-direction:column;
   align-itmes:center;
   justify-content:center;
   margin: auto;
`;
const Title = styled.h1`
   font-size: 3.2rem;
   margin: 1rem;
   padding-top: 2rem;
   color: #e1e1e1;
   @media(min-width: 678px){
    text-align:center;
   }
`;
const user = [1,2,3,4,5,6,7,8,9];
const RankingPage:NextPage = () => {
  return (
    <Layout>
        <Title>Ranking</Title>
        <Container>
            {user.map(rank => (
                <RankingCard
                key={rank}
                name='Emanuel Cisterna'
                uid='4oDuWidij2PV52Q1Lu8zKyqjjtp1'
                photo=''
                score='28'
                />
            ))}
        </Container>
    </Layout>
  )
}

export default RankingPage;