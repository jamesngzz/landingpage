import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
const source=read('public/prototype/cases-demo.js'),html=read('public/prototype/cases-demo.html');
const sandbox={};runInNewContext(source,sandbox);
const {groups,cases,initialState,transition,copy,starts}=sandbox.WizzdomCases;

test('six original audiences are grouped once by what is missed, without adding another feature mode',()=>{
  const ids=groups.flatMap(g=>Array.from(g.cases));
  assert.equal(ids.length,6);assert.equal(new Set(ids).size,6);
  assert.deepEqual([...ids].sort(),['business','creator','engineer','personal','product','research']);
  assert.deepEqual(Object.keys(cases).sort(),[...ids].sort());
  assert.doesNotMatch(html,/data-mode=|mascot|story-companion|memory-section/);
});
test('every case has a prompt, old evidence, explicit causal connection and a bounded suggested step in both languages',()=>{
  for(const scene of Object.values(cases))for(const lang of ['vi','en']){
    for(const key of ['role','project','setup','prompt','answer','whisper','title','connection','next','why'])assert.ok(scene[lang][key]?.trim(),key);
    assert.equal(scene[lang].steps.length,2);assert.equal(scene[lang].sources.length,3);
    for(const [tool,label,fact,quote] of scene[lang].sources){assert.ok(['ChatGPT','Claude','Codex'].includes(tool));assert.ok(label&&fact&&quote);}
  }
  assert.match(cases.product.vi.sources[0][2],/7\/9/);
  assert.match(cases.engineer.vi.sources[0][2],/2 patch/);
  assert.match(cases.research.vi.sources[0][2],/30 ngày/);
  assert.match(cases.business.vi.sources[1][2],/50%/);
  assert.match(cases.creator.vi.sources[0][2],/38/);
  assert.match(cases.personal.vi.sources[1][2],/4 khóa/);
});
test('autoplay shows a nudge at 4 seconds and sources at 7, but never chooses a proposal',()=>{
  let state=initialState();
  for(let stage=0;stage<4;stage++)state=transition(state,{type:'ADVANCE',stage});
  assert.equal(starts[2],4000);assert.equal(starts[3],7000);
  assert.equal(state.stage,3);assert.equal(state.proposal,false);
  assert.equal(transition(initialState(),{type:'PROPOSE'}).proposal,false);
  assert.equal(transition(state,{type:'PROPOSE'}).proposal,true);
});
test('dismiss stays silent, and a scenario switch cannot leak an old proposal or resume a manual pause',()=>{
  let state=transition(initialState('business'),{type:'OPEN'});
  state=transition(state,{type:'PROPOSE'});assert.equal(state.proposal,true);
  state=transition(state,{type:'CASE',id:'research'});
  assert.equal(state.proposal,false);assert.equal(state.stage,0);assert.equal(state.paused,true);
  state=transition(state,{type:'DISMISS'});
  assert.equal(transition(state,{type:'ADVANCE',stage:3}),state);
  assert.equal(transition(state,{type:'CASE',id:'unknown'}),state);
  assert.equal(transition(state,{type:'OPEN'}).dismissed,false);
});
test('all addressed nodes and local assets exist, and generated embed uses the new case demo',()=>{
  for(const [,id] of source.matchAll(/\$\('#([\w-]+)'\)/g))assert.ok(html.includes(`id="${id}"`),id);
  for(const [,asset] of html.matchAll(/(?:src|href)="(\/[^"?]+)(?:\?[^"]*)?"/g))assert.ok(read('public'+asset).length,asset);
  assert.equal(read('public/prototype/landing/demo.html'),html);
  assert.equal(new Set([...html.matchAll(/id="([^"]+)"/g)].map(([,id])=>id)).size,[...html.matchAll(/id="([^"]+)"/g)].length);
});
test('preview never sends, stores or reads real user data',()=>{
  assert.doesNotMatch(source,/\bfetch\s*\(|localStorage|sessionStorage|sendBeacon|XMLHttpRequest|chrome\.|service_role|SUPABASE/);
  assert.ok(copy.vi.note.includes('hư cấu'));assert.ok(copy.en.note.includes('Fictional'));
  assert.ok(source.includes('event.origin!==location.origin||event.source!==window.parent'));
});
function fixture(search='?step=3&paused=1'){
  const nodes=new Map();
  const node=()=>({dataset:{},attrs:{},listeners:{},hidden:false,open:false,value:'',textContent:'',innerHTML:'',style:{setProperty(){}},setAttribute(k,v){this.attrs[k]=v;},addEventListener(k,fn){this.listeners[k]=fn;},focus(){this.focused=true;},showModal(){this.open=true;},close(){this.open=false;}});
  for(const [,id] of html.matchAll(/id="([^"]+)"/g))nodes.set('#'+id,node());
  const win={};win.parent=win;
  const document={documentElement:{dataset:{}},hidden:false,querySelector:s=>nodes.get(s),querySelectorAll:()=>[],addEventListener(){}};
  runInNewContext(source,{document,window:win,location:{search},URLSearchParams,matchMedia:()=>({matches:false,addEventListener(){}}),requestAnimationFrame:()=>1,cancelAnimationFrame(){}});
  return {get:id=>nodes.get('#'+id),click:id=>nodes.get('#'+id).listeners.click({}),select(id){nodes.get('#case-select').value=id;nodes.get('#case-select').listeners.change();}};
}
test('proposal only reveals a suggestion; it cannot rewrite the host answer, prompt or post to AI',()=>{
  const f=fixture(),before=f.get('answer-steps').innerHTML,prompt=f.get('prompt').textContent;
  f.click('show-proposal');
  assert.equal(f.get('proposal').hidden,false);assert.equal(f.get('proposal').focused,true);
  assert.equal(f.get('answer-steps').innerHTML,before);assert.equal(f.get('prompt').textContent,prompt);
  f.select('business');
  assert.equal(f.get('proposal').hidden,true);assert.equal(f.get('popup').hidden,false);
  assert.match(f.get('prompt').textContent,/thứ Hai/);
  assert.match(f.get('evidence-preview').innerHTML,/50%/);
});
test('hero has an understandable paused Developer state without waiting for animation, and replay does not approve',()=>{
  const f=fixture('?presentation=hero&case=engineer&step=3&paused=1');
  assert.match(f.get('prompt').textContent,/retry/);
  assert.equal(f.get('popup').hidden,false);assert.equal(f.get('proposal').hidden,true);
  f.click('replay');assert.equal(f.get('popup').hidden,true);assert.equal(f.get('player').dataset.stage,'0');
  assert.equal(f.get('proposal').hidden,true);
});
test('all six role choices map to the original three value groups in both languages',async()=>{
  const {scenarioOptions,scenarioValueGroups}=await import('../scripts/build-landing-preview.mjs');
  assert.equal(new Set(scenarioOptions.map(option=>option.id)).size,6);
  for(const option of scenarioOptions){assert.equal(option.vi,cases[option.id].vi.role);assert.equal(option.en,cases[option.id].en.role);}
  for(let i=0;i<3;i++)assert.deepEqual(scenarioValueGroups[i].cases,[...groups[i].cases]);
  assert.ok(source.includes("event.data?.type==='wizzdom-demo-case'&&known(event.data.caseId)"));
  assert.ok(source.indexOf('event.origin!==location.origin||event.source!==window.parent')<source.indexOf("event.data?.type==='wizzdom-demo-case'"));
});
test('the scenario sentence is the tab title, without the external setup, disclaimer or Claude/project header',()=>{
  assert.match(html,/<div class="browser-bar"><p class="app-tab" id="setup"><\/p>/);
  assert.doesNotMatch(html,/scenario-line|fiction-label|project-title|class="window-dots"/);
  assert.doesNotMatch(source,/text\('fiction-label'|text\('project-title'/);
  const f=fixture('?case=creator&step=3&paused=1');
  assert.equal(f.get('setup').textContent,cases.creator.vi.setup);
  f.select('business');assert.equal(f.get('setup').textContent,cases.business.vi.setup);
});
test('source dialog uses the selected scenario, and dismissal can be explicitly reopened',()=>{
  const f=fixture('?case=engineer&step=3&paused=1');f.click('view-sources');
  assert.equal(f.get('sources-dialog').open,true);assert.match(f.get('full-sources').innerHTML,/clock skew/);
  f.click('close-sources');assert.equal(f.get('sources-dialog').open,false);
  f.click('dismiss');assert.equal(f.get('popup').hidden,true);assert.equal(f.get('dismissed-note').hidden,false);
  f.click('reopen');assert.equal(f.get('popup').hidden,false);assert.equal(f.get('dismissed-note').hidden,true);
});
