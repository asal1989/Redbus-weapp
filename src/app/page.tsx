import HeroSearch from '@/components/home/HeroSearch'
import TrustSignals from '@/components/home/TrustSignals'
import PopularRoutes from '@/components/home/PopularRoutes'
import HowItWorks from '@/components/home/HowItWorks'
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
                <svg viewBox="0 0 560 360" className="w-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="sky2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0f172a"/>
                      <stop offset="35%" stopColor="#1e1b4b"/>
                      <stop offset="65%" stopColor="#b91c1c"/>
                      <stop offset="85%" stopColor="#ea580c"/>
                      <stop offset="100%" stopColor="#fbbf24"/>
                    </linearGradient>
                    <radialGradient id="sunRad" cx="72%" cy="42%" r="18%">
                      <stop offset="0%" stopColor="#fef08a"/>
                      <stop offset="40%" stopColor="#fbbf24" stopOpacity="0.6"/>
                      <stop offset="100%" stopColor="#f97316" stopOpacity="0"/>
                    </radialGradient>
                    <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ffffff"/>
                      <stop offset="100%" stopColor="#dde6ef"/>
                    </linearGradient>
                    <linearGradient id="frontGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#e8f0f8"/>
                      <stop offset="100%" stopColor="#c5d5e8"/>
                    </linearGradient>
                    <linearGradient id="wsGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.85"/>
                      <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.6"/>
                    </linearGradient>
                    <linearGradient id="winGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.9"/>
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.7"/>
                    </linearGradient>
                    <linearGradient id="roadGrad2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#334155"/>
                      <stop offset="100%" stopColor="#1e293b"/>
                    </linearGradient>
                    <filter id="busShad">
                      <feDropShadow dx="4" dy="6" stdDeviation="6" floodColor="#000" floodOpacity="0.3"/>
                    </filter>
                  </defs>

                  {/* ── BACKGROUND ── */}
                  <rect width="560" height="360" fill="url(#sky2)" rx="16"/>
                  {/* Sun glow */}
                  <circle cx="400" cy="150" r="30" fill="#fef08a" opacity="0.92"/>
                  <circle cx="400" cy="150" r="60" fill="url(#sunRad)"/>
                  {/* Mountain layers */}
                  <polygon points="0,230 60,145 110,190 170,110 240,175 310,95 380,160 440,85 510,140 560,115 560,270 0,270" fill="#1e1b4b" opacity="0.75"/>
                  <polygon points="0,255 40,185 100,220 160,155 230,205 300,130 370,190 440,115 510,165 560,140 560,290 0,290" fill="#312e81" opacity="0.55"/>
                  {/* Trees */}
                  {[18,42,490,516].map((x, i) => (
                    <g key={i}>
                      <polygon points={`${x},270 ${x+11},232 ${x+22},270`} fill="#14532d" opacity="0.85"/>
                      <polygon points={`${x+2},254 ${x+11},220 ${x+20},254`} fill="#15803d" opacity="0.9"/>
                    </g>
                  ))}
                  {/* Road */}
                  <path d="M0,292 Q280,278 560,286 L560,330 Q280,320 0,332 Z" fill="url(#roadGrad2)"/>
                  <path d="M40,308 L100,307 M170,306 L230,305 M300,305 L360,304 M430,304 L490,303" stroke="#fbbf24" strokeWidth="2.5" strokeDasharray="40,22" opacity="0.55"/>
                  <path d="M0,292 Q280,278 560,286" stroke="#475569" strokeWidth="1.5" fill="none" opacity="0.5"/>
                  <rect x="0" y="327" width="560" height="33" fill="#14532d" opacity="0.9"/>

                  {/* ── BUS SHADOW ── */}
                  <ellipse cx="295" cy="295" rx="230" ry="10" fill="#000" opacity="0.4"/>

                  {/* ════════════════════════════════════
                       BUS  —  3/4 perspective view
                       Front face on LEFT, side extending right
                  ════════════════════════════════════ */}

                  {/* ── ROOF ── */}
                  {/* Side roof */}
                  <rect x="90" y="108" width="390" height="16" rx="0" fill="#f0f4f8"/>
                  {/* Front roof (perspective trapezoid) */}
                  <polygon points="45,112 90,108 90,124 45,130" fill="#dde6ef"/>
                  {/* Roof top edge */}
                  <polygon points="45,108 90,104 480,104 480,108 90,108 45,112" fill="#e8edf4" stroke="#c8d5e3" strokeWidth="0.8"/>

                  {/* ── MAIN SIDE BODY (white upper) ── */}
                  <rect x="90" y="124" width="390" height="148" rx="0" fill="url(#bodyGrad)"/>

                  {/* ── FRONT FACE ── */}
                  <polygon points="45,112 90,108 90,272 45,278" fill="url(#frontGrad)" stroke="#b8c8d8" strokeWidth="1"/>

                  {/* Rear cap */}
                  <rect x="480" y="104" width="12" height="168" rx="4" fill="#c8d5e3"/>

                  {/* ── WINDSHIELD (front face) ── */}
                  <polygon points="50,118 86,113 86,192 50,198" fill="url(#wsGrad)" stroke="#60a5fa" strokeWidth="1.2"/>
                  {/* WS glare */}
                  <polygon points="52,120 84,115 84,132 52,136" fill="white" opacity="0.28"/>
                  {/* WS divider bar */}
                  <line x1="50" y1="155" x2="86" y2="152" stroke="#94a3b8" strokeWidth="1.5" opacity="0.6"/>

                  {/* "ARULJOTHI" above windshield */}
                  <polygon points="45,108 90,104 90,112 45,118" fill="#1e293b"/>
                  <text x="67" y="114" fontFamily="Arial,sans-serif" fontSize="5.5" fontWeight="900" fill="white" textAnchor="middle" letterSpacing="0.3">ARULJOTHI</text>

                  {/* ── HEADLIGHTS ── */}
                  <rect x="50" y="205" width="32" height="13" rx="3" fill="#fef9c3" stroke="#fbbf24" strokeWidth="1.2"/>
                  <rect x="52" y="207" width="28" height="9" rx="2" fill="#fde68a" opacity="0.9"/>
                  {/* DRL strip */}
                  <rect x="50" y="200" width="32" height="4" rx="2" fill="#fbbf24" opacity="0.7"/>

                  {/* Front bumper / lower face */}
                  <polygon points="45,246 90,240 90,272 45,278" fill="#94a3b8"/>
                  <polygon points="47,250 88,244 88,258 47,253" fill="#cbd5e1" opacity="0.6"/>
                  {/* Grille */}
                  <polygon points="50,220 86,215 86,238 50,244" fill="#334155"/>
                  {[218,223,228,233,238].map((y, i) => (
                    <line key={i} x1="51" y1={y+(i*0.6)} x2="85" y2={y-1+(i*0.6)} stroke="#475569" strokeWidth="0.8"/>
                  ))}
                  {/* Fog light */}
                  <polygon points="48,244 68,238 68,244 48,250" fill="#fef3c7" stroke="#f59e0b" strokeWidth="0.8"/>

                  {/* Side mirror */}
                  <rect x="84" y="148" width="18" height="11" rx="2" fill="#dde6ef" stroke="#b8c8d8" strokeWidth="1"/>
                  <line x1="90" y1="148" x2="86" y2="136" stroke="#94a3b8" strokeWidth="1.5"/>

                  {/* ── SIDE WINDOWS (panoramic strip) ── */}
                  {/* Window top strip background */}
                  <rect x="90" y="128" width="390" height="64" rx="0" fill="#1e40af" opacity="0.08"/>
                  {/* Individual windows */}
                  {[100, 175, 248, 321, 394].map((x, i) => (
                    <g key={i}>
                      <rect x={x} y="130" width="65" height="58" rx="4" fill="url(#winGrad)" stroke="#3b82f6" strokeWidth="1" opacity="0.9"/>
                      {/* glare */}
                      <rect x={x+4} y="133" width="22" height="9" rx="2" fill="white" opacity="0.3"/>
                      {/* bottom tint */}
                      <rect x={x+1} y="175" width="63" height="12" rx="0" fill="#1e40af" opacity="0.15"/>
                    </g>
                  ))}
                  {/* Window surround chrome strip */}
                  <rect x="90" y="126" width="390" height="4" rx="0" fill="#cbd5e1" opacity="0.8"/>
                  <rect x="90" y="188" width="390" height="3" rx="0" fill="#cbd5e1" opacity="0.6"/>

                  {/* ── BLUE WAVE BAND (lower body) ── */}
                  <rect x="90" y="194" width="390" height="58" fill="#1e3a8a"/>
                  {/* Wave 1 */}
                  <path d="M90,204 Q160,194 240,208 Q320,222 400,204 Q450,196 480,204 L480,216 Q450,208 400,218 Q320,236 240,222 Q160,208 90,218 Z" fill="#2563eb" opacity="0.7"/>
                  {/* Wave 2 */}
                  <path d="M90,214 Q150,202 230,218 Q310,234 390,212 Q440,202 480,212 L480,226 Q440,216 390,228 Q310,250 230,234 Q150,218 90,230 Z" fill="#3b82f6" opacity="0.5"/>
                  {/* Wave 3 */}
                  <path d="M90,222 Q170,208 260,226 Q350,244 430,220 Q460,212 480,220 L480,234 Q460,226 430,236 Q350,260 260,242 Q170,224 90,240 Z" fill="#60a5fa" opacity="0.3"/>

                  {/* ── BRAND TEXT ON SIDE ── */}
                  <text x="285" y="183" fontFamily="Arial Black,Arial,sans-serif" fontSize="21" fontWeight="900" fill="#0f172a" textAnchor="middle" letterSpacing="1.5">ARULJOTHI</text>
                  <text x="285" y="204" fontFamily="Arial Black,Arial,sans-serif" fontSize="14" fontWeight="900" fill="#f97316" textAnchor="middle" letterSpacing="3">TRAVELS</text>

                  {/* ── ORANGE ACCENT STRIPE ── */}
                  <rect x="90" y="249" width="390" height="6" fill="#f97316"/>
                  <rect x="90" y="254" width="390" height="2" fill="#fbbf24" opacity="0.7"/>

                  {/* ── LOWER WHITE SKIRT ── */}
                  <rect x="90" y="256" width="390" height="16" fill="#f0f4f8"/>

                  {/* Front skirt */}
                  <polygon points="45,260 90,256 90,272 45,278" fill="#dde6ef"/>

                  {/* ── DOOR (left side near rear) ── */}
                  <rect x="460" y="198" width="22" height="58" rx="3" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1"/>
                  <line x1="471" y1="199" x2="471" y2="255" stroke="#e2e8f0" strokeWidth="1"/>
                  <circle cx="468" cy="228" r="2" fill="#94a3b8"/>

                  {/* ── UNDERCARRIAGE ── */}
                  <rect x="88" y="270" width="394" height="6" rx="2" fill="#64748b"/>
                  <polygon points="43,272 90,268 90,274 43,280" fill="#64748b"/>

                  {/* ── WHEELS ── */}
                  {/* Rear wheel (left, bigger/closer) */}
                  <ellipse cx="180" cy="291" rx="34" ry="34" fill="#111827" stroke="#0f172a" strokeWidth="2"/>
                  <ellipse cx="180" cy="291" rx="24" ry="24" fill="#1e293b"/>
                  <ellipse cx="180" cy="291" rx="15" ry="15" fill="#374151"/>
                  <ellipse cx="180" cy="291" rx="6" ry="6" fill="#94a3b8"/>
                  {[0,51,102,153,204,255,306].map((deg, i) => {
                    const r = (deg * Math.PI) / 180
                    return <line key={i} x1={180} y1={291} x2={180+14*Math.cos(r)} y2={291+14*Math.sin(r)} stroke="#4b5563" strokeWidth="2.5"/>
                  })}
                  {/* Rear wheel arch */}
                  <path d="M146,268 Q180,248 214,268" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1.5"/>

                  {/* Front wheel (right, slightly smaller/farther) */}
                  <ellipse cx="420" cy="291" rx="32" ry="32" fill="#111827" stroke="#0f172a" strokeWidth="2"/>
                  <ellipse cx="420" cy="291" rx="22" ry="22" fill="#1e293b"/>
                  <ellipse cx="420" cy="291" rx="14" ry="14" fill="#374151"/>
                  <ellipse cx="420" cy="291" rx="5.5" ry="5.5" fill="#94a3b8"/>
                  {[0,51,102,153,204,255,306].map((deg, i) => {
                    const r = (deg * Math.PI) / 180
                    return <line key={i} x1={420} y1={291} x2={420+13*Math.cos(r)} y2={291+13*Math.sin(r)} stroke="#4b5563" strokeWidth="2.5"/>
                  })}
                  {/* Front wheel arch */}
                  <path d="M388,268 Q420,248 452,268" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1.5"/>

                  {/* Front face wheel (tiny, perspective) */}
                  <ellipse cx="60" cy="291" rx="18" ry="20" fill="#111827" stroke="#0f172a" strokeWidth="1.5"/>
                  <ellipse cx="60" cy="291" rx="12" ry="13" fill="#1e293b"/>
                  <ellipse cx="60" cy="291" rx="7" ry="8" fill="#374151"/>
                  <ellipse cx="60" cy="291" rx="3" ry="3" fill="#94a3b8"/>
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

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <HowItWorks />

      {/* ── Operator strip ───────────────────────────────────────────────── */}
      <OperatorStrip />

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <FAQ />
    </>
  )
}
