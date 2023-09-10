'use client'

import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import { ApiList } from '@/components/ui/api-list'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'
import { CategoryColumn, columns } from './columns'

interface CategoryClientProps {
  data: CategoryColumn[]
}

export const CategoryClient: React.FC<CategoryClientProps> = ({ data }) => {
  const params = useParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  return (
    <>
      <div className="mb-8 space-y-4 md:flex items-center justify-between">
        <Heading
          title={'Categorias'.concat(` (${data.length})`)}
          description="Administra diversas categorias de productos"
        />
        <Button
          size="smFlexMdFull"
          onClick={() => {
            setIsLoading(true)
            router.push(`/${params.storeId}/categories/new`)
            setIsLoading(false)
          }}
          aria-label="Add category"
          title="Add category"
          disabled={isLoading}
        >
          <Plus />
          Agregar
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="Documentación de API" />
      <Separator />
      <ApiList entityName="categories" entityIdName="categoryId" />
    </>
  )
}
