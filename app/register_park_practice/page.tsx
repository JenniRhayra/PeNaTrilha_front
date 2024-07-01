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
import EditGoodPracticeDialog from './EditGoodPracticeDialog';

const RegisterContent: React.FC = () => {
  const userId = Cookies.get('id');
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentActivity, setCurrentActivity] = useState<any>(null);


  const [getGoodPractice, , loadingGoodPractice, refetchGoodPractice] = useQuery(() => parkService.listManyGoodPracticeById(Number(userId)), [userId]);

  const goodPractice = (getGoodPractice || []).map((object: any, index: number) => ({
    photo: object?.practiceImage,
    name: object?.title,
    description: '',
    link: `#`,
    delete: () => parkService.deleteActivity(object.id),
    reloadList: () => refetchGoodPractice(),
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

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
    setCurrentActivity(null);
  };

  const handleEditDialogSubmit = async (data: any) => {
    console.log('data', data)
    try {
      await parkService.updateActivity(data);
      refetchGoodPractice();
      handleEditDialogClose();
    } catch (err: any) {
      console.error(err?.response?.data?.message);
    }
  };

  return (
    <Container>
      <Header />
      <ButtonBack top={'6vh'} />
      <SearchComponent title='Dicas' />
      <HeaderControl showAdd={true} option='dicas' />
      <PageComponentList type={goodPractice} layout='column' showCRUDIcons={true} showViewMoreLink={false} />
      <FooterMenu activePage="profile" />
      {currentActivity && (
        <EditGoodPracticeDialog
          open={openEditDialog}
          onClose={handleEditDialogClose}
          onSubmit={handleEditDialogSubmit}
          initialData={{
            title: currentActivity.title,
            practiceImage: currentActivity.practiceImage,
            id: currentActivity.id,
          }}
        />
      )}
    </Container>
  );
};

export default RegisterContent;
