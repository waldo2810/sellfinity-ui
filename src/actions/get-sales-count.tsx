import paymentsEndpoints from '@/app/api/payment.endpoints'
import axios from 'axios'

export const getSalesCount = async (storeId: string) => {
  try {
    const { data } = await axios.get(
      `${paymentsEndpoints.orders}/sales-count`,
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
