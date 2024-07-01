"use client"

import FooterMenu from '../components/footerMenu';
import Header from '../components/header';
import { Chip } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Divider } from '@mui/material';
import Button from '@mui/material/Button';
import { Switch, FormGroup, FormControlLabel } from '@mui/material';
import Image from 'next/image';
import './profile.css';
import PageComponentList from '../components/pageComponentList';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { managerService, usersService } from '../services/axios-config/connection';
import { useQuery } from '../hooks/useQuery';
import { Activity, Event, GoodPractice, ParkGuide, ParkManager } from '../services/axios-config/connection/types/IGetManagerProfile';
import { ConfirmDialog } from '../components/excludeDialog';

function maskRG(rg: string): string {
    const cleaned = rg.replace(/\D/g, '');
    if (cleaned.length < 8 || cleaned.length > 9) {
        return rg
    }
    return cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
}

function maskCPF(cpf: string): string {
    const cleaned = cpf.replace(/\D/g, '');
    if (cleaned.length !== 11) {
        return cpf
    }
    return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

function maskPhoneNumber(phoneNumber: any) {
    phoneNumber = phoneNumber.replace(/\D/g, '');

    if (phoneNumber.length === 11) {
        return phoneNumber.replace(/(\d{2})(\d{5})(\d{3})/, '($1) $2-$3');
    } else {
        return phoneNumber;
    }
}

const formatTime = (date: Date | string, defaultTime: string) => {
    if (typeof date === 'string') {
        date = new Date(date);
    }

    if (!(date instanceof Date) || isNaN(date.getTime())) {
        return defaultTime;
    }

    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}` || defaultTime;
};

const SelectorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0 10px 0;
`;

const SelectorItem = styled.div<{ isActive: boolean }>`
  margin: 0 15px;
  padding: 10px 10px;
  cursor: pointer;
  font-size: 15px;
  font-weight: ${props => (props.isActive ? 'bold' : 'normal')};
  position: relative;
  color: ${props => (props.isActive ? '#7D9662' : '#A6A6A6')}
`;

const SelectorDot = styled.div`
  width: 8px;
  height: 8px;
  background-color: #4D5D47;
  border-radius: 50%;
  position: absolute;
  bottom: -1px;
  left: 50%;
  transform: translateX(-50%);`;

const ManagerProfile: React.FC = () => {
    const userId = Cookies.get('id');

    const [selected, setSelected] = useState<'Geral' | 'Admin'>('Geral');

    const [getManagerProfile, , loadingManager, refetchManager] = useQuery(() => managerService.getManagerProfile(Number(userId)), [userId]);

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const logoutPath = "/login";

    const handleRedirect = async (newPath: string) => {
        location.pathname = newPath;
    }

    const handleClose = async (confirm: boolean) => {
        setOpen(false);
        if (confirm) {
            try {
                await usersService.inativeUser(Number(userId))

                Cookies.remove('id')
                Cookies.remove('email')
                Cookies.remove('group')
                Cookies.remove('refreshToken')
                handleRedirect(logoutPath);
            } catch (err: any) {
                console.log(err?.response?.data?.message || 'Erro ao cadastrar o guia')
            }
        }
    };

    const guides = (getManagerProfile?.park?.parkGuide || []).map((object: ParkGuide, index: number) => ({
        name: object?.guide?.user?.name,
        photo: object?.guide?.guideImage,
        description: object?.guide?.biography,
        link: ''
    }));

    const goodPractices = (getManagerProfile?.park?.goodPractice || []).map((object: GoodPractice, index: number) => ({
        name: object?.title,
        photo: object?.practiceImage,
        description: object?.title,
        link: ''
    }));

    const events = (getManagerProfile?.park?.event || []).map((object: Event, index: number) => ({
        name: object?.event_name,
        photo: object?.eventImage,
        description: object?.description,
        link: ''
    }));

    const activities = (getManagerProfile?.park?.activity || []).map((object: Activity, index: number) => ({
        name: object?.activityName,
        photo: object?.activityImage,
        description: object?.description,
        link: ''
    }));

    return (
        <div>
            <Header />
            <div id='managerProfile'>
                <div id='profileHeader'>
                    <h1 style={{ color: '#7D9662', marginTop: '5rem', fontWeight: '700', fontSize: '20px', textAlign: 'center' }}> MEU PERFIL </h1>
                    <SelectorContainer>
                        <SelectorItem isActive={selected === 'Geral'} onClick={() => setSelected('Geral')}>
                            GERAL
                            {selected === 'Geral' && <SelectorDot />}
                        </SelectorItem>
                        <Divider orientation="vertical" variant="middle" flexItem />
                        <SelectorItem isActive={selected === 'Admin'} onClick={() => setSelected('Admin')}>
                            ADMINISTRAÇÃO
                            {selected === 'Admin' && <SelectorDot />}
                        </SelectorItem>
                    </SelectorContainer>
                </div>
                {selected?.toString() == 'Geral' && (
                    <>

                        <div className='perfil' style={{ marginTop: '1rem' }}>
                            <div id='infoPerfil' style={{ marginLeft: '2rem', textAlign: 'center' }}>
                                <h2 style={{ color: '#4D5D47', fontWeight: '700' }}>{getManagerProfile?.user?.name ?? ''}</h2>
                                <Chip
                                    label="Perfil: GERENTE DO PARQUE"
                                />
                            </div>
                        </div>
                        <div id='perfilContent' style={{ marginLeft: '1rem', marginTop: '3rem' }}>
                            <div id='titleContent' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h2 style={{ color: '#4D5D47', fontWeight: '700' }}> DADOS PESSOAIS </h2>
                                <div id='divBtnEditar' style={{ marginRight: '1rem' }}>
                                    <Button>
                                        <Image
                                            src="/images/editar.png"
                                            alt="forma abstrata esquerda"
                                            width={20}
                                            height={20}
                                        />
                                    </Button>
                                </div>
                            </div>
                            <div id='emailContent' style={{ display: 'flex' }}>
                                <label htmlFor='email' className='lblProfile'> E-mail: </label>
                                <p id='email' className='paragraphProfile'>{getManagerProfile?.user?.email ?? ''}</p>
                            </div>
                            <div id='phoneContent' style={{ display: 'flex' }}>
                                <label htmlFor='phone' className='lblProfile'> Telefone: </label>
                                <p id='phone' className='paragraphProfile'>{maskPhoneNumber(getManagerProfile?.user?.phone ?? '99999999999')}</p>
                            </div>
                            {/* <div id='genderContent' style={{ display: 'flex' }}>
                                <label htmlFor='gender' className='lblProfile'> Gênero: </label>
                                <p id='gender' className='paragraphProfile'>{getManagerProfile?.user?.email ?? ''}</p>
                            </div> */}
                            <div id='genderContent' style={{ display: 'flex' }}>
                                <label htmlFor='gender' className='lblProfile'> RG: </label>
                                <p id='gender' className='paragraphProfile'>{maskRG(getManagerProfile?.rg ?? '603069150')}</p>
                            </div>
                            <div id='genderContent' style={{ display: 'flex' }}>
                                <label htmlFor='gender' className='lblProfile'> CPF: </label>
                                <p id='gender' className='paragraphProfile'>{maskCPF(getManagerProfile?.cpf ?? '50960513825')}</p>
                            </div>
                            <h2 style={{ color: '#4D5D47', fontWeight: '700', marginTop: '1rem' }}> PARQUE SOB ADMINISTRAÇÃO </h2>
                            <div id='parkContent' style={{ display: 'flex' }}>
                                <Image
                                    src="/images/parque.png"
                                    alt="forma abstrata esquerda"
                                    width={20}
                                    height={20}
                                />
                                <p id='parkName' className='paragraphProfile'>{getManagerProfile?.park?.park_name ?? ''}</p>
                            </div>
                            <div id='genderContent' style={{ marginTop: '2rem', textDecoration: 'underline' }}>
                                {/* <div>
                                    <Link href='#' style={{ color: '#4D5D47', textDecoration: 'underline' }}> Redefinir Senha </Link> <br></br>
                                </div> */}
                                <Link href='#' style={{ color: 'red' }} onClick={() => handleOpen()}> Excluir Conta </Link>
                            </div>
                        </div>
                    </>
                )}
                {selected?.toString() == 'Admin' && (
                    <div id='admin'>
                        <div id='adminHeader' style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h2 style={{ color: '#7D9662', marginLeft: '1rem', borderBottom: '1px solid #7D9662', width: '90%' }}>{getManagerProfile?.park?.park_name ?? ''}</h2>
                            <div id='divBtnEditar' style={{ marginRight: '1rem' }}>
                                <Button>
                                    <Image
                                        src="/images/editar.png"
                                        alt="forma abstrata esquerda"
                                        width={20}
                                        height={20}
                                    />
                                </Button>
                            </div>
                        </div>
                        <div id='parkData' style={{ margin: '1rem' }}>
                            <div id='parkNameContent' style={{ display: 'flex' }}>
                                <label htmlFor='parkName' className='lblProfile'> Nome do Parque: </label>
                                <p id='parkName' className='paragraphProfile'>{getManagerProfile?.park?.park_name ?? ''}</p>
                            </div>
                            <div id='genderContent' style={{ display: 'flex' }}>
                                <label htmlFor='gender' className='lblProfile'> Site: </label>
                                <p id='gender' className='paragraphProfile'>{getManagerProfile?.park?.site ?? ''}</p>
                            </div>
                            <div id='genderContent' style={{ display: 'flex', flexDirection: 'column' }}>
                                <label htmlFor='gender' className='lblProfile'> Horário de Funcionamento: </label>
                                <p id='gender' className='paragraphProfileHor'>{`seg a dom: ${formatTime(getManagerProfile?.park?.openingHours?.[0]?.startTime ?? new Date, '09:00')} - ${formatTime(getManagerProfile?.park?.openingHours?.[0]?.endTime ?? new Date, '16:00')}`}</p>
                            </div>
                            <div id='genderContent' style={{ display: 'flex' }}>
                                <label htmlFor='gender' className='lblProfile'> Localização: </label>
                                <p id='gender' className='paragraphProfile'>{(getManagerProfile?.park?.street ?? '') + ', ' + (getManagerProfile?.park?.number ?? '') + ', ' + (getManagerProfile?.park?.neighborhood ?? '') + '/' + (getManagerProfile?.park?.state ?? '')}</p>
                            </div>
                            {/* <div id='genderContent' style={{ display: 'flex' }}>
                                <label htmlFor='gender' className='lblProfile'> Núcleo: </label>
                                <p id='gender' className='paragraphProfile'> Portão 2 </p>
                            </div> */}
                        </div>
                        <div id='adminContent'>
                            <h3 style={{ color: '#4D5D47', fontWeight: '700', marginLeft: '1rem' }}> TIPO DE MATA </h3>
                            {(getManagerProfile?.park?.parkForestType || []).map((object: any) => (
                                <Chip label={object?.forestType?.name ?? ''} className='chip' />
                            ))}
                        </div>
                        <div>
                            <div className='adminContent'>
                                <h3 style={{ color: '#4D5D47', fontWeight: '700', marginLeft: '1rem' }}> ATIVIDADES </h3>
                                <Link href='/register_park_content' style={{ color: '#A6A6A6', textDecoration: 'underline', marginLeft: '1rem' }}> Ver tudo </Link>
                            </div>
                            <PageComponentList type={activities} layout='row' showCRUDIcons={false} showViewMoreLink={false} />
                        </div>
                        <div>
                            <div className='adminContent'>
                                <h3 style={{ color: '#4D5D47', fontWeight: '700', marginLeft: '1rem' }}> EVENTOS </h3>
                                <Link href='/register_park_event' style={{ color: '#A6A6A6', textDecoration: 'underline', marginLeft: '1rem' }}> Ver tudo </Link>
                            </div>
                            <PageComponentList type={events} layout='row' showCRUDIcons={false} showViewMoreLink={false} />
                        </div>
                        <div>
                            <div className='adminContent'>
                                <h3 style={{ color: '#4D5D47', fontWeight: '700', marginLeft: '1rem' }}> BOAS PRÁTICAS </h3>
                                <Link href='/register_park_practice' style={{ color: '#A6A6A6', textDecoration: 'underline', marginLeft: '1rem' }}> Ver tudo </Link>
                            </div>
                            <PageComponentList type={goodPractices} layout='row' showCRUDIcons={false} showViewMoreLink={false} />
                        </div>
                        <div id='infra' style={{ marginLeft: '1rem' }}>
                            <h3 style={{ color: '#4D5D47', fontWeight: '700', marginLeft: '1rem' }}> INFRAESTRUTURA </h3>
                            <FormGroup>
                                <FormControlLabel control={<Switch defaultChecked />} label="Estacionamento" />
                                <FormControlLabel control={<Switch defaultChecked />} label="Locais para alimentação" />
                                <FormControlLabel control={<Switch defaultChecked />} label="Acessibilidade" />
                                <FormControlLabel control={<Switch defaultChecked />} label="Hospedagem" />
                                <FormControlLabel control={<Switch defaultChecked />} label="Camping" />
                                <FormControlLabel control={<Switch defaultChecked />} label="Banheiro" />
                            </FormGroup>
                        </div>
                        <div>
                            <div className='adminContent'>
                                <h3 style={{ color: '#4D5D47', fontWeight: '700', marginLeft: '1rem' }}> GUIAS CREDENCIADOS </h3>
                                <Link href='/profile_approve' style={{ color: '#A6A6A6', textDecoration: 'underline', marginLeft: '1rem' }}> Ver tudo </Link>
                            </div>
                            <PageComponentList type={guides} layout='row' showCRUDIcons={false} showViewMoreLink={false} />
                        </div>
                    </div>

                )}

            </div>
            <FooterMenu activePage="profile" />
            <ConfirmDialog open={open} onClose={handleClose} />
            <br />
            <br />
            <br />
        </div>
    )
}

export default ManagerProfile;