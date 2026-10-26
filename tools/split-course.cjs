// course-content.js remains the canonical source; generate byte-for-byte equivalent lazy payloads.
const fs=require('node:fs'),vm=require('node:vm'),crypto=require('node:crypto');
const box={window:{}};vm.runInNewContext(fs.readFileSync('course-content.js','utf8'),box);
const {LESSONS,ASSETS}=box.window;fs.mkdirSync('course-data/assets',{recursive:true});
const write=(p,v)=>fs.writeFileSync(p,JSON.stringify(v));
write('course-data/lessons.json',LESSONS.map(({id,title,files})=>({id,title,files})));
for(const l of LESSONS){const display=JSON.parse(JSON.stringify(l),(k,v)=>typeof v==='string'?v.replace('https://learn.chatgpt.com/images/codex/video-posters/proactive-teammate-v2.webp','media/previews/codex-official-video.webp').replace(/src="media\/([^"/]+)\.png"/g,'src="media/previews/$1.webp"'):v);write(`course-data/lesson-${l.id}.json`,display);}
write('course-data/assets.json',ASSETS.map(({text,...a})=>{const name=crypto.createHash('sha256').update(a.path).digest('hex').slice(0,16)+'.json';write('course-data/assets/'+name,{text});return {...a,url:'course-data/assets/'+name};}));
write('course-data/search.json',ASSETS.map(a=>({path:a.path,text:a.text.toLowerCase()})));
console.log(`Generated ${LESSONS.length} lessons and ${ASSETS.length} exact asset payloads.`);
