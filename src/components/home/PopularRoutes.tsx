import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const ROUTES = [
  {
    from: 'Chennai', to: 'Bengaluru', price: 599,
    color: '#1d4ed8', color2: '#3b82f6',
    icon: (
      <svg viewBox="0 0 64 48" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {/* Marina lighthouse */}
        <rect x="28" y="8" width="8" height="28" rx="2" fill="white" opacity="0.9"/>
        <polygon points="24,8 32,0 40,8" fill="white" opacity="0.9"/>
        <rect x="26" y="34" width="12" height="4" rx="1" fill="white" opacity="0.7"/>
        {/* Waves */}
        <path d="M4,40 Q16,36 28,40 Q40,44 52,40 Q56,38 60,40 L60,48 L4,48Z" fill="white" opacity="0.2"/>
        <path d="M4,44 Q16,40 28,44 Q40,48 52,44 Q56,42 60,44 L60,48 L4,48Z" fill="white" opacity="0.15"/>
      </svg>
    ),
  },
  {
    from: 'Coimbatore', to: 'Chennai', price: 499,
    color: '#0f766e', color2: '#14b8a6',
    icon: (
      <svg viewBox="0 0 64 48" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {/* Marudamalai hills silhouette */}
        <polygon points="0,40 12,18 24,32 36,10 48,28 64,20 64,48 0,48" fill="white" opacity="0.25"/>
        <polygon points="0,44 8,28 20,38 32,16 46,34 58,24 64,30 64,48 0,48" fill="white" opacity="0.2"/>
        {/* Temple gopuram */}
        <rect x="26" y="22" width="12" height="18" rx="1" fill="white" opacity="0.85"/>
        <polygon points="22,22 32,8 42,22" fill="white" opacity="0.85"/>
        <rect x="28" y="36" width="8" height="4" fill="white" opacity="0.6"/>
      </svg>
    ),
  },
  {
    from: 'Madurai', to: 'Trichy', price: 440,
    color: '#b45309', color2: '#f59e0b',
    icon: (
      <svg viewBox="0 0 64 48" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {/* Meenakshi temple gopuram */}
        <rect x="22" y="16" width="20" height="24" rx="1" fill="white" opacity="0.85"/>
        <polygon points="18,16 32,2 46,16" fill="white" opacity="0.85"/>
        <rect x="24" y="38" width="16" height="4" fill="white" opacity="0.6"/>
        {/* Tiers */}
        <rect x="20" y="22" width="24" height="2" rx="1" fill="white" opacity="0.4"/>
        <rect x="20" y="28" width="24" height="2" rx="1" fill="white" opacity="0.4"/>
        <rect x="20" y="34" width="24" height="2" rx="1" fill="white" opacity="0.4"/>
      </svg>
    ),
  },
  {
    from: 'Hyderabad', to: 'Bengaluru', price: 699,
    color: '#7c3aed', color2: '#a855f7',
    icon: (
      <svg viewBox="0 0 64 48" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {/* Charminar */}
        <rect x="26" y="20" width="12" height="22" rx="1" fill="white" opacity="0.85"/>
        {/* 4 minarets */}
        <rect x="20" y="12" width="6" height="22" rx="3" fill="white" opacity="0.75"/>
        <rect x="38" y="12" width="6" height="22" rx="3" fill="white" opacity="0.75"/>
        <polygon points="20,12 23,4 26,12" fill="white" opacity="0.75"/>
        <polygon points="38,12 41,4 44,12" fill="white" opacity="0.75"/>
        {/* Arch */}
        <path d="M26,30 Q32,24 38,30" fill="none" stroke="white" strokeWidth="1.5" opacity="0.6"/>
        <rect x="22" y="40" width="20" height="2" rx="1" fill="white" opacity="0.4"/>
      </svg>
    ),
  },
  {
    from: 'Pune', to: 'Mumbai', price: 399,
    color: '#0369a1', color2: '#38bdf8',
    icon: (
      <svg viewBox="0 0 64 48" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {/* Gateway of India */}
        <rect x="22" y="20" width="20" height="22" rx="1" fill="white" opacity="0.85"/>
        {/* Arch */}
        <path d="M22,28 Q32,16 42,28" fill="white" opacity="0.85"/>
        {/* Pillars */}
        <rect x="20" y="20" width="4" height="22" rx="1" fill="white" opacity="0.75"/>
        <rect x="40" y="20" width="4" height="22" rx="1" fill="white" opacity="0.75"/>
        {/* Water */}
        <path d="M8,44 Q24,40 40,44 Q52,47 56,44 L56,48 L8,48Z" fill="white" opacity="0.2"/>
      </svg>
    ),
  },
  {
    from: 'Chennai', to: 'Salem', price: 420,
    color: '#15803d', color2: '#4ade80',
    icon: (
      <svg viewBox="0 0 64 48" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {/* Hills with temple */}
        <polygon points="0,42 14,20 28,36 42,14 56,30 64,24 64,48 0,48" fill="white" opacity="0.2"/>
        <rect x="28" y="24" width="8" height="16" rx="1" fill="white" opacity="0.85"/>
        <polygon points="24,24 32,12 40,24" fill="white" opacity="0.85"/>
        {/* Trees */}
        <circle cx="14" cy="36" r="5" fill="white" opacity="0.3"/>
        <circle cx="52" cy="34" r="5" fill="white" opacity="0.3"/>
      </svg>
    ),
  },
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
              className="group flex flex-col rounded-2xl border border-slate-200 hover:border-accent-300 hover:shadow-md bg-white transition-all overflow-hidden"
            >
              {/* City thumbnail */}
              <div
                className="h-24 w-full relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${r.color}, ${r.color2})` }}
              >
                <div className="absolute inset-0 p-2">
                  {r.icon}
                </div>
                {/* Subtle overlay text */}
                <div className="absolute bottom-1.5 left-2 right-2">
                  <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider">{r.from}</span>
                </div>
              </div>

              {/* Route info */}
              <div className="p-3">
                <div className="font-bold text-xs text-slate-500 uppercase tracking-wide">{r.from}</div>
                <div className="font-bold text-sm text-slate-900">{r.to}</div>
                <div className="mt-1.5">
                  <span className="text-[10px] text-slate-400">From</span>
                  <div className="font-extrabold text-accent-500 text-base leading-none">₹{r.price}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
