import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Map as MapIcon, Plus } from 'lucide-react'
import { Alert, ButtonLink, ComingSoonBadge, Container, PageHeader } from '@/components/kit'
import { ReportsBrowser } from '@/components/reports/reports-browser'
import { HAZARD_CATEGORIES } from '@/lib/hazards'

export const metadata: Metadata = {
  title: 'RaahDrishti — Footpath Hazard Awareness',
  description: 'Report and explore open drains, potholes, broken pavements and blocked footpaths in Indian cities.',
}

export default function RaahDrishtiPage() {
  return (
    <>
      <PageHeader
        eyebrow="RaahDrishti"
        title="Indian footpath hazard awareness"
        description="Share and explore hazards on footpaths so that people who are blind, use wheelchairs, or walk with children can plan ahead."
      >
        <ButtonLink href="/reports/new">
          <Plus aria-hidden="true" />
          Report a hazard
        </ButtonLink>
        <ButtonLink href="/reports" variant="outline">
          All community reports
        </ButtonLink>
      </PageHeader>

      <Container className="flex flex-col gap-14 py-10 md:py-14">
        <Alert tone="warning" title="Please read">
          RaahDrishti does <strong>not</strong> use AI to detect hazards — reports come from people. Sample reports
          shown here are demo data. This tool cannot guarantee that any route is safe.
        </Alert>

        <section aria-labelledby="categories-title">
          <h2 id="categories-title" className="text-2xl font-semibold tracking-tight">
            Hazard categories
          </h2>
          <p className="mt-1 text-muted-foreground">Choose a category to start a report.</p>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(HAZARD_CATEGORIES).map(([key, cat]) => (
              <li key={key}>
                <Link
                  href={`/reports/new?category=${key}`}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] bg-muted">
                    <Image
                      src={cat.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-semibold">{cat.label}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{cat.description}</p>
                    <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-primary">
                      Report {cat.label.toLowerCase()}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="recent-title">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="recent-title" className="text-2xl font-semibold tracking-tight">
                Recent reports
              </h2>
              <p className="mt-1 text-muted-foreground">Latest hazards, including any you have added this session.</p>
            </div>
            <ButtonLink href="/reports" variant="outline" size="sm">
              View all
            </ButtonLink>
          </div>
          <div className="mt-6">
            <ReportsBrowser limit={3} />
          </div>
        </section>

        <section
          aria-labelledby="map-title"
          className="flex flex-col items-start gap-4 rounded-2xl border border-dashed border-border bg-secondary/40 p-8 md:flex-row md:items-center"
        >
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-card text-primary">
            <MapIcon className="size-6" aria-hidden="true" />
          </span>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 id="map-title" className="text-lg font-semibold">
                Map view
              </h2>
              <ComingSoonBadge />
            </div>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              The interface is prepared for a future mapping service. Once connected, reports with coordinates will
              appear on an accessible map alongside the list view, which will always remain available.
            </p>
          </div>
        </section>
      </Container>
    </>
  )
}
