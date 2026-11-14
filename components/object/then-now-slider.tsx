// Portions of this code were generated with SI assistance and reviewed by the team.
'use client'

import { useRef, useState } from 'react'
import { MoveHorizontal } from 'lucide-react'

interface ThenNowSliderProps {
  thenSrc: string
  nowSrc: string
  thenAlt: string
  nowAlt: string
  caption: string
}

export function ThenNowSlider({ thenSrc, nowSrc, thenAlt, nowAlt, caption }: ThenNowSliderProps) {
  const [pos, setPos] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const updateFromClientX = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    setPos(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)))
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 2
    if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - step))
    else if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + step))
    else if (e.key === 'Home') setPos(0)
    else if (e.key === 'End') setPos(100)
    else return
    e.preventDefault()
  }

  return (
    <section aria-labelledby="then-now-heading" className="glow-card flex flex-col gap-4 p-5 sm:p-6">
      <div className="flex flex-col gap-1">
        <p className="text-xs font-semibold uppercase tracking-widest text-space-yellow">Then vs Now</p>
        <h2 id="then-now-heading" className="text-2xl font-bold">
          Drag to travel through time
        </h2>
      </div>

      <div
        ref={containerRef}
        className="relative aspect-[4/3] w-full cursor-ew-resize select-none overflow-hidden rounded-2xl bg-muted"
        style={{ touchAction: 'pan-y' }}
        onPointerDown={(e) => {
          dragging.current = true
          e.currentTarget.setPointerCapture(e.pointerId)
          updateFromClientX(e.clientX)
        }}
        onPointerMove={(e) => dragging.current && updateFromClientX(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={nowSrc} alt={nowAlt} className="absolute inset-0 size-full object-cover" draggable={false} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thenSrc}
          alt={thenAlt}
          className="absolute inset-0 size-full object-cover"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          draggable={false}
        />

        <span className="absolute left-3 top-3 rounded-full bg-background/80 px-3 py-1 text-xs font-bold uppercase tracking-widest text-space-yellow">
          Then
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-background/80 px-3 py-1 text-xs font-bold uppercase tracking-widest text-space-cyan">
          Now
        </span>
        <span className="absolute bottom-3 left-3 rounded-full bg-space-pink/90 px-3 py-1 text-[11px] font-semibold text-primary-foreground">
          Placeholder art
        </span>

        <div className="absolute inset-y-0 w-0.5 bg-foreground shadow-[0_0_12px_#fff]" style={{ left: `${pos}%` }} aria-hidden="true" />
        <div
          role="slider"
          tabIndex={0}
          aria-label="Then and now comparison"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={`${Math.round(pos)}% then`}
          onKeyDown={onKeyDown}
          className="absolute top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-foreground text-primary-foreground shadow-lg"
          style={{ left: `${pos}%` }}
        >
          <MoveHorizontal className="size-5" aria-hidden="true" />
        </div>
      </div>

      <p className="text-xs text-muted-foreground">{caption}</p>
    </section>
  )
}
