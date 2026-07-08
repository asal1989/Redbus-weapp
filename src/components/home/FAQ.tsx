'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import clsx from 'clsx'

const faqs = [
  {
    q: 'How do I book a bus ticket?',
    a: 'Enter your departure city, destination, and travel date on the homepage. Browse available buses, select your seats, fill in passenger details, and complete payment through our secure Razorpay gateway.',
  },
  {
    q: 'Is my payment secure?',
    a: 'Yes. All payments are processed through Razorpay, a PCI-DSS compliant payment gateway trusted by millions of businesses in India. We never store your card details.',
  },
  {
    q: 'How will I receive my booking confirmation?',
    a: 'After successful payment, you will receive a booking confirmation via email with your booking ID and trip details. Keep this for reference during your journey.',
  },
  {
    q: 'Can I cancel or reschedule my ticket?',
    a: 'Cancellation and rescheduling policies depend on the bus operator. Please contact our support team at least 24 hours before your journey for assistance.',
  },
  {
    q: 'What if the bus is delayed or cancelled?',
    a: 'In case of operator-side cancellations or major delays, our support team will assist you with rebooking or a full refund. Contact us on our helpline.',
  },
  {
    q: 'How do I update seat availability shown on the site?',
    a: 'Our trip data comes from a managed Google Sheet. The operator team updates seat counts in the sheet, and the website reflects the latest information automatically.',
  },
]

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <section id="faq" className="py-14 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Frequently Asked Questions</h2>
          <p className="mt-2 text-slate-500 text-sm">Everything you need to know before booking</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-slate-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-slate-50 transition-colors"
              >
                <span className="font-medium text-slate-900 text-sm sm:text-base">{faq.q}</span>
                <ChevronDown
                  className={clsx(
                    'w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200',
                    openIdx === idx && 'rotate-180'
                  )}
                />
              </button>
              {openIdx === idx && (
                <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed animate-fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
