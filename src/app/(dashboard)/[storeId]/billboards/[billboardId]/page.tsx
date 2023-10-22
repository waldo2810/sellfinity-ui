import { Billboard, Category } from '@/interfaces'
import { BillboardForm } from './components/billboard-form'
import { Metadata } from 'next'
import { getBillboard } from '@/actions/billboards/get-billboard'
import { getCategories } from '@/actions/categories/get-categories'

type BillboardPageProps = {
  params: {
    billboardId: string
    storeId: number
  }
}

export const metadata: Metadata = {
  title: 'Carteleras',
  description: 'Administra tus carteleras',
}

export default async function BillboardPage({ params }: BillboardPageProps) {
  const billboard: Billboard = await getBillboard(params.billboardId)
  console.log(billboard)
  const categories: Category[] = await getCategories(params.storeId)

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 px-8'>
        <BillboardForm initialData={billboard} categories={categories} />
      </div>
    </div>
  )
}
