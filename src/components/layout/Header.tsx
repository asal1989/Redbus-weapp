'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Bus, Menu, X, Phone } from 'lucide-react'

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="bg-brand-800 p-1.5 rounded-lg">
              <Bus className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">
              Aruljothi<span className="text-brand-700"> Travels</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-slate-600 hover:text-brand-700 transition-colors">
              Home
            </Link>
            <a
              href="tel:+911800000000"
              className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-brand-700 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              Help
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-md text-slate-600 hover:bg-slate-100 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-slate-100 py-3 space-y-1 animate-fade-in">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm text-slate-700 hover:bg-slate-50"
            >
              Home
            </Link>
            <a
              href="tel:+911800000000"
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-slate-700 hover:bg-slate-50"
            >
              <Phone className="w-4 h-4" />
              Help &amp; Support
            </a>
          </div>
        )}
      </div>
    </header>
  )
}
