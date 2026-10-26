import Link from 'next/link'
import { Logo } from './logo'
import { Container } from './kit'

const GROUPS = [
  {
    title: 'Tools',
    links: [
      { href: '/tools/raahdrishti', label: 'RaahDrishti' },
      { href: '/tools/vani-chitra', label: 'Vani-Chitra' },
      { href: '/tools/dhwani-sarthi', label: 'Dhwani-Sarthi' },
      { href: '/settings', label: 'Sparsh-UI' },
    ],
  },
  {
    title: 'Community',
    links: [
      { href: '/reports', label: 'Community Reports' },
      { href: '/reports/new', label: 'Submit a Report' },
    ],
  },
  {
    title: 'Project',
    links: [
      { href: '/about', label: 'About' },
      { href: '/about#feature-status', label: 'Feature status' },
      { href: '/settings', label: 'Accessibility Settings' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-card">
      <Container className="grid gap-10 py-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            An inclusive accessibility platform designed with Indian users and real-world accessibility challenges in
            mind.
          </p>
        </div>
        {GROUPS.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h2 className="text-sm font-semibold">{group.title}</h2>
            <ul className="mt-3 flex flex-col gap-2">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>
      <div className="border-t border-border">
        <Container className="flex flex-col gap-2 py-6 text-xs leading-relaxed text-muted-foreground md:flex-row md:justify-between">
          <p className="max-w-3xl">
            <strong className="font-semibold text-foreground">Demo disclaimer:</strong> This is a frontend prototype.
            Hazard reports shown are sample data, and reports you submit stay in your browser session only. No AI hazard
            detection or sign recognition is active. This app does not guarantee safe navigation — always use your
            usual mobility aids and judgement.
          </p>
          <p>&copy; {new Date().getFullYear()} AccessSaathi 360 AI</p>
        </Container>
      </div>
    </footer>
  )
}
