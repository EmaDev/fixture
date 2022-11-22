import { NextPage } from 'next';
import React, {useState} from 'react';
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

const dataPatido: Match = {
  faseId: 'fasegrupos',
  groupId: '2',
  matchId: 'grupos-grupo2-partido2'
}
const resultado: CorrectResult = {
  local: 1,
  visitor: 1
}

const SeteadorDePuntos: NextPage = () => {

  const [formValues, setFormValues] = useState<Match>({faseId: 'fasegrupos', groupId: '',matchId: ''});
  const [resultadoForm, setResultadoForm] = useState({local: '', visitante: ''});
  
  const handleSetFormValues = ({target}:any) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }

  const handleSetResultadoForm = ({target}:any) => {
    setResultadoForm({
      ...resultadoForm,
      [target.name]: target.value
    })
  }

  const handleSetScore = async () => {
    const resultados: CorrectResult = {
      local: parseInt(resultadoForm.local),
      visitor: parseInt(resultadoForm.visitante)
    }

    console.log(formValues, resultados)
    const resp = await setScore(dataPatido, resultado);
  }
  return (
   <div>
    <br/>
    <form style={{margin: '3rem'}}>
      <div>
        <label>groupId</label>
        <input 
        name='groupId'
        value={formValues.groupId}
        onChange={handleSetFormValues}
        placeholder='ej: 2'/>
      </div>
      <div>
        <label>matchId</label>
        <input 
         name='matchId'
         value={formValues.matchId}
         onChange={handleSetFormValues}
        placeholder='ej: grupos-grupo2-partido2'/>
      </div>
      <h2>Resultado</h2>
      <label>Local</label>
      <input
      name='local'
      value={resultadoForm.local}
      onChange={handleSetResultadoForm}
      />
      <br/>
      <label>Visitante</label>
      <input
       name='visitante'
       value={resultadoForm.visitante}
       onChange={handleSetResultadoForm}
      />
    </form>
    <Button onClick={handleSetScore}>Setear Puntos</Button>
   </div>
 
  )
}

export default SeteadorDePuntos;
