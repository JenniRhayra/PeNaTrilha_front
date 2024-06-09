"use client"

import React from 'react';
import FooterMenu from '../components/footerMenu';
import Header from '../components/header';
import PageComponentList from '../components/pageComponentList';
import '../globals.css';
import SearchComponent from '../components/searchComponent';

const Search: React.FC = () => {
  // Dados fictícios dos guias
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

  return (
    <div>
        <Header />
        <SearchComponent title='GUIAS CREDÊNCIADOS'/>
        <PageComponentList type={guides} layout='column'/>
        <FooterMenu activePage="search" />
    </div>
  );
};

export default Search;