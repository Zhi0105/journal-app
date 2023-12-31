import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

// PROVIDERS
import TanstackProviders from '@/providers/TanstackProviders'
import { AuthProviders } from '@/providers/AuthProviders'
import { BoundaryProvider } from '@/providers/ErrorBoundary'

//  TOAST
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Filofax',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TanstackProviders>
          <AuthProviders>
            <BoundaryProvider>
              {children}
            </BoundaryProvider>
          </AuthProviders>
        </TanstackProviders>
        <ToastContainer />
      </body>
    </html>
  )
}
