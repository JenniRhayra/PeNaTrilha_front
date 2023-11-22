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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { IMaskInput } from 'react-imask';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import Link from "next/link";
import Image from 'next/image';


const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText('#414D33'),
    backgroundColor: '#414D33',
    '&:hover': {
      backgroundColor: '#7D9662',
    },
}));

const TypePark = [
    {
      value: 'pe_carlos_botelho',
      label: 'PE Carlos Botelho',
    },
    {
      value: 'pe_intervales',
      label: 'PE Intervales',
    },
    {
      value: 'pe_alto_ribeira',
      label: 'PETAR',
    },
    {
      value: 'pn_chapada_veadeiros',
      label: 'PN Chapada dos Veadeiros',
    },
];

const TypeLanguage = [
    {
      value: 'pt-br',
      label: 'Português (Brasil)',
    },
    {
      value: 'en',
      label: 'English',
    },
    {
      value: 'es',
      label: 'Español',
    },
];

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}
  
const PhoneMaskCustom = React.forwardRef<HTMLInputElement, CustomProps>(
    function PhoneMaskCustom(props, ref) {
        const { onChange, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask="(#0) 00000-0000"
                definitions={{
                    '#': /[1-9]/,
                }}
                inputRef={ref}
                onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
                overwrite
            />
        );
    },
);

const DateMaskCustom = React.forwardRef<HTMLInputElement, CustomProps>(
    function DateMaskCustom(props, ref) {
        const { onChange, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask="#0/00/0000"
                placeholder='DD/MM/AAAA'
                definitions={{
                    '#': /[1-9]/,
                }}
                inputRef={ref}
                onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
                overwrite
            />
        );
    },
);


export default function Create_Account(){
    
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
                <h1 className="text-[#4D5D47] mb-0 text-3xl lg:text-4xl uppercase font-bold text-center">Criar conta</h1>
                <h1 className="text-[#FFD21D] mb-4 text-xl lg:text-2xl uppercase font-bold text-center">guia</h1>
            </div>
            <div className="text-center">
                <Box 
                    component="form" 
                    sx={{ display: 'block', p: 1, m: 1, }}>
                    <div>
                        <TextField
                            label="Nome completo"
                            id="input-name"
                            sx={{ m: 1, width: '45ch' }}
                            variant="standard"
                            required
                        />
                    </div>
                    <div>
                        <TextField
                            label="Gostaria de ser chamado(a) de..."
                            id="input-slugname"
                            sx={{ m: 1, width: '45ch' }}
                            variant="standard"
                        />
                    </div>
                    <div>
                        <FormControl sx={{ m: 1, width: '45ch' }} variant="standard">
                            <InputLabel htmlFor="formatted-phone-mask-input">Telefone</InputLabel>
                            <Input
                                name="phonemask"
                                id="formatted-phone-mask-input"
                                inputComponent={PhoneMaskCustom as any}
                            />
                        </FormControl>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <FormControl required>
                            <FormLabel id="row-radio-buttons">Sexo</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="buttons"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="female" control={<Radio />} label="feminino" />
                                <FormControlLabel value="male" control={<Radio />} label="masculino" />
                                <FormControlLabel value="na" control={<Radio />} label="não responder" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div>
                        <FormControl sx={{ m: 1, width: '45ch' }} variant="standard">
                            <InputLabel htmlFor="formatted-date-mask-input">Data de Nascimento</InputLabel>
                            <Input
                                name="datemask"
                                id="formatted-date-mask-input"
                                inputComponent={DateMaskCustom as any}
                            />
                        </FormControl>
                    </div>
                    <div>
                        <TextField
                            label="Especialidades: botânica, observação de aves..."
                            id="input-espec"
                            sx={{ m: 1, width: '45ch' }}
                            variant="standard"
                        />
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <Autocomplete
                            sx={{ m: 1, width: '45ch' }}
                            multiple
                            id="select-park"
                            options={TypePark}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label="Parques"
                                    placeholder="Selecionar parque"
                                    required
                                />
                            )}
                        />
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <Autocomplete
                            sx={{ m: 1, width: '45ch' }}
                            multiple
                            id="select-language"
                            options={TypeLanguage}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label="Idiomas"
                                    placeholder="Selecionar idioma"
                                />
                            )}
                        />
                    </div>
                    <div>
                        <TextField
                            sx={{ m: 1, width: '45ch' }}
                            id="box-description"
                            label="Descrição"
                            multiline
                            rows={4}
                            placeholder="Conte um pouco sobre você, o que vocês faz, cursos e atividades que fez..."
                        />
                    </div>
                    <div className='flex flex-col items-center justify-start'>
                        <p className='m-1 w-[45ch] text-[#C1C1C1] text-left'>
                            IMPORTANTE: seu perfil como guia só será disponibilizado depois que o(s) parque(s) informado(s) reconhecer(em) seu perfil como guia.
                        </p>
                    </div>
                    <div className='mt-10'>
                        <ColorButton id='button' sx={{ m: 1, width: '50ch' }} variant="contained" href="#">CADASTRAR</ColorButton>
                    </div>
                    <div>
                        <Link href="#">TERMINAR DEPOIS</Link>
                    </div>
                </Box>
            </div>
        </main>
    );
}