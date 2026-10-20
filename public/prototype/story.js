(function(){
  'use strict';
  const durations=[1500,1500,2000,10000,5000];
  const starts=durations.map((_,i)=>durations.slice(0,i).reduce((a,b)=>a+b,0));
  const total=durations.reduce((a,b)=>a+b,0);
  const stageAt=ms=>Math.max(0,Math.min(4,starts.findLastIndex(start=>ms>=start)));
  const initialState=mode=>({mode:mode==='nudge'?'nudge':'pull',stage:0,approved:false,dismissed:false,following:true});
  function transition(state,event){
    switch(event.type){
      case 'MODE':return {...initialState(event.mode),following:state.following};
      case 'SEEK':return state.following?{...state,stage:Math.max(0,Math.min(4,Math.trunc(Number(event.stage))||0)),approved:false,dismissed:false}:state;
      case 'ADVANCE':return state.following&&!state.approved&&!state.dismissed?{...state,stage:stageAt(event.time)}:state;
      case 'APPROVE':return state.following&&state.stage>=3&&!state.dismissed?{...state,stage:4,approved:true}:state;
      case 'DISMISS':return {...state,approved:false,dismissed:true};
      case 'FOLLOW':return {...initialState(state.mode),following:!state.following};
      default:return state;
    }
  }
  const copy={
    vi:{prototype:'PROTOTYPE · CHỈ CHẠY LOCAL',join:'Cùng thử beta',eyebrow:'NGƯỜI ĐỒNG HÀNH XUYÊN SUỐT CÁC AI',heroOne:'Làm tiếp với AI.',heroTwo:'Không phải kể lại.',description:'Wizzdom mang đúng quyết định, yêu cầu và cách làm việc từ các chat trước vào việc đang làm — khi bạn cần, hoặc khi có điều đáng nhắc.',watch:'Xem Wizzdom giúp thế nào',length:'20 giây · Không cần bật tiếng',pullTab:'Khi tôi cần tìm lại',pullSmall:'Bạn chủ động gọi Wizzdom',nudgeTab:'Khi tôi bỏ sót điều quan trọng',nudgeSmall:'Wizzdom khẽ nhắc đúng lúc',project:'PROJECT: LANDING PAGE',fiction:'Tình huống giả lập',webSurface:'Chrome extension · UI minh họa',hostLabel:'BẠN ĐANG LÀM VIỆC Ở ĐÂY',you:'Bạn',request:'Mang phần đã chốt sang đây',draftTitle:'Brief đã được bạn duyệt',draftNote:'Mới thêm vào bản nháp mô phỏng. Chưa gửi cho Claude.',composer:'Tiếp tục trò chuyện với Claude…',openContext:'Xem điều Wizzdom tìm được',searchTitle:'Tìm đúng phần liên quan…',searchBody:'Cùng project. Quyết định đã chốt. Có nguồn để kiểm tra.',skip:'Bỏ qua',approval:'Bạn duyệt trước. Không tự sửa hay gửi vào AI.',approvedTitle:'Bạn vẫn là người quyết định.',tryOther:'Xem cách hỗ trợ còn lại →',pauseFollowing:'Tạm dừng',demoNote:'Demo minh họa hướng sản phẩm. Không đọc chat thật, không gửi nội dung và không thu thập dữ liệu.',memoryEyebrow:'ĐIỀU GÌ Ở PHÍA SAU?',memoryTitle:'Không chỉ giữ chat. Giữ những điều còn có ích.',memoryDescription:'Các nguồn bạn cho phép trở thành những mẩu nhớ có nguồn và phạm vi rõ ràng — không phải một hồ sơ tính cách bất biến.',otherSources:'Nguồn được cho phép',memoryDisclosure:'Mô phỏng xem, sửa và quên memory. Thay đổi chỉ có hiệu lực trong trang thử này.',trustOne:'Bạn chọn nguồn và cuộc chat.',trustTwo:'Nhắc khi liên quan. Im lặng khi không.',trustThree:'Bạn có thể xem nguồn, sửa hoặc quên.',betaEyebrow:'CÙNG XÂY PRIVATE BETA',demandTitle:'Bạn cần Wizzdom nhất lúc nào?',demandBody:'Chọn tình huống gần với công việc của bạn. Không cần viết dài.',betaAction:'Tôi có một task thật để thử ↗',localDisclosure:'Bản prototype chưa đăng ký beta hay thu email. Lựa chọn chỉ nằm trong phiên này.',footerLine:'Đúng điều đã biết. Đúng việc đang làm.',previous:'Xem bản prototype trước ↗',sourceEyebrow:'MỘT MẨU NHỚ, CÓ NGUỒN',editLabel:'Bản nhớ bạn muốn giữ',saveMemory:'Lưu sửa đổi mô phỏng',forgetMemory:'Quên trong bản thử',sourceNote:'Chỉ áp dụng cho project Landing page. Nội dung gốc không bị sửa. Reload để khôi phục.',betaTitle:'Thử với một công việc thật.',betaBody:'Ở bản chính, bước tiếp theo sẽ là chọn nguồn bạn đồng ý dùng và nhập email để nhận lời mời. Bản thử này chưa gửi đăng ký, chưa lưu lựa chọn hay thu email.',backDemo:'Quay lại demo',paused:'Đã tạm dừng',resume:'Bật lại',following:'Chỉ chat được cho phép',ready:'Ở bên cạnh bạn',finding:'ĐANG TÌM LẠI',review:'BẠN XEM & DUYỆT',approved:'ĐÃ DUYỆT · MÔ PHỎNG',silentTitle:'Bạn cứ tiếp tục.',silentBody:'Wizzdom đã bỏ qua gợi ý này. Không tự bật lại.',pausedBody:'Wizzdom giữ im lặng cho đến khi bạn bật lại trong bản mô phỏng.',pausedNarration:'Đã tạm dừng theo dõi. Không phân tích hay tự hiện gợi ý trong demo.',changedTitle:'Bằng chứng đã thay đổi.',changedBody:'Bạn đã sửa hoặc quên nguồn quan trọng. Gợi ý cũ không còn được áp dụng; bản demo không tự suy diễn lại.',emptyTitle:'Chưa có phần đã chốt để mang sang.',emptyBody:'Các mẩu nhớ đã bị quên trong bản thử. Bạn có thể mở lại bên dưới để khôi phục.',edited:'Bản nhớ đã sửa',forgotten:'Đã quên · Bấm để khôi phục',confirmed:'Đã duyệt trong tình huống giả lập',close:'Đóng',pause:'Tạm dừng demo',play:'Tiếp tục demo',replay:'Xem lại demo',steps:'Các bước demo',stepLabels:['Việc đang làm','Wizzdom được gọi','Tìm nguồn liên quan','Context tạo khác biệt','Bạn quyết định'],needs:['Đổi chat hoặc AI để làm tiếp','Tìm lại điều đã bàn','Trước khi bỏ sót quyết định quan trọng','Tôi chưa thấy cần'],unsureCTA:'Xem lại demo →',selection:'Tình huống bạn chọn: ',viewSource:'Xem nguồn',restore:'Khôi phục mẩu nhớ mô phỏng',dismissLabel:'Bỏ qua gợi ý',extensionLabel:'Mở Wizzdom',modeLabel:'Cách Wizzdom giúp bạn',needLabel:'Tình huống bạn muốn thử'},
    en:{prototype:'PROTOTYPE · LOCAL ONLY',join:'Co-build the beta',eyebrow:'YOUR COMPANION ACROSS AI CHATS',heroOne:'Keep working with AI.',heroTwo:'Not explaining again.',description:'Wizzdom brings the right decisions, requirements and working preferences from past chats into what you’re doing — when you ask, or when something matters.',watch:'See how Wizzdom helps',length:'20 seconds · No sound needed',pullTab:'When I need to recall',pullSmall:'You call on Wizzdom',nudgeTab:'When I miss something important',nudgeSmall:'A quiet, relevant nudge',project:'PROJECT: LANDING PAGE',fiction:'Fictional scenario',webSurface:'Chrome extension · Illustrative UI',hostLabel:'YOU KEEP WORKING HERE',you:'You',request:'Bring our earlier decisions here',draftTitle:'The brief you approved',draftNote:'Added to a simulated draft only. Not sent to Claude.',composer:'Continue your conversation with Claude…',openContext:'See what Wizzdom found',searchTitle:'Finding the relevant pieces…',searchBody:'Same project. Confirmed decisions. Sources you can check.',skip:'Dismiss',approval:'You review first. Nothing is edited or sent automatically.',approvedTitle:'You still decide.',tryOther:'Explore the other way to help →',pauseFollowing:'Pause',demoNote:'A product-direction demo. No real chats are read, nothing is sent, and no data is collected.',memoryEyebrow:'WHAT MAKES THIS POSSIBLE?',memoryTitle:'Not just saved chats. The parts still worth carrying.',memoryDescription:'Sources you allow become reviewable memories with provenance and scope — not a permanent personality profile.',otherSources:'Sources you allow',memoryDisclosure:'Simulated memory review, editing and forgetting. Changes stay in this page session.',trustOne:'You choose sources and conversations.',trustTwo:'Relevant nudges. Silence otherwise.',trustThree:'Inspect, edit or forget a memory.',betaEyebrow:'CO-BUILD THE PRIVATE BETA',demandTitle:'When would you need Wizzdom most?',demandBody:'Choose a moment from your work. No long answer needed.',betaAction:'I have a real task to try ↗',localDisclosure:'This prototype does not register you or collect email. Choices stay in this session.',footerLine:'The right history. The work at hand.',previous:'Compare the earlier prototype ↗',sourceEyebrow:'A MEMORY WITH A SOURCE',editLabel:'The memory you want to keep',saveMemory:'Save simulated edit',forgetMemory:'Forget in this demo',sourceNote:'Scoped to the Landing page project. Original content is unchanged. Reload to restore.',betaTitle:'Try it on real work.',betaBody:'In the live flow, you would choose permitted sources and enter an email for an invitation. This prototype has not submitted a registration, saved your choices or collected email.',backDemo:'Back to the demo',paused:'Paused',resume:'Resume',following:'Allowed conversation only',ready:'Alongside you',finding:'FINDING CONTEXT',review:'FOR YOUR REVIEW',approved:'APPROVED · SIMULATION',silentTitle:'Keep going.',silentBody:'Wizzdom dismissed this suggestion. It won’t reopen on its own.',pausedBody:'Wizzdom stays quiet until you resume this simulation.',pausedNarration:'Following is paused. No analysis or automatic nudges in the demo.',changedTitle:'The evidence has changed.',changedBody:'You edited or forgot an important source. The old recommendation no longer applies; this demo does not invent a new one.',emptyTitle:'No prior decisions to bring over.',emptyBody:'These demo memories were forgotten. Open them below to restore.',edited:'Edited memory',forgotten:'Forgotten · Select to restore',confirmed:'Approved in this fictional scenario',close:'Close',pause:'Pause demo',play:'Resume demo',replay:'Replay demo',steps:'Demo steps',stepLabels:['Your current task','Calling Wizzdom','Finding relevant sources','Context makes a difference','You decide'],needs:['Switching chats or AI to continue work','Recalling something we discussed','Before missing an important decision','I don’t see a need yet'],unsureCTA:'Watch the demo again →',selection:'Your selected moment: ',viewSource:'View source',restore:'Restore simulated memory',dismissLabel:'Dismiss suggestion',extensionLabel:'Open Wizzdom',modeLabel:'Ways Wizzdom helps',needLabel:'A moment you want to try'}
  };
  // Short visitor-facing copy; prototype/privacy disclosures remain explicit below.
  Object.assign(copy.vi,{
    description:'Tìm lại điều đã chốt trong ChatGPT, Claude và các chat cũ. Mang đúng phần liên quan vào việc đang làm — hoặc nhắc khi bạn bỏ sót.',
    pullTab:'Tìm lại khi cần',pullSmall:'Mang việc đang làm sang chat khác',nudgeTab:'Nhắc điều bị bỏ sót',nudgeSmall:'Gợi ý từ những gì đã bàn',
    searchTitle:'Tìm lại những gì đã chốt',searchBody:'Chọn phần liên quan đến công việc này.',
    memoryTitle:'Nhớ điều hữu ích. Không phải mọi thứ.',memoryDescription:'Quyết định, việc đang làm và tiêu chuẩn bạn đã chọn. Mỗi mẩu nhớ có nguồn, thuộc đúng project và sửa được.',
    ready:'Sẵn sàng khi bạn cần',review:'TỪ CÁC CHAT TRƯỚC',following:'Chat này đã được cho phép',manageMemory:'Sửa hoặc quên mẩu nhớ này',
    sourceEarlier:'Chat trước',sourceOther:'Chat khác',reviewBrief:'Xem brief tìm được',reviewNudge:'Xem gợi ý có nguồn',nextTitle:'Một bước tiếp theo để cân nhắc',nextNote:'Đề xuất để bạn xem lại. Chưa đổi kế hoạch hay gửi cho Claude.',approvedTitle:'Bạn đã chọn xem hướng này.',resultGoal:'Kết quả mong muốn',resultAction:'Bước tiếp theo',noAutoAction:'Không tự gửi hoặc sửa nội dung.',
    stepLabels:['Việc đang làm','Gọi Wizzdom','Tìm lại các chat','Kiểm tra nguồn','Bạn quyết định']
  });
  Object.assign(copy.en,{
    description:'Find decisions from ChatGPT, Claude and earlier chats. Bring the relevant pieces into your current task — or get a nudge when you miss something.',
    pullTab:'Recall when I need it',pullSmall:'Continue work in another chat',nudgeTab:'Catch what I missed',nudgeSmall:'A suggestion grounded in past chats',
    searchTitle:'Finding your earlier decisions',searchBody:'Only the pieces relevant to this task.',
    memoryTitle:'Keep what helps. Not everything.',memoryDescription:'Decisions, active work and standards you chose. Each memory has a source, a project scope, and can be edited.',
    ready:'Ready when you need it',review:'FROM EARLIER CHATS',following:'This chat is allowed',manageMemory:'Edit or forget this memory',
    sourceEarlier:'Earlier chat',sourceOther:'Another chat',reviewBrief:'Review the retrieved brief',reviewNudge:'Review the sourced suggestion',nextTitle:'A possible next step',nextNote:'For your review. No plan is changed or message sent to Claude.',approvedTitle:'You chose to explore this direction.',resultGoal:'Desired result',resultAction:'Next step',noAutoAction:'Nothing is sent or edited automatically.',
    stepLabels:['Current task','Call Wizzdom','Find earlier chats','Review sources','You decide']
  });
  const facts=[
    {id:'goal',tool:'ChatGPT',vi:{label:'Đã quyết định',title:'Mục tiêu lần ra mắt này',text:'Tìm người dùng thử, chưa giới thiệu hết tính năng.',quote:'Mục tiêu lần này là tìm người dùng thử, chưa phải giới thiệu mọi tính năng.'},en:{label:'DECIDED',title:'This launch’s goal',text:'Find early users, not showcase every feature.',quote:'This launch is about finding early users, not introducing every feature.'}},
    {id:'problem',tool:'Claude',vi:{label:'Đang giải quyết',title:'Feedback cần giải quyết',text:'Người xem chưa hiểu tình huống sử dụng.',quote:'Người xem chưa hiểu sản phẩm giúp họ trong tình huống nào.'},en:{label:'WORKING ON',title:'Feedback to address',text:'Visitors don’t understand when they would use it.',quote:'Visitors don’t understand the situation in which the product would help them.'}},
    {id:'standard',tool:'ChatGPT',vi:{label:'Tiêu chuẩn đã duyệt',title:'Cách trình bày bạn đã chọn',text:'Ít chữ. Ví dụ cụ thể. Không claim thiếu bằng chứng.',quote:'Ít chữ, ví dụ thật cụ thể; chưa có bằng chứng thì không claim.'},en:{label:'YOUR STANDARD',title:'The approach you approved',text:'Less text. Specific examples. Evidence for claims.',quote:'Use less text and concrete examples. Don’t make claims without evidence.'}}
  ];
  const scenes={
    pull:{vi:{scenario:'Đã bàn trong ChatGPT. Giờ tiếp tục cùng việc ở Claude.',task:'Tiếp tục giúp tôi sửa landing page.',host:'Bạn muốn sửa phần nào, và mục tiêu của trang là gì?',plan:[],quietTitle:'Bạn không cần kể lại từ đầu.',quietBody:'Gọi Wizzdom để mang phần đã chốt trong những chat trước sang đây.',kicker:'KHÔNG PHẢI TOÀN BỘ LỊCH SỬ',title:'Đúng brief để làm tiếp.',explanation:'Wizzdom tìm lại mục tiêu, vấn đề và tiêu chuẩn của cùng project.',action:'Dùng brief này · mô phỏng',next:'Brief đã ở bản nháp cạnh Claude. Bạn xem lại và tự quyết định gửi.',narration:['Bạn chuyển cùng một công việc từ ChatGPT sang Claude. Brief cũ chưa có ở đây.','Trong mô phỏng, bạn gọi Wizzdom: “Mang phần đã chốt sang đây”.','Wizzdom chọn những phần liên quan từ chat cũ, không mang toàn bộ lịch sử.','Đây là brief đã khôi phục: mục tiêu, feedback cần giải quyết và tiêu chuẩn đã chọn.','Dừng ở đây để bạn kiểm tra nguồn và duyệt. Không tự gửi vào Claude.']},en:{scenario:'Discussed in ChatGPT. Continuing the same task in Claude.',task:'Keep helping me improve the landing page.',host:'Which part would you like to improve, and what is the page’s goal?',plan:[],quietTitle:'No need to reconstruct the brief.',quietBody:'Call Wizzdom to bring over what you settled in earlier chats.',kicker:'NOT YOUR ENTIRE HISTORY',title:'The right brief to keep going.',explanation:'Wizzdom retrieves the goal, problem and standards for this same project.',action:'Use this brief · simulate',next:'The brief is now in a draft beside Claude. Review it and decide whether to send.',narration:['You move the same task from ChatGPT to Claude. Your earlier brief isn’t here yet.','In the simulation, you ask Wizzdom to bring over the earlier decisions.','Wizzdom selects relevant pieces from past chats, not your entire history.','The brief is restored: the goal, feedback to address and the standards you chose.','It stops for you to check sources and approve. Nothing is sent to Claude.']}},
    nudge:{vi:{scenario:'Cùng project. Lần này bạn đang cân nhắc thêm nội dung.',task:'Thêm một section cho mỗi tính năng để trang dễ hiểu hơn.',host:'Ta có thể chia các tính năng thành những section riêng:',plan:['Một section về tìm lại chat','Một section về memory','Một section về insight'],quietTitle:'Wizzdom ở bên cạnh.',quietBody:'Chỉ theo mạch chat bạn cho phép. Không cần gọi một cuộc chat khác.',whisperTitle:'Có thể đang giải sai vấn đề.',whisperBody:'Feedback cũ gợi ý một hướng khác. Bạn muốn xem không?',kicker:'ĐIỀU ĐÃ BÀN CÓ THỂ ĐỔI HƯỚNG ĐI',title:'Làm rõ một demo trước?',explanation:'Feedback là chưa hiểu lúc nào cần sản phẩm — chưa phải thiếu thông tin về tính năng.',action:'Cân nhắc hướng này',next:'Một hướng để bạn cân nhắc: làm rõ một tình huống sử dụng trước khi thêm các section.',counter:'Nếu feedback hoặc mục tiêu đã thay đổi, gợi ý này có thể không còn phù hợp.',narration:['Bạn muốn thêm section để trang dễ hiểu. Claude đang đi theo yêu cầu hiện tại.','Wizzdom theo mạch chat đã được cho phép. Nó không đọc toàn bộ màn hình.','Một lời nhắc nhỏ: feedback từ chat trước có thể liên quan đến quyết định này.','Wizzdom nối feedback với mục tiêu, rồi đề xuất làm rõ một demo thay vì thêm tính năng.','Bạn có thể xem nguồn, cân nhắc hoặc bỏ qua. Gợi ý không tự trở thành quyết định.']},en:{scenario:'Same project. This time you’re considering adding content.',task:'Add a section for every feature to make the page clearer.',host:'We could give each feature its own section:',plan:['A section for finding past chats','A section for memory','A section for insights'],quietTitle:'Wizzdom is alongside you.',quietBody:'Following only the conversation you allow. No extra chat to start.',whisperTitle:'Maybe the problem is different.',whisperBody:'Earlier feedback suggests another direction. Want to take a look?',kicker:'PAST CONTEXT CAN CHANGE THE NEXT MOVE',title:'Clarify one demo first?',explanation:'The feedback was about not knowing when to use the product — not missing feature information.',action:'Consider this direction',next:'A direction to consider: make one use case clear before adding more feature sections.',counter:'If the feedback or goal has changed, this suggestion may no longer fit.',narration:['You want more sections for clarity. Claude is following your current request.','Wizzdom follows only the conversation you allow, not your whole screen.','A quiet nudge: feedback in a previous chat could matter to this decision.','Wizzdom connects feedback with the goal and suggests clarifying one demo first.','You can inspect, consider or dismiss it. A suggestion doesn’t become a decision on its own.']}}
  };
  Object.assign(scenes.pull.vi,{quietTitle:'Mang phần đã chốt sang đây.',quietBody:'Không cần tự lục lại từng cuộc chat.',title:'Không phải dựng lại brief.',explanation:'Đã tìm lại ba điều để tiếp tục đúng việc.',action:'Thêm vào bản nháp',next:'Đã thêm brief vào bản nháp mô phỏng. Bạn tự quyết định gửi cho Claude.'});
  Object.assign(scenes.pull.en,{quietTitle:'Bring your earlier decisions here.',quietBody:'Without digging through every conversation.',title:'No need to rebuild the brief.',explanation:'Three relevant pieces to keep the work on track.',action:'Add to draft',next:'Added to the simulated draft. You decide whether to send it to Claude.'});
  Object.assign(scenes.nudge.vi,{quietTitle:'Bạn tiếp tục làm việc.',quietBody:'Wizzdom chỉ nhắc khi tìm được điều liên quan.',whisperTitle:'Feedback cũ có thể đổi hướng này.',whisperBody:'Bạn muốn xem điều gì đang bị bỏ sót?',explanation:'Người xem chưa hiểu lúc nào cần sản phẩm. Thêm section chưa chắc giải quyết đúng vấn đề.',action:'Xem hướng đề xuất'});
  Object.assign(scenes.nudge.en,{quietTitle:'Keep working where you are.',quietBody:'Wizzdom nudges only when something is relevant.',whisperTitle:'Earlier feedback could change this.',whisperBody:'Want to see what might be missing?',explanation:'Visitors don’t know when they need the product. More sections may not solve that problem.',action:'Consider this suggestion'});
  scenes.pull.vi.narration=['Bạn tiếp tục cùng một công việc ở Claude.','Gọi Wizzdom thay vì tự tìm lại từng chat.','Tìm lại phần đã chốt trong ChatGPT và Claude.','Đúng phần đã chốt, sẵn sàng để bạn kiểm tra.','Bạn duyệt trước khi mang brief vào cuộc chat.'];
  scenes.pull.en.narration=['You’re continuing the same task in Claude.','Call Wizzdom instead of searching each chat yourself.','Finding prior decisions in ChatGPT and Claude.','The relevant decisions, ready for your review.','You approve before bringing the brief into your chat.'];
  scenes.nudge.vi.narration=['Bạn đang cân nhắc thêm nội dung cho landing page.','Wizzdom theo mạch chat được bạn cho phép.','Feedback cũ có thể liên quan đến quyết định này.','Feedback về tình huống sử dụng → thử làm rõ một demo trước.','Bạn chọn cân nhắc hoặc bỏ qua.'];
  scenes.nudge.en.narration=['You’re considering more content for the landing page.','Wizzdom follows the conversation you allow.','Earlier feedback may matter to this decision.','Use-case feedback → try clarifying one demo first.','You choose whether to consider or dismiss it.'];
  Object.assign(scenes.pull.vi,{task:'Tiếp tục sửa landing page từ phần đã bàn ở ChatGPT.',title:'Đã tìm lại brief của project này.',explanation:'Ba điều bạn không cần giải thích lại cho Claude.',next:'Mục tiêu, feedback và tiêu chuẩn đã nằm trong bản nháp để bạn xem lại.',result:'Claude có đúng brief để tiếp tục sửa trang.',nextStep:'Mang phần đã chốt vào cuộc chat hiện tại.'});
  Object.assign(scenes.pull.en,{task:'Continue improving the landing page from our ChatGPT discussion.',title:'Your project brief, recovered.',explanation:'Three things you don’t have to explain to Claude again.',next:'The goal, feedback and standards are in a draft for your review.',result:'Claude has the right brief to continue the work.',nextStep:'Bring the earlier decisions into this conversation.'});
  Object.assign(scenes.nudge.vi,{next:'Bạn có thể thử một demo rõ ràng trước khi đầu tư thêm các section.',result:'Biết người xem có hiểu lúc nào cần sản phẩm không.',nextStep:'Cho 3 người xem một demo. Hỏi: “Bạn sẽ dùng nó lúc nào?” rồi mới quyết định có cần thêm section.'});
  Object.assign(scenes.nudge.en,{next:'You could test one clear demo before investing in more feature sections.',result:'Learn whether visitors understand when they would use it.',nextStep:'Show one demo to 3 people. Ask “When would you use this?” before deciding whether to add sections.'});
  const createMemories=()=>Object.fromEntries(facts.map(f=>[f.id,{active:true,edits:{}}]));
  const usableFacts=(state,memory)=>facts.filter(f=>memory[f.id].active&&(state.mode==='pull'||f.id!=='standard'));
  const canUse=(state,memory)=>state.following&&!state.dismissed&&state.stage>=3&&(state.mode==='pull'?usableFacts(state,memory).length>0:['goal','problem'].every(id=>memory[id].active&&Object.keys(memory[id].edits).length===0));
  globalThis.WizzdomStory={durations,starts,total,stageAt,initialState,transition,copy,facts,scenes,createMemories,usableFacts,canUse};
  if(typeof document==='undefined')return;
  const $=selector=>document.querySelector(selector),$$=selector=>[...document.querySelectorAll(selector)];
  const params=new URLSearchParams(location.search);
  let lang=params.get('lang')==='en'?'en':'vi',state=initialState(params.get('mode'));
  let elapsed=starts[Math.max(0,Math.min(4,Math.trunc(Number(params.get('step')))||0))];
  state=transition(state,{type:'SEEK',stage:stageAt(elapsed)});
  let memory=createMemories(),selectedMemory=null,sourceArea='memory-nodes',need=null,frame=null,lastTime=null,inView=false;
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  let playing=params.get('paused')!=='1'&&!motion.matches;
  const t=()=>copy[lang],d=()=>scenes[state.mode][lang];
  const text=(id,value)=>{$('#'+id).textContent=value;};
  const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const value=f=>memory[f.id].edits[lang]??Object.values(memory[f.id].edits).at(-1)??f[lang].text;
  const logo=tool=>tool==='Claude'?'/assets/logos/claude.svg':'/assets/logos/openai.svg';
  document.documentElement.dataset.inputModality='pointer';
  document.addEventListener('pointerdown',()=>{document.documentElement.dataset.inputModality='pointer';},true);
  document.addEventListener('keydown',e=>{if(!e.altKey&&!e.ctrlKey&&!e.metaKey&&!['Shift','Alt','Control','Meta'].includes(e.key))document.documentElement.dataset.inputModality='keyboard';},true);
  function renderChat(){
    text('scenario',d().scenario);text('task-text',d().task);text('host-text',d().host);
    text('app-title','Claude · Landing page');
    $('.app-location').textContent=t().webSurface;
    $('#host-plan').innerHTML=d().plan.map(item=>`<div>${esc(item)}</div>`).join('');
  }
  function renderMemory(){
    $('#memory-nodes').innerHTML=facts.map(f=>`<button class="memory-node${memory[f.id].active?'':' is-forgotten'}" data-source="${f.id}"><small>${esc(f[lang].label)}</small><span>${esc(memory[f.id].active?value(f):t().forgotten)}</span><b aria-hidden="true">↗</b></button>`).join('');
  }
  function renderNeeds(){
    $('#need-options').innerHTML=t().needs.map((label,i)=>`<button data-need="${i}" aria-pressed="${need===i}">${esc(label)}</button>`).join('');
    $('#join-beta').disabled=need===null;
    $('#join-beta').textContent=need===3?t().unsureCTA:t().betaAction;
  }
  function render(){
    const stage=state.stage,card=state.following&&!state.dismissed&&stage>=3;
    const quiet=!state.following||state.dismissed||stage<2||(state.mode==='nudge'&&stage===2);
    $('#player').dataset.mode=state.mode;$('#player').dataset.stage=String(stage);$('#player').dataset.approved=String(state.approved);$('#player').dataset.following=String(state.following);
    $('#quiet-state').hidden=!quiet;$('#search-state').hidden=quiet||card;$('#context-card').hidden=!card;
    text('quiet-title',!state.following?t().paused:state.dismissed?t().silentTitle:stage===2?d().whisperTitle:d().quietTitle);
    text('quiet-copy',!state.following?t().pausedBody:state.dismissed?t().silentBody:stage===2?d().whisperBody:d().quietBody);
    $('#open-context').hidden=!state.following||state.dismissed||!(state.mode==='nudge'&&stage===2);
    text('companion-status',!state.following?t().paused:state.approved?t().approved:card?t().review:stage===2?t().finding:t().ready);
    text('following-label',state.following?t().following:t().paused);text('following-toggle',state.following?t().pauseFollowing:t().resume);
    $('#dismiss').hidden=!card;
    const relevant=usableFacts(state,memory),valid=canUse(state,memory);
    $('#retrieval-trail').innerHTML=relevant.map(f=>`<div><img src="${logo(f.tool)}" width="18" height="18" alt=""/><div><small>${esc(f.tool)} · ${esc(f.id==='problem'?t().sourceOther:t().sourceEarlier)}</small><p>${esc(value(f))}</p></div><span aria-hidden="true">✓</span></div>`).join('');
    text('card-kicker',d().kicker);text('card-title',valid?d().title:state.mode==='nudge'?t().changedTitle:t().emptyTitle);
    text('card-explanation',valid?d().explanation:state.mode==='nudge'?t().changedBody:t().emptyBody);
    $('#context-facts').innerHTML=relevant.map(f=>`<button class="context-fact" data-source="${f.id}" aria-label="${esc(t().viewSource+': '+f[lang].title)}"><small><span class="fact-origin"><img src="${logo(f.tool)}" width="14" height="14" alt=""/>${esc(f.tool)}</span><span>${esc(f[lang].label)}</span></small><span>${esc(value(f))}</span><b aria-hidden="true">↗</b></button>`).join('');
    text('source-links',lang==='vi'?'Bấm vào một mẩu context để xem nguồn.':'Select a context card to inspect its source.');
    $('#counter-case').hidden=state.mode!=='nudge'||!valid;text('counter-case',d().counter||'');
    $('#review-actions').hidden=state.approved||!valid;$('#approve').disabled=!valid;text('approve-label',d().action);
    $('#approved-state').hidden=!state.approved;text('approved-copy',d().next);
    $('#draft-preview').hidden=!state.approved||state.mode!=='pull';
    text('draft-text',state.approved?relevant.map(f=>`${f[lang].label}: ${value(f)}`).join('\n'):'');
    $('#next-preview').hidden=!state.approved||state.mode!=='nudge';text('next-goal',d().result);text('next-action',d().nextStep);
    $('#result-label').hidden=!state.approved;
    text('result-label',state.mode==='pull'?t().draftTitle:t().nextTitle);
    $('#request-context').hidden=state.mode!=='pull'||state.approved;$('#request-context').disabled=!state.following;
    text('narration',!state.following?t().pausedNarration:state.approved?d().next:state.dismissed?t().silentBody:card&&!valid?(state.mode==='nudge'?t().changedBody:t().emptyBody):d().narration[stage]);
    text('timecode',`00:${String(Math.floor(elapsed/1000)).padStart(2,'0')} / 00:20`);
    $$('#timeline button').forEach((button,i)=>{button.style.setProperty('--progress',`${Math.max(0,Math.min(1,(elapsed-starts[i])/durations[i]))*100}%`);button.disabled=!state.following;if(stage===i)button.setAttribute('aria-current','step');else button.removeAttribute('aria-current');});
    $('#play-pause').disabled=!state.following;$('#replay').disabled=!state.following;
    const running=playing&&inView&&!document.hidden&&state.following&&elapsed<total;
    text('play-pause',running?'Ⅱ':'▶');$('#play-pause').setAttribute('aria-label',running?t().pause:t().play);
    $('#following-toggle').setAttribute('aria-pressed',String(state.following));
  }
  function renderLanguage(){
    document.documentElement.lang=lang;
    $$('[data-copy]').forEach(node=>node.textContent=t()[node.dataset.copy]);
    $$('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lang===lang)));
    $$('button[data-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===state.mode)));
    $('#demo-modes').setAttribute('aria-label',t().modeLabel);$('#need-options').setAttribute('aria-label',t().needLabel);
    $('#dismiss').setAttribute('aria-label',t().dismissLabel);$('#extension-trigger').setAttribute('aria-label',t().extensionLabel);
    for(const id of ['close-source','close-beta'])$('#'+id).setAttribute('aria-label',t().close);
    $('#replay').setAttribute('aria-label',t().replay);$('#timeline').setAttribute('aria-label',t().steps);
    $('#timeline').innerHTML=t().stepLabels.map((label,i)=>`<button data-step="${i}" aria-label="${i+1}. ${esc(label)}" title="${esc(label)}"></button>`).join('');
    renderChat();renderMemory();renderNeeds();render();
  }
  function stop(){if(frame!==null)cancelAnimationFrame(frame);frame=null;lastTime=null;}
  function tick(now){
    if(!playing||!inView||document.hidden||!state.following||state.approved||state.dismissed){stop();return;}
    if(lastTime!==null)elapsed=Math.min(total,elapsed+Math.min(now-lastTime,250));lastTime=now;
    const next=transition(state,{type:'ADVANCE',time:elapsed});
    // Update the card only at stage boundaries, not on every animation frame.
    if(next.stage!==state.stage){state=next;render();}
    text('timecode',`00:${String(Math.floor(elapsed/1000)).padStart(2,'0')} / 00:20`);
    $$('#timeline button').forEach((b,i)=>b.style.setProperty('--progress',`${Math.max(0,Math.min(1,(elapsed-starts[i])/durations[i]))*100}%`));
    if(elapsed>=total){playing=false;stop();render();return;}
    frame=requestAnimationFrame(tick);
  }
  function sync(){stop();render();if(playing&&inView&&!document.hidden&&state.following&&!state.approved&&!state.dismissed)frame=requestAnimationFrame(tick);}
  function seek(stage,play=false){if(!state.following)return;state=transition(state,{type:'SEEK',stage});elapsed=starts[state.stage];playing=play;sync();}
  function changeMode(mode){state=transition(state,{type:'MODE',mode});elapsed=0;playing=state.following&&!motion.matches;renderLanguage();sync();}
  const scrollDemo=()=>$('#demo').scrollIntoView({block:'start',behavior:motion.matches?'auto':'smooth'});
  function openSource(id,origin){
    const fact=facts.find(f=>f.id===id);if(!fact)return;
    selectedMemory=id;sourceArea=origin;playing=false;sync();
    text('source-title',fact[lang].title);text('source-meta',`${fact.tool} · Landing page · ${t().confirmed}`);text('source-quote',fact[lang].quote);
    $('#memory-edit').value=value(fact);$('#save-memory').disabled=false;$('#forget-memory').disabled=!memory[id].active;
    $('#memory-settings').open=!memory[id].active;
    text('save-memory',memory[id].active?t().saveMemory:t().restore);
    $('#source-dialog').showModal();
  }
  function closeSource(){
    $('#source-dialog').close();
    const target=$(`#${sourceArea} [data-source="${selectedMemory}"]`)||$('#extension-trigger');target.focus({preventScroll:true});
  }
  function invalidateApproval(){state={...state,approved:false};playing=false;renderMemory();sync();}
  $('#watch-demo').addEventListener('click',()=>seek(0,true));
  $$('button[data-mode]').forEach(b=>b.addEventListener('click',()=>changeMode(b.dataset.mode)));
  $$('[data-lang]').forEach(b=>b.addEventListener('click',()=>{lang=b.dataset.lang;renderLanguage();}));
  for(const id of ['request-context','extension-trigger','open-context'])$('#'+id).addEventListener('click',()=>seek(3));
  for(const id of ['dismiss','skip'])$('#'+id).addEventListener('click',()=>{state=transition(state,{type:'DISMISS'});playing=false;sync();$('#extension-trigger').focus({preventScroll:true});});
  $('#approve').addEventListener('click',()=>{if(!canUse(state,memory))return;state=transition(state,{type:'APPROVE'});elapsed=total;playing=false;sync();$('#approved-state').tabIndex=-1;$('#approved-state').focus({preventScroll:true});});
  $('#try-other').addEventListener('click',()=>changeMode(state.mode==='pull'?'nudge':'pull'));
  $('#following-toggle').addEventListener('click',()=>{state=transition(state,{type:'FOLLOW'});elapsed=0;playing=false;sync();});
  $('#play-pause').addEventListener('click',()=>{if(elapsed>=total||state.approved||state.dismissed){seek(0,true);return;}playing=!playing;sync();});
  $('#replay').addEventListener('click',()=>seek(0,true));
  $('#timeline').addEventListener('click',e=>{const b=e.target.closest('[data-step]');if(b)seek(Number(b.dataset.step));});
  for(const id of ['context-facts','memory-nodes'])$('#'+id).addEventListener('click',e=>{const b=e.target.closest('[data-source]');if(b)openSource(b.dataset.source,id);});
  $('#close-source').addEventListener('click',closeSource);
  $('#memory-edit').addEventListener('input',()=>{$('#save-memory').disabled=!$('#memory-edit').value.trim();});
    $('#save-memory').addEventListener('click',()=>{const edited=$('#memory-edit').value.trim().slice(0,200);if(!edited||!selectedMemory)return;const fact=facts.find(f=>f.id===selectedMemory);memory[selectedMemory].active=true;memory[selectedMemory].edits=edited===fact[lang].text?{}:{[lang]:edited};invalidateApproval();closeSource();});
  $('#forget-memory').addEventListener('click',()=>{if(!selectedMemory)return;memory[selectedMemory].active=false;invalidateApproval();closeSource();});
  $('#need-options').addEventListener('click',e=>{const b=e.target.closest('[data-need]');if(!b)return;need=Number(b.dataset.need);renderNeeds();$('#join-beta').focus({preventScroll:true});});
  $('#join-beta').addEventListener('click',()=>{if(need===null)return;if(need===3){scrollDemo();seek(0,true);return;}playing=false;sync();text('beta-selection',t().selection+t().needs[need]);$('#beta-dialog').showModal();});
  $('#close-beta').addEventListener('click',()=>$('#beta-dialog').close());
  $('#back-demo').addEventListener('click',()=>{$('#beta-dialog').close();scrollDemo();});
  for(const id of ['source-dialog','beta-dialog'])$('#'+id).addEventListener('click',e=>{if(e.target===$('#'+id))$('#'+id).close();});
  document.addEventListener('visibilitychange',sync);
  motion.addEventListener('change',()=>{if(motion.matches){playing=false;sync();}});
  renderLanguage();
  // Same-origin local composition: isolate demo CSS from the preserved landing.
  if(params.get('embed')==='1'&&window.parent!==window){
    const reportSize=()=>window.parent.postMessage({type:'wizzdom-demo-size',height:Math.ceil($('#demo').getBoundingClientRect().height+2)},location.origin);
    window.addEventListener('message',event=>{
      if(event.origin!==location.origin||event.source!==window.parent)return;
      if(event.data?.type==='wizzdom-demo-language'&&['vi','en'].includes(event.data.language)){
        lang=event.data.language;renderLanguage();reportSize();
      }
    });
    if('ResizeObserver' in window)new ResizeObserver(reportSize).observe($('#demo'));
    reportSize();window.parent.postMessage({type:'wizzdom-demo-ready'},location.origin);
  }
  if('IntersectionObserver' in window)new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;sync();},{threshold:.2}).observe($('#player'));else{inView=true;sync();}
})();
