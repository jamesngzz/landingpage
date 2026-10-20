# Wizzdom landing page

Bilingual English/Vietnamese landing page with six interactive use cases and a tap-first beta signup flow. **Deployment target: Vercel + Supabase.** The old Sites deployment is no longer the deployment target.

## Deploy to Vercel

1. Import `jamesngzz/landingpage`, branch `main`, root directory `.`. The approved companion prototype is promoted to the homepage on this branch. Keep Vercel's Production Branch set to `main`; feature branches create Preview deployments.
2. Framework preset: **Other**. `vercel.json` specifies the build command (`npm run build`) and output directory (`public`). Node.js: **22.x**.
3. Add these **server-only Environment Variables** in Vercel for Production and, if needed, Preview:

   | Name | Value |
   | --- | --- |
   | `SUPABASE_URL` | `https://kroifccanbatoqajeglq.supabase.co` |
   | `SUPABASE_SECRET_KEY` | Your Supabase secret API key or legacy `service_role` key |

4. Deploy. Submit one test registration, verify it in Supabase, and remove that test record.

The database migration `supabase/migrations/202610190001_landing_collection.sql` has **already been applied to the project above**. Do not re-run it there. For a fresh Supabase project, apply it once with the SQL Editor or `psql` and use that project's URL/key instead. No exposed-schema configuration is required: only the restricted public RPC is used.

Never put a server key in frontend files, `NEXT_PUBLIC_*` variables, GitHub, or build output. The PostgreSQL password is not required on Vercel. Redeploy after changing environment variables. Rotate credentials previously shared in chat before production, then configure the replacement key.

## Stack and local development

- Static HTML/CSS/JavaScript, self-hosted fonts and brand assets.
- One Vercel Node.js function at `POST /api/beta`.
- Supabase PostgreSQL via an authenticated HTTPS RPC.
- Vercel Web Analytics via the framework-neutral `@vercel/analytics` browser SDK.

```sh
npm ci
npm run build
npm test
```

For local signup testing, copy `.env.example` to an ignored `.env.local` and fill in your server values. Then run `npm run dev` and visit `http://localhost:3000`. Without the variables the page/demo still works, but signup returns a visible error instead of pretending to save.

`npm run build` publishes the approved companion landing at **`/`**, not just under `/prototype/`. Its layout is composed by `scripts/build-landing-preview.mjs`, with hero styles in `public/prototype/landing/integration.css` and the six interactive scenarios in `public/prototype/cases-demo.{html,css,js}`. `scripts/production-landing.mjs` adapts the shared layout for production and restores the live signup handler from root `script.js`.

Root `index.html` and `script.js` remain the legacy baseline for the unchanged How it works, privacy, invitation and signup sections. Do not deploy root HTML directly: `scripts/build-vercel.mjs` generates `public/index.html`, `public/script.js`, `public/landing.css` and `public/demo.*`. It also copies the base `styles.css`, focus helper, assets and fonts. Only `public/` is published as static content; the server API is deployed separately. The build never reads secrets.

The homepage embeds `/demo.html` from the same origin. That one route permits same-origin framing; other routes retain framing protection. `/prototype/landing/index.html` is still an isolated, noindex local preview with signup explicitly blocked. It is not the production entry point.

## Collected data

Private schema: **`wizzdom_landing`**.

| Table/view | Purpose |
| --- | --- |
| `signups` | Unique email, selected role, main need, AI tools, language, demo choice/rating, selected context sources, consent versions, timestamps |
| `signup_submissions` | Submission history, deduplicated by submission UUID |
| `sessions` | Only consenting submitted journeys: random page-session UUID, language, broad screen/device categories, referral hostname and bounded UTM fields |
| `events` | Only consenting submitted journeys: role selection, demo choices, evidence views, insight action, value rating, sources and signup steps |
| `demand_summary` | Counts by role, need and language, plus research opt-ins |
| `schema_migrations` | Applied migration version |

The optional research checkbox is **off by default**. Demo interactions stay in page memory until the visitor submits signup with research consent. Without it, only the disclosed signup/profile/demo summary is saved to Supabase; no research session/events/referral data is sent there. Visitors who leave without signing up have no Supabase research record. There are no imported AI conversations, browsing-history contents, fingerprint identifiers, stored IPs or email values in research event properties. The language preference is the only persistent browser preference.

