import { NextRequest, NextResponse } from 'next/server'
import { validateCoupon } from '@/lib/coupons'

export async function POST(req: NextRequest) {
  const { code, amount } = await req.json()
  if (!code || !amount) return NextResponse.json({ ok: false, error: 'Missing code or amount' }, { status: 400 })
  const result = validateCoupon(code, amount)
  return NextResponse.json(result, { status: result.ok ? 200 : 400 })
}
