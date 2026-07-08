'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Star, CheckCircle, Home } from 'lucide-react'

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0)
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(n)}
          className="focus:outline-none transition-transform hover:scale-110"
        >
          <Star
            className={`w-8 h-8 transition-colors ${n <= (hover || value) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
          />
        </button>
      ))}
    </div>
  )
}

function ReviewContent() {
  const params = useSearchParams()
  const bookingId = params.get('bookingId') || ''
  const busId     = params.get('busId') || ''

  const [rating, setRating]           = useState(0)
  const [comment, setComment]         = useState('')
  const [passengerName, setName]      = useState('')
  const [travelDate, setTravelDate]   = useState('')
  const [submitted, setSubmitted]     = useState(false)
  const [error, setError]             = useState('')
  const [loading, setLoading]         = useState(false)

  useEffect(() => {
    // Pre-fill from session if available
    try {
      const b = JSON.parse(sessionStorage.getItem('busgo_booking') || '{}')
      if (b.contactName) setName(b.contactName)
      if (b.date) setTravelDate(b.date)
    } catch {}
  }, [])

  const labels = ['', 'Terrible', 'Poor', 'Okay', 'Good', 'Excellent']

  async function handleSubmit() {
    if (!rating) { setError('Please select a star rating'); return }
    if (!passengerName.trim()) { setError('Please enter your name'); return }
    if (!travelDate) { setError('Please enter travel date'); return }
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ busId, bookingId, rating, comment, passengerName, travelDate }),
      })
      const data = await res.json()
      if (!data.ok) { setError(data.error || 'Submission failed'); return }
      setSubmitted(true)
    } catch { setError('Network error. Please try again.') }
    finally { setLoading(false) }
  }

  if (submitted) return (
    <div className="max-w-md mx-auto px-4 py-16 text-center">
      <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="w-9 h-9 text-amber-500" />
      </div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Thank you!</h1>
      <p className="text-slate-500 text-sm mb-8">Your review helps other travellers choose the right bus.</p>
      <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-700 text-white rounded-xl font-semibold text-sm hover:bg-brand-800 transition-colors">
        <Home className="w-4 h-4" /> Back to Home
      </Link>
    </div>
  )

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-slate-900 mb-1">Rate Your Journey</h1>
      <p className="text-slate-500 text-sm mb-8">Share your experience with Aruljothi Travels</p>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
        {/* Star rating */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Overall Rating</label>
          <StarRating value={rating} onChange={setRating} />
          {rating > 0 && <p className="text-sm font-semibold text-amber-600 mt-1">{labels[rating]}</p>}
        </div>

        {/* Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Your Name</label>
          <input
            value={passengerName}
            onChange={e => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full border-2 border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Travel date */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Travel Date</label>
          <input
            type="date"
            value={travelDate}
            onChange={e => setTravelDate(e.target.value)}
            className="w-full border-2 border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Comment */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Your Review (optional)</label>
          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            rows={3}
            placeholder="How was your journey? Punctuality, comfort, driver behaviour…"
            className="w-full border-2 border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400 resize-none"
          />
        </div>

        {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-amber-400 hover:bg-amber-500 disabled:opacity-50 text-white font-bold py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
        >
          <Star className="w-4 h-4 fill-white" />
          {loading ? 'Submitting…' : 'Submit Review'}
        </button>
      </div>

      {bookingId && (
        <p className="text-xs text-slate-400 text-center mt-4">Reviewing booking <code className="font-mono">{bookingId}</code></p>
      )}
    </div>
  )
}

export default function ReviewPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh] text-slate-500">Loading…</div>}>
      <ReviewContent />
    </Suspense>
  )
}
