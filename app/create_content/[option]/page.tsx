"use client";

import React, { useState } from 'react';
import FooterMenu from '../../components/footerMenu';
import Header from '../../components/header';
import '../../globals.css';
import styled from 'styled-components';
import { PhotoUploader } from '../../components/photoUploader';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ButtonGreen from '../../components/buttonGreen';
import { useForm } from 'react-hook-form';
import Switch from '@mui/material/Switch';
import { IMaskInput } from 'react-imask';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import { useParams } from 'next/navigation';
import Cookies from 'js-cookie';
import { parkService } from '@/app/services/axios-config/connection/park';

const CreateParkContent: React.FC = () => {
    const params = useParams();
    const option = params.option;
    const { register, handleSubmit } = useForm();
    const label = { inputProps: { 'aria-label': 'Monitoramento' } };
    const [titleError, setTitleError] = useState("");
    const [selectedOption, setSelectedOption] = useState(option);

    const [image, setImage] = useState<any>(null);

    interface CustomProps {
        onChange: (event: { target: { name: string; value: string } }) => void;
        name: string;
    }

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

    const handleFormSubmit = async (data: any) => {
        try {
            if (!data.input_title || !data.input_title.length) {
                setTitleError("Informe um título");
                return false;
            } else {
                setTitleError("");
            }

            const id = Cookies.get('id');

            const formData = new FormData();
            formData.append('file', image);

            formData.append('percurso', data?.percurso);
            formData.append('duracao', data?.duracao);
            formData.append('description', data?.box_description);
            formData.append('isMonitored', data?.isMonitored);
            formData.append('difficultyLevel', data?.difficultyLevel);
            formData.append('activityName', data?.input_title);
            formData.append('activityImage', data?.select_park);
            formData.append('managerId', id);

            await parkService.createActivity(formData)

            handleRedirect('/register_park_content')
        } catch (err: any) {
            console.log(err || 'Erro ao cadastrar atividade')
        }
    }

    const renderContent = () => {
        switch (selectedOption) {
            case 'atividade':
                return (
                    <div>
                        <h1 style={{ textAlign: 'center', color: '#4D5D47', fontSize: '18px', fontWeight: 'bold', marginTop: '13vh', textTransform: 'uppercase' }}>
                            ATIVIDADE</h1>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'left', marginTop: '2vh' }}>
                            <PhotoUploader setImage={setImage} image_view={''} />
                            <h1 className='ml-2'>Selecionar foto</h1>
                        </div>

                        <div className="text-center bg-[#F8F8F8]">
                            <Box
                                component="form"
                                onSubmit={handleSubmit(handleFormSubmit)}
                                sx={{ display: 'block', p: 1, m: 1, fontSize: '14px' }}>
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
                                    <div style={{ display: 'inline-flex', position: 'relative', textAlign: 'left', justifyContent: 'left', margin: '10px', width: '35ch', gap: '2ch' }}>
                                        Necessita monitoramento
                                        <Switch {...label} color='success' {...register('isMonitored')} />
                                    </div>
                                </div>

                                <div>
                                    <div style={{ display: 'inline-flex', position: 'relative', textAlign: 'left', justifyContent: 'left', margin: '10px', width: '35ch', gap: '2ch', flexDirection: 'row' }}>
                                        Nível de dificuldade
                                        <Select {...register('difficultyLevel')}>
                                            <option value='FACIL'>Fácil</option>
                                            <option value='MEDIO'>Média</option>
                                            <option value='DIFICIL'>Difícil</option>
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
                                        {...register('percurso')}
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
                                        {...register('duracao')}
                                    />
                                </div>

                                <div className='mt-10' style={{ display: 'flex', gap: '10px', flex: 1, justifyContent: 'center', paddingBottom: '8vh' }}>
                                    <ButtonGreen type='submit'>CONFIRMAR</ButtonGreen>

                                    <ButtonCancel onClick={() => handleRedirect('/home')}>CANCELAR</ButtonCancel>
                                </div>
                            </Box>
                        </div>
                    </div>
                );
            case 'evento':
                return (
                    <div>
                        <h1 style={{ textAlign: 'center', color: '#4D5D47', fontSize: '18px', fontWeight: 'bold', marginTop: '13vh', textTransform: 'uppercase' }}>
                            EVENTO</h1>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'left', marginTop: '2vh' }}>
                            <PhotoUploader setImage={setImage} image_view={''} />
                            <h1 className='ml-2'>Selecionar foto</h1>
                        </div>

                        <div className="text-center bg-[#F8F8F8]">
                            <Box
                                component="form"
                                onSubmit={handleSubmit(handleFormSubmit)}
                                sx={{ display: 'block', p: 1, m: 1, fontSize: '14px' }}>
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
                                        required
                                        multiline
                                        rows={4}
                                        placeholder="Conte um pouco sobre o evento..."
                                        {...register('box_description')}
                                    />
                                </div>

                                <div>
                                    <FormControl sx={{ m: 1, width: '35ch' }} variant="standard">
                                        <InputLabel htmlFor="formatted-date-mask-input">Data de Início</InputLabel>
                                        <Input
                                            id="formatted-date-mask-input"
                                            required
                                            {...register('start_date')}
                                            inputComponent={DateMaskCustom as any}
                                        />
                                    </FormControl>
                                </div>

                                <div>
                                    <FormControl sx={{ m: 1, width: '35ch' }} variant="standard">
                                        <InputLabel htmlFor="formatted-date-mask-input">Data de Término</InputLabel>
                                        <Input
                                            id="formatted-date-mask-input"
                                            required
                                            {...register('end_date')}
                                            inputComponent={DateMaskCustom as any}
                                        />
                                    </FormControl>
                                </div>

                                <div>
                                    <TextField
                                        label="Local"
                                        id="input_local"
                                        sx={{ m: 1, width: '35ch' }}
                                        variant="standard"
                                        required
                                        autoFocus
                                        error={titleError && titleError.length ? true : false}
                                        helperText={titleError}
                                        {...register('locationRef')}
                                    />
                                </div>

                                <div className='mt-10' style={{ display: 'flex', gap: '10px', flex: 1, justifyContent: 'center', paddingBottom: '8vh' }}>
                                    <ButtonGreen type='submit'>CONFIRMAR</ButtonGreen>

                                    <ButtonCancel onClick={() => handleRedirect('/home')}>CANCELAR</ButtonCancel>
                                </div>
                            </Box>
                        </div>
                    </div>
                );
            case 'dicas':
                return (
                    <div>
                        <h1 style={{ textAlign: 'center', color: '#4D5D47', fontSize: '18px', fontWeight: 'bold', marginTop: '13vh', textTransform: 'uppercase' }}>
                            DICAS E BOAS PRÁTICAS</h1>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'left', marginTop: '2vh' }}>
                            <PhotoUploader setImage={setImage} image_view={''} />
                            <h1 className='ml-2'>Selecionar foto</h1>
                        </div>

                        <div className="text-center bg-[#F8F8F8]">
                            <Box
                                component="form"
                                onSubmit={handleSubmit(handleFormSubmit)}
                                sx={{ display: 'block', p: 1, m: 1, fontSize: '14px' }}>
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
                                        required
                                        multiline
                                        rows={4}
                                        placeholder="Conte um pouco sobre a boa prática..."
                                        {...register('box_description')}
                                    />
                                </div>

                                <div className='mt-10' style={{ display: 'flex', gap: '10px', flex: 1, justifyContent: 'center', paddingBottom: '8vh' }}>
                                    <ButtonGreen type='submit'>CONFIRMAR</ButtonGreen>

                                    <ButtonCancel onClick={() => handleRedirect('/home')}>CANCELAR</ButtonCancel>
                                </div>
                            </Box>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <Header />
            {renderContent()}
            <FooterMenu activePage="profile" />
        </div>
    );
};

export default CreateParkContent;
