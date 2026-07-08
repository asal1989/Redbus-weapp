'use client'

import { useState, useRef, useEffect, useId } from 'react'
import { MapPin, ChevronDown } from 'lucide-react'
import { INDIAN_CITIES } from '@/lib/constants'
import clsx from 'clsx'

interface CityInputProps {
  label: string
  value: string
  onChange: (city: string) => void
  placeholder?: string
  exclude?: string   // city to exclude from suggestions (e.g. the other city)
}

export default function CityInput({ label, value, onChange, placeholder = 'Select city', exclude }: CityInputProps) {
  const [query, setQuery] = useState(value)
  const [open, setOpen] = useState(false)
  const [activeIdx, setActiveIdx] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const id = useId()

  const filtered = INDIAN_CITIES.filter(
    c => c !== exclude && c.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 8)

  // Sync display value when prop changes from outside (e.g. swap button)
  useEffect(() => {
    setQuery(value)
  }, [value])

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function handleSelect(city: string) {
    onChange(city)
    setQuery(city)
    setOpen(false)
    setActiveIdx(-1)
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value)
    setOpen(true)
    setActiveIdx(-1)
    if (!e.target.value) onChange('')
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open || filtered.length === 0) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') setOpen(true)
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIdx(i => Math.min(i + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIdx(i => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && activeIdx >= 0) {
      e.preventDefault()
      handleSelect(filtered[activeIdx])
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <div className="relative" ref={containerRef}>
      <label htmlFor={id} className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
        {label}
      </label>
      <div
        className={clsx(
          'flex items-center gap-2 border-2 rounded-xl px-3 py-3 bg-white transition-colors cursor-text',
          open ? 'border-brand-600 shadow-sm' : 'border-slate-200 hover:border-slate-300'
        )}
        onClick={() => { inputRef.current?.focus(); setOpen(true) }}
      >
        <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
        <input
          id={id}
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          className="flex-1 outline-none text-slate-900 placeholder-slate-400 text-sm bg-transparent font-medium"
        />
        <ChevronDown className={clsx('w-4 h-4 text-slate-400 shrink-0 transition-transform', open && 'rotate-180')} />
      </div>

      {open && filtered.length > 0 && (
        <ul
          role="listbox"
          className="absolute z-50 top-full mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden animate-fade-in"
        >
          {filtered.map((city, idx) => (
            <li
              key={city}
              role="option"
              aria-selected={idx === activeIdx}
              onMouseDown={() => handleSelect(city)}
              onMouseEnter={() => setActiveIdx(idx)}
              className={clsx(
                'flex items-center gap-2.5 px-3 py-2.5 cursor-pointer text-sm transition-colors',
                idx === activeIdx ? 'bg-brand-50 text-brand-800' : 'text-slate-700 hover:bg-slate-50'
              )}
            >
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
