import Link from 'next/link'
import { Clock, Zap, Wind, Wifi, Battery, Droplets, Armchair, Users } from 'lucide-react'
import { BusTrip } from '@/lib/types'
import { formatTime, formatPrice } from '@/lib/utils'
import clsx from 'clsx'

const amenityIcons: Record<string, React.ReactNode> = {
  WiFi: <Wifi className="w-3 h-3" />,
  Water: <Droplets className="w-3 h-3" />,
  'Charging Point': <Battery className="w-3 h-3" />,
  Blanket: <Wind className="w-3 h-3" />,
  Movie: <Zap className="w-3 h-3" />,
}

interface Props {
  trip: BusTrip
  date: string
}

export default function BusCard({ trip, date }: Props) {
  const seatsLow = trip.seatsAvailable <= 5
  const soldOut = trip.seatsAvailable === 0

  return (
    <div className={clsx(
      'bg-white border rounded-2xl overflow-hidden hover:shadow-md transition-shadow',
      soldOut ? 'border-slate-200 opacity-70' : 'border-slate-200'
    )}>
      {/* Top bar: operator + type badges */}
      <div className="px-5 pt-4 pb-3 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="font-bold text-slate-900 text-base">{trip.operator}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className={clsx(
              'text-xs font-medium px-2 py-0.5 rounded-full',
              trip.acType === 'AC' ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-600'
            )}>
              {trip.acType}
            </span>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
              {trip.busType}
            </span>
          </div>
        </div>
        {seatsLow && !soldOut && (
          <span className="text-xs font-semibold text-red-600 bg-red-50 px-2.5 py-1 rounded-full animate-pulse">
            Only {trip.seatsAvailable} seats left!
          </span>
        )}
      </div>

      {/* Route timeline */}
      <div className="px-5 py-4">
        <div className="flex items-center gap-3">
          {/* Departure */}
          <div className="text-center shrink-0">
            <div className="text-xl font-bold text-slate-900">{formatTime(trip.departure)}</div>
            <div className="text-xs text-slate-500 font-medium mt-0.5">{trip.from}</div>
          </div>

          {/* Duration line */}
          <div className="flex-1 flex flex-col items-center gap-1 min-w-0">
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <Clock className="w-3 h-3 shrink-0" />
              {trip.duration}
            </div>
            <div className="w-full flex items-center gap-1">
              <div className="w-2 h-2 border-2 border-brand-500 rounded-full shrink-0" />
              <div className="flex-1 h-0.5 bg-gradient-to-r from-brand-400 to-brand-200" />
              <div className="w-2 h-2 bg-brand-500 rounded-full shrink-0" />
            </div>
          </div>

          {/* Arrival */}
          <div className="text-center shrink-0">
            <div className="text-xl font-bold text-slate-900">{formatTime(trip.arrival)}</div>
            <div className="text-xs text-slate-500 font-medium mt-0.5">{trip.to}</div>
          </div>
        </div>

        {/* Amenities */}
        {trip.amenities.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {trip.amenities.map(a => (
              <span key={a} className="flex items-center gap-1 text-xs text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md">
                {amenityIcons[a] || null}
                {a}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Bottom: price + action */}
      <div className="px-5 pb-4 flex items-center justify-between gap-4 border-t border-slate-100 pt-3">
        <div>
          <div className="text-2xl font-extrabold text-slate-900">{formatPrice(trip.price)}</div>
          <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
            <Users className="w-3 h-3" />
            <Armchair className="w-3 h-3" />
            <span>{soldOut ? 'Sold out' : `${trip.seatsAvailable} seats available`}</span>
          </div>
        </div>

        {soldOut ? (
          <button disabled className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-400 text-sm font-semibold cursor-not-allowed">
            Sold Out
          </button>
        ) : (
          <Link
            href={`/seat-selection?busId=${trip.id}&date=${date}`}
            className="px-5 py-2.5 rounded-xl bg-accent-500 hover:bg-accent-600 active:bg-accent-700 text-white text-sm font-bold transition-colors shadow-sm shadow-accent-200"
          >
            View Seats
          </Link>
        )}
      </div>
    </div>
  )
}
