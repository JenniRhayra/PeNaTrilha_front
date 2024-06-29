"use client"

import FooterMenu from '../components/footerMenu';
import React, { useState, useEffect, useTransition } from 'react';
import Header from '../components/header';
import { Chip } from '@mui/material';
import styled from 'styled-components';
import { Divider } from '@mui/material';
import Button from '@mui/material/Button';
import {Switch, FormGroup, FormControlLabel} from '@mui/material';
import Image from 'next/image';
import './profile.css';
import PageComponentList from '../components/pageComponentList';
import Link from 'next/link';
import LoadingSpinner from '../components/loadingSpinner';


interface IManagerProfile {

}

const activities = [
    {
        name: "Caminhada",
        photo: "/images/at01.jpeg",
        description: "Aproveite trilhas desafiadoras e cenários deslumbrantes em nossos parques nacionais.",
        link: "https://example.com/hiking"
      },
      {
        name: "Observação de Aves",
        photo: "/images/at01.jpeg",
        description: "Descubra uma variedade de aves em seus habitats naturais, perfeito para entusiastas da natureza.",
        link: "https://example.com/birdwatching"
      }
]

const events = [
    {
      name: "Festival da Primavera",
      photo: "/images/at01.jpeg",
      description: "Celebre a chegada da primavera com atividades ao ar livre, música ao vivo e muita diversão.",
      link: "https://example.com/springfestival"
    },
    {
      name: "Noite de Astronomia",
      photo: "/images/at01.jpeg",
      description: "Participe de uma noite de observação de estrelas e aprenda sobre constelações com especialistas.",
      link: "https://example.com/stargazing"
    }
  ];

  const goodPractices = [
    {
      name: "Deixe Nenhum Rastro",
      photo: "/images/at01.jpeg",
      description: "Aprenda a minimizar seu impacto ambiental seguindo os princípios de 'Deixe Nenhum Rastro'.",
      link: "https://example.com/leavenotrace"
    },
    {
      name: "Segurança na Trilha",
      photo: "/images/at01.jpeg",
      description: "Dicas essenciais para se manter seguro enquanto explora trilhas e áreas selvagens.",
      link: "https://example.com/trailsafety"
    }
  ];

  const guides = [
    {
      name: "Guia do Visitante",
      photo: "/images/at01.jpeg",
      description: "Tudo o que você precisa saber antes de visitar nossos parques, incluindo mapas e informações úteis.",
      link: "https://example.com/visitorguide"
    },
    {
      name: "Guia de Fauna e Flora",
      photo: "/images/at01.jpeg",
      description: "Conheça as espécies de plantas e animais que você pode encontrar nos parques e como identificá-las.",
      link: "https://example.com/wildlifeguide"
    }
  ];

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
    const [selected, setSelected] = useState<'Geral' | 'Admin'>('Geral');

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
                                
                            <div className='perfil' style={{marginTop:'1rem'}}> 
                                <div id='infoPerfil' style={{marginLeft:'2rem', textAlign:'center'}}>
                                    <h2 style={{color:'#4D5D47', fontWeight:'700'}}> FERNANDO MORAES </h2>
                                    <h2 style={{color:'#4D5D47'}}> Fernando Moraes </h2>
                                    <Chip
                                        label="Perfil: GERENTE DO PARQUE"    
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
                                    <p id='email' className='paragraphProfile'>fernado@gmail.com</p>
                                </div>
                                <div id='phoneContent' style={{display:'flex'}}>
                                    <label htmlFor='phone' className='lblProfile'> Telefone: </label>
                                    <p id='phone' className='paragraphProfile'> (15) 99148-0483</p>
                                </div>
                                <div id='genderContent' style={{display:'flex'}}>
                                    <label htmlFor='gender' className='lblProfile'> Gênero: </label>
                                    <p id='gender' className='paragraphProfile'>Masculino</p>
                                </div>
                                <div id='genderContent' style={{display:'flex'}}>
                                    <label htmlFor='gender' className='lblProfile'> RG: </label>
                                    <p id='gender' className='paragraphProfile'>12.345.678-9</p>
                                </div>
                                <div id='genderContent' style={{display:'flex'}}>
                                    <label htmlFor='gender' className='lblProfile'> CPF: </label>
                                    <p id='gender' className='paragraphProfile'>23.456.789-09</p>
                                </div>
                                <h2 style={{color:'#4D5D47', fontWeight:'700', marginTop:'1rem'}}> PARQUE SOB ADMINISTRAÇÃO </h2>  
                                <div id='parkContent' style={{display:'flex'}}>
                                <Image
                                    src="/images/parque.png"
                                    alt="forma abstrata esquerda"
                                    width={20}
                                    height={20}
                                />
                                    <p id='parkName' className='paragraphProfile'> PE INTERVALES</p>    
                                </div> 
                                <div id='genderContent' style={{marginTop:'2rem', textDecoration:'underline'}}>
                                    <div>
                                        <Link href='#' style={{color:'#4D5D47', textDecoration:'underline'}}> Redefinir Senha </Link> <br></br>
                                    </div>
                                    <Link href='#' style={{color:'red'}}> Excluir Conta </Link>
                                </div>    
                            </div>
                        </>
                        )}
                        {selected?.toString() == 'Admin' && (
                        <div id='admin'>
                            <div id='adminHeader' style={{display:'flex', justifyContent:'space-between'}}>
                                <h2 style={{color:'#7D9662', marginLeft:'1rem', borderBottom:'1px solid #7D9662', width:'90%'}}> PE INTERVALES </h2>  
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
                            <div id='parkData' style={{margin:'1rem'}}>    
                                <div id='parkNameContent' style={{display:'flex'}}>
                                    <label htmlFor='parkName' className='lblProfile'> Nome do Parque: </label> 
                                    <p id='parkName' className='paragraphProfile'> PE Intervales </p>
                                </div>
                                <div id='genderContent' style={{display:'flex'}}>
                                    <label htmlFor='gender' className='lblProfile'> Site: </label>
                                    <p id='gender' className='paragraphProfile'> https://intervales.com.br </p>
                                </div>
                                <div id='genderContent' style={{display:'flex', flexDirection: 'column'}}>
                                    <label htmlFor='gender' className='lblProfile'> Horário de Funcionamento: </label>
                                    <p id='gender' className='paragraphProfileHor'> SEG 08:00 - 18:00</p>
                                    <p id='gender' className='paragraphProfileHor'> TER 08:00 - 18:00</p>
                                    <p id='gender' className='paragraphProfileHor'> QUA 08:00 - 18:00</p>
                                    <p id='gender' className='paragraphProfileHor'> QUI 08:00 - 18:00</p>
                                    <p id='gender' className='paragraphProfileHor'> SEX 08:00 - 18:00</p>
                                </div>
                                <div id='genderContent' style={{display:'flex'}}>
                                    <label htmlFor='gender' className='lblProfile'> Localização: </label>
                                    <p id='gender' className='paragraphProfile'> Estrada Municipal SP-181, Km 55, Bairro Serra, Ribeirão Grande, SP, CEP 18315-000 </p>
                                </div>
                                <div id='genderContent' style={{display:'flex'}}>
                                    <label htmlFor='gender' className='lblProfile'> Núcleo: </label>
                                    <p id='gender' className='paragraphProfile'> Portão 2 </p>
                                </div>
                            </div>
                            <div id='adminContent'>
                                <h3 style={{color:'#4D5D47', fontWeight:'700', marginLeft:'1rem'}}> TIPO DE MATA </h3>
                                <Chip label="Mata Atlântica" className='chip'/>
                                <Chip label="Mata de Araucária" className='chip'/>
                            </div>
                            <div>
                                <div className='adminContent'>
                                    <h3 style={{color:'#4D5D47', fontWeight:'700', marginLeft:'1rem'}}> ATIVIDADES </h3>
                                    <Link href='#' style={{color:'#A6A6A6', textDecoration:'underline', marginLeft:'1rem'}}> Ver tudo </Link>
                                </div>
                                <PageComponentList type={activities} layout='row' showCRUDIcons={false} showViewMoreLink={false} />
                            </div>
                            <div> 
                                <div className='adminContent'>
                                    <h3 style={{color:'#4D5D47', fontWeight:'700', marginLeft:'1rem'}}> EVENTOS </h3>
                                    <Link href='#' style={{color:'#A6A6A6', textDecoration:'underline', marginLeft:'1rem'}}> Ver tudo </Link>
                                </div>      
                                    <PageComponentList type={events} layout='row' showCRUDIcons={false} showViewMoreLink={false} />
                            </div>
                            <div>
                                <div className='adminContent'> 
                                    <h3 style={{color:'#4D5D47', fontWeight:'700', marginLeft:'1rem'}}> BOAS PRÁTICAS </h3>
                                    <Link href='#' style={{color:'#A6A6A6', textDecoration:'underline', marginLeft:'1rem'}}> Ver tudo </Link>
                                </div>  
                                <PageComponentList type={goodPractices} layout='row' showCRUDIcons={false} showViewMoreLink={false} />
                            </div>
                            <div id='infra' style={{marginLeft:'1rem'}}>
                                <h3 style={{color:'#4D5D47', fontWeight:'700', marginLeft:'1rem'}}> INFRAESTRUTURA </h3>
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
                                    <h3 style={{color:'#4D5D47', fontWeight:'700', marginLeft:'1rem'}}> GUIAS CREDENCIADOS </h3>
                                    <Link href='#' style={{color:'#A6A6A6', textDecoration:'underline', marginLeft:'1rem'}}> Ver tudo </Link>
                                </div>    
                                <PageComponentList type={guides} layout='row' showCRUDIcons={false} showViewMoreLink={false} />
                            </div>           
                        </div>
                    
                        )}
                        
                    </div>
                    <FooterMenu activePage="profile" />
                </div>   
            )}
        </>
    )
}

export default ManagerProfile;