import styled from "styled-components";

export const Container = styled.section`
  min-height: 100vh;
  padding: 1rem 0;
  background-color: #e1e1e1;
  border-radius: 20px 20px 0 0;
`;
export const FixtureCard = styled.div`
  width: 90%;
  max-width: 400px;
  margin: 4rem 2rem auto auto;
  padding: 3rem 1rem 1rem 1rem; 
  background-color: #811439;
  border-radius: 8px;
  box-shadow: 1px 1px 4px rgb(34, 34, 34);
  position:relative;
  
`;
export const CardImage = styled.div`
   position:absolute;
   width: 100px;
   heigth: 100px;
   top: -4rem;
   right: 1rem;
   filter: drop-shadow(rgb(34, 34, 34) 2px 2px 4px);
`;
export const CardText = styled.div`
  margin-top: 2rem;
  h2{
    font-size:2.4rem;
    font-weight: 700;
    margin: 0;
  }
  h3{
    font-size: 1.9rem;
    font-weight: 500;
    margin: 0;
  }
`;

export const ButtonsContainer = styled.div`
  overflow-x: auto;
  display: grid;
  grid-template-columns: 33% 33% 33%;
  margin: 1rem auto;
  padding: 1rem 0;
  width: 90%;
  column-gap: 1rem;
`;

export const ButtonLink = styled.div`
   width: 100px;
   height: 100px;
   padding: 1rem;
   border-radius: 20px;
   background-color: #338199;
   position:relative;

   p{
    margin: 0;
    font-size: 2rem;
    font-weight: 700;
    text-align:center;
   }


`;