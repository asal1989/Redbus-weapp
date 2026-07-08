import Link from 'next/link'
import { ArrowLeftRight, ArrowRight } from 'lucide-react'

const ROUTES = [
  { from: 'Chennai',    to: 'Madurai',         price: 550 },
  { from: 'Chennai',    to: 'Coimbatore',       price: 480 },
  { from: 'Madurai',    to: 'Tiruchirappalli',  price: 280 },
  { from: 'Chennai',    to: 'Salem',            price: 420 },
  { from: 'Coimbatore', to: 'Madurai',          price: 350 },
  { from: 'Chennai',    to: 'Tiruchirappalli',  price: 500 },
]

export default function PopularRoutes() {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">Popular Routes</h2>
          <Link href="/" className="flex items-center gap-1 text-sm font-semibold text-accent-500 hover:text-accent-600 transition-colors">
            View All Routes <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {ROUTES.map(r => (
            <Link
              key={`${r.from}-${r.to}`}
              href={`/search?from=${encodeURIComponent(r.from)}&to=${encodeURIComponent(r.to)}&date=${new Date(Date.now() + 86400000).toISOString().slice(0, 10)}`}
              className="group flex flex-col gap-1 p-4 rounded-2xl border border-slate-200 hover:border-accent-300 hover:shadow-md bg-white transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm text-slate-900">{r.from}</div>
                  <div className="font-bold text-sm text-slate-900">{r.to}</div>
                </div>
                <ArrowLeftRight className="w-4 h-4 text-slate-300 group-hover:text-accent-400 transition-colors shrink-0" />
              </div>
              <div className="mt-2">
                <span className="text-xs text-slate-400">From</span>
                <div className="font-extrabold text-accent-500 text-base">₹{r.price}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
