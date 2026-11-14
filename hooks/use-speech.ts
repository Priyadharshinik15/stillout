// Portions of this code were generated with SI assistance and reviewed by the team.
'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

export type SpeechProblem = 'unsupported' | 'no-voice' | 'error' | null

function findVoice(voices: SpeechSynthesisVoice[], speechCode: string) {
  const normalize = (l: string) => l.replace('_', '-').toLowerCase()
  const target = normalize(speechCode)
  const base = target.split('-')[0]
  return voices.find((v) => normalize(v.lang) === target) ?? voices.find((v) => normalize(v.lang).startsWith(base))
}

export function useSpeech() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null)
  const [problem, setProblem] = useState<SpeechProblem>(null)
  const runId = useRef(0)

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    const synth = window.speechSynthesis
    const load = () => setVoices(synth.getVoices())
    load()
    synth.addEventListener('voiceschanged', load)
    return () => {
      synth.removeEventListener('voiceschanged', load)
      synth.cancel()
    }
  }, [])

  const stop = useCallback(() => {
    runId.current += 1
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel()
    setSpeakingIndex(null)
  }, [])

  const speak = useCallback(
    (sentences: string[], speechCode: string) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        setProblem('unsupported')
        return
      }
      const synth = window.speechSynthesis
      const voice = findVoice(voices.length ? voices : synth.getVoices(), speechCode)
      const isEnglish = speechCode.startsWith('en')
      if (!voice && !isEnglish) {
        setProblem('no-voice')
        return
      }

      setProblem(null)
      synth.cancel()
      const myRun = ++runId.current

      sentences.forEach((text, i) => {
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = speechCode
        if (voice) utterance.voice = voice
        utterance.rate = 0.92
        utterance.onstart = () => {
          if (runId.current === myRun) setSpeakingIndex(i)
        }
        utterance.onend = () => {
          if (runId.current === myRun && i === sentences.length - 1) setSpeakingIndex(null)
        }
        utterance.onerror = (e) => {
          if (runId.current !== myRun) return
          if (e.error !== 'canceled' && e.error !== 'interrupted') setProblem('error')
          setSpeakingIndex(null)
        }
        synth.speak(utterance)
      })
    },
    [voices],
  )

  return { speak, stop, speakingIndex, isSpeaking: speakingIndex !== null, problem, clearProblem: () => setProblem(null) }
}