## Vercel Web Analytics

Enable **Web Analytics** for this project in the Vercel dashboard, then deploy `main`. Select **Other / HTML** in the setup guide, not Next.js: the live site is static HTML and does not use the retained legacy React layout.

The build copies the official `@vercel/analytics` browser SDK into `public/vercel-analytics.js` and loads `analytics.js` on the production homepage. It counts visitors and page views through Vercel's `/_vercel/insights/*` routes. There are no custom analytics events, email/form values or imported context sent to Vercel. Query strings and fragments are removed from page URLs before sending. The embedded demo, isolated prototypes, localhost and file previews do not initialize this SDK, avoiding duplicate counts from the demo iframe. This aggregate traffic measurement is separate from the optional Supabase research consent above.

After deployment, visit the live homepage and check **Analytics** in Vercel. The SDK requires Web Analytics to be enabled in the project; if `/_vercel/insights/script.js` returns 404, enable it and redeploy. See the [official quickstart](https://vercel.com/docs/analytics/quickstart).

The API validates and bounds input, requires same-origin JSON POSTs, includes a honeypot and best-effort per-instance throttling, and commits each signup atomically. Duplicate emails update the contact profile. Duplicate submission/event UUIDs do not create duplicate rows. A successful signup response is sent only after the database confirms the write. No public read/list endpoint exists. The schema has RLS enabled and no grants to anonymous or signed-in browser roles; the RPC is executable only by the server role.

**No invitation emails are sent automatically.** This stores the waitlist for a separate invitation workflow. Throttling is not distributed across serverless instances; configure Vercel Firewall/bot protection if abuse becomes a concern.

View records in Supabase's Table Editor by selecting `wizzdom_landing`, or use the SQL Editor:

```sql
select * from wizzdom_landing.demand_summary order by registrations desc;
select email, role, primary_need, tools, language, created_at
from wizzdom_landing.signups order by created_at desc;
```

Keep exports private. For an erasure request, delete the contact from `signups` (cascades submissions/events), and delete its associated `sessions` row if no other contact references it. The old site's D1 records are not bundled or automatically migrated; that site/database is untouched.

## Verification

`npm test` checks signup validation, consent boundaries, bounded event fields, input sizes, origin/method enforcement, throttling, server-only authentication and honest database-error responses. It also builds the actual production homepage and checks its assets, iframe headers, preserved sections, language/scenario wiring and live signup client against mocked server responses. No live signup is created by the automated suite. Browser visual QA is separate; see `public/prototype/landing/VISUAL-REVIEW.md` for the latest limitations.

For an optional live integration test, set `SUPABASE_URL` and run `node scripts/test-supabase.mjs` in a terminal. It prompts for the key without echoing or saving it, writes one clearly synthetic registration twice, and verifies successful API responses. Verify counts and remove its data afterwards:

```sql
select count(*) from wizzdom_landing.signups
where email = 'wizzdom-vercel-integration-20261019@example.invalid';
-- Expected: 1 contact and 1 matching submission after two identical requests.
select count(*) from wizzdom_landing.signup_submissions
where id = '0a824373-d07f-4427-b3d5-bec42613f4f1';

begin;
delete from wizzdom_landing.signups
where email = 'wizzdom-vercel-integration-20261019@example.invalid';
delete from wizzdom_landing.sessions
where id = 'a25a2ea4-89ba-45e1-b25d-d0e9751f557b'
and not exists (select 1 from wizzdom_landing.signups
where session_id = 'a25a2ea4-89ba-45e1-b25d-d0e9751f557b');
commit;
```

## Legacy source

The original Sites/Vinext/Cloudflare implementation and its Git history are retained for reference under `app/`, `build/`, `db/`, `drizzle/`, the old framework configuration, and Sites helper scripts. They are **not part of the Vercel build** and their old dependencies are not installed by the current package manifest. Vercel uses `api/beta.mjs`, not `app/api/beta/route.ts`. The tracked `.openai/hosting.json` contains the former Sites project identifier, not credentials. Restoring that deployment stack would require restoring its dependencies/configuration from Git history.

Official hosting reference: [Vercel Node.js functions](https://vercel.com/docs/functions/runtimes/node-js).
