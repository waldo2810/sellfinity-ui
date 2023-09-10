const base = process.env.NEXT_PUBLIC_BASE_URL

const appEndpoints = {
  billboards: `${base}/api/billboards`,
  categories: `${base}/api/categories`,
  sizes: `${base}/api/sizes`,
  colors: `${base}/api/colors`
}

export default appEndpoints
