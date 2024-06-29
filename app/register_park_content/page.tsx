"use client";

import React, { useState, useEffect, useTransition } from 'react';
import FooterMenu from '../components/footerMenu';
import Header from '../components/header';
import '../globals.css';
import ButtonBack from '../components/buttonBack';
import PageComponentList from '../components/pageComponentList';
import styled from 'styled-components';
import HeaderControl from '../components/headerControl';
import SearchComponent from '../components/searchComponent';
import LoadingSpinner from '../components/loadingSpinner';

const RegisterContent: React.FC = () => {

  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handlePageLoad = () => {
      startTransition(() => {
        setLoading(false);
      });
    };

    if (document.readyState === 'complete') {
      handlePageLoad();
    } else {
      window.addEventListener('load', handlePageLoad);
      return () => window.removeEventListener('load', handlePageLoad);
    }
  }, []);

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
      <>
        {loading || isPending ? (
            <LoadingSpinner />
          ) : (
          <Container>
              <Header />
              <ButtonBack top={'6vh'}/>
              <SearchComponent title='ATIVIDADES' />
              <HeaderControl showAdd ={true}/>
              <PageComponentList type={activities} layout='column' showCRUDIcons={true} showViewMoreLink={false} />
              <FooterMenu activePage="profile" />
          </Container>
        )}
      </>
    );
};

export default RegisterContent;
