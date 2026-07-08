import { NextRequest, NextResponse } from 'next/server'
import { getBookingById } from '@/lib/bookings'
import QRCode from 'qrcode'

function fmt12h(t: string) {
  const [h, m] = t.split(':').map(Number)
  const ampm = h >= 12 ? 'PM' : 'AM'
  return `${((h % 12) || 12)}:${String(m).padStart(2, '0')} ${ampm}`
}

export async function GET(req: NextRequest) {
  const bookingId = req.nextUrl.searchParams.get('bookingId') || ''
  if (!bookingId) return new NextResponse('Missing bookingId', { status: 400 })

  const b = getBookingById(bookingId)
  if (!b) return new NextResponse('Booking not found', { status: 404 })

  const qrDataUrl = await QRCode.toDataURL(
    `Booking: ${b.bookingId} | ${b.from}→${b.to} | ${b.date} | Seats: ${b.seats.join(',')}`,
    { width: 160, margin: 1, color: { dark: '#1e3a8a', light: '#ffffff' } }
  )

  const passengerRows = b.passengers.map(p => `
    <tr>
      <td>${p.name}</td>
      <td>${p.gender === 'M' ? 'Male' : p.gender === 'F' ? 'Female' : 'Other'}</td>
      <td>${p.age} yrs</td>
      <td><span class="seat-badge">${p.seatId}</span></td>
    </tr>`).join('')

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Ticket — ${b.bookingId}</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Segoe UI', Arial, sans-serif; background: #f1f5f9; color: #1e293b; }
  .page { max-width: 680px; margin: 24px auto; background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,.10); }
  .header { background: #1e3a8a; color: #fff; padding: 20px 24px; display: flex; justify-content: space-between; align-items: center; }
  .header h1 { font-size: 20px; font-weight: 700; }
  .header .sub { font-size: 12px; opacity: .75; margin-top: 2px; }
  .badge { background: #f97316; color: #fff; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 20px; }
  .route-bar { background: #eff6ff; padding: 16px 24px; display: flex; align-items: center; gap: 12px; border-bottom: 1px solid #dbeafe; }
  .city { text-align: center; }
  .city .time { font-size: 22px; font-weight: 800; color: #1e3a8a; }
  .city .name { font-size: 12px; color: #64748b; margin-top: 2px; }
  .arrow { flex: 1; text-align: center; color: #94a3b8; font-size: 13px; }
  .arrow hr { border: none; border-top: 2px dashed #cbd5e1; margin-bottom: 4px; }
  .body { padding: 20px 24px; }
  .grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; margin-bottom: 18px; }
  .field label { display: block; font-size: 10px; text-transform: uppercase; letter-spacing: .05em; color: #94a3b8; font-weight: 600; margin-bottom: 3px; }
  .field span { font-size: 14px; font-weight: 600; color: #1e293b; }
  .divider { border: none; border-top: 1px dashed #e2e8f0; margin: 16px 0; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  th { text-align: left; padding: 6px 8px; background: #f8fafc; color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: .05em; }
  td { padding: 8px 8px; border-bottom: 1px solid #f1f5f9; }
  .seat-badge { background: #1e3a8a; color: #fff; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; }
  .bottom { display: flex; justify-content: space-between; align-items: flex-end; padding: 16px 24px; background: #f8fafc; border-top: 1px solid #e2e8f0; }
  .total { font-size: 20px; font-weight: 800; color: #1e3a8a; }
  .total label { display: block; font-size: 11px; color: #94a3b8; font-weight: 400; margin-bottom: 2px; }
  .qr img { display: block; }
  .stop { font-size: 12px; color: #475569; }
  .stop strong { color: #1e293b; }
  .cancelled { background: #fee2e2; color: #991b1b; text-align: center; padding: 8px; font-weight: 700; font-size: 13px; }
  @media print {
    body { background: #fff; }
    .page { box-shadow: none; margin: 0; border-radius: 0; }
    .print-btn { display: none !important; }
  }
</style>
</head>
<body>
<div class="page">
  ${b.status === 'cancelled' ? '<div class="cancelled">⚠️ THIS BOOKING HAS BEEN CANCELLED — Ref: ' + b.cancelRef + '</div>' : ''}
  <div class="header">
    <div>
      <h1>Aruljothi Travels</h1>
      <div class="sub">Bus Ticket — ${b.date}</div>
    </div>
    <span class="badge">${b.acType} ${b.busType}</span>
  </div>

  <div class="route-bar">
    <div class="city">
      <div class="time">${fmt12h(b.departure)}</div>
      <div class="name">${b.from}</div>
      ${b.boardingPoint ? `<div class="stop" style="margin-top:4px"><strong>${b.boardingPoint.name}</strong></div>` : ''}
    </div>
    <div class="arrow">
      <hr/>
      ${b.duration}
    </div>
    <div class="city">
      <div class="time">${fmt12h(b.arrival)}</div>
      <div class="name">${b.to}</div>
      ${b.droppingPoint ? `<div class="stop" style="margin-top:4px"><strong>${b.droppingPoint.name}</strong></div>` : ''}
    </div>
  </div>

  <div class="body">
    <div class="grid">
      <div class="field"><label>Booking ID</label><span>${b.bookingId}</span></div>
      <div class="field"><label>Contact</label><span>${b.contactName}</span></div>
      <div class="field"><label>Phone</label><span>${b.contactPhone}</span></div>
      <div class="field"><label>Travel Date</label><span>${b.date}</span></div>
      <div class="field"><label>Seats</label><span>${b.seats.join(', ')}</span></div>
      <div class="field"><label>Booked On</label><span>${new Date(b.bookedAt).toLocaleDateString('en-IN')}</span></div>
    </div>

    <hr class="divider"/>
    <h3 style="font-size:13px;color:#64748b;margin-bottom:10px;text-transform:uppercase;letter-spacing:.05em">Passengers</h3>
    <table>
      <thead><tr><th>Name</th><th>Gender</th><th>Age</th><th>Seat</th></tr></thead>
      <tbody>${passengerRows}</tbody>
    </table>
  </div>

  <div class="bottom">
    <div>
      <div class="total"><label>Total Paid</label>₹${b.totalPrice.toLocaleString('en-IN')}</div>
      <div style="font-size:11px;color:#94a3b8;margin-top:4px">₹${b.pricePerSeat} × ${b.seats.length} seat${b.seats.length > 1 ? 's' : ''}</div>
    </div>
    <div class="qr">
      <img src="${qrDataUrl}" width="100" height="100" alt="QR"/>
    </div>
  </div>
</div>

<div style="text-align:center;margin:16px 0">
  <button class="print-btn" onclick="window.print()"
    style="background:#1e3a8a;color:#fff;border:none;padding:10px 28px;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer">
    ⬇ Download / Print Ticket
  </button>
</div>
</body>
</html>`

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  })
}
