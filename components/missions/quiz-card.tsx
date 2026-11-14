// Portions of this code were generated with SI assistance and reviewed by the team.
'use client'

import { useState } from 'react'
import { CheckCircle2, ExternalLink, RotateCcw, XCircle } from 'lucide-react'
import { completeMission } from '@/lib/progress'
import type { Fact, Mission } from '@/lib/types'
import { cn } from '@/lib/utils'

interface QuizCardProps {
  mission: Mission
  number: number
  fact: Fact | undefined
  alreadyCompleted: boolean
}

export function QuizCard({ mission, number, fact, alreadyCompleted }: QuizCardProps) {
  const [picked, setPicked] = useState<string | null>(alreadyCompleted ? mission.correctOptionId : null)
  const answered = picked !== null
  const correct = picked === mission.correctOptionId

  const choose = (optionId: string) => {
    if (answered) return
    setPicked(optionId)
    if (optionId === mission.correctOptionId) completeMission(mission.id)
  }

  return (
    <article
      aria-labelledby={`${mission.id}-q`}
      className={cn('glow-card flex flex-col gap-4 p-5', correct && 'shadow-[0_0_0_1px_#3DDC97,0_12px_40px_-18px_#3DDC97]')}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-space-orange">Mission {number}</p>
        {correct && (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-space-green">
            <CheckCircle2 className="size-4" aria-hidden="true" /> Complete
          </span>
        )}
      </div>
      <h3 id={`${mission.id}-q`} className="text-xl font-bold">
        {mission.question}
      </h3>

      <div className="flex flex-col gap-2">
        {mission.options.map((o) => {
          const isPicked = picked === o.id
          const isCorrect = o.id === mission.correctOptionId
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => choose(o.id)}
              disabled={answered}
              aria-pressed={isPicked}
              className={cn(
                'flex min-h-12 items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left font-medium transition-colors',
                !answered && 'border-border hover:border-space-cyan hover:bg-space-cyan/5',
                answered && isCorrect && 'border-space-green bg-space-green/10 text-space-green',
                answered && isPicked && !isCorrect && 'border-space-pink bg-space-pink/10 text-space-pink',
                answered && !isPicked && !isCorrect && 'border-border opacity-60',
              )}
            >
              {o.label}
              {answered && isCorrect && <CheckCircle2 className="size-5 shrink-0" aria-label="Correct answer" />}
              {answered && isPicked && !isCorrect && <XCircle className="size-5 shrink-0" aria-label="Your answer" />}
            </button>
          )
        })}
      </div>

      {answered && (
        <div role="status" className="flex flex-col gap-3 rounded-2xl bg-background/50 p-4">
          <p className={cn('font-display font-semibold', correct ? 'text-space-green' : 'text-space-pink')}>
            {correct ? 'Correct, detective!' : 'Not quite. Have another look!'}
          </p>
          {correct && <p className="text-sm leading-relaxed">{mission.explanation}</p>}
          <div className="flex flex-wrap items-center gap-3">
            {fact && (
              <a
                href={fact.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center gap-1.5 text-sm font-medium text-space-cyan underline-offset-4 hover:underline"
              >
                Read the NASA source
                <ExternalLink className="size-3.5" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
            {!correct && (
              <button
                type="button"
                onClick={() => setPicked(null)}
                className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-secondary px-4 text-sm font-semibold"
              >
                <RotateCcw className="size-4" aria-hidden="true" />
                Try again
              </button>
            )}
          </div>
        </div>
      )}
    </article>
  )
}
