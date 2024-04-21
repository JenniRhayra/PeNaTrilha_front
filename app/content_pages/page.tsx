"use client"
import React from 'react';
import PageHeader from '../components/pageHeaderPromp';
import FooterMenu from '../components/footerMenu';

const ContentPage: React.FC = () => {
  return (
    <div>
      <PageHeader backgroundImageUrl="/images/parque-carlos-botelho.jpg" showCheck={true}>
        {/* Conteúdo dentro do retângulo branco */}
        <h1>Título da Página</h1>
        <p>Conteúdo da página...</p>
      </PageHeader>
      <FooterMenu activePage="search" />
    </div>
  );
};

export default ContentPage;
