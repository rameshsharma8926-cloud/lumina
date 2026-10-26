'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

export type SpeechStatus = 'idle' | 'speaking' | 'paused' | 'error'

export type SpeechLanguage = 'en-IN' | 'hi-IN'

export function useSpeech() {
  const [supported, setSupported] = useState<boolean | null>(null)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [status, setStatus] = useState<SpeechStatus>('idle')
  const [error, setError] = useState<string | null>(null)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window
    setSupported(isSupported)
    if (!isSupported) return

    const loadVoices = () => setVoices(window.speechSynthesis.getVoices())
    loadVoices()
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices)
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices)
      window.speechSynthesis.cancel()
    }
  }, [])

  const hasVoiceFor = useCallback(
    (lang: SpeechLanguage) => {
      const prefix = lang.split('-')[0]
      return voices.some((v) => v.lang.toLowerCase().startsWith(prefix))
    },
    [voices],
  )

  const speak = useCallback(
    (text: string, options: { lang: SpeechLanguage; rate?: number }) => {
      if (!supported) return
      const trimmed = text.trim()
      if (!trimmed) {
        setError('Please enter some text to read aloud.')
        setStatus('error')
        return
      }
      window.speechSynthesis.cancel()
      setError(null)

      const utterance = new SpeechSynthesisUtterance(trimmed)
      utterance.lang = options.lang
      utterance.rate = options.rate ?? 1
      const prefix = options.lang.split('-')[0]
      const voice =
        voices.find((v) => v.lang === options.lang) ??
        voices.find((v) => v.lang.toLowerCase().startsWith(prefix))
      if (voice) utterance.voice = voice

      utterance.onstart = () => setStatus('speaking')
      utterance.onend = () => setStatus('idle')
      utterance.onpause = () => setStatus('paused')
      utterance.onresume = () => setStatus('speaking')
      utterance.onerror = (event) => {
        if (event.error === 'canceled' || event.error === 'interrupted') {
          setStatus('idle')
          return
        }
        setError(`Speech could not play (${event.error}). Try a different language or browser.`)
        setStatus('error')
      }

      utteranceRef.current = utterance
      window.speechSynthesis.speak(utterance)
      setStatus('speaking')
    },
    [supported, voices],
  )

  const pause = useCallback(() => {
    if (!supported) return
    window.speechSynthesis.pause()
    setStatus('paused')
  }, [supported])

  const resume = useCallback(() => {
    if (!supported) return
    window.speechSynthesis.resume()
    setStatus('speaking')
  }, [supported])

  const stop = useCallback(() => {
    if (!supported) return
    window.speechSynthesis.cancel()
    setStatus('idle')
  }, [supported])

  return { supported, voices, hasVoiceFor, status, error, speak, pause, resume, stop }
}
