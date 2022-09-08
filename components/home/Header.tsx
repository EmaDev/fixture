import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

const Container = styled.header`
   position:relative;
   width: 100%;
   min-height: 95vh;
   background: #470b20 url('/background.svg');
   background-size: cover;
   background-repeat: no-repeat;
   background-position:center;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items:center;
`;

const Banner = styled.div`
   margin: auto;   
   width: 100%;
   max-width: 500px;
`;
const ImageContainer = styled.div`
   height: 250px;
   width: 110px;
   margin: auto;
`;

const TextBanner = styled.div`
   width: 100%;
   margin: 2rem 0;
   display: flex;
   flex-direction:column;
   justify-content: center;
   align-items: center;
   padding-top: 2rem;
`;

const Title = styled.h1`
   color: #e1e1e1;
   font-family: 'Oswald', sans-serif;
   background: #630f2c;
   padding: .8rem 1rem;
   clip-path: polygon(2% 0,100% 0,98% 100%,0 100%);
   margin-bottom: 0;
   font-size: 3rem;
   text-transform: uppercase;
`;
const Subtitle = styled.h2`
   color: #e1e1e1;
   font-family: 'Oswald', sans-serif;
   text-transform: uppercase;
   width: 90%;
   text-align: center;
   font-size: 2.2rem;
   margin: 1rem 0;
`;


export const Header = () => {
    return (
        <Container>
            <Banner>
                <ImageContainer>
                    <Image
                        src={require('../../assets/cup.png')} />
                </ImageContainer>
                <TextBanner>
                    <Title>Crea tu Prode online</Title>
                    <Subtitle>Diseña tu fixture y aposta con tus amigos</Subtitle>
                </TextBanner>
            </Banner>
        </Container>
    )
}
