export const INDIAN_CITIES = [
  // Tamil Nadu
  'Chennai', 'Madurai', 'Coimbatore', 'Tiruchirappalli', 'Trichy', 'Salem',
  'Tirunelveli', 'Vellore', 'Erode', 'Thoothukudi', 'Dindigul',
  'Thanjavur', 'Kanyakumari', 'Nagercoil', 'Kumbakonam', 'Karur',
  'Ooty', 'Kodaikanal', 'Pollachi', 'Hosur', 'Krishnagiri',
  // South India
  'Bengaluru', 'Hyderabad', 'Kochi', 'Vijayawada', 'Tirupati',
  // West
  'Pune', 'Mumbai',
  // North
  'Delhi',
]

export const POPULAR_ROUTES = [
  { from: 'Chennai', to: 'Bengaluru' },
  { from: 'Coimbatore', to: 'Chennai' },
  { from: 'Madurai', to: 'Trichy' },
  { from: 'Hyderabad', to: 'Bengaluru' },
  { from: 'Pune', to: 'Mumbai' },
  { from: 'Chennai', to: 'Salem' },
]

export const DEPARTURE_SLOTS = [
  { id: 'early',     label: 'Before 6 AM',  start: 0,    end: 359  },
  { id: 'morning',   label: '6 AM – 12 PM', start: 360,  end: 719  },
  { id: 'afternoon', label: '12 PM – 6 PM', start: 720,  end: 1079 },
  { id: 'evening',   label: 'After 6 PM',   start: 1080, end: 1439 },
]

export const BUS_TYPES = ['Sleeper', 'Seater', 'Semi-Sleeper'] as const
export const AC_TYPES = ['AC', 'Non-AC'] as const
