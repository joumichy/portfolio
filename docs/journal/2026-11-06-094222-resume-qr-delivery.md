# Resume QR production delivery

Instance non identifiée. User authorized production delivery on 6 November 2026.
Source branch: `codex/resume-qr-share`; target: `main` in `joumichy/portfolio`.
GitHub Pages uses the existing Actions workflow and `john-on-tech.com` domain.
This note records the pre-delivery checks; Git, the PR and Actions are the
authorities for subsequent publication status.

## Delivery ledger

- Objective: publish the fullscreen CV QR dialog and the final “My Resume” CTA.
- Repositories checked: `projects/portfolio` is the sole repository changed.
- Main branch: `origin/main`, verified through the remote symbolic ref and GitHub
  metadata; local base `756737b` equals the fetched principal branch.
- Included files: Hero, ResumeShare, Navbar and shared Button components;
  the canonical resume path; package manifest/npm lockfile; feature and delivery
  notes and journal index. No logging, telemetry, auth or workflow changes.
- Excluded dirty files: `.pptx-build/`, `.pptx-design-refonte/`, `artifacts/`,
  `outputs/`. The existing PDF is unchanged.
- Checks: production build passed (nine pages), Astro diagnostics reported zero
  errors with one existing unused-variable hint, and `git diff --check` passed.
  No automated frontend behavioral tests were run.
- Browser evidence: real local workflow verified at 390×844 and 320×568; QR,
  requested copy and close button fit the viewport. Closing and Escape restore
  focus to “My Resume” and remove background-scroll locking. Desktop opening
  was also verified; captured console warnings/errors were empty.
- QR/PDF evidence: earlier independent Apple Vision decoding at 256, 288 and
  352 pixels resolved directly to the public `/resume.pdf`; public/local PDF
  content and source SHA-256 matched (see feature note).
- Blocking risks: none for the authorized deployment. Physical iPhone/Android
  camera scanning remains unverified; viewport checks used the real desktop
  browser with mobile dimensions, not native iOS/Android browsers.

## Delivery sequence

Stage only the explicit included files, review staged scope, commit and push the
feature branch, create and merge a PR targeting `main`, wait for the existing
GitHub Pages workflow, then verify the public page and PDF.
