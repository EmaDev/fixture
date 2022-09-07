import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import { BsInstagram, BsWhatsapp } from 'react-icons/bs';
import { MdOutlineEmail } from 'react-icons/md';

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

const ContactContainer = styled.div`
   width: 90%;
   margin: auto;
   display: flex;
   justify-content: space-between;
   align-items:center;
`;
const IconsContact = styled.div`
   display: grid;
   grid-template-columns: 33% 33% 33%;
   gap: 1rem;
   font-size: 2.2rem;
   color: #8a1538;
`;

export const Footer = () => {
    return (
        <Container>
            <Content>
                <ContactContainer>
                    <Image src={require('../assets/icon-nav.svg')}
                        width={'120px'} height={'70px'}
                        style={{ margin: '0 1rem' }}
                    />
                    <IconsContact>
                        <BsInstagram />
                        <BsWhatsapp />
                        <MdOutlineEmail />
                    </IconsContact>
                </ContactContainer>

                <Separator />
                <Text>Copyright © 2022</Text>
                <Text>Todos los derechos reservados</Text>
            </Content>
        </Container>
    )
}
