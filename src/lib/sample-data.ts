import { BusTrip } from './types'

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

// ── New inter-city routes ─────────────────────────────────────────────────────

const MAS_BLR_BOARDING = [
  { time: '22:00', name: 'Koyambedu CMBT', address: 'Chennai Mofussil Bus Terminus, Platform 18' },
  { time: '22:20', name: 'Guindy', address: 'Guindy Bus Stand, Anna Salai' },
  { time: '22:50', name: 'Tambaram', address: 'Tambaram Bus Terminus, GST Road' },
]
const MAS_BLR_DROPPING = [
  { time: '05:00', name: 'Majestic', address: 'Kempegowda Bus Station, Bengaluru' },
  { time: '05:30', name: 'Silk Board', address: 'Silk Board Junction, Bengaluru' },
  { time: '05:50', name: 'Electronic City', address: 'Electronic City Phase 1, Bengaluru' },
]

const CBE_MAS_BOARDING = [
  { time: '21:00', name: 'Gandhipuram', address: 'Gandhipuram Central Bus Stand, Coimbatore' },
  { time: '21:20', name: 'Ukkadam', address: 'Ukkadam Bus Terminus, Coimbatore' },
  { time: '21:45', name: 'Pollachi', address: 'Pollachi Bus Stand, Coimbatore District' },
]
const CBE_MAS_DROPPING = [
  { time: '06:00', name: 'Tambaram', address: 'Tambaram Bus Terminus, GST Road' },
  { time: '06:30', name: 'Guindy', address: 'Guindy Bus Stand, Anna Salai' },
  { time: '07:00', name: 'Koyambedu CMBT', address: 'Chennai Mofussil Bus Terminus' },
]

const MDU_TRY_BOARDING = [
  { time: '07:00', name: 'Madurai Periyar Bus Stand', address: 'Periyar Bus Stand, Madurai' },
  { time: '07:20', name: 'Madurai Anna Nagar', address: 'Anna Nagar Bus Stop, Madurai' },
]
const MDU_TRY_DROPPING = [
  { time: '09:30', name: 'Trichy Central Bus Stand', address: 'Central Bus Stand, Trichy' },
  { time: '09:50', name: 'Srirangam', address: 'Srirangam Bus Stop, Trichy' },
]

const HYD_BLR_BOARDING = [
  { time: '21:00', name: 'Majestic / MGBS', address: 'Mahatma Gandhi Bus Station, Hyderabad' },
  { time: '21:30', name: 'LB Nagar', address: 'LB Nagar Bus Stop, Hyderabad' },
]
const HYD_BLR_DROPPING = [
  { time: '06:30', name: 'Majestic', address: 'Kempegowda Bus Station, Bengaluru' },
  { time: '07:00', name: 'Hebbal', address: 'Hebbal Flyover, Bengaluru' },
]

const PUNE_MUM_BOARDING = [
  { time: '06:00', name: 'Pune Station', address: 'Pune Railway Station Bus Stop' },
  { time: '06:30', name: 'Hinjewadi', address: 'Hinjewadi Phase 1, Pune' },
]
const PUNE_MUM_DROPPING = [
  { time: '09:00', name: 'Dadar', address: 'Dadar Bus Depot, Mumbai' },
  { time: '09:30', name: 'Bandra', address: 'Bandra (West) Bus Stop, Mumbai' },
]

