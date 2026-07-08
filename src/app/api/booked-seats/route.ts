import { NextRequest, NextResponse } from 'next/server'
import { getBookedSeats, bookSeats } from '@/lib/bookings'
import { BookingDetails } from '@/lib/types'

export async function GET(req: NextRequest) {
  const busId = req.nextUrl.searchParams.get('busId') || ''
  const date  = req.nextUrl.searchParams.get('date')  || ''
  if (!busId || !date) return NextResponse.json({ seats: [] })
  return NextResponse.json({ seats: getBookedSeats(busId, date) })
}

export async function POST(req: NextRequest) {
  try {
    const b: BookingDetails = await req.json()
    if (!b.busId || !b.date || !b.selectedSeats?.length || !b.bookingId) {
      return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 })
    }

    const ok = bookSeats({
      bookingId:    b.bookingId,
      busId:        b.busId,
      date:         b.date,
      seats:        b.selectedSeats,
      operator:     b.operator,
      from:         b.from,
      to:           b.to,
      departure:    b.departure,
      arrival:      b.arrival,
      duration:     b.duration,
      busType:      b.busType,
      acType:       b.acType,
      passengers:   b.passengers,
      contactName:  b.contactName,
      contactEmail: b.contactEmail,
      contactPhone: b.contactPhone,
      pricePerSeat: b.pricePerSeat,
      totalPrice:   b.totalPrice,
      boardingPoint: b.boardingPoint,
      droppingPoint: b.droppingPoint,
    })

    if (!ok) return NextResponse.json({ ok: false, error: 'One or more seats already booked' }, { status: 409 })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 })
  }
}
