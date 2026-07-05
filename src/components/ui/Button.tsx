import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/src/lib/utils'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const variantClasses: Record<Variant, string> = {
  primary:   'bg-primary text-gray-900 hover:bg-primary-dark',
  secondary: 'bg-secondary text-white hover:bg-secondary-mid',
  outline:   'border border-secondary text-secondary hover:bg-secondary hover:text-white',
  ghost:     'text-secondary hover:bg-surface',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
        'disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
)
Button.displayName = 'Button'

export default Button

export function buttonLinkClass(variant: Variant = 'primary', size: Size = 'md', extra = '') {
  return cn(
    'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
    variantClasses[variant],
    sizeClasses[size],
    extra,
  )
}
