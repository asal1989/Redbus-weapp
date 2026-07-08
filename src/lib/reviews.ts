import fs from 'fs'
import path from 'path'

const REVIEWS_FILE = path.join(process.cwd(), 'data', 'reviews.json')

export interface Review {
  id: string
  busId: string
  bookingId: string
  rating: number       // 1-5
  comment: string
  passengerName: string
  travelDate: string
  createdAt: string
}

function readAll(): Review[] {
  try {
    const dir = path.dirname(REVIEWS_FILE)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    if (!fs.existsSync(REVIEWS_FILE)) return []
    return JSON.parse(fs.readFileSync(REVIEWS_FILE, 'utf-8'))
  } catch { return [] }
}

function writeAll(r: Review[]) {
  const dir = path.dirname(REVIEWS_FILE)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(REVIEWS_FILE, JSON.stringify(r, null, 2))
}

export function getReviewsForBus(busId: string): Review[] {
  return readAll().filter(r => r.busId === busId).sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

export function getAllReviews(): Review[] {
  return readAll().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function addReview(review: Omit<Review, 'id' | 'createdAt'>): Review {
  const all = readAll()
  const existing = all.find(r => r.bookingId === review.bookingId)
  if (existing) throw new Error('Already reviewed this booking')
  const r: Review = { ...review, id: 'RV' + Date.now().toString(36).toUpperCase(), createdAt: new Date().toISOString() }
  all.push(r)
  writeAll(all)
  return r
}

export function getAverageRating(busId: string): { avg: number; count: number } {
  const reviews = getReviewsForBus(busId)
  if (reviews.length === 0) return { avg: 0, count: 0 }
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
  return { avg: Math.round(avg * 10) / 10, count: reviews.length }
}
