import {readEvents} from '../server/events.mjs';
import {AppError, createCoach} from '../server/core.mjs';
const TTL = 30 * 60 * 1000;
const json = (body, status=200) => Response.json(body, {status, headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
const fail = e => json({error:e instanceof AppError?e.message:'服务暂时不可用，请稍后重试。'},e instanceof AppError?e.status:503);
const enabled = env => !!env.DEEPSEEK_API_KEY && (env.PUBLIC_TRIAL==='true'||!!env.TRIAL_ACCESS_CODE);
function limit(env){const n=Number(env.DAILY_CALL_LIMIT);if(!Number.isSafeInteger(n)||n<1||n>1000)throw new AppError(503,'体验额度配置需要检查。');return n;}
async function read(request){
 if(!request.headers.get('content-type')?.startsWith('application/json'))throw new AppError(415,'需要 JSON 请求。');
 const reader=request.body?.getReader();if(!reader)throw new AppError(400,'请求不能为空。');
 let n=0,parts=[];try{while(true){const {done,value}=await reader.read();if(done)break;n+=value.length;if(n>30000){await reader.cancel();throw new AppError(413,'内容太长，请缩短后重试。');}parts.push(value);}}finally{reader.releaseLock();}
 const data=new Uint8Array(n);let offset=0;for(const p of parts){data.set(p,offset);offset+=p.length;}
 try{return JSON.parse(new TextDecoder().decode(data));}catch{throw new AppError(400,'请求格式错误。');}
}
async function internal(stub,path,body){const r=await stub.fetch('https://internal'+path,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});const d=await r.json();if(!r.ok)throw new AppError(r.status,d.error);return d;}
async function reserve(env,ip){return internal(env.BUDGET.getByName('global'),'/reserve',{ip});}
async function ipHash(request){const ip=request.headers.get('CF-Connecting-IP')||'unknown';const bytes=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(new Date().toISOString().slice(0,10)+':'+ip));return [...new Uint8Array(bytes)].map(x=>x.toString(16).padStart(2,'0')).join('');}
function randomId(){return [...crypto.getRandomValues(new Uint8Array(24))].map(x=>x.toString(16).padStart(2,'0')).join('');}
function streamResponse(work){
 const encoder=new TextEncoder();let closed=false;
 return new Response(new ReadableStream({async start(controller){
  const send=packet=>{if(!closed)controller.enqueue(encoder.encode('data: '+JSON.stringify(packet)+'\n\n'));};
  try{send({type:'progress',stage:'accepted'});const result=await work(p=>send({type:'progress',...p}));send({type:'result',data:result});}
  catch(e){send({type:'error',error:e instanceof AppError?e.message:'服务暂时不可用，请稍后重试。'});}
  finally{if(!closed){closed=true;controller.close();}}
 },cancel(){closed=true;}}),{headers:{'Content-Type':'text/event-stream; charset=utf-8','Cache-Control':'no-store, no-transform','X-Content-Type-Options':'nosniff'}});
}
async function forwarded(stub,path,payload,onProgress){
 const res=await stub.fetch('https://internal'+path,{method:'POST',headers:{'Content-Type':'application/json',Accept:'text/event-stream'},body:JSON.stringify(payload)});
 if(!res.headers.get('content-type')?.includes('text/event-stream')){const d=await res.json();if(!res.ok)throw new AppError(res.status,d.error);return d;}
 let result;await readEvents(res,p=>{if(p.type==='progress')onProgress(p);if(p.type==='result')result=p.data;if(p.type==='error')throw new AppError(503,p.error);});if(!result)throw new AppError(502,'连接中断，请重试。');return result;
}
export default {
 async fetch(request,env){
  const origin=request.headers.get('Origin'),allowed=origin===env.ALLOWED_ORIGIN;
  const cors=r=>{const h=new Headers(r.headers);if(allowed){h.set('Access-Control-Allow-Origin',origin);h.set('Vary','Origin');h.set('Access-Control-Allow-Methods','GET, POST, OPTIONS');h.set('Access-Control-Allow-Headers','Content-Type, X-Trial-Code');}return new Response(r.body,{status:r.status,headers:h});};
  try{
   const path=new URL(request.url).pathname;
   if(request.method==='GET'&&path==='/api/health')return cors(json({ready:enabled(env),provider:'DeepSeek',requiresCode:!!env.TRIAL_ACCESS_CODE}));
   if(!allowed)throw new AppError(403,'请从课程网页打开体验。');
   if(request.method==='OPTIONS')return cors(new Response(null,{status:204}));
   if(request.method!=='POST')throw new AppError(405,'Method not allowed');
   if(!['/api/review','/api/interview/start','/api/interview/answer','/api/interview/clear'].includes(path))throw new AppError(404,'Not found');
   if(!enabled(env))throw new AppError(503,'体验服务尚未开放。');
   limit(env);
   if(env.TRIAL_ACCESS_CODE&&request.headers.get('X-Trial-Code')!==env.TRIAL_ACCESS_CODE)throw new AppError(401,'体验码不正确。');
   const body=await read(request);if(body?.consent!==true)throw new AppError(400,'请先确认将本次材料发送给 DeepSeek，并由 Cloudflare 处理。');
   const ip=await ipHash(request);const execute=async onProgress=>{let result;
   if(path==='/api/review'){
    const coach=createCoach({getKey:()=>env.DEEPSEEK_API_KEY,model:env.DEEPSEEK_MODEL,cleanupTimer:false,onProgress,reserve:()=>reserve(env,ip)});
    result=await coach.review(body);
   }else{
    const id=path.endsWith('/start')?randomId():body.session;
    if(typeof id!=='string'||!/^\w{48}$/.test(id))throw new AppError(400,'无效的面试会话。');
    result=onProgress?await forwarded(env.INTERVIEWS.getByName(id),path,{body,ip},onProgress):await internal(env.INTERVIEWS.getByName(id),path,{body,ip});
    if(path.endsWith('/start'))result.session=id;
   }
   return result;};
   return cors(request.headers.get("Accept")?.includes("text/event-stream")?streamResponse(execute):json(await execute()));
  }catch(e){return cors(fail(e));}
 }
};
// One persistent counter across all regions; reserve before every paid request.
export class TrialBudget {
 constructor(ctx,env){this.ctx=ctx;this.env=env;}
 async fetch(request){try{
  const {ip}=await request.json(),now=Date.now(),day=new Date(now).toISOString().slice(0,10),cap=limit(this.env);
  await this.ctx.storage.transaction(async tx=>{
   const old=await tx.get('usage'),state=old?.day===day?old:{day,count:0,ips:{}};
   if(state.count>=cap)throw new AppError(429,'今天的全站体验额度已用完，请明天再试。');
   const prev=state.ips[ip],rate=prev?.until>now?prev:{until:now+60000,count:0};
   if(rate.count>=6)throw new AppError(429,'操作太频繁，请一分钟后再试。');
   state.ips=Object.fromEntries(Object.entries(state.ips).filter(([,r])=>r.until>now));
   state.count++;state.ips[ip]={until:rate.until,count:rate.count+1};await tx.put('usage',state);
  });
  return json({reserved:true});
 }catch(e){return fail(e);}}
}
// One actor per interview; requests cannot mutate the same turn concurrently.
export class InterviewSession {
 constructor(ctx,env){this.ctx=ctx;this.env=env;this.busy=false;}
 async fetch(request){
  if(this.busy)return json({error:'上一条回答仍在处理中，请等待。'},409);
  this.busy=true;
  const execute=async onProgress=>{try{
   const {body,ip}=await request.json(),path=new URL(request.url).pathname;
   if(path.endsWith('/clear')){await this.ctx.storage.deleteAll();return {cleared:true};}
   const saved=await this.ctx.storage.get('session');
   if(!path.endsWith('/start')&&(!saved||saved.expires<=Date.now()))throw new AppError(410,'面试会话已过期，请重新开始。');
   const coach=createCoach({getKey:()=>this.env.DEEPSEEK_API_KEY,model:this.env.DEEPSEEK_MODEL,cleanupTimer:false,onProgress,initialSessions:saved?.snapshot||[],reserve:()=>reserve(this.env,ip)});
   const result=path.endsWith('/start')?await coach.start(body):await coach.answer({...body,session:saved.internalId});
   const snapshot=coach.snapshot(),expires=Date.now()+TTL;
   // Persist before returning, including successful request IDs for retry deduplication.
   await this.ctx.storage.put('session',{snapshot,internalId:saved?.internalId||result.session,expires});
   await this.ctx.storage.setAlarm(expires);
   return result;
  }finally{this.busy=false;}};
  if(request.headers.get("Accept")?.includes("text/event-stream"))return streamResponse(execute);
  try{return json(await execute());}catch(e){return fail(e);}
 }
 async alarm(){const saved=await this.ctx.storage.get('session');if(saved&&saved.expires>Date.now()){await this.ctx.storage.setAlarm(saved.expires);return;}await this.ctx.storage.deleteAll();}
}
