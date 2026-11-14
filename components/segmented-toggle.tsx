'use client'

import { cn } from '@/lib/utils'

interface Option<T extends string> {
  value: T
  label: string
  ariaLabel?: string
}

interface SegmentedToggleProps<T extends string> {
  label: string
  value: T
  options: Option<T>[]
  onChange: (value: T) => void
  accent?: string
}

export function SegmentedToggle<T extends string>({ label, value, options, onChange, accent = '#9A86FF' }: SegmentedToggleProps<T>) {
  return (
    <div role="group" aria-label={label} className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground" aria-hidden="true">
        {label}
      </span>
      <div className="inline-flex rounded-full border border-border bg-secondary/60 p-1">
        {options.map((o) => {
          const active = o.value === value
          return (
            <button
              key={o.value}
              type="button"
              aria-pressed={active}
              aria-label={o.ariaLabel}
              onClick={() => onChange(o.value)}
              className={cn(
                'min-h-11 min-w-14 flex-1 whitespace-nowrap rounded-full px-4 text-sm font-semibold transition-colors',
                active ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground',
              )}
              style={active ? { backgroundColor: accent } : undefined}
            >
              {o.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
