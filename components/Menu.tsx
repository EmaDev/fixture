import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
import { GrFormClose } from 'react-icons/gr';
import { AuthContext } from '../context/authContext';
import { Button } from './Global.module';
import { NavBar } from './NavBar';

const MenuLateral = styled.aside`
   position:fixed;
   width: 250px;
   min-height: 100vh;
   right: 0;
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

   &:hover{
    background-color: #E3E3E3;
    box-shadow: 1px 1px 4px #4D4D4D;
   }
`;
export const Menu = () => {

    const { logOut } = useContext(AuthContext);
    const menuRef: any = useRef();

    const handleCloseMenu = () => {
        menuRef.current.classList.add('ocultarMenu');
    }
    return (
        <>
            <NavBar menuRef={menuRef} />
            <MenuLateral ref={menuRef} className='ocultarMenu'>
                <ButtonClose onClick={handleCloseMenu}>
                    <GrFormClose />
                </ButtonClose>
            </MenuLateral>
            <div style={{ marginTop: '50px' }} />
        </>

    )
}
/* <Button onClick={logOut}>log out</Button>*/