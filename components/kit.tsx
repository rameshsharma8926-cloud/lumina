import Link from 'next/link'
import { AlertCircle, CheckCircle2, Clock, FlaskConical, Info, ShieldCheck, TriangleAlert } from 'lucide-react'
import { cn } from '@/lib/utils'
import { STATUS_LABELS, type ReportStatus } from '@/lib/hazards'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

export function buttonClass(variant: ButtonVariant = 'primary', size: ButtonSize = 'md', className?: string) {
  return cn(
    'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
    'disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0',
    size === 'sm' && 'min-h-9 px-3 text-sm',
    size === 'md' && 'min-h-11 px-4 text-sm',
    size === 'lg' && 'min-h-12 px-5 text-base',
    variant === 'primary' && 'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90',
    variant === 'secondary' && 'bg-secondary text-secondary-foreground hover:bg-secondary/70',
    variant === 'outline' && 'border border-input bg-card text-foreground hover:bg-secondary',
    variant === 'ghost' && 'text-foreground hover:bg-secondary',
    className,
  )
}

export function ButtonLink({
  href,
  variant,
  size,
  className,
  children,
}: {
  href: string
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: React.ReactNode
}) {
  return (
    <Link href={href} className={buttonClass(variant, size, className)}>
      {children}
    </Link>
  )
}

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8', className)}>{children}</div>
}

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string
  title: string
  description?: string
  children?: React.ReactNode
}) {
  return (
    <div className="border-b border-border bg-secondary/40">
      <Container className="py-10 md:py-14">
        {eyebrow && <p className="text-sm font-semibold uppercase tracking-wider text-accent">{eyebrow}</p>}
        <h1 className="mt-2 text-pretty text-3xl font-semibold tracking-tight md:text-4xl">{title}</h1>
        {description && (
          <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-muted-foreground">{description}</p>
        )}
        {children && <div className="mt-6 flex flex-wrap gap-3">{children}</div>}
      </Container>
    </div>
  )
}

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('rounded-xl border border-border bg-card shadow-sm', className)}>{children}</div>
}

type AlertTone = 'info' | 'success' | 'warning' | 'error'

export function Alert({
  tone = 'info',
  title,
  children,
  className,
  live,
}: {
  tone?: AlertTone
  title?: string
  children?: React.ReactNode
  className?: string
  live?: boolean
}) {
  const Icon = { info: Info, success: CheckCircle2, warning: TriangleAlert, error: AlertCircle }[tone]
  return (
    <div
      role={live ? (tone === 'error' ? 'alert' : 'status') : undefined}
      className={cn(
        'flex gap-3 rounded-lg border p-4 text-sm leading-relaxed',
        tone === 'info' && 'border-border bg-secondary/60 text-secondary-foreground',
        tone === 'success' && 'border-success-foreground/30 bg-success text-success-foreground',
        tone === 'warning' && 'border-warning-foreground/30 bg-warning text-warning-foreground',
        tone === 'error' && 'border-destructive/30 bg-destructive/5 text-destructive',
        className,
      )}
    >
      <Icon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <div>
        {title && <p className="font-semibold">{title}</p>}
        {children && <div className={cn(title && 'mt-0.5')}>{children}</div>}
      </div>
    </div>
  )
}

export function DemoBadge({ label = 'Demo data', className }: { label?: string; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border border-warning-foreground/30 bg-warning px-2.5 py-0.5 text-xs font-medium text-warning-foreground',
        className,
      )}
    >
      <FlaskConical className="size-3" aria-hidden="true" />
      {label}
    </span>
  )
}

export function StatusBadge({ status }: { status: ReportStatus }) {
  const Icon = { pending: Clock, verified: ShieldCheck, resolved: CheckCircle2 }[status]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium',
        status === 'pending' && 'border-warning-foreground/30 bg-warning text-warning-foreground',
        status === 'verified' && 'border-primary/30 bg-secondary text-secondary-foreground',
        status === 'resolved' && 'border-border bg-muted text-muted-foreground',
      )}
    >
      <Icon className="size-3" aria-hidden="true" />
      <span>
        <span className="sr-only">Status: </span>
        {STATUS_LABELS[status]}
      </span>
    </span>
  )
}

export function ComingSoonBadge() {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
      Coming soon
    </span>
  )
}

export const fieldClass =
  'w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/80 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring aria-[invalid=true]:border-destructive'

export const labelClass = 'mb-1.5 block text-sm font-medium'
