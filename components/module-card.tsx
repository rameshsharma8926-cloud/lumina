import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import type { ModuleInfo } from '@/lib/modules'

export function ModuleCard({ module }: { module: ModuleInfo }) {
  const Icon = module.icon
  return (
    <article className="group relative flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md focus-within:ring-2 focus-within:ring-ring">
      <div className="flex items-start justify-between gap-4">
        <span className="flex size-11 items-center justify-center rounded-lg bg-secondary text-primary">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <span className="rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
          {module.status}
        </span>
      </div>
      <h3 className="mt-5 text-lg font-semibold">
        <Link href={module.href} className="outline-none after:absolute after:inset-0 after:rounded-xl">
          {module.name}
        </Link>
      </h3>
      <p className="text-sm font-medium text-accent">{module.tagline}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{module.description}</p>
      <ul className="mt-4 flex flex-col gap-1.5">
        {module.features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-sm">
            <Check className="size-3.5 text-accent" aria-hidden="true" />
            {f}
          </li>
        ))}
      </ul>
      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary" aria-hidden="true">
        Open {module.name}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </article>
  )
}
