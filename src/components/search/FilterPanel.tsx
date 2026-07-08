'use client'

import { DEPARTURE_SLOTS, BUS_TYPES, AC_TYPES } from '@/lib/constants'
import { SearchFilters } from '@/lib/types'
import clsx from 'clsx'

interface Props {
  filters: SearchFilters
  maxPrice: number
  onChange: (filters: SearchFilters) => void
}

function CheckChip({
  checked,
  onToggle,
  label,
}: {
  checked: boolean
  onToggle: () => void
  label: string
}) {
  return (
    <button
      onClick={onToggle}
      className={clsx(
        'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all',
        checked
          ? 'bg-brand-700 border-brand-700 text-white'
          : 'bg-white border-slate-200 text-slate-600 hover:border-brand-400'
      )}
    >
      <span className={clsx('w-3 h-3 rounded-sm border flex items-center justify-center', checked ? 'border-white bg-white' : 'border-slate-300')}>
        {checked && <span className="block w-1.5 h-1.5 bg-brand-700 rounded-sm" />}
      </span>
      {label}
    </button>
  )
}

export default function FilterPanel({ filters, maxPrice, onChange }: Props) {
  function toggleSlot(id: string) {
    const next = filters.departureSots.includes(id)
      ? filters.departureSots.filter(s => s !== id)
      : [...filters.departureSots, id]
    onChange({ ...filters, departureSots: next })
  }

  function toggleBusType(type: string) {
    const next = filters.busTypes.includes(type)
      ? filters.busTypes.filter(t => t !== type)
      : [...filters.busTypes, type]
    onChange({ ...filters, busTypes: next })
  }

  function toggleAcType(type: string) {
    const next = filters.acTypes.includes(type)
      ? filters.acTypes.filter(t => t !== type)
      : [...filters.acTypes, type]
    onChange({ ...filters, acTypes: next })
  }

  function reset() {
    onChange({ priceMax: maxPrice, departureSots: [], busTypes: [], acTypes: [] })
  }

  const hasActive =
    filters.priceMax < maxPrice ||
    filters.departureSots.length > 0 ||
    filters.busTypes.length > 0 ||
    filters.acTypes.length > 0

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-900 text-sm">Filters</h3>
        {hasActive && (
          <button onClick={reset} className="text-xs text-brand-700 font-medium hover:underline">
            Clear all
          </button>
        )}
      </div>

      {/* Price */}
      <div>
        <div className="flex justify-between mb-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Max Price</span>
          <span className="text-xs font-bold text-slate-800">₹{filters.priceMax}</span>
        </div>
        <input
          type="range"
          min={100}
          max={maxPrice}
          step={50}
          value={filters.priceMax}
          onChange={e => onChange({ ...filters, priceMax: parseInt(e.target.value, 10) })}
          className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-brand-700"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>₹100</span>
          <span>₹{maxPrice}</span>
        </div>
      </div>

      {/* Departure time */}
      <div>
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-2">Departure Time</span>
        <div className="flex flex-wrap gap-2">
          {DEPARTURE_SLOTS.map(slot => (
            <CheckChip
              key={slot.id}
              label={slot.label}
              checked={filters.departureSots.includes(slot.id)}
              onToggle={() => toggleSlot(slot.id)}
            />
          ))}
        </div>
      </div>

      {/* Bus type */}
      <div>
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-2">Bus Type</span>
        <div className="flex flex-wrap gap-2">
          {BUS_TYPES.map(t => (
            <CheckChip
              key={t}
              label={t}
              checked={filters.busTypes.includes(t)}
              onToggle={() => toggleBusType(t)}
            />
          ))}
        </div>
      </div>

      {/* AC / Non-AC */}
      <div>
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-2">AC Type</span>
        <div className="flex flex-wrap gap-2">
          {AC_TYPES.map(t => (
            <CheckChip
              key={t}
              label={t}
              checked={filters.acTypes.includes(t)}
              onToggle={() => toggleAcType(t)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
