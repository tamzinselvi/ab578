import type { Messages } from "./en";

// Traditional Chinese. Machine-assisted translation of en.ts; the English
// version is the official one. Keep every {placeholder} and every section
// marker unchanged.
export const zhHant: Messages = {
  siteName: "AB 578 投訴工具",
  metaDescription:
    "一分鐘內依加州 AB 578 法提出外送餐點退款投訴。免費、私密、無需帳號。",
  skipToContent: "跳至主要內容",
  languageLabel: "語言",
  languageSuggestRegion: "語言建議",
  languageSuggestPrompt: "改用{language}？",
  languageSuggestDismiss: "關閉",

  homeHeadline: "拿回你的外送訂單款項",
  homeSubhead: "要求州檢察長執行 AB 578",
  homeCta: "提出投訴 →",
  homeHow: "怎麼做？",

  fileTitle: "提出投訴",
  fileHeading: "提出投訴",

  wizardProgressLabel: "投訴步驟",
  wizardStepLabel: "第 {current} 步，共 {total} 步",
  wizardStepIssues: "出了什麼問題",
  wizardStepPlatform: "哪個應用程式",
  wizardStepDetails: "訂單詳情",
  wizardStepKit: "你的投訴資料",
  wizardBack: "上一步",
  wizardNext: "下一步",
  wizardContinue: "繼續",
  wizardStartOver: "重新開始",
  wizardClearData: "清除我的資料",
  wizardClearedNote: "本網站存在你裝置上的所有資料都已清除。",
  wizardDraftRestored: "歡迎回來。你的答案都還在。",

  wizardIssuesHeading: "出了什麼問題？",
  wizardIssuesHint: "選出所有發生的情況。之後可以修改。",
  wizardIssueNotDelivered: "根本沒送到",
  wizardIssueWrongOrder: "整份訂單都錯了",
  wizardIssueWrongItems: "部分餐點送錯",
  wizardIssueMissingItems: "部分餐點漏送",
  wizardIssueUnusableItems: "部分餐點無法食用（灑出、壓爛或被打開）",
  wizardIssueCredits: "只給我應用程式內點數",
  wizardIssueRefundDenied: "拒絕退款",
  wizardIssueNoHuman: "找不到真人客服",
  wizardIssueNotCovered: "送太晚、冷掉或品質很差",
  wizardIssueNotCoveredNote: "AB 578 不涵蓋這項，但我們仍會幫你提出要求",
  wizardAtAddress: "標示為已送達時，我人就在送達地址（選填，只有屬實才勾選）",
  wizardIssuesError: "請至少選一個出問題的地方。",

  wizardPlatformHeading: "你用哪個應用程式點餐？",
  wizardPlatformHint: "點選你的應用程式。我們會為它撰寫投訴內容。",
  wizardPlatformOther: "其他應用程式",
  wizardPlatformOtherLabel: "應用程式名稱",
  wizardPlatformOtherError: "請輸入應用程式名稱，或從清單中選一個。",

  wizardDetailsHeading: "訂單詳情",
  wizardOrderDateLabel: "訂單日期",
  wizardOrderTotalLabel: "訂單總額",
  wizardMoneyExampleHint: "只填數字，例如 24.50",
  wizardKeypadLabel: "訂單總額數字鍵盤",
  wizardKeypadDelete: "刪除",
  wizardRefundedHeading: "目前已退款",
  wizardRefundNone: "還沒有",
  wizardRefundCredits: "只有應用程式點數",
  wizardRefundPartial: "部分",
  wizardRefundFull: "全部",
  wizardRefundedAmountLabel: "退了多少錢？",
  wizardOptionalSummary: "可加強投訴的選填資料",
  wizardAffectedTotalLabel: "漏送、送錯或無法食用的餐點價格",
  wizardAffectedTotalHint: "用來估算退款金額",
  wizardOrderNumberLabel: "訂單編號",
  wizardRestaurantLabel: "餐廳",
  wizardItemsLabel: "哪些餐點送錯、漏送或無法食用？",
  wizardItemsPlaceholder: "例如：2 份照燒雞，沒有醬汁",
  wizardContactedLabel: "我已就這筆訂單聯絡過應用程式",
  wizardContactedDateLabel: "聯絡日期",
  wizardContactedMethodLabel: "你怎麼聯絡他們？",
  wizardMethodChat: "線上聊天",
  wizardMethodPhone: "電話",
  wizardMethodEmail: "電子郵件",
  wizardMethodOther: "其他",
  wizardContactedResultLabel: "結果如何？",
  wizardContactedResultPlaceholder: "例如：只給我 5 美元點數",
  wizardContactedResultError: "請用一句話說明結果，或取消勾選。",
  wizardDetailsErrorTotal: "請輸入訂單總額，例如 24.50",
  wizardDetailsErrorDate: "請輸入有效的日期。",

  wizardKitHeading: "你的投訴資料",
  wizardKitIntro: "把每一部分複製到需要的地方。所有資料都留在你的裝置上。",
  wizardKitIncomplete: "請先完成前面的步驟，才能看到你的投訴資料。",
  wizardKitIncompleteBack: "回到問題",
  wizardContactHeading: "你的聯絡資料",
  wizardContactIntro:
    "州檢察長的表格會要求你的姓名和地址。在這裡填好，投訴資料也會一併填入這些答案。",
  wizardContactFirstName: "名字",
  wizardContactLastName: "姓氏",
  wizardContactStreet: "街道地址",
  wizardContactStreet2: "公寓或單位號碼（選填）",
  wizardContactCity: "城市",
  wizardContactState: "州",
  wizardContactZip: "郵遞區號",
  wizardContactEmail: "電子郵件（選填）",
  wizardContactPhone: "電話（選填）",
  wizardContactRemember: "在這台裝置上記住",
  wizardContactRememberNote:
    "只存在這台裝置上，絕不會傳送到任何地方，直到你清除為止。",
  wizardContactAdd: "加入我的聯絡資料",
  wizardContactSavedNote: "你的聯絡資料已加入投訴資料。",
  wizardContactError: "名字、姓氏、街道地址、城市和郵遞區號為必填。",

  wizardNoJsHeading: "此流程需要 JavaScript",
  wizardNoJsBody:
    "這個工具完全在你的瀏覽器中運作。沒有 JavaScript 的話，請直接前往加州州檢察長的投訴表格：",
  wizardNoJsLink: "開啟州檢察長投訴表格",

  aboutTitle: "關於",
  aboutHeading: "關於",
  aboutMetaDescription:
    "這個免費投訴工具如何運作、我們為什麼要求全額退款，以及加州 AB 578 法規定外送應用程式在訂單出錯時必須怎麼做。",
  aboutHowHeading: "運作方式",
  aboutHowStep1: "告訴我們你的訂單出了什麼問題。大約只要一分鐘。",
  aboutHowStep2:
    "我們幫你寫一份退款要求，你可以直接貼到 DoorDash、Uber Eats 或 Grubhub 的客服。",
  aboutHowStep3:
    "我們幫你填好給加州州檢察長的投訴。你把每個答案複製到州檢察長的表格裡，然後按送出。",
  aboutHowNote: "沒有帳號，也沒有資料庫。你輸入的任何內容都不會離開你的手機。",
  aboutWhyHeading: "我們為什麼要求全額退款",
  aboutWhyP1:
    "外送應用程式搞砸你的訂單時，通常只退出錯的那一項，有時還只給應用程式內點數。這樣不夠。",
  aboutWhyP2:
    "如果你的餐點少了或送錯，你還是沒有晚餐。要補回來，就得重新點餐，再付一次外送費、服務費和小費，再等一次。部分退款完全不涵蓋這些。如果少掉的是你孩子或伴侶的餐，他們今晚就是沒得吃。",
  aboutWhyP3:
    "送錯的訂單也可能很危險。對花生過敏的人拿到錯的餐點。有乳糜瀉的人吃到麩質。有糖尿病的人拿到一般汽水而不是無糖汽水。吃清真或猶太潔食的人拿到不能吃的肉。大家在訂單上寫備註是有原因的，忽視它們可能會把人送進醫院。",
  aboutWhyP4:
    "這是外送公司和餐廳造成的問題，不該由你來承擔。外送應用程式必須和每一家合作外送的餐廳簽約，而加州法律要求它們告訴每家餐廳，訂單出錯的成本雙方如何分攤（商業與職業法典 § 22599(a) 和 (d)）。應用程式想拿回這筆錢，可以向餐廳收，不是向你收。",
  aboutLawHeading: "加州法律站在你這邊",
  aboutLawP1:
    "AB 578 於 2026 年 1 月 1 日生效。送錯訂單時，外送應用程式必須全額退款給你，包括稅金、各項費用和小費（商業與職業法典 § 22599.2(a)）。外送員保留他們的小費，成本由應用程式吸收。",
  aboutLawP2:
    "法律沒有定義什麼是「送錯訂單」，所以我們採用最直白的意思：送來的東西不是你點的，就是送錯訂單。這包括漏送的餐點、送錯的餐點，以及送到時已經毀損的食物。加州法院對消費者保護法採取寬鬆解釋，偏向保護消費者，我們對這條法律的解讀也正是如此。我們寫的每一份要求，都要求全額退回你原本的付款方式，而不是應用程式點數。",
  aboutLawP3:
    "法律也設了底線。你沒收到的東西，不能向你收費（§ 22599.2(d)）。我們也把這一點寫進每一份要求，讓應用程式不能直接無視你。",
  aboutImpactHeading: "為什麼投訴很重要",
  aboutImpactP1:
    "外送應用程式就是賭你會放棄。一份退款要求很容易被忽視。但數百份送到州檢察長的投訴就不是了。州檢察長會根據投訴決定要調查哪些公司。",
  aboutImpactP2: "先拿回你的錢，再提出投訴。只要一分鐘。",
  aboutStoryHeading: "你為什麼做這個？",
  aboutStoryP1:
    "我吃素。不只一次，我點的外送裡，明明要求不加肉的餐點卻有肉，而我在發現之前已經咬了一口。聽起來也許誇張，但我覺得受到侵犯。外送應用程式完全不在乎，只把我丟進一個自動化迴圈，讓我根本不可能得到補償。",
  aboutStoryP2:
    "我做這個，是為了讓任何人都能輕鬆向州檢察長提出投訴，讓這些公司負起責任。這些企業這樣欺負我們，是不可接受的。",
  aboutNotLegalAdvice:
    "這不是法律建議。我們與加州政府、DoorDash、Uber Eats、Grubhub 或任何其他公司都沒有關聯。",

  faqTitle: "常見問題",
  faqHeading: "常見問題",
  faqMetaDescription:
    "點數與退款的差別、小費怎麼處理、我們為什麼要求全額退款、州檢察長會做什麼，以及帳號被停用的風險。",
  faqCreditsQuestion: "應用程式點數和退款有什麼不同？",
  faqCreditsAnswer:
    "應用程式點數只能在那個應用程式裡使用，帳號沒了點數也就沒了。退款會退回你付款用的信用卡或其他方式。加州法律規定，外送應用程式必須讓你能要求把退款退回原本的付款方式（商業與職業法典 § 22599.2(e)）。我們寫的每一份要求都要求退款，而不是點數。",
  faqTipsQuestion: "小費怎麼辦？",
  faqTipsAnswer:
    "訂單退款時，你付的小費也會退給你，而且應用程式不能從外送員的收入中扣回（§ 22599.2(b)）。如果你的訂單只完成了一部分，應用程式也必須讓你調低送達前加的小費（§ 22599.2(d)）。",
  faqFullRefundQuestion: "只有一項送錯或漏送，為什麼要求全額退款？",
  faqFullRefundAnswer:
    "因為送來的訂單不是你付錢買的那一份，我們把這解讀為送錯訂單，而依法送錯訂單應全額退款（§ 22599.2(a)）。這個解讀是有爭議的，並非定論，所以我們也寫出無論如何你都應得的底線：你沒收到的餐點，不能向你收費（§ 22599.2(d)）。",
  faqFullRefundLink: "我們為什麼要求全額退款",
  faqAgQuestion: "州檢察長會怎麼處理我的投訴？",
  faqAgAnswer:
    "州檢察長的消費者辦公室會閱讀投訴，並據此決定要調查哪些公司。他們可能會把你的投訴轉給該公司。他們不會擔任你的律師，也不會解決你個人的糾紛。所以這個工具會先幫你要求退款，再幫你檢舉。",
  faqAccountQuestion: "應用程式會因此停用我的帳號嗎？",
  faqAccountAnswer:
    "有可能。法律允許外送應用程式移除它合理懷疑有詐欺行為的顧客（§ 22599.2(f)）。要求法律本來就欠你的退款，不是詐欺。一份誠實的投訴，加上你的收據、照片和應用程式自己的訊息，就是最好的保護。",
  faqLegalQuestion: "這是法律建議嗎？",
  faqLegalAnswer:
    "不是。本網站說明法律並幫你撰寫投訴。它不是律師事務所，也與加州政府或任何外送公司沒有關聯。若需要針對你個人情況的建議，請諮詢律師或法律援助機構。",
  faqEnglishQuestion: "為什麼我的投訴是英文的？",
  faqEnglishAnswer:
    "你可以用七種語言閱讀本網站。你送出的投訴預設仍為英文，因為州檢察長的線上表格是英文的。你的投訴資料會把英文和你的語言並排顯示。寫給外送應用程式時，可以用切換鈕把訊息改成你的語言。",

  privacyTitle: "隱私",
  privacyHeading: "隱私",
  privacyMetaDescription:
    "你輸入的任何內容都不會離開你的裝置。沒有帳號、沒有資料庫、沒有分析追蹤。",
  privacyP1: "你輸入的任何內容都不會離開你的裝置。",
  privacyP2:
    "本網站沒有帳號，也沒有資料庫。它會在你的瀏覽器中保存投訴草稿，方便你回來繼續。只有在你要求記住時，才會保存你的聯絡資料。「清除我的資料」會刪除所有內容，包括你的語言選擇。",
  privacyP3:
    "當你開啟州檢察長的表格或外送應用程式的客服頁面時，是你自己送出投訴。這裡沒有人會看到。",

  platformMetaDescription:
    "如何要求 {name} 退款到你原本的付款方式、聯絡真人客服，以及向加州州檢察長提出 AB 578 投訴。",
  platformHeading: "向 {name} 拿回你的錢",
  platformIntro:
    "{name} 的訂單出錯時，你可以要求退錢，而不只是拿應用程式點數。我們幫你寫好要求。以下是 {name} 公開說明的流程，以及應用程式敷衍你時如何找到真人。",
  platformRefundHeading: "如何要求退款到你的卡片",
  platformRefundLaw:
    "要求退款到原本的付款方式，而不是應用程式點數。除了其他選項之外，應用程式必須讓你能提出這個要求（§ 22599.2(e)）。",
  platformRefundPathLabel: "{name} 公開說明的退款流程",
  platformRefundHelpLink: "開啟 {name} 的退款說明頁面",
  platformHumanHeading: "如何聯絡真人客服",
  platformHumanLaw:
    "如果自動客服解決不了你的問題，應用程式必須讓你盡快聯絡到真人（§ 22599.1(f)）。",
  platformHumanLabel: "如何聯絡 {name} 的真人客服",
  platformSupportLink: "開啟 {name} 客服",
  platformFileIntro:
    "想讓我們幫你寫？這個工具會把出錯的情況整理成給 {name} 的退款要求，以及給加州州檢察長的投訴。",
  platformFileLegal: "這不是法律建議。我們與加州政府或任何外送公司都沒有關聯。",

  evidenceHeading: "把截圖轉成 PDF",
  evidenceIntro:
    "投訴表格接受 PDF、Word 或 Excel 檔案，不接受圖片。選擇你的截圖，想要的話可以為每張加上說明，然後下載一份可直接附加的 PDF。全部在你的裝置上完成，不會上傳任何東西。",
  evidenceAddImages: "加入截圖",
  evidenceAddMore: "加入更多截圖",
  evidenceImageCount: "{count} 張圖片",
  evidenceCaptionLabel: "{name} 的說明",
  evidenceCaptionHint: "說明會直接畫在圖片上，任何語言都可以。",
  evidenceCaptionPlaceholder: "例如：這不是我點的",
  evidenceMoveEarlier: "把 {name} 往前移",
  evidenceMoveLater: "把 {name} 往後移",
  evidenceRemoveImage: "移除 {name}",
  evidenceBuild: "製作 PDF",
  evidenceBuilding: "正在製作 PDF",
  evidenceCompressingProgress: "正在壓縮第 {done} 張圖片，共 {total} 張",
  evidenceAssemblingProgress: "正在組合 PDF，第 {done} 頁，共 {total} 頁",
  evidenceResultHeading: "你的證據 PDF 已經準備好了",
  evidenceResultPages: "{pages} 頁",
  evidenceResultSize: "檔案大小：{size}",
  evidenceOverBudgetWarning:
    "這份 PDF 超過 4 MB 的上限。請移除一兩張截圖後重新製作。",
  evidenceDownload: "下載 {filename}",
  evidenceSkippedFiles:
    "以下檔案因為這個瀏覽器無法讀取而略過：{names}。換個瀏覽器也許可以開啟。",
  evidenceBuildFailed: "無法製作 PDF。請再試一次，或使用較少或較小的截圖。",
  evidenceEmptyHint: "JPEG 或 PNG 截圖效果最好。",

  kitTitle: "你的投訴資料",
  kitAsksHeading: "你要求的內容",
  kitAskLabelSettled: "法律明文規定",
  kitAskLabelArgued: "依我們對加州法律的解讀，有法律支持",
  kitAskLabelPlain: "依應用程式自身政策提出的一般要求",
  kitFloorLine: "至少應退給你 {amount}",
  kitFloorFallback: "至少：{fallback}",
  kitWhyLink: "為什麼？",
  kitEstimateHeading: "預估退款",
  kitOutgoingLanguage: "你寄出訊息的語言",
  kitSendInLanguage: "以{language}寄出",
  kitSendInEnglish: "以英文寄出",
  kitTranslationLabel: "翻譯",
  kitPlatformCardTitle: "向 {platform} 拿回退款",
  kitPlatformFallbackName: "外送應用程式",
  kitMessageShortLabel: "簡短版，用於線上聊天",
  kitMessageLongLabel: "完整版，用於電子郵件或網頁表單",
  kitCopy: "複製",
  kitCopied: "已複製",
  kitCopyLabel: "複製{what}",
  kitShare: "分享訊息",
  kitOpenSupport: "開啟 {platform} 客服",
  kitHumanTipsHeading: "如何聯絡真人客服",
  kitAgCardTitle: "向加州州檢察長檢舉",
  kitAgIntro: "依照順序，把每個答案複製到州政府的線上表格。表格是英文的。",
  kitAgOpenForm: "開啟州檢察長表格",
  kitAgUploadHeading: "附上你的證據",
  kitAgUploadGuidance:
    "最多可附加 {count} 個檔案（{types}），每個小於 {limit} MB。用下方工具製作 PDF 後附上。",
  kitAgUploadLink: "前往證據工具",
  kitAgMailInNote: "你也可以列印{language}的投訴表格並郵寄。",
  kitAgMailInLink: "下載{language}郵寄表格（PDF）",
  kitAgFillHeading: "讓電腦幫你填",
  kitAgFillIntro:
    "一個書籤會用你的答案填好州檢察長的表格，並附上你的證據 PDF。只需設定一次。",
  kitAgFillStep1: "把這個按鈕拖到瀏覽器的書籤列：",
  kitAgFillBookmarkName: "填寫 AG 表格",
  kitAgFillBarHint: "看不到書籤列？按 Ctrl+Shift+B，Mac 請按 ⌘+Shift+B。",
  kitAgFillStep2: "選填：在下方第 3 步製作你的證據 PDF。書籤會幫你附上。",
  kitAgFillCopy: "複製我的答案",
  kitAgFillStep3: "開啟州檢察長表格，然後點一下「填寫 AG 表格」書籤。",
  kitAgFillStep4: "檢查答案，回答最下面的問題，然後按 Submit。",
  kitAgFillDragHint: "請把這個按鈕拖到書籤列。在這裡點擊不會有任何作用。",
  kitAgFillNoContact:
    "在上方加入你的聯絡資料，書籤也會一併填入你的姓名和地址。",
  kitAgManualSummary: "改為逐一複製答案",
  agFillPrompt:
    "無法開啟你的投訴資料。請從投訴資料複製答案，再按 Ctrl+V 貼到這裡（Mac 請按 ⌘+V）。",
  agFillPasteLabel: "在這裡貼上你的答案",
  agFillWrongPage: "請先開啟州檢察長的投訴表格，再點一次這個書籤。",
  agFillOpenForm: "開啟州檢察長投訴表格",
  agFillNotKit:
    "這看起來不是你的答案。請回到你的投訴資料，點「複製我的答案」，然後再貼上一次。",
  agFillDone:
    "完成。已填入 {count} 個答案。請檢查答案，附上證據，回答最下面的問題，然後按 Submit。",
  agFillClose: "關閉",
  kitAgFillEvidenceLink: "前往第 3 步",
  kitAgFillEvidenceReady: "已就緒：將附上 {filename}。",
  kitAgFillFallback:
    "沒有反應，或瀏覽器擋住了彈出視窗？請複製你的答案，再點一次書籤並貼上。",
  agFillWaiting: "正在從你的投訴資料取得答案…",
  agFillNoHandoff:
    "在這台電腦上找不到你的答案。請從投訴資料複製答案，再按 Ctrl+V 貼到這裡（Mac 請按 ⌘+V）。",
  agFillDoneFile:
    "完成。已填入 {count} 個答案並附上你的證據 PDF。請檢查答案，回答最下面的問題，然後按 Submit。",
  agfillPageTitle: "正在傳送你的答案",
  agfillPageSending: "正在把你的答案傳送到州檢察長表格…",
  agfillPageSent: "已傳送。這個視窗即將關閉。",
  agfillPageNoData:
    "在這台電腦上找不到答案。請先在這個瀏覽器開啟你的投訴資料，再點一次書籤。",
  agfillPageNoOpener:
    "請開啟州檢察長的投訴表格，然後在那裡點一下「填寫 AG 表格」書籤。",
  agfillPageOpenKit: "開啟你的投訴資料",
  privacyP4:
    "為了幫你填寫州檢察長的表格，投訴工具會把你的答案和證據 PDF 保存在這個瀏覽器中兩小時。「填寫 AG 表格」書籤只會把它們交給州檢察長的表格頁面。「清除我的資料」會立即刪除它們。",
  kitMoreCardTitle: "更多行動方式",
  kitMoreCardHint: "你所在地的地方檢察官、FTC 和小額訴訟法庭",
  kitDestDa: "找到你的地方檢察官或市檢察官",
  kitDestDaNote: "他們負責在你的郡執行加州消費者法律。",
  kitDestFtc: "向 FTC 檢舉",
  kitDestFtcNote: "你的報告會進入與執法單位共享的聯邦資料庫。",
  kitDestSmallClaims: "到小額訴訟法庭告應用程式",
  kitDestSmallClaimsNote:
    "加州官方的自助指南。法院希望你在提告前先要求對方付款。",
  kitDemandLetterHeading: "可列印的催告信",
  kitDemandLetterIntro: "提告前先寄給應用程式。信中寫明對方欠你多少以及原因。",
  kitSaveHeading: "保留紀錄",
  kitSaveIntro: "保存一份附日期的投訴資料副本，供日後查考。",
  kitPrint: "列印投訴資料",
  kitDownloadRecord: "下載紀錄",
  kitClipboardFallbackHeading: "手動複製",
  kitClipboardFallbackIntro:
    "這個瀏覽器封鎖了自動複製。下方文字已選取，請自行複製。",
  kitClipboardFallbackLabel: "要手動複製的文字",
  kitCitationsHeading: "這份投訴資料依據的法律",
  kitCitationVerified: "已於 {date} 查證。",
  kitCitationArgued: "此為有爭議的解讀。明確的底線是 {section}。",
  kitCitationSource: "閱讀條文",

  kitRecordTitle: "AB 578 投訴資料紀錄",
  kitRecordSaved: "保存於 {date}",
  kitRecordAsks: "你要求的內容",
  kitRecordPlatformMessage: "給應用程式的訊息",
  kitRecordAgForm: "州檢察長投訴",
  kitRecordAgFormUrl: "表格：{url}",
  kitRecordDemandLetter: "催告信",
  kitRecordDestinations: "其他投訴管道",
  kitRecordCitations: "這份投訴資料依據的法律",

  notFoundTitle: "找不到頁面",
  notFoundHeading: "找不到頁面",
  notFoundBody: "這個頁面不存在。",
  notFoundHome: "前往首頁",

  footerNavLabel: "網站選單",
  footerAbout: "關於",
  footerFaq: "常見問題",
  footerPrivacy: "隱私",
  footerDisclaimer: "這不是法律建議。我們與加州政府或任何外送公司都沒有關聯。",
  footerTranslatedNote: "本頁為機器翻譯。英文版為正式版本。",
};
