'use client'

import { useMemo, useState } from 'react'
import { Search, SearchX } from 'lucide-react'
import { ButtonLink, buttonClass, fieldClass, labelClass } from '@/components/kit'
import { ReportCard, ReportCardSkeleton } from './report-card'
import { useReports } from '@/lib/reports-context'
import { cn } from '@/lib/utils'
import { HAZARD_CATEGORIES, STATUS_LABELS, type HazardCategory, type ReportStatus } from '@/lib/hazards'

export function ReportsBrowser({ limit, initialCategory }: { limit?: number; initialCategory?: HazardCategory }) {
  const { reports, isLoading } = useReports()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<HazardCategory | 'all'>(initialCategory ?? 'all')
  const [status, setStatus] = useState<ReportStatus | 'all'>('all')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return reports.filter((r) => {
      if (category !== 'all' && r.category !== category) return false
      if (status !== 'all' && r.status !== status) return false
      if (!q) return true
      return [r.title, r.description, r.locationLabel].some((s) => s.toLowerCase().includes(q))
    })
  }, [reports, query, category, status])

  const visible = limit ? filtered.slice(0, limit) : filtered
  const hasFilters = query !== '' || category !== 'all' || status !== 'all'

  const clear = () => {
    setQuery('')
    setCategory('all')
    setStatus('all')
  }

  return (
    <div>
      {!limit && (
      <form
        role="search"
        aria-label="Filter hazard reports"
        onSubmit={(e) => e.preventDefault()}
        className="grid gap-4 rounded-xl border border-border bg-card p-4 md:grid-cols-[1fr_200px_200px_auto] md:items-end"
      >
        <div>
          <label htmlFor="report-search" className={labelClass}>
            Search
          </label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              id="report-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Title, description or area"
              className={`${fieldClass} pl-9`}
            />
          </div>
        </div>
        <div>
          <label htmlFor="report-category" className={labelClass}>
            Hazard category
          </label>
          <select
            id="report-category"
            value={category}
            onChange={(e) => setCategory(e.target.value as HazardCategory | 'all')}
            className={fieldClass}
          >
            <option value="all">All categories</option>
            {Object.entries(HAZARD_CATEGORIES).map(([value, { label }]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="report-status" className={labelClass}>
            Status
          </label>
          <select
            id="report-status"
            value={status}
            onChange={(e) => setStatus(e.target.value as ReportStatus | 'all')}
            className={fieldClass}
          >
            <option value="all">All statuses</option>
            {Object.entries(STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <button type="button" onClick={clear} disabled={!hasFilters} className={buttonClass('ghost', 'md')}>
          Clear filters
        </button>
      </form>
      )}

      <p className={cn('text-sm text-muted-foreground', limit ? 'sr-only' : 'mt-6')} role="status" aria-live="polite">
        {isLoading
          ? 'Loading reports…'
          : `Showing ${visible.length} of ${filtered.length} matching report${filtered.length === 1 ? '' : 's'}`}
      </p>

      {isLoading ? (
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <ReportCardSkeleton key={i} />
          ))}
        </div>
      ) : visible.length === 0 ? (
        <div className="mt-4 flex flex-col items-center rounded-xl border border-dashed border-border bg-card px-6 py-14 text-center">
          <SearchX className="size-8 text-muted-foreground" aria-hidden="true" />
          <h3 className="mt-4 text-lg font-semibold">No reports match these filters</h3>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Try a different search term or category — or be the first to report a hazard here.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={clear} className={buttonClass('outline')}>
              Clear filters
            </button>
            <ButtonLink href="/reports/new">Submit a Report</ButtonLink>
          </div>
        </div>
      ) : (
        <ul className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((r) => (
            <li key={r.id} className="flex">
              <div className="flex w-full">
                <ReportCard report={r} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
