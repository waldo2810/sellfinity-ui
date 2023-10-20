const base = process.env.NEXT_PUBLIC_PAYMENTS_API_URL

const paymentsEndpoints = {
  orders: `${base}/orders`,
  checkout: `${base}/checkout`,
  getSalesCount: `sales-count`,
}

export default paymentsEndpoints
