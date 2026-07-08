export const INDIAN_CITIES = [
  'Chennai', 'Madurai', 'Coimbatore', 'Tiruchirappalli', 'Salem',
  'Tirunelveli', 'Vellore', 'Erode', 'Thoothukudi', 'Dindigul',
  'Thanjavur', 'Kanyakumari', 'Nagercoil', 'Kumbakonam', 'Karur',
  'Ooty', 'Kodaikanal', 'Pollachi', 'Hosur', 'Krishnagiri',
]

export const POPULAR_ROUTES = [
  { from: 'Chennai', to: 'Madurai' },
  { from: 'Chennai', to: 'Coimbatore' },
  { from: 'Chennai', to: 'Tiruchirappalli' },
  { from: 'Madurai', to: 'Coimbatore' },
  { from: 'Chennai', to: 'Salem' },
  { from: 'Coimbatore', to: 'Madurai' },
]

export const DEPARTURE_SLOTS = [
  { id: 'early',     label: 'Before 6 AM',  start: 0,    end: 359  },
  { id: 'morning',   label: '6 AM – 12 PM', start: 360,  end: 719  },
  { id: 'afternoon', label: '12 PM – 6 PM', start: 720,  end: 1079 },
  { id: 'evening',   label: 'After 6 PM',   start: 1080, end: 1439 },
]

export const BUS_TYPES = ['Sleeper', 'Seater', 'Semi-Sleeper'] as const
export const AC_TYPES = ['AC', 'Non-AC'] as const
