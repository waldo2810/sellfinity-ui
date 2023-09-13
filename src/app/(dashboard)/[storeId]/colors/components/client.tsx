'use client'

import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import { ApiList } from '@/components/ui/api-list'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'
import { ColorColumn, columns } from './columns'

interface ColorClientProps {
  data: ColorColumn[]
}

export const ColorClient: React.FC<ColorClientProps> = ({ data }) => {
  const params = useParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  return (
    <>
      <div className="mb-8 space-y-4 md:flex items-center justify-between">
        <Heading
          title={'Colores'.concat(` (${data.length})`)}
          description="Administra diversos Colores para tus productos"
        />
        <Button
          size="smFlexMdFull"
          onClick={() => {
            setIsLoading(true)
            router.push(`/${params.storeId}/colors/new`)
            setIsLoading(false)
          }}
          aria-label="Add colors"
          title="Add colors"
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
      <ApiList entityName="colors" entityIdName="colorId" />
    </>
  )
}
