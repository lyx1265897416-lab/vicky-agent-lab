// Incremental SSE parser shared by provider and worker forwarding. No raw model text is exposed.
export async function readEvents(response,onEvent){
 const reader=response.body.getReader(),decoder=new TextDecoder();let buffer='';
 const dispatch=frame=>{const data=frame.split('\n').filter(x=>x.startsWith('data:')).map(x=>x.slice(5).trimStart()).join('\n');if(data&&data!=='[DONE]')onEvent(JSON.parse(data));};
 try{while(true){const {done,value}=await reader.read();buffer+=done?decoder.decode():decoder.decode(value,{stream:true});buffer=buffer.replace(/\r\n/g,'\n');let end;while((end=buffer.indexOf('\n\n'))>=0){dispatch(buffer.slice(0,end));buffer=buffer.slice(end+2);}if(done){if(buffer.trim())dispatch(buffer);break;}}}finally{reader.releaseLock();}
}
