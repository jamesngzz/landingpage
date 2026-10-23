import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync,statSync} from 'node:fs';
import {renderDownloadPage,validateRelease} from '../scripts/download-page.mjs';
const read=name=>readFileSync(new URL('../'+name,import.meta.url),'utf8');
const approvedRelease=JSON.parse(read('design/download/release.json'));
const release={status:'waitlist',version:null,url:null,sha256:null,bytes:null};

test('unapproved release exposes signup, never an internal installer or fake download',()=>{
 assert.equal(validateRelease(release),false);
 for(const lang of ['vi','en']){
  const html=renderDownloadPage(lang,release);
  assert.match(html,new RegExp(`<html lang="${lang}">`));
  assert.match(html,/href="\/\?lang=(vi|en)#apply"/);
  assert.doesNotMatch(html,/data-download|href="[^"]+\.(dmg|zip)"|\/Users\/|file:\/\/|DO_NOT_PROMOTE/);
  for(const id of ['setup','how','privacy','main'])assert.match(html,new RegExp(`id="${id}"`));
  for(const [,asset] of html.matchAll(/(?:href|src)="(\/[^"?#]+)(?:[?#][^"]*)?"/g)){
   if(asset==='/')continue;
   const path=new URL('../public'+asset,import.meta.url);
   assert.ok(existsSync(path),asset);
   if(statSync(path).isDirectory())assert.ok(existsSync(new URL('index.html',path)),asset);
  }
 }
});

test('a future pilot download requires explicit approval and complete integrity metadata',()=>{
 const pilot={status:'pilot',version:'1.0.43-internal.20261024',url:'https://github.com/jamesngzz/wizzdom-desktop-releases/releases/download/v1.0.43/Wizzdom.dmg',sha256:'a'.repeat(64),bytes:133000000,approval:{pilot_distribution:true,evidence:'docs/pilot-acceptance.md'}};
 assert.equal(validateRelease(pilot),true);
 assert.match(renderDownloadPage('en',pilot),/data-download/);
 for(const bad of [{...pilot,approval:null},{...pilot,sha256:null},{...pilot,bytes:0},{...pilot,url:'https://evil.example/Wizzdom.dmg'},{...pilot,url:'javascript:alert(1)'},{...pilot,status:'stable'},{...release,url:pilot.url}])assert.throws(()=>validateRelease(bad));
});

test('guide distinguishes host limits, capture, Cloud AI and analysis outcomes in both languages',()=>{
 const vi=renderDownloadPage('vi',release),en=renderDownloadPage('en',release);
 for(const phrase of ['Accessibility','MCP','Cloud AI','Codex','Claude','Apple Silicon','macOS 13']){assert.ok(vi.includes(phrase),phrase);assert.ok(en.includes(phrase),phrase);}
 for(const phrase of ['Không đọc bản nháp','Chưa có kết luận phân tích','Đây không phải kết quả im lặng','Đề xuất'])assert.ok(vi.toLowerCase().includes(phrase.toLowerCase()),phrase);
 assert.match(en,/Does not read all background chats/);assert.match(en,/a new proposal does not automatically become a fact/);
 assert.match(vi,/Minh họa · không phải dữ liệu của bạn/);assert.match(en,/Illustration · not your personal data/);
 for(const html of [vi,en]){assert.equal([...html.matchAll(/<h1>/g)].length,1);assert.equal([...html.matchAll(/<details(?: | >|>)/g)].length,7);assert.match(html,/href="#main"/);}
 assert.doesNotMatch(read('public/index.html'),/No screen scraping or silent actions/);
});


test('public beta uses verified asset metadata and explains free use without promising all AI services are free',()=>{
 assert.equal(validateRelease(approvedRelease),true);
 for(const lang of ['vi','en']){
  const html=renderDownloadPage(lang,approvedRelease);
  assert.match(html,/data-download/);assert.ok(html.includes(approvedRelease.url));
  assert.ok(html.includes(approvedRelease.sha256));
  for(const id of ['beta','ideas','feedback'])assert.match(html,new RegExp(`id="${id}"`));
  assert.match(html,/Wizzdom Recall/);assert.match(html,/Obsidian/);assert.match(html,/journaling/);
  assert.doesNotMatch(html,/Chưa mở tải công khai|Public download is not open yet|completely safe|hoàn toàn an toàn|all AI APIs are free/i);
 }
 assert.match(renderDownloadPage('vi',approvedRelease),/tài khoản và gói của Codex, Claude/);
 assert.match(renderDownloadPage('en',approvedRelease),/not feature or delivery-date promises/);
});
