import { cn } from '@/lib/utils'

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn('size-8', className)} aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="9" className="fill-primary" />
      <circle cx="16" cy="16" r="10" fill="none" strokeWidth="1.5" strokeDasharray="2.5 2.5" className="stroke-primary-foreground/50" />
      <circle cx="16" cy="9.5" r="2.4" className="fill-primary-foreground" />
      <path
        d="M10 13.5h12M16 13.5v5.5m0 0-3.5 5.5M16 19l3.5 5.5"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-primary-foreground"
      />
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark />
      <span className="whitespace-nowrap text-base font-semibold tracking-tight">
        AccessSaathi <span className="text-accent">360</span>{' '}
        <span className="text-muted-foreground">AI</span>
      </span>
    </span>
  )
}
