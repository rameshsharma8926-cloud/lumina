import { Footprints, Hand, Volume2, SlidersHorizontal, type LucideIcon } from 'lucide-react'

export type ModuleInfo = {
  slug: string
  href: string
  name: string
  tagline: string
  description: string
  icon: LucideIcon
  status: 'Working demo' | 'Functional' | 'Partly planned'
  features: string[]
}

export const MODULES: ModuleInfo[] = [
  {
    slug: 'raahdrishti',
    href: '/tools/raahdrishti',
    name: 'RaahDrishti',
    tagline: 'Indian footpath hazard awareness',
    description:
      'Report and explore open drains, potholes, broken pavements and blocked pathways shared by your community.',
    icon: Footprints,
    status: 'Working demo',
    features: ['Hazard categories', 'Photo + location reports', 'Status tracking'],
  },
  {
    slug: 'vani-chitra',
    href: '/tools/vani-chitra',
    name: 'Vani-Chitra',
    tagline: 'Communication accessibility',
    description:
      'Type a message and have it spoken aloud in English or Hindi. Sign-language recognition is planned for the future.',
    icon: Hand,
    status: 'Partly planned',
    features: ['Speak typed messages', 'Hindi & English', 'Quick phrases'],
  },
  {
    slug: 'dhwani-sarthi',
    href: '/tools/dhwani-sarthi',
    name: 'Dhwani-Sarthi',
    tagline: 'Read and listen',
    description:
      'Paste any text and listen with play, pause, resume and stop controls, adjustable speed and language.',
    icon: Volume2,
    status: 'Functional',
    features: ['Browser text-to-speech', 'Speech rate control', 'Keyboard friendly'],
  },
  {
    slug: 'sparsh-ui',
    href: '/settings',
    name: 'Sparsh-UI',
    tagline: 'Accessible interface settings',
    description:
      'Adjust text size, contrast, motion and focus indicators. Changes apply instantly across the whole site.',
    icon: SlidersHorizontal,
    status: 'Functional',
    features: ['Larger text', 'High contrast', 'Reduced motion'],
  },
]
