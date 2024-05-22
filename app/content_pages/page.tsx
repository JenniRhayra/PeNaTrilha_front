"use client"
import React from 'react';
import PageHeader from '../components/pageHeaderPromp';
import FooterMenu from '../components/footerMenu';
import { FaLocationDot } from "react-icons/fa6";

const ContentPage: React.FC = () => {
  return (
    <div>
      <PageHeader backgroundImageUrl="/images/parque-carlos-botelho.jpg" showCheck={true} title="PE CARLOS BOTELHO">
        {/* Conteúdo dentro do retângulo branco */}
        <div>
          <FaLocationDot size={25} color="black" />
          <h1>Título da Página</h1>
        </div>
        
        <p>Conteúdo da página...</p>
      </PageHeader>
      <FooterMenu activePage="search" />
    </div>
  );
};

export default ContentPage;
