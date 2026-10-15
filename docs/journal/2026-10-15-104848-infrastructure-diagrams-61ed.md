# Infrastructure diagrams — 15 October 2026

Instance non identifiée. User requested a new branch and architecture diagrams
that represent Fleury, Sibyl and Shortlistable infrastructure accurately.

## Scope and decisions

- Created `codex/portfolio-infrastructure-diagrams` from `origin/main` at
  `0c910d4`. Changes remain local and uncommitted for review.
- Replaced the linear ArchitecturePipeline with typed SVG topologies and
  explicit source/target connections, deployment boundaries and protocol labels.
- Each project has two views: deployment and async processing for Sibyl and
  Shortlistable; control/execution and event/deployment profiles for Fleury.
- Added view selection, zoom/fit controls, scrollable canvases, flow legends,
  architecture notes and an accessible text table of all connections.
- Expanded the architecture section to full width. Product descriptions,
  contribution, CV, experience and unrelated legacy diagrams are preserved.
- Fleury distinguishes canonical PostgreSQL authority, Temporal coordination,
  Rust process boundaries, mTLS runners, object-storage evidence, secret storage and
  isolated synthesis. The Kafka/CDC/projection plane and observability are a
  separate view. K3s/GitOps is a target under qualification; self-hosted uses
  direct PostgreSQL-to-Temporal recovery dispatch and does not require Kafka.
- Sibyl shows managed web hosting, an edge gateway, origin TLS/Nginx, a private Docker network,
  separate API/provider/materialization/reliability roles, Redis and managed
  identity and database services, plus provider postbacks and SSE read-model updates.
- Shortlistable shows managed web hosting, Nginx, private FastAPI/Redis/RQ services, the four
  production worker queues, managed identity/PostgreSQL/storage, inference and payment services.
  Development RQ Dashboard / RedisInsight are explicitly excluded from the
  production topology. Both production Compose profiles include TLS renewal.

## Source evidence

Sources were read-only; no credentials, environment profiles or live data stores
were consumed or changed.

- Fleury backend `6f52ef7`, main: current-state authority/architecture sections,
  active-plan qualification status; `infra/dev/compose.yaml`, `compose.app.yaml`,
  `infra/self-hosted/compose.yaml` and README; `infra/k8s/README.md` and manifests.
- Sibyl backend `d38e813`, frontend `bd04788`, existing dirty relevance branches:
  active plan and documentation index; `docker-compose.prod.yml`, production
  Nginx template, runtime-role README, Next.js backend and event proxy routes.
- Shortlistable backend `27d911d`, web `e11f352`, existing feature branches:
  journal index/current; production Compose/Nginx files, job proxy/SSE routes.
- Satellite profiles and configuration are not evidence of production deployment.
  Source applications and their existing local work were left untouched.

## Delivery ledger

- Objective: correct infrastructure representation on the new portfolio branch.
- Repository modified: `joumichy/portfolio`; principal branch `main`.
- Included application scope: `src/data/infrastructure.ts`,
  `src/components/diagrams/InfrastructureDiagram.astro`, project architecture
  data/page integration; obsolete `ArchitecturePipeline.astro` removed.
- Excluded dirty files: `.pptx-build/`, `outputs/`, existing/local `artifacts/`.
  No workflow, logging, telemetry or error-handling surface changed.
- Build: `npm run build` passed, nine routes generated.
- Static checks: clean diff; emitted module scripts pass `node --check`; all
  six graphs have valid unique endpoint identities. Label geometry was inspected
  against nodes/frame and three edge labels were moved inside their canvas.
  Static path inspection found no unrelated node crossings after rerouting
  Fleury's AI edge around the secrets store; synthesis routing also clears the zone header.
- Static visual inspection: six SVGs exported from built HTML; reviewed PNG
  renderings. The offline renderer resolves CSS colors explicitly because its
  SVG engine does not support the browser's custom properties. Exports live at
  `artifacts/infrastructure/` and are not interactive browser screenshots.
- Local HTTP: all three updated pages respond 200 and contain the new component
  and both view selectors. Development server is running on 127.0.0.1:4321.
- Browser verification is UNVERIFIED. CUA refused the local tab with a browser
  URL policy rejection despite an HTTP URL. No alternate browser surface,
  raw protocol or browser workaround was used. User was asked to reopen the
  integrated tab; real switching/zoom/mobile/console checks remain pending.
- No automated frontend behavioral tests were created or run.

## Next action

Complete the real browser workflow once permitted: inspect the three topologies,
select each second view, exercise zoom/fit and connection tables, then check
mobile layout, console and reload. No new push, PR merge or deployment was done.
