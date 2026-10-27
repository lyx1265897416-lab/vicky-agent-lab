import test from 'node:test';
import assert from 'node:assert/strict';
import {readEvents} from './events.mjs';
import {createCoach} from './core.mjs';
function response(text){const bytes=new TextEncoder().encode(text);return new Response(new ReadableStream({start(c){for(let i=0;i<bytes.length;i+=3)c.enqueue(bytes.slice(i,i+3));c.close();}}),{headers:{'Content-Type':'text/event-stream'}});}
test('SSE handles split UTF-8, CRLF, comments and DONE',async()=>{const seen=[];await readEvents(response(': ping\r\n\r\ndata: {"text":"中文内容"}\r\n\r\ndata: [DONE]\n\n'),x=>seen.push(x));assert.deepEqual(seen,[{text:'中文内容'}]);});
test('real token progress precedes checked report; incomplete streams fail',async()=>{
 const result={summary:'实际反馈',issues:[],strengths:[],nextPractice:'继续练习'},progress=[];
 const tokens=JSON.stringify(result).match(/.{1,9}/gu);
 const stream=tokens.map(content=>'data: '+JSON.stringify({choices:[{delta:{content}}]})+'\n\n').join('');
 let finish=true;
 const coach=createCoach({getKey:()=> 'test',cleanupTimer:false,reserve:async()=>{},onProgress:p=>progress.push(p),fetcher:async(_,init)=>{assert.equal(JSON.parse(init.body).stream,true);return response(stream+(finish?'data: {"choices":[{"delta":{},"finish_reason":"stop"}]}\n\ndata: [DONE]\n\n':''));}});
 const r=await coach.review({topic:'Should people work from home?',source:'This is a fictional essay for testing the response stream. Working from home can save time for many people.'});assert.equal(r.summary,'实际反馈');assert(progress.some(p=>p.stage==='generating'&&p.characters>0));assert.equal(progress.at(-1).stage,'checking');
 finish=false;await assert.rejects(()=>coach.review({topic:'Should people work from home?',source:'x'.repeat(100)}));
});
