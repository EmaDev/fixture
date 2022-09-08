import React from 'react';
import styled from 'styled-components';
import { AiFillStar } from 'react-icons/ai';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Card = styled.div`
   padding: 1rem;
   width: 100%;
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

interface Props {
    uid: string;
    name: string;
    score: string;
    photo: string;
}
export const RankingCard = ({name,uid,photo,score}:Props) => {
    const {push} = useRouter();
    return (
        <Card onClick={() => push(`/fixture/${uid}`)}>
            <NameAndPhoto>
                <div>
                    <Image src={(photo) ? photo : require('../../assets/user.png')}/>
                </div>
                <p>{name}</p>
            </NameAndPhoto>
            <Points>
                <AiFillStar size={'1.8rem'} color={'#ae8348'} />
                <p>{score}</p>
            </Points>
        </Card>
    )
}
