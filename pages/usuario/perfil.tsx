import React, {useContext, useEffect} from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import { MdEdit } from 'react-icons/md';
import { Layout } from '../../components/Layout';
import { AuthContext } from '../../context/authContext';
import { useRouter } from 'next/router';

const ImageContainer = styled.div`
    margin: 2rem auto;
    width: 130px;
    height: 130px;
    border-radius: 100%;
    background-color: gray;
    position: relative;
`;
const UpdateIcon = styled.button`
  border-style: none;
  background-color: #490c21;
  height: 40px;
  width: 40px;
  border-radius: 100%;
  position: absolute;
  bottom: -1.5rem;
  left: 0; right: 0;
  margin:auto;
`;

const UserName = styled.p`
   font-size: 2rem;
   font-weight: 700;
   text-transform: capitalize;
   color: #e1e1e1;
   text-align: center;
   margin: 1rem auto;
`;
const Email = styled.div`
   font-size: 1.4rem;
   font-weight: 500;
   color: #e1e1e1;
   text-align: center;
   margin: 0 auto;
`;
const PerfilPage: NextPage = () => {

    const {isAuthenticated, user} = useContext(AuthContext);
    const {push} = useRouter();

   useEffect( () => {

   },[]);
    return (
        <Layout>
            <br />
            <ImageContainer>
                <UpdateIcon><MdEdit color='#e1e1e1' size={'2rem'} /></UpdateIcon>
            </ImageContainer>
            <UserName>{user?.name}</UserName>
            <Email>{user?.email}</Email>
        </Layout>
    )
}

export default PerfilPage;