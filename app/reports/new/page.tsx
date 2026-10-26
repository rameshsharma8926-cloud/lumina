import type { Metadata } from 'next'
import { Card, Container, PageHeader } from '@/components/kit'
import { ReportForm } from '@/components/reports/report-form'
import { HAZARD_CATEGORIES, type HazardCategory } from '@/lib/hazards'

export const metadata: Metadata = {
  title: 'Submit a Report',
  description: 'Report a footpath hazard such as an open drain, pothole, broken pavement or blocked path.',
}

export default async function NewReportPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const initialCategory = category && category in HAZARD_CATEGORIES ? (category as HazardCategory) : undefined

  return (
    <>
      <PageHeader
        eyebrow="RaahDrishti"
        title="Submit a hazard report"
        description="Tell others about a hazard you have seen on a footpath. It takes about a minute."
      />
      <Container className="grid gap-8 py-10 md:py-14 lg:grid-cols-[1fr_320px]">
        <Card className="p-6 md:p-8">
          <ReportForm initialCategory={initialCategory} />
        </Card>
        <aside aria-labelledby="tips-title" className="h-fit rounded-xl border border-border bg-secondary/40 p-6">
          <h2 id="tips-title" className="text-base font-semibold">
            Tips for a useful report
          </h2>
          <ul className="mt-3 flex list-disc flex-col gap-2 pl-4 text-sm leading-relaxed text-muted-foreground">
            <li>Mention a nearby landmark — a shop, bus stop or gate number.</li>
            <li>Describe who is most affected, e.g. wheelchair users or people using a cane.</li>
            <li>Only take photos when it is safe to stop. Avoid capturing faces.</li>
          </ul>
        </aside>
      </Container>
    </>
  )
}
