"use client"

import React, { useState } from 'react';
import FooterMenu from '../components/footerMenu';
import Header from '../components/header';
import CarouselImages from '../components/carroselImages';
import SearchComponent from '../components/searchComponent';
import styled from 'styled-components';
import '../globals.css';

const SelectorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 100px 0 10px 0;
`;

const SelectorItem = styled.div<{ isActive: boolean }>`
  margin: 0 15px;
  padding: 10px 10px;
  cursor: pointer;
  font-size: 15px;
  font-weight: ${props => (props.isActive ? 'bold' : 'normal')};
  position: relative;
`;

const SelectorDot = styled.div`
  width: 8px;
  height: 8px;
  background-color: black;
  border-radius: 50%;
  position: absolute;
  bottom: -1px;
  left: 50%;
  transform: translateX(-50%);
`;

const Home: React.FC = () => {
  const [selected, setSelected] = useState<'Parques' | 'Eventos'>('Parques');

  const parquesData = {
    images: [
      '/images/parque-carlos-botelho.jpg',
      '/images/parque-carlos-botelho.jpg',
      '/images/parque-carlos-botelho.jpg',
      '/images/parque-carlos-botelho.jpg',
    ],
    titles: [
      'IMAGEM DE PARQUE 1',
      'IMAGEM DE PARQUE 2',
      'IMAGEM DE PARQUE 3',
      'IMAGEM DE PARQUE 4',
    ],
  };

  const eventosData = {
    images: [
      '/images/evento1.jpg',
      '/images/evento2.jpg',
      '/images/evento3.jpg',
      '/images/evento4.jpg',
    ],
    titles: ['Evento 1', 'Evento 2', 'Evento 3', 'Evento 4'],
  };

  const selectedData = selected === 'Parques' ? parquesData : eventosData;

  return (
    <div>
      <Header />
      <div className='content' style={{ padding: '20px' }}>
        <SearchComponent title='' />
        <SelectorContainer>
          <SelectorItem isActive={selected === 'Parques'} onClick={() => setSelected('Parques')}>
            Parques
            {selected === 'Parques' && <SelectorDot />}
          </SelectorItem>
          <SelectorItem isActive={selected === 'Eventos'} onClick={() => setSelected('Eventos')}>
            Eventos
            {selected === 'Eventos' && <SelectorDot />}
          </SelectorItem>
        </SelectorContainer>
        <CarouselImages
          images={selectedData.images}
          titles={selectedData.titles}
          imageWidth={200}
          imageHeight={400}
          borderRadius={30}
          imageSpacing={20}
        />
      </div>
      <FooterMenu activePage="home" />
    </div>
  );
};

export default Home;
