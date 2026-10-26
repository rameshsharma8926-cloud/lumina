'use client'

import { useState } from 'react'
import { MessageSquareText, Square, Volume2 } from 'lucide-react'
import { Card, buttonClass, fieldClass, labelClass } from '@/components/kit'
import { useSpeech, type SpeechLanguage } from '@/lib/use-speech'
import { LANGUAGE_OPTIONS, SpeechStatusMessage, SpeechUnsupported } from './speech-feedback'
import { cn } from '@/lib/utils'

const QUICK_PHRASES: Record<SpeechLanguage, string[]> = {
  'en-IN': [
    'Hello, I am deaf. Please type or write your reply.',
    'Can you please help me cross the road?',
    'Please speak slowly and face me.',
    'I need to call my family. Can you help?',
    'Where is the nearest bus stop?',
    'Thank you for your help.',
  ],
  'hi-IN': [
    'नमस्ते, मैं सुन नहीं सकता। कृपया अपना जवाब लिखें।',
    'क्या आप मुझे सड़क पार करने में मदद कर सकते हैं?',
    'कृपया धीरे बोलें और मेरी तरफ देखें।',
    'मुझे अपने परिवार को फ़ोन करना है। क्या आप मदद करेंगे?',
    'सबसे पास बस स्टॉप कहाँ है?',
    'आपकी मदद के लिए धन्यवाद।',
  ],
}

export function SpeakMessage() {
  const speech = useSpeech()
  const [lang, setLang] = useState<SpeechLanguage>('en-IN')
  const [message, setMessage] = useState('')

  if (speech.supported === false) return <SpeechUnsupported />

  const speak = (text: string) => speech.speak(text, { lang, rate: 0.95 })

  return (
    <Card className="p-6 md:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <MessageSquareText className="size-5 text-primary" aria-hidden="true" />
            Type to speak
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Type a message, or pick a quick phrase, and your device will say it out loud.
          </p>
        </div>
        <fieldset>
          <legend className="sr-only">Speaking language</legend>
          <div className="inline-flex rounded-lg border border-input bg-muted p-1">
            {LANGUAGE_OPTIONS.map((o) => (
              <label
                key={o.value}
                className={cn(
                  'cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors',
                  'has-[:checked]:bg-card has-[:checked]:text-foreground has-[:checked]:shadow-sm has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring',
                )}
              >
                <input
                  type="radio"
                  name="vani-lang"
                  value={o.value}
                  checked={lang === o.value}
                  onChange={() => setLang(o.value)}
                  className="sr-only"
                />
                {o.label}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <form
        className="mt-6"
        onSubmit={(e) => {
          e.preventDefault()
          speak(message)
        }}
      >
        <label htmlFor="vani-message" className={labelClass}>
          Your message
        </label>
        <textarea
          id="vani-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key !== 'Enter' || e.shiftKey) return
            if (e.nativeEvent.isComposing || e.keyCode === 229) return
            e.preventDefault()
            speak(message)
          }}
          rows={3}
          className={`${fieldClass} text-lg leading-relaxed`}
          placeholder={lang === 'hi-IN' ? 'यहाँ अपना संदेश लिखें' : 'Type your message here'}
          aria-describedby="vani-hint"
        />
        <p id="vani-hint" className="mt-1.5 text-xs text-muted-foreground">
          Press Enter to speak, Shift + Enter for a new line.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="submit" disabled={speech.supported === null} className={buttonClass('primary', 'lg')}>
            <Volume2 aria-hidden="true" />
            Speak message
          </button>
          <button
            type="button"
            onClick={speech.stop}
            disabled={speech.status !== 'speaking' && speech.status !== 'paused'}
            className={buttonClass('outline', 'lg')}
          >
            <Square aria-hidden="true" />
            Stop
          </button>
        </div>
      </form>

      <div className="mt-4">
        <SpeechStatusMessage
          status={speech.status}
          error={speech.error}
          lang={lang}
          hasVoice={speech.supported === null || speech.voices.length === 0 || speech.hasVoiceFor(lang)}
        />
      </div>

      <div className="mt-8 border-t border-border pt-6">
        <h3 className="text-sm font-semibold">Quick phrases</h3>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {QUICK_PHRASES[lang].map((phrase) => (
            <li key={phrase}>
              <button
                type="button"
                onClick={() => {
                  setMessage(phrase)
                  speak(phrase)
                }}
                className="flex min-h-11 w-full items-center gap-3 rounded-lg border border-border bg-card px-3 py-2.5 text-left text-sm transition-colors hover:bg-secondary"
              >
                <Volume2 className="size-4 shrink-0 text-primary" aria-hidden="true" />
                <span>
                  <span className="sr-only">Speak: </span>
                  {phrase}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
}
