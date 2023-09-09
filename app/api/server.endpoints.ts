const base = process.env.NEXT_PUBLIC_API_URL

const serverEndpoints = {
  billboards: `${base}/api/billboards`,
  categories: `${base}/api/categories`,
  update: `update`
}

export default serverEndpoints
