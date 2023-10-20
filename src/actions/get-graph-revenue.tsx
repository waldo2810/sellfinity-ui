
import paymentsEndpoints from '@/app/api/payment.endpoints'

export const getGraphRevenue = async (storeId: string) => {
  return await fetch(
    paymentsEndpoints.orders + '/graph-revenue?storeId=' + storeId,
  ).then(res => res.json())
}
