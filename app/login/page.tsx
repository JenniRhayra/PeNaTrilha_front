"use client"

import * as React from 'react';
import { useState, useEffect, useTransition } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from "next/link";
import Image from 'next/image';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ButtonGreen from '../components/buttonGreen';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { authService } from '../services/axios-config/connection';
import ButtonBack from '../components/buttonBack';
import LoadingSpinner from '../components/loadingSpinner';

const toastId = 'fetched-nationalities';

export default function Login() {
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

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

    interface User {
        email: string;
        password: string;
    }

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const user: User = {
        email: "",
        password: ""
    }

    const handleChangeEmail = (prop: any) => {
        setEmail(prop.target.value)
    }

    const handleChangePassword = (prop: any) => {
        setPassword(prop.target.value)
    }

    const handleRedirect = async (newPath: string) => {

        location.pathname = newPath;
    }

    const onsubmitHandle = async () => {
        user.email = email
        user.password = password

        try {
            await authService.authenticateWithPassword(user)
            toast.success('Conta logada com sucesso.');
            handleRedirect('/home')
        } catch (err: any) {
            toast.error(err?.response?.data?.message || 'Ocorreu um erro ao realizar o login.');
        }


    }

    return (
        <>
            {loading || isPending ? (
                <LoadingSpinner />
            ) : (
                <main className="flex flex-col h-screen min-h-screen bg-[#FFFFFF] container mx-auto px-0 py-4">
                    <div className='absolute sm:w-30 sm:h-30 w-50 h-50 lg:w-70 lg:h-70 top-0 right-0'>
                        <Image
                            src="/images/img_abs_01.png"
                            alt="forma abstrata direita"
                            width={200}
                            height={200}
                        />
                    </div>
                    <div>
                        <ButtonBack/>
                    </div>
                    <div className='items-center justify-center '>
                        <div className='col-span-12 lg:col-span-5 grid place-items-center px-10'>
                            <Image
                                src="/images/penatrilha_logo_w.png" 
                                alt="logo pe na trilha"
                                width={400}
                                height={400}
                            />
                        </div>
                    </div>
                    <div className='col-span-12 lg:col-span-5 grid place-items-center'>
                        <h1 className="text-[#4D5D47] mb-4 text-3xl lg:text-4xl uppercase font-bold text-center">Login</h1>
                    </div>
                    <div className="text-center">
                        <Box
                            component="form"
                            sx={{ display: 'block', p: 1, m: 1, }}>
                            <div>
                                <TextField
                                    label="Email"
                                    id="input_email"
                                    sx={{ m: 1, width: '35ch' }}
                                    variant="outlined"
                                    onChange={(e) => handleChangeEmail(e)}
                                />
                            </div>
                            <div>
                                <TextField
                                    label="Senha"
                                    id="input_senha"
                                    sx={{ m: 1, width: '35ch' }}
                                    variant="outlined"
                                    type={showPassword ? 'text' : 'password'}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton></InputAdornment>,
                                    }}
                                    onChange={(e) => handleChangePassword(e)}
                                />
                            </div>
                            <div>
                                <ButtonGreen width='38ch' onClick={() => onsubmitHandle()} href='#'>ENTRAR</ButtonGreen>
                            </div>
                            <div className='mt-8 z-10 bottom-0'>
                                <label className='lbl_login'> Ainda não tem cadastro? </label> <br></br>
                                <Link id='link_register' href="/register">CADASTRE-SE</Link>
                            </div>
                        </Box>
                    </div>
                </main>
            )}
        </>
    );
}
