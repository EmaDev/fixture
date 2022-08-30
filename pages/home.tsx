import React, { useContext, useEffect } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Avatar, Button, Coin, HeaderHello, HelloText, RankingCard, Title, } from '../components/Global.module';
import { ButtonLink, ButtonsContainer, CardImage, CardText, Container, FixtureCard } from '../components/Home.module';
import { Layout } from '../components/Layout';
import { AuthContext } from '../context/authContext';
import Link from 'next/link';



const HomePage: NextPage = () => {

    const { isAuthenticated, logOut } = useContext(AuthContext);
    const { push } = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            push('/');
        }
    }, [isAuthenticated]);

    return (
        <Layout>
            <HeaderHello>
                <HelloText>Hola, <span>Fabricio Salgueiro</span></HelloText>
                <Avatar w={60} h={60}>
                    <Image src={require('../assets/user.png')} />
                </Avatar>
            </HeaderHello>
            <br />
            <Container>
                <Link href={'fixture/emanul-cisterna'}>
                    <FixtureCard>
                        <CardImage>
                            <Image src={require('../assets/growth.png')} />
                        </CardImage>
                        <Coin >
                            <Image src={require('../assets/coin.png')} />
                        </Coin>
                        <CardText>
                            <h2>Tu Fixture</h2>
                            <h3>Puntos: 35600</h3>
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
                <RankingCard>
                    <div><Image src={require('../assets/user.png')} /></div>
                    <p>Romario</p>
                </RankingCard>
                <RankingCard>
                    <div><Image src={require('../assets/user.png')} /></div>
                    <p>Emanuel Emanero</p>
                </RankingCard>
                <RankingCard>
                    <div><Image src={require('../assets/user.png')} /></div>
                    <p>Mr Apio</p>
                </RankingCard>
                <Button block>ver mas</Button>

            </Container>

        </Layout>
    )
}
export default HomePage;


