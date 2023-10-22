import { Metadata } from 'next'
import { CategoryClient } from './components/client'
import { CategoryColumn } from './components/columns'
import { getCategories } from '@/actions/categories/get-categories'

export async function generateMetadata({}: {
  params: { locale: string }
}): Promise<Metadata> {
  return {
    title: 'Categorias',
    description: 'Administra diversas categorias de productos',
  }
}

export default async function CategoriesPage({
  params,
}: {
  params: { storeId: number }
}) {
  const categories: CategoryColumn[] = await getCategories(params.storeId)

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 px-5 pt-6'>
        <CategoryClient data={categories} />
      </div>
    </div>
  )
}
