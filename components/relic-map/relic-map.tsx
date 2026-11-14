// Portions of this code were generated with SI assistance and reviewed by the team.
'use client'

import { useId, useState } from 'react'
import { PlanetDisc } from './planet-disc'
import { SpaceTrack } from './space-track'
import { ObjectCard } from './object-card'
import { STATUS_COLORS } from '@/lib/status'
import type { Region, RelicObject, Status } from '@/lib/types'
import { cn } from '@/lib/utils'

const TABS: { id: Region; label: string }[] = [
  { id: 'moon', label: 'Moon' },
  { id: 'mars', label: 'Mars' },
  { id: 'space', label: 'Space' },
]

export function RelicMap({ objects }: { objects: RelicObject[] }) {
  const baseId = useId()
  const [region, setRegion] = useState<Region>('moon')
  const [selectedByRegion, setSelectedByRegion] = useState<Record<Region, string | null>>({
    moon: objects.find((o) => o.region === 'moon')?.id ?? null,
    mars: objects.find((o) => o.region === 'mars')?.id ?? null,
    space: objects.find((o) => o.region === 'space')?.id ?? null,
  })

  const regionObjects = objects.filter((o) => o.region === region)
  const selectedId = selectedByRegion[region]
  const selected = regionObjects.find((o) => o.id === selectedId)
  const select = (id: string) => setSelectedByRegion((prev) => ({ ...prev, [region]: id }))

  const onTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const next = (index + (e.key === 'ArrowRight' ? 1 : -1) + TABS.length) % TABS.length
    setRegion(TABS[next].id)
    document.getElementById(`${baseId}-tab-${TABS[next].id}`)?.focus()
  }

  return (
    <section aria-labelledby={`${baseId}-heading`} className="flex flex-col gap-6">
      <h2 id={`${baseId}-heading`} className="sr-only">
        Relic Map
      </h2>
      <div role="tablist" aria-label="Choose a place" className="glow-card grid grid-cols-3 gap-1 p-1">
        {TABS.map((tab, i) => {
          const active = tab.id === region
          return (
            <button
              key={tab.id}
              id={`${baseId}-tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls={`${baseId}-panel`}
              tabIndex={active ? 0 : -1}
              onClick={() => setRegion(tab.id)}
              onKeyDown={(e) => onTabKeyDown(e, i)}
              className={cn(
                'min-h-12 rounded-[calc(var(--radius-xl)-4px)] font-display text-base font-semibold transition-colors',
                active ? 'bg-space-violet text-primary-foreground' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${region}`}
        className="grid gap-6 md:grid-cols-[1.1fr_1fr] md:items-center"
      >
        <div className="flex flex-col gap-4">
          {region === 'space' ? (
            <SpaceTrack objects={regionObjects} selectedId={selectedId} onSelect={select} />
          ) : (
            <PlanetDisc region={region} objects={regionObjects} selectedId={selectedId} onSelect={select} />
          )}
          {region !== 'space' && (
            <p className="text-center text-xs text-muted-foreground">
              Stylized map. Pin positions are approximate. Tap a pin, or pick below.
            </p>
          )}
          <ul className="flex flex-wrap justify-center gap-2" aria-label="Objects in this place">
            {regionObjects.map((o) => (
              <li key={o.id}>
                <button
                  type="button"
                  onClick={() => select(o.id)}
                  aria-pressed={o.id === selectedId}
                  className={cn(
                    'inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors',
                    o.id === selectedId
                      ? 'border-space-cyan bg-space-cyan/10 text-foreground'
                      : 'border-border text-muted-foreground hover:text-foreground',
                  )}
                >
                  <span
                    className="size-2.5 rounded-full"
                    style={{ backgroundColor: STATUS_COLORS[o.status] }}
                    aria-hidden="true"
                  />
                  {o.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {selected && <ObjectCard object={selected} />}
      </div>

      <StatusLegend />
    </section>
  )
}

function StatusLegend() {
  return (
    <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground" aria-label="Status colors">
      {(Object.keys(STATUS_COLORS) as Status[]).map((s) => (
        <li key={s} className="flex items-center gap-2">
          <span className="size-2.5 rounded-full" style={{ backgroundColor: STATUS_COLORS[s] }} aria-hidden="true" />
          {s}
        </li>
      ))}
    </ul>
  )
}
