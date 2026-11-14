import type { HardwareType, Lang, Status } from './types'

export const STATUS_COLORS: Record<Status, string> = {
  Active: '#3DDC97',
  Sleeping: '#FFC84A',
  Silent: '#FF5C8A',
  'Still travelling': '#4FD1FF',
}

export const TYPE_LABELS: Record<HardwareType, string> = {
  lander: 'Lander',
  rover: 'Rover',
  helicopter: 'Helicopter',
  probe: 'Space probe',
}

export const LANG_LABELS: Record<Lang, { short: string; name: string; speechCode: string }> = {
  en: { short: 'EN', name: 'English', speechCode: 'en-IN' },
  ta: { short: 'TA', name: 'தமிழ் (Tamil)', speechCode: 'ta-IN' },
  hi: { short: 'HI', name: 'हिन्दी (Hindi)', speechCode: 'hi-IN' },
}
