"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useQuery } from '@/app/hooks/useQuery';
import { parkService } from '@/app/services/axios-config/connection/park';
import { Activity, Guide, Infrastructure, Park } from '@/app/services/axios-config/connection/types/IListManyParksInfo';
import PageHeader from '@/app/components/pageHeaderPromp';
import FooterMenu from '@/app/components/footerMenu';
const ContentPage: React.FC = () => {
  const params = useParams();
  const id = params.id;
  const activityId = params.activityId;
  const [getActivity, ,] = useQuery(() => parkService.listActivityById(Number(activityId)), [activityId]);

  const [getPark, ,] = useQuery(() => parkService.listManyParkInfoById(Number(id)), [id]);

  const renderContent = () => {
    return (
      <div>
        <h1 style={{ textAlign: 'center', color: '#4D5D47', fontWeight: 'bold', marginBottom: '2vh', textTransform: 'uppercase' }}>
          INFORMAÇÕES DA ATIVIDADE
        </h1>
        <h1 style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{getPark?.park_name ?? ''}</h1>
        <p>{getActivity?.description}</p>

        <div className="subtitles_content">Nível de dificuldade</div>
        <p>{getActivity?.difficultyLevel}</p>

        <div className="subtitles_content">Distância</div>
        <p>{Number(getActivity?.percurso ?? '0') / 1000}Km</p>

        <div className="subtitles_content">Tempo estimado</div>
        <p>{(Number(getActivity?.duracao ?? '') / 60).toFixed(0)}h</p>

        <p style={{ marginTop: '2vh', marginBottom: '5vh' }}>
          {getActivity?.isMonitored == 'true' ? (
            <>
              <div style={{ marginBottom: '1vh', color: '#EF2945', fontWeight: 'bold' }}>
                🚨 Trilha monitorada! Necessita de guia credenciado.
              </div>
              <Link href="./content_pages" target='_blank'>
                Clique aqui para ver os <b>{' '}GUIAS CREDENCIADOS</b> do parque!
              </Link>
            </>
          ) : (
            <div className="subtitles_content">
              Trilha autoguiada - NÃO necessita de guia credenciado.
            </div>
          )}
        </p>
      </div>
    );

  }

  return (
    <div>
      <PageHeader
        backgroundImageUrl={getActivity?.activityImage ?? ''}
        showCheck={false}
        visited={false}
        title={getActivity?.activityName ?? ''}
        parkId={Number(id)}
      >
        {renderContent()}
      </PageHeader>
      <FooterMenu activePage="search" />
    </div>
  );
};

export default ContentPage;
