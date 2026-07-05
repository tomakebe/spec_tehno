import { cn } from '@/src/lib/utils'

interface SectionHeaderProps {
  id?: string
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
}

export default function SectionHeader({ id, title, subtitle, centered = false, className }: SectionHeaderProps) {
  return (
    <div className={cn(centered && 'text-center', className)}>
      <h2 id={id} className="text-2xl md:text-4xl font-bold text-secondary tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className={cn('mt-3 text-muted text-xm max-w-2xl', centered && 'mx-auto')}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
