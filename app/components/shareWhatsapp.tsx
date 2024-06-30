
import { useEffect } from 'react';

const ShareOnWhatsApp = ({ text }: { text: string }) => {

  useEffect(() => {
    const shareText = encodeURIComponent(text);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${shareText}`;
    window.open(whatsappUrl, '_blank');
  }, [text]);

  return null;
};

export default ShareOnWhatsApp;
