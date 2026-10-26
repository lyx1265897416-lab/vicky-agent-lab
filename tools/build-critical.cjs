// Inline the small critical presentation assets so first paint does not wait for extra CDN round trips.
const fs=require('node:fs'),vm=require('node:vm');
const box={window:{}};vm.runInNewContext(fs.readFileSync('gallery/cases.js','utf8'),box);
const galleryJS=fs.readFileSync('gallery/gallery.js','utf8');
const rendering=galleryJS.slice(galleryJS.indexOf(' const cases='),galleryJS.indexOf(' function stopGif'));
const render=vm.runInNewContext('(function(){'+rendering+';return {card,categories}})()',box);
const css=['course.css','readability.css','gallery/gallery.css'].map(p=>fs.readFileSync(p,'utf8')).join('\n');
for(const file of ['index.html','explore.html']){
 let html=fs.readFileSync(file,'utf8').replace(/<!-- critical:start -->[\s\S]*?<!-- critical:end -->/,'');
 for(const p of ['course.css','readability.css','gallery/gallery.css'])html=html.replace(new RegExp('<link rel="stylesheet" href="'+p.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'[^\"]*">','g'),'');
 html=html.replace('</head>','<!-- critical:start --><style>'+css+'</style><!-- critical:end --></head>');
 if(file==='index.html'){
  html=html.replace(/<link rel="preload" as="image" href="gallery\/posters\/presenton.webp"[^>]*>/,'');
  const image=fs.readFileSync('gallery/posters/presenton.webp').toString('base64');
  html=html.replace(/(<div class="gallery-media gallery-media-hero" data-media="presenton"><img src=")[^"]+/, '$1data:image/webp;base64,'+image);
 }
 if(file==='explore.html'){
  const filters=Object.entries(render.categories).map(([k,v])=>'<button type="button" data-filter="'+k+'" aria-pressed="'+(k==='all')+'">'+v+'</button>').join('')+'<button type="button" data-filter="films" aria-pressed="false">视频预览 · 5</button>';
  html=html.replace(/(<div[^>]*id="gallery-filters"[^>]*>)[\s\S]*?<\/div>/,(_,a)=>a+filters+'</div>');
  html=html.replace(/(<div class="gallery-grid" id="gallery-grid">)(?:<!--[\s\S]*?<!-- cards:end -->)?<\/div>/,(_,a)=>a+'<!-- cards:start -->'+box.window.GALLERY_CASES.map(render.card).join('')+'<!-- cards:end --></div>');
 }
 fs.writeFileSync(file,html);
}
