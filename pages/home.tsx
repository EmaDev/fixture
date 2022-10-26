import React, { useContext, useEffect, useState } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Avatar, Button, Coin, HeaderHello, HelloText, RankingContainer, Title, } from '../components/Global.module';
import { ButtonLink, ButtonsContainer, CardImage, CardText, Container, FixtureCard } from '../components/Home.module';
import { Layout } from '../components/Layout';
import { AuthContext } from '../context/authContext';
import Link from 'next/link';
import { firstLetterToCapitalize } from '../helpers';
import { Spinner } from '../components/Spinner';
import { getRankingByGroup } from '../firebase/fixtureQueries';
import { RankingCard, RankingItem } from '../components/others/RankingCard';
import Swal from 'sweetalert2';
import { getAllFixtures, setUserScore } from '../firebase/scoreQueries';

const HomePage: NextPage = () => {

    const { user, userFixture } = useContext(AuthContext);
    const { push } = useRouter();
    const [rankingState, setRankigState] = useState<RankingItem[]>([]);

    useEffect(() => {
        getRankingUsers();
    }, []);
    const getRankingUsers = async () => {
        if (userFixture?.grupo) {
            const resp = await getRankingByGroup(userFixture.grupo, 8);
            setTimeout(() => {
                setRankigState(resp.data);
            }, 500);
        }
    }

    const funcionNoDisponible = () => {
        return Swal.fire({
            icon: 'info',
            title: 'Esta funcion todavia no se encuentra disponible'
        })
    }

    const goToFixture = () => {
        if (userFixture && user?.uid) {
            return push(`/fixture/${user.uid}`);
        }
        push(`usuario/fixture`);
    }

    const handleBackend = async() => {
        const id = 'fixture-user=4oDuWidij2PV52Q1Lu8zKyqjjtp1';
        const puntos = 500;
        const match = {
            faseId: 'fasegrupos',
            groupId: '1',
            matchId: 'grupos-grupo1-partido1'
        }

        const result = {
            local: 4,
            visitor: 3,
        }
        
       // await setUserScore(id, puntos, match);
       await getAllFixtures(match, result);
    }

    return (
        <Layout>
            <Button onClick={handleBackend}>Actualizar puntaje</Button>
            <HeaderHello>
                {user &&
                    <>
                        <HelloText>Hola, <span>{firstLetterToCapitalize(user.name)}</span></HelloText>
                        <Avatar w={60} h={60} onClick={() => push('/usuario/perfil')}>
                            <Image width={'60px'} height={'60px'}
                                style={{ borderRadius: '100%' }}
                                src={(user.photoURL !== '') ? user.photoURL : require('../assets/user.png')} />
                        </Avatar>
                    </>
                }
            </HeaderHello>
            <br />
            <Container>
                <FixtureCard onClick={goToFixture}>
                    <CardImage>
                        <Image src={require('../assets/growth.png')} />
                    </CardImage>
                    <Coin >
                        <Image src={require('../assets/coin.png')} />
                    </Coin>
                    <CardText>
                        <h2>Tu Fixture</h2>
                        {user && <h3>Puntos: {user.score.total}</h3>}
                    </CardText>
                </FixtureCard>



                <ButtonsContainer>
                    <ButtonLink onClick={funcionNoDisponible}>
                        <Image src={require('../assets/app.png')} />
                    </ButtonLink>
                    <ButtonLink onClick={funcionNoDisponible}>
                        <Image src={require('../assets/light-bulb.png')} />
                    </ButtonLink>
                    <ButtonLink onClick={funcionNoDisponible}>
                        <Image src={require('../assets/trophy.png')} />
                    </ButtonLink>
                </ButtonsContainer>

                <Title>Ranking
                    <span onClick={getRankingUsers}>{rankingState.length > 0 ? 'actualizar' : 'mostrar'}</span>
                </Title>
                <RankingContainer>
                    {(rankingState.length > 0) &&
                        <>
                            {
                                rankingState.map(rank => (
                                    <RankingCard
                                        key={rank.fixtureId}
                                        userData={rank.userData}
                                    />
                                ))
                            }
                            <Button block onClick={() => push('/fixture/ranking')}>ver mas</Button>
                        </>
                    }
                </RankingContainer>

            </Container>

        </Layout>
    )
}
export default HomePage;


