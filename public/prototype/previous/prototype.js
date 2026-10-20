(function () {
  'use strict';
  const durations = [3000, 5500, 3500, 3500, 4500];
  const starts = durations.map((_,i)=>durations.slice(0,i).reduce((a,b)=>a+b,0));
  const total = durations.reduce((a,b)=>a+b,0);
  const stageAt = elapsed => Math.min(4, Math.max(0, starts.findLastIndex(start=>elapsed>=start)));
  const copy = {
    vi:{eyebrow:'NHỮNG CUỘC CHAT CŨ. MỘT BƯỚC TIẾP TỐT HƠN.',heroOne:'Câu trả lời',heroAccent:'tốt hơn',heroTwo:'từ những cuộc chat trước',description:'Wizzdom tìm lại quyết định và chi tiết từ những cuộc chat bạn chọn, để AI giúp đúng việc bạn đang làm.',watch:'Xem Wizzdom giúp gì',invite:'Nhận lời mời beta',privacy:'Bạn chọn nguồn. Lịch sử gốc ở trên máy bạn.',example:'Ví dụ minh họa',duration:'20 GIÂY · KHÔNG CẦN BẬT TIẾNG',demoNote:'Tình huống và dữ liệu giả lập. Wizzdom chỉ đề xuất; bạn chọn dùng hay không.',casesTitle:'Bạn muốn Wizzdom giúp lúc nào?',casesBody:'Chọn một việc quen thuộc. Xem chính xác thông tin cũ thay đổi điều gì.',howTitle:'Không cần kể lại mọi thứ.',howBody:'Chỉ mang điều có liên quan vào việc trước mắt.',howSources:'Những chat bạn chọn',howMatch:'Wizzdom tìm điều liên quan',howValue:'Một kết quả sát việc hơn',betaEyebrow:'CÙNG XÂY PRIVATE BETA',betaTitle:'Mang những điều bạn đã biết vào việc bạn sắp làm.',localOnly:'Bản thử local. Không thu thập hay gửi dữ liệu.',dialogTitle:'Thử hướng mới trước khi launch.',dialogBody:'Ở bản chính, nút này sẽ mở luồng đăng ký beta hiện tại. Prototype chỉ để xem nội dung và trải nghiệm mới; không gửi thông tin lên database.',backDemo:'Quay lại demo',draft:'BẢN NHÁP CỦA AI',original:'CHỈ CÓ YÊU CẦU HIỆN TẠI',updated:'CÓ THÊM ĐIỀU BẠN ĐÃ NÓI',oldChats:'Từ chat đã chọn',ready:'Bạn quyết định',done:'Đã đưa vào bản nháp',use:'Dùng các chi tiết này',used:'Bạn xem lại trước khi sử dụng. Chưa gửi đi.',pause:'Tạm dừng',play:'Tiếp tục',replay:'Xem lại từ đầu',step:'Xem bước',stepLabels:['Việc hiện tại','Tìm bằng chứng','Vì sao liên quan','Chọn sử dụng','Kết quả thay đổi']},
    en:{eyebrow:'PAST CONVERSATIONS. A BETTER NEXT MOVE.',heroOne:'Better',heroAccent:'AI answers',heroTwo:'built on your past chats',description:'Wizzdom brings decisions and details from the chats you choose into the work you’re doing now.',watch:'See Wizzdom in action',invite:'Get a beta invite',privacy:'You choose the sources. Raw history stays on your device.',example:'Illustrative example',duration:'20 SECONDS · SOUND NOT NEEDED',demoNote:'Fictional scenario and data. Wizzdom suggests; you decide what to use.',casesTitle:'Where would this help you?',casesBody:'Pick a familiar task. See exactly what your past chats change.',howTitle:'No need to explain it all again.',howBody:'Bring only what matters into the task at hand.',howSources:'The chats you choose',howMatch:'Wizzdom finds what’s relevant',howValue:'A more useful result',betaEyebrow:'CO-BUILD THE PRIVATE BETA',betaTitle:'Bring what you already know into what you do next.',localOnly:'Local prototype. No data is collected or sent.',dialogTitle:'Try the direction before we launch.',dialogBody:'In the main site, this opens the existing beta signup flow. This prototype is only for reviewing the new content and experience. Nothing is sent to a database.',backDemo:'Back to the demo',draft:'AI DRAFT',original:'ONLY THE CURRENT REQUEST',updated:'WITH WHAT YOU SHARED BEFORE',oldChats:'From selected chats',ready:'Your choice',done:'Added to the draft',use:'Use these details',used:'Review before using. Nothing has been sent.',pause:'Pause',play:'Resume',replay:'Replay from the start',step:'View step',stepLabels:['Current task','Find evidence','Why it matters','Choose to use it','The result']}
  };
  const cases = {
    week:{
      vi:{kind:'decision',title:'Biết nên ưu tiên việc gì',summary:'Nối mục tiêu, hạn chót và việc còn dở — thành một ưu tiên rõ ràng.',workspace:'Chọn việc cho tuần này',tool:'ChatGPT',task:'Tôi có hai buổi rảnh tuần này. Nên ưu tiên việc nào?',greeting:'',plain:'',plainBullets:['Học một khóa UX mới','Làm đẹp lại portfolio','Hoàn thành case study còn thiếu'],end:'',currentLabel:'BẠN ĐANG CÂN NHẮC',currentStatus:'HAI BUỔI RẢNH',nextLabel:'ƯU TIÊN BẠN CHỌN',nextStatus:'CÓ LÝ DO VÀ BẰNG CHỨNG',sources:[{tool:'ChatGPT',ago:'Tuần trước',before:'Tôi muốn ',mark:'gửi hồ sơ trước thứ Sáu',after:'.'},{tool:'Claude',ago:'Hôm qua',before:'Portfolio ',mark:'chỉ còn thiếu một case study',after:'.'}],connection:'Case study còn thiếu đang chặn mục tiêu nộp hồ sơ đúng hạn.',titles:['','Hai điều bạn đã nói ở hai cuộc chat.','Việc còn thiếu này đang chặn mục tiêu của bạn.','Ưu tiên case study để kịp nộp hồ sơ?','Bạn đã chọn một bước đi rõ ràng hơn.'],useLabel:'Chọn ưu tiên này',usedLabel:'Bạn quyết định có làm hay không. Wizzdom không tự hành động.',result:[{text:'Hoàn thành case study còn thiếu',proof:1},' → ',{text:'gửi hồ sơ trước thứ Sáu',proof:0},'.'],narration:['Bạn đang cân nhắc ba việc cho hai buổi rảnh tuần này.','Wizzdom tìm lại mục tiêu và việc còn dở trong những chat bạn chọn.','Nối hai chi tiết: hoàn thành case study giúp bạn kịp nộp hồ sơ.','Wizzdom gợi ý ưu tiên, giải thích vì sao. Bạn là người chọn.','Không phải một đoạn văn mới — một việc đáng làm trước, cùng lý do.']},
      en:{kind:'decision',title:'Know what to prioritise',summary:'Connect a goal, a deadline and unfinished work into a clear priority.',workspace:'Choosing this week’s priority',tool:'ChatGPT',task:'I have two free evenings this week. What should I prioritise?',greeting:'',plain:'',plainBullets:['Start a new UX course','Polish the portfolio design','Finish the missing case study'],end:'',currentLabel:'YOU’RE CONSIDERING',currentStatus:'TWO FREE EVENINGS',nextLabel:'THE PRIORITY YOU CHOSE',nextStatus:'WITH REASONS AND EVIDENCE',sources:[{tool:'ChatGPT',ago:'Last week',before:'I want to ',mark:'send my application by Friday',after:'.'},{tool:'Claude',ago:'Yesterday',before:'My portfolio ',mark:'only needs one more case study',after:'.'}],connection:'The missing case study is blocking your application deadline.',titles:['','Two things you shared in two conversations.','This unfinished task is blocking your goal.','Prioritise the case study to apply on time?','You’ve chosen a clearer next step.'],useLabel:'Choose this priority',usedLabel:'You decide whether to act. Wizzdom takes no action on its own.',result:[{text:'Finish the missing case study',proof:1},' → ',{text:'send your application by Friday',proof:0},'.'],narration:['You’re weighing three tasks for two free evenings this week.','Wizzdom retrieves a goal and unfinished work from your selected chats.','Connect the two: finishing the case study gets your application ready.','Wizzdom suggests a priority and explains why. You choose.','Not another piece of writing — a worthwhile next step, with reasons.']}
    },
    client:{
      vi:{title:'Không bỏ sót điều kiện quan trọng',summary:'Soạn email cho khách. Nhớ cả điều đã thống nhất trước đó.',workspace:'Email cho khách hàng An',tool:'ChatGPT',task:'Viết email đồng ý bắt đầu dự án cho An vào thứ Hai.',greeting:'Chào An,',plain:'Team mình có thể bắt đầu dự án vào thứ Hai.',end:'Mình sẽ gửi lịch kickoff cho bạn.',sources:[{tool:'ChatGPT',ago:'12 ngày trước',before:'Khách An ',mark:'chưa thanh toán',after:' dự án trước.'},{tool:'Claude',ago:'Tuần trước',before:'Chỉ nhận dự án mới khi ',mark:'đặt cọc 50%',after:'.'}],connection:'Cùng khách hàng An. Hai điều kiện cần có trong email.',titles:['','Bạn từng nói hai điều này.','Hai chi tiết này liên quan đến email cho An.','Thêm hai điều kiện vào bản nháp?','Email đã có đủ điều kiện bạn đặt ra.'],result:['Team có thể bắt đầu thứ Hai sau khi ',{text:'hoàn tất khoản còn lại',proof:0},' và ',{text:'đặt cọc 50%',proof:1},'.'],narration:['Bạn nhờ AI soạn email đồng ý nhận dự án.','Wizzdom tìm lại hai chi tiết trong những chat bạn đã chọn.','Khách chưa trả tiền + quy tắc đặt cọc → email cần thêm điều kiện.','Trong ví dụ này, bạn chọn đưa hai chi tiết vào bản nháp.','Vẫn là email nhận dự án — nhưng không bỏ sót điều kiện thanh toán.']},
      en:{title:'Don’t miss an important condition',summary:'Draft a client email with the terms you already agreed on.',workspace:'Email to client Alex',tool:'ChatGPT',task:'Write an email agreeing to start Alex’s project on Monday.',greeting:'Hi Alex,',plain:'Our team can start your project on Monday.',end:'I’ll send over the kickoff details.',sources:[{tool:'ChatGPT',ago:'12 days ago',before:'Alex ',mark:'hasn’t paid',after:' for the previous project.'},{tool:'Claude',ago:'Last week',before:'Only start new projects after a ',mark:'50% deposit',after:'.'}],connection:'Same client. Both details belong in this email.',titles:['','You mentioned these two things.','Both details matter for Alex’s email.','Add these conditions to the draft?','Your email includes the terms you set.'],result:['Our team can start on Monday once ',{text:'the outstanding balance is settled',proof:0},' and the ',{text:'50% deposit is received',proof:1},'.'],narration:['You ask AI to write an email agreeing to a new project.','Wizzdom finds two details in the past chats you selected.','Unpaid work + your deposit rule → conditions for the new project.','In this example, you choose to add both details to the draft.','The same client email — without leaving out your payment terms.']}
    },
    handoff:{
      vi:{title:'Tiếp tục công việc ở AI khác',summary:'Đổi từ ChatGPT sang Claude. Không phải nhắc lại mọi giới hạn.',workspace:'Kế hoạch ra mắt · Claude',tool:'Claude',task:'Giúp tôi lên kế hoạch ra mắt sản phẩm.',greeting:'Kế hoạch đề xuất',plain:'Chạy quảng cáo trong tháng đầu. Sau đó đánh giá và mở rộng.',end:'Bắt đầu bằng việc chuẩn bị ngân sách chiến dịch.',sources:[{tool:'ChatGPT',ago:'3 ngày trước',before:'Tôi chỉ có ',mark:'7 ngày để ra mắt',after:'.'},{tool:'ChatGPT',ago:'Hôm qua',before:'Giai đoạn này ',mark:'chưa có ngân sách quảng cáo',after:'.'}],connection:'Cùng lần ra mắt. Kế hoạch phải vừa thời gian và ngân sách.',titles:['','Bạn đã đặt giới hạn trong ChatGPT.','Claude cũng cần hai giới hạn này.','Dùng lại các giới hạn cho kế hoạch?','Tiếp tục công việc, không phải kể lại.'],result:['Kế hoạch ',{text:'7 ngày',proof:0},': mời nhóm người dùng đầu tiên qua các cộng đồng phù hợp. ',{text:'Không chạy quảng cáo trả phí',proof:1},'.'],narration:['Bạn chuyển sang Claude để lên kế hoạch ra mắt.','Wizzdom tìm lại những giới hạn bạn đã nói trong ChatGPT.','Bạn chỉ có 7 ngày và chưa có ngân sách cho quảng cáo.','Trong ví dụ này, bạn chọn đưa các giới hạn sang việc đang làm.','Kế hoạch mới vừa giới hạn của bạn — không cần gõ lại từ đầu.']},
      en:{title:'Pick up the work in another AI',summary:'Move from ChatGPT to Claude without repeating every constraint.',workspace:'Launch plan · Claude',tool:'Claude',task:'Help me plan the product launch.',greeting:'Suggested launch plan',plain:'Run paid ads during the first month. Then measure and expand.',end:'Start by setting a campaign budget.',sources:[{tool:'ChatGPT',ago:'3 days ago',before:'I only have ',mark:'7 days to launch',after:'.'},{tool:'ChatGPT',ago:'Yesterday',before:'At this stage, there’s ',mark:'no advertising budget',after:'.'}],connection:'Same launch. The plan needs to fit your time and budget.',titles:['','You set these constraints in ChatGPT.','Claude needs to know them, too.','Use these constraints in the plan?','Continue the work, not the explanation.'],result:['A ',{text:'7-day launch plan',proof:0},': invite early users through relevant communities. ',{text:'No paid advertising',proof:1},'.'],narration:['You switch to Claude to plan your launch.','Wizzdom retrieves constraints you shared with ChatGPT.','You have 7 days and no budget for advertising.','In this example, you choose to bring those constraints into the plan.','A plan that fits your situation — without explaining it all again.']}
    },
    writing:{
      vi:{title:'Viết đúng cách của bạn',summary:'Dùng lại điều bạn đã chỉ cho AI về người đọc và cách viết.',workspace:'Bài giới thiệu Wizzdom',tool:'Claude',task:'Viết một đoạn giới thiệu Wizzdom cho người đọc của tôi.',greeting:'Giới thiệu Wizzdom',plain:'Nền tảng semantic intelligence tối ưu hóa việc tổng hợp context đa mô hình.',end:'Một thế hệ mới của hệ sinh thái AI.',sources:[{tool:'ChatGPT',ago:'Tuần trước',before:'Độc giả của tôi ',mark:'mới bắt đầu dùng AI',after:'.'},{tool:'Claude',ago:'4 ngày trước',before:'Tôi muốn mở bài bằng ',mark:'một ví dụ đời thường',after:'.'}],connection:'Cùng người đọc và giọng viết. Không cần chỉ lại từ đầu.',titles:['','Bạn đã chỉ cho AI cách viết này.','Hai lựa chọn này định hình cách mở bài.','Áp dụng vào đoạn giới thiệu?','Một bản nháp gần với cách viết của bạn.'],result:[{text:'Bạn kể về dự án với ChatGPT, rồi phải kể lại khi mở Claude?',proof:1},' Wizzdom ',{text:'tìm lại những điều quan trọng trong chat cũ',proof:0},' để giúp việc bạn đang làm.'],narration:['Bạn nhờ AI viết một đoạn giới thiệu cho người đọc của mình.','Wizzdom tìm lại người đọc và cách mở bài bạn đã chọn.','Người mới dùng AI → lời dễ hiểu. Cách viết của bạn → mở bằng ví dụ.','Trong ví dụ này, bạn chọn áp dụng cả hai vào bản nháp.','Một ví dụ quen thuộc, lời dễ hiểu — không phải sửa lại cùng một kiểu.']},
      en:{title:'Get a draft that sounds like you',summary:'Reuse what you’ve taught AI about your audience and style.',workspace:'Introducing Wizzdom',tool:'Claude',task:'Write a short introduction to Wizzdom for my readers.',greeting:'Introducing Wizzdom',plain:'A semantic intelligence platform optimising cross-model context synthesis.',end:'The next generation of the AI ecosystem.',sources:[{tool:'ChatGPT',ago:'Last week',before:'My readers are ',mark:'new to using AI',after:'.'},{tool:'Claude',ago:'4 days ago',before:'I like to open with ',mark:'an everyday example',after:'.'}],connection:'Same audience and style. No need to teach them again.',titles:['','You’ve shared how you like to write.','These choices change how the piece should open.','Apply them to the introduction?','A draft that’s closer to your voice.'],result:[{text:'Ever told ChatGPT about your project, then explained it all again to Claude?',proof:1},' Wizzdom ',{text:'finds important details from your old chats',proof:0},' to help with what you’re doing now.'],narration:['You ask AI to write an introduction for your readers.','Wizzdom retrieves your audience and preferred opening style.','New to AI → plain language. Your style → an everyday example.','In this example, you choose to apply both to the draft.','A familiar example in plain language — without repeating the same edits.']}
    }
  };
  // Direction B: personal decision support, not a writing-app positioning.
  Object.assign(copy.vi,{eyebrow:'TRỢ LÝ CÁ NHÂN TỪ LỊCH SỬ AI CỦA BẠN',heroOne:'Quyết định',heroAccent:'tốt hơn',heroTwo:'từ những gì bạn đã biết',description:'Wizzdom nối điều bạn từng nói trong ChatGPT, Claude với việc hiện tại, để chỉ ra điều bị bỏ sót và gợi ý bước tiếp theo — kèm bằng chứng.',howValue:'Một bước tiếp theo tốt hơn'});
  Object.assign(copy.en,{eyebrow:'A PERSONAL ASSISTANT BUILT ON YOUR AI HISTORY',heroOne:'Make',heroAccent:'better decisions',heroTwo:'with what you already know',description:'Wizzdom connects what you shared in ChatGPT and Claude with what you’re doing now, surfacing overlooked details and useful next steps — with evidence.',howValue:'A better next step'});
  const visibleCases = ['week','handoff','client'];
  cases.week.vi.doneLabel='Đã chọn ưu tiên';
  cases.week.en.doneLabel='Priority selected';
  cases.week.vi.narration[4]='Ưu tiên case study để kịp nộp hồ sơ, thay vì chia hai buổi cho cả ba việc.';
  cases.week.en.narration[4]='A clear priority: finish the case study so you can apply on time.';
  const api = {durations, starts, total, stageAt, cases, copy, visibleCases};
  globalThis.WizzdomPrototype = api;
  if (typeof document === 'undefined') return;
  const $ = s=>document.querySelector(s);
  const $$ = s=>[...document.querySelectorAll(s)];
  const params = new URLSearchParams(location.search);
  let language = params.get('lang')==='en'?'en':'vi';
  let currentCase = visibleCases.includes(params.get('scene'))?params.get('scene'):'week';
  let elapsed = starts[Math.max(0, Math.min(4, Math.trunc(Number(params.get('step')))||0))];
  let renderedStage = -1;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let wantsPlay = params.get('paused')!=='1' && !motion.matches;
  let inView = false;
  let frame = null;
  let previous = null;
  const esc = str=>String(str).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const data = ()=>cases[currentCase][language];
  const word = ()=>copy[language];
  const logo = tool=>tool==='Claude'?'/assets/logos/claude.svg':'/assets/logos/openai.svg';
  const time = milliseconds=>`00:${String(Math.floor(milliseconds/1000)).padStart(2,'0')}`;
  function renderScene(force=false) {
    const stage=stageAt(elapsed), d=data(), t=word();
    $('#player').dataset.stage=String(stage);
    $('#wizz-card').setAttribute('aria-hidden',String(stage===0));
    $('#connection').setAttribute('aria-hidden',String(stage!==2&&stage!==3));
    $('#timecode').textContent=`${time(elapsed)} / 00:20`;
    $$('#timeline button').forEach((button,i)=>{
      button.style.setProperty('--progress',`${Math.max(0,Math.min(1,(elapsed-starts[i])/durations[i]))*100}%`);
      if(i===stage)button.setAttribute('aria-current','step');else button.removeAttribute('aria-current');
    });
    if(stage===renderedStage&&!force)return;
    renderedStage=stage;
    $('#workspace-name').textContent=d.workspace;
    const tool=$('.workspace-bar>img');tool.src=logo(d.tool);tool.alt=d.tool;
    $('#task-text').textContent=d.task;
    $('#draft-card').classList.toggle('decision-card',d.kind==='decision');
    $('#draft-label').textContent=stage===4?(d.nextLabel||t.draft):(d.currentLabel||t.draft);
    $('#draft-status').textContent=stage===4?(d.nextStatus||t.updated):(d.currentStatus||t.original);
    $('#draft-greeting').textContent=d.greeting;
    $('#draft-body').innerHTML=stage===4?d.result.map(part=>typeof part==='string'?esc(part):`<mark class="proof-${part.proof}">${esc(part.text)}</mark>`).join(''):d.plainBullets?`<ul class="considerations">${d.plainBullets.map(text=>`<li>${esc(text)}</li>`).join('')}</ul>`:esc(d.plain);
    $('#draft-end').textContent=stage===4?'':d.end;
    $('#draft-card').setAttribute('aria-label',stage===4?(d.nextLabel||t.updated):(d.currentLabel||t.original));
    $('#wizz-title').textContent=d.titles[stage];
    $('#wizz-status').textContent=stage===4?(d.doneLabel||t.done):stage===3?t.ready:t.oldChats;
    $('#source-pair').innerHTML=d.sources.map((source,i)=>`<div class="source"><div class="source-label"><img src="${logo(source.tool)}" alt=""/><b>${esc(source.tool)}</b><time>${esc(source.ago)}</time></div><p>${esc(source.before)}<mark class="proof-${i}">${esc(source.mark)}</mark>${esc(source.after)}</p></div>`).join('');
    $('#connection').textContent=d.connection;
    $('#use-label').textContent=d.useLabel||t.use;
    $('#used-label').textContent=d.usedLabel||t.used;
    $('#narrator-number').textContent=String(stage+1).padStart(2,'0');
    $('#narration').textContent=d.narration[stage];
  }
  function renderControls() {
    const playing=wantsPlay&&inView&&elapsed<total&&!document.hidden;
    $('#pause-icon').toggleAttribute('hidden',!playing);
    $('#play-icon').toggleAttribute('hidden',playing);
    $('#play-pause').setAttribute('aria-label',elapsed>=total?word().replay:playing?word().pause:word().play);
    $('#replay').setAttribute('aria-label',word().replay);
  }
  function stopFrame(){if(frame!==null)cancelAnimationFrame(frame);frame=null;previous=null;}
  function tick(now) {
    if(!wantsPlay||!inView||document.hidden||elapsed>=total){stopFrame();renderControls();return;}
    if(previous!==null)elapsed=Math.min(total,elapsed+Math.min(now-previous,250));
    previous=now;
    renderScene();
    if(elapsed>=total){wantsPlay=false;stopFrame();renderControls();return;}
    frame=requestAnimationFrame(tick);
  }
  function syncPlayback(){stopFrame();renderControls();if(wantsPlay&&inView&&!document.hidden&&elapsed<total)frame=requestAnimationFrame(tick);}
  function seek(value,play=false){elapsed=Math.max(0,Math.min(total,value));wantsPlay=play;renderScene(true);syncPlayback();}
  function renderLanguage() {
    document.documentElement.lang=language;
    $('#close-dialog').setAttribute('aria-label',language==='vi'?'Đóng':'Close');
    $('#timeline').setAttribute('aria-label',language==='vi'?'Các bước trong demo':'Demo steps');
    $$('[data-copy]').forEach(node=>{node.textContent=word()[node.dataset.copy];});
    $$('[data-lang]').forEach(node=>node.setAttribute('aria-pressed',String(node.dataset.lang===language)));
    $('#timeline').innerHTML=word().stepLabels.map((label,i)=>`<button type="button" data-step="${i}" aria-label="${word().step} ${i+1}: ${esc(label)}" title="${esc(label)}"></button>`).join('');
    $('#case-grid').innerHTML=visibleCases.map(key=>`<button class="case-card" data-case="${key}" aria-pressed="${key===currentCase}"><strong>${esc(cases[key][language].title)}</strong><p>${esc(cases[key][language].summary)}</p><span class="case-arrow" aria-hidden="true">↗</span></button>`).join('');
    renderScene(true);renderControls();
  }
  function scrollToDemo() {$('#demo').scrollIntoView({block:'start',behavior:motion.matches?'auto':'smooth'});}
  $('#play-pause').addEventListener('click',()=>{if(elapsed>=total)elapsed=0;wantsPlay=!wantsPlay;renderScene();syncPlayback();});
  $('#replay').addEventListener('click',()=>seek(0,true));
  $('#watch-demo').addEventListener('click',()=>{scrollToDemo();seek(0,true);});
  $('#timeline').addEventListener('click',event=>{const button=event.target.closest('[data-step]');if(button)seek(starts[Number(button.dataset.step)]);});
  $('#use-evidence').addEventListener('click',()=>seek(starts[4]));
  $('#case-grid').addEventListener('click',event=>{
    const button=event.target.closest('[data-case]');if(!button)return;
    currentCase=button.dataset.case;elapsed=0;renderLanguage();wantsPlay=!motion.matches;syncPlayback();scrollToDemo();
  });
  $$('[data-lang]').forEach(button=>button.addEventListener('click',()=>{language=button.dataset.lang;renderLanguage();}));
  $$('[data-invite]').forEach(button=>button.addEventListener('click',()=>{wantsPlay=false;syncPlayback();$('#invite-dialog').showModal();}));
  $('#close-dialog').addEventListener('click',()=>$('#invite-dialog').close());
  $('#back-demo').addEventListener('click',()=>{$('#invite-dialog').close();scrollToDemo();});
  $('#invite-dialog').addEventListener('click',event=>{if(event.target===$('#invite-dialog'))$('#invite-dialog').close();});
  document.addEventListener('visibilitychange',syncPlayback);
  motion.addEventListener('change',()=>{if(motion.matches){wantsPlay=false;syncPlayback();}});
  renderLanguage();
  if('IntersectionObserver' in window){new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;syncPlayback();},{threshold:.3}).observe($('#player'));}else{inView=true;syncPlayback();}
  // Read-only diagnostics and controlled seeking for local prototype QA.
  api.seek=seek;api.state=()=>({language,currentCase,elapsed,stage:stageAt(elapsed),wantsPlay,inView});
})();
