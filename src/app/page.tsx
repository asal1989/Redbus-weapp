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
      <section className="relative bg-brand-950 overflow-hidden lg:min-h-[420px]">
        {/* Bus image positioned absolutely on the right */}
        <div className="absolute top-0 right-0 w-[55%] h-full hidden lg:block">
          <Image
            src="/bus.jpg"
            alt="Aruljothi Travels luxury coach bus"
            fill
            className="object-contain object-right-top"
            priority
          />
          {/* Fade into dark bg on left edge */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-brand-950 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
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

          {/* Mobile: show bus below text */}
          <div className="mt-6 lg:hidden">
            <Image
              src="/bus.jpg"
              alt="Aruljothi Travels luxury coach bus"
              width={900}
              height={600}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>

        {/* Search card */}
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
