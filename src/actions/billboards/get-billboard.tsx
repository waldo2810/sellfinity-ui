import serverEndpoints from '@/app/api/server.endpoints'
import axios from 'axios'

export const getBillboard = async (billboardId: any) => {
  try {
    if (!billboardId || billboardId === 'new') return null
    const { data } = await axios.get(
      `${serverEndpoints.billboards}/${billboardId}`)
    return data
  } catch (error: unknown) {
    console.log(error)
    return {}
  }
}
