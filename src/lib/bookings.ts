import fs from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'bookings.json')

export interface BookingRecord {
  bookingId: string
  busId: string
  date: string
  seats: string[]
  status: 'confirmed' | 'cancelled'
  cancelRef?: string
  cancelledAt?: string
  bookedAt: string
  // Full booking details for ticket generation
  operator: string
  from: string
  to: string
  departure: string
  arrival: string
  duration: string
  busType: string
  acType: string
  passengers: { name: string; age: string; gender: string; seatId: string }[]
  contactName: string
  contactEmail: string
  contactPhone: string
  pricePerSeat: number
  totalPrice: number
  boardingPoint?: { time: string; name: string; address: string }
  droppingPoint?: { time: string; name: string; address: string }
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
  return readAll()
    .filter(r => r.busId === busId && r.date === date && r.status === 'confirmed')
    .flatMap(r => r.seats)
}

export function getBookingCount(busId: string, date: string): number {
  return getBookedSeats(busId, date).length
}

export function bookSeats(record: Omit<BookingRecord, 'status' | 'bookedAt'>): boolean {
  const records = readAll()
  const alreadyBooked = records
    .filter(r => r.busId === record.busId && r.date === record.date && r.status === 'confirmed')
    .flatMap(r => r.seats)

  if (record.seats.some(s => alreadyBooked.includes(s))) return false

  records.push({ ...record, status: 'confirmed', bookedAt: new Date().toISOString() })
  writeAll(records)
  return true
}

export function getBookingById(bookingId: string): BookingRecord | null {
  return readAll().find(r => r.bookingId === bookingId) ?? null
}

export function cancelBooking(bookingId: string, phone: string): { ok: boolean; cancelRef?: string; error?: string } {
  const records = readAll()
  const idx = records.findIndex(r => r.bookingId === bookingId)
  if (idx === -1) return { ok: false, error: 'Booking not found' }

  const record = records[idx]
  if (record.contactPhone.replace(/\D/g, '').slice(-10) !== phone.replace(/\D/g, '').slice(-10)) {
    return { ok: false, error: 'Phone number does not match booking' }
  }
  if (record.status === 'cancelled') return { ok: false, error: 'Booking already cancelled' }

  const cancelRef = 'CXL' + Date.now().toString(36).toUpperCase()
  records[idx] = { ...record, status: 'cancelled', cancelRef, cancelledAt: new Date().toISOString() }
  writeAll(records)
  return { ok: true, cancelRef }
}
