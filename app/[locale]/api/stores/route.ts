import { Store } from '@/interfaces'
import { currentUser } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'

//SAVE A STORE AND RELATE TO A USER
export async function POST(request: Request) {
  const user = await currentUser()
  if (!user) return new NextResponse('Unauthorized', { status: 401 })
  const userEmail = user?.emailAddresses[0].emailAddress

  const { name }: { name: string } = await request.json()
  const res = await fetch('http://localhost:8080/api/store', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-AUTH-EMAIL': userEmail
    },
    body: JSON.stringify({ name: name })
  })
  const store = await res.json()
  return NextResponse.json(store)
}

//GET THE STORES OF A USER GIVEN HIS EMAIL
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')

  if (!userId) return new Response('Unauthorized', { status: 401 })

  try {
    const res = await fetch('http://localhost:8080/api/store', {
      method: 'GET',
      headers: { 'X-AUTH-EMAIL': userId }
    })
    if (!res.ok) {
      return NextResponse.json(res.statusText, { status: res.status })
    }
    const stores = await res.json()
    if (!stores) return NextResponse.json(null)
    return NextResponse.json(stores)
  } catch (error) {
    console.log('ERROR--->', error)
  }
}
