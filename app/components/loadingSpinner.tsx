import React, { useState, useEffect }from 'react';

const LoadingSpinner: React.FC = () => {
  const [currentText, setCurrentText] = useState('Carregando...');

  useEffect(() => {
    const texts = ['Carregando...', 'Qual será sua próxima aventura?','Por favor, aguarde...'];
    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % texts.length;
      setCurrentText(texts[currentIndex]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="spinner-container">
      <div className="loading-text">{currentText}</div>
      <div className="boot-spinner boot1"></div>
      <div className="boot-spinner boot2"></div>

      <style jsx>{`
        .spinner-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(255, 255, 255, 0.8);
          z-index: 9999;
          overflow: hidden;
        }

        .loading-text {
          position: absolute;
          top: 20%;
          margin-right: 30%;
          text-transform: uppercase;
          left: 10%;
          font-size: 25px;
          font-weight: bold;
          color: #7D9662;
          animation: blink 2s infinite;
        }

        @keyframes blink {
            opacity: 0;
        }

        .boot-spinner {
          width: 180px; 
          height: 180px; 
          background-size: contain;
          background-repeat: no-repeat;
          position: absolute;
          opacity: 0; 
          animation-duration: 4s; 
          animation-iteration-count: infinite; 
        }

        .boot1 {
          background-image: url('/images/bota1.png'); 
          bottom: -100px; 
          left: 0;
          animation-name: boot1-animation;
          animation-delay: 0s; 
        }

        .boot2 {
          background-image: url('/images/bota2.png'); 
          bottom: -100px; 
          left: 0;
          animation-name: boot2-animation;
          animation-delay: 0.5s; 
        }

        @keyframes boot1-animation {
          0%, 5% {
            bottom: -100px;
            opacity: 0;
          }
          10%, 20% {
            bottom: 5%; 
            left: 0; 
            opacity: 1
          }
          30%, 40% {
            bottom: 25%; 
            left: 20%; 
            opacity: 1
          }
          50%, 60% {
            bottom: 45%; 
            left: 40%; 
            opacity: 1;
          }
          70%, 80% {
            bottom: 65%;
            left: 60%; 
            opacity: 1;
          }
          85%, 95% {
            bottom: 80%;
            left: 70%; 
            opacity: 1;
          }
          100% {
            bottom: 100%;
            left: 100%; 
            opacity: 0;
          }
        }

        @keyframes boot2-animation {
          0%, 5% {
            bottom: -100px;
            opacity: 0;
          }
          10%, 20% {
            bottom: 10%; 
            left: 5%; 
            opacity: 1
          }
          30%, 40% {
            bottom: 30%; 
            left: 25%; 
            opacity: 1
          }
          50%, 60% {
            bottom: 50%; 
            left: 45%; 
            opacity: 1;
          }
          70%, 80% {
            bottom: 70%;
            left: 65%; 
            opacity: 1;
          }
          85%, 95% {
            bottom: 80%;
            left: 75%; 
            opacity: 1;
          }
          100% {
            bottom: 100%;
            left: 100%; 
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
