'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const read=p=>fs.readFileSync(p,'utf8'),json=p=>JSON.parse(read(p));const box={window:{}};vm.runInNewContext(read('course-content.js'),box);
const {LESSONS,ASSETS}=box.window;
for(const l of LESSONS){const expected=JSON.parse(JSON.stringify(l),(k,v)=>typeof v==='string'?v.replace('https://learn.chatgpt.com/images/codex/video-posters/proactive-teammate-v2.webp','media/previews/codex-official-video.webp').replace(/src="media\/([^"/]+)\.png"/g,'src="media/previews/$1.webp"'):v);assert.deepEqual(json(`course-data/lesson-${l.id}.json`),expected,`lesson ${l.id} differs`);}
const assets=json('course-data/assets.json');assert.equal(assets.length,ASSETS.length);for(const a of ASSETS){const entry=assets.find(x=>x.path===a.path);assert(entry);assert.equal(json(entry.url).text,a.text,`${a.path} changed`);}
const index=read('index.html');assert(!index.includes('src="course-content.js'));let initial=Buffer.byteLength(index);for(const m of index.matchAll(/(?:src|href)="([^"?#]+)[^"\s]*"/g)){if(/\.(js|css)$/.test(m[1]))initial+=fs.statSync(m[1]).size;}assert(initial<100000,`home shell exceeded 100 KB: ${initial}`);
const gallery={window:{}};vm.runInNewContext(read('gallery/cases.js'),gallery);let posterBytes=0;
for(const c of gallery.window.GALLERY_CASES){assert(c.poster&&!c.poster.startsWith('http'),`${c.id}: remote/missing poster`);const n=fs.statSync(c.poster).size;assert(n<100000,`${c.id}: preview over 100 KB`);posterBytes+=n;}
assert(posterBytes<500000);assert(!read('gallery/gallery.js').includes('preload="metadata"'));assert(read('gallery/gallery.js').includes('h?.destroy()'));assert(read('gallery/gallery.js').includes("video.removeAttribute('src')"));
console.log(JSON.stringify({lessons:LESSONS.length,unchangedAssetBodies:assets.length,homeShellBytes:initial,allPosterBytes:posterBytes,status:'PASS'},null,2));
