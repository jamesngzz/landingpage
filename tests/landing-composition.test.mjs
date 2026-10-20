import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {composeLanding,composeRuntime,scenarioOptions,scenarioValueGroups} from '../scripts/build-landing-preview.mjs';
const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
const old=read('index.html'),originalScript=read('script.js');
const html=composeLanding(old),runtime=composeRuntime(originalScript);
const section=(source,marker)=>{const start=source.indexOf(marker);assert.ok(start>=0,marker);return source.slice(start,source.indexOf('</section>',start)+10);};

test('integrated preview keeps how-it-works, privacy, cost and final invitation byte-for-byte',()=>{
  for(const marker of ['<section class="pipeline-section"','<section class="privacy-section"','<section class="cost-section"','<section class="apply-section"'])assert.equal(section(html,marker),section(old,marker));
  const dialog=source=>source.slice(source.indexOf('<dialog id="beta-dialog"'),source.indexOf('</dialog>')+9);
  assert.equal(dialog(html),dialog(old));
  const footer=source=>source.match(/<footer>[\s\S]*?<\/footer>/)[0];
  assert.equal(footer(html),footer(old));
  const nav=source=>source.slice(source.indexOf('<header class="site-nav"'),source.indexOf('</header>')+9);
  assert.equal(nav(html),nav(old));
});
test('only the two old demonstrations and hero are replaced, not a second new landing',()=>{
  assert.equal((html.match(/<iframe /g)||[]).length,1);
  assert.ok(html.includes('id="wizzdom-demo-frame"'));
  for(const retired of ['id="hero-demo"','id="mobile-persona"','class="persona-grid"','class="memory-section"','class="demand-section"'])assert.ok(!html.includes(retired),retired);
  assert.ok(!html.includes('mascot.png'));
  assert.ok(html.indexOf('id="lab"')<html.indexOf('class="cost-section"'));
  assert.ok(html.indexOf('class="cost-section"')<html.indexOf('id="how"'));
});
test('preserved sections load an exact copy of the original stylesheet',()=>{
  assert.equal(read('public/prototype/landing/base.css'),read('styles.css'));
  const css=read('public/prototype/landing/integration.css');
  assert.doesNotMatch(css,/(^|\})\s*(?:\.pipeline|\.privacy|\.apply|footer|body|:root)\s*\{/);
});
test('translation reuses every existing dictionary amendment, without old demo event bindings',()=>{
  for(const [addition] of originalScript.matchAll(/Object\.assign\((?:vietnamese|english), \{[\s\S]*?\}\);/g))assert.ok(runtime.includes(addition));
  assert.doesNotMatch(runtime,/#mobile-persona|#replay-hero|#evidence-toggle/);
  assert.ok(runtime.includes("integrationLineOne:'AI quên.'"));
  assert.ok(runtime.includes("integrationHeadline:'Wizzdom nhắc điều bạn và AI đang bỏ sót.'"));
});
test('hero leads with one product promise and an embedded Developer example, not two competing headlines',()=>{
  const hero=section(html,'<section class="hero minimal-hero integration-hero"');
  for(const key of ['integrationHeadline','integrationBody','integrationCta','integrationChoose'])assert.ok(hero.includes(`data-i18n="${key}"`));
  assert.equal((hero.match(/<h1 /g)||[]).length,1);
  assert.equal((hero.match(/<h2 /g)||[]).length,3);
  assert.ok(hero.includes('id="wizzdom-demo-frame"'));
  assert.ok(hero.includes('case=engineer&amp;step=3&amp;paused=1'));
  assert.ok(!hero.includes('integration-problem'));
});
test('three visible value groups contain two role-based scenarios each',()=>{
  assert.ok(html.indexOf('id="wizzdom-demo-frame"')<html.indexOf('class="integration-problem-band"'));
  assert.ok(html.indexOf('class="integration-problem-band"')<html.indexOf('class="cost-section"'));
  const hero=section(html,'<section class="hero minimal-hero integration-hero"');
  assert.equal((hero.match(/data-demo-case=/g)||[]).length,6);
  assert.equal(scenarioOptions.length,6);
  assert.equal(scenarioValueGroups.length,3);
  assert.equal((hero.match(/class="scenario-value-group"/g)||[]).length,3);
  for(const group of scenarioValueGroups){assert.equal(group.cases.length,2);assert.ok(hero.includes(`aria-labelledby="${group.key}"`));assert.ok(runtime.includes(JSON.stringify(group.vi)));}
  assert.deepEqual(scenarioValueGroups.flatMap(group=>group.cases).sort(),scenarioOptions.map(option=>option.id).sort());
  assert.doesNotMatch(hero,/<details|hero-eyebrow|hero-micro/);
  for(const option of scenarioOptions){assert.ok(hero.includes(`data-demo-case="${option.id}"`));assert.ok(runtime.includes(JSON.stringify(option.vi)));}
  assert.ok(runtime.includes("type:'wizzdom-demo-case'"));
  assert.ok(runtime.includes("choice.setAttribute('aria-pressed',String(choice===button))"));
});
test('hero retains existing editorial typography without the retired equal-weight text columns',()=>{
  const css=read('public/prototype/landing/integration.css');
  assert.match(css,/font:550 clamp\(40px,4\.1vw,58px\)\/1\.08 var\(--serif\)/);
  assert.doesNotMatch(css,/integration-solution|integrationValueTwo/);
  assert.ok(runtime.includes("type:'wizzdom-demo-replay'"));
});
test('local form preview never sends or saves a registration',()=>{
  assert.doesNotMatch(runtime,/\bfetch\s*\(|sendBeacon|XMLHttpRequest|localStorage|sessionStorage|SUPABASE|service_role/);
  assert.ok(runtime.includes('event.preventDefault()'));
  assert.ok(runtime.includes('chưa gửi đăng ký và không lưu email'));
});
test('same-origin demo bridge validates sender and origin in both directions',()=>{
  assert.ok(runtime.includes('event.origin!==location.origin||event.source!==frame.contentWindow'));
  const child=read('public/prototype/cases-demo.js');
  assert.ok(child.includes('event.origin!==location.origin||event.source!==window.parent'));
  assert.ok(child.includes("new ResizeObserver(reportSize).observe($('#demo'))"));
  const childHtml=read('public/prototype/landing/demo.html');
  assert.ok(childHtml.includes('data-embedded="true"'));
});
test('generated preview has no stale output or duplicate parent IDs',()=>{
  assert.equal(read('public/prototype/landing/index.html'),html);
  assert.equal(read('public/prototype/landing/landing-runtime.js'),runtime);
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(([,id])=>id);
  assert.equal(ids.length,new Set(ids).size);
});
