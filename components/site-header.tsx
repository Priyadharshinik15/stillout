'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Orbit } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/', label: 'Map' },
  { href: '/missions/', label: 'Missions' },
  { href: '/about/', label: 'About' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' || pathname.startsWith('/objects') : pathname.startsWith(href.replace(/\/$/, ''))

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 rounded-lg py-2">
          <span className="grid size-9 place-items-center rounded-full bg-space-violet/20 text-space-cyan">
            <Orbit className="size-5" aria-hidden="true" />
          </span>
          <span className="font-display text-base font-semibold leading-tight tracking-tight">
            StillOut <span className="text-space-cyan">There</span>
          </span>
        </Link>
        <nav aria-label="Main">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={cn(
                    'inline-flex min-h-11 items-center rounded-full px-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:px-4',
                    isActive(item.href) && 'bg-secondary text-foreground',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
