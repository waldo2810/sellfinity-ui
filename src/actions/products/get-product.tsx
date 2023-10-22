import serverEndpoints from '@/app/api/server.endpoints'
import axios from 'axios'

export const getProduct = async (productId: any) => {
  try {
    if (!productId || productId === 'new') return null
    const { data } = await axios.get(
      `${serverEndpoints.products}/search/${productId}`,
    )
    return data
  } catch (error: unknown) {
    console.log(error)
    return {}
  }
}
