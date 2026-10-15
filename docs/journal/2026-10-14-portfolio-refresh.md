# Portfolio refresh - 14 October 2026

## Scope

Update the existing Astro portfolio from the current CV and local project sources.
Fleury, Sibyl and Shortlistable are presented as products with their purpose,
contribution, technical challenges, stacks and architecture. Doxomed is an
employment experience, not a product owned by the portfolio author.

## Sources

- CV: `John_ALLOU_CV_Updated_2026_En.docx` and its reviewed PDF under the local
  administrative workspace, with the linked CV conversation as editorial context.
- Fleury: `~/stellark/projects/fleury/docs/implementation-plan/CURRENT_STATE.md`,
  Go/Rust manifests, frontend manifest and self-hosted architecture documentation.
- Sibyl: the active execution plan, backend/frontend manifests and backend runtime
  documentation under `~/stellark/projects/sibyl/`.
- Shortlistable: `~/stellark/matchcv/` manifests, document-reconstruction owner,
  queue configuration and production Compose roles.
- Doxomed: the CV and the frontend/backend manifests under `~/work/doxomed/`.

## Changes

- Restored the missing portfolio checkout from `joumichy/portfolio`, starting
  from remote `main`, on `codex/portfolio-products-2026`.
- Added Fleury and Sibyl case studies; updated Shortlistable's four queue roles
  and document reconstruction description. Removed outdated Ollama claims.
- Added a reusable architecture pipeline driven by the existing project data.
- Added Doxomed, freelance and internship experience from the current CV.
- Updated the introduction, skills, project cards and downloadable CV.
- Captured current public Sibyl and Shortlistable homepages as local assets.
- Connected project pages to the shared navigation and verified the mobile menu.

## Validation

- `npm run build`: nine static pages generated successfully.
- `git diff --check`: clean.
- Real headed browser: home to Fleury through the project card; mobile menu from
  Sibyl back to projects; project card to Shortlistable; CV download link.
- Desktop rendering at 1440 px; mobile layout inspected at 320 px. No horizontal
  overflow on the home page or the three current project pages.
- The two homepage images loaded successfully. Sibyl page and assets returned
  HTTP 200; the inspected local pages had no browser console errors.
- GitHub Pages workflow is identical to remote main.

## Delivery

Changes remain local and uncommitted for preview at `http://127.0.0.1:4321/`.
No remote push, PR operation or production deployment was performed.
The inspected projects were read as sources and were not modified.
Fleury has no verified public site URL in the inspected sources, so no live link
was invented. Sibyl's source-relevance qualification remains an active area and
experimental inference tools are identified accordingly.
