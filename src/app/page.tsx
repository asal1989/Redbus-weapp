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
      <section className="relative overflow-hidden" style={{ minHeight: '320px' }}>
        {/* Full-width background bus photo */}
        <Image
          src="/bus.jpg"
          alt="Aruljothi Travels luxury coach bus"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Dark gradient overlay so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-950/90 via-brand-950/70 to-brand-950/20" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-16">
          {/* Text row */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-semibold px-3 py-1.5 rounded-full mb-4 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              TRUSTED BY 10,000+ TRAVELLERS
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-3">
              Book Bus Tickets<br />
              <span className="text-accent-400">Across Tamil Nadu</span>
            </h1>
            <p className="text-white/75 text-sm sm:text-base max-w-sm mb-5">
              Compare operators, choose your seat, and travel comfortably — all in minutes.
            </p>
            {/* Mini trust pills */}
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs sm:text-sm text-white/70">
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
          </div>
        </div>

        {/* Search card pinned to bottom of hero */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-0 -mb-10">
          <HeroSearch />
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
