'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { buttonLinkClass } from '@/src/components/ui/Button'

const SLIDE_IMGS = [
  'https://picsum.photos/seed/hero-main/1920/1080',
  'https://picsum.photos/seed/hero-earth/1920/1080',
  'https://picsum.photos/seed/hero-crane/1920/1080',
  'https://picsum.photos/seed/hero-road/1920/1080',
] as const

const SLIDE_COUNT = SLIDE_IMGS.length
const INTERVAL_MS = 2500

function ChevronLeftIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M15 18l-6-6 6-6" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}

export default function HeroSlider() {
  const t = useTranslations('Hero')
  // `tick` increments on every navigation so the active slide's image wrapper
  // gets a new key, forcing remount and restarting the zoom animation.
  const [sliderState, setSliderState] = useState({ current: 0, tick: 0 })
  const { current } = sliderState
  const [paused, setPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const slides = SLIDE_IMGS.map((img, i) => ({
    img,
    title: t(`slide${i + 1}Title`),
    subtitle: t(`slide${i + 1}Subtitle`),
  }))

  const goTo = (idx: number) => {
    setSliderState(prev => ({
      current: ((idx % SLIDE_COUNT) + SLIDE_COUNT) % SLIDE_COUNT,
      tick: prev.tick + 1,
    }))
  }
  const next = () => goTo(current + 1)
  const prev = () => goTo(current - 1)

  useEffect(() => {
    if (paused) return
    intervalRef.current = setInterval(() => {
      setSliderState(prev => ({
        current: (prev.current + 1) % SLIDE_COUNT,
        tick: prev.tick + 1,
      }))
    }, INTERVAL_MS)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [paused])

  const handleManualNav = (fn: () => void) => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    fn()
    if (!paused) {
      intervalRef.current = setInterval(() => {
        setSliderState(prev => ({
          current: (prev.current + 1) % SLIDE_COUNT,
          tick: prev.tick + 1,
        }))
      }, INTERVAL_MS)
    }
  }

  return (
    <section
      className="relative w-full h-[750px] md:h-screen min-h-[540px] overflow-hidden bg-gray-900"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label={t('ctaCatalog')}
    >
      {/* Sliding track */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out will-change-transform"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className="relative flex-shrink-0 w-full h-full"
            aria-roledescription="slide"
            aria-label={t('slideOf', { current: idx + 1, total: slides.length })}
            aria-hidden={idx !== current}
          >
            {/* Photo — wrapper key changes on each activation to restart zoom */}
            <div
              key={idx === current ? sliderState.tick : `still-${idx}`}
              className={`absolute inset-0${idx === current ? ' animate-[hero-zoom_5s_ease-out_forwards]' : ''}`}
            >
              <Image
                src={slide.img}
                alt={slide.title.replace('\n', ' ')}
                fill
                priority={idx === 0}
                className="object-cover"
                sizes="100vw"
              />
            </div>

            {/* Dark gradient — stronger on left for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        ))}
      </div>

      {/* Text content — outside the track so it doesn't slide */}
      <div className="absolute inset-0 flex items-center pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div key={current} className="animate-[slide-in_0.5s_ease-out]">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight whitespace-pre-line">
              {slides[current].title}
            </h1>
            <p className="mt-4 md:mt-6 text-base sm:text-lg text-white/80 max-w-xl leading-relaxed whitespace-pre-line">
              {slides[current].subtitle}
            </p>
            <div className="mt-8 md:mt-10 flex flex-wrap gap-4 pointer-events-auto">
              <a href="#catalog" className={buttonLinkClass('primary', 'lg')}>
                {t('ctaCatalog')}
              </a>
              <a
                href="#contact"
                className="inline-flex items-center px-6 py-3 rounded-full text-base font-medium border-2 border-white/50 text-white hover:border-white hover:bg-white/10 transition-colors"
              >
                {t('ctaContact')}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Prev / Next arrows — desktop only ───────────────── */}
      <button
        onClick={() => handleManualNav(prev)}
        aria-label={t('prev')}
        className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm text-white items-center justify-center transition-all duration-200 hover:scale-110"
      >
        <ChevronLeftIcon />
      </button>
      <button
        onClick={() => handleManualNav(next)}
        aria-label={t('next')}
        className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm text-white items-center justify-center transition-all duration-200 hover:scale-110"
      >
        <ChevronRightIcon />
      </button>

      {/* ── Bottom bar: dots + mobile-next + counter ─────────── */}
      <div className="absolute bottom-8 inset-x-0 px-6 lg:px-8 max-w-7xl mx-auto flex items-center justify-between">
        {/* Dot indicators */}
        <div className="flex items-center gap-2" role="tablist">
          {slides.map((_, idx) => (
            <button
              key={idx}
              role="tab"
              aria-selected={idx === current}
              aria-label={t('slideOf', { current: idx + 1, total: slides.length })}
              onClick={() => handleManualNav(() => goTo(idx))}
              className={`rounded-full transition-all duration-300 ${idx === current
                  ? 'w-8 h-2.5 bg-primary'
                  : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
                }`}
            />
          ))}
        </div>

        {/* Next button — mobile only, centered between dots and counter */}
        <button
          onClick={() => handleManualNav(next)}
          aria-label={t('next')}
          className="md:hidden text-xs flex items-center gap-1.5 px-5 py-2 border rounded-full border-white/50 text-white text-sm font-medium hover:bg-white/10 active:bg-white/20 transition-colors"
        >
          {t('next')}
          <ChevronRightIcon />
        </button>

        {/* Slide counter */}
        <span className="text-white/50 text-sm font-medium tabular-nums">
          {String(current + 1).padStart(2, '0')}&thinsp;/&thinsp;{String(slides.length).padStart(2, '0')}
        </span>
      </div>
    </section>
  )
}
