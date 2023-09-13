import { NextRequest, NextResponse } from 'next/server'
import serverEndpoints from '../../server.endpoints'

// GET A CATEGORY BY ITS ID
export async function GET(
  req: NextRequest,
  { params }: { params: { categoryId: number } }
) {
  if (!params.categoryId)
    return new Response('Category id must be provided', { status: 404 })

  try {
    const res = await fetch(
      `${serverEndpoints.categories}/${serverEndpoints.search}/${params.categoryId}`
    )
    if (!res.ok) {
      return NextResponse.json(res.statusText, { status: res.status })
    }
    const category = await res.json()
    if (!category) return NextResponse.json(null)
    return NextResponse.json(category)
  } catch (error) {
    console.log('ERROR--->', error)
  }
}

// UPDATE A CATEGORY
export async function PUT(
  req: NextRequest,
  { params }: { params: { categoryId: string } }
) {
  const { searchParams } = new URL(req.url)
  const storeId = searchParams.get('storeId')
  if (!storeId) return new Response('A store must be provided', { status: 404 })

  const { name }: { name: string } = await req.json()
  const res = await fetch(
    `${serverEndpoints.categories}/${serverEndpoints.update}/${params.categoryId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, storeId })
    }
  )
  return NextResponse.json({ status: 200 })
}

// DELETE A SIZE
export async function DELETE(
  req: NextRequest,
  { params }: { params: { categoryId: string } }
) {
  const { searchParams } = new URL(req.url)
  const storeId = searchParams.get('storeId')
  if (!storeId) return new Response('A store must be provided', { status: 404 })
  const res = await fetch(
    `${serverEndpoints.categories}/${serverEndpoints.delete}/${params.categoryId}`,
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
