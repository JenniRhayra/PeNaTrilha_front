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
import EditActivityDialog from './EditActivityDialog';

const RegisterContent: React.FC = () => {
  const userId = Cookies.get('id');
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentActivity, setCurrentActivity] = useState<any>(null);


  const [getActivities, , loadingActivities, refetchActivities] = useQuery(() => parkService.listManyActivityById(Number(userId)), [userId]);

  const activities = (getActivities || []).map((object: any, index: number) => ({
    photo: object?.activityImage,
    name: object?.activityName,
    description: object?.description,
    link: `/content_pages/${object?.park?.id}/activity/${object?.id}`,
    delete: () => parkService.deleteActivity(object.id),
    reloadList: () => refetchActivities(),
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
      refetchActivities();
      handleEditDialogClose();
    } catch (err: any) {
      console.error(err?.response?.data?.message);
    }
  };

  return (
    <Container>
      <Header />
      <ButtonBack top={'6vh'} />
      <SearchComponent title='ATIVIDADES' />
      <HeaderControl showAdd={true} option='atividade' />
      <PageComponentList type={activities} layout='column' showCRUDIcons={true} showViewMoreLink={false} />
      <FooterMenu activePage="profile" />
      {currentActivity && (
        <EditActivityDialog
          open={openEditDialog}
          onClose={handleEditDialogClose}
          onSubmit={handleEditDialogSubmit}
          initialData={{
            percurso: currentActivity.percurso,
            duracao: currentActivity.duracao,
            description: currentActivity.description,
            isMonitored: currentActivity.isMonitored,
            activityName: currentActivity.activityName,
            activityImage: currentActivity.activityImage,
            id: currentActivity.id,
            difficultyLevel: currentActivity.difficultyLevel,
          }}
        />
      )}
    </Container>
  );
};

export default RegisterContent;
