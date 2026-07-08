import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const ROUTES = [
  { from: 'Chennai',    to: 'Bengaluru', price: 599, img: '/cities/bengaluru.jpg'  },
  { from: 'Coimbatore', to: 'Chennai',   price: 499, img: '/cities/chennai.jpg'    },
  { from: 'Madurai',    to: 'Trichy',    price: 440, img: '/cities/trichy.jpg'     },
  { from: 'Hyderabad',  to: 'Bengaluru', price: 699, img: '/cities/hyderabad.jpg'  },
  { from: 'Pune',       to: 'Mumbai',    price: 399, img: '/cities/mumbai.jpg'     },
  { from: 'Chennai',    to: 'Salem',     price: 420, img: '/cities/salem.jpg'      },
]

export default function PopularRoutes() {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cities banner */}
        <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-8">
          <Image
            src="/cities.jpg"
            alt="Cities we connect"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent flex items-center px-8">
            <div>
              <h2 className="text-2xl font-extrabold text-white">Popular Routes</h2>
              <p className="text-white/80 text-sm mt-1">Book your next journey at the best prices</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900 sr-only">Popular Routes</h2>
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
              {/* City photo */}
              <div className="h-24 w-full relative overflow-hidden">
                <Image
                  src={r.img}
                  alt={r.to}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-1.5 left-2">
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">{r.to}</span>
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
