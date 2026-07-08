import { Shield, Tag, Armchair, Headphones } from 'lucide-react'

const signals = [
  { icon: Shield,      title: 'Safe & Secure',       desc: 'Your safety is our priority' },
  { icon: Tag,         title: 'Best Price',           desc: 'Get the lowest fares on every booking' },
  { icon: Armchair,    title: 'Comfortable Seats',    desc: 'Wide selection of buses with great amenities' },
  { icon: Headphones,  title: '24/7 Support',         desc: 'Always here to help you travel better' },
]

export default function TrustSignals() {
  return (
    <section className="bg-white py-6 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {signals.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-3 p-4 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all">
              <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-brand-700" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">{title}</div>
                <div className="text-xs text-slate-400 leading-snug mt-0.5">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
