import Navbar from '@/components/navbar'
import { Sidebar } from '@/components/sidebar'
import { auth } from '@clerk/nextjs'

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { userId } = auth()
  const stores = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/stores/all?userId=${userId}`
  )
    .then(res => res.json())
    .catch(err => console.log(err))
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
