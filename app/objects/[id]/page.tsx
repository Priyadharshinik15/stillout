// Portions of this code were generated with SI assistance and reviewed by the team.
import { existsSync } from 'node:fs'
import path from 'node:path'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react'
import { StatusTag } from '@/components/status-tag'
import { StoryPlayer } from '@/components/object/story-player'
import { ThenNowSlider } from '@/components/object/then-now-slider'
import { VoyagerCounter } from '@/components/object/voyager-counter'
import { ArViewer } from '@/components/object/ar-viewer'
import { getObject, objects } from '@/lib/data'
import { TYPE_LABELS } from '@/lib/status'

export const dynamicParams = false

export function generateStaticParams() {
  return objects.map((o) => ({ id: o.id }))
}

type PageProps = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const object = getObject(id)
  return {
    title: object ? `Meet ${object.name}` : 'Not found',
    description: object ? `${object.name} at ${object.place} tells its story, with a NASA source on every sentence.` : undefined,
  }
}

export default async function ObjectPage({ params }: PageProps) {
  const { id } = await params
  const object = getObject(id)
  if (!object) notFound()

  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/"
        className="inline-flex min-h-11 w-fit items-center gap-2 rounded-full pr-3 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to the map
      </Link>

      <header className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-space-violet">{TYPE_LABELS[object.type]}</p>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold sm:text-4xl">{object.name}</h1>
          <StatusTag status={object.status} />
        </div>
        <p className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="size-4 text-space-orange" aria-hidden="true" />
          {object.place}
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-start">
        <StoryPlayer object={object} />

        <div className="flex flex-col gap-6">
          {object.id === 'voyager-1' && <VoyagerCounter />}
          {object.thenImage && object.nowImage && (
            <ThenNowSlider
              thenSrc={object.thenImage}
              nowSrc={object.nowImage}
              thenAlt={object.thenAlt ?? `${object.name} in the past`}
              nowAlt={object.nowAlt ?? `${object.name} today`}
              caption={object.imageCaption ?? ''}
            />
          )}
          {object.modelGlb && (
            <ArViewer
              src={object.modelGlb}
              name={object.name}
              available={existsSync(path.join(process.cwd(), 'public', object.modelGlb))}
            />
          )}

          <section aria-labelledby="facts-heading" className="glow-card flex flex-col gap-3 p-5">
            <h2 id="facts-heading" className="text-lg font-bold">
              Fact file
            </h2>
            <ul className="flex flex-col gap-3 text-sm">
              {object.facts.map((f) => (
                <li key={f.id} className="flex flex-col gap-1">
                  <span className="leading-relaxed">{f.text}</span>
                  <a
                    href={f.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-fit text-xs text-space-cyan underline-offset-4 hover:underline"
                  >
                    {f.sourceName}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <Link
            href="/missions/"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-space-green/60 px-6 font-display font-semibold text-space-green transition-colors hover:bg-space-green/10"
          >
            Try the Science Missions
            <ArrowRight className="size-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  )
}
