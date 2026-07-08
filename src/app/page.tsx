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

            {/* Right — Aruljothi Travels bus illustration */}
            <div className="flex-1 flex justify-center lg:justify-end">
              <div className="w-full max-w-lg relative drop-shadow-2xl">
                <svg viewBox="0 0 600 340" className="w-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="sunsetSky" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1a1a4e"/>
                      <stop offset="40%" stopColor="#c2410c"/>
                      <stop offset="70%" stopColor="#f97316"/>
                      <stop offset="100%" stopColor="#fbbf24"/>
                    </linearGradient>
                    <linearGradient id="busWhite" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ffffff"/>
                      <stop offset="100%" stopColor="#e8edf2"/>
                    </linearGradient>
                    <linearGradient id="windshield" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.9"/>
                      <stop offset="100%" stopColor="#bfdbfe" stopOpacity="0.7"/>
                    </linearGradient>
                    <linearGradient id="roadGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#374151"/>
                      <stop offset="100%" stopColor="#1f2937"/>
                    </linearGradient>
                    <linearGradient id="sunGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                      <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8"/>
                      <stop offset="100%" stopColor="#f97316" stopOpacity="0"/>
                    </linearGradient>
                    <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#fef08a" stopOpacity="1"/>
                      <stop offset="60%" stopColor="#fbbf24" stopOpacity="0.4"/>
                      <stop offset="100%" stopColor="#f97316" stopOpacity="0"/>
                    </radialGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="blur"/>
                      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                    </filter>
                    <clipPath id="busClip">
                      <rect x="30" y="100" width="520" height="180" rx="14"/>
                    </clipPath>
                  </defs>

                  {/* === BACKGROUND === */}
                  <rect width="600" height="340" fill="url(#sunsetSky)" rx="18"/>

                  {/* Sun */}
                  <circle cx="480" cy="130" r="38" fill="#fef08a" opacity="0.9"/>
                  <circle cx="480" cy="130" r="55" fill="url(#sunGlow)" opacity="0.5"/>

                  {/* Mountain silhouettes */}
                  <polygon points="0,220 70,130 140,200 200,110 280,190 340,90 420,170 500,80 600,140 600,260 0,260" fill="#1e1b4b" opacity="0.7"/>
                  <polygon points="0,240 50,170 120,220 190,150 260,210 350,120 430,190 530,110 600,160 600,280 0,280" fill="#312e81" opacity="0.5"/>

                  {/* Trees (silhouette) */}
                  {[20,45,550,575].map((x,i) => (
                    <g key={i}>
                      <polygon points={`${x},260 ${x+12},220 ${x+24},260`} fill="#14532d" opacity="0.8"/>
                      <polygon points={`${x+2},245 ${x+12},210 ${x+22},245`} fill="#166534" opacity="0.9"/>
                    </g>
                  ))}

                  {/* Road */}
                  <path d="M0,278 Q300,265 600,272 L600,320 Q300,310 0,320 Z" fill="url(#roadGrad)"/>
                  {/* Road centre line */}
                  <path d="M60,292 L110,291 M180,291 L230,290 M300,290 L350,290 M420,290 L470,290" stroke="#fbbf24" strokeWidth="2.5" strokeDasharray="35,20" opacity="0.6"/>
                  {/* Kerb lines */}
                  <path d="M0,278 Q300,265 600,272" stroke="#6b7280" strokeWidth="1.5" fill="none" opacity="0.5"/>
                  {/* Grass verge */}
                  <rect x="0" y="316" width="600" height="24" fill="#14532d" opacity="0.9"/>

                  {/* ===== BUS BODY ===== */}
                  {/* Shadow under bus */}
                  <ellipse cx="295" cy="285" rx="240" ry="10" fill="#000" opacity="0.35"/>

                  {/* Main white body */}
                  <rect x="30" y="118" width="510" height="160" rx="14" fill="url(#busWhite)" stroke="#d1d5db" strokeWidth="1.5"/>

                  {/* Roof curve */}
                  <path d="M44,118 Q295,100 546,118" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1"/>
                  <rect x="44" y="103" width="502" height="18" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1"/>

                  {/* ── FRONT FACE (right side) ── */}
                  {/* Front panel */}
                  <rect x="500" y="110" width="65" height="166" rx="10" fill="#f1f5f9" stroke="#d1d5db" strokeWidth="1.5"/>

                  {/* Windshield */}
                  <path d="M506,116 Q558,108 558,116 L558,175 Q540,182 506,178 Z" fill="url(#windshield)" stroke="#93c5fd" strokeWidth="1.5"/>
                  {/* Windshield glare */}
                  <path d="M512,120 Q530,114 548,118 L545,130 Q528,126 514,131 Z" fill="white" opacity="0.4"/>

                  {/* "ARULJOTHI" on windshield band */}
                  <rect x="503" y="106" width="60" height="14" rx="3" fill="#1e293b"/>
                  <text x="533" y="116" fontFamily="Arial,sans-serif" fontSize="7" fontWeight="900" fill="white" textAnchor="middle" letterSpacing="0.5">ARULJOTHI</text>

                  {/* Headlights */}
                  <rect x="540" y="188" width="24" height="12" rx="3" fill="#fef9c3" stroke="#fbbf24" strokeWidth="1.5"/>
                  <rect x="542" y="190" width="20" height="8" rx="2" fill="#fde68a"/>
                  {/* Fog lights */}
                  <rect x="505" y="246" width="16" height="8" rx="2" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1"/>

                  {/* Front bumper */}
                  <rect x="498" y="255" width="67" height="14" rx="4" fill="#9ca3af" stroke="#6b7280" strokeWidth="1"/>
                  <rect x="502" y="257" width="59" height="6" rx="2" fill="#d1d5db"/>

                  {/* Front grille */}
                  <rect x="504" y="235" width="28" height="18" rx="3" fill="#374151" stroke="#4b5563" strokeWidth="1"/>
                  {[238,242,246,250].map((y,i) => (
                    <line key={i} x1="505" y1={y} x2="531" y2={y} stroke="#6b7280" strokeWidth="0.8"/>
                  ))}

                  {/* Side mirror */}
                  <rect x="556" y="148" width="16" height="10" rx="2" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1"/>
                  <line x1="562" y1="148" x2="556" y2="135" stroke="#9ca3af" strokeWidth="1.5"/>

                  {/* ── SIDE WINDOWS ── */}
                  {[68, 140, 210, 280, 350, 420].map((x, i) => (
                    <g key={i}>
                      <rect x={x} y="128" width="62" height="44" rx="5" fill="#bfdbfe" stroke="#93c5fd" strokeWidth="1.2" opacity="0.85"/>
                      {/* Window glare */}
                      <rect x={x+4} y="131" width="20" height="8" rx="2" fill="white" opacity="0.35"/>
                    </g>
                  ))}

                  {/* ── BLUE WAVE DESIGN (lower panel) ── */}
                  {/* Base blue band */}
                  <rect x="30" y="208" width="510" height="50" rx="0" fill="#1e3a8a"/>
                  <rect x="30" y="208" width="510" height="50" fill="#1d4ed8" opacity="0.3"/>

                  {/* Wave curves */}
                  <path d="M30,218 Q100,205 180,220 Q260,235 340,215 Q420,198 500,218 L500,230 Q420,210 340,228 Q260,248 180,233 Q100,218 30,230 Z" fill="#3b82f6" opacity="0.7"/>
                  <path d="M30,228 Q90,215 170,230 Q250,245 330,225 Q410,208 500,225 L500,238 Q410,222 330,240 Q250,258 170,242 Q90,228 30,242 Z" fill="#60a5fa" opacity="0.5"/>
                  <path d="M30,236 Q110,222 200,238 Q290,254 380,232 Q460,215 500,232 L500,244 Q460,228 380,246 Q290,268 200,252 Q110,236 30,250 Z" fill="#93c5fd" opacity="0.3"/>

                  {/* ── BRAND TEXT ON SIDE ── */}
                  <text x="270" y="196" fontFamily="Arial Black,Arial,sans-serif" fontSize="22" fontWeight="900" fill="#1e293b" textAnchor="middle" letterSpacing="1">ARULJOTHI</text>
                  <text x="270" y="218" fontFamily="Arial Black,Arial,sans-serif" fontSize="15" fontWeight="900" fill="#f97316" textAnchor="middle" letterSpacing="2">TRAVELS</text>

                  {/* Orange accent stripe */}
                  <rect x="30" y="255" width="510" height="5" fill="#f97316"/>
                  <rect x="30" y="259" width="510" height="2" fill="#fbbf24" opacity="0.6"/>

                  {/* Lower white skirt */}
                  <rect x="30" y="261" width="510" height="17" rx="0" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="0.5"/>

                  {/* Door */}
                  <rect x="32" y="172" width="30" height="64" rx="4" fill="#f8fafc" stroke="#d1d5db" strokeWidth="1.2"/>
                  <line x1="47" y1="173" x2="47" y2="235" stroke="#e2e8f0" strokeWidth="1"/>
                  <circle cx="43" cy="204" r="2.5" fill="#9ca3af"/>

                  {/* ── WHEELS ── */}
                  {/* Front wheel */}
                  <circle cx="480" cy="280" r="32" fill="#111827" stroke="#0f172a" strokeWidth="2"/>
                  <circle cx="480" cy="280" r="22" fill="#1f2937"/>
                  <circle cx="480" cy="280" r="14" fill="#374151"/>
                  <circle cx="480" cy="280" r="6" fill="#9ca3af"/>
                  {/* Wheel spokes */}
                  {[0,60,120,180,240,300].map((deg,i) => {
                    const rad = (deg * Math.PI) / 180
                    return <line key={i} x1={480} y1={280} x2={480 + 13*Math.cos(rad)} y2={280 + 13*Math.sin(rad)} stroke="#6b7280" strokeWidth="2"/>
                  })}
                  {/* Front wheel arch */}
                  <path d="M448,258 Q480,238 512,258" fill="#e2e8f0" stroke="#d1d5db" strokeWidth="1.5"/>

                  {/* Rear wheel */}
                  <circle cx="155" cy="280" r="32" fill="#111827" stroke="#0f172a" strokeWidth="2"/>
                  <circle cx="155" cy="280" r="22" fill="#1f2937"/>
                  <circle cx="155" cy="280" r="14" fill="#374151"/>
                  <circle cx="155" cy="280" r="6" fill="#9ca3af"/>
                  {[0,60,120,180,240,300].map((deg,i) => {
                    const rad = (deg * Math.PI) / 180
                    return <line key={i} x1={155} y1={280} x2={155 + 13*Math.cos(rad)} y2={280 + 13*Math.sin(rad)} stroke="#6b7280" strokeWidth="2"/>
                  })}
                  {/* Rear wheel arch */}
                  <path d="M123,258 Q155,238 187,258" fill="#e2e8f0" stroke="#d1d5db" strokeWidth="1.5"/>

                  {/* Chassis underline */}
                  <rect x="32" y="276" width="466" height="4" rx="2" fill="#9ca3af"/>
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
