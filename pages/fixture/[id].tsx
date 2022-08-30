import { useContext, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Layout } from '../../components/Layout';
import { AuthContext } from '../../context/authContext';
import { FixtureCards } from '../../components/FixtureCards';
import { getFixtureByUid } from '../../firebase/fixtureQueries';
import { FixtureState } from '../../context/creatorReducer';

interface Response {
  ok: boolean;
  data: RespFixture;
  msg: string;
}
interface RespFixture {
  fixture: FixtureState;
  grupo: string | null;
  user: string;
  fecha: {
    dia: string;
    mes: string;
  }
}

const FixturePage: NextPage = () => {

  const [fixtureState, setFixtureState] = useState<RespFixture>();
  const { isAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    getFixture();
    if (isAuthenticated) {

    }
  }, []);

  const getFixture = async () => {
    const resp: Response = await getFixtureByUid('pepito');

    if (!resp.ok) {
      console.log(resp.msg);
      return;
    }
    setFixtureState(resp.data);
  }

  return (
    <Layout>
      {
        (fixtureState) &&
        <FixtureCards
          groups={fixtureState.fixture.fasegrupos.groups}
          octavos={fixtureState.fixture.octavos.groups}
          cuartos={fixtureState.fixture.cuartos.groups}
          semifinal={fixtureState.fixture.semifinal.groups}
          final={fixtureState.fixture.final.groups}
          tercerpuesto={fixtureState.fixture.tercerpuesto.groups}
        />
      }
    </Layout>
  )
}

export default FixturePage;                                                                                         
