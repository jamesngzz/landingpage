// Static, loopback-only preview. No API routes, credentials or database access.
import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve,sep,extname} from 'node:path';
const root=resolve('public');
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.svg':'image/svg+xml','.woff2':'font/woff2'};
createServer(async(req,res)=>{
  try{
    if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);res.end();return;}
    let name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    if(name==='/'||name==='/prototype/'||name==='/prototype')name='/prototype/index.html';
    if(!['/prototype/','/assets/','/fonts/'].some(prefix=>name.startsWith(prefix))){res.writeHead(404);res.end();return;}
    const path=resolve(root,'.'+name);
    if(!path.startsWith(root+sep)){res.writeHead(403);res.end();return;}
    const data=await readFile(path);
    res.writeHead(200,{'Content-Type':types[extname(path)]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});
    res.end(req.method==='HEAD'?undefined:data);
  }catch{res.writeHead(404);res.end();}
}).listen(4177,'127.0.0.1',()=>console.log('Local prototype: http://127.0.0.1:4177/prototype/'));
