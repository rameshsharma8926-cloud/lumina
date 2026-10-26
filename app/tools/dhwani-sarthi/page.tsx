import type { Metadata } from 'next'
import { Container, PageHeader } from '@/components/kit'
import { ReadAloud } from '@/components/speech/read-aloud'

export const metadata: Metadata = {
  title: 'Dhwani-Sarthi — Read and Listen',
  description: 'Listen to any text in English or Hindi with play, pause, resume, stop and speed controls.',
}

export default function DhwaniSarthiPage() {
  return (
    <>
      <PageHeader
        eyebrow="Dhwani-Sarthi"
        title="Read and listen"
        description="Paste any text — a notice, a WhatsApp forward, a form — and hear it read aloud at a pace that suits you."
      />
      <Container className="py-10 md:py-14">
        <ReadAloud />
      </Container>
    </>
  )
}
