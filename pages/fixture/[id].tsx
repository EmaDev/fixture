import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Layout } from '../../components/Layout';
import { FixtureCards } from '../../components/FixtureCards';
import { getFixtureByUid } from '../../firebase/fixtureQueries';
import { Spinner } from '../../components/Spinner';
import Swal from 'sweetalert2';
import { Group } from '../../interfaces';
import { firstLetterToCapitalize, ordernarArray } from '../../helpers';
import { getUserData } from '../../firebase/authQueries';
import { allGroups } from '../../assets/countries/groups';
import styled from 'styled-components';
import { BiDownArrow } from 'react-icons/bi';

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
  puntos: number;
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
    history: []
  }
}

const ItemHistorial = styled.div`
   margin: .5rem;
   border-bottom: 1px solid #270511;
   display: flex;
   justify-content: space-between;
   div{
    display: flex;
    align-items: center;
    margin: .6rem;
   }
   p{
    margin: 0 1rem;
    span{
      font-size: 1.8rem;
      color: #e1e1e1;
      margin: 0 .6rem;
    }
   }
  span{
    font-size: 2rem;
    font-weight: 600;
  }  
`;
const FixturePage: NextPage = () => {

  const [fixtureState, setFixtureState] = useState<Fixture[]>();
  const [puntosState, setPuntoState] = useState<number>(-1);
  const [historialState, setHistorialState] = useState<Historial[]>([]);
  const [userData, setUserData] = useState<DataUsuario>({ name: '', score: { history: [], total: 0 } });
  const { query } = useRouter();
  const [stateMostrarHistoria, setMostrarHistorial] = useState<boolean>(true);

  useEffect(() => {
    if (query.id) {
      getFixture(query.id?.toString());
      getDatosDeUsuario(query.id?.toString());
    }
  }, [query]);

  const getFixture = async (id: string = '') => {
    const resp: Response = await getFixtureByUid(id);
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

  const getDatosDeUsuario = async (uid: string) => {
    const resp = await getUserData(uid);
    if (resp.ok) {
      setUserData(resp.data);
    }
  }

  const construirHistorial = () => {
    interface HistoriaItem {
      fecha: any;
      local: { nombre: string, goles: number }
      visitante: { nombre: string, goles: number }
      puntos: number;
    }
    const arrHistoria: HistoriaItem[] = [];

    historialState.forEach(partidoActual => {
      const grupoBuscado = allGroups.find(grupo => grupo.id === partidoActual.match.groupId);
      const partidoBuscado = grupoBuscado?.matches.find(match => match.id === partidoActual.match.matchId);
      arrHistoria.push({
        fecha: partidoActual.fecha,
        local: { nombre: firstLetterToCapitalize(partidoBuscado?.local.name || ''), goles: partidoActual.real.local },
        visitante: { nombre: firstLetterToCapitalize(partidoBuscado?.visitor.name || ''), goles: partidoActual.real.visitor },
        puntos: partidoActual.puntos
      })

    });

    return (
      arrHistoria.map( (item, i) => (
        <ItemHistorial key={item.local.nombre+item.visitante.goles+i}>
          <div>
            <p>{item.local.nombre}</p>
            <span>{`${item.local.goles} - ${item.visitante.goles}`}</span>
            <p>{item.visitante.nombre}</p>
          </div>
          <span> + {item.puntos}</span>
        </ItemHistorial>
      ))
    )
  }

  return (
    <Layout>
      {
        (fixtureState) ?
          <>
            <FixtureCards
              fases={fixtureState}
              userData={userData}
              puntaje={puntosState}
            />

            <div style={{ margin: '-2rem 3rem', marginBottom: '4rem' }}>
              <h4 onClick={() => {setMostrarHistorial(!stateMostrarHistoria)}}>Historial de puntos <BiDownArrow style={{ marginLeft: '1rem' }} /></h4>
              {stateMostrarHistoria &&
                <>
                  <h5 style={{ margin: '.3rem', marginTop: '-1rem' }}>Resultados correctos de cada partido</h5>
                  {construirHistorial()}
                </>
              }
            </div>

          </>
          :
          <div className='spinner'>
            <Spinner />
          </div>
      }


    </Layout>
  )
}

export default FixturePage;                                                                                         
