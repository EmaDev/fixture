import styled from "styled-components";

export const Title = styled.h1`
   text-align: center;
   margin: 1rem 0;
   padding-top: 1rem;
   color: #e1e1e1;
   font-size: 4rem;
`;
export const Form = styled.form`
   width: 100%;
   max-width: 500px;
   padding: 1rem;
   margin:auto;
`;

export const Input = styled.div`
   width: 90%;
   margin: auto; 
   label{
    font-weight: 700;
    font-size: 1.6rem;
    color: #e1e1e1;
    margin: 0;
   }
   input{
     display: block;
     width: 100%;
     padding: 1rem;
     border:none;
     border-radius: 6px;
     margin: 1rem auto;
     font-size: 1.8rem;
   }
`;

export const AlternativeSigIn = styled.h4`
   font-size: 1.6rem;
   font-weight: 500;
   text-align:center;
   color: #BB8B8B;
   margin: 2rem auto;
   position: relative;
   max-width: 300px;

   &:after{
    position:absolute;
    content: '';
    width: 25%;
    height: 2px;
    background: #BB8B8B;
    top: 0; bottom: 0;
    right: 0;
    margin:auto 5px;
   }
   &:before{
    position:absolute;
    content: '';
    width: 25%;
    height: 2px;
    background: #BB8B8B;
    top: 0; bottom: 0;
    margin:auto 5px;
    left: 0;
   }
`; 

export const Button = styled.button<any>`
  display:block;
  width: 90%;
  max-width: 400px;
  margin: 2rem auto 0 auto;
  background-color: ${({bg}) => bg ? '#e1e1e1' : '#4f0d24'};
  padding: 1.5rem;
  font-size: 1.6rem;
  color: ${({txt}) => txt ? '#202020' : '#e1e1e1'};
  font-weight: 500;
  border-style:none;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover{
    box-shadow: 2px 2px 6px #212121;
    transition: .3s;
  }

  p{
    margin: 0;
    font-weight: 700;
  }
  img{
    width: 20px;
    height: 20px;
    margin-right: 20px;
  }
`;

export const QuestionLink = styled.p`
   text-align:center;
   color: #e1e1e1;
   font-size: 1.7rem;
   font-weight: 500;
   padding: 2rem 0;
   a{
    margin: 0 1rem;
    font-weight: 700;
    color: #e1e1e1;
   }
`;