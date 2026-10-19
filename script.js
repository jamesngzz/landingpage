const english = {};
document.querySelectorAll("[data-i18n]").forEach((node) => {
  english[node.dataset.i18n] = node.textContent;
});

const vietnamese = {
  navDemo: "Demo tương tác", navHow: "Cách hoạt động", navPrivacy: "Quyền riêng tư", navCta: "Chọn khoảnh khắc",
  heroEyebrow: "CHO AI THẤY TOÀN CẢNH", heroLineOne: "AI quên.", heroLineTwo: "Rồi làm trong mù mờ.", heroLineThree: "Bạn trả giá.",
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
  privacyEyebrow: "LOCAL-FIRST. BẠN KIỂM SOÁT.", privacyTitle: "Lịch sử nằm trên máy Mac của bạn.", privacyBody: "Cloud chỉ nhận task được chọn và bằng chứng liên quan. Bạn chọn nguồn, xem bằng chứng và dừng bất cứ lúc nào.", privacyConsoleLabel: "Quyền kiểm soát dữ liệu", userControlled: "BẠN KIỂM SOÁT", privacyOne: "Chọn từng nguồn và khoảng thời gian", privacyTwo: "Lịch sử gốc nằm trên máy Mac", privacyThree: "Xem bằng chứng dùng để phân tích", privacyFour: "Tạm dừng hoặc ngắt kết nối nguồn", privacyFive: "Không đọc màn hình hay âm thầm hành động",
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

const moments = {
  product: {
    en: { label: "Product", blurb: "Wrong priorities", setup: "A customer asks for a dashboard. You have two weeks.", prompt: "“Can you build an analytics dashboard?”", choices: ["Plan the dashboard", "Draft the feature spec"], thoughts: ["Build the dashboard", "Write the dashboard spec"], title: "Fix setup first.", reason: "7 of 9 users got stuck before analytics. Your team already chose activation as the priority." },
    vi: { label: "Sản phẩm", blurb: "Sai ưu tiên", setup: "Khách hàng muốn có dashboard. Team có hai tuần.", prompt: "“Build analytics dashboard được không?”", choices: ["Lên kế hoạch dashboard", "Viết đặc tả tính năng"], thoughts: ["Build dashboard", "Viết đặc tả dashboard"], title: "Sửa bước thiết lập trước.", reason: "7/9 người dùng kẹt trước bước analytics. Team đã chọn ưu tiên activation." }
  },
  engineer: {
    en: { label: "Developer", blurb: "Repeated fixes", setup: "Authentication fails intermittently. Release is Friday.", prompt: "“Retry token refresh to fix the failure.”", choices: ["Generate the patch", "Add retry logging"], thoughts: ["Patch token refresh", "Log another retry"], title: "You tried this twice.", reason: "Both retry patches regressed. The incident review points to device clock skew." },
    vi: { label: "Developer", blurb: "Fix lặp lại", setup: "Đăng nhập lúc được lúc không. Thứ Sáu cần release.", prompt: "“Retry token refresh để sửa lỗi.”", choices: ["Tạo patch", "Thêm log cho retry"], thoughts: ["Patch token refresh", "Thêm log cho retry"], title: "Bạn đã thử hai lần.", reason: "Cả hai patch đều tái phát lỗi. Báo cáo sự cố chỉ ra đồng hồ thiết bị bị lệch." }
  },
  research: {
    en: { label: "Researcher", blurb: "Missing evidence", setup: "12 studies. Your conclusion is due tomorrow.", prompt: "“AI tutors improve learning. Write the conclusion.”", choices: ["Draft the conclusion", "Turn it into slides"], thoughts: ["Claim better learning", "Present better learning"], title: "Engagement isn’t learning.", reason: "Only 2 studies measured your success metric: 30-day recall. One found no significant gain." },
    vi: { label: "Nghiên cứu", blurb: "Thiếu bằng chứng", setup: "12 nghiên cứu. Ngày mai cần nộp kết luận.", prompt: "“AI tutor giúp học tốt hơn. Viết kết luận.”", choices: ["Viết kết luận", "Chuyển thành slides"], thoughts: ["Khẳng định học tốt hơn", "Trình bày việc học tốt hơn"], title: "Tương tác nhiều ≠ học tốt.", reason: "Chỉ 2 nghiên cứu đo khả năng nhớ sau 30 ngày. Một nghiên cứu không thấy cải thiện đáng kể." }
  },
  business: {
    en: { label: "Business owner", blurb: "Forgotten terms", setup: "A long-term client asks for a quick start. Your team is free.", prompt: "“Can your team start on Monday?”", choices: ["Draft a friendly yes", "Prepare the kickoff"], thoughts: ["Say yes to Monday", "Schedule the kickoff"], title: "Get paid before starting.", reason: "Your rule: clear the balance and collect a 50% deposit before taking new work." },
    vi: { label: "Chủ business", blurb: "Quên điều kiện", setup: "Khách quen muốn bắt đầu gấp. Team đang có chỗ trống.", prompt: "“Team bắt đầu thứ Hai được không?”", choices: ["Soạn email đồng ý", "Chuẩn bị kickoff"], thoughts: ["Đồng ý bắt đầu thứ Hai", "Lên lịch kickoff"], title: "Thu tiền trước khi bắt đầu.", reason: "Bạn đã đặt quy tắc: trả hết nợ và đặt cọc 50% trước khi nhận việc mới." }
  },
  creator: {
    en: { label: "Creator", blurb: "Missed feedback", setup: "You’re choosing this week’s video. A tool list is easy to make.", prompt: "“Outline the 10 best AI tools.”", choices: ["Write the outline", "Write clickable titles"], thoughts: ["Make another tool list", "Package another tool list"], title: "Show a workflow instead.", reason: "38 viewers asked for a complete workflow. Your last 4 tool lists underperformed." },
    vi: { label: "Creator", blurb: "Bỏ sót feedback", setup: "Bạn đang chọn video tuần này. List công cụ dễ làm.", prompt: "“Lên outline 10 công cụ AI tốt nhất.”", choices: ["Viết outline", "Viết title dễ click"], thoughts: ["Làm thêm list công cụ", "Đóng gói list công cụ"], title: "Hãy làm một workflow.", reason: "38 người muốn xem workflow hoàn chỉnh. 4 video liệt kê công cụ gần nhất đều kém hiệu quả." }
  },
  personal: {
    en: { label: "Personal", blurb: "Old habits", setup: "Three courses go on sale today. Your portfolio is unfinished.", prompt: "“Which course should I buy?”", choices: ["Rank the courses", "Compare the discounts"], thoughts: ["Buy another course", "Find the best course deal"], title: "Finish the project first.", reason: "Your goal was to publish a portfolio project. Four unfinished courses won’t move it forward." },
    vi: { label: "Cá nhân", blurb: "Thói quen cũ", setup: "Ba khóa học giảm giá hôm nay. Portfolio vẫn chưa xong.", prompt: "“Tôi nên mua khóa học nào?”", choices: ["Xếp hạng khóa học", "So sánh giảm giá"], thoughts: ["Mua thêm khóa học", "Tìm khóa giảm giá tốt nhất"], title: "Hoàn thành project trước.", reason: "Bạn đã đặt mục tiêu đăng portfolio. Bốn khóa dở dang chưa giúp bạn tiến gần hơn." }
  }
};

Object.assign(vietnamese, {
  howEyebrow: "NGƯỜI ĐỒNG HÀNH TINH Ý CỦA BẠN", wisdomTitleOne: "Nhìn ra mối liên hệ.", wisdomTitleTwo: "Giúp đúng lúc.", wisdomCurrent: "Bạn đang sửa lỗi đăng nhập.", wisdomExample: "Ví dụ hư cấu", wisdomPatch: "Cùng cách sửa. Đã thử hai lần.", wisdomBrowser: "Lịch sử duyệt web", wisdomIncident: "Báo cáo sự cố: lệch đồng hồ.", wisdomNotes: "Ghi chú của bạn", wisdomDeadline: "Release vào thứ Sáu.", wisdomTiming: "Nhắc bạn một chút", wisdomVoice: "Trước khi bạn thử lại…", wisdomAdvice: "Bạn đã thử cách này hai lần. Hãy kiểm tra đồng hồ thiết bị trước khi retry.", wisdomEvidence: "2 lần sửa cũ + báo cáo sự cố", wisdomTry: "Thử tình huống này", wisdomRememberTitle: "Chú tâm.", wisdomRememberBody: "Nhớ xuyên suốt các nguồn bạn chọn.", wisdomConnectTitle: "Tinh ý.", wisdomConnectBody: "Đối chiếu bằng chứng cũ với việc hiện tại.", wisdomHelpTitle: "Hữu ích.", wisdomHelpBody: "Gợi ý bước tốt hơn. Bạn quyết định.",
  heroPrimary: "Xem AI bỏ sót gì", exampleTitle: "Wizzdom tìm lại những mảnh ghép còn thiếu.",
  heroSub: "Wizzdom kết nối điều bạn đã biết với việc bạn đang làm.", heroExample: "Ví dụ hư cấu", replay: "Xem lại", heroNow: "Bạn hỏi AI", heroPrompt: "“Lên kế hoạch analytics dashboard.”", heroMemoryOne: "7 người kẹt ở bước thiết lập", heroMemoryTwo: "Ưu tiên sửa thiết lập", heroRemembers: "Wizzdom tìm lại bằng chứng", heroInsight: "“Sửa thiết lập trước khi thêm tính năng.”", heroOld: "Build dashboard", heroNew: "Sửa thiết lập",
  chooseNext: "Bạn sẽ làm gì tiếp theo?", moreBackground: "Xem bối cảnh", showEvidence: "Xem 3 nguồn", demoDisclaimer: "Không truy cập dữ liệu của bạn.", fictionalContext: "Tình huống hư cấu",
  howConnect: "Kết nối", howMatch: "Đối chiếu", howInsight: "Insight", howVisualSources: "Xem nguồn trong demo",
  applyEyebrow: "CÙNG XÂY PRIVATE BETA", applyBody: "Mang đến một tình huống thật. Cùng định hình cohort đầu tiên.", formMoment: "Bạn muốn Wizzdom nhắc điều gì trước khi quá muộn?", formStepOne: "1 / 2 · Tình huống của bạn", formStepTwo: "2 / 2 · Bước tiếp theo", formNext: "Tiếp tục →", formBack: "← Sửa tình huống", formSubmit: "Lưu mong muốn tham gia beta", formNote: "Prototype: chỉ lưu trong browser này. Chưa kết nối đăng ký beta thật.", formSuccess: "Đã lưu trong browser này. Đây chưa phải đăng ký beta."
});

let currentLanguage = "en";
let currentPersona = "product";
let selectedChoice = "";
let selectedChoiceIndex = 0;
let currentStep = 1;
let formStep = 1;
let lastInsightAction = "use";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const scenario = () => scenarios[currentPersona][currentLanguage];
const moment = () => moments[currentPersona][currentLanguage];
const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
const readJSON = (key) => { try { const data = JSON.parse(localStorage.getItem(key) || "[]"); return Array.isArray(data) ? data : []; } catch { return []; } };
const saveJSON = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; } };
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const focusStage = (selector) => $(selector).focus({ preventScroll: true });

