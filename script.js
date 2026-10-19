const english = {};
document.querySelectorAll("[data-i18n]").forEach((node) => {
  english[node.dataset.i18n] = node.textContent;
});

const vietnamese = {
  navDemo: "Demo tương tác", navHow: "Cách hoạt động", navPrivacy: "Quyền riêng tư", navCta: "Chọn khoảnh khắc",
  heroEyebrow: "AI QUÊN. RỒI HÀNH ĐỘNG TRONG MÙ MỜ.", heroTitle: "Bạn là người trả giá.",
  heroSub: "Không chỉ bằng token. Mà bằng công việc phải làm lại, pattern bị bỏ lỡ, constraint bị quên và những quyết định đầy tự tin nhưng thiếu phần lịch sử bạn đã có. Wizzdom đưa quyết định, bài học và tín hiệu còn thiếu trở lại trước bước tiếp theo.",
  heroPrimary: "Cho AI thấy toàn cảnh", heroSecondary: "Cách hoạt động ↓", heroMicro: "Demo tương tác · Context hư cấu · Không truy cập dữ liệu trên thiết bị của bạn",
  heroFlowSourcesLabel: "NHỮNG ĐIỀU AI ĐÃ QUÊN", heroFlowChat: "“Onboarding là điểm nghẽn.”", heroFlowClaude: "“Fix activation trước analytics.”", heroFlowBrowserLabel: "LỊCH SỬ DUYỆT WEB", heroFlowBrowser: "Xem lại tài liệu dashboard · 4 lần",
  heroFlowRetrieve: "bị chôn trong các chat cũ", heroFlowNowLabel: "AI SẮP HÀNH ĐỘNG", heroFlowNow: "Build analytics dashboard tiếp theo.", heroFlowBlindspot: "KHÔNG THẤY 9 TÍN HIỆU TRƯỚC ĐÓ", heroFlowAnalyze: "wizzdom khôi phục toàn cảnh",
  heroFlowInsightLabel: "TRƯỚC BƯỚC TIẾP THEO", heroFlowInsight: "Ưu tiên sửa onboarding.", heroFlowProof: "7 tín hiệu khách hàng + 2 quyết định trước đó",
  bandOne: "AI quên lịch sử của bạn.", bandTwo: "AI hành động khi chỉ thấy một nửa.", bandThree: "Bạn trả bằng thời gian, token và bước đi sai.",
  labEyebrow: "PHÒNG THỬ NGHIỆM KHOẢNH KHẮC CONTEXT", labTitle: "Chọn vai bạn đang đảm nhận.", labSub: "Bạn sẽ đọc một tình huống hư cấu, chọn prompt tiếp theo và trải nghiệm context Wizzdom có thể mang trở lại.",
  sampleWorkspace: "WORKSPACE MẪU", fictionalContext: "Context hư cấu", contextAvailable: "CONTEXT CÓ SẴN", currentGoal: "MỤC TIÊU HIỆN TẠI", whatsHappening: "ĐANG XẢY RA", railNote: "Các nguồn chỉ mang tính minh hoạ. Wizzdom không đọc thiết bị của bạn trong demo này.",
  progressLabel: "CHỌN · NHẬN RA · CHỌN LẠI", youreAboutToAsk: "BẠN SẮP HỎI AI", chooseNext: "Bạn sẽ yêu cầu AI làm gì tiếp theo?", wizzdomNoticed: "WIZZDOM NHẬN RA", highConfidence: "ĐỘ TIN CẬY CAO", showEvidence: "Xem bằng chứng", whyNow: "VÌ SAO LÚC NÀY", useContext: "Dùng context này", continueAnyway: "Vẫn tiếp tục", beforeContext: "SUY NGHĨ HIỆN TẠI", afterContext: "ĐIỀU NÊN LÀM", wouldChange: "Insight này có làm thay đổi bước tiếp theo của bạn không?", definitely: "Chắc chắn", maybe: "Có thể", notReally: "Không hẳn", whereLives: "Context tương tự đang nằm ở đâu với bạn?", browserChats: "Chat trên browser", notesDocs: "Ghi chú & tài liệu", callsFeedback: "Calls & feedback", makeYours: "Áp dụng cho công việc của tôi", resetDemo: "↻ Thử khoảnh khắc khác",
  howEyebrow: "TỪ AUTOMATION MÙ MỜ ĐẾN HÀNH ĐỘNG CÓ CƠ SỞ", howTitle: "Cho mỗi AI phần lịch sử nó cần trước khi hành động.",
  howVisualBrowser: "Lịch sử duyệt web", howOneSmall: "KẾT NỐI", howOneTitle: "Bạn chọn những gì Wizzdom có thể ghi nhớ.", howOneBody: "Kết nối các cuộc chat AI, lịch sử duyệt web, ghi chú và những nguồn công việc khác bạn chọn. Lịch sử đã import nằm cục bộ trên máy Mac.",
  howVisualTask: "VIỆC ĐANG LÀM", howVisualTaskValue: "Lên kế hoạch sprint", howVisualContext: "CONTEXT LIÊN QUAN", howVisualContextValue: "9 tín hiệu trước đó", howVisualMatch: "ĐỐI CHIẾU", howTwoSmall: "TÌM LẠI + ĐỐI CHIẾU", howTwoTitle: "Wizzdom tìm phần liên quan đến việc trước mắt.", howTwoBody: "Wizzdom tìm lại quyết định, constraint, tín hiệu lặp lại và những thread chưa hoàn tất, rồi đối chiếu với prompt hoặc task hiện tại.",
  howVisualEvidence: "7 TÍN HIỆU KHÁCH HÀNG", howVisualInsight: "Ưu tiên sửa onboarding.", howVisualSources: "Xem nguồn →", howThreeSmall: "PHÂN TÍCH + ĐƯA RA", howThreeTitle: "Wizzdom đưa ra insight cùng bằng chứng phía sau.", howThreeBody: "Wizzdom phân tích sự liên quan và chỉ xuất hiện khi insight có thể thay đổi bước tiếp theo. Bạn vẫn là người quyết định.",
  sourceEyebrow: "TOÀN CẢNH KHÔNG NẰM TRONG MỘT CUỘC CHAT", sourceTitle: "Điều AI không nhìn thấy thường lại là phần quan trọng nhất.", sourceBody: "Wizzdom kết nối những cuộc trò chuyện bạn chọn trên browser và desktop với quyết định, constraint và outcome được lưu cục bộ trên máy Mac.", mapResearch: "nghiên cứu", mapDecision: "quyết định", mapBuild: "xây dựng", mapBrowser: "Browser", mapSignals: "tín hiệu", mapLocal: "context cục bộ", mapRightMoment: "ĐÚNG KHOẢNH KHẮC", mapOneCard: "Một card có bằng chứng",
  privacyEyebrow: "LOCAL-FIRST, KHÔNG PHẢI HỘP ĐEN", privacyTitle: "Biết Wizzdom đang biết gì. Biết điều gì rời khỏi thiết bị.", privacyBody: "Lịch sử đã import và Knowledge Tree nằm trên máy Mac. Khi một khoảnh khắc cần cloud reasoning, chỉ moment được chọn và bằng chứng liên quan được gửi đi. Bạn có thể pause nguồn, xem bằng chứng hoặc từ chối mọi gợi ý.", userControlled: "BẠN KIỂM SOÁT", privacyOne: "Chọn từng nguồn và khoảng thời gian", privacyTwo: "Lịch sử gốc đã import nằm trên máy Mac", privacyThree: "Xem trước bằng chứng dùng để reasoning", privacyFour: "Pause hoặc ngắt kết nối bất kỳ nguồn nào", privacyFive: "Không screen scraping hoặc âm thầm hành động",
  applyEyebrow: "PRIVATE BETA · XÂY TỪ NHỮNG KHOẢNH KHẮC THẬT", applyTitle: "Wizzdom nên nhận ra điều gì cho bạn?", applyBody: "Mô tả một khoảnh khắc khi context bị thiếu làm giảm chất lượng quyết định tiếp theo. Những trường hợp mạnh nhất sẽ định hình cohort đầu tiên.", applyOne: "Một workflow thật xuyên một hoặc nhiều công cụ AI", applyTwo: "Mọi khoảnh khắc Wizzdom đều kèm bằng chứng", applyThree: "Chỉ tiếp tục nếu nó làm thay đổi một bước đi thật", formMoment: "Wizzdom nên nhận ra điều gì?", formOutcome: "Nó nên giúp bạn làm gì tiếp theo?", formEmail: "Email", formConsent: "Tôi có thể thử điều này trên một workflow thật trong private beta.", formSubmit: "Đăng ký private beta", formNote: "Flow thu thập prototype. Câu trả lời được lưu trong browser này cho tới khi backend tiếp nhận beta được kết nối.", formSuccess: "Khoảnh khắc của bạn đã được lưu trong browser. Kết nối endpoint tiếp nhận thật là bước launch tiếp theo.", footerLine: "Lịch sử của bạn. Đúng thời điểm. Một bước tiếp theo tốt hơn.", backTop: "Lên đầu trang ↑"
};

