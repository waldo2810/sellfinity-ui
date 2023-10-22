import serverEndpoints from '@/app/api/server.endpoints'
import axios from 'axios'

export const saveProduct = async (storeId: string | string[], body: any) => {
  try {
    if (!storeId) throw new Error()
    const { data } = await axios.post(`${serverEndpoints.products}`, {
      categoryIds: body.categoryIds,
      sizeIds: body.sizeIds,
      colorIds: body.colorIds,
      name: body.name,
      price: body.price,
      isFeatured: body.isFeatured,
      isArchived: body.isArchived,
      images: body.images,
      storeId,
    })
    return data
  } catch (error) {
    console.log(error)
    return {}
  }
}
