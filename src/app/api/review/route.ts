import { NextRequest, NextResponse } from 'next/server'
import { addReview, getReviewsForBus, getAverageRating } from '@/lib/reviews'

export async function GET(req: NextRequest) {
  const busId = req.nextUrl.searchParams.get('busId') || ''
  if (!busId) return NextResponse.json({ error: 'Missing busId' }, { status: 400 })
  const reviews = getReviewsForBus(busId)
  const rating  = getAverageRating(busId)
  return NextResponse.json({ reviews, rating })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { busId, bookingId, rating, comment, passengerName, travelDate } = body
    if (!busId || !bookingId || !rating || !passengerName || !travelDate) {
      return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 })
    }
    if (rating < 1 || rating > 5) return NextResponse.json({ ok: false, error: 'Rating must be 1–5' }, { status: 400 })
    const review = addReview({ busId, bookingId, rating, comment: comment || '', passengerName, travelDate })
    return NextResponse.json({ ok: true, review })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message || 'Server error' }, { status: 400 })
  }
}
