"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { useState, useEffect, useTransition } from "react";
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import Link from '@mui/material/Link';
import { usersService } from '../services/axios-config/connection';
import { toast } from 'react-toastify';
import ButtonGreen from '../components/buttonGreen';
import ButtonBack from '../components/buttonBack';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import LoadingSpinner from '../components/loadingSpinner';

const TypeProfile = [
    {
        value: '2',
        label: 'Visitante',
    },
    {
        value: '3',
        label: 'Gerente',
    },
    {
        value: '4',
        label: 'Guia',
    },
];

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const { register, handleSubmit } = useForm();
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmpasswordError, setConfirmPasswordError] = useState("");
    const router = useRouter();

    const emailPattern = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const passwordPattern = /^(?=.*)[0-9a-zA-Z$*&@#]{6,}$/;

    const handleFormSubmit = async (formData: any) => {
        if (!formData.email || !emailPattern.test(formData.email)) {
            setEmailError("Informe um email válido");
            return false;
        } else {
            setEmailError("");
        }

        if (!formData.password || !passwordPattern.test(formData.password)) {
            setPasswordError("A senha precisa de pelo menos 6 caracteres");
            return false;
        } else {
            setPasswordError("");
        }

        if (formData.password !== formData.input_confirm_password) {
            setConfirmPasswordError("As senhas precisam ser iguais");
            return false;
        } else {
            setConfirmPasswordError("");
        }

        delete formData.input_confirm_password;

        try {
            const response = await usersService.createUser(formData);
            Cookies.set('refreshToken', response.refreshToken, { expires: 7 });
            Cookies.set('email', response.email);
            Cookies.set('group', response.group);
            toast.success('Conta criada com sucesso.');

            switch (response.group) {
                case '2':
                    router.push('/success_register');
                    break;
                case '3':
                    router.push('/create_manager_account');
                    break;
                case '4':
                    router.push('/create_guide_account');
                    break;
                default:
                    break;
            }

        } catch (err: any) {
            toast.error(err?.response?.data?.message || 'Ocorreu um erro ao criar a sua conta');
            return false;
        }

        return true;
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

    return (
        <>
            {loading || isPending ? (
                <LoadingSpinner />
            ) : (
                <main className="flex flex-col h-screen min-h-screen bg-[#F8F8F8] container mx-auto">
                    <div className='absolute sm:w-50 sm:h-50 w-70 h-70 lg:w-100 lg:h-100 top-0 -right-2 z-100'>
                        <Image src="/images/img_abs_01.png" alt="forma abstrata" width={200} height={200} />
                    </div>
                    <div>
                        <ButtonBack />
                    </div>
                    <div className='col-span-12 lg:col-span-5 grid place-items-center mt-10'>
                        <Image src="/images/penatrilha_logo_w_sf.png" alt="logo pe na trilha" width={300} height={300} />
                    </div>
                    <div className='col-span-12 lg:col-span-5 grid place-items-center'>
                        <h1 className="text-[#4D5D47] mb-4 text-3xl lg:text-4xl uppercase font-bold text-center">Criar conta</h1>
                    </div>
                    <div className="text-center">
                        <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} sx={{ display: 'block', p: 1, m: 1 }}>
                            <div>
                                <TextField
                                    error={!!emailError}
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
                            <div>
                                <TextField
                                    sx={{ m: 1, width: '35ch' }}
                                    id="profile"
                                    select
                                    label="Perfil"
                                    defaultValue="visitante"
                                    SelectProps={{ native: true }}
                                    variant="standard"
                                    required
                                    {...register('group')}
                                >
                                    {TypeProfile.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </TextField>
                            </div>
                            <div>
                                <FormControl sx={{ m: 1, width: '35ch' }} variant="standard" required>
                                    <InputLabel htmlFor="password">Senha</InputLabel>
                                    <Input
                                        error={!!passwordError}
                                        id="input_password"
                                        type={showPassword ? 'text' : 'password'}
                                        {...register('password')}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                    <FormHelperText>Deve conter no mínimo 6 caracteres</FormHelperText>
                                </FormControl>
                            </div>
                            <div>
                                <FormControl sx={{ m: 1, width: '35ch' }} variant="standard" required>
                                    <InputLabel htmlFor="confirm_password">Confirme a senha</InputLabel>
                                    <Input
                                        error={!!confirmpasswordError}
                                        id="input_confirm_password"
                                        type={showPassword ? 'text' : 'password'}
                                        {...register('input_confirm_password')}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                    <FormHelperText>Deve conter no mínimo 6 caracteres</FormHelperText>
                                </FormControl>
                                <p className='text-sm text-left ml-5 text-[#ee4a4a] font-bold'>{confirmpasswordError}</p>
                            </div>
                            <div className='my-10'>
                                <ButtonGreen width='38ch' type='submit'>CADASTRAR</ButtonGreen>
                            </div>
                            <div>
                                <p className="text-[#C1C1C1] z-50">Já tem uma conta?</p>
                                <Link href="../login" underline="hover">FAZER LOGIN</Link>
                            </div>
                        </Box>
                    </div>
                </main>
            )}
        </>
    );
}
