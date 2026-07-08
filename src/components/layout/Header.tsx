'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Phone, ChevronDown, User } from 'lucide-react'
import LangToggle from '@/components/ui/LangToggle'

const NAV = [
  { label: 'Home', href: '/' },
  { label: 'Book Tickets', href: '/' },
  { label: 'My Bookings', href: '/cancel' },
  { label: 'Offers', href: '/' },
  { label: 'Help', href: 'tel:+911800123456' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 bg-accent-500 rounded-xl flex items-center justify-center shadow-sm">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 16c0 .88.39 1.67 1 2.22V20a1 1 0 001 1h1a1 1 0 001-1v-1h8v1a1 1 0 001 1h1a1 1 0 001-1v-1.78A2.99 2.99 0 0020 16V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm9 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM4 9h16v5H4V9zm0-3c0-.5 1.5-1 8-1s8 .5 8 1v2H4V6z"/>
              </svg>
            </div>
            <span className="text-xl font-extrabold tracking-tight">
              <span className="text-brand-900">Aruljothi</span>
              <span className="text-accent-500"> Travels</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-brand-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right controls */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Phone */}
            <a href="tel:+911800123456" className="flex items-center gap-2 text-slate-700 hover:text-brand-700 transition-colors">
              <div className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center">
                <Phone className="w-4 h-4 text-brand-700" />
              </div>
              <div>
                <div className="text-xs text-slate-400 leading-none">24/7 Support</div>
                <div className="text-sm font-bold text-slate-800 leading-tight">1800 123 4567</div>
              </div>
            </a>

            {/* Lang toggle */}
            <LangToggle />

            {/* User */}
            <button className="w-9 h-9 rounded-full bg-brand-700 flex items-center justify-center hover:bg-brand-800 transition-colors">
              <User className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden border-t border-slate-100 py-3 space-y-1">
            {NAV.map(({ label, href }) => (
              <Link key={label} href={href} onClick={() => setOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm text-slate-700 hover:bg-slate-50 font-medium">
                {label}
              </Link>
            ))}
            <div className="px-3 py-2 flex items-center gap-3">
              <a href="tel:+911800123456" className="flex items-center gap-2 text-sm text-slate-700">
                <Phone className="w-4 h-4" /> 1800 123 4567
              </a>
            </div>
            <div className="px-3 py-2"><LangToggle /></div>
          </div>
        )}
      </div>
    </header>
  )
}
