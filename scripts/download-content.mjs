export const content = {
  "vi": {
    "title": "Tải Wizzdom — Cài đặt và bắt đầu",
    "description": "Cài Wizzdom trên Mac, kết nối Codex hoặc Claude và biết chính xác khi nào lịch sử của bạn đang giúp ích.",
    "home": "Trang chủ",
    "navSetup": "Cài đặt",
    "navHow": "Cách hoạt động",
    "navPrivacy": "Dữ liệu & quyền",
    "eyebrow": "WIZZDOM CHO MAC",
    "headline": "Đừng bắt đầu lại\ntừ một cuộc chat trống.",
    "intro": "Đưa quyết định, bài học và chi tiết từ lịch sử trở lại việc bạn đang làm cùng AI. Wizzdom tìm điều liên quan; bạn quyết định dùng hay bỏ qua.",
    "beta": "Beta mở",
    "availability": "Chưa mở tải công khai.",
    "availabilityBody": "Bạn có thể đăng ký beta. Khi có đợt thử phù hợp, nhóm Wizzdom sẽ liên hệ; hiện chưa có link tải dành cho mọi người.",
    "join": "Đăng ký beta",
    "download": "Tải cho Mac",
    "check": "Xem cách bắt đầu",
    "requirements": "macOS 13 trở lên · Apple Silicon (M1 hoặc mới hơn)",
    "unsupported": "Chưa có bản cho Windows hoặc Mac Intel.",
    "signed": "Bộ cài được ký và notarize với Apple.",
    "setupKicker": "01 / BẮT ĐẦU",
    "setupTitle": "Cài một lần. Chọn điều Wizzdom được biết.",
    "setupIntro": "Bạn không cần Terminal hay API key riêng. Tài khoản Wizzdom dùng cho Cloud AI; bạn có thể bắt đầu ở chế độ local.",
    "steps": [
      [
        "Kéo vào Applications",
        "Tải DMG, mở file rồi kéo Wizzdom vào Applications. Mở app từ đó để cài đặt và quyền gắn đúng ứng dụng."
      ],
      [
        "Đăng nhập & chọn nguồn",
        "Chọn lịch sử muốn nhập. Nhập nguồn lưu dữ liệu trên máy; khởi tạo bộ nhớ và phân tích bằng Cloud AI cần sự đồng ý riêng."
      ],
      [
        "Kết nối AI bạn đang dùng",
        "Wizzdom cấu hình phần kết nối. Nếu app yêu cầu mở lại host hoặc cấp Accessibility, làm theo hướng dẫn ngay trong app."
      ]
    ],
    "hostTitle": "Bước đầu khác nhau theo ứng dụng.",
    "hostIntro": "Kết nối thành công chưa có nghĩa là một lượt chat đã được đọc và kiểm tra.",
    "hosts": [
      {
        "name": "Codex / ChatGPT Work",
        "icon": "openai.svg",
        "tag": "Theo dõi qua hooks",
        "body": "Kết nối trong Wizzdom. Mở lại Codex nếu được yêu cầu, rồi gửi một lượt chat và đợi AI trả lời.",
        "expect": "Trong Hôm nay, tìm đúng tên chat và kết quả kiểm tra gần nhất."
      },
      {
        "name": "Claude Desktop Chat",
        "icon": "claude.svg",
        "tag": "Foreground · Thử nghiệm",
        "body": "Cho phép ghi nhận trong Wizzdom, cấp Accessibility cho Wizzdom rồi mở Claude Chat. Gửi một lượt mới và giữ cửa sổ Claude ở phía trước.",
        "expect": "Chỉ đọc tin nhắn đang hiển thị. Không đọc toàn bộ chat nền, lịch sử tài khoản hoặc Cowork."
      }
    ],
    "laterHosts": "Cursor và Antigravity là tích hợp thử nghiệm, có khả năng riêng. Xem mô tả trong Kết nối; đừng mặc định mọi app đều tự theo dõi như Codex.",
    "howKicker": "02 / KHI BẠN LÀM VIỆC",
    "howTitle": "Một lời nhắc khi lịch sử làm đổi bước tiếp theo.",
    "howIntro": "Wizzdom đối chiếu lượt chat với nguồn bạn đã chọn. Khi có điều đáng xem, card đưa ra nhận định, bằng chứng và một bước cụ thể. Bạn xem nguồn, dùng context, lưu riêng hoặc bỏ qua.",
    "example": "Minh họa · không phải dữ liệu của bạn",
    "exampleChat": "Lập kế hoạch sản phẩm",
    "exampleClaim": "Đo nhu cầu trước khi xây thêm.",
    "exampleBody": "Bạn từng chọn phỏng vấn khách hàng trước khi thêm tính năng. Kế hoạch mới có thể bỏ qua bước kiểm chứng đó.",
    "exampleAction": "Bước tiếp theo",
    "exampleNext": "Chọn một giả thuyết và một cuộc phỏng vấn để kiểm tra trước khi code.",
    "exampleSource": "Mở nguồn để đối chiếu",
    "exampleUse": "Bạn duyệt rồi mới dùng",
    "statesTitle": "Biết đang chờ, đã kiểm tra hay cần xử lý.",
    "statesIntro": "Mở Hôm nay để xem tên chat, lần nhận hoạt động và kết quả. Một chấm xanh hay một card trống không đủ để kết luận app đang kiểm tra.",
    "states": [
      [
        "Đang chờ",
        "Đã nhận prompt, chờ câu trả lời hoàn tất. Chưa có kết luận phân tích."
      ],
      [
        "Đã kiểm tra",
        "Không có gợi ý cũng có thể là kết quả: chưa tìm được điều từ lịch sử làm đổi lựa chọn hiện tại."
      ],
      [
        "Cần xử lý",
        "Thiếu quyền, mất kết nối hoặc phân tích thất bại cần hành động phục hồi. Đây không phải kết quả im lặng."
      ]
    ],
    "memoryTitle": "Bộ nhớ là đề xuất để bạn duyệt.",
    "memoryBody": "Sau khi nhập nguồn, bạn có thể yêu cầu khởi tạo Bộ nhớ. AI tổng hợp mục tiêu, quyết định và sở thích có nguồn. Bạn sửa, xác nhận hoặc từ chối; đề xuất mới không tự trở thành sự thật về bạn.",
    "privacyKicker": "03 / TRƯỚC KHI BẬT",
    "privacyTitle": "Local-first không có nghĩa là mọi thứ đều offline.",
    "privacy": [
      [
        "Lưu trên máy",
        "Nguồn đã nhập và kho context được giữ local. Bạn chọn nguồn và phạm vi; không cần cho phép mọi lịch sử để bắt đầu."
      ],
      [
        "Khi bật Cloud AI",
        "Nội dung lượt chat và bằng chứng liên quan có thể được gửi tới backend Wizzdom và nhà cung cấp AI để phân tích. Khởi tạo bộ nhớ cũng dùng các đoạn nguồn đã chọn."
      ],
      [
        "Vì sao cần Accessibility?",
        "Claude Chat dùng quyền này để đọc prompt đã gửi và câu trả lời đang hiển thị. Không đọc bản nháp. Bạn có thể tạm dừng hoặc thu hồi quyền."
      ]
    ],
    "privacyNote": "Nhập lịch sử, theo dõi lượt mới và phân tích Cloud AI là các lựa chọn riêng. Accessibility cho phép Wizzdom đọc phần chat Claude đang hiển thị; chỉ cấp cho đúng Wizzdom trong Applications. Bạn có thể tạm dừng trong app hoặc thu hồi tại System Settings → Privacy & Security → Accessibility. Chỉ tắt thông báo không đồng nghĩa dừng ghi nhận.",
    "faqTitle": "Trước khi bạn bắt đầu.",
    "faq": [
      [
        "Không thấy card: Wizzdom có đang chạy không?",
        "Xem Hôm nay và Kết nối. Phân biệt lượt đang chờ, kiểm tra hoàn tất không có gợi ý và lỗi. Đừng dùng số card làm dấu hiệu duy nhất."
      ],
      [
        "Wizzdom tự gửi nội dung sang AI đang chat không?",
        "Bạn cần duyệt hành động. Codex có thể xếp context cho lượt tiếp theo khi host hỗ trợ; với host khác, app có thể copy để bạn dán. “Đã copy”, “đã xếp hàng” và “host đã nhận” là các trạng thái khác nhau."
      ],
      [
        "MCP của Claude có đọc mọi cuộc chat không?",
        "Không. MCP cung cấp tools khi được gọi. Theo dõi Claude Chat là cơ chế riêng qua Accessibility và chỉ hoạt động với nội dung hiển thị ở foreground."
      ],
      [
        "Tôi dùng AI chủ yếu trên web thì sao?",
        "Desktop là hướng chính hiện tại. Browser extension được thiết lập riêng; đăng ký beta và cho nhóm Wizzdom biết bạn chủ yếu dùng webapp. Đây chưa phải tiện ích tải từ store trên trang này."
      ],
      [
        "Tôi có thể dừng hoặc gỡ app không?",
        "Bạn có thể tạm dừng ghi nhận và tắt Cloud AI riêng. Trước khi gỡ app, ngắt kết nối host trong Wizzdom và chọn giữ, xuất hoặc quản lý dữ liệu local. Gỡ app không có nghĩa mọi dữ liệu local đã bị xóa."
      ],
      [
        "Có cần API key hoặc gói AI riêng không?",
        "Wizzdom không yêu cầu bạn nhập API key của OpenAI. Cloud AI cần tài khoản Wizzdom và phụ thuộc hạn mức trong app. Kết nối host không thay thế tài khoản hoặc gói sử dụng của host đó."
      ]
    ],
    "footer": "Lịch sử của bạn. Đúng lúc cần. Bước tiếp theo tốt hơn.",
    "back": "Về trang chủ",
    "preview": "Xem demo tương tác",
    "checksum": "SHA-256",
    "releaseLabel": "Beta cho cộng đồng",
    "language": "Ngôn ngữ",
    "betaNote": "Đây là bản beta sớm. Bạn có thể gặp lỗi; hãy báo trong app để mình kiểm tra và hỗ trợ.",
    "pricingKicker": "BETA MIỄN PHÍ",
    "pricingTitle": "Cứ dùng. Và cho mình biết điều gì hữu ích.",
    "pricingIntro": "Các tính năng AI trong Wizzdom được dùng miễn phí trong đợt beta. Bạn không cần tự mua API hay nhập API key.",
    "pricing": [
      [
        "Nếu chạm giới hạn API",
        "Đôi lúc hạn mức chung của dịch vụ AI có thể hết. Mong bạn kiên nhẫn; mình sẽ reset hoặc bổ sung ngay khi thấy. Báo trong app sẽ giúp mình biết sớm hơn."
      ],
      [
        "Cần nhiều lượt hơn? Cứ yêu cầu.",
        "Hạn mức trong app chủ yếu để tránh spam, không phải để bạn phải dè chừng khi dùng. Nếu muốn dùng nhiều, gửi yêu cầu và mình sẽ nâng cho bạn."
      ]
    ],
    "pricingNote": "Chính sách miễn phí này dành cho AI của Wizzdom trong beta; tài khoản và gói của Codex, Claude hoặc dịch vụ khác vẫn theo chính sách riêng.",
    "ideasKicker": "CÙNG XÂY WIZZDOM",
    "ideasTitle": "Một vài hướng mình muốn khám phá cùng bạn.",
    "ideasIntro": "Bộ nhớ và chat với context đã có trong beta. Những hướng dưới đây là ý tưởng đang phát triển, chưa phải lời hứa tính năng hay thời gian ra mắt.",
    "ideas": [
      [
        "Knowledge hub theo thời gian",
        "Hình dung một không gian giống Obsidian, nhưng bớt việc tự ghi chép: AI thu thập từ các nguồn bạn cho phép và đề xuất tổ chức kiến thức cho bạn duyệt. Mục tiêu là giúp tìm lại và nối các ý tưởng tốt hơn khi lịch sử tích lũy; chất lượng vẫn cần bạn kiểm chứng.",
        "Từ Bộ nhớ hiện có"
      ],
      [
        "Wizzdom Recall",
        "“Mình từng nói hoặc làm việc này ở đâu đó, nhưng không nhớ chat nào.” Bạn mô tả vài chi tiết còn nhớ, Wizzdom tìm nguồn rồi cho bạn xem, duyệt và đưa context trở lại chat.",
        "Ý tưởng tính năng"
      ],
      [
        "Reflection & routine journaling",
        "Chat với context trong onboarding gợi mở một cách nhìn lại: nối nhiều sự kiện, thấy bức tranh rộng hơn và đặt câu hỏi phản biện cho chính mình. Mình muốn khám phá trải nghiệm reflection và journaling thường ngày cùng bạn.",
        "Hướng khám phá"
      ]
    ],
    "feedbackTitle": "Bạn muốn Wizzdom giúp việc gì?",
    "feedbackBody": "Nếu một hướng ở trên khiến bạn hứng thú, hoặc bạn có ý tưởng khác, hãy kể cho mình. Ví dụ cụ thể từ cách bạn làm việc sẽ hữu ích hơn một danh sách tính năng.",
    "feedbackAction": "Trong Wizzdom → Cài đặt → Liên hệ hỗ trợ → Vấn đề khác. Ghi ý tưởng, lỗi gặp phải hoặc yêu cầu tăng lượt; thêm liên hệ nếu muốn mình trả lời. Không cần gửi lịch sử chat hoặc thông tin nhạy cảm."
  },
  "en": {
    "title": "Download Wizzdom — Setup and getting started",
    "description": "Set up Wizzdom on your Mac, connect Codex or Claude, and see when your history is helping.",
    "home": "Home",
    "navSetup": "Setup",
    "navHow": "How it works",
    "navPrivacy": "Data & permissions",
    "eyebrow": "WIZZDOM FOR MAC",
    "headline": "Your next chat.\nWith your history in mind.",
    "intro": "Bring earlier decisions, lessons and details into the work you do with AI. Wizzdom finds what matters; you choose what to use.",
    "beta": "Open beta",
    "availability": "Public download is not open yet.",
    "availabilityBody": "You can join the beta list. The Wizzdom team will get in touch when a suitable testing round opens; there is no public installer link yet.",
    "join": "Join the beta",
    "download": "Download for Mac",
    "check": "See how to get started",
    "requirements": "macOS 13 or later · Apple Silicon (M1 or newer)",
    "unsupported": "Windows and Intel Macs are not supported yet.",
    "signed": "The installer is signed and notarized with Apple.",
    "setupKicker": "01 / GET STARTED",
    "setupTitle": "Install once. Choose what Wizzdom gets to know.",
    "setupIntro": "No Terminal or personal API key required. A Wizzdom account enables Cloud AI; you can start in local mode.",
    "steps": [
      [
        "Drag into Applications",
        "Download the DMG, open it and drag Wizzdom into Applications. Launch it there so settings and permissions belong to the right app."
      ],
      [
        "Sign in & choose sources",
        "Choose the history you want to import. Importing stores data on your Mac; memory initialization and Cloud AI analysis require separate consent."
      ],
      [
        "Connect the AI you use",
        "Wizzdom configures the connection. If it asks you to reopen your host or grant Accessibility, follow the instructions inside the app."
      ]
    ],
    "hostTitle": "The first step depends on your AI app.",
    "hostIntro": "A configured connection does not prove that a chat turn has been captured and checked.",
    "hosts": [
      {
        "name": "Codex / ChatGPT Work",
        "icon": "openai.svg",
        "tag": "Observation via hooks",
        "body": "Connect in Wizzdom. Reopen Codex if asked, then send a chat turn and wait for the AI response.",
        "expect": "In Today, look for the official chat title and the latest check result."
      },
      {
        "name": "Claude Desktop Chat",
        "icon": "claude.svg",
        "tag": "Foreground · Experimental",
        "body": "Opt in to capture in Wizzdom, grant Wizzdom Accessibility, then open Claude Chat. Send a new turn and keep Claude in the foreground.",
        "expect": "Only reads rendered messages. Does not read all background chats, account history or Cowork."
      }
    ],
    "laterHosts": "Cursor and Antigravity are experimental integrations with their own capabilities. Read the description in Connections; automatic observation is not the same across apps.",
    "howKicker": "02 / WHILE YOU WORK",
    "howTitle": "A reminder when history changes the next move.",
    "howIntro": "Wizzdom compares the chat turn with your selected sources. When something deserves a look, a card offers a claim, supporting evidence and a concrete next step. Inspect sources, use the context, save privately or dismiss.",
    "example": "Illustration · not your personal data",
    "exampleChat": "Planning a product",
    "exampleClaim": "Test demand before building more.",
    "exampleBody": "You previously chose customer interviews before adding features. The new plan may skip that validation step.",
    "exampleAction": "Next step",
    "exampleNext": "Choose one hypothesis and one customer interview to test it before coding.",
    "exampleSource": "Open the source to verify",
    "exampleUse": "You approve before using",
    "statesTitle": "Know what is waiting, checked or needs attention.",
    "statesIntro": "Today shows chat titles, last activity and check results. A green dot or an empty card list alone does not establish that analysis is running.",
    "states": [
      [
        "Waiting",
        "A prompt was captured; the response has not finished. There is no analysis conclusion yet."
      ],
      [
        "Checked",
        "No suggestion can be a valid result: history has not revealed something that changes the current decision."
      ],
      [
        "Needs attention",
        "Missing permission, a broken connection or failed analysis requires recovery. It is not a silence result."
      ]
    ],
    "memoryTitle": "Memory starts as proposals for you to review.",
    "memoryBody": "After importing, you can request memory initialization. AI proposes sourced goals, decisions and preferences. Edit, confirm or reject them; a new proposal does not automatically become a fact about you.",
    "privacyKicker": "03 / BEFORE YOU ENABLE IT",
    "privacyTitle": "Local-first does not mean entirely offline.",
    "privacy": [
      [
        "Stored on your Mac",
        "Imported sources and the context database stay local. Choose sources and scope; you do not have to grant access to all your history to start."
      ],
      [
        "When Cloud AI is enabled",
        "Chat content and relevant evidence may be sent to the Wizzdom backend and AI provider for analysis. Memory initialization also uses selected source excerpts."
      ],
      [
        "Why Accessibility?",
        "Claude Chat uses this permission to read sent prompts and displayed responses. Drafts are not read. You can pause capture or revoke permission."
      ]
    ],
    "privacyNote": "History import, live capture and Cloud AI analysis are separate choices. Accessibility lets Wizzdom read displayed Claude chat; grant it only to the Wizzdom app in Applications. Pause in the app or revoke it in System Settings → Privacy & Security → Accessibility. Turning off notifications alone does not pause capture.",
    "faqTitle": "Before you begin.",
    "faq": [
      [
        "No cards: is Wizzdom running?",
        "Check Today and Connections. Distinguish a waiting turn, a completed check with no suggestion, and an error. Do not rely on the card count alone."
      ],
      [
        "Does Wizzdom send context to my AI automatically?",
        "You approve the action. Codex can queue context for the next prompt where supported; other hosts may use copy and paste. Copied, queued and host-received are different states."
      ],
      [
        "Does Claude MCP read every conversation?",
        "No. MCP provides tools when called. Claude Chat observation is a separate Accessibility mechanism and only covers rendered foreground content."
      ],
      [
        "What if I mostly use AI web apps?",
        "Desktop is the current primary experience. The browser extension needs separate setup; join the beta and tell the team you mainly use web apps. There is no store extension download on this page yet."
      ],
      [
        "Can I pause or uninstall?",
        "You can pause capture and switch off Cloud AI separately. Before uninstalling, disconnect hosts in Wizzdom and choose whether to keep, export or manage local data. Uninstalling does not mean all local data has been deleted."
      ],
      [
        "Do I need an API key or a separate AI plan?",
        "Wizzdom does not ask you for an OpenAI API key. Cloud AI requires a Wizzdom account and is subject to in-app limits. Connecting a host does not replace that host’s account or plan."
      ]
    ],
    "footer": "Your history. The right moment. A better next move.",
    "back": "Back to home",
    "preview": "Explore the interactive demo",
    "checksum": "SHA-256",
    "releaseLabel": "Community beta",
    "language": "Language",
    "betaNote": "This is an early beta and may contain bugs. Report issues in the app so I can investigate and help.",
    "pricingKicker": "FREE DURING BETA",
    "pricingTitle": "Use it. Tell me what actually helps.",
    "pricingIntro": "AI features inside Wizzdom are free during this beta. You do not need to buy API access or enter your own API key.",
    "pricing": [
      [
        "If we hit an API limit",
        "The shared AI service allowance may occasionally run out. Please bear with me; I’ll reset or top it up as soon as I see it. Reporting it in the app helps me notice sooner."
      ],
      [
        "Need more usage? Just ask.",
        "The in-app limit is mainly there to prevent spam, not to make you ration normal use. If you want to use Wizzdom a lot, send a request and I’ll raise your allowance."
      ]
    ],
    "pricingNote": "Free access applies to Wizzdom’s AI during beta. Codex, Claude and other services keep their own account and plan requirements.",
    "ideasKicker": "LET’S BUILD WIZZDOM TOGETHER",
    "ideasTitle": "A few directions I’d love to explore with you.",
    "ideasIntro": "Memory and context chat are already in the beta. The directions below are ideas in development, not feature or delivery-date promises.",
    "ideas": [
      [
        "A knowledge hub that grows over time",
        "Imagine an Obsidian-like space with less manual logging: AI collects from sources you allow and proposes organized knowledge for you to review. The goal is better recall and connections as history accumulates; the quality still needs your verification.",
        "Building on Memory"
      ],
      [
        "Wizzdom Recall",
        "“I remember doing or saying this somewhere, but which chat was it?” Describe the details you remember. Wizzdom would find the source, let you inspect and approve it, then bring the context back into your chat.",
        "Feature idea"
      ],
      [
        "Reflection & routine journaling",
        "The context chat in onboarding suggests a way to reflect: connect events, take a broader view and question your own assumptions. I’d love to explore reflection and everyday journaling with you.",
        "Exploration"
      ]
    ],
    "feedbackTitle": "What would you like Wizzdom to help with?",
    "feedbackBody": "If one of these directions interests you, or you have a different idea, tell me. A concrete example from your workflow is more useful than a feature list.",
    "feedbackAction": "In Wizzdom → Settings → Contact support → Other. Share an idea, a bug or a request for more usage; add contact details if you want a reply. No chat history or sensitive information needed."
  }
};
