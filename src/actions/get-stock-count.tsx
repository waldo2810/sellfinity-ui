import serverEndpoints from '@/app/api/server.endpoints'
import axios from 'axios'

export const getStockCount = async (storeId: string) => {
  try {
    const { data } = await axios.get(
      `${serverEndpoints.products}/stock-count`,
      {
        params: { storeId },
      },
    )
    return data
  } catch (error) {
    console.log(error)
    return 0
  }
}
