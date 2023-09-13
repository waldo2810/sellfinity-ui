import { NextRequest, NextResponse } from 'next/server'
import serverEndpoints from '../server.endpoints'

// GET ALL THE COLORS OF A STORE
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const storeId = searchParams.get('storeId')
  if (!storeId) return new Response('A store must be provided', { status: 404 })

  try {
    const res = await fetch(serverEndpoints.colors + '?storeId=' + storeId)
    if (!res.ok) {
      return NextResponse.json(res.statusText, { status: res.status })
    }
    const colors = await res.json()
    if (!colors) return NextResponse.json(null)
    return NextResponse.json(colors)
  } catch (error) {
    console.log('ERROR FETCHING FROM DB ->', error)
  }
}

// SAVE A COLOR
export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const storeId = searchParams.get('storeId')
  if (!storeId) return new Response('A store must be provided', { status: 404 })

  const { name, value }: { name: string; value: string } = await req.json()
  const res = await fetch(serverEndpoints.colors, {
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
