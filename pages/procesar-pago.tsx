import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Layout } from '../components/Layout';
import styled from 'styled-components';
import { Spinner } from '../components/Spinner';

type Status =
    | 'approved'
    | 'rejected'
    | 'pending';

const Contianer = styled.section`
   height: 90vh;
   display: flex;
   justify-content:center;
   align-items:center;
   margin: auto;
`;

const ResultPayment = styled.div`
  max-width: 400px;
  background-color: #e1e1e1;
  padding: 2rem;
  border-radius: 6px;
  box-shadow: 1px 1px 4px #565656;
`;

const ResultTitle = styled.p`
   text-align:center;
   font-size: 2rem;
   color: #737373;
   font-weight: 700;
`;
const ResultStatus = styled.h2`
   text-align:center;
   font-size: 2.8rem;
   color: #737373;
`;

const Button = styled.button`
   display: block;
   width: 90%;
   margin: 2rem auto;
   margin-bottom:1rem;
   font-size: 1.8rem;
   font-weight: 700;
   padding: 1rem;
   color: #e1e1e1;
   background-color: #550c25;
   border-radius: 6px;
   border-style:none;
`;

const ProcesarPago: NextPage = () => {
    const [paymentStatus, setPaymentStatus] = useState<Status>();
    const { query, push } = useRouter();

    useEffect(() => {
        if (query.payment_id) {
            getPaymentStatus();
        }
    }, [query]);

    useEffect( () => {
        //TODO: Guardar respuest en la base de datos
    },[]);

    const getPaymentStatus = async () => {

        const paymentId = query.payment_id;
        const req = await fetch(`http://localhost:4000/api/mercado-pago/procesado?payment_id=${paymentId}`)
        const res = await req.json();
        if (res.ok) {
            setPaymentStatus(res.data.status);
        }
    }

    const translateRespose = (status:Status) => {
        switch (status) {
            case 'approved':
                return 'Aprobado';
            case 'pending': 
                return 'Pendiente';
            default:
                return 'Rechazado';
        };
    }

    return (
        <Layout>
            <Contianer>
                {
                    paymentStatus ?
                        <ResultPayment>
                            <ResultTitle>
                                El estado de tu pago es: 
                            </ResultTitle>
                            <ResultStatus>{translateRespose(paymentStatus)}</ResultStatus>
                            <Button onClick={() => push('/home')}>Ir al inicio</Button>
                        </ResultPayment>
                        :
                        <Spinner />
                }
            </Contianer>
        </Layout>
    )
}

export default ProcesarPago;
