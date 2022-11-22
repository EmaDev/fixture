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
import { getUserData } from '../../firebase/authQueries';
import {allGroups} from '../../assets/countries/groups';

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
  puntos: number;
  historial: Historial[];
}
interface Historial {
  fecha: any;
  match: {
    matchId: string;
    groupId: string
  };
  real: {
    local: number;
    visitor: number;
  },
  puntos:number;
}
interface Fixture {
  id: number;
  title: string;
  groups: Group[];
}

interface DataUsuario {
  name: string;
  score: {
    total: number;
    history:[]
  }
}

const FixturePage: NextPage = () => {

  const [fixtureState, setFixtureState] = useState<Fixture[]>();
  const [puntosState, setPuntoState] = useState<number>(-1);
  const [historialState, setHistorialState] = useState<Historial[]>([]);
  const [userData, setUserData] = useState<DataUsuario>({name: '',score: {history:[], total: 0}}); 
  const { query } = useRouter();

  useEffect(() => {
    if (query.id) {
      getFixture(query.id?.toString());
      getDatosDeUsuario(query.id?.toString());
    }
  }, [query]);

  const getFixture = async (id: string = '') => {
    const resp: Response = await getFixtureByUid(id);
    console.log(resp);
    if (resp.ok) {
      setPuntoState(resp.data.puntos);
      const fixtureReps = ordernarArray(Object.values(resp.data.fixture), 'id');
      setFixtureState(fixtureReps);
      setHistorialState(resp.data.historial);
    } else {
      return Swal.fire({
        icon: 'error',
        title: resp.msg,
      });
    }
  }

  const getDatosDeUsuario = async(uid:string) => {
   const resp =  await getUserData(uid);
   if(resp.ok){
    setUserData(resp.data);
   }
  }

  const construirHistorial = () => {
    const arrHistoria:any = [];

    historialState.forEach(partidoActual => {
      const grupoBuscado = allGroups.find( grupo => grupo.id === partidoActual.match.groupId);
      const partidoBuscado = grupoBuscado?.matches.find( match => match.id === partidoActual.match.matchId);
      arrHistoria.push({
        fecha: partidoActual.fecha,
        local: {nombre: partidoBuscado?.local.name, goles: partidoActual.real.local},
        visitante: {nombre: partidoBuscado?.visitor.name, goles: partidoActual.real.visitor},
        puntos: partidoActual.puntos
      })

    });
   
    console.log(arrHistoria);
  }

  return (
    <Layout>
      {
        (fixtureState) ?
          <FixtureCards
            fases={fixtureState}
            userData={userData}
            puntaje={puntosState}
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
