import type { Metadata } from 'next'
import { MissionBoard } from '@/components/missions/mission-board'
import { missions } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Science Missions',
  description: 'Solve science missions about left-behind hardware and earn the Rover Detective badge.',
}

export default function MissionsPage() {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-space-green">Science Missions</p>
        <h1 className="text-3xl font-bold sm:text-4xl">Become a Rover Detective</h1>
        <p className="max-w-xl text-pretty leading-relaxed text-muted-foreground">
          Answer each mission using real facts. Every answer links to the NASA source, so you can check it yourself.
        </p>
      </header>
      <MissionBoard missions={missions} />
    </div>
  )
}
