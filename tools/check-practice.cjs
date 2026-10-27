'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),validate=require('../practice/report-format.js');
const box={window:{}};vm.runInNewContext(fs.readFileSync('practice/content.js','utf8'),box);
for(const [kind,c] of Object.entries(box.window.PRACTICE_CONTENT)){
 assert.equal(c.lessons.length,4);assert.equal(c.cases.length,3);
 for(const s of c.cases){for(const e of s.evidence)assert(s.source.includes(e.quote),s.id+': quote not in source');if(kind==='ielts')assert(s.source.trim().split(/\s+/).length>=250);}
 const sample=JSON.parse(fs.readFileSync(`downloads/practice-workspace/samples/sample-report-${kind}.json`));validate(sample);
 const invalid=structuredClone(sample);invalid.evidence[0].quote='This sentence is not in the actual source.';assert.throws(()=>validate(invalid),/source/);
 const empty=structuredClone(sample);empty.evidence=[];assert.throws(()=>validate(empty));
 const type=structuredClone(sample);type.evidence[0].action={html:'unsafe'};assert.throws(()=>validate(type));
}
for(const p of ['practice/app.js','practice/content.js','practice/report-format.js'])new vm.Script(fs.readFileSync(p,'utf8'));
const html=fs.readFileSync('practice.html','utf8');assert(!html.includes('<iframe'));assert(html.includes('preload="none"'));assert(!html.match(/<video[^>]*\ssrc=/));
let shell=Buffer.byteLength(html);for(const m of html.matchAll(/(?:src|href)="([^"?#]+)[^"]*"/g))if(/\.(css|js)$/.test(m[1]))shell+=fs.statSync(m[1]).size;assert(shell<130000,`shell ${shell}`);
for(const k of ['interview','ielts'])assert(fs.statSync(`practice/media/${k}.mp4`).size<3000000);
console.log(JSON.stringify({cases:6,lessons:8,quoteChecks:'PASS',invalidReports:'rejected',shellBytes:shell,initialVideoSources:0,status:'PASS'},null,2));
