'use strict';
(()=>{let n=0;try{const s=JSON.parse(localStorage.getItem('vicky-personal-agent-course-v1')||'{}');for(let i=1;i<=8;i++)if(s?.['complete-'+i])n++;}catch{}const el=document.getElementById('home-progress');if(el)el.textContent=`${n} / 8 节自查完成 · 进度保存在本浏览器`;})();
