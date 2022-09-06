import Head from 'next/head';
import React from 'react';
import { Menu } from './Menu';

export const Layout = ({ children }: any) => {
    return (
        <>
            <Head>
                <title>Fixture App</title>
                <meta name="description" content="Prode Mundial Qatar 2022 online" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;700&display=swap" rel="stylesheet"/>
                <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@600;700&display=swap" rel="stylesheet"/>
            </Head>
            <main>
                <Menu />
                {children}
            </main>
        </>
    )
}
