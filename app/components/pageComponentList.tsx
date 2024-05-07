import React from 'react';
import { useRouter } from 'next/navigation';
import { FiFilter } from 'react-icons/fi';
import { AiOutlineSortAscending } from 'react-icons/ai';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography } from '@mui/material';
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
  const router = useRouter();

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
