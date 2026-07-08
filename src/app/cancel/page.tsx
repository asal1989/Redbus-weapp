'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { AlertTriangle, CheckCircle, Home, Search } from 'lucide-react'

function CancelContent() {
  const params = useSearchParams()
  const [bookingId, setBookingId] = useState(params.get('bookingId') || '')
  const [phone, setPhone]         = useState('')
  const [step, setStep]           = useState<'form' | 'confirm' | 'done'>('form')
  const [booking, setBooking]     = useState<any>(null)
  const [cancelRef, setCancelRef] = useState('')
  const [error, setError]         = useState('')
  const [loading, setLoading]     = useState(false)

  async function handleLookup() {
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`/api/cancel?bookingId=${encodeURIComponent(bookingId)}`)
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Booking not found'); return }
      setBooking(data)
      setStep('confirm')
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function handleCancel() {
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId, phone }),
      })
      const data = await res.json()
      if (!data.ok) { setError(data.error || 'Cancellation failed'); return }
      setCancelRef(data.cancelRef)
      setStep('done')
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (step === 'done') return (
    <div className="max-w-md mx-auto px-4 py-16 text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="w-9 h-9 text-green-600" />
      </div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Booking Cancelled</h1>
      <p className="text-slate-500 text-sm mb-4">
        Your cancellation reference is:
      </p>
      <div className="bg-slate-100 rounded-xl px-6 py-3 font-mono font-bold text-lg text-slate-900 mb-4">
        {cancelRef}
      </div>
      <p className="text-slate-500 text-sm mb-8">
        Please save this reference number. Our team will process your refund within 5–7 business days to your original payment method.
      </p>
      <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-700 text-white rounded-xl font-semibold hover:bg-brand-800 transition-colors text-sm">
        <Home className="w-4 h-4" /> Back to Home
      </Link>
    </div>
  )

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-slate-900 mb-1">Cancel Booking</h1>
      <p className="text-slate-500 text-sm mb-8">Enter your booking details to request a cancellation.</p>

      {step === 'form' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Booking ID</label>
            <input
              value={bookingId}
              onChange={e => setBookingId(e.target.value.toUpperCase())}
              placeholder="e.g. AJ-ABC123"
              className="w-full border-2 border-slate-200 rounded-xl px-3 py-2.5 text-sm font-mono focus:outline-none focus:border-brand-500"
            />
          </div>
          {error && <p className="text-sm text-red-600 font-medium">{error}</p>}
          <button
            onClick={handleLookup}
            disabled={!bookingId.trim() || loading}
            className="w-full bg-brand-700 hover:bg-brand-800 disabled:opacity-50 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-sm transition-colors"
          >
            <Search className="w-4 h-4" />
            {loading ? 'Looking up…' : 'Find Booking'}
          </button>
        </div>
      )}

      {step === 'confirm' && booking && (
        <div className="space-y-4">
          {/* Booking summary */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <h2 className="font-bold text-slate-900 mb-3">Booking Details</h2>
            <div className="space-y-2 text-sm">
              {[
                ['Booking ID', booking.bookingId],
                ['Route', `${booking.from} → ${booking.to}`],
                ['Date', booking.date],
                ['Seats', booking.seats.join(', ')],
                ['Contact', booking.contactName],
                ['Total Paid', `₹${booking.totalPrice.toLocaleString('en-IN')}`],
              ].map(([l, v]) => (
                <div key={l} className="flex justify-between">
                  <span className="text-slate-500">{l}</span>
                  <span className="font-medium text-slate-900">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Warning */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">
              Cancellations are subject to our refund policy. Refunds are processed within 5–7 business days.
            </p>
          </div>

          {/* Phone verification */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Verify with registered phone number
            </label>
            <input
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="+91 XXXXX XXXXX"
              type="tel"
              className="w-full border-2 border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-red-400"
            />
            {error && <p className="text-sm text-red-600 font-medium">{error}</p>}
            <div className="flex gap-3">
              <button
                onClick={() => { setStep('form'); setError('') }}
                className="flex-1 border-2 border-slate-200 text-slate-700 font-semibold py-3 rounded-xl text-sm hover:bg-slate-50 transition-colors"
              >
                Go Back
              </button>
              <button
                onClick={handleCancel}
                disabled={!phone.trim() || loading}
                className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-3 rounded-xl text-sm transition-colors"
              >
                {loading ? 'Cancelling…' : 'Confirm Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function CancelPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh] text-slate-500">Loading…</div>}>
      <CancelContent />
    </Suspense>
  )
}
