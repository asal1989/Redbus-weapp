import { NextRequest, NextResponse } from 'next/server'
import { cancelBooking, getBookingById } from '@/lib/bookings'

export async function POST(req: NextRequest) {
  try {
    const { bookingId, phone } = await req.json()
    if (!bookingId || !phone) {
      return NextResponse.json({ ok: false, error: 'Booking ID and phone are required' }, { status: 400 })
    }
    const result = cancelBooking(bookingId, phone)
    if (!result.ok) return NextResponse.json(result, { status: 400 })
    return NextResponse.json(result)
  } catch {
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const bookingId = req.nextUrl.searchParams.get('bookingId') || ''
  if (!bookingId) return NextResponse.json({ error: 'Missing bookingId' }, { status: 400 })
  const booking = getBookingById(bookingId)
  if (!booking) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(booking)
}
