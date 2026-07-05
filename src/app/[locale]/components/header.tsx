'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import LanguageSwitcher from './language_switcher'
import Image from 'next/image'

export default function Navigation() {
  const t = useTranslations('Nav')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const navLinks = [
    { label: t('catalog'), href: '#catalog' },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      style={{ viewTransitionName: 'site-header' }}
      className={`fixed top-0 left-0 right-0 z-[200] h-16 lg:h-20 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${scrolled ? 'bg-white backdrop-blur-sm shadow-sm' : 'bg-white'
        }`}
    >
      <nav
        aria-label="Main navigation"
        className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center h-16 lg:h-20"
      >
        {/* Left: Logo */}
        <div className="flex-1 flex items-center">
          <Link
            href="/"
            aria-label="SpecTehnoGroup-home"
            className="relative w-24 h-10 md:w-32 md:h-12 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/logo.png"
              alt="СпецТехноГрупп"
              fill
              sizes="(max-width: 768px) 96px, 128px"
              className="object-contain"
              priority
            />
          </Link>
        </div>

        {/* Center: Desktop nav links */}
        <ul
          role="list"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600"
        >
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <a href={href} className="hover:text-zinc-900 transition-colors">
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right: controls */}
        <div className="flex-1 flex items-center justify-end">
          {/* Desktop: language switcher + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <a
              href="#contact"
              className="inline-flex items-center whitespace-nowrap px-5 py-2.5 rounded-full bg-primary text-gray-900 text-sm font-medium hover:bg-primary-dark transition-colors"
            >
              {t('contact')}
            </a>
          </div>
          {/* Mobile: language switcher + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher dropdown />
            <button
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="flex flex-col justify-center items-center w-10 h-10 gap-1.5"
            >
              <span className={`block h-0.5 w-6 bg-zinc-900 transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 w-6 bg-zinc-900 transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-6 bg-zinc-900 transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        className={`md:hidden bg-white border-t border-zinc-100 overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-96' : 'max-h-0'
          }`}
      >
        <ul role="list" className="flex flex-col px-6 py-4 gap-4 text-sm font-medium text-zinc-700">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                onClick={() => setMenuOpen(false)}
                className="block py-1 hover:text-zinc-900 transition-colors"
              >
                {label}
              </a>
            </li>
          ))}
          {/* <li className="pt-2">
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center px-5 py-2.5 rounded-full bg-primary text-gray-900 text-sm font-medium hover:bg-primary-dark transition-colors"
            >
              {t('contact')}
            </a>
          </li> */}
        </ul>
      </div>
    </header>
  )
}
