import { i18n } from '../../i18n-config'
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sellfinity',
  description: 'Sales to the infinite'
}

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ lang: locale }))
}

export default function Root({
  children,
  params
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  return (
    <ClerkProvider>
      <html lang={params.lang}>
        <body className={inter.className}>{children}</body>
        <Toaster />
      </html>
    </ClerkProvider>
  )
}
