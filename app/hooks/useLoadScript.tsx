import { useEffect, useState } from 'react';

export const useLoadScript = (url: string) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = url;
        script.async = true;
        script.defer = true;
        script.onload = () => setIsLoaded(true);
        document.head.appendChild(script);
        return () => {
            document.head.removeChild(script);
        };
    }, [url]);

    return isLoaded;
};
