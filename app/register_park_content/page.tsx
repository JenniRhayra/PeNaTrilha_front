// pages/registerContent.tsx
"use client";

import React from 'react';
import FooterMenu from '../components/footerMenu';
import Header from '../components/header';
import '../globals.css';
import ButtonBack from '../components/buttonBack';
import PageComponentList from '../components/pageComponentList';
import styled from 'styled-components';
import HeaderControl from '../components/headerControl';
import SearchComponent from '../components/searchComponent';

const RegisterContent: React.FC = () => {

    // Dados fictícios de atividades
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

    const Container = styled.div`
        display: flex;
        flex-direction: column;
        align-items: left;
        width: 100%;
    `;

    return (
        <Container>
            <Header />
            <ButtonBack />
            <SearchComponent title='ATIVIDADES' />
            <HeaderControl />
            <PageComponentList type={activities} layout='column' showCRUDIcons={true} />
            <FooterMenu activePage="profile" />
        </Container>
    );
};

export default RegisterContent;
