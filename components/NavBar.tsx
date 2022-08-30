import React from 'react';
import styled from 'styled-components';
import { HiMenu } from 'react-icons/hi';

const NavBarHeader = styled.header`
   position: fixed;
   box-shadow: 1px 1px 8px #343434;
   z-index: 998;
   width: 100%;
   background-color: #e1e1e1;
   height: 50px;
   padding: 1rem;
   top: 0;
   left: 0;
   display: flex;
`;

const HamburgerButton = styled.button`
   border-style:none;
   background: none;
   position: absolute;
   top: 0; bottom: 0;
   right: 1rem;
   margin:0;
   font-size: 3rem;
`;

interface Props {
    menuRef: any;
}
export const NavBar = ({ menuRef }: Props) => {

    const handleOpenMenu = () => {

        menuRef.current.classList.remove('ocultarMenu');
    }
    return (
        <NavBarHeader>
            <h3>Fixture</h3>
            <HamburgerButton>
                <HiMenu onClick={handleOpenMenu} />
            </HamburgerButton>
        </NavBarHeader>
    )
}
