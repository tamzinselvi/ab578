import type { Messages } from "./en";

// Vietnamese. Machine-assisted translation of en.ts; the English version is
// the official one. Keep every {placeholder} and every section marker
// unchanged.
export const vi: Messages = {
  siteName: "Bộ khiếu nại AB 578",
  metaDescription:
    "Gửi khiếu nại đòi hoàn tiền giao đồ ăn theo luật AB 578 của California trong một phút. Miễn phí, riêng tư, không cần tài khoản.",
  skipToContent: "Chuyển đến nội dung",
  languageLabel: "Ngôn ngữ",
  languageSuggestRegion: "Gợi ý ngôn ngữ",
  languageSuggestPrompt: "Bạn muốn dùng {language}?",
  languageSuggestDismiss: "Đóng",

  homeHeadline: "Lấy lại tiền đơn giao đồ ăn của bạn",
  homeSubhead: "Yêu cầu Tổng Chưởng lý thực thi AB 578",
  homeCta: "Gửi khiếu nại →",
  homeHow: "Như thế nào?",

  fileTitle: "Gửi khiếu nại",
  fileHeading: "Gửi khiếu nại",

  wizardProgressLabel: "Các bước khiếu nại",
  wizardStepLabel: "Bước {current} trên {total}",
  wizardStepIssues: "Chuyện gì đã xảy ra",
  wizardStepPlatform: "Ứng dụng nào",
  wizardStepDetails: "Chi tiết đơn hàng",
  wizardStepKit: "Bộ khiếu nại của bạn",
  wizardBack: "Quay lại",
  wizardNext: "Tiếp",
  wizardContinue: "Tiếp tục",
  wizardStartOver: "Làm lại từ đầu",
  wizardClearData: "Xóa dữ liệu của tôi",
  wizardClearedNote: "Mọi thứ trang này lưu trên thiết bị của bạn đã được xóa.",
  wizardDraftRestored:
    "Chào mừng bạn quay lại. Câu trả lời của bạn vẫn còn đây.",

  wizardIssuesHeading: "Chuyện gì đã xảy ra?",
  wizardIssuesHint: "Chọn tất cả những gì đã xảy ra. Bạn có thể sửa sau.",
  wizardIssueNotDelivered: "Không bao giờ được giao",
  wizardIssueWrongOrder: "Cả đơn hàng bị sai",
  wizardIssueWrongItems: "Một số món bị sai",
  wizardIssueMissingItems: "Thiếu một số món",
  wizardIssueUnusableItems:
    "Một số món không dùng được (bị đổ, bị dập, hoặc bị mở)",
  wizardIssueCredits: "Chỉ được đề nghị tín dụng trong ứng dụng",
  wizardIssueRefundDenied: "Bị từ chối hoàn tiền",
  wizardIssueNoHuman: "Không thể nói chuyện với người thật",
  wizardIssueNotCovered: "Giao trễ, nguội, hoặc chất lượng kém",
  wizardIssueNotCoveredNote:
    "AB 578 không bao gồm trường hợp này, nhưng chúng tôi vẫn giúp bạn yêu cầu",
  wizardAtAddress:
    "Tôi có mặt tại địa chỉ giao hàng khi đơn được đánh dấu là đã giao (không bắt buộc, chỉ đánh dấu nếu đúng)",
  wizardIssuesError: "Hãy chọn ít nhất một điều đã sai.",

  wizardPlatformHeading: "Bạn đặt hàng qua ứng dụng nào?",
  wizardPlatformHint:
    "Chạm vào ứng dụng của bạn. Chúng tôi sẽ viết khiếu nại cho ứng dụng đó.",
  wizardPlatformOther: "Ứng dụng khác",
  wizardPlatformOtherLabel: "Tên ứng dụng",
  wizardPlatformOtherError:
    "Nhập tên ứng dụng, hoặc chọn một ứng dụng trong danh sách.",

  wizardDetailsHeading: "Chi tiết đơn hàng",
  wizardOrderDateLabel: "Ngày đặt hàng",
  wizardOrderTotalLabel: "Tổng tiền đơn hàng",
  wizardMoneyExampleHint: "Chỉ nhập số, ví dụ 24.50",
  wizardKeypadLabel: "Bàn phím nhập tổng tiền đơn hàng",
  wizardKeypadDelete: "Xóa",
  wizardRefundedHeading: "Đã được hoàn đến nay",
  wizardRefundNone: "Chưa có gì",
  wizardRefundCredits: "Chỉ tín dụng trong ứng dụng",
  wizardRefundPartial: "Một phần",
  wizardRefundFull: "Toàn bộ",
  wizardRefundedAmountLabel: "Họ đã hoàn lại bao nhiêu?",
  wizardOptionalSummary: "Chi tiết không bắt buộc giúp khiếu nại mạnh hơn",
  wizardAffectedTotalLabel: "Giá các món bị thiếu, sai, hoặc không dùng được",
  wizardAffectedTotalHint: "Dùng để ước tính số tiền hoàn",
  wizardOrderNumberLabel: "Mã đơn hàng",
  wizardRestaurantLabel: "Nhà hàng",
  wizardItemsLabel: "Món nào bị sai, thiếu, hoặc không dùng được?",
  wizardItemsPlaceholder: "Ví dụ: 2 phần gà teriyaki, không có nước sốt",
  wizardContactedLabel: "Tôi đã liên hệ ứng dụng về đơn hàng này",
  wizardContactedDateLabel: "Ngày liên hệ",
  wizardContactedMethodLabel: "Bạn đã liên hệ họ bằng cách nào?",
  wizardMethodChat: "Trò chuyện",
  wizardMethodPhone: "Điện thoại",
  wizardMethodEmail: "Email",
  wizardMethodOther: "Khác",
  wizardContactedResultLabel: "Kết quả thế nào?",
  wizardContactedResultPlaceholder: "Ví dụ: họ đề nghị 5 đô la tín dụng",
  wizardContactedResultError:
    "Viết một dòng về kết quả, hoặc bỏ đánh dấu ô này.",
  wizardDetailsErrorTotal: "Nhập tổng tiền đơn hàng, ví dụ 24.50",
  wizardDetailsErrorDate: "Nhập một ngày hợp lệ.",

  wizardKitHeading: "Bộ khiếu nại của bạn",
  wizardKitIntro:
    "Sao chép từng phần đến nơi bạn cần. Mọi thứ đều nằm trên thiết bị của bạn.",
  wizardKitIncomplete: "Hoàn thành các bước trước để xem bộ khiếu nại của bạn.",
  wizardKitIncompleteBack: "Quay lại các câu hỏi",
  wizardContactHeading: "Thông tin liên lạc của bạn",
  wizardContactIntro:
    "Mẫu đơn của Tổng Chưởng lý yêu cầu tên và địa chỉ của bạn. Điền ở đây và bộ khiếu nại cũng sẽ điền sẵn các câu trả lời đó.",
  wizardContactFirstName: "Tên",
  wizardContactLastName: "Họ",
  wizardContactStreet: "Địa chỉ đường",
  wizardContactStreet2: "Căn hộ hoặc phòng (không bắt buộc)",
  wizardContactCity: "Thành phố",
  wizardContactState: "Tiểu bang",
  wizardContactZip: "Mã ZIP",
  wizardContactEmail: "Email (không bắt buộc)",
  wizardContactPhone: "Điện thoại (không bắt buộc)",
  wizardContactRemember: "Ghi nhớ trên thiết bị này",
  wizardContactRememberNote:
    "Chỉ lưu trên thiết bị này, không bao giờ gửi đi đâu, cho đến khi bạn xóa.",
  wizardContactAdd: "Thêm thông tin liên lạc của tôi",
  wizardContactSavedNote:
    "Thông tin liên lạc của bạn đã có trong bộ khiếu nại.",
  wizardContactError: "Cần có tên, họ, địa chỉ đường, thành phố và mã ZIP.",

  wizardNoJsHeading: "Trình hướng dẫn cần JavaScript",
  wizardNoJsBody:
    "Công cụ này chạy hoàn toàn trong trình duyệt của bạn. Nếu không có JavaScript, hãy đi thẳng đến mẫu khiếu nại của Tổng Chưởng lý California:",
  wizardNoJsLink: "Mở mẫu khiếu nại của Tổng Chưởng lý",

  aboutTitle: "Giới thiệu",
  aboutHeading: "Giới thiệu",
  aboutMetaDescription:
    "Bộ khiếu nại miễn phí này hoạt động thế nào, vì sao chúng tôi đòi hoàn tiền toàn bộ, và luật AB 578 của California yêu cầu các ứng dụng giao hàng phải làm gì khi đơn hàng bị sai.",
  aboutHowHeading: "Cách hoạt động",
  aboutHowStep1:
    "Cho chúng tôi biết đơn hàng của bạn bị sai ở đâu. Chỉ mất khoảng một phút.",
  aboutHowStep2:
    "Chúng tôi viết một yêu cầu hoàn tiền mà bạn có thể dán thẳng vào bộ phận hỗ trợ của DoorDash, Uber Eats hoặc Grubhub.",
  aboutHowStep3:
    "Chúng tôi điền sẵn khiếu nại của bạn gửi Tổng Chưởng lý California. Bạn sao chép từng câu trả lời vào mẫu đơn của Tổng Chưởng lý và bấm gửi.",
  aboutHowNote:
    "Không có tài khoản và không có cơ sở dữ liệu. Không gì bạn nhập rời khỏi điện thoại của bạn.",
  aboutWhyHeading: "Vì sao chúng tôi đòi hoàn tiền toàn bộ",
  aboutWhyP1:
    "Khi một ứng dụng giao hàng làm hỏng đơn của bạn, họ thường chỉ hoàn tiền món bị sai, đôi khi chỉ bằng tín dụng trong ứng dụng. Như vậy là không đủ.",
  aboutWhyP2:
    "Nếu một phần bữa ăn bị thiếu hoặc sai, bạn vẫn không có bữa tối. Muốn có nó, bạn phải đặt lại, trả thêm phí giao hàng, phí dịch vụ và tiền tip, rồi chờ thêm lần nữa. Hoàn tiền một phần không bù được những khoản đó. Và nếu phần ăn bị thiếu là của con bạn hay người bạn đời, tối nay họ sẽ không có gì để ăn.",
  aboutWhyP3:
    "Đơn hàng sai cũng có thể nguy hiểm. Người dị ứng đậu phộng nhận nhầm món. Người bị bệnh celiac ăn phải gluten. Người bị tiểu đường nhận nước ngọt thường thay vì loại ăn kiêng. Người ăn halal hoặc kosher nhận phải thịt họ không được ăn. Người ta ghi chú vào đơn hàng là có lý do, và phớt lờ những ghi chú đó có thể khiến ai đó phải vào bệnh viện.",
  aboutWhyP4:
    "Đây là sai lầm của công ty giao hàng và nhà hàng. Bạn không phải gánh nó. Các ứng dụng giao hàng bắt buộc phải có hợp đồng với mọi nhà hàng mà họ giao đồ, và luật California buộc họ phải cho mỗi nhà hàng biết chi phí của những sai sót trong đơn hàng được chia giữa hai bên như thế nào (Bộ luật Kinh doanh và Nghề nghiệp § 22599(a) và (d)). Nếu ứng dụng muốn lấy lại tiền, họ có thể tính cho nhà hàng. Không phải cho bạn.",
  aboutLawHeading: "Luật California đứng về phía bạn",
  aboutLawP1:
    "AB 578 có hiệu lực từ ngày 1 tháng 1 năm 2026. Khi giao sai đơn hàng, ứng dụng giao hàng phải hoàn tiền toàn bộ cho bạn, bao gồm thuế, các khoản phí và tiền tip (Bộ luật Kinh doanh và Nghề nghiệp § 22599.2(a)). Tài xế vẫn giữ tiền tip của họ. Ứng dụng chịu chi phí.",
  aboutLawP2:
    'Luật không định nghĩa "đơn hàng sai", nên chúng tôi dùng nghĩa hiển nhiên: nếu thứ được giao đến không phải là thứ bạn đã đặt, đó là đơn hàng sai. Điều đó bao gồm món bị thiếu, món bị sai, và đồ ăn đến nơi đã hỏng. Tòa án California diễn giải rộng các luật bảo vệ người tiêu dùng, nghiêng về phía người tiêu dùng, và đó chính xác là cách chúng tôi đọc luật này. Mọi yêu cầu chúng tôi viết đều đòi hoàn tiền toàn bộ về phương thức thanh toán ban đầu của bạn, không phải tín dụng trong ứng dụng.',
  aboutLawP3:
    "Luật cũng đặt ra một mức sàn. Bạn không thể bị tính tiền cho bất cứ thứ gì bạn không nhận được (§ 22599.2(d)). Chúng tôi cũng đưa điều đó vào mọi yêu cầu, để ứng dụng không thể đơn giản là phớt lờ bạn.",
  aboutImpactHeading: "Vì sao khiếu nại quan trọng",
  aboutImpactP1:
    "Các ứng dụng giao hàng trông chờ vào việc bạn bỏ cuộc. Một yêu cầu hoàn tiền thì dễ bị phớt lờ. Hàng trăm khiếu nại gửi Tổng Chưởng lý thì không. Tổng Chưởng lý dùng các khiếu nại để quyết định điều tra những công ty nào.",
  aboutImpactP2: "Lấy lại tiền của bạn, rồi gửi khiếu nại. Chỉ mất một phút.",
  aboutStoryHeading: "Vì sao bạn làm ra công cụ này?",
  aboutStoryP1:
    "Tôi ăn chay. Đã hơn một lần, đơn giao đồ ăn đến với thịt trong món tôi gọi không có thịt, và tôi đã cắn một miếng trước khi nhận ra. Nghe có vẻ quá đáng, nhưng tôi cảm thấy bị xúc phạm. Ứng dụng giao hàng chẳng hề quan tâm. Họ đẩy tôi vào một vòng lặp tự động khiến tôi không thể nào được bồi thường.",
  aboutStoryP2:
    "Tôi làm ra công cụ này để bất kỳ ai cũng có thể dễ dàng gửi khiếu nại đến Tổng Chưởng lý, và buộc các công ty này phải chịu trách nhiệm. Thật không thể chấp nhận được khi những tập đoàn này chèn ép chúng ta.",
  aboutNotLegalAdvice:
    "Đây không phải là tư vấn pháp lý. Chúng tôi không liên kết với Tiểu bang California, DoorDash, Uber Eats, Grubhub hay bất kỳ công ty nào khác.",

  faqTitle: "Câu hỏi thường gặp",
  faqHeading: "Câu hỏi thường gặp",
  faqMetaDescription:
    "Tín dụng so với hoàn tiền, tiền tip được xử lý thế nào, vì sao chúng tôi đòi hoàn tiền toàn bộ, Tổng Chưởng lý làm gì, và rủi ro bị khóa tài khoản.",
  faqCreditsQuestion: "Tín dụng trong ứng dụng khác gì hoàn tiền?",
  faqCreditsAnswer:
    "Tín dụng trong ứng dụng chỉ dùng được trong ứng dụng đó và mất đi cùng tài khoản của bạn. Hoàn tiền thì trả về thẻ hoặc phương thức khác bạn đã dùng để thanh toán. Luật California quy định ứng dụng giao hàng phải cho bạn cách yêu cầu hoàn tiền về phương thức thanh toán ban đầu (Bộ luật Kinh doanh và Nghề nghiệp § 22599.2(e)). Mọi yêu cầu chúng tôi viết đều đòi điều đó, không phải tín dụng.",
  faqTipsQuestion: "Còn tiền tip thì sao?",
  faqTipsAnswer:
    "Khi đơn hàng của bạn được hoàn tiền, tiền tip bạn đã trả cũng được trả lại cho bạn, và ứng dụng không được trừ lại từ tiền công của tài xế (§ 22599.2(b)). Nếu đơn hàng của bạn chỉ được giao một phần, ứng dụng cũng phải cho bạn giảm tiền tip đã thêm trước khi giao (§ 22599.2(d)).",
  faqFullRefundQuestion:
    "Vì sao đòi hoàn tiền toàn bộ khi chỉ một món bị sai hoặc thiếu?",
  faqFullRefundAnswer:
    "Vì đơn hàng được giao đến không phải là đơn hàng bạn đã trả tiền, và chúng tôi xem đó là đơn hàng sai, mà theo luật thì được hoàn tiền toàn bộ (§ 22599.2(a)). Cách hiểu đó còn đang tranh luận, chưa được khẳng định, nên chúng tôi cũng nêu mức sàn bạn chắc chắn được hưởng: bạn không thể bị tính tiền cho những món bạn không nhận được (§ 22599.2(d)).",
  faqFullRefundLink: "Vì sao chúng tôi đòi hoàn tiền toàn bộ",
  faqAgQuestion: "Tổng Chưởng lý làm gì với khiếu nại của tôi?",
  faqAgAnswer:
    "Văn phòng người tiêu dùng của Tổng Chưởng lý đọc các khiếu nại và dùng chúng để quyết định điều tra những công ty nào. Họ có thể chuyển khiếu nại của bạn đến công ty. Họ không làm luật sư cho bạn và không giải quyết tranh chấp riêng của bạn. Vì vậy bộ khiếu nại giúp bạn đòi hoàn tiền trước, rồi mới báo cáo.",
  faqAccountQuestion:
    "Ứng dụng có thể khóa tài khoản của tôi vì việc này không?",
  faqAccountAnswer:
    "Có thể. Luật cho phép ứng dụng giao hàng loại bỏ khách hàng mà họ có lý do hợp lý để nghi ngờ gian lận (§ 22599.2(f)). Đòi khoản hoàn tiền mà luật quy định bạn được hưởng không phải là gian lận. Một khiếu nại trung thực, có kèm hóa đơn, ảnh chụp và chính tin nhắn của ứng dụng, là cách bảo vệ tốt nhất.",
  faqLegalQuestion: "Đây có phải là tư vấn pháp lý không?",
  faqLegalAnswer:
    "Không. Trang này giải thích luật và giúp bạn viết khiếu nại. Đây không phải là công ty luật và không liên kết với Tiểu bang California hay bất kỳ công ty giao hàng nào. Để được tư vấn về trường hợp của bạn, hãy nói chuyện với luật sư hoặc văn phòng trợ giúp pháp lý.",
  faqEnglishQuestion: "Vì sao khiếu nại của tôi bằng tiếng Anh?",
  faqEnglishAnswer:
    "Bạn có thể đọc trang này bằng bảy ngôn ngữ. Khiếu nại bạn gửi đi mặc định vẫn bằng tiếng Anh, vì mẫu đơn trực tuyến của Tổng Chưởng lý bằng tiếng Anh. Bộ khiếu nại hiển thị tiếng Anh bên cạnh ngôn ngữ của bạn. Một nút chuyển có thể đổi tin nhắn sang ngôn ngữ của bạn khi bạn viết cho ứng dụng giao hàng.",

  privacyTitle: "Quyền riêng tư",
  privacyHeading: "Quyền riêng tư",
  privacyMetaDescription:
    "Không gì bạn nhập rời khỏi thiết bị của bạn. Không tài khoản, không cơ sở dữ liệu, không theo dõi phân tích.",
  privacyP1: "Không gì bạn nhập rời khỏi thiết bị của bạn.",
  privacyP2:
    'Trang này không có tài khoản hay cơ sở dữ liệu. Nó lưu bản nháp khiếu nại trong trình duyệt để bạn có thể quay lại. Thông tin liên lạc của bạn chỉ được lưu nếu bạn yêu cầu ghi nhớ. "Xóa dữ liệu của tôi" sẽ xóa mọi thứ, kể cả lựa chọn ngôn ngữ của bạn.',
  privacyP3:
    "Khi bạn mở mẫu đơn của Tổng Chưởng lý hoặc trang hỗ trợ của ứng dụng giao hàng, chính bạn là người gửi khiếu nại. Không ai ở đây nhìn thấy nó.",

  platformMetaDescription:
    "Cách đòi {name} hoàn tiền về phương thức thanh toán ban đầu, liên hệ người thật, và gửi khiếu nại theo AB 578 đến Tổng Chưởng lý California.",
  platformHeading: "Lấy lại tiền của bạn từ {name}",
  platformIntro:
    "Khi đơn hàng {name} bị sai, bạn có thể đòi lại tiền, không chỉ tín dụng trong ứng dụng. Chúng tôi viết yêu cầu cho bạn. Đây là những gì {name} công bố, và cách gặp người thật khi ứng dụng cứ lòng vòng.",
  platformRefundHeading: "Cách đòi hoàn tiền về thẻ của bạn",
  platformRefundLaw:
    "Yêu cầu hoàn tiền về phương thức thanh toán ban đầu, không phải tín dụng trong ứng dụng. Bên cạnh các lựa chọn khác, ứng dụng phải cho bạn cách yêu cầu điều đó (§ 22599.2(e)).",
  platformRefundPathLabel: "Quy trình hoàn tiền được công bố của {name}",
  platformRefundHelpLink: "Mở trang trợ giúp hoàn tiền của {name}",
  platformHumanHeading: "Cách liên hệ người thật",
  platformHumanLaw:
    "Nếu hỗ trợ tự động không giải quyết được vấn đề, ứng dụng phải cho bạn liên hệ nhanh với người thật (§ 22599.1(f)).",
  platformHumanLabel: "Cách liên hệ người thật tại {name}",
  platformSupportLink: "Mở trang hỗ trợ của {name}",
  platformFileIntro:
    "Muốn chúng tôi viết giúp? Bộ khiếu nại biến những gì đã sai thành một yêu cầu hoàn tiền gửi {name} và một khiếu nại gửi Tổng Chưởng lý California.",
  platformFileLegal:
    "Đây không phải là tư vấn pháp lý. Chúng tôi không liên kết với Tiểu bang California hay bất kỳ công ty giao hàng nào.",

  evidenceHeading: "Chuyển ảnh chụp màn hình thành PDF",
  evidenceIntro:
    "Mẫu khiếu nại nhận tệp PDF, Word hoặc Excel, không nhận ảnh. Chọn ảnh chụp màn hình, thêm chú thích cho từng ảnh nếu muốn, rồi tải về một tệp PDF sẵn sàng đính kèm. Mọi thứ diễn ra trên thiết bị của bạn. Không có gì được tải lên.",
  evidenceAddImages: "Thêm ảnh chụp màn hình",
  evidenceAddMore: "Thêm ảnh chụp màn hình khác",
  evidenceImageCount: "{count} ảnh",
  evidenceCaptionLabel: "Chú thích cho {name}",
  evidenceCaptionHint: "Chú thích được vẽ lên ảnh, bằng bất kỳ ngôn ngữ nào.",
  evidenceCaptionPlaceholder: "Ví dụ: đây không phải món tôi đã đặt",
  evidenceMoveEarlier: "Đưa {name} lên trước",
  evidenceMoveLater: "Đưa {name} ra sau",
  evidenceRemoveImage: "Xóa {name}",
  evidenceBuild: "Tạo PDF",
  evidenceBuilding: "Đang tạo PDF",
  evidenceCompressingProgress: "Đang nén ảnh {done} trên {total}",
  evidenceAssemblingProgress: "Đang ghép PDF, trang {done} trên {total}",
  evidenceResultHeading: "PDF bằng chứng của bạn đã sẵn sàng",
  evidenceResultPages: "{pages} trang",
  evidenceResultSize: "Kích thước tệp: {size}",
  evidenceOverBudgetWarning:
    "PDF này vượt quá giới hạn 4 MB. Hãy bỏ một hoặc hai ảnh chụp màn hình và tạo lại.",
  evidenceDownload: "Tải về {filename}",
  evidenceSkippedFiles:
    "Đã bỏ qua vì trình duyệt này không đọc được: {names}. Một trình duyệt khác có thể mở được.",
  evidenceBuildFailed:
    "Không thể tạo PDF. Hãy thử lại, hoặc dùng ít ảnh hơn hay ảnh nhỏ hơn.",
  evidenceEmptyHint: "Ảnh chụp màn hình JPEG hoặc PNG cho kết quả tốt nhất.",

  kitTitle: "Bộ khiếu nại của bạn",
  kitAsksHeading: "Những gì bạn yêu cầu",
  kitAskLabelSettled: "Luật bắt buộc điều này",
  kitAskLabelArgued: "Được luật California hỗ trợ, theo cách chúng tôi hiểu",
  kitAskLabelPlain: "Một yêu cầu đơn giản theo chính sách riêng của ứng dụng",
  kitFloorLine: "Tối thiểu, bạn được nợ {amount}",
  kitFloorFallback: "Tối thiểu: {fallback}",
  kitWhyLink: "Vì sao?",
  kitEstimateHeading: "Số tiền hoàn ước tính",
  kitOutgoingLanguage: "Ngôn ngữ của tin nhắn bạn gửi",
  kitSendInLanguage: "Gửi bằng {language}",
  kitSendInEnglish: "Gửi bằng tiếng Anh",
  kitTranslationLabel: "Bản dịch",
  kitPlatformCardTitle: "Lấy lại tiền hoàn từ {platform}",
  kitPlatformFallbackName: "ứng dụng giao hàng",
  kitMessageShortLabel: "Bản ngắn, dùng cho trò chuyện",
  kitMessageLongLabel: "Bản dài, dùng cho email hoặc biểu mẫu web",
  kitCopy: "Sao chép",
  kitCopied: "Đã sao chép",
  kitCopyLabel: "Sao chép {what}",
  kitShare: "Chia sẻ tin nhắn",
  kitOpenSupport: "Mở trang hỗ trợ của {platform}",
  kitHumanTipsHeading: "Cách liên hệ người thật",
  kitAgCardTitle: "Báo cáo với Tổng Chưởng lý California",
  kitAgIntro:
    "Sao chép từng câu trả lời vào mẫu đơn trực tuyến của tiểu bang, theo thứ tự này. Mẫu đơn bằng tiếng Anh.",
  kitAgOpenForm: "Mở mẫu đơn của Tổng Chưởng lý",
  kitAgUploadHeading: "Đính kèm bằng chứng",
  kitAgUploadGuidance:
    "Bạn có thể đính kèm tối đa {count} tệp ({types}), mỗi tệp dưới {limit} MB. Tạo một PDF bằng công cụ bên dưới và đính kèm tệp đó.",
  kitAgUploadLink: "Đến công cụ bằng chứng",
  kitAgMailInNote:
    "Bạn cũng có thể in mẫu khiếu nại bằng {language} và gửi qua bưu điện.",
  kitAgMailInLink: "Tải mẫu gửi qua bưu điện bằng {language} (PDF)",
  kitAgFillHeading: "Để máy tính điền giúp bạn",
  kitAgFillIntro:
    "Một dấu trang sẽ điền mẫu đơn của Tổng Chưởng lý bằng câu trả lời của bạn. Bạn chỉ cần cài đặt một lần.",
  kitAgFillStep1: "Kéo nút này lên thanh dấu trang của bạn:",
  kitAgFillBookmarkName: "Điền mẫu AG",
  kitAgFillBarHint:
    "Không thấy thanh dấu trang? Nhấn Ctrl+Shift+B, hoặc ⌘+Shift+B trên máy Mac.",
  kitAgFillStep2: "Sao chép câu trả lời của bạn:",
  kitAgFillCopy: "Sao chép câu trả lời của tôi",
  kitAgFillStep3:
    "Mở mẫu đơn của Tổng Chưởng lý, bấm vào dấu trang Điền mẫu AG, rồi dán bằng Ctrl+V (⌘+V trên máy Mac).",
  kitAgFillStep4:
    "Kiểm tra câu trả lời, đính kèm PDF bằng chứng, trả lời các câu hỏi ở cuối và bấm Submit.",
  kitAgFillDragHint:
    "Hãy kéo nút này lên thanh dấu trang. Bấm vào đây sẽ không có tác dụng gì.",
  kitAgFillNoContact:
    "Thêm thông tin liên lạc ở trên để dấu trang điền luôn tên và địa chỉ của bạn.",
  kitAgManualSummary: "Sao chép từng câu trả lời thay vào đó",
  agFillPrompt:
    "Dán câu trả lời của bạn vào đây: nhấn Ctrl+V, hoặc ⌘+V trên máy Mac.",
  agFillPasteLabel: "Dán câu trả lời của bạn vào đây",
  agFillWrongPage:
    "Hãy mở mẫu khiếu nại của Tổng Chưởng lý trước, rồi bấm lại vào dấu trang này.",
  agFillOpenForm: "Mở mẫu khiếu nại của Tổng Chưởng lý",
  agFillNotKit:
    "Đây có vẻ không phải câu trả lời của bạn. Hãy quay lại bộ khiếu nại, bấm Sao chép câu trả lời của tôi, rồi dán lại.",
  agFillDone:
    "Xong. Đã điền {count} câu trả lời. Hãy kiểm tra, đính kèm bằng chứng, trả lời các câu hỏi ở cuối và bấm Submit.",
  agFillClose: "Đóng",
  kitMoreCardTitle: "Thêm cách để hành động",
  kitMoreCardHint: "Biện lý quận của bạn, FTC, và tòa án khiếu nại nhỏ",
  kitDestDa: "Tìm biện lý quận hoặc luật sư thành phố của bạn",
  kitDestDaNote:
    "Họ thực thi luật bảo vệ người tiêu dùng của California tại quận của bạn.",
  kitDestFtc: "Báo cáo với FTC",
  kitDestFtcNote:
    "Báo cáo của bạn được đưa vào cơ sở dữ liệu liên bang dùng chung với các cơ quan thực thi pháp luật.",
  kitDestSmallClaims: "Kiện ứng dụng ra tòa án khiếu nại nhỏ",
  kitDestSmallClaimsNote:
    "Hướng dẫn tự lo chính thức của California. Tòa án mong bạn đã đòi tiền trước khi nộp đơn kiện.",
  kitDemandLetterHeading: "Thư đòi tiền có thể in",
  kitDemandLetterIntro:
    "Gửi thư này cho ứng dụng trước khi bạn nộp đơn kiện. Thư nêu rõ bạn được nợ bao nhiêu và vì sao.",
  kitSaveHeading: "Lưu hồ sơ",
  kitSaveIntro:
    "Lưu một bản sao có ghi ngày của bộ khiếu nại này để làm hồ sơ.",
  kitPrint: "In bộ khiếu nại này",
  kitDownloadRecord: "Tải hồ sơ về",
  kitClipboardFallbackHeading: "Sao chép thủ công",
  kitClipboardFallbackIntro:
    "Trình duyệt này đã chặn sao chép tự động. Đoạn văn bản bên dưới đã được chọn. Hãy tự sao chép.",
  kitClipboardFallbackLabel: "Văn bản cần sao chép thủ công",
  kitCitationsHeading: "Luật đằng sau bộ khiếu nại này",
  kitCitationVerified: "Đã xác minh ngày {date}.",
  kitCitationArgued: "Cách hiểu còn tranh luận. Mức sàn rõ ràng là {section}.",
  kitCitationSource: "Đọc điều luật",

  kitRecordTitle: "Hồ sơ bộ khiếu nại AB 578",
  kitRecordSaved: "Đã lưu ngày {date}",
  kitRecordAsks: "Những gì bạn yêu cầu",
  kitRecordPlatformMessage: "Tin nhắn gửi ứng dụng",
  kitRecordAgForm: "Khiếu nại gửi Tổng Chưởng lý",
  kitRecordAgFormUrl: "Mẫu đơn: {url}",
  kitRecordDemandLetter: "Thư đòi tiền",
  kitRecordDestinations: "Nơi khác để khiếu nại",
  kitRecordCitations: "Luật đằng sau bộ khiếu nại này",

  notFoundTitle: "Không tìm thấy trang",
  notFoundHeading: "Không tìm thấy trang",
  notFoundBody: "Trang đó không tồn tại.",
  notFoundHome: "Về trang chủ",

  footerNavLabel: "Menu trang",
  footerAbout: "Giới thiệu",
  footerFaq: "Câu hỏi thường gặp",
  footerPrivacy: "Quyền riêng tư",
  footerDisclaimer:
    "Đây không phải là tư vấn pháp lý. Chúng tôi không liên kết với Tiểu bang California hay bất kỳ công ty giao hàng nào.",
  footerTranslatedNote: "Được dịch bằng máy. Bản tiếng Anh là bản chính thức.",
};
