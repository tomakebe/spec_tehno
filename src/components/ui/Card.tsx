import { cn } from '@/src/lib/utils'

interface CardProps {
  children: React.ReactNode
  hover?: boolean
  className?: string
}

export default function Card({ children, hover = false, className }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl border border-border p-6',
        hover && 'transition-all duration-200 hover:shadow-md hover:border-primary/30',
        className,
      )}
    >
      {children}
    </div>
  )
}
