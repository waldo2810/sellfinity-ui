import { getStores } from '@/actions/get-stores'
import Navbar from '@/components/navbar'
import { Sidebar } from '@/components/sidebar'
import { Store } from '@/interfaces'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import toast from 'react-hot-toast'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await currentUser()

  if (!user) {
    redirect('/sign-in')
  }

  const stores: Store[] = await getStores()

  if (!stores) {
    redirect('/sign-in')
  }

  return (
    <div className='h-full relative bg-slate-100 dark:bg-slate-950'>
      <div className='hidden h-full md:w-72 md:flex md:flex-col md:fixed md:inset-y-0 z-[80] bg-slate-50 dark:bg-slate-900'>
        <Sidebar />
      </div>
      <main className='md:pl-80'>
        <Navbar stores={stores} />
        <div className='flex flex-col mx-5'>{children}</div>
      </main>
    </div>
  )
}
