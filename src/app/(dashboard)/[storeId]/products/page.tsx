import { getProducts } from '@/actions/products/get-products'
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
  const products: ProductColumn[] = await getProducts(params.storeId)

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 px-5 pt-6">
        <ProductClient data={products} />
      </div>
    </div>
  )
}
