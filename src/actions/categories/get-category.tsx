import serverEndpoints from '@/app/api/server.endpoints'
import axios from 'axios'

export const getCategory = async (categoryId: any) => {
  try {
    if (!categoryId || categoryId === 'new') return null
    const { data } = await axios.get(
      `${serverEndpoints.categories}/search/${categoryId}`,
    )
    return data
  } catch (error: unknown) {
    console.log(error)
    return {}
  }
}
