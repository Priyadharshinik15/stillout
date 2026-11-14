// Portions of this code were generated with SI assistance and reviewed by the team.
'use client'

import { Lock } from 'lucide-react'
import { QuizCard } from './quiz-card'
import { BadgeProgress } from './badge-progress'
import { LastMessage } from './last-message'
import { findFact } from '@/lib/data'
import { resetProgress, useProgress } from '@/lib/progress'
import type { Mission } from '@/lib/types'

export function MissionBoard({ missions }: { missions: Mission[] }) {
  const { completed } = useProgress()
  const done = missions.filter((m) => completed.includes(m.id)).length
  const earned = done >= missions.length

  return (
    <div className="flex flex-col gap-6">
      <BadgeProgress done={done} total={missions.length} />

      <div className="grid gap-4 md:grid-cols-2">
        {missions.map((m, i) => (
          <QuizCard
            key={`${m.id}-${completed.includes(m.id)}`}
            mission={m}
            number={i + 1}
            fact={findFact(m.factId)}
            alreadyCompleted={completed.includes(m.id)}
          />
        ))}
      </div>

      {earned ? (
        <LastMessage />
      ) : (
        <div className="glow-card flex items-center gap-3 p-5 text-muted-foreground">
          <Lock className="size-5 shrink-0" aria-hidden="true" />
          <p className="text-sm">Finish all {missions.length} missions to unlock: Write the Last Message to Spirit.</p>
        </div>
      )}

      {done > 0 && (
        <button
          type="button"
          onClick={resetProgress}
          className="min-h-11 w-fit self-center rounded-full px-4 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          Reset my progress
        </button>
      )}
    </div>
  )
}
