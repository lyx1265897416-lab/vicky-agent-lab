(function(root){
'use strict';
function validate(r){
 if(!r||typeof r!=='object'||Array.isArray(r)||r.version!==1)throw Error('需要 version 为 1 的报告对象。');
 if(!['interview','ielts'].includes(r.kind))throw Error('kind 必须是 interview 或 ielts。');
 const str=(v,k,max=20000)=>{if(typeof v!=='string'||!v.trim()||v.length>max)throw Error(k+' 必须是非空文本，且不超过 '+max+' 字符。');return v;};
 for(const k of ['title','source','summary','nextPractice','disclaimer'])str(r[k],k,k==='source'?60000:4000);
 if(!Array.isArray(r.evidence)||r.evidence.length<1||r.evidence.length>12)throw Error('evidence 需要 1—12 条反馈。');
 r.evidence.forEach((e,i)=>{if(!e||typeof e!=='object')throw Error('第 '+(i+1)+' 条反馈格式不正确。');for(const k of ['quote','issue','action','status'])str(e[k],k,4000);if(!r.source.includes(e.quote))throw Error('第 '+(i+1)+' 条引用无法在 source 原文中找到，请对照原稿修正，勿编造原稿。');});
 return r;
}
root.validatePracticeReport=validate;
if(typeof module==='object'&&module.exports)module.exports=validate;
})(typeof window==='object'?window:globalThis);
