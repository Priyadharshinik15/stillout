import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background/60">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 py-8 text-sm leading-relaxed text-muted-foreground sm:px-6">
        <p className="text-pretty">
          Prototype built for NASA Space Apps Challenge. Story drafts and parts of the code were created with SI
          assistance and reviewed by the team. Not affiliated with or endorsed by NASA. All data credited to NASA
          sources linked on each sentence.
        </p>
        <Link href="/about/" className="w-fit font-medium text-space-cyan underline-offset-4 hover:underline">
          About &amp; Sources
        </Link>
      </div>
    </footer>
  )
}
