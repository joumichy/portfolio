# Architecture delivery — 15 October 2026, 13:49 UTC

Instance non identifiée. User explicitly authorized commit, push and merge of
`codex/portfolio-infrastructure-diagrams` into `main` in `joumichy/portfolio`.
This note records the pre-delivery gate; Git and the PR are authoritative for
subsequent delivery status.

## Delivery ledger

- Objective: publish six infrastructure views for Fleury, Sibyl and Shortlistable,
  with generic external services, no environment labels, and the homepage skills
  category renamed to AI & Machine Learning.
- Repositories checked: portfolio is the sole modified repository. The source
  applications were inspected read-only during implementation (see prior notes).
- Main branch: origin/main, confirmed by local symbolic ref and GitHub metadata;
  fetch shows no incoming changes beyond the branch base 0c910d4.
- Included files: typed infrastructure data, SVG renderer, case-study data and
  page integration, Skills component, obsolete pipeline deletion, related journal
  entries and index. No workflow, runtime configuration, logging or telemetry
  implementation is changed.
- Excluded dirty files: .pptx-build/, outputs/, artifacts/; no generated build
  output or local screenshots will be staged.
- Checks: fresh npm run build passed (nine pages), git diff --check passed,
  emitted modules pass node --check, full HTML scan passes on all three case
  studies and confirms two views each. Homepage heading is corrected.
- Contracts/evidence: implementation notes record read-only infrastructure-source
  review and real browser validation of all six views at mobile/desktop sizes,
  view switching, zoom, fitting, connection tables, reload and console checks.
  The latest skills heading was separately verified in the real browser.
- No automated frontend behavioral tests were run, per user instruction.
- Blocking risks: none identified for delivery. Local presentations remain intact.

## Authorized delivery sequence

Stage the explicit file list, compare staged content and the committed tree,
push the branch, open and attach the PR targeting main, inspect its exact scope
and mergeability, then merge and verify the existing Pages workflow.
