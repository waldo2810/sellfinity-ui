'use client' //next-intl not available for SC.

import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function LandingPage() {
  const t = useTranslations('LandingPage')
  return (
    <div>
      <h1>{t('title')}</h1>
      <Link href="/dashboard">
        <Button>{t('callToAction')}</Button>
      </Link>
    </div>
  )
}
