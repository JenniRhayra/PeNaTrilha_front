import React from 'react';
import { IoMdAddCircle } from "react-icons/io";
import { useRouter } from 'next/navigation';

const HeaderControl: React.FC = () => {
  const router = useRouter();

  const handleAddClick = () => {
    router.push('/create_content');
  };

  return (
    <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            padding: '190px 40px 0px'}}>
      <input type="checkbox" id="select"/>
      <label htmlFor="select" style={{ marginRight: '10px', marginLeft: '10px' }}>Selecionar todos</label>
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
    </div>
  );
};

export default HeaderControl;
