import { NextPage } from 'next';
import React from 'react';
import { Button } from '../components/Global.module';
import { setScore } from '../firebase/scoreQueries';

interface Match {
    faseId: string;
    groupId: string;
    matchId: string;
}
interface CorrectResult {
    local: number;
    visitor: number;
}

const dataPatido:Match = {
    faseId: 'fasegrupos',
    groupId: '3',
    matchId: 'grupos-grupo3-partido6'
}
const resultado:CorrectResult = {
    local: 1,
    visitor: 3
}

const SeteadorDePuntos: NextPage = () => {

  const handleSetScore = async() => {
    const resp = await setScore(dataPatido, resultado); 
  } 
  return (
   
    <Button onClick={handleSetScore}>Setear Puntos</Button>
  )
}

export default SeteadorDePuntos;
