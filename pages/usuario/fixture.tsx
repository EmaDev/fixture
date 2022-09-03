import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { Button, NoFixtureContainer } from '../../components/Global.module';
import { Layout } from '../../components/Layout';
import { Spinner } from '../../components/Spinner';
import { AuthContext } from '../../context/authContext';
import { FixtureState } from '../../context/creatorReducer';
import { getFixtureByUid } from '../../firebase/fixtureQueries';

const FixturePage: NextPage = () => {

    const { isAuthenticated, user } = useContext(AuthContext);
    const [fixtureState, setFixtureState] = useState<FixtureState>();
    const [isLoading, setIsLoading] = useState(false);
    const { push } = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            push('/');
        }
    }, []);

    useEffect(() => {
        getFixtureByDb();
    }, []);
    const getFixtureByDb = async () => {
        if (user) {
            setIsLoading(true);
            const resp = await getFixtureByUid(user.uid);
            if (resp.ok) {
                setFixtureState(resp.data);
                push(`/fixture/${user.uid}`);
            }
            setIsLoading(false);
        }
    }

    return (
        <Layout>
            {
                (isLoading) ?
                    <div className='spinner'>
                        <Spinner />
                    </div>
                    :
                    <>
                        {(!fixtureState) &&
                            <NoFixtureContainer>
                                <h1>No tenes un fixture creado</h1>
                                <Button>Crea tu fixture</Button>
                            </NoFixtureContainer>

                        }
                    </>
            }
        </Layout>
    )
}

export default FixturePage;
