"use client"

import React from 'react';
import ProfileApprove from '../components/profileApprove';
import Header from '../components/header';
import FooterMenu from '../components/footerMenu';
import ButtonBack from '../components/buttonBack';
import HeaderControl from '../components/headerControl';
import SearchComponent from '../components/searchComponent';
import { guideService } from '../services/axios-config/connection';
import Cookies from 'js-cookie';
import { useQuery } from '../hooks/useQuery';
import { Guide } from '../services/axios-config/connection/types/IListGuideByPark';

const Home: React.FC = () => {
  const id = Cookies.get('id');

  const [getPark, , loadingPark, refetchPark] = useQuery(() => guideService.listGuideByPark(Number(id)), [id]);

  const guides = (getPark || []).map((object: Guide, index: number) => ({
    id: object?.id,
    photo: object?.guideImage ?? '',
    name: object?.user?.name ?? '',
    status: object?.approvalStatus,
    habilidades: (object?.specialties || []).map(sg => sg?.specialtyName).join(', '),
    language: (object?.languages || []).map(sg => sg?.languageName).join(', '),
    park: (object?.park || []).map(sg => sg?.park_name).join(', '),
    link: (object?.park || []).map(sg => `/content_pages/${sg.id}/guide/${object?.id}`)?.[0],
  }));

  console.log('guides', guides)

  return (
    <div style={{ position: 'absolute' }}>
      <Header />
      <ButtonBack top={'6vh'} />
      <SearchComponent title='GUIAS' />
      <div>
        <HeaderControl showDelete={false} />
      </div>
      <ProfileApprove profile={guides} refetch={refetchPark} />
      <FooterMenu activePage="profile" />
    </div>
  );
};

export default Home;
