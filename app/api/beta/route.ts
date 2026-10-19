import { getDb } from "../../../db";
import { betaSignups } from "../../../db/schema";
import { validateSignup } from "../../../lib/signup-validation.mjs";

const visits = new Map<string, {count: number; until: number}>();
const json = (body: object, status = 200) => Response.json(body, {status, headers: {"Cache-Control": "no-store"}});

export async function POST(request: Request) {
  const url = new URL(request.url);
  if (request.headers.get("origin") !== url.origin) return json({error: "origin"}, 403);
  if (!request.headers.get("content-type")?.startsWith("application/json")) return json({error: "content_type"}, 415);
  // Short-lived, bounded in-memory abuse protection. No IP addresses are persisted.
  const ip = request.headers.get("cf-connecting-ip") || "anonymous";
  const now = Date.now();
  if (visits.size > 5000) for (const [key, value] of visits) if (value.until < now) visits.delete(key);
  if (visits.size > 5000) visits.clear();
  const recent = visits.get(ip);
  if (recent && recent.until > now && recent.count >= 12) return json({error: "rate_limit"}, 429);
  visits.set(ip, recent && recent.until > now ? {...recent, count: recent.count + 1} : {count: 1, until: now + 600_000});
  let body;
  try {
    const raw = await request.text();
    if (raw.length > 4096) return json({error: "too_large"}, 413);
    body = JSON.parse(raw);
  } catch { return json({error: "invalid_json"}, 400); }
  if (typeof body?.website === "string" && body.website) return json({ok: true});
  const input = validateSignup(body);
  if (!input) return json({error: "invalid_signup"}, 400);
  const timestamp = new Date().toISOString();
  const values = {
    email: input.email, role: input.role, need: input.need,
    tools: JSON.stringify(input.tools), language: input.language,
    demo: JSON.stringify(input.demo), consentVersion: "beta-contact-v1", updatedAt: timestamp,
  };
  try {
    await getDb().insert(betaSignups).values({id: crypto.randomUUID(), ...values, createdAt: timestamp})
      .onConflictDoUpdate({target: betaSignups.email, set: values});
    return json({ok: true});
  } catch {
    console.error("Beta signup storage unavailable");
    return json({error: "unavailable"}, 503);
  }
}
