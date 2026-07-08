'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { BarChart3, Bus, TrendingUp, Users, LogOut, CheckCircle, XCircle } from 'lucide-react'
import { BookingRecord } from '@/lib/bookings'

export default function AdminDashboard() {
  const router = useRouter()
  const [bookings, setBookings] = useState<BookingRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/bookings')
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then(data => { setBookings(data); setLoading(false) })
      .catch(e => { if (e === 401) router.replace('/admin/login'); setLoading(false) })
  }, [router])

  async function handleLogout() {
    await fetch('/api/admin/login', { method: 'DELETE' })
    router.replace('/admin/login')
  }

  const confirmed = bookings.filter(b => b.status === 'confirmed')
  const cancelled = bookings.filter(b => b.status === 'cancelled')
  const totalRevenue = confirmed.reduce((s, b) => s + b.totalPrice, 0)
  const totalSeats   = confirmed.reduce((s, b) => s + b.seats.length, 0)

  // Daily revenue (last 7 days)
  const today = new Date()
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today)
    d.setDate(d.getDate() - (6 - i))
    return d.toISOString().slice(0, 10)
  })
  const dailyRevenue = last7.map(day => ({
    day: day.slice(5),
    amount: confirmed.filter(b => b.bookedAt.startsWith(day)).reduce((s, b) => s + b.totalPrice, 0),
  }))

  // Route occupancy
  const routeMap: Record<string, { seats: number; revenue: number }> = {}
  confirmed.forEach(b => {
    const key = `${b.from} → ${b.to}`
    if (!routeMap[key]) routeMap[key] = { seats: 0, revenue: 0 }
    routeMap[key].seats   += b.seats.length
    routeMap[key].revenue += b.totalPrice
  })
  const routes = Object.entries(routeMap).sort((a, b) => b[1].revenue - a[1].revenue)

  if (loading) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Loading…</div>
  )

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <div className="bg-brand-900 text-white px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold">Aruljothi Travels — Admin</h1>
          <p className="text-brand-300 text-xs">Operator Dashboard</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/trips" className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors">
            <Bus className="w-4 h-4" /> Trips
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-1.5 bg-red-600/80 hover:bg-red-700 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString('en-IN')}`, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'Confirmed Bookings', value: confirmed.length, icon: CheckCircle, color: 'text-brand-700', bg: 'bg-brand-50' },
            { label: 'Seats Sold', value: totalSeats, icon: Users, color: 'text-accent-600', bg: 'bg-accent-50' },
            { label: 'Cancellations', value: cancelled.length, icon: XCircle, color: 'text-red-600', bg: 'bg-red-50' },
          ].map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className="bg-white rounded-2xl p-5 shadow-sm">
              <div className={`w-9 h-9 ${bg} rounded-lg flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <div className="text-2xl font-extrabold text-slate-900">{value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Daily revenue bar chart */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-brand-700" /> Daily Revenue (Last 7 Days)
            </h2>
            <div className="flex items-end gap-2 h-28">
              {(() => {
                const maxAmt = Math.max(...dailyRevenue.map(d => d.amount), 1)
                return dailyRevenue.map(({ day, amount }) => (
                  <div key={day} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-xs text-slate-500 font-mono">{amount > 0 ? `₹${amount}` : ''}</span>
                    <div
                      className="w-full bg-brand-600 rounded-t-md"
                      style={{ height: `${Math.max((amount / maxAmt) * 80, amount > 0 ? 4 : 0)}px` }}
                    />
                    <span className="text-xs text-slate-400">{day}</span>
                  </div>
                ))
              })()}
            </div>
          </div>

          {/* Route performance */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Bus className="w-4 h-4 text-brand-700" /> Route Performance
            </h2>
            {routes.length === 0 ? (
              <p className="text-slate-400 text-sm">No bookings yet</p>
            ) : (
              <div className="space-y-3">
                {routes.slice(0, 6).map(([route, { seats, revenue }]) => (
                  <div key={route} className="flex items-center justify-between text-sm">
                    <span className="text-slate-700 font-medium">{route}</span>
                    <div className="flex items-center gap-3 text-right">
                      <span className="text-slate-500">{seats} seats</span>
                      <span className="font-bold text-green-700">₹{revenue.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bookings table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-bold text-slate-900">All Bookings ({bookings.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-left">
                  {['Booking ID', 'Route', 'Date', 'Passenger', 'Seats', 'Amount', 'Status', 'Booked At'].map(h => (
                    <th key={h} className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {bookings.length === 0 ? (
                  <tr><td colSpan={8} className="px-4 py-8 text-center text-slate-400">No bookings yet</td></tr>
                ) : (
                  [...bookings].reverse().map(b => (
                    <tr key={b.bookingId} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-mono text-brand-700 font-bold">{b.bookingId}</td>
                      <td className="px-4 py-3 text-slate-700 whitespace-nowrap">{b.from} → {b.to}</td>
                      <td className="px-4 py-3 text-slate-500">{b.date}</td>
                      <td className="px-4 py-3 text-slate-700">{b.contactName}<div className="text-xs text-slate-400">{b.contactPhone}</div></td>
                      <td className="px-4 py-3 text-slate-700">{b.seats.join(', ')}</td>
                      <td className="px-4 py-3 font-bold text-green-700">₹{b.totalPrice.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${b.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-400 text-xs whitespace-nowrap">{new Date(b.bookedAt).toLocaleString('en-IN')}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
