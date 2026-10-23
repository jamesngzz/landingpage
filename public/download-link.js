document.querySelectorAll('[data-i18n="navDownload"]').forEach(link=>{
 link.addEventListener('click',()=>{link.href='/download/'+(document.documentElement.lang==='en'?'en':'vi')+'/';});
});
