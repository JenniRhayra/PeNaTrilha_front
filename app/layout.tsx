import type { Metadata } from 'next'

// These styles apply to every route in the application
import './globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
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
    <html lang="en">
      <ToastContainer />
      <body>{children}</body>

    </html>
  )
}