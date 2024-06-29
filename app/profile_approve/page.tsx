"use client"

import React, { useState, useEffect, useTransition } from 'react';
import ProfileApprove from '../components/profileApprove';
import Header from '../components/header';
import FooterMenu from '../components/footerMenu';
import ButtonBack from '../components/buttonBack';
import HeaderControl from '../components/headerControl';
import SearchComponent from '../components/searchComponent';
import LoadingSpinner from '../components/loadingSpinner';


const Home: React.FC = () => {
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
    <>
      {loading || isPending ? (
          <LoadingSpinner />
        ) : (
        <div style={{position:'absolute'}}>
            <Header />
            <ButtonBack top={'6vh'}/>
            <SearchComponent title='GUIAS' />
            <div>
              <HeaderControl showDelete={true} />
            </div>
            <ProfileApprove profile={guides} />
            <FooterMenu activePage="profile" />
        </div>
      )}
    </>
  );
};

export default Home;
