import Image from 'next/image'
import HeroSearch from '@/components/home/HeroSearch'
import TrustSignals from '@/components/home/TrustSignals'
import PopularRoutes from '@/components/home/PopularRoutes'
import HowItWorks from '@/components/home/HowItWorks'
import FAQ from '@/components/home/FAQ'

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-brand-950 overflow-hidden">
        {/* Subtle grid texture */}
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.4) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center pt-10 pb-8 gap-8">

            {/* Left — copy + search */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-semibold px-3 py-1.5 rounded-full mb-5 border border-white/10">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                TRUSTED BY 10,000+ TRAVELLERS
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
                Book Bus Tickets<br />
                <span className="text-accent-400">Across Tamil Nadu</span>
              </h1>
              <p className="text-brand-300 text-base sm:text-lg max-w-md mx-auto lg:mx-0 mb-6">
                Compare operators, choose your seat, and travel comfortably — all in minutes.
              </p>
              {/* Mini trust pills */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start text-sm text-white/70 mb-8">
                {[
                  { icon: '🏷️', label: 'Best Prices Guaranteed' },
                  { icon: '📍', label: 'Live Bus Tracking' },
                  { icon: '🔒', label: 'Secure Payments' },
                  { icon: '🎧', label: '24/7 Customer Support' },
                ].map(({ icon, label }) => (
                  <span key={label} className="flex items-center gap-1.5">
                    <span>{icon}</span>{label}
                  </span>
                ))}
              </div>

              {/* Search form inline in hero */}
              <div className="w-full">
                <HeroSearch />
              </div>
            </div>

            {/* Right — Aruljothi Travels bus photo */}
            <div className="flex-1 flex justify-center lg:justify-end">
              <div className="w-full max-w-lg relative">
                <Image
                  src="/bus.jpg"
                  alt="Aruljothi Travels luxury coach bus"
                  width={900}
                  height={600}
                  className="w-full h-auto object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust signals ────────────────────────────────────────────────── */}
      <TrustSignals />

      {/* ── Popular routes ───────────────────────────────────────────────── */}
      <PopularRoutes />

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <HowItWorks />

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <FAQ />
    </>
  )
}
