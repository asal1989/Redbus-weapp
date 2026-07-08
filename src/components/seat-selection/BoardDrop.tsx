'use client'

import clsx from 'clsx'
import { StopPoint } from '@/lib/types'
import { MapPin } from 'lucide-react'

interface Props {
  boardingPoints: StopPoint[]
  droppingPoints: StopPoint[]
  selectedBoarding: StopPoint | null
  selectedDropping: StopPoint | null
  onSelectBoarding: (p: StopPoint) => void
  onSelectDropping: (p: StopPoint) => void
}

export default function BoardDrop({
  boardingPoints, droppingPoints,
  selectedBoarding, selectedDropping,
  onSelectBoarding, onSelectDropping,
}: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <StopList
        title="Boarding Points"
        subtitle="Select Boarding Point"
        points={boardingPoints}
        selected={selectedBoarding}
        onSelect={onSelectBoarding}
        color="blue"
      />
      <StopList
        title="Dropping Points"
        subtitle="Select Dropping Point"
        points={droppingPoints}
        selected={selectedDropping}
        onSelect={onSelectDropping}
        color="orange"
      />
    </div>
  )
}

function StopList({ title, subtitle, points, selected, onSelect, color }: {
  title: string
  subtitle: string
  points: StopPoint[]
  selected: StopPoint | null
  onSelect: (p: StopPoint) => void
  color: 'blue' | 'orange'
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-100">
        <h3 className="font-bold text-slate-900 text-sm">{title}</h3>
        <p className="text-xs text-slate-400">{subtitle}</p>
      </div>
      <div className="divide-y divide-slate-50">
        {points.map((p, i) => {
          const isSelected = selected?.name === p.name
          return (
            <button
              key={i}
              onClick={() => onSelect(p)}
              className={clsx(
                'w-full text-left px-4 py-3 flex items-start gap-3 transition-colors',
                isSelected
                  ? color === 'blue' ? 'bg-blue-50' : 'bg-orange-50'
                  : 'hover:bg-slate-50'
              )}
            >
              <MapPin className={clsx(
                'w-4 h-4 mt-0.5 shrink-0',
                isSelected
                  ? color === 'blue' ? 'text-blue-500' : 'text-orange-500'
                  : 'text-slate-300'
              )} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={clsx(
                    'text-xs font-bold tabular-nums',
                    isSelected
                      ? color === 'blue' ? 'text-blue-600' : 'text-orange-600'
                      : 'text-slate-400'
                  )}>
                    {p.time}
                  </span>
                  <span className={clsx(
                    'font-semibold text-sm',
                    isSelected ? 'text-slate-900' : 'text-slate-700'
                  )}>
                    {p.name}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5 truncate">{p.address}</p>
              </div>
              <div className={clsx(
                'w-4 h-4 rounded-full border-2 shrink-0 mt-0.5 flex items-center justify-center',
                isSelected
                  ? color === 'blue' ? 'border-blue-500' : 'border-orange-500'
                  : 'border-slate-300'
              )}>
                {isSelected && (
                  <div className={clsx('w-2 h-2 rounded-full', color === 'blue' ? 'bg-blue-500' : 'bg-orange-500')} />
                )}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
