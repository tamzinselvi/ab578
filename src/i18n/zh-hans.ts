import type { Messages } from "./en";

// Simplified Chinese. Machine-assisted translation of en.ts; the English
// version is the official one. Keep every {placeholder} and every section
// marker unchanged.
export const zhHans: Messages = {
  siteName: "AB 578 投诉工具",
  metaDescription:
    "一分钟内依据加州 AB 578 法提出外卖退款投诉。免费、私密、无需账号。",
  skipToContent: "跳到主要内容",
  languageLabel: "语言",
  languageSuggestRegion: "语言建议",
  languageSuggestPrompt: "改用{language}？",
  languageSuggestDismiss: "关闭",

  homeHeadline: "拿回你的外卖订单款项",
  homeSubhead: "要求州总检察长执行 AB 578",
  homeCta: "提交投诉 →",
  homeHow: "怎么做？",

  fileTitle: "提交投诉",
  fileHeading: "提交投诉",

  wizardProgressLabel: "投诉步骤",
  wizardStepLabel: "第 {current} 步，共 {total} 步",
  wizardStepIssues: "出了什么问题",
  wizardStepPlatform: "哪个应用",
  wizardStepDetails: "订单详情",
  wizardStepKit: "你的投诉材料",
  wizardBack: "上一步",
  wizardNext: "下一步",
  wizardContinue: "继续",
  wizardStartOver: "重新开始",
  wizardClearData: "清除我的数据",
  wizardClearedNote: "本网站保存在你设备上的所有数据都已清除。",
  wizardDraftRestored: "欢迎回来。你的答案都还在。",

  wizardIssuesHeading: "出了什么问题？",
  wizardIssuesHint: "选出所有发生的情况。之后可以修改。",
  wizardIssueNotDelivered: "根本没送到",
  wizardIssueWrongOrder: "整份订单都错了",
  wizardIssueWrongItems: "部分餐品送错",
  wizardIssueMissingItems: "部分餐品漏送",
  wizardIssueUnusableItems: "部分餐品无法食用（洒了、压烂或被打开）",
  wizardIssueCredits: "只给了我应用内积分",
  wizardIssueRefundDenied: "拒绝退款",
  wizardIssueNoHuman: "联系不到人工客服",
  wizardIssueNotCovered: "送太晚、凉了或质量很差",
  wizardIssueNotCoveredNote: "AB 578 不涵盖这一项，但我们仍会帮你提出要求",
  wizardAtAddress: "标记为已送达时，我本人就在送达地址（选填，只有属实才勾选）",
  wizardIssuesError: "请至少选择一个出问题的地方。",

  wizardPlatformHeading: "你用哪个应用点的餐？",
  wizardPlatformHint: "点选你的应用。我们会为它撰写投诉内容。",
  wizardPlatformOther: "其他应用",
  wizardPlatformOtherLabel: "应用名称",
  wizardPlatformOtherError: "请输入应用名称，或从列表中选择一个。",

  wizardDetailsHeading: "订单详情",
  wizardOrderDateLabel: "订单日期",
  wizardOrderTotalLabel: "订单总额",
  wizardMoneyExampleHint: "只填数字，例如 24.50",
  wizardKeypadLabel: "订单总额数字键盘",
  wizardKeypadDelete: "删除",
  wizardRefundedHeading: "目前已退款",
  wizardRefundNone: "还没有",
  wizardRefundCredits: "只有应用内积分",
  wizardRefundPartial: "部分",
  wizardRefundFull: "全部",
  wizardRefundedAmountLabel: "退了多少钱？",
  wizardOptionalSummary: "可加强投诉的选填信息",
  wizardAffectedTotalLabel: "漏送、送错或无法食用的餐品价格",
  wizardAffectedTotalHint: "用于估算退款金额",
  wizardOrderNumberLabel: "订单号",
  wizardRestaurantLabel: "餐厅",
  wizardItemsLabel: "哪些餐品送错、漏送或无法食用？",
  wizardItemsPlaceholder: "例如：2 份照烧鸡，没有酱汁",
  wizardContactedLabel: "我已就这笔订单联系过应用",
  wizardContactedDateLabel: "联系日期",
  wizardContactedMethodLabel: "你是怎么联系他们的？",
  wizardMethodChat: "在线聊天",
  wizardMethodPhone: "电话",
  wizardMethodEmail: "电子邮件",
  wizardMethodOther: "其他",
  wizardContactedResultLabel: "结果如何？",
  wizardContactedResultPlaceholder: "例如：只给了我 5 美元积分",
  wizardContactedResultError: "请用一句话说明结果，或取消勾选。",
  wizardDetailsErrorTotal: "请输入订单总额，例如 24.50",
  wizardDetailsErrorDate: "请输入有效的日期。",

  wizardKitHeading: "你的投诉材料",
  wizardKitIntro: "把每一部分复制到需要的地方。所有数据都留在你的设备上。",
  wizardKitIncomplete: "请先完成前面的步骤，才能看到你的投诉材料。",
  wizardKitIncompleteBack: "返回问题",
  wizardContactHeading: "你的联系信息",
  wizardContactIntro:
    "州总检察长的表格会要求填写你的姓名和地址。在这里填好，投诉材料也会一并填入这些答案。",
  wizardContactFirstName: "名",
  wizardContactLastName: "姓",
  wizardContactStreet: "街道地址",
  wizardContactStreet2: "公寓或单元号（选填）",
  wizardContactCity: "城市",
  wizardContactState: "州",
  wizardContactZip: "邮政编码",
  wizardContactEmail: "电子邮件（选填）",
  wizardContactPhone: "电话（选填）",
  wizardContactRemember: "在这台设备上记住",
  wizardContactRememberNote:
    "只保存在这台设备上，绝不会发送到任何地方，直到你清除为止。",
  wizardContactAdd: "添加我的联系信息",
  wizardContactSavedNote: "你的联系信息已加入投诉材料。",
  wizardContactError: "名、姓、街道地址、城市和邮政编码为必填项。",

  wizardNoJsHeading: "此流程需要 JavaScript",
  wizardNoJsBody:
    "这个工具完全在你的浏览器中运行。没有 JavaScript 的话，请直接前往加州州总检察长的投诉表格：",
  wizardNoJsLink: "打开州总检察长投诉表格",

  aboutTitle: "关于",
  aboutHeading: "关于",
  aboutMetaDescription:
    "这个免费投诉工具如何运作、我们为什么要求全额退款，以及加州 AB 578 法规定外卖应用在订单出错时必须怎么做。",
  aboutHowHeading: "运作方式",
  aboutHowStep1: "告诉我们你的订单出了什么问题。大约只要一分钟。",
  aboutHowStep2:
    "我们帮你写一份退款要求，你可以直接粘贴到 DoorDash、Uber Eats 或 Grubhub 的客服。",
  aboutHowStep3:
    "我们帮你填好给加州州总检察长的投诉。你把每个答案复制到州总检察长的表格里，然后点提交。",
  aboutHowNote: "没有账号，也没有数据库。你输入的任何内容都不会离开你的手机。",
  aboutWhyHeading: "我们为什么要求全额退款",
  aboutWhyP1:
    "外卖应用搞砸你的订单时，通常只退出错的那一项，有时还只给应用内积分。这不够。",
  aboutWhyP2:
    "如果你的餐少了或送错了，你还是没有晚饭。要补回来，就得重新下单，再付一次配送费、服务费和小费，再等一次。部分退款完全不涵盖这些。如果少掉的是你孩子或伴侣的餐，他们今晚就是没得吃。",
  aboutWhyP3:
    "送错的订单也可能很危险。对花生过敏的人拿到错的菜。有乳糜泻的人吃到麸质。有糖尿病的人拿到普通汽水而不是无糖汽水。吃清真或犹太洁食的人拿到不能吃的肉。大家在订单上写备注是有原因的，忽视它们可能会把人送进医院。",
  aboutWhyP4:
    "这是外卖公司和餐厅造成的问题，不该由你来承担。外卖应用必须和每一家合作配送的餐厅签订合同，而加州法律要求它们告诉每家餐厅，订单出错的成本双方如何分摊（商业与职业法典 § 22599(a) 和 (d)）。应用想拿回这笔钱，可以向餐厅收，不是向你收。",
  aboutLawHeading: "加州法律站在你这边",
  aboutLawP1:
    "AB 578 于 2026 年 1 月 1 日生效。送错订单时，外卖应用必须全额退款给你，包括税费、各项费用和小费（商业与职业法典 § 22599.2(a)）。骑手保留他们的小费，成本由应用承担。",
  aboutLawP2:
    "法律没有定义什么是“送错订单”，所以我们采用最直白的意思：送来的东西不是你点的，就是送错订单。这包括漏送的餐品、送错的餐品，以及送到时已经损坏的食物。加州法院对消费者保护法采取宽松解释，偏向保护消费者，我们对这条法律的解读也正是如此。我们写的每一份要求，都要求全额退回你原来的支付方式，而不是应用内积分。",
  aboutLawP3:
    "法律也设了底线。你没收到的东西，不能向你收费（§ 22599.2(d)）。我们也把这一点写进每一份要求，让应用不能直接无视你。",
  aboutImpactHeading: "为什么投诉很重要",
  aboutImpactP1:
    "外卖应用就是赌你会放弃。一份退款要求很容易被忽视。但数百份递交给州总检察长的投诉就不是了。州总检察长会根据投诉决定调查哪些公司。",
  aboutImpactP2: "先拿回你的钱，再提交投诉。只要一分钟。",
  aboutStoryHeading: "你为什么做这个？",
  aboutStoryP1:
    "我吃素。不止一次，我点的外卖里，明明要求不加肉的菜却有肉，而我在发现之前已经咬了一口。听起来也许夸张，但我觉得受到了侵犯。外卖应用完全不在乎，只把我丢进一个自动化循环，让我根本不可能得到补偿。",
  aboutStoryP2:
    "我做这个，是为了让任何人都能轻松向州总检察长提交投诉，让这些公司承担责任。这些企业这样欺负我们，是不可接受的。",
  aboutNotLegalAdvice:
    "这不是法律建议。我们与加州政府、DoorDash、Uber Eats、Grubhub 或任何其他公司都没有关联。",

  faqTitle: "常见问题",
  faqHeading: "常见问题",
  faqMetaDescription:
    "积分与退款的区别、小费怎么处理、我们为什么要求全额退款、州总检察长会做什么，以及账号被停用的风险。",
  faqCreditsQuestion: "应用内积分和退款有什么不同？",
  faqCreditsAnswer:
    "应用内积分只能在那个应用里使用，账号没了积分也就没了。退款会退回你付款用的银行卡或其他方式。加州法律规定，外卖应用必须让你能要求把退款退回原来的支付方式（商业与职业法典 § 22599.2(e)）。我们写的每一份要求都要求退款，而不是积分。",
  faqTipsQuestion: "小费怎么办？",
  faqTipsAnswer:
    "订单退款时，你付的小费也会退给你，而且应用不能从骑手的收入中扣回（§ 22599.2(b)）。如果你的订单只完成了一部分，应用也必须让你调低送达前加的小费（§ 22599.2(d)）。",
  faqFullRefundQuestion: "只有一项送错或漏送，为什么要求全额退款？",
  faqFullRefundAnswer:
    "因为送来的订单不是你付钱买的那一份，我们把这解读为送错订单，而依法送错订单应全额退款（§ 22599.2(a)）。这个解读是有争议的，并非定论，所以我们也写出无论如何你都应得的底线：你没收到的餐品，不能向你收费（§ 22599.2(d)）。",
  faqFullRefundLink: "我们为什么要求全额退款",
  faqAgQuestion: "州总检察长会怎么处理我的投诉？",
  faqAgAnswer:
    "州总检察长的消费者办公室会阅读投诉，并据此决定调查哪些公司。他们可能会把你的投诉转给该公司。他们不会担任你的律师，也不会解决你个人的纠纷。所以这个工具会先帮你要求退款，再帮你举报。",
  faqAccountQuestion: "应用会因此停用我的账号吗？",
  faqAccountAnswer:
    "有可能。法律允许外卖应用移除它合理怀疑有欺诈行为的顾客（§ 22599.2(f)）。要求法律本来就欠你的退款，不是欺诈。一份诚实的投诉，加上你的收据、照片和应用自己的消息，就是最好的保护。",
  faqLegalQuestion: "这是法律建议吗？",
  faqLegalAnswer:
    "不是。本网站解释法律并帮你撰写投诉。它不是律师事务所，也与加州政府或任何外卖公司没有关联。如需针对你个人情况的建议，请咨询律师或法律援助机构。",
  faqEnglishQuestion: "为什么我的投诉是英文的？",
  faqEnglishAnswer:
    "你可以用七种语言阅读本网站。你提交的投诉默认仍为英文，因为州总检察长的在线表格是英文的。你的投诉材料会把英文和你的语言并排显示。写给外卖应用时，可以用切换按钮把消息改成你的语言。",

  privacyTitle: "隐私",
  privacyHeading: "隐私",
  privacyMetaDescription:
    "你输入的任何内容都不会离开你的设备。没有账号、没有数据库、没有分析追踪。",
  privacyP1: "你输入的任何内容都不会离开你的设备。",
  privacyP2:
    "本网站没有账号，也没有数据库。它会在你的浏览器中保存投诉草稿，方便你回来继续。只有在你要求记住时，才会保存你的联系信息。“清除我的数据”会删除所有内容，包括你的语言选择。",
  privacyP3:
    "当你打开州总检察长的表格或外卖应用的客服页面时，是你自己提交投诉。这里没有人会看到。",

  platformMetaDescription:
    "如何要求 {name} 退款到你原来的支付方式、联系人工客服，以及向加州州总检察长提交 AB 578 投诉。",
  platformHeading: "向 {name} 拿回你的钱",
  platformIntro:
    "{name} 的订单出错时，你可以要求退钱，而不只是拿应用内积分。我们帮你写好要求。以下是 {name} 公开说明的流程，以及应用敷衍你时如何找到真人。",
  platformRefundHeading: "如何要求退款到你的银行卡",
  platformRefundLaw:
    "要求退款到原来的支付方式，而不是应用内积分。除了其他选项之外，应用必须让你能提出这个要求（§ 22599.2(e)）。",
  platformRefundPathLabel: "{name} 公开说明的退款流程",
  platformRefundHelpLink: "打开 {name} 的退款帮助页面",
  platformHumanHeading: "如何联系人工客服",
  platformHumanLaw:
    "如果自动客服解决不了你的问题，应用必须让你尽快联系到真人（§ 22599.1(f)）。",
  platformHumanLabel: "如何联系 {name} 的人工客服",
  platformSupportLink: "打开 {name} 客服",
  platformFileIntro:
    "想让我们帮你写？这个工具会把出错的情况整理成给 {name} 的退款要求，以及给加州州总检察长的投诉。",
  platformFileLegal: "这不是法律建议。我们与加州政府或任何外卖公司都没有关联。",

  evidenceHeading: "把截图转成 PDF",
  evidenceIntro:
    "投诉表格接受 PDF、Word 或 Excel 文件，不接受图片。选择你的截图，需要的话可以为每张加上说明，然后下载一份可直接附加的 PDF。全部在你的设备上完成，不会上传任何东西。",
  evidenceAddImages: "添加截图",
  evidenceAddMore: "添加更多截图",
  evidenceImageCount: "{count} 张图片",
  evidenceCaptionLabel: "{name} 的说明",
  evidenceCaptionHint: "说明会直接画在图片上，任何语言都可以。",
  evidenceCaptionPlaceholder: "例如：这不是我点的",
  evidenceMoveEarlier: "把 {name} 往前移",
  evidenceMoveLater: "把 {name} 往后移",
  evidenceRemoveImage: "移除 {name}",
  evidenceBuild: "生成 PDF",
  evidenceBuilding: "正在生成 PDF",
  evidenceCompressingProgress: "正在压缩第 {done} 张图片，共 {total} 张",
  evidenceAssemblingProgress: "正在组合 PDF，第 {done} 页，共 {total} 页",
  evidenceResultHeading: "你的证据 PDF 已经准备好了",
  evidenceResultPages: "{pages} 页",
  evidenceResultSize: "文件大小：{size}",
  evidenceOverBudgetWarning:
    "这份 PDF 超过 4 MB 的上限。请移除一两张截图后重新生成。",
  evidenceDownload: "下载 {filename}",
  evidenceSkippedFiles:
    "以下文件因为这个浏览器无法读取而被跳过：{names}。换个浏览器也许可以打开。",
  evidenceBuildFailed: "无法生成 PDF。请再试一次，或使用更少或更小的截图。",
  evidenceEmptyHint: "JPEG 或 PNG 截图效果最好。",

  kitTitle: "你的投诉材料",
  kitAsksHeading: "你要求的内容",
  kitAskLabelSettled: "法律明文规定",
  kitAskLabelArgued: "依我们对加州法律的解读，有法律支持",
  kitAskLabelPlain: "依应用自身政策提出的一般要求",
  kitFloorLine: "至少应退给你 {amount}",
  kitFloorFallback: "至少：{fallback}",
  kitWhyLink: "为什么？",
  kitEstimateHeading: "预估退款",
  kitOutgoingLanguage: "你发出消息的语言",
  kitSendInLanguage: "用{language}发送",
  kitSendInEnglish: "用英文发送",
  kitTranslationLabel: "翻译",
  kitPlatformCardTitle: "向 {platform} 拿回退款",
  kitPlatformFallbackName: "外卖应用",
  kitMessageShortLabel: "简短版，用于在线聊天",
  kitMessageLongLabel: "完整版，用于电子邮件或网页表单",
  kitCopy: "复制",
  kitCopied: "已复制",
  kitCopyLabel: "复制{what}",
  kitShare: "分享消息",
  kitOpenSupport: "打开 {platform} 客服",
  kitHumanTipsHeading: "如何联系人工客服",
  kitAgCardTitle: "向加州州总检察长举报",
  kitAgIntro: "按照顺序，把每个答案复制到州政府的在线表格。表格是英文的。",
  kitAgOpenForm: "打开州总检察长表格",
  kitAgUploadHeading: "附上你的证据",
  kitAgUploadGuidance:
    "最多可附加 {count} 个文件（{types}），每个小于 {limit} MB。用下方工具生成 PDF 后附上。",
  kitAgUploadLink: "前往证据工具",
  kitAgMailInNote: "你也可以打印{language}的投诉表格并邮寄。",
  kitAgMailInLink: "下载{language}邮寄表格（PDF）",
  kitAgFillHeading: "让电脑帮你填",
  kitAgFillIntro:
    "一个书签会用你的答案填好州总检察长的表格，并附上你的证据 PDF。只需设置一次。",
  kitAgFillStep1: "把这个按钮拖到浏览器的书签栏：",
  kitAgFillBookmarkName: "填写 AG 表格",
  kitAgFillBarHint: "看不到书签栏？按 Ctrl+Shift+B，Mac 请按 ⌘+Shift+B。",
  kitAgFillStep2: "选填：在下方第 3 步生成你的证据 PDF。书签会帮你附上。",
  kitAgFillCopy: "复制我的答案",
  kitAgFillStep3: "打开州总检察长表格，然后点一下“填写 AG 表格”书签。",
  kitAgFillStep4: "检查答案，回答最下面的问题，然后点 Submit。",
  kitAgFillDragHint: "请把这个按钮拖到书签栏。在这里点击不会有任何作用。",
  kitAgFillNoContact:
    "在上方添加你的联系信息，书签也会一并填入你的姓名和地址。",
  kitAgManualSummary: "改为逐一复制答案",
  agFillPrompt:
    "无法打开你的投诉材料。请从投诉材料复制答案，再按 Ctrl+V 粘贴到这里（Mac 请按 ⌘+V）。",
  agFillPasteLabel: "在这里粘贴你的答案",
  agFillWrongPage: "请先打开州总检察长的投诉表格，再点一次这个书签。",
  agFillOpenForm: "打开州总检察长投诉表格",
  agFillNotKit:
    "这看起来不是你的答案。请回到你的投诉材料，点“复制我的答案”，然后再粘贴一次。",
  agFillDone:
    "完成。已填入 {count} 个答案。请检查答案，附上证据，回答最下面的问题，然后点 Submit。",
  agFillClose: "关闭",
  kitAgFillEvidenceLink: "前往第 3 步",
  kitAgFillEvidenceReady: "已就绪：将附上 {filename}。",
  kitAgFillFallback:
    "没有反应，或浏览器拦截了弹出窗口？请复制你的答案，再点一次书签并粘贴。",
  agFillWaiting: "正在从你的投诉材料获取答案…",
  agFillNoHandoff:
    "在这台电脑上找不到你的答案。请从投诉材料复制答案，再按 Ctrl+V 粘贴到这里（Mac 请按 ⌘+V）。",
  agFillDoneFile:
    "完成。已填入 {count} 个答案并附上你的证据 PDF。请检查答案，回答最下面的问题，然后点 Submit。",
  agfillPageTitle: "正在发送你的答案",
  agfillPageSending: "正在把你的答案发送到州总检察长表格…",
  agfillPageSent: "已发送。这个窗口即将关闭。",
  agfillPageNoData:
    "在这台电脑上找不到答案。请先在这个浏览器打开你的投诉材料，再点一次书签。",
  agfillPageNoOpener:
    "请打开州总检察长的投诉表格，然后在那里点一下“填写 AG 表格”书签。",
  agfillPageOpenKit: "打开你的投诉材料",
  privacyP4:
    "为了帮你填写州总检察长的表格，投诉工具会把你的答案和证据 PDF 保存在这个浏览器中两小时。“填写 AG 表格”书签只会把它们交给州总检察长的表格页面。“清除我的数据”会立即删除它们。只有在你选择“在这台设备上记住”时，才会包含你的姓名和地址。",
  kitAgFillRememberHint:
    "如果想让书签也填入你的姓名和地址，请勾选上方的“在这台设备上记住”，再添加一次你的信息。",
  kitMoreCardTitle: "更多行动方式",
  kitMoreCardHint: "你所在地的地区检察官、FTC 和小额诉讼法庭",
  kitDestDa: "找到你的地区检察官或市检察官",
  kitDestDaNote: "他们负责在你所在的县执行加州消费者法律。",
  kitDestFtc: "向 FTC 举报",
  kitDestFtcNote: "你的报告会进入与执法部门共享的联邦数据库。",
  kitDestSmallClaims: "到小额诉讼法庭起诉应用",
  kitDestSmallClaimsNote:
    "加州官方的自助指南。法院希望你在起诉前先要求对方付款。",
  kitDemandLetterHeading: "可打印的催告函",
  kitDemandLetterIntro: "起诉前先寄给应用。信中写明对方欠你多少以及原因。",
  kitSaveHeading: "保留记录",
  kitSaveIntro: "保存一份带日期的投诉材料副本，供日后查考。",
  kitPrint: "打印投诉材料",
  kitDownloadRecord: "下载记录",
  kitClipboardFallbackHeading: "手动复制",
  kitClipboardFallbackIntro:
    "这个浏览器阻止了自动复制。下方文字已选中，请自行复制。",
  kitClipboardFallbackLabel: "需要手动复制的文字",
  kitCitationsHeading: "这份投诉材料依据的法律",
  kitCitationVerified: "已于 {date} 核实。",
  kitCitationArgued: "此为有争议的解读。明确的底线是 {section}。",
  kitCitationSource: "阅读条文",

  kitRecordTitle: "AB 578 投诉材料记录",
  kitRecordSaved: "保存于 {date}",
  kitRecordAsks: "你要求的内容",
  kitRecordPlatformMessage: "给应用的消息",
  kitRecordAgForm: "州总检察长投诉",
  kitRecordAgFormUrl: "表格：{url}",
  kitRecordDemandLetter: "催告函",
  kitRecordDestinations: "其他投诉渠道",
  kitRecordCitations: "这份投诉材料依据的法律",

  notFoundTitle: "找不到页面",
  notFoundHeading: "找不到页面",
  notFoundBody: "这个页面不存在。",
  notFoundHome: "前往首页",

  footerNavLabel: "网站菜单",
  footerAbout: "关于",
  footerFaq: "常见问题",
  footerPrivacy: "隐私",
  footerDisclaimer: "这不是法律建议。我们与加州政府或任何外卖公司都没有关联。",
  footerTranslatedNote: "本页为机器翻译。英文版为正式版本。",
};
