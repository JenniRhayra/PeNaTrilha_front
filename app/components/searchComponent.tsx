import React from 'react';
import { useRouter } from 'next/navigation';
import { FiSearch } from 'react-icons/fi';

interface SearchComponentProps {
  title: string,
  filterTerm?: string | undefined
}

const SearchComponent: React.FC<SearchComponentProps> = ({ title, filterTerm }) => {
  const router = useRouter();

  const handleSearch = () => {
    console.log(filterTerm);
  };

  return (
    <div style={{ 
      position: 'absolute', 
      top: '15vh', 
      left: '50%', 
      transform: 'translateX(-50%)',
      textAlign: 'center',
      width: '90%', 
      maxWidth: '900px', 
      margin: '0 auto', 
      padding: '0 15px', 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
  
      {/* Campo de busca */}
      <div id='campoBusca' style={{ position: 'relative', width:'100%' }}>
        <input 
          type="text" 
          placeholder="Buscar parque, guia, trilha..." 
          onChange={handleSearch} 
          style={{ 
            width: '100%', 
            padding: '6px', 
            border: '1px solid #667358',
            borderRadius: '4px'
        }} />
        
        <div style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>
          <FiSearch />
        </div>
      </div>

      {/* Título da página */}
      <div id='tituloPagina' style={{ marginTop: '20px' }}>
        <h1 style={{ 
          textAlign: 'center',
          textTransform: 'uppercase', 
          fontSize: '18px', 
          fontWeight: 'bold', 
          color: '#667358'
        }}>{title}</h1>
      </div>  

    </div>
  );
};

export default SearchComponent;
