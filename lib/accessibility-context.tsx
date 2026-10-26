'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

export type TextSize = 'default' | 'large' | 'xlarge'

export type AccessibilitySettings = {
  textSize: TextSize
  highContrast: boolean
  reduceMotion: boolean
  strongFocus: boolean
  keyboardAids: boolean
  showLabels: boolean
}

const DEFAULT_SETTINGS: AccessibilitySettings = {
  textSize: 'default',
  highContrast: false,
  reduceMotion: false,
  strongFocus: false,
  keyboardAids: false,
  showLabels: false,
}

const STORAGE_KEY = 'accesssaathi:a11y-settings'

type ContextValue = {
  settings: AccessibilitySettings
  update: <K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => void
  reset: () => void
}

const AccessibilityContext = createContext<ContextValue | null>(null)

function applyToDocument(settings: AccessibilitySettings) {
  const root = document.documentElement
  root.classList.toggle('a11y-text-large', settings.textSize === 'large')
  root.classList.toggle('a11y-text-xlarge', settings.textSize === 'xlarge')
  root.classList.toggle('a11y-high-contrast', settings.highContrast)
  root.classList.toggle('a11y-reduce-motion', settings.reduceMotion)
  root.classList.toggle('a11y-strong-focus', settings.strongFocus)
  root.classList.toggle('a11y-keyboard-aids', settings.keyboardAids)
  root.classList.toggle('a11y-show-labels', settings.showLabels)
}

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(DEFAULT_SETTINGS)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY)
      if (stored) setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(stored) })
    } catch {
      // sessionStorage can be unavailable (private mode, sandboxed iframe); fall back to defaults
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    applyToDocument(settings)
    if (!loaded) return
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    } catch {
      // ignore storage failures; settings still apply for this page view
    }
  }, [settings, loaded])

  const update = useCallback<ContextValue['update']>((key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }, [])

  const reset = useCallback(() => setSettings(DEFAULT_SETTINGS), [])

  const value = useMemo(() => ({ settings, update, reset }), [settings, update, reset])

  return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>
}

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext)
  if (!ctx) throw new Error('useAccessibility must be used within AccessibilityProvider')
  return ctx
}
