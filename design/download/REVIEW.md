# Download guide review — 2026-10-24

Scope: existing Vercel landing (`jamesngzz/landingpage`), no new Sites hosting. Added /download plus VI/EN static variants, homepage navigation, installation/capability/outcome/privacy guide and six native FAQ disclosures.

84/84 Node tests passed after a production build. Includes existing signup consent/error tests and new fail-closed release metadata, bilingual content boundaries and real output asset resolution tests. Local GET /download/ returns200. No live signup, email, private history, credentials or binary upload performed.

Browser QA was blocked by Work settings (“Local browser use is disabled”). No visual, keyboard or responsive browser pass is claimed. CSS includes stacked mobile layouts, focus styles, native links/disclosures, scoped heading scale and reduced motion; these still need browser review. Local preview: http://127.0.0.1:3187/download/.

Download state remains waitlist. The current desktop1.0.43 internal artifact is not published by this change. A future controlled beta distribution needs an explicit release decision and integrity metadata; the existing product quality gates remain open.

Content decisions: explain the benefit before mechanics; disclose Mac/CPU compatibility before setup; surface Claude foreground limits; distinguish connected/captured/checked and silence/failure; separate local storage/capture/cloud; preserve user review for memory and delivery; avoid claiming automatic invite emails or entirely offline analysis.
