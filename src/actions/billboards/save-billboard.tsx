import serverEndpoints from '@/app/api/server.endpoints'
import axios from 'axios'

export const saveBillboard = async (storeId: string | string[], body: any) => {
  try {
    if (!storeId) throw new Error()
    const { label, imageUrl, categoryId } = body
    const { data } = await axios.post(`${serverEndpoints.billboards}`, {
      label,
      categoryId,
      imageUrl,
      storeId,
    })
    return data
  } catch (error) {
    console.log(error)
    return {}
  }
}
