import { SignUp } from '@clerk/nextjs'

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}) {
  return {
    title: 'Registrate',
    description: 'Crea una nueva cuenta'
  }
}

export default function Page() {
  return <SignUp />
}
