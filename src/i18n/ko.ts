import type { Messages } from "./en";

// Korean. Machine-assisted translation of en.ts; the English version is the
// official one. Keep every {placeholder} and every section marker unchanged.
export const ko: Messages = {
  siteName: "AB 578 민원 키트",
  metaDescription:
    "캘리포니아 AB 578법에 따라 음식 배달 환불 민원을 1분 만에 제기하세요. 무료, 비공개, 계정 불필요.",
  skipToContent: "본문으로 건너뛰기",
  languageLabel: "언어",
  languageSuggestRegion: "언어 제안",
  languageSuggestPrompt: "{language}(으)로 보시겠어요?",
  languageSuggestDismiss: "닫기",

  homeHeadline: "배달 주문 금액을 돌려받으세요",
  homeSubhead: "검찰총장에게 AB 578 집행을 요구하세요",
  homeCta: "민원 제기하기 →",
  homeHow: "어떻게?",

  fileTitle: "민원 제기하기",
  fileHeading: "민원 제기하기",

  wizardProgressLabel: "민원 단계",
  wizardStepLabel: "{total}단계 중 {current}단계",
  wizardStepIssues: "무엇이 잘못됐나요",
  wizardStepPlatform: "어느 앱",
  wizardStepDetails: "주문 정보",
  wizardStepKit: "내 키트",
  wizardBack: "이전",
  wizardNext: "다음",
  wizardContinue: "계속",
  wizardStartOver: "처음부터 다시",
  wizardClearData: "내 데이터 지우기",
  wizardClearedNote: "이 사이트가 기기에 저장한 모든 내용이 삭제되었습니다.",
  wizardDraftRestored: "다시 오셨네요. 답변이 그대로 남아 있습니다.",

  wizardIssuesHeading: "무엇이 잘못됐나요?",
  wizardIssuesHint: "일어난 일을 모두 고르세요. 나중에 바꿀 수 있습니다.",
  wizardIssueNotDelivered: "아예 배달되지 않음",
  wizardIssueWrongOrder: "주문 전체가 잘못됨",
  wizardIssueWrongItems: "일부 메뉴가 잘못됨",
  wizardIssueMissingItems: "일부 메뉴가 빠짐",
  wizardIssueUnusableItems:
    "일부 메뉴를 먹을 수 없었음 (쏟아짐, 찌그러짐, 개봉됨)",
  wizardIssueCredits: "앱 크레딧만 제안받음",
  wizardIssueRefundDenied: "환불을 거절당함",
  wizardIssueNoHuman: "상담원과 연결되지 않음",
  wizardIssueNotCovered: "늦거나, 식었거나, 품질이 나쁨",
  wizardIssueNotCoveredNote:
    "AB 578 적용 대상은 아니지만, 요청하실 수 있도록 도와드립니다",
  wizardAtAddress:
    "배달 완료로 표시될 때 배달 주소에 있었음 (선택 사항, 사실인 경우에만 체크)",
  wizardIssuesError: "잘못된 점을 하나 이상 고르세요.",

  wizardPlatformHeading: "어느 앱으로 주문하셨나요?",
  wizardPlatformHint: "앱을 누르세요. 그 앱에 맞게 민원을 작성해 드립니다.",
  wizardPlatformOther: "다른 앱",
  wizardPlatformOtherLabel: "앱 이름",
  wizardPlatformOtherError: "앱 이름을 입력하거나 목록에서 하나를 고르세요.",

  wizardDetailsHeading: "주문 정보",
  wizardOrderDateLabel: "주문 날짜",
  wizardOrderTotalLabel: "주문 총액",
  wizardMoneyExampleHint: "숫자만, 예: 24.50",
  wizardKeypadLabel: "주문 총액 키패드",
  wizardKeypadDelete: "지우기",
  wizardRefundedHeading: "지금까지 환불받은 금액",
  wizardRefundNone: "아직 없음",
  wizardRefundCredits: "앱 크레딧만",
  wizardRefundPartial: "일부",
  wizardRefundFull: "전액",
  wizardRefundedAmountLabel: "얼마를 돌려받았나요?",
  wizardOptionalSummary: "민원을 더 강하게 만드는 선택 정보",
  wizardAffectedTotalLabel: "빠졌거나, 잘못됐거나, 먹을 수 없었던 메뉴의 가격",
  wizardAffectedTotalHint: "환불 금액을 추정하는 데 사용됩니다",
  wizardOrderNumberLabel: "주문 번호",
  wizardRestaurantLabel: "식당",
  wizardItemsLabel: "무엇이 잘못됐거나, 빠졌거나, 먹을 수 없었나요?",
  wizardItemsPlaceholder: "예: 데리야키 치킨 2개, 소스 없음",
  wizardContactedLabel: "이 주문에 대해 앱에 연락했습니다",
  wizardContactedDateLabel: "연락한 날짜",
  wizardContactedMethodLabel: "어떻게 연락하셨나요?",
  wizardMethodChat: "채팅",
  wizardMethodPhone: "전화",
  wizardMethodEmail: "이메일",
  wizardMethodOther: "기타",
  wizardContactedResultLabel: "결과는 어땠나요?",
  wizardContactedResultPlaceholder: "예: 5달러 크레딧을 제안받음",
  wizardContactedResultError: "결과를 한 줄로 적거나, 체크를 해제하세요.",
  wizardDetailsErrorTotal: "주문 총액을 입력하세요. 예: 24.50",
  wizardDetailsErrorDate: "올바른 날짜를 입력하세요.",

  wizardKitHeading: "내 민원 키트",
  wizardKitIntro:
    "각 부분을 필요한 곳에 복사하세요. 모든 내용은 기기에만 남습니다.",
  wizardKitIncomplete: "앞 단계를 마치면 키트를 볼 수 있습니다.",
  wizardKitIncompleteBack: "질문으로 돌아가기",
  wizardContactHeading: "내 연락처 정보",
  wizardContactIntro:
    "검찰총장 양식은 이름과 주소를 요구합니다. 여기에 입력하면 키트가 그 답변도 채워 줍니다.",
  wizardContactFirstName: "이름",
  wizardContactLastName: "성",
  wizardContactStreet: "도로명 주소",
  wizardContactStreet2: "아파트 또는 호수 (선택 사항)",
  wizardContactCity: "도시",
  wizardContactState: "주",
  wizardContactZip: "우편번호",
  wizardContactEmail: "이메일 (선택 사항)",
  wizardContactPhone: "전화번호 (선택 사항)",
  wizardContactRemember: "이 기기에 기억하기",
  wizardContactRememberNote:
    "이 기기에만 저장되며, 지우기 전까지 어디로도 전송되지 않습니다.",
  wizardContactAdd: "내 연락처 정보 추가",
  wizardContactSavedNote: "연락처 정보가 키트에 들어갔습니다.",
  wizardContactError: "이름, 성, 도로명 주소, 도시, 우편번호는 필수입니다.",

  wizardNoJsHeading: "이 과정에는 JavaScript가 필요합니다",
  wizardNoJsBody:
    "이 도구는 전부 브라우저 안에서 작동합니다. JavaScript가 없다면 캘리포니아 검찰총장의 민원 양식으로 바로 가세요:",
  wizardNoJsLink: "검찰총장 민원 양식 열기",

  aboutTitle: "소개",
  aboutHeading: "소개",
  aboutMetaDescription:
    "이 무료 민원 키트가 어떻게 작동하는지, 왜 전액 환불을 요구하는지, 그리고 주문이 잘못됐을 때 배달 앱이 해야 할 일에 대해 캘리포니아 AB 578법이 무엇을 말하는지 알아보세요.",
  aboutHowHeading: "작동 방식",
  aboutHowStep1: "주문에서 무엇이 잘못됐는지 알려 주세요. 1분 정도 걸립니다.",
  aboutHowStep2:
    "DoorDash, Uber Eats, Grubhub 고객 지원에 바로 붙여 넣을 수 있는 환불 요구서를 작성해 드립니다.",
  aboutHowStep3:
    "캘리포니아 검찰총장에게 보낼 민원을 채워 드립니다. 각 답변을 검찰총장 양식에 복사한 뒤 제출을 누르면 됩니다.",
  aboutHowNote:
    "계정도 데이터베이스도 없습니다. 입력한 내용은 하나도 휴대폰 밖으로 나가지 않습니다.",
  aboutWhyHeading: "왜 전액 환불을 요구하나요",
  aboutWhyP1:
    "배달 앱이 주문을 망치면 보통 잘못된 메뉴만 환불해 주고, 그것도 앱 크레딧으로 줄 때가 있습니다. 그걸로는 부족합니다.",
  aboutWhyP2:
    "식사의 일부가 빠졌거나 잘못 왔다면, 여전히 저녁을 먹지 못한 것입니다. 그걸 받으려면 다시 주문하고, 배달비와 서비스 수수료와 팁을 또 내고, 또 기다려야 합니다. 부분 환불은 그 어느 것도 보상하지 않습니다. 빠진 음식이 아이나 배우자의 것이었다면, 그 사람은 오늘 밤 그냥 굶게 됩니다.",
  aboutWhyP3:
    "잘못된 주문은 위험할 수도 있습니다. 땅콩 알레르기가 있는 사람이 엉뚱한 음식을 받습니다. 셀리악병이 있는 사람이 글루텐을 먹게 됩니다. 당뇨가 있는 사람이 다이어트 탄산음료 대신 일반 탄산음료를 받습니다. 할랄이나 코셔를 지키는 사람이 먹을 수 없는 고기를 받습니다. 사람들이 주문에 메모를 남기는 데는 이유가 있고, 그것을 무시하면 누군가는 병원에 갈 수도 있습니다.",
  aboutWhyP4:
    "이것은 배달 회사와 식당이 만든 문제입니다. 당신이 떠안을 일이 아닙니다. 배달 앱은 배달하는 모든 식당과 계약을 맺어야 하고, 캘리포니아 법은 주문 오류의 비용을 양측이 어떻게 나누는지 각 식당에 알리도록 요구합니다(사업 및 직업법 § 22599(a) 및 (d)). 앱이 돈을 돌려받고 싶다면 식당에 청구하면 됩니다. 당신이 아니라요.",
  aboutLawHeading: "캘리포니아 법은 당신 편입니다",
  aboutLawP1:
    "AB 578은 2026년 1월 1일에 시행되었습니다. 잘못된 주문이 배달되면, 배달 앱은 세금, 각종 수수료, 팁을 포함해 전액을 환불해야 합니다(사업 및 직업법 § 22599.2(a)). 배달원은 팁을 그대로 받습니다. 비용은 앱이 부담합니다.",
  aboutLawP2:
    '법은 "잘못된 주문"을 정의하지 않으므로, 우리는 가장 분명한 의미를 씁니다. 도착한 것이 주문한 것이 아니라면, 그것은 잘못된 주문입니다. 빠진 메뉴, 잘못 온 메뉴, 망가진 채로 도착한 음식이 모두 여기에 포함됩니다. 캘리포니아 법원은 소비자 보호법을 소비자에게 유리하게 넓게 해석하며, 우리도 바로 그렇게 이 법을 읽습니다. 우리가 작성하는 모든 요구서는 앱 크레딧이 아니라 원래 결제 수단으로의 전액 환불을 요구합니다.',
  aboutLawP3:
    "법은 최저선도 정해 둡니다. 받지 못한 것에 대해서는 요금을 청구할 수 없습니다(§ 22599.2(d)). 앱이 그냥 무시하지 못하도록, 이 내용도 모든 요구서에 넣습니다.",
  aboutImpactHeading: "민원이 중요한 이유",
  aboutImpactP1:
    "배달 앱은 사람들이 포기하기를 기대합니다. 환불 요청 하나는 무시하기 쉽습니다. 검찰총장에게 들어간 수백 건의 민원은 그렇지 않습니다. 검찰총장은 민원을 바탕으로 어떤 회사를 조사할지 결정합니다.",
  aboutImpactP2: "돈을 돌려받고, 그다음 민원을 제기하세요. 1분이면 됩니다.",
  aboutStoryHeading: "왜 이걸 만들었나요?",
  aboutStoryP1:
    "저는 채식주의자입니다. 고기 없이 주문한 요리에 고기가 들어간 채 배달된 적이 여러 번 있었고, 알아차리기 전에 한 입 먹어 버렸습니다. 과하게 들릴 수도 있지만, 저는 침해당한 기분이었습니다. 배달 앱은 전혀 신경 쓰지 않았습니다. 자동 응답 루프만 계속 돌게 해서 보상을 받는 것이 불가능했습니다.",
  aboutStoryP2:
    "누구나 쉽게 검찰총장에게 민원을 제기하고, 이 회사들에 책임을 물을 수 있도록 이것을 만들었습니다. 이런 기업들이 우리를 함부로 대하는 것은 용납할 수 없습니다.",
  aboutNotLegalAdvice:
    "법률 자문이 아닙니다. 저희는 캘리포니아주, DoorDash, Uber Eats, Grubhub 또는 다른 어떤 회사와도 관련이 없습니다.",

  faqTitle: "자주 묻는 질문",
  faqHeading: "자주 묻는 질문",
  faqMetaDescription:
    "크레딧과 환불의 차이, 팁은 어떻게 되는지, 왜 전액 환불을 요구하는지, 검찰총장이 하는 일, 그리고 계정 정지 위험에 대해 알아보세요.",
  faqCreditsQuestion: "앱 크레딧과 환불은 무엇이 다른가요?",
  faqCreditsAnswer:
    "앱 크레딧은 그 앱 안에서만 쓸 수 있고, 계정이 없어지면 함께 사라집니다. 환불은 결제에 사용한 카드나 다른 수단으로 돌아옵니다. 캘리포니아 법은 배달 앱이 환불을 원래 결제 수단으로 받도록 요청할 방법을 제공해야 한다고 정합니다(사업 및 직업법 § 22599.2(e)). 우리가 작성하는 모든 요구서는 크레딧이 아니라 그것을 요구합니다.",
  faqTipsQuestion: "팁은 어떻게 되나요?",
  faqTipsAnswer:
    "주문이 환불되면 낸 팁도 돌려받으며, 앱은 그 금액을 배달원의 수입에서 다시 가져갈 수 없습니다(§ 22599.2(b)). 주문이 일부만 이행되었다면, 앱은 배달 전에 추가한 팁을 낮출 수 있게 해야 합니다(§ 22599.2(d)).",
  faqFullRefundQuestion:
    "메뉴 하나만 잘못됐거나 빠졌는데 왜 전액 환불을 요구하나요?",
  faqFullRefundAnswer:
    "도착한 주문은 돈을 낸 주문이 아니고, 우리는 그것을 잘못된 주문으로 보며, 법에 따르면 잘못된 주문은 전액 환불 대상이기 때문입니다(§ 22599.2(a)). 이 해석은 주장하는 것이지 확정된 것이 아니므로, 어떤 경우에도 받아야 할 최저선도 함께 적습니다. 받지 못한 메뉴에 대해서는 요금을 청구할 수 없습니다(§ 22599.2(d)).",
  faqFullRefundLink: "왜 전액 환불을 요구하나요",
  faqAgQuestion: "검찰총장은 내 민원으로 무엇을 하나요?",
  faqAgAnswer:
    "검찰총장 소비자 부서는 민원을 읽고, 이를 바탕으로 어떤 회사를 조사할지 결정합니다. 민원을 해당 회사에 전달할 수도 있습니다. 당신의 변호사 역할을 하지는 않으며, 개인 분쟁을 해결해 주지도 않습니다. 그래서 키트는 먼저 환불을 요구하도록 돕고, 그다음 신고하도록 돕습니다.",
  faqAccountQuestion: "이 일로 앱이 내 계정을 정지할 수 있나요?",
  faqAccountAnswer:
    "그럴 수 있습니다. 법은 배달 앱이 사기를 합리적으로 의심하는 고객을 퇴출할 수 있도록 허용합니다(§ 22599.2(f)). 법이 보장하는 환불을 요구하는 것은 사기가 아닙니다. 영수증, 사진, 앱이 보낸 메시지로 뒷받침된 정직한 민원이 가장 좋은 보호 수단입니다.",
  faqLegalQuestion: "이것은 법률 자문인가요?",
  faqLegalAnswer:
    "아닙니다. 이 사이트는 법을 설명하고 민원 작성을 돕습니다. 법률 사무소가 아니며, 캘리포니아주나 어떤 배달 회사와도 관련이 없습니다. 본인 상황에 대한 조언이 필요하면 변호사나 법률 구조 기관과 상담하세요.",
  faqEnglishQuestion: "왜 내 민원은 영어로 되어 있나요?",
  faqEnglishAnswer:
    "이 사이트는 일곱 개 언어로 읽을 수 있습니다. 검찰총장의 온라인 양식이 영어이기 때문에, 보내는 민원은 기본적으로 영어로 유지됩니다. 키트는 영어와 당신의 언어를 나란히 보여 줍니다. 배달 앱에 글을 쓸 때는 토글로 메시지를 당신의 언어로 바꿀 수 있습니다.",

  privacyTitle: "개인정보",
  privacyHeading: "개인정보",
  privacyMetaDescription:
    "입력한 내용은 하나도 기기 밖으로 나가지 않습니다. 계정도, 데이터베이스도, 분석 도구도 없습니다.",
  privacyP1: "입력한 내용은 하나도 기기 밖으로 나가지 않습니다.",
  privacyP2:
    '이 사이트에는 계정도 데이터베이스도 없습니다. 다시 돌아올 수 있도록 민원 초안을 브라우저에 저장합니다. 연락처 정보는 기억하도록 요청한 경우에만 저장됩니다. "내 데이터 지우기"를 누르면 언어 선택을 포함해 모든 것이 삭제됩니다.',
  privacyP3:
    "검찰총장 양식이나 배달 앱 고객 지원 페이지를 열면, 민원은 당신이 직접 보냅니다. 여기서는 아무도 볼 수 없습니다.",

  platformMetaDescription:
    "{name}에 원래 결제 수단으로 환불을 요구하는 방법, 실제 상담원과 연결하는 방법, 그리고 캘리포니아 검찰총장에게 AB 578 민원을 제기하는 방법.",
  platformHeading: "{name}에서 돈을 돌려받으세요",
  platformIntro:
    "{name} 주문이 잘못되면, 앱 크레딧이 아니라 돈을 요구할 수 있습니다. 요구서는 저희가 작성해 드립니다. 아래는 {name}이(가) 공개한 절차와, 앱이 시간을 끌 때 상담원과 연결하는 방법입니다.",
  platformRefundHeading: "카드로 환불을 요구하는 방법",
  platformRefundLaw:
    "앱 크레딧이 아니라 원래 결제 수단으로 환불을 요청하세요. 다른 선택지와 함께, 앱은 그렇게 요청할 방법을 제공해야 합니다(§ 22599.2(e)).",
  platformRefundPathLabel: "{name}이(가) 공개한 환불 절차",
  platformRefundHelpLink: "{name} 환불 도움말 페이지 열기",
  platformHumanHeading: "실제 상담원과 연결하는 방법",
  platformHumanLaw:
    "자동 지원으로 문제가 해결되지 않으면, 앱은 신속하게 상담원과 연결해 주어야 합니다(§ 22599.1(f)).",
  platformHumanLabel: "{name}에서 상담원과 연결하는 방법",
  platformSupportLink: "{name} 고객 지원 열기",
  platformFileIntro:
    "대신 작성해 드릴까요? 키트는 잘못된 내용을 {name}에 보낼 환불 요구서와 캘리포니아 검찰총장에게 보낼 민원으로 만들어 줍니다.",
  platformFileLegal:
    "법률 자문이 아닙니다. 저희는 캘리포니아주나 어떤 배달 회사와도 관련이 없습니다.",

  evidenceHeading: "스크린샷을 PDF로 만들기",
  evidenceIntro:
    "민원 양식은 이미지가 아니라 PDF, Word, Excel 파일만 받습니다. 스크린샷을 고르고, 원하면 각각에 설명을 붙인 뒤, 바로 첨부할 수 있는 PDF를 내려받으세요. 모든 작업은 기기 안에서 이루어집니다. 아무것도 업로드되지 않습니다.",
  evidenceAddImages: "스크린샷 추가",
  evidenceAddMore: "스크린샷 더 추가",
  evidenceImageCount: "이미지 {count}개",
  evidenceCaptionLabel: "{name} 설명",
  evidenceCaptionHint: "설명은 이미지 위에 그려지며, 어떤 언어든 가능합니다.",
  evidenceCaptionPlaceholder: "예: 이건 제가 주문한 게 아닙니다",
  evidenceMoveEarlier: "{name} 앞으로 이동",
  evidenceMoveLater: "{name} 뒤로 이동",
  evidenceRemoveImage: "{name} 삭제",
  evidenceBuild: "PDF 만들기",
  evidenceBuilding: "PDF 만드는 중",
  evidenceCompressingProgress: "이미지 압축 중 ({total}개 중 {done}번째)",
  evidenceAssemblingProgress: "PDF 조립 중 ({total}쪽 중 {done}쪽)",
  evidenceResultHeading: "증거 PDF가 준비되었습니다",
  evidenceResultPages: "{pages}쪽",
  evidenceResultSize: "파일 크기: {size}",
  evidenceOverBudgetWarning:
    "이 PDF는 4 MB 제한을 넘습니다. 스크린샷을 한두 장 빼고 다시 만드세요.",
  evidenceDownload: "{filename} 내려받기",
  evidenceSkippedFiles:
    "이 브라우저가 읽을 수 없어 제외했습니다: {names}. 다른 브라우저에서는 열릴 수 있습니다.",
  evidenceBuildFailed:
    "PDF를 만들 수 없었습니다. 다시 시도하거나, 스크린샷 수를 줄이거나 더 작은 것을 사용하세요.",
  evidenceEmptyHint: "JPEG나 PNG 스크린샷이 가장 잘 됩니다.",

  kitTitle: "내 민원 키트",
  kitAsksHeading: "요구하는 내용",
  kitAskLabelSettled: "법이 요구하는 사항",
  kitAskLabelArgued: "우리가 해석하는 캘리포니아 법이 뒷받침하는 사항",
  kitAskLabelPlain: "앱 자체 정책에 따른 단순 요청",
  kitFloorLine: "최소한 {amount}을(를) 받아야 합니다",
  kitFloorFallback: "최소한: {fallback}",
  kitWhyLink: "왜요?",
  kitEstimateHeading: "예상 환불액",
  kitOutgoingLanguage: "보내는 메시지의 언어",
  kitSendInLanguage: "{language}(으)로 보내기",
  kitSendInEnglish: "영어로 보내기",
  kitTranslationLabel: "번역",
  kitPlatformCardTitle: "{platform}에서 환불받기",
  kitPlatformFallbackName: "배달 앱",
  kitMessageShortLabel: "짧은 버전, 채팅용",
  kitMessageLongLabel: "긴 버전, 이메일이나 웹 양식용",
  kitCopy: "복사",
  kitCopied: "복사됨",
  kitCopyLabel: "{what} 복사",
  kitShare: "메시지 공유",
  kitOpenSupport: "{platform} 고객 지원 열기",
  kitHumanTipsHeading: "실제 상담원과 연결하는 방법",
  kitAgCardTitle: "캘리포니아 검찰총장에게 신고하기",
  kitAgIntro:
    "각 답변을 이 순서대로 주 정부 온라인 양식에 복사하세요. 양식은 영어로 되어 있습니다.",
  kitAgOpenForm: "검찰총장 양식 열기",
  kitAgUploadHeading: "증거 첨부하기",
  kitAgUploadGuidance:
    "최대 {count}개 파일({types})을 첨부할 수 있으며, 각각 {limit} MB 미만이어야 합니다. 아래 도구로 PDF를 만들어 첨부하세요.",
  kitAgUploadLink: "증거 도구로 가기",
  kitAgMailInNote: "{language} 민원 양식을 인쇄해 우편으로 보낼 수도 있습니다.",
  kitAgMailInLink: "{language} 우편용 양식 내려받기 (PDF)",
  kitAgFillHeading: "컴퓨터가 대신 채우게 하세요",
  kitAgFillIntro:
    "북마크 하나가 검찰총장 양식을 당신의 답변으로 채우고 증거 PDF도 첨부합니다. 한 번만 설정하면 됩니다.",
  kitAgFillStep1: "이 버튼을 북마크바로 끌어다 놓으세요:",
  kitAgFillBookmarkName: "AG 양식 채우기",
  kitAgFillBarHint:
    "북마크바가 안 보이나요? Ctrl+Shift+B를 누르세요. Mac에서는 ⌘+Shift+B입니다.",
  kitAgFillStep2:
    "선택 사항: 아래 3단계에서 증거 PDF를 만드세요. 북마크가 대신 첨부합니다.",
  kitAgFillCopy: "내 답변 복사",
  kitAgFillStep3: '검찰총장 양식을 연 다음 "AG 양식 채우기" 북마크를 누르세요.',
  kitAgFillStep4: "답변을 확인하고, 맨 아래 질문에 답한 뒤 Submit을 누르세요.",
  kitAgFillDragHint:
    "이 버튼을 북마크바로 끌어다 놓으세요. 여기서 누르면 아무 일도 일어나지 않습니다.",
  kitAgFillNoContact:
    "위에 연락처 정보를 추가하면 이름과 주소도 함께 채워집니다.",
  kitAgManualSummary: "대신 답변을 하나씩 복사하기",
  agFillPrompt:
    "키트를 열 수 없었습니다. 키트에서 답변을 복사한 뒤 Ctrl+V(Mac은 ⌘+V)로 여기에 붙여 넣으세요.",
  agFillPasteLabel: "여기에 답변을 붙여 넣으세요",
  agFillWrongPage:
    "먼저 검찰총장 민원 양식을 연 다음, 이 북마크를 다시 누르세요.",
  agFillOpenForm: "검찰총장 민원 양식 열기",
  agFillNotKit:
    '답변이 아닌 것 같습니다. 키트로 돌아가 "내 답변 복사"를 누른 뒤 다시 붙여 넣으세요.',
  agFillDone:
    "완료. 답변 {count}개를 채웠습니다. 확인하고, 증거를 첨부하고, 맨 아래 질문에 답한 뒤 Submit을 누르세요.",
  agFillClose: "닫기",
  kitAgFillEvidenceLink: "3단계로 가기",
  kitAgFillEvidenceReady: "준비 완료: {filename} 파일이 첨부됩니다.",
  kitAgFillFallback:
    "아무 일도 없거나 브라우저가 팝업을 막았나요? 답변을 복사하고, 북마크를 다시 누른 뒤 붙여 넣으세요.",
  agFillWaiting: "키트에서 답변을 가져오는 중…",
  agFillNoHandoff:
    "이 컴퓨터에서 답변을 찾을 수 없습니다. 키트에서 복사한 뒤 Ctrl+V(Mac은 ⌘+V)로 여기에 붙여 넣으세요.",
  agFillDoneFile:
    "완료. 답변 {count}개를 채우고 증거 PDF를 첨부했습니다. 확인하고, 맨 아래 질문에 답한 뒤 Submit을 누르세요.",
  agfillPageTitle: "답변 보내는 중",
  agfillPageSending: "검찰총장 양식으로 답변을 보내는 중…",
  agfillPageSent: "보냈습니다. 이 창은 곧 닫힙니다.",
  agfillPageNoData:
    "이 컴퓨터에서 답변을 찾을 수 없습니다. 먼저 이 브라우저에서 민원 키트를 연 다음 북마크를 다시 누르세요.",
  agfillPageNoOpener:
    '검찰총장 민원 양식을 연 다음, 그곳에서 "AG 양식 채우기" 북마크를 누르세요.',
  agfillPageOpenKit: "민원 키트 열기",
  privacyP4:
    '검찰총장 양식을 대신 채우기 위해, 키트는 답변과 증거 PDF를 이 브라우저에 두 시간 동안 보관합니다. "AG 양식 채우기" 북마크는 이를 검찰총장 양식 페이지에만 전달합니다. "내 데이터 지우기"를 누르면 바로 삭제됩니다.',
  kitMoreCardTitle: "더 많은 대응 방법",
  kitMoreCardHint: "지방검사, FTC, 소액 재판",
  kitDestDa: "지방검사 또는 시 검사 찾기",
  kitDestDaNote: "이들은 거주하는 카운티에서 캘리포니아 소비자법을 집행합니다.",
  kitDestFtc: "FTC에 신고하기",
  kitDestFtcNote:
    "신고 내용은 법 집행 기관과 공유되는 연방 데이터베이스에 들어갑니다.",
  kitDestSmallClaims: "소액 재판에서 앱을 상대로 소송하기",
  kitDestSmallClaimsNote:
    "캘리포니아 공식 셀프 헬프 안내입니다. 법원은 소송 전에 먼저 돈을 요구했기를 기대합니다.",
  kitDemandLetterHeading: "인쇄용 지급 요구서",
  kitDemandLetterIntro:
    "소송 전에 앱에 보내세요. 받아야 할 금액과 그 이유가 적혀 있습니다.",
  kitSaveHeading: "기록 보관하기",
  kitSaveIntro: "이 키트의 날짜가 적힌 사본을 기록용으로 보관하세요.",
  kitPrint: "이 키트 인쇄",
  kitDownloadRecord: "기록 내려받기",
  kitClipboardFallbackHeading: "직접 복사하기",
  kitClipboardFallbackIntro:
    "이 브라우저가 자동 복사를 막았습니다. 아래 텍스트가 선택되어 있으니 직접 복사하세요.",
  kitClipboardFallbackLabel: "직접 복사할 텍스트",
  kitCitationsHeading: "이 키트의 근거가 되는 법",
  kitCitationVerified: "{date}에 확인함.",
  kitCitationArgued: "주장하는 해석입니다. 명확한 최저선은 {section}입니다.",
  kitCitationSource: "조항 읽기",

  kitRecordTitle: "AB 578 민원 키트 기록",
  kitRecordSaved: "{date}에 저장함",
  kitRecordAsks: "요구하는 내용",
  kitRecordPlatformMessage: "앱에 보낼 메시지",
  kitRecordAgForm: "검찰총장 민원",
  kitRecordAgFormUrl: "양식: {url}",
  kitRecordDemandLetter: "지급 요구서",
  kitRecordDestinations: "그 밖의 민원 제기처",
  kitRecordCitations: "이 키트의 근거가 되는 법",

  notFoundTitle: "페이지를 찾을 수 없음",
  notFoundHeading: "페이지를 찾을 수 없음",
  notFoundBody: "그 페이지는 존재하지 않습니다.",
  notFoundHome: "홈페이지로 가기",

  footerNavLabel: "사이트 메뉴",
  footerAbout: "소개",
  footerFaq: "자주 묻는 질문",
  footerPrivacy: "개인정보",
  footerDisclaimer:
    "법률 자문이 아닙니다. 저희는 캘리포니아주나 어떤 배달 회사와도 관련이 없습니다.",
  footerTranslatedNote: "기계 번역입니다. 영어판이 공식 버전입니다.",
};
