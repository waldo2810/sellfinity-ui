import { NextRequest, NextResponse } from 'next/server'
import serverEndpoints from '../server.endpoints'

// GET ALL THE SIZES OF A STORE
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const storeId = searchParams.get('storeId')
  if (!storeId) return new Response('A store must be provided', { status: 404 })

  try {
    const res = await fetch(serverEndpoints.sizes + '?storeId=' + storeId)
    if (!res.ok) {
      return NextResponse.json(res.statusText, { status: res.status })
    }
    const sizes = await res.json()
    if (!sizes) return NextResponse.json(null)
    return NextResponse.json(sizes)
  } catch (error) {
    console.log('ERROR FETCHING FROM DB ->', error)
  }
}

// SAVE A SIZE
export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const storeId = searchParams.get('storeId')
  if (!storeId) return new Response('A store must be provided', { status: 404 })

  const { name, value }: { name: string; value: string } = await req.json()
  const res = await fetch(serverEndpoints.sizes, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      value,
      storeId
    })
  })
  const store = await res.json()
  return NextResponse.json(store)
}
