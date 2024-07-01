"use client";

import React, { useState } from 'react';
import FooterMenu from '../components/footerMenu';
import Header from '../components/header';
import '../globals.css';
import ButtonBack from '../components/buttonBack';
import PageComponentList from '../components/pageComponentList';
import styled from 'styled-components';
import HeaderControl from '../components/headerControl';
import SearchComponent from '../components/searchComponent';
import Cookies from 'js-cookie';
import { parkService } from '../services/axios-config/connection/park';
import { useQuery } from '../hooks/useQuery';
import EditEventDialog from './EditEventDialog';

const RegisterContent: React.FC = () => {
  const userId = Cookies.get('id');
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentActivity, setCurrentActivity] = useState<any>(null);


  const [getEvent, , loadingEvent, refetchEvent] = useQuery(() => parkService.listManyEventById(Number(userId)), [userId]);

  const events = (getEvent || []).map((object: any, index: number) => ({
    photo: object?.eventImage,
    name: object?.event_name,
    description: object?.description,
    link: `/content_pages/${object?.park?.id}/events/${object?.id}`,
    delete: () => parkService.deleteActivity(object.id),
    reloadList: () => refetchEvent(),
    edit: () => {
      setCurrentActivity(object);
      setOpenEditDialog(true);
    },
  }));

  const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    width: 100%;
  `;

  console.log('currentActivity', currentActivity)

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
    setCurrentActivity(null);
  };

  const handleEditDialogSubmit = async (data: any) => {
    console.log('data', data)
    try {
      await parkService.updateActivity(data);
      refetchEvent();
      handleEditDialogClose();
    } catch (err: any) {
      console.error(err?.response?.data?.message);
    }
  };

  return (
    <Container>
      <Header />
      <ButtonBack top={'6vh'} />
      <SearchComponent title='Evento' />
      <HeaderControl showAdd={true} option='evento' />
      <PageComponentList type={events} layout='column' showCRUDIcons={true} showViewMoreLink={false} />
      <FooterMenu activePage="profile" />
      {currentActivity && (
        <EditEventDialog
          open={openEditDialog}
          onClose={handleEditDialogClose}
          onSubmit={handleEditDialogSubmit}
          initialData={{
            event_name: currentActivity.percurso,
            description: currentActivity.duracao,
            start_date: currentActivity.description,
            end_date: currentActivity.isMonitored,
            locationRef: currentActivity.activityName,
            eventImage: currentActivity.activityImage,
            id: currentActivity.id,
          }}
        />
      )}
    </Container>
  );
};

export default RegisterContent;
