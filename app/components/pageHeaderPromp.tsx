import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiShare2 } from 'react-icons/fi';
import { FaCheck } from 'react-icons/fa';

interface PageHeaderProps {
  backgroundImageUrl: string;
  title: string;
  children: React.ReactNode;
  showCheck?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({ backgroundImageUrl, title, children, showCheck = false }) => {
  const [checked, setChecked] = useState(false);
  const navigation = useRouter();

  const handleGoBack = () => {
    navigation.back();
  };

  const handleShare = () => {
    // Implement your share functionality here
    alert('Share functionality');
  };

  const handleCheckClick = () => {
    setChecked(!checked);
  };

  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      {/* Background image */}
      <div
        style={{
          width: '100%',
          height: '40vh', // Ajustado para 40% da altura da tela
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      >
        {/* Camada de degradê preto com 90% de transparência */}
        <div
          style={{ 
            width: '100%', 
            height: '100%', 
            background: 'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9))' }}
        ></div>
        {/* Título */}
        <h1 style={{ 
          position: 'absolute', 
          top: '70px', 
          transform: 'translateX(5%)', 
          color: 'white', 
          alignItems: 'left',
          padding: '20px',
          fontSize: '1.8rem',
          fontWeight: 'bold',
          zIndex: 1 }}>{title}</h1>
      </div>

      {/* Ícones de voltar e compartilhar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px',
          zIndex: 1,
        }}
      >
        {/* Ícone de voltar */}
        <div style={{ cursor: 'pointer', borderRadius: '50%', backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: '5px' }} onClick={handleGoBack}>
          <FiArrowLeft size={30} color="white" />
        </div>

        {/* Ícone de compartilhar */}
        <div style={{ cursor: 'pointer', borderRadius: '50%', backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: '5px' }} onClick={handleShare}>
          <FiShare2 size={30} color="white" />
        </div>
      </div>

      {/* Componente de check, mostrado apenas se a propriedade showCheck for verdadeira */}
      {showCheck && (
        <div
          style={{
            position: 'absolute',
            top: '25%',
            left: '80%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
          }}
          onClick={handleCheckClick}
        >
          <div
            style={{
              cursor: 'pointer',
              borderRadius: '50%',
              backgroundColor: checked ? '#5cb85c' : '#B6B2B2',
              padding: '5px',
            }}
          >
            <FaCheck size={35} color="white" />
          </div>
        </div>
      )}

      {/* Retângulo arredondado */}
      <div style={{ backgroundColor: '#EFEFEF', borderRadius: '40px', padding: '30px', position: 'absolute', top: '25vh', left: 0, right: 0, bottom: 0, zIndex: 1 }}>
        {/* Conteúdo dentro do retângulo */}
        {children}
      </div>
    </div>
  );
};

export default PageHeader;