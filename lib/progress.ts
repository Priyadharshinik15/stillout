// Portions of this code were generated with SI assistance and reviewed by the team.
'use client'

import { useSyncExternalStore } from 'react'

export interface Progress {
  completed: string[]
}

const STORAGE_KEY = 'stillout-there-progress-v1'
const EMPTY: Progress = { completed: [] }

let cache: Progress = EMPTY
let loaded = false
const listeners = new Set<() => void>()

function read(): Progress {
  if (!loaded && typeof window !== 'undefined') {
    loaded = true
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as Progress
        if (Array.isArray(parsed.completed)) cache = { completed: parsed.completed.filter((x) => typeof x === 'string') }
      }
    } catch {
      cache = EMPTY
    }
  }
  return cache
}

function write(next: Progress) {
  cache = next
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // Storage can be unavailable (private mode); progress still lives in memory.
  }
  listeners.forEach((l) => l())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useProgress() {
  return useSyncExternalStore(subscribe, read, () => EMPTY)
}

export function completeMission(id: string) {
  const current = read()
  if (current.completed.includes(id)) return
  write({ completed: [...current.completed, id] })
}

export function resetProgress() {
  write(EMPTY)
}
