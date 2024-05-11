import React from 'react';
import { useRouter } from 'next/navigation';
import { FiSearch } from 'react-icons/fi';
import { IoIosArrowDown } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";

interface SearchComponentProps {
  title: string; // Adicione a propriedade de título
}

const SearchComponent: React.FC<SearchComponentProps> = ({ title }) => {
  const router = useRouter();

  const handleChangeLocation = () => {
    // Implementar lógica para mudar a localização
  };

  // Função para lidar com a pesquisa
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    // Implemente a lógica para buscar o termo na página
  };

  return (
    <div style={{ 
      position: 'absolute', 
      top: '15vh', 
      left: '27%', 
      transform: 'translate(-25%, -25%)',
      textAlign: 'center',
      width: '90%', // Defina a largura desejada da caixa de busca
      maxWidth: '900px', // Largura máxima da caixa de busca
      margin: '0 auto', // Centralizar horizontalmente
      padding: '0 15px' // Adicionar margem fixa à esquerda e à direita
    }}>
      {/* Localização atual */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FaLocationDot style={{ color: '#667358' }}/>
          <span style={{ marginLeft: '10px' }}>Localização Atual</span>
        </div>
        <button 
          onClick={handleChangeLocation} 
          style={{ 
            marginLeft: '10px',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer'
          }}>
          <IoIosArrowDown />
        </button>
      </div>
  
      {/* Campo de busca */}
      <div style={{ position: 'relative', marginTop: '10px'}}>
        <input 
          type="text" 
          placeholder="Buscar parque, guia, trilha..." 
          onChange={handleSearch} 
          style={{ 
            width: '100%', // Largura do campo de busca
            padding: '5px', // Espaçamento interno
            border: '1px solid #667358',
            borderRadius: '4px'
        }} />
        <div style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>
          <FiSearch />
        </div>
      </div>
        
      {/* Título da página */}
      <h1 style={{ 
        position: 'absolute', 
        top: '15vh', 
        left: '50%', 
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        textTransform: 'uppercase', 
        fontSize: '18px', 
        fontWeight: 'bold', 
        color: '#667358'}}>{title}</h1>
    </div>
  );
};

export default SearchComponent;
