import { BusTrip } from './types'
import { parseCSVRow } from './utils'

// ─── Fallback sample data (used when no Sheet is configured) ─────────────────
const MUMBAI_PUNE_BOARDING = [
  { time: '05:30', name: 'Dadar', address: 'Dadar Bus Stand, near station' },
  { time: '05:45', name: 'Sion', address: 'Sion Circle, opposite petrol pump' },
  { time: '06:00', name: 'Kurla', address: 'LBS Road, Kurla West' },
  { time: '06:20', name: 'Vashi', address: 'Vashi Bus Depot, Sector 7' },
]
const MUMBAI_PUNE_DROPPING = [
  { time: '09:30', name: 'Wakad', address: 'Wakad Phata, Hinjewadi Road' },
  { time: '09:50', name: 'Hinjewadi', address: 'Rajiv Gandhi Infotech Park Gate 1' },
  { time: '10:00', name: 'Shivajinagar', address: 'Shivajinagar Bus Stand' },
  { time: '10:15', name: 'Swargate', address: 'Swargate Bus Terminal' },
]

export const SAMPLE_TRIPS: BusTrip[] = [
  {
    id: 'BUS001',
    operator: 'VRL Travels',
    from: 'Mumbai',
    to: 'Pune',
    departure: '06:00',
    arrival: '10:00',
    duration: '4h 0m',
    price: 450,
    seatsAvailable: 28,
    totalSeats: 40,
    busType: 'Seater',
    acType: 'AC',
    amenities: ['WiFi', 'Water', 'Charging Point'],
    boardingPoints: MUMBAI_PUNE_BOARDING,
    droppingPoints: MUMBAI_PUNE_DROPPING,
  },
  {
    id: 'BUS002',
    operator: 'SRS Travels',
    from: 'Mumbai',
    to: 'Pune',
    departure: '08:30',
    arrival: '13:00',
    duration: '4h 30m',
    price: 380,
    seatsAvailable: 15,
    totalSeats: 40,
    busType: 'Sleeper',
    acType: 'Non-AC',
    amenities: ['Water', 'Blanket'],
    boardingPoints: MUMBAI_PUNE_BOARDING,
    droppingPoints: MUMBAI_PUNE_DROPPING,
  },
  {
    id: 'BUS003',
    operator: 'KPN Travels',
    from: 'Mumbai',
    to: 'Pune',
    departure: '14:30',
    arrival: '19:00',
    duration: '4h 30m',
    price: 320,
    seatsAvailable: 35,
    totalSeats: 40,
    busType: 'Seater',
    acType: 'Non-AC',
    amenities: ['Water'],
  },
  {
    id: 'BUS004',
    operator: 'Paulo Travels',
    from: 'Mumbai',
    to: 'Goa',
    departure: '14:00',
    arrival: '22:00',
    duration: '8h 0m',
    price: 850,
    seatsAvailable: 10,
    totalSeats: 36,
    busType: 'Sleeper',
    acType: 'AC',
    amenities: ['WiFi', 'Water', 'Blanket', 'Charging Point'],
  },
  {
    id: 'BUS005',
    operator: 'Neeta Tours',
    from: 'Mumbai',
    to: 'Goa',
    departure: '22:30',
    arrival: '07:30',
    duration: '9h 0m',
    price: 950,
    seatsAvailable: 6,
    totalSeats: 36,
    busType: 'Sleeper',
    acType: 'AC',
    amenities: ['WiFi', 'Water', 'Blanket', 'Charging Point'],
  },
  {
    id: 'BUS006',
    operator: 'National Travels',
    from: 'Delhi',
    to: 'Jaipur',
    departure: '07:00',
    arrival: '12:30',
    duration: '5h 30m',
    price: 400,
    seatsAvailable: 32,
    totalSeats: 40,
    busType: 'Seater',
    acType: 'AC',
    amenities: ['Water', 'Charging Point'],
  },
  {
    id: 'BUS007',
    operator: 'Orange Tours',
    from: 'Hyderabad',
    to: 'Bangalore',
    departure: '22:00',
    arrival: '06:00',
    duration: '8h 0m',
    price: 700,
    seatsAvailable: 18,
    totalSeats: 40,
    busType: 'Semi-Sleeper',
    acType: 'AC',
    amenities: ['Water', 'Blanket', 'Charging Point'],
  },
  {
    id: 'BUS008',
    operator: 'KPN Travels',
    from: 'Bangalore',
    to: 'Chennai',
    departure: '21:00',
    arrival: '05:30',
    duration: '8h 30m',
    price: 650,
    seatsAvailable: 22,
    totalSeats: 40,
    busType: 'Sleeper',
    acType: 'AC',
    amenities: ['WiFi', 'Water', 'Blanket', 'Charging Point'],
  },
  {
    id: 'BUS009',
    operator: 'VRL Travels',
    from: 'Mumbai',
    to: 'Pune',
    departure: '20:00',
    arrival: '00:30',
    duration: '4h 30m',
    price: 500,
    seatsAvailable: 20,
    totalSeats: 40,
    busType: 'Sleeper',
    acType: 'AC',
    amenities: ['WiFi', 'Water', 'Blanket'],
  },
]

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
