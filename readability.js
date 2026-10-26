'use strict';
function initMaterials(){
 const params=new URLSearchParams(location.search),requested=params.get('file');
 let selected=ASSETS.find(a=>a.path===requested)||ASSETS.find(a=>a.path==='00-START.txt')||ASSETS[0],raw=false;
 const from=Number(params.get('fromLesson')),origin=LESSONS.find(l=>l.id===from);
 const names={'00-START.txt':'从这里开始：学习包使用说明','01-安装入门图解.html':'首次安装：Mac / Windows 图解','02-八课操作图解.html':'八课操作图解入口','novice-field-guide.txt':'新手操作卡：路径、任务与排错','profile.sample.md':'个人背景模板','preferences.sample.md':'输出偏好模板','AGENTS.md':'项目工作约定模板','knowledge-index.sample.md':'资料索引模板','manual-rubric.txt':'人工验收清单','concept-worksheet.txt':'AI 概念练习表','graduation-task.txt':'毕业任务说明','maintenance-log.txt':'维护与更新记录','setup-mac.txt':'Mac 首次安装说明','setup-windows.txt':'Windows 首次安装说明','check_result.py':'结果检查脚本（可选）','LICENSE.txt':'材料使用许可','VERSION.txt':'版本与修订说明','QA-report.txt':'验证范围与限制','UX-review-2026-10-25.txt':'可读性与易用性检查记录'};
 function title(a){const p=a.path,f=p.split('/').pop();if(names[f])return names[f];let m=p.match(/^(?:lectures\/|guides\/lesson-)(\d\d)/);if(m){const l=LESSONS[Number(m[1])-1];return `第 ${l.id} 课${p.endsWith('.html')?'图解':'讲稿'}：${l.title}`;}if(f==='SKILL.md')return p.includes('meeting')?'会议转行动项 Skill':'资料转简报 Skill';if(f==='output-format.md')return p.includes('meeting')?'行动项输出格式':'研究简报输出格式';if(p==='workspace/START.txt')return '工作区入口说明';return f;}
 function related(a){return LESSONS.filter(l=>l.files.includes(a.path)||a.path===`lectures/${String(l.id).padStart(2,'0')}.txt`);}
 function prose(text){
  const lines=text.split('\n');let out='',para=[],code=[],fenced=false,tree=false;
  const flush=()=>{if(para.length){out+='<p>'+para.map(esc).join('<br>')+'</p>';para=[];}};
  const flushCode=()=>{if(code.length){out+='<pre>'+esc(code.join('\n'))+'</pre>';code=[];}};
  for(const line of lines){
   if(/^```/.test(line)){flush();flushCode();fenced=!fenced;continue;}
   if(fenced){code.push(line);continue;}
   if(/^\s{2,}\S/.test(line)||/^[\w.-]+\/$/.test(line.trim())){flush();tree=true;code.push(line);continue;}
   if(tree){flushCode();tree=false;}
   if(!line.trim()){flush();continue;}
   if(/^#{1,4}\s/.test(line)||/^[一二三四五六七八九十]+[、．]/.test(line)){flush();out+='<h3>'+esc(line.replace(/^#{1,4}\s+/,''))+'</h3>';continue;}
   if(/^[-*] /.test(line)){flush();out+='<p class="reader-bullet">• '+esc(line.slice(2))+'</p>';continue;}
   para.push(line);
  }flush();flushCode();return out;
 }
 const intro=document.querySelector('.resource-start')||document.createElement('section');intro.className='resource-start';intro.setAttribute('aria-label','资料使用导航');intro.innerHTML='<a class="resource-outcome-link" href="explore.html">先看实用案例：汇报、宣传内容、简历、学习工具与生活计划 ↗</a><a class="resource-outcome-link" href="examples.html">体验本课作业：行动看板、研究简报和工作区 ↗</a><b>第一次来？按这三步使用资料</b><ol><li><a href="downloads/personal-agent-course-v1.zip" download>下载完整学习包</a>，解压后只把其中的 <code>workspace</code> 交给 Codex。</li><li><a href="setup.html">完成首次安装</a>，再<a href="learn.html?lesson=1">从第 1 课跟做</a>。不用先阅读全部资料。</li><li>本页用于查阅。单文件下载不会自动安装 Skill，也不会替你保存到工作区。</li></ol>';if(!intro.isConnected)$('.download-row').before(intro);
 const label=document.createElement('label');label.htmlFor='asset-lesson';label.textContent='按课程';const select=document.createElement('select');select.id='asset-lesson';select.setAttribute('aria-label','按课程筛选');select.innerHTML='<option value="">全部课程</option>'+LESSONS.map(l=>`<option value="${l.id}">第 ${l.id} 课</option>`).join('');$('.asset-controls').append(label,select);
 const list=$('#asset-list'),directory=document.createElement('details');directory.className='asset-directory';directory.open=matchMedia('(min-width:761px)').matches;directory.innerHTML='<summary>浏览资料目录 <span id="directory-count"></span></summary>';list.before(directory);directory.append(list);
 const view=$('.asset-viewer');view.id='resource-reader';view.setAttribute('tabindex','-1');const read=document.createElement('div');read.id='asset-readable';read.className='readable-document';$('#asset-text').before(read);
 const mode=document.createElement('button');mode.className='small-button';mode.type='button';mode.id='asset-mode';$('.asset-tools').append(mode);
 function showReader(focus=false){view.scrollIntoView({block:'start',behavior:'instant'});if(focus)view.focus({preventScroll:true});}
 function renderList(){const q=$('#asset-search').value.trim().toLowerCase(),kind=$('#asset-filter').value,lesson=Number(select.value);let list=ASSETS.filter(a=>(kind==='全部'||a.kind===kind)&&(!lesson||related(a).some(l=>l.id===lesson))&&(!q||(title(a)+' '+a.path+' '+a.kind+' '+(a.searchText||a.text||'')).toLowerCase().includes(q)));if(q)list.sort((a,b)=>Number((title(b)+' '+b.path).toLowerCase().includes(q))-Number((title(a)+' '+a.path).toLowerCase().includes(q)));$('#asset-count').textContent=`${list.length} / ${ASSETS.length} 份`;$('#directory-count').textContent=`(${list.length})`;$('#asset-list').innerHTML=list.length?list.map(a=>`<button class="asset-item${a.path===selected.path?' selected':''}" type="button" data-path="${esc(a.path)}"${a.path===selected.path?' aria-current="true"':''}><small>${esc(a.kind)}</small><strong>${esc(title(a))}</strong><span>${esc(a.path)}</span></button>`).join(''):'<p class="empty-state">没有匹配项。清空搜索或切回“全部课程 / 全部类型”后重试。</p>';document.querySelectorAll('.asset-item').forEach(b=>b.addEventListener('click',()=>{selected=ASSETS.find(a=>a.path===b.dataset.path);raw=false;renderFile();renderList();const next=new URL(location.href);next.searchParams.set('file',selected.path);history.replaceState(null,'',next);if(matchMedia('(max-width:760px)').matches)directory.open=false;showReader(true);}));}
 let fileRevision=0;
 async function renderFile(){
  const target=selected,revision=++fileRevision;
  $('#copy-asset').disabled=true;$('#download-asset').disabled=true;mode.disabled=true;
  if(typeof target.text!=='string'){
   read.hidden=false;read.textContent='正在加载这份资料…';$('#asset-text').hidden=true;
   try{target.text=(await courseFetch(target.url)).text;}catch{
    if(revision!==fileRevision)return;
    read.textContent='这份资料暂未加载，请检查网络后重试。';const retry=document.createElement('button');retry.className='small-button';retry.textContent='重试';retry.onclick=()=>renderFile();read.append(retry);return;
   }
  }
  if(revision!==fileRevision)return;
  $('#copy-asset').disabled=false;$('#download-asset').disabled=false;mode.disabled=false;
  const isCode=/\.(json|py)$/.test(selected.path)||selected.path.includes('.before-'),isHtml=selected.path.endsWith('.html'),rels=related(selected);let visual='';
  if(selected.path.startsWith('guides/'))visual='downloads/'+selected.path.split('/').pop();else if(selected.path==='01-安装入门图解.html')visual='setup.html';else if(selected.path==='02-八课操作图解.html')visual='learn.html?lesson=1#practice';
  document.title=`${title(selected)}｜Vicky Agent Lab`;
  $('#asset-heading').innerHTML=`<span class="eyebrow">${esc(selected.kind)}</span><h2>${esc(title(selected))}</h2><p>${esc(selected.path)}</p><div class="resource-return">${origin?`<a href="learn.html?lesson=${origin.id}#practice">← 返回第 ${origin.id} 课实操</a>`:rels.length>3?'<a href="learn.html?lesson=1">通用资料 · 返回课程目录 ↗</a>':rels.length?rels.map(l=>`<a href="learn.html?lesson=${l.id}#practice">第 ${l.id} 课实操 ↗</a>`).join(''):'<a href="learn.html?lesson=1">返回课程学习 ↗</a>'}</div>${selected.kind==='参考答案'?'<p class="answer-notice">人工教学参考，先独立练习再对照；不是学员成绩。</p>':''}${selected.kind==='实测产出'?'<p class="answer-notice">历史模拟跟学记录；不是真人学员测试或 Mac / Windows 桌面逐按钮实测。</p>':''}`;
  $('#asset-text').textContent=selected.text;$('#asset-status').textContent='';mode.textContent=raw?'切换阅读视图':'查看原始文件';mode.hidden=isCode;
  $('#asset-text').hidden=!(isCode||raw);read.hidden=isCode||raw;
  if(isHtml)read.innerHTML=`<div class="html-guide"><h3>这是配有真实素材的操作指南</h3><p>打开指南可以查看真实截图与实录；“查看原始文件”显示在线版 HTML，图片使用网站地址。点击下载可获得内嵌截图的离线版。</p>${visual?`<a class="button primary" href="${visual}" target="_blank" rel="noopener">打开操作图解 ↗</a>`:''}<p>单文件图解下载后可在浏览器打开。安装资料和 Skills 请使用完整学习包。</p></div>`;else read.innerHTML=prose(selected.text);
  if(isCode)$('#asset-text').setAttribute('aria-label','原始代码或结构化数据，无需先读懂全部内容');else $('#asset-text').removeAttribute('aria-label');
 }
 let searchPromise,searchTimer;
 async function searchAll(){
  directory.open=true;renderList();if(!$('#asset-search').value.trim())return;
  $('#asset-count').textContent='正在搜索全文…';
  try{if(!searchPromise)searchPromise=courseFetch('course-data/search.json').then(rows=>{const byPath=new Map(rows.map(r=>[r.path,r.text]));ASSETS.forEach(a=>a.searchText=byPath.get(a.path)||'');}).catch(e=>{searchPromise=null;throw e;});await searchPromise;renderList();}
  catch{$('#asset-count').textContent='全文索引暂未加载；当前显示标题和路径匹配，再输入可重试。';}
 }
 $('#asset-search').addEventListener('input',()=>{clearTimeout(searchTimer);searchTimer=setTimeout(searchAll,180)});
 for(const el of [$('#asset-filter'),select])el.addEventListener('change',()=>{directory.open=true;renderList()});
 mode.addEventListener('click',()=>{raw=!raw;renderFile();});$('#copy-asset').addEventListener('click',()=>copy(selected.text,$('#asset-status')));$('#download-asset').addEventListener('click',()=>{const href=selected.path.startsWith('guides/')?'downloads/'+selected.path.split('/').pop():selected.path==='01-安装入门图解.html'?'downloads/setup-visual.html':null;if(href){const a=document.createElement('a');a.href=href;a.download=href.split('/').pop();a.click();return;}download(selected.text,selected.path.split('/').pop());});renderList();renderFile().then(()=>{if(requested)requestAnimationFrame(()=>showReader())});
}
