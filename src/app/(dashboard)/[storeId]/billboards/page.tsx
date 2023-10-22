import { Metadata } from 'next'
import { BillboardClient } from './components/client'
import { BillboardColumn } from './components/columns'
import { getBillboards } from '@/actions/billboards/get-billboards'

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
  const billboards: BillboardColumn[] = await getBillboards(params.storeId)

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 px-5 pt-6">
        <BillboardClient data={billboards} />
      </div>
    </div>
  )
}