const scenarios = {
  product: {
    en: {
      label: "Building a product", blurb: "Decisions scattered across calls and chats",
      goal: "Improve activation before the next release.", situation: "A customer just requested an analytics dashboard. Your team has two weeks for the next experiment.",
      sources: [["Customer calls", "7 signals"], ["Product decision", "12 days ago"], ["Previous experiment", "4 weekly users"]],
      ask: "What should we build next?", choices: ["Plan the analytics dashboard", "Turn the request into a product spec", "Ask AI to prioritize from this thread"],
      title: "This may solve the wrong bottleneck.", body: "Seven of your last nine customer conversations ended with users getting stuck during setup. The previous dashboard experiment had only four weekly users.",
      evidence: [["Customer calls", "7 of 9 users failed before reaching analytics."], ["Experiment", "The dashboard prototype had four weekly users."], ["Decision", "Your team agreed: activation before reporting."]],
      why: "You’re about to spend the next experiment on a feature downstream of the current bottleneck.", before: "Build the dashboard", after: "Test the activation bottleneck", form: "When a new feature request pulls me away from the bottleneck we already identified…"
    },
    vi: {
      label: "Xây dựng sản phẩm", blurb: "Quyết định phân mảnh giữa calls và chats",
      goal: "Cải thiện activation trước release tiếp theo.", situation: "Một khách hàng vừa yêu cầu analytics dashboard. Team có hai tuần cho experiment tiếp theo.",
      sources: [["Customer calls", "7 tín hiệu"], ["Product decision", "12 ngày trước"], ["Experiment trước", "4 weekly users"]],
      ask: "Chúng ta nên build gì tiếp theo?", choices: ["Lên kế hoạch cho analytics dashboard", "Biến yêu cầu thành product spec", "Nhờ AI ưu tiên từ thread hiện tại"],
      title: "Có thể bạn đang giải sai bottleneck.", body: "7 trong 9 customer conversations gần nhất kết thúc khi user mắc kẹt ở bước setup. Dashboard experiment trước chỉ có bốn weekly users.",
      evidence: [["Customer calls", "7/9 user thất bại trước khi chạm tới analytics."], ["Experiment", "Dashboard prototype chỉ có bốn weekly users."], ["Decision", "Team đã thống nhất: activation trước reporting."]],
      why: "Bạn sắp dùng experiment tiếp theo cho một feature nằm sau bottleneck hiện tại.", before: "Build dashboard", after: "Test bottleneck activation", form: "Khi một feature request mới kéo tôi lệch khỏi bottleneck mà team đã xác định…"
    }
  },
  engineer: {
    en: {
      label: "Writing software", blurb: "Previous fixes and constraints get lost",
      goal: "Fix intermittent authentication failures before Friday.", situation: "The current coding thread suggests retrying token refresh. Two similar patches shipped before.",
      sources: [["Codex threads", "2 prior fixes"], ["Incident review", "root cause"], ["Git history", "2 regressions"]],
      ask: "How should I fix the token refresh failure?", choices: ["Generate a retry patch", "Add more logging to the handler", "Explain and rewrite the handler"],
      title: "You tried this fix twice already.", body: "Both retry patches reduced the error temporarily, then regressed. The last incident review identified device clock skew—not token refresh—as the root cause.",
      evidence: [["Codex", "Two earlier threads proposed the same retry."], ["Git", "Both patches were reverted after regressions."], ["Incident review", "Clock skew invalidated otherwise valid tokens."]],
      why: "Another retry may hide the failure until after Friday’s release.", before: "Patch token refresh again", after: "Test clock skew first", form: "When I’m about to repeat a code fix that already failed in another thread…"
    },
    vi: {
      label: "Viết phần mềm", blurb: "Fix cũ và constraint dễ bị bỏ quên",
      goal: "Fix lỗi authentication chập chờn trước thứ Sáu.", situation: "Coding thread hiện tại đề xuất retry token refresh. Hai patch tương tự đã từng được ship.",
      sources: [["Codex threads", "2 fix trước"], ["Incident review", "root cause"], ["Git history", "2 regression"]],
      ask: "Nên fix lỗi token refresh thế nào?", choices: ["Tạo retry patch", "Thêm logging vào handler", "Giải thích và viết lại handler"],
      title: "Bạn đã thử fix này hai lần.", body: "Cả hai retry patch đều tạm giảm lỗi rồi regress. Incident review gần nhất xác định root cause là device clock skew—không phải token refresh.",
      evidence: [["Codex", "Hai thread trước đã đề xuất cùng một retry."], ["Git", "Cả hai patch bị revert sau regression."], ["Incident review", "Clock skew làm token hợp lệ bị invalid."]],
      why: "Một retry khác có thể che lỗi tới sau release thứ Sáu.", before: "Patch token refresh lần nữa", after: "Test clock skew trước", form: "Khi tôi sắp lặp lại một code fix đã thất bại trong thread khác…"
    }
  },
  research: {
    en: {
      label: "Researching a question", blurb: "Important evidence conflicts across sources",
      goal: "Evaluate whether AI tutors improve learning.", situation: "You have notes from 12 studies and need to write the conclusion for tomorrow.",
      sources: [["Paper notes", "12 studies"], ["Research criteria", "30-day recall"], ["Claude chat", "counter-evidence"]],
      ask: "Write the conclusion: AI tutors improve learning outcomes.", choices: ["Draft the executive summary", "Turn the conclusion into slides", "Write a confident recommendation"],
      title: "Your strongest evidence doesn’t support that conclusion yet.", body: "Most positive studies measured engagement, not learning. You defined success as recall after 30 days—and only two studies measured it.",
      evidence: [["Criteria", "Your evaluation plan defined 30-day recall as success."], ["Study set", "Ten studies measured engagement or completion."], ["Counter-evidence", "One of two recall studies found no significant gain."]],
      why: "The conclusion is about to become more certain than the evidence behind it.", before: "Confirm the expected answer", after: "Separate engagement from learning", form: "When the conclusion I’m writing is stronger than the evidence across my sources…"
    },
    vi: {
      label: "Nghiên cứu một câu hỏi", blurb: "Bằng chứng quan trọng mâu thuẫn giữa các nguồn",
      goal: "Đánh giá AI tutor có cải thiện việc học không.", situation: "Bạn có notes từ 12 nghiên cứu và cần viết conclusion cho ngày mai.",
      sources: [["Paper notes", "12 nghiên cứu"], ["Research criteria", "nhớ sau 30 ngày"], ["Claude chat", "bằng chứng ngược"]],
      ask: "Viết conclusion: AI tutor cải thiện learning outcomes.", choices: ["Draft executive summary", "Biến conclusion thành slides", "Viết recommendation chắc chắn"],
      title: "Bằng chứng mạnh nhất chưa ủng hộ conclusion đó.", body: "Phần lớn nghiên cứu tích cực đo engagement, không đo learning. Bạn định nghĩa success là nhớ sau 30 ngày—và chỉ hai nghiên cứu đo điều đó.",
      evidence: [["Criteria", "Evaluation plan định nghĩa success là nhớ sau 30 ngày."], ["Study set", "10 nghiên cứu đo engagement hoặc completion."], ["Bằng chứng ngược", "Một trong hai recall study không tìm thấy cải thiện đáng kể."]],
      why: "Conclusion sắp trở nên chắc chắn hơn bằng chứng đứng sau nó.", before: "Xác nhận câu trả lời mong đợi", after: "Tách engagement khỏi learning", form: "Khi conclusion tôi đang viết mạnh hơn evidence nằm rải rác giữa các nguồn…"
    }
  },
  business: {
    en: {
      label: "Growing a business", blurb: "Signals and commitments hide in conversations",
      goal: "Accept valuable work without repeating cash-flow mistakes.", situation: "A long-term client asks you to begin an urgent project on Monday. Your team has room.",
      sources: [["Client notes", "payment history"], ["Invoice", "45 days late"], ["Operating rule", "50% deposit"]],
      ask: "Write a friendly reply confirming we’ll start Monday.", choices: ["Draft the acceptance email", "Schedule the kickoff", "Promise a Monday start"],
      title: "One condition is missing.", body: "This client has a $12,400 invoice overdue by 45 days. After the last delay, you set a rule: no new work without clearing the balance and collecting a 50% deposit.",
      evidence: [["Invoice", "$12,400 remains unpaid after 45 days."], ["Project review", "The previous delay created a payroll gap."], ["Operating rule", "Balance cleared + 50% deposit before new work."]],
      why: "A friendly yes right now quietly overrides the rule you created to protect the business.", before: "Say yes and start Monday", after: "Add the payment condition", form: "When I’m about to make a client commitment that conflicts with an operating rule…"
    },
    vi: {
      label: "Phát triển business", blurb: "Tín hiệu và cam kết ẩn trong conversations",
      goal: "Nhận công việc tốt mà không lặp lại lỗi cash flow.", situation: "Một khách hàng lâu năm muốn bắt đầu project gấp vào thứ Hai. Team đang có chỗ trống.",
      sources: [["Client notes", "lịch sử thanh toán"], ["Invoice", "trễ 45 ngày"], ["Operating rule", "deposit 50%"]],
      ask: "Viết reply thân thiện xác nhận sẽ bắt đầu thứ Hai.", choices: ["Draft email đồng ý", "Lên lịch kickoff", "Cam kết bắt đầu thứ Hai"],
      title: "Một điều kiện đang bị bỏ quên.", body: "Khách hàng này có invoice $12,400 quá hạn 45 ngày. Sau lần trễ trước, bạn đặt rule: không bắt đầu việc mới trước khi thanh toán balance và deposit 50%.",
      evidence: [["Invoice", "$12,400 chưa được thanh toán sau 45 ngày."], ["Project review", "Lần trễ trước tạo ra khoảng trống payroll."], ["Operating rule", "Clear balance + deposit 50% trước việc mới."]],
      why: "Một lời đồng ý thân thiện lúc này sẽ âm thầm bỏ qua rule bảo vệ business.", before: "Đồng ý và bắt đầu thứ Hai", after: "Thêm điều kiện thanh toán", form: "Khi tôi sắp cam kết với khách hàng nhưng điều đó mâu thuẫn với operating rule…"
    }
  },
  creator: {
    en: {
      label: "Creating for an audience", blurb: "Feedback repeats in different words",
      goal: "Choose the next video with the best chance of helping the audience.", situation: "A “Top 10 AI tools” video feels timely and easy to produce this week.",
      sources: [["Video analytics", "4 weak lists"], ["Audience comments", "38 requests"], ["Content principle", "show workflows"]],
      ask: "Outline a video: The 10 best AI tools this year.", choices: ["Create the top-10 outline", "Write five clickable titles", "Build the production plan"],
      title: "Your audience may not want another tool list.", body: "Your last four list videos underperformed the channel average. Meanwhile, 38 high-intent comments asked to see one complete real-world workflow.",
      evidence: [["Analytics", "Four list videos averaged 42% fewer returning viewers."], ["Comments", "38 people asked for an end-to-end workflow."], ["Principle", "Your content rule says: demonstrate transformation, not tools."]],
      why: "You’re about to optimize the packaging of an idea your audience has already voted against.", before: "Make another tool list", after: "Show one complete workflow", form: "When I’m about to create something my audience signals say they no longer need…"
    },
    vi: {
      label: "Sáng tạo cho audience", blurb: "Feedback lặp lại bằng những từ khác nhau",
      goal: "Chọn video tiếp theo có khả năng giúp audience nhất.", situation: "Video “Top 10 AI tools” có vẻ đúng thời điểm và dễ sản xuất trong tuần này.",
      sources: [["Video analytics", "4 list yếu"], ["Audience comments", "38 yêu cầu"], ["Content principle", "show workflow"]],
      ask: "Outline video: 10 AI tools tốt nhất năm nay.", choices: ["Tạo outline top 10", "Viết năm title dễ click", "Lên production plan"],
      title: "Audience có thể không muốn thêm một tool list.", body: "Bốn list video gần nhất underperform so với channel average. Trong khi đó, 38 high-intent comments muốn xem một workflow thực tế hoàn chỉnh.",
      evidence: [["Analytics", "Bốn list video có returning viewers thấp hơn 42%."], ["Comments", "38 người muốn một workflow end-to-end."], ["Principle", "Content rule của bạn: chứng minh transformation, không liệt kê tools."]],
      why: "Bạn sắp tối ưu packaging cho một idea mà audience đã phản đối bằng hành vi.", before: "Làm thêm một tool list", after: "Show một workflow hoàn chỉnh", form: "Khi tôi sắp tạo thứ mà audience signals cho thấy họ không còn cần…"
    }
  },
  personal: {
    en: {
      label: "Working on myself", blurb: "Goals disappear when choices feel urgent",
      goal: "Publish one product-design portfolio project before November.", situation: "Three advanced courses are on sale today. You want to choose the best one.",
      sources: [["Course history", "4 unfinished"], ["Personal goal", "ship by November"], ["Weekly reflection", "learning loop"]],
      ask: "Compare these courses and tell me which one to buy.", choices: ["Rank the three courses", "Compare the discounts", "Create a new learning plan"],
      title: "This may be another learning loop.", body: "You bought four courses in six months and completed none. Your stated goal is to publish one portfolio project before November.",
      evidence: [["Course history", "Four purchases; no course above 18% complete."], ["Goal", "Publish one portfolio project before November."], ["Reflection", "You wrote: more learning is becoming a way to avoid shipping."]],
      why: "The sale creates urgency around learning, while your real commitment was to publish.", before: "Buy more future motivation", after: "Ship the current project", form: "When I’m about to repeat a personal pattern that conflicts with a goal I already chose…"
    },
    vi: {
      label: "Làm việc với chính mình", blurb: "Goal biến mất khi lựa chọn trở nên khẩn cấp",
      goal: "Publish một product-design portfolio project trước tháng 11.", situation: "Ba advanced course đang sale hôm nay. Bạn muốn chọn course tốt nhất.",
      sources: [["Course history", "4 khóa dở dang"], ["Personal goal", "ship trước tháng 11"], ["Weekly reflection", "learning loop"]],
      ask: "So sánh các course này và chọn giúp tôi course nên mua.", choices: ["Xếp hạng ba course", "So sánh các mức giảm giá", "Tạo learning plan mới"],
      title: "Đây có thể là một learning loop khác.", body: "Bạn mua bốn course trong sáu tháng và chưa hoàn thành course nào. Goal đã đặt là publish một portfolio project trước tháng 11.",
      evidence: [["Course history", "Bốn lần mua; không course nào hoàn thành quá 18%."], ["Goal", "Publish một portfolio project trước tháng 11."], ["Reflection", "Bạn viết: học thêm đang trở thành cách tránh việc ship."]],
      why: "Sale tạo urgency quanh việc học, trong khi commitment thật của bạn là publish.", before: "Mua thêm động lực tương lai", after: "Ship project hiện tại", form: "Khi tôi sắp lặp lại một personal pattern mâu thuẫn với goal đã chọn…"
    }
  }
};

