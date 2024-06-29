"use client"

import React, { useState, useEffect, useTransition } from 'react';
import FooterMenu from '../components/footerMenu';
import Header from '../components/header';
import ButtonGreen from '../components/buttonGreen';
import '../globals.css';
import { Avatar } from '@nextui-org/react';
import { Chip } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './profile.css';
import PageComponentList from '../components/pageComponentList';
import Image from 'next/image';
import Link from 'next/link';
import LoadingSpinner from '../components/loadingSpinner';

interface GuideProfile {
 //Implementar interface do profile tipo guia e aplicar na pagina

}

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
  },
  {
    photo: '/images/parque-carlos-botelho.jpg',
    name: 'Parque Nacional da Chapada Diamantina',
    description: 'Conhecido por suas montanhas, vales, cachoeiras e grutas, oferece trilhas desafiadoras e vistas espetaculares, além de uma rica biodiversidade.',
    link: 'atv/003',
  },
  {
    photo: '/images/parque-carlos-botelho.jpg',
    name: 'Parque Nacional da Serra dos Órgãos',
    description: 'Conhecido por suas formações rochosas impressionantes e trilhas desafiadoras, incluindo a famosa Travessia Petrópolis-Teresópolis.',
    link: 'atv/004',
  },
];

const GuideProfile: React.FC = () => {
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
            <div id='profileTitle'>
              <h1 style={{color:'#7D9662', marginTop:'5rem', fontWeight:'700', fontSize: '20px', display:'flex', justifyContent:'center'}}> MEU PERFIL </h1>
            </div>
            <div className='perfil' style={{marginTop:'1rem', paddingLeft:'1rem', display:'flex', justifyContent:'center'}}> 
              <div id='imagem'>
                <Avatar src="/images/guia4.jpg" className="w-20 h-20 text-large mt-3" />
              </div>
              <div id='infoPerfil' style={{marginLeft:'2rem'}}>
                <h2 style={{color:'#4D5D47', fontWeight:'700'}}> ANDERSON SILVA </h2>
                <h2 style={{color:'#4D5D47'}}> Anderson Roberto da Silva </h2>
                <Chip
                    label="Perfil: GUIA"    
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
                <p id='email' className='paragraphProfile'>andersonsilva.81@gmail.com</p>
              </div>
              <div id='phoneContent' style={{display:'flex'}}>
                <label htmlFor='phone' className='lblProfile'> Telefone: </label>
                <p id='phone' className='paragraphProfile'> (15) 99148-0483</p>
              </div>
              <div id='genderContent' style={{display:'flex'}}>
                <label htmlFor='gender' className='lblProfile'> Gênero: </label>
                <p id='gender' className='paragraphProfile'>Masculino</p>
              </div>
              <div id='birthContent' style={{display:'flex'}}>
                <label htmlFor='birthDate' className='lblProfile'> Data de Nascimento: </label>
                <p id='birthDate' className='paragraphProfile'> 19/09/1981</p>
              </div>
              <div id='biographyContent'>
                <label htmlFor='biography' className='lblProfile'> Sobre mim: </label>
                <TextField
                  sx={{ m: 1, width: '35ch'
                  }}
                  id="biography"
                  disabled
                  multiline
                  rows={4}
                  defaultValue="Sou conhecedor na área em que atuo, possuo conhecimento na área de turismo ecológico e bioespeleologia."
                  style={{width:'90%'}}
                  />
              </div>
              <Link href='#' style={{color:'#4D5D47', textDecoration:'underline'}}> Redefinir Senha </Link>
              <div style={{marginTop:'1rem'}}>
                  <Link href='#' style={{color:'red', textDecoration:'underline'}}> Excluir Conta </Link>
              </div> 
              <h3 style={{color:'#4D5D47', fontWeight:'700', marginTop:'1rem'}}> ESPECIALIDADES </h3> 
              <div id='especialidades'>
                <Chip label="Botânica" className='chip'/>
                <Chip label="Observação de Aves" className='chip'/>
                <Chip label="Geologia" className='chip'/>
                <Chip label="Geologia" className='chip'/>
                <Chip label="Geologia" className='chip'/>
                <Chip label="Geologia" className='chip'/>
                <Chip label="Geologia" className='chip'/>
              </div>
              
              <h3 style={{color:'#4D5D47', fontWeight:'700', marginTop:'1rem'}}> IDIOMAS </h3> 
                <div id='idiomas'>
                  <Chip label="Português" className='chip'></Chip>
                  <Chip label="Inglês" className='chip'></Chip>
                </div> 
              <h3 style={{color:'#4D5D47', fontWeight:'700', marginTop:'1rem'}}> PARQUES VINCULADOS </h3> 
                <div id='parquesContent'>
                  <PageComponentList type={parks} layout='row' showCRUDIcons={false} showViewMoreLink={true} />
                </div>
                
            </div>
            
            <FooterMenu activePage="profile" />
        </div>
      )}
    </>
  );
};

export default GuideProfile;