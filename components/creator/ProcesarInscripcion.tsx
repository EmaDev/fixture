import { useRouter } from 'next/router';
import React, { useEffect, useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/authContext';
import { CreatorContext } from '../../context/CreatorContext';
import { createUserFixture, verifyIfGroupExist } from '../../firebase/fixtureCreatorQueries';
import { getGruposCreadosPorUnUsaurio } from '../../firebase/fixtureQueries';
import { Spinner } from '../Spinner';

const Container = styled.div`
   width: 90%;
   padding: 1rem;
   margin:auto;
   background-color: #e1e1e1;
   border-radius: 6px;
   color: #1c1c1c;
   position: relative;
   max-width: 500px;
   label{
    font-weight: 700;
    font-size: 1.8rem;
   }
   form{
    padding: 1rem;
   }
`;
const Title = styled.h2`
   text-align: center;
   font-size: 2.8rem;
   font-weight: 700;
`;
const Input = styled.input`
   width: 100%;
   margin:auto;
   padding: 1rem;
   border-style: none;
   border: 1px solid grey;
   border-radius: 4px;
   color: #000;
   margin: 1rem 0;
   box-shadow: 1px 1px 8px #989898;
`;

const Question = styled.label`
   font-size: 1.6rem !important;
   color: #1964a1;
   font-weight: 500;
   margin: 1rem;

   &:hover{
    color: #0f4068;
    text-decoration: underline;
   }
`;

const Button = styled.div`
   width: 90%;
   display: block;
   margin: 2rem auto;
   padding: 1rem;
   border-style: none;
   background-color: #630f2c;
   color: #fff;
   text-align:center;
   border-radius: 4px;
   font-size: 1.6rem;
   font-weight: 700;

   &:hover{
    background-color: #520c24;
    box-shadow: 1px 1px 8px #000;
    transition: .3s ease all;
   }
`;

const Seperator = styled.p`
   width: 100%;
   margin: 1rem auto;
   text-align: center;
   font-size: 1.8rem;
   position: relative;
   &:after{
    position:absolute;
    content: " ";
    background-color: #1c1c1c;
    width: 40%;
    height: 1px; 
    top: 0; bottom: 0;
    right: 0;
    margin: auto 1rem;
   }
   &:before{
    position:absolute;
    content: " ";
    background-color: #1c1c1c;
    width: 40%;
    height: 1px; 
    top: 0; bottom: 0;
    left: 0;
    margin: auto 1rem;
   }
`;

const Select = styled.select`
width: 100%;
margin:auto;
padding: 1rem;
border-style: none;
border: 1px solid grey;
border-radius: 4px;
color: #000;
margin: 1rem 0;
box-shadow: 1px 1px 8px #989898;
option{
    border-radius: 6px;
    width: 100%;
}
`;

export const ProcesarInscripcion = () => {

    const { user } = useContext(AuthContext);
    const { fixtureState } = useContext(CreatorContext);
    const { push } = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [misGruposState, setMisGruposState] = useState<any[]>([]);
    
    const inputValue: any = useRef(null);

    useEffect(() => {
        Swal.fire({
            icon: 'success',
            title: 'Fixture creado',
            text: 'Ahora podes unirte a un grupo!',
        })
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const groupId = inputValue.current.value;
        
        if(!groupId){
            return Swal.fire({
                title: 'Ingresa un codigo'
            })
        }
        setIsLoading(true);

        if (user?.uid) {
            
            const resp = await verifyIfGroupExist(groupId);

            if (!resp.ok) {
                setIsLoading(false);
                return Swal.fire({
                    icon: 'error',
                    title: 'Grupo no encontrado',
                    text: 'Intenta con un codigo de grupo valido!',
                });
            } else {
                const { ok, msg } = await createUserFixture(fixtureState, user.uid, inputValue.current.value);
                if (ok) {
                    return push('/home');
                }
            }

        }
        setIsLoading(false);
    }

    const handleSinGrupo = () => {
        return Swal.fire({
            icon: 'info',
            title: `Podes crear tu propio grupo o parcipar
            en un grupo global con todos los usuarios sin un grupo asignado`
        })
    }

    const getMisGrupos = async() => {
        if(user?.uid){
            const resp = await getGruposCreadosPorUnUsaurio(user.uid);
            setMisGruposState(resp);
        }
    }

    getMisGrupos();
    return (
        <Container>
            <Title>Unite a un grupo</Title>
            <form>
                <label>Codigo de grupo</label>
                <Input placeholder='Ingresa el codigo'
                    ref={inputValue}
                />
                {(misGruposState.length > 0) && 
                <Select>
                    {misGruposState.map( grupo => (
                        <option key={grupo.id}>{grupo.nombre}</option>
                    ))}
                </Select>
                }
                {(isLoading) ?
                    <div style={{ margin: '1rem auto', display: 'flex', justifyContent: 'center' }}><Spinner /></div>
                    :
                    <>
                        <Question onClick={handleSinGrupo}>No tenes un codigo?</Question>
                        <Button onClick={handleSubmit}>Unirse</Button>
                    </>

                }

            </form>
            <Seperator>0</Seperator>
            {!isLoading && <Question>Unirse sin un grupo</Question>}
        </Container>
    )
}
