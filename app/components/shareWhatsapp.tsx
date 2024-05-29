import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ShareOnWhatsApp = ({ text }: { text: string }) => {
  const router = useRouter();

  useEffect(() => {
    const shareText = encodeURIComponent(text);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${shareText}`;
    router.push(whatsappUrl);
  }, []);

  return null; // Este componente não renderiza nada, pois redirecionamos diretamente para o link do WhatsApp
};

export default ShareOnWhatsApp;
