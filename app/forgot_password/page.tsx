"use client"

import Image from "next/image";
import ButtonBack from "../components/buttonBack";
import { Box, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useState, useEffect, useTransition } from 'react';
import ButtonGreen from "../components/buttonGreen";
import Link from "next/link";
import LoadingSpinner from '../components/loadingSpinner';

export default function ForgotPassword() {
    const { register, handleSubmit, setValue } = useForm()
    const [emailError, setEmailError] = useState("");

    const emailPattern = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i

    const handleFormSubmit = async (formData: any) => {
        if (!emailPattern.test(formData.email)) {
            setEmailError("Informe um email válido")
            return false;
        }
    }

    const [isPending, startTransition] = useTransition();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handlePageLoad = () => {
          startTransition(() => {
            setLoading(false);
          });
        };
    
        if (document.readyState === 'complete') {
          handlePageLoad();
        } else {
          window.addEventListener('load', handlePageLoad);
          return () => window.removeEventListener('load', handlePageLoad);
        }
      }, []);

    return (
        <>
            {loading || isPending ? (
                <LoadingSpinner />
            ) : (
                <main className="flex-1 bg-[#FFFFFF]">
                    <div>
                        <ButtonBack />
                    </div>
                    <div className="flex justify-center">
                        <Image
                            src="/images/penatrilha_logo_w.png"
                            alt="logo pe na trilha"
                            width={300}
                            height={300}
                        />
                    </div>
                    <div>
                        <h1 className="text-[#4D5D47] mb-4 text-2xl lg:text-4xl uppercase font-bold text-center tracking-widest">Esqueceu a senha?</h1>
                    </div>
                    <div className='flex flex-col items-center justify-start'>
                        <p className='m-1 w-[35ch] text-[#C1C1C1] text-center text-base'>
                            Informe seu e-mail e nós enviaremos o passo-a-passo para redefinir a senha.
                        </p>
                    </div>
                    <div className="text-center mt-11">
                        <Box
                            component="form"
                            onSubmit={handleSubmit(handleFormSubmit)}
                            sx={{ display: 'block', p: 1, m: 1 }}>
                            <div>
                                <TextField
                                    error={emailError && emailError.length ? true : false}
                                    label="Email"
                                    id="input_email"
                                    sx={{ m: 1, width: '35ch' }}
                                    variant="standard"
                                    required
                                    autoFocus
                                    helperText={emailError}
                                    {...register('email')}
                                />
                            </div>
                        </Box>
                    </div>
                    <div className="flex justify-center mt-12 text-center font-bold text-9xl tracking-wider">
                        <ButtonGreen width='35ch' href='#'>ENVIAR</ButtonGreen>
                    </div>
                    <div className='mt-20 flex flex-col items-center gap-1'>
                        <label className="w-[35ch] text-[#C1C1C1] text-center text-sm"> Ainda não tem cadastro? </label>
                        <Link className="font-bold" id='link_register' href="/register">CADASTRE-SE</Link>
                    </div>
                </main>
            )}
        </>
    )
}