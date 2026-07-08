export const INDIAN_CITIES = [
  'Agra', 'Ahmedabad', 'Aurangabad', 'Bangalore', 'Belgaum',
  'Bhopal', 'Bhubaneswar', 'Chennai', 'Coimbatore', 'Delhi',
  'Dharwad', 'Goa', 'Guntur', 'Hubli', 'Hyderabad',
  'Indore', 'Jaipur', 'Kanpur', 'Kochi', 'Kolkata',
  'Lucknow', 'Madurai', 'Mangalore', 'Mumbai', 'Mysore',
  'Nagpur', 'Nashik', 'Nellore', 'Patna', 'Pune',
  'Ranchi', 'Salem', 'Surat', 'Thiruvananthapuram', 'Tiruchirappalli',
  'Tirupati', 'Vadodara', 'Varanasi', 'Vijayawada', 'Visakhapatnam',
]

export const POPULAR_ROUTES = [
  { from: 'Mumbai', to: 'Pune' },
  { from: 'Bangalore', to: 'Chennai' },
  { from: 'Mumbai', to: 'Goa' },
  { from: 'Delhi', to: 'Jaipur' },
  { from: 'Hyderabad', to: 'Bangalore' },
  { from: 'Chennai', to: 'Madurai' },
]

export const DEPARTURE_SLOTS = [
  { id: 'early',     label: 'Before 6 AM',  start: 0,    end: 359  },
  { id: 'morning',   label: '6 AM – 12 PM', start: 360,  end: 719  },
  { id: 'afternoon', label: '12 PM – 6 PM', start: 720,  end: 1079 },
  { id: 'evening',   label: 'After 6 PM',   start: 1080, end: 1439 },
]

export const BUS_TYPES = ['Sleeper', 'Seater', 'Semi-Sleeper'] as const
export const AC_TYPES = ['AC', 'Non-AC'] as const
