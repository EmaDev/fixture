import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/authContext';
import { Menu } from './Menu';
import { Spinner } from './Spinner';

export const Layout = ({ children }: any) => {

    const { isAuthenticated, isLoading } = useContext(AuthContext);
    const { route, push } = useRouter();

    useEffect(() => {
        const arrPath = route.split('/');
        if (!isAuthenticated && !isLoading) {
            if (arrPath[1] !== 'login' && arrPath[1] !== 'register') {
                push('/');
            }
        }
    }, [isAuthenticated]);

   
    return (
        <>
            <Head>
                <title>Prode App</title>
                <meta name="description" content="Prode Mundial Qatar 2022 online" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;700&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@600;700&display=swap" rel="stylesheet" />
            </Head>
            {
                (isLoading) ? 
                <div style={{height: '90vh',width: '100%', margin: 'auto', 
                display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Spinner />
                </div>
                :
                <main>
                    <Menu />
                    {children}
                </main>
            }

        </>
    )
}