function renderArtifact() {
  const vi = currentLanguage === "vi";
  const dots = (n, total) => `<div class="proof-dots" aria-hidden="true">${Array.from({length:total},(_,i)=>`<i class="${i<n?"lit":""}"></i>`).join("")}</div>`;
  const tag = (text) => `<small class="artifact-tag">${text}</small>`;
  const content = {
    product: `${tag(vi?"CUỘC GỌI KHÁCH HÀNG":"CUSTOMER CALLS")}<strong class="artifact-stat">7<span>/9</span></strong><p>${vi?"kẹt ở bước thiết lập":"stuck at setup"}</p>${dots(7,9)}`,
    engineer: `${tag(vi?"LỊCH SỬ PATCH":"PATCH HISTORY")}<div class="patch-row"><code>retry(refreshToken)</code><b>↶ ${vi?"Đã revert":"Reverted"}</b></div><div class="patch-row"><code>retry(refreshToken)</code><b>↶ ${vi?"Đã revert":"Reverted"}</b></div><p>${vi?"Cùng cách sửa. Hai lần tái phát.":"Same fix. Two regressions."}</p>`,
    research: `${tag(vi?"12 NGHIÊN CỨU":"12 STUDIES")}<div class="study-row"><span>${vi?"Tương tác":"Engagement"}</span><b>10</b><i style="--fill:83.33%"></i></div><div class="study-row recall"><span>${vi?"Nhớ sau 30 ngày":"30-day recall"}</span><b>2</b><i style="--fill:16.67%"></i></div><p>${vi?"Chỉ 2 nghiên cứu đo đúng mục tiêu.":"Only 2 measured your goal."}</p>`,
    business: `${tag(vi?"HÓA ĐƠN CHƯA TRẢ":"UNPAID INVOICE")}<strong class="artifact-stat money">$12,400</strong><span class="overdue-stamp">${vi?"QUÁ HẠN 45 NGÀY":"45 DAYS OVERDUE"}</span><div class="invoice-lines" aria-hidden="true"><i></i><i></i><i></i></div>`,
    creator: `${tag(vi?"BÌNH LUẬN KHÁN GIẢ":"AUDIENCE COMMENTS")}<blockquote>“${vi?"Cho xem workflow hoàn chỉnh đi.":"Show us the complete workflow."}”</blockquote><strong class="comment-count">38 <span>${vi?"yêu cầu tương tự":"similar requests"}</span></strong>`,
    personal: `${tag(vi?"KHÓA HỌC ĐÃ MUA":"COURSES BOUGHT")}<div class="course-books" aria-hidden="true">${Array.from({length:4},()=>'<i><span></span></i>').join("")}</div><strong class="artifact-stat">4</strong><p>${vi?"khóa dở dang · không khóa nào quá 18%":"unfinished · none above 18%"}</p>`
  };
  $("#proof-artifact").dataset.kind = currentPersona;
  $("#proof-artifact").innerHTML = content[currentPersona];
}

