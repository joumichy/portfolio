# Portfolio product capabilities — 14 October 2026

Instance non identifiée. Reprise de la demande restée sans réponse dans la
session liée : présenter Fleury au-delà de l'exploration, expliciter son IA,
et revoir aussi Sibyl et Shortlistable avec une rédaction marketing fondée
sur leur code et documentation.

## Changes

- Extended the existing project data with optional capability descriptions and
  rendered a `What You Can Do` section before the engineering details.
- Rewrote the three product introductions, cards, solutions and user journeys.
  Preserved the existing portfolio language, visual system and earlier work.
- Fleury now covers test discovery/execution, behavior exploration, quality
  gates, contextual AI, reviewed correlations, recommendations, test synthesis,
  stakeholder briefs and enterprise delivery. Added its governed AI jobs and
  isolated synthesis worker to the stack and architecture.
- Sibyl now explains recurring portfolio monitoring, signals/review, related
  opportunities, watchlists, geo/SERP evidence, market theses and Ask Sibyl/briefs.
  Kept deterministic scoring separate from AI interpretation. Source relevance
  remains in qualification; experimental inference is not marketed as released.
- Shortlistable now explains document reconstruction, visual editing,
  requirement-level evidence, reviewable rewrites, versions and export. Removed
  the unsupported implication that its score reproduces a recruiter's ATS.

## Sources consulted

- Fleury: documentation index, `CURRENT_STATE.md` family and AI sections;
  `internal/ai/governance.go`, `correlation_proposal.go`, `quality_brief.go`,
  `aiprovider/openai.go`, `synthesisrunner/runner.go`.
- Sibyl: documentation index, active plan, product/design reference, market
  intelligence module and runtime README; score computation, market brief types,
  Ask Sibyl generation and frontend thesis/opportunity/assistant owners.
- Shortlistable: journal index/current, backend README, job-fit scoring/evidence
  and suggestion policy, semantic binding pipeline, editor components and
  production Compose queue roles.
- Previous portfolio refresh note and the user/assistant messages in the linked
  session. No private credential registry or environment file was consumed.

## Delivery ledger

- Objective: complete the latest content revision and show the local portfolio.
- Repository modified: portfolio, branch `codex/portfolio-products-2026`, HEAD
  `577e2d5`; remote default `origin/main`; changes uncommitted.
- Application files changed in this reprise: `src/data/projects.ts` and
  `src/pages/projects/[slug].astro`. Added this note, a journal index and two
  preview screenshots under `artifacts/portfolio-preview/`.
- Source repositories inspected read-only: Fleury backend `6f52ef7` and frontend
  `ec72478` on main; Sibyl backend `d38e813` and frontend `bd04788` on
  `codex/topic-relevance-integration` with existing local changes; Shortlistable
  backend `27d911d` and frontend `e11f352` on
  `feat/editable-contact-and-language-levels`.
- Earlier portfolio changes to the CV, experience, skills, navigation, project
  images, architecture renderer, layout and styling remain intact. No source
  application, protected logging surface or GitHub workflow was changed.
  An unrelated untracked `.pptx-build/` directory appeared during the final
  status check and was left untouched.
- Checks: `npm run build` generated nine pages; `git diff --check` clean.
- Interactive browser: home cards to all three projects; mobile menu from Fleury
  to home/projects; return links; refresh of Sibyl and Shortlistable; real
  desktop/mobile screenshots. All inspected pages had no console errors.
- Layout: 320 px on the three project pages; 1440 px home with three columns;
  intermediate default width 897 px inspected visually. No horizontal overflow
  on the checked layouts. Homepage images loaded with nonzero natural widths.
- HTTP: local home, three project routes, two image assets and CV returned 200.
  Browser resource timing was unavailable through its read-only API; HTTP
  evidence came from direct local requests, not a browser network trace.
- Limit: product repositories were used as content evidence; their full product
  workflows and production providers were not qualified by this portfolio task.
- No blocking risk for local preview. No commit, push, new PR or deployment.

## Handoff

Preview remains running at `http://127.0.0.1:4321/#projects`, with its browser
tab left open. User can review the richer case studies locally. Next delivery
action, if requested: review the complete inherited diff and publish it.
