# Wizzdom companion prototype — visual contract

Source of truth: the active landing's root `styles.css`, not the legacy
framework defaults in `app/globals.css`. Production files remain unchanged.

- Paper `#f3f1ea`, ink `#11110f`, warm white `#fffefa`.
- Cobalt `#315cf3` identifies Wizzdom; soft blue `#dce4ff` supports evidence.
- Yellow `#f4d64d` highlights a choice or useful explanation; green indicates
  permission/approval, not general decoration.
- Self-hosted Newsreader for the hero; Helvetica/Arial for interface and body.
  Vietnamese uses comfortable leading and the existing Vietnamese font subset.
- Black 1px borders, 9–16px corners, small solid offset shadows. No green-gray
  type, soft floating feature cards, or low-contrast labels.
- Keep simulated host apps visually quieter than Wizzdom. Do not make a
  suggestion look like the host AI generated it or automatically applied it.
- Mobile suggestion cards enter normal document flow; the user's question
  remains visible above them. Keep primary controls at least 44px high.
- Retain both demo surfaces, bilingual copy, evidence, dismissal, pause,
  reduced motion and the explicit fictional/local-only disclosures.

## Current story prototype

`story.css` and `story.js` now own the active `/prototype/` experience. The
base stylesheet supplies existing self-hosted font faces. `companion-v1/`
preserves the earlier companion prototype and its theme; `previous/` preserves
the earlier writing-oriented experiment. Production is unchanged.

One project, two moments: on-demand restoration of a prior brief, or a selective
nudge grounded in that project's earlier feedback. Browser/desktop are delivery
details, not the primary navigation. Do not turn this into three unrelated
feature pitches.

The walkthrough stops at review. A visitor click can add a brief to a mock
draft; it never sends to an AI or pretends to rewrite the host's answer. Memory
edits/forgetting affect the mock evidence and invalidate the old recommendation
when its supporting facts change. This is not live synthesis or real memory
access. Demand choices are session-only and do not register a beta signup.

## Self-review pass

- Use only the Wizzdom lens logo in the active story; no mascot, floating pet,
  or delivery-surface change between the two moments.
- Reach relevant historical context within five seconds. Show actual mock
  source snippets during retrieval rather than a decorative loading orbit.
- Keep source inspection one click away. Put edit/forget controls behind a
  disclosure, not in the first reading layer.
- Keep the mobile task area consistent across steps rather than hiding a long
  host reply only after autoplay starts. Do not add a second repeated source list.
- New UI changes in this pass have code/test verification only until browser
  control becomes available again; do not claim a fresh visual QA pass.
