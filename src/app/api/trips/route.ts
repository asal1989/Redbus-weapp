import { NextRequest, NextResponse } from 'next/server'
import { fetchTrips, fetchTripById } from '@/lib/sheets'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const id = searchParams.get('id')
  const from = searchParams.get('from')
  const to = searchParams.get('to')

  try {
    if (id) {
      const trip = await fetchTripById(id)
      if (!trip) return NextResponse.json({ error: 'Trip not found' }, { status: 404 })
      return NextResponse.json(trip)
    }

    if (!from || !to) {
      return NextResponse.json({ error: 'Missing required params: from, to' }, { status: 400 })
    }

    const trips = await fetchTrips(from, to)
    return NextResponse.json(trips)
  } catch (err) {
    console.error('[api/trips]', err)
    return NextResponse.json({ error: 'Failed to fetch trips' }, { status: 500 })
  }
}
