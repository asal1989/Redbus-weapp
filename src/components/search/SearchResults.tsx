'use client'

import { useState, useMemo } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import { BusTrip, SearchFilters } from '@/lib/types'
import { timeToMinutes } from '@/lib/utils'
import { DEPARTURE_SLOTS } from '@/lib/constants'
import BusCard from './BusCard'
import FilterPanel from './FilterPanel'
import clsx from 'clsx'

type SortKey = 'departure' | 'price_asc' | 'price_desc' | 'duration'

interface Props {
  trips: BusTrip[]
  from: string
  to: string
  date: string
}

export default function SearchResults({ trips, from, to, date }: Props) {
  const maxPrice = Math.max(...trips.map(t => t.price), 1000)

  const [filters, setFilters] = useState<SearchFilters>({
    priceMax: maxPrice,
    departureSots: [],
    busTypes: [],
    acTypes: [],
  })
  const [sortBy, setSortBy] = useState<SortKey>('departure')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    return trips
      .filter(t => {
        if (t.price > filters.priceMax) return false
        if (filters.departureSots.length > 0) {
          const mins = timeToMinutes(t.departure)
          const inSlot = filters.departureSots.some(slotId => {
            const slot = DEPARTURE_SLOTS.find(s => s.id === slotId)
            return slot ? mins >= slot.start && mins <= slot.end : false
          })
          if (!inSlot) return false
        }
        if (filters.busTypes.length > 0 && !filters.busTypes.includes(t.busType)) return false
        if (filters.acTypes.length > 0 && !filters.acTypes.includes(t.acType)) return false
        return true
      })
      .sort((a, b) => {
        if (sortBy === 'price_asc') return a.price - b.price
        if (sortBy === 'price_desc') return b.price - a.price
        if (sortBy === 'duration') {
          const parse = (d: string) => {
            const [h, m] = d.split('h').map(s => parseInt(s, 10))
            return (h || 0) * 60 + (m || 0)
          }
          return parse(a.duration) - parse(b.duration)
        }
        // Default: departure time
        return timeToMinutes(a.departure) - timeToMinutes(b.departure)
      })
  }, [trips, filters, sortBy])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Sort bar */}
      <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
        <p className="text-sm text-slate-600">
          <span className="font-bold text-slate-900">{filtered.length}</span> bus{filtered.length !== 1 ? 'es' : ''} found
        </p>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Mobile filter toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={clsx(
              'lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl border text-sm font-medium transition-colors',
              showFilters ? 'bg-brand-700 border-brand-700 text-white' : 'bg-white border-slate-200 text-slate-700'
            )}
          >
            {showFilters ? <X className="w-4 h-4" /> : <SlidersHorizontal className="w-4 h-4" />}
            Filters
          </button>

          {/* Sort select */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as SortKey)}
            className="px-3 py-2 border border-slate-200 rounded-xl text-sm text-slate-700 bg-white focus:outline-none focus:border-brand-500"
          >
            <option value="departure">Sort: Departure</option>
            <option value="price_asc">Sort: Price ↑</option>
            <option value="price_desc">Sort: Price ↓</option>
            <option value="duration">Sort: Duration</option>
          </select>
        </div>
      </div>

      <div className="flex gap-6 items-start">
        {/* Filter sidebar (desktop always visible, mobile toggleable) */}
        <aside className={clsx(
          'shrink-0 w-64',
          showFilters ? 'block' : 'hidden lg:block'
        )}>
          {/* On mobile, filter panel appears full-width above results */}
          <div className={clsx(showFilters && 'lg:hidden mb-4')}>
            <FilterPanel filters={filters} maxPrice={maxPrice} onChange={setFilters} />
          </div>
          <div className="hidden lg:block">
            <FilterPanel filters={filters} maxPrice={maxPrice} onChange={setFilters} />
          </div>
        </aside>

        {/* Bus cards */}
        <div className="flex-1 min-w-0 space-y-4">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-4xl mb-3">🚌</p>
              <p className="text-slate-700 font-semibold text-lg">No buses match your filters</p>
              <p className="text-slate-500 text-sm mt-1">Try adjusting the filters or change your date.</p>
            </div>
          ) : (
            filtered.map(trip => <BusCard key={trip.id} trip={trip} date={date} />)
          )}
        </div>
      </div>
    </div>
  )
}
