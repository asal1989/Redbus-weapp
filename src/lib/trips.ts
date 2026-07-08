import fs from 'fs'
import path from 'path'
import { BusTrip } from './types'
import { SAMPLE_TRIPS } from './sample-data'

const TRIPS_FILE = path.join(process.cwd(), 'data', 'trips.json')

export interface ManagedTrip extends BusTrip {
  active: boolean
  trackingUrl?: string
}

function readAll(): ManagedTrip[] {
  try {
    const dir = path.dirname(TRIPS_FILE)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    if (!fs.existsSync(TRIPS_FILE)) return []
    return JSON.parse(fs.readFileSync(TRIPS_FILE, 'utf-8'))
  } catch {
    return []
  }
}

function writeAll(trips: ManagedTrip[]) {
  const dir = path.dirname(TRIPS_FILE)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(TRIPS_FILE, JSON.stringify(trips, null, 2))
}

export function getAllManagedTrips(): ManagedTrip[] {
  const managed = readAll()
  if (managed.length > 0) return managed
  // Bootstrap from sample data on first access
  return SAMPLE_TRIPS.map(t => ({ ...t, active: true }))
}

export function getManagedTrip(id: string): ManagedTrip | null {
  return getAllManagedTrips().find(t => t.id === id) ?? null
}

export function saveManagedTrip(trip: ManagedTrip): void {
  const all = getAllManagedTrips()
  const idx = all.findIndex(t => t.id === trip.id)
  if (idx >= 0) all[idx] = trip
  else all.push(trip)
  writeAll(all)
}

export function deleteManagedTrip(id: string): void {
  const all = getAllManagedTrips().filter(t => t.id !== id)
  writeAll(all)
}

export function searchManagedTrips(from: string, to: string): ManagedTrip[] {
  return getAllManagedTrips().filter(
    t => t.active &&
      t.from.toLowerCase() === from.toLowerCase() &&
      t.to.toLowerCase() === to.toLowerCase()
  )
}
