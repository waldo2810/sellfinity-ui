import paymentsEndpoints from '@/app/api/payment.endpoints'
import { PAYMENTS_URL } from '@/lib/contants'
import axios from 'axios'

export const getGraphRevenue = async (storeId: string) => {
  try {
    const { data } = await axios.get(
      `${paymentsEndpoints.orders}/graph-revenue`,
      {
        params: { storeId },
      },
    )
    return data
  } catch (error) {
    console.log(error)
    return []
  }
}
