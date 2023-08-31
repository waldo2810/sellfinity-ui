'use client'

import { ThemeProvider } from 'next-themes'
import { FC } from 'react'
import { ToastProvider } from './toast-provider'
import { ModalProvider } from './modal-provider'

interface ProvidersProps {
  children: React.ReactNode
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ToastProvider />
      <ModalProvider />
      {children}
    </ThemeProvider>
  )
}

export default Providers
