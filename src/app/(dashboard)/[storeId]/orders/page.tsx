import { Metadata } from 'next'
import { OrdersClient } from './components/client'
import { OrderColumn } from './components/columns'
import { getOrders } from '@/actions/orders/get-orders'

export const metadata: Metadata = {
  title: 'Ordenes',
  description: 'Administra tus ordenes',
}

export default async function OrdersPage({
  params,
}: {
  params: { storeId: number }
}) {
  const orders: OrderColumn[] = await getOrders(params.storeId)

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 px-5 pt-6'>
        <OrdersClient data={orders} />
      </div>
    </div>
  )
}
