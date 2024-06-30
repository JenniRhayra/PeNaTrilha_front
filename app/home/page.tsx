"use client"

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FooterMenu from '../components/footerMenu';
import Header from '../components/header';
import CarouselImages from '../components/carroselImages';
import '../globals.css';
import GoogleMaps from '../google_maps/page';
import CustomSkeleton from '../components/customSkeleton';
import { useQuery } from '../hooks/useQuery';
import { parkService } from '../services/axios-config/connection/park';
import { Park, Event } from '../services/axios-config/connection/types/IListManyParksInfo';

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
  const [selectedData, setSelectedData] = useState<any>();
  const [getParks, , loadingParks, refetchParks] = useQuery(() => parkService.listManyParkInfo(), []);
  const [parquesData, setParquesData] = useState({
    id: [],
    images: [],
    titles: [],
    links: [],
    navigate: []
  });

  const [eventosData, setEventosData] = useState({
    id: [],
    images: [],
    titles: [],
    links: ['', '', '', ''],
    navigate: []
  });

  useEffect(() => {
    if (!loadingParks) {
      setParquesData({
        id: getParks?.park?.map((park: Park) => park?.id),
        images: getParks?.park?.map((park: Park) => park?.parkImage),
        titles: getParks?.park?.map((park: Park) => park?.park_name),
        links: getParks?.park?.map((park: Park) => park?.site),
        navigate: getParks?.park?.map((park: Park) => `/content_pages/${park?.id}`),
      });
      setEventosData({
        id: getParks?.park?.map((park: Park) => park?.events?.map((event: Event) => event?.id)),
        images: getParks?.park?.map((park: Park) => (park?.events?.map((event: Event) => event?.eventImage))?.[0]),
        titles: getParks?.park?.map((park: Park) => park?.events?.map((event: Event) => event?.event_name)),
        links: [],
        navigate: getParks?.park?.map((park: Park) => park?.events?.map((event: Event) => `/content_pages/${park?.id}/events/${event?.id}`)?.[0]),
      });
    }
  }, [getParks, loadingParks]);

  useEffect(() => {
    setSelectedData(selected == 'Parques' ? parquesData : eventosData)
  }, [selected, eventosData, parquesData])



  return (
    <>
      {loadingParks && <CustomSkeleton />}
      {!loadingParks && (
        <div>
          <Header />
          <div className='content' style={{ padding: '20px' }}>
            <h1 style={{ textAlign: 'center', fontWeight: 'bold', color: '#7D9662', fontSize: '20px' }}>BORA COMEÇAR?</h1>
            <div style={{ alignItems: 'center' }}>
              <GoogleMaps showMap={false} />
            </div>
            <SelectorContainer>
              <SelectorItem isActive={selected == 'Parques'} onClick={() => setSelected('Parques')}>
                PARQUES
                {selected === 'Parques' && <SelectorDot />}
              </SelectorItem>
              <SelectorItem isActive={selected == 'Eventos'} onClick={() => setSelected('Eventos')}>
                EVENTOS
                {selected === 'Eventos' && <SelectorDot />}
              </SelectorItem>
            </SelectorContainer>
            <CarouselImages
              loading={loadingParks}
              imageWidth={200}
              imageHeight={350}
              borderRadius={30}
              imageSpacing={20}
              getParks={selectedData}
              selected={selected}
            />
          </div>
          <div style={{ paddingBottom: '50px' }}></div>
          <FooterMenu activePage="home" />
        </div>
      )}
    </>
  );
};

export default Home;
