import appEndpoints from '@/app/api/app.endpoints'
import { Metadata } from 'next'
import { SizeClient } from './components/client'
import { SizeColumn } from './components/columns'

export const metadata: Metadata = {
  title: 'Tallas',
  description: 'Administra diversas tallas para tus productos'
}

export default async function SizesPage({
  params
}: {
  params: { storeId: number }
}) {
  const URL = `${appEndpoints.sizes}/?storeId=${params.storeId}`
  const billboards: SizeColumn[] = await fetch(URL, { cache: 'no-store' })
    .then(res => res.json())
    .catch(error => console.log('ERROR FROM SERVER ->', error))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 px-5 pt-6">
        <SizeClient data={billboards} />
      </div>
    </div>
  )
}
