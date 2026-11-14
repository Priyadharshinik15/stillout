'use client'

import { STATUS_COLORS } from '@/lib/status'
import type { RelicObject } from '@/lib/types'
import { cn } from '@/lib/utils'

interface SpaceTrackProps {
  objects: RelicObject[]
  selectedId: string | null
  onSelect: (id: string) => void
}

export function SpaceTrack({ objects, selectedId, onSelect }: SpaceTrackProps) {
  return (
    <div className="glow-card relative overflow-hidden px-4 py-10 sm:px-8">
      <p className="mb-8 text-center text-xs uppercase tracking-widest text-muted-foreground">
        Not to scale: deep space is far too big!
      </p>
      <div className="relative flex items-center justify-between">
        <div className="absolute inset-x-0 top-1/2 border-t-2 border-dashed border-space-violet/40" aria-hidden="true" />

        <div className="relative flex flex-col items-center gap-2">
          <span className="size-10 rounded-full bg-space-yellow shadow-[0_0_30px_#FFC84A]" aria-hidden="true" />
          <span className="text-xs text-muted-foreground">Sun</span>
        </div>

        <div className="relative flex flex-col items-center gap-2">
          <span className="size-4 rounded-full bg-space-cyan" aria-hidden="true" />
          <span className="text-xs text-muted-foreground">Earth</span>
        </div>

        <div className="relative flex flex-col items-center gap-2">
          <span className="h-14 w-1 rounded-full bg-space-violet/60" aria-hidden="true" />
          <span className="text-center text-xs leading-tight text-muted-foreground">
            Edge of the
            <br />
            Sun&apos;s bubble
          </span>
        </div>

        {objects.map((o) => {
          const color = STATUS_COLORS[o.status]
          const selected = o.id === selectedId
          return (
            <div key={o.id} className="relative flex flex-col items-center gap-2">
              <button
                type="button"
                onClick={() => onSelect(o.id)}
                aria-pressed={selected}
                aria-label={`${o.name}, ${o.place}. Status: ${o.status}`}
                className="group relative grid size-12 place-items-center rounded-full"
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
              <span className="text-xs font-medium" style={{ color }}>
                {o.name}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
