import serverEndpoints from '@/app/api/server.endpoints'
import axios from 'axios'

export const getColor = async (colorId: any) => {
  try {
    if (!colorId || colorId === 'new') return null
    const { data } = await axios.get(
      `${serverEndpoints.colors}/search/${colorId}`,
    )
    return data
  } catch (error: unknown) {
    console.log(error)
    return {}
  }
}
