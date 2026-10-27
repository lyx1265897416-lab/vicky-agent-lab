import test from 'node:test';
import assert from 'node:assert/strict';
import {previewFields,createPreview} from './preview.mjs';
import {createCoach} from './core.mjs';
test('every prefix of JSON produces stable readable fields without syntax or broken escapes',()=>{
 const obj={summary:'他说："先改一句"。\n保留\\路径与 emoji 😀',issues:[{quote:'students has',explanation:'主谓一致',action:'自己改',revision:'students have'}],strengths:['观点清楚'],nextPractice:'换题练习'};
 const json=JSON.stringify(obj),update=createPreview('ielts'),restored={};let partialSeen=false;
 for(let n=1;n<=json.length;n++){for(const p of update(json.slice(0,n)))restored[p.path]='text'in p?p.text:(restored[p.path]||'')+p.append;if(n<json.indexOf(',"issues"')&&restored.summary)partialSeen=true;}
 assert(partialSeen);assert.deepEqual(restored,{...previewFields(json,'ielts')});assert.equal(restored.summary,obj.summary);assert.equal(restored['issues.0.revision'],'students have');
 assert.equal(previewFields('{"summary":"hello\\u4e','ielts').summary,'hello');
});
test('allowlist excludes internal reasoning, unknown keys, structural injection and wrong mode',()=>{
 const raw=JSON.stringify({reasoning_content:'hidden',analysis:'hidden',question:'<img src=x onerror=alert(1)>',summary:'report',issues:[{quote:'text',extra:'hidden'}],constructor:{prototype:{polluted:true}}});
 assert.deepEqual({...previewFields(raw,'question')},{question:'<img src=x onerror=alert(1)>'});
 assert.deepEqual({...previewFields(raw,'ielts')},{summary:'report','issues.0.quote':'text'});assert.equal({}.polluted,undefined);
});
test('invalid source quotation can be previewed but never becomes a final report',async()=>{
 const raw=JSON.stringify({summary:'未校验总结',issues:[{quote:'invented quotation',explanation:'说明',revision:'修改',action:'练习'}],strengths:[],nextPractice:'练习'}),progress=[];
 const fetcher=async()=>new Response('data: '+JSON.stringify({choices:[{delta:{content:raw},finish_reason:'stop'}]})+'\n\ndata: [DONE]\n\n');
 const coach=createCoach({getKey:()=> 'fixture',cleanupTimer:false,reserve:async()=>{},fetcher,onProgress:p=>progress.push(p)});
 await assert.rejects(()=>coach.review({topic:'Should students volunteer at university?',source:'This is an original test essay. Students should be free to choose useful activities in their own time.'}),/已撤回生成预览/);
 assert(progress.some(p=>p.patches?.some(x=>x.path==='summary')));
});
