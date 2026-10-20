import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
const source=read('public/prototype/story.js');
const html=read('public/prototype/index.html');
const css=read('public/prototype/story.css');
const context={};runInNewContext(source,context);const p=context.WizzdomStory;
const review=mode=>p.transition(p.initialState(mode),{type:'SEEK',stage:3});

test('one project has two help modes, with five stages lasting 20 seconds',()=>{
  assert.equal(p.total,20000);assert.equal(p.durations.length,5);
  assert.deepEqual(Object.keys(p.scenes),['pull','nudge']);
  for(let i=0;i<5;i++){assert.equal(p.stageAt(p.starts[i]),i);if(i)assert.equal(p.stageAt(p.starts[i]-1),i-1);}
  for(const mode of ['pull','nudge'])for(const language of ['vi','en']){
    assert.equal(p.scenes[mode][language].narration.length,5);
    for(const field of ['task','scenario','title','explanation','action','next'])assert.ok(p.scenes[mode][language][field]);
  }
});
test('the useful context appears within five seconds instead of a long loading prelude',()=>{
  assert.ok(p.starts[3]<=5000);
  assert.ok(source.includes("$('#retrieval-trail').innerHTML=relevant.map"));
});
test('active demo uses the Wizzdom logo, not a mascot or a different host per mode',()=>{
  assert.doesNotMatch(html,/mascot\.png|desktop-mascot|Wizzdom mascot/);
  assert.doesNotMatch(source,/desktop-mascot|Claude Desktop/);
  assert.ok(html.includes('id="quiet-state" class="quiet-state"><img src="/assets/brand/wizzdom-lens.png"'));
  assert.ok(source.includes("text('app-title','Claude · Landing page')"));
  assert.ok(html.includes('<details id="memory-settings">'));
});
test('autoplay never approves or drafts context on behalf of the visitor',()=>{
  let state=p.initialState('pull');
  for(const time of [0,3000,6000,9000,16000,20000]){state=p.transition(state,{type:'ADVANCE',time});assert.equal(state.approved,false);}
  assert.equal(state.stage,4);
  assert.equal(p.transition(state,{type:'APPROVE'}).approved,true);
});
test('approval requires an open review and is blocked after dismissal or pause',()=>{
  assert.equal(p.transition(p.initialState('pull'),{type:'APPROVE'}).approved,false);
  for(const event of [{type:'DISMISS'},{type:'FOLLOW'}]){
    const state=p.transition(review('nudge'),event);
    assert.equal(p.transition(state,{type:'APPROVE'}).approved,false);
    assert.equal(p.transition(state,{type:'ADVANCE',time:20000}).stage,state.stage);
    assert.equal(p.canUse(state,p.createMemories()),false);
  }
});
test('mode changes and replay cannot leak prior approval to a new task',()=>{
  const approved=p.transition(review('pull'),{type:'APPROVE'});
  for(const event of [{type:'MODE',mode:'nudge'},{type:'SEEK',stage:0}])assert.equal(p.transition(approved,event).approved,false);
  assert.equal(p.transition(approved,{type:'ADVANCE',time:0}).approved,true);
});
test('changing demo mode respects an explicit pause',()=>{
  const paused=p.transition(review('pull'),{type:'FOLLOW'});
  const changed=p.transition(paused,{type:'MODE',mode:'nudge'});
  assert.equal(changed.following,false);
  assert.equal(p.canUse(changed,p.createMemories()),false);
});
test('both scenarios have a concrete result and next step, not just an approval message',()=>{
  for(const mode of ['pull','nudge'])for(const lang of ['vi','en']){
    assert.ok(p.scenes[mode][lang].result);
    assert.ok(p.scenes[mode][lang].nextStep);
  }
  assert.ok(source.includes("$('#next-preview').hidden=!state.approved||state.mode!=='nudge'"));
  assert.ok(html.includes('id="next-action"'));
  assert.ok(source.includes('fact-origin'));
});
test('memory edits keep original source intact; forgetting removes it from retrieved context',()=>{
  const memory=p.createMemories(),original=p.facts[0].vi.quote;
  memory.goal.edits.vi='A different goal';
  assert.equal(p.facts[0].vi.quote,original);
  assert.equal(p.canUse(review('nudge'),memory),false);
  memory.goal.active=false;
  assert.equal(p.usableFacts(review('pull'),memory).some(f=>f.id==='goal'),false);
  for(const item of Object.values(memory))item.active=false;
  assert.equal(p.canUse(review('pull'),memory),false);
});
test('nudge requires both unedited evidence sources; preferences alone cannot justify it',()=>{
  const memory=p.createMemories();assert.equal(p.canUse(review('nudge'),memory),true);
  memory.problem.active=false;assert.equal(p.canUse(review('nudge'),memory),false);
  memory.problem.active=true;memory.standard.edits.vi='A new presentation style';
  assert.equal(p.canUse(review('nudge'),memory),true);
});
test('English and Vietnamese cover every static translation and memory record',()=>{
  assert.deepEqual(Object.keys(p.copy.en).sort(),Object.keys(p.copy.vi).sort());
  for(const [,key] of html.matchAll(/data-copy="([\w]+)"/g))for(const language of ['vi','en'])assert.equal(typeof p.copy[language][key],'string',key);
  for(const fact of p.facts)for(const language of ['vi','en'])for(const key of ['label','title','text','quote'])assert.ok(fact[language][key]);
  assert.equal(p.copy.vi.needs.length,4);assert.equal(p.copy.en.needs.length,4);
});
test('all directly addressed UI nodes and local assets exist',()=>{
  for(const [,id] of source.matchAll(/\$\('#([\w-]+)'\)/g))assert.ok(html.includes(`id="${id}"`),id);
  for(const [,path] of html.matchAll(/(?:src|href)="(\/(?:assets|prototype)\/[^"?#]+)"/g))assert.ok(existsSync(new URL('../public'+path,import.meta.url)),path);
});
test('host AI response does not change with stage, approval or autoplay',()=>{
  const chat=source.match(/function renderChat\(\)\{([\s\S]*?)\n  \}/)[1];
  assert.doesNotMatch(chat,/approved|stage|elapsed/);
  assert.equal((source.match(/renderChat\(\);/g)||[]).length,1);
  assert.ok(source.includes("$('#draft-preview').hidden=!state.approved||state.mode!=='pull'"));
});
test('prototype never networks, persists data, reads real chats or claims a saved signup',()=>{
  assert.doesNotMatch(source,/\bfetch\s*\(|XMLHttpRequest|sendBeacon|WebSocket|localStorage|sessionStorage|navigator\.clipboard/);
  assert.doesNotMatch(html,/<form|type="email"|<iframe/);
  assert.ok(html.includes('noindex,nofollow'));
  assert.ok(p.copy.vi.localDisclosure.includes('chưa đăng ký'));
  assert.ok(p.copy.en.localDisclosure.includes('does not register'));
});
test('presentation preserves landing color tokens and both earlier prototype versions',()=>{
  const landing=read('styles.css');
  for(const name of ['paper','ink','muted','line','white','blue','blue-soft','yellow','green']){
    const pattern=new RegExp(`--${name}:\\s*([^;]+);`);assert.equal(css.match(pattern)[1],landing.match(pattern)[1]);
  }
  const archived=read('public/prototype/companion-v1/index.html');
  assert.ok(archived.includes('href="./prototype.css"'));
  assert.ok(archived.includes('href="./landing-theme.css"'));
  assert.ok(archived.includes('src="./prototype.js"'));
  assert.ok(existsSync(new URL('../public/prototype/previous/index.html',import.meta.url)));
});
test('mobile uses normal-flow panes and animation honors reduced motion and visibility',()=>{
  assert.ok(css.includes('.work-scene{grid-template-columns:1fr;min-height:0}'));
  assert.ok(css.includes('@media(prefers-reduced-motion:reduce)'));
  assert.ok(source.includes("document.addEventListener('visibilitychange',sync)"));
  assert.ok(source.includes("new IntersectionObserver"));
  assert.ok(source.includes("$('#approve').addEventListener('click',()=>{if(!canUse(state,memory))return;"));
  assert.ok(source.includes("$$('button[data-mode]').forEach(b=>b.addEventListener"));
  assert.ok(!source.includes("$$('[data-mode]').forEach(b=>b.addEventListener"));
  assert.ok(css.includes('.story-player .host-response,.story-player .host-app>.mock-composer{display:none}'));
});
