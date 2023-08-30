'use client'

import { Store } from '@/interfaces'
import { useUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function SetupLayout({
  children
}: {
  children: React.ReactNode
}) {
  const [stores, setStores] = useState<Store[]>()
  const { user } = useUser()

  if (!user) {
    redirect('/sign-in')
  }

  useEffect(() => {
    async function getData() {
      const URL =
        process.env.NEXT_PUBLIC_BASE_URL +
        '/api/stores?userId=' +
        user?.primaryEmailAddress

      fetch(URL, { cache: 'no-store' })
        .then(res => res.json())
        .then(data => setStores(data))
        .catch(err => console.log(err))
    }
    getData()
  }, [stores, user.primaryEmailAddress])

  if (stores !== undefined && stores.length > 0) {
    redirect(`/${stores[0].id}`)
  }

  return <>{children}</>
}
