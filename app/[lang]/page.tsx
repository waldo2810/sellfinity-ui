import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Locale } from '../../i18n-config'
import { getDictionary } from '../../get-dictionary'

export default async function LandingPage({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const dictionary = await getDictionary(lang)
  return (
    <div>
      <h1>{dictionary['landing'].title}</h1>
      <Link href="/dashboard">
        <Button>Get started</Button>
      </Link>
    </div>
  )
}
