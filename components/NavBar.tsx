import React, { useContext } from 'react';
import styled from 'styled-components';
import { HiMenu, HiUser } from 'react-icons/hi';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AuthContext } from '../context/authContext';

const NavBarHeader = styled.header`
   position: fixed;
   box-shadow: 1px 1px 8px #343434;
   z-index: 998;
   width: 100%;
   background-color: #e1e1e1;
   height: 60px;
   padding: 1rem;
   top: 0;
   left: 0;
   display: flex;
`;

const ActionButton = styled.button<any>`
   border-style:none;
   background: none;
   position: absolute;
   top: 0; bottom: 0;
   margin:0;
   font-size: 3rem;
   ${({ pos }) => `${pos};`}
`;

const LogoButton = styled.div`
   width: 85px;
   height:38px;
   position:absolute;
   left: 0; right: 0;top:0; bottom: 0;
   margin:auto;
`;

interface Props {
    menuRef: any;
}
export const NavBar = ({ menuRef }: Props) => {

    const { push } = useRouter();
    const { isAuthenticated } = useContext(AuthContext);
    const handleOpenMenu = () => {

        menuRef.current.classList.remove('ocultarMenu');
    }
    return (
        <NavBarHeader>
            <h3>Fixture</h3>
            <ActionButton pos={'left: 1rem'}>
                <HiMenu onClick={handleOpenMenu} />
            </ActionButton>
            <Link href={(isAuthenticated) ? '/home': '/'}>
                <LogoButton>
                    <Image src={require('../assets/icon-nav.svg')} />
                </LogoButton>
            </Link>
            {
                (!isAuthenticated) &&
                <ActionButton pos={'right: 1rem'}>
                    <HiUser onClick={() => push('/login')} />
                </ActionButton>
            }
        </NavBarHeader>
    )
}
