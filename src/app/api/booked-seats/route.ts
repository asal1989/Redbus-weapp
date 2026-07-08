import { NextRequest, NextResponse } from 'next/server'
import { getBookedSeats, bookSeats } from '@/lib/bookings'

export async function GET(req: NextRequest) {
  const busId = req.nextUrl.searchParams.get('busId') || ''
  const date = req.nextUrl.searchParams.get('date') || ''
  if (!busId || !date) return NextResponse.json({ seats: [] })
  return NextResponse.json({ seats: getBookedSeats(busId, date) })
}

export async function POST(req: NextRequest) {
  try {
    const { busId, date, seats, bookingId } = await req.json()
    if (!busId || !date || !seats?.length || !bookingId) {
      return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 })
    }
    const ok = bookSeats(busId, date, seats, bookingId)
    if (!ok) {
      return NextResponse.json({ ok: false, error: 'One or more seats already booked' }, { status: 409 })
    }
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 })
  }
}
