import { Shield, Clock, Headphones, Route } from 'lucide-react'

const signals = [
  {
    icon: Route,
    title: '500+ Routes',
    desc: 'Connecting cities across India with reliable operators',
    color: 'text-brand-700 bg-brand-50',
  },
  {
    icon: Shield,
    title: 'Secure Payments',
    desc: 'All transactions protected by Razorpay encryption',
    color: 'text-green-700 bg-green-50',
  },
  {
    icon: Clock,
    title: 'Instant Confirmation',
    desc: 'Booking confirmed immediately via email and SMS',
    color: 'text-purple-700 bg-purple-50',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    desc: 'Help available round the clock for all queries',
    color: 'text-accent-700 bg-accent-50',
  },
]

export default function TrustSignals() {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Why Travel with BusGo?</h2>
          <p className="mt-2 text-slate-500 text-sm sm:text-base">Trusted by thousands of travellers across India</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {signals.map(s => {
            const Icon = s.icon
            return (
              <div key={s.title} className="flex flex-col items-center text-center p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
                <div className={`p-3 rounded-xl mb-3 ${s.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">{s.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
