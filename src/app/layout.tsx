import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: 'Aruljothi Travels — Book Bus Tickets Online',
  description:
    'Book bus tickets across Tamil Nadu quickly and securely. Choose your seat and pay online with instant confirmation.',
  keywords: 'bus tickets, Tamil Nadu bus, Aruljothi Travels, online bus booking, Chennai Madurai Coimbatore',
  openGraph: {
    title: 'Aruljothi Travels — Book Bus Tickets Online',
    description: 'Fast, affordable bus ticket booking across Tamil Nadu.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
