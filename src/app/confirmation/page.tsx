'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Download, Home, Phone } from 'lucide-react'
import { BookingDetails } from '@/lib/types'
import { formatDate, formatTime, formatPrice } from '@/lib/utils'

function ConfirmationContent() {
  const params = useSearchParams()
  const bookingId = params.get('bookingId') || ''

  const [booking, setBooking] = useState<BookingDetails | null>(null)
  const [notified, setNotified] = useState(false)

  useEffect(() => {
    const stored = sessionStorage.getItem('busgo_booking')
    if (!stored) return
    try {
      const b: BookingDetails = JSON.parse(stored)
      setBooking(b)

      // Lock seats + send operator notification (fire-and-forget)
      if (!notified) {
        setNotified(true)
        fetch('/api/booked-seats', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            busId: b.busId,
            date: b.date,
            seats: b.selectedSeats,
            bookingId: b.bookingId,
          }),
        }).catch(() => {})
        fetch('/api/notify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: stored,
        }).catch(() => {})
      }
    } catch {
      // Booking data not available — show generic confirmation
    }
  }, [notified])

  if (!booking) {
    // Generic confirmation when session data isn't available
    // (e.g. user opened confirmation in a new tab after payment)
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-9 h-9 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Payment Successful!</h1>
        <p className="text-slate-600 mb-2">
          Your booking ID: <span className="font-bold text-brand-700">{bookingId || 'N/A'}</span>
        </p>
        <p className="text-slate-500 text-sm mb-8">
          A confirmation has been sent to your email. Please save your booking ID for reference.
        </p>
        <p className="text-slate-500 text-sm mb-8">
          Our team will contact you if there are any changes to your trip.
        </p>
        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-700 text-white rounded-xl font-semibold hover:bg-brand-800 transition-colors">
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        {/* Success header */}
        <div className="bg-white border border-green-200 rounded-2xl p-6 text-center mb-6 shadow-sm">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-9 h-9 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Booking Confirmed!</h1>
          <p className="text-slate-500 text-sm mb-3">
            Confirmation sent to <strong>{booking.contactEmail}</strong>
          </p>
          <div className="inline-block bg-brand-50 text-brand-800 px-4 py-2 rounded-xl font-mono font-bold text-lg">
            {booking.bookingId}
          </div>
          <p className="text-xs text-slate-400 mt-2">Save this Booking ID for your records</p>
        </div>

        {/* Trip details */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-4">
          <h2 className="font-bold text-slate-900 mb-4">Trip Details</h2>
          <div className="flex items-center gap-3 mb-4 p-3 bg-slate-50 rounded-xl">
            <div className="text-center flex-1">
              <div className="text-xl font-bold text-slate-900">{formatTime(booking.departure)}</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">{booking.from}</div>
            </div>
            <div className="text-center shrink-0">
              <div className="text-xs text-slate-400">{booking.duration}</div>
              <div className="text-slate-300 text-lg">→</div>
            </div>
            <div className="text-center flex-1">
              <div className="text-xl font-bold text-slate-900">{formatTime(booking.arrival)}</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">{booking.to}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-xs text-slate-400 block">Date</span>
              <span className="font-medium text-slate-900">{formatDate(booking.date)}</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Operator</span>
              <span className="font-medium text-slate-900">{booking.operator}</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Bus Type</span>
              <span className="font-medium text-slate-900">{booking.acType} {booking.busType}</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Seats</span>
              <span className="font-medium text-slate-900">{booking.selectedSeats.join(', ')}</span>
            </div>
          </div>
        </div>

        {/* Passengers */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-4">
          <h2 className="font-bold text-slate-900 mb-3">Passengers</h2>
          <div className="divide-y divide-slate-100">
            {booking.passengers.map((p, i) => (
              <div key={i} className="flex items-center justify-between py-2.5 text-sm">
                <span className="font-medium text-slate-900">{p.name}</span>
                <div className="flex items-center gap-2 text-slate-500">
                  <span>{p.gender === 'M' ? 'Male' : p.gender === 'F' ? 'Female' : 'Other'}, {p.age} yrs</span>
                  <span className="bg-brand-100 text-brand-700 text-xs px-1.5 py-0.5 rounded font-bold">
                    {p.seatId}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Amount paid */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-5 mb-6">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-900">Amount Paid</span>
            <span className="text-xl font-extrabold text-green-700">{formatPrice(booking.totalPrice)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-800 hover:bg-brand-900 text-white rounded-xl font-bold transition-colors text-sm"
          >
            <Home className="w-4 h-4" />
            Book Another Trip
          </Link>
          <a
            href="tel:+911800000000"
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-semibold transition-colors text-sm"
          >
            <Phone className="w-4 h-4" />
            Contact Support
          </a>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          Having trouble? Call us on <a href="tel:+911800000000" className="text-brand-700">1800-000-0000</a> (Toll free)
        </p>
      </div>
    </div>
  )
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh] text-slate-500">Loading confirmation…</div>}>
      <ConfirmationContent />
    </Suspense>
  )
}
