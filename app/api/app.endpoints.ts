const base = process.env.NEXT_PUBLIC_BASE_URL

const appEndpoints = {
  billboards: `${base}/api/billboards`,
  categories: `${base}/api/categories`
}

export default appEndpoints
