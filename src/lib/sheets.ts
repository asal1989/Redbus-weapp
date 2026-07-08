import { BusTrip } from './types'
import { parseCSVRow } from './utils'

// ─── Fallback sample data (used when no Sheet is configured) ─────────────────

// Chennai → Madurai
const MAS_MDU_BOARDING = [
  { time: '21:00', name: 'Koyambedu CMBT', address: 'Chennai Mofussil Bus Terminus, Platform 14' },
  { time: '21:20', name: 'Guindy', address: 'Guindy Bus Stand, Anna Salai' },
  { time: '21:45', name: 'Tambaram', address: 'Tambaram Bus Terminus, GST Road' },
  { time: '22:10', name: 'Chengalpattu', address: 'Chengalpattu Bus Stand, NH-45' },
]
const MAS_MDU_DROPPING = [
  { time: '04:00', name: 'Dindigul', address: 'Dindigul Bus Stand, NH-44' },
  { time: '04:30', name: 'Madurai Periyar Bus Stand', address: 'Periyar Bus Stand, Madurai' },
  { time: '04:50', name: 'Madurai Anna Nagar', address: 'Anna Nagar Bus Stop, Madurai' },
]

// Chennai → Coimbatore
const MAS_CBE_BOARDING = [
  { time: '20:30', name: 'Koyambedu CMBT', address: 'Chennai Mofussil Bus Terminus, Platform 9' },
  { time: '20:50', name: 'Guindy', address: 'Guindy Bus Stand, Anna Salai' },
  { time: '21:15', name: 'Tambaram', address: 'Tambaram Bus Terminus, GST Road' },
]
const MAS_CBE_DROPPING = [
  { time: '05:00', name: 'Avinashi Road', address: 'Avinashi Road, Coimbatore' },
  { time: '05:20', name: 'Gandhipuram', address: 'Gandhipuram Central Bus Stand, Coimbatore' },
  { time: '05:40', name: 'Ukkadam', address: 'Ukkadam Bus Terminus, Coimbatore' },
]

// Chennai → Tiruchirappalli
const MAS_TRY_BOARDING = [
  { time: '22:00', name: 'Koyambedu CMBT', address: 'Chennai Mofussil Bus Terminus, Platform 6' },
  { time: '22:20', name: 'Tambaram', address: 'Tambaram Bus Terminus, GST Road' },
  { time: '22:45', name: 'Chengalpattu', address: 'Chengalpattu Bus Stand, NH-45' },
]
const MAS_TRY_DROPPING = [
  { time: '04:30', name: 'Ariyamangalam', address: 'Ariyamangalam Junction, Trichy' },
  { time: '04:50', name: 'Trichy Central Bus Stand', address: 'Central Bus Stand, Trichy' },
  { time: '05:10', name: 'Srirangam', address: 'Srirangam Bus Stop, Trichy' },
]

// Madurai → Coimbatore
const MDU_CBE_BOARDING = [
  { time: '07:00', name: 'Madurai Periyar Bus Stand', address: 'Periyar Bus Stand, Madurai' },
  { time: '07:20', name: 'Madurai Anna Nagar', address: 'Anna Nagar Bus Stop, Madurai' },
  { time: '07:45', name: 'Dindigul', address: 'Dindigul Bus Stand, NH-44' },
]
const MDU_CBE_DROPPING = [
  { time: '11:00', name: 'Pollachi', address: 'Pollachi Bus Stand, Coimbatore District' },
  { time: '11:30', name: 'Gandhipuram', address: 'Gandhipuram Central Bus Stand, Coimbatore' },
  { time: '11:50', name: 'Ukkadam', address: 'Ukkadam Bus Terminus, Coimbatore' },
]

// Chennai → Salem
const MAS_SLM_BOARDING = [
  { time: '21:30', name: 'Koyambedu CMBT', address: 'Chennai Mofussil Bus Terminus, Platform 11' },
  { time: '21:50', name: 'Ambattur', address: 'Ambattur Bus Stop, Chennai' },
  { time: '22:15', name: 'Vellore', address: 'Vellore Bus Stand, NH-48' },
]
const MAS_SLM_DROPPING = [
  { time: '03:30', name: 'Attur', address: 'Attur Bus Stand, Salem District' },
  { time: '04:00', name: 'Salem New Bus Stand', address: 'New Bus Stand, Salem' },
  { time: '04:15', name: 'Salem Old Bus Stand', address: 'Old Bus Stand, Salem' },
]

// Coimbatore → Madurai
const CBE_MDU_BOARDING = [
  { time: '22:00', name: 'Gandhipuram', address: 'Gandhipuram Central Bus Stand, Coimbatore' },
  { time: '22:20', name: 'Ukkadam', address: 'Ukkadam Bus Terminus, Coimbatore' },
  { time: '22:45', name: 'Pollachi', address: 'Pollachi Bus Stand, Coimbatore District' },
]
const CBE_MDU_DROPPING = [
  { time: '02:30', name: 'Dindigul', address: 'Dindigul Bus Stand, NH-44' },
  { time: '03:00', name: 'Madurai Periyar Bus Stand', address: 'Periyar Bus Stand, Madurai' },
  { time: '03:20', name: 'Madurai Anna Nagar', address: 'Anna Nagar Bus Stop, Madurai' },
]

