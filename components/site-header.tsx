'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Menu, SlidersHorizontal, X } from 'lucide-react'
import { Logo } from './logo'
import { Container, buttonClass } from './kit'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/tools', label: 'Explore Tools' },
  { href: '/reports', label: 'Community Reports' },
  { href: '/about', label: 'About' },
]

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname.startsWith(href)
}

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    menuRef.current?.querySelector<HTMLAnchorElement>('a')?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="rounded-lg" aria-label="AccessSaathi 360 AI home">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                  className={cn(
                    'rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground',
                    'aria-[current=page]:bg-secondary aria-[current=page]:text-secondary-foreground',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/settings"
            aria-current={pathname.startsWith('/settings') ? 'page' : undefined}
            className={buttonClass('ghost', 'sm', 'hidden sm:inline-flex aria-[current=page]:bg-secondary')}
          >
            <SlidersHorizontal aria-hidden="true" />
            <span className="hidden xl:inline">Accessibility Settings</span>
            <span className="sr-only xl:hidden">Accessibility Settings</span>
          </Link>
          <Link href="/tools" className={buttonClass('primary', 'sm', 'hidden sm:inline-flex')}>
            Get Started
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className={buttonClass('outline', 'sm', 'lg:hidden')}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <span className="icon-label" aria-hidden="true">
              Menu
            </span>
          </button>
        </div>
      </Container>

      {open && (
        <div id="mobile-menu" ref={menuRef} className="border-t border-border bg-background lg:hidden">
          <nav aria-label="Mobile">
            <Container className="flex flex-col gap-1 py-4">
              {[...NAV, { href: '/settings', label: 'Accessibility Settings' }].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                  className="rounded-lg px-3 py-3 text-base font-medium hover:bg-secondary aria-[current=page]:bg-secondary aria-[current=page]:text-secondary-foreground"
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/tools" className={buttonClass('primary', 'md', 'mt-2')}>
                Get Started
              </Link>
            </Container>
          </nav>
        </div>
      )}
    </header>
  )
}
