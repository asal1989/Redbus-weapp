export interface BusTrip {
  id: string
  operator: string
  from: string
  to: string
  departure: string       // "HH:MM" 24-hour format, e.g. "06:00"
  arrival: string         // "HH:MM" 24-hour format
  duration: string        // Human readable, e.g. "4h 30m"
  price: number           // Per seat in INR
  seatsAvailable: number  // Manually updated in Google Sheet
  totalSeats: number
  busType: 'Sleeper' | 'Seater' | 'Semi-Sleeper'
  acType: 'AC' | 'Non-AC'
  amenities: string[]     // e.g. ["WiFi", "Water", "Charging Point"]
  razorpayLink?: string   // Optional static payment link from sheet
}

export interface Seat {
  id: string            // e.g. "3A"
  row: number
  col: 'A' | 'B' | 'C' | 'D'
  status: 'available' | 'booked' | 'selected'
}

export interface Passenger {
  seatId: string
  name: string
  age: string
  gender: 'M' | 'F' | 'O'
}

export interface BookingDetails {
  busId: string
  operator: string
  from: string
  to: string
  date: string
  departure: string
  arrival: string
  duration: string
  busType: string
  acType: string
  amenities: string[]
  selectedSeats: string[]
  passengers: Passenger[]
  contactName: string
  contactEmail: string
  contactPhone: string
  pricePerSeat: number
  totalPrice: number
  bookingId: string
}

export interface SearchFilters {
  priceMax: number
  departureSots: string[]  // "early", "morning", "afternoon", "evening"
  busTypes: string[]       // "Sleeper", "Seater", "Semi-Sleeper"
  acTypes: string[]        // "AC", "Non-AC"
}
