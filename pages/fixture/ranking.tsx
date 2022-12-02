import React, { useContext, useEffect, useState } from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import { RankingContainer } from '../../components/Global.module';
import { Layout } from '../../components/Layout';
import { RankingCard, RankingItem } from '../../components/others/RankingCard';
import { AuthContext } from '../../context/authContext';
import { getRankingByGroup } from '../../firebase/fixtureQueries';
import { Spinner } from '../../components/Spinner';

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

const RankingPage: NextPage = () => {
  const { userFixture } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [rankingState, setRankingState] = useState<RankingItem[]>([]);

  useEffect(() => {
    if (userFixture?.grupo) {
      getRanking(userFixture.grupo);
    }
  }, [userFixture])


  const getRanking = async (uid: string) => {
    
    const resp = await getRankingByGroup(uid);
    setTimeout( () => {
      setIsLoading(false);
      setRankingState(resp.data);
    }, 1000);
    
  }

  return (
    <Layout>
      <Title>Ranking</Title>
      <RankingContainer>
        {
          (isLoading) ? <div className='spinner'><Spinner/></div>
          :
          <>
          {rankingState.map( item => (
            <RankingCard
            key={item.fixtureId}
            userData={item.userData}
            fixtureId={item.fixtureId}
            puntaje={item.puntaje}
            cardRanking={true}
            />
          ))}
          </>
        }
      </RankingContainer>
    </Layout>
  )
}

export default RankingPage;