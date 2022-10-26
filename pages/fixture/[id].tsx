import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Layout } from '../../components/Layout';
import { FixtureCards } from '../../components/FixtureCards';
import { getFixtureByUid } from '../../firebase/fixtureQueries';
import { Spinner } from '../../components/Spinner';
import Swal from 'sweetalert2';
import { Group } from '../../interfaces';
import { ordernarArray } from '../../helpers';

interface Response {
  ok: boolean;
  data: RespFixture;
  msg: string;
}
interface RespFixture {
  fixture: Fixture | any;
  fecha?: {
    dia: string;
    mes: string;
  }
}
interface Fixture {
  id: number;
  title: string;
  groups: Group[];
}

const FixturePage: NextPage = () => {

  const [fixtureState, setFixtureState] = useState<Fixture[]>();
  const { query } = useRouter();

  useEffect(() => {
    if (query.id) {
      getFixture(query.id?.toString());
    }
  }, [query]);

  const getFixture = async (id: string = '') => {
    const resp: Response = await getFixtureByUid(id);

    if (resp.ok) {
      const fixtureReps = ordernarArray(Object.values(resp.data.fixture), 'id');
      setFixtureState(fixtureReps);

    } else {
      return Swal.fire({
        icon: 'error',
        title: resp.msg,
      });
    }
  }

  return (
    <Layout>
      {
        (fixtureState) ?
          <FixtureCards
            fases={fixtureState}
          />
          :
          <div className='spinner'>
            <Spinner />
          </div>
      }
    </Layout>
  )
}

export default FixturePage;                                                                                         
