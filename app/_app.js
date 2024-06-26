import { Bebas_Neue } from 'next/font/google';
import { AuthProvider } from './services/context/AuthContext';

// If loading a variable font, you don't need to specify the font weight
const bebasneue = Bebas_Neue({
  weight: '400',
  subsets: ['latin']
});

export default function MyApp({ Component, pageProps }) {
  return (
    <main className={bebasneue.className}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </main>
  );
}
