import React, { useContext, useEffect, useState } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Avatar, Button, Coin, HeaderHello, HelloText, RankingContainer, Title, } from '../components/Global.module';
import { ButtonLink, ButtonsContainer, CardImage, CardText, Container, FixtureCard } from '../components/Home.module';
import { Layout } from '../components/Layout';
import { AuthContext } from '../context/authContext';
import { firstLetterToCapitalize } from '../helpers';
import { getRankingByGroup } from '../firebase/fixtureQueries';
import { RankingCard, RankingItem } from '../components/others/RankingCard';
import Swal from 'sweetalert2';
import { Spinner } from '../components/Spinner';

const HomePage: NextPage = () => {

    const { user, userFixture } = useContext(AuthContext);
    const { push } = useRouter();
    const [rankingState, setRankigState] = useState<RankingItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        getRankingUsers();
    }, []);

    const getRankingUsers = async () => {
        if (userFixture?.grupo) {
            setIsLoading(true);
            const resp = await getRankingByGroup(userFixture.grupo, 8);
            setRankigState(resp.data);
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
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

    const alertaSinGrupo = () => {
        if(!userFixture?.grupo){
            return Swal.fire({
                title: 'No podes ver el ranking sin haber creado tu fixture'
            })
        }
    }

    return (
        <Layout>
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
                        {user && <h3>Puntos: {userFixture?.puntos}</h3>}
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
                    <span onClick={() => {getRankingUsers();alertaSinGrupo()}}>{rankingState.length > 0 ? 'actualizar' : 'mostrar'}</span>
                </Title>
                <RankingContainer>
                    {(isLoading) ? <div style={{margin: 'auto', width: '100px'}}><Spinner/></div>
                        :
                        <>
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
                        </>
                    }

                </RankingContainer>

            </Container>

        </Layout>
    )
}
export default HomePage;


