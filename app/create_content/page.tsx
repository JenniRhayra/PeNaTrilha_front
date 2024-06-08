"use client";

import React, { useState } from 'react';
import FooterMenu from '../components/footerMenu';
import Header from '../components/header';
import '../globals.css';
import ButtonBack from '../components/buttonBack';
import styled from 'styled-components';
import PhotoUploader from '../components/photoUploader';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Autocomplete from '@mui/material/Autocomplete';
import Link from "next/link";
import ButtonGreen from '../components/buttonGreen';
import { useForm } from 'react-hook-form';
import Switch from '@mui/material/Switch';


const CreateParkContent: React.FC = () => {
    const {register, handleSubmit} = useForm();
    const label = { inputProps: { 'aria-label': 'Monitoramento' } };
    const [titleError, settitleError] = useState("");

    const Select = styled.select`
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-size: 14px;
        color: #666;
    `;
    
    const ButtonCancel = styled(ButtonGreen)`
        color: #EF2945;
        background-color: #fff;
        border: 1px solid #EF2945;
    `;

    const handleRedirect = async (newPath: string) => {
        location.pathname = newPath;
    }

    const handleFormSubmit = (formData : any) => {
        console.log('form data is ',formData);
        if(!formData.input_title || !formData.input_title.length){
            settitleError("Informe um nome")
            return false;
        } else {
            settitleError("");
        }

        handleRedirect('/');

        return true;        
    }

    return (
        <div>
            <Header />
            <div style={{display:'flex',alignItems:'center',justifyContent:'center',textAlign:'left',marginTop:'12vh'}}>
                <PhotoUploader />
                <h1 className='ml-2'>Selecionar foto</h1>
            </div>
            <div className="text-center bg-[#F8F8F8]">
                <Box 
                    component="form" 
                    onSubmit={handleSubmit(handleFormSubmit)}
                    sx={{ display: 'block', p: 1, m: 1, fontSize: '14px'}}>
                    <div>
                        <TextField
                            label="Título"
                            id="input_title"
                            sx={{ m: 1, width: '35ch' }}
                            variant="standard"
                            required
                            autoFocus
                            error={titleError && titleError.length ? true : false}
                            helperText={titleError}
                            {...register('input_title')}
                        />
                    </div>
                    
                    <div>
                        <TextField
                            sx={{ m: 1, width: '35ch' }}
                            id="box_description"
                            label="Descrição"
                            multiline
                            rows={4}
                            placeholder="Conte um pouco sobre a atividade..."
                            {...register('box_description')}
                        />
                    </div>

                    <div>
                        <div style={{display: 'inline-flex', position:'relative', textAlign:'left', justifyContent:'left', margin:'10px', width: '35ch', gap:'2ch'}}>
                            Necessita monitoramento
                            <Switch {...label} color='success'/>
                        </div>
                    </div>

                    <div>
                        <div style={{display: 'inline-flex', position:'relative', textAlign:'left', justifyContent:'left', margin:'10px', width: '35ch', gap:'2ch', flexDirection: 'row'}}>
                            Nível de dificuldade
                            <Select>
                                <option>Média</option>
                                <option>Fácil</option>
                                <option>Difícil</option>
                            </Select>
                        </div>
                    </div>

                    <div>
                        <TextField
                            label="Percurso"
                            id="input_percurso"
                            sx={{ m: 1, width: '35ch' }}
                            variant="standard"
                            required
                            autoFocus
                            error={titleError && titleError.length ? true : false}
                            helperText={titleError}
                            {...register('input_percurso')}
                        />
                    </div>

                    <div>
                        <TextField
                            label="Duração"
                            id="input_duracao"
                            sx={{ m: 1, width: '35ch' }}
                            variant="standard"
                            required
                            autoFocus
                            error={titleError && titleError.length ? true : false}
                            helperText={titleError}
                            {...register('input_duracao')}
                        />
                    </div>

                    <div className='mt-10' style={{ display: 'flex', gap: '10px',flex: 1 , justifyContent:'center', paddingBottom:'8vh'}}>
                        <ButtonGreen type='submit'>CONFIRMAR</ButtonGreen>

                        <ButtonCancel onClick={() => handleRedirect('/home')}>CANCELAR</ButtonCancel>
                    </div>
                </Box>
            </div>
            <FooterMenu activePage='profile'/>
        </div>
    );
};

export default CreateParkContent;
