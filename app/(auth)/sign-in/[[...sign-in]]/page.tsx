import { SignIn } from '@clerk/nextjs'

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}) {
  return {
    title: 'Iniciar sesión',
    description: 'Inicia sesión a tu cuenta'
  }
}

export default function Page() {
  return <SignIn />
}
