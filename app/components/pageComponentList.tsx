import React from 'react';
import { useRouter } from 'next/navigation';
import { FiSearch, FiFilter } from 'react-icons/fi';
import { AiOutlineSortAscending } from 'react-icons/ai';
import { IoIosArrowDown } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, Divider } from '@mui/material';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Box } from '@mui/system';

interface Guide {
  photo: string;
  name: string;
  description: string;
  language: string;
  park: string;
  link: string;
}

const GuideList: React.FC<{ guides: Guide[] }> = ({ guides }) => (
  <List>
    {guides.map((guide, index) => (
      <ListItem key={index} style={{ marginBottom: '10px', backgroundColor: 'white', borderRadius: '5px', width: '100%'}}>
        <ListItemAvatar>
          <Avatar sx={{ width: 80, height: 80 }} variant="rounded">
            <Image src={guide.photo} alt={guide.name} width={100} height={100} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={guide.name}
          secondary={
            <>
              <Typography component="span" variant="body2" color="textPrimary">
                {guide.description}
              </Typography>
              <br />
              Idioma: {guide.language}
              <br />
              Parque: {guide.park}
              <br />
              <div style={{ textAlign: 'right'}}>
                <Link href={guide.link} passHref>
                  <Typography component="a" variant="caption" style={{ textDecoration: 'underline', color: '#99B83C' }}>Ver perfil</Typography>
                </Link>
              </div>
            </>
          }
          style={{ paddingLeft: '20px' }}
        />
        
      </ListItem>
    ))}
  </List>
);

  const PageComponentList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleChangeLocation = () => {
    // Implementar lógica para mudar a localização
  };

  // Função para lidar com a pesquisa
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    // Implemente a lógica para buscar o termo na página
  };

  // Dados fictícios dos guias
  const guides: Guide[] = [
    {
      photo: '',
      name: 'Guia 1',
      description: 'Descrição do Guia 1',
      language: 'Português',
      park: 'Parque 1',
      link:'guide/001',
    },
    {
      photo: '',
      name: 'Guia 2',
      description: 'Descrição do Guia 2',
      language: 'Inglês',
      park: 'Parque 2',
      link:'guide/002',
    },
    // Adicione mais guias conforme necessário
  ];

  return (
    <div style={{ 
      position: 'absolute', 
      top: '15vh', 
      left: '27%', 
      transform: 'translate(-25%, -25%)',
      textAlign: 'center',
      width: '90%', // Defina a largura desejada da caixa de busca
      maxWidth: '900px', // Largura máxima da caixa de busca
      margin: '0 auto', // Centralizar horizontalmente
      padding: '0 15px' // Adicionar margem fixa à esquerda e à direita
    }}>
      {/* Localização atual */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FaLocationDot style={{ color: '#667358' }}/>
          <span style={{ marginLeft: '10px' }}>Localização Atual</span>
        </div>
        <button 
          onClick={handleChangeLocation} 
          style={{ 
            marginLeft: '10px',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer'
          }}>
          <IoIosArrowDown />
        </button>
      </div>
  
      {/* Campo de busca */}
      <div style={{ position: 'relative', marginTop: '10px'}}>
        <input 
          type="text" 
          placeholder="Buscar parque, guia, trilha..." 
          onChange={handleSearch} 
          style={{ 
            width: '100%', // Largura do campo de busca
            padding: '5px', // Espaçamento interno
            border: '1px solid #667358',
            borderRadius: '4px'
        }} />
        <div style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>
          <FiSearch />
        </div>
      </div>
        
      {/* Título da página */}
      <h1 style={{ 
        position: 'absolute', 
        top: '15vh', 
        left: '50%', 
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        textTransform: 'uppercase', 
        fontSize: '18px', 
        fontWeight: 'bold', 
        color: '#667358'}}>Guias Credênciados</h1>
      
      {/* Ícone de filtro e ordenação */}
      <div style={{ position: 'relative', top: '10vh', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button><FiFilter /></button>
        <button><AiOutlineSortAscending /></button>
      </div>

      {/* Lista de guias */}
      <Box sx={{ width: '100%', position: 'absolute', top: '25vh', left: 0 }}>
        <GuideList guides={guides} />
      </Box>

    </div>
  );
  
  
};

export default PageComponentList;
