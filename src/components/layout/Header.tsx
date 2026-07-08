'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Bus, Menu, X, Phone } from 'lucide-react'
import LangToggle from '@/components/ui/LangToggle'

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-brand-900 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="bg-white/20 p-1.5 rounded-lg">
              <Bus className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              Aruljothi<span className="text-accent-300"> Travels</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-4">
            <Link href="/cancel" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
              Cancel Booking
            </Link>
            <a
              href="tel:+911800000000"
              className="flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              Help
            </a>
            <LangToggle />
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-md text-white/70 hover:bg-white/10 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-white/10 py-3 space-y-1">
            <Link href="/" onClick={() => setOpen(false)} className="block px-3 py-2.5 rounded-lg text-sm text-white/80 hover:bg-white/10">Home</Link>
            <Link href="/cancel" onClick={() => setOpen(false)} className="block px-3 py-2.5 rounded-lg text-sm text-white/80 hover:bg-white/10">Cancel Booking</Link>
            <a href="tel:+911800000000" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-white/80 hover:bg-white/10">
              <Phone className="w-4 h-4" /> Help &amp; Support
            </a>
            <div className="px-3 py-2"><LangToggle /></div>
          </div>
        )}
      </div>
    </header>
  )
}
