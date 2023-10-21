import serverEndpoints from '@/app/api/server.endpoints'
import { currentUser } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import axios from 'axios'

export const getStores = async () => {
  const user = await currentUser()
  if (!user) return new NextResponse('Unauthorized', { status: 401 })
  const userEmail = user?.emailAddresses[0].emailAddress

  try {
    const res = await axios.get(serverEndpoints.stores, {
      headers: {
        'Content-Type': 'application/json',
        'X-AUTH-EMAIL': userEmail,
      },
    })
    return res.data
  } catch (error: unknown) {
    console.log(error)
    return new NextResponse('Error getting stores')
  }
}
