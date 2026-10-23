import {content} from './download-content.mjs';
const escape = s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function validateRelease(release){
 if(!['waitlist','pilot'].includes(release.status))throw Error('Unknown download release state');
 if(release.status==='waitlist'){
  if(release.url)throw Error('Waitlist must not expose a download');
  return false;
 }
 let url;try{url=new URL(release.url);}catch{throw Error('Valid release URL required');}
 if(url.protocol!=='https:'||url.hostname!=='github.com'||!url.pathname.startsWith('/jamesngzz/wizzdom-desktop-releases/releases/download/')||url.search||url.hash)throw Error('Use the approved release repository');
 if(!release.approval?.pilot_distribution||!release.approval?.evidence||!/^\d+\.\d+\.\d+(?:-[\w.]+)?$/.test(release.version)||!/^[a-f0-9]{64}$/.test(release.sha256)||!Number.isSafeInteger(release.bytes)||release.bytes<=0)throw Error('Release approval and integrity metadata required');
 return true;
}
function ideaVisual(c,index,e){
 const v=c.visual;
 if(index===0)return `<div class="idea-visual hub-demo" role="img" aria-label="${e(v.hubLabel)}"><span class="hub-root">${e(v.hubRoot)}</span><svg viewBox="0 0 280 34" preserveAspectRatio="none" aria-hidden="true"><path d="M140 0V10M140 10H45V34M140 10V34M140 10H235V34"/></svg><div class="hub-leaves">${v.hubLeaves.map(label=>`<span>${e(label)}</span>`).join('')}</div><small>${e(v.hubReview)}</small></div>`;
 if(index===1)return `<div class="idea-visual recall-demo" role="img" aria-label="${e(v.recallLabel)}"><div class="recall-query"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/></svg><span>${e(v.query)}</span></div><div class="recall-result"><small>↳ ${e(v.found)}</small><p>${e(v.quote)}</p></div><small>${e(v.recallAction)}</small></div>`;
 return `<div class="idea-visual reflect-demo" role="img" aria-label="${e(v.reflectLabel)}"><div class="reflection-timeline">${v.days.map((day,i)=>`<div><span>${e(day)}</span><i aria-hidden="true"></i><strong>${e(v.journal[i])}</strong></div>`).join('')}</div><div class="reflection-question">${e(v.reflectQuestion)}</div><small>${e(v.reflectAction)}</small></div>`;
}
export function renderDownloadPage(lang,release){
 const c=content[lang];if(!c)throw Error('Unsupported language');const available=validateRelease(release);const e=escape;
 const home=`/?lang=${lang}`;const brand=`<a class="brand" href="${home}" aria-label="wizzdom ${e(c.home)}"><img src="/assets/brand/wizzdom-lens.png" width="32" height="32" alt=""/><span>wizzdom</span></a>`;
 return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>${e(c.title)}</title><meta name="description" content="${e(c.description)}"/><link rel="icon" href="/assets/brand/wizzdom-lens.png"/><link rel="stylesheet" href="/styles.css"/><link rel="stylesheet" href="/download.css"/></head><body class="download-page">
<a class="skip-link" href="#main">${lang==='vi'?'Chuyển tới nội dung':'Skip to content'}</a>
<header class="site-nav">${brand}<nav class="main-nav" aria-label="${lang==='vi'?'Điều hướng':'Navigation'}"><a href="#setup">${e(c.navSetup)}</a><a href="#privacy">${e(c.navPrivacy)}</a></nav><div class="nav-actions"><nav class="language-switch" aria-label="${e(c.language)}">${['vi','en'].map(l=>`<a href="/download/${l}/" lang="${l}" hreflang="${l}"${lang===l?' aria-current="page"':''}>${l.toUpperCase()}</a>`).join('')}</nav><a class="home-link" href="${home}">${e(c.home)} ↗</a></div></header>
<main id="main"><section class="download-hero"><div class="download-intro"><p class="eyebrow">${e(c.eyebrow)}</p><h1>${e(c.headline).replace('\n','<br/>')}</h1><p class="intro">${e(c.intro)}</p><a class="text-link" href="${home}#lab">${e(c.preview)} ↗</a></div><aside class="download-panel" aria-label="${lang==='vi'?'Tải Wizzdom':'Get Wizzdom'}"><div class="download-app"><img src="/assets/brand/wizzdom-lens.png" width="52" height="52" alt=""/><div><strong>wizzdom</strong></div></div>${available?`<a class="button primary full" href="${e(release.url)}" data-download>${e(c.download)} <span aria-hidden="true">↓</span></a>`:`<h2>${e(c.availability)}</h2><p>${e(c.availabilityBody)}</p><a class="button primary full" href="${home}#apply">${e(c.join)} ↗</a>`}<div class="system-requirements"><strong>${e(c.requirements)}</strong><span>${e(c.unsupported)}</span></div><div class="support-callout" id="feedback"><strong>${e(c.supportTitle)}</strong><p>${e(c.supportPath)}</p><small>${e(c.supportBody)}</small></div></aside></section>
<section class="guide-section" id="beta"><h2>${e(c.betaTitle)}</h2><div class="essentials-grid">${c.essentials.map(([title,body],i)=>`<article${i===2?' id="privacy"':''}><h3>${e(title)}</h3><p>${e(body)}</p></article>`).join('')}</div></section>
<section id="setup" class="guide-section"><div class="section-heading"><h2>${e(c.setupTitle)}</h2><p>${e(c.setupIntro)}</p></div><ol class="setup-steps">${c.steps.map(([title,body],i)=>`<li><span class="step-number" aria-hidden="true">0${i+1}</span><h3>${e(title)}</h3><p>${e(body)}</p></li>`).join('')}</ol><p class="permission-note">${e(c.permissionNote)}</p></section>
<section class="guide-section ideas-section" id="ideas"><div class="section-heading"><h2>${e(c.ideasTitle)}</h2><p>${e(c.ideasIntro)}</p></div><div class="ideas-grid">${c.ideas.map(([title,body],index)=>`<article class="idea-card">${ideaVisual(c,index,e)}<div class="idea-caption"><h3>${e(title)}</h3><p>${e(body)}</p></div></article>`).join('')}</div><p class="idea-invite">${e(c.feedback)} <a class="text-link" href="#feedback">${e(c.ideaFeedback)} ↑</a></p></section></main>
<footer>${brand}<a href="${home}">${e(c.back)} ↗</a></footer><script type="module" src="/focus-modality.js"></script></body></html>`;
}
