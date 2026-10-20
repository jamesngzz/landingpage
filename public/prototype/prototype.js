(function(){
  'use strict';
  const durations=[3500,3000,3000,6500,4000];
  const starts=durations.map((_,i)=>durations.slice(0,i).reduce((a,b)=>a+b,0));
  const total=durations.reduce((a,b)=>a+b,0);
  const stageAt=time=>Math.max(0,Math.min(4,starts.findLastIndex(start=>time>=start)));
  const copy={
    vi:{eyebrow:'CHROME EXTENSION + DESKTOP COMPANION',heroOne:'Người đồng hành',heroAccent:'ngay trong',heroTwo:'chat AI.',description:'Hiểu việc bạn đang làm, tìm lại điều liên quan từ các chat trước và gợi ý một hướng tốt hơn — đúng lúc.',watch:'Xem Wizzdom đồng hành',duration:'20 giây · Không cần bật tiếng',privacy:'Chỉ theo dõi những cuộc chat bạn cho phép.',invite:'Nhận lời mời beta ↗',browserTab:'Trong trình duyệt',desktopTab:'Trên desktop',example:'UI minh họa',chatTitleBrowser:'Kế hoạch tuần này · ChatGPT',demoNote:'Tình huống giả lập. Không đọc chat thật, không tự sửa hay gửi nội dung.',surfaceTitle:'Bạn ở lại nơi đang làm việc.',surfaceBody:'Wizzdom đồng hành bên cạnh, không bắt đầu lại một cuộc chat khác.',browserTitle:'Extension trong Chrome',browserBody:'Theo mạch chat bạn cho phép. Nhắc một điều liên quan ngay bên cạnh ChatGPT, Claude web.',desktopTitle:'Mascot trên desktop',desktopBody:'Ở góc màn hình khi bạn làm việc với AI. Khẽ báo khi tìm thấy một góc nhìn hữu ích.',trustOne:'Bạn chọn chat và nguồn dữ liệu được kết nối.',trustTwo:'Gợi ý đi cùng lý do và bằng chứng.',trustThree:'Bạn duyệt. Wizzdom không tự hành động.',betaEyebrow:'CÙNG XÂY PRIVATE BETA',betaTitle:'Một người đồng hành hiểu bạn hơn qua mỗi cuộc chat.',previous:'So sánh bản prototype trước',localOnly:'Chỉ chạy local · Không thu thập dữ liệu',dialogTitle:'Bạn đang xem một bản thử.',dialogBody:'Ở bản chính, nút này mở luồng đăng ký beta. Bản thử này không gửi dữ liệu, không đọc cuộc chat thật và không cài extension.',backDemo:'Quay lại demo',dismiss:'Để sau',returnChat:'Trở lại cuộc chat',pause:'Tạm dừng',play:'Tiếp tục',replay:'Xem lại từ đầu',step:'Xem bước',stepLabels:['Bạn chat như thường ngày','Wizzdom theo mạch chat','Có điều liên quan','Gợi ý cùng bằng chứng','Bạn quyết định'],cardKicker:'GỢI Ý CHO BẠN',whisperKicker:'WIZZDOM CÓ MỘT ĐIỀU LIÊN QUAN',approval:'Chỉ gợi ý. Không tự sửa hay gửi vào AI.',observeBrowser:'Đang theo dõi chat này',observeDesktop:'Chat Claude đã được cho phép',paused:'Đã tạm dừng theo dõi',pauseScope:'Tạm dừng',resumeScope:'Bật lại',pausedNarration:'Bạn đã tạm dừng theo dõi trong bản mô phỏng. Wizzdom giữ im lặng cho đến khi bạn bật lại.',composerBrowser:'Nhắn tin cho ChatGPT',composerDesktop:'Trả lời Claude…',takenTitle:'Một hướng bạn có thể chọn',close:'Đóng',closeCard:'Thu gọn gợi ý',extensionLabel:'Mở Wizzdom extension',mascotLabel:'Mở Wizzdom companion',modeLabel:'Nơi Wizzdom đồng hành'},
    en:{eyebrow:'CHROME EXTENSION + DESKTOP COMPANION',heroOne:'Your companion,',heroAccent:'right inside',heroTwo:'your AI chats.',description:'Wizzdom follows what you’re working on, brings back relevant details from past chats, and suggests a better way forward — when it matters.',watch:'See Wizzdom alongside you',duration:'20 seconds · No sound needed',privacy:'Only follows conversations you allow.',invite:'Get a beta invite ↗',browserTab:'In your browser',desktopTab:'On your desktop',example:'Illustrative UI',chatTitleBrowser:'This week’s plan · ChatGPT',demoNote:'Fictional demo. No real chats are read. Nothing is edited or sent automatically.',surfaceTitle:'Stay where the work happens.',surfaceBody:'Wizzdom works alongside you, not in another conversation you have to start.',browserTitle:'A Chrome extension',browserBody:'Follows the chat you allow. Brings up relevant details beside ChatGPT or Claude on the web.',desktopTitle:'A desktop companion',desktopBody:'Sits in the corner while you work with AI. A quiet nudge when a useful connection appears.',trustOne:'You choose which conversations and sources to connect.',trustTwo:'Suggestions come with reasons and supporting evidence.',trustThree:'You review. Wizzdom doesn’t act on its own.',betaEyebrow:'CO-BUILD THE PRIVATE BETA',betaTitle:'A companion that gets to know you, one conversation at a time.',previous:'Compare the previous prototype',localOnly:'Local only · No data collection',dialogTitle:'You’re looking at a prototype.',dialogBody:'On the main site, this opens the beta signup flow. This demo sends no data, reads no real conversations and installs no extension.',backDemo:'Back to the demo',dismiss:'Not now',returnChat:'Back to your conversation',pause:'Pause',play:'Resume',replay:'Replay from the start',step:'View step',stepLabels:['You chat as usual','Wizzdom follows along','A relevant connection','Suggestion and evidence','You decide'],cardKicker:'A THOUGHT FOR YOU',whisperKicker:'WIZZDOM FOUND SOMETHING RELEVANT',approval:'A suggestion only. Nothing is edited or sent to AI.',observeBrowser:'Following this conversation',observeDesktop:'This Claude chat is allowed',paused:'Following is paused',pauseScope:'Pause',resumeScope:'Resume',pausedNarration:'You paused following in this simulation. Wizzdom stays quiet until you turn it back on.',composerBrowser:'Message ChatGPT',composerDesktop:'Reply to Claude…',takenTitle:'A direction you could choose',close:'Close',closeCard:'Minimise suggestion',extensionLabel:'Open Wizzdom extension',mascotLabel:'Open Wizzdom companion',modeLabel:'Where Wizzdom works alongside you'}
  };
  const scenes={
    browser:{
      vi:{host:'ChatGPT',title:'Sắp xếp tuần này',task:'Hai buổi rảnh tuần này: học UX, chỉnh portfolio hay làm case study?',intro:'Bạn có thể chia thời gian như sau:',plan:[['Buổi 1','Học UX và chỉnh portfolio'],['Buổi 2','Bắt đầu làm case study']],whisper:'Hai điều từ chat cũ có thể đổi kế hoạch này.',insight:'Ưu tiên case study trước?',suggestion:'Nó là phần còn thiếu để kịp nộp hồ sơ thứ Sáu.',sources:[{tool:'ChatGPT',text:'Muốn nộp hồ sơ trước thứ Sáu.'},{tool:'Claude',text:'Portfolio chỉ thiếu 1 case study.'}],action:'Thử hướng này',next:'Dành hai buổi cho case study, rồi trở lại ChatGPT để điều chỉnh kế hoạch.',narration:['Bạn đang chat với ChatGPT như thường ngày. Không cần hỏi Wizzdom.','Extension đang theo mạch cuộc chat bạn cho phép.','Wizzdom nhận ra điều liên quan từ lịch sử chat và khẽ nhắc bạn.','Hạn nộp hồ sơ + case study còn thiếu: Wizzdom gợi ý một ưu tiên, kèm nguồn.','Bạn chọn có dùng gợi ý hay không. Wizzdom không tự sửa câu trả lời của AI.']},
      en:{host:'ChatGPT',title:'Planning this week',task:'Two free evenings: learn UX, polish my portfolio or finish a case study?',intro:'You could split your time like this:',plan:[['Evening 1','Learn UX and polish the portfolio'],['Evening 2','Start the case study']],whisper:'Two details from past chats could change this plan.',insight:'Prioritise the case study?',suggestion:'It’s the missing piece for your Friday application.',sources:[{tool:'ChatGPT',text:'I want to apply by Friday.'},{tool:'Claude',text:'My portfolio needs one case study.'}],action:'Explore this direction',next:'Use both evenings for the case study, then return to ChatGPT to adjust the plan.',narration:['You’re chatting with ChatGPT as usual. You don’t have to ask Wizzdom.','The extension follows the conversation you’ve allowed.','Wizzdom spots relevant details in your history and gives a quiet nudge.','An application deadline + a missing case study: a suggested priority, with sources.','You decide whether to use it. Wizzdom doesn’t rewrite the AI’s answer.']}
    },
    desktop:{
      vi:{host:'Claude',title:'Kế hoạch ra mắt',task:'Giúp tôi lên kế hoạch ra mắt sản phẩm.',intro:'Một hướng triển khai trong tháng đầu:',plan:[['Tuần 1','Chuẩn bị chiến dịch quảng cáo'],['Tuần 2–4','Chạy quảng cáo, đo và mở rộng']],whisper:'Kế hoạch này có thể chưa khớp hai giới hạn bạn đã đặt.',insight:'Thử với một nhóm nhỏ trước?',suggestion:'Bạn chỉ có 7 ngày và chưa dành ngân sách cho quảng cáo.',sources:[{tool:'ChatGPT',text:'Tôi cần ra mắt trong 7 ngày.'},{tool:'Claude',text:'Chưa có ngân sách quảng cáo.'}],action:'Xem bước tiếp theo',next:'Mời một nhóm người dùng nhỏ dùng thử trước, thay vì mở một chiến dịch quảng cáo.',narration:['Bạn đang bàn kế hoạch trong Claude Desktop. Mascot ở góc màn hình.','Wizzdom theo mạch cuộc chat đã được bạn cho phép, không phải toàn bộ màn hình.','Mascot khẽ báo: có hai giới hạn cũ liên quan đến kế hoạch hiện tại.','Wizzdom nối hạn 7 ngày với ngân sách hiện tại, rồi gợi ý một cách thử nhỏ hơn.','Bạn cân nhắc hướng mới và tiếp tục bàn với Claude. Wizzdom không tự hành động.']},
      en:{host:'Claude',title:'Product launch plan',task:'Help me plan the product launch.',intro:'One approach for the first month:',plan:[['Week 1','Prepare an advertising campaign'],['Weeks 2–4','Run ads, measure and expand']],whisper:'This plan may miss two constraints you set earlier.',insight:'Try a small user group first?',suggestion:'You have 7 days and haven’t budgeted for advertising.',sources:[{tool:'ChatGPT',text:'I need to launch in 7 days.'},{tool:'Claude',text:'There’s no advertising budget yet.'}],action:'See a possible next step',next:'Invite a small group to try the product before starting an advertising campaign.',narration:['You’re planning in Claude Desktop. The companion sits in the corner.','Wizzdom follows the conversation you’ve allowed, not your entire screen.','A quiet nudge: two earlier constraints matter for the current plan.','A 7-day deadline + your budget: Wizzdom suggests a smaller way to test.', 'You consider the idea and continue with Claude. Wizzdom takes no action on its own.']}
    }
  };
  const api={durations,starts,total,stageAt,copy,scenes};
  globalThis.WizzdomPrototype=api;
  if(typeof document==='undefined')return;
  const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
  const params=new URLSearchParams(location.search);
  let language=params.get('lang')==='en'?'en':'vi';
  let mode=params.get('mode')==='desktop'?'desktop':'browser';
  let elapsed=starts[Math.max(0,Math.min(4,Math.trunc(Number(params.get('step')))||0))];
  let renderedStage=-1, renderedMode='', cardOpen=stageAt(elapsed)>=3;
  let allowed=true, dismissed=false, inView=false, frame=null, previous=null;
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  let wantsPlay=params.get('paused')!=='1'&&!motion.matches;
  const esc=str=>String(str).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const t=()=>copy[language], data=()=>scenes[mode][language];
  const logo=tool=>tool==='Claude'?'/assets/logos/claude.svg':'/assets/logos/openai.svg';
  const time=value=>`00:${String(Math.floor(value/1000)).padStart(2,'0')}`;
  document.documentElement.dataset.inputModality='pointer';
  document.addEventListener('pointerdown',()=>{document.documentElement.dataset.inputModality='pointer';},true);
  document.addEventListener('keydown',event=>{if(!event.altKey&&!event.ctrlKey&&!event.metaKey&&!['Shift','Alt','Control','Meta'].includes(event.key))document.documentElement.dataset.inputModality='keyboard';},true);

  function renderChat(){
    const d=data();
    $('#task-text').textContent=d.task;
    $('#host-name').textContent=d.host+' ⌄';
    $('#conversation-title').textContent=d.title;
    $('#assistant-name').textContent=d.host;
    for(const id of ['sidebar-logo','assistant-logo']){$('#'+id).src=logo(d.host);$('#'+id).alt=d.host;}
    $('#assistant-intro').textContent=d.intro;
    $('#assistant-plan').innerHTML=d.plan.map(([label,task])=>`<div class="plan-row"><small>${esc(label)}</small><span>${esc(task)}</span></div>`).join('');
    $('#composer-placeholder').textContent=mode==='browser'?t().composerBrowser:t().composerDesktop;
  }
  function renderScene(force=false){
    const stage=stageAt(elapsed), d=data();
    $('#player').dataset.mode=mode;
    $('#player').dataset.stage=String(stage);
    $('#player').dataset.observing=String(allowed);
    $('#player').dataset.dismissed=String(dismissed);
    $('#player').dataset.card=cardOpen&&allowed?'open':'closed';
    $('#companion-card').setAttribute('aria-hidden',String(!cardOpen||!allowed));
    $('#companion-card').inert=!cardOpen||!allowed;
    $('#whisper').setAttribute('aria-hidden',String(stage!==2||cardOpen||dismissed||!allowed));
    $('#whisper').tabIndex=stage===2&&!cardOpen&&!dismissed&&allowed?0:-1;
    $('#mascot').tabIndex=mode==='desktop'?0:-1;
    $('#timecode').textContent=`${time(elapsed)} / 00:20`;
    $$('#timeline button').forEach((button,i)=>{button.style.setProperty('--progress',`${Math.max(0,Math.min(1,(elapsed-starts[i])/durations[i]))*100}%`);if(i===stage)button.setAttribute('aria-current','step');else button.removeAttribute('aria-current');});
    $('#observation-toggle').setAttribute('aria-pressed',String(allowed));
    $('#observation-label').textContent=allowed?(mode==='browser'?t().observeBrowser:t().observeDesktop):t().paused;
    $('#scope-action').textContent=allowed?t().pauseScope:t().resumeScope;
    $('#narration').textContent=allowed?d.narration[stage]:t().pausedNarration;
    if(stage===renderedStage&&mode===renderedMode&&!force)return;
    renderedStage=stage;renderedMode=mode;
    $('#whisper-kicker').textContent=t().whisperKicker;
    $('#whisper-text').textContent=d.whisper;
    $('#card-kicker').textContent=t().cardKicker;
    $('#insight-title').textContent=d.insight;
    $('#insight-suggestion').textContent=d.suggestion;
    $('#evidence').innerHTML=d.sources.map(source=>`<div class="evidence-row"><div class="evidence-origin"><img src="${logo(source.tool)}" alt=""/><span>${esc(source.tool)}</span></div><blockquote>${esc(source.text)}</blockquote></div>`).join('');
    $('#use-label').textContent=d.action;
    $('#approval-note').textContent=t().approval;
    $('#taken-title').textContent=t().takenTitle;
    $('#taken-copy').textContent=d.next;
    $('#taken-state').hidden=stage!==4;
    $('#return-chat').hidden=stage!==4;
    $('#evidence').hidden=stage===4;
    $('.companion-actions').hidden=stage===4;
    // Hidden preview cards must not leave invisible keyboard targets behind.
    for(const id of ['close-card','use-suggestion','dismiss-suggestion','return-chat'])$('#'+id).tabIndex=cardOpen&&allowed?0:-1;
  }
  function renderControls(){
    const playing=wantsPlay&&inView&&allowed&&elapsed<total&&!document.hidden;
    $('#pause-icon').toggleAttribute('hidden',!playing);
    $('#play-icon').toggleAttribute('hidden',playing);
    $('#play-pause').setAttribute('aria-label',elapsed>=total?t().replay:playing?t().pause:t().play);
    $('#play-pause').disabled=!allowed;
    $('#replay').setAttribute('aria-label',t().replay);
    $('#replay').disabled=!allowed;
    $$('#timeline button').forEach(button=>{button.disabled=!allowed;});
  }
  function stopFrame(){if(frame!==null)cancelAnimationFrame(frame);frame=null;previous=null;}
  function tick(now){
    if(!wantsPlay||!inView||!allowed||document.hidden||elapsed>=total){stopFrame();renderControls();return;}
    if(previous!==null)elapsed=Math.min(total,elapsed+Math.min(now-previous,250));previous=now;
    const stage=stageAt(elapsed);
    if(stage!==renderedStage&&stage>=3&&!dismissed)cardOpen=true;
    renderScene();
    if(elapsed>=total){wantsPlay=false;stopFrame();renderControls();return;}
    frame=requestAnimationFrame(tick);
  }
  function syncPlayback(){stopFrame();renderControls();if(wantsPlay&&inView&&allowed&&!document.hidden&&elapsed<total)frame=requestAnimationFrame(tick);}
  function seek(value,play=false){if(!allowed)return;elapsed=Math.max(0,Math.min(total,value));dismissed=false;cardOpen=stageAt(elapsed)>=3;wantsPlay=play;renderScene(true);syncPlayback();}
  function scrollToDemo(){$('#demo').scrollIntoView({block:'start',behavior:motion.matches?'auto':'smooth'});}
  function changeMode(next){mode=next;elapsed=0;cardOpen=false;dismissed=false;allowed=true;wantsPlay=!motion.matches;renderLanguage();syncPlayback();}
  function renderLanguage(){
    document.documentElement.lang=language;
    $$('[data-copy]').forEach(node=>{node.textContent=t()[node.dataset.copy];});
    $$('[data-lang]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.lang===language)));
    $$('[data-mode]').filter(node=>node.tagName==='BUTTON').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.mode===mode)));
    $('.mode-switch').setAttribute('aria-label',t().modeLabel);
    $('#extension-icon').setAttribute('aria-label',t().extensionLabel);
    $('#mascot').setAttribute('aria-label',t().mascotLabel);
    $('#close-card').setAttribute('aria-label',t().closeCard);
    $('#close-dialog').setAttribute('aria-label',t().close);
    $('#timeline').setAttribute('aria-label',language==='vi'?'Các bước demo':'Demo steps');
    $('#timeline').innerHTML=t().stepLabels.map((label,i)=>`<button type="button" data-step="${i}" aria-label="${t().step} ${i+1}: ${esc(label)}" title="${esc(label)}"></button>`).join('');
    renderChat();renderScene(true);renderControls();
  }
  function openCard(){if(!allowed)return;seek(starts[3]);}
  function closeCard(){(mode==='desktop'?$('#mascot'):$('#extension-icon')).focus({preventScroll:true});cardOpen=false;dismissed=true;wantsPlay=false;renderScene(true);syncPlayback();}
  $('#watch-demo').addEventListener('click',()=>{scrollToDemo();seek(0,true);});
  $('#play-pause').addEventListener('click',()=>{if(!allowed)return;if(elapsed>=total){seek(0,true);return;}wantsPlay=!wantsPlay;syncPlayback();});
  $('#replay').addEventListener('click',()=>seek(0,true));
  $('#timeline').addEventListener('click',event=>{const button=event.target.closest('[data-step]');if(button)seek(starts[Number(button.dataset.step)]);});
  $$('button[data-mode]').forEach(button=>button.addEventListener('click',()=>changeMode(button.dataset.mode)));
  $$('[data-surface]').forEach(button=>button.addEventListener('click',()=>{changeMode(button.dataset.surface);scrollToDemo();}));
  $$('[data-lang]').forEach(button=>button.addEventListener('click',()=>{language=button.dataset.lang;renderLanguage();}));
  for(const id of ['extension-icon','whisper','mascot'])$('#'+id).addEventListener('click',openCard);
  for(const id of ['close-card','dismiss-suggestion','return-chat'])$('#'+id).addEventListener('click',closeCard);
  $('#use-suggestion').addEventListener('click',()=>{seek(starts[4]);$('#return-chat').focus({preventScroll:true});});
  $('#observation-toggle').addEventListener('click',()=>{allowed=!allowed;elapsed=0;cardOpen=false;dismissed=false;wantsPlay=allowed&&!motion.matches;renderScene(true);syncPlayback();});
  $$('[data-invite]').forEach(button=>button.addEventListener('click',()=>{wantsPlay=false;syncPlayback();$('#invite-dialog').showModal();}));
  $('#close-dialog').addEventListener('click',()=>$('#invite-dialog').close());
  $('#back-demo').addEventListener('click',()=>{$('#invite-dialog').close();scrollToDemo();});
  $('#invite-dialog').addEventListener('click',event=>{if(event.target===$('#invite-dialog'))$('#invite-dialog').close();});
  document.addEventListener('visibilitychange',syncPlayback);
  motion.addEventListener('change',()=>{if(motion.matches){wantsPlay=false;syncPlayback();}});
  renderLanguage();
  if('IntersectionObserver' in window){new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;syncPlayback();},{threshold:.3}).observe($('#player'));}else{inView=true;syncPlayback();}
})();
