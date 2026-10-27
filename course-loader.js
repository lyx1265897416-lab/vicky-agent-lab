'use strict';
// Only fetch the open lesson/catalog; full asset text is loaded when selected.
window.courseFetch=async function(url){const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),15000);try{const r=await fetch(url+'?v=1.15',{signal:controller.signal});if(!r.ok)throw Error('HTTP '+r.status);return await r.json();}finally{clearTimeout(timer);}};
(async()=>{const page=document.body.dataset.page;
const script=src=>new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src+'?v=1.15';s.onload=resolve;s.onerror=reject;document.head.append(s);});
try{if(page==='learn'||page==='materials'){
 const raw=Number(new URLSearchParams(location.search).get('lesson')||1),id=Number.isInteger(raw)&&raw>=1&&raw<=8?raw:1;
 const [meta,data]=await Promise.all([courseFetch('course-data/lessons.json'),courseFetch(page==='learn'?`course-data/lesson-${id}.json`:'course-data/assets.json')]);
 window.LESSONS=meta;if(page==='learn'){LESSONS[id-1]=data;await script('course-demos.js');}else{window.ASSETS=data;await script('readability.js');}
}
await script('learn.js');
}catch(e){const host=document.querySelector('#lesson-content')||document.querySelector('.asset-viewer');if(host){host.textContent='内容暂未加载，请检查网络后重试。';const b=document.createElement('button');b.textContent='重新加载';b.className='small-button';b.onclick=()=>location.reload();host.append(b);}}
})();
