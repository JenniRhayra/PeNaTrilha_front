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
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import { useState } from "react";
import { useForm } from 'react-hook-form';
import Link from "next/link";
import Image from 'next/image';


const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText('#414D33'),
    backgroundColor: '#414D33',
    '&:hover': {
      backgroundColor: '#7D9662',
    },
}));

const TypeProfile = [
    {
      value: 'admin',
      label: 'Administrador',
    },
    {
      value: 'entidade',
      label: 'Entidade/Parque',
    },
    {
      value: 'visitante',
      label: 'Visitante',
    },
    {
      value: 'guia',
      label: 'Guia',
    },
];

export default function Register(){
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const {register, handleSubmit} = useForm();
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmpasswordError, setConfirmPasswordError] = useState("");

    const emailPattern = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i
    const passwordPattern = /^(?=.*\d)[0-9a-zA-Z$*&@#]{6,}$/

    const handleFormSubmit = (formData : any) => {
        console.log('form data is ',formData);
        if(!formData.input_email || !formData.input_email.length){
            setEmailError("Informe um email")
            return false;
        }
            else if(!emailPattern.test(formData.input_email)){
                setEmailError("Informe um email válido")
                return false;
            } else {
                setEmailError("");
            }

        if(!formData.input_password || !formData.input_password.length){
            setPasswordError("Informe uma senha")
            return false;
        }
            else if(!passwordPattern.test(formData.input_password)){
                setPasswordError("A senha precisa de pelo menos 6 caracteres")
                return false;
            } else {
                setPasswordError("");
            }
        
        if(!formData.input_confirm_password || !formData.input_confirm_password.length){
            setConfirmPasswordError("Confirme a senha")
            return false;
        }
            else if(formData.input_password != formData.input_confirm_password){
                setConfirmPasswordError("As senhas precisam ser iguais")
                return false;
            } else {
                setConfirmPasswordError("");
            }
        
        return true;        
    }
        
    return (
        <main className="flex flex-col h-screen min-h-screen bg-[#F8F8F8] container mx-auto">
            <div className='absolute sm:w-50 sm:h-50 w-70 h-70 lg:w-100 lg:h-100 top-0 right-0 z-100'>
                <Image
                    src="/images/img_abs_01.png"
                    alt="forma abstrata"
                    width={300}
                    height={300}
                />
            </div>
            <div className='col-span-12 lg:col-span-5 grid place-items-center mt-10'>
                <Image
                    src="/images/penatrilha_logo_w_sf.png"
                    alt="logo pe na trilha"
                    width={400}
                    height={400}
                />
            </div>
            <div className='col-span-12 lg:col-span-5 grid place-items-center'>
                <h1 className="text-[#4D5D47] mb-4 text-3xl lg:text-4xl uppercase font-bold text-center">Criar conta</h1>
            </div>
            <div className="text-center">
                <Box 
                    component="form" 
                    onSubmit={handleSubmit(handleFormSubmit)}
                    sx={{ display: 'block', p: 1, m: 1, }}>
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
                            {...register('input_email')}
                        />
                    </div>
                    <div>
                        <TextField 
                            sx={{ m: 1, width: '35ch' }}
                            id="select_profile"
                            select
                            label="Perfil"
                            defaultValue="visitante"
                            SelectProps={{
                                native: true,
                            }}
                            variant="standard"
                            required
                            {...register('select_profile')}
                            >
                            {TypeProfile.map((option) => (
                                <option key={option.value} value={option.value}>
                                {option.label}
                                </option>
                            ))}
                        </TextField>
                    </div>
                    <div>
                        <FormControl sx={{ m: 1, width: '35ch' }} variant="standard" required >
                            <InputLabel htmlFor="password" >Senha</InputLabel>
                            <Input
                                error={passwordError && passwordError.length ? true : false}
                                id="input_password"                                
                                type={showPassword ? 'text' : 'password'}  
                                {...register('input_password')}                          
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
                                error={confirmpasswordError && confirmpasswordError.length ? true : false}
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
                    </div>
                    <div className='my-10'>
                        <ColorButton id='button' sx={{ m: 1, width: '40ch' }} variant="contained" type='submit'>CADASTRAR</ColorButton>
                    </div>
                    <div>
                        <p className="text-[#C1C1C1]">Já tem uma conta?</p>
                        <Link href="#">FAZER LOGIN</Link>
                    </div>
                </Box>
            </div>
        </main>
    );
}