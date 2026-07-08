import { BusTrip } from './types'
import { parseCSVRow } from './utils'
import { SAMPLE_TRIPS } from './sample-data'
import { searchManagedTrips, getManagedTrip, getAllManagedTrips } from './trips'
export { SAMPLE_TRIPS } from './sample-data'

// ─── Sheet row parser ─────────────────────────────────────────────────────────

function parseSheetRow(headers: string[], values: string[]): BusTrip | null {
  try {
    const row: Record<string, string> = {}
    headers.forEach((h, i) => {
      row[h.trim().toLowerCase().replace(/\s+/g, '')] = (values[i] ?? '').trim()
    })

    if (!row.id || !row.operator || !row.from || !row.to) return null

    return {
      id: row.id,
      operator: row.operator,
      from: row.from,
      to: row.to,
      departure: row.departure || '00:00',
      arrival: row.arrival || '00:00',
      duration: row.duration || '0h 0m',
      price: parseInt(row.price || '0', 10),
      seatsAvailable: parseInt(row.seatsavailable || '0', 10),
      totalSeats: parseInt(row.totalseats || '40', 10),
      busType: (row.bustype as BusTrip['busType']) || 'Seater',
      acType: (row.actype as BusTrip['acType']) || 'Non-AC',
      amenities: row.amenities ? row.amenities.split('|').map(a => a.trim()).filter(Boolean) : [],
      razorpayLink: row.razorpaylink || undefined,
    }
  } catch {
    return null
  }
}

// ─── Main fetch function ──────────────────────────────────────────────────────

export async function fetchAllTrips(): Promise<BusTrip[]> {
  // Check admin-managed trips first (set via /admin/trips)
  try {
    const managed = getAllManagedTrips()
    if (managed.length > 0) {
      return managed.filter(t => t.active).map(({ active, trackingUrl, ...trip }) => trip)
    }
  } catch { /* fallthrough */ }

  const csvUrl = process.env.GOOGLE_SHEETS_CSV_URL
  const apiKey = process.env.GOOGLE_SHEETS_API_KEY
  const sheetId = process.env.GOOGLE_SHEETS_ID

  // Option A: Published CSV URL
  if (csvUrl) {
    try {
      const res = await fetch(csvUrl, { next: { revalidate: 300 } })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const text = await res.text()
      const lines = text.split('\n').filter(l => l.trim())
      if (lines.length < 2) return SAMPLE_TRIPS
      const headers = parseCSVRow(lines[0])
      const trips = lines.slice(1).map(l => parseSheetRow(headers, parseCSVRow(l))).filter((t): t is BusTrip => t !== null)
      return trips.length > 0 ? trips : SAMPLE_TRIPS
    } catch (err) {
      console.error('[sheets] CSV fetch failed:', err)
    }
  }

  // Option B: Google Sheets API v4
  if (apiKey && sheetId) {
    try {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1?key=${apiKey}`
      const res = await fetch(url, { next: { revalidate: 300 } })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      const rows: string[][] = data.values || []
      if (rows.length < 2) return SAMPLE_TRIPS
      const trips = rows.slice(1).map(r => parseSheetRow(rows[0], r)).filter((t): t is BusTrip => t !== null)
      return trips.length > 0 ? trips : SAMPLE_TRIPS
    } catch (err) {
      console.error('[sheets] API fetch failed:', err)
    }
  }

  return SAMPLE_TRIPS
}

export async function fetchTrips(from: string, to: string): Promise<BusTrip[]> {
  const all = await fetchAllTrips()
  return all.filter(
    t => t.from.toLowerCase() === from.toLowerCase() && t.to.toLowerCase() === to.toLowerCase()
  )
}

export async function fetchTripById(id: string): Promise<BusTrip | null> {
  const all = await fetchAllTrips()
  return all.find(t => t.id === id) ?? null
}
