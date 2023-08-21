import { Metadata } from 'next'
import { createTranslator } from 'next-intl'
import { BillboardClient } from './components/client'

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const messages = (await import(`../../../../messages/${locale}.json`)).default
  const t = createTranslator({ locale, messages })

  return {
    title: t('BillboardsPage.title'),
    description: t('BillboardsPage.description')
  }
}

export default function BillboardsPage() {
  return (
    <div>
      <div>
        <BillboardClient data={[]} />
      </div>
    </div>
  )
}
