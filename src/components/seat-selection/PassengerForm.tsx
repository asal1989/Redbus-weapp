'use client'

import { Passenger } from '@/lib/types'
import clsx from 'clsx'

interface Props {
  seats: string[]
  passengers: Passenger[]
  contactName: string
  contactEmail: string
  contactPhone: string
  onPassengerChange: (idx: number, field: keyof Omit<Passenger, 'seatId'>, value: string) => void
  onContactChange: (field: 'contactName' | 'contactEmail' | 'contactPhone', value: string) => void
  errors: Record<string, string>
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-500 mb-1">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
}

const inputClass = 'w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-brand-500 transition-colors'
const errorInputClass = 'border-red-300 focus:border-red-400'

export default function PassengerForm({
  seats,
  passengers,
  contactName,
  contactEmail,
  contactPhone,
  onPassengerChange,
  onContactChange,
  errors,
}: Props) {
  return (
    <div className="space-y-6">
      {/* Per-seat passenger details */}
      {seats.map((seatId, idx) => {
        const p = passengers[idx]
        if (!p) return null
        return (
          <div key={seatId} className="bg-white border border-slate-200 rounded-xl p-5">
            <h4 className="font-semibold text-slate-900 text-sm mb-4 flex items-center gap-2">
              <span className="bg-brand-700 text-white text-xs px-2 py-0.5 rounded font-bold">
                Seat {seatId}
              </span>
              Passenger {idx + 1}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-3">
                <Field label="Full Name *" error={errors[`passenger_${idx}_name`]}>
                  <input
                    type="text"
                    value={p.name}
                    onChange={e => onPassengerChange(idx, 'name', e.target.value)}
                    placeholder="Enter full name"
                    className={clsx(inputClass, errors[`passenger_${idx}_name`] && errorInputClass)}
                  />
                </Field>
              </div>
              <Field label="Age *" error={errors[`passenger_${idx}_age`]}>
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={p.age}
                  onChange={e => onPassengerChange(idx, 'age', e.target.value)}
                  placeholder="Age"
                  className={clsx(inputClass, errors[`passenger_${idx}_age`] && errorInputClass)}
                />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Gender *">
                  <div className="flex gap-3">
                    {([['M', 'Male'], ['F', 'Female'], ['O', 'Other']] as const).map(([val, lbl]) => (
                      <label key={val} className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name={`gender_${idx}`}
                          value={val}
                          checked={p.gender === val}
                          onChange={() => onPassengerChange(idx, 'gender', val)}
                          className="accent-brand-700"
                        />
                        <span className="text-sm text-slate-700">{lbl}</span>
                      </label>
                    ))}
                  </div>
                </Field>
              </div>
            </div>
          </div>
        )
      })}

      {/* Primary contact */}
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <h4 className="font-semibold text-slate-900 text-sm mb-4 flex items-center gap-2">
          <span className="bg-accent-500 text-white text-xs px-2 py-0.5 rounded font-bold">
            Contact
          </span>
          Primary Contact Details
        </h4>
        <div className="space-y-3">
          <Field label="Contact Name *" error={errors.contactName}>
            <input
              type="text"
              value={contactName}
              onChange={e => onContactChange('contactName', e.target.value)}
              placeholder="Your full name"
              className={clsx(inputClass, errors.contactName && errorInputClass)}
            />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Email *" error={errors.contactEmail}>
              <input
                type="email"
                value={contactEmail}
                onChange={e => onContactChange('contactEmail', e.target.value)}
                placeholder="you@example.com"
                className={clsx(inputClass, errors.contactEmail && errorInputClass)}
              />
            </Field>
            <Field label="Phone *" error={errors.contactPhone}>
              <input
                type="tel"
                value={contactPhone}
                onChange={e => onContactChange('contactPhone', e.target.value)}
                placeholder="+91 98765 43210"
                className={clsx(inputClass, errors.contactPhone && errorInputClass)}
              />
            </Field>
          </div>
        </div>
        <p className="mt-3 text-xs text-slate-400">
          Booking confirmation will be sent to this email. Phone is used for support and SMS updates.
        </p>
      </div>
    </div>
  )
}
