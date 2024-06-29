"use client"

import * as React from 'react';
import { useState, useEffect, useTransition } from 'react';
import Box from '@mui/material/Box';
import Link from "next/link";
import Image from 'next/image';
import ButtonGreen from '../components/buttonGreen';
import LoadingSpinner from '../components/loadingSpinner';

export default function Success_Register(){   
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
                <main className="flex flex-col h-screen min-h-screen bg-[#F8F8F8] container mx-auto">
                    <div className='absolute sm:w-50 sm:h-50 w-70 h-70 lg:w-100 lg:h-100 top-0 right-0 z-100'>
                        <Image
                            src="/images/img_abs_01.png"
                            alt="forma abstrata"
                            width={160}
                            height={160}
                        />
                    </div>
                    <div className='col-span-12 lg:col-span-5 grid place-items-center mt-10'>
                        <Image
                            src="/images/penatrilha_logo_w_sf.png"
                            alt="logo pe na trilha"
                            width={300}
                            height={300}
                        />
                    </div>
                    <div className='col-span-12 lg:col-span-5 grid place-items-center mt-10'>
                        <Image
                            src="/images/check_mark.png"
                            alt="imagem verde com um simbolo de check"
                            width={100}
                            height={100}
                        />
                    </div>
                    <div className='col-span-12 lg:col-span-5 grid place-items-center'>
                        <h1 className="text-[#4D5D47] mb-0 text-2xl lg:text-3xl uppercase font-bold text-center mt-5">Cadastro<br/>realizado com</h1>
                        <h1 className="text-[#FFD21D] mb-4 text-3xl lg:text-4xl uppercase font-bold text-center">sucesso</h1>
                    </div>
                    <div className="text-center">
                        <Box 
                            component="form" 
                            sx={{ display: 'block', p: 1, m: 1, }}>
                            <div className='mt-1'>
                                <ButtonGreen width= '40ch' href="../create_account">EDITAR PERFIL</ButtonGreen>
                            </div>
                            <div>
                                <p className="text-[#C1C1C1]">ou</p>
                                <Link href="../home">COMEÇAR A EXPLORAR</Link>
                            </div>
                        </Box>
                    </div>
                </main>
            )}
        </>
    );
}