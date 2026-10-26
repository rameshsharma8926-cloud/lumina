'use client'

import Link from 'next/link'
import { useEffect, useId, useRef, useState } from 'react'
import { ImagePlus, Loader2, LocateFixed, Trash2 } from 'lucide-react'
import { Alert, buttonClass, fieldClass, labelClass } from '@/components/kit'
import { useReports } from '@/lib/reports-context'
import { HAZARD_CATEGORIES, type HazardCategory, type HazardReport } from '@/lib/hazards'
import { cn } from '@/lib/utils'

type Errors = Partial<Record<'category' | 'title' | 'location' | 'photo', string>>
type GeoState = { state: 'idle' | 'locating' | 'done' | 'error'; message?: string }

const MAX_PHOTO_MB = 5

export function ReportForm({ initialCategory }: { initialCategory?: HazardCategory }) {
  const { addReport } = useReports()
  const formId = useId()
  const errorSummaryRef = useRef<HTMLDivElement>(null)
  const successRef = useRef<HTMLDivElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const [category, setCategory] = useState<HazardCategory | ''>(initialCategory ?? '')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [coords, setCoords] = useState<{ lat: number; lng: number } | undefined>()
  const [photoUrl, setPhotoUrl] = useState<string | undefined>()
  const [photoName, setPhotoName] = useState('')
  const [geo, setGeo] = useState<GeoState>({ state: 'idle' })
  const [errors, setErrors] = useState<Errors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState<HazardReport | null>(null)

  useEffect(() => {
    if (submitted) successRef.current?.focus()
  }, [submitted])

  const onPhotoChange = (file?: File) => {
    setErrors((e) => ({ ...e, photo: undefined }))
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setErrors((e) => ({ ...e, photo: 'Please choose an image file (JPG, PNG or WebP).' }))
      return
    }
    if (file.size > MAX_PHOTO_MB * 1024 * 1024) {
      setErrors((e) => ({ ...e, photo: `Image must be smaller than ${MAX_PHOTO_MB} MB.` }))
      return
    }
    setPhotoUrl(URL.createObjectURL(file))
    setPhotoName(file.name)
  }

  const removePhoto = () => {
    setPhotoUrl(undefined)
    setPhotoName('')
    if (fileRef.current) fileRef.current.value = ''
  }

  const useMyLocation = () => {
    if (!('geolocation' in navigator)) {
      setGeo({ state: 'error', message: 'Location is not supported in this browser. Please type the area instead.' })
      return
    }
    setGeo({ state: 'locating' })
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const c = { lat: Number(pos.coords.latitude.toFixed(5)), lng: Number(pos.coords.longitude.toFixed(5)) }
        setCoords(c)
        if (!location.trim()) setLocation(`Near ${c.lat}, ${c.lng}`)
        setGeo({ state: 'done', message: `Location added (${c.lat}, ${c.lng}). You can edit the area name.` })
      },
      (err) => {
        const message =
          err.code === err.PERMISSION_DENIED
            ? 'Location permission was denied. You can type the area or landmark instead.'
            : 'We could not get your location. Please type the area or landmark instead.'
        setGeo({ state: 'error', message })
      },
      { enableHighAccuracy: true, timeout: 10000 },
    )
  }

  const validate = (): Errors => {
    const next: Errors = {}
    if (!category) next.category = 'Choose a hazard category.'
    if (title.trim().length < 5) next.title = 'Add a short title of at least 5 characters.'
    if (location.trim().length < 3) next.location = 'Add an area, street or landmark.'
    return next
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) {
      requestAnimationFrame(() => errorSummaryRef.current?.focus())
      return
    }
    setSubmitting(true)
    const report = addReport({
      category: category as HazardCategory,
      title: title.trim(),
      description: description.trim(),
      locationLabel: location.trim(),
      coordinates: coords,
      photo: photoUrl,
      photoAlt: photoUrl ? `Photo submitted for: ${title.trim()}` : undefined,
    })
    setSubmitting(false)
    setSubmitted(report)
  }

  const reset = () => {
    setCategory(initialCategory ?? '')
    setTitle('')
    setDescription('')
    setLocation('')
    setCoords(undefined)
    removePhoto()
    setGeo({ state: 'idle' })
    setErrors({})
    setSubmitted(null)
  }

  if (submitted) {
    return (
      <div ref={successRef} tabIndex={-1} className="flex flex-col gap-5 outline-none">
        <Alert tone="success" title="Report added to this browser session" live>
          Your report &ldquo;{submitted.title}&rdquo; now appears in Community Reports with status{' '}
          <strong>Pending</strong>.
        </Alert>
        <Alert tone="warning" title="Not uploaded or shared">
          No backend is connected in this prototype. Your report is visible only to you on this device and will be
          removed when you close the tab. Photos are not uploaded anywhere.
        </Alert>
        <div className="flex flex-wrap gap-3">
          <Link href={`/reports/${submitted.id}`} className={buttonClass('primary')}>
            View your report
          </Link>
          <button type="button" onClick={reset} className={buttonClass('outline')}>
            Submit another report
          </button>
        </div>
      </div>
    )
  }

  const errorEntries = Object.entries(errors).filter(([, v]) => v) as [keyof Errors, string][]
  const fieldIds = {
    category: `${formId}-category`,
    title: `${formId}-title`,
    location: `${formId}-location`,
    photo: `${formId}-photo`,
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6" aria-describedby={`${formId}-note`}>
      <p id={`${formId}-note`} className="text-sm text-muted-foreground">
        Fields marked <span aria-hidden="true">*</span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>

      {errorEntries.length > 0 && (
        <div ref={errorSummaryRef} tabIndex={-1} className="outline-none">
          <Alert tone="error" title={`Please fix ${errorEntries.length} issue${errorEntries.length > 1 ? 's' : ''}`} live>
            <ul className="mt-1 list-disc pl-4">
              {errorEntries.map(([key, msg]) => (
                <li key={key}>
                  <a href={`#${fieldIds[key]}`} className="underline">
                    {msg}
                  </a>
                </li>
              ))}
            </ul>
          </Alert>
        </div>
      )}

      <fieldset>
        <legend className={labelClass}>
          Hazard category <span aria-hidden="true">*</span>
        </legend>
        <div
          id={fieldIds.category}
          className="grid gap-3 sm:grid-cols-2"
          aria-describedby={errors.category ? `${fieldIds.category}-err` : undefined}
        >
          {Object.entries(HAZARD_CATEGORIES).map(([value, info]) => (
            <label
              key={value}
              className={cn(
                'flex cursor-pointer items-start gap-3 rounded-lg border border-input bg-card p-3 transition-colors hover:bg-secondary/50',
                'has-[:checked]:border-primary has-[:checked]:bg-secondary has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring',
              )}
            >
              <input
                type="radio"
                name="category"
                value={value}
                checked={category === value}
                onChange={() => setCategory(value as HazardCategory)}
                className="mt-1 size-4 accent-[var(--primary)]"
              />
              <span>
                <span className="block text-sm font-medium">{info.label}</span>
                <span className="block text-xs leading-relaxed text-muted-foreground">{info.description}</span>
              </span>
            </label>
          ))}
        </div>
        {errors.category && (
          <p id={`${fieldIds.category}-err`} className="mt-1.5 text-sm text-destructive">
            {errors.category}
          </p>
        )}
      </fieldset>

      <div>
        <label htmlFor={fieldIds.title} className={labelClass}>
          Short title <span aria-hidden="true">*</span>
        </label>
        <input
          id={fieldIds.title}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          maxLength={90}
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? `${fieldIds.title}-err` : undefined}
          placeholder="e.g. Open drain near bus stop"
          className={fieldClass}
        />
        {errors.title && (
          <p id={`${fieldIds.title}-err`} className="mt-1.5 text-sm text-destructive">
            {errors.title}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={`${formId}-desc`} className={labelClass}>
          Description <span className="font-normal text-muted-foreground">(optional)</span>
        </label>
        <textarea
          id={`${formId}-desc`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          maxLength={600}
          placeholder="What is the hazard and who might it affect?"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor={fieldIds.location} className={labelClass}>
          Location <span aria-hidden="true">*</span>
        </label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            id={fieldIds.location}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            aria-invalid={!!errors.location}
            aria-describedby={`${fieldIds.location}-hint${errors.location ? ` ${fieldIds.location}-err` : ''}`}
            placeholder="Area, street or nearby landmark"
            className={fieldClass}
          />
          <button
            type="button"
            onClick={useMyLocation}
            disabled={geo.state === 'locating'}
            className={buttonClass('outline', 'md', 'shrink-0')}
          >
            {geo.state === 'locating' ? (
              <Loader2 className="animate-spin" aria-hidden="true" />
            ) : (
              <LocateFixed aria-hidden="true" />
            )}
            {geo.state === 'locating' ? 'Locating…' : 'Use my location'}
          </button>
        </div>
        <p id={`${fieldIds.location}-hint`} className="mt-1.5 text-xs text-muted-foreground">
          Your browser will ask permission first. Coordinates stay on your device.
        </p>
        {errors.location && (
          <p id={`${fieldIds.location}-err`} className="mt-1.5 text-sm text-destructive">
            {errors.location}
          </p>
        )}
        <div aria-live="polite">
          {geo.message && (
            <p className={cn('mt-1.5 text-sm', geo.state === 'error' ? 'text-destructive' : 'text-success-foreground')}>
              {geo.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <span className={labelClass} id={`${fieldIds.photo}-label`}>
          Photo <span className="font-normal text-muted-foreground">(optional)</span>
        </span>
        {photoUrl ? (
          <div className="flex flex-col gap-3 rounded-lg border border-input bg-card p-3 sm:flex-row sm:items-center">
            {/* eslint-disable-next-line @next/next/no-img-element -- local blob preview */}
            <img src={photoUrl} alt="Preview of the selected hazard photo" className="h-32 w-full rounded-md object-cover sm:w-48" />
            <div className="flex-1">
              <p className="break-all text-sm font-medium">{photoName}</p>
              <p className="text-xs text-muted-foreground">Preview only — not uploaded.</p>
            </div>
            <button type="button" onClick={removePhoto} className={buttonClass('ghost', 'sm')}>
              <Trash2 aria-hidden="true" />
              Remove photo
            </button>
          </div>
        ) : (
          <label
            htmlFor={fieldIds.photo}
            className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-input bg-card px-4 py-8 text-center transition-colors hover:bg-secondary/50 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring"
          >
            <ImagePlus className="size-6 text-primary" aria-hidden="true" />
            <span className="text-sm font-medium">Choose a photo or take one</span>
            <span className="text-xs text-muted-foreground">JPG, PNG or WebP, up to {MAX_PHOTO_MB} MB</span>
            <input
              ref={fileRef}
              id={fieldIds.photo}
              type="file"
              accept="image/*"
              capture="environment"
              className="sr-only"
              aria-labelledby={`${fieldIds.photo}-label`}
              aria-describedby={errors.photo ? `${fieldIds.photo}-err` : undefined}
              onChange={(e) => onPhotoChange(e.target.files?.[0])}
            />
          </label>
        )}
        {errors.photo && (
          <p id={`${fieldIds.photo}-err`} className="mt-1.5 text-sm text-destructive" role="alert">
            {errors.photo}
          </p>
        )}
      </div>

      <Alert tone="info">
        Reports are kept in this browser session only. They are not uploaded, verified or shared publicly in this
        prototype.
      </Alert>

      <div className="flex flex-wrap gap-3">
        <button type="submit" disabled={submitting} className={buttonClass('primary', 'lg')}>
          {submitting && <Loader2 className="animate-spin" aria-hidden="true" />}
          Submit report
        </button>
        <Link href="/reports" className={buttonClass('ghost', 'lg')}>
          Cancel
        </Link>
      </div>
    </form>
  )
}
