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
const Link = styled.a`
  color: #e1e1e1;
  text-decoration: none;
`;

export const AboutQatar = () => {
    return (
        <Container>
            <Content>
                <Title>Sobre Qatar 2022</Title>
                <br/>
                <SubTitle>Documentos Oficiales</SubTitle>
                <CardSlider>
                    <Link href='https://digitalhub.fifa.com/m/6a616c6cf19bc57a/original/FWC-2022-Match-Schedule.pdf' 
                    download><CardSmall title="Calendario de partidos" img="/docs/calendar.avif"/></Link>
                    <CardSmall title="Reglamento" img="/docs/regulations.avif"/>
                    <CardSmall title="Procedimiento del sorteo final" img="/docs/sort.avif"/>
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
