import { NextRequest, NextResponse } from 'next/server'
import { getAllManagedTrips, saveManagedTrip, deleteManagedTrip, ManagedTrip } from '@/lib/trips'

function checkAuth(req: NextRequest) {
  const pwd = process.env.ADMIN_PASSWORD || 'admin123'
  return req.cookies.get('admin_token')?.value === pwd
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  return NextResponse.json(getAllManagedTrips())
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const trip: ManagedTrip = await req.json()
  if (!trip.id) trip.id = 'AJ-' + Date.now().toString(36).toUpperCase()
  saveManagedTrip(trip)
  return NextResponse.json({ ok: true, trip })
}

export async function PUT(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const trip: ManagedTrip = await req.json()
  if (!trip.id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  saveManagedTrip(trip)
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await req.json()
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  deleteManagedTrip(id)
  return NextResponse.json({ ok: true })
}
