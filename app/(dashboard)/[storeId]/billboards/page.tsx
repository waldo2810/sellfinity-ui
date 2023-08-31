import { Metadata } from 'next'
import { BillboardClient } from './components/client'
import { BillboardColumn } from './components/columns'

export async function generateMetadata({}: {
  params: { locale: string }
}): Promise<Metadata> {
  return {
    title: 'Carteleras',
    description: 'Administra creativas carteleras para llamar la atención'
  }
}

const data: BillboardColumn[] = [
  {
    id: 1,
    label: 'BFFR',
    createdAt: '2023-12-12:13:00:00'
  },
  {
    id: 2,
    label: 'please do not',
    createdAt: '2023-12-12:13:00:00'
  },
  {
    id: 3,
    label: 'awsome',
    createdAt: '2023-12-12:13:00:00'
  }
]

export default function BillboardsPage() {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 px-5 pt-6">
        <BillboardClient data={data} />
      </div>
    </div>
  )
}
