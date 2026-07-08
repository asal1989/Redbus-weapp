'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'aruljothi_lang'

export function useLang() {
  const [lang, setLangState] = useState<'en' | 'ta'>('en')
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'ta') setLangState('ta')
  }, [])
  function setLang(l: 'en' | 'ta') {
    setLangState(l)
    localStorage.setItem(STORAGE_KEY, l)
  }
  return { lang, setLang }
}

export default function LangToggle() {
  const { lang, setLang } = useLang()
  return (
    <button
      onClick={() => setLang(lang === 'en' ? 'ta' : 'en')}
      title="Switch language / மொழி மாற்று"
      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors select-none"
    >
      <span className="text-base leading-none">{lang === 'en' ? '🇮🇳' : '🇬🇧'}</span>
      <span>{lang === 'en' ? 'தமிழ்' : 'EN'}</span>
    </button>
  )
}
