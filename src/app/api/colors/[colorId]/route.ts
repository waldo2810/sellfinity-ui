import { NextRequest, NextResponse } from 'next/server'
import serverEndpoints from '../../server.endpoints'

// GET A COLOR BY ITS ID
export async function GET(
  req: NextRequest,
  { params }: { params: { colorId: number } }
) {
  if (!params.colorId)
    return new Response('Color id must be provided', { status: 404 })

  try {
    const res = await fetch(
      `${serverEndpoints.colors}/${serverEndpoints.search}/${params.colorId}`
    )
    if (!res.ok) {
      return NextResponse.json(res.statusText, { status: res.status })
    }
    const color = await res.json()
    if (!color) return NextResponse.json(null)
    return NextResponse.json(color)
  } catch (error) {
    console.log('ERROR--->', error)
  }
}

// UPDATE A COLOR
export async function PUT(
  req: NextRequest,
  { params }: { params: { colorId: string } }
) {
  const { searchParams } = new URL(req.url)
  const storeId = searchParams.get('storeId')
  if (!storeId) return new Response('A store must be provided', { status: 404 })

  const { name, value }: { name: string; value: string } = await req.json()
  await fetch(
    `${serverEndpoints.colors}/${serverEndpoints.update}/${params.colorId}`,
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
  { params }: { params: { colorId: string } }
) {
  const { searchParams } = new URL(req.url)
  const storeId = searchParams.get('storeId')
  if (!storeId) return new Response('A store must be provided', { status: 404 })
  const res = await fetch(
    `${serverEndpoints.colors}/${serverEndpoints.delete}/${params.colorId}`,
    {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    }
  )
  if (!res.ok) {
    if (res.status === 409) {
      return new NextResponse('Color with ID currently belongs to products', {
        status: res.status
      })
    }
    return new NextResponse('Error from the server', { status: res.status })
  }
  return NextResponse.json({ status: 200 })
}
