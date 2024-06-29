"use client";
import React, { useState, useEffect, useTransition } from 'react';
import PageHeader from '../components/pageHeaderPromp';
import FooterMenu from '../components/footerMenu';
import { FaLocationDot } from "react-icons/fa6";
import Link from 'next/link';
import PageComponentList from '../components/pageComponentList';
import Image from 'next/image';
import LoadingSpinner from '../components/loadingSpinner';

const ContentPage: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState('parque');
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handlePageLoad = () => {
      startTransition(() => {
        setLoading(false);
      });
    };

    if (document.readyState === 'complete') {
      handlePageLoad();
    } else {
      window.addEventListener('load', handlePageLoad);
      return () => window.removeEventListener('load', handlePageLoad);
    }
  }, []);

  const guides = [
    {
      photo: '/images/guia1.jpg',
      name: 'Anderson Silva',
      skills: 'Botânica; observação de aves; geologia',
      description: 'Sou monitor a mais de 13 anos, e amo o que faço. Sou conhecedor na área em que atuo, possuo conhecimento na área de turismo ecológico, bioespeleologia, biologia, ecoturismo, fauna e flora, plantas fitoterápicas, espeleologia, entre outros.',
      language: 'Português',
      link: 'guide/001',
    },
    {
      photo: '/images/guia2.jpg',
      name: 'Guia 2',
      skills: 'Botânica; observação de aves; geologia',
      description: 'Descrição do Guia 2',
      language: 'Inglês',
      link: 'guide/002',
    },
    {
      photo: '/images/guia1.jpg',
      name: 'Guia 3',
      skills: 'Botânica; observação de aves; geologia',
      description: 'Descrição do Guia 3',
      language: 'Português',
      link: 'guide/003',
    },
    {
      photo: '/images/guia2.jpg',
      name: 'Guia 4',
      skills: 'Botânica; observação de aves; geologia',
      description: 'Descrição do Guia 4',
      language: 'Inglês',
      link: 'guide/004',
    },
  ];

  const activities = [
    {
      photo: '/images/at01.jpeg',
      name: 'Trilha da Cachoeira do Ribeirão Branco',
      description: 'Trilha com extensão de 10 km (ida e volta) sob vegetação fechada com uma cachoeira com 4m de altura. O acesso é razoavelmente difícil, devido a sua extensão. É indicada para pequenos grupos que apreciam caminhadas mais acentuadas. A trilha poderá ser cancelada pelo serviço de monitoria, caso ocorra chuva no dia da visita.',
      level: 'Médio',
      percurso: '10km',
      time: '3h',
      monitor: 'true',
      link: 'atv/001',
    },
    {
      photo: '/images/pei_at_01.jpeg',
      name: 'Atividade 2',
      description: 'Descrição da atividade 2',
      level: 'Difícil',
      percurso: '16km',
      time: '6h',
      monitor: 'true',
      link: 'atv/002',
    },
    {
      photo: '/images/pei_at_02.jpeg',
      name: 'Atividade 3',
      description: 'Descrição da atividade 3',
      level: 'Fácil',
      percurso: '6km',
      time: '3h',
      monitor: 'false',
      link: 'atv/003',
    },
  ];

  const events = [
    {
      photo: '/images/at01.jpeg',
      name: 'Semana do Meio Ambiente',
      description: 'As áreas naturais elevadas, como os topos dos morros nas serras, desde sempre são áreas importantes para observação e contemplação da paisagem, seja pela visão privilegiada ou mesmo pela posição estratégica que facilita a comunicação via rádio ou telefonia. A Semana do Meio Ambiente é uma celebração instaurada pelo decreto nº 86.028, de 17 de maio de 1981. Ela é realizada sempre na primeira semana do mês de junho. O intuito é completar e expandir os debates trazidos pelo Dia Mundial do Meio Ambiente.',
      date: '05/06/2023',
      place: 'Centro de Visitantes do Parque',
      park: 'PE Carlos Botelho',
    },
  ]

  const image = selectedOption === 'guia' 
    ? guides[0].photo
    : selectedOption === 'atividade'
      ? activities[0].photo
      : selectedOption === 'evento'
        ? events[0].photo
        : '/images/parque-carlos-botelho.jpg';

  const title = selectedOption === 'guia' 
    ? guides[0].name 
    : selectedOption === 'atividade'
      ? activities[0].name
      : selectedOption === 'evento'
        ? events[0].name
        : 'PE CARLOS BOTELHO';

  const showCheck = selectedOption === 'guia' 
    ? false
    : selectedOption === 'atividade'
      ? false
      : selectedOption === 'evento'
        ? false
        : true;

  const renderContent = () => {
    switch (selectedOption) {
      case 'parque':
        return (
          <>
            <div>
              <FaLocationDot size={25} color="black" />
              <h1 style={{ fontWeight: 'bold' }}>
                Rodovia SP 139, km 78,4, Abaitinga <br />
                São Miguel Arcanjo/SP
              </h1>
            </div>

            <div className="subtitles_content">Horário de funcionamento</div>
            <p>seg a dom: 09:00 - 16:00</p>

            <div className="subtitles_content">Telefone</div>
            <p>15 3279-0483</p>

            <div className="subtitles_content">E-mail</div>
            <p>pe.carlosbotelho@fflorestal.sp.gov.br</p>

            <div className="subtitles_content">Site</div>
            <p style={{textDecoration: 'underline'}}>
              <Link href={'https://saomiguelarcanjo.ingressosparquespaulistas.com.br'} target="_blank" rel="noopener noreferrer">
                saomiguelarcanjo.ingressosparquespaulistas.com.br
              </Link>
            </p>

            <div className="subtitles_content">Sobre o parque</div>
            <p>
              A vegetação dominante nessa área é a Floresta Ombrófila Densa
              Montana. Nessa fisionomia, seis espécies de mamíferos foram
              registradas exclusivamente: o tatu-peludo, o tamanduá-mirim, a
              jaritataca, o gato-maracajá, a queixada e a capivara. É também
              encontrado com certa frequência nos dois núcleos do parque o
              cágado-da-serra, uma das menores tartarugas de água doce do
              Brasil, considerado vulnerável pela lista da IUCN. O núcleo tem
              perfil de visitação e uso público mais voltado a interesses
              científicos e de educação ambiental, seguido do ecoturismo,
              possuindo, entre seus atrativos, as trilhas interpretativas da
              natureza.
            </p>

            <div className="subtitles_content">Tipo de mata</div>
            <p>Mata Atlântica (floresta ombrófila densa)</p>

            <div className="subtitles_content">Infraestrutura</div>
            <p>
              • Hospedagens
              <br />• Garagens
              <br />• Sanitários
              <br />• Guaritas
            </p>

            <div className='tira-do-share'>
              <div className="subtitles_content">Guias credênciados</div>
              <p><PageComponentList type={guides} layout="row" /></p>

              <div className="subtitles_content">Atividades</div>
              <p><PageComponentList type={activities} layout="row" /></p>

              <div style={{ marginTop: '5vh', marginBottom: '5vh' }}>
                <p>
                  <Link href="./content_pages">
                    Clique aqui para saber as <b style={{textDecoration: 'underline'}}>DICAS E BOAS PRÁTICAS</b> do
                    parque!
                  </Link>
                </p>
              </div>
            </div>
          </>
        );
      case 'guia':
        return (
          <div>
            <h1 style={{textAlign:'center', color:'#4D5D47', fontWeight:'bold', marginBottom:'2vh', textTransform:'uppercase'}}>INFORMAÇÕES DO GUIA</h1>
            <h1 style={{fontWeight:'bold', textTransform:'uppercase'}} >PE CARLOS BOTELHO</h1>
            <p>{guides[0].skills}</p>

            <div className="subtitles_content">Telefone</div>
            <p>15 3279-0483</p>

            <div className="subtitles_content">E-mail</div>
            <p>andersonsilva.81@gmail.com</p>

            <div className="subtitles_content">Idioma</div>
            <p>{guides[0].language}</p>

            <div className="subtitles_content">Sobre mim</div>
            <p>{guides[0].description}</p>
          </div>
        );
      case 'atividade':
        return (
          <div>
            <h1 style={{ textAlign: 'center', color: '#4D5D47', fontWeight: 'bold', marginBottom: '2vh',textTransform:'uppercase' }}>
              INFORMAÇÕES DA ATIVIDADE
            </h1>
            <h1 style={{ fontWeight: 'bold',textTransform:'uppercase' }}>PE CARLOS BOTELHO</h1>
            <p>{activities[0].description}</p>
  
            <div className="subtitles_content">Nível de dificuldade</div>
            <p>{activities[0].level}</p>
  
            <div className="subtitles_content">Distância</div>
            <p>{activities[0].percurso}</p>
  
            <div className="subtitles_content">Tempo estimado</div>
            <p>{activities[0].time}</p>
  
            <p style={{ marginTop: '2vh', marginBottom: '5vh' }}>
              {activities[0].monitor === 'true' ? (
                <>
                  <div style={{marginBottom: '1vh', color: '#EF2945',fontWeight: 'bold'}}>
                  🚨 Trilha monitorada! Necessita de guia credenciado.
                  </div>
                  <Link href="./content_pages">
                    Clique aqui para ver os <b>GUIAS CREDENCIADOS</b> do parque!
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
        case 'evento':
          return (
            <div>
              <h1 style={{ textAlign: 'center', color: '#4D5D47', fontWeight: 'bold', marginBottom: '2vh',textTransform:'uppercase' }}>
                INFORMAÇÕES DO EVENTO
              </h1>
              <p>{events[0].description}</p>
    
              <div className="subtitles_content">Data</div>
              <p>{events[0].date}</p>
    
              <div className="subtitles_content">Local</div>
              <p>{events[0].park}</p>
              <p>{events[0].place}</p>
            </div>
          );
      default:
        return null;
    }
  };

  return (
    <>
      {loading || isPending ? (
          <LoadingSpinner />
        ) : (
        <div>
          <PageHeader
            backgroundImageUrl= {image}
            showCheck={showCheck}
            title={title}
          >
            {renderContent()}
          </PageHeader>
          <FooterMenu activePage="search" />
        </div>
      )}
    </>
  );
};

export default ContentPage;