function track(type, detail = {}) {
  const signal = { type, persona: currentPersona, language: currentLanguage, timestamp: new Date().toISOString(), ...detail };
  const signals = readJSON("wizzdom-demand-signals");
  signals.push(signal);
  saveJSON("wizzdom-demand-signals", signals.slice(-100));
  window.dispatchEvent(new CustomEvent("wizzdom:demand-signal", { detail: signal }));
}

function setStage(step) {
  currentStep = step;
}

function resetStage() {
  $("#decision-panel").hidden = false;
  $("#insight-panel").hidden = true;
  $("#reflection-panel").hidden = true;
  $("#signal-capture").hidden = true;
  $("#evidence-drawer").hidden = true;
  $("#evidence-toggle b").textContent = "＋";
  $("#evidence-toggle").setAttribute("aria-expanded", "false");
  $$(".background-details").forEach((node) => { node.open = false; });
  $$("[data-value], .source-chips button").forEach((node) => node.classList.remove("active"));
  selectedChoice = "";
  setStage(1);
}

function renderScenario() {
  const data = scenario();
  const compact = moment();
  $("#scenario-goal").textContent = data.goal;
  $("#scenario-situation").textContent = data.situation;
  $("#scenario-setup").textContent = compact.setup;
  $("#scenario-ask").textContent = compact.prompt;
  $("#message-mark").textContent = ({product:"↗",engineer:"{ }",research:"≡",business:"✉",creator:"▶",personal:"◇"})[currentPersona];
  $("#scenario-choices").innerHTML = compact.choices.map((choice, index) => `<button type="button" data-choice="${index}" data-key="${index + 1}"><span>${escapeHTML(choice)}</span></button>`).join("");
  $("#form-persona").value = currentPersona;
  $$(`[data-persona-label]`).forEach((node) => { node.textContent = moments[node.dataset.personaLabel][currentLanguage].label; });
  $$(`[data-persona-blurb]`).forEach((node) => { node.textContent = moments[node.dataset.personaBlurb][currentLanguage].blurb; });
  $$("[data-choice]").forEach((button) => button.addEventListener("click", () => showInsight(Number(button.dataset.choice))));
  resetStage();
}

