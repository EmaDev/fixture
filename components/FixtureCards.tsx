import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper";
import "swiper/css";
import "swiper/css/effect-cards";
import { FixtureCardItem, Title } from './Fixture.module';
import styled from 'styled-components';
import { FixtureMatchs } from './FixtureMatchs';
import { FixtureState } from '../context/creatorReducer';
import { idToGroupName } from '../helpers';

const MyCards = styled.div`
   position: abolute;
   width: 100%; 
   max-width: 600px; 
   top: 0; bottom: 0;
   right: 0; left: 0;
   margin: auto;
   padding: 1rem;
   overflow-x: auto;
`;

const TitleCard = styled.h1`
  font-size: 2.8rem;
  font-weight: 700;
  margin: 1rem 0;
  text-align:center; 
  color: #e1e1e1;
`;

interface Props {
    fases: Fase[];
}
interface Fase {
    id: number;
    title: string;
    groups: Group[];
}
interface Group {
    id: string;
    matches: Match[];
}
interface Match {
    id: string;
    local: any;
    visitor: any;
}
export const FixtureCards = ({ fases }: Props) => {

    const showCardComponent = (fase: Fase) => {

        if (fase.groups.length < 1) {
            return (null)
        }
        return (
            <MyCards id={`${fase.id}${fase.title}`}>
                <TitleCard>{fase.title}</TitleCard>
                <Swiper
                    effect={"cards"}
                    grabCursor={true}
                    modules={[EffectCards]}
                    className="mySwiper"
                >
                    {
                        fase.groups.map(group => (
                            <SwiperSlide key={group.id}>
                                <FixtureCardItem>
                                    <Title>{`Grupo ${idToGroupName(group.id)}`}</Title>
                                    <FixtureMatchs
                                        matches={group.matches}
                                    />
                                </FixtureCardItem>
                            </SwiperSlide>
                        ))
                    }

                </Swiper>
            </MyCards>
        )
    }

    return (
        <>{
            fases.map(fase => {
                return showCardComponent(fase)
            })
        }</>
    )
}