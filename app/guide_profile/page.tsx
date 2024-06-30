"use client"

import React, { useState, useEffect } from 'react';
import FooterMenu from '../components/footerMenu';
import Header from '../components/header';
import { Avatar } from '@nextui-org/react';
import { Chip, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './profile.css';
import PageComponentList from '../components/pageComponentList';
import Image from 'next/image';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useQuery } from '../hooks/useQuery';
import { toast } from 'react-toastify';
import Autocomplete from '@mui/material/Autocomplete';
import { useForm } from 'react-hook-form';
import { parkService } from '../services/axios-config/connection/park';
import { guideService } from '../services/axios-config/connection';

interface GuideProfile {
  // Implementar interface do profile tipo guia e aplicar na página
}

function maskPhoneNumber(phoneNumber: any) {
  phoneNumber = phoneNumber.replace(/\D/g, '');

  if (phoneNumber.length === 11) {
    return phoneNumber.replace(/(\d{2})(\d{5})(\d{3})/, '($1) $2-$3');
  } else {
    return phoneNumber;
  }
}

const GuideProfile: React.FC = () => {
  const userId = Cookies.get('id');
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const [getGuideProfile, , loadingParks, refetchParks] = useQuery(() => guideService.getGuideProfile(Number(userId)), [userId]);
  const [getLanguages, , loadingLanguages] = useQuery(() => guideService.listLanguages(), []);
  const [getSpeciality, , loadingSpeciality] = useQuery(() => guideService.listSpeciality(), []);
  const [getParks, , ,] = useQuery(() => parkService.listParks(), []);

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(getGuideProfile || {});
  const [getGender, setGender] = useState("");

  useEffect(() => {
    setEditedProfile(getGuideProfile);
  }, [getGuideProfile]);

  const languageOptions = (getLanguages || []).map((object: any) => ({
    value: object.id,
    label: object.languageName,
  }));

  const specialityOptions = (getSpeciality || []).map((object: any) => ({
    value: object.id,
    label: object.specialtyName,
  }));

  const parkOptions = (getParks || []).map((object: any) => ({
    value: object.id,
    label: object.park_name,
  }));

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedProfile(getGuideProfile);
  };

  const handleSaveClick = () => {
    console.log('Dados editados:', editedProfile);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedProfile(getGuideProfile);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProfile((prevProfile: any) => ({
      ...prevProfile,
      user: {
        ...prevProfile.user,
        [name]: value,
      },
      [name]: value,
    }));
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedProfile((prevProfile: any) => ({
      ...prevProfile,
      gender: e.target.value,
    }));
  };

  const handleFormSubmit = async (data: any) => {
    toast.info('Salvando dados...');

    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('nickname', data.nickname);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      formData.append('gender', getGender);
      formData.append('birthDate', data.birthDate);
      formData.append('biography', data.biography);
      formData.append('specialities', JSON.stringify(data.specialities));
      formData.append('parks', JSON.stringify(data.parks));
      formData.append('languages', JSON.stringify(data.languages));

      // Here you can call your API to save the edited profile data
      // await yourApiCallToSaveProfile(formData);

      toast.success('Dados salvos com sucesso!');
      refetchParks(); // Refetch profile data
      setIsEditing(false);
    } catch (error) {
      toast.error('Erro ao salvar dados');
    }
  };

  const parks = (getGuideProfile?.parkGuide || []).map((object: any, index: number) => ({
    photo: object?.park?.parkImage,
    name: object?.park?.park_name,
    description: object?.park?.description,
    link: `/content_pages/${object?.park?.id}`,
  }));

  return (
    <div>
      <Header />
      <div id='profileTitle'>
        <h1 style={{ color: '#7D9662', marginTop: '5rem', fontWeight: '700', fontSize: '20px', display: 'flex', justifyContent: 'center' }}> MEU PERFIL </h1>
      </div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className='perfil' style={{ marginTop: '1rem', paddingLeft: '1rem', display: 'flex', justifyContent: 'center' }}>
          <div id='imagem'>
            <Avatar src={getGuideProfile?.guideImage} className="w-20 h-20 text-large mt-3" />
          </div>
          <div id='infoPerfil' style={{ marginLeft: '2rem' }}>
            {isEditing ? (
              <>
                <TextField
                  name='name'
                  value={editedProfile?.user?.name ?? ''}
                  onChange={handleInputChange}
                  label='Nome'
                  style={{ marginBottom: '1rem' }}
                  error={!!errors.name}
                  helperText={errors.name ? 'Nome é obrigatório' : ''}
                  {...register('name', { required: true })}
                />
                <TextField
                  name='nickname'
                  value={editedProfile?.nickname ?? ''}
                  onChange={handleInputChange}
                  label='Apelido'
                  {...register('nickname')}
                />
              </>
            ) : (
              <>
                <h2 style={{ color: '#4D5D47', fontWeight: '700' }}>{getGuideProfile?.user?.name ?? ''}</h2>
                <h2 style={{ color: '#4D5D47' }}>{getGuideProfile?.nickname ?? ''}</h2>
              </>
            )}
            <Chip label="Perfil: GUIA" />
          </div>
        </div>
        <div id='perfilContent' style={{ marginLeft: '1rem', marginTop: '3rem' }}>
          <div id='titleContent' style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h2 style={{ color: '#4D5D47', fontWeight: '700' }}> DADOS PESSOAIS </h2>
            <div id='divBtnEditar' style={{ marginRight: '1rem' }}>
              <Button onClick={handleEditClick}>
                <Image src="/images/editar.png" alt="Editar" width={20} height={20} />
              </Button>
            </div>
          </div>
          <div id='emailContent' style={{ display: 'flex' }}>
            <label htmlFor='email' className='lblProfile'> E-mail: </label>
            {isEditing ? (
              <TextField
                name='email'
                value={editedProfile?.user?.email ?? ''}
                onChange={handleInputChange}
                className='paragraphProfile'
                error={!!errors.email}
                helperText={errors.email ? 'Email é obrigatório' : ''}
                {...register('email', { required: true, pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ })}
              />
            ) : (
              <p id='email' className='paragraphProfile'>{getGuideProfile?.user?.email ?? ''}</p>
            )}
          </div>
          <div id='phoneContent' style={{ display: 'flex' }}>
            <label htmlFor='phone' className='lblProfile'> Telefone: </label>
            {isEditing ? (
              <TextField
                name='phone'
                value={editedProfile?.user?.phone ?? ''}
                onChange={handleInputChange}
                className='paragraphProfile'
                error={!!errors.phone}
                helperText={errors.phone ? 'Telefone é obrigatório' : ''}
                {...register('phone', { required: true, pattern: /^\(\d{2}\)\s\d{5}-\d{4}$/ })}
              />
            ) : (
              <p id='phone' className='paragraphProfile'>{maskPhoneNumber(getGuideProfile?.user?.phone ?? '99999999999')}</p>
            )}
          </div>
          <div id='genderContent' style={{ display: 'flex' }}>
            <label htmlFor='gender' className='lblProfile'> Sexo: </label>
            {isEditing ? (
              <RadioGroup
                row
                aria-labelledby="gender"
                value={editedProfile?.gender ?? ''}
                onChange={handleGenderChange}
                {...register('gender')}
              >
                <FormControlLabel value="FEMININO" control={<Radio />} label="feminino" />
                <FormControlLabel value="MASCULINO" control={<Radio />} label="masculino" />
                <FormControlLabel value="NAO_RESPONDER" control={<Radio />} label="não responder" />
              </RadioGroup>
            ) : (
              <p id='gender' className='paragraphProfile'>{getGuideProfile?.gender ?? ''}</p>
            )}
          </div>
          <div id='birthDateContent' style={{ display: 'flex' }}>
            <label htmlFor='birthDate' className='lblProfile'> Data de nascimento: </label>
            {isEditing ? (
              <TextField
                name='birthDate'
                value={editedProfile?.birthDate ?? ''}
                onChange={handleInputChange}
                className='paragraphProfile'
                error={!!errors.birthDate}
                helperText={errors.birthDate ? 'Data de nascimento é obrigatória' : ''}
                {...register('birthDate', { required: true })}
              />
            ) : (
              <p id='birthDate' className='paragraphProfile'>{getGuideProfile?.birthDate ?? ''}</p>
            )}
          </div>
          <div id='biographyContent' style={{ display: 'flex' }}>
            <label htmlFor='biography' className='lblProfile'> Biografia: </label>
            {isEditing ? (
              <TextField
                name='biography'
                value={editedProfile?.biography ?? ''}
                onChange={handleInputChange}
                multiline
                rows={4}
                className='paragraphProfile'
                {...register('biography')}
              />
            ) : (
              <p id='biography' className='paragraphProfile'>{getGuideProfile?.biography ?? ''}</p>
            )}
          </div>
          {!isEditing ? (
            <div>
              <h3 style={{ color: '#4D5D47', fontWeight: '700', marginTop: '1rem' }}> ESPECIALIDADES </h3>
              <div id='especialidades'>
                {getGuideProfile?.specialtyGuide.map((item: any) => (
                  <Chip label={item?.specialty?.specialtyName ?? ''} className='chip' />
                ))}
              </div>
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center'>
              <Autocomplete
                sx={{ m: 1, width: '35ch' }}
                multiple
                id="specialities"
                options={specialityOptions}
                getOptionLabel={(option: any) => option.label}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Especialidades"
                    placeholder="Selecionar especialidade"
                    {...register('specialities')}
                  />
                )}
                onChange={(event, newValue) => {
                  setValue('specialities', newValue);
                  setEditedProfile((prevProfile: any) => ({
                    ...prevProfile,
                    specialities: newValue,
                  }));
                }}
              />
            </div>
          )}
          {!isEditing ? (
            <div>
              <h3 style={{ color: '#4D5D47', fontWeight: '700', marginTop: '1rem' }}> IDIOMAS </h3>
              <div id='idiomas'>
                {getGuideProfile?.languageGuide.map((item: any) => (
                  <Chip label={item?.language?.languageName ?? ''} className='chip' />
                ))}
              </div>
            </div>)
            : (
              <div className='flex flex-col items-center justify-center'>
                <Autocomplete
                  sx={{ m: 1, width: '35ch' }}
                  multiple
                  id="languages"
                  options={languageOptions}
                  getOptionLabel={(option: any) => option.label}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Idiomas"
                      placeholder="Selecionar idioma"
                      {...register('languages')}
                    />
                  )}
                  onChange={(event, newValue) => {
                    setValue('languages', newValue);
                    setEditedProfile((prevProfile: any) => ({
                      ...prevProfile,
                      languages: newValue,
                    }));
                  }}
                />
              </div>
            )}
          {!isEditing ? (
            <PageComponentList type={parks} layout="row" />
          ) : (
            <div className='flex flex-col items-center justify-center'>
              <Autocomplete
                sx={{ m: 1, width: '35ch' }}
                multiple
                id="parks"
                options={parkOptions}
                getOptionLabel={(option: any) => option.label}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Parques"
                    placeholder="Selecionar parque"
                    {...register('parks')}
                  />
                )}
                onChange={(event, newValue) => {
                  setValue('parks', newValue);
                  setEditedProfile((prevProfile: any) => ({
                    ...prevProfile,
                    parks: newValue,
                  }));
                }}
              />
            </div>
          )}

          < div id='divBtnEditar' style={{ display: 'flex', justifyContent: 'center' }}>
            {isEditing && (
              <>
                <Button onClick={handleCancelClick}>
                  Cancelar
                </Button>
                <Button onClick={handleSubmit(handleSaveClick)} variant='contained'>
                  Salvar
                </Button>
              </>
            )}
          </div>

        </div>
      </form >
      <FooterMenu activePage='profile' />
      <br />
      <br />
      <br />
    </div >
  );
}

export default GuideProfile;
