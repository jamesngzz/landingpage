# Landing composition — bounded visual review

The old landing is the baseline. Only the hero and demonstrations are replaced.
The two old demos are consolidated into one new interactive block. Navigation,
cost strip, How it works, privacy, final invitation, beta dialog and footer are
copied without content or markup changes. Base CSS is an exact copy. The demo
is isolated so its CSS cannot alter the preserved sections.

## Current opening sequence

One product promise sits next to one interactive Developer example, instead of
two equal-weight problem/solution text columns. The first frame is paused with
the request, earlier evidence and Wizzdom nudge visible. The main CTA replays
the 17-second sequence; animation is not required to understand the example.
Three value headings are visible beside the example, under the promise: choose
the right work, avoid repeating mistakes, and remember what matters. Each has
two role buttons, mapped to the original six scenarios. The selected role has
a high-contrast blue state. Selecting another case
shows its evidence frame immediately, rather than making the visitor wait again.
The duplicated child selector is hidden only in this hero embed; standalone
demo navigation remains available. Small eyebrow/timing copy, simulated composer,
repeated disclaimer and the generic final-stage narrator are removed from the
hero. The current scenario sentence is the window's tab title, replacing the
external setup, the disclaimer line, and the Claude/project header as requested.
The full source dialog retains the sample-data explanation.
Source facts and actions use larger text, with full evidence behind View sources.
The old problem theme follows the demo, before the unchanged cost strip.

Verification for this revision: automated DOM/state/composition checks and local
HTTP response passed. Browser automation is disabled in Work settings, so the
new hero layout has not yet had visual desktop/mobile QA. Prior screenshots do
not verify this revision.

## What each new visual proves

| Visual | What visitors can verify | Limit |
| --- | --- | --- |
| Full AI app with a small, floating Wizzdom popup | Wizzdom is a companion that nudges, not a writing app or a second workspace | Illustrative UI, not a live integration |
| Six original cases grouped by wrong priorities, repeated failures, and forgotten standards/conditions | Different audiences lose different kinds of relevant context | Groups are navigation, not validated market segments |
| A current request followed by AI's plan, then a quiet nudge | When the missing context matters, without requiring a visitor to guess a decision first | The host reply is scripted, not representative of all AI tools |
| Two concise source facts and an explicit causal sentence | Why prior evidence could change the current next step | Fictional numbers inherited from the old demo, not actual outcomes |
| Three full source excerpts with tool labels and the reasoning connection | What the nudge is grounded in; excerpts are carried in earlier chats | No live invoice, analytics or course-account access implied |
| User opens a proposed step; host answer stays unchanged | Advice is optional, not an autonomous action | No suggestion is validated or sent to an AI |

The Wizzdom lens is the only product identity asset. No mascot, generic stock
illustration, decorative orbit or unrelated feature-card gallery is added.

## Still generic / proposed later improvement, not changed here

- The six old scenarios replace the self-referential landing-page example.
  Test whether visitors can explain the missing fact and why it changes the next
  step; do not infer comprehension just from clicks or animation completion.
- On desktop, the popup is roughly half the chat content width, not an equal
  side panel. On phones it uses the available width so text remains readable;
  the prompt stays above it and controls remain below in the same frame.
- The old How it works uses generic goal/decision/pattern motifs. It explains
  a mechanism, not demonstrated user outcomes. Kept unchanged per this brief.
- The final benefit copy remains the old copy. Do not treat it as tested demand.

## Design reference

YC's [Design Review: How to convert more visitors into customers](https://www.ycombinator.com/blog/design-review-tips-for-increasing-conversions)
emphasizes a clear main action, a short path to understanding, and reviewing
whether demos themselves create confusion. Applied here as review criteria,
not a reason to change the chosen product strategy or imitate a visual template.

Local beta submission is blocked with an explicit preview-only message. The
production build now reuses this approved layout at `/`, with the existing
live signup handler restored, real API success/error handling, and a same-origin
demo frame. Automated checks exercise that production build with mocked signup
responses; they do not verify a live Supabase write or replace browser QA.