function showInsight(choiceIndex, record = true) {
  const data = scenario();
  const compact = moment();
  selectedChoiceIndex = choiceIndex;
  selectedChoice = compact.choices[choiceIndex];
  $("#decision-panel").hidden = true;
  $("#insight-panel").hidden = false;
  $("#selected-action").textContent = `${currentLanguage === "vi" ? "Bạn chọn" : "You chose"}: ${selectedChoice}`;
  $("#insight-title").textContent = compact.title;
  $("#insight-body").textContent = compact.reason;
  $("#insight-why").textContent = data.why;
  $("#evidence-items").innerHTML = data.evidence.map(([source, text]) => `<div class="evidence-item"><b>${escapeHTML(source)}</b><span>${escapeHTML(text)}</span></div>`).join("");
  renderArtifact();
  setStage(2);
  if (record) { focusStage("#insight-title"); track("scenario_choice", { choice: selectedChoice, choice_index: choiceIndex }); }
}

function showReflection(action, record = true) {
  const data = scenario();
  $("#insight-panel").hidden = true;
  $("#reflection-panel").hidden = false;
  $("#decision-before").textContent = moment().thoughts[selectedChoiceIndex];
  $("#decision-after").textContent = data.after;
  lastInsightAction = action;
  setStage(3);
  if (record) { focusStage("#reflection-title"); track("insight_action", { action, choice: selectedChoice }); }
}

