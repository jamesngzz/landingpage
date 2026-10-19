BEGIN;

CREATE SCHEMA wizzdom_landing;
REVOKE ALL ON SCHEMA wizzdom_landing FROM PUBLIC, anon, authenticated;

CREATE TABLE wizzdom_landing.schema_migrations (
  version text PRIMARY KEY,
  applied_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE wizzdom_landing.sessions (
  id uuid PRIMARY KEY,
  language text NOT NULL CHECK (language IN ('en','vi')),
  device_type text NOT NULL CHECK (device_type IN ('mobile','tablet','desktop','unknown')),
  viewport_bucket text NOT NULL CHECK (viewport_bucket IN ('small','medium','large','unknown')),
  page_path text NOT NULL DEFAULT '/' CHECK (page_path = '/'),
  referrer_host text CHECK (length(referrer_host) <= 253),
  attribution jsonb NOT NULL DEFAULT '{}' CHECK (jsonb_typeof(attribution) = 'object'),
  started_at timestamptz NOT NULL,
  last_seen_at timestamptz NOT NULL DEFAULT now(),
  analytics_consent_version text NOT NULL
);

CREATE TABLE wizzdom_landing.signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE CHECK (email = lower(btrim(email)) AND length(email) <= 254),
  role text NOT NULL CHECK (role IN ('product','engineer','research','business','creator','personal','unknown')),
  primary_need text NOT NULL CHECK (primary_need IN ('decisions','rework','commitments','patterns','explore')),
  tools text[] NOT NULL DEFAULT '{}' CHECK (tools <@ ARRAY['chatgpt','claude','codex','gemini','other']::text[]),
  language text NOT NULL CHECK (language IN ('en','vi')),
  demo jsonb NOT NULL DEFAULT '{}' CHECK (jsonb_typeof(demo) = 'object'),
  context_sources text[] NOT NULL DEFAULT '{}' CHECK (context_sources <@ ARRAY['chatgpt','claude','codex','browser','notes','calls']::text[]),
  session_id uuid REFERENCES wizzdom_landing.sessions(id) ON DELETE SET NULL,
  contact_consent_version text NOT NULL,
  research_consent boolean NOT NULL DEFAULT false,
  research_consent_version text,
  source text NOT NULL DEFAULT 'landing' CHECK (source IN ('landing','legacy_d1')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE wizzdom_landing.signup_submissions (
  id uuid PRIMARY KEY,
  signup_id uuid NOT NULL REFERENCES wizzdom_landing.signups(id) ON DELETE CASCADE,
  role text NOT NULL,
  primary_need text NOT NULL,
  tools text[] NOT NULL,
  language text NOT NULL,
  demo jsonb NOT NULL,
  context_sources text[] NOT NULL,
  session_id uuid REFERENCES wizzdom_landing.sessions(id) ON DELETE SET NULL,
  contact_consent_version text NOT NULL,
  research_consent boolean NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE wizzdom_landing.events (
  id uuid PRIMARY KEY,
  session_id uuid NOT NULL REFERENCES wizzdom_landing.sessions(id) ON DELETE CASCADE,
  signup_id uuid NOT NULL REFERENCES wizzdom_landing.signups(id) ON DELETE CASCADE,
  event_type text NOT NULL CHECK (event_type IN ('persona_selected','scenario_choice','evidence_opened','insight_action','value_rated','source_toggled','make_it_yours_clicked','demo_reset','beta_opened','beta_step_viewed','beta_role_selected','beta_need_selected','beta_tool_toggled','beta_submit_attempt','beta_signup_completed','language_changed')),
  persona text CHECK (persona IN ('product','engineer','research','business','creator','personal')),
  language text NOT NULL CHECK (language IN ('en','vi')),
  properties jsonb NOT NULL DEFAULT '{}' CHECK (jsonb_typeof(properties) = 'object' AND octet_length(properties::text) <= 2048),
  occurred_at timestamptz NOT NULL,
  received_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX signups_created_idx ON wizzdom_landing.signups(created_at DESC);
CREATE INDEX signups_role_need_idx ON wizzdom_landing.signups(role, primary_need);
CREATE INDEX submissions_signup_idx ON wizzdom_landing.signup_submissions(signup_id, created_at DESC);
CREATE INDEX events_session_idx ON wizzdom_landing.events(session_id, occurred_at);
CREATE INDEX events_type_persona_idx ON wizzdom_landing.events(event_type, persona, occurred_at);

ALTER TABLE wizzdom_landing.schema_migrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE wizzdom_landing.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE wizzdom_landing.signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE wizzdom_landing.signup_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE wizzdom_landing.events ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON ALL TABLES IN SCHEMA wizzdom_landing FROM PUBLIC, anon, authenticated;

-- Private data stays outside the exposed public schema. Only a server credential
-- can invoke this bounded RPC. All records for one submission commit atomically.
CREATE FUNCTION public.wizzdom_capture_beta(payload jsonb)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER
SET search_path = pg_catalog, wizzdom_landing
AS $function$
DECLARE
  v_signup uuid;
  v_session uuid;
  v_submission uuid;
  v_tools text[];
  v_sources text[];
  v_research boolean;
  v_event jsonb;
BEGIN
  IF jsonb_typeof(payload) IS DISTINCT FROM 'object'
     OR octet_length(payload::text) > 65536
     OR payload->>'consent' IS DISTINCT FROM 'true'
     OR coalesce(payload->>'email','') !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]{2,}$'
     OR length(payload->>'email') > 254
     OR coalesce(payload->>'role','') NOT IN ('product','engineer','research','business','creator','personal','unknown')
     OR coalesce(payload->>'need','') NOT IN ('decisions','rework','commitments','patterns','explore')
     OR coalesce(payload->>'language','') NOT IN ('en','vi')
     OR jsonb_typeof(payload->'tools') IS DISTINCT FROM 'array'
     OR jsonb_typeof(payload->'demo') IS DISTINCT FROM 'object'
     OR jsonb_typeof(payload->'context_sources') IS DISTINCT FROM 'array'
     OR jsonb_typeof(payload->'events') IS DISTINCT FROM 'array'
  THEN RAISE EXCEPTION 'invalid_signup' USING ERRCODE = '22023'; END IF;
  v_submission := (payload->>'submission_id')::uuid;
  SELECT array_agg(DISTINCT x) INTO v_tools FROM jsonb_array_elements_text(payload->'tools') x;
  SELECT array_agg(DISTINCT x) INTO v_sources FROM jsonb_array_elements_text(payload->'context_sources') x;
  v_tools := coalesce(v_tools, '{}');
  v_sources := coalesce(v_sources, '{}');
  v_research := payload->>'research_consent' = 'true';
  IF v_research AND jsonb_typeof(payload->'session') = 'object' THEN
    v_session := (payload->'session'->>'id')::uuid;
    INSERT INTO wizzdom_landing.sessions(id, language, device_type, viewport_bucket, referrer_host, attribution, started_at, analytics_consent_version)
    VALUES (v_session, payload->>'language', payload->'session'->>'device_type', payload->'session'->>'viewport_bucket', payload->'session'->>'referrer_host', coalesce(payload->'session'->'attribution','{}'), greatest(now()-interval '1 day',least(now(),(payload->'session'->>'started_at')::timestamptz)), 'demo-research-v1')
    ON CONFLICT (id) DO UPDATE SET last_seen_at = now();
  END IF;
  INSERT INTO wizzdom_landing.signups(email, role, primary_need, tools, language, demo, context_sources, session_id, contact_consent_version, research_consent, research_consent_version)
  VALUES (lower(btrim(payload->>'email')), payload->>'role', payload->>'need', v_tools, payload->>'language', payload->'demo', v_sources, v_session, 'beta-contact-v2', coalesce(v_research,false), CASE WHEN v_research THEN 'demo-research-v1' END)
  ON CONFLICT (email) DO UPDATE SET role=excluded.role, primary_need=excluded.primary_need, tools=excluded.tools, language=excluded.language, demo=excluded.demo, context_sources=excluded.context_sources, session_id=excluded.session_id, contact_consent_version=excluded.contact_consent_version, research_consent=excluded.research_consent, research_consent_version=excluded.research_consent_version, updated_at=now()
  RETURNING id INTO v_signup;
  INSERT INTO wizzdom_landing.signup_submissions(id, signup_id, role, primary_need, tools, language, demo, context_sources, session_id, contact_consent_version, research_consent)
  VALUES (v_submission, v_signup, payload->>'role', payload->>'need', v_tools, payload->>'language', payload->'demo', v_sources, v_session, 'beta-contact-v2', coalesce(v_research,false))
  ON CONFLICT (id) DO NOTHING;
  IF v_research THEN
    IF v_session IS NULL OR jsonb_array_length(payload->'events') > 100 THEN RAISE EXCEPTION 'invalid_journey' USING ERRCODE = '22023'; END IF;
    FOR v_event IN SELECT * FROM jsonb_array_elements(payload->'events') LOOP
      INSERT INTO wizzdom_landing.events(id,session_id,signup_id,event_type,persona,language,properties,occurred_at)
      VALUES ((v_event->>'id')::uuid,v_session,v_signup,v_event->>'type',v_event->>'persona',v_event->>'language',coalesce(v_event->'properties','{}'),greatest(now()-interval '1 day',least(now(),(v_event->>'timestamp')::timestamptz)))
      ON CONFLICT (id) DO NOTHING;
    END LOOP;
  END IF;
  RETURN jsonb_build_object('ok',true);
END;
$function$;
REVOKE ALL ON FUNCTION public.wizzdom_capture_beta(jsonb) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.wizzdom_capture_beta(jsonb) TO service_role;

CREATE VIEW wizzdom_landing.demand_summary AS
SELECT role, primary_need, language, count(*) AS registrations,
       count(*) FILTER (WHERE research_consent) AS research_opt_ins
FROM wizzdom_landing.signups GROUP BY role, primary_need, language;
REVOKE ALL ON wizzdom_landing.demand_summary FROM PUBLIC, anon, authenticated;

INSERT INTO wizzdom_landing.schema_migrations(version) VALUES ('202610190001');
COMMIT;
