'use client'

import { useState } from 'react'
import { Contrast, Focus, Keyboard, RotateCcw, Tags, Type, Waves } from 'lucide-react'
import { Alert, Card, buttonClass } from '@/components/kit'
import { useAccessibility, type AccessibilitySettings, type TextSize } from '@/lib/accessibility-context'
import { cn } from '@/lib/utils'

type ToggleKey = Exclude<keyof AccessibilitySettings, 'textSize'>

const TOGGLES: { key: ToggleKey; icon: typeof Contrast; title: string; description: string }[] = [
  {
    key: 'highContrast',
    icon: Contrast,
    title: 'High contrast',
    description: 'Pure black text on white, darker borders and underlined links.',
  },
  {
    key: 'reduceMotion',
    icon: Waves,
    title: 'Reduced motion',
    description: 'Turns off transitions and animations across the site.',
  },
  {
    key: 'strongFocus',
    icon: Focus,
    title: 'Clear focus indicators',
    description: 'Thick, high-visibility outlines around whatever has keyboard focus.',
  },
  {
    key: 'keyboardAids',
    icon: Keyboard,
    title: 'Keyboard navigation aid',
    description: 'Always shows the “Skip to main content” link at the top of every page.',
  },
  {
    key: 'showLabels',
    icon: Tags,
    title: 'Show text labels on icon buttons',
    description: 'Adds visible words next to icon-only buttons, matching what screen readers announce.',
  },
]

const TEXT_SIZES: { value: TextSize; label: string; sample: string }[] = [
  { value: 'default', label: 'Default', sample: 'text-base' },
  { value: 'large', label: 'Large', sample: 'text-lg' },
  { value: 'xlarge', label: 'Extra large', sample: 'text-xl' },
]

function Switch({
  id,
  checked,
  onChange,
  labelledBy,
  describedBy,
}: {
  id: string
  checked: boolean
  onChange: (v: boolean) => void
  labelledBy: string
  describedBy: string
}) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border-2 transition-colors',
        checked ? 'border-primary bg-primary' : 'border-input bg-muted',
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'inline-block size-5 rounded-full bg-card shadow transition-transform',
          checked ? 'translate-x-5' : 'translate-x-0.5',
        )}
      />
      <span className="sr-only">{checked ? 'On' : 'Off'}</span>
    </button>
  )
}

export function SettingsPanel() {
  const { settings, update, reset } = useAccessibility()
  const [announcement, setAnnouncement] = useState('')

  const announce = (msg: string) => {
    setAnnouncement('')
    requestAnimationFrame(() => setAnnouncement(msg))
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="flex flex-col gap-6">
        <Card className="p-6">
          <fieldset>
            <legend className="flex items-center gap-2 text-base font-semibold">
              <Type className="size-5 text-primary" aria-hidden="true" />
              Text size
            </legend>
            <p className="mt-1 text-sm text-muted-foreground">Scales all text and spacing on the site.</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {TEXT_SIZES.map((t) => (
                <label
                  key={t.value}
                  className={cn(
                    'flex cursor-pointer flex-col items-center gap-1 rounded-lg border-2 border-input bg-card p-4 transition-colors hover:bg-secondary/50',
                    'has-[:checked]:border-primary has-[:checked]:bg-secondary has-[:checked]:ring-2 has-[:checked]:ring-primary has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring',
                  )}
                >
                  <input
                    type="radio"
                    name="text-size"
                    value={t.value}
                    checked={settings.textSize === t.value}
                    onChange={() => {
                      update('textSize', t.value)
                      announce(`Text size set to ${t.label}`)
                    }}
                    className="sr-only"
                  />
                  <span className={cn('font-semibold', t.sample)} aria-hidden="true">
                    Aa
                  </span>
                  <span className="text-sm">{t.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </Card>

        <Card>
          <ul className="divide-y divide-border">
            {TOGGLES.map(({ key, icon: Icon, title, description }) => (
              <li key={key} className="flex items-start gap-4 p-6">
                <Icon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                <div className="flex-1">
                  <p id={`${key}-label`} className="font-medium">
                    {title}
                  </p>
                  <p id={`${key}-desc`} className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </div>
                <Switch
                  id={`${key}-switch`}
                  checked={settings[key]}
                  labelledBy={`${key}-label`}
                  describedBy={`${key}-desc`}
                  onChange={(v) => {
                    update(key, v)
                    announce(`${title} ${v ? 'on' : 'off'}`)
                  }}
                />
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="flex h-fit flex-col gap-4">
        <Card className="p-6">
          <h2 className="text-base font-semibold">Preview</h2>
          <p className="mt-2 leading-relaxed">
            This paragraph changes as you adjust settings. Try pressing <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-xs">Tab</kbd> to see the focus outline.
          </p>
          <button type="button" className={buttonClass('primary', 'md', 'mt-4 w-full')}>
            Sample button
          </button>
        </Card>
        <Alert tone="info">
          Settings are saved for this browser session and reset when you close the tab. Your system&apos;s
          &ldquo;reduce motion&rdquo; preference is always respected.
        </Alert>
        <button
          type="button"
          onClick={() => {
            reset()
            announce('All accessibility settings reset to default')
          }}
          className={buttonClass('outline', 'md')}
        >
          <RotateCcw aria-hidden="true" />
          Reset to defaults
        </button>
        <p className="sr-only" role="status" aria-live="polite">
          {announcement}
        </p>
      </div>
    </div>
  )
}
