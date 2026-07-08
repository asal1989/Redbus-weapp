'use client'

import clsx from 'clsx'
import { formatPrice } from '@/lib/utils'

type SeatStatus = 'available' | 'booked' | 'selected'
type BusType = 'Seater' | 'Semi-Sleeper' | 'Sleeper'

interface Props {
  totalSeats: number
  busType: BusType
  price: number
  bookedSeats: string[]
  selected: string[]
  onToggle: (seatId: string) => void
  maxSelectable?: number
}

// ─── Seater / Semi-Sleeper: horizontal 2+2 grid ──────────────────────────────

function SeaterGrid({ totalSeats, price, bookedSeats, selected, onToggle, maxSelectable, tall }: {
  totalSeats: number; price: number; bookedSeats: string[]; selected: string[]
  onToggle: (id: string) => void; maxSelectable: number; tall?: boolean
}) {
  const rows = Math.ceil(totalSeats / 4)

  function status(id: string): SeatStatus {
    if (selected.includes(id)) return 'selected'
    if (bookedSeats.includes(id)) return 'booked'
    return 'available'
  }

  function toggle(id: string, s: SeatStatus) {
    if (s === 'booked') return
    if (s === 'available' && selected.length >= maxSelectable) return
    onToggle(id)
  }

  return (
    <div>
      <div className="flex justify-start mb-3 px-2">
        <div className="w-9 h-9 rounded-lg bg-slate-200 flex items-center justify-center text-lg">🚌</div>
      </div>
      <div className="border border-slate-200 rounded-xl bg-slate-50 p-3">
        <div className="grid grid-cols-[auto_1fr_1fr_12px_1fr_1fr] gap-1.5 mb-2 px-1">
          <div className="w-7" />
          {['A','B'].map(c => <ColLabel key={c} label={c} />)}
          <div />
          {['C','D'].map(c => <ColLabel key={c} label={c} />)}
        </div>
        {Array.from({ length: rows }, (_, i) => {
          const r = i + 1
          return (
            <div key={r} className="grid grid-cols-[auto_1fr_1fr_12px_1fr_1fr] gap-1.5 mb-1.5">
              <RowLabel label={String(r)} />
              {(['A','B'] as const).map(col => {
                const id = `${r}${col}`; const s = status(id)
                return <FlatSeatBtn key={id} id={id} status={s} price={price} tall={tall} onClick={() => toggle(id, s)} />
              })}
              <div />
              {(['C','D'] as const).map(col => {
                const id = `${r}${col}`; const s = status(id)
                return <FlatSeatBtn key={id} id={id} status={s} price={price} tall={tall} onClick={() => toggle(id, s)} />
              })}
            </div>
          )
        })}
      </div>
      <Legend />
      <SelectedDisplay selected={selected} />
    </div>
  )
}

// ─── Sleeper: vertical berth cards, upper + lower deck ───────────────────────