let currentLanguage = "en";
let currentPersona = "product";
let selectedChoice = "";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const scenario = () => scenarios[currentPersona][currentLanguage];

function track(type, detail = {}) {
  const signal = { type, persona: currentPersona, language: currentLanguage, timestamp: new Date().toISOString(), ...detail };
  const signals = JSON.parse(localStorage.getItem("wizzdom-demand-signals") || "[]");
  signals.push(signal);
  localStorage.setItem("wizzdom-demand-signals", JSON.stringify(signals.slice(-100)));
  window.dispatchEvent(new CustomEvent("wizzdom:demand-signal", { detail: signal }));
}

function setProgress(step) {
  $$(".stage-progress > span").forEach((node, index) => node.classList.toggle("active", index < step));
}

function resetStage() {
  $("#decision-panel").hidden = false;
  $("#insight-panel").hidden = true;
  $("#reflection-panel").hidden = true;
  $("#signal-capture").hidden = true;
  $("#evidence-drawer").hidden = true;
  $("#evidence-toggle b").textContent = "＋";
  $$("[data-value], .source-chips button").forEach((node) => node.classList.remove("active"));
  selectedChoice = "";
  setProgress(1);
}

function renderScenario() {
  const data = scenario();
  $("#scenario-goal").textContent = data.goal;
  $("#scenario-situation").textContent = data.situation;
  $("#scenario-ask").textContent = `“${data.ask}”`;
  $("#scenario-sources").innerHTML = data.sources.map(([name, meta]) => `<div class="source-pill"><i></i><span>${name}</span><small>${meta}</small></div>`).join("");
  $("#scenario-choices").innerHTML = data.choices.map((choice, index) => `<button type="button" data-choice="${index}" data-key="${index + 1}"><span>${choice}</span></button>`).join("");
  $("#form-persona").value = currentPersona;
  $$(`[data-persona-label]`).forEach((node) => { const item = scenarios[node.dataset.personaLabel][currentLanguage]; node.textContent = item.label; });
  $$(`[data-persona-blurb]`).forEach((node) => { const item = scenarios[node.dataset.personaBlurb][currentLanguage]; node.textContent = item.blurb; });
  $$("[data-choice]").forEach((button) => button.addEventListener("click", () => showInsight(Number(button.dataset.choice))));
  resetStage();
}