export const SAMPLE_TRIPS: BusTrip[] = [
  { id: 'BUS001', operator: 'Aruljothi Travels', from: 'Chennai', to: 'Madurai', departure: '21:00', arrival: '04:30', duration: '7h 30m', price: 550, seatsAvailable: 28, totalSeats: 40, busType: 'Seater', acType: 'AC', amenities: ['Water', 'Charging Point'], boardingPoints: MAS_MDU_BOARDING, droppingPoints: MAS_MDU_DROPPING },
  { id: 'BUS002', operator: 'Aruljothi Travels', from: 'Chennai', to: 'Coimbatore', departure: '20:30', arrival: '05:30', duration: '9h 0m', price: 650, seatsAvailable: 18, totalSeats: 36, busType: 'Sleeper', acType: 'AC', amenities: ['WiFi', 'Water', 'Blanket', 'Charging Point'], boardingPoints: MAS_CBE_BOARDING, droppingPoints: MAS_CBE_DROPPING },
  { id: 'BUS003', operator: 'Aruljothi Travels', from: 'Chennai', to: 'Coimbatore', departure: '22:00', arrival: '07:00', duration: '9h 0m', price: 480, seatsAvailable: 32, totalSeats: 40, busType: 'Seater', acType: 'AC', amenities: ['Water', 'Charging Point'], boardingPoints: MAS_CBE_BOARDING, droppingPoints: MAS_CBE_DROPPING },
  { id: 'BUS004', operator: 'Aruljothi Travels', from: 'Chennai', to: 'Tiruchirappalli', departure: '22:00', arrival: '05:00', duration: '7h 0m', price: 500, seatsAvailable: 24, totalSeats: 40, busType: 'Seater', acType: 'AC', amenities: ['Water', 'Charging Point'], boardingPoints: MAS_TRY_BOARDING, droppingPoints: MAS_TRY_DROPPING },
  { id: 'BUS005', operator: 'Aruljothi Travels', from: 'Chennai', to: 'Tiruchirappalli', departure: '21:30', arrival: '04:30', duration: '7h 0m', price: 680, seatsAvailable: 10, totalSeats: 36, busType: 'Sleeper', acType: 'AC', amenities: ['WiFi', 'Water', 'Blanket', 'Charging Point'], boardingPoints: MAS_TRY_BOARDING, droppingPoints: MAS_TRY_DROPPING },
  { id: 'BUS006', operator: 'Aruljothi Travels', from: 'Madurai', to: 'Coimbatore', departure: '07:00', arrival: '11:30', duration: '4h 30m', price: 350, seatsAvailable: 30, totalSeats: 40, busType: 'Seater', acType: 'AC', amenities: ['Water', 'Charging Point'], boardingPoints: MDU_CBE_BOARDING, droppingPoints: MDU_CBE_DROPPING },
  { id: 'BUS007', operator: 'Aruljothi Travels', from: 'Madurai', to: 'Coimbatore', departure: '22:30', arrival: '03:00', duration: '4h 30m', price: 520, seatsAvailable: 14, totalSeats: 36, busType: 'Semi-Sleeper', acType: 'AC', amenities: ['Water', 'Blanket', 'Charging Point'], boardingPoints: MDU_CBE_BOARDING, droppingPoints: MDU_CBE_DROPPING },
  { id: 'BUS008', operator: 'Aruljothi Travels', from: 'Chennai', to: 'Salem', departure: '21:30', arrival: '04:00', duration: '6h 30m', price: 420, seatsAvailable: 28, totalSeats: 40, busType: 'Seater', acType: 'AC', amenities: ['Water', 'Charging Point'], boardingPoints: MAS_SLM_BOARDING, droppingPoints: MAS_SLM_DROPPING },
  { id: 'BUS009', operator: 'Aruljothi Travels', from: 'Chennai', to: 'Salem', departure: '23:00', arrival: '05:30', duration: '6h 30m', price: 580, seatsAvailable: 8, totalSeats: 36, busType: 'Sleeper', acType: 'AC', amenities: ['WiFi', 'Water', 'Blanket', 'Charging Point'], boardingPoints: MAS_SLM_BOARDING, droppingPoints: MAS_SLM_DROPPING },
  { id: 'BUS010', operator: 'Aruljothi Travels', from: 'Coimbatore', to: 'Madurai', departure: '22:00', arrival: '03:00', duration: '5h 0m', price: 380, seatsAvailable: 22, totalSeats: 40, busType: 'Seater', acType: 'AC', amenities: ['Water', 'Charging Point'], boardingPoints: CBE_MDU_BOARDING, droppingPoints: CBE_MDU_DROPPING },
  { id: 'BUS011', operator: 'Aruljothi Travels', from: 'Coimbatore', to: 'Madurai', departure: '06:30', arrival: '11:30', duration: '5h 0m', price: 350, seatsAvailable: 36, totalSeats: 40, busType: 'Seater', acType: 'Non-AC', amenities: ['Water'], boardingPoints: CBE_MDU_BOARDING, droppingPoints: CBE_MDU_DROPPING },
  // Chennai → Bengaluru
  { id: 'BUS012', operator: 'Aruljothi Travels', from: 'Chennai', to: 'Bengaluru', departure: '22:00', arrival: '05:30', duration: '7h 30m', price: 599, seatsAvailable: 24, totalSeats: 40, busType: 'Sleeper', acType: 'AC', amenities: ['WiFi', 'Water', 'Blanket', 'Charging Point'], boardingPoints: MAS_BLR_BOARDING, droppingPoints: MAS_BLR_DROPPING },
  { id: 'BUS013', operator: 'Aruljothi Travels', from: 'Chennai', to: 'Bengaluru', departure: '21:30', arrival: '05:00', duration: '7h 30m', price: 750, seatsAvailable: 12, totalSeats: 36, busType: 'Sleeper', acType: 'AC', amenities: ['WiFi', 'Water', 'Blanket', 'Charging Point', 'Movie'], boardingPoints: MAS_BLR_BOARDING, droppingPoints: MAS_BLR_DROPPING },
  { id: 'BUS014', operator: 'Aruljothi Travels', from: 'Chennai', to: 'Bengaluru', departure: '23:00', arrival: '06:30', duration: '7h 30m', price: 480, seatsAvailable: 32, totalSeats: 40, busType: 'Seater', acType: 'AC', amenities: ['Water', 'Charging Point'], boardingPoints: MAS_BLR_BOARDING, droppingPoints: MAS_BLR_DROPPING },
  // Coimbatore → Chennai
  { id: 'BUS015', operator: 'Aruljothi Travels', from: 'Coimbatore', to: 'Chennai', departure: '21:00', arrival: '06:30', duration: '9h 30m', price: 499, seatsAvailable: 28, totalSeats: 40, busType: 'Seater', acType: 'AC', amenities: ['Water', 'Charging Point'], boardingPoints: CBE_MAS_BOARDING, droppingPoints: CBE_MAS_DROPPING },
  { id: 'BUS016', operator: 'Aruljothi Travels', from: 'Coimbatore', to: 'Chennai', departure: '20:00', arrival: '05:30', duration: '9h 30m', price: 699, seatsAvailable: 14, totalSeats: 36, busType: 'Sleeper', acType: 'AC', amenities: ['WiFi', 'Water', 'Blanket', 'Charging Point'], boardingPoints: CBE_MAS_BOARDING, droppingPoints: CBE_MAS_DROPPING },
  // Madurai → Trichy
  { id: 'BUS017', operator: 'Aruljothi Travels', from: 'Madurai', to: 'Trichy', departure: '07:00', arrival: '09:30', duration: '2h 30m', price: 440, seatsAvailable: 30, totalSeats: 40, busType: 'Seater', acType: 'AC', amenities: ['Water', 'Charging Point'], boardingPoints: MDU_TRY_BOARDING, droppingPoints: MDU_TRY_DROPPING },
  { id: 'BUS018', operator: 'Aruljothi Travels', from: 'Madurai', to: 'Trichy', departure: '14:00', arrival: '16:30', duration: '2h 30m', price: 380, seatsAvailable: 36, totalSeats: 40, busType: 'Seater', acType: 'Non-AC', amenities: ['Water'], boardingPoints: MDU_TRY_BOARDING, droppingPoints: MDU_TRY_DROPPING },
  // Hyderabad → Bengaluru
  { id: 'BUS019', operator: 'Aruljothi Travels', from: 'Hyderabad', to: 'Bengaluru', departure: '21:00', arrival: '06:30', duration: '9h 30m', price: 699, seatsAvailable: 20, totalSeats: 40, busType: 'Sleeper', acType: 'AC', amenities: ['WiFi', 'Water', 'Blanket', 'Charging Point'], boardingPoints: HYD_BLR_BOARDING, droppingPoints: HYD_BLR_DROPPING },
  { id: 'BUS020', operator: 'Aruljothi Travels', from: 'Hyderabad', to: 'Bengaluru', departure: '22:00', arrival: '07:30', duration: '9h 30m', price: 550, seatsAvailable: 34, totalSeats: 40, busType: 'Seater', acType: 'AC', amenities: ['Water', 'Charging Point'], boardingPoints: HYD_BLR_BOARDING, droppingPoints: HYD_BLR_DROPPING },
  // Pune → Mumbai
  { id: 'BUS021', operator: 'Aruljothi Travels', from: 'Pune', to: 'Mumbai', departure: '06:00', arrival: '09:00', duration: '3h 0m', price: 399, seatsAvailable: 38, totalSeats: 40, busType: 'Seater', acType: 'AC', amenities: ['Water', 'Charging Point'], boardingPoints: PUNE_MUM_BOARDING, droppingPoints: PUNE_MUM_DROPPING },
  { id: 'BUS022', operator: 'Aruljothi Travels', from: 'Pune', to: 'Mumbai', departure: '08:30', arrival: '11:30', duration: '3h 0m', price: 450, seatsAvailable: 22, totalSeats: 40, busType: 'Seater', acType: 'AC', amenities: ['WiFi', 'Water', 'Charging Point'], boardingPoints: PUNE_MUM_BOARDING, droppingPoints: PUNE_MUM_DROPPING },
]
