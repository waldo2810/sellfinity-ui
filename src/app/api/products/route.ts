import { NextRequest, NextResponse } from 'next/server'
import serverEndpoints from '../server.endpoints'

// GET ALL THE PRODUCTS OF A STORE
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const storeId = searchParams.get('storeId')
  if (!storeId) return new Response('A store must be provided', { status: 404 })

  try {
    const res = await fetch(serverEndpoints.products + '?storeId=' + storeId)
    if (!res.ok) {
      return NextResponse.json(res.statusText, { status: res.status })
    }
    const products = await res.json()
    if (!products) return NextResponse.json(null)
    return NextResponse.json(products)
  } catch (error) {
    console.log('ERROR FETCHING FROM DB ->', error)
  }
}

// SAVE A PRODUCT
export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const storeId = searchParams.get('storeId')
  if (!storeId) return new Response('A store must be provided', { status: 404 })

  const {
    categoryIds,
    sizeIds,
    colorIds,
    name,
    price,
    isFeatured,
    isArchived,
    images
  }: {
    categoryIds: number[]
    sizeIds: number[]
    colorIds: number[]
    name: string
    price: number
    isFeatured: boolean
    isArchived: boolean
    images: { url: string }[]
  } = await req.json()
  const res = await fetch(serverEndpoints.products, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      storeId,
      categoryIds,
      sizeIds,
      colorIds,
      name,
      price,
      isFeatured,
      isArchived,
      images
    })
  })
  const product = await res.json()
  return NextResponse.json(product)
}
