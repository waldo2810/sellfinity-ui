import paymentsEndpoints from '@/app/api/payment.endpoints'
import axios from 'axios'

const URL = `${paymentsEndpoints.orders}`

export const getOrders = async (storeId: number) => {
  try {
    if (!storeId) throw new Error()
    const { data } = await axios.get(URL, { params: { storeId } })
    return data
  } catch (error) {
    console.log(error)
  }
}