function setLanguage(language) {
  const previousStep = currentStep;
  const choiceIndex = selectedChoiceIndex;
  const previousAction = lastInsightAction;
  const evidenceWasOpen = !$("#evidence-drawer").hidden;
  const rating = $("[data-value].active")?.dataset.value;
  const chosenSources = $$(".source-chips button.active").map((node) => node.dataset.source);
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
  try { localStorage.setItem("wizzdom-language", language); } catch { /* Language still works without storage. */ }
  renderScenario();
  if (previousStep >= 2) showInsight(choiceIndex, false);
  if (previousStep === 3) showReflection(previousAction, false);
  if (evidenceWasOpen) { $("#evidence-drawer").hidden = false; $("#evidence-toggle").setAttribute("aria-expanded", "true"); $("#evidence-toggle b").textContent = "−"; }
  if (rating) { $(`[data-value="${rating}"]`).classList.add("active"); $("#signal-capture").hidden = false; }
  chosenSources.forEach((source) => $(`[data-source="${source}"]`).classList.add("active"));
  updateFormStep(formStep, false);
}

$$(`[data-persona]`).forEach((button) => button.addEventListener("click", () => {
  currentPersona = button.dataset.persona;
  $$(`[data-persona]`).forEach((item) => { const active = item === button; item.classList.toggle("active", active); item.setAttribute("aria-pressed", String(active)); });
  renderScenario();
  track("persona_selected");
}));

$$(`[data-language]`).forEach((button) => button.addEventListener("click", () => setLanguage(button.dataset.language)));

$("#evidence-toggle").addEventListener("click", () => {
  const drawer = $("#evidence-drawer");
  drawer.hidden = !drawer.hidden;
  $("#evidence-toggle").setAttribute("aria-expanded", String(!drawer.hidden));
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
  updateFormStep(1, false);
  $("#apply").scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" });
  $("#form-moment").focus({ preventScroll: true });
  track("make_it_yours_clicked", { sources: $$(".source-chips button.active").map((node) => node.dataset.source) });
});

$("#reset-demo").addEventListener("click", () => { resetStage(); focusStage("#scenario-ask"); track("demo_reset"); });

