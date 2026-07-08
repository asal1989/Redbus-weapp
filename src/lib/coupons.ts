export interface Coupon {
  code: string
  description: string
  type: 'percent' | 'flat'
  value: number       // percent or flat ₹
  minAmount: number   // minimum order value
  maxDiscount: number // cap on percent discounts
}

export const COUPONS: Coupon[] = [
  { code: 'WELCOME10', description: '10% off your first booking', type: 'percent', value: 10, minAmount: 200, maxDiscount: 150 },
  { code: 'ARULJOTHI20', description: '20% off — Aruljothi Travels special', type: 'percent', value: 20, minAmount: 500, maxDiscount: 300 },
  { code: 'FLAT50', description: 'Flat ₹50 off any booking', type: 'flat', value: 50, minAmount: 150, maxDiscount: 50 },
  { code: 'DIWALI100', description: 'Diwali special — ₹100 off', type: 'flat', value: 100, minAmount: 400, maxDiscount: 100 },
  { code: 'SUMMER15', description: '15% off summer travel', type: 'percent', value: 15, minAmount: 300, maxDiscount: 200 },
]

export function validateCoupon(code: string, amount: number): {
  ok: boolean
  discount?: number
  coupon?: Coupon
  error?: string
} {
  const coupon = COUPONS.find(c => c.code === code.toUpperCase().trim())
  if (!coupon) return { ok: false, error: 'Invalid coupon code' }
  if (amount < coupon.minAmount)
    return { ok: false, error: `Minimum booking amount ₹${coupon.minAmount} required` }

  const discount = coupon.type === 'flat'
    ? coupon.value
    : Math.min(Math.round((amount * coupon.value) / 100), coupon.maxDiscount)

  return { ok: true, discount, coupon }
}
