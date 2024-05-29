"use client"
import React from 'react';
import PageHeader from '../components/pageHeaderPromp';
import FooterMenu from '../components/footerMenu';
import { FaLocationDot } from "react-icons/fa6";

const ContentPage: React.FC = () => {
  return (
    <div>
      <PageHeader backgroundImageUrl="/images/parque-carlos-botelho.jpg" 
        showCheck={true} title="PE CARLOS BOTELHO">
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
        <p>saomiguelarcanjo.ingressos<br/>parquespaulistas.com.br</p>

        <div className="subtitles_content">Sobre o parque</div>
        <p>A vegetação dominante nessa área é a Floresta Ombrófila Densa Montana. Nessa fisionomia, seis espécies de mamíferos foram registradas exclusivamente: o tatu-peludo, o tamanduá-mirim, a jaritataca, o gato-maracajá, a queixada e a capivara. É também encontrado com certa frequência nos dois núcleos do parque o cágado-da-serra, uma das menores tartarugas de água doce do Brasil, considerado vulnerável pela lista da IUCN. O núcleo tem perfil de visitação e uso público mais voltado a  interesses científicos e de educação ambiental, </p>
      </PageHeader>
      <FooterMenu activePage="search" />
    </div>
  );
};

export default ContentPage;
