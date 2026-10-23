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
export function renderDownloadPage(lang,release){
 const c=content[lang];if(!c)throw Error('Unsupported language');const available=validateRelease(release);const e=escape;
 const home=`/?lang=${lang}`;const brand=`<a class="brand" href="${home}" aria-label="wizzdom ${e(c.home)}"><img src="/assets/brand/wizzdom-lens.png" width="32" height="32" alt=""/><span>wizzdom</span></a>`;
 return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>${e(c.title)}</title><meta name="description" content="${e(c.description)}"/><link rel="icon" href="/assets/brand/wizzdom-lens.png"/><link rel="stylesheet" href="/styles.css"/><link rel="stylesheet" href="/download.css"/></head><body class="download-page">
<a class="skip-link" href="#main">${lang==='vi'?'Chuyển tới nội dung':'Skip to content'}</a>
<header class="site-nav">${brand}<nav class="main-nav" aria-label="${lang==='vi'?'Điều hướng':'Navigation'}"><a href="#setup">${e(c.navSetup)}</a><a href="#privacy">${e(c.navPrivacy)}</a></nav><div class="nav-actions"><nav class="language-switch" aria-label="${e(c.language)}">${['vi','en'].map(l=>`<a href="/download/${l}/" lang="${l}" hreflang="${l}"${lang===l?' aria-current="page"':''}>${l.toUpperCase()}</a>`).join('')}</nav><a class="home-link" href="${home}">${e(c.home)} ↗</a></div></header>
<main id="main"><section class="download-hero"><div class="download-intro"><p class="eyebrow">${e(c.eyebrow)}</p><h1>${e(c.headline).replace('\n','<br/>')}</h1><p class="intro">${e(c.intro)}</p><a class="text-link" href="${home}#lab">${e(c.preview)} ↗</a></div><aside class="download-panel" aria-label="${lang==='vi'?'Tải Wizzdom':'Get Wizzdom'}"><div class="download-app"><img src="/assets/brand/wizzdom-lens.png" width="52" height="52" alt=""/><div><strong>wizzdom</strong><span>${e(available?c.releaseLabel:c.beta)}</span></div></div>${available?`<a class="button primary full" href="${e(release.url)}" data-download>${e(c.download)} <span aria-hidden="true">↓</span></a><p class="release-meta">${Math.round(release.bytes/1048576)} MB · ${e(c.signed)}</p>`:`<h2>${e(c.availability)}</h2><p>${e(c.availabilityBody)}</p><a class="button primary full" href="${home}#apply">${e(c.join)} ↗</a>`}<div class="system-requirements"><strong>${e(c.requirements)}</strong><span>${e(c.unsupported)}</span></div>${available?`<details class="checksum"><summary>${e(c.versionLabel)} & ${e(c.checksum)}</summary><span>${e(release.version)}</span><code>${e(release.sha256)}</code></details><p class="beta-note">${e(c.betaNote)}</p>`:''}</aside></section>
<section class="guide-section" id="beta"><h2>${e(c.betaTitle)}</h2><div class="essentials-grid">${c.essentials.map(([title,body],i)=>`<article${i===2?' id="privacy"':''}><h3>${e(title)}</h3><p>${e(body)}</p></article>`).join('')}</div></section>
<section id="setup" class="guide-section"><div class="section-heading"><h2>${e(c.setupTitle)}</h2><p>${e(c.setupIntro)}</p></div><ol class="setup-steps">${c.steps.map(([title,body],i)=>`<li><span class="step-number" aria-hidden="true">0${i+1}</span><h3>${e(title)}</h3><p>${e(body)}</p></li>`).join('')}</ol><p class="permission-note">${e(c.permissionNote)}</p></section>
<details class="ideas-disclosure" id="ideas"><summary>${e(c.ideasTitle)}<span aria-hidden="true">+</span></summary><p class="ideas-intro">${e(c.ideasIntro)}</p><div class="ideas-grid">${c.ideas.map(([title,body])=>`<article><h3>${e(title)}</h3><p>${e(body)}</p></article>`).join('')}</div></details><p class="feedback-note" id="feedback">${e(c.feedback)}</p></main>
<footer>${brand}<a href="${home}">${e(c.back)} ↗</a></footer><script type="module" src="/focus-modality.js"></script></body></html>`;
}
