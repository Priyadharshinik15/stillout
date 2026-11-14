// Portions of this code were generated with SI assistance and reviewed by the team.
'use client'

import { useState } from 'react'
import { ExternalLink, Info, Square, Volume2 } from 'lucide-react'
import { SegmentedToggle } from '@/components/segmented-toggle'
import { useSpeech } from '@/hooks/use-speech'
import { LANG_LABELS } from '@/lib/status'
import type { Grade, Lang, RelicObject } from '@/lib/types'
import { cn } from '@/lib/utils'

const PROBLEM_MESSAGES = {
  unsupported: "Your browser can't read stories aloud yet. You can still read along, you're doing great!",
  'no-voice': (langName: string) =>
    `This device doesn't have a ${langName} voice installed yet. Try reading it yourself, or switch to EN to listen.`,
  error: 'Oops, the voice stopped unexpectedly. Please tap Listen to try again.',
}

export function StoryPlayer({ object }: { object: RelicObject }) {
  const [grade, setGrade] = useState<Grade>('3-5')
  const [lang, setLang] = useState<Lang>('en')
  const { speak, stop, speakingIndex, isSpeaking, problem, clearProblem } = useSpeech()

  const sentences = object.stories[grade][lang]
  const factsById = new Map(object.facts.map((f) => [f.id, f]))

  const changeGrade = (g: Grade) => {
    stop()
    clearProblem()
    setGrade(g)
  }
  const changeLang = (l: Lang) => {
    stop()
    clearProblem()
    setLang(l)
  }

  const problemMessage =
    problem === 'no-voice'
      ? PROBLEM_MESSAGES['no-voice'](LANG_LABELS[lang].name)
      : problem
        ? PROBLEM_MESSAGES[problem]
        : null

  return (
    <section aria-labelledby="story-heading" className="glow-card flex flex-col gap-6 p-5 sm:p-6">
      <div className="flex flex-col gap-1">
        <p className="text-xs font-semibold uppercase tracking-widest text-space-orange">Hardware Speaks</p>
        <h2 id="story-heading" className="text-2xl font-bold">
          {object.name} tells its story
        </h2>
      </div>

      <div className="flex flex-wrap items-end gap-4">
        <SegmentedToggle<Grade>
          label="Grade"
          value={grade}
          onChange={changeGrade}
          options={[
            { value: '3-5', label: '3-5', ariaLabel: 'Grade 3 to 5' },
            { value: '6-8', label: '6-8', ariaLabel: 'Grade 6 to 8' },
          ]}
        />
        <SegmentedToggle<Lang>
          label="Language"
          value={lang}
          onChange={changeLang}
          accent="#4FD1FF"
          options={(Object.keys(LANG_LABELS) as Lang[]).map((l) => ({
            value: l,
            label: LANG_LABELS[l].short,
            ariaLabel: LANG_LABELS[l].name,
          }))}
        />
        <button
          type="button"
          onClick={() => (isSpeaking ? stop() : speak(sentences.map((s) => s.text), LANG_LABELS[lang].speechCode))}
          className={cn(
            'inline-flex min-h-12 items-center gap-2 rounded-full px-5 font-display font-semibold transition-transform active:scale-95',
            isSpeaking
              ? 'bg-space-pink text-primary-foreground'
              : 'bg-space-orange text-primary-foreground shadow-[0_0_24px_-6px_#FF7A45]',
          )}
        >
          {isSpeaking ? <Square className="size-4" aria-hidden="true" /> : <Volume2 className="size-5" aria-hidden="true" />}
          {isSpeaking ? 'Stop' : 'Listen'}
        </button>
      </div>

      {problemMessage && (
        <p role="status" className="flex items-start gap-2 rounded-xl bg-space-yellow/10 p-3 text-sm text-space-yellow">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {problemMessage}
        </p>
      )}

      <ol lang={lang} className="flex flex-col gap-4">
        {sentences.map((s, i) => {
          const fact = factsById.get(s.factId)
          const active = speakingIndex === i
          return (
            <li
              key={`${grade}-${lang}-${i}`}
              className={cn(
                'flex flex-col gap-2 rounded-2xl border border-transparent bg-background/40 p-4 transition-colors',
                active && 'border-space-cyan bg-space-cyan/10',
              )}
            >
              <p className="text-pretty text-lg leading-relaxed">{s.text}</p>
              {fact ? (
                <a
                  href={fact.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  lang="en"
                  className="inline-flex w-fit min-h-8 items-center gap-1.5 text-xs font-medium text-space-cyan underline-offset-4 hover:underline"
                >
                  Source: {fact.sourceName}
                  <ExternalLink className="size-3" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ) : (
                <span className="text-xs text-space-yellow">TODO: verify source</span>
              )}
            </li>
          )
        })}
      </ol>

      {lang !== 'en' && (
        <p className="text-xs text-muted-foreground">
          Translation draft, awaiting review by a native speaker.
        </p>
      )}
    </section>
  )
}