$$(`a[href^="#"]`).forEach((link) => link.addEventListener("click", (event) => {
  const target = document.querySelector(link.getAttribute("href"));
  if (!target) return;
  event.preventDefault();
  target.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" });
}));

$("#demand-form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (formStep === 1) { nextFormStep(); return; }
  const form = new FormData(event.currentTarget);
  const response = {
    persona: form.get("persona"), moment: form.get("moment"), outcome: form.get("outcome"), email: form.get("email"),
    selected_sources: $$(".source-chips button.active").map((node) => node.dataset.source), created_at: new Date().toISOString()
  };
  const responses = readJSON("wizzdom-beta-responses");
  responses.push(response);
  const saved = saveJSON("wizzdom-beta-responses", responses.slice(-20));
  $("#form-success").hidden = false;
  if (!saved) $("#form-success").textContent = currentLanguage === "vi" ? "Browser không cho phép lưu. Chưa có dữ liệu nào được gửi đi." : "Browser storage is unavailable. Nothing has been sent.";
  track("beta_form_completed", { has_moment: Boolean(response.moment), has_outcome: Boolean(response.outcome), selected_sources: response.selected_sources });
});

function updateFormStep(step, focus = true) {
  formStep = step;
  $("#form-step-one").hidden = step !== 1;
  // Keep the moment enabled so it is included in FormData on the final step.
  $("#form-step-two").hidden = step !== 2;
  $("#form-step-two").disabled = step !== 2;
  $("#form-step-label").textContent = currentLanguage === "vi" ? vietnamese[step === 1 ? "formStepOne" : "formStepTwo"] : (step === 1 ? "1 of 2 · Your moment" : "2 of 2 · Next step");
  if (focus) $(step === 1 ? "#form-moment" : "#form-outcome").focus({preventScroll:true});
}
function nextFormStep() {
  const field = $("#form-moment");
  field.setCustomValidity(field.value.trim() ? "" : (currentLanguage === "vi" ? "Hãy mô tả một tình huống." : "Describe one moment."));
  if (!field.reportValidity()) return;
  updateFormStep(2);
  track("beta_moment_entered", { has_moment: true });
}
$("#form-next").addEventListener("click", nextFormStep);
$("#form-back").addEventListener("click", () => updateFormStep(1));
$("#form-moment").addEventListener("input", () => { $("#form-moment").setCustomValidity(""); $("#form-success").hidden = true; });
$$('[data-start-persona]').forEach((link) => link.addEventListener("click", () => {
  const persona = link.dataset.startPersona;
  $(`[data-persona="${persona}"]`).click();
  track("helpful_moment_opened", { source: "how_it_works" });
}));

let heroTimer;
function replayHero() {
  clearTimeout(heroTimer);
  const demo = $("#hero-demo");
  demo.classList.remove("is-playing");
  if (reducedMotion()) return;
  void demo.offsetWidth;
  demo.classList.add("is-playing");
  heroTimer = setTimeout(() => demo.classList.remove("is-playing"), 4800);
}
$("#replay-hero").addEventListener("click", replayHero);
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => { if (entries.some((entry) => entry.isIntersecting)) { replayHero(); observer.disconnect(); } }, {threshold:.35});
  observer.observe($("#hero-demo"));
  const wisdomObserver = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      if (!reducedMotion()) $("#wisdom-story").classList.add("is-awake");
      wisdomObserver.disconnect();
    }
  }, {threshold:.25});
  wisdomObserver.observe($("#wisdom-story"));
}
window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", (event) => { if (event.matches) { clearTimeout(heroTimer); $("#hero-demo").classList.remove("is-playing"); } });
let savedLanguage;
try { savedLanguage = localStorage.getItem("wizzdom-language"); } catch { /* Use browser language. */ }
const initialLanguage = ["vi", "en"].includes(savedLanguage) ? savedLanguage : (navigator.language.toLowerCase().startsWith("vi") ? "vi" : "en");
setLanguage(initialLanguage);
