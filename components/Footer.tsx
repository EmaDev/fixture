import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

const Container = styled.footer`
   padding: 1rem;
   border-top: 1px solid #1a0a0a;
   background-color: #2c0a15;
`;
const Content = styled.div`
   max-width: 800px;
   margin:auto;
   color: #e1e1e1;
`;
const Separator = styled.div`
   width: 95%;
   height: 1px;
   background-color: #8a1538;
   margin: 2rem auto;
`;

const Text = styled.p`
   text-align:center;
   margin: 1rem;
   font-size: 1.6rem;
   font-weight: 500;
`;

export const Footer = () => {
    return (
        <Container>
            <Content>
                <Image src={require('../assets/icon-nav.svg')}
                    width={'120px'} height={'70px'}
                    style={{ margin: '0 1rem' }}
                />
                <Separator />
                <Text>Copyright © 2022</Text>
                <Text>Todos los derechos reservados</Text>
            </Content>
        </Container>
    )
}
