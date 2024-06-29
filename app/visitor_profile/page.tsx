"use client"

import React, { useState, useEffect, useTransition } from 'react';
import Header from '../components/header';
import FooterMenu from '../components/footerMenu';
import { Chip } from '@mui/material';
import Button from '@mui/material/Button';
import Image from 'next/image';
import Link from 'next/link';
import './profile.css';
import PageComponentList from '../components/pageComponentList';
import LoadingSpinner from '../components/loadingSpinner';

const parks = [
    {
      photo: '/images/parque-iguacu.jpg',
      name: 'Parque Iguaçu',
      description: 'Famoso pelas Cataratas do Iguaçu, uma das novas sete maravilhas da natureza.',
      link: 'atv/001',
    },
    {
      photo: '/images/parque-carlos-botelho.jpg',
      name: 'Parque Carlos Botelho',
      description: 'Conhecido por suas paisagens de cerrado, cachoeiras e trilhas deslumbrantes.',
      link: 'atv/002',
    }
]

const VisitorProfile: React.FC = () => {
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

    return (
        <>
            {loading || isPending ? (
                <LoadingSpinner />
            ) : (
                <div>
                    <Header /> 
                    <div id='managerProfile'>
                        <div id='profileHeader'>
                            <h1 style={{color:'#7D9662', marginTop:'5rem', fontWeight:'700', fontSize: '20px', textAlign:'center'}}> MEU PERFIL </h1>
                        </div>
                        <div className='perfil' style={{marginTop:'1rem'}}> 
                            <div id='infoPerfil' style={{marginLeft:'2rem', textAlign:'center'}}>
                                <h2 style={{color:'#4D5D47', fontWeight:'700'}}> ALINE FREITAS </h2>
                                <h2 style={{color:'#4D5D47'}}> Aline Freitas </h2>
                                <Chip
                                    label="Perfil: VISITANTE"    
                                />
                            </div>
                        </div>
                        <div id='perfilContent' style={{marginLeft:'1rem', marginTop:'3rem'}}>
                            <div id='titleContent' style={{display:'flex', justifyContent:'space-between'}}>
                                <h2 style={{color:'#4D5D47', fontWeight:'700'}}> DADOS PESSOAIS </h2>  
                                <div id='divBtnEditar' style={{marginRight:'1rem'}}>
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
                            <div id='emailContent' style={{display:'flex'}}>
                                <label htmlFor='email' className='lblProfile'> E-mail: </label> 
                                <p id='email' className='paragraphProfile'>alinefreitas56@outlook.com</p>
                            </div>
                            <div id='phoneContent' style={{display:'flex'}}>
                                <label htmlFor='phone' className='lblProfile'> Telefone: </label>
                                <p id='phone' className='paragraphProfile'> (15) 99148-0483</p>
                            </div>
                            <div id='genderContent' style={{display:'flex'}}>
                                <label htmlFor='gender' className='lblProfile'> Gênero: </label>
                                <p id='gender' className='paragraphProfile'>Feminino</p>
                            </div>
                            <div id='parquesContent' style={{marginTop:'2rem'}}>
                                <div className='adminContent'>
                                    <h3 style={{color:'#4D5D47', fontWeight:'700'}}> PARQUES VISITADOS </h3> 
                                    <Link href='#' style={{color:'#A6A6A6', textDecoration:'underline', marginLeft:'1rem'}}> Ver tudo </Link>
                                </div>
                                <PageComponentList type={parks} layout='row' showCRUDIcons={false} showViewMoreLink={true} />
                            </div>

                            <Link href='#' style={{color:'#4D5D47', textDecoration:'underline'}}> Redefinir Senha </Link> 
                            <div style={{marginTop:'1rem'}}>
                                <Link href='#' style={{color:'red', textDecoration:'underline'}}> Excluir Conta </Link>
                            </div>
                        </div>
                    </div>
                    <FooterMenu activePage="profile" />
                </div>
            )}
        </>
    );
};

export default VisitorProfile;