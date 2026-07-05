import { cn } from '@/src/lib/utils'

type BadgeVariant = 'default' | 'primary' | 'muted'

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-surface text-secondary-mid border border-border',
  primary: 'bg-primary-light text-primary border border-primary/20',
  muted:   'bg-surface text-muted',
}

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

export default function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
