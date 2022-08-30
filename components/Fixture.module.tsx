import styled from "styled-components";

export const PageContainer = styled.section`
    height: 100%;
    width: 100%;
    background-color: blue;
    display: flex;
    justify-content:center;
    align-items:center;
    margin: auto;
`;

export const FixtureCardItem = styled.div<any>`
   width: 90%;
   max-width: 400px;
   margin:auto;
   background-color: #e1e1e1;
   border: 1px solid #595959;
   color: #630f2c;
   padding: 1rem;
   border-radius: 10px 10px 10px 10px / 235px 235px 235px 235px;
   cursor:pointer;
   ${ ({margin}) => margin && 'margin: 1rem auto;'}
`;

export const Title = styled.h3`
   font-size: 2.6rem;
   font-weight: 700;
   text-align:center;
   border-bottom: 2px solid #630f2c;
   padding-bottom: 1rem; 
   width: 90%;
   margin: 1rem auto;
`;

export const MatchItem = styled.div`
  display: grid;
  grid-template-columns: 35% 15% 15% 35%;
  border-bottom: 1px solid #D7D7D7;
  margin: 1rem 0;
  input{
    padding: .3rem;
    margin: .8rem .5rem;
    font-size: 1.7rem;
    font-weight: 700;
    text-align:center;
    border-radius: 5px;
    border-style: none;
    box-shadow: 1px 1px 5px #B9B9B9;

    ::placeholder {
      color:#252525;
      opacity: 1;
    }  

  }
  div{
    width:100%;
    display: flex;
    align-items:center;
    justify-content:space-evenly;
    p{
        margin: 0 5px;
        font-size: 1.6rem;
        font-weight: 500;
        text-align:center;
    }
  }
`;

export const PrimaryButton = styled.button`
   width: 90%;
   max-width: 400px;
   display: block;
   margin: 2rem auto;
   padding: 1.3rem;
   background-color: #310816;
   border-radius: 8px;
   color: #e1e1e1;
   font-size: 2.2rem;
   font-weight: 700;
   border-style: none;
`;

export const PrimearyTilte = styled.h1`
  font-size: 2.2rem;
  color: #C6891D;
  margin: 0;
  padding-top: 1rem;
  text-align: center;
  text-shadow: 0 0 4px #E0AB55;
`;
export const StepTitle = styled.h3`
   text-align:center;
   margin: 0;
   font-size: 3rem;
   fonr-weight: 700;
`;