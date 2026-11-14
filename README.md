# StillOut There: Diaries of NASA's Left-Behind Hardware

A free, mobile-first web app for students aged 8-14, built for the NASA Space Apps Challenge ("Abandoned but Not Forgotten"). Rovers, landers and probes left on the Moon, on Mars and in deep space tell their own stories in first person. Each story is adapted to grade level (3-5 or 6-8) and language (English, Tamil, Hindi), and **every sentence links to its NASA source**.

No backend, no login, no API keys. All content lives in local JSON files.

## Features

1. **Relic Map** (`/`): Moon / Mars / Space tabs with a stylized disc and pins colored by status. Tapping a pin opens a card with a "Meet it" button.
2. **Hardware Speaks** (`/objects/[id]`): first-person story with Grade (3-5 / 6-8) and Language (EN / TA / HI) toggles, plus a "Source" link under every sentence. **Listen** reads the story aloud with the browser Web Speech API (`en-IN`, `ta-IN`, `hi-IN`) and shows a friendly message when no voice is available.
3. **Then vs Now slider** (Apollo 17 only): a before/after slider you can drag with mouse or touch, or move with the arrow keys.
4. **Science Missions** (`/missions`): five multiple-choice questions with instant feedback, an explanation and a NASA source link. Completing them earns the **Rover Detective** badge, with a progress bar. Progress is saved in `localStorage`.
5. **Write the Last Message**: after the badge, students write a goodbye to Spirit. Rule-based feedback praises details like "sand", "dust", "science" or "Mars" and shows a related fact with its source. No external calls.
6. **AR viewer**: uses Google's `<model-viewer>` with `ar` and `camera-controls`. If `/public/models/rover.glb` is missing, it shows a fallback message instead.
7. **Voyager 1 distance counter**: an approximate distance that counts up each second from labelled constants, with a link to NASA's live status page.
8. **About & Sources** (`/about`): every NASA resource used, the SI-use disclosure and the honesty note about RAG.

## Tech

- Next.js (App Router) + React + Tailwind CSS v4
- Content: `src/data/objects.json` and `src/data/missions.json`
- Every object page is pre-rendered with `generateStaticParams`, so the app deploys to Vercel with zero configuration.

## Run locally

```bash
npm install     # or pnpm install
npm run dev     # http://localhost:3000
```

## Deploy

- **Vercel (recommended):** import the repository at vercel.com/new and accept the defaults, or click **Publish** in v0.
- **Netlify:** build command `npm run build`. Netlify's Next.js runtime is detected automatically.
- **GitHub Pages / any static host:** add `output: 'export'` and `images: { unoptimized: true }` to `next.config.mjs`. Then run `npm run build` and upload the `out/` folder.

## Folder structure

```
app/
  page.tsx                Relic Map (home)
  objects/[id]/page.tsx   Hardware Speaks object page
  missions/page.tsx       Science Missions, badge, last message
  about/page.tsx          About & Sources
components/
  relic-map/              planet disc, space track, object card
  object/                 story player, then/now slider, AR viewer, Voyager counter
  missions/               quiz card, badge progress, last message
  site-header.tsx, site-footer.tsx, status-tag.tsx, segmented-toggle.tsx
hooks/use-speech.ts       Web Speech API wrapper with voice detection
lib/                      types, data access, status colors, progress storage
src/data/                 objects.json, missions.json (the knowledge base)
public/images/            apollo17_then.png, apollo17_now.png (placeholders)
public/models/            rover.glb goes here (not included)
```

## Data sources

- NSSDCA Master Catalog: https://nssdc.gsfc.nasa.gov/nmc/
- NASA Science Missions: https://science.nasa.gov/mission/
- NASA Planetary Data System: https://pds.nasa.gov/
- Voyager Mission Status: https://voyager.jpl.nasa.gov/mission/status/

Every fact in `objects.json` has a `_verify` note. Uncertain items are marked `TODO: verify`.

## SI-use disclosure

This prototype was built for the NASA Space Apps Challenge. Story drafts and parts of the code were created with SI assistance and reviewed by the team. It is not affiliated with or endorsed by NASA. All data is credited to the NASA sources linked on each sentence. It contains no NASA logos, insignia, flags or mission patches.

The stories are **pre-written** from a curated knowledge base. No LLM or live retrieval runs in the app. Live retrieval-augmented generation (RAG) is our planned next step.

## Manual replacement checklist

- [ ] **Images:** replace `public/images/apollo17_then.png` and `apollo17_now.png` with real NASA/LRO imagery and add the credit to `imageCaption` in `objects.json`. They are SI-generated placeholders.
- [ ] **3D model:** add a rover model at `public/models/rover.glb`. The AR viewer turns on automatically once the file exists.
- [ ] **Fact verification:** check every fact and its `_verify` note against the NASA page. Replace base URLs with exact mission or catalog entry pages.
- [ ] **Voyager constants:** check the reference distance, date and speed in `components/object/voyager-counter.tsx` against voyager.jpl.nasa.gov.
- [ ] **Translations:** have native speakers review every Tamil (`ta`) and Hindi (`hi`) sentence.
- [ ] **Coordinates:** confirm the landing-site coordinates. They only place pins on a stylized disc.

## Known limitations

- Tamil and Hindi voices depend on the device. Many desktop browsers have no `ta-IN` voice.
- The Then vs Now images are placeholders. The AR model is not included.
- The Voyager distance is approximate, extrapolated from a single reference point.
- Only five objects, and only one has a Then vs Now comparison.
- Progress is saved per browser in `localStorage`. There are no accounts.

## Planned features

- Teacher dashboard (class progress, assigning missions)
- Offline pack (PWA with cached stories and audio)
- Live RAG over NASA sources with per-sentence citations
- More objects (Lunokhod, Viking landers, Pioneer 10/11, Sojourner, and others)
- Recorded narration by native speakers
