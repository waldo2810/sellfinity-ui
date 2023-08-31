import Providers from '@/providers/providers'
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

type Props = {
  children: ReactNode
}

export async function generateMetadata() {
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000'

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: 'Sellfinity',
      template: `%s | Sellfinity`
    },
    robots: {
      follow: true,
      index: true
    },
    description: 'Modulo de CMS'
  }
}

export default async function LocaleLayout({ children }: Props) {
  return (
    <ClerkProvider>
      <html lang="es">
        <body className={inter.className}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}
