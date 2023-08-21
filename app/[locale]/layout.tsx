import { ToastProvider } from '@/providers/toast-provider'
import { ClerkProvider } from '@clerk/nextjs'
import { createTranslator, NextIntlClientProvider } from 'next-intl'
import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'

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

export async function generateStaticParams() {
  return ['en', 'es'].map(locale => ({ locale }))
}

export async function generateMetadata({ params: { locale } }: Props) {
  const messages = await getMessages(locale)

  // You can use the core (non-React) APIs when you have to use next-intl
  // outside of components. Potentially this will be simplified in the future
  // (see https://next-intl-docs.vercel.app/docs/next-13/server-components).
  const t = createTranslator({ locale, messages })

  return {
    title: t('LocaleLayout.title'),
    description: t('LocaleLayout.description')
  }
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: Props) {
  const messages = await getMessages(locale)

  return (
    <ClerkProvider>
      <html lang={locale}>
        <body className={inter.className}>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <ToastProvider />
            {children}
          </NextIntlClientProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
