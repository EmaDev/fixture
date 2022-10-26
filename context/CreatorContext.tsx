import React, { createContext, useReducer, useState } from 'react';
import { allGroups } from '../assets/countries/groups';
import { createProdeGroup } from '../firebase/fixtureCreatorQueries';
import { FaseInterface, Match } from '../interfaces';
import { creatorReducer, Fase, FixtureState } from './creatorReducer';

interface CreatorContextProps {
  fixtureState: FixtureState, 
  groupProde: string;
  isLoading?: boolean;
  currentStep: Fase;
  setCurrentStep: (step:Fase) => void;
  setMatch: (fase:Fase, groupId: string, match: Match) => void;
  setFase: (fase: Fase, data: FaseInterface) => void;
  createNewGroup: (uid:string,name:string, descrip:string) => any;
}

const initialFase: FaseInterface = {
  id: 1,
  title: 'Fase de grupos',
  groups: allGroups
}
const finalsFaseInitial: FaseInterface = {
  id: 2,
  title: 'Octavos de final',
  groups: []
}
const initialFixture:FixtureState = {
  fasegrupos: initialFase,
  octavos:finalsFaseInitial,
  cuartos:finalsFaseInitial,
  semifinal:finalsFaseInitial,
  final:finalsFaseInitial,
  tercerpuesto:finalsFaseInitial
}
export const CreatorContext = createContext({} as CreatorContextProps);

export const CreatorProvider = ({children}:any) => {

  const [fixtureState, dispatch] = useReducer( creatorReducer, initialFixture);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [groupProde, setGroupProde] = useState<string>('');
  const [currentStep, setStep] = useState<Fase>('fasegrupos');
  
  const setCurrentStep = (step:Fase) => {
    setStep(step);
  }
  const setMatch = (fase:Fase, groupId: string, match: Match) => {
    dispatch({type: 'setMatch', payload:{fase, groupId, match}})
  }

  const setFase = (fase: Fase, data: FaseInterface) => {
    dispatch({type: 'setFase', payload: {fase, data}});
  }

  const createNewGroup = async(uid:string,name: string, descrip: string = '') => {
    
    setIsLoading(true);
    const resp = await createProdeGroup(uid,name, descrip);
    if(resp.ok){
      setGroupProde(resp.groupId || '');
    }
    setIsLoading(false);
    
    return {
      ok: resp.ok,
      groupId: resp.groupId
    }
  }

  return (
    <CreatorContext.Provider value={{
      fixtureState,
      currentStep,
      groupProde,
      setCurrentStep,
      setMatch, 
      setFase,
      createNewGroup,
    }}>
      {children}
    </CreatorContext.Provider>
  )
}
