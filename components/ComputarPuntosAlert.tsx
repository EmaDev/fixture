import React from 'react';
import styled from 'styled-components';
import {BsFillQuestionCircleFill} from 'react-icons/bs';
import Swal from 'sweetalert2';

const Container = styled.div`
   display: flex;
   padding: .5rem 1rem;
   margin: 0 auto;
   align-items:center;
`;

const Title = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  color: #2F2F2F;
  margin: 0 1rem;
`;
export const ComputarPuntosAlert = () => {

    const openReglas = () => {
        return Swal.fire({
            icon: 'question',
            title: `Como se computan los puntos? 
            \n Resultado exacto: +100\n Acertar ganador o empate: +50 \n Cantidad de goles correcta del equipo: +20`,
        })
    }
  return (
    <Container>
        <Title>Reglas del puntaje</Title>
        <BsFillQuestionCircleFill 
        onClick={openReglas}
        color='#3f8bda' fontSize={'2.4rem'}/>
    </Container>
  )
}