function SleeperGrid({ totalSeats, price, bookedSeats, selected, onToggle, maxSelectable }: {
  totalSeats: number; price: number; bookedSeats: string[]; selected: string[]
  onToggle: (id: string) => void; maxSelectable: number
}) {
  const rows = Math.ceil(totalSeats / 6)

  function status(id: string): SeatStatus {
    if (selected.includes(id)) return 'selected'
    if (bookedSeats.includes(id)) return 'booked'
    return 'available'
  }

  function toggle(id: string, s: SeatStatus) {
    if (s === 'booked') return
    if (s === 'available' && selected.length >= maxSelectable) return
    onToggle(id)
  }

  function Deck({ deck, label }: { deck: 'L' | 'U'; label: string }) {
    return (
      <div className="flex-1 min-w-[160px]">
        {/* Deck header with steering wheel icon */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-full border-2 border-slate-300 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full border border-slate-400" />
          </div>
          <span className="text-sm font-semibold text-slate-600">{label} deck</span>
        </div>
        <div className="border border-slate-200 rounded-xl bg-slate-50 p-3 space-y-2">
          {Array.from({ length: rows }, (_, i) => {
            const r = i + 1
            const idA = `${deck}${r}A`, idB = `${deck}${r}B`, idC = `${deck}${r}C`
            return (
              <div key={r} className="flex items-center gap-2">
                {/* Left pair (A+B stacked) */}
                <div className="flex flex-col gap-1.5 flex-1">
                  {[idA, idB].map(id => (
                    <BerthBtn key={id} id={id} status={status(id)} price={price} onClick={() => toggle(id, status(id))} />
                  ))}
                </div>
                {/* Aisle */}
                <div className="w-px bg-slate-200 self-stretch" />
                {/* Right single (C) */}
                <div className="flex-1">
                  <BerthBtn id={idC} status={status(idC)} price={price} onClick={() => toggle(idC, status(idC))} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex gap-4 overflow-x-auto pb-2">
        <Deck deck="L" label="Lower" />
        <Deck deck="U" label="Upper" />
      </div>
      <Legend sleeper />
      <SelectedDisplay selected={selected} />
    </div>
  )
}

// ─── Seat button components ───────────────────────────────────────────────────

function FlatSeatBtn({ id, status, price, tall, onClick }: {
  id: string; status: SeatStatus; price: number; tall?: boolean; onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      disabled={status === 'booked'}
      title={status === 'booked' ? `Seat ${id} — Booked` : `Seat ${id} — ${formatPrice(price)}`}
      className={clsx(
        'rounded-lg border-2 transition-all flex flex-col items-center justify-center gap-0.5 px-1',
        tall ? 'h-14' : 'h-10',
        status === 'available' && 'bg-white border-green-400 text-green-700 hover:bg-green-50 hover:scale-105 cursor-pointer',
        status === 'selected'  && 'bg-accent-500 border-accent-600 text-white shadow-sm cursor-pointer',
        status === 'booked'    && 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed',
      )}
    >
      <span className="text-[9px] font-bold leading-none">{id}</span>
      {status !== 'booked' && (
        <span className={clsx('text-[8px] leading-none', status === 'selected' ? 'text-white/80' : 'text-slate-400')}>
          {formatPrice(price)}
        </span>
      )}
      {status === 'booked' && <span className="text-[8px] leading-none text-slate-400">Sold</span>}
    </button>
  )
}

function BerthBtn({ id, status, price, onClick }: {
  id: string; status: SeatStatus; price: number; onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      disabled={status === 'booked'}
      title={status === 'booked' ? `Berth ${id} — Sold` : `Berth ${id} — ${formatPrice(price)}`}
      className={clsx(
        'w-full h-14 rounded-lg border-2 transition-all flex flex-col items-center justify-center gap-1 px-2 relative overflow-hidden',
        status === 'available' && 'bg-white border-slate-300 hover:border-blue-400 hover:bg-blue-50 cursor-pointer',
        status === 'selected'  && 'bg-accent-500 border-accent-600 text-white shadow-sm cursor-pointer',
        status === 'booked'    && 'bg-slate-100 border-slate-200 cursor-not-allowed',
      )}
    >
      {/* Person icon */}
      {status !== 'booked' && (
        <svg className={clsx('w-4 h-4', status === 'selected' ? 'text-white' : 'text-blue-400')}
          viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
        </svg>
      )}
      <span className={clsx('text-[9px] font-bold leading-none', status === 'booked' ? 'text-slate-400' : status === 'selected' ? 'text-white' : 'text-slate-700')}>{id}</span>
      {status === 'available' && (
        <span className="text-[8px] text-slate-400 leading-none">{formatPrice(price)}</span>
      )}
      {status === 'booked' && (
        <span className="text-[8px] text-slate-400 leading-none">Sold</span>
      )}
      {/* Horizontal lines to suggest a berth/bed */}
      {status !== 'booked' && (
        <div className="absolute bottom-1.5 left-2 right-2 h-px bg-current opacity-10" />
      )}
    </button>
  )
}

// ─── Shared helpers ───────────────────────────────────────────────────────────

function ColLabel({ label }: { label: string }) {
  return <div className="text-center text-[10px] text-slate-400 font-medium">{label}</div>
}

function RowLabel({ label }: { label: string }) {
  return <div className="w-7 flex items-center justify-center text-[10px] text-slate-400 font-medium">{label}</div>
}

function Legend({ sleeper }: { sleeper?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-slate-600">
      <LegendItem color={sleeper ? 'bg-white border-2 border-slate-300' : 'bg-white border-2 border-green-400'} label="Available" />
      <LegendItem color="bg-accent-500" label="Selected" />
      <LegendItem color="bg-slate-200" label="Sold" />
    </div>
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

function SelectedDisplay({ selected }: { selected: string[] }) {
  if (!selected.length) return null
  return (
    <p className="mt-3 text-sm text-slate-700">
      Selected: <span className="font-semibold text-brand-700">{[...selected].sort().join(', ')}</span>
    </p>
  )
}

// ─── Main export ─────────────────────────────────────────────────────────────

export default function SeatGrid({ totalSeats, busType, price, bookedSeats, selected, onToggle, maxSelectable = 6 }: Props) {
  if (busType === 'Sleeper') {
    return <SleeperGrid totalSeats={totalSeats} price={price} bookedSeats={bookedSeats} selected={selected} onToggle={onToggle} maxSelectable={maxSelectable} />
  }
  return <SeaterGrid totalSeats={totalSeats} price={price} bookedSeats={bookedSeats} selected={selected} onToggle={onToggle} maxSelectable={maxSelectable} tall={busType === 'Semi-Sleeper'} />
}
