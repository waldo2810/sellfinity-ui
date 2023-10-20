import paymentsEndpoints from '@/app/api/payment.endpoints'

export const getSalesCount = async (storeId: string) => {
  return await fetch(
    paymentsEndpoints.orders + '/sales-count?storeId=' + storeId,
  ).then(res => res.json())
}
