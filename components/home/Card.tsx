import React from 'react';
import styled from 'styled-components';

const CardItem = styled.div<any>`
   min-width: 156px;
   height: 250px;
   margin: 0 1rem;
   border-radius: 8px;
   background: rgba(0, 0, 0, 0.6) url('${({img}) => img}');
   background-size: cover;
   position:relative;
   border: 1px solid #030e25;
   cursor:pointer;
   &:hover{
    background-blend-mode: exclusion;
    border: 1px solid #0d265a;
   }

   div{
    width: 100%;
    height:100%;
    background: linear-gradient(180deg,transparent,#020f2a);

    p{
        text-align:center;
        font-size: 1.8rem;
        text-transform: uppercase;
        font-weight: 700;
        position:absolute;
        bottom: .5rem;
        width: 100%;
        padding: 0 5px;
    }
   }
`;
interface Props {
    img: string;
    url?: string;
    title: string;
}
export const Card = ({img, title}:Props) => {
  return (
    <CardItem img={img}>
        <div>
            <p>{title}</p>
        </div>
    </CardItem>
  )
}
