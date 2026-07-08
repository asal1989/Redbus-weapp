import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { BookingDetails } from '@/lib/types'
import { formatDate, formatTime, formatPrice } from '@/lib/utils'

export async function POST(req: NextRequest) {
  let booking: BookingDetails
  try {
    booking = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const smtpHost = process.env.SMTP_HOST
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS
  const notifyEmail = process.env.NOTIFY_EMAIL

  if (!smtpHost || !smtpUser || !smtpPass || !notifyEmail) {
    // Graceful no-op: just log and return success so the UI confirms
    console.warn('[api/notify] SMTP not configured — skipping email notification')
    console.log('[api/notify] Booking received:', booking.bookingId)
    return NextResponse.json({ ok: true, skipped: true })
  }

  const passengerList = booking.passengers
    .map((p, i) => `  ${i + 1}. ${p.name} (${p.gender === 'M' ? 'Male' : p.gender === 'F' ? 'Female' : 'Other'}, ${p.age} yrs) — Seat ${p.seatId}`)
    .join('\n')

  const emailHtml = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1e293b">
      <div style="background:#1e3a8a;padding:20px 24px;border-radius:8px 8px 0 0">
        <h1 style="color:#fff;margin:0;font-size:20px">🎉 New Bus Booking — ${booking.bookingId}</h1>
      </div>
      <div style="border:1px solid #e2e8f0;border-top:none;padding:24px;border-radius:0 0 8px 8px">
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:6px 0;color:#64748b;width:40%">Booking ID</td><td style="font-weight:600">${booking.bookingId}</td></tr>
          <tr><td style="padding:6px 0;color:#64748b">Route</td><td style="font-weight:600">${booking.from} → ${booking.to}</td></tr>
          <tr><td style="padding:6px 0;color:#64748b">Date</td><td>${formatDate(booking.date)}</td></tr>
          <tr><td style="padding:6px 0;color:#64748b">Operator</td><td>${booking.operator}</td></tr>
          <tr><td style="padding:6px 0;color:#64748b">Bus Type</td><td>${booking.acType} ${booking.busType}</td></tr>
          <tr><td style="padding:6px 0;color:#64748b">Departure</td><td>${formatTime(booking.departure)}</td></tr>
          <tr><td style="padding:6px 0;color:#64748b">Arrival</td><td>${formatTime(booking.arrival)}</td></tr>
          <tr><td style="padding:6px 0;color:#64748b">Seats</td><td>${booking.selectedSeats.join(', ')}</td></tr>
        </table>

        <h3 style="margin:20px 0 8px;font-size:15px">Passengers</h3>
        <pre style="background:#f8fafc;padding:12px;border-radius:6px;font-size:13px;white-space:pre-wrap">${passengerList}</pre>

        <h3 style="margin:20px 0 8px;font-size:15px">Primary Contact</h3>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:4px 0;color:#64748b;width:40%">Name</td><td>${booking.contactName}</td></tr>
          <tr><td style="padding:4px 0;color:#64748b">Email</td><td>${booking.contactEmail}</td></tr>
          <tr><td style="padding:4px 0;color:#64748b">Phone</td><td>${booking.contactPhone}</td></tr>
        </table>

        <div style="margin-top:20px;padding:16px;background:#f0fdf4;border-radius:8px;border:1px solid #bbf7d0">
          <strong style="color:#15803d">Total Amount: ${formatPrice(booking.totalPrice)}</strong>
          <span style="color:#64748b;font-size:13px"> (${formatPrice(booking.pricePerSeat)} × ${booking.selectedSeats.length} seat${booking.selectedSeats.length > 1 ? 's' : ''})</span>
        </div>

        <p style="margin-top:20px;font-size:13px;color:#94a3b8">
          ⚠️ <strong>Action required:</strong> Please update the seat availability in the Google Sheet for bus ${booking.busId}.
        </p>
      </div>
    </div>
  `

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: false,
      auth: { user: smtpUser, pass: smtpPass },
    })

    await transporter.sendMail({
      from: `"Aruljothi Travels Bookings" <${smtpUser}>`,
      to: notifyEmail,
      subject: `New Booking ${booking.bookingId} — ${booking.from} → ${booking.to} on ${formatDate(booking.date)}`,
      html: emailHtml,
      text: `New booking ${booking.bookingId}: ${booking.from} → ${booking.to} | ${booking.contactName} | ${booking.contactPhone} | ${formatPrice(booking.totalPrice)}`,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[api/notify] Email send failed:', err)
    // Return success anyway — the booking succeeded, notification is best-effort
    return NextResponse.json({ ok: true, emailError: 'notification_failed' })
  }
}
