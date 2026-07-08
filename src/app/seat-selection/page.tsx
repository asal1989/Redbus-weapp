'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { BusTrip, Passenger, BookingDetails } from '@/lib/types'
import { formatTime, formatDate, formatPrice, generateBookingId } from '@/lib/utils'
import SeatGrid from '@/components/seat-selection/SeatGrid'
import PassengerForm from '@/components/seat-selection/PassengerForm'
import { Suspense } from 'react'

function SeatSelectionContent() {
  const router = useRouter()
  const params = useSearchParams()
  const busId = params.get('busId') || ''
  const date = params.get('date') || ''

  const [trip, setTrip] = useState<BusTrip | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [selectedSeats, setSelectedSeats] = useState<string[]>([])
  const [passengers, setPassengers] = useState<Passenger[]>([])
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (!busId) { setLoading(false); return }
    fetch(`/api/trips?id=${encodeURIComponent(busId)}`)
      .then(r => r.ok ? r.json() : Promise.reject(r.statusText))
      .then(setTrip)
      .catch(() => setError('Could not load bus details. Please go back and try again.'))
      .finally(() => setLoading(false))
  }, [busId])

  // Keep passengers array in sync with selectedSeats
  useEffect(() => {
    setPassengers(prev =>
      selectedSeats.map((seatId, idx) => prev[idx] ?? { seatId, name: '', age: '', gender: 'M' })
    )
  }, [selectedSeats])

  function toggleSeat(id: string) {
    setSelectedSeats(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    )
  }

  function updatePassenger(idx: number, field: keyof Omit<Passenger, 'seatId'>, value: string) {
    setPassengers(prev => prev.map((p, i) => (i === idx ? { ...p, [field]: value } : p)))
  }

  function validate(): boolean {
    const errs: Record<string, string> = {}
    if (selectedSeats.length === 0) {
      errs.seats = 'Please select at least one seat'
    }
    passengers.forEach((p, idx) => {
      if (!p.name.trim()) errs[`passenger_${idx}_name`] = 'Name is required'
      if (!p.age || parseInt(p.age, 10) < 1) errs[`passenger_${idx}_age`] = 'Valid age required'
    })
    if (!contactName.trim()) errs.contactName = 'Contact name is required'
    if (!contactEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.contactEmail = 'Valid email required'
    if (!contactPhone.match(/^[\d\s+\-()]{7,15}$/)) errs.contactPhone = 'Valid phone number required'

    setFormErrors(errs)
    return Object.keys(errs).length === 0
  }

  function handleProceed() {
    if (!validate() || !trip) return

    const booking: BookingDetails = {
      busId: trip.id,
      operator: trip.operator,
      from: trip.from,
      to: trip.to,
      date,
      departure: trip.departure,
      arrival: trip.arrival,
      duration: trip.duration,
      busType: trip.busType,
      acType: trip.acType,
      amenities: trip.amenities,
      selectedSeats: selectedSeats.sort(),
      passengers,
      contactName,
      contactEmail,
      contactPhone,
      pricePerSeat: trip.price,
      totalPrice: trip.price * selectedSeats.length,
      bookingId: generateBookingId(),
    }

    sessionStorage.setItem('busgo_booking', JSON.stringify(booking))
    router.push('/booking')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-slate-500 text-sm">Loading bus details…</div>
      </div>
    )
  }

  if (error || !trip) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <p className="text-4xl mb-4">⚠️</p>
        <p className="text-slate-700 font-semibold mb-4">{error || 'Bus not found'}</p>
        <Link href="/" className="text-brand-700 font-medium hover:underline">← Back to Search</Link>
      </div>
    )
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header bar */}
      <div className="bg-white border-b border-slate-200 shadow-sm sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3 flex-wrap">
          <Link href={`/search?from=${trip.from}&to=${trip.to}&date=${date}`} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 shrink-0">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-2 text-slate-900 font-semibold">
            <span>{trip.operator}</span>
            <span className="text-slate-400">·</span>
            <span className="text-sm font-normal text-slate-600">
              {trip.from} <ArrowRight className="w-3 h-3 inline" /> {trip.to}
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-sm font-normal text-slate-600">{formatDate(date)}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">

          {/* Left: Seat grid + Passenger form */}
          <div className="space-y-6">
            {/* Seat grid */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <h2 className="font-bold text-slate-900 mb-1">Choose Your Seats</h2>
              <p className="text-sm text-slate-500 mb-5">
                {trip.seatsAvailable} seats available — select up to 6
              </p>
              {formErrors.seats && (
                <p className="mb-3 text-sm text-red-600 font-medium">{formErrors.seats}</p>
              )}
              <SeatGrid
                totalSeats={trip.totalSeats}
                seatsAvailable={trip.seatsAvailable}
                busId={trip.id}
                selected={selectedSeats}
                onToggle={toggleSeat}
                maxSelectable={6}
              />
            </div>

            {/* Passenger form (only shown when seats are selected) */}
            {selectedSeats.length > 0 && (
              <div>
                <h2 className="font-bold text-slate-900 mb-3 text-lg">Passenger Details</h2>
                <PassengerForm
                  seats={selectedSeats.sort()}
                  passengers={passengers}
                  contactName={contactName}
                  contactEmail={contactEmail}
                  contactPhone={contactPhone}
                  onPassengerChange={updatePassenger}
                  onContactChange={(field, value) => {
                    if (field === 'contactName') setContactName(value)
                    else if (field === 'contactEmail') setContactEmail(value)
                    else setContactPhone(value)
                  }}
                  errors={formErrors}
                />
              </div>
            )}
          </div>

          {/* Right: Summary + Proceed */}
          <div className="lg:sticky lg:top-32 space-y-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <h3 className="font-bold text-slate-900 mb-4">Trip Summary</h3>
              <div className="space-y-2 text-sm text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Operator</span>
                  <span className="font-medium">{trip.operator}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Route</span>
                  <span className="font-medium">{trip.from} → {trip.to}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Date</span>
                  <span className="font-medium">{formatDate(date)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Departure</span>
                  <span className="font-medium">{formatTime(trip.departure)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Arrival</span>
                  <span className="font-medium">{formatTime(trip.arrival)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Bus Type</span>
                  <span className="font-medium">{trip.acType} {trip.busType}</span>
                </div>
              </div>

              {selectedSeats.length > 0 && (
                <>
                  <div className="border-t border-slate-100 my-4" />
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Seats</span>
                      <span className="font-medium">{selectedSeats.sort().join(', ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Price/seat</span>
                      <span className="font-medium">{formatPrice(trip.price)}</span>
                    </div>
                    <div className="flex justify-between text-base font-bold text-slate-900 pt-1">
                      <span>Total</span>
                      <span className="text-accent-600">{formatPrice(trip.price * selectedSeats.length)}</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            <button
              onClick={handleProceed}
              disabled={selectedSeats.length === 0}
              className="w-full bg-accent-500 hover:bg-accent-600 active:bg-accent-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm shadow-md shadow-accent-200"
            >
              Proceed to Payment
              <ArrowRight className="w-4 h-4" />
            </button>

            {selectedSeats.length === 0 && (
              <p className="text-center text-xs text-slate-400">Select at least one seat to continue</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SeatSelectionPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh] text-slate-500">Loading…</div>}>
      <SeatSelectionContent />
    </Suspense>
  )
}
