// Start after paint; pointer/focus intent warms only the small public page, not AI or videos.
(()=>{
 if(!('serviceWorker'in navigator)||!/^https?:$/.test(location.protocol))return;
 const start=()=>navigator.serviceWorker.register('./navigation-sw.js',{updateViaCache:'none'}).then(()=>navigator.serviceWorker.ready).then(reg=>{
  const worker=()=>navigator.serviceWorker.controller||reg.active;
  const warm=url=>worker()?.postMessage({type:'warm-course-page',url});
  warm(location.href);
  const warmed=new Set();
  const intent=e=>{const a=e.target.closest?.('a[href]');if(!a)return;const u=new URL(a.href,location.href);if(u.origin!==location.origin||!/(?:index|explore|practice)\.html$/.test(u.pathname)||warmed.has(u.pathname))return;warmed.add(u.pathname);warm(u.href);};
  document.addEventListener('pointerover',intent,{passive:true});document.addEventListener('focusin',intent);document.addEventListener('touchstart',intent,{passive:true});
 }).catch(()=>{});
 const schedule=()=>typeof requestIdleCallback==='function'?requestIdleCallback(start,{timeout:1500}):setTimeout(start,100);
 if(document.readyState==='complete')schedule();else addEventListener('load',schedule,{once:true});
})();
