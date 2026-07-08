const OPERATORS = ['VRL Travels', 'redBus', 'IntrCity', 'SRS Travels', 'YBM', 'Paulo Travels', 'Kallada']

export default function OperatorStrip() {
  return (
    <section className="py-8 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-6 justify-center">
          <span className="text-sm text-slate-400 font-medium shrink-0">Trusted by leading bus operators</span>
          {OPERATORS.map(name => (
            <span key={name} className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors cursor-default">
              {name}
            </span>
          ))}
          <span className="text-sm text-slate-400">and more…</span>
        </div>
      </div>
    </section>
  )
}
