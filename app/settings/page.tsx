import type { Metadata } from 'next'
import { Container, PageHeader } from '@/components/kit'
import { SettingsPanel } from '@/components/settings/settings-panel'

export const metadata: Metadata = {
  title: 'Sparsh-UI — Accessibility Settings',
  description: 'Adjust text size, contrast, motion, focus indicators and labels across AccessSaathi.',
}

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Sparsh-UI"
        title="Accessibility settings"
        description="Make AccessSaathi easier to read and use. Every change applies instantly across all pages."
      />
      <Container className="py-10 md:py-14">
        <SettingsPanel />
      </Container>
    </>
  )
}
