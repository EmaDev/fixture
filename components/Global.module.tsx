import React from 'react';
import styled from 'styled-components';

export const Button = styled.button<any>`
   border-style: none;
   background-color: ${({bg})=> bg ? bg : '#3f8bda'};
   padding: 1rem 3rem;
   border-radius: 6px;
   font-size: 1.8rem;
   font-weight: 700;
   color: #fff;
   margin:1rem auto; 

   ${({block}) => block && `display:block;`}
   
   &:hover{
    background-color: #315983;
    box-shadow: 1px 1px 3px #527d96;
    transition: .5s ease;
   }
`;

export const BigButton = styled.div`
   border-style: none;
   background-color: ${({color})=> color ? color : '#3f8bda'};
   padding: 1.5rem 3rem;
   border-radius: 6px;
   font-size: 2rem;
   font-weight: 700;
   text-align:center;
   color: #fff;
   display: block;
   width: 90%;
   max-width: 400px;
   margin:1rem auto; 
`;

export const HeaderHello = styled.header`
   padding: 0 1rem;
   padding-top: 3rem;
   width: 100%;
   align-items: center;
   position:relative;
   display:flex;
   justify-content: space-between;
`;
export const HelloText = styled.h2`
   color: #e1e1e1;
   font-size: 3.1rem;
   display:inline-grid;
   span{
    font-size: 2.2rem;
   }
`;

export const Avatar = styled.div<any>`
   position: absolute;
   width: ${({w}) => `${w}px`};
   height: ${({h}) => `${h}px`};
   border-radius: 100%;
   top: 0;bottom:0;
   right: 1rem;
   margin:auto;
   img{
      width: 100%;
      border-radius: 100%;
   }
`;

export const Coin = styled.div<any>`
   position:absolute;
   top: 1rem;
   left: 1rem;
   width: 30px;
   height: 30px;
   border-radius: 100%;
   filter: drop-shadow(rgb(34, 34, 34) 2px 2px 2px);
`;

export const Title = styled.h2`
   margin: 1rem 2rem; 
   font-weight: 700;
   color: #2F2F2F;
   font-size: 2.4rem;

   span{
      margin: 0 1rem;
      font-size: 1.6rem;
      background-color: #3f8bda;
      color: #fff;
      padding: .5rem; 
      border-radius: 6px;

      &:hover{
         background-color: #26517d;
         transition: .3s ease;
      }
   }
`;

export const RankingContainer = styled.div`
    margin: 2rem auto;
`;
export const RankingCard = styled.div`
   width: 90%;
   max-widht: 400px;
   margin: 1rem auto;
   display: flex;
   padding: 1rem .5rem;
   align-items: center;
   bacground-color: #e1e1e1;
   box-shadow: 1px 1px 3px rgb(34, 34, 34);
   border-radius: 8px;

   p{
      margin: 0 1rem;
      font-weight: 500;
      font-size: 1.6rem;
      color: #2F2F2F;
   }

   div{
      width: 40px;
      height: 40px;
      border-radius:100%;
   }
`;

export const NoFixtureContainer = styled.div`
   width: 100%;
   height: 90vh;
   display:flex;
   flex-direction: column;
   justify-content: center;
   align-items:center;

   h1{
      padding-top: 2rem;
      font-size: 2rem;
      color: #e1e1e1;
   }
`;

