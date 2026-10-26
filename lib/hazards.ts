export type HazardCategory = 'open-drain' | 'pothole' | 'broken-pavement' | 'blocked-path'

export type ReportStatus = 'pending' | 'verified' | 'resolved'

export type HazardReport = {
  id: string
  category: HazardCategory
  title: string
  description: string
  locationLabel: string
  coordinates?: { lat: number; lng: number }
  date: string
  status: ReportStatus
  photo?: string
  photoAlt?: string
  isDemo: boolean
}

export const HAZARD_CATEGORIES: Record<
  HazardCategory,
  { label: string; description: string; image: string }
> = {
  'open-drain': {
    label: 'Open drain',
    description: 'Uncovered or broken drain slabs along the footpath edge.',
    image: '/images/hazard-open-drain.png',
  },
  pothole: {
    label: 'Pothole',
    description: 'Deep holes near crossings or where the footpath meets the road.',
    image: '/images/hazard-pothole.png',
  },
  'broken-pavement': {
    label: 'Broken pavement',
    description: 'Missing tiles, loose stones, sudden level changes.',
    image: '/images/hazard-broken-pavement.png',
  },
  'blocked-path': {
    label: 'Blocked pathway',
    description: 'Parked vehicles, debris or encroachment forcing people onto the road.',
    image: '/images/hazard-blocked-path.png',
  },
}

export const STATUS_LABELS: Record<ReportStatus, string> = {
  pending: 'Pending',
  verified: 'Verified',
  resolved: 'Resolved',
}

export const DEMO_REPORTS: HazardReport[] = [
  {
    id: 'demo-1',
    category: 'open-drain',
    title: 'Uncovered drain near bus stop',
    description:
      'Drain slab missing for roughly two metres beside the bus shelter. Easy to step into when the stop is crowded.',
    locationLabel: 'Sample: Lajpat Nagar, New Delhi',
    date: '2026-10-18',
    status: 'verified',
    photo: '/images/hazard-open-drain.png',
    photoAlt: 'Open drain with a broken concrete slab beside a footpath',
    isDemo: true,
  },
  {
    id: 'demo-2',
    category: 'pothole',
    title: 'Waterlogged pothole at crossing',
    description:
      'Large pothole filled with rainwater at the pedestrian crossing. Depth is hard to judge.',
    locationLabel: 'Sample: Koramangala 5th Block, Bengaluru',
    date: '2026-10-20',
    status: 'pending',
    photo: '/images/hazard-pothole.png',
    photoAlt: 'Pothole filled with rainwater at the edge of a road',
    isDemo: true,
  },
  {
    id: 'demo-3',
    category: 'broken-pavement',
    title: 'Loose paver blocks outside market',
    description:
      'Several paver blocks missing and loose stones spread across the path for about ten metres.',
    locationLabel: 'Sample: Dadar West, Mumbai',
    date: '2026-10-11',
    status: 'resolved',
    photo: '/images/hazard-broken-pavement.png',
    photoAlt: 'Broken paver-block footpath with missing tiles',
    isDemo: true,
  },
  {
    id: 'demo-4',
    category: 'blocked-path',
    title: 'Footpath blocked by parked two-wheelers',
    description:
      'Motorcycles and construction sand fully block the footpath. Pedestrians walk on the road.',
    locationLabel: 'Sample: Salt Lake Sector V, Kolkata',
    date: '2026-10-22',
    status: 'pending',
    photo: '/images/hazard-blocked-path.png',
    photoAlt: 'Footpath blocked by parked motorcycles and construction material',
    isDemo: true,
  },
  {
    id: 'demo-5',
    category: 'open-drain',
    title: 'Drain cover cracked near school gate',
    description: 'Cover is cracked and tilts when stepped on. Children use this path daily.',
    locationLabel: 'Sample: Gomti Nagar, Lucknow',
    date: '2026-10-09',
    status: 'verified',
    isDemo: true,
  },
  {
    id: 'demo-6',
    category: 'broken-pavement',
    title: 'Sudden height drop at footpath end',
    description: 'Footpath ends with a 30 cm drop and no ramp near the metro exit.',
    locationLabel: 'Sample: Aluva, Kochi',
    date: '2026-10-15',
    status: 'pending',
    isDemo: true,
  },
]

export function formatReportDate(date: string) {
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
