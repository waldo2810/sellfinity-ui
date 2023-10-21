import { getStores } from '@/actions/get-stores'
import { Store } from '@/interfaces'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await currentUser()

  if (!user) {
    redirect('/sign-in')
  }

  const stores: Store[] = await getStores()
  if (stores !== undefined && stores.length > 0) {
    redirect(`/${stores[0].id}`)
  }

  return (
    <>
      <Suspense fallback={<p>loading...</p>}>{children}</Suspense>
    </>
  )
}
