import serverEndpoints from '@/app/api/server.endpoints'

export const getStockCount = async (storeId: string) => {
  return await fetch(
    serverEndpoints.products + '/stock-count?storeId=' + storeId,
  ).then(res => res.json())
}
