"use client";
import React, { useEffect, useState } from 'react';
import PageHeader from '../../components/pageHeaderPromp';
import FooterMenu from '../../components/footerMenu';
import { FaLocationDot } from "react-icons/fa6";
import Link from 'next/link';
import PageComponentList from '../../components/pageComponentList';
import { useParams, useSearchParams } from 'next/navigation';
import { useQuery } from '@/app/hooks/useQuery';
import { parkService } from '@/app/services/axios-config/connection/park';
import { Activity, Guide, Infrastructure, Park } from '@/app/services/axios-config/connection/types/IListManyParksInfo';
import Cookies from 'js-cookie';
import { usersService } from '@/app/services/axios-config/connection';
const ContentPage: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState('parque');

  const params = useParams();
  const id = params.id;

  const email = Cookies.get('email');

  const [getParkVisit, ,] = useQuery(() => usersService.findParkVisit(Number(id), String(email)), [id, email]);
  console.log('getParkVisit', getParkVisit)
  const [getPark, , loadingPark, refetchPark] = useQuery(() => parkService.listManyParkInfoById(Number(id)), [id]);
  console.log('getPark', getPark)
  const guides = (getPark?.guide || []).map((object: Guide, index: number) => ({
    photo: object?.guideImage,
    name: object?.user?.name,
    skills: (object?.specialtyGuide || []).map(sg => sg?.specialty?.specialtyName).join(', '),
    description: object?.biography,
    language: (object?.languageGuide || []).map(sg => sg?.language?.languageName).join(', '),
    link: `${id}/guide/${object?.id}`,
  }));

  const activities = (getPark?.activity || []).map((object: Activity, index: number) => ({
    photo: object?.activityImage,
    name: object?.activityName,
    description: object?.description,
    level: object?.difficultyLevel,
    percurso: object?.percurso,
    time: object?.duracao,
    monitor: object?.isMonitored,
    link: `${id}/activity/${object?.id}`,
  }));



  const renderContent = () => {
    return (
      <>
        <div>
          <FaLocationDot size={25} color="black" />
          <h1 style={{ fontWeight: 'bold' }}>
            {(getPark?.street ?? '') + ', ' + (getPark?.number ?? '') + ', ' + (getPark?.neighborhood ?? '') + '/' + (getPark?.state ?? '')}
          </h1>
        </div>

        <div className="subtitles_content">Horário de funcionamento</div>
        <p>{getPark?.openingHours}</p>

        {/* <div className="subtitles_content">Telefone</div>
            <p>15 3279-0483</p> */}

        {/* <div className="subtitles_content">E-mail</div>
            <p>pe.carlosbotelho@fflorestal.sp.gov.br</p> */}

        <div className="subtitles_content">Site</div>
        <p style={{ textDecoration: 'underline' }}>
          <Link href={getPark?.site ?? ''} target="_blank" rel="noopener noreferrer">
            {getPark?.site}
          </Link>
        </p>

        <div className="subtitles_content">Sobre o parque</div>
        <p>
          {getPark?.description}
        </p>

        <div className="subtitles_content">Tipo de mata</div>
        <p>{getPark?.florestType}</p>

        <div className="subtitles_content">Infraestrutura</div>
        <p>
          {(getPark?.infrastructure || []).map((object: Infrastructure, index: number) => (
            <>
              <br key={index} />• {object?.infrastructure?.type}
            </>
          ))}
        </p>


        <div className='tira-do-share'>
          <div className="subtitles_content">Guias credênciados</div>
          <p><PageComponentList type={guides} layout="row" /></p>

          <div className="subtitles_content">Atividades</div>
          <p><PageComponentList type={activities} layout="row" /></p>

          {/* <div style={{ marginTop: '5vh', marginBottom: '5vh' }}>
                <p>
                  <Link href="./content_pages">
                    Clique aqui para saber as <b style={{ textDecoration: 'underline' }}>DICAS E BOAS PRÁTICAS</b> do
                    parque!
                  </Link>
                </p>
              </div> */}
        </div>
      </>
    );
  }

  return (
    <div>
      <PageHeader
        backgroundImageUrl={getPark?.parkImage ?? ''}
        showCheck={true}
        visited={getParkVisit}
        title={getPark?.park_name ?? ''}
        parkId={Number(id)}
      >
        {renderContent()}
      </PageHeader>
      <FooterMenu activePage="search" />
    </div>
  );
};

export default ContentPage;
