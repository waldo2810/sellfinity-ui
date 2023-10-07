import { Metadata } from 'next'
import { OrdersClient } from './components/client'
import { BillboardColumn } from './components/columns'
import toast from 'react-hot-toast'
import appEndpoints from '@/app/api/app.endpoints'

export const metadata: Metadata = {
  title: 'Ordenes',
  description: 'Administra tus ordenes'
}

export default async function OrdersPage({
  params
}: {
  params: { storeId: number }
}) {
  //TODO CALL ORDERS AND CALL NEST APP
  const URL = `${appEndpoints.billboards}?storeId=${params.storeId}`
  const billboards: BillboardColumn[] = await fetch(URL, { cache: 'no-store' })
    .then(res => res.json())
    .catch(error => {
      toast.error('Error fetching billboards, please check logs')
      console.log('---> BillboardsPage line25', error)
    })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 px-5 pt-6">
        <OrdersClient data={billboards} />
      </div>
    </div>
  )
}
