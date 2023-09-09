import { Billboard, Category } from '@/interfaces'
import { BillboardForm } from './components/billboard-form'
import appEndpoints from '@/app/api/app.endpoints'
import { Metadata } from 'next'

type BillboardPageProps = {
  params: {
    billboardId: string
    storeId: number
  }
}

export const metadata: Metadata = {
  title: 'Carteleras',
  description: 'Administra tus carteleras'
}

export default async function BillboardPage({ params }: BillboardPageProps) {
  const billboardUrl = `${appEndpoints.billboards}/${params.billboardId}`
  const categoriesUrl = `${appEndpoints.categories}?storeId=${params.storeId}`

  const billboard: Billboard = await fetch(billboardUrl, { cache: 'no-store' })
    .then(res => res.json())
    .catch(error => console.log(error))

  const categories: Category[] = await fetch(categoriesUrl)
    .then(res => res.json())
    .catch(error => console.log(error))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 px-8">
        <BillboardForm initialData={billboard} categories={categories} />
      </div>
    </div>
  )
}
