import { STATUS_COLORS } from '@/lib/status'
import type { Status } from '@/lib/types'
import { cn } from '@/lib/utils'

export function StatusTag({ status, className }: { status: Status; className?: string }) {
  const color = STATUS_COLORS[status]
  return (
    <span
      className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold', className)}
      style={{ color, backgroundColor: `${color}1f`, boxShadow: `inset 0 0 0 1px ${color}55` }}
    >
      <span className="size-2 rounded-full" style={{ backgroundColor: color }} aria-hidden="true" />
      <span>
        <span className="sr-only">Status: </span>
        {status}
      </span>
    </span>
  )
}