export const SAMPLE_TRIPS: BusTrip[] = [
  // ── Chennai → Madurai ────────────────────────────────────────────────────
  {
    id: 'BUS001',
    operator: 'Aruljothi Travels',
    from: 'Chennai', to: 'Madurai',
    departure: '21:00', arrival: '04:30', duration: '7h 30m',
    price: 550, seatsAvailable: 28, totalSeats: 40,
    busType: 'Seater', acType: 'AC',
    amenities: ['Water', 'Charging Point'],
    boardingPoints: MAS_MDU_BOARDING, droppingPoints: MAS_MDU_DROPPING,
  },
  // ── Chennai → Coimbatore ─────────────────────────────────────────────────
  {
    id: 'BUS002',
    operator: 'Aruljothi Travels',
    from: 'Chennai', to: 'Coimbatore',
    departure: '20:30', arrival: '05:30', duration: '9h 0m',
    price: 650, seatsAvailable: 18, totalSeats: 36,
    busType: 'Sleeper', acType: 'AC',
    amenities: ['WiFi', 'Water', 'Blanket', 'Charging Point'],
    boardingPoints: MAS_CBE_BOARDING, droppingPoints: MAS_CBE_DROPPING,
  },
  {
    id: 'BUS003',
    operator: 'Aruljothi Travels',
    from: 'Chennai', to: 'Coimbatore',
    departure: '22:00', arrival: '07:00', duration: '9h 0m',
    price: 480, seatsAvailable: 32, totalSeats: 40,
    busType: 'Seater', acType: 'AC',
    amenities: ['Water', 'Charging Point'],
    boardingPoints: MAS_CBE_BOARDING, droppingPoints: MAS_CBE_DROPPING,
  },

  // ── Chennai → Tiruchirappalli ─────────────────────────────────────────────
  {
    id: 'BUS004',
    operator: 'Aruljothi Travels',
    from: 'Chennai', to: 'Tiruchirappalli',
    departure: '22:00', arrival: '05:00', duration: '7h 0m',
    price: 500, seatsAvailable: 24, totalSeats: 40,
    busType: 'Seater', acType: 'AC',
    amenities: ['Water', 'Charging Point'],
    boardingPoints: MAS_TRY_BOARDING, droppingPoints: MAS_TRY_DROPPING,
  },
  {
    id: 'BUS005',
    operator: 'Aruljothi Travels',
    from: 'Chennai', to: 'Tiruchirappalli',
    departure: '21:30', arrival: '04:30', duration: '7h 0m',
    price: 680, seatsAvailable: 10, totalSeats: 36,
    busType: 'Sleeper', acType: 'AC',
    amenities: ['WiFi', 'Water', 'Blanket', 'Charging Point'],
    boardingPoints: MAS_TRY_BOARDING, droppingPoints: MAS_TRY_DROPPING,
  },

  // ── Madurai → Coimbatore ─────────────────────────────────────────────────
  {
    id: 'BUS006',
    operator: 'Aruljothi Travels',
    from: 'Madurai', to: 'Coimbatore',
    departure: '07:00', arrival: '11:30', duration: '4h 30m',
    price: 350, seatsAvailable: 30, totalSeats: 40,
    busType: 'Seater', acType: 'AC',
    amenities: ['Water', 'Charging Point'],
    boardingPoints: MDU_CBE_BOARDING, droppingPoints: MDU_CBE_DROPPING,
  },
  {
    id: 'BUS007',
    operator: 'Aruljothi Travels',
    from: 'Madurai', to: 'Coimbatore',
    departure: '22:30', arrival: '03:00', duration: '4h 30m',
    price: 520, seatsAvailable: 14, totalSeats: 36,
    busType: 'Semi-Sleeper', acType: 'AC',
    amenities: ['Water', 'Blanket', 'Charging Point'],
    boardingPoints: MDU_CBE_BOARDING, droppingPoints: MDU_CBE_DROPPING,
  },

  // ── Chennai → Salem ───────────────────────────────────────────────────────
  {
    id: 'BUS008',
    operator: 'Aruljothi Travels',
    from: 'Chennai', to: 'Salem',
    departure: '21:30', arrival: '04:00', duration: '6h 30m',
    price: 420, seatsAvailable: 28, totalSeats: 40,
    busType: 'Seater', acType: 'AC',
    amenities: ['Water', 'Charging Point'],
    boardingPoints: MAS_SLM_BOARDING, droppingPoints: MAS_SLM_DROPPING,
  },
  {
    id: 'BUS009',
    operator: 'Aruljothi Travels',
    from: 'Chennai', to: 'Salem',
    departure: '23:00', arrival: '05:30', duration: '6h 30m',
    price: 580, seatsAvailable: 8, totalSeats: 36,
    busType: 'Sleeper', acType: 'AC',
    amenities: ['WiFi', 'Water', 'Blanket', 'Charging Point'],
    boardingPoints: MAS_SLM_BOARDING, droppingPoints: MAS_SLM_DROPPING,
  },

  // ── Coimbatore → Madurai ─────────────────────────────────────────────────
  {
    id: 'BUS010',
    operator: 'Aruljothi Travels',
    from: 'Coimbatore', to: 'Madurai',
    departure: '22:00', arrival: '03:00', duration: '5h 0m',
    price: 380, seatsAvailable: 22, totalSeats: 40,
    busType: 'Seater', acType: 'AC',
    amenities: ['Water', 'Charging Point'],
    boardingPoints: CBE_MDU_BOARDING, droppingPoints: CBE_MDU_DROPPING,
  },
  {
    id: 'BUS011',
    operator: 'Aruljothi Travels',
    from: 'Coimbatore', to: 'Madurai',
    departure: '06:30', arrival: '11:30', duration: '5h 0m',
    price: 350, seatsAvailable: 36, totalSeats: 40,
    busType: 'Seater', acType: 'Non-AC',
    amenities: ['Water'],
    boardingPoints: CBE_MDU_BOARDING, droppingPoints: CBE_MDU_DROPPING,
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
  // Check admin-managed trips first (set via /admin/trips)
  try {
    const { getAllManagedTrips } = await import('./trips')
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
