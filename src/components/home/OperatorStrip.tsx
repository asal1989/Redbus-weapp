const OPERATORS = [
  { name: 'VRL', full: 'VRL Travels', bg: '#ff6b00', text: 'white' },
  { name: 'redBus', full: 'redBus', bg: '#d72b2b', text: 'white' },
  { name: 'intracity', full: 'IntrCity', bg: '#00a651', text: 'white' },
  { name: 'SRS', full: 'SRS Travels', bg: '#e31e24', text: 'white' },
  { name: 'YBM', full: 'YBM', bg: '#f97316', text: 'white' },
  { name: 'PAULO', full: 'Paulo Travels', bg: '#1e40af', text: 'white' },
  { name: 'Kallada', full: 'Kallada', bg: '#7c3aed', text: 'white' },
]

export default function OperatorStrip() {
  return (
    <section className="py-8 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
          Trusted by leading bus operators
        </p>
        <div className="flex flex-wrap items-center gap-3 justify-center">
          {OPERATORS.map(op => (
            <div
              key={op.name}
              className="flex items-center justify-center px-5 py-2 rounded-lg font-extrabold text-sm tracking-wide shadow-sm select-none cursor-default transition-transform hover:scale-105"
              style={{ backgroundColor: op.bg, color: op.text }}
            >
              {op.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
