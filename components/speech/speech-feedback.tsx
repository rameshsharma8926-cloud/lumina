'use client'

import { Alert } from '@/components/kit'
import type { SpeechLanguage, SpeechStatus } from '@/lib/use-speech'

export const LANGUAGE_OPTIONS: { value: SpeechLanguage; label: string }[] = [
  { value: 'en-IN', label: 'English (India)' },
  { value: 'hi-IN', label: 'हिन्दी — Hindi' },
]

export function SpeechUnsupported() {
  return (
    <Alert tone="error" title="Text-to-speech is not available in this browser" live>
      Try a recent version of Chrome, Edge, Safari or Firefox. Your screen reader will still be able to read this page.
    </Alert>
  )
}

export function SpeechStatusMessage({
  status,
  error,
  lang,
  hasVoice,
}: {
  status: SpeechStatus
  error: string | null
  lang: SpeechLanguage
  hasVoice: boolean
}) {
  return (
    <div aria-live="polite" className="flex flex-col gap-3">
      {status === 'error' && error && (
        <Alert tone="error" title="Could not read aloud">
          {error}
        </Alert>
      )}
      {status === 'speaking' && <Alert tone="success">Reading aloud…</Alert>}
      {status === 'paused' && <Alert tone="info">Paused. Press Resume to continue.</Alert>}
      {!hasVoice && (
        <Alert tone="warning" title="No matching voice installed">
          Your device has no {lang === 'hi-IN' ? 'Hindi' : 'English'} voice, so a default voice will be used and
          pronunciation may be inaccurate. You can add voices in your system&apos;s language settings.
        </Alert>
      )}
    </div>
  )
}
