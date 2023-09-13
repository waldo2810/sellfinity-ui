import { NextRequest, NextResponse } from 'next/server'
import serverEndpoints from '../../server.endpoints'

const endpoint = `http://localhost:8080/api/billboards`

export async function GET(
  req: NextRequest,
  { params }: { params: { billboardId: number } }
) {
  if (!params.billboardId)
    return new Response('Billboard id must be provided', { status: 404 })

  try {
    const res = await fetch(`${endpoint}/${params.billboardId}`)
    if (!res.ok) {
      return NextResponse.json(res.statusText, { status: res.status })
    }
    const billboard = await res.json()
    if (!billboard) return NextResponse.json(null)
    return NextResponse.json(billboard)
  } catch (error) {
    console.log('ERROR--->', error)
  }
}

// UPDATE A BILLBOARD
export async function PUT(
  req: NextRequest,
  { params }: { params: { billboardId: string } }
) {
  const { searchParams } = new URL(req.url)
  const storeId = searchParams.get('storeId')
  if (!storeId) return new Response('A store must be provided', { status: 404 })

  const {
    label,
    imageUrl,
    categoryId
  }: { label: string; imageUrl: string; categoryId: number } = await req.json()
  await fetch(
    `${serverEndpoints.billboards}/${serverEndpoints.update}/${params.billboardId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        storeId,
        categoryId,
        label,
        imageUrl
      })
    }
  )
  return NextResponse.json({ status: 200 })
}

// DELETE A SIZE
export async function DELETE(
  req: NextRequest,
  { params }: { params: { billboardId: string } }
) {
  const { searchParams } = new URL(req.url)
  const storeId = searchParams.get('storeId')
  if (!storeId) return new Response('A store must be provided', { status: 404 })
  await fetch(
    `${serverEndpoints.billboards}/${serverEndpoints.delete}/${params.billboardId}`,
    {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    }
  )
  return NextResponse.json({ status: 200 })
}
