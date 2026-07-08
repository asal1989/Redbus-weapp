'use client'

import { useMemo } from 'react'
import { Seat } from '@/lib/types'
import { hashString } from '@/lib/utils'
import clsx from 'clsx'

interface Props {
  totalSeats: number
  seatsAvailable: number
  busId: string
  selected: string[]
  onToggle: (seatId: string) => void
  maxSelectable?: number
}

// Deterministically decide which seats look "booked" using the bus ID as seed
function getBookedSeats(busId: string, totalSeats: number, seatsAvailable: number): Set<string> {
  const bookedCount = totalSeats - seatsAvailable
  if (bookedCount <= 0) return new Set()

  const rows = Math.ceil(totalSeats / 4)
  const allIds: string[] = []
  for (let r = 1; r <= rows; r++) {
    for (const col of ['A', 'B', 'C', 'D'] as const) {
      allIds.push(`${r}${col}`)
    }
  }

  // Shuffle using seeded pseudo-random
  const shuffled = [...allIds]
  let seed = hashString(busId)
  for (let i = shuffled.length - 1; i > 0; i--) {
    seed = (seed * 1664525 + 1013904223) & 0xffffffff
    const j = Math.abs(seed) % (i + 1)
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  return new Set(shuffled.slice(0, bookedCount))
}

export default function SeatGrid({ totalSeats, seatsAvailable, busId, selected, onToggle, maxSelectable = 6 }: Props) {
  const rows = Math.ceil(totalSeats / 4)
  const bookedSet = useMemo(
    () => getBookedSeats(busId, totalSeats, seatsAvailable),
    [busId, totalSeats, seatsAvailable]
  )

  function getStatus(seatId: string): Seat['status'] {
    if (selected.includes(seatId)) return 'selected'
    if (bookedSet.has(seatId)) return 'booked'
    return 'available'
  }

  function handleClick(seatId: string, status: Seat['status']) {
    if (status === 'booked') return
    if (status === 'available' && selected.length >= maxSelectable) return
    onToggle(seatId)
  }

  return (
    <div>
      {/* Bus silhouette header */}
      <div className="flex items-center justify-center mb-4">
        <div className="bg-slate-100 rounded-t-full w-16 h-8 flex items-end justify-center pb-1">
          <span className="text-xs text-slate-400 font-medium">Front</span>
        </div>
      </div>

      {/* Driver row */}
      <div className="flex justify-start mb-3 px-2">
        <div className="w-9 h-9 rounded-lg bg-slate-200 flex items-center justify-center">
          <span className="text-lg">🚌</span>
        </div>
      </div>

      {/* Seat grid */}
      <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50 p-3">
        {/* Column headers */}
        <div className="grid grid-cols-[auto_1fr_1fr_12px_1fr_1fr] gap-1.5 mb-2 px-1">
          <div className="w-7" />
          <div className="text-center text-[10px] text-slate-400 font-medium">A</div>
          <div className="text-center text-[10px] text-slate-400 font-medium">B</div>
          <div />
          <div className="text-center text-[10px] text-slate-400 font-medium">C</div>
          <div className="text-center text-[10px] text-slate-400 font-medium">D</div>
        </div>

        {/* Rows */}
        {Array.from({ length: rows }, (_, rIdx) => {
          const rowNum = rIdx + 1
          return (
            <div key={rowNum} className="grid grid-cols-[auto_1fr_1fr_12px_1fr_1fr] gap-1.5 mb-1.5">
              {/* Row label */}
              <div className="w-7 flex items-center justify-center text-[10px] text-slate-400 font-medium">
                {rowNum}
              </div>
              {/* Left pair: A, B */}
              {(['A', 'B'] as const).map(col => {
                const id = `${rowNum}${col}`
                const status = getStatus(id)
                return (
                  <SeatButton key={id} id={id} status={status} onClick={() => handleClick(id, status)} />
                )
              })}
              {/* Aisle gap */}
              <div />
              {/* Right pair: C, D */}
              {(['C', 'D'] as const).map(col => {
                const id = `${rowNum}${col}`
                const status = getStatus(id)
                return (
                  <SeatButton key={id} id={id} status={status} onClick={() => handleClick(id, status)} />
                )
              })}
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-slate-600">
        <LegendItem color="bg-white border-2 border-green-400" label="Available" />
        <LegendItem color="bg-accent-500" label="Selected" />
        <LegendItem color="bg-slate-300" label="Booked" />
      </div>

      {selected.length > 0 && (
        <p className="mt-3 text-sm text-slate-700">
          Selected: <span className="font-semibold text-brand-700">{selected.sort().join(', ')}</span>
        </p>
      )}
    </div>
  )
}

function SeatButton({ id, status, onClick }: { id: string; status: Seat['status']; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={status === 'booked'}
      title={status === 'booked' ? `Seat ${id} — Booked` : `Seat ${id}`}
      className={clsx(
        'h-9 rounded-lg text-[10px] font-bold border-2 transition-all',
        status === 'available' && 'bg-white border-green-400 text-green-700 hover:bg-green-50 hover:scale-105 cursor-pointer',
        status === 'selected' && 'bg-accent-500 border-accent-600 text-white shadow-sm cursor-pointer',
        status === 'booked' && 'bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed'
      )}
    >
      {id}
    </button>
  )
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className={`w-5 h-5 rounded ${color}`} />
      <span>{label}</span>
    </div>
  )
}
