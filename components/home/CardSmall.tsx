import React from 'react';
import styled from 'styled-components';

const Card = styled.div<any>`
   min-width: 190px;
   height: 110px;
   background-color: red;
   margin: 0 1rem;
   border-radius: 8px;
   background-image: url('${({img}) => img}');
   background-size: cover;
   cursor:pointer;
   &:hover{
    min-width: 195px;
    height: 115px;
    transition: .8s;
   }
`;

const Title = styled.p`
   margin: 0 2rem;
   font-size: 1.8rem;
   font-weight: 700;
`;

interface Props {
    img: string;
    url?: string;
    title: string;
}
export const CardSmall = ({img, title}:Props) => {
  return (
    <div>
    <Card img={img}/>
    <Title>{title}</Title>
    </div>
  )
}
