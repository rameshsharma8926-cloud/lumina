'use client'

import Link from 'next/link'
import { ArrowLeft, CalendarDays, CheckCircle2, Circle, FileQuestion, MapPin } from 'lucide-react'
import { Alert, ButtonLink, Card, Container, DemoBadge, StatusBadge } from '@/components/kit'
import { useReports } from '@/lib/reports-context'
import { HAZARD_CATEGORIES, STATUS_LABELS, formatReportDate, type ReportStatus } from '@/lib/hazards'
import { cn } from '@/lib/utils'

const STEPS: ReportStatus[] = ['pending', 'verified', 'resolved']

export function ReportDetail({ id }: { id: string }) {
  const { getReport, isLoading } = useReports()
  const report = getReport(id)

  if (isLoading) {
    return (
      <Container className="py-16">
        <p role="status">Loading report…</p>
      </Container>
    )
  }

  if (!report) {
    return (
      <Container className="flex flex-col items-center py-20 text-center">
        <FileQuestion className="size-10 text-muted-foreground" aria-hidden="true" />
        <h1 className="mt-4 text-2xl font-semibold">Report not found</h1>
        <p className="mt-2 max-w-md text-muted-foreground">
          This report may have been from an earlier browser session. Session reports are cleared when the tab closes.
        </p>
        <ButtonLink href="/reports" className="mt-6">
          Back to Community Reports
        </ButtonLink>
      </Container>
    )
  }

  const currentStep = STEPS.indexOf(report.status)

  return (
    <Container className="py-10 md:py-14">
      <Link
        href="/reports"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        All reports
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={report.status} />
            {report.isDemo ? <DemoBadge label="Sample report" /> : <DemoBadge label="Your session only" />}
          </div>
          <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-accent">
            {HAZARD_CATEGORIES[report.category].label}
          </p>
          <h1 className="mt-1 text-balance text-3xl font-semibold tracking-tight">{report.title}</h1>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <MapPin className="size-4" aria-hidden="true" />
              <span className="sr-only">Location: </span>
              {report.locationLabel}
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDays className="size-4" aria-hidden="true" />
              <span className="sr-only">Reported on </span>
              <time dateTime={report.date}>{formatReportDate(report.date)}</time>
            </span>
          </div>

          <div className="mt-6 overflow-hidden rounded-xl border border-border bg-muted">
            {report.photo ? (
              // eslint-disable-next-line @next/next/no-img-element -- supports in-session blob: URLs
              <img src={report.photo} alt={report.photoAlt ?? ''} className="aspect-[16/10] w-full object-cover" />
            ) : (
              <p className="flex aspect-[16/10] items-center justify-center text-sm text-muted-foreground">
                No photo provided
              </p>
            )}
          </div>

          <h2 className="mt-8 text-lg font-semibold">Description</h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            {report.description || 'No description was added.'}
          </p>
        </div>

        <aside className="flex flex-col gap-5" aria-label="Report status and location">
          <Card className="p-6">
            <h2 className="text-base font-semibold">Report progress</h2>
            <ol className="mt-5 flex flex-col gap-4">
              {STEPS.map((step, i) => {
                const done = i <= currentStep
                return (
                  <li key={step} className="flex items-center gap-3">
                    {done ? (
                      <CheckCircle2 className="size-5 text-primary" aria-hidden="true" />
                    ) : (
                      <Circle className="size-5 text-muted-foreground" aria-hidden="true" />
                    )}
                    <span className={cn('text-sm', done ? 'font-medium' : 'text-muted-foreground')}>
                      {STATUS_LABELS[step]}
                      <span className="sr-only">{i === currentStep ? ' (current)' : done ? ' (done)' : ' (not yet)'}</span>
                    </span>
                  </li>
                )
              })}
            </ol>
            <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
              Statuses on sample reports are illustrative. No live review process is connected yet.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-base font-semibold">Location</h2>
            <p className="mt-2 text-sm text-muted-foreground">{report.locationLabel}</p>
            {report.coordinates && (
              <p className="mt-1 font-mono text-xs text-muted-foreground">
                {report.coordinates.lat}, {report.coordinates.lng}
              </p>
            )}
            <div className="mt-4 flex aspect-video items-center justify-center rounded-lg border border-dashed border-border bg-secondary/40 p-4 text-center text-xs text-muted-foreground">
              Map preview will appear here once a mapping service is connected.
            </div>
          </Card>

          <Alert tone="warning">
            Information here may be outdated or incomplete. It does not guarantee a route is safe.
          </Alert>
        </aside>
      </div>
    </Container>
  )
}
