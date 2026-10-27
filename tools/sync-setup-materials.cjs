// Keep installation/registration web teaching and download editions aligned.
'use strict';
const fs=require('node:fs'),vm=require('node:vm');
const base='https://lyx1265897416-lab.github.io/vicky-agent-lab/';
const source=fs.readFileSync('setup.html','utf8');
const section=source.slice(source.indexOf('<section class="registration"'),source.indexOf('<nav class="setup-switch"'));
const text=section.replace(/<a\b[^>]*href="(https:[^"]+)"[^>]*>([\s\S]*?)<\/a>/g,'$2 ($1)').replace(/<\/(?:p|h[1-6]|li|summary|div|section)>/g,'\n').replace(/<[^>]+>/g,'').replace(/\n[ \t]+/g,'\n').replace(/\n{3,}/g,'\n\n').trim()+'\n\n在线教程：'+base+'setup.html#registration\n';
fs.writeFileSync('downloads/registration-guide.txt',text);
let html=source.replace(/<script>if\(new URLSearchParams[\s\S]*?<\/script>/,'').replace(/<link rel="stylesheet" href="([^"?]+)[^"]*">/g,(_,p)=>'<style>'+fs.readFileSync(p,'utf8')+'</style>').replace(/<script defer src="setup.js[^"]*"><\/script>/,'<script defer src="'+base+'setup.js?v=1.15"></script>');
// Inline JS at the end so it executes after the body exists on file:// too.
html=html.replace(/<script defer src="[^"]*setup.js[^\"]*"><\/script>/,'').replace('</body>','<script>'+fs.readFileSync('setup.js','utf8')+'</script></body>');
html=html.replace(/href="([^"#:]+)"/g,(_,p)=>'href="'+new URL(p,base).href+'"');
const readable=html.replace(/src="(media\/[^"?]+)"/g,(_,p)=>'src="'+base+p+'"');
const offline=html.replace(/src="(media\/[^"?]+)"/g,(_,p)=>'src="data:image/'+(p.endsWith('.webp')?'webp':'png')+';base64,'+fs.readFileSync(p).toString('base64')+'"');
fs.writeFileSync('downloads/setup-visual.html',offline);
const box={window:{}};vm.runInNewContext(fs.readFileSync('course-content.js','utf8'),box);
const {LESSONS,ASSETS}=box.window;
const path='workspace/resources/registration-guide.txt';
let a=ASSETS.find(a=>a.path===path);if(a)a.text=text;else ASSETS.push({path,kind:'模板与说明',text});
ASSETS.find(a=>a.path==='01-安装入门图解.html').text=readable;
const note='【注册与地区可用性 · 2026-10-26】\n中国大陆目前不在 ChatGPT 官方支持地区名单中。请先阅读 resources/registration-guide.txt（课程完整包内位于 workspace/resources/），或打开 '+base+'setup.html#registration 。\n注册成功不等于 Codex 可用。普通 ChatGPT 注册通常不要求手机验证，桌面 Codex 可能要求；本课没有进行中国大陆网络或新账号注册实测。\n\n';
for(const p of ['00-START.txt','workspace/resources/setup-mac.txt','workspace/resources/setup-windows.txt','workspace/resources/novice-field-guide.txt']){const a=ASSETS.find(a=>a.path===p);if(!a.text.startsWith('【注册与地区可用性'))a.text=note+a.text;}
const l=LESSONS.find(l=>l.id===2);if(!l.files.includes(path))l.files.unshift(path);
if(!l.prior.includes('注册'))l.prior+=' 首次使用先完成安装页的“注册与可用性”教程；中国大陆目前不在官方支持地区名单中。';
fs.writeFileSync('course-content.js','window.LESSONS='+JSON.stringify(LESSONS)+';\nwindow.ASSETS='+JSON.stringify(ASSETS)+';\n');
fs.writeFileSync('/tmp/vicky-setup-assets.json',JSON.stringify(ASSETS.filter(a=>[path,'00-START.txt','workspace/resources/setup-mac.txt','workspace/resources/setup-windows.txt','workspace/resources/novice-field-guide.txt','01-安装入门图解.html'].includes(a.path))));
console.log('Synced registration text, lesson prerequisites, asset catalog and offline install guide.');
