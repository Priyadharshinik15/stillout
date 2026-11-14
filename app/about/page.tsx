// Portions of this code were generated with SI assistance and reviewed by the team.
import type { Metadata } from 'next'
import { ExternalLink } from 'lucide-react'
import { allSources, objects } from '@/lib/data'

export const metadata: Metadata = {
  title: 'About & Sources',
  description: 'How StillOut There works, the NASA resources it uses, and how SI assistance was used.',
}

const EXTRA_RESOURCES = [
  { name: 'NSSDCA Master Catalog', url: 'https://nssdc.gsfc.nasa.gov/nmc/' },
  { name: 'NASA Science: Missions', url: 'https://science.nasa.gov/mission/' },
  { name: 'NASA Planetary Data System', url: 'https://pds.nasa.gov/' },
  { name: 'Voyager Mission Status (JPL)', url: 'https://voyager.jpl.nasa.gov/mission/status/' },
]

export default function AboutPage() {
  const sources = Array.from(new Map([...EXTRA_RESOURCES, ...allSources].map((s) => [s.url, s])).values())

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <header className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-space-violet">About &amp; Sources</p>
        <h1 className="text-3xl font-bold sm:text-4xl">Trust is the whole idea</h1>
        <p className="text-pretty leading-relaxed text-muted-foreground">
          StillOut There introduces students aged 8-14 to hardware left on the Moon, on Mars and in deep space. Each
          object tells its story in first person, and every sentence links to the NASA source it is based on.
        </p>
      </header>

      <section className="glow-card flex flex-col gap-3 p-5" aria-labelledby="how-heading">
        <h2 id="how-heading" className="text-xl font-bold">
          How the stories are made
        </h2>
        <p className="leading-relaxed">
          Prototype uses a curated knowledge base. Live retrieval-augmented generation (RAG) is our planned next step.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Stories are pre-written from a short list of facts. No AI model runs in this app, and no data leaves your
          device. Tamil and Hindi translations are drafts awaiting native-speaker review. Map pin positions are
          approximate.
        </p>
      </section>

      <section className="glow-card flex flex-col gap-4 p-5" aria-labelledby="sources-heading">
        <h2 id="sources-heading" className="text-xl font-bold">
          NASA resources used
        </h2>
        <ul className="flex flex-col gap-2">
          {sources.map((s) => (
            <li key={s.url}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center gap-2 font-medium text-space-cyan underline-offset-4 hover:underline"
              >
                {s.name}
                <ExternalLink className="size-3.5" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              <span className="block break-all text-xs text-muted-foreground">{s.url}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="glow-card flex flex-col gap-4 p-5" aria-labelledby="facts-heading">
        <h2 id="facts-heading" className="text-xl font-bold">
          Every fact in the app
        </h2>
        {objects.map((o) => (
          <div key={o.id} className="flex flex-col gap-2">
            <h3 className="font-semibold text-space-orange">{o.name}</h3>
            <ul className="flex flex-col gap-2 text-sm">
              {o.facts.map((f) => (
                <li key={f.id} className="leading-relaxed">
                  {f.text}{' '}
                  <a
                    href={f.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-space-cyan underline-offset-4 hover:underline"
                  >
                    ({f.sourceName})<span className="sr-only"> opens in a new tab</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="glow-card flex flex-col gap-3 p-5" aria-labelledby="disclosure-heading">
        <h2 id="disclosure-heading" className="text-xl font-bold">
          Disclosure
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Prototype built for NASA Space Apps Challenge. Story drafts and parts of the code were created with SI
          assistance and reviewed by the team. Not affiliated with or endorsed by NASA. All data credited to NASA
          sources linked on each sentence. Then-vs-Now images are placeholder illustrations until real NASA imagery
          with credit is added.
        </p>
      </section>
    </div>
  )
}
