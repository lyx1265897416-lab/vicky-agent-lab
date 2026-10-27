import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {AppError,createCoach} from './core.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const privateDir=path.resolve(process.env.PRIVATE_DIR||path.join(root,'..','vicky-agent-lab-private'));fs.mkdirSync(privateDir,{recursive:true,mode:0o700});
const configFile=path.join(privateDir,'deepseek.env');let key=process.env.DEEPSEEK_API_KEY||'';
if(!key&&fs.existsSync(configFile)){const m=fs.readFileSync(configFile,'utf8').match(/^DEEPSEEK_API_KEY=(.+)$/m);key=m?.[1]?.trim()||'';}
const production=process.env.NODE_ENV==='production',port=Number(process.env.PORT||8095),host=production?'0.0.0.0':'127.0.0.1';
const setupNonce=crypto.randomBytes(24).toString('hex'),allowed=new Set(['https://lyx1265897416-lab.github.io',`http://127.0.0.1:${port}`,`http://localhost:${port}`]);
const cap=Number(process.env.DAILY_CALL_LIMIT||30),usageFile=path.join(privateDir,'usage.json');let usage={day:'',count:0};if(fs.existsSync(usageFile)){try{usage=JSON.parse(fs.readFileSync(usageFile,'utf8'));}catch{throw Error('Usage file invalid. Restore it before starting.');}}
const ipLimits=new Map();
function reserve(){const day=new Date().toISOString().slice(0,10);if(usage.day!==day)usage={day,count:0};if(usage.count>=cap)throw new AppError(429,'今天的体验额度已用完，请明天再试。');const next={day,count:usage.count+1};fs.writeFileSync(usageFile+'.tmp',JSON.stringify(next),{mode:0o600});fs.renameSync(usageFile+'.tmp',usageFile);usage=next;}
const coach=createCoach({getKey:()=>key,model:process.env.DEEPSEEK_MODEL||'deepseek-flash',reserve});
async function read(req){let text='';for await(const chunk of req){text+=chunk;if(Buffer.byteLength(text)>30000)throw new AppError(413,'内容太长，请缩短后重试。');}try{return JSON.parse(text)}catch{throw new AppError(400,'请求格式错误。')}}
function respond(res,status,data,origin){res.writeHead(status,{'Content-Type':'application/json;charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff',...(origin?{'Access-Control-Allow-Origin':origin,'Vary':'Origin'}:{})});res.end(JSON.stringify(data));}
const setupHTML=()=>`<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>本地 DeepSeek 配置</title><style>body{font:16px/1.8 system-ui;max-width:600px;margin:60px auto;padding:24px;background:#f6f8fc;color:#172c42}input,button{font:inherit;padding:12px;box-sizing:border-box;width:100%;margin:12px 0}button{background:#2458cf;color:white;border:0;border-radius:8px}small{color:#61738b}</style><h1>连接你的 DeepSeek</h1><p>此页面只在这台电脑上可用。密钥保存在课程公开仓库之外，不会显示给学员。</p><form><label>DeepSeek API key<input type="password" name="key" autocomplete="off" required minlength="20"></label><button>保存到本机并启用</button></form><p id="status" role="status"></p><small>保存后可在本机体验真实批改。公开站点仍需要部署后端。模型调用从你的 DeepSeek 账户扣费；本地默认每天最多 30 次请求。</small><p><a href="/practice.html?case=ielts#live">打开雅思真实体验</a> · <a href="/practice.html?case=interview#live">打开面试真实体验</a></p><script>document.querySelector('form').onsubmit=async e=>{e.preventDefault();const b=document.querySelector('button');b.disabled=true;try{const r=await fetch('/local-setup',{method:'POST',headers:{'Content-Type':'application/json','X-Setup-Token':'${setupNonce}'},body:JSON.stringify({key:document.querySelector('input').value})});const d=await r.json();document.querySelector('#status').textContent=d.message; if(r.ok)document.querySelector('input').value='';}catch{document.querySelector('#status').textContent='连接失败，请确认本地服务正在运行。';}finally{b.disabled=false;}};</script>`;
const server=http.createServer(async(req,res)=>{let origin=req.headers.origin;try{
 const url=new URL(req.url,'http://localhost');
 if(!production&&!['127.0.0.1','localhost'].includes(String(req.headers.host).split(':')[0]))throw new AppError(403,'Host not allowed');
 if(origin&&!allowed.has(origin))throw new AppError(403,'Origin not allowed');
 if(req.method==='OPTIONS'){res.writeHead(204,{'Access-Control-Allow-Origin':origin||'', 'Access-Control-Allow-Methods':'GET, POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type, X-Trial-Code','Vary':'Origin'});res.end();return;}
 if(url.pathname==='/local-setup'&&!production){if(req.method==='GET'){res.writeHead(200,{'Content-Type':'text/html;charset=utf-8','Cache-Control':'no-store','Content-Security-Policy':"frame-ancestors 'none'"});res.end(setupHTML());return;}if(req.method==='POST'){if(!origin||req.headers['x-setup-token']!==setupNonce)throw new AppError(403,'请刷新本地配置页。');const body=await read(req);if(typeof body.key!=='string'||!/^sk-[A-Za-z0-9_-]{15,200}$/.test(body.key.trim()))throw new AppError(400,'密钥格式不正确，请检查复制是否完整。');fs.writeFileSync(configFile,'DEEPSEEK_API_KEY='+body.key.trim()+'\n',{mode:0o600});fs.chmodSync(configFile,0o600);key=body.key.trim();respond(res,200,{message:'已保存。返回体验页后请刷新；提交一次练习即可验证密钥与模型。'},origin);return;}}
 if(url.pathname==='/api/health'){respond(res,200,{ready:!!key&&(!production||!!process.env.TRIAL_ACCESS_CODE||process.env.PUBLIC_TRIAL==='true'),provider:'DeepSeek',requiresCode:!!process.env.TRIAL_ACCESS_CODE},origin);return;}
 if(url.pathname.startsWith('/api/')){
  if(req.method!=='POST')throw new AppError(405,'Method not allowed');
  if(!origin)throw new AppError(403,'请从课程网页发起请求。');
  if(!String(req.headers['content-type']).startsWith('application/json'))throw new AppError(415,'需要 JSON 请求。');
  if(production&&!process.env.TRIAL_ACCESS_CODE&&process.env.PUBLIC_TRIAL!=='true')throw new AppError(503,'体验服务尚未开放。');
  if(process.env.TRIAL_ACCESS_CODE&&req.headers['x-trial-code']!==process.env.TRIAL_ACCESS_CODE)throw new AppError(401,'体验码不正确，请向课程提供者获取。');
  const ip=req.socket.remoteAddress,now=Date.now();let rate=ipLimits.get(ip)||{until:now+60000,count:0};if(now>rate.until)rate={until:now+60000,count:0};if(++rate.count>8)throw new AppError(429,'操作太频繁，请一分钟后重试。');ipLimits.set(ip,rate);
  const body=await read(req);if(body.consent!==true)throw new AppError(400,'请先确认将本次材料发送给 DeepSeek。');
  let data;if(url.pathname==='/api/review')data=await coach.review(body);else if(url.pathname==='/api/interview/start')data=await coach.start(body);else if(url.pathname==='/api/interview/answer')data=await coach.answer(body);else if(url.pathname==='/api/interview/clear'){coach.clear(body.session);data={cleared:true};}else throw new AppError(404,'Not found');respond(res,200,data,origin);return;
 }
 if(req.method!=='GET')throw new AppError(405,'Method not allowed');
 let rel=decodeURIComponent(url.pathname).replace(/^\//,'')||'index.html';
 if(!/^(?:[a-z][\w-]*\.html|practice\/[\w./-]+\.(?:js|css|webp|mp4)|downloads\/[\w./-]+|gallery\/[\w./-]+|[\w-]+\.(?:css|js)|tools\/perf-observer.js)$/.test(rel)||rel.includes('..')||rel.includes('/.'))throw new AppError(404,'Not found');
 const file=path.join(root,rel);if(!fs.existsSync(file)||!fs.statSync(file).isFile())throw new AppError(404,'Not found');
 const mime={'.html':'text/html;charset=utf-8','.js':'text/javascript;charset=utf-8','.css':'text/css;charset=utf-8','.webp':'image/webp','.mp4':'video/mp4','.zip':'application/zip'};res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'text/plain;charset=utf-8','X-Content-Type-Options':'nosniff'});fs.createReadStream(file).pipe(res);
 }catch(e){respond(res,e instanceof AppError?e.status:500,{error:e instanceof AppError?e.message:'服务发生错误，请稍后重试。'},allowed.has(origin)?origin:null);}});
server.requestTimeout=80000;server.headersTimeout=10000;server.listen(port,host,()=>console.log(`Practice service: http://${host}:${port}\n${production?'Production mode':'Local setup: http://127.0.0.1:'+port+'/local-setup'}\nDeepSeek configured: ${!!key}`));
