import appEndpoints from '@/app/api/app.endpoints'
import { Category } from '@/interfaces'
import { Metadata } from 'next'
import { CategoryForm } from './components/category-form'

type CategoryPageProps = {
  params: {
    categoryId: string
    storeId: number
  }
}

export const metadata: Metadata = {
  title: 'Agregar o editar categorías',
  description: 'Administra una categoría'
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const categoryUrl = `${appEndpoints.categories}/${params.categoryId}`

  const category: Category = await fetch(categoryUrl, { cache: 'no-store' })
    .then(res => res.json())
    .catch(error => console.log(error))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 px-8">
        <CategoryForm initialData={category} />
      </div>
    </div>
  )
}
