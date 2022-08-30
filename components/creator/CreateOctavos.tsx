import React, { useContext, useEffect } from 'react'
import { CreatorContext } from '../../context/CreatorContext';
import { Fase } from '../../context/creatorReducer';
import { firstLetterToCapitalize, orderMatchesOctavos, scoreCalculator } from '../../helpers';
import { FaseInterface, Group, Match } from '../../interfaces';
import { CreateFixtureCard } from '../CreateFixtureCard';
import { StepTitle } from '../Fixture.module';


export const CreateOctavos = () => {

  const { fixtureState, setFase, currentStep} = useContext(CreatorContext);

  useEffect(() => {
      createFaseWithGroups();
  },[]);

  const createFaseWithGroups = () => {
    const prevGroups = fixtureState.fasegrupos;
    const arrGroups:any = [];
    const finalGroups:Group[] = [
      {id: '1', title: 'Lado 1 octavos', matches: []},
      {id: '2', title: 'Lado 2 octavos', matches: []},
    ];

    prevGroups.groups.forEach(group => {
      arrGroups.push(scoreCalculator(group));
    });

    const matches = orderMatchesOctavos(arrGroups);
    
    for(let i = 0; i < matches.length; i++){
      if(i < prevGroups.groups.length / 2){
        finalGroups[0].matches.push(matches[i]);
      }else{
        finalGroups[1].matches.push(matches[i]);
      }
    }
    const octavos: FaseInterface = {
      id: 2,
      title: 'Octavos de final',
      groups: finalGroups
    }
    setFase('octavos', octavos);

  }

  return (
    <>
      <StepTitle>{firstLetterToCapitalize(currentStep)}</StepTitle>
      {
        fixtureState.octavos.groups.map(group => (
          <CreateFixtureCard
            key={group.title + group.id}
            title={group.title}
            id={group.id}
            matches={group.matches}
            lado
            showTitle
          />
        ))
      }

    </>
  )
}
