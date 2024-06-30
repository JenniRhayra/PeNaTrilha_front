"use client";
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@/app/hooks/useQuery';
import { Guide } from '@/app/services/axios-config/connection/types/IListManyParksInfo';
import { guideService } from '@/app/services/axios-config/connection';
import PageHeader from '@/app/components/pageHeaderPromp';
import FooterMenu from '@/app/components/footerMenu';
import { parkService } from '@/app/services/axios-config/connection/park';

function maskPhoneNumber(phoneNumber: any) {
  phoneNumber = phoneNumber.replace(/\D/g, '');

  if (phoneNumber.length === 11) {
    return phoneNumber.replace(/(\d{2})(\d{5})(\d{3})/, '($1) $2-$3');
  } else {
    return phoneNumber;
  }
}

const GuidePage: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState('parque');

  const params = useParams();
  const id = params.id;
  const guideId = params.guideId;


  const [guideInformation, ,] = useQuery(() => guideService.getGuideByParkIdAndGuideId(Number(id), Number(guideId)), [id, guideId]);

  const [getPark, , loadingPark, refetchPark] = useQuery(() => parkService.listManyParkInfoById(Number(id)), [id]);

  console.log('guides', guideInformation)

  const renderContent = () => {
    return (
      <div>
        <h1 style={{ textAlign: 'center', color: '#4D5D47', fontWeight: 'bold', marginBottom: '2vh', textTransform: 'uppercase' }}>INFORMAÇÕES DO GUIA</h1>
        <h1 style={{ fontWeight: 'bold', textTransform: 'uppercase' }} >{getPark?.park_name ?? ''}</h1>
        <p>{(guideInformation?.specialtyGuide || []).map((sg: { specialty: { specialtyName: any; }; }) => sg?.specialty?.specialtyName).join(', ')}</p>

        <div className="subtitles_content">Telefone</div>
        <p>{maskPhoneNumber(guideInformation?.user?.phone ?? '99999999999')}</p>

        <div className="subtitles_content">E-mail</div>
        <p>{guideInformation?.user?.email ?? ''}</p>

        <div className="subtitles_content">Idioma</div>
        <p>{(guideInformation?.languageGuide || []).map((sg: { language: { languageName: any; }; }) => sg?.language?.languageName).join(', ')}</p>

        <div className="subtitles_content">Sobre mim</div>
        <p>{guideInformation?.biography ?? ''}</p>
      </div>
    );
  };


  return (
    <div>
      <PageHeader
        backgroundImageUrl={guideInformation?.guideImage ?? ''}
        showCheck={false}
        visited={false}
        title={guideInformation?.user?.name ?? ''}
        parkId={Number(id)}
      >
        {renderContent()}
      </PageHeader>
      <FooterMenu activePage="search" />
    </div>
  );
};

export default GuidePage;
