import React, { useContext, useEffect, useState } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Avatar, Button, Coin, HeaderHello, HelloText, RankingCard, RankingContainer, Title, } from '../components/Global.module';
import { ButtonLink, ButtonsContainer, CardImage, CardText, Container, FixtureCard } from '../components/Home.module';
import { Layout } from '../components/Layout';
import { AuthContext } from '../context/authContext';
import Link from 'next/link';
import { firstLetterToCapitalize } from '../helpers';


const HomePage: NextPage = () => {

    const { isAuthenticated, user, setUserData } = useContext(AuthContext);
    const { push } = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            push('/');
        }
        setUserData();
    }, [isAuthenticated, user]);

    if (!user) {
        return <></>
    }
    return (
        <Layout>
            <HeaderHello>
                <HelloText>Hola, <span>{firstLetterToCapitalize(user.name)}</span></HelloText>
                <Avatar w={60} h={60} onClick={() => push('/usuario/perfil')}>
                    <Image width={'60px'} height={'60px'}
                        style={{ borderRadius: '100%' }}
                        src={(user.photoURL !== '') ? user.photoURL : require('../assets/user.png')} />
                </Avatar>
            </HeaderHello>
            <br />
            <Container>
                <Link href={`usuario/fixture`}>
                    <FixtureCard>
                        <CardImage>
                            <Image src={require('../assets/growth.png')} />
                        </CardImage>
                        <Coin >
                            <Image src={require('../assets/coin.png')} />
                        </Coin>
                        <CardText>
                            <h2>Tu Fixture</h2>
                            <h3>Puntos: {user.score.total}</h3>
                        </CardText>
                    </FixtureCard>
                </Link>


                <ButtonsContainer>
                    <ButtonLink>
                        <Image src={require('../assets/app.png')} />
                    </ButtonLink>
                    <ButtonLink>
                        <Image src={require('../assets/light-bulb.png')} />
                    </ButtonLink>
                    <ButtonLink>
                        <Image src={require('../assets/trophy.png')} />
                    </ButtonLink>
                </ButtonsContainer>

                <Title>Ranking</Title>
                <RankingContainer>
                    <RankingCard>
                        <div><Image src={require('../assets/user.png')} /></div>
                        <p>Nora Norma Noriega</p>
                    </RankingCard>
                    <RankingCard>
                        <div><Image src={require('../assets/user.png')} /></div>
                        <p>Emanuel Emanero</p>
                    </RankingCard>
                    <RankingCard>
                        <div><Image src={require('../assets/user.png')} /></div>
                        <p>Mr Apio</p>
                    </RankingCard>
                </RankingContainer>
                <Button block>ver mas</Button>

            </Container>

        </Layout>
    )
}
export default HomePage;


