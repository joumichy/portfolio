---
journal: portfolio
kind: session
id: 2026-10-15-113711-public-architecture-wording-61ed
date_iso: 2026-10-15
title: Generic public architecture wording and browser validation
tags: [portfolio, architecture, public-content]
privacy: no secrets, no pii
---

Instance non identifiée. Continuation of the infrastructure diagram work on
`codex/portfolio-infrastructure-diagrams`, based on `origin/main` (`0c910d4`).
All changes remain local and uncommitted.

## Public content

- Applied the user's confidentiality instruction across Fleury, Sibyl and
  Shortlistable: external data, AI, hosting, identity, storage, payment and
  commercial integrations use generic service names. Removed source-specific
  adapters, model/evaluation names and detailed document-library combinations.
- Updated project summaries, stack lists, architecture explanations, both SVG
  views, accessible descriptions, tooltips, connection tables and relevant
  homepage skills. Removed provider references from related journal prose.
- Removed environment labels and status commentary from the three case studies.
  Service boundaries and deployment variants retain their architectural meaning.
- Older unrelated case studies and professional experience remain unchanged.
  Reviewed the existing product preview images and CV for targeted names.
- Adjusted the minimum diagram zoom so Fit works within a 320-pixel viewport.

## Browser recovery and validation

The earlier unavailable browser target was a stale error tab. Browser inventory
revealed an existing valid HTTP tab, which was selected normally. No access policy
was weakened. The previous note's browser-pending status is superseded here.

- Real integrated-browser checks covered all three pages and all six views.
  View selection, zoom, actual size, Fit and expanded connection tables worked.
- At 320 pixels, diagram canvases and fitted SVGs both measured 286 pixels;
  no document overflow. Desktop checks at 1440 pixels also passed.
- Reload restored the initial view and zoom as designed. Both product preview
  images loaded after scrolling into view. No browser errors or warnings were
  observed on the three case studies.
- Full generated HTML, including hidden SVGs, descriptions, metadata and inline
  modules, contained no targeted provider/model identifiers or environment labels.
  Live DOM checks on the three pages also returned no matches.
- All three local routes and their local assets returned HTTP 200.
- Rebuilt all six static SVG/PNG previews after the wording changes. Saved the
  real browser screenshot at `artifacts/infrastructure/sibyl-browser-anonymized.png`.
- Reset the temporary viewport override and left the local Sibyl preview open.

## Delivery ledger

- Objective: faithful public infrastructure diagrams with generic integrations
  and no unnecessary environment terminology for the three projects.
- Repository modified: `joumichy/portfolio`; principal branch: `main`.
  Source application repositories were inspected read-only in the earlier note.
- Included files: infrastructure data and SVG component, project data/page
  integration, homepage Skills, journal/index; removed obsolete pipeline renderer.
- Excluded dirty files: `.pptx-build/`, `outputs/`, all local `artifacts/`.
- Checks: `npm run build` passed (nine routes); `git diff --check` passed;
  emitted module syntax passed `node --check`; real browser checks above.
- Evidence: source topology and runtime-role configuration from the earlier
  note; six source-backed views and their accessible connection tables.
- No application logging, telemetry, persistence or provider configuration changed.
  No automated frontend behavioral tests created or run, per user instructions.
- Blocking risks: none for the local portfolio changes. No new commit, push,
  PR, merge or deployment was performed for this branch.
