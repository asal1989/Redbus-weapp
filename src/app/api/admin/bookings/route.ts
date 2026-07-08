import { NextRequest, NextResponse } from 'next/server'
import { readFileSync, existsSync } from 'fs'
import path from 'path'
import { BookingRecord } from '@/lib/bookings'

function checkAuth(req: NextRequest) {
  const pwd = process.env.ADMIN_PASSWORD || 'admin123'
  const token = req.cookies.get('admin_token')?.value
  return token === pwd
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const file = path.join(process.cwd(), 'data', 'bookings.json')
    const records: BookingRecord[] = existsSync(file) ? JSON.parse(readFileSync(file, 'utf-8')) : []
    return NextResponse.json(records)
  } catch {
    return NextResponse.json([], { status: 200 })
  }
}
