import React from 'react';
import styled from 'styled-components';
import { Card } from './Card';
import { CardSmall } from './CardSmall';

const Container = styled.section`
   padding: 2rem 1rem;
   background-color: #020f2a; 
   display: flex;
   justify-content:center;
   align-items:center;
`;

const Content = styled.div`
   width: 100%;
   max-width: 800px;
   margin:auto;
`;
const Title = styled.h1`
   font-size: 2.4rem;
   margin: 1rem 0;
   text-align:center; 
   text-transform: uppercase;
   font-family: 'Oswald', sans-serif;
`;
const SubTitle = styled.h2`
   font-size: 1.6rem;
   margin: 1rem;
   text-transform: uppercase;
`;

const CardSlider = styled.div`
  width: 100%;
  display: flex;
  padding: 1rem 0;
  overflow-x: auto;
`;

export const AboutQatar = () => {
    return (
        <Container>
            <Content>
                <Title>Sobre Qatar 2022</Title>
                <br/>
                <SubTitle>Documentos Oficiales</SubTitle>
                <CardSlider>
                    <CardSmall title="Calendario de partidos" img="/docs/calendar.avif"/>
                    <CardSmall title="Reglamento" img="/docs/regulations.avif"/>
                    <CardSmall title="Procedimiento del sorteo final" img="/docs/sort.avif"/>
                </CardSlider>
                <br/>
                <SubTitle>Descubre Qatar</SubTitle>
                <CardSlider>
                    <Card title="Pais Anfitrion" img={"/docs/anfitrion.avif"}/>
                    <Card title="Cinco cosas imperdibles de Qatar" img={"/docs/interes.avif"}/>
                    <Card title="Doha" img={"/docs/doha.avif"}/>
                    <Card title="Al Wakrah" img={"/docs/alwakrah.avif"}/>
                    <Card title="Al Khor" img={"/docs/alkhor.avif"}/>
                </CardSlider>

                <br/>
                <SubTitle>Estadios</SubTitle>
                <CardSlider>
                    <Card title="Estadio 974" img={"/docs/974.avif"}/>
                    <Card title="Estadio Al Thumama" img={"/docs/althumama.avif"}/>
                    <Card title="Estadio Al Janoub" img={"/docs/aljanoub.avif"}/>
                    <Card title="Estadio Ahmad bin Ali" img={"/docs/binali.avif"}/>
                    <Card title="Estadio Internacional Khalifa" img={"/docs/khalifa.avif"}/>
                    <Card title="Estadio Al Bayt" img={"/docs/albayt.avif"}/>
                    <Card title="Estadio Lusail" img={"/docs/lusail.avif"}/>
                    <Card title="Estadio de la Ciudad de la Educación" img={"/docs/education.avif"}/>
                </CardSlider>
            </Content>
        </Container>
    )
}
