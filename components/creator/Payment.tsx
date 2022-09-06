import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { HiLockClosed } from 'react-icons/hi';
import { ImCreditCard } from 'react-icons/im';
import { ImageMetodoPago, ModalPagoDescription, ModalProcesarPago, PrimaryButton, TerminosPago } from '../Fixture.module';
import { Spinner } from '../Spinner';
import styled from 'styled-components';

const ButtonMp = styled.div<any>`
   padding: ${({noPadd}) => noPadd ? '' : '1rem'};
   width: 60%;
   background-color: #009ee3;
   border-radius: 6px;
   margin: 1rem auto;
   display:flex;
   align-items:center;
   justify-content:center;
`;
export const Payment = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const btnMpRef: any = useRef(null);

    useEffect(() => {
        procesarPedido();
    }, []);

    const procesarPedido = async () => {

        const req = await fetch(`http://localhost:4000/api/mercado-pago/pagar`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: 'POST',
            body: JSON.stringify({

                nickname: 'emanuel fabricio',
                email: 'rumpentinski@gmail.com',
                carrito: [{
                    id: 'fixture-inscripcion',
                    precio: 500,
                    cantidad: 1
                }]
            })

        });

        const resp = await req.json();
        console.log(resp);
        const script = document.createElement("script");
        setIsLoading(false);
        if (resp.ok) {
            const preferenceId = resp.preferenceId;
            script.src = "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
            script.type = "text/javascript";
            script.dataset.preferenceId = preferenceId;
            script.setAttribute("data-button-label", "PROCESAR PAGO");

            if (btnMpRef.current.childNodes.length == 0) {
                btnMpRef.current.appendChild(script);
            }

        } else {
            console.log(resp);
        }
    };


    return (
        <ModalProcesarPago>
            <ModalPagoDescription>
                <h3>Tu fixture</h3>
                <TerminosPago>
                    <div><ImCreditCard size={'5rem'} /></div>
                    <p>Para participar en el prode tiene que abonar el costo de inscripcion</p>
                </TerminosPago>
                <div>
                    <p>Inscripcion</p>
                    <p>$ 500</p>
                </div>
                <div>
                    <p style={{ color: '#599E3D' }}><span style={{ margin: '0 1rem' }}>Pago</span><HiLockClosed /></p>
                    <ImageMetodoPago><Image style={{ width: '90%' }} src={require('../../assets/mp.png')} /></ImageMetodoPago>
                </div>
            </ModalPagoDescription>
            {
                (isLoading) && <ButtonMp><Spinner mini /></ButtonMp>
            }
            <p style={{color: 'gray'}}>Seras redirigido a una ventana segura de mercado pago</p>
            <ButtonMp ref={btnMpRef} noPadd/>
        </ModalProcesarPago>
    )
}
