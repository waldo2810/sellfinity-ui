import { NextRequest, NextResponse } from 'next/server'
import serverEndpoints from '../server.endpoints'

// GET ALL THE BILLBOARDS OF A STORE
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const storeId = searchParams.get('storeId')
  if (!storeId) return new Response('A store must be provided', { status: 404 })

  try {
    const res = await fetch(serverEndpoints.billboards + '?storeId=' + storeId)
    if (!res.ok) {
      return NextResponse.json(res.statusText, { status: res.status })
    }
    const billboards = await res.json()
    if (!billboards) return NextResponse.json(null)
    return NextResponse.json(billboards)
  } catch (error) {
    console.log('ERROR FETCHING FROM DB ->', error)
  }
}

// SAVE A BILLBOARD
export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const storeId = searchParams.get('storeId')
  if (!storeId) return new Response('A store must be provided', { status: 404 })

  const {
    label,
    imageUrl,
    categoryId
  }: { label: string; imageUrl: string; categoryId: number } = await req.json()
  const res = await fetch(serverEndpoints.billboards, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      storeId,
      categoryId,
      label,
      imageUrl
    })
  })
  const store = await res.json()
  return NextResponse.json(store)
}
