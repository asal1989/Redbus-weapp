'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (!res.ok) { setError('Invalid password'); return }
      router.replace('/admin')
    } catch {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8">
        <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center mx-auto mb-4">
          <Lock className="w-6 h-6 text-brand-700" />
        </div>
        <h1 className="text-xl font-bold text-slate-900 text-center mb-1">Admin Login</h1>
        <p className="text-sm text-slate-500 text-center mb-6">Aruljothi Travels — Operator Dashboard</p>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
          placeholder="Enter admin password"
          className="w-full border-2 border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-brand-500 mb-3"
          autoFocus
        />
        {error && <p className="text-red-600 text-sm mb-3 font-medium">{error}</p>}
        <button
          onClick={handleLogin}
          disabled={!password || loading}
          className="w-full bg-brand-700 hover:bg-brand-800 disabled:opacity-50 text-white font-bold py-3 rounded-xl text-sm transition-colors"
        >
          {loading ? 'Logging in…' : 'Login'}
        </button>
        <p className="text-xs text-slate-400 text-center mt-4">Default password: <code>admin123</code> (set ADMIN_PASSWORD env var)</p>
      </div>
    </div>
  )
}
