'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { DEMO_REPORTS, type HazardReport } from './hazards'

const STORAGE_KEY = 'accesssaathi:session-reports'

type ContextValue = {
  reports: HazardReport[]
  sessionReports: HazardReport[]
  isLoading: boolean
  addReport: (report: Omit<HazardReport, 'id' | 'date' | 'status' | 'isDemo'>) => HazardReport
  getReport: (id: string) => HazardReport | undefined
}

const ReportsContext = createContext<ContextValue | null>(null)

/**
 * No backend is connected. Demo reports are static sample data, and reports a user
 * submits are kept in sessionStorage only — they are never uploaded or shared.
 * Uploaded photos are kept as in-memory object URLs and are lost on reload.
 */
export function ReportsProvider({ children }: { children: React.ReactNode }) {
  const [sessionReports, setSessionReports] = useState<HazardReport[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY)
      if (stored) setSessionReports(JSON.parse(stored))
    } catch {
      // storage unavailable; start with no session reports
    }
    setIsLoading(false)
  }, [])

  const persist = useCallback((next: HazardReport[]) => {
    try {
      const serialisable = next.map((r) =>
        r.photo?.startsWith('blob:') ? { ...r, photo: undefined, photoAlt: undefined } : r,
      )
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(serialisable))
    } catch {
      // ignore
    }
  }, [])

  const addReport = useCallback<ContextValue['addReport']>(
    (input) => {
      const report: HazardReport = {
        ...input,
        id: `session-${Date.now()}`,
        date: new Date().toISOString().slice(0, 10),
        status: 'pending',
        isDemo: false,
      }
      setSessionReports((prev) => {
        const next = [report, ...prev]
        persist(next)
        return next
      })
      return report
    },
    [persist],
  )

  const reports = useMemo(() => [...sessionReports, ...DEMO_REPORTS], [sessionReports])

  const getReport = useCallback((id: string) => reports.find((r) => r.id === id), [reports])

  const value = useMemo(
    () => ({ reports, sessionReports, isLoading, addReport, getReport }),
    [reports, sessionReports, isLoading, addReport, getReport],
  )

  return <ReportsContext.Provider value={value}>{children}</ReportsContext.Provider>
}

export function useReports() {
  const ctx = useContext(ReportsContext)
  if (!ctx) throw new Error('useReports must be used within ReportsProvider')
  return ctx
}
