import serverEndpoints from '@/app/api/server.endpoints'
import axios from 'axios'

export const getColors = async (storeId: number) => {
  try {
    if (!storeId) throw new Error()
    const { data } = await axios.get(`${serverEndpoints.colors}`, {
      params: { storeId },
    })
    return data
  } catch (error) {
    console.log(error)
    return []
  }
}
