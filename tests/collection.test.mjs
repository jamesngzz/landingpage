import test from 'node:test';
import assert from 'node:assert/strict';
import {validateCollection} from '../lib/collection-validation.mjs';
import {saveSupabaseSignup} from '../lib/supabase-storage.mjs';
import {handleBeta} from '../lib/beta-handler.mjs';
const payload = () => ({email:'QA@example.invalid', role:'product', need:'decisions', tools:['claude'], language:'vi', consent:true, submission_id:crypto.randomUUID(), demo:{persona:'product',choice:1,rating:'definitely'},context_sources:['claude'],research_consent:false});
const journey = () => ({...payload(),research_consent:true,session:{id:crypto.randomUUID(),started_at:new Date().toISOString(),device_type:'mobile',viewport_bucket:'small',referrer_host:'example.com',attribution:{utm_source:'community',utm_campaign:'launch',email:'private@example.invalid'}},events:[{id:crypto.randomUUID(),type:'scenario_choice',language:'vi',persona:'product',timestamp:new Date().toISOString(),properties:{choice_index:1,email:'private@example.invalid',choice:'unbounded text'}}]});
let client = 0;
const req = (body, headers={}, method='POST') => new Request('https://landing.example/api/beta',{method,headers:{origin:'https://landing.example','content-type':'application/json','x-vercel-forwarded-for':`test-${++client}`,...headers},...(['GET','HEAD'].includes(method)?{}:{body:typeof body==='string'?body:JSON.stringify(body)})});

test('contact signup strips sessions and events without research consent',()=>{
  const data = journey(); data.research_consent=false;
  const out = validateCollection(data);
  assert.equal(out.email,'qa@example.invalid'); assert.deepEqual(out.events,[]); assert.equal(out.session,null);
});
test('consenting journey retains only bounded known event fields',()=>{
  const out=validateCollection(journey());
  assert.equal(out.session.device_type,'mobile');
  assert.deepEqual(out.session.attribution,{utm_source:'community',utm_campaign:'launch'});
  assert.deepEqual(out.events[0].properties,{choice_index:1});
});
test('invalid UUID, date, event type or excessive events rejected',()=>{
  for(const mutate of [x=>x.submission_id='invalid',x=>x.session.id='invalid',x=>x.events[0].timestamp='invalid',x=>x.events[0].type='email_typed',x=>x.events=Array(101).fill(x.events[0])]) {
    const data=journey();mutate(data);assert.equal(validateCollection(data),null);
  }
});
test('attribution rejects email/full query values and referrer is hostname only',()=>{
  const data=journey();data.session.attribution.utm_source='private@example.invalid';data.session.referrer_host='https://example.com/private';
  const out=validateCollection(data);assert.equal(out.session.attribution.utm_source,undefined);assert.equal(out.session.referrer_host,null);
});
test('source choices are whitelisted and deduplicated',()=>{
  const data=payload();data.context_sources=['claude','claude','private text'];assert.deepEqual(validateCollection(data).context_sources,['claude']);
});
test('server storage uses HTTPS RPC and server-only API key',async()=>{
  await saveSupabaseSignup(payload(),{url:'https://project.supabase.co',key:'sb_secret_test'},async(url,init)=>{
    assert.equal(url.pathname,'/rest/v1/rpc/wizzdom_capture_beta');assert.equal(init.headers.apikey,'sb_secret_test');assert.equal(init.headers.Authorization,undefined);
    assert.ok(JSON.parse(init.body).payload.submission_id);return Response.json({ok:true});
  });
});
test('legacy service-role JWT sets authorization header',async()=>{
  await saveSupabaseSignup(payload(),{url:'https://project.supabase.co',key:'eyJtest-only'},async(_url,init)=>{assert.equal(init.headers.Authorization,'Bearer eyJtest-only');return Response.json({ok:true});});
});
test('storage failures and missing configuration never report success',async()=>{
  await assert.rejects(saveSupabaseSignup(payload(),{}));
  await assert.rejects(saveSupabaseSignup(payload(),{url:'http://unsafe.example',key:'test'}));
  await assert.rejects(saveSupabaseSignup(payload(),{url:'https://project.supabase.co',key:'test'},async()=>new Response('',{status:500})));
  await assert.rejects(saveSupabaseSignup(payload(),{url:'https://project.supabase.co',key:'test'},async()=>Response.json({ok:false})));
});
test('API rejects non-POST, cross-origin, malformed and oversized requests',async()=>{
  assert.equal((await handleBeta(req(null,{},'GET'))).status,405);
  assert.equal((await handleBeta(req(payload(),{origin:'https://evil.example'}))).status,403);
  assert.equal((await handleBeta(req(payload(),{'content-type':'text/plain'}))).status,415);
  assert.equal((await handleBeta(req('{'))).status,400);
  assert.equal((await handleBeta(req(' '.repeat(65537)))).status,413);
  assert.equal((await handleBeta(req({}))).status,400);
});
test('honeypot does not call database',async()=>{
  const response=await handleBeta(req({...payload(),website:'spam'}),{},()=>{assert.fail('must not save');});
  assert.equal(response.status,200);
});
test('API confirms only after successful save, adds completion for research consent',async()=>{
  const response=await handleBeta(req(journey()),{SUPABASE_URL:'https://project.supabase.co',SUPABASE_SECRET_KEY:'test'},async(data,config)=>{
    assert.equal(config.key,'test');assert.equal(data.events.at(-1).type,'beta_signup_completed');assert.equal(data.events.length,2);
  });
  assert.equal(response.status,200);assert.deepEqual(await response.json(),{ok:true});assert.equal(response.headers.get('cache-control'),'no-store');
});
test('database or configuration failures return retriable 503',async()=>{
  assert.equal((await handleBeta(req(payload()),{},async()=>{throw new Error('not logged');})).status,503);
  assert.equal((await handleBeta(req(payload()),{})).status,503);
});
test('instance-local throttle blocks the thirteenth request',async()=>{
  const id='throttle-test';
  for(let i=0;i<12;i++)assert.equal((await handleBeta(req({}, {'x-vercel-forwarded-for':id}))).status,400);
  assert.equal((await handleBeta(req({}, {'x-vercel-forwarded-for':id}))).status,429);
});
