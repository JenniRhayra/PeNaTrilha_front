import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ShareOnWhatsApp = ({ text }: { text: string }) => {
  const router = useRouter();

  useEffect(() => {
    const shareText = encodeURIComponent(text);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${shareText}`;
    router.push(whatsappUrl);
  }, [text, router]);

  return null;
};

export default ShareOnWhatsApp;
