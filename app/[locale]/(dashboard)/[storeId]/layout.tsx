import Navbar from '@/components/navbar'
import { Sidebar } from '@/components/sidebar'
import { Store } from '@/interfaces'
import { currentUser } from '@clerk/nextjs'
import { User } from '@clerk/nextjs/dist/types/server'
import { redirect } from 'next-intl/server'

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const user: User | null = await currentUser()

  if (!user) {
    redirect('/sign-in')
  }

  const endpoint =
    process.env.NEXT_PUBLIC_BASE_URL +
    '/api/stores?userId=' +
    user.emailAddresses[0].emailAddress

  const stores: Store[] = await fetch(endpoint, { cache: 'no-store' })
    .then(res => res.json())
    .catch(err => console.log(err))

  if (!stores) {
    redirect('/sign-in')
  }

  return (
    <div className="h-full relative bg-slate-100 dark:bg-slate-950">
      <div className="hidden h-full md:w-72 md:flex md:flex-col md:fixed md:inset-y-0 z-[80] bg-slate-50 dark:bg-slate-900">
        <Sidebar stores={stores} />
      </div>
      <main className="md:pl-80">
        <Navbar />
        <div className="flex flex-col mx-5">{children}</div>
      </main>
    </div>
  )
}
