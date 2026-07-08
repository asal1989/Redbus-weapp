import HeroSearch from '@/components/home/HeroSearch'
import TrustSignals from '@/components/home/TrustSignals'
import HowItWorks from '@/components/home/HowItWorks'
import FAQ from '@/components/home/FAQ'

export default function HomePage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 overflow-hidden">
        {/* Subtle dot-grid texture */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="w-full h-10 sm:h-14 fill-slate-50">
            <path d="M0,40 C300,80 900,0 1200,40 L1200,80 L0,80 Z" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-24 sm:pt-20 sm:pb-32">
          {/* Headline */}
          <div className="text-center mb-10">
            <span className="inline-block bg-accent-500/20 text-accent-300 text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
              Trusted by 10,000+ travellers
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              Book Bus Tickets
              <br />
              <span className="text-accent-400">Across India</span>
            </h1>
            <p className="mt-4 text-brand-200 text-sm sm:text-lg max-w-xl mx-auto">
              Compare operators, choose your seat, and travel comfortably — all in minutes.
            </p>
          </div>

          {/* Search widget */}
          <HeroSearch />
        </div>
      </section>

      {/* ── Trust signals ─────────────────────────────────── */}
      <TrustSignals />

      {/* ── How it works ──────────────────────────────────── */}
      <HowItWorks />

      {/* ── FAQ ───────────────────────────────────────────── */}
      <FAQ />
    </>
  )
}
