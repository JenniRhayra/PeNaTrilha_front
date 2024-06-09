"use client"

import React from 'react';
import FooterMenu from '../components/footerMenu';
import Header from '../components/header';
import '../globals.css';
import PageComponentList from '../components/pageComponentList';
import SearchComponent from '../components/searchComponent';
import { IoMdAddCircle } from "react-icons/io";
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

const Visited: React.FC = () => {
  const parks = [
    {
      photo: '/images/parque-carlos-botelho.jpg',
      name: 'PE Carlos Botelho',
      link: '/content_pages',
    },
    {
      photo: '/images/intervales.jpg',
      name: 'PE Intervales',
      link: 'prk/002',
    },
  ];

  const router = useRouter();

  const handleAddClick = () => {
    router.push('/home');
  };

  const AddIconContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    margin-bottom: 80px;
  `;

  const AddText = styled.p`
    margin-top: 10px;
    color: #7D9662;
    font-size: 14px;
    text-align: center;
  `;

  return (
    <div>
      <Header />
      <SearchComponent title='PARQUES VISITADOS'/>
      <div style={{ paddingTop: '30vh' }}>
        <PageComponentList type={parks} layout='column' showCheckIcon={true} />
      </div>
      <AddIconContainer onClick={handleAddClick}>
        <IoMdAddCircle size={50} color="#7D9662"/>
        <AddText>Adicionar mais parques</AddText>
      </AddIconContainer>
      <FooterMenu activePage="visited" />
    </div>
  );
};

export default Visited;
