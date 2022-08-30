import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper";
import "swiper/css";
import "swiper/css/effect-cards";
import { FixtureCardItem, Title } from './Fixture.module';
import styled from 'styled-components';
import { FixtureMatchs } from './FixtureMatchs';
import { idToGroupName, ordernarArray } from '../helpers';

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
    groups: Group[];
    octavos: Group[];
    cuartos: Group[];
    semifinal: Group[];
    final: Group[];
    tercerpuesto: Group[];
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
export const FixtureCards = ({ groups, octavos, cuartos, semifinal, final, tercerpuesto }: Props) => {

    return (
        <>
            <MyCards>
                <TitleCard>Fase de Grupos</TitleCard>
                <Swiper
                    effect={"cards"}
                    grabCursor={true}
                    modules={[EffectCards]}
                    className="mySwiper"
                >
                    {
                        groups.map(group => (
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
            <MyCards>
                <TitleCard>Octavos de final</TitleCard>
                <Swiper
                    effect={"cards"}
                    grabCursor={true}
                    modules={[EffectCards]}
                    className="mySwiper"
                >
                    {
                        octavos.map(group => (
                            <SwiperSlide key={group.id}>
                                <FixtureCardItem>
                                    <Title>{`Lado ${idToGroupName(group.id)}`}</Title>
                                    <FixtureMatchs
                                        matches={group.matches}
                                    />
                                </FixtureCardItem>
                            </SwiperSlide>
                        ))
                    }

                </Swiper>
            </MyCards>

            <MyCards>
                <TitleCard>Cuartos de final</TitleCard>
                <Swiper
                    effect={"cards"}
                    grabCursor={true}
                    modules={[EffectCards]}
                    className="mySwiper"
                >
                    {
                        cuartos.map(group => (
                            <SwiperSlide key={group.id}>
                                <FixtureCardItem>
                                    <Title>{`Lado ${idToGroupName(group.id)}`}</Title>
                                    <FixtureMatchs
                                        matches={group.matches}
                                    />
                                </FixtureCardItem>
                            </SwiperSlide>
                        ))
                    }

                </Swiper>
            </MyCards>
            <MyCards>
                <TitleCard>Seminal</TitleCard>
                <Swiper
                    effect={"cards"}
                    grabCursor={true}
                    modules={[EffectCards]}
                    className="mySwiper"
                >
                    {
                        semifinal.map(group => (
                            <SwiperSlide key={group.id}>
                                <FixtureCardItem>
                                    <Title>{`Lado ${idToGroupName(group.id)}`}</Title>
                                    <FixtureMatchs
                                        matches={group.matches}
                                    />
                                </FixtureCardItem>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </MyCards>

            <MyCards>
                <TitleCard>Final</TitleCard>
                {
                    final.map(group => (
                        <SwiperSlide key={group.id}>
                            <FixtureCardItem>
                                <Title>Final</Title>
                                <FixtureMatchs
                                    matches={group.matches}
                                />
                            </FixtureCardItem>
                        </SwiperSlide>
                    ))
                }
            </MyCards>
            <MyCards>
                <TitleCard>Tercer Puesto</TitleCard>
                {
                    tercerpuesto.map(group => (
                        <SwiperSlide key={group.id}>
                            <FixtureCardItem>
                                <Title>Tercer Puesto</Title>
                                <FixtureMatchs
                                    matches={group.matches}
                                />
                            </FixtureCardItem>
                        </SwiperSlide>
                    ))
                }
            </MyCards>
        </>
    )
}
