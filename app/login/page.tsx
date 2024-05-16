"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from "next/link";
import Image from 'next/image';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import ButtonGreen from '../components/buttonGreen';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { AuthContext } from '../context/auth';

export default function Login() {
    const { login } = React.useContext(AuthContext)

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

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

    const onsubmitHandle = async () => {
        user.email = email
        user.password = password

        await login(user)
    }

    return (
        <main className="flex flex-col items-center justify-center h-screen min-h-screen bg-[#FFFFFF] container mx-auto px-12 py-4">

            <div className='absolute left-3 top-5 z-10'>
                <ArrowBackIosNewIcon fontSize='large' />
            </div>
            <div className='relative bottom-36 col-span-12 lg:col-span-5 grid place-items-center'>
                <Image
                    src="/images/penatrilha_logo_w.png"
                    alt="logo pe na trilha"
                    width={400}
                    height={400}
                />
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
    );
}
