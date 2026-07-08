import HeroSearch from '@/components/home/HeroSearch'
import TrustSignals from '@/components/home/TrustSignals'
import PopularRoutes from '@/components/home/PopularRoutes'
import OperatorStrip from '@/components/home/OperatorStrip'
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
          <div className="flex flex-col lg:flex-row items-center min-h-[420px] pt-12 pb-32 lg:pb-36 gap-8">

            {/* Left — copy */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-semibold px-3 py-1.5 rounded-full mb-5 border border-white/10">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                TRUSTED BY 10,000+ TRAVELLERS
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
                Book Bus Tickets<br />
                <span className="text-accent-400">Across India</span>
              </h1>
              <p className="text-brand-300 text-base sm:text-lg max-w-md mx-auto lg:mx-0 mb-8">
                Compare operators, choose your seat, and travel comfortably — all in minutes.
              </p>
              {/* Mini trust pills */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start text-sm text-white/70">
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

            {/* Right — bus illustration */}
            <div className="flex-1 flex justify-center lg:justify-end">
              <div className="w-full max-w-md lg:max-w-lg relative">
                {/* Mountain / sky background */}
                <svg viewBox="0 0 520 300" className="w-full drop-shadow-2xl" xmlns="http://www.w3.org/2000/svg">
                  {/* Sky gradient */}
                  <defs>
                    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1a3a6e"/>
                      <stop offset="100%" stopColor="#2d6aad"/>
                    </linearGradient>
                    <linearGradient id="road" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#374151"/>
                      <stop offset="100%" stopColor="#4b5563"/>
                    </linearGradient>
                    <linearGradient id="busBody" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f8fafc"/>
                      <stop offset="100%" stopColor="#e2e8f0"/>
                    </linearGradient>
                  </defs>

                  {/* Sky */}
                  <rect width="520" height="300" fill="url(#sky)" rx="16"/>

                  {/* Mountains */}
                  <polygon points="0,200 80,100 160,180 220,80 300,160 380,60 460,140 520,100 520,220 0,220" fill="#1e3a8a" opacity="0.6"/>
                  <polygon points="0,220 60,140 130,190 200,110 280,180 350,90 430,160 520,120 520,240 0,240" fill="#1e40af" opacity="0.5"/>
                  {/* Snow caps */}
                  <polygon points="80,100 65,130 95,130" fill="white" opacity="0.7"/>
                  <polygon points="220,80 205,112 235,112" fill="white" opacity="0.7"/>
                  <polygon points="380,60 362,95 398,95" fill="white" opacity="0.7"/>

                  {/* Road */}
                  <path d="M0,240 Q120,230 260,235 Q400,240 520,232 L520,270 Q400,265 260,268 Q120,272 0,265 Z" fill="url(#road)"/>
                  {/* Road markings */}
                  <path d="M60,252 L100,251" stroke="white" strokeWidth="2.5" strokeDasharray="20,15" opacity="0.5"/>
                  <path d="M160,252 L200,251" stroke="white" strokeWidth="2.5" strokeDasharray="20,15" opacity="0.5"/>
                  <path d="M280,252 L320,251" stroke="white" strokeWidth="2.5" strokeDasharray="20,15" opacity="0.5"/>
                  <path d="M380,252 L420,251" stroke="white" strokeWidth="2.5" strokeDasharray="20,15" opacity="0.5"/>
                  {/* Grass */}
                  <rect x="0" y="268" width="520" height="32" fill="#166534" rx="0"/>
                  <rect x="0" y="272" width="520" height="28" fill="#15803d" rx="0"/>

                  {/* === BUS BODY === */}
                  {/* Main body */}
                  <rect x="60" y="155" width="360" height="95" rx="12" fill="url(#busBody)" stroke="#cbd5e1" strokeWidth="1.5"/>
                  {/* Blue stripe */}
                  <rect x="60" y="196" width="360" height="18" fill="#1e3a8a" opacity="0.85"/>
                  {/* Orange stripe */}
                  <rect x="60" y="212" width="360" height="7" fill="#f97316"/>

                  {/* Windows row */}
                  {[90, 140, 188, 236, 284, 332].map((x, i) => (
                    <rect key={i} x={x} y="162" width="40" height="28" rx="4" fill="#bfdbfe" stroke="#93c5fd" strokeWidth="1"/>
                  ))}

                  {/* Driver cab */}
                  <rect x="370" y="158" width="50" height="32" rx="6" fill="#93c5fd" stroke="#3b82f6" strokeWidth="1.5"/>
                  {/* Windshield reflection */}
                  <path d="M375,162 L385,162 L383,168 L373,168 Z" fill="white" opacity="0.4"/>

                  {/* Headlights */}
                  <ellipse cx="420" cy="190" rx="10" ry="7" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5"/>
                  <ellipse cx="420" cy="190" rx="6" ry="4" fill="#fbbf24"/>

                  {/* Front bumper */}
                  <rect x="415" y="232" width="20" height="8" rx="3" fill="#94a3b8"/>

                  {/* Rear panel */}
                  <rect x="55" y="225" width="18" height="18" rx="3" fill="#ef4444"/>

                  {/* Wheels */}
                  <circle cx="130" cy="252" r="22" fill="#1e293b" stroke="#0f172a" strokeWidth="2"/>
                  <circle cx="130" cy="252" r="13" fill="#334155"/>
                  <circle cx="130" cy="252" r="5" fill="#94a3b8"/>

                  <circle cx="360" cy="252" r="22" fill="#1e293b" stroke="#0f172a" strokeWidth="2"/>
                  <circle cx="360" cy="252" r="13" fill="#334155"/>
                  <circle cx="360" cy="252" r="5" fill="#94a3b8"/>

                  {/* Wheel arches */}
                  <path d="M105,240 Q130,218 155,240" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1"/>
                  <path d="M335,240 Q360,218 385,240" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1"/>

                  {/* Brand text on bus */}
                  <text x="192" y="209" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">ARULJOTHI TRAVELS</text>

                  {/* Door */}
                  <rect x="62" y="185" width="22" height="45" rx="3" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1"/>
                  <line x1="73" y1="185" x2="73" y2="230" stroke="#cbd5e1" strokeWidth="0.8"/>

                  {/* Undercarriage shadow */}
                  <ellipse cx="245" cy="272" rx="180" ry="6" fill="black" opacity="0.2"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Search card — pulled up into hero with negative margin */}
        <div className="relative -mt-28 pb-0 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HeroSearch />
        </div>

        {/* Bottom padding to make space for the card */}
        <div className="h-10" />
      </section>

      {/* ── Trust signals ────────────────────────────────────────────────── */}
      <TrustSignals />

      {/* ── Popular routes ───────────────────────────────────────────────── */}
      <PopularRoutes />

      {/* ── Operator strip ───────────────────────────────────────────────── */}
      <OperatorStrip />

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <FAQ />
    </>
  )
}
