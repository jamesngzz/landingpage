const link=document.querySelector('[data-i18n="navDownload"]');
link?.addEventListener('click',()=>{link.href='/download/'+(document.documentElement.lang==='en'?'en':'vi')+'/';});
