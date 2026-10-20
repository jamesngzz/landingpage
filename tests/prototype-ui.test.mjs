// Lightweight UI wiring checks. These don't claim visual/browser coverage.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const html=readFileSync(new URL('../public/prototype/index.html',import.meta.url),'utf8');
const source=readFileSync(new URL('../public/prototype/story.js',import.meta.url),'utf8');
function fixture(search='?step=3&paused=1'){
  const nodes=new Map(),root={dataset:{}};
  function node(dataset={}){return {dataset,hidden:false,disabled:false,textContent:'',innerHTML:'',value:'',style:{setProperty(){}},listeners:{},attrs:{},setAttribute(k,v){this.attrs[k]=v;},removeAttribute(k){delete this.attrs[k];},addEventListener(k,fn){this.listeners[k]=fn;},focus(){},scrollIntoView(){},showModal(){this.open=true;},close(){this.open=false;}};}
  for(const [,id] of html.matchAll(/id="([\w-]+)"/g))nodes.set('#'+id,node());
  const translations=[...html.matchAll(/data-copy="(\w+)"/g)].map(([,copy])=>node({copy}));
  const langs=['vi','en'].map(lang=>node({lang}));
  const modes=['pull','nudge'].map(mode=>node({mode}));
  nodes.set('.app-location',node());
  const document={documentElement:root,hidden:false,querySelector(s){return nodes.get(s)||null;},querySelectorAll(s){if(s==='[data-copy]')return translations;if(s==='[data-lang]')return langs;if(s==='button[data-mode]')return modes;if(s==='#timeline button')return [];return [];},addEventListener(){}};
  const motion={matches:false,addEventListener(){}};
  runInNewContext(source,{document,window:{},location:{search},URLSearchParams,matchMedia:()=>motion,requestAnimationFrame:()=>1,cancelAnimationFrame(){}});
  return {get:id=>nodes.get('#'+id),click:id=>nodes.get('#'+id).listeners.click({}),mode:name=>modes.find(x=>x.dataset.mode===name).listeners.click({})};
}
test('approval click preserves mode and adds a draft without changing the host response',()=>{
  const f=fixture(),host=f.get('host-text').textContent;
  f.click('approve');
  assert.equal(f.get('player').dataset.approved,'true');
  assert.equal(f.get('draft-preview').hidden,false);
  assert.match(f.get('draft-text').textContent,/Tìm người dùng thử/);
  assert.equal(f.get('host-text').textContent,host);
});
test('nudge click reveals a specific action and never adds a brief to the AI draft',()=>{
  const f=fixture('?mode=nudge&step=3&paused=1');
  f.click('approve');
  assert.equal(f.get('next-preview').hidden,false);
  assert.match(f.get('next-action').textContent,/3 người/);
  assert.equal(f.get('draft-preview').hidden,true);
});
test('dismiss closes review; switching modes cannot silently resume paused following',()=>{
  const f=fixture();f.click('dismiss');
  assert.equal(f.get('context-card').hidden,true);
  f.click('following-toggle');f.mode('nudge');
  assert.equal(f.get('player').dataset.following,'false');
  assert.equal(f.get('play-pause').disabled,true);
  assert.equal(f.get('context-card').hidden,true);
});
