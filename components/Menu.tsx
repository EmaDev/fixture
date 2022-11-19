import React, { useContext, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { GrFormClose } from 'react-icons/gr';
import { AiFillHome, AiFillQuestionCircle } from 'react-icons/ai';
import { GiTrophyCup } from 'react-icons/gi';
import { FaUserAlt, FaGamepad, FaPhoneAlt } from 'react-icons/fa';



import { AuthContext } from '../context/authContext';
import { NavBar } from './NavBar';


const MenuContainer = styled.div`
   position: fixed;
   z-index: 998;
   background-color: rgba(0,0,0,0.8);
   width: 100%;
   height: 100vh;
   overflow-y:hidden
`;

const MenuLateral = styled.aside`
   position:fixed;
   width: 250px;
   height: 100vh;
   left: 0;
   top: 0;
   background-color: #e1e1e1;
   box-shadow: 1px 1px 10px #343434;
   z-index: 999;
   transition: .6s ease;
`;
const ButtonClose = styled.button`
   border-style: none;
   width: 40px;
   height: 40px;
   padding: .6rem;
   font-size: 3rem;
   margin: 1rem;
   display: flex;
   align-items: center;
   box-shadow: 1px 1px 2px #4D4D4D;
   border-radius: 100%;
   position: absolute;
   right: .5rem;

   &:hover{
    background-color: #E3E3E3;
    box-shadow: 1px 1px 4px #4D4D4D;
   }
`;
const ButtonLogOut = styled.button`
  position:absolute;
  border-style:none;
  background-color: #3E3E3E;
  color: #fff;
  font-size: 1.6rem;
  font-weight: 500;
  padding: 1rem;
  border-radius: 10px;
  bottom: 1rem; left: 1rem; right: 1rem;
  margin:auto;
`;

const Ul = styled.ul`
   margin: auto;
   margin-top: 10rem;

   li{
    width: 90%;
    text-align: left;
    font-size: 2rem;
    font-weight: 700;
    text-transform: capitalize;
    padding: 1rem auto;
    padding-bottom: 1rem;
    border-bottom: 1px solid #B9B8B8;
    margin: 1.8rem;
    color: #3E3E3E;
    display:flex;
    align-items:center;
    p{
        margin: 0 1rem;
    }
    a{
        color: #3E3E3E;
    } 
   }
`;

export const Menu = () => {

    const { logOut, isAuthenticated } = useContext(AuthContext);
    const { push } = useRouter();
    const menuRef: any = useRef();

    const handleCloseMenu = () => {
        menuRef.current.classList.add('ocultarMenu');
    }

    const handleLogOut = () => {
        logOut();
        push('/');
    }
    return (
        <>
            <NavBar menuRef={menuRef} />
            <MenuLateral ref={menuRef} className='ocultarMenu'>
                <ButtonClose onClick={handleCloseMenu}>
                    <GrFormClose />
                </ButtonClose>


                {isAuthenticated &&
                    <>
                        <ButtonLogOut onClick={handleLogOut}>Cerrar sesion</ButtonLogOut>
                        <Ul>
                            <li><AiFillHome /><p><Link href={'/home'}>Inicio</Link></p></li>
                            <li><FaUserAlt /><p><Link href={'/usuario/perfil'}>cuenta</Link></p></li>
                            <li><FaGamepad /><p><Link href={'/juegos/trivia'}>Trivias</Link></p></li>
                            <li><FaPhoneAlt /><p><Link href={''}>contacto</Link></p></li>
                        </Ul>
                    </>
                }
                {
                    (!isAuthenticated) &&
                    <>
                        <Ul>
                            <li><AiFillHome /><p><Link href={'/'}>Inicio</Link></p></li>
                            <li><FaUserAlt /><p><Link href={'/login'}>Ingresar</Link></p></li>
                            <li><FaGamepad /><p><Link href={'/juegos/trivia'}>Juegos</Link></p></li>
                            <li><FaPhoneAlt /><p><Link href={''}>contacto</Link></p></li>
                            <li><AiFillQuestionCircle /><p style={{ fontSize: '1.6rem' }}><Link href={''}>Preguntas frecuentes</Link></p></li>
                        </Ul>
                    </>
                }
            </MenuLateral>
            <div style={{ marginTop: '50px' }} />
        </>

    )
}
