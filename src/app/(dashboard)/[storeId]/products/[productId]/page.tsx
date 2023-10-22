import { getCategories } from '@/actions/categories/get-categories'
import { getColors } from '@/actions/colors/get-colors'
import { getProduct } from '@/actions/products/get-product'
import { getSizes } from '@/actions/sizes/get-sizes'
import { Category, Color, ProductData, Size } from '@/interfaces'
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
  const product: ProductData = await getProduct(params.productId)
  const categories: Category[] = await getCategories(params.storeId)
  const colors: Color[] = await getColors(params.storeId)
  const sizes: Size[] = await getSizes(params.storeId)

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
