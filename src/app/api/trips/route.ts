import { NextRequest, NextResponse } from 'next/server'
import { fetchTrips, fetchTripById } from '@/lib/sheets'
import { getBookingCount } from '@/lib/bookings'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const id   = searchParams.get('id')
  const from = searchParams.get('from')
  const to   = searchParams.get('to')
  const date = searchParams.get('date') || ''

  try {
    if (id) {
      const trip = await fetchTripById(id)
      if (!trip) return NextResponse.json({ error: 'Trip not found' }, { status: 404 })
      // Auto-decrement: subtract confirmed bookings from seatsAvailable
      const booked = getBookingCount(id, date)
      return NextResponse.json({ ...trip, seatsAvailable: Math.max(0, trip.seatsAvailable - booked) })
    }

    if (!from || !to) {
      return NextResponse.json({ error: 'Missing required params: from, to' }, { status: 400 })
    }

    const trips = await fetchTrips(from, to)
    const adjusted = trips.map(t => {
      const booked = getBookingCount(t.id, date)
      return { ...t, seatsAvailable: Math.max(0, t.seatsAvailable - booked) }
    })
    return NextResponse.json(adjusted)
  } catch (err) {
    console.error('[api/trips]', err)
    return NextResponse.json({ error: 'Failed to fetch trips' }, { status: 500 })
  }
}
