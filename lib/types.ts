// Portions of this code were generated with SI assistance and reviewed by the team.

export type Region = 'moon' | 'mars' | 'space'
export type Status = 'Active' | 'Sleeping' | 'Silent' | 'Still travelling'
export type Grade = '3-5' | '6-8'
export type Lang = 'en' | 'ta' | 'hi'
export type HardwareType = 'lander' | 'rover' | 'helicopter' | 'probe'

export interface Fact {
  id: string
  text: string
  sourceName: string
  sourceUrl: string
  _verify?: string
}

export interface StorySentence {
  text: string
  factId: string
}

export interface RelicObject {
  id: string
  name: string
  type: HardwareType
  region: Region
  place: string
  status: Status
  coordinates: { lat: number; lon: number; _verify?: string } | null
  facts: Fact[]
  stories: Record<Grade, Record<Lang, StorySentence[]>>
  thenImage?: string
  nowImage?: string
  thenAlt?: string
  nowAlt?: string
  imageCaption?: string
  modelGlb?: string
}

export interface MissionOption {
  id: string
  label: string
}

export interface Mission {
  id: string
  objectId: string
  question: string
  options: MissionOption[]
  correctOptionId: string
  explanation: string
  factId: string
}
