'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),cp=require('node:child_process');
const root=process.cwd(),w=path.join(root,'downloads/practice-workspace');
const box={window:{}};vm.runInNewContext(fs.readFileSync('practice/content.js','utf8'),box);
for(const [kind,course] of Object.entries(box.window.PRACTICE_CONTENT))for(const [i,L] of course.lessons.entries()){
 const text='# '+L.title+'\n\n'+L.body.join('\n\n')+'\n\n## 跟做\n'+L.steps.map((s,j)=>(j+1)+'. '+s).join('\n')+'\n\n## 发给 Codex\n```text\n'+L.prompt+'\n```\n\n## 应该看到\n'+L.expected+'\n\n## 排错\n'+L.trouble+'\n';
 fs.writeFileSync(path.join(w,'lessons',`${kind}-${String(i+1).padStart(2,'0')}.md`),text);
}
for(const skill of ['aigc-interview-coach','ielts-writing-coach'])fs.copyFileSync(path.join(w,'resources/report-format.md'),path.join(w,'.agents/skills',skill,'references/report-format.md'));
const base='https://lyx1265897416-lab.github.io/vicky-agent-lab/';
const template=fs.readFileSync('tools/practice-page.html','utf8');
let online=template.replace(/<link rel="stylesheet"[^>]+>/,'<style>'+fs.readFileSync('practice/app.css','utf8')+'</style>');
for(const f of ['content','report-format','app'])online=online.replace(new RegExp('<script defer src="practice/'+f+'.js[^\\"]*"><\\/script>'),'');
const startup=['content','report-format','app'].map(f=>fs.readFileSync('practice/'+f+'.js','utf8').replace(/<\/script/gi,'<\\/script')).join('\n');
online=online.replace('</body>','<script>'+startup+'</script></body>');fs.writeFileSync('practice.html',online);
let html=template;
html=html.replace(/<link rel="stylesheet"[^>]+>/,'<style>'+fs.readFileSync('practice/app.css','utf8')+'</style>');
for(const f of ['content','report-format','app'])html=html.replace(new RegExp('<script defer src="practice/'+f+'.js[^\"]*"><\/script>'),'<script defer src="practice/'+f+'.js"></script>');
html=html.replace(/<script>if\(new URLSearchParams[\s\S]*?<\/script>/,'');
html=html.replace(/href="(index.html|explore.html|setup.html|learn.html\?lesson=1)"/g,(_,p)=>'href="'+base+p+'"').replaceAll('href="downloads/practice-workspace/','href="').replaceAll('href="downloads/practical-','href="'+base+'downloads/practical-');
fs.writeFileSync(path.join(w,'report-viewer.html'),html);
fs.mkdirSync(path.join(w,'practice/media'),{recursive:true});
for(const f of ['content.js','report-format.js','app.js'])fs.writeFileSync(path.join(w,'practice',f),fs.readFileSync('practice/'+f,'utf8').replaceAll('downloads/practice-workspace/','').replaceAll('href="downloads/practical-','href="'+base+'downloads/practical-'));
for(const f of fs.readdirSync('practice/media'))if(/\.(webp|mp4)$/.test(f))fs.copyFileSync('practice/media/'+f,path.join(w,'practice/media',f));
cp.execFileSync('python3',['-c',`from pathlib import Path
from zipfile import ZipFile,ZIP_DEFLATED
w=Path('downloads/practice-workspace')
with ZipFile('downloads/practical-cases-v1.zip','w',ZIP_DEFLATED) as z:
 z.writestr('practice-workspace/outputs/','')
 for p in sorted(w.rglob('*')):
  if p.is_file():z.write(p,'practice-workspace/'+str(p.relative_to(w)))
with ZipFile('downloads/practical-skills-v1.zip','w',ZIP_DEFLATED) as z:
 for p in sorted((w/'.agents/skills').rglob('*')):
  if p.is_file():z.write(p,str(p.relative_to(w)))
`]);
console.log('Built offline viewer, lessons and two ZIPs.');
