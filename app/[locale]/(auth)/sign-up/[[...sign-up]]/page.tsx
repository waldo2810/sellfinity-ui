import { SignUp } from '@clerk/nextjs'
import { createTranslator } from 'next-intl'

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const messages = (await import(`../../../../../messages/${locale}.json`))
    .default
  const t = createTranslator({ locale, messages })

  return {
    title: t('SignInPage.title'),
    description: t('SignUpPage.description')
  }
}

export default function Page() {
  return <SignUp />
}
