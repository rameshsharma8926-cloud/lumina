import type { Metadata } from 'next'
import { Plus } from 'lucide-react'
import { Alert, ButtonLink, Container, PageHeader } from '@/components/kit'
import { ReportsBrowser } from '@/components/reports/reports-browser'

export const metadata: Metadata = {
  title: 'Community Reports',
  description: 'Browse and filter footpath hazard reports across Indian cities.',
}

export default function ReportsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Community reports"
        title="Footpath hazards, shared by people who walk them"
        description="Search and filter reports by category and status. Open any report for details."
      >
        <ButtonLink href="/reports/new">
          <Plus aria-hidden="true" />
          Submit a Report
        </ButtonLink>
      </PageHeader>
      <Container className="py-10 md:py-14">
        <Alert tone="warning" title="Demo data" className="mb-6">
          Reports marked &ldquo;Sample&rdquo; are illustrative data for this prototype. Reports you submit appear only in
          your current browser session and are not shared with anyone.
        </Alert>
        <ReportsBrowser />
      </Container>
    </>
  )
}
