import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {installFocusModality} from '../focus-modality.js';

function fixture(view = {PointerEvent:class {}}) {
  const handlers = new Map();
  const doc = {documentElement:{dataset:{}},addEventListener(type,handler,options){handlers.set(type,{handler,options});}};
  installFocusModality(doc,view);
  return {root:doc.documentElement,handlers,dispatch(type,event={}) {handlers.get(type)?.handler(event);}};
}
test('mouse/touch is the initial mode and does not remove actual focus',()=>{
  const {root,handlers}=fixture();
  assert.equal(root.dataset.inputModality,'pointer');
  assert.equal(handlers.get('pointerdown').options,true);
  assert.equal(handlers.has('focus'),false); // no blur-on-focus workaround
});
test('Tab and keyboard activation show focus through programmatic stage changes',()=>{
  const {root,dispatch}=fixture();
  dispatch('keydown',{key:'Tab'});assert.equal(root.dataset.inputModality,'keyboard');
  dispatch('keydown',{key:'Enter'});assert.equal(root.dataset.inputModality,'keyboard');
  dispatch('pointerdown',{pointerType:'touch'});assert.equal(root.dataset.inputModality,'pointer');
  dispatch('keydown',{key:'Tab',shiftKey:true});assert.equal(root.dataset.inputModality,'keyboard');
  dispatch('pointerdown',{pointerType:'mouse'});assert.equal(root.dataset.inputModality,'pointer');
});
test('browser shortcuts and modifier keys do not leave a spurious keyboard ring',()=>{
  const {root,dispatch}=fixture();
  for(const event of [{key:'Shift'},{key:'r',metaKey:true},{key:'l',ctrlKey:true},{key:'ArrowLeft',altKey:true}]) dispatch('keydown',event);
  assert.equal(root.dataset.inputModality,'pointer');
});
test('older touch browsers receive passive touch and mouse fallbacks',()=>{
  const {root,dispatch,handlers}=fixture({});
  dispatch('keydown',{key:'Tab'});dispatch('touchstart');assert.equal(root.dataset.inputModality,'pointer');
  dispatch('keydown',{key:'Tab'});dispatch('mousedown');assert.equal(root.dataset.inputModality,'pointer');
  assert.deepEqual(handlers.get('touchstart').options,{capture:true,passive:true});
});
test('CSS handles focused headings and buttons, preserves text field focus',()=>{
  const css=readFileSync(new URL('../styles.css',import.meta.url),'utf8');
  assert.ok(css.includes('html[data-input-modality="keyboard"] :focus'));
  assert.ok(css.includes('html[data-input-modality="pointer"] :is(a, button, select, [tabindex="-1"]):focus { outline: none; }'));
  assert.ok(css.includes(':focus-visible,'));
});
test('focus module is included in HTML and static build',()=>{
  const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
  const build=readFileSync(new URL('../scripts/build-vercel.mjs',import.meta.url),'utf8');
  assert.match(html,/<script type="module" src="\/focus-modality\.js\?v=14"><\/script>/);
  assert.ok(build.includes("'focus-modality.js'"));
});
