'use client'

import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import { ApiList } from '@/components/ui/api-list'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'
import { ProductColumn, columns } from './columns'

interface ProductClientProps {
  data: ProductColumn[]
}

export const ProductClient: React.FC<ProductClientProps> = ({ data }) => {
  const params = useParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  return (
    <>
      <div className="mb-8 space-y-4 md:flex items-center justify-between">
        <Heading
          title={'Productos'.concat(` (${data.length})`)}
          description="Administra tus productos"
        />
        <Button
          size="smFlexMdFull"
          onClick={() => {
            setIsLoading(true)
            router.push(`/${params.storeId}/products/new`)
            setIsLoading(false)
          }}
          aria-label="Add product"
          title="Add product"
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
      <ApiList entityName="products" entityIdName="productId" />
    </>
  )
}
