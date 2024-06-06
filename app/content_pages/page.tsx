"use client"
import React from 'react';
import PageHeader from '../components/pageHeaderPromp';
import FooterMenu from '../components/footerMenu';
import { FaLocationDot } from "react-icons/fa6";
import Link from 'next/link';
import PageComponentList from '../components/pageComponentList';

const ContentPage: React.FC = () => {
  const guides = [
    {
      photo: '/images/guia1.jpg',
      name: 'Guia 1',
      description: 'Descrição do Guia 1',
      language: 'Português',
      park: 'Parque 1',
      link: 'guide/001',
    },
    {
      photo: '/images/guia2.jpg',
      name: 'Guia 2',
      description: 'Descrição do Guia 2',
      language: 'Inglês',
      park: 'Parque 2',
      link: 'guide/002',
    },
    {
      photo: '/images/guia1.jpg',
      name: 'Guia 3',
      description: 'Descrição do Guia 3',
      language: 'Português',
      park: 'Parque 3',
      link: 'guide/003',
    },
    {
      photo: '/images/guia2.jpg',
      name: 'Guia 4',
      description: 'Descrição do Guia 4',
      language: 'Inglês',
      park: 'Parque 4',
      link: 'guide/004',
    },
  ];

  const activities = [
    {
      photo: '/images/at01.jpeg',
      name: 'Atividade 1',
      description: 'Descrição da atividade 1',
      link: 'atv/001',
    },
    {
      photo: '/images/pei_at_01.jpeg',
      name: 'Atividade 2',
      description: 'Descrição da atividade 2',
      link: 'atv/002',
    },
    {
      photo: '/images/pei_at_02.jpeg',
      name: 'Atividade 3',
      description: 'Descrição da atividade 3',
      link: 'atv/003',
    },
    {
      photo: '/images/pei_at_03.jpeg',
      name: 'Atividade 4',
      description: 'Descrição da atividade 4',
      link: 'atv/004',
    },
  ];

  return (
    <div>
      <PageHeader 
        backgroundImageUrl="/images/parque-carlos-botelho.jpg" 
        showCheck={true} 
        title="PE CARLOS BOTELHO"
      >
        {/* Conteúdo dentro do retângulo branco */}
        <div>
          <FaLocationDot size={25} color="black" />
          <h1 style={{fontWeight:'bold'}}>Rodovia SP 139, km 78,4, Abaitinga <br/>
            São Miguel Arcanjo/SP</h1>
        </div>
        
        <div className="subtitles_content">Horário de funcionamento</div>
        <p>seg a dom: 09:00 - 16:00</p>

        <div className="subtitles_content">Telefone</div>
        <p>15 3279-0483</p>

        <div className="subtitles_content">E-mail</div>
        <p>pe.carlosbotelho@fflorestal.sp.gov.br</p>

        <div className="subtitles_content">Site</div>
        <p> <Link href={'https://saomiguelarcanjo.ingressosparquespaulistas.com.br'} target="_blank" rel="noopener noreferrer">saomiguelarcanjo.ingressosparquespaulistas.com.br</Link></p>

        <div className="subtitles_content">Sobre o parque</div>
        <p>A vegetação dominante nessa área é a Floresta Ombrófila Densa Montana. Nessa fisionomia, seis espécies de mamíferos foram registradas exclusivamente: o tatu-peludo, o tamanduá-mirim, a jaritataca, o gato-maracajá, a queixada e a capivara. É também encontrado com certa frequência nos dois núcleos do parque o cágado-da-serra, uma das menores tartarugas de água doce do Brasil, considerado vulnerável pela lista da IUCN. O núcleo tem perfil de visitação e uso público mais voltado a  interesses científicos e de educação ambiental, seguido do ecoturismo, possuindo, entre seus atrativos, as trilhas interpretativas da natureza.</p>
      
        <div className="subtitles_content">Tipo de mata</div>
        <p>Mata Atlântica (floresta ombrófila densa)</p>

        <div className="subtitles_content">Infraestrutura</div>
        <p>• Hospedagens<br/>• Garagens<br/>• Sanitários<br/>• Guaritas</p>

        <div className="subtitles_content">Guias credênciados</div>
        <p><PageComponentList type={guides} layout='row'/></p>

        <div className="subtitles_content">Atividades</div>
        <p><PageComponentList type={activities} layout='row'/></p>
      </PageHeader>
      <FooterMenu activePage="search" />
    </div>
  );
};

export default ContentPage;
