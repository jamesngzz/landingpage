import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import {execFileSync} from 'node:child_process';
import {composeProductionLanding,composeProductionRuntime,composeProductionDemo} from '../scripts/production-landing.mjs';
import {validateCollection} from '../lib/collection-validation.mjs';

const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
const html=composeProductionLanding(read('index.html'));
const runtime=composeProductionRuntime(read('script.js'));

test('Vercel build serves the approved companion layout at /, not the old home or preview form',()=>{
  execFileSync(process.execPath,['scripts/build-vercel.mjs'],{cwd:new URL('../',import.meta.url)});
  assert.equal(read('public/index.html'),html);assert.equal(read('public/script.js'),runtime);
  assert.match(html,/data-landing-version="companion"/);
  assert.match(html,/id="integration-hero-title"/);assert.match(html,/id="valueDirection"/);
  assert.match(html,/src="\/demo.html\?/);
  assert.doesNotMatch(html,/integration-play|integrationCta|Watch this scenario unfold/);
  assert.doesNotMatch(runtime,/integration-play|integrationCta|Xem diễn biến tình huống/);
  assert.doesNotMatch(html,/scenario-picker-title|integrationChoose/);
  assert.doesNotMatch(runtime,/integrationChoose|Bạn muốn Wizzdom giúp điều gì/);
  assert.doesNotMatch(html,/noindex|data-local-preview|\.\/demo|\.\/base|\.\/landing-runtime/);
  assert.doesNotMatch(runtime,/Bản thử landing ghép|Integrated landing preview|chưa gửi đăng ký và không lưu email/);
  assert.doesNotMatch(runtime,/service_role|SUPABASE_SECRET_KEY|sb_secret_/);
  assert.equal(read('public/demo.html'),composeProductionDemo(read('public/prototype/cases-demo.html')));
  assert.doesNotMatch(read('public/demo.html'),/\/prototype\//);
  assert.match(read('public/demo.html'),/<script type="module" src="\/focus-modality.js"/);
  assert.equal(read('public/demo.js'),read('public/prototype/cases-demo.js'));
  assert.equal(read('public/demo.css'),read('public/prototype/cases-demo.css'));
  assert.doesNotMatch(read('public/landing.css'),/data-local-preview/);
});

test('all homepage and demo assets resolve in the production output',()=>{
  const demo=composeProductionDemo(read('public/prototype/cases-demo.html'));
  for(const page of [html,demo])for(const [,asset] of page.matchAll(/(?:src|href)="(\/[^"?#]+)(?:\?[^\"]*)?"/g))assert.ok(read('public'+asset).length,asset);
  for(const marker of ['<section class="pipeline-section"','<section class="privacy-section"','<section class="apply-section"']){
    const section=source=>source.slice(source.indexOf(marker),source.indexOf('</section>',source.indexOf(marker))+10);
    assert.equal(section(html),section(read('index.html')));
  }
});

test('only /demo.html accepts same-origin framing; the homepage and API remain unframeable',()=>{
  const config=JSON.parse(read('vercel.json'));
  const headers=path=>Object.fromEntries(config.headers.filter(rule=>new RegExp('^'+rule.source+'$').test(path)).flatMap(rule=>rule.headers).map(({key,value})=>[key.toLowerCase(),value]));
  assert.equal(headers('/demo.html')['x-frame-options'],'SAMEORIGIN');
  assert.equal(headers('/demo.html')['content-security-policy'],"frame-ancestors 'self'");
  for(const path of ['/','/index.html','/api/beta','/other.html','/prototype/landing/index.html','/nested/demo.html']){
    assert.equal(headers(path)['x-frame-options'],'DENY',path);
    assert.equal(headers(path)['content-security-policy'],"frame-ancestors 'none'",path);
  }
});

function fixture({fetcher=async()=>({ok:true,json:async()=>({ok:true})}),language='vi'}={}){
  const nodes=new Map(),lists=new Map(),messages=[],requests=[];
  function node(dataset={}){return {dataset,attrs:{},listeners:{},hidden:false,disabled:false,checked:false,open:false,value:'',textContent:'',style:{setProperty(){}},classList:{toggle(){},add(){},remove(){}},setAttribute(k,v){this.attrs[k]=v;},addEventListener(k,fn){this.listeners[k]=fn;},focus(){this.focused=true;},scrollIntoView(){},showModal(){this.open=true;},close(){this.open=false;},reportValidity(){return !!this.value;}};}
  for(const [,id] of html.matchAll(/id="([^"]+)"/g))nodes.set('#'+id,node());
  const staticNodes=[];
  for(const tag of html.matchAll(/<[^/!][^>]*>/g)){
    const data=Object.fromEntries([...tag[0].matchAll(/data-([a-z-]+)="([^"]*)"/g)].map(([,key,value])=>[key.replace(/-([a-z])/g,(_,c)=>c.toUpperCase()),value]));
    const id=tag[0].match(/\bid="([^"]+)"/)?.[1];
    const n=id?nodes.get('#'+id):node(data);Object.assign(n.dataset,data);
    if(Object.keys(data).length)staticNodes.push(n);
  }
  for(const [selector,key] of Object.entries({'[data-i18n]':'i18n','[data-language]':'language','[data-demo-case]':'demoCase','[data-beta-step]':'betaStep','[data-beta-role]':'betaRole','[data-beta-need]':'betaNeed','[data-beta-tool]':'betaTool'}))lists.set(selector,staticNodes.filter(n=>Object.hasOwn(n.dataset,key)));
  for(const selector of ['[data-open-beta]','[data-close-beta]','.source-chips button.active'])lists.set(selector,[]);
  nodes.set('.beta-body',node());nodes.set('#beta-success button',node());
  for(let i=1;i<=3;i++)nodes.set(`[data-beta-step="${i}"] legend`,node());
  const form=nodes.get('#demand-form');form.elements={website:{value:''}};
  nodes.get('#beta-email').value='qa@example.invalid';
  nodes.get('#wizzdom-demo-frame').contentWindow={postMessage(message,origin){messages.push({message,origin});}};
  const root={lang:language,dataset:{}};
  const document={documentElement:root,body:node(),referrer:'https://example.com/private?email=private@example.invalid',querySelector:s=>nodes.get(s),querySelectorAll:s=>lists.get(s)||[],title:''};
  const handlers={};
  const window={innerWidth:390,innerHeight:844,location:{search:''},addEventListener(name,fn){handlers[name]=fn;},dispatchEvent(){},visualViewport:{height:844,offsetTop:0,addEventListener(){}}};
  const context={document,window,location:{origin:'https://landing.example',search:''},navigator:{language},localStorage:{getItem(){return null;},setItem(){}},crypto,URL,URLSearchParams,Date,AbortController,CustomEvent:class {},matchMedia:()=>({matches:false}),setTimeout:()=>1,clearTimeout(){},fetch:async(url,init)=>{requests.push({url,init,payload:JSON.parse(init.body)});return fetcher(url,init);}};
  runInNewContext(runtime,context);
  return {nodes,lists,requests,messages,handlers,get:id=>nodes.get('#'+id),choose(id){lists.get('[data-demo-case]').find(n=>n.dataset.demoCase===id).listeners.click();},submit:()=>form.listeners.submit({preventDefault(){},currentTarget:form}),setStep3(){lists.get('[data-beta-need]')[0].listeners.click();}};
}

test('production form sends a server-valid signup and confirms only after the response',async()=>{
  let resolveResponse;
  const f=fixture({fetcher:()=>new Promise(resolve=>{resolveResponse=resolve;})});
  f.choose('creator');f.setStep3();
  const submit=f.submit();
  assert.equal(f.get('beta-submit').disabled,true);assert.equal(f.get('beta-success').hidden,true);
  await f.submit();assert.equal(f.requests.length,1);
  const {url,payload}=f.requests[0];assert.equal(url,'/api/beta');assert.equal(payload.demo.persona,'creator');
  assert.equal(payload.email,'qa@example.invalid');assert.equal(payload.research_consent,false);
  assert.equal(payload.session,null);assert.deepEqual(payload.events,[]);
  assert.ok(validateCollection(payload));
  resolveResponse({ok:true,json:async()=>({ok:true})});await submit;
  assert.equal(f.get('beta-success').hidden,false);assert.equal(f.get('beta-email').value,'');
  assert.equal(f.get('beta-submit').disabled,false);
});

test('optional research consent sends bounded, accepted events, not chat contents or email telemetry',async()=>{
  const f=fixture();f.choose('business');f.setStep3();f.get('beta-research-consent').checked=true;await f.submit();
  const payload=f.requests[0].payload,out=validateCollection(payload);assert.ok(out);
  assert.equal(out.demo.persona,'business');assert.equal(out.session.referrer_host,'example.com');
  assert.ok(out.events.some(event=>event.type==='persona_selected'&&event.persona==='business'));
  assert.doesNotMatch(JSON.stringify(out.events),/qa@example|private@example|chat contents/);
  assert.equal(out.session.device_type,'mobile');
});

test('production network/backend failures preserve email and show an error, not a saved signup',async()=>{
  for(const fetcher of [async()=>{throw new Error('network');},async()=>({ok:false,json:async()=>({error:'unavailable'})}),async()=>({ok:true,json:async()=>({ok:false})})]){
    const f=fixture({fetcher});f.setStep3();await f.submit();
    assert.equal(f.get('beta-success').hidden,true);assert.equal(f.get('beta-error').hidden,false);
    assert.equal(f.get('beta-email').value,'qa@example.invalid');assert.equal(f.get('beta-submit').disabled,false);
  }
});

test('production choices and language still synchronize the demo through the same-origin bridge',()=>{
  const f=fixture();f.choose('research');
  assert.ok(f.messages.some(({message,origin})=>message.type==='wizzdom-demo-case'&&message.caseId==='research'&&origin==='https://landing.example'));
  const en=f.lists.get('[data-language]').find(n=>n.dataset.language==='en');en.listeners.click();
  assert.ok(f.messages.some(({message})=>message.type==='wizzdom-demo-language'&&message.language==='en'));
  assert.equal(f.lists.get('[data-demo-case]').filter(n=>n.attrs['aria-pressed']==='true').length,1);
});
