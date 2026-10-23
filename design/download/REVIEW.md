# Download guide review — 2026-10-24

Scope: existing Vercel landing (`jamesngzz/landingpage`), no new Sites hosting. Added /download plus VI/EN static variants, homepage navigation, installation/capability/outcome/privacy guide and six native FAQ disclosures.

84/84 Node tests passed after a production build. Includes existing signup consent/error tests and new fail-closed release metadata, bilingual content boundaries and real output asset resolution tests. Local GET /download/ returns200. No live signup, email, private history, credentials or binary upload performed.

Browser QA was blocked by Work settings (“Local browser use is disabled”). No visual, keyboard or responsive browser pass is claimed. CSS includes stacked mobile layouts, focus styles, native links/disclosures, scoped heading scale and reduced motion; these still need browser review. Local preview: http://127.0.0.1:3187/download/.

Download state remains waitlist. The current desktop1.0.43 internal artifact is not published by this change. A future controlled beta distribution needs an explicit release decision and integrity metadata; the existing product quality gates remain open.

Content decisions: explain the benefit before mechanics; disclose Mac/CPU compatibility before setup; surface Claude foreground limits; distinguish connected/captured/checked and silence/failure; separate local storage/capture/cloud; preserve user review for memory and delivery; avoid claiming automatic invite emails or entirely offline analysis.

Source review: https://github.com/jamesngzz/landingpage/pull/1. Vercel Preview status reported success for commit ca0dd40. The main branch/production site is unchanged.

Direct GET of both preview routes redirects to Vercel sign-in (Deployment Protection). The returned200 belongs to the login page, not a verified guide render. Use a signed-in Vercel browser to review; no protection bypass attempted.

## Public beta update

The owner subsequently authorized public downloads on24 October2026. The current change opens the signed/notarized1.0.43 artifact as an early beta, adds free-AI/quota/support guidance and labels knowledge hub, Recall and reflection/journaling as directions rather than delivered promises. It also clarifies Accessibility versus MCP, local versus cloud, and permission revocation.85 tests pass after this update. Browser review remains unavailable due to Work settings; no visual pass is claimed. See PUBLIC_BETA_DECISION_2026-10-24.md for the distribution decision.

## Content reduction after owner review

Owner requested fewer words and no repeated onboarding material. The download page now focuses on download/compatibility, free-beta limits/data boundaries and3 short setup steps. Removes the duplicate card illustration, host tutorials, analysis-state explanation and6-question FAQ from the page. Roadmap ideas stay in a closed native disclosure; the support path remains a single short line.

Default main copy (HTML text excluding closed disclosure bodies): Vietnamese1278→314 whitespace-delimited units (~75% less), English1065→285 (~73% less).86 tests pass, preserving actual asset URL/checksum, consent distinctions, Claude foreground limits, signup fallback and bilingual routes. The installer and release metadata are unchanged. Browser visual QA remains unavailable; do not claim a rendered visual pass.
