document.querySelectorAll('[data-i18n="navDownload"], [data-i18n="navGetDesktop"]').forEach(link=>{
 link.addEventListener('click',()=>{link.href='/download/'+(document.documentElement.lang==='en'?'en':'vi')+'/';});
});
