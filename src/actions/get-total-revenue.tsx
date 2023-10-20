import paymentsEndpoints from '@/app/api/payment.endpoints'

export const getTotalRevenue = async (storeId: string) => {
  return await fetch(
    paymentsEndpoints.orders + '/total-revenue?storeId=' + storeId,
  ).then(res => res.json())
}
