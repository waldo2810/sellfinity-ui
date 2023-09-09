import { NextRequest, NextResponse } from 'next/server'
import serverEndpoints from '../server.endpoints'

// GET ALL THE CATEGORIES OF A STORE
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const storeId = searchParams.get('storeId')
  if (!storeId) return new Response('A store must be provided', { status: 404 })

  try {
    const res = await fetch(serverEndpoints.categories + '?storeId=' + storeId)
    if (!res.ok) {
      return NextResponse.json(res.statusText, { status: res.status })
    }
    const categories = await res.json()
    if (!categories) return NextResponse.json(null)
    return NextResponse.json(categories)
  } catch (error) {
    console.log('ERROR FETCHING FROM DB ->', error)
  }
}
