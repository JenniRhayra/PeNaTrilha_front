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
    const eventId = params.eventId;
    const [getEvent, ,] = useQuery(() => parkService.listEventById(Number(eventId)), [eventId]);

    const [getPark, ,] = useQuery(() => parkService.listManyParkInfoById(Number(id)), [id]);

    const renderContent = () => {
        return (
            <div>
                <h1 style={{ textAlign: 'center', color: '#4D5D47', fontWeight: 'bold', marginBottom: '2vh', textTransform: 'uppercase' }}>
                    INFORMAÇÕES DO EVENTO
                </h1>
                <p>{getEvent?.description ?? ''}</p>

                <div className="subtitles_content">Data</div>
                <p>{new Intl.DateTimeFormat('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                }).format(new Date)}</p>

                <div className="subtitles_content">Local</div>
                <p>{getPark?.park_name ?? ''}</p>
                <p>{getEvent?.place ?? ''}</p>
            </div>
        );
    }

    return (
        <div>
            <PageHeader
                backgroundImageUrl={getEvent?.eventImage ?? ''}
                showCheck={false}
                visited={false}
                title={getEvent?.event_name ?? ''}
                parkId={Number(id)}
            >
                {renderContent()}
            </PageHeader>
            <FooterMenu activePage="search" />
        </div>
    );
};

export default ContentPage;
