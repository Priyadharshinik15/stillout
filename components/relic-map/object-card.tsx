import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { StatusTag } from '@/components/status-tag'
import { TYPE_LABELS } from '@/lib/status'
import type { RelicObject } from '@/lib/types'

export function ObjectCard({ object }: { object: RelicObject }) {
  return (
    <article className="glow-card flex flex-col gap-4 p-5" aria-live="polite">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-space-violet">
            {TYPE_LABELS[object.type]}
          </p>
          <h2 className="text-2xl font-bold">{object.name}</h2>
        </div>
        <StatusTag status={object.status} />
      </div>
      <p className="flex items-center gap-2 text-sm text-muted-foreground">
        <MapPin className="size-4 shrink-0 text-space-orange" aria-hidden="true" />
        {object.place}
      </p>
      <Link
        href={`/objects/${object.id}/`}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-space-cyan px-6 font-display text-base font-semibold text-primary-foreground shadow-[0_0_24px_-6px_#4FD1FF] transition-transform hover:scale-[1.02] active:scale-[0.98]"
      >
        Meet it
        <ArrowRight className="size-5" aria-hidden="true" />
      </Link>
    </article>
  )
}
