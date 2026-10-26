import type { Metadata } from 'next'
import { Container, PageHeader } from '@/components/kit'
import { ModuleCard } from '@/components/module-card'
import { MODULES } from '@/lib/modules'

export const metadata: Metadata = {
  title: 'Explore Tools',
  description: 'RaahDrishti, Vani-Chitra, Dhwani-Sarthi and Sparsh-UI — accessibility tools in one place.',
}

export default function ToolsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Explore tools"
        title="Accessibility tools for everyday life"
        description="Each module is labelled with its current status so you always know what works today and what is planned."
      />
      <Container className="py-12 md:py-16">
        <div className="grid gap-5 sm:grid-cols-2">
          {MODULES.map((m) => (
            <ModuleCard key={m.slug} module={m} />
          ))}
        </div>
      </Container>
    </>
  )
}
