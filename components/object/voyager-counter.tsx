// Portions of this code were generated with SI assistance and reviewed by the team.
'use client'

import { useSyncExternalStore } from 'react'
import { ExternalLink } from 'lucide-react'

// VERIFY on voyager.jpl.nasa.gov/mission/status/ — all three constants are approximate placeholders.
// TODO: verify. Replace with a reading taken from the live status page on a known date.
const REFERENCE_DATE_UTC_MS = Date.UTC(2025, 0, 1, 0, 0, 0)
// TODO: verify. Approximate distance from Earth on the reference date, in kilometres.
const REFERENCE_DISTANCE_KM = 24_900_000_000
// TODO: verify. Approximate outward speed, in km per second (simple linear estimate; ignores Earth's orbit).
const SPEED_KM_PER_SECOND = 17

const KM_PER_AU = 149_597_870.7
const LIGHT_KM_PER_SECOND = 299_792.458

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 1000)
  return () => window.clearInterval(id)
}
const getSecond = () => Math.floor(Date.now() / 1000)
const getServerSecond = () => null

export function VoyagerCounter() {
  const nowSeconds = useSyncExternalStore(subscribe, getSecond, getServerSecond)
  const distanceKm =
    nowSeconds === null ? null : REFERENCE_DISTANCE_KM + (nowSeconds - REFERENCE_DATE_UTC_MS / 1000) * SPEED_KM_PER_SECOND

  const fmt = (n: number, digits = 0) => n.toLocaleString('en-US', { maximumFractionDigits: digits })

  return (
    <section aria-labelledby="voyager-heading" className="glow-card flex flex-col gap-4 p-5 sm:p-6">
      <div className="flex flex-col gap-1">
        <p className="text-xs font-semibold uppercase tracking-widest text-space-cyan">Live-ish distance</p>
        <h2 id="voyager-heading" className="text-2xl font-bold">
          How far from Earth am I?
        </h2>
      </div>

      <p className="font-mono text-3xl font-bold tabular-nums text-space-cyan sm:text-5xl" aria-live="off">
        {distanceKm === null ? '—' : fmt(distanceKm)}
        <span className="ml-2 font-sans text-base font-medium text-muted-foreground">km</span>
      </p>

      {distanceKm !== null && (
        <dl className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl bg-background/40 p-3">
            <dt className="text-muted-foreground">Astronomical units</dt>
            <dd className="font-mono text-lg font-semibold tabular-nums">{fmt(distanceKm / KM_PER_AU, 2)} AU</dd>
          </div>
          <div className="rounded-xl bg-background/40 p-3">
            <dt className="text-muted-foreground">Radio signal travel time</dt>
            <dd className="font-mono text-lg font-semibold tabular-nums">
              {fmt(distanceKm / LIGHT_KM_PER_SECOND / 3600, 1)} hours
            </dd>
          </div>
        </dl>
      )}

      <p className="text-sm text-muted-foreground">
        Approximate. See{' '}
        <a
          href="https://voyager.jpl.nasa.gov/mission/status/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-medium text-space-cyan underline-offset-4 hover:underline"
        >
          NASA&apos;s live status
          <ExternalLink className="size-3" aria-hidden="true" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
        .
      </p>
    </section>
  )
}
