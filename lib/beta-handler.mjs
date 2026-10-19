import {validateCollection} from './collection-validation.mjs';
import {saveSupabaseSignup} from './supabase-storage.mjs';

const visits = new Map();
const json = (body, status = 200) => Response.json(body, {status, headers:{'Cache-Control':'no-store'}});

export async function handleBeta(request, config = process.env, store = saveSupabaseSignup) {
  if (request.method !== 'POST') return new Response(null, {status:405, headers:{Allow:'POST', 'Cache-Control':'no-store'}});
  const url = new URL(request.url);
  if (request.headers.get('origin') !== url.origin) return json({error:'origin'}, 403);
  if (!request.headers.get('content-type')?.startsWith('application/json')) return json({error:'content_type'}, 415);
  // Best-effort instance-local throttle, not a distributed rate limiter.
  // Vercel supplies this header; addresses are never stored in the database/logs.
  const ip = request.headers.get('x-vercel-forwarded-for') || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'anonymous';
  const now = Date.now();
  if (visits.size >= 5000) for (const [key,value] of visits) if (value.until < now) visits.delete(key);
  if (visits.size >= 5000) return json({error:'rate_limit'}, 429);
  const recent = visits.get(ip);
  if (recent && recent.until > now && recent.count >= 12) return json({error:'rate_limit'}, 429);
  visits.set(ip, recent && recent.until > now ? {...recent,count:recent.count+1} : {count:1,until:now+600_000});
  let body;
  try {
    if (Number(request.headers.get('content-length')) > 65536) return json({error:'too_large'}, 413);
    const reader = request.body?.getReader();
    let size = 0;
    const chunks = [];
    if (reader) for (;;) {
      const {done,value} = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 65536) { await reader.cancel(); return json({error:'too_large'}, 413); }
      chunks.push(value);
    }
    body = JSON.parse(await new Blob(chunks).text());
  } catch { return json({error:'invalid_json'}, 400); }
  if (typeof body?.website === 'string' && body.website) return json({ok:true});
  const input = validateCollection(body);
  if (!input) return json({error:'invalid_signup'}, 400);
  if (input.research_consent) {
    input.events = input.events.slice(-99);
    input.events.push({id:input.submission_id,type:'beta_signup_completed',persona:input.demo.persona || null,language:input.language,timestamp:new Date().toISOString(),properties:{role:input.role,need:input.need}});
  }
  try {
    await store(input, {url:config.SUPABASE_URL, key:config.SUPABASE_SECRET_KEY});
    return json({ok:true});
  } catch {
    // Never log request bodies, database responses or credentials.
    return json({error:'unavailable'}, 503);
  }
}
