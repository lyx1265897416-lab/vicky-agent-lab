// Publish only the existing public course assets; never copy server/config/env files.
'use strict';
const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process');
const root=path.resolve(__dirname,'..'),out=path.join(root,'cloud/public');
const files=cp.execFileSync('git',['ls-files','-z'],{cwd:root,encoding:'utf8'}).split('\0').filter(Boolean);
const dirs=new Set(['course-data','downloads','gallery','media','practice','showcase']);
fs.rmSync(out,{recursive:true,force:true});fs.mkdirSync(out,{recursive:true});
let count=0,bytes=0;
for(const file of files){
 const parts=file.split('/');
 const allowed=parts.length===1?/\.(html|css|js)$/.test(file):dirs.has(parts[0])||file==='tools/perf-observer.js';
 if(!allowed||parts.some(p=>/^\.env|^\.dev\.vars|^node_modules$|^\.git$/.test(p)))continue;
 const src=path.join(root,file),dest=path.join(out,file);
 if(fs.lstatSync(src).isSymbolicLink())throw Error('Refusing symlink: '+file);
 fs.mkdirSync(path.dirname(dest),{recursive:true});
 if(file==='practice.html'){
  let s=fs.readFileSync(src,'utf8').replace(/<a id="alternate-entry"[^>]*>[^<]*<\/a>/,'').replace(/<link rel="preconnect"[^>]*>/,'');
  fs.writeFileSync(dest,s);
 }else fs.copyFileSync(src,dest);
 count++;bytes+=fs.statSync(dest).size;
}
fs.writeFileSync(path.join(out,'_headers'),`/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Cache-Control: public, max-age=0, must-revalidate
/course-data/assets/*
  Cache-Control: public, max-age=31536000, immutable
/gallery/posters/*
  Cache-Control: public, max-age=86400
/media/previews/*
  Cache-Control: public, max-age=86400
`);
for(const p of ['index.html','practice.html','learn.html','downloads/practical-cases-v1.zip'])if(!fs.existsSync(path.join(out,p)))throw Error('Missing '+p);
for(const p of ['server','cloud','.env','.git'])if(fs.existsSync(path.join(out,p)))throw Error('Private path copied: '+p);
console.log(JSON.stringify({publicFiles:count,bytes,privatePaths:false}));
