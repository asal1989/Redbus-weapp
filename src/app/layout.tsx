import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: 'BusGo India — Book Bus Tickets Online',
  description:
    'Book bus tickets across India quickly and securely. Compare operators, choose seats, and pay online with instant confirmation.',
  keywords: 'bus tickets, book bus, India travel, online bus booking, bus reservation',
  openGraph: {
    title: 'BusGo India — Book Bus Tickets Online',
    description: 'Fast, affordable bus ticket booking across India.',
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
