import {composeLanding,composeRuntime} from './build-landing-preview.mjs';

// Keep one layout source for the approved preview and the live homepage.
export function composeProductionLanding(base){
  return composeLanding(base)
    .replace('data-local-preview="true"','data-landing-version="companion"')
    .replace('    <meta name="robots" content="noindex,nofollow" />\n','')
    .replace('<title>wizzdom — Give AI the full picture</title>','<title>wizzdom — Your companion across AI chats</title>')
    .replace('AI forgets, then acts on an incomplete picture. Wizzdom brings the missing decisions, lessons and signals back before the next move.','Wizzdom connects earlier decisions, lessons and details to what you are doing with AI, and reminds you when they matter.')
    .replace('href="./base.css"','href="/styles.css"')
    .replace('href="./integration.css"','href="/landing.css"')
    .replace('src="./focus-modality.js"','src="/focus-modality.js"')
    .replace('src="./landing-runtime.js"','src="/script.js"')
    .replace('src="./demo.html?','src="/demo.html?')
    .replace('The rest of this preview is available below.','Explore how Wizzdom works below.');
}

export function composeProductionRuntime(original){
  const helpers=original.slice(original.indexOf('function track('),original.indexOf('function setStage('));
  const submitStart=original.indexOf('$("#demand-form").addEventListener("submit", async event =>');
  const submitEnd=original.indexOf('\nlet heroTimer;',submitStart);
  if(submitStart<0||submitEnd<0||!helpers.includes('function researchSession()'))throw new Error('Live signup contract changed; review migration.');
  const submit=original.slice(submitStart,submitEnd)
    .replace('context_sources: $$(".source-chips button.active").map(node=>node.dataset.source),','context_sources: [],')
    .replace('demo: selectedChoice ? {persona: currentPersona, choice: selectedChoiceIndex, rating: $("[data-value].active")?.dataset.value} : {}','demo: {persona: selectedDemoCase}');
  let runtime=composeRuntime(original);
  const previewStart=runtime.indexOf("    $('#demand-form').addEventListener('submit',event=>{");
  const previewEnd=runtime.indexOf('    const motion=',previewStart);
  if(previewStart<0||previewEnd<0)throw new Error('Preview signup boundary changed.');
  runtime=runtime.slice(0,previewStart)+submit+'\n'+runtime.slice(previewEnd);
  runtime=runtime.replace('const track=()=>{}; // Preview doesn\'t collect analytics.',
    `const journey={id:crypto.randomUUID(),started_at:new Date().toISOString(),events:[]};
    const betaSubmissionId=crypto.randomUUID();
    ${helpers}`);
  runtime=runtime.replace("selectedDemoCase=button.dataset.demoCase;","selectedDemoCase=button.dataset.demoCase;currentPersona=selectedDemoCase;track('persona_selected');");
  runtime=runtime.replace("let selectedDemoCase='engineer';","let selectedDemoCase='engineer';currentPersona=selectedDemoCase;");
  runtime=runtime.replace("document.title=currentLanguage==='vi'?'wizzdom — Bản thử landing ghép':'wizzdom — Integrated landing preview';",
    "document.title=currentLanguage==='vi'?'wizzdom — Người đồng hành xuyên các chat AI':'wizzdom — Your companion across AI chats';try{localStorage.setItem('wizzdom-language',currentLanguage);}catch{};");
  runtime=runtime.replace("const initial=new URLSearchParams(location.search).get('lang');setLanguage(initial==='en'?'en':'vi');",
    "let initial=new URLSearchParams(location.search).get('lang');if(!['vi','en'].includes(initial)){try{initial=localStorage.getItem('wizzdom-language');}catch{}}if(!['vi','en'].includes(initial))initial=navigator.language?.toLowerCase().startsWith('vi')?'vi':'en';setLanguage(initial);");
  // In-memory, bounded events only. Sent with the form only after research opt-in.
  return runtime;
}

export function composeProductionDemo(html){
  return html.replaceAll('/prototype/landing/base.css','/styles.css')
    .replaceAll('/prototype/cases-demo.css','/demo.css')
    .replaceAll('/prototype/landing/focus-modality.js','/focus-modality.js')
    .replaceAll('/prototype/cases-demo.js','/demo.js');
}
