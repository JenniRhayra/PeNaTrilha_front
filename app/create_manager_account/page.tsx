"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useQuery } from '../hooks/useQuery';
import { parkService } from '../services/axios-config/connection/park';
import { IParkProp } from '../services/axios-config/connection/types/IParkProp';
import { CPFMask } from '../components/Mask/CpfMask';
import { RGMask } from '../components/Mask/RgMask';
import ButtonGreen from '../components/buttonGreen';
import { toast } from 'react-toastify';
import { managerService } from '../services/axios-config/connection';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function CreateParkAccount() {
    const { register, handleSubmit, setValue } = useForm();
    const [inputValue, setInputValue] = React.useState('');
    const router = useRouter();
    const [getParks, , loadingParks, refetchParks] = useQuery(() => parkService.listParks(), []);

    const parkOptions = (getParks || []).map((object: IParkProp) => ({
        value: object.id,
        label: object.park_name,
    }));

    const handleFormSubmit = async (formData: any) => {
        console.log('formData', formData);
        console.log('inputValue', inputValue)
        try {
            if (inputValue != '') {
                formData.select_park = [{ value: 0, label: inputValue }]
            }
            const cgcValue = formData.cgc.replace(/\D/g, '');
            const rgValue = formData.rg.replace(/\D/g, '');
            const email = Cookies.get('email');

            formData.cgc = cgcValue;
            formData.rg = rgValue;
            formData.email = email;
            await managerService.createManagerAccount(formData)
            toast.success('Dados cadastrados com sucesso. Enviado para aprovação do Administrador.')

            router.push('/success_register');
        } catch (err: any) {
            toast.error(err?.response?.data?.message || 'Ocorreu um erro ao cadastrar os dados');
        }
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
                            InputProps={{
                                inputComponent: RGMask as any,
                            }}
                            {...register('rg')}
                        />
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <Autocomplete
                            sx={{ m: 1, width: '35ch' }}
                            id="select_park"
                            multiple
                            loading={loadingParks}
                            options={parkOptions}
                            getOptionLabel={(option: any) => option.label}
                            freeSolo
                            inputValue={inputValue}
                            onInputChange={(event, newInputValue) => {
                                setInputValue(newInputValue);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
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
                            IMPORTANTE: seu perfil só será disponibilizado/ativado depois que os dados informados forem analisados pelo administrador. Você receberá um e-mail com a confirmação do cadastro.
                        </p>
                    </div>
                    <div className='mt-10'>
                        <ButtonGreen width='40ch' type='submit'>CADASTRAR</ButtonGreen>
                    </div>
                </Box>
            </div>
        </main>
    );
}
