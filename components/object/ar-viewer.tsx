// Portions of this code were generated with SI assistance and reviewed by the team.
'use client'

import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'
import { Box } from 'lucide-react'

const MODEL_VIEWER_SRC = 'https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js'

export function ArViewer({ src, name, available }: { src: string; name: string; available: boolean }) {
  const viewerRef = useRef<HTMLElement>(null)
  const [loadFailed, setFailed] = useState(false)
  const failed = !available || loadFailed

  useEffect(() => {
    const el = viewerRef.current
    if (!el) return
    const onError = () => setFailed(true)
    el.addEventListener('error', onError)
    return () => el.removeEventListener('error', onError)
  }, [])

  return (
    <section aria-labelledby="ar-heading" className="glow-card flex flex-col gap-4 p-5 sm:p-6">
      {available && (
        <Script src={MODEL_VIEWER_SRC} type="module" strategy="afterInteractive" onError={() => setFailed(true)} />
      )}
      <div className="flex flex-col gap-1">
        <p className="text-xs font-semibold uppercase tracking-widest text-space-green">AR viewer</p>
        <h2 id="ar-heading" className="text-2xl font-bold">
          Put a rover on your desk
        </h2>
      </div>

      {failed ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-background/40 p-8 text-center">
          <Box className="size-10 text-space-green" aria-hidden="true" />
          <p className="font-semibold">The 3D model is still on its way to this app.</p>
          <p className="text-sm text-muted-foreground">
            Team: add a rover model at <code className="rounded bg-muted px-1.5 py-0.5">/public{src}</code> to turn
            this on.
          </p>
        </div>
      ) : (
        <>
          <model-viewer
            ref={viewerRef}
            src={src}
            alt={`3D model of a rover similar to ${name}`}
            ar
            camera-controls
            auto-rotate
            ar-modes="webxr scene-viewer quick-look"
            shadow-intensity="1"
            style={{ width: '100%', height: '320px', backgroundColor: 'rgba(10,10,36,0.6)', borderRadius: '1rem' }}
          />
          <p className="text-xs text-muted-foreground">
            Drag to spin. On a supported phone, tap the AR button to place it in your room.
          </p>
        </>
      )}
    </section>
  )
}
