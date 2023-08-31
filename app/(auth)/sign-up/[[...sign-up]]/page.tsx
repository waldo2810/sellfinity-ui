import { SignUp } from '@clerk/nextjs'

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}) {
  return {
    title: 'SignInPage.title',
    description: 'SignUpPage.description'
  }
}

export default function Page() {
  return <SignUp />
}
