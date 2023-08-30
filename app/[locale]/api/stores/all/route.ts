import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return new Response('Unauthorized', { status: 401 })
  }

  const res = await fetch('http://localhost:8080/api/store', {
    method: 'GET',
    headers: {
      'X-AUTH-EMAIL': userId
    }
  })
  const stores = await res.json()
  return NextResponse.json(stores)
}
