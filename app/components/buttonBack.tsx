import React from 'react';
import { useRouter } from 'next/navigation';
import { FiArrowLeft } from 'react-icons/fi';

interface ButtonBackProps {
  top?: string;
}

const ButtonBack: React.FC<ButtonBackProps> = ({ top = '0vh' }) => {
    const navigation = useRouter();

    const handleGoBack = () => {
        navigation.back();
    };

  return (
    <div style={{ position: 'absolute', top: `${top}`}}>
        <div
            style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'left',
            padding: '20px',
            zIndex: 999,
            }}
        >
            <div style={{ cursor: 'pointer', borderRadius: '50%', backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: '5px' }} onClick={handleGoBack}>
                <FiArrowLeft size={24} color="white" />
            </div>
        </div>
    </div>
  );
};

export default ButtonBack;
