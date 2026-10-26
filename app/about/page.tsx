import type { Metadata } from 'next'
import { CheckCircle2, CircleDashed, FlaskConical } from 'lucide-react'
import { ButtonLink, Card, Container, PageHeader } from '@/components/kit'

export const metadata: Metadata = {
  title: 'About the Project',
  description: 'Why AccessSaathi 360 AI exists, and what is functional, simulated or planned.',
}

type Status = 'Functional' | 'Simulated' | 'Planned'

const FEATURES: { feature: string; module: string; status: Status; note: string }[] = [
  { feature: 'Read aloud with pause, resume, stop', module: 'Dhwani-Sarthi', status: 'Functional', note: 'Browser Web Speech API' },
  { feature: 'Language and speech-rate settings', module: 'Dhwani-Sarthi', status: 'Functional', note: 'Depends on voices installed on your device' },
  { feature: 'Type-to-speak and quick phrases', module: 'Vani-Chitra', status: 'Functional', note: 'English and Hindi' },
  { feature: 'Sign-language recognition', module: 'Vani-Chitra', status: 'Planned', note: 'No model integrated' },
  { feature: 'Text size, contrast, motion, focus, labels', module: 'Sparsh-UI', status: 'Functional', note: 'Saved for the browser session' },
  { feature: 'Search and filter reports', module: 'Community Reports', status: 'Functional', note: 'Runs in the browser' },
  { feature: 'Submit a report with photo and geolocation', module: 'RaahDrishti', status: 'Simulated', note: 'Kept in session only; nothing uploaded' },
  { feature: 'Sample hazard reports and statuses', module: 'RaahDrishti', status: 'Simulated', note: 'Clearly labelled demo data' },
  { feature: 'Report verification workflow', module: 'RaahDrishti', status: 'Planned', note: 'Requires a backend and moderators' },
  { feature: 'Map view of reports', module: 'RaahDrishti', status: 'Planned', note: 'UI prepared for a mapping service' },
  { feature: 'AI hazard detection from photos', module: 'RaahDrishti', status: 'Planned', note: 'Not implemented' },
]

const STATUS_ICON = { Functional: CheckCircle2, Simulated: FlaskConical, Planned: CircleDashed }

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About the project"
        title="Accessibility that starts with honesty"
        description="AccessSaathi 360 AI is a prototype exploring how simple, well-designed tools can make streets and screens more usable for people with disabilities in India."
      />
      <Container className="flex flex-col gap-14 py-10 md:py-14">
        <section aria-labelledby="why-title" className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 id="why-title" className="text-2xl font-semibold tracking-tight">
              Why we built this
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              India is home to tens of millions of people with disabilities, yet footpaths are often broken or
              encroached and much public information is published in ways that are hard to read or hear. Saathi means
              companion — we want these tools to feel like one.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Our principles</h2>
            <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 leading-relaxed text-muted-foreground">
              <li>Never claim a feature works when it does not.</li>
              <li>Label demo data clearly, everywhere.</li>
              <li>Design for keyboards, screen readers and low-end phones first.</li>
              <li>Respect privacy — process on the device wherever possible.</li>
            </ul>
          </div>
        </section>

        <section aria-labelledby="feature-status-title" id="feature-status" className="scroll-mt-24">
          <h2 id="feature-status-title" className="text-2xl font-semibold tracking-tight">
            Feature status
          </h2>
          <p className="mt-1 text-muted-foreground">What works today, what is simulated, and what is planned.</p>
          <Card className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <caption className="sr-only">Feature status by module</caption>
              <thead className="border-b border-border bg-muted/50">
                <tr>
                  <th scope="col" className="px-5 py-3 font-semibold">Feature</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Module</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Status</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {FEATURES.map((f) => {
                  const Icon = STATUS_ICON[f.status]
                  return (
                    <tr key={f.feature}>
                      <th scope="row" className="px-5 py-3 font-medium">{f.feature}</th>
                      <td className="px-5 py-3 text-muted-foreground">{f.module}</td>
                      <td className="px-5 py-3">
                        <span className="inline-flex items-center gap-1.5 font-medium">
                          <Icon className="size-4 text-primary" aria-hidden="true" />
                          {f.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-muted-foreground">{f.note}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </Card>
        </section>

        <section aria-labelledby="safety-title" className="rounded-2xl bg-primary p-8 text-primary-foreground md:p-12">
          <h2 id="safety-title" className="text-2xl font-semibold tracking-tight">
            A note on safety
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-primary-foreground/85">
            Hazard reports are created by people and may be outdated or incomplete. AccessSaathi does not guarantee
            safe navigation. Please continue to use your usual mobility aids, routes and judgement.
          </p>
          <ButtonLink
            href="/tools"
            variant="secondary"
            className="mt-6 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          >
            Explore the tools
          </ButtonLink>
        </section>
      </Container>
    </>
  )
}
