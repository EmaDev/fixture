import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { FaQuestionCircle } from 'react-icons/fa';
import { Button, NoFixtureContainer } from '../../components/Global.module';
import { Layout } from '../../components/Layout';
import { Spinner } from '../../components/Spinner';
import { AuthContext } from '../../context/authContext';
import { getFixtureByUid } from '../../firebase/fixtureQueries';
import { opcionesCreacion } from '../../helpers/textModal';
import { ButtonsContainer, Form, Input } from '../../components/Register.module';
import { CreatorContext } from '../../context/CreatorContext';


const IconQuestion = styled.button`
   background: none;
   border-style:none;
   position:absolute;
   right: -5rem;
   bottom: .5rem;
   margin:auto;
   font-size: 2.4rem;
   color: #e1e1e1;
`;



const FixturePage: NextPage = () => {

    const { user } = useContext(AuthContext);
    const { createNewGroup, groupProde } = useContext(CreatorContext);
    const [isLoading, setIsLoading] = useState(true);
    const [formActive, setFormActive] = useState(false);
    const { push } = useRouter();

    useEffect(() => {
        getFixtureByDb();
    }, []);

    const getFixtureByDb = async () => {
        if (user) {
            setIsLoading(true);
            const resp = await getFixtureByUid(user.uid);
            console.log(resp);
            if (resp.ok) {
                return push(`/fixture/${user.uid}`);
            }
            setIsLoading(false);
        }
    }

    const openModal = (option: string) => {
        const data = opcionesCreacion[option];
        Swal.fire({
            icon: 'info',
            title: data.title,
            text: data.description,
        })
    };

    const handleActiveForm = (e: any) => {
        e.preventDefault();
        setFormActive((prev) => !prev);
    };

    const createGroupProde = async (e: any) => {
        e.preventDefault();
        e.target.disabled = true;
        if (user?.uid) {
            const { ok, groupId } = await createNewGroup(user.uid, 'Torneo Pura Gambeta', '');
            if (ok) {
                e.target.disabled = false;
                return Swal.fire({
                    title: `Codigo del grupo: ${groupId}`,
                    text: "Queres continuar creado tu fixture",
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, Crear!',
                    cancelButtonText: 'No, tal vez luego'
                }).then((result) => {
                    if (result.isConfirmed) {
                        return push(`/crear`);
                    }
                })
            }

        }
        e.target.disabled = false;
    }

    if (isLoading) {
        return (
            <div className='spinner'>
                <Spinner />
            </div>
        )
    }
    return (
        <Layout>
            <NoFixtureContainer>
                {
                    (!formActive) ?
                        <>
                            <h1>No tenes un fixture creado</h1>
                            <div style={{ position: 'relative' }}>
                                <Button onClick={() => push('/crear')}>Arma tu fixture</Button>
                                <IconQuestion onClick={() => openModal('solo')}>
                                    <FaQuestionCircle />
                                </IconQuestion>
                            </div>
                            {!groupProde &&
                                <div style={{ position: 'relative' }}>
                                    <Button onClick={handleActiveForm}>Crea tu grupo</Button>
                                    <IconQuestion onClick={() => openModal('grupo')}>
                                        <FaQuestionCircle />
                                    </IconQuestion>
                                </div>}
                        </>
                        :
                        <>
                            {!groupProde &&
                                <Form>
                                    <h2>Nuevo Grupo</h2>
                                    <Input>
                                        <label>Nombre</label><span>*obligatorio</span>
                                        <input type={'text'} placeholder='opcional' />
                                    </Input>
                                    <Input>
                                        <label>Descripcion</label><span>*opcional</span>
                                        <textarea />
                                    </Input>
                                    <ButtonsContainer>
                                        <Button bg='#e23535' onClick={handleActiveForm}>Cancelar</Button>
                                        <Button onClick={createGroupProde}>Crear</Button>

                                    </ButtonsContainer>
                                </Form>
                            }
                        </>

                }
            </NoFixtureContainer>
        </Layout>
    )
}

export default FixturePage;

