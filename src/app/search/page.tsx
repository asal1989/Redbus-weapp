import { Suspense } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { fetchTrips } from '@/lib/sheets'
import { formatDate } from '@/lib/utils'
import SearchResults from '@/components/search/SearchResults'

interface SearchPageProps {
  searchParams: { from?: string; to?: string; date?: string }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const from = searchParams.from || ''
  const to = searchParams.to || ''
  const date = searchParams.date || ''

  if (!from || !to) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <p className="text-4xl mb-4">🔍</p>
        <h1 className="text-xl font-bold text-slate-900 mb-2">Missing search details</h1>
        <p className="text-slate-500 mb-6">Please go back and enter departure city, destination, and date.</p>
        <Link href="/" className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-700 text-white rounded-xl font-semibold text-sm hover:bg-brand-800 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Search
        </Link>
      </div>
    )
  }

  const trips = await fetchTrips(from, to)

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Search summary bar */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/" className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors shrink-0">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
              <span>{from}</span>
              <ArrowRight className="w-4 h-4 text-brand-600" />
              <span>{to}</span>
            </div>
            {date && (
              <span className="bg-brand-50 text-brand-700 text-sm font-medium px-3 py-1 rounded-full">
                {formatDate(date)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      {trips.length === 0 ? (
        <div className="max-w-xl mx-auto px-4 py-20 text-center">
          <p className="text-4xl mb-4">😔</p>
          <h2 className="text-xl font-bold text-slate-900 mb-2">No buses found</h2>
          <p className="text-slate-500 mb-6">
            No buses available from <strong>{from}</strong> to <strong>{to}</strong>
            {date && ` on ${formatDate(date)}`}. Try a different date.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-700 text-white rounded-xl font-semibold text-sm hover:bg-brand-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Modify Search
          </Link>
        </div>
      ) : (
        <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading results…</div>}>
          <SearchResults trips={trips} from={from} to={to} date={date} />
        </Suspense>
      )}
    </div>
  )
}
