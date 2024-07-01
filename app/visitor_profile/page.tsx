"use client"

import React, { useState } from 'react';
import Header from '../components/header';
import FooterMenu from '../components/footerMenu';
import { Chip } from '@mui/material';
import Button from '@mui/material/Button';
import Image from 'next/image';
import Link from 'next/link';
import './profile.css';
import PageComponentList from '../components/pageComponentList';
import { usersService } from '../services/axios-config/connection';
import { useQuery } from '../hooks/useQuery';
import Cookies from 'js-cookie';
import { ConfirmDialog } from '../components/excludeDialog';

function maskPhoneNumber(phoneNumber: any) {
    phoneNumber = phoneNumber.replace(/\D/g, '');

    if (phoneNumber.length === 11) {
        return phoneNumber.replace(/(\d{2})(\d{5})(\d{3})/, '($1) $2-$3');
    } else {
        return phoneNumber;
    }
}

const VisitorProfile: React.FC = () => {
    const userId = Cookies.get('id');

    const [getUserProfile, , loadingUser, refetchUser] = useQuery(() => usersService.getUserProfile(Number(userId)), [userId]);

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

    const parks = (getUserProfile?.parkVisit || []).map((object: any, index: number) => ({
        name: object?.park?.park_name ?? '',
        photo: object?.park?.parkImage,
        description: object?.park?.description,
        link: `/content_pages/${object?.park?.id}`
    }));
    return (
        <div>
            <Header />
            <div id='managerProfile'>
                <div id='profileHeader'>
                    <h1 style={{ color: '#7D9662', marginTop: '5rem', fontWeight: '700', fontSize: '20px', textAlign: 'center' }}> MEU PERFIL </h1>
                </div>
                <div className='perfil' style={{ marginTop: '1rem' }}>
                    <div id='infoPerfil' style={{ marginLeft: '2rem', textAlign: 'center' }}>
                        <h2 style={{ color: '#4D5D47', fontWeight: '700' }}>{getUserProfile?.name ?? ''}</h2>
                        <Chip
                            label="Perfil: VISITANTE"
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
                        <p id='email' className='paragraphProfile'>{getUserProfile?.email ?? ''}</p>
                    </div>
                    <div id='phoneContent' style={{ display: 'flex' }}>
                        <label htmlFor='phone' className='lblProfile'> Telefone: </label>
                        <p id='phone' className='paragraphProfile'>{maskPhoneNumber(getUserProfile?.phone ?? '99999999999')}</p>
                    </div>
                    {/* <div id='genderContent' style={{ display: 'flex' }}>
                        <label htmlFor='gender' className='lblProfile'> Gênero: </label>
                        <p id='gender' className='paragraphProfile'>Feminino</p>
                    </div> */}
                    <div id='parquesContent' style={{ marginTop: '2rem' }}>
                        <div className='adminContent'>
                            <h3 style={{ color: '#4D5D47', fontWeight: '700' }}> PARQUES VISITADOS </h3>
                            <Link href='/visited' style={{ color: '#A6A6A6', textDecoration: 'underline', marginLeft: '1rem' }}> Ver tudo </Link>
                        </div>
                        <PageComponentList type={parks} layout='row' showCRUDIcons={false} showViewMoreLink={true} />
                    </div>

                    {/* <Link href='#' style={{ color: '#4D5D47', textDecoration: 'underline' }}> Redefinir Senha </Link> */}
                    <div style={{ marginTop: '1rem' }}>
                        <Link href='#' style={{ color: 'red', textDecoration: 'underline' }} onClick={() => handleOpen()}> Excluir Conta </Link>
                    </div>
                </div>
            </div>
            <FooterMenu activePage="profile" />
            <ConfirmDialog open={open} onClose={handleClose} />
        </div>
    );
};

export default VisitorProfile;