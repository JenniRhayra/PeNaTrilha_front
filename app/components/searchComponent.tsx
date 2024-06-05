import React from 'react';
import { useRouter } from 'next/navigation';
import { FiSearch } from 'react-icons/fi';
import { Button } from '@nextui-org/react';
import ButtonGreen from './buttonGreen';

interface SearchComponentProps {
  title: string, // Adicione a propriedade de título
  filterTerm: string | undefined
}

const SearchComponent: React.FC<SearchComponentProps> = ({ title, filterTerm }) => {
  const router = useRouter();

  // Função para lidar com a pesquisa
  const handleSearch = () => {
    // Implemente a lógica para buscar o termo na página
    
        console.log(filterTerm);
    
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
      padding: '0 15px', // Adicionar margem fixa à esquerda e à direita
      display: 'flex'
    }}>
  
      {/* Campo de busca */}
      <div id='campoBusca' style={{ position: 'relative', width:'100%'}}>
        <input 
          type="text" 
          placeholder="Buscar parque, guia, trilha..." 
          onChange={handleSearch} 
          style={{ 
            width: '100%', // Largura do campo de busca
            padding: '6px', // Espaçamento interno
            border: '1px solid #667358',
            borderRadius: '4px'
            
            
        }} />
        <div style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>
          <FiSearch />
        </div>
      </div>

      <div id='tituloPagina'>
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

    </div>
  );
};

export default SearchComponent;
