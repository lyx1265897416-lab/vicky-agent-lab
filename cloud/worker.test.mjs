import test from 'node:test';
import assert from 'node:assert/strict';
import worker,{TrialBudget,InterviewSession} from './worker.mjs';
class Store{
 constructor(){this.map=new Map();this.queue=Promise.resolve();}
 async get(k){return structuredClone(this.map.get(k));}
 async put(k,v){this.map.set(k,structuredClone(v));}
 async deleteAll(){this.map.clear();}
 async setAlarm(n){this.alarm=n;}
 transaction(fn){const task=this.queue.then(()=>fn(this));this.queue=task.catch(()=>{});return task;}
}
const origin='https://lyx1265897416-lab.github.io';
const base={ALLOWED_ORIGIN:origin,DEEPSEEK_API_KEY:'fixture-not-real',PUBLIC_TRIAL:'true',DAILY_CALL_LIMIT:'30',DEEPSEEK_MODEL:'deepseek-flash'};
const req=(path,body,originHeader=origin)=>new Request('https://example.test'+path,{method:'POST',headers:{Origin:originHeader,'Content-Type':'application/json'},body:JSON.stringify(body)});
const context=()=>({storage:new Store()});
test('closed or invalid origin/input cannot reach paid calls',async()=>{
 for(const [r,env,status]of [[req('/api/review',{},'https://evil.test'),base,403],[req('/api/review',{}),{...base,PUBLIC_TRIAL:'false'},503],[req('/api/review',{}),base,400],[req('/api/review',{consent:true}),{...base,DAILY_CALL_LIMIT:'NaN'},503]])assert.equal((await worker.fetch(r,env)).status,status);
 const r=await worker.fetch(new Request('https://x/api/health'),{...base,DEEPSEEK_API_KEY:''});assert.equal((await r.json()).ready,false);
 const large=await worker.fetch(req('/api/review',{consent:true,source:'x'.repeat(31000)}),base);assert.equal(large.status,413);
});
test('persistent global budget caps concurrent reservations and survives actor restart',async()=>{
 const ctx=context(),env={...base,DAILY_CALL_LIMIT:'3'};let b=new TrialBudget(ctx,env);
 const results=await Promise.all(Array.from({length:8},(_,i)=>b.fetch(req('/reserve',{ip:'test-'+i}))));
 assert.equal(results.filter(r=>r.ok).length,3);
 b=new TrialBudget(ctx,env);assert.equal((await b.fetch(req('/reserve',{ip:'other'}))).status,429);
 assert.equal((await ctx.storage.get('usage')).count,3);
});
test('interview persists through each actor restart, retry is cached, clear erases data',async()=>{
 const oldFetch=globalThis.fetch;let calls=0;
 globalThis.fetch=async (url,init)=>{calls++;const input=JSON.parse(JSON.parse(init.body).messages[1].content);
 const result=input.source?{summary:'模拟复盘',strengths:[],issues:[],nextPractice:'补充一次失败迭代。'}:{question:'请说明第 '+calls+' 个判断的依据。',focus:'项目证据'};
 return Response.json({choices:[{finish_reason:'stop',message:{content:JSON.stringify(result)}}]});};
 try{
 const ctx=context(),budget=new TrialBudget(context(),base),env={...base,BUDGET:{getByName:()=>({fetch:(url,init)=>budget.fetch(new Request(url,init))})}};
 let actor=new InterviewSession(ctx,env);
 const start=await actor.fetch(req('/api/interview/start',{ip:'test',body:{role:'AIGC 创作设计岗位',project:'我负责一个虚构运动品牌的分镜、人物一致性检查和素材生成。项目只做了内部演示，没有投放数据。'}}));assert.equal(start.status,200);
 for(let round=1;round<=4;round++){
  actor=new InterviewSession(ctx,env);
  const body={ip:'test',body:{round,answer:'我通过对照人物脸型和服装的参考图检查一致性，没有测过投放结果。',requestId:'request-'+round}};
  const r=await actor.fetch(req('/api/interview/answer',body));assert.equal(r.status,200);const result=await r.json();
  actor=new InterviewSession(ctx,env);assert.deepEqual(await (await actor.fetch(req('/api/interview/answer',body))).json(),result);
  if(round===4)assert.equal(result.done,true);
 }
 assert.equal(calls,5);await actor.fetch(req('/api/interview/clear',{body:{},ip:'test'}));assert.equal(await ctx.storage.get('session'),undefined);
 assert.equal((await actor.fetch(req('/api/interview/answer',{body:{},ip:'test'}))).status,410);
 }finally{globalThis.fetch=oldFetch;}
});
test('expired interview storage is erased by alarm',async()=>{
 const ctx=context();await ctx.storage.put('session',{expires:Date.now()-1,snapshot:[]});await new InterviewSession(ctx,base).alarm();assert.equal(ctx.storage.map.size,0);
});
