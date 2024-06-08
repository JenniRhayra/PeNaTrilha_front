"use client"

import React from 'react';
import ProfileApprove from '../components/profileApprove';
import Header from '../components/header';
import FooterMenu from '../components/footerMenu';
import ButtonBack from '../components/buttonBack';
import HeaderControl from '../components/headerControl';
import SearchComponent from '../components/searchComponent';

const Home: React.FC = () => {

    const guides = [
        {
          photo: '/images/guia1.jpg',
          name: 'Guia 1',
          status: 'pendente' as 'pendente',
          habilidades: ['Botânica', 'Observação de aves', 'Geologia'],
          language: 'Português',
          park: ['PE Intervales', 'PE Carlos Botelho', 'PETAR'],
          link: 'guide/001',
        },
        {
          photo: '/images/guia2.jpg',
          name: 'Guia 2',
          status: 'aprovado' as 'aprovado',
          habilidades: ['Travessia', 'Observação de aves', 'Botânica'],
          language: 'Inglês',
          park: ['PE Intervales', 'PETAR'],
          link: 'guide/002',
        },
        {
          photo: '/images/guia1.jpg',
          name: 'Guia 3',
          status: 'reprovado' as 'reprovado',
          habilidades: ['Botânica', 'Observação de aves', 'Geologia'],
          language: 'Português',
          park: ['PE Intervales'],
          link: 'guide/003',
        },
        {
          photo: '/images/guia2.jpg',
          name: 'Guia 4',
          status: 'desativado' as 'desativado',
          habilidades: ['Travessia', 'Observação de aves', 'Botânica'],
          language: 'Inglês',
          park: ['PETAR'],
          link: 'guide/004',
        },
      ];

  return (
    <div style={{position:'absolute'}}>
        <Header />
        <ButtonBack />
        <SearchComponent title='GUIAS' />
        <div>
          <HeaderControl showDelete={true} />
        </div>
        <ProfileApprove profile={guides} />
        <FooterMenu activePage="visited" />
    </div>
  );
};

export default Home;
