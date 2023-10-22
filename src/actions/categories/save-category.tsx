import serverEndpoints from '@/app/api/server.endpoints'
import axios from 'axios'

export const saveCategory = async (storeId: string | string[], body: any) => {
  try {
    if (!storeId) throw new Error()
    const { name } = body
    const { data } = await axios.post(`${serverEndpoints.categories}`, {
      name,
      storeId,
    })
    return data
  } catch (error) {
    console.log(error)
    return {}
  }
}
