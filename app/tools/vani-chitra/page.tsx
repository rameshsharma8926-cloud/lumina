import type { Metadata } from 'next'
import { BookOpenText, Hand, Video } from 'lucide-react'
import { Alert, ComingSoonBadge, Container, PageHeader } from '@/components/kit'
import { SpeakMessage } from '@/components/speech/speak-message'

export const metadata: Metadata = {
  title: 'Vani-Chitra — Communication Accessibility',
  description: 'Speak typed messages aloud in English or Hindi. Sign recognition is planned.',
}

const PLANNED = [
  {
    icon: Video,
    title: 'Sign recognition',
    body: 'Recognising Indian Sign Language (ISL) gestures from a camera and turning them into text.',
  },
  {
    icon: Hand,
    title: 'ISL learning cards',
    body: 'Short visual guides to common everyday signs for family members, shopkeepers and staff.',
  },
  {
    icon: BookOpenText,
    title: 'Regional languages',
    body: 'Speaking support for more Indian languages such as Tamil, Bengali and Marathi.',
  },
]

export default function VaniChitraPage() {
  return (
    <>
      <PageHeader
        eyebrow="Vani-Chitra"
        title="Communication accessibility"
        description="Tools that help people who are deaf, hard of hearing or non-speaking be understood in everyday moments."
      />
      <Container className="flex flex-col gap-10 py-10 md:py-14">
        <SpeakMessage />

        <section aria-labelledby="sign-title">
          <div className="flex flex-wrap items-center gap-3">
            <h2 id="sign-title" className="text-2xl font-semibold tracking-tight">
              Sign recognition
            </h2>
            <ComingSoonBadge />
          </div>
          <Alert tone="info" className="mt-4 max-w-3xl">
            Sign recognition is <strong>not available yet</strong>. The text-to-speech tool above speaks what you type —
            it does not read or translate sign language.
          </Alert>
          <ul className="mt-6 grid gap-5 md:grid-cols-3">
            {PLANNED.map(({ icon: Icon, title, body }) => (
              <li key={title} className="rounded-xl border border-dashed border-border bg-card p-6">
                <div className="flex items-center justify-between">
                  <Icon className="size-5 text-muted-foreground" aria-hidden="true" />
                  <span className="text-xs font-medium text-muted-foreground">Planned</span>
                </div>
                <h3 className="mt-4 font-semibold">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </>
  )
}
