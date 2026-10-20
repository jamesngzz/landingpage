(function(){
  'use strict';
  // Adapted from the six fictional scenarios in the original landing's script.js.
  // Source records are illustrative chat excerpts, not live app integrations.
  const groups=[
    {id:'direction',vi:'Sai ưu tiên',en:'Wrong priority',cases:['product','creator']},
    {id:'repeat',vi:'Lặp lại điều không hiệu quả',en:'Repeating what failed',cases:['engineer','personal']},
    {id:'constraint',vi:'Quên tiêu chuẩn hoặc điều kiện',en:'A missed standard or condition',cases:['research','business']}
  ];
  const cases={
    product:{
      vi:{role:'Sản phẩm',project:'Ưu tiên sản phẩm',setup:'Khách hàng muốn có dashboard. Team chỉ có hai tuần.',prompt:'Lên kế hoạch xây analytics dashboard cho sprint tới.',answer:'Đây là kế hoạch cho dashboard:',steps:['Xác định các chỉ số cần theo dõi.','Thiết kế giao diện và chia task cho sprint.'],whisper:'Team đã chọn một ưu tiên khác.',title:'Sửa thiết lập trước?',connection:'Thêm dashboard chưa giúp những người còn kẹt trước bước đó.',next:'Kiểm tra và sửa bước thiết lập trước. Khi người dùng đã vào được sản phẩm, xem lại nhu cầu dashboard.',sources:[
        ['ChatGPT','Tóm tắt phỏng vấn','7/9 người kẹt ở thiết lập','7 trong 9 người được phỏng vấn không hoàn tất thiết lập để vào đến analytics.'],
        ['Claude','Quyết định sprint trước','Đã chốt: ưu tiên thiết lập','Team thống nhất ưu tiên activation trước reporting trong lần thử tiếp theo.'],
        ['ChatGPT','Kết quả thử dashboard','Chỉ 4 người dùng mỗi tuần','Bản dashboard thử nghiệm trước chỉ có bốn người dùng hằng tuần.']
      ],why:'Yêu cầu mới là dashboard, nhưng bằng chứng cũ chỉ ra điểm nghẽn nằm trước dashboard. Vì vậy Wizzdom nhắc kiểm tra thiết lập trước khi dùng hết sprint.'},
      en:{role:'Product',project:'Product priorities',setup:'A customer wants a dashboard. Your team has just two weeks.',prompt:'Plan an analytics dashboard for our next sprint.',answer:'Here is a dashboard plan:',steps:['Define the metrics to track.','Design the interface and split the sprint tasks.'],whisper:'Your team had chosen a different priority.',title:'Fix setup first?',connection:'A dashboard won’t help people who cannot reach it yet.',next:'Test and fix setup first. Revisit the dashboard once people can get into the product.',sources:[
        ['ChatGPT','Interview recap','7 of 9 stuck at setup','Seven of nine interviewees could not finish setup to reach analytics.'],
        ['Claude','Earlier sprint decision','Agreed: setup first','The team agreed to prioritise activation before reporting in the next experiment.'],
        ['ChatGPT','Dashboard experiment','Only 4 weekly users','The previous dashboard prototype had only four weekly users.']
      ],why:'The new request is a dashboard, but earlier evidence puts the bottleneck before it. Wizzdom suggests checking setup before spending the sprint.'}
    },
    engineer:{
      vi:{role:'Developer',project:'Lỗi đăng nhập',setup:'Đăng nhập lúc được lúc không. Thứ Sáu cần phát hành.',prompt:'Viết patch retry token refresh để sửa lỗi đăng nhập.',answer:'Có thể thêm retry vào luồng refresh:',steps:['Thử lại khi token refresh thất bại.','Thêm log để kiểm tra sau khi phát hành.'],whisper:'Cách sửa này đã thất bại hai lần.',title:'Đã thử retry hai lần.',connection:'Cả hai patch đều tái phát lỗi. Báo cáo cũ chỉ ra một nguyên nhân khác.',next:'Tái hiện lỗi với đồng hồ thiết bị bị lệch, kiểm tra thời hạn token rồi mới chọn cách sửa.',sources:[
        ['Codex','Hai thread sửa lỗi cũ','2 patch retry đã bị gỡ','Hai patch retry token refresh đều chỉ giảm lỗi tạm thời rồi tái phát và bị revert.'],
        ['ChatGPT','Tóm tắt báo cáo sự cố','Đồng hồ thiết bị bị lệch','Báo cáo sự cố xác định clock skew khiến token còn hiệu lực bị coi là hết hạn.'],
        ['Claude','Kế hoạch phát hành','Cần kiểm tra trước thứ Sáu','Mục tiêu là sửa nguyên nhân lỗi đăng nhập chập chờn trước lần phát hành thứ Sáu.']
      ],why:'Retry là đúng cách đã từng thử và không giải quyết dứt điểm. Báo cáo sự cố cho một giả thuyết cụ thể để kiểm tra, không phải lặp thêm cùng patch.'},
      en:{role:'Developer',project:'Login failure',setup:'Login fails intermittently. The release is Friday.',prompt:'Write a token-refresh retry patch to fix login.',answer:'We can add a retry to the refresh flow:',steps:['Retry when token refresh fails.','Add logs to check after release.'],whisper:'This fix already failed twice.',title:'You tried retry twice.',connection:'Both patches regressed. An earlier review points to a different cause.',next:'Reproduce the failure with a skewed device clock and check token expiry before choosing a fix.',sources:[
        ['Codex','Two earlier fix threads','2 retry patches reverted','Both token-refresh retry patches reduced errors temporarily, then regressed and were reverted.'],
        ['ChatGPT','Incident review recap','Device clock skew','The incident review found clock skew caused valid tokens to be treated as expired.'],
        ['Claude','Release plan','Investigate before Friday','The goal is to fix the cause of intermittent login failures before Friday’s release.']
      ],why:'Retry is the same approach that already failed. The incident review gives a specific hypothesis to test instead of repeating the patch.'}
    },
    research:{
      vi:{role:'Nghiên cứu',project:'Đánh giá AI tutor',setup:'Bạn có 12 nghiên cứu. Ngày mai cần nộp kết luận.',prompt:'Viết kết luận rằng AI tutor giúp người học học tốt hơn.',answer:'Ta có thể viết kết luận theo hướng này:',steps:['Tổng hợp kết quả tích cực trong các nghiên cứu.','Đề xuất áp dụng AI tutor vào việc học.'],whisper:'Phần lớn nghiên cứu đo điều khác.',title:'Tương tác nhiều ≠ học tốt.',connection:'Tiêu chuẩn bạn chọn là nhớ sau 30 ngày, không phải thời gian tương tác.',next:'Tách kết quả tương tác khỏi khả năng ghi nhớ. Nêu bằng chứng về ghi nhớ còn hạn chế, thay vì khẳng định cải thiện việc học.',sources:[
        ['ChatGPT','Tiêu chuẩn đánh giá','Đo khả năng nhớ sau 30 ngày','Kế hoạch đánh giá định nghĩa thành công là khả năng nhớ kiến thức sau 30 ngày.'],
        ['Claude','Tổng hợp 12 nghiên cứu','Chỉ 2 nghiên cứu đo đúng','10 nghiên cứu đo tương tác hoặc hoàn thành; chỉ 2 nghiên cứu đo ghi nhớ sau 30 ngày.'],
        ['Claude','Bằng chứng trái chiều','1 kết quả không cải thiện rõ','Một trong hai nghiên cứu về ghi nhớ không tìm thấy mức cải thiện có ý nghĩa thống kê.']
      ],why:'Kết luận đang nói về chất lượng học, nhưng phần lớn bằng chứng chỉ đo tương tác. Wizzdom đối chiếu với tiêu chuẩn đã chọn để chỉ ra chỗ suy luận vượt quá dữ liệu.'},
      en:{role:'Researcher',project:'AI tutor evaluation',setup:'You have 12 studies. Your conclusion is due tomorrow.',prompt:'Write a conclusion that AI tutors improve learning.',answer:'We could structure the conclusion like this:',steps:['Summarise the positive study results.','Recommend using AI tutors for learning.'],whisper:'Most studies measured something else.',title:'Engagement isn’t learning.',connection:'You chose 30-day recall as the standard, not time spent engaging.',next:'Separate engagement from recall. State that evidence for recall is limited instead of claiming better learning.',sources:[
        ['ChatGPT','Evaluation criteria','Measure 30-day recall','The evaluation plan defined success as remembering the material after 30 days.'],
        ['Claude','Summary of 12 studies','Only 2 measured recall','Ten studies measured engagement or completion; only two measured 30-day recall.'],
        ['Claude','Counter-evidence','1 found no significant gain','One of the two recall studies found no statistically significant improvement.']
      ],why:'The conclusion concerns learning, while most evidence measures engagement. Wizzdom checks the chosen standard and highlights where the conclusion exceeds the evidence.'}
    },
    business:{
      vi:{role:'Kinh doanh',project:'Dự án khách quen',setup:'Khách quen muốn bắt đầu thứ Hai. Team đang có chỗ trống.',prompt:'Soạn email thân thiện đồng ý bắt đầu dự án vào thứ Hai.',answer:'Đây là các ý cho email xác nhận:',steps:['Cảm ơn khách đã tiếp tục tin tưởng.','Xác nhận bắt đầu thứ Hai và hẹn buổi kickoff.'],whisper:'Có một điều kiện thanh toán bị quên.',title:'Chưa nên hứa bắt đầu.',connection:'Khách còn nợ cũ. Lời đồng ý đang bỏ qua quy tắc bạn đã đặt.',next:'Chỉ xác nhận lịch bắt đầu sau khi thanh toán khoản còn nợ và nhận đặt cọc 50% cho dự án mới.',sources:[
        ['ChatGPT','Tóm tắt hóa đơn trong chat','Nợ $12.400, trễ 45 ngày','Khách hàng này còn hóa đơn 12.400 USD chưa thanh toán, quá hạn 45 ngày.'],
        ['Claude','Quy tắc nhận dự án mới','Trả nợ + đặt cọc 50%','Không bắt đầu công việc mới trước khi khách thanh toán hết khoản cũ và đặt cọc 50%.'],
        ['Claude','Rút kinh nghiệm dự án trước','Đã từng hụt tiền trả lương','Lần chậm thanh toán trước gây thiếu hụt dòng tiền để trả lương cho team.']
      ],why:'Team có chỗ trống không có nghĩa điều kiện nhận việc đã được đáp ứng. Wizzdom nối khách đang được nhắc đến với khoản nợ và quy tắc thanh toán đã lưu trong chat.'},
      en:{role:'Business owner',project:'Returning client',setup:'A returning client wants a Monday start. Your team has capacity.',prompt:'Draft a friendly email agreeing to start the project on Monday.',answer:'Here is a structure for the confirmation:',steps:['Thank them for choosing the team again.','Confirm Monday and arrange the kickoff.'],whisper:'A payment condition is missing.',title:'Before you promise a start…',connection:'They still owe you. Saying yes bypasses the rule you set.',next:'Confirm a start only after the outstanding balance is paid and a 50% deposit is received for the new project.',sources:[
        ['ChatGPT','Invoice recap in chat','$12,400 · 45 days late','This client has a $12,400 invoice outstanding, overdue by 45 days.'],
        ['Claude','New-project rule','Clear balance + 50% deposit','No new work starts before the old balance is cleared and a 50% deposit is received.'],
        ['Claude','Previous project review','A previous payroll gap','The previous payment delay caused a cash-flow shortfall for team payroll.']
      ],why:'Having capacity does not mean the conditions for accepting work are met. Wizzdom links this client to the outstanding balance and payment rule recorded in earlier chats.'}
    },
    creator:{
      vi:{role:'Creator',project:'Video tuần này',setup:'Bạn đang chọn video mới. List công cụ là ý tưởng dễ làm.',prompt:'Lên outline video “10 công cụ AI tốt nhất”.',answer:'Đây là cấu trúc cho video top 10:',steps:['Mở đầu bằng lợi ích của các công cụ.','Giới thiệu lần lượt từng công cụ và tính năng.'],whisper:'Khán giả đã nhiều lần muốn thứ khác.',title:'Họ muốn xem cách làm.',connection:'Khán giả hỏi về một quy trình hoàn chỉnh, không phải thêm danh sách công cụ.',next:'Chọn một việc thật và quay toàn bộ quy trình từ đầu đến kết quả, thay vì giới thiệu thêm một list công cụ.',sources:[
        ['ChatGPT','Tổng hợp bình luận','38 người hỏi về workflow','38 bình luận muốn xem một quy trình làm việc thực tế, từ đầu đến kết quả.'],
        ['Claude','Review hiệu quả video','4 video dạng list kém hiệu quả','Bốn video liệt kê công cụ gần nhất có hiệu quả thấp hơn mức trung bình của kênh.'],
        ['Claude','Nguyên tắc nội dung đã chốt','Cho thấy kết quả thay đổi','Nguyên tắc đã chọn: cho thấy sự chuyển đổi và kết quả, không chỉ giới thiệu công cụ.']
      ],why:'AI đang tối ưu ý tưởng bạn vừa yêu cầu. Wizzdom bổ sung feedback cũ để bạn cân nhắc một ý tưởng phù hợp hơn với điều khán giả đang cần.'},
      en:{role:'Creator',project:'This week’s video',setup:'You need a new video. A tool list feels easy to make.',prompt:'Outline a video: “The 10 best AI tools.”',answer:'Here is a structure for a top-10 video:',steps:['Open with the benefits of the tools.','Introduce each tool and its features.'],whisper:'Your audience keeps asking for something else.',title:'They want to see how.',connection:'People asked for a complete workflow, not another list of tools.',next:'Choose a real task and show the entire workflow from start to result instead of making another tool list.',sources:[
        ['ChatGPT','Audience comment recap','38 workflow requests','Thirty-eight comments asked for a complete real-world workflow, from start to result.'],
        ['Claude','Video performance review','4 tool lists underperformed','The four most recent tool-list videos performed below the channel average.'],
        ['Claude','Agreed content principle','Show the transformation','Your chosen principle: demonstrate a transformation and result, not just the tools.']
      ],why:'The AI is optimising the idea you just requested. Wizzdom brings earlier feedback into view so you can consider an idea better matched to what the audience needs.'}
    },
    personal:{
      vi:{role:'Cá nhân',project:'Portfolio còn dở',setup:'Ba khóa học đang giảm giá. Portfolio của bạn vẫn chưa xong.',prompt:'So sánh ba khóa học này và chọn khóa tôi nên mua.',answer:'Mình sẽ so sánh theo các tiêu chí sau:',steps:['Nội dung, giảng viên và mức độ phù hợp.','Giá sau giảm và thời gian cần để hoàn thành.'],whisper:'Bạn đã chọn một mục tiêu khác.',title:'Làm xong project trước?',connection:'Mua thêm khóa chưa chắc giúp bạn tiến gần mục tiêu đã đặt.',next:'Hoàn thành và đăng một project từ kiến thức đang có. Nếu gặp một thiếu hụt cụ thể, mới chọn khóa giúp giải quyết nó.',sources:[
        ['ChatGPT','Mục tiêu đã đặt','Đăng portfolio trước tháng 11','Mục tiêu đã chọn là hoàn thành và đăng một project portfolio thiết kế sản phẩm trước tháng 11.'],
        ['Claude','Tự tổng kết việc học','4 khóa học vẫn còn dở','Trong sáu tháng đã mua bốn khóa; chưa hoàn thành khóa nào, không khóa nào vượt 18%.'],
        ['ChatGPT','Reflection tuần trước','Học thêm để tránh làm xong','Bạn viết: việc học thêm đang trở thành cách né việc hoàn thành và đăng project.']
      ],why:'Giảm giá làm việc mua khóa có vẻ khẩn cấp. Wizzdom nhắc lại mục tiêu và điều bạn tự nhận ra, để bạn tự cân nhắc thay vì mặc định mua thêm là tiến bộ.'},
      en:{role:'Personal',project:'Unfinished portfolio',setup:'Three courses are on sale. Your portfolio is still unfinished.',prompt:'Compare these three courses and tell me which to buy.',answer:'I can compare them using these criteria:',steps:['Content, instructor and relevance.','Discounted price and time to complete.'],whisper:'You had chosen a different goal.',title:'Finish the project first?',connection:'Another course may not move you closer to the goal you set.',next:'Finish and publish one project using what you already know. Choose a course only if a specific gap blocks you.',sources:[
        ['ChatGPT','Your stated goal','Portfolio before November','The chosen goal is to finish and publish one product-design portfolio project before November.'],
        ['Claude','Learning progress recap','4 unfinished courses','Four courses were bought in six months; none finished, and none above 18% complete.'],
        ['ChatGPT','Last week’s reflection','Learning to avoid shipping','You wrote that more learning was becoming a way to avoid finishing and publishing the project.']
      ],why:'A discount makes buying feel urgent. Wizzdom recalls your goal and your own reflection so you can decide, rather than assuming another purchase is progress.'}
    }
  };
  const copy={
    vi:{switch:'Đổi tình huống',fiction:'Tình huống giả lập',you:'Bạn',composer:'Tiếp tục trò chuyện với Claude…',scope:'Chat này đã được cho phép',open:'Mở Wizzdom',dismiss:'Bỏ qua gợi ý',proposal:'Xem bước đề xuất',proposalLabel:'Một bước tiếp theo để cân nhắc',sources:'Xem 3 nguồn',control:'Bạn quyết định. Không tự sửa hay gửi vào AI.',dismissed:'Đã bỏ qua. Wizzdom giữ im lặng.',reopen:'Xem lại gợi ý',pause:'Tạm dừng demo',play:'Tiếp tục demo',replay:'Xem lại demo',close:'Đóng',note:'Ví dụ hư cấu. Không đọc chat thật, không gửi nội dung và không thu thập dữ liệu.',sourceKicker:'ĐIỀU ĐÃ CÓ TRONG CÁC NGUỒN CŨ',sourceNote:'Các trích đoạn đều là dữ liệu mẫu, không phải tài khoản thật.',steps:['Bạn hỏi AI','AI làm theo yêu cầu','Wizzdom khẽ nhắc','Nguồn và gợi ý'],narration:['Bạn đang nhờ AI giúp việc trước mắt.','AI đi theo yêu cầu hiện tại, chưa có các thông tin cũ này.','Wizzdom thấy điều liên quan trong những nguồn bạn đã cho phép.','Đối chiếu điều cũ với việc mới. Bạn xem nguồn rồi tự quyết định.']},
    en:{switch:'Switch scenario',fiction:'Fictional scenario',you:'You',composer:'Continue chatting with Claude…',scope:'This conversation is allowed',open:'Open Wizzdom',dismiss:'Dismiss suggestion',proposal:'See a possible next step',proposalLabel:'A next step to consider',sources:'View 3 sources',control:'You decide. Nothing is edited or sent to AI.',dismissed:'Dismissed. Wizzdom stays quiet.',reopen:'Reopen suggestion',pause:'Pause demo',play:'Resume demo',replay:'Replay demo',close:'Close',note:'Fictional examples. No real chats are read, nothing is sent, and no data is collected.',sourceKicker:'WHAT WAS IN YOUR EARLIER SOURCES',sourceNote:'All excerpts are sample data, not real accounts.',steps:['You ask AI','AI follows the request','A quiet Wizzdom nudge','Sources and suggestion'],narration:['You ask AI to help with the task at hand.','AI follows the current request, without these earlier facts.','Wizzdom spots relevant information in sources you allowed.','Earlier evidence meets the current task. Check it and decide for yourself.']}
  };
  const durations=[2000,2000,3000,10000],starts=[0,2000,4000,7000],total=17000;
  const known=id=>Object.hasOwn(cases,id);
  const initialState=id=>({caseId:known(id)?id:'product',stage:0,dismissed:false,proposal:false,paused:false});
  function transition(state,event){
    switch(event.type){
      case 'CASE':return known(event.id)?{...initialState(event.id),paused:state.paused}:state;
      case 'SEEK':return {...state,stage:Math.max(0,Math.min(3,Math.trunc(Number(event.stage))||0)),dismissed:false,proposal:false};
      case 'ADVANCE':return state.paused||state.dismissed||state.proposal?state:{...state,stage:Math.max(0,Math.min(3,Math.trunc(Number(event.stage))||0))};
      case 'DISMISS':return {...state,dismissed:true,proposal:false,paused:true};
      case 'OPEN':return {...state,stage:3,dismissed:false,paused:true};
      case 'PROPOSE':return state.stage===3&&!state.dismissed?{...state,proposal:true,paused:true}:state;
      case 'PAUSE':return {...state,paused:event.value};
      default:return state;
    }
  }
  globalThis.WizzdomCases={groups,cases,copy,durations,starts,total,initialState,transition};
  if(typeof document==='undefined')return;
  const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
  const params=new URLSearchParams(location.search),motion=matchMedia('(prefers-reduced-motion: reduce)');
  if(params.get('presentation')==='hero')document.documentElement.dataset.presentation='hero';
  let language=params.get('lang')==='en'?'en':'vi',state=initialState(params.get('case'));
  const initialStep=Math.max(0,Math.min(3,Math.trunc(Number(params.get('step')))||0));
  state=transition(state,{type:'SEEK',stage:initialStep});state.paused=motion.matches||params.get('paused')==='1';
  let elapsed=starts[state.stage],inView=false,frame=null,lastTime=null;
  const t=()=>copy[language],d=()=>cases[state.caseId][language];
  const text=(id,value)=>{$('#'+id).textContent=value;};
  const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const logo=tool=>tool==='Claude'?'/assets/logos/claude.svg':'/assets/logos/openai.svg';
  function renderPicker(){
    text('explore-label',language==='vi'?'Chọn tình huống':'Choose a scenario');
    $('#case-groups').setAttribute('aria-label',t().switch);
    $('#case-groups').innerHTML=groups.map(g=>`<div class="case-group"><p>${esc(g[language])}</p><div class="case-options" role="group" aria-label="${esc(g[language])}">${g.cases.map(id=>`<button data-case="${id}" aria-pressed="${id===state.caseId}">${esc(cases[id][language].role)}</button>`).join('')}</div></div>`).join('');
    $('#case-select').innerHTML=groups.map(g=>`<optgroup label="${esc(g[language])}">${g.cases.map(id=>`<option value="${id}">${esc(cases[id][language].role)}</option>`).join('')}</optgroup>`).join('');
    $('#case-select').value=state.caseId;text('switch-label',t().switch);
  }
  function renderSources(){
    text('sources-title',d().title);text('sources-kicker',t().sourceKicker);text('source-note',t().sourceNote);
    $('#full-sources').innerHTML=d().sources.map(([tool,label,,quote])=>`<article class="source-record"><header><img src="${logo(tool)}" width="17" height="17" alt="" />${esc(tool)}<small>· ${esc(label)}</small></header><blockquote>“${esc(quote)}”</blockquote></article>`).join('');
    text('source-connection',d().why);
  }
  function render(){
    document.documentElement.lang=language;
    $('#player').dataset.stage=String(state.stage);$('#player').dataset.case=state.caseId;
    text('setup',d().setup);text('you-label',t().you);text('prompt',d().prompt);
    // The host answer never changes when Wizzdom suggests a different next step.
    text('answer-intro',d().answer);$('#answer-steps').innerHTML=d().steps.map(s=>`<li>${esc(s)}</li>`).join('');
    $('#ai-answer').hidden=state.stage===0;
    text('composer-label',t().composer);text('scope-label',t().scope);
    $('#quiet-label').hidden=state.stage>=2;$('#whisper').hidden=state.stage!==2||state.dismissed;
    text('whisper-text',d().whisper);$('#popup').hidden=state.stage<3||state.dismissed;$('#popup').dataset.proposal=String(state.proposal);
    text('insight-title',d().title);text('connection',d().connection);
    $('#evidence-preview').innerHTML=d().sources.slice(0,2).map(([tool,,fact])=>`<div><small><img src="${logo(tool)}" width="13" height="13" alt="" />${esc(tool)}</small><strong>${esc(fact)}</strong></div>`).join('');
    $('#proposal').hidden=!state.proposal;text('proposal-label',t().proposalLabel);text('next-step',d().next);
    $('#show-proposal').hidden=state.proposal;text('show-proposal',t().proposal+' →');text('view-sources',t().sources);text('control-note',t().control);
    $('#dismissed-note').hidden=!state.dismissed;text('dismissed-label',t().dismissed);text('reopen',t().reopen);
    text('narration',state.dismissed?t().dismissed:state.proposal?(language==='vi'?'Đây là hướng để bạn cân nhắc. Chưa thực hiện hay gửi gì vào AI.':'A direction to consider. Nothing has been carried out or sent to AI.'):t().narration[state.stage]);
    text('demo-note',t().note);text('timecode',`00:${String(Math.floor(elapsed/1000)).padStart(2,'0')} / 00:17`);
    $('#extension-trigger').setAttribute('aria-label',t().open);$('#dismiss').setAttribute('aria-label',t().dismiss);$('#close-sources').setAttribute('aria-label',t().close);$('#replay').setAttribute('aria-label',t().replay);
    $('#timeline').setAttribute('aria-label',language==='vi'?'Các bước demo':'Demo steps');
    const running=!state.paused&&inView&&!document.hidden&&elapsed<total&&!state.dismissed&&!state.proposal;
    text('play-pause',running?'Ⅱ':'▶');$('#play-pause').setAttribute('aria-label',running?t().pause:t().play);
    $('#timeline').innerHTML=t().steps.map((label,i)=>`<button data-step="${i}" aria-label="${i+1}. ${esc(label)}"${state.stage===i?' aria-current="step"':''} style="--progress:${Math.max(0,Math.min(1,(elapsed-starts[i])/durations[i]))*100}%"></button>`).join('');
    if($('#sources-dialog').open)renderSources();
  }
  function stop(){if(frame!==null)cancelAnimationFrame(frame);frame=null;lastTime=null;}
  function tick(now){
    if(state.paused||!inView||document.hidden||state.dismissed||state.proposal){stop();return;}
    if(lastTime!==null)elapsed=Math.min(total,elapsed+Math.min(now-lastTime,250));lastTime=now;
    const stage=Math.max(0,starts.findLastIndex(start=>elapsed>=start));
    if(stage!==state.stage){state=transition(state,{type:'ADVANCE',stage});render();}
    text('timecode',`00:${String(Math.floor(elapsed/1000)).padStart(2,'0')} / 00:17`);
    $$('#timeline button').forEach((b,i)=>b.style.setProperty('--progress',`${Math.max(0,Math.min(1,(elapsed-starts[i])/durations[i]))*100}%`));
    if(elapsed>=total){state=transition(state,{type:'PAUSE',value:true});stop();render();return;}
    frame=requestAnimationFrame(tick);
  }
  function sync(){stop();render();if(!state.paused&&inView&&!document.hidden&&!state.dismissed&&!state.proposal&&elapsed<total)frame=requestAnimationFrame(tick);}
  function choose(id){const next=transition(state,{type:'CASE',id});if(next===state)return;state=transition(next,{type:'OPEN'});elapsed=starts[3];renderPicker();sync();}
  function seek(stage){state=transition(state,{type:'SEEK',stage});state.paused=true;elapsed=starts[state.stage];sync();}
  $('#case-groups').addEventListener('click',e=>{const button=e.target.closest('[data-case]');if(button)choose(button.dataset.case);});
  $('#case-select').addEventListener('change',()=>choose($('#case-select').value));
  $('#timeline').addEventListener('click',e=>{const button=e.target.closest('[data-step]');if(button)seek(Number(button.dataset.step));});
  for(const id of ['whisper','extension-trigger','reopen'])$('#'+id).addEventListener('click',()=>{state=transition(state,{type:'OPEN'});elapsed=starts[3];sync();});
  $('#dismiss').addEventListener('click',()=>{state=transition(state,{type:'DISMISS'});sync();$('#extension-trigger').focus({preventScroll:true});});
  $('#show-proposal').addEventListener('click',()=>{state=transition(state,{type:'PROPOSE'});sync();$('#proposal').tabIndex=-1;$('#proposal').focus({preventScroll:true});});
  $('#view-sources').addEventListener('click',()=>{state.paused=true;sync();renderSources();$('#sources-dialog').showModal();});
  const closeSources=()=>{$('#sources-dialog').close();$('#view-sources').focus({preventScroll:true});};
  $('#close-sources').addEventListener('click',closeSources);
  $('#sources-dialog').addEventListener('click',e=>{if(e.target===$('#sources-dialog'))closeSources();});
  $('#play-pause').addEventListener('click',()=>{if(elapsed>=total||state.dismissed||state.proposal){state=transition(state,{type:'SEEK',stage:0});elapsed=0;state.paused=false;}else state.paused=!state.paused;sync();});
  function replay(){state=transition(state,{type:'SEEK',stage:0});elapsed=0;state.paused=false;sync();}
  $('#replay').addEventListener('click',replay);
  document.addEventListener('visibilitychange',sync);
  motion.addEventListener('change',()=>{if(motion.matches){state.paused=true;sync();}});
  renderPicker();render();
  if(window.parent!==window){
    const reportSize=()=>window.parent.postMessage({type:'wizzdom-demo-size',height:Math.ceil($('#demo').getBoundingClientRect().height+2)},location.origin);
    window.addEventListener('message',event=>{
      if(event.origin!==location.origin||event.source!==window.parent)return;
      if(event.data?.type==='wizzdom-demo-case'&&known(event.data.caseId))choose(event.data.caseId);
      if(event.data?.type==='wizzdom-demo-replay')replay();
      if(event.data?.type==='wizzdom-demo-language'&&['vi','en'].includes(event.data.language)){language=event.data.language;renderPicker();render();reportSize();}
    });
    if('ResizeObserver' in window)new ResizeObserver(reportSize).observe($('#demo'));
    reportSize();window.parent.postMessage({type:'wizzdom-demo-ready'},location.origin);
  }
  if('IntersectionObserver' in window)new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;sync();},{threshold:.25}).observe($('#player'));else{inView=true;sync();}
})();
