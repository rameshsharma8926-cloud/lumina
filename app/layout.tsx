import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { DM_Sans } from 'next/font/google'
import { AccessibilityProvider } from '@/lib/accessibility-context'
import { ReportsProvider } from '@/lib/reports-context'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import './globals.css'

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans', display: 'swap' })

export const metadata: Metadata = {
  title: {
    default: 'AccessSaathi 360 AI — A More Accessible World Starts Here',
    template: '%s · AccessSaathi 360 AI',
  },
  description:
    'An inclusive accessibility platform for India: footpath hazard awareness, read-aloud tools, communication accessibility and interface settings.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#1f4d3a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${dmSans.variable} bg-background`}>
      <body className="flex min-h-dvh flex-col font-sans antialiased">
        <AccessibilityProvider>
          <ReportsProvider>
            <a
              href="#main"
              className="skip-link absolute left-4 top-0 z-50 -translate-y-full rounded-b-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus:translate-y-0"
            >
              Skip to main content
            </a>
            <SiteHeader />
            <main id="main" tabIndex={-1} className="flex-1 outline-none">
              {children}
            </main>
            <SiteFooter />
          </ReportsProvider>
        </AccessibilityProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
