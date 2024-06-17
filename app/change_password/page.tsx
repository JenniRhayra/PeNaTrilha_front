"use client"

import Image from "next/image";
import ButtonBack from "../components/buttonBack";
import { Box, FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import ButtonGreen from "../components/buttonGreen";
import Link from "next/link";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React from "react";

export default function ChangePassword() {
    const { register, handleSubmit, setValue } = useForm()
    const [showPassword, setShowPassword] = React.useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmpasswordError, setConfirmPasswordError] = useState("");

    const emailPattern = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i
    const passwordPattern = /^(?=.*)[0-9a-zA-Z$*&@#]{6,}$/

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleFormSubmit = async (formData: any) => {
        if (!emailPattern.test(formData.email)) {
            setEmailError("Informe um email válido")
            return false;
        }

        if (!formData.password || !formData.password.length) {
            setPasswordError("Informe uma senha")
            return false;
        }
        else if (!passwordPattern.test(formData.password)) {
            setPasswordError("A senha precisa de pelo menos 6 caracteres")
            return false;
        } else {
            setPasswordError("");
        }

        if (!formData.input_confirm_password || !formData.input_confirm_password.length) {
            setConfirmPasswordError("Confirme a senha")
            return false;
        }
        else if (formData.password != formData.input_confirm_password) {
            setConfirmPasswordError("As senhas precisam ser iguais")
            return false;
        } else {
            setConfirmPasswordError("");
        }

    }

    return (
        <main className="flex-1 bg-[#FFFFFF]">
            <div className="flex flex-row justify-between">
                <div>
                    <ButtonBack />
                </div>
                <div>
                    <Image
                        src="/images/img_abs_01.png"
                        alt="logo pe na trilha"
                        width={150}
                        height={150}
                    />
                </div>
            </div>

            <div className="flex justify-center">
                <Image
                    src="/images/penatrilha_logo_w.png"
                    alt="logo pe na trilha"
                    width={250}
                    height={150}
                />
            </div>
            <div>
                <h1 className="text-[#4D5D47] mb-4 text-2xl lg:text-4xl uppercase font-bold text-center tracking-widest">Redefinir senha</h1>
            </div>
            <div className='flex flex-col items-center justify-start'>
                <p className='m-1 w-[35ch] text-[#C1C1C1] text-center text-base'>
                    Informe o código enviado no seu e-mail para redefinição da senha
                </p>
            </div>
            <div className="text-center mt-5">
                <Box
                    component="form"
                    onSubmit={handleSubmit(handleFormSubmit)}
                    sx={{ display: 'block', p: 1, m: 0.35 }}>
                    <div>
                        <TextField
                            error={emailError && emailError.length ? true : false}
                            label="Email"
                            id="input_email"
                            sx={{ m: 0.35, width: '35ch' }}
                            variant="standard"
                            required
                            autoFocus
                            helperText={emailError}
                            {...register('email')}
                        />
                    </div>
                    <div>
                        <TextField
                            label="Código enviado ao email"
                            id="verify_code"
                            sx={{ m: 0.35, width: '35ch' }}
                            variant="standard"
                            required
                            autoFocus
                            helperText={emailError}
                            {...register('verify_code')}
                        />
                    </div>
                    <div>
                        <FormControl sx={{ m: 0.35, width: '35ch' }} variant="standard" required >
                            <InputLabel htmlFor="password" >Senha</InputLabel>
                            <Input
                                error={passwordError && passwordError.length ? true : false}
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
                        <FormControl sx={{ m: 0.35, width: '35ch' }} variant="standard" required>
                            <InputLabel htmlFor="confirm_password">Confirme a nova senha</InputLabel>
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
                        <p className='text-sm text-left ml-5 text-[#ee4a4a] font-bold'>{confirmpasswordError}</p>
                    </div>
                </Box>
            </div>
            <div className="flex justify-center mt-12 text-center font-bold text-9xl tracking-wider">
                <ButtonGreen width='35ch' href='#'>DEFINIR NOVA SENHA</ButtonGreen>
            </div>
        </main>
    )
}