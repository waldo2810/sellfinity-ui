'use client'

import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import { ApiList } from '@/components/ui/api-list'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { BillboardColumn, columns } from './columns'
import { useState } from 'react'

interface BillboardClientProps {
  data: BillboardColumn[]
}

export const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
  const params = useParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  return (
    <>
      <div className="mb-8 space-y-4 md:flex items-center justify-between">
        <Heading
          title={'Carteleras'.concat(` (${data.length})`)}
          description="Administra creativas carteleras para llamar la atención"
        />
        <Button
          size="smFlexMdFull"
          onClick={() => {
            setIsLoading(true)
            router.push(`/${params.storeId}/billboards/new`)
            setIsLoading(false)
          }}
          aria-label="Add billboard"
          title="Add billboard"
          disabled={isLoading}
        >
          <Plus />
          Agregar
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="label" columns={columns} data={data} />
      <Heading title="API" description="Documentación de API" />
      <Separator />
      <ApiList entityName="billboards" entityIdName="billboardId" />
    </>
  )
}
