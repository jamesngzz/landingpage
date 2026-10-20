# Wizzdom landing prototype

The current integrated preview is **`/prototype/landing/index.html`**.
`/prototype/index.html` and the `previous/` and `companion-v1/` directories
are earlier iterations retained for comparison and regression tests.

## Run locally

From the repository root:

```sh
node scripts/build-landing-preview.mjs
node scripts/preview-prototype.mjs
```

Open http://127.0.0.1:4177/prototype/landing/index.html.

The preview server binds to loopback only. It serves static files, not the
registration API. The integrated preview blocks beta submissions explicitly;
demo interactions do not read real chats, transmit data or persist answers.

## Source and checks

- `scripts/build-landing-preview.mjs`: composes the existing landing with a new
  hero and interactive demo, without writing the production entry points.
- `public/prototype/cases-demo.{html,css,js}`: the six scenario demonstrations.
- `public/prototype/landing/integration.css`: scoped hero styling.
- `public/prototype/landing/VISUAL-REVIEW.md`: design rationale and QA limits.

Run `npm test` for state, UI wiring and composition checks. Rebuild the preview
after changing its generator or HTML sources, then run the tests again.

This branch does not promote the prototype to the production homepage or
change hosting/security configuration. Browser visual QA is still outstanding
for the latest layout; passing automated tests does not replace that review.
