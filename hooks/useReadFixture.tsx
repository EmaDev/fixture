import React, { useEffect, useState } from 'react';
import { getFaseDeGrupos, getOctavosDeFinal } from '../firebase/fixtureQueries';

export const useReadFixture = (fixtureId: string) => {

  const [faseDeGrupos, setFaseDeGrupos] = useState<any>([]);
  const [octavosDeFinal, setOctavosDeFinal] = useState<any>([]);
  
  useEffect( () => {
    getFaseDeGruposFromDb();
    getOctavosDeFinalFromDb();
  },[]);

  const getFaseDeGruposFromDb = async() => {
    const resp = await getFaseDeGrupos(fixtureId);
    setFaseDeGrupos(resp);
  }

  const getOctavosDeFinalFromDb = async() =>{
    const resp = await getOctavosDeFinal(fixtureId);
    setOctavosDeFinal(resp); 
  }

  return {faseDeGrupos, octavosDeFinal}
}
