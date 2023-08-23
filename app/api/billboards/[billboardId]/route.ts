import { Billboard } from '@/interfaces'
import { auth } from '@clerk/nextjs'
import axios from 'axios'
import { NextResponse } from 'next/server'

const uri = `${process.env.BASE_URI}/billboards`

export async function GET({ params }: { params: { billboardId: string } }) {
  const billboardId = params.billboardId
  console.log('billboardId', billboardId)

  try {
    const { userId } = auth()

    if (!userId) return new NextResponse('Unauthorized', { status: 401 })
    if (!billboardId)
      return new NextResponse('billboardId must be provided', { status: 403 })

    const res = await axios.get(`${uri}/${billboardId}`)
    const billboard: Billboard = await res.data

    return NextResponse.json({ billboard })
  } catch (error) {
    console.log('[STORES_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
