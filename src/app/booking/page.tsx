'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Shield, ArrowLeft, Loader2, AlertCircle } from 'lucide-react'
import { BookingDetails } from '@/lib/types'
import { formatDate, formatTime, formatPrice } from '@/lib/utils'

function BookingContent() {
  const router = useRouter()
  const [booking, setBooking] = useState<BookingDetails | null>(null)
  const [paying, setPaying] = useState(false)
  const [payError, setPayError] = useState('')

  useEffect(() => {
    const stored = sessionStorage.getItem('busgo_booking')
    if (!stored) { router.replace('/'); return }
    try {
      setBooking(JSON.parse(stored))
    } catch {
      router.replace('/')
    }
  }, [router])

  async function handlePayment() {
    if (!booking) return
    setPaying(true)
    setPayError('')

    try {
      const res = await fetch('/api/razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: booking.totalPrice,
          description: `Bus ticket: ${booking.from} → ${booking.to} on ${formatDate(booking.date)}`,
          customerName: booking.contactName,
          customerEmail: booking.contactEmail,
          customerPhone: booking.contactPhone,
          bookingId: booking.bookingId,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        // Graceful fallback: if Razorpay isn't configured, check if trip has a static link
        setPayError(
          data.error?.includes('not configured')
            ? 'Payment gateway not yet configured. Please contact the operator to complete your booking.'
            : (data.error || 'Payment could not be initiated. Please try again.')
        )
        return
      }

      // Redirect to Razorpay payment link
      window.location.href = data.paymentLink
    } catch {
      setPayError('Network error. Please check your connection and try again.')
    } finally {
      setPaying(false)
    }
  }

  if (!booking) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-6 h-6 animate-spin text-brand-700" />
      </div>
    )
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          <Link
            href={`/seat-selection?busId=${booking.busId}&date=${booking.date}`}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-bold text-slate-900">Review &amp; Pay</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-5">
        {/* Trip summary */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <h2 className="font-bold text-slate-900 mb-4">Trip Details</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3 text-sm">
            <Detail label="Operator" value={booking.operator} />
            <Detail label="From" value={booking.from} />
            <Detail label="To" value={booking.to} />
            <Detail label="Date" value={formatDate(booking.date)} />
            <Detail label="Departure" value={formatTime(booking.departure)} />
            <Detail label="Arrival" value={formatTime(booking.arrival)} />
            <Detail label="Bus Type" value={`${booking.acType} ${booking.busType}`} />
            <Detail label="Duration" value={booking.duration} />
            <Detail label="Seats" value={booking.selectedSeats.join(', ')} />
            {booking.boardingPoint && <Detail label="Boarding" value={`${booking.boardingPoint.time} — ${booking.boardingPoint.name}`} />}
            {booking.droppingPoint && <Detail label="Dropping" value={`${booking.droppingPoint.time} — ${booking.droppingPoint.name}`} />}
          </div>
        </div>

        {/* Passengers */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <h2 className="font-bold text-slate-900 mb-4">Passengers</h2>
          <div className="space-y-3">
            {booking.passengers.map((p, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg text-sm">
                <span className="bg-brand-700 text-white text-xs px-2 py-0.5 rounded font-bold shrink-0">
                  Seat {p.seatId}
                </span>
                <span className="font-medium text-slate-900">{p.name}</span>
                <span className="text-slate-500">
                  {p.gender === 'M' ? 'Male' : p.gender === 'F' ? 'Female' : 'Other'}, {p.age} yrs
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 text-sm text-slate-700 space-y-1">
            <p><span className="text-slate-500 w-20 inline-block">Contact</span> {booking.contactName}</p>
            <p><span className="text-slate-500 w-20 inline-block">Email</span> {booking.contactEmail}</p>
            <p><span className="text-slate-500 w-20 inline-block">Phone</span> {booking.contactPhone}</p>
          </div>
        </div>

        {/* Price summary */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <h2 className="font-bold text-slate-900 mb-4">Price Breakdown</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-slate-700">
              <span>
                {formatPrice(booking.pricePerSeat)} × {booking.selectedSeats.length} seat{booking.selectedSeats.length > 1 ? 's' : ''}
              </span>
              <span>{formatPrice(booking.totalPrice)}</span>
            </div>
            <div className="flex justify-between text-slate-700">
              <span>Convenience fee</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>
            <div className="flex justify-between font-bold text-base text-slate-900 pt-2 border-t border-slate-100">
              <span>Total Payable</span>
              <span className="text-accent-600">{formatPrice(booking.totalPrice)}</span>
            </div>
          </div>
        </div>

        {/* Error */}
        {payError && (
          <div className="flex items-start gap-2 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <p>{payError}</p>
          </div>
        )}

        {/* Pay button */}
        <button
          onClick={handlePayment}
          disabled={paying}
          className="w-full bg-accent-500 hover:bg-accent-600 active:bg-accent-700 disabled:opacity-70 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors text-base shadow-md shadow-accent-200"
        >
          {paying ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Creating payment link…
            </>
          ) : (
            <>
              <Shield className="w-5 h-5" />
              Pay {formatPrice(booking.totalPrice)} Securely
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
          <Shield className="w-3.5 h-3.5 text-green-500" />
          Secured by Razorpay · 256-bit SSL encryption
        </div>
      </div>
    </div>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="block text-xs text-slate-400 font-medium">{label}</span>
      <span className="text-slate-900 font-medium">{value}</span>
    </div>
  )
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="w-6 h-6 animate-spin text-brand-700" /></div>}>
      <BookingContent />
    </Suspense>
  )
}
