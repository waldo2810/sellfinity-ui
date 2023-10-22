import serverEndpoints from '@/app/api/server.endpoints'
import axios from 'axios'

export const getBillboards = async (storeId: number) => {
  try {
    if (!storeId) throw new Error()
    const { data } = await axios.get(`${serverEndpoints.billboards}`, {
      params: { storeId },
    })
    return data
  } catch (error) {
    console.log(error)
    return []
  }
}
