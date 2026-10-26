import Image from 'next/image'
import { ArrowRight, Camera, ListChecks, MapPinned, MonitorX, Route, Users } from 'lucide-react'
import { ButtonLink, Container } from '@/components/kit'
import { ModuleCard } from '@/components/module-card'
import { MODULES } from '@/lib/modules'

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="overflow-hidden border-b border-border">
      <Container className="grid items-center gap-10 py-14 md:py-20 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
            Built for Indian streets and screens
          </p>
          <h1
            id="hero-title"
            className="mt-5 text-balance text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl"
          >
            A More Accessible World Starts Here.
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            AccessSaathi brings together simple tools to read text aloud, speak typed messages, adjust how websites
            look, and share footpath hazards with your community — so more people can move and read with confidence.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/tools" size="lg">
              Explore Accessibility Tools
              <ArrowRight aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/reports" size="lg" variant="outline">
              Explore Community Reports
            </ButtonLink>
          </div>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-border pt-6">
            {[
              ['4', 'Accessibility modules'],
              ['2', 'Languages: English, Hindi'],
              ['0', 'Accounts needed'],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd className="text-2xl font-semibold text-primary">{value}</dd>
                <dd className="mt-1 text-xs leading-snug text-muted-foreground" aria-hidden="true">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative">
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-border bg-secondary shadow-sm">
            <Image
              src="/images/hero-map.png"
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-4 left-4 right-4 flex items-center gap-3 rounded-xl border border-border bg-card/95 p-4 shadow-md backdrop-blur sm:left-auto sm:right-6 sm:w-72">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
              <MapPinned className="size-5" aria-hidden="true" />
            </span>
            <p className="text-sm leading-snug">
              <span className="font-semibold">Community-mapped hazards</span>
              <span className="block text-muted-foreground">Sample reports from 6 Indian cities</span>
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}

export function ProblemSection() {
  const items = [
    {
      icon: Route,
      title: 'Footpaths that are not walkable',
      body: 'Open drains, missing paver blocks and parked vehicles push pedestrians onto busy roads — riskiest for blind and low-vision people, wheelchair users and older adults.',
    },
    {
      icon: MonitorX,
      title: 'Digital information that excludes',
      body: 'Small text, low contrast and pages that need a mouse make public information hard to reach, especially in Hindi and regional languages.',
    },
    {
      icon: Users,
      title: 'Communication barriers',
      body: 'People who are deaf, hard of hearing or non-speaking often lack simple tools to be understood in everyday situations.',
    },
  ]
  return (
    <section aria-labelledby="problem-title" className="py-16 md:py-24">
      <Container>
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">The problem</p>
          <h2 id="problem-title" className="mt-2 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Accessibility gaps show up on the street and on the screen.
          </h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {items.map(({ icon: Icon, title, body }) => (
            <div key={title} className="border-t-2 border-primary pt-5">
              <Icon className="size-6 text-primary" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export function ModulesPreview() {
  return (
    <section aria-labelledby="modules-title" className="border-y border-border bg-secondary/40 py-16 md:py-24">
      <Container>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">Four modules</p>
            <h2 id="modules-title" className="mt-2 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              One platform, four ways to make things more accessible.
            </h2>
          </div>
          <ButtonLink href="/tools" variant="outline">
            View all tools
          </ButtonLink>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {MODULES.map((m) => (
            <ModuleCard key={m.slug} module={m} />
          ))}
        </div>
      </Container>
    </section>
  )
}

export function HowItWorks() {
  const steps = [
    {
      icon: ListChecks,
      title: 'Choose a tool',
      body: 'Pick what you need — listen to text, speak a message, or adjust the interface.',
    },
    {
      icon: Camera,
      title: 'Share what you see',
      body: 'Spot a hazard on a footpath? Add a category, photo and location in under a minute.',
    },
    {
      icon: MapPinned,
      title: 'Help your community',
      body: 'Reports are reviewed and tracked from Pending to Verified to Resolved.',
    },
  ]
  return (
    <section aria-labelledby="how-title" className="py-16 md:py-24">
      <Container>
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">How it works</p>
          <h2 id="how-title" className="mt-2 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Simple steps, no sign-up required.
          </h2>
        </div>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, body }, i) => (
            <li key={title} className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  {i + 1}
                </span>
                <Icon className="size-5 text-accent" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-xs text-muted-foreground">
          In this prototype, review and status changes are illustrated with sample data — no live moderation is running
          yet.
        </p>
      </Container>
    </section>
  )
}

export function CtaBand() {
  return (
    <section aria-labelledby="cta-title" className="pb-16 md:pb-24">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-primary p-8 text-primary-foreground md:flex-row md:items-center md:p-12">
          <div className="max-w-xl">
            <h2 id="cta-title" className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">
              Make this site work the way you need it to.
            </h2>
            <p className="mt-2 text-primary-foreground/80">
              Larger text, high contrast, calmer motion and stronger focus outlines — in one place.
            </p>
          </div>
          <ButtonLink
            href="/settings"
            size="lg"
            variant="secondary"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          >
            Open Accessibility Settings
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
