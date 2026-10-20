// Local composition only. Never writes the production entry points or build config.
import {readFile,writeFile,copyFile,mkdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';

export const scenarioOptions=[
  {id:'engineer',key:'scenarioEngineer',en:'Developer',vi:'Developer'},
  {id:'product',key:'scenarioProduct',en:'Product',vi:'Sản phẩm'},
  {id:'business',key:'scenarioBusiness',en:'Business owner',vi:'Kinh doanh'},
  {id:'research',key:'scenarioResearch',en:'Researcher',vi:'Nghiên cứu'},
  {id:'creator',key:'scenarioCreator',en:'Creator',vi:'Creator'},
  {id:'personal',key:'scenarioPersonal',en:'Personal',vi:'Cá nhân'}
];
export const scenarioValueGroups=[
  {key:'valueDirection',vi:'Chọn đúng việc',en:'Choose the right work',cases:['product','creator']},
  {key:'valueRepeat',vi:'Không lặp sai lầm',en:'Avoid repeating mistakes',cases:['engineer','personal']},
  {key:'valueConstraint',vi:'Nhớ điều quan trọng',en:'Remember what matters',cases:['research','business']}
];
const hero=`      <section class="hero minimal-hero integration-hero" aria-labelledby="integration-hero-title">
        <div class="hero-copy">
          <div class="integration-promise">
            <h1 id="integration-hero-title" data-i18n="integrationHeadline">Wizzdom catches what you and your AI are missing.</h1>
            <p class="hero-blurb" data-i18n="integrationBody">Wizzdom connects earlier decisions, lessons and details to what you’re doing with AI — and reminds you when they matter.</p>
            <div class="integration-scenarios" role="group" aria-labelledby="scenario-picker-title">
              <p id="scenario-picker-title" data-i18n="integrationChoose">What would help you most?</p>
              <div class="scenario-value-groups">${scenarioValueGroups.map(group=>`<div class="scenario-value-group"><h2 id="${group.key}" data-i18n="${group.key}">${group.en}</h2><div class="scenario-buttons" role="group" aria-labelledby="${group.key}">${group.cases.map(id=>{const option=scenarioOptions.find(option=>option.id===id);return `<button type="button" data-demo-case="${id}" aria-pressed="${id==='engineer'}" aria-controls="wizzdom-demo-frame" data-i18n="${option.key}">${option.en}</button>`;}).join('')}</div></div>`).join('')}</div>
            </div>
            <div class="hero-actions"><a class="button primary" id="integration-play" href="#lab" data-i18n="integrationCta">Watch this scenario unfold</a></div>
          </div>
          <div class="integration-demo" id="lab" aria-label="Interactive Wizzdom demo">
            <span id="example" class="integration-anchor" aria-hidden="true"></span>
            <iframe id="wizzdom-demo-frame" src="./demo.html?embed=1&amp;presentation=hero&amp;case=engineer&amp;step=3&amp;paused=1&amp;lang=vi" title="Wizzdom interactive product demo" loading="eager" referrerpolicy="same-origin" height="660"></iframe>
            <noscript><p>This interactive demo needs JavaScript. The rest of this preview is available below.</p></noscript>
          </div>
        </div>
      </section>
`;
const problem=`      <section class="integration-problem-band" aria-labelledby="integration-problem-title">
        <h2 id="integration-problem-title"><span data-i18n="integrationLineOne">AI forgets.</span> <span data-i18n="integrationLineTwo">It acts blind.</span> <span class="price-line" data-i18n="integrationLineThree">You pay the price.</span></h2>
      </section>
`;
export function composeLanding(landing){
  const heroStart=landing.indexOf('      <section class="hero minimal-hero">');
  const costStart=landing.indexOf('      <section class="cost-section"');
  const labStart=landing.indexOf('      <section class="lab-section"');
  const howStart=landing.indexOf('      <section class="pipeline-section"');
  if([heroStart,costStart,labStart,howStart].some(i=>i<0))throw new Error('Landing section contract changed; review composition manually.');
  let result=landing.slice(0,heroStart)+hero+problem+landing.slice(costStart,labStart)+landing.slice(howStart);
  result=result.replace('<html lang="en">','<html lang="en" data-local-preview="true">');
  result=result.replace('<link rel="stylesheet" href="/styles.css?v=14" />','<meta name="robots" content="noindex,nofollow" />\n    <link rel="stylesheet" href="./base.css" />\n    <link rel="stylesheet" href="./integration.css" />');
  result=result.replace('/focus-modality.js?v=14','./focus-modality.js').replace('/script.js?v=13','./landing-runtime.js');
  return result;
}
export function composeRuntime(original){
  const languagePrefix=original.slice(0,original.indexOf('const scenarios ='));
  const additions=[...original.matchAll(/Object\.assign\((?:vietnamese|english), \{[\s\S]*?\}\);/g)].map(match=>match[0]).join('\n');
  const beta=original.slice(original.indexOf('function renderBetaStep('),original.indexOf('$("#demand-form").addEventListener("submit"'));
  if(!beta.includes('function openBeta(')||!languagePrefix.includes('const vietnamese'))throw new Error('Landing runtime contract changed.');
  return `(function(){'use strict';\n${languagePrefix}\n${additions}
    const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
    let currentLanguage='vi',currentPersona='product',betaStep=1,betaRole='unknown',betaNeed='explore',betaBusy=false,betaComplete=false;
    const betaTools=new Set();
    const track=()=>{}; // Preview doesn't collect analytics.
    Object.assign(vietnamese,{
      integrationHeadline:'Wizzdom nhắc điều bạn và AI đang bỏ sót.',
      integrationLineOne:'AI quên.',integrationLineTwo:'Nó vẫn tiếp tục.',integrationLineThree:'Bạn trả giá.',
      integrationBody:'Wizzdom nối quyết định, bài học và chi tiết từ các chat trước với việc bạn đang làm cùng AI — rồi nhắc khi chúng quan trọng.',
      integrationChoose:'Bạn muốn Wizzdom giúp điều gì?',
      ${scenarioOptions.map(option=>`${option.key}:${JSON.stringify(option.vi)}`).join(',')},
      ${scenarioValueGroups.map(group=>`${group.key}:${JSON.stringify(group.vi)}`).join(',')},
      integrationCta:'Xem diễn biến tình huống'
    });
    const frame=$('#wizzdom-demo-frame');
    let selectedDemoCase='engineer';
    const demoChoices=$$('[data-demo-case]');
    function sendCase(){frame.contentWindow?.postMessage({type:'wizzdom-demo-case',caseId:selectedDemoCase},location.origin);}
    demoChoices.forEach(button=>button.addEventListener('click',()=>{
      selectedDemoCase=button.dataset.demoCase;
      demoChoices.forEach(choice=>choice.setAttribute('aria-pressed',String(choice===button)));
      sendCase();
      if(matchMedia('(max-width: 900px)').matches)$('#lab').scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
    }));
    $('#integration-play').addEventListener('click',()=>frame.contentWindow?.postMessage({type:'wizzdom-demo-replay'},location.origin));
    function sendLanguage(){frame.contentWindow?.postMessage({type:'wizzdom-demo-language',language:currentLanguage},location.origin);}
    function setLanguage(language){
      currentLanguage=language==='en'?'en':'vi';document.documentElement.lang=currentLanguage;
      $$('[data-i18n]').forEach(node=>{const key=node.dataset.i18n;node.textContent=currentLanguage==='vi'?(vietnamese[key]||english[key]):english[key];});
      $$('[data-language]').forEach(button=>{const active=button.dataset.language===currentLanguage;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});
      document.title=currentLanguage==='vi'?'wizzdom — Bản thử landing ghép':'wizzdom — Integrated landing preview';
      renderBetaStep(false);sendLanguage();
    }
    $$('[data-language]').forEach(button=>button.addEventListener('click',()=>setLanguage(button.dataset.language)));
    frame.addEventListener('load',sendLanguage);
    window.addEventListener('message',event=>{
      if(event.origin!==location.origin||event.source!==frame.contentWindow)return;
      if(event.data?.type==='wizzdom-demo-size'&&Number.isFinite(event.data.height))frame.style.height=Math.max(240,Math.min(2400,event.data.height))+'px';
      if(event.data?.type==='wizzdom-demo-ready'){sendLanguage();sendCase();}
    });
    ${beta}
    $('#demand-form').addEventListener('submit',event=>{
      event.preventDefault();
      if(betaStep<3){betaStep++;renderBetaStep();return;}
      if(!$('#beta-email').reportValidity())return;
      $('#beta-error').textContent=currentLanguage==='vi'?'Bản xem thử local: chưa gửi đăng ký và không lưu email.':'Local preview: no registration was sent and no email was saved.';
      $('#beta-error').hidden=false;
    });
    const motion=matchMedia('(prefers-reduced-motion: reduce)');
    if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){if(!motion.matches)$('#pipeline').classList.add('is-awake');observer.disconnect();}},{threshold:.25});observer.observe($('#pipeline'));}
    const initial=new URLSearchParams(location.search).get('lang');setLanguage(initial==='en'?'en':'vi');
  })();`;
}
export async function buildPreview(){
  const root=new URL('../',import.meta.url),out=new URL('public/prototype/landing/',root);
  const landing=await readFile(new URL('index.html',root),'utf8');
  const runtime=await readFile(new URL('script.js',root),'utf8');
  const story=await readFile(new URL('public/prototype/cases-demo.html',root),'utf8');
  await mkdir(out,{recursive:true});
  await writeFile(new URL('index.html',out),composeLanding(landing));
  await writeFile(new URL('landing-runtime.js',out),composeRuntime(runtime));
  await writeFile(new URL('demo.html',out),story);
  await copyFile(new URL('styles.css',root),new URL('base.css',out));
  await copyFile(new URL('focus-modality.js',root),new URL('focus-modality.js',out));
  return out;
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  await buildPreview();console.log('Integrated local preview: http://127.0.0.1:4177/prototype/landing/index.html');
}
