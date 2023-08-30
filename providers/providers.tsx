'use client'

import { NextIntlClientProvider } from 'next-intl'
import { ThemeProvider } from 'next-themes'
import { FC } from 'react'
import { ToastProvider } from './toast-provider'
import { ModalProvider } from './modal-provider'

interface ProvidersProps {
  children: React.ReactNode
  locale: string
  messages: any
}

const Providers: FC<ProvidersProps> = ({ children, locale, messages }) => {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ToastProvider />
        <ModalProvider />
        {children}
      </ThemeProvider>
    </NextIntlClientProvider>
  )
}

export default Providers
