(function(){'use strict';
const english = {};
document.querySelectorAll("[data-i18n]").forEach((node) => {
  english[node.dataset.i18n] = node.textContent;
});

const vietnamese = {
  navDemo: "Demo tương tác", navHow: "Cách hoạt động", navPrivacy: "Quyền riêng tư", navCta: "Chọn khoảnh khắc",
  heroEyebrow: "CHO AI THẤY TOÀN CẢNH", heroLineOne: "AI quên", heroLineTwo: "Rồi làm việc mù mờ", heroLineThree: "Bạn trả giá.",
  heroSub: "Wizzdom tìm lại quyết định và bài học từ các chat AI, lịch sử duyệt web để giúp bạn làm việc trước mắt.",
  heroPrimary: "Cho AI thấy toàn cảnh", heroSecondary: "Cách hoạt động ↓", heroMicro: "Demo 30 giây · Không truy cập dữ liệu của bạn",
  heroFlowSourcesLabel: "ĐIỀU AI ĐÃ QUÊN", heroFlowChat: "7 người kẹt ở bước thiết lập.", heroFlowClaude: "Sửa thiết lập trước analytics.", heroFlowBrowserLabel: "Duyệt web", heroFlowBrowser: "Checklist thiết lập · xem lại 4 lần",
  heroFlowRetrieve: "bị chôn trong các chat cũ", heroFlowNowLabel: "AI SẮP HÀNH ĐỘNG", heroFlowNow: "Build analytics dashboard tiếp theo.", heroFlowBlindspot: "KHÔNG THẤY 9 TÍN HIỆU TRƯỚC ĐÓ", heroFlowAnalyze: "wizzdom khôi phục toàn cảnh",
  heroFlowInsightLabel: "WIZZDOM NHẬN RA", heroFlowInsight: "Ưu tiên sửa onboarding.", heroFlowProof: "7 tín hiệu khách hàng + 2 quyết định cũ",
  bandOne: "AI quên lịch sử của bạn.", bandTwo: "AI hành động khi chỉ thấy một nửa.", bandThree: "Bạn trả bằng thời gian, token và bước đi sai.",
  costTitle: "Không chỉ bằng token.", costSub: "Thiếu lịch sử, bạn phải trả bằng…", costWork: "Làm lại việc cũ.", costWorkSub: "Giải thích lại. Xây lại. Lần nữa.", costMistake: "Lặp lại sai lầm.", costMistakeSub: "Hướng từng thất bại lại trông như mới.", costAutomate: "Tự động hóa sai việc.", costAutomateSub: "Đi nhanh hơn. Nhưng sai hướng.",
  labEyebrow: "THỬ TRONG 30 GIÂY", labTitle: "Bạn đang làm gì?", labSub: "Chọn vai. Đưa ra quyết định. Xem AI đã bỏ sót gì.",
  sampleWorkspace: "WORKSPACE MẪU", fictionalContext: "Context hư cấu", contextAvailable: "CONTEXT CÓ SẴN", currentGoal: "MỤC TIÊU HIỆN TẠI", whatsHappening: "ĐANG XẢY RA", railNote: "Các nguồn chỉ mang tính minh hoạ. Wizzdom không đọc thiết bị của bạn trong demo này.",
  chooseNext: "Bạn sẽ yêu cầu AI làm gì tiếp theo?", wizzdomNoticed: "WIZZDOM NHẬN RA", highConfidence: "ĐỘ TIN CẬY CAO", showEvidence: "Xem bằng chứng", whyNow: "VÌ SAO LÚC NÀY", useContext: "Dùng context này", continueAnyway: "Vẫn tiếp tục", beforeContext: "SUY NGHĨ HIỆN TẠI", afterContext: "ĐIỀU NÊN LÀM", wouldChange: "Insight này có làm thay đổi bước tiếp theo của bạn không?", definitely: "Chắc chắn", maybe: "Có thể", notReally: "Không hẳn", whereLives: "Context tương tự đang nằm ở đâu với bạn?", browserChats: "Chat trên browser", notesDocs: "Ghi chú & tài liệu", callsFeedback: "Calls & feedback", makeYours: "Áp dụng cho công việc của tôi", resetDemo: "↻ Thử khoảnh khắc khác",
  howEyebrow: "CÁCH WIZZDOM HOẠT ĐỘNG", howTitle: "Kết nối. Đối chiếu. Nhận ra.",
  howVisualBrowser: "Lịch sử duyệt web", howOneSmall: "KẾT NỐI", howOneTitle: "Chọn nguồn dữ liệu.", howOneBody: "Chat AI, lịch sử duyệt web, ghi chú. Bạn chọn nguồn được kết nối.",
  howVisualTask: "VIỆC HIỆN TẠI", howVisualTaskValue: "Lên kế hoạch sprint", howVisualContext: "BẰNG CHỨNG CŨ", howVisualContextValue: "9 tín hiệu trước đó", howVisualMatch: "ĐỐI CHIẾU", howTwoSmall: "TÌM LẠI + ĐỐI CHIẾU", howTwoTitle: "Tìm mảnh ghép còn thiếu.", howTwoBody: "Tìm lại quyết định và tín hiệu liên quan. Đối chiếu với việc đang làm.",
  howVisualEvidence: "7 TÍN HIỆU KHÁCH HÀNG", howVisualInsight: "Ưu tiên sửa onboarding.", howVisualSources: "Xem nguồn →", howThreeSmall: "PHÂN TÍCH + GỢI Ý", howThreeTitle: "Hành động có cơ sở.", howThreeBody: "Xem insight cùng bằng chứng trước bước tiếp theo. Bạn quyết định.",
  sourceEyebrow: "MỘT LỊCH SỬ. XUYÊN NHIỀU AI.", sourceTitle: "Khác công cụ. Liền mạch suy nghĩ.", sourceBody: "Nghiên cứu ở ChatGPT. Quyết định ở Claude. Bài học ở Codex. Wizzdom nối các mảnh ghép trên máy Mac.", mapResearch: "nghiên cứu", mapDecision: "quyết định", mapBuild: "xây dựng", mapBrowser: "Browser", mapSignals: "tín hiệu", mapLocal: "trên máy Mac", mapRightMoment: "ĐÚNG THỜI ĐIỂM", mapOneCard: "Insight còn thiếu",
  privacyEyebrow: "LOCAL-FIRST. BẠN KIỂM SOÁT.", privacyTitle: "Lịch sử nằm trên máy Mac của bạn.", privacyBody: "Cloud chỉ nhận task được chọn và bằng chứng liên quan. Bạn chọn nguồn, xem bằng chứng và dừng bất cứ lúc nào.", privacyConsoleLabel: "Quyền kiểm soát dữ liệu", userControlled: "BẠN KIỂM SOÁT", privacyOne: "Chọn từng nguồn và khoảng thời gian", privacyTwo: "Lịch sử gốc nằm trên máy Mac", privacyThree: "Xem bằng chứng dùng để phân tích", privacyFour: "Tạm dừng hoặc ngắt kết nối nguồn", privacyFive: "Claude chỉ đọc chat hiển thị khi bạn cấp quyền",
  applyEyebrow: "PRIVATE BETA · XÂY TỪ NHỮNG KHOẢNH KHẮC THẬT", applyTitle: "Wizzdom nên nhận ra điều gì cho bạn?", applyBody: "Mô tả một khoảnh khắc khi context bị thiếu làm giảm chất lượng quyết định tiếp theo. Những trường hợp mạnh nhất sẽ định hình cohort đầu tiên.", applyOne: "Một workflow thật xuyên một hoặc nhiều công cụ AI", applyTwo: "Mọi khoảnh khắc Wizzdom đều kèm bằng chứng", applyThree: "Chỉ tiếp tục nếu nó làm thay đổi một bước đi thật", formMoment: "Wizzdom nên nhận ra điều gì?", formOutcome: "Nó nên giúp bạn làm gì tiếp theo?", formEmail: "Email", formConsent: "Tôi có thể thử điều này trên một workflow thật trong private beta.", formSubmit: "Đăng ký private beta", formNote: "Flow thu thập prototype. Câu trả lời được lưu trong browser này cho tới khi backend tiếp nhận beta được kết nối.", formSuccess: "Khoảnh khắc của bạn đã được lưu trong browser. Kết nối endpoint tiếp nhận thật là bước launch tiếp theo.", footerLine: "Lịch sử của bạn. Đúng thời điểm. Một bước tiếp theo tốt hơn.", backTop: "Lên đầu trang ↑"
};


Object.assign(vietnamese, {
  pipelineTitle: "Wizzdom hoạt động thế nào?", pipelineSubtitle: "Từ lịch sử rời rạc đến bước đi đúng hơn.",
  pipelineGather: "Gom lịch sử của bạn", pipelineLocal: "Lịch sử lưu trên Mac của bạn", pipelineGatherBody: "Chat AI + lịch sử duyệt web. Bạn chọn nguồn để nhập.",
  pipelineAnalyze: "Sắp xếp & phân tích", pipelineOrganize: "Tìm cấu trúc & mối liên hệ", pipelineGoals: "Mục tiêu của bạn", pipelineDecisions: "Quyết định trước đây", pipelineLessons: "Bài học & quy luật", pipelineAnalyzeBody: "Nối quyết định, bài học và quy luật—không chỉ từ khóa.",
  pipelineMatch: "Tìm đúng điều cần lúc này", pipelineTask: "Việc bạn đang làm", pipelineRelevantDecision: "Quyết định liên quan", pipelineRelevantLesson: "Bài học liên quan", pipelineMatchBody: "Tìm lại bằng chứng liên quan đến việc bạn đang làm.",
  pipelineHelp: "Gợi ý bước tiếp theo", pipelineAdvice: "Insight đúng lúc. Bước đi rõ hơn.", pipelineWhy: "Vì sao quan trọng", pipelineNext: "Nên làm gì tiếp", pipelineEvidence: "Kèm nguồn để đối chiếu", pipelineHelpBody: "Insight, bằng chứng và gợi ý bước tiếp theo. Bạn quyết định.", pipelineExample: "Minh họa cách Wizzdom hoạt động", pipelineTry: "Khám phá các tình huống",
  howEyebrow: "NGƯỜI ĐỒNG HÀNH TINH Ý CỦA BẠN", wisdomTitleOne: "Nhìn ra mối liên hệ.", wisdomTitleTwo: "Giúp đúng lúc.", wisdomCurrent: "Bạn đang sửa lỗi đăng nhập.", wisdomExample: "Ví dụ hư cấu", wisdomPatch: "Cùng cách sửa. Đã thử hai lần.", wisdomBrowser: "Lịch sử duyệt web", wisdomIncident: "Báo cáo sự cố: lệch đồng hồ.", wisdomNotes: "Ghi chú của bạn", wisdomDeadline: "Release vào thứ Sáu.", wisdomTiming: "Nhắc bạn một chút", wisdomVoice: "Trước khi bạn thử lại…", wisdomAdvice: "Bạn đã thử cách này hai lần. Hãy kiểm tra đồng hồ thiết bị trước khi retry.", wisdomEvidence: "2 lần sửa cũ + báo cáo sự cố", wisdomTry: "Thử tình huống này", wisdomRememberTitle: "Chú tâm.", wisdomRememberBody: "Nhớ xuyên suốt các nguồn bạn chọn.", wisdomConnectTitle: "Tinh ý.", wisdomConnectBody: "Đối chiếu bằng chứng cũ với việc hiện tại.", wisdomHelpTitle: "Hữu ích.", wisdomHelpBody: "Gợi ý bước tốt hơn. Bạn quyết định.",
  heroPrimary: "Thử Wizzdom ngay!", exampleTitle: "Wizzdom tìm lại những mảnh ghép còn thiếu.",
  heroSub: "Wizzdom kết nối điều bạn đã biết với việc bạn đang làm.", heroExample: "Ví dụ hư cấu", replay: "Xem lại", heroNow: "Bạn hỏi AI", heroPrompt: "“Lên kế hoạch analytics dashboard.”", heroMemoryOne: "7 người kẹt ở bước thiết lập", heroMemoryTwo: "Ưu tiên sửa thiết lập", heroRemembers: "Wizzdom tìm lại bằng chứng", heroInsight: "“Sửa thiết lập trước khi thêm tính năng.”", heroOld: "Build dashboard", heroNew: "Sửa thiết lập",
  chooseNext: "Bạn sẽ làm gì tiếp theo?", moreBackground: "Xem bối cảnh", showEvidence: "Xem 3 nguồn", demoDisclaimer: "Không truy cập dữ liệu của bạn.", fictionalContext: "Tình huống hư cấu",
  howConnect: "Kết nối", howMatch: "Đối chiếu", howInsight: "Insight", howVisualSources: "Xem nguồn trong demo",
  applyEyebrow: "CÙNG XÂY PRIVATE BETA", applyBody: "Mang đến một tình huống thật. Cùng định hình cohort đầu tiên.", formMoment: "Bạn muốn Wizzdom nhắc điều gì trước khi quá muộn?", formStepOne: "1 / 2 · Tình huống của bạn", formStepTwo: "2 / 2 · Bước tiếp theo", formNext: "Tiếp tục →", formBack: "← Sửa tình huống", formSubmit: "Lưu mong muốn tham gia beta", formNote: "Prototype: chỉ lưu trong browser này. Chưa kết nối đăng ký beta thật.", formSuccess: "Đã lưu trong browser này. Đây chưa phải đăng ký beta."
});
Object.assign(vietnamese, {
  navCta: "Thử ngay", labMobileTitle: "Thử Wizzdom", changeRole: "Đổi vai trò", applyTitle: "Đừng trả giá lần nữa cho điều bạn đã biết.", applyBody: "Wizzdom tìm lại quyết định, bài học và chi tiết bị bỏ sót—trước khi bạn đi sai thêm một bước.", makeYours: "Thử Wizzdom ngay!", betaCta: "Thử Wizzdom ngay!", betaTitle: "Đăng ký dùng thử Wizzdom", betaEasy: "Đăng ký nhận lời mời beta. Chỉ vài lựa chọn + email.",
  betaRoleQ: "Bạn làm công việc gì?", betaProduct: "Sản phẩm", betaDev: "Developer", betaResearch: "Nghiên cứu", betaBusiness: "Chủ business", betaPersonal: "Cá nhân", betaNeedQ: "Điều gì hữu ích nhất với bạn?", betaDecisions: "Đưa ra quyết định tốt hơn", betaRework: "Không lặp việc cũ hoặc sai lầm", betaCommitments: "Nhớ những chi tiết quan trọng", betaPatterns: "Nối ý tưởng, nhìn ra quy luật", betaExplore: "Tôi muốn khám phá thử", betaEmailQ: "Nhận lời mời qua email nào?", betaToolsQ: "Bạn đang dùng AI nào? (không bắt buộc)", betaOther: "Khác", betaConsent: "Đăng ký nghĩa là bạn đồng ý nhận liên hệ về beta. Không spam.", betaBack: "← Quay lại", betaSkip: "Bỏ qua →", betaSubmit: "Đăng ký dùng thử", betaSuccessTitle: "Bạn đã có trong danh sách.", betaSuccessBody: "Chúng tôi sẽ liên hệ khi có đợt beta phù hợp với bạn.", betaDone: "Xong"
});
Object.assign(english, {betaConsent: "We save your email, selected profile and demo result to organise the beta and contact you. No spam."});
Object.assign(vietnamese, {betaConsent: "Chúng tôi lưu email, hồ sơ đã chọn và kết quả demo để tổ chức beta và liên hệ với bạn. Không spam.", betaResearchConsent: "Tôi đồng ý chia sẻ các lượt bấm trong demo và nguồn giới thiệu để giúp cải thiện Wizzdom. Không bắt buộc."});
    const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
    let currentLanguage='vi',currentPersona='product',betaStep=1,betaRole='unknown',betaNeed='explore',betaBusy=false,betaComplete=false;
    const betaTools=new Set();
    const journey={id:crypto.randomUUID(),started_at:new Date().toISOString(),events:[]};
    const betaSubmissionId=crypto.randomUUID();
    function track(type, detail = {}) {
  const signal = { id: crypto.randomUUID(), type, persona: currentPersona, language: currentLanguage, timestamp: new Date().toISOString(), properties: detail };
  journey.events.push(signal);
  journey.events = journey.events.slice(-99);
  window.dispatchEvent(new CustomEvent("wizzdom:demand-signal", { detail: signal }));
}

function researchSession() {
  const width = window.innerWidth;
  let referrer_host = null;
  try { referrer_host = document.referrer ? new URL(document.referrer).hostname : null; } catch { /* No referrer. */ }
  const params = new URLSearchParams(window.location.search);
  const attribution = {};
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
    const value = params.get(key);
    if (value && /^[\w .:/-]{1,100}$/.test(value)) attribution[key] = value;
  }
  return {id:journey.id, started_at:journey.started_at, page_path:"/", referrer_host, attribution, device_type:width<650?"mobile":width<1024?"tablet":"desktop", viewport_bucket:width<650?"small":width<1024?"medium":"large"};
}


    Object.assign(vietnamese,{
      integrationHeadline:'Wizzdom nhắc điều bạn và AI đang bỏ sót.',
      integrationLineOne:'AI quên.',integrationLineTwo:'Nó vẫn tiếp tục.',integrationLineThree:'Bạn trả giá.',
      integrationBody:'Wizzdom nối quyết định, bài học và chi tiết từ các chat trước với việc bạn đang làm cùng AI — rồi nhắc khi chúng quan trọng.',
      scenarioEngineer:"Developer",scenarioProduct:"Sản phẩm",scenarioBusiness:"Kinh doanh",scenarioResearch:"Nghiên cứu",scenarioCreator:"Creator",scenarioPersonal:"Cá nhân",
      valueDirection:"Chọn đúng việc",valueRepeat:"Không lặp sai lầm",valueConstraint:"Nhớ điều quan trọng"
    });
    vietnamese.navDownload='Tải Wizzdom';vietnamese.navGetDesktop='Tải bản beta';
    const frame=$('#wizzdom-demo-frame');
    let selectedDemoCase='engineer';currentPersona=selectedDemoCase;
    const demoChoices=$$('[data-demo-case]');
    function sendCase(){frame.contentWindow?.postMessage({type:'wizzdom-demo-case',caseId:selectedDemoCase},location.origin);}
    demoChoices.forEach(button=>button.addEventListener('click',()=>{
      selectedDemoCase=button.dataset.demoCase;currentPersona=selectedDemoCase;track('persona_selected');
      demoChoices.forEach(choice=>choice.setAttribute('aria-pressed',String(choice===button)));
      sendCase();
      if(matchMedia('(max-width: 900px)').matches)$('#lab').scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
    }));
    function sendLanguage(){frame.contentWindow?.postMessage({type:'wizzdom-demo-language',language:currentLanguage},location.origin);}
    function setLanguage(language){
      currentLanguage=language==='en'?'en':'vi';document.documentElement.lang=currentLanguage;
      $$('[data-i18n]').forEach(node=>{const key=node.dataset.i18n;node.textContent=currentLanguage==='vi'?(vietnamese[key]||english[key]):english[key];});
      $$('[data-language]').forEach(button=>{const active=button.dataset.language===currentLanguage;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});
      document.title=currentLanguage==='vi'?'wizzdom — Người đồng hành xuyên các chat AI':'wizzdom — Your companion across AI chats';try{localStorage.setItem('wizzdom-language',currentLanguage);}catch{};
      renderBetaStep(false);sendLanguage();
    }
    $$('[data-language]').forEach(button=>button.addEventListener('click',()=>setLanguage(button.dataset.language)));
    frame.addEventListener('load',sendLanguage);
    window.addEventListener('message',event=>{
      if(event.origin!==location.origin||event.source!==frame.contentWindow)return;
      if(event.data?.type==='wizzdom-demo-size'&&Number.isFinite(event.data.height))frame.style.height=Math.max(240,Math.min(2400,event.data.height))+'px';
      if(event.data?.type==='wizzdom-demo-ready'){sendLanguage();sendCase();}
    });
    function renderBetaStep(focus = true) {
  if (focus && !betaComplete) track("beta_step_viewed", {step:betaStep});
  $("#beta-progress").textContent = `${betaStep} / 3`;
  $("#beta-progress").hidden = betaComplete;
  $("#demand-form").hidden = betaComplete;
  $("#beta-success").hidden = !betaComplete;
  $$("[data-beta-step]").forEach(node => { node.hidden = Number(node.dataset.betaStep) !== betaStep; });
  $("#beta-back").hidden = betaStep === 1;
  $("#beta-skip").hidden = betaStep === 3;
  $("#beta-submit").hidden = betaStep !== 3;
  $$("[data-beta-role]").forEach(node => node.setAttribute("aria-pressed", String(node.dataset.betaRole === betaRole)));
  $$("[data-beta-need]").forEach(node => node.setAttribute("aria-pressed", String(node.dataset.betaNeed === betaNeed)));
  $$("[data-beta-tool]").forEach(node => node.setAttribute("aria-pressed", String(betaTools.has(node.dataset.betaTool))));
  if (focus && !betaComplete) {
    const legend = $(`[data-beta-step="${betaStep}"] legend`);
    legend.focus({preventScroll: true});
    $(".beta-body").scrollTop = 0;
  }
}
function syncDialogViewport() {
  const view = window.visualViewport;
  const height = view?.height || window.innerHeight;
  const top = window.matchMedia("(max-width: 650px)").matches ? 12 : Math.min(80, height * .1);
  $("#beta-dialog").style.setProperty("--dialog-top", `${(view?.offsetTop || 0) + top}px`);
  $("#beta-dialog").style.setProperty("--dialog-height", `${Math.max(180, height - top - 12)}px`);
}
function openBeta(fromDemo = false) {
  if (fromDemo && !betaComplete) {
    betaRole = currentPersona;
    betaStep = 2;
    $$(".source-chips button.active").forEach(node => {
      if (["chatgpt", "claude", "codex"].includes(node.dataset.source)) betaTools.add(node.dataset.source);
    });
  }
  renderBetaStep(false);
  syncDialogViewport();
  const dialog = $("#beta-dialog");
  if (!dialog.open) dialog.showModal();
  document.body.classList.add("beta-is-open");
  renderBetaStep();
  track("beta_opened", {from_demo: fromDemo});
}
$$("[data-open-beta]").forEach(node => node.addEventListener("click", event => { event.preventDefault(); openBeta(); }));
$$("[data-close-beta]").forEach(node => node.addEventListener("click", () => $("#beta-dialog").close()));
$("#beta-dialog").addEventListener("close", () => document.body.classList.remove("beta-is-open"));
$("#beta-dialog").addEventListener("click", event => { if (event.target === $("#beta-dialog")) $("#beta-dialog").close(); });
window.visualViewport?.addEventListener("resize", syncDialogViewport);
window.addEventListener("resize", () => { if ($("#beta-dialog").open) syncDialogViewport(); });
$$("[data-beta-role]").forEach(node => node.addEventListener("click", () => { betaRole = node.dataset.betaRole; track("beta_role_selected",{role:betaRole}); betaStep = 2; renderBetaStep(); }));
$$("[data-beta-need]").forEach(node => node.addEventListener("click", () => { betaNeed = node.dataset.betaNeed; track("beta_need_selected",{need:betaNeed}); betaStep = 3; renderBetaStep(); }));
$$("[data-beta-tool]").forEach(node => node.addEventListener("click", () => {
  const tool = node.dataset.betaTool;
  betaTools.has(tool) ? betaTools.delete(tool) : betaTools.add(tool);
  track("beta_tool_toggled",{tool,selected:betaTools.has(tool)});
  renderBetaStep(false);
}));
$("#beta-back").addEventListener("click", () => { betaStep = Math.max(1, betaStep - 1); renderBetaStep(); });
$("#beta-skip").addEventListener("click", () => { betaStep = Math.min(3, betaStep + 1); renderBetaStep(); });
$("#beta-email").addEventListener("input", () => { $("#beta-error").hidden = true; });

$("#demand-form").addEventListener("submit", async event => {
  event.preventDefault();
  if (betaBusy || betaComplete) return;
  if (betaStep < 3) { betaStep += 1; renderBetaStep(); return; }
  const field = $("#beta-email");
  if (!field.reportValidity()) return;
  track("beta_submit_attempt");
  const shareResearch = $("#beta-research-consent").checked;
  betaBusy = true;
  $("#beta-submit").disabled = true;
  $("#demand-form").setAttribute("aria-busy", "true");
  $("#beta-error").hidden = true;
  $("#beta-submit").textContent = currentLanguage === "vi" ? "Đang đăng ký…" : "Joining…";
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch("/api/beta", {
      method: "POST", headers: {"Content-Type": "application/json"}, signal: controller.signal,
      body: JSON.stringify({
        email: field.value.trim(), role: betaRole, need: betaNeed, tools: [...betaTools],
        language: currentLanguage, consent: true, website: event.currentTarget.elements.website.value,
        submission_id: betaSubmissionId, research_consent: shareResearch,
        session: shareResearch ? researchSession() : null, events: shareResearch ? journey.events : [],
        context_sources: [],
        demo: {persona: selectedDemoCase}
      })
    });
    const result = await response.json();
    if (!response.ok || result.ok !== true) throw new Error("signup_failed");
    betaComplete = true;
    field.value = "";
    renderBetaStep(false);
    $("#beta-success button").focus({preventScroll: true});
    track("beta_signup_completed", {role: betaRole, need: betaNeed, tools: [...betaTools]});
  } catch {
    $("#beta-error").textContent = currentLanguage === "vi" ? "Chưa gửi được. Vui lòng thử lại; email của bạn vẫn ở đây." : "Couldn’t send yet. Please try again; your email is still here.";
    $("#beta-error").hidden = false;
  } finally {
    clearTimeout(timeout);
    betaBusy = false;
    $("#beta-submit").disabled = false;
    $("#demand-form").setAttribute("aria-busy", "false");
    $("#beta-submit").textContent = currentLanguage === "vi" ? vietnamese.betaSubmit : english.betaSubmit;
  }
});

    const motion=matchMedia('(prefers-reduced-motion: reduce)');
    if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){if(!motion.matches)$('#pipeline').classList.add('is-awake');observer.disconnect();}},{threshold:.25});observer.observe($('#pipeline'));}
    let initial=new URLSearchParams(location.search).get('lang');if(!['vi','en'].includes(initial)){try{initial=localStorage.getItem('wizzdom-language');}catch{}}if(!['vi','en'].includes(initial))initial=navigator.language?.toLowerCase().startsWith('vi')?'vi':'en';setLanguage(initial);
  })();