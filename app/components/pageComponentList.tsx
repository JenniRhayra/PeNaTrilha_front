import React from 'react';
import { useRouter } from 'next/navigation';
import { FiMapPin, FiSearch, FiFilter } from 'react-icons/fi';
import { AiOutlineSortAscending } from 'react-icons/ai';
import Image from 'next/image';

interface Guide {
  photo: string;
  name: string;
  description: string;
  language: string;
  park: string;
}

const GuideListItem: React.FC<{ guide: Guide }> = ({ guide }) => (
  <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: '20px'}}>
    <div style={{ 
        position: 'relative', 
        width: '50px', 
        height: '50px', 
        borderRadius: '50%', 
        overflow: 'hidden', 
        marginRight: '10px' }}>
      <Image src={guide.photo} alt="Guide" layout="fill" objectFit="cover" />
    </div>
    <div>
      <h3>{guide.name}</h3>
      <p>{guide.description}</p>
      <p>Idioma: {guide.language}</p>
      <p>Parque: {guide.park}</p>
      <button>Ver Perfil</button>
    </div>
  </div>
);

const GuideList: React.FC<{ guides: Guide[] }> = ({ guides }) => (
  <div>
    {guides.map((guide, index) => (
      <GuideListItem key={index} guide={guide} />
    ))}
  </div>
);

const PageComponentList: React.FC = () => {
  const router = useRouter();

  // Função para lidar com a mudança de localização
  const handleChangeLocation = () => {
    // Implemente a lógica para mudar a localização
  };

  // Função para lidar com a pesquisa
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    // Implemente a lógica para buscar o termo na página
  };

  // Dados fictícios dos guias
  const guides: Guide[] = [
    {
      photo: '/guia1.jpg',
      name: 'Guia 1',
      description: 'Descrição do Guia 1',
      language: 'Português',
      park: 'Parque 1',
    },
    {
      photo: '/guia2.jpg',
      name: 'Guia 2',
      description: 'Descrição do Guia 2',
      language: 'Inglês',
      park: 'Parque 2',
    },
    // Adicione mais guias conforme necessário
  ];

  return (
    <div style={{position: 'absolute', top: '50px'}}>
        {/* Localização atual */}
        <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: '10' }}>
            <FiMapPin />
            <span>Localização Atual</span>
            <button onClick={handleChangeLocation}>Selecionar Outra</button>
        </div>

        {/* Campo de busca */}
        <div style={{ marginTop: '50px' }}>
            <FiSearch />
            <input type="text" placeholder="Buscar..." onChange={handleSearch} />
        </div>

        {/* Título da página */}
        <h1>Título da Página</h1>

        {/* Ícone de filtro e ordenação */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <FiFilter />
            <AiOutlineSortAscending />
        </div>

        {/* Lista de guias */}
        <GuideList guides={guides} />
    </div>
  );
};

export default PageComponentList;
