// Portions of this code were generated with SI assistance and reviewed by the team.
'use client'

import { STATUS_COLORS } from '@/lib/status'
import type { RelicObject } from '@/lib/types'
import { cn } from '@/lib/utils'

const PALETTES = {
  moon: { light: '#E3E4EC', mid: '#9EA1B5', dark: '#3F4159', glow: 'rgba(200, 204, 230, 0.35)', spot: '#6D7089' },
  mars: { light: '#FFB089', mid: '#D8582E', dark: '#5A1A10', glow: 'rgba(255, 122, 69, 0.4)', spot: '#8E2F17' },
} as const

const SPOTS = {
  moon: [
    { cx: 34, cy: 30, r: 7 },
    { cx: 62, cy: 26, r: 4 },
    { cx: 70, cy: 58, r: 9 },
    { cx: 40, cy: 66, r: 5 },
    { cx: 24, cy: 52, r: 3 },
    { cx: 55, cy: 80, r: 3.5 },
  ],
  mars: [
    { cx: 30, cy: 40, r: 10 },
    { cx: 66, cy: 64, r: 7 },
    { cx: 52, cy: 28, r: 4 },
    { cx: 38, cy: 74, r: 5 },
  ],
}

function project(lat: number, lon: number) {
  const normalizedLon = lon > 180 ? lon - 360 : lon
  return { x: 50 + (normalizedLon / 180) * 40, y: 50 - (lat / 90) * 40 }
}

interface PlanetDiscProps {
  region: 'moon' | 'mars'
  objects: RelicObject[]
  selectedId: string | null
  onSelect: (id: string) => void
}

export function PlanetDisc({ region, objects, selectedId, onSelect }: PlanetDiscProps) {
  const p = PALETTES[region]
  const gradientId = `disc-${region}`

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[22rem]">
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden="true">
        <defs>
          <radialGradient id={gradientId} cx="35%" cy="30%" r="80%">
            <stop offset="0%" stopColor={p.light} />
            <stop offset="55%" stopColor={p.mid} />
            <stop offset="100%" stopColor={p.dark} />
          </radialGradient>
          <filter id={`${gradientId}-glow`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>
        <circle cx="50" cy="50" r="47" fill={p.glow} filter={`url(#${gradientId}-glow)`} />
        <circle cx="50" cy="50" r="46" fill={`url(#${gradientId})`} />
        {SPOTS[region].map((s, i) => (
          <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill={p.spot} opacity="0.35" />
        ))}
        <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.4" />
      </svg>

      {objects.map((o) => {
        if (!o.coordinates) return null
        const { x, y } = project(o.coordinates.lat, o.coordinates.lon)
        const color = STATUS_COLORS[o.status]
        const selected = o.id === selectedId
        return (
          <button
            key={o.id}
            type="button"
            onClick={() => onSelect(o.id)}
            aria-pressed={selected}
            aria-label={`${o.name}, ${o.place}. Status: ${o.status}`}
            className="group absolute grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <span
              className={cn('absolute size-7 rounded-full opacity-60', selected ? 'animate-ping' : 'animate-pulse')}
              style={{ backgroundColor: color }}
              aria-hidden="true"
            />
            <span
              className={cn(
                'relative size-4 rounded-full ring-2 ring-background transition-transform group-hover:scale-125',
                selected && 'scale-150',
              )}
              style={{ backgroundColor: color, boxShadow: `0 0 14px ${color}` }}
              aria-hidden="true"
            />
          </button>
        )
      })}
    </div>
  )
}
