import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import type { Metadata } from 'next'
import './globals.css';

export const metadata: Metadata = {
  title: 'Pé na Trilha',
  description: 'Aplicativo para você encontrar seu próximo eco-destino',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='bg-[#F8F8F8]'>
      <body>
        <ToastContainer />
        {children}
      </body>
    </html>
  )
}
