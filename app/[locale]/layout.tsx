import Providers from '@/providers/providers'
import { ClerkProvider } from '@clerk/nextjs'
import { createTranslator, useLocale } from 'next-intl'
import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

type Props = {
  children: ReactNode
  params: { locale: string }
}

async function getMessages(locale: string) {
  try {
    return (await import(`../../messages/${locale}.json`)).default
  } catch (error) {
    notFound()
  }
}

export async function generateMetadata({ params: { locale } }: Props) {
  const messages = await getMessages(locale)
  const t = createTranslator({ locale, messages })
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000'

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: t('LocaleLayout.title')!,
      template: `%s | ${t('LocaleLayout.title')}`
    },
    robots: {
      follow: true,
      index: true
    },
    description: t('LocaleLayout.description')
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const locale = useLocale()
  const messages = await getMessages(locale)

  return (
    <ClerkProvider>
      <html lang={locale}>
        <body className={inter.className}>
          <Providers locale={locale} messages={messages}>
            {children}
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}
