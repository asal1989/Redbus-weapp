import { BusTrip } from './types'
import { parseCSVRow } from './utils'

// ─── Fallback sample data (used when no Sheet is configured) ─────────────────

// Mumbai → Pune
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

// Bangalore → Chennai
const BLR_MAS_BOARDING = [
  { time: '20:30', name: 'Majestic', address: 'Kempegowda Bus Station, Platform 12' },
  { time: '20:50', name: 'Silk Board', address: 'Silk Board Junction, opp. Forum Mall' },
  { time: '21:10', name: 'Electronic City', address: 'Infosys Gate 1, Hosur Road' },
  { time: '21:30', name: 'Hosur', address: 'Hosur Bus Stand, NH-44' },
]
const BLR_MAS_DROPPING = [
  { time: '05:00', name: 'Ambattur', address: 'Ambattur Industrial Estate Bus Stop' },
  { time: '05:20', name: 'Koyambedu', address: 'CMBT Bus Terminal, Platform 8' },
  { time: '05:40', name: 'Guindy', address: 'Guindy Bus Stand, Anna Salai' },
  { time: '06:00', name: 'Tambaram', address: 'Tambaram Bus Terminus' },
]

// Delhi → Jaipur
const DEL_JAI_BOARDING = [
  { time: '06:30', name: 'Kashmere Gate', address: 'ISBT Kashmere Gate, Platform 5' },
  { time: '07:00', name: 'Dhaula Kuan', address: 'Dhaula Kuan Metro Station' },
  { time: '07:20', name: 'Gurgaon Sector 14', address: 'IFFCO Chowk, MG Road' },
]
const DEL_JAI_DROPPING = [
  { time: '11:30', name: 'Chomu', address: 'Chomu Bypass, NH-11' },
  { time: '12:00', name: 'Sindhi Camp', address: 'Sindhi Camp Bus Stand, Jaipur' },
  { time: '12:15', name: 'Narayan Singh Circle', address: 'Narayan Singh Circle, MI Road' },
]

// Hyderabad → Bangalore
const HYD_BLR_BOARDING = [
  { time: '21:30', name: 'Mahatma Gandhi Bus Station', address: 'MGBS, Imlibun, Platform 18' },
  { time: '21:50', name: 'LB Nagar', address: 'LB Nagar X Roads, Opp. Big Bazaar' },
  { time: '22:10', name: 'Shamshabad', address: 'Near Airport Flyover, NH-44' },
]
const HYD_BLR_DROPPING = [
  { time: '05:30', name: 'Hebbal', address: 'Hebbal Flyover, Outer Ring Road' },
  { time: '05:50', name: 'Majestic', address: 'Kempegowda Bus Station, Bangalore' },
  { time: '06:10', name: 'Shivajinagar', address: 'Shivajinagar Bus Stand, Bangalore' },
]

// Mumbai → Goa
const MUM_GOA_BOARDING = [
  { time: '13:30', name: 'Borivali', address: 'Borivali Bus Depot, Western Express Hwy' },
  { time: '14:00', name: 'Dadar', address: 'Dadar TT Circle, Shivaji Park Side' },
  { time: '14:30', name: 'Vashi', address: 'Vashi Bus Stand, Sector 7' },
]
const MUM_GOA_DROPPING = [
  { time: '21:30', name: 'Panaji', address: 'Panaji Bus Stand, Kadamba Terminal' },
  { time: '21:50', name: 'Mapusa', address: 'Mapusa Bus Stand, Market Road' },
  { time: '22:15', name: 'Calangute', address: 'Calangute Market Square' },
]

// Chennai → Madurai
const MAS_MDU_BOARDING = [
  { time: '21:00', name: 'Koyambedu', address: 'CMBT Bus Terminal, Platform 14' },
  { time: '21:20', name: 'Guindy', address: 'Guindy Bus Stand, Anna Salai' },
  { time: '21:45', name: 'Tambaram', address: 'Tambaram Bus Terminus, GST Road' },
]
const MAS_MDU_DROPPING = [
  { time: '04:30', name: 'Madurai Periyar Bus Stand', address: 'Periyar Bus Stand, Madurai' },
  { time: '04:50', name: 'Anna Nagar', address: 'Anna Nagar, Madurai' },
]

