'use client'

import { DataTable } from '@/components/ui/data-table'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { BillboardColumn, columns } from './columns'

interface OrdersClientProps {
  data: BillboardColumn[]
}

export const OrdersClient: React.FC<OrdersClientProps> = ({ data }) => {
  return (
    <>
      <Heading
        title={'Ordenes'.concat(` (${data.length})`)}
        description="Administra tus ordenes"
      />
      <Separator />
      <DataTable searchKey="label" columns={columns} data={data} />
    </>
  )
}
