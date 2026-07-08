'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeftRight, Calendar, Search, Users, MapPin, Gift, ChevronDown } from 'lucide-react'
import { INDIAN_CITIES, POPULAR_ROUTES } from '@/lib/constants'
import { getTomorrowDate, getTodayDate } from '@/lib/utils'
import clsx from 'clsx'

export default function HeroSearch() {
  const router = useRouter()
  const [tripType, setTripType] = useState<'one-way' | 'round'>('one-way')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [date, setDate] = useState(getTomorrowDate())
  const [returnDate, setReturnDate] = useState('')
  const [passengers, setPassengers] = useState(1)
  const [error, setError] = useState('')
  const [fromOpen, setFromOpen] = useState(false)
  const [toOpen, setToOpen] = useState(false)

  function swap() { setFrom(to); setTo(from) }

  function handleSearch() {
    if (!from.trim()) { setError('Please select a departure city'); return }
    if (!to.trim())   { setError('Please select a destination city'); return }
    if (from === to)  { setError('Departure and destination cannot be the same'); return }
    if (!date)        { setError('Please select a travel date'); return }
    if (tripType === 'round' && !returnDate) { setError('Please select a return date'); return }
    setError('')
    const p = new URLSearchParams({ from, to, date })
    if (tripType === 'round' && returnDate) { p.set('returnDate', returnDate); p.set('tripType', 'round') }
    router.push(`/search?${p}`)
  }

  function fmt(d: string) {
    if (!d) return ''
    const dt = new Date(d + 'T00:00:00')
    return dt.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Tab row */}
        <div className="flex items-center justify-between px-5 pt-4 pb-0 border-b border-slate-100">
          <div className="flex gap-1">
            {(['one-way', 'round'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTripType(t)}
                className={clsx(
                  'flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold border-b-2 transition-all',
                  tripType === t
                    ? 'border-brand-700 text-brand-700'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                )}
              >
                <ArrowLeftRight className="w-3.5 h-3.5" />
                {t === 'one-way' ? 'One Way' : 'Round Trip'}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 text-xs font-semibold text-accent-500 border border-accent-200 bg-accent-50 px-3 py-1.5 rounded-full hover:bg-accent-100 transition-colors mb-1">
            <Gift className="w-3.5 h-3.5" /> Save more with offers
          </button>
        </div>

        {/* Search fields */}
        <div className="p-5">
          <div className="flex flex-col lg:flex-row items-stretch gap-3">
            {/* FROM */}
            <div className="relative flex-1">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-1.5">From</label>
              <div
                onClick={() => { setFromOpen(!fromOpen); setToOpen(false) }}
                className="flex items-center gap-2.5 border-2 border-slate-200 hover:border-brand-400 focus-within:border-brand-600 rounded-xl px-3 py-3 cursor-pointer transition-colors"
              >
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className={clsx('text-sm font-semibold truncate', from ? 'text-slate-900' : 'text-slate-400')}>
                    {from || 'Departure city'}
                  </div>
                  <div className="text-xs text-slate-400">Enter city</div>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-300 shrink-0" />
              </div>
              {fromOpen && (
                <CityDropdown cities={INDIAN_CITIES.filter(c => c !== to)} onSelect={c => { setFrom(c); setFromOpen(false) }} />
              )}
            </div>

            {/* Swap */}
            <div className="hidden lg:flex items-end pb-3">
              <button
                onClick={swap}
                className="w-9 h-9 rounded-full border-2 border-slate-200 hover:border-brand-400 hover:bg-brand-50 flex items-center justify-center transition-all text-slate-400 hover:text-brand-700"
              >
                <ArrowLeftRight className="w-4 h-4" />
              </button>
            </div>

            {/* TO */}
            <div className="relative flex-1">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-1.5">To</label>
              <div
                onClick={() => { setToOpen(!toOpen); setFromOpen(false) }}
                className="flex items-center gap-2.5 border-2 border-slate-200 hover:border-brand-400 rounded-xl px-3 py-3 cursor-pointer transition-colors"
              >
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className={clsx('text-sm font-semibold truncate', to ? 'text-slate-900' : 'text-slate-400')}>
                    {to || 'Destination city'}
                  </div>
                  <div className="text-xs text-slate-400">Enter city</div>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-300 shrink-0" />
              </div>
              {toOpen && (
                <CityDropdown cities={INDIAN_CITIES.filter(c => c !== from)} onSelect={c => { setTo(c); setToOpen(false) }} />
              )}
            </div>

            {/* TRAVEL DATE */}
            <div className="flex-1">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-1.5">
                {tripType === 'round' ? 'Departure Date' : 'Travel Date'}
              </label>
              <div className="relative border-2 border-slate-200 hover:border-brand-400 focus-within:border-brand-600 rounded-xl px-3 py-3 transition-colors">
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-slate-900">{fmt(date)}</div>
                    <div className="text-xs text-slate-400">Select date</div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-300 shrink-0" />
                </div>
                <input
                  type="date"
                  value={date}
                  min={getTodayDate()}
                  onChange={e => setDate(e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full"
                />
              </div>
            </div>

            {/* RETURN DATE — only for round trip */}
            {tripType === 'round' && (
              <div className="flex-1">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-1.5">Return Date</label>
                <div className="relative border-2 border-slate-200 hover:border-brand-400 focus-within:border-brand-600 rounded-xl px-3 py-3 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                    <div className="flex-1">
                      <div className={clsx('text-sm font-semibold', returnDate ? 'text-slate-900' : 'text-slate-400')}>
                        {returnDate ? fmt(returnDate) : 'Select date'}
                      </div>
                      <div className="text-xs text-slate-400">Select date</div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-300 shrink-0" />
                  </div>
                  <input
                    type="date"
                    value={returnDate}
                    min={date || getTodayDate()}
                    onChange={e => setReturnDate(e.target.value)}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full"
                  />
                </div>
              </div>
            )}

            {/* PASSENGERS */}
            <div className="w-full lg:w-44">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-1.5">Passengers</label>
              <div className="border-2 border-slate-200 hover:border-brand-400 rounded-xl px-3 py-3 transition-colors">
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-slate-400 shrink-0" />
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-slate-900">{passengers} Passenger{passengers > 1 ? 's' : ''}</div>
                    <div className="text-xs text-slate-400">Select count</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => setPassengers(p => Math.max(1, p - 1))} className="w-5 h-5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold flex items-center justify-center transition-colors">−</button>
                    <button onClick={() => setPassengers(p => Math.min(6, p + 1))} className="w-5 h-5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold flex items-center justify-center transition-colors">+</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {error && <p className="mt-2 text-sm text-red-600 font-medium">{error}</p>}

          {/* Search button */}
          <button
            onClick={handleSearch}
            className="mt-4 w-full bg-accent-500 hover:bg-accent-600 active:bg-accent-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors text-base shadow-lg shadow-accent-200"
          >
            <Search className="w-5 h-5" />
            Search Buses
          </button>
        </div>
      </div>

      {/* Popular routes quick-pick */}
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {POPULAR_ROUTES.map(r => (
          <button
            key={`${r.from}-${r.to}`}
            onClick={() => { setFrom(r.from); setTo(r.to) }}
            className={clsx(
              'px-3 py-1.5 rounded-full text-xs font-semibold border transition-all',
              from === r.from && to === r.to
                ? 'bg-white text-brand-800 border-white shadow'
                : 'bg-white/15 text-white border-white/30 hover:bg-white/25'
            )}
          >
            {r.from} → {r.to}
          </button>
        ))}
      </div>
    </div>
  )
}

function CityDropdown({ cities, onSelect }: { cities: string[]; onSelect: (c: string) => void }) {
  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-50 max-h-52 overflow-y-auto">
      {cities.map(city => (
        <button
          key={city}
          onClick={() => onSelect(city)}
          className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-brand-50 hover:text-brand-800 font-medium transition-colors first:rounded-t-xl last:rounded-b-xl"
        >
          {city}
        </button>
      ))}
    </div>
  )
}
