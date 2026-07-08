import Link from 'next/link'
import { Bus, Phone, Mail, Shield } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-brand-700 p-1.5 rounded-lg">
                <Bus className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-bold text-lg">BusGo India</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Fast, reliable bus ticket booking across India. Compare hundreds of operators and travel comfortably.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Book Tickets</Link></li>
              <li><Link href="/#faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/#how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="tel:+911800000000" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Phone className="w-3.5 h-3.5 shrink-0" />
                  1800-000-0000 (Toll free)
                </a>
              </li>
              <li>
                <a href="mailto:support@busgo.in" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  support@busgo.in
                </a>
              </li>
            </ul>
          </div>

          {/* Trust */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Safe & Secure</h3>
            <div className="flex items-start gap-2 text-sm">
              <Shield className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
              <p className="text-slate-400">Payments secured by Razorpay. Your data is encrypted and safe.</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} BusGo India. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <Shield className="w-3 h-3 text-green-500" />
            <span>Razorpay Secured Payments</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
