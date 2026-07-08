'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Plus, Pencil, Trash2, ToggleLeft, ToggleRight, X, Save, MapPin } from 'lucide-react'
import { ManagedTrip } from '@/lib/trips'
import { BUS_TYPES } from '@/lib/constants'
import { INDIAN_CITIES } from '@/lib/constants'

const EMPTY_TRIP: Partial<ManagedTrip> = {
  operator: 'Aruljothi Travels',
  busType: 'Sleeper',
  acType: 'A/C',
  seatsAvailable: 40,
  price: 500,
  active: true,
  amenities: ['Charging Point', 'Blanket', 'Water Bottle'],
}

export default function AdminTripsPage() {
  const router = useRouter()
  const [trips, setTrips] = useState<ManagedTrip[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Partial<ManagedTrip> | null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function loadTrips() {
    const res = await fetch('/api/admin/trips')
    if (res.status === 401) { router.replace('/admin/login'); return }
    setTrips(await res.json())
    setLoading(false)
  }

  useEffect(() => { loadTrips() }, [])

  async function handleSave() {
    if (!editing) return
    setSaving(true)
    setError('')
    try {
      const method = editing.id ? 'PUT' : 'POST'
      const res = await fetch('/api/admin/trips', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing),
      })
      if (!res.ok) { setError('Save failed'); return }
      await loadTrips()
      setEditing(null)
    } catch { setError('Network error') }
    finally { setSaving(false) }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this trip?')) return
    await fetch('/api/admin/trips', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    loadTrips()
  }

  async function toggleActive(trip: ManagedTrip) {
    await fetch('/api/admin/trips', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...trip, active: !trip.active }),
    })
    loadTrips()
  }

  function f(key: keyof ManagedTrip, val: any) {
    setEditing(prev => prev ? { ...prev, [key]: val } : prev)
  }

  if (loading) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Loading…</div>
  )

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="bg-brand-900 text-white px-6 py-4 flex items-center gap-3">
        <Link href="/admin" className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-lg font-bold">Trip Management</h1>
          <p className="text-brand-300 text-xs">{trips.length} trips configured</p>
        </div>
        <button
          onClick={() => setEditing({ ...EMPTY_TRIP })}
          className="ml-auto flex items-center gap-1.5 bg-accent-500 hover:bg-accent-600 px-3 py-1.5 rounded-lg text-sm font-bold transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Trip
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-left">
                  {['Route', 'Departure', 'Type', 'Seats', 'Price', 'Active', 'Tracking', 'Actions'].map(h => (
                    <th key={h} className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {trips.map(t => (
                  <tr key={t.id} className={`hover:bg-slate-50 transition-colors ${!t.active ? 'opacity-50' : ''}`}>
                    <td className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">{t.from} → {t.to}</td>
                    <td className="px-4 py-3 text-slate-500">{t.departure} → {t.arrival}</td>
                    <td className="px-4 py-3 text-slate-500">{t.acType} {t.busType}</td>
                    <td className="px-4 py-3 text-slate-700">{t.seatsAvailable}</td>
                    <td className="px-4 py-3 font-bold text-green-700">₹{t.price}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => toggleActive(t)} className="text-slate-500 hover:text-brand-700 transition-colors">
                        {t.active ? <ToggleRight className="w-6 h-6 text-green-600" /> : <ToggleLeft className="w-6 h-6" />}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      {t.trackingUrl ? (
                        <a href={t.trackingUrl} target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline flex items-center gap-1 text-xs">
                          <MapPin className="w-3 h-3" /> Live
                        </a>
                      ) : <span className="text-slate-300 text-xs">—</span>}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => setEditing(t)} className="p-1.5 rounded-lg hover:bg-brand-50 text-brand-700 transition-colors">
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => handleDelete(t.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {trips.length === 0 && (
                  <tr><td colSpan={8} className="px-4 py-8 text-center text-slate-400">No trips yet — click "Add Trip" to create one</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h2 className="font-bold text-slate-900">{editing.id ? 'Edit Trip' : 'Add New Trip'}</h2>
              <button onClick={() => setEditing(null)} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 grid grid-cols-2 gap-4">
              <Field label="From">
                <select value={editing.from || ''} onChange={e => f('from', e.target.value)} className="input-field">
                  <option value="">Select city</option>
                  {INDIAN_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="To">
                <select value={editing.to || ''} onChange={e => f('to', e.target.value)} className="input-field">
                  <option value="">Select city</option>
                  {INDIAN_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Departure Time">
                <input type="time" value={editing.departure || ''} onChange={e => f('departure', e.target.value)} className="input-field" />
              </Field>
              <Field label="Arrival Time">
                <input type="time" value={editing.arrival || ''} onChange={e => f('arrival', e.target.value)} className="input-field" />
              </Field>
              <Field label="Duration">
                <input type="text" value={editing.duration || ''} onChange={e => f('duration', e.target.value)} placeholder="e.g. 7h 30m" className="input-field" />
              </Field>
              <Field label="Bus Type">
                <select value={editing.busType || 'Sleeper'} onChange={e => f('busType', e.target.value)} className="input-field">
                  <option>Seater</option>
                  <option>Semi-Sleeper</option>
                  <option>Sleeper</option>
                </select>
              </Field>
              <Field label="AC Type">
                <select value={editing.acType || 'A/C'} onChange={e => f('acType', e.target.value)} className="input-field">
                  <option>A/C</option>
                  <option>Non A/C</option>
                </select>
              </Field>
              <Field label="Seats Available">
                <input type="number" value={editing.seatsAvailable || 40} onChange={e => f('seatsAvailable', +e.target.value)} className="input-field" />
              </Field>
              <Field label="Price per Seat (₹)">
                <input type="number" value={editing.price || 500} onChange={e => f('price', +e.target.value)} className="input-field" />
              </Field>
              <Field label="Rating (0–5)">
                <input type="number" min="0" max="5" step="0.1" value={editing.rating || 4.5} onChange={e => f('rating', +e.target.value)} className="input-field" />
              </Field>
              <Field label="Live Tracking URL (Google Maps)" className="col-span-2">
                <input type="url" value={editing.trackingUrl || ''} onChange={e => f('trackingUrl', e.target.value)} placeholder="https://maps.google.com/..." className="input-field" />
              </Field>
              <div className="col-span-2 flex items-center gap-2">
                <input type="checkbox" id="active" checked={editing.active ?? true} onChange={e => f('active', e.target.checked)} className="rounded" />
                <label htmlFor="active" className="text-sm font-medium text-slate-700">Trip is active (visible to customers)</label>
              </div>
            </div>
            {error && <p className="px-5 pb-2 text-red-600 text-sm font-medium">{error}</p>}
            <div className="flex justify-end gap-3 p-5 border-t border-slate-100">
              <button onClick={() => setEditing(null)} className="px-4 py-2 border border-slate-200 text-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors">
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2 bg-brand-700 hover:bg-brand-800 text-white rounded-xl text-sm font-bold transition-colors disabled:opacity-50">
                <Save className="w-4 h-4" /> {saving ? 'Saving…' : 'Save Trip'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .input-field { width: 100%; border: 2px solid #e2e8f0; border-radius: 10px; padding: 8px 12px; font-size: 14px; outline: none; transition: border-color 0.15s; }
        .input-field:focus { border-color: #3730a3; }
      `}</style>
    </div>
  )
}

function Field({ label, children, className = '' }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">{label}</label>
      {children}
    </div>
  )
}
