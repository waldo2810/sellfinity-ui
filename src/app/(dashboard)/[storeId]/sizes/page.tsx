import { getSizes } from '@/actions/sizes/get-sizes'
import { Metadata } from 'next'
import { SizeClient } from './components/client'
import { SizeColumn } from './components/columns'

export const metadata: Metadata = {
  title: 'Tallas',
  description: 'Administra diversas tallas para tus productos',
}

export default async function SizesPage({
  params,
}: {
  params: { storeId: number }
}) {
  const sizes: SizeColumn[] = await getSizes(params.storeId)

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 px-5 pt-6'>
        <SizeClient data={sizes} />
      </div>
    </div>
  )
}
