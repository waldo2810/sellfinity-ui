import { Metadata } from 'next'
import { BillboardClient } from './components/client'
import { BillboardColumn } from './components/columns'
import { Billboard } from '@/interfaces'
import appEndpoints from '@/app/api/app.endpoints'

export async function generateMetadata({}: {
  params: { locale: string }
}): Promise<Metadata> {
  return {
    title: 'Carteleras',
    description: 'Administra creativas carteleras para llamar la atención'
  }
}

export default async function BillboardsPage({
  params
}: {
  params: { storeId: number }
}) {
  const URL = `${appEndpoints.billboards}?storeId=${params.storeId}`
  const billboards: BillboardColumn[] = await fetch(URL, { cache: 'no-store' })
    .then(res => res.json())
    .catch(error => console.log('ERROR FROM SERVER ->', error))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 px-5 pt-6">
        <BillboardClient data={billboards} />
      </div>
    </div>
  )
}
