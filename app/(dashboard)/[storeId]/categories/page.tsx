import { Metadata } from 'next'
import { CategoryClient } from './components/client'
import { CategoryColumn } from './components/columns'
import appEndpoints from '@/app/api/app.endpoints'

export async function generateMetadata({}: {
  params: { locale: string }
}): Promise<Metadata> {
  return {
    title: 'Categorias',
    description: 'Administra diversas categorias de productos'
  }
}

export default async function CategoriesPage({
  params
}: {
  params: { storeId: number }
}) {
  const URL = `${appEndpoints.categories}/?storeId=${params.storeId}`
  const billboards: CategoryColumn[] = await fetch(URL, { cache: 'no-store' })
    .then(res => res.json())
    .catch(error => console.log('ERROR FROM SERVER ->', error))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 px-5 pt-6">
        <CategoryClient data={billboards} />
      </div>
    </div>
  )
}
