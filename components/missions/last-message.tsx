// Portions of this code were generated with SI assistance and reviewed by the team.
'use client'

import { useState } from 'react'
import { ExternalLink, Send, Sparkles } from 'lucide-react'
import { findFact } from '@/lib/data'

const RULES: { keywords: string[]; praise: string; factId: string }[] = [
  {
    keywords: ['sand', 'stuck', 'troy', 'wheel', 'wheels'],
    praise: 'You remembered the soft sand. That is exactly what trapped Spirit!',
    factId: 'sp-stuck',
  },
  {
    keywords: ['dust', 'dusty', 'storm'],
    praise: 'Great detail about dust! Dust is a big part of the Mars rover story.',
    factId: 'op-storm',
  },
  {
    keywords: ['science', 'scientist', 'explore', 'explored', 'exploring', 'discover', 'discovery', 'rocks'],
    praise: 'Science was the whole reason Spirit went to Mars. Lovely detail!',
    factId: 'sp-landing',
  },
  {
    keywords: ['mars', 'gusev', 'crater', 'red planet'],
    praise: 'Nice! You mentioned Spirit’s home on Mars.',
    factId: 'sp-landing',
  },
  {
    keywords: ['2010', 'silent', 'signal', 'message'],
    praise: 'You thought about Spirit’s last signal. Very thoughtful!',
    factId: 'sp-last',
  },
]

function matches(text: string, keyword: string) {
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return new RegExp(`\\b${escaped}\\b`, 'i').test(text)
}

export function LastMessage() {
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = message.trim()
    if (trimmed.length < 10) {
      setError('Write a little more, at least one full sentence.')
      return
    }
    setError(null)
    setSubmitted(trimmed)
  }

  const hits = submitted ? RULES.filter((r) => r.keywords.some((k) => matches(submitted, k))) : []
  const uniqueHits = hits.filter((h, i) => hits.findIndex((x) => x.factId === h.factId) === i).slice(0, 2)

  return (
    <section aria-labelledby="last-message-heading" className="glow-card flex flex-col gap-4 p-5 sm:p-6">
      <div className="flex flex-col gap-1">
        <p className="text-xs font-semibold uppercase tracking-widest text-space-pink">Write the Last Message</p>
        <h2 id="last-message-heading" className="text-2xl font-bold">
          Say goodbye to Spirit
        </h2>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-3" noValidate>
        <label htmlFor="goodbye" className="font-medium">
          Write a goodbye to Spirit.
        </label>
        <textarea
          id="goodbye"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          maxLength={600}
          aria-describedby={error ? 'goodbye-error' : 'goodbye-hint'}
          aria-invalid={error ? true : undefined}
          placeholder="Dear Spirit, thank you for..."
          className="w-full resize-y rounded-2xl border border-input bg-background/60 p-4 text-base leading-relaxed placeholder:text-muted-foreground/70 focus-visible:border-space-cyan"
        />
        {error ? (
          <p id="goodbye-error" className="text-sm text-space-pink">
            {error}
          </p>
        ) : (
          <p id="goodbye-hint" className="text-xs text-muted-foreground">
            Tip: mention a real detail from Spirit&apos;s story. Your message stays on this device.
          </p>
        )}
        <button
          type="submit"
          className="inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-space-pink px-6 font-display font-semibold text-primary-foreground shadow-[0_0_24px_-6px_#FF5C8A] transition-transform active:scale-95"
        >
          <Send className="size-4" aria-hidden="true" />
          Send to Gusev Crater
        </button>
      </form>

      {submitted && (
        <div role="status" className="flex flex-col gap-3 rounded-2xl bg-background/50 p-4">
          <p className="flex items-center gap-2 font-display font-semibold text-space-yellow">
            <Sparkles className="size-5" aria-hidden="true" />
            Message beamed (in our imagination)!
          </p>
          {uniqueHits.length === 0 ? (
            <FeedbackFact
              praise="What a kind goodbye. Next time, try adding a real detail, like where Spirit landed or what stopped it."
              factId="sp-last"
            />
          ) : (
            uniqueHits.map((h) => <FeedbackFact key={h.factId} praise={h.praise} factId={h.factId} />)
          )}
        </div>
      )}
    </section>
  )
}

function FeedbackFact({ praise, factId }: { praise: string; factId: string }) {
  const fact = findFact(factId)
  return (
    <div className="flex flex-col gap-1.5 border-l-2 border-space-violet pl-3">
      <p className="text-sm leading-relaxed">{praise}</p>
      {fact && (
        <>
          <p className="text-sm text-muted-foreground">Did you know? {fact.text}</p>
          <a
            href={fact.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-1 text-xs font-medium text-space-cyan underline-offset-4 hover:underline"
          >
            Source: {fact.sourceName}
            <ExternalLink className="size-3" aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </>
      )}
    </div>
  )
}
