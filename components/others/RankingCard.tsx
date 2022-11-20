import React from 'react';
import styled from 'styled-components';
import { AiFillStar } from 'react-icons/ai';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Card = styled.div`
   padding: 1rem;
   width: 95%;
   margin: 1rem auto;
   display: flex;
   justify-content: space-between;
   align-items:center;
   border-radius: 8px;
   border: 1px;
   box-shadow: 2px 2px 6px #3d0a1b;
   background-color: #e1e1e1;
   color: #242424;
   cursor:pointer;
   &:hover{
     background-color: #D8D8D8;
   }
`;

const NameAndPhoto = styled.div`
  display: flex;
  div{
    width: 40px;
    height: 40px;
    border-radius: 100%;
    background-color: gray;
    margin:auto;
  }
  p{
    font-size: 1.8rem;
    font-weight: 500;
    margin: 0 1rem;
    padding: 0;
  }
`;

const Points = styled.div`
   display:flex;
   align-items:center; 

   p{
    font-size: 2rem;
    font-weight: 700;
    margin: 0 1rem;
   }
`;

export interface RankingItem {
  fixtureId?: string;
  puntaje:number;
  userData: {
    user: string;
    name:string;
    photoURL:string;
    score: {
      history: [],
      total: number
    };
  }
}
export const RankingCard = ({userData, puntaje}:RankingItem) => {
    const {push} = useRouter();
    return (
        <Card onClick={() => push(`/fixture/${userData.user}`)}>
            <NameAndPhoto>
                <div>
                    <Image src={(userData.photoURL) ? userData.photoURL : require('../../assets/user.png')}
                    width={40} height={40} style={{borderRadius: '50%'}}
                    />
                </div>
                <p>{userData.name}</p>
            </NameAndPhoto>
            <Points>
                <AiFillStar size={'1.8rem'} color={'#ae8348'} />
                <p>{puntaje}</p>
            </Points>
        </Card>
    )
}
