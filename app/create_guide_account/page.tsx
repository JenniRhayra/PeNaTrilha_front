"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { IMaskInput } from 'react-imask';
import { useForm } from 'react-hook-form';
import { useState, useTransition, useEffect } from "react";
import Autocomplete from '@mui/material/Autocomplete';
import Link from "next/link";
import Image from 'next/image';
import ButtonGreen from '../components/buttonGreen';
import { PhotoUploader } from '../components/photoUploader';
import { useQuery } from '../hooks/useQuery';
import { ILanguagesProps } from '../services/axios-config/connection/types/ILanguagesProps';
import { PhoneMask } from '../components/Mask/PhoneMask';
import { DateMask } from '../components/Mask/DateMask';
import { guideService } from '../services/axios-config/connection';
import { toast } from 'react-toastify';
import { parkService } from '../services/axios-config/connection/park';
import { IForestType } from '../services/axios-config/connection/types/IForestType';
import { ISpecialityProps } from '../services/axios-config/connection/types/ISpecialityProps';
import { IParkProp } from '../services/axios-config/connection/types/IParkProp';
import Cookies from 'js-cookie';
import LoadingSpinner from '../components/loadingSpinner';

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}


export default function Create_Account() {
    const { register, handleSubmit, setValue } = useForm()

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

    const [nameError, setnameError] = useState("");
    const [parkError, setParkError] = useState("");
    const [getGender, setGender] = useState("");
    const [image, setImage] = useState<any>(null);
    console.log('getGender', getGender)
    const [getLanguages, , loadingLanguages, refetchLanguages] = useQuery(() => guideService.listLanguages(), []);

    const languageOptions = (getLanguages || []).map((object: ILanguagesProps) => ({
        value: object.id,
        label: object.languageName,
    }))

    const [getSpeciality, , loadingSpeciality, refetchSpeciality] = useQuery(() => guideService.listSpeciality(), []);

    const specialityOptions = (getSpeciality || []).map((object: ISpecialityProps) => ({
        value: object.id,
        label: object.specialtyName,
    }))

    const [getParks, , loadingParks, refetchParks] = useQuery(() => parkService.listParks(), []);

    const parkOptions = (getParks || []).map((object: IParkProp) => ({
        value: object.id,
        label: object.park_name,
    }))


    const handleFormSubmit = async (guide_data: any) => {
        toast.info('Registrado informações..')
        try {
            // console.log('guide_data', guide_data)

            const email = Cookies.get('email');

            const formData = new FormData();
            formData.append('file', image);

            formData.append('name', guide_data?.name);
            formData.append('slugname', guide_data?.slugname);
            formData.append('phone', guide_data?.phone);
            formData.append('gender', getGender);
            formData.append('date', guide_data?.date);
            formData.append('espec', JSON.stringify(guide_data?.espec));
            formData.append('select_park', JSON.stringify(guide_data?.select_park));
            formData.append('select_language', JSON.stringify(guide_data?.select_language));
            formData.append('description', guide_data?.description);
            formData.append('email', email);

            await guideService.createGuideAccount(formData)

            toast.success('Parque cadastrado com sucesso.')
        } catch (err: any) {
            toast.error(err?.response?.data?.message || 'Erro ao cadastrar o parque')
        }

    };

    return (
        <>
            {loading || isPending ? (
                <LoadingSpinner />
            ) : (
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
                        <h1 className="text-[#FFD21D] mb-4 text-xl lg:text-2xl uppercase font-bold text-center">guia</h1>
                    </div>
                    <div className='flex items-center justify-center text-left'>
                        <PhotoUploader setImage={setImage} image_view='figure1' />
                        <h1 className='ml-2'>Selecionar foto</h1>
                    </div>
                    <div className="text-center bg-[#F8F8F8]">
                        <Box
                            component="form"
                            onSubmit={handleSubmit(handleFormSubmit)}
                            sx={{ display: 'block', p: 1, m: 1 }}>
                            <div>
                                <TextField
                                    label="Nome completo"
                                    id="name"
                                    sx={{ m: 1, width: '35ch' }}
                                    variant="standard"
                                    required
                                    autoFocus
                                    error={nameError && nameError.length ? true : false}
                                    helperText={nameError}
                                    {...register('name')}
                                />
                            </div>
                            <div>
                                <TextField
                                    label="Gostaria de ser chamado(a) de..."
                                    id="slugname"
                                    sx={{ m: 1, width: '35ch' }}
                                    variant="standard"
                                    {...register('slugname')}
                                />
                            </div>
                            <div>
                                <FormControl sx={{ m: 1, width: '35ch' }} variant="standard">
                                    <InputLabel htmlFor="formatted-phone-mask-input">Telefone</InputLabel>
                                    <Input
                                        //name="phonemask"
                                        id="phone"
                                        {...register('phone')}
                                        inputComponent={PhoneMask as any}
                                    />
                                </FormControl>
                            </div>
                            <div className='flex flex-col items-center justify-center text-left'>
                                <FormControl required sx={{ m: 2, width: '35ch' }}>
                                    <FormLabel id="gender">Sexo</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="gender"
                                        {...register('gender', {
                                            onChange: (e) => setGender(e.target.value),
                                        })}
                                    >
                                        <FormControlLabel value="FEMININO" control={<Radio />} label="feminino" />
                                        <FormControlLabel value="MASCULINO" control={<Radio />} label="masculino" />
                                        <FormControlLabel value="NAO_RESPONDER" control={<Radio />} label="não responder" />
                                    </RadioGroup>
                                </FormControl>


                            </div>
                            <div>
                                <FormControl sx={{ m: 1, width: '35ch' }} variant="standard">
                                    <InputLabel htmlFor="date">Data de Nascimento</InputLabel>
                                    <Input
                                        //name="datemask"
                                        id="date"
                                        {...register('date')}
                                        inputComponent={DateMask as any}
                                    />
                                </FormControl>
                            </div>
                            <div className='flex flex-col items-center justify-center'>
                                <Autocomplete
                                    sx={{ m: 1, width: '35ch' }}
                                    multiple
                                    id="espec"
                                    loading={loadingSpeciality}
                                    options={specialityOptions}
                                    getOptionLabel={(option: any) => option.label}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="standard"
                                            label="Especialidade"
                                            placeholder="Selecionar especialidade"
                                        />
                                    )}
                                    onChange={(event, newValue) => {
                                        setValue('espec', newValue);
                                    }}
                                />
                            </div>
                            <div className='flex flex-col items-center justify-center'>
                                <Autocomplete
                                    sx={{ m: 1, width: '35ch' }}
                                    multiple
                                    id="select_park"
                                    options={parkOptions}
                                    getOptionLabel={(option: any) => option.label}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="standard"
                                            label="Parques"
                                            placeholder="Selecionar parque"
                                        />
                                    )}
                                    onChange={(event, newValue) => {
                                        setValue('select_park', newValue);
                                    }}
                                />
                            </div>
                            <div className='flex flex-col items-center justify-center'>
                                <Autocomplete
                                    sx={{ m: 1, width: '35ch' }}
                                    multiple
                                    id="select_language"
                                    loading={loadingLanguages}
                                    options={languageOptions}
                                    getOptionLabel={(option: any) => option.label}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="standard"
                                            label="Idiomas"
                                            placeholder="Selecionar idioma"
                                        />
                                    )}
                                    onChange={(event, newValue) => {
                                        setValue('select_language', newValue);
                                    }}
                                />
                            </div>
                            <div>
                                <TextField
                                    sx={{ m: 1, width: '35ch' }}
                                    id="description"
                                    label="Descrição"
                                    multiline
                                    rows={4}
                                    placeholder="Conte um pouco sobre você, o que vocês faz, cursos e atividades que fez..."
                                    {...register('description')}
                                />
                            </div>
                            <div className='flex flex-col items-center justify-start'>
                                <p className='m-1 w-[35ch] text-[#C1C1C1] text-left'>
                                    IMPORTANTE: seu perfil como guia só será disponibilizado depois que o(s) parque(s) informado(s) reconhecer(em) seu perfil como guia.
                                </p>
                            </div>
                            <div className='mt-10'>
                                <ButtonGreen width='40ch' type='submit'>CADASTRAR</ButtonGreen>
                            </div>
                            <div>
                                <Link href="/home">TERMINAR DEPOIS</Link>
                            </div>
                        </Box>
                    </div>
                </main>
            )}
        </>
    );
}