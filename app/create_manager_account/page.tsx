"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { useForm } from 'react-hook-form';
import { useState } from "react";
import Autocomplete from '@mui/material/Autocomplete';
import Link from "next/link";
import Image from 'next/image';
import ButtonGreen from '../components/buttonGreen';
import { useQuery } from '../hooks/useQuery';
import { parkService } from '../services/axios-config/connection/park';
import { IForestType } from '../services/axios-config/connection/types/IForestType';
import { toast } from 'react-toastify';
import { CPFMask } from '../components/Mask/CpfMask';
import { RGMask } from '../components/Mask/RgMask';
import { IParkProp } from '../services/axios-config/connection/types/IParkProp';

export default function CreateParkAccount() {
    const { register, handleSubmit, setValue } = useForm();

    const [getParks, , loadingParks, refetchParks] = useQuery(() => parkService.listParks(), []);

    const parkOptions = (getParks || []).map((object: IParkProp) => ({
        value: object.id,
        label: object.park_name,
    }))


    const handleFormSubmit = async (park_data: any) => {
        // toast.info('Registrado informações do parque..')
        // try {
        //     const formData = new FormData();

        //     formData.append('park_name', park_data?.park_name);
        //     formData.append('law_number', park_data?.law_number);
        //     formData.append('cnpj', park_data?.cnpj);
        //     formData.append('phone', park_data?.phone);
        //     formData.append('site', park_data?.site);
        //     formData.append('accept_comment_visitation', park_data?.accept_comment_visitation);
        //     formData.append('park_comment', park_data?.park_comment);
        //     formData.append('getParkProps', JSON.stringify(getParkProps?.address_components));
        //     formData.append('select_forest_type', JSON.stringify(park_data?.select_forest_type));

        //     await parkService.createParkAccount(formData);

        //     toast.success('Parque cadastrado com sucesso.')
        // } catch (err: any) {
        //     toast.error(err?.response?.data?.message || 'Erro ao cadastrar o parque')
        // }

    };


    return (
        <main className="flex flex-col h-screen min-h-screen container mx-auto">
            <div className='absolute sm:w-50 sm:h-50 w-70 h-70 lg:w-100 lg:h-100 top-0 right-0'>
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
            <div className='col-span-12 lg:col-span-5 grid place-items-center'>
                <h1 className="text-[#4D5D47] mb-0 text-3xl lg:text-4xl uppercase font-bold text-center">Criar conta</h1>
                <h1 className="text-[#FFD21D] mb-4 text-xl lg:text-2xl uppercase font-bold text-center">gerente</h1>
            </div>
            {/* <div className='flex items-center justify-center text-left'>
                <PhotoUploader setImage={setImage} image_view='figure2' />
                <h1 className='ml-2'>Selecionar foto</h1>
            </div> */}
            <div className="text-center bg-[#F8F8F8]">
                <Box
                    component="form"
                    onSubmit={handleSubmit(handleFormSubmit)}
                    sx={{ display: 'block', p: 1, margin: 5 }}>
                    <div>
                        <TextField
                            label="CPF"
                            id="cgc"
                            sx={{ m: 1, width: '35ch' }}
                            variant="standard"
                            required
                            autoFocus
                            // helperText={nameError}
                            InputProps={{
                                inputComponent: CPFMask as any,
                            }}
                            {...register('cgc')}
                        />
                    </div>
                    <div>
                        <TextField
                            label="RG"
                            id="rg"
                            sx={{ m: 1, width: '35ch' }}
                            variant="standard"
                            required
                            autoFocus
                            // helperText={nameError}
                            InputProps={{
                                inputComponent: RGMask as any,
                            }}
                            {...register('rg')}
                        />
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <Autocomplete
                            sx={{ m: 1, width: '35ch' }}
                            multiple
                            id="select_park"
                            loading={loadingParks}
                            options={parkOptions}
                            getOptionLabel={(option: any) => option.label}
                            freeSolo
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    required
                                    variant="standard"
                                    label="Nome do parque"
                                    placeholder="Selecionar parque"
                                />
                            )}
                            onChange={(event, newValue) => {
                                setValue('select_park', newValue);
                            }}
                        />
                    </div>
                    <div className='flex flex-col items-center justify-start'>
                        <p className='m-1 w-[35ch] text-[#C1C1C1] text-left'>
                            IMPORTANTE: seu perfil de só será disponibilizado/ativado depois que os dados informados forem analisados pelo administrador. Você receberá um e-mail com a confirmação do cadastro.
                        </p>
                    </div>
                    <div className='mt-10'>
                        <ButtonGreen width='40ch' type='submit'>CADASTRAR</ButtonGreen>
                    </div>
                    {/* <div>
                        <Link href="/home" style={{ fontWeight: 'bold', textAlign: 'center' }}>TERMINAR DEPOIS</Link>
                    </div> */}
                </Box>
            </div >
        </main >
    );
}