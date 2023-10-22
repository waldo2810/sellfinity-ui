import serverEndpoints from '@/app/api/server.endpoints'
import axios from 'axios'

export const saveColor = async (storeId: string | string[], body: any) => {
  try {
    if (!storeId) throw new Error()
    const { name, value } = body
    const { data } = await axios.post(`${serverEndpoints.colors}`, {
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
