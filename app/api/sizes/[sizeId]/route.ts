import { NextRequest, NextResponse } from 'next/server'
import serverEndpoints from '../../server.endpoints'

// GET A SIZE BY ITS ID
export async function GET(
  req: NextRequest,
  { params }: { params: { sizeId: number } }
) {
  if (!params.sizeId)
    return new Response('Size id must be provided', { status: 404 })

  try {
    const res = await fetch(
      `${serverEndpoints.sizes}/${serverEndpoints.search}/${params.sizeId}`
    )
    if (!res.ok) {
      return NextResponse.json(res.statusText, { status: res.status })
    }
    const size = await res.json()
    if (!size) return NextResponse.json(null)
    return NextResponse.json(size)
  } catch (error) {
    console.log('ERROR--->', error)
  }
}

// UPDATE A SIZE
export async function PUT(
  req: NextRequest,
  { params }: { params: { sizeId: string } }
) {
  const { searchParams } = new URL(req.url)
  const storeId = searchParams.get('storeId')
  if (!storeId) return new Response('A store must be provided', { status: 404 })

  const { name, value }: { name: string; value: string } = await req.json()
  await fetch(
    `${serverEndpoints.sizes}/${serverEndpoints.update}/${params.sizeId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, value, storeId })
    }
  )
  return NextResponse.json({ status: 200 })
}

// DELETE A SIZE
export async function DELETE(
  req: NextRequest,
  { params }: { params: { sizeId: string } }
) {
  const { searchParams } = new URL(req.url)
  const storeId = searchParams.get('storeId')
  if (!storeId) return new Response('A store must be provided', { status: 404 })
  await fetch(
    `${serverEndpoints.sizes}/${serverEndpoints.delete}/${params.sizeId}`,
    {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    }
  )
  return NextResponse.json({ status: 200 })
}
