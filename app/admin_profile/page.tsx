"use client"

import FooterMenu from '../components/footerMenu';
import Header from '../components/header';
import { Chip, Input } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Divider } from '@mui/material';
import Button from '@mui/material/Button';
import Image from 'next/image';
import './profile.css';
import PageComponentList from '../components/pageComponentList';
import Link from 'next/link';
import {TextField} from '@mui/material';
import { Box } from '@mui/material';
import { PhoneMask } from '../components/Mask/PhoneMask';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useForm } from 'react-hook-form';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import ButtonGreen from '../components/buttonGreen';
import {Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';



interface IAdminProfile {

}

const activities = [
    {
        name: "Caminhada",
        photo: "/images/pei_at_01.jpeg",
        description: "Aproveite trilhas desafiadoras e cenários deslumbrantes em nossos parques nacionais.",
        link: "https://example.com/hiking"
      },
      {
        name: "Observação de Aves",
        photo: "/images/pei_at_02.jpeg",
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
      photo: "/images/boas_01.webp",
      description: "Aprenda a minimizar seu impacto ambiental seguindo os princípios de 'Deixe Nenhum Rastro'.",
      link: "https://example.com/leavenotrace"
    },
    {
      name: "Segurança na Trilha",
      photo: "/images/boas_02.jpg",
      description: "Dicas essenciais para se manter seguro enquanto explora trilhas e áreas selvagens.",
      link: "https://example.com/trailsafety"
    }
  ];

  const gerentes = [
    {
      name: "Fernando Moraes",
      description: "Parque: PE Intervales",
      link: "https://example.com/visitorguide"
    },
    {
      name: "Pedro Henrique",
      description: "Parque: Parque Carlos Botelho",
      link: "https://example.com/wildlifeguide"
    }
  ];

  const idiomas = [
    {
      name: "Português",
      link: "https://example.com/visitorguide"
    },
    {
      name: "Inglês",
      link: "https://example.com/wildlifeguide"
    }
  ];

  const especialidades = [
    {
      name: "Botânica",
      link: "https://example.com/visitorguide"
    },
    {
      name: "Observação de Aves",
      link: "https://example.com/wildlifeguide"
    }
  ];

  const infra = [
    {
      name: "Estacionamento",
      link: "https://example.com/visitorguide"
    },
    {
      name: "Hospedagem",
      link: "https://example.com/wildlifeguide"
    }
  ];

  const tiposMata = [
    {
      name: "Mata Atlântica",
      link: "https://example.com/visitorguide"
    },
    {
      name: "Mata de Araucária",
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

const ButtonCancel = styled(ButtonGreen)`
  color: #EF2945;
  background-color: #fff;
  border: 1px solid #EF2945;
  &:hover {
    background-color: #EF2945;
    color: #fff;
  }
`;
  
const ButtonGreenM = styled(ButtonGreen)`
  margin-left: 1rem;
`;


const AdminProfile: React.FC = () => {
    const [selected, setSelected] = useState<'Geral' | 'Admin'>('Geral');
    const [isEditable, setEditable] = useState(false);
    const { register, handleSubmit, setValue } = useForm()
    const [getGender, setGender] = useState("");
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const habilitarCamposEdicao = (event: React.MouseEvent<HTMLButtonElement>) => {
      setEditable(true);
    };

    const handleRedirect = async (newPath: string) => {
      location.pathname = newPath;
    };
    
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleConfirmDelete = () => {
      console.log("Sua conta foi excluída com sucesso!");
      setOpenDeleteDialog(false);
      handleRedirect("/login");
  };

  const handleDeleteAccount = () => {
    setOpenDeleteDialog(true);
  };


    return (
        <div>
            <Header />
            <div id='managerProfile' style={{marginBottom: '5rem'}}>
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
                            <h2 style={{color:'#4D5D47', fontWeight:'700'}}> JOÃO VITOR </h2>
                            <h2 style={{color:'#4D5D47'}}> João Vitor </h2>
                            <Chip
                                label="Perfil: ADMINISTRADOR"    
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
                                    onClick={habilitarCamposEdicao}
                                />
                            </Button>
                            </div>    
                        </div>
                        {isEditable == true && (
                        <div id = 'EditContent'>
                          <Box>
                          <div>
                              <TextField 
                                  label="Nome"
                                  id="input_name"
                                  sx={{ m: 1, width: '35ch' }}
                                  variant="standard"
                                  autoFocus  
                                  defaultValue={'João Vitor'}
                                />
                            </div>
                            <div>
                              <TextField 
                                  label="Email"
                                  id="input_email"
                                  sx={{ m: 1, width: '35ch' }}
                                  variant="standard"  
                                  defaultValue={'joaovitor08@gmail.com'}
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
                            <div>
                                <FormControl required sx={{ m: 1, width: '35ch' }}>
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
                            <div className='flex'>
                              <ButtonCancel width='20ch' onClick={() => handleRedirect('/admin_profile')}>CANCELAR</ButtonCancel>
                              <ButtonGreenM width='20ch' type='submit'>SALVAR</ButtonGreenM>
                            </div>
                           
                          </Box>  
                        </div>
                        )}

                        {isEditable == false && (
                        <div id='GeralContent'>
                          <div id='emailContent' style={{display:'flex'}}>
                              <label htmlFor='email' className='lblProfile'> E-mail: </label> 
                              <p id='email' className='paragraphProfile'>joaovitor08@gmail.com</p>
                          </div>
                          <div id='phoneContent' style={{display:'flex'}}>
                              <label htmlFor='phone' className='lblProfile'> Telefone: </label>
                              <p id='phone' className='paragraphProfile'> (15) 99148-0456</p>
                          </div>
                          <div id='genderContent' style={{display:'flex'}}>
                              <label htmlFor='gender' className='lblProfile'> Gênero: </label>
                              <p id='gender' className='paragraphProfile'>Masculino</p>
                          </div>
                          <div id='genderContent' style={{marginTop:'2rem'}}>
                              <div>
                                  <Link href='/forgot_password' style={{color:'#4D5D47', textDecoration:'underline'}}> Redefinir Senha </Link> <br></br>
                              </div>
                              <div style={{marginTop:'1rem'}}>
                              <ButtonCancel width='20ch' onClick={() => handleDeleteAccount()}>EXCLUIR CONTA </ButtonCancel>
                              </div>   
                          </div> 

                          <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
                            <DialogTitle>Confirmação de Exclusão</DialogTitle>
                            <DialogContent>
                              Tem certeza que deseja excluir sua conta?
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleCloseDeleteDialog} color="primary">
                                Não
                              </Button>
                              <Button onClick={handleConfirmDelete} color="primary">
                                Sim
                              </Button>
                            </DialogActions>
                        </Dialog> 
                        </div> 
                        )}   

                    </div>  
                </>
                )}
                {selected?.toString() == 'Admin' && (
                <div id='admin'>
                    <div id='adminContent'>
                        <div className='adminContent'>
                            <h3 style={{color:'#4D5D47', fontWeight:'700', marginLeft:'1rem'}}> GERENTES DE PARQUES </h3>
                            <Link href='#' style={{color:'#A6A6A6', textDecoration:'underline', marginLeft:'1rem'}}> Ver tudo </Link>
                        </div>
                        <PageComponentList type={gerentes} layout='row' showCRUDIcons={false} showViewMoreLink={false} />
                    </div>
                    <div id='adminContent'>
                        <div className='adminContent'>
                            <h3 style={{color:'#4D5D47', fontWeight:'700', marginLeft:'1rem'}}> TIPOS DE MATA </h3>
                            <Link href='#' style={{color:'#A6A6A6', textDecoration:'underline', marginLeft:'1rem'}}> Ver tudo </Link>
                        </div>
                        <PageComponentList type={tiposMata} layout='row' showCRUDIcons={false} showViewMoreLink={false} />
                    </div>
                    <div id='adminContent'>
                        <div className='adminContent'>
                            <h3 style={{color:'#4D5D47', fontWeight:'700', marginLeft:'1rem'}}> INFRAESTRUTURAS </h3>
                            <Link href='#' style={{color:'#A6A6A6', textDecoration:'underline', marginLeft:'1rem'}}> Ver tudo </Link>
                        </div>
                        <PageComponentList type={infra} layout='row' showCRUDIcons={false} showViewMoreLink={false} />
                    </div>
                    <div id='adminContent'>
                        <div className='adminContent'>
                            <h3 style={{color:'#4D5D47', fontWeight:'700', marginLeft:'1rem'}}> IDIOMAS </h3>
                            <Link href='#' style={{color:'#A6A6A6', textDecoration:'underline', marginLeft:'1rem'}}> Ver tudo </Link>
                        </div>
                        <PageComponentList type={idiomas} layout='row' showCRUDIcons={false} showViewMoreLink={false} />
                    </div>
                    <div id='adminContent'>
                        <div className='adminContent'>
                            <h3 style={{color:'#4D5D47', fontWeight:'700', marginLeft:'1rem'}}> ESPECIALIDADES </h3>
                            <Link href='#' style={{color:'#A6A6A6', textDecoration:'underline', marginLeft:'1rem'}}> Ver tudo </Link>
                        </div>
                        <PageComponentList type={especialidades} layout='row' showCRUDIcons={false} showViewMoreLink={false} />
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
                </div>
            
                )}
                
            </div>
            <FooterMenu activePage="profile" />
        </div>   
    )
}

export default AdminProfile;