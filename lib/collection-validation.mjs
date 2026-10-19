import { validateSignup, ROLES } from "./signup-validation.mjs";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const SOURCES = ["chatgpt", "claude", "codex", "browser", "notes", "calls"];
const TYPES = new Set(["persona_selected", "scenario_choice", "evidence_opened", "insight_action", "value_rated", "source_toggled", "make_it_yours_clicked", "demo_reset", "beta_opened", "beta_step_viewed", "beta_role_selected", "beta_need_selected", "beta_tool_toggled", "beta_submit_attempt", "beta_signup_completed", "language_changed"]);
const cleanText = (value, max) => typeof value === "string" && /^[\w .:/-]*$/.test(value) ? value.slice(0, max) : undefined;
const recentDate = value => typeof value === "string" && Number.isFinite(Date.parse(value)) && Math.abs(Date.now()-Date.parse(value)) < 86_400_000;

export function validateCollection(body) {
  const signup = validateSignup(body);
  if (!signup || !UUID.test(body.submission_id || "")) return null;
  const sources = Array.isArray(body.context_sources) ? [...new Set(body.context_sources.filter(x => SOURCES.includes(x)))].slice(0,6) : [];
  const result = {...signup, consent: true, submission_id: body.submission_id, context_sources: sources, research_consent: body.research_consent === true, session: null, events: []};
  if (!result.research_consent) return result;
  const session = body.session;
  if (!session || !UUID.test(session.id || "") || !recentDate(session.started_at) || !Array.isArray(body.events) || body.events.length > 100) return null;
  const attribution = {};
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
    const value = cleanText(session.attribution?.[key], 100);
    if (value) attribution[key] = value;
  }
  result.session = {
    id: session.id, started_at: session.started_at, page_path: "/", attribution,
    device_type: ["mobile","tablet","desktop"].includes(session.device_type) ? session.device_type : "unknown",
    viewport_bucket: ["small","medium","large"].includes(session.viewport_bucket) ? session.viewport_bucket : "unknown",
    referrer_host: typeof session.referrer_host === "string" && /^[a-z0-9.-]{1,253}$/i.test(session.referrer_host) ? session.referrer_host.toLowerCase() : null,
  };
  for (const event of body.events) {
    if (!event || !UUID.test(event.id || "") || !TYPES.has(event.type) || !["en","vi"].includes(event.language) || !recentDate(event.timestamp)) return null;
    const properties = {};
    const raw = event.properties || {};
    for (const [key, allowed] of Object.entries({value:["definitely","maybe","no"], action:["use","continue"], source:SOURCES, role:ROLES, need:["decisions","rework","commitments","patterns","explore"], tool:["chatgpt","claude","codex","gemini","other"]})) {
      if (allowed.includes(raw[key])) properties[key] = raw[key];
    }
    if ([0,1].includes(raw.choice_index)) properties.choice_index = raw.choice_index;
    if ([1,2,3].includes(raw.step)) properties.step = raw.step;
    for (const key of ["from_demo","selected"]) if (typeof raw[key] === "boolean") properties[key] = raw[key];
    if (Array.isArray(raw.sources)) properties.sources = [...new Set(raw.sources.filter(x=>SOURCES.includes(x)))];
    result.events.push({id:event.id, type:event.type, persona:ROLES.slice(0,6).includes(event.persona)?event.persona:null, language:event.language, timestamp:event.timestamp, properties});
  }
  return result;
}
