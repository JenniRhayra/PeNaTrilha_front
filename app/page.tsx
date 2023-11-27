'use client'

import Login from './login/page';
import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import Link from "next/link";
import Image from 'next/image';

const ColorButton1 = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText('#1C2312'),
    backgroundColor: '#1C2312',
    '&:hover': {
        backgroundColor: '#414D33',
    },
}));

const ColorButton2 = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText('#414D33'),
    backgroundColor: '#414D33',
    '&:hover': {
        backgroundColor: '#7D9662',
    },
}));


export default function Start() {
    return (
        <div className="flex flex-col h-screen min-h-screen bg-[#90A876]">
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
            <div className="text-center">
                <Box
                    component="form"
                    sx={{ m: 1 }}
                    >
                    <div>
                        <ColorButton1 sx={{ width: '40ch' }} variant="contained" href="/login">FAZER LOGIN</ColorButton1>
                    </div>
                    <div>
                        <p className="text-[#ffffff] my-1">OU</p>
                        <ColorButton2 sx={{ width: '40ch' }} variant="contained" href="#">COMEÇAR SEM LOGIN</ColorButton2>
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
