// Read only allowlisted public answer fields from incomplete JSON. Never evaluate model text.
// Previews are provisional: final schema and source-reference validation still runs separately.
export function previewFields(input,mode){
 const out=Object.create(null);let pos=0;
 const allowed=path=>mode==='question'?/^(question|focus)$/.test(path):/^(summary|nextPractice|strengths\.[0-3]|issues\.[0-5]\.(quote|explanation|revision|action))$/.test(path);
 const space=()=>{while(/\s/.test(input[pos]||'')&&pos<input.length)pos++;};
 function string(){pos++;let value='';while(pos<input.length){const c=input[pos++];if(c==='"')return {value,complete:true};if(c==='\\'){if(pos>=input.length)break;const e=input[pos++];if(e==='u'){const code=input.slice(pos,pos+4);if(!/^[a-f\d]{4}$/i.test(code))break;value+=String.fromCharCode(parseInt(code,16));pos+=4;}else{const escapes={'"':'"','\\':'\\','/':'/','b':'\b','f':'\f','n':'\n','r':'\r','t':'\t'};if(!(e in escapes))break;value+=escapes[e];}}else{if(c.charCodeAt(0)<32)break;value+=c;}}return {value:value.replace(/[\uD800-\uDBFF]$/,''),complete:false};}
 function walk(path,depth=0){if(depth>8)return false;space();const c=input[pos];if(c==='"'){const s=string();if(allowed(path))out[path]=s.value.slice(0,3000);return s.complete;}
  if(c==='{'||c==='['){const object=c==='{',end=object?'}':']';pos++;let index=0;space();if(input[pos]===end){pos++;return true;}while(pos<input.length){let key=String(index++);if(object){space();if(input[pos]!=='"')return false;const s=string();if(!s.complete)return false;key=s.value;space();if(input[pos++]!==':')return false;}if(!walk(path?path+'.'+key:key,depth+1))return false;space();if(input[pos]===end){pos++;return true;}if(input[pos++]!==',')return false;}return false;}
  const primitive=input.slice(pos).match(/^(?:true|false|null|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)(?=\s|,|\]|\})/);if(primitive){pos+=primitive[0].length;return true;}return false;
 }
 walk('');return out;
}
export function createPreview(mode){const previous=Object.create(null);return content=>{const patches=[];for(const [path,value]of Object.entries(previewFields(content,mode))){const old=previous[path]||'';if(value===old)continue;patches.push(value.startsWith(old)?{path,append:value.slice(old.length)}:{path,text:value});previous[path]=value;}return patches;};}
