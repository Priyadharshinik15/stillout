'use client'

import { ScanSearch } from 'lucide-react'
import { cn } from '@/lib/utils'

export function BadgeProgress({ done, total }: { done: number; total: number }) {
  const earned = done >= total
  const percent = Math.round((done / total) * 100)

  return (
    <section aria-labelledby="badge-heading" className="glow-card flex items-center gap-5 p-5">
      <div
        className={cn(
          'grid size-20 shrink-0 place-items-center rounded-[1.75rem] border-2 transition-all',
          earned
            ? 'rotate-3 border-space-yellow bg-space-yellow/15 text-space-yellow shadow-[0_0_32px_-4px_#FFC84A]'
            : 'border-dashed border-border text-muted-foreground',
        )}
        aria-hidden="true"
      >
        <ScanSearch className="size-9" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <h2 id="badge-heading" className="text-lg font-bold">
          {earned ? 'You earned the Rover Detective badge!' : 'Rover Detective badge'}
        </h2>
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={done}
          aria-label="Missions completed"
          className="h-3 w-full overflow-hidden rounded-full bg-secondary"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-space-cyan via-space-violet to-space-yellow transition-[width] duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="text-sm text-muted-foreground">
          {done} of {total} missions
        </p>
      </div>
    </section>
  )
}
