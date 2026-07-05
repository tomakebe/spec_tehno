'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const LOCALES = [
  { code: 'ru', label: 'RU' },
  { code: 'kg', label: 'KY' },
  { code: 'en', label: 'EN' },
]

interface Props {
  dropdown?: boolean
}

export default function LanguageSwitcher({ dropdown }: Props) {
  const pathname = usePathname()
  const router = useRouter()
  const currentLocale = pathname.split('/')[1]
  const [optimisticLocale, setOptimisticLocale] = useState(currentLocale)
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => { setOptimisticLocale(currentLocale) }, [currentLocale])

  useEffect(() => {
    if (!dropdown) return
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [dropdown])

  const activeIndex = LOCALES.findIndex(l => l.code === optimisticLocale)

  const changeLanguage = (locale: string) => {
    const targetIndex = LOCALES.findIndex(l => l.code === locale)
    const currentIndex = LOCALES.findIndex(l => l.code === optimisticLocale)
    const type = targetIndex > currentIndex ? 'lang-forward' : 'lang-back'
    setOptimisticLocale(locale)
    setOpen(false)
    const segments = pathname.split('/')
    segments[1] = locale
    // @ts-ignore — transitionTypes is a React 19 / Next 16 feature
    router.push(segments.join('/'), { transitionTypes: [type] })
  }

  if (dropdown) {
    const active = LOCALES.find(l => l.code === optimisticLocale)
    return (
      <div ref={containerRef} className="relative">
        <button
          onClick={() => setOpen(o => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-zinc-200 text-xs font-semibold text-zinc-700 hover:border-zinc-300 transition-colors"
        >
          {active?.label}
          <svg
            width="11" height="11" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            aria-hidden
          >
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </button>

        <div
          role="listbox"
          className={`absolute right-0 top-full mt-1.5 min-w-[4rem] rounded-xl border border-zinc-100 bg-white shadow-lg overflow-hidden z-50 transition-all duration-200 origin-top ${
            open ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-95 pointer-events-none'
          }`}
        >
          {LOCALES.map(({ code, label }) => (
            <button
              key={code}
              role="option"
              aria-selected={optimisticLocale === code}
              onClick={() => changeLanguage(code)}
              className={`w-full px-4 py-2 text-xs font-semibold text-left transition-colors ${
                optimisticLocale === code
                  ? 'bg-primary text-gray-900'
                  : 'text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    )
  }

  // Desktop: sliding pill
  return (
    <div className="rounded-full border border-zinc-200 p-0.5">
      <div className="relative flex items-center overflow-hidden rounded-full">
        <div
          className="absolute inset-y-0 rounded-full bg-primary transition-transform duration-200 ease-out"
          style={{
            width: `${100 / LOCALES.length}%`,
            transform: `translateX(${activeIndex * 100}%)`,
          }}
        />
        {LOCALES.map(({ code, label }) => (
          <button
            key={code}
            onClick={() => changeLanguage(code)}
            aria-label={`Switch language to ${label}`}
            aria-pressed={currentLocale === code}
            className="relative z-10 flex-1 px-3 py-1 text-xs font-semibold text-zinc-700"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
