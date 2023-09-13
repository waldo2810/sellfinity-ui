import appEndpoints from '@/app/api/app.endpoints'
import { Metadata } from 'next'
import { ProductClient } from './components/client'
import { ProductColumn } from './components/columns'

export const metadata: Metadata = {
  title: 'Productos',
  description: 'Administra tus productos'
}

export default async function ProductsPage({
  params
}: {
  params: { storeId: number }
}) {
  const URL = `${appEndpoints.products}?storeId=${params.storeId}`
  const products: ProductColumn[] = await fetch(URL, { cache: 'no-store' })
    .then(res => res.json())
    .catch(error => console.log('ERROR FROM SERVER ->', error))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 px-5 pt-6">
        <ProductClient data={products} />
      </div>
    </div>
  )
}
