import { NextRequest, NextResponse } from 'next/server'
import serverEndpoints from '../../server.endpoints'

export async function GET(
  req: NextRequest,
  { params }: { params: { productId: number } }
) {
  if (!params.productId)
    return new Response('Product id must be provided', { status: 404 })

  try {
    const res = await fetch(`${serverEndpoints.products}/${params.productId}`)
    if (!res.ok) {
      return NextResponse.json(res.statusText, { status: res.status })
    }
    const product = await res.json()
    if (!product) return NextResponse.json(null)
    return NextResponse.json(product)
  } catch (error) {
    console.log('ERROR--->', error)
  }
}

// UPDATE A product
export async function PUT(
  req: NextRequest,
  { params }: { params: { productId: string } }
) {
  const { searchParams } = new URL(req.url)
  const storeId = searchParams.get('storeId')
  if (!storeId) return new Response('A store must be provided', { status: 404 })

  const {
    categoryIds,
    name,
    price,
    isFeatured,
    isArchived
  }: {
    categoryIds: number[]
    name: string
    price: number
    isFeatured: boolean
    isArchived: boolean
  } = await req.json()
  await fetch(
    `${serverEndpoints.products}/${serverEndpoints.update}/${params.productId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        storeId,
        categoryIds,
        name,
        price,
        isFeatured,
        isArchived
      })
    }
  )
  return NextResponse.json({ status: 200 })
}

// DELETE A SIZE
export async function DELETE(
  req: NextRequest,
  { params }: { params: { productId: string } }
) {
  const { searchParams } = new URL(req.url)
  const storeId = searchParams.get('storeId')
  if (!storeId) return new Response('A store must be provided', { status: 404 })
  await fetch(
    `${serverEndpoints.products}/${serverEndpoints.delete}/${params.productId}`,
    {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    }
  )
  return NextResponse.json({ status: 200 })
}
