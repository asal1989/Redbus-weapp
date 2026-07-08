'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeftRight, Calendar, Search } from 'lucide-react'
import CityInput from '@/components/ui/CityInput'
import { POPULAR_ROUTES } from '@/lib/constants'
import { getTomorrowDate, getTodayDate } from '@/lib/utils'
import clsx from 'clsx'

export default function HeroSearch() {
  const router = useRouter()
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [date, setDate] = useState(getTomorrowDate())
  const [error, setError] = useState('')

  function swapCities() {
    setFrom(to)
    setTo(from)
  }

  function handleSearch() {
    if (!from.trim()) { setError('Please select a departure city'); return }
    if (!to.trim()) { setError('Please select a destination city'); return }
    if (from === to) { setError('Departure and destination cannot be the same'); return }
    if (!date) { setError('Please select a travel date'); return }
    setError('')
    router.push(`/search?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${date}`)
  }

  function handlePopularRoute(f: string, t: string) {
    setFrom(f)
    setTo(t)
    setError('')
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      {/* Search card */}
      <div className="bg-white rounded-2xl shadow-2xl p-5 sm:p-7">
        <h2 className="text-lg font-bold text-slate-800 mb-5">Search Buses</h2>

        {/* City selectors */}
        <div className="relative flex flex-col sm:flex-row gap-3 sm:gap-0 sm:items-stretch">
          <div className="flex-1">
            <CityInput label="From" value={from} onChange={setFrom} placeholder="Departure city" exclude={to} />
          </div>

          {/* Swap button */}
          <div className="hidden sm:flex items-end pb-3.5 px-2 shrink-0">
            <button
              onClick={swapCities}
              title="Swap cities"
              className="p-2 rounded-full border-2 border-slate-200 hover:border-brand-400 hover:bg-brand-50 text-slate-500 hover:text-brand-700 transition-all"
            >
              <ArrowLeftRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile swap */}
          <div className="sm:hidden flex justify-center">
            <button
              onClick={swapCities}
              className="flex items-center gap-1 text-xs text-brand-700 font-medium"
            >
              <ArrowLeftRight className="w-3.5 h-3.5" /> Swap
            </button>
          </div>

          <div className="flex-1">
            <CityInput label="To" value={to} onChange={setTo} placeholder="Destination city" exclude={from} />
          </div>
        </div>

        {/* Date */}
        <div className="mt-3">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
            Travel Date
          </label>
          <div className="flex items-center gap-2 border-2 border-slate-200 hover:border-slate-300 focus-within:border-brand-600 rounded-xl px-3 py-3 bg-white transition-colors">
            <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="date"
              value={date}
              min={getTodayDate()}
              onChange={e => setDate(e.target.value)}
              className="flex-1 outline-none text-slate-900 text-sm bg-transparent font-medium"
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="mt-2 text-sm text-red-600 font-medium">{error}</p>
        )}

        {/* Search button */}
        <button
          onClick={handleSearch}
          className="mt-4 w-full bg-accent-500 hover:bg-accent-600 active:bg-accent-700 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm shadow-md shadow-accent-200"
        >
          <Search className="w-4 h-4" />
          Search Buses
        </button>
      </div>

      {/* Popular routes */}
      <div className="mt-5">
        <p className="text-center text-sm font-medium text-blue-100 mb-2.5">Popular Routes</p>
        <div className="flex flex-wrap justify-center gap-2">
          {POPULAR_ROUTES.map(r => (
            <button
              key={`${r.from}-${r.to}`}
              onClick={() => handlePopularRoute(r.from, r.to)}
              className={clsx(
                'px-3 py-1.5 rounded-full text-xs font-medium border transition-all',
                from === r.from && to === r.to
                  ? 'bg-white text-brand-800 border-white'
                  : 'bg-white/15 text-white border-white/30 hover:bg-white/25'
              )}
            >
              {r.from} → {r.to}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
