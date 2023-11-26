"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Link from "next/link";
import Image from 'next/image';
import { useState } from "react";

export default function Login(){
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

    const handleRedirect = async (newPath: string) => {

        location.pathname = newPath;
    }

    const onsubmitHandle = async () => {
        user.email = email
        user.password = password

        console.log('JSON.stringify(user)', JSON.stringify(user))
        console.log('user', user)
        try {
            fetch('http://localhost:3333/auth/', {
            method: 'POST',
            body: JSON.stringify(user)
        }).then(response => response.json()).then(data => console.log('data', data))
        
        alert("Usuário validado com sucesso!");
        handleRedirect('/home');
        
        } catch (error) {
            alert(error)
        }

        
    }

    return (
        <main className="flex flex-col items-center justify-center h-screen min-h-screen bg-[#90a876] container mx-auto px-12 py-4">
            <div className='col-span-12 lg:col-span-5 grid place-items-center'>
                <Image
                    src="/images/penatrilha_logo_g.png"
                    alt="logo pe na trilha"
                    width={400}
                    height={400}
                />
            </div>
            <div className='col-span-12 lg:col-span-5 grid place-items-center'>
                <h1 className="text-[#212816] mb-4 text-3xl lg:text-4xl uppercase font-bold text-center">Login</h1>
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
                        <Button id='btn_login' sx={{ m: 1, width: '40ch' }} variant="contained" onClick={onsubmitHandle}>ENTRAR</Button>
                    </div>
                    <div>
                        <Link href="#">Esqueci minha senha</Link>
                    </div>
                </Box>
            </div>
        </main>
    );
}
