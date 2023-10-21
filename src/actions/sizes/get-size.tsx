import serverEndpoints from '@/app/api/server.endpoints'
import axios from 'axios'

export const getSize = async (sizeId: any) => {
  try {
    if (!sizeId || sizeId === 'new') return null
    const { data } = await axios.get(
      `${serverEndpoints.sizes}/search/${sizeId}`,
      {
        params: { sizeId },
      },
    )
    return data
  } catch (error: unknown) {
    console.log(error)
    return {}
  }
}
