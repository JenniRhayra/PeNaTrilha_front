'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Image from 'next/image';
import ButtonGreen from './components/buttonGreen';
import ButtonBlack from './components/buttonBlack';

export default function Start() {
    return (
        <div className="flex flex-col min-h-screen bg-[#90A876]">
            <div className='absolute sm:w-30 sm:h-30 w-50 h-50 lg:w-70 lg:h-70 top-0 left-0 z-100'>
                <Image
                    src="/images/img_abs_03.png"
                    alt="forma abstrata esquerda"
                    width={200}
                    height={200}
                />
            </div>
            <div className='col-span-12 lg:col-span-5 grid place-items-center mt-20'>
                <Image
                    src="/images/penatrilha_logo_g.png"
                    alt="logo pe na trilha"
                    width={500}
                    height={500}
                />
            </div>
            <div className='col-span-12 lg:col-span-5 grid place-items-center my-1'>
                <h1 className="text-[#ffffff] text-2xl lg:text-3xl uppercase font-bold text-center mt-5">Vamos começar?</h1>
            </div>
            <div className="text-center flex-grow">
                <Box
                    component="form"
                    sx={{ m: 1 }}
                >
                    <div>
                        <ButtonBlack width= '35ch' href="/login">FAZER LOGIN</ButtonBlack>
                    </div>
                    <div>
                        <p className="text-[#ffffff] my-1">OU</p>
                        <ButtonGreen width= '35ch' href="#">COMEÇAR SEM LOGIN</ButtonGreen>
                    </div>
                </Box>
            </div>
            {/* <div className='relative bottom-0'>
                <Image
                    src="/images/img_abs_02.png"
                    alt="forma abstrata direita"
                    layout="responsive"
                    width={400}
                    height={400}
                />
            </div> */}
        </div>
    );
}
