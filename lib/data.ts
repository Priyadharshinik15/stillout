// Portions of this code were generated with SI assistance and reviewed by the team.
import objectsJson from '@/src/data/objects.json'
import missionsJson from '@/src/data/missions.json'
import type { Fact, Mission, RelicObject, Region } from './types'

export const objects = (objectsJson as unknown as { objects: RelicObject[] }).objects
export const missions = (missionsJson as unknown as { missions: Mission[] }).missions

export function getObject(id: string) {
  return objects.find((o) => o.id === id)
}

export function getObjectsByRegion(region: Region) {
  return objects.filter((o) => o.region === region)
}

export type FactWithObject = Fact & { objectId: string; objectName: string }

export const allFacts: FactWithObject[] = objects.flatMap((o) =>
  o.facts.map((f) => ({ ...f, objectId: o.id, objectName: o.name })),
)

export function findFact(factId: string) {
  return allFacts.find((f) => f.id === factId)
}

export const allSources = Array.from(
  new Map(allFacts.map((f) => [f.sourceUrl, { name: f.sourceName, url: f.sourceUrl }])).values(),
)