export const SAMPLE_TRIPS: BusTrip[] = [
  // ── Mumbai → Pune ────────────────────────────────────────────────────────
  {
    id: 'BUS001',
    operator: 'VRL Travels',
    from: 'Mumbai', to: 'Pune',
    departure: '06:00', arrival: '10:00', duration: '4h 0m',
    price: 450, seatsAvailable: 28, totalSeats: 40,
    busType: 'Seater', acType: 'AC',
    amenities: ['WiFi', 'Water', 'Charging Point'],
    boardingPoints: MUMBAI_PUNE_BOARDING, droppingPoints: MUMBAI_PUNE_DROPPING,
  },
  {
    id: 'BUS002',
    operator: 'SRS Travels',
    from: 'Mumbai', to: 'Pune',
    departure: '08:30', arrival: '13:00', duration: '4h 30m',
    price: 380, seatsAvailable: 15, totalSeats: 40,
    busType: 'Sleeper', acType: 'Non-AC',
    amenities: ['Water', 'Blanket'],
    boardingPoints: MUMBAI_PUNE_BOARDING, droppingPoints: MUMBAI_PUNE_DROPPING,
  },
  {
    id: 'BUS003',
    operator: 'Neeta Tours',
    from: 'Mumbai', to: 'Pune',
    departure: '14:30', arrival: '18:30', duration: '4h 0m',
    price: 520, seatsAvailable: 10, totalSeats: 40,
    busType: 'Seater', acType: 'AC',
    amenities: ['WiFi', 'Water', 'Charging Point', 'Live Tracking'],
    boardingPoints: MUMBAI_PUNE_BOARDING, droppingPoints: MUMBAI_PUNE_DROPPING,
  },
  {
    id: 'BUS004',
    operator: 'KPN Travels',
    from: 'Mumbai', to: 'Pune',
    departure: '20:00', arrival: '00:30', duration: '4h 30m',
    price: 600, seatsAvailable: 20, totalSeats: 36,
    busType: 'Sleeper', acType: 'AC',
    amenities: ['WiFi', 'Water', 'Blanket', 'Charging Point'],
    boardingPoints: MUMBAI_PUNE_BOARDING, droppingPoints: MUMBAI_PUNE_DROPPING,
  },
  {
    id: 'BUS005',
    operator: 'Prasanna Purple',
    from: 'Mumbai', to: 'Pune',
    departure: '23:00', arrival: '03:30', duration: '4h 30m',
    price: 350, seatsAvailable: 34, totalSeats: 40,
    busType: 'Semi-Sleeper', acType: 'Non-AC',
    amenities: ['Water', 'Blanket'],
    boardingPoints: MUMBAI_PUNE_BOARDING, droppingPoints: MUMBAI_PUNE_DROPPING,
  },

  // ── Mumbai → Goa ─────────────────────────────────────────────────────────
  {
    id: 'BUS006',
    operator: 'Paulo Travels',
    from: 'Mumbai', to: 'Goa',
    departure: '14:00', arrival: '22:00', duration: '8h 0m',
    price: 850, seatsAvailable: 10, totalSeats: 36,
    busType: 'Sleeper', acType: 'AC',
    amenities: ['WiFi', 'Water', 'Blanket', 'Charging Point'],
    boardingPoints: MUM_GOA_BOARDING, droppingPoints: MUM_GOA_DROPPING,
  },
  {
    id: 'BUS007',
    operator: 'Neeta Tours',
    from: 'Mumbai', to: 'Goa',
    departure: '22:30', arrival: '07:30', duration: '9h 0m',
    price: 950, seatsAvailable: 6, totalSeats: 36,
    busType: 'Sleeper', acType: 'AC',
    amenities: ['WiFi', 'Water', 'Blanket', 'Charging Point'],
    boardingPoints: MUM_GOA_BOARDING, droppingPoints: MUM_GOA_DROPPING,
  },
  {
    id: 'BUS008',
    operator: 'VRL Travels',
    from: 'Mumbai', to: 'Goa',
    departure: '16:30', arrival: '01:00', duration: '8h 30m',
    price: 750, seatsAvailable: 24, totalSeats: 40,
    busType: 'Semi-Sleeper', acType: 'AC',
    amenities: ['Water', 'Blanket', 'Charging Point'],
    boardingPoints: MUM_GOA_BOARDING, droppingPoints: MUM_GOA_DROPPING,
  },

  // ── Bangalore → Chennai ───────────────────────────────────────────────────
  {
    id: 'BUS009',
    operator: 'KPN Travels',
    from: 'Bangalore', to: 'Chennai',
    departure: '21:00', arrival: '05:30', duration: '8h 30m',
    price: 650, seatsAvailable: 22, totalSeats: 40,
    busType: 'Sleeper', acType: 'AC',
    amenities: ['WiFi', 'Water', 'Blanket', 'Charging Point'],
    boardingPoints: BLR_MAS_BOARDING, droppingPoints: BLR_MAS_DROPPING,
  },
  {
    id: 'BUS010',
    operator: 'SRS Travels',
    from: 'Bangalore', to: 'Chennai',
    departure: '22:00', arrival: '06:00', duration: '8h 0m',
    price: 550, seatsAvailable: 30, totalSeats: 40,
    busType: 'Seater', acType: 'AC',
    amenities: ['Water', 'Charging Point'],
    boardingPoints: BLR_MAS_BOARDING, droppingPoints: BLR_MAS_DROPPING,
  },
  {
    id: 'BUS011',
    operator: 'Orange Tours',
    from: 'Bangalore', to: 'Chennai',
    departure: '23:30', arrival: '07:00', duration: '7h 30m',
    price: 799, seatsAvailable: 8, totalSeats: 36,
    busType: 'Sleeper', acType: 'AC',
    amenities: ['WiFi', 'Water', 'Blanket', 'Charging Point', 'Live Tracking'],
    boardingPoints: BLR_MAS_BOARDING, droppingPoints: BLR_MAS_DROPPING,
  },

  // ── Delhi → Jaipur ───────────────────────────────────────────────────────
  {
    id: 'BUS012',
    operator: 'National Travels',
    from: 'Delhi', to: 'Jaipur',
    departure: '07:00', arrival: '12:30', duration: '5h 30m',
    price: 400, seatsAvailable: 32, totalSeats: 40,
    busType: 'Seater', acType: 'AC',
    amenities: ['Water', 'Charging Point'],
    boardingPoints: DEL_JAI_BOARDING, droppingPoints: DEL_JAI_DROPPING,
  },
  {
    id: 'BUS013',
    operator: 'RSRTC Volvo',
    from: 'Delhi', to: 'Jaipur',
    departure: '09:30', arrival: '14:30', duration: '5h 0m',
    price: 480, seatsAvailable: 18, totalSeats: 45,
    busType: 'Seater', acType: 'AC',
    amenities: ['WiFi', 'Water', 'Charging Point'],
    boardingPoints: DEL_JAI_BOARDING, droppingPoints: DEL_JAI_DROPPING,
  },
  {
    id: 'BUS014',
    operator: 'VRL Travels',
    from: 'Delhi', to: 'Jaipur',
    departure: '22:00', arrival: '03:30', duration: '5h 30m',
    price: 699, seatsAvailable: 14, totalSeats: 36,
    busType: 'Sleeper', acType: 'AC',
    amenities: ['WiFi', 'Water', 'Blanket', 'Charging Point'],
    boardingPoints: DEL_JAI_BOARDING, droppingPoints: DEL_JAI_DROPPING,
  },

  // ── Hyderabad → Bangalore ────────────────────────────────────────────────
  {
    id: 'BUS015',
    operator: 'Orange Tours',
    from: 'Hyderabad', to: 'Bangalore',
    departure: '22:00', arrival: '06:00', duration: '8h 0m',
    price: 700, seatsAvailable: 18, totalSeats: 40,
    busType: 'Semi-Sleeper', acType: 'AC',
    amenities: ['Water', 'Blanket', 'Charging Point'],
    boardingPoints: HYD_BLR_BOARDING, droppingPoints: HYD_BLR_DROPPING,
  },
  {
    id: 'BUS016',
    operator: 'SRS Travels',
    from: 'Hyderabad', to: 'Bangalore',
    departure: '20:30', arrival: '05:00', duration: '8h 30m',
    price: 899, seatsAvailable: 5, totalSeats: 36,
    busType: 'Sleeper', acType: 'AC',
    amenities: ['WiFi', 'Water', 'Blanket', 'Charging Point', 'Live Tracking'],
    boardingPoints: HYD_BLR_BOARDING, droppingPoints: HYD_BLR_DROPPING,
  },
  {
    id: 'BUS017',
    operator: 'KPN Travels',
    from: 'Hyderabad', to: 'Bangalore',
    departure: '23:30', arrival: '08:00', duration: '8h 30m',
    price: 599, seatsAvailable: 26, totalSeats: 40,
    busType: 'Seater', acType: 'AC',
    amenities: ['Water', 'Charging Point'],
    boardingPoints: HYD_BLR_BOARDING, droppingPoints: HYD_BLR_DROPPING,
  },

  // ── Chennai → Madurai ────────────────────────────────────────────────────
  {
    id: 'BUS018',
    operator: 'KPN Travels',
    from: 'Chennai', to: 'Madurai',
    departure: '21:00', arrival: '04:30', duration: '7h 30m',
    price: 580, seatsAvailable: 20, totalSeats: 40,
    busType: 'Sleeper', acType: 'AC',
    amenities: ['WiFi', 'Water', 'Blanket', 'Charging Point'],
    boardingPoints: MAS_MDU_BOARDING, droppingPoints: MAS_MDU_DROPPING,
  },
  {
    id: 'BUS019',
    operator: 'SRS Travels',
    from: 'Chennai', to: 'Madurai',
    departure: '22:30', arrival: '06:00', duration: '7h 30m',
    price: 450, seatsAvailable: 35, totalSeats: 40,
    busType: 'Seater', acType: 'AC',
    amenities: ['Water', 'Charging Point'],
    boardingPoints: MAS_MDU_BOARDING, droppingPoints: MAS_MDU_DROPPING,
  },
  {
    id: 'BUS020',
    operator: 'Orange Tours',
    from: 'Chennai', to: 'Madurai',
    departure: '20:00', arrival: '03:30', duration: '7h 30m',
    price: 699, seatsAvailable: 12, totalSeats: 36,
    busType: 'Sleeper', acType: 'AC',
    amenities: ['WiFi', 'Water', 'Blanket', 'Charging Point', 'Live Tracking'],
    boardingPoints: MAS_MDU_BOARDING, droppingPoints: MAS_MDU_DROPPING,
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
