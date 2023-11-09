'use client'

import { DataTable } from '@/components/ui/data-table'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { OrderColumn, columns } from './columns'

interface OrdersClientProps {
  data: OrderColumn[]
}

export const OrdersClient: React.FC<OrdersClientProps> = ({ data }) => {
  return (
    <>
      <Heading
        title={'Ordenes'.concat(` (${data.length})`)}
        description='Administra tus ordenes'
      />
      <Separator />
      <DataTable searchKey='address' columns={columns} data={data} />
    </>
  )
}
