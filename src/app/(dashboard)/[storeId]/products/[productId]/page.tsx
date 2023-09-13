import appEndpoints from '@/app/api/app.endpoints'
import { Category, Color, Product, ProductData, Size } from '@/interfaces'
import { Metadata } from 'next'
import { ProductForm } from './components/product-form'

type BillboardPageProps = {
  params: {
    productId: string
    storeId: number
  }
}

export const metadata: Metadata = {
  title: 'Productos',
  description: 'Administra tus productos'
}

export default async function ProductPage({ params }: BillboardPageProps) {
  const productUrl = `${appEndpoints.products}/${params.productId}`
  const categoryUrl = `${appEndpoints.categories}?storeId=${params.storeId}`
  const colorUrl = `${appEndpoints.colors}?storeId=${params.storeId}`
  const sizeUrl = `${appEndpoints.sizes}?storeId=${params.storeId}`

  const product: ProductData = await fetch(productUrl, { cache: 'no-store' })
    .then(res => res.json())
    .catch(error => console.log(error))

  const categories: Category[] = await fetch(categoryUrl, { cache: 'no-store' })
    .then(res => res.json())
    .catch(error => console.log(error))

  const colors: Color[] = await fetch(colorUrl, { cache: 'no-store' })
    .then(res => res.json())
    .catch(error => console.log(error))

  const sizes: Size[] = await fetch(sizeUrl, { cache: 'no-store' })
    .then(res => res.json())
    .catch(error => console.log(error))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 px-8">
        <ProductForm
          initialData={product}
          categories={categories}
          colors={colors}
          sizes={sizes}
        />
      </div>
    </div>
  )
}
