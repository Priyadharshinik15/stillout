// Portions of this code were generated with SI assistance and reviewed by the team.
import { RelicMap } from '@/components/relic-map/relic-map'
import { objects } from '@/lib/data'

export default function HomePage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-3 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-space-orange">
          Abandoned but not forgotten
        </p>
        <h1 className="text-3xl font-bold leading-tight sm:text-5xl">
          Diaries of the hardware <span className="text-space-cyan">left behind</span>
        </h1>
        <p className="mx-auto max-w-xl text-pretty leading-relaxed text-muted-foreground">
          Rovers, landers and probes are still out there on the Moon, on Mars and in deep space. Pick one and let it
          tell you its story. Every sentence links to its NASA source.
        </p>
      </header>
      <RelicMap objects={objects} />
    </div>
  )
}
