'use client'

import LargeHeading from '@/components/ui/large-heading'
import { Metadata } from 'next'
import { createTranslator, useTranslations } from 'next-intl'

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const messages = (await import(`../../../../messages/${locale}.json`)).default
  const t = createTranslator({ locale, messages })

  return {
    title: t('DashboadPage.title'),
    description: t('DashboadPage.description')
  }
}

export default function DashboardPage() {
  const t = useTranslations('DashboardPage')
  return (
    <div>
      <div className="mb-8 space-y-1">
        <LargeHeading size="sm">{t('title')}</LargeHeading>
        <p className="text-muted-foreground text-sm md:text-lg font-light text-center md:text-left">
          {t('subtitle')}
        </p>
      </div>
      {/* graphs */}
    </div>
  )
}
