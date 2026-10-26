import Link from 'next/link'
import { CalendarDays, ImageOff, MapPin } from 'lucide-react'
import { DemoBadge, StatusBadge } from '@/components/kit'
import { HAZARD_CATEGORIES, formatReportDate, type HazardReport } from '@/lib/hazards'

export function ReportCard({ report }: { report: HazardReport }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md focus-within:ring-2 focus-within:ring-ring">
      <div className="relative aspect-[16/10] bg-muted">
        {report.photo ? (
          // eslint-disable-next-line @next/next/no-img-element -- supports both static and in-session blob: URLs
          <img src={report.photo} alt={report.photoAlt ?? ''} className="size-full object-cover" loading="lazy" />
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-2 text-muted-foreground">
            <ImageOff className="size-6" aria-hidden="true" />
            <span className="text-xs">No photo provided</span>
          </div>
        )}
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <StatusBadge status={report.status} />
          {report.isDemo ? <DemoBadge label="Sample" /> : <DemoBadge label="Your session" />}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">
          {HAZARD_CATEGORIES[report.category].label}
        </p>
        <h3 className="mt-1.5 text-base font-semibold leading-snug">
          <Link href={`/reports/${report.id}`} className="outline-none after:absolute after:inset-0">
            {report.title}
          </Link>
        </h3>
        <div className="mt-auto flex flex-col gap-1.5 pt-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
            <span className="sr-only">Location: </span>
            {report.locationLabel}
          </span>
          <span className="flex items-center gap-1.5">
            <CalendarDays className="size-3.5 shrink-0" aria-hidden="true" />
            <span className="sr-only">Reported on </span>
            <time dateTime={report.date}>{formatReportDate(report.date)}</time>
          </span>
        </div>
      </div>
    </article>
  )
}

export function ReportCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card" aria-hidden="true">
      <div className="aspect-[16/10] animate-pulse bg-muted" />
      <div className="flex flex-col gap-2 p-5">
        <div className="h-3 w-20 animate-pulse rounded bg-muted" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
        <div className="mt-4 h-3 w-1/2 animate-pulse rounded bg-muted" />
      </div>
    </div>
  )
}