function showInsight(choiceIndex) {
  const data = scenario();
  selectedChoice = data.choices[choiceIndex];
  $("#decision-panel").hidden = true;
  $("#insight-panel").hidden = false;
  $("#selected-action").textContent = `${currentLanguage === "vi" ? "Bạn chọn" : "You chose"}: ${selectedChoice}`;
  $("#insight-title").textContent = data.title;
  $("#insight-body").textContent = data.body;
  $("#insight-why").textContent = data.why;
  $("#evidence-drawer").innerHTML = data.evidence.map(([source, text]) => `<div class="evidence-item"><b>${source}</b><span>${text}</span></div>`).join("");
  setProgress(2);
  track("scenario_choice", { choice: selectedChoice, choice_index: choiceIndex });
}

function showReflection(action) {
  const data = scenario();
  $("#insight-panel").hidden = true;
  $("#reflection-panel").hidden = false;
  $("#decision-before").textContent = data.before;
  $("#decision-after").textContent = action === "use" ? data.after : (currentLanguage === "vi" ? "Tiếp tục, nhưng đã thấy evidence" : "Continue, with the evidence visible");
  setProgress(3);
  track("insight_action", { action, choice: selectedChoice });
}

function setLanguage(language) {
  currentLanguage = language;
  document.documentElement.lang = language;
  $$(`[data-i18n]`).forEach((node) => {
    const key = node.dataset.i18n;
    node.textContent = language === "vi" ? (vietnamese[key] || english[key]) : english[key];
  });
  $$(`[data-language]`).forEach((button) => {
    const active = button.dataset.language === language;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  $("#form-moment").placeholder = language === "vi" ? "Khi tôi sắp…" : "When I’m about to…";
  $("#form-outcome").placeholder = language === "vi" ? "Đưa ra quyết định tốt hơn, nhớ một constraint…" : "Make a better decision, remember a constraint…";
  document.title = language === "vi" ? "wizzdom — Cho AI thấy toàn cảnh" : "wizzdom — Give AI the full picture";
  document.querySelector('meta[name="description"]').content = language === "vi" ? "AI quên rồi hành động khi chỉ thấy một phần. Wizzdom đưa quyết định, bài học và tín hiệu còn thiếu trở lại trước bước tiếp theo." : "AI forgets, then acts on an incomplete picture. Wizzdom brings the missing decisions, lessons and signals back before the next move.";
  localStorage.setItem("wizzdom-language", language);
  renderScenario();
}

$$(`[data-persona]`).forEach((button) => button.addEventListener("click", () => {
  currentPersona = button.dataset.persona;
  $$(`[data-persona]`).forEach((item) => { const active = item === button; item.classList.toggle("active", active); item.setAttribute("aria-selected", String(active)); });
  renderScenario();
  track("persona_selected");
}));

$$(`[data-language]`).forEach((button) => button.addEventListener("click", () => setLanguage(button.dataset.language)));

$("#evidence-toggle").addEventListener("click", () => {
  const drawer = $("#evidence-drawer");
  drawer.hidden = !drawer.hidden;
  $("#evidence-toggle b").textContent = drawer.hidden ? "＋" : "−";
  if (!drawer.hidden) track("evidence_opened", { choice: selectedChoice });
});

$$(`[data-insight-action]`).forEach((button) => button.addEventListener("click", () => showReflection(button.dataset.insightAction)));

$$(`[data-value]`).forEach((button) => button.addEventListener("click", () => {
  $$(`[data-value]`).forEach((item) => item.classList.toggle("active", item === button));
  $("#signal-capture").hidden = false;
  track("value_rated", { value: button.dataset.value });
}));

$$(`.source-chips button`).forEach((button) => button.addEventListener("click", () => {
  button.classList.toggle("active");
  track("source_toggled", { source: button.dataset.source, selected: button.classList.contains("active") });
}));

$("#make-it-yours").addEventListener("click", () => {
  $("#form-moment").value = scenario().form;
  $("#form-persona").value = currentPersona;
  $("#apply").scrollIntoView({ behavior: "smooth", block: "start" });
  setTimeout(() => $("#form-moment").focus(), 500);
  track("make_it_yours_clicked", { sources: $$(".source-chips button.active").map((node) => node.dataset.source) });
});

$("#reset-demo").addEventListener("click", () => { resetStage(); track("demo_reset"); });

$$(`a[href^="#"]`).forEach((link) => link.addEventListener("click", (event) => {
  const target = document.querySelector(link.getAttribute("href"));
  if (!target) return;
  event.preventDefault();
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}));

$("#demand-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const response = {
    persona: form.get("persona"), moment: form.get("moment"), outcome: form.get("outcome"), email: form.get("email"),
    selected_sources: $$(".source-chips button.active").map((node) => node.dataset.source), created_at: new Date().toISOString()
  };
  const responses = JSON.parse(localStorage.getItem("wizzdom-beta-responses") || "[]");
  responses.push(response);
  localStorage.setItem("wizzdom-beta-responses", JSON.stringify(responses.slice(-20)));
  $("#form-success").hidden = false;
  track("beta_form_completed", { has_moment: Boolean(response.moment), has_outcome: Boolean(response.outcome), selected_sources: response.selected_sources });
});

const savedLanguage = localStorage.getItem("wizzdom-language");
const initialLanguage = savedLanguage || (navigator.language.toLowerCase().startsWith("vi") ? "vi" : "en");
setLanguage(initialLanguage);
