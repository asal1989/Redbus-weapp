import fs from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'bookings.json')

interface BookingRecord {
  busId: string
  date: string
  seats: string[]
  bookingId: string
  bookedAt: string
}

function readAll(): BookingRecord[] {
  try {
    const dir = path.dirname(DATA_FILE)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    if (!fs.existsSync(DATA_FILE)) return []
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'))
  } catch {
    return []
  }
}

function writeAll(records: BookingRecord[]) {
  const dir = path.dirname(DATA_FILE)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(DATA_FILE, JSON.stringify(records, null, 2))
}

export function getBookedSeats(busId: string, date: string): string[] {
  const records = readAll()
  return records
    .filter(r => r.busId === busId && r.date === date)
    .flatMap(r => r.seats)
}

export function bookSeats(busId: string, date: string, seats: string[], bookingId: string): boolean {
  const records = readAll()
  const alreadyBooked = records
    .filter(r => r.busId === busId && r.date === date)
    .flatMap(r => r.seats)

  // Conflict check
  if (seats.some(s => alreadyBooked.includes(s))) return false

  records.push({ busId, date, seats, bookingId, bookedAt: new Date().toISOString() })
  writeAll(records)
  return true
}
