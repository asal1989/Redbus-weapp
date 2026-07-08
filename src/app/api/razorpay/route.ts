import { NextRequest, NextResponse } from 'next/server'

interface CreateLinkBody {
  amount: number          // in INR
  description: string
  customerName: string
  customerEmail: string
  customerPhone: string
  bookingId: string
}

export async function POST(req: NextRequest) {
  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  if (!keyId || !keySecret) {
    return NextResponse.json(
      { error: 'Razorpay credentials not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.' },
      { status: 503 }
    )
  }

  let body: CreateLinkBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { amount, description, customerName, customerEmail, customerPhone, bookingId } = body

  if (!amount || amount <= 0) {
    return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
  }

  try {
    const credentials = Buffer.from(`${keyId}:${keySecret}`).toString('base64')

    const response = await fetch('https://api.razorpay.com/v1/payment_links', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // Razorpay expects paise
        currency: 'INR',
        description,
        reference_id: bookingId,
        callback_url: `${appUrl}/confirmation?bookingId=${bookingId}`,
        callback_method: 'get',
        customer: {
          name: customerName,
          email: customerEmail,
          contact: customerPhone,
        },
        notify: {
          sms: true,
          email: true,
        },
        reminder_enable: false,
        notes: {
          booking_id: bookingId,
        },
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('[api/razorpay] Razorpay error:', data)
      return NextResponse.json({ error: data?.error?.description || 'Payment link creation failed' }, { status: 502 })
    }

    return NextResponse.json({
      paymentLink: data.short_url,
      paymentLinkId: data.id,
    })
  } catch (err) {
    console.error('[api/razorpay]', err)
    return NextResponse.json({ error: 'Failed to create payment link' }, { status: 500 })
  }
}
