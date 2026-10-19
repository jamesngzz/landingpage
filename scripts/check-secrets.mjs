// Optional pre-push safeguard: exact secret matching across working files and
// all Git objects reachable from refs. Input is hidden; nothing is persisted.
import {execFileSync} from 'node:child_process';
import {readFileSync,statSync} from 'node:fs';
if(!process.stdin.isTTY) throw new Error('Interactive terminal required.');
process.stdin.setRawMode(true);process.stdin.resume();
console.log('Ready for JSON array of secret values on stdin (input is hidden).');
const secrets=await new Promise((resolve,reject)=>{
  let value='';
  const read=chunk=>{
    value+=chunk.toString();
    if(value.includes('\u0003') || value.length>20000) {process.stdin.setRawMode(false);process.stdin.pause();reject(new Error('Cancelled'));return;}
    if(/[\r\n]/.test(value)) {process.stdin.off('data',read);process.stdin.setRawMode(false);process.stdin.pause();resolve(JSON.parse(value.trim()));}
  };process.stdin.on('data',read);
});
if(!Array.isArray(secrets)||!secrets.length||secrets.some(x=>typeof x!=='string'||x.length<12))throw new Error('Provide nonempty secret values.');
const git=args=>execFileSync('git',args,{maxBuffer:64*1024*1024});
const includesSecret=buffer=>secrets.some(value=>buffer.includes(Buffer.from(value)));
const files=[...new Set(git(['ls-files','-z','--cached','--others','--exclude-standard']).toString().split('\0').filter(Boolean))];
for(const file of files) if(statSync(file).isFile()&&includesSecret(readFileSync(file)))throw new Error(`Secret found in working file: ${file}`);
const objects=git(['rev-list','--objects','--all']).toString().trim().split('\n').map(line=>line.split(' ')[0]).filter(Boolean);
for(const id of objects) if(includesSecret(git(['cat-file','-p',id])))throw new Error(`Secret found in Git object: ${id}`);
console.log(`PASS: no supplied credentials found in ${files.length} working files or ${objects.length} reachable Git objects.`);
