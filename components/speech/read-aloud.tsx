'use client'

import { useState } from 'react'
import { Eraser, Pause, Play, Square, Volume2 } from 'lucide-react'
import { Card, buttonClass, fieldClass, labelClass } from '@/components/kit'
import { useSpeech, type SpeechLanguage } from '@/lib/use-speech'
import { LANGUAGE_OPTIONS, SpeechStatusMessage, SpeechUnsupported } from './speech-feedback'

const SAMPLE_TEXT: Record<SpeechLanguage, string> = {
  'en-IN':
    'Welcome to AccessSaathi. Paste any notice, message or article here and press Read aloud. You can pause, resume or stop at any time, and change the reading speed.',
  'hi-IN':
    'एक्सेस साथी में आपका स्वागत है। यहाँ कोई भी सूचना या संदेश चिपकाएँ और ज़ोर से पढ़ें दबाएँ। आप कभी भी रोक सकते हैं या गति बदल सकते हैं।',
}

export function ReadAloud() {
  const speech = useSpeech()
  const [text, setText] = useState(SAMPLE_TEXT['en-IN'])
  const [lang, setLang] = useState<SpeechLanguage>('en-IN')
  const [rate, setRate] = useState(1)

  if (speech.supported === false) return <SpeechUnsupported />

  const isActive = speech.status === 'speaking' || speech.status === 'paused'
  const words = text.trim() ? text.trim().split(/\s+/).length : 0

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
      <Card className="p-6">
        <div className="flex items-center justify-between gap-3">
          <label htmlFor="read-text" className={labelClass + ' mb-0'}>
            Text to read
          </label>
          <span className="text-xs text-muted-foreground" aria-live="off">
            {words} word{words === 1 ? '' : 's'}
          </span>
        </div>
        <textarea
          id="read-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={10}
          className={`${fieldClass} mt-2 text-base leading-relaxed`}
          placeholder="Paste or type the text you want to hear"
        />

        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Playback controls">
          <button
            type="button"
            onClick={() => speech.speak(text, { lang, rate })}
            disabled={speech.supported === null}
            className={buttonClass('primary', 'lg')}
          >
            <Volume2 aria-hidden="true" />
            {isActive ? 'Restart' : 'Read aloud'}
          </button>
          {speech.status === 'paused' ? (
            <button type="button" onClick={speech.resume} className={buttonClass('outline', 'lg')}>
              <Play aria-hidden="true" />
              Resume
            </button>
          ) : (
            <button
              type="button"
              onClick={speech.pause}
              disabled={speech.status !== 'speaking'}
              className={buttonClass('outline', 'lg')}
            >
              <Pause aria-hidden="true" />
              Pause
            </button>
          )}
          <button type="button" onClick={speech.stop} disabled={!isActive} className={buttonClass('outline', 'lg')}>
            <Square aria-hidden="true" />
            Stop
          </button>
          <button
            type="button"
            onClick={() => {
              speech.stop()
              setText('')
            }}
            disabled={!text}
            className={buttonClass('ghost', 'lg')}
          >
            <Eraser aria-hidden="true" />
            Clear
          </button>
        </div>

        <div className="mt-4">
          <SpeechStatusMessage
            status={speech.status}
            error={speech.error}
            lang={lang}
            hasVoice={speech.supported === null || speech.voices.length === 0 || speech.hasVoiceFor(lang)}
          />
        </div>
      </Card>

      <Card className="h-fit p-6">
        <h2 className="text-base font-semibold">Voice settings</h2>
        <div className="mt-4 flex flex-col gap-5">
          <div>
            <label htmlFor="read-lang" className={labelClass}>
              Language
            </label>
            <select
              id="read-lang"
              value={lang}
              onChange={(e) => setLang(e.target.value as SpeechLanguage)}
              className={fieldClass}
            >
              {LANGUAGE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setText(SAMPLE_TEXT[lang])}
              className="mt-2 text-sm font-medium text-primary underline-offset-2 hover:underline"
            >
              Load sample text in this language
            </button>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="read-rate" className={labelClass + ' mb-0'}>
                Speech rate
              </label>
              <output htmlFor="read-rate" className="text-sm font-medium tabular-nums">
                {rate.toFixed(1)}×
              </output>
            </div>
            <input
              id="read-rate"
              type="range"
              min={0.5}
              max={2}
              step={0.1}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              aria-valuetext={`${rate.toFixed(1)} times normal speed`}
              className="mt-3 w-full accent-[var(--primary)]"
            />
            <div className="mt-1 flex justify-between text-xs text-muted-foreground" aria-hidden="true">
              <span>Slower</span>
              <span>Faster</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">New rate applies the next time you press Read aloud.</p>
          </div>
          <p className="border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
            Uses your browser&apos;s built-in speech engine. Text is processed on your device and is not sent to our
            servers.
          </p>
        </div>
      </Card>
    </div>
  )
}
