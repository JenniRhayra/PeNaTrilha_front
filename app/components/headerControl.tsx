import React from 'react';
import { IoMdAddCircle } from "react-icons/io";
import { useRouter } from 'next/navigation';
import { IoMdRemoveCircle } from "react-icons/io"; // Importa o ícone de remoção

interface HeaderControlProps {
  showAdd?: boolean;
  showDelete?: boolean;
}

const HeaderControl: React.FC<HeaderControlProps> = ({ showAdd = false, showDelete = false }) => {
  const router = useRouter();

  const handleAddClick = () => {
    router.push('/create_content');
  };

  const handleDeleteClick = () => {
    // Adicione a lógica de exclusão aqui
    console.log('Excluir clicado');
  };

  return (
    <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            padding: '190px 40px 0px'}}>
      <input type="checkbox" id="select"/>
      <label htmlFor="select" style={{ marginRight: '10px', marginLeft: '10px' }}>Selecionar todos</label>

      {showAdd && (
        <>
          <IoMdAddCircle 
            size={20} 
            color="#7D9662" 
            style={{ marginRight: '5px', marginLeft: '10px', cursor: 'pointer' }} 
            onClick={handleAddClick}
          />
          <span 
            style={{ cursor: 'pointer' }}
            onClick={handleAddClick}
          >
            Adicionar Novo
          </span>
        </>
      )}

      {showDelete && (
        <>
          <IoMdRemoveCircle
            size={20}
            color="#FF0000" 
            style={{ marginRight: '5px', marginLeft: '10px', cursor: 'pointer' }} 
            onClick={handleDeleteClick}
          />
          <span 
            style={{ cursor: 'pointer' }}
            onClick={handleDeleteClick}
          >
            Excluir
          </span>
        </>
      )}
    </div>
  );
};

export default HeaderControl;
