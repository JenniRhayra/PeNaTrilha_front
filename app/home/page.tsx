"use client"

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FooterMenu from '../components/footerMenu';
import Header from '../components/header';
import CarouselImages from '../components/carroselImages';
import '../globals.css';
import GoogleMaps from '../google_maps/page';
import CustomSkeleton from '../components/customSkeleton';

const SelectorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0 10px 0;
`;

const SelectorItem = styled.div<{ isActive: boolean }>`
  margin: 0 15px;
  padding: 10px 10px;
  cursor: pointer;
  font-size: 15px;
  font-weight: ${props => (props.isActive ? 'bold' : 'normal')};
  position: relative;
  color: ${props => (props.isActive ? '#4D5D47' : '#A6A6A6')}
`;

const SelectorDot = styled.div`
  width: 8px;
  height: 8px;
  background-color: #4D5D47;
  border-radius: 50%;
  position: absolute;
  bottom: -1px;
  left: 50%;
  transform: translateX(-50%);
`;

const Home: React.FC = () => {
  const [selected, setSelected] = useState<'Parques' | 'Eventos'>('Parques');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulando um tempo de carregamento
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const parquesData = {
    images: [
      '/images/parque-carlos-botelho.jpg',
      '/images/intervales.jpg',
      '/images/parque-iguacu.jpg',
      '/images/parque-carlos-botelho.jpg',
    ],
    titles: [
      'PE CARLOS BOTELHO',
      'PE INTERVALES',
      'PE IGUAÇU',
      'IMAGEM DE PARQUE 4',
    ],
    links:[
      '/content_pages',
      '',
      '',
      ''
    ]
  };

  const eventosData = {
    images: [
      '/images/at01.jpeg',
      '/images/pei_at_01.jpeg',
      '/images/pei_at_02.jpeg',
      '/images/pei_at_03.jpg',
    ],
    titles: ['UM DIA NO PARQUE 2024', 'EVENTO 2', 'EVENTO 3', 'EVENTO 4'],
    links: ['','','','']
  };

  const selectedData = selected === 'Parques' ? parquesData : eventosData;

  return (
    <>
      {loading && <CustomSkeleton />}
      {!loading && (
        <div>
          <Header />
          <div className='content' style={{ padding: '20px' }}>
            <h1 style={{textAlign: 'center', fontWeight: 'bold', color: '#7D9662', fontSize:'20px'}}>BORA COMEÇAR?</h1>
            <div style={{alignItems: 'center'}}>
              <GoogleMaps showMap={false}/>
            </div>
            <SelectorContainer>
              <SelectorItem isActive={selected === 'Parques'} onClick={() => setSelected('Parques')}>
                PARQUES
                {selected === 'Parques' && <SelectorDot />}
              </SelectorItem>
              <SelectorItem isActive={selected === 'Eventos'} onClick={() => setSelected('Eventos')}>
                EVENTOS
                {selected === 'Eventos' && <SelectorDot />}
              </SelectorItem>
            </SelectorContainer>
            <CarouselImages
              images={selectedData.images}
              titles={selectedData.titles}
              links={selectedData.links}
              imageWidth={200}
              imageHeight={350}
              borderRadius={30}
              imageSpacing={20}
            />
          </div>
          <div style={{paddingBottom: '50px'}}></div>
          <FooterMenu activePage="home" />
        </div>
      )}
    </>
  );
};

export default Home;
