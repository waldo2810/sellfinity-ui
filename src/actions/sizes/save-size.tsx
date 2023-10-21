import serverEndpoints from '@/app/api/server.endpoints'
import axios from 'axios'

export const saveSize = async (storeId: string | string[], body: any) => {
  try {
    if (!storeId) throw new Error()
    const { name, value } = body
    const { data } = await axios.post(`${serverEndpoints.sizes}`, {
      name,
      value,
      storeId,
    })
    return data
  } catch (error) {
    console.log(error)
    return {}
  }
}
