/* Cache public HTML only. Never intercept API, model responses, inputs or downloads. */
'use strict';
const VERSION='vicky-navigation-v1.22',ROOT=new URL('./',self.location.href),CACHE=VERSION+'-'+ROOT.pathname;
const PAGES=new Set(['index.html','explore.html','practice.html']);
function key(url){const u=new URL(url);if(u.origin!==ROOT.origin||!u.pathname.startsWith(ROOT.pathname))return null;const path=u.pathname.slice(ROOT.pathname.length)||'index.html';return PAGES.has(path)?new URL(path,ROOT).href:null;}
self.addEventListener('install',event=>event.waitUntil(self.skipWaiting()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const name of await caches.keys())if(name.startsWith('vicky-navigation-')&&name.endsWith('-'+ROOT.pathname)&&name!==CACHE)await caches.delete(name);await self.clients.claim();})()));
async function update(url,cacheKey){const response=await fetch(new Request(url,{cache:'no-cache',credentials:'omit'}));if(response.ok&&response.headers.get('content-type')?.includes('text/html')){const cache=await caches.open(CACHE);await cache.put(cacheKey,response.clone());}return response;}
self.addEventListener('fetch',event=>{
 const cacheKey=key(event.request.url);if(event.request.method!=='GET'||event.request.mode!=='navigate'||!cacheKey)return;
 event.respondWith((async()=>{const cache=await caches.open(CACHE),saved=await cache.match(cacheKey);if(saved){event.waitUntil(update(event.request.url,cacheKey).catch(()=>{}));return saved;}return update(event.request.url,cacheKey);})());
});
self.addEventListener('message',event=>{
 if(event.data?.type!=='warm-course-page'||!event.source?.url||new URL(event.source.url).origin!==ROOT.origin)return;
 const cacheKey=key(event.data.url);if(!cacheKey)return;
 event.waitUntil((async()=>{const cache=await caches.open(CACHE);if(!await cache.match(cacheKey))await update(cacheKey,cacheKey);})().catch(()=>{}));
});
