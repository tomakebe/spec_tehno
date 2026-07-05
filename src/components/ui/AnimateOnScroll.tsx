'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/src/lib/utils'

export type AnimationType = 'fade-up' | 'fade-in' | 'fade-left' | 'fade-right'

interface AnimateOnScrollProps {
  children: React.ReactNode
  animation?: AnimationType
  delay?: number
  className?: string
  threshold?: number
}

const hiddenClasses: Record<AnimationType, string> = {
  'fade-up':    'opacity-0 translate-y-8',
  'fade-in':    'opacity-0',
  'fade-left':  'opacity-0 -translate-x-8',
  'fade-right': 'opacity-0 translate-x-8',
}

export default function AnimateOnScroll({
  children,
  animation = 'fade-up',
  delay = 0,
  className,
  threshold = 0.1,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Respect reduced-motion preference — skip animation entirely
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setMounted(true)
      setInView(true)
      return
    }

    setMounted(true)

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: inView ? `${delay}ms` : '0ms' }}
      className={cn(
        'transition-[opacity,transform] duration-700 ease-out',
        // Apply hidden state only after mount to avoid SSR flash
        mounted && !inView && hiddenClasses[animation],
        className,
      )}
    >
      {children}
    </div>
  )
}
