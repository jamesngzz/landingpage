// Manual integration test. Reads a server key without echoing or saving it.
// Afterwards, run the exact cleanup SQL documented in README.md.
import {handleBeta} from '../lib/beta-handler.mjs';
import assert from 'node:assert/strict';
if (!process.env.SUPABASE_URL) throw new Error('Set SUPABASE_URL before running.');
if (!process.stdin.isTTY) throw new Error('Use an interactive terminal for hidden key input.');
process.stdin.setRawMode(true);
process.stdin.resume();
console.log('Ready for server key on stdin (input is hidden).');
const key = await new Promise((resolve,reject)=>{
  let value='';
  const read = chunk => {
    const text=chunk.toString();
    if(text.includes('\u0003')) {process.stdin.setRawMode(false);process.stdin.pause();reject(new Error('Cancelled'));return;}
    value+=text;
    if(value.length>5000) {process.stdin.setRawMode(false);process.stdin.pause();reject(new Error('Input too long'));return;}
    if(/[\r\n]/.test(value)) {process.stdin.off('data',read);process.stdin.setRawMode(false);process.stdin.pause();resolve(value.trim());}
  };
  process.stdin.on('data',read);
});
const payload={email:'wizzdom-vercel-integration-20261019@example.invalid',role:'engineer',need:'rework',tools:['claude','codex'],language:'vi',consent:true,submission_id:'0a824373-d07f-4427-b3d5-bec42613f4f1',demo:{persona:'engineer',choice:0,rating:'definitely'},context_sources:['claude','browser'],research_consent:true,session:{id:'a25a2ea4-89ba-45e1-b25d-d0e9751f557b',started_at:new Date().toISOString(),device_type:'mobile',viewport_bucket:'small',attribution:{utm_source:'integration-test'},referrer_host:'example.invalid'},events:[{id:'e1bdca07-490a-44df-919e-c3f8dbb9f034',type:'scenario_choice',persona:'engineer',language:'vi',timestamp:new Date().toISOString(),properties:{choice_index:0}}]};
for(let i=0;i<2;i++) {
  const response=await handleBeta(new Request('https://landing.example/api/beta',{method:'POST',headers:{origin:'https://landing.example','content-type':'application/json'},body:JSON.stringify(payload)}),{SUPABASE_URL:process.env.SUPABASE_URL,SUPABASE_SECRET_KEY:key});
  assert.equal(response.status,200,`Supabase integration failed with status ${response.status}`);
  assert.deepEqual(await response.json(),{ok:true});
}
console.log('PASS: Vercel API handler → HTTPS Supabase RPC, including duplicate submission. Verify and remove the synthetic test row with the documented SQL.');
