const base = process.env.NEXT_PUBLIC_API_URL

const serverEndpoints = {
  billboards: `${base}/api/billboards`,
  categories: `${base}/api/categories`,
  colors: `${base}/api/colors`,
  sizes: `${base}/api/sizes`,
  products: `${base}/api/products`,
  update: `update`,
  search: `search`,
  delete: `delete`
}

export default serverEndpoints
