import { Search, Armchair, CreditCard } from 'lucide-react'

const steps = [
  {
    num: '01',
    icon: Search,
    title: 'Search Your Route',
    desc: 'Enter your departure city, destination, and travel date to see available buses.',
  },
  {
    num: '02',
    icon: Armchair,
    title: 'Choose Your Seat',
    desc: 'Pick your preferred seat from the visual layout and fill in passenger details.',
  },
  {
    num: '03',
    icon: CreditCard,
    title: 'Pay Securely',
    desc: 'Complete payment via Razorpay. Your booking is confirmed instantly.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-14 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">How It Works</h2>
          <p className="mt-2 text-slate-500 text-sm sm:text-base">Book your bus ticket in 3 simple steps</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden sm:block absolute top-10 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-brand-200 via-brand-400 to-brand-200" />
          {steps.map(s => {
            const Icon = s.icon
            return (
              <div key={s.num} className="relative flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-brand-800 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-brand-100 relative z-10">
                  <Icon className="w-8 h-8 text-white" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-accent-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {s.num.slice(-1)}
                  </span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-sm text-slate-500 max-w-xs leading-relaxed">{s.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
