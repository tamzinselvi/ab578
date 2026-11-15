import type { Messages } from "./en";

// Tagalog. Machine-assisted translation of en.ts; the English version is the
// official one. Keep every {placeholder} and every section marker unchanged.
export const tl: Messages = {
  siteName: "AB 578 Kit sa Pagrereklamo",
  metaDescription:
    "Magsampa ng reklamo para sa refund ng food delivery sa ilalim ng AB 578 ng California sa loob ng isang minuto. Libre, pribado, walang account.",
  skipToContent: "Lumaktaw sa nilalaman",
  languageLabel: "Mga wika",
  languageSuggestRegion: "Mungkahing wika",
  languageSuggestPrompt: "Mas gusto mo ba ang {language}?",
  languageSuggestDismiss: "Isara",

  homeHeadline: "Bawiin ang pera mo sa delivery order",
  homeSubhead: "Hilingin sa AG na ipatupad ang AB 578",
  homeCta: "Magsampa ng reklamo →",
  homeHow: "Paano?",

  fileTitle: "Magsampa ng reklamo",
  fileHeading: "Magsampa ng reklamo",

  wizardProgressLabel: "Mga hakbang sa reklamo",
  wizardStepLabel: "Hakbang {current} sa {total}",
  wizardStepIssues: "Ano ang nangyari",
  wizardStepPlatform: "Aling app",
  wizardStepDetails: "Detalye ng order",
  wizardStepKit: "Ang kit mo",
  wizardBack: "Bumalik",
  wizardNext: "Susunod",
  wizardContinue: "Magpatuloy",
  wizardStartOver: "Magsimula ulit",
  wizardClearData: "Burahin ang data ko",
  wizardClearedNote:
    "Nabura na ang lahat ng itinabi ng site na ito sa device mo.",
  wizardDraftRestored: "Maligayang pagbabalik. Nandito pa ang mga sagot mo.",

  wizardIssuesHeading: "Ano ang nangyari?",
  wizardIssuesHint:
    "Piliin ang lahat ng nangyari. Puwede mo itong baguhin mamaya.",
  wizardIssueNotDelivered: "Hindi dumating",
  wizardIssueWrongOrder: "Mali ang buong order",
  wizardIssueWrongItems: "May ilang maling item",
  wizardIssueMissingItems: "May ilang kulang na item",
  wizardIssueUnusableItems:
    "May mga item na hindi na makakain (natapon, nadurog, o nabuksan)",
  wizardIssueCredits: "App credit lang ang inalok sa akin",
  wizardIssueRefundDenied: "Tinanggihan ang refund",
  wizardIssueNoHuman: "Hindi ako makausap ng tao",
  wizardIssueNotCovered: "Huli, malamig, o hindi maganda ang kalidad",
  wizardIssueNotCoveredNote:
    "Hindi ito sakop ng AB 578, pero tutulungan ka pa rin naming humingi",
  wizardAtAddress:
    "Nasa delivery address ako nang markahan itong delivered (opsyonal, lagyan ng check kung totoo lang)",
  wizardIssuesError: "Pumili ng kahit isang bagay na nagkamali.",

  wizardPlatformHeading: "Saang app ka nag-order?",
  wizardPlatformHint: "I-tap ang app mo. Isusulat namin ang reklamo para dito.",
  wizardPlatformOther: "Ibang app",
  wizardPlatformOtherLabel: "Pangalan ng app",
  wizardPlatformOtherError:
    "I-type ang pangalan ng app, o pumili ng isa sa listahan.",

  wizardDetailsHeading: "Detalye ng order",
  wizardOrderDateLabel: "Petsa ng order",
  wizardOrderTotalLabel: "Kabuuan ng order",
  wizardMoneyExampleHint: "Numero lang, gaya ng 24.50",
  wizardKeypadLabel: "Keypad para sa kabuuan ng order",
  wizardKeypadDelete: "Burahin",
  wizardRefundedHeading: "Na-refund na sa ngayon",
  wizardRefundNone: "Wala pa",
  wizardRefundCredits: "App credit lang",
  wizardRefundPartial: "Bahagi",
  wizardRefundFull: "Lahat",
  wizardRefundedAmountLabel: "Magkano ang ibinalik nila?",
  wizardOptionalSummary: "Opsyonal na detalye na nagpapalakas sa reklamo",
  wizardAffectedTotalLabel:
    "Presyo ng mga item na kulang, mali, o hindi na makakain",
  wizardAffectedTotalHint: "Ginagamit para tantiyahin ang refund",
  wizardOrderNumberLabel: "Numero ng order",
  wizardRestaurantLabel: "Restawran",
  wizardItemsLabel: "Ano ang mali, kulang, o hindi na makakain?",
  wizardItemsPlaceholder: "Halimbawa: 2 x teriyaki chicken, walang sarsa",
  wizardContactedLabel: "Kinontak ko ang app tungkol sa order na ito",
  wizardContactedDateLabel: "Petsa ng pagkontak",
  wizardContactedMethodLabel: "Paano mo sila kinontak?",
  wizardMethodChat: "Chat",
  wizardMethodPhone: "Telepono",
  wizardMethodEmail: "Email",
  wizardMethodOther: "Iba pa",
  wizardContactedResultLabel: "Ano ang nangyari?",
  wizardContactedResultPlaceholder: "Halimbawa: inalok ako ng $5 na credit",
  wizardContactedResultError:
    "Magsulat ng isang linya tungkol sa nangyari, o tanggalin ang check.",
  wizardDetailsErrorTotal: "Ilagay ang kabuuan ng order, gaya ng 24.50",
  wizardDetailsErrorDate: "Maglagay ng tamang petsa.",

  wizardKitHeading: "Ang kit mo sa pagrereklamo",
  wizardKitIntro:
    "Kopyahin ang bawat bahagi kung saan mo ito kailangan. Nananatili ang lahat sa device mo.",
  wizardKitIncomplete:
    "Tapusin muna ang mga naunang hakbang para makita ang kit mo.",
  wizardKitIncompleteBack: "Bumalik sa mga tanong",
  wizardContactHeading: "Ang contact details mo",
  wizardContactIntro:
    "Hinihingi ng form ng AG ang pangalan at address mo. Punan ito at sasagutan din ng kit mo ang mga tanong na iyon.",
  wizardContactFirstName: "Pangalan",
  wizardContactLastName: "Apelyido",
  wizardContactStreet: "Address ng kalye",
  wizardContactStreet2: "Apartment o suite (opsyonal)",
  wizardContactCity: "Lungsod",
  wizardContactState: "Estado",
  wizardContactZip: "ZIP code",
  wizardContactEmail: "Email (opsyonal)",
  wizardContactPhone: "Telepono (opsyonal)",
  wizardContactRemember: "Tandaan sa device na ito",
  wizardContactRememberNote:
    "Sa device na ito lang itinatabi, hindi kailanman ipinapadala kahit saan, hanggang burahin mo.",
  wizardContactAdd: "Idagdag ang contact details ko",
  wizardContactSavedNote: "Nasa kit na ang contact details mo.",
  wizardContactError:
    "Kailangan ang pangalan, apelyido, address ng kalye, lungsod, at ZIP code.",

  wizardNoJsHeading: "Kailangan ng JavaScript para dito",
  wizardNoJsBody:
    "Buong gumagana ang tool na ito sa browser mo. Kung walang JavaScript, dumiretso sa complaint form ng California Attorney General:",
  wizardNoJsLink: "Buksan ang complaint form ng AG",

  aboutTitle: "Tungkol",
  aboutHeading: "Tungkol",
  aboutMetaDescription:
    "Paano gumagana ang libreng kit sa pagrereklamo na ito, bakit buong refund ang hinihingi namin, at ano ang sinasabi ng AB 578 ng California na dapat gawin ng mga delivery app kapag nagkamali ang order.",
  aboutHowHeading: "Paano ito gumagana",
  aboutHowStep1:
    "Sabihin sa amin kung ano ang nagkamali sa order mo. Mga isang minuto lang.",
  aboutHowStep2:
    "Susulat kami ng hiling na refund na puwede mong i-paste diretso sa support ng DoorDash, Uber Eats, o Grubhub.",
  aboutHowStep3:
    "Pupunan namin ang reklamo mo para sa California Attorney General. Kokopyahin mo ang bawat sagot sa form ng AG at pipindutin ang submit.",
  aboutHowNote:
    "Walang account at walang database. Walang anumang tina-type mo ang lalabas sa phone mo.",
  aboutWhyHeading: "Bakit buong refund ang hinihingi namin",
  aboutWhyP1:
    "Kapag ginulo ng delivery app ang order mo, kadalasan ang maling item lang ang nire-refund nila, minsan app credit pa. Hindi iyon sapat.",
  aboutWhyP2:
    "Kung kulang o mali ang bahagi ng pagkain mo, wala ka pa ring hapunan. Para makuha ito, kailangan mong mag-order ulit, magbayad ulit ng delivery fee, service fee, at tip, at maghintay ulit. Hindi sakop ng partial refund ang alinman doon. At kung ang kulang na pagkain ay para sa anak mo o sa partner mo, hindi sila kakain ngayong gabi.",
  aboutWhyP3:
    "Puwede ring mapanganib ang maling order. Ang taong may peanut allergy ay nakakatanggap ng maling ulam. Ang taong may celiac disease ay nakakakain ng gluten. Ang taong may diabetes ay nakakatanggap ng regular na soda imbes na diet. Ang taong halal o kosher ay nakakatanggap ng karneng hindi niya puwedeng kainin. May dahilan kung bakit naglalagay ang mga tao ng notes sa order nila, at ang pagbalewala dito ay puwedeng magpadala ng tao sa ospital.",
  aboutWhyP4:
    "Gulo ito ng delivery company at ng restawran. Hindi dapat ikaw ang sumalo. Kailangang may kontrata ang mga delivery app sa bawat restawran na dine-deliver nila, at inaatasan sila ng batas ng California na sabihin sa bawat restawran kung paano hinahati sa pagitan nila ang gastos ng mga pagkakamali sa order (Business and Professions Code § 22599(a) at (d)). Kung gusto ng app na mabawi ang pera nito, puwede nitong singilin ang restawran. Hindi ikaw.",
  aboutLawHeading: "Kakampi mo ang batas ng California",
  aboutLawP1:
    "Nagkabisa ang AB 578 noong Enero 1, 2026. Kapag maling order ang dineliver, kailangang bigyan ka ng delivery app ng buong refund, kasama ang buwis, fees, at tip (Business and Professions Code § 22599.2(a)). Mananatili sa driver ang tip niya. Ang app ang sasagot sa gastos.",
  aboutLawP2:
    'Hindi binibigyang-kahulugan ng batas ang "maling order," kaya ginagamit namin ang halatang kahulugan: kung ang dumating ay hindi ang inorder mo, maling order iyon. Kasama riyan ang mga kulang na item, maling item, at pagkaing dumating na sira. Malawak ang pagbasa ng mga korte ng California sa mga batas na nagpoprotekta sa consumer, pabor sa consumer, at ganoon mismo namin binabasa ang batas na ito. Bawat hiling na isinusulat namin ay humihingi ng buong refund sa orihinal mong paraan ng pagbabayad, hindi app credit.',
  aboutLawP3:
    "May sahig din ang batas. Hindi ka puwedeng singilin sa anumang hindi mo natanggap (§ 22599.2(d)). Isinasama rin namin iyon sa bawat hiling, para hindi ka basta mabalewala ng app.",
  aboutImpactHeading: "Bakit mahalaga ang reklamo",
  aboutImpactP1:
    "Umaasa ang mga delivery app na susuko ka. Madaling balewalain ang isang hiling na refund. Hindi ganoon ang daan-daang reklamo sa Attorney General. Ginagamit ng AG ang mga reklamo para magpasya kung aling mga kompanya ang iimbestigahan.",
  aboutImpactP2:
    "Bawiin ang pera mo, tapos magsampa ng reklamo. Isang minuto lang.",
  aboutStoryHeading: "Bakit mo ito ginawa?",
  aboutStoryP1:
    "Vegetarian ako. Higit sa isang beses, may dumating na delivery order na may karne sa ulam na inorder ko nang walang karne, at nakakagat na ako bago ko napansin. Baka mukhang OA, pero pakiramdam ko nilapastangan ako. Walang pakialam ang delivery app. Pinaikot-ikot lang ako sa isang automated na loop na naging imposibleng makakuha ng kabayaran.",
  aboutStoryP2:
    "Ginawa ko ito para madali para sa kahit sino ang magsampa ng reklamo sa AG, at managot ang mga kompanyang ito. Hindi katanggap-tanggap na inaabuso tayo ng mga korporasyong ito.",
  aboutNotLegalAdvice:
    "Hindi ito legal na payo. Wala kaming kaugnayan sa Estado ng California, DoorDash, Uber Eats, Grubhub, o anumang ibang kompanya.",

  faqTitle: "Mga madalas itanong",
  faqHeading: "Mga madalas itanong",
  faqMetaDescription:
    "Credit kumpara sa refund, ano ang nangyayari sa tip, bakit buong refund ang hinihingi namin, ano ang ginagawa ng Attorney General, at ang panganib na ma-deactivate ang account.",
  faqCreditsQuestion: "Ano ang pagkakaiba ng app credit at refund?",
  faqCreditsAnswer:
    "Ang app credit ay magagamit lang sa loob ng app na iyon at nawawala kasama ng account mo. Ang refund ay bumabalik sa card o ibang paraan na ginamit mo sa pagbayad. Sinasabi ng batas ng California na dapat bigyan ka ng delivery app ng paraan para hilinging ibalik ang refund mo sa orihinal mong paraan ng pagbabayad (Business and Professions Code § 22599.2(e)). Bawat hiling na isinusulat namin ay humihingi niyon, hindi credit.",
  faqTipsQuestion: "Paano ang tip?",
  faqTipsAnswer:
    "Kapag na-refund ang order mo, babalik din sa iyo ang tip na binayaran mo, at hindi ito puwedeng bawiin ng app sa bayad ng driver (§ 22599.2(b)). Kung bahagi lang ng order mo ang natupad, dapat ka ring payagan ng app na babaan ang tip na idinagdag mo bago ang delivery (§ 22599.2(d)).",
  faqFullRefundQuestion:
    "Bakit buong refund ang hinihingi kung isang item lang ang mali o kulang?",
  faqFullRefundAnswer:
    "Dahil ang order na dumating ay hindi ang order na binayaran mo, at binabasa namin iyon bilang maling order, na ayon sa batas ay dapat bigyan ng buong refund (§ 22599.2(a)). Ipinaglalaban ang pagbasang iyon, hindi pa tiyak, kaya isinasaad din namin ang sahig na utang sa iyo kahit ano pa: hindi ka puwedeng singilin sa mga item na hindi mo natanggap (§ 22599.2(d)).",
  faqFullRefundLink: "Bakit buong refund ang hinihingi namin",
  faqAgQuestion: "Ano ang ginagawa ng Attorney General sa reklamo ko?",
  faqAgAnswer:
    "Binabasa ng consumer office ng AG ang mga reklamo at ginagamit ang mga ito para magpasya kung aling mga kompanya ang iimbestigahan. Puwede nitong ipasa ang reklamo mo sa kompanya. Hindi ito nagsisilbing abogado mo at hindi nito nilulutas ang indibidwal mong alitan. Kaya tinutulungan ka muna ng kit na hingin ang refund mo, tapos mag-report.",
  faqAccountQuestion: "Puwede bang isara ng app ang account ko dahil dito?",
  faqAccountAnswer:
    "Puwede. Pinapayagan ng batas ang delivery app na alisin ang customer na makatwiran nitong pinaghihinalaang nandaraya (§ 22599.2(f)). Hindi pandaraya ang paghingi ng refund na utang sa iyo ng batas. Ang tapat na reklamo, na sinusuportahan ng mga resibo, litrato, at mismong mga mensahe ng app, ang pinakamabuting proteksyon.",
  faqLegalQuestion: "Legal na payo ba ito?",
  faqLegalAnswer:
    "Hindi. Ipinapaliwanag ng site na ito ang batas at tinutulungan kang sumulat ng reklamo. Hindi ito law firm at walang kaugnayan sa Estado ng California o sa anumang delivery company. Para sa payo tungkol sa sitwasyon mo, kumausap ng abogado o legal aid office.",
  faqEnglishQuestion: "Bakit nasa English ang reklamo ko?",
  faqEnglishAnswer:
    "Puwede mong basahin ang site na ito sa pitong wika. Nananatiling English bilang default ang reklamong ipinapadala mo, dahil nasa English ang online form ng Attorney General. Ipinapakita ng kit mo ang English katabi ng wika mo. May toggle na puwedeng magpalit ng mensahe sa wika mo kapag sumusulat ka sa delivery app.",

  privacyTitle: "Privacy",
  privacyHeading: "Privacy",
  privacyMetaDescription:
    "Walang anumang tina-type mo ang lalabas sa device mo. Walang account, walang database, walang analytics.",
  privacyP1: "Walang anumang tina-type mo ang lalabas sa device mo.",
  privacyP2:
    'Walang account o database ang site na ito. Nagtatabi ito ng draft ng reklamo mo sa browser mo para makabalik ka rito. Itinatabi lang ang contact details mo kung hihilingin mong tandaan ito. Binubura ng "Burahin ang data ko" ang lahat, kasama ang pinili mong wika.',
  privacyP3:
    "Kapag binuksan mo ang form ng AG o ang support page ng delivery app, ikaw mismo ang nagpapadala ng reklamo mo. Walang sinuman dito ang nakakakita nito.",

  platformMetaDescription:
    "Paano hingin sa {name} ang refund sa orihinal mong paraan ng pagbabayad, makausap ang totoong tao, at magsampa ng reklamo sa ilalim ng AB 578 sa California Attorney General.",
  platformHeading: "Bawiin ang pera mo mula sa {name}",
  platformIntro:
    "Kapag nagkamali ang order sa {name}, puwede mong hingin ang pera mo, hindi lang app credit. Kami ang susulat ng hiling para sa iyo. Narito ang dokumentado ng {name}, at kung paano makausap ang tao kapag pinapaikot ka ng app.",
  platformRefundHeading: "Paano humingi ng refund sa card mo",
  platformRefundLaw:
    "Humingi ng refund sa orihinal mong paraan ng pagbabayad, hindi app credit. Bukod sa iba pang opsyon, dapat kang bigyan ng app ng paraan para hingin ito (§ 22599.2(e)).",
  platformRefundPathLabel: "Ang dokumentadong paraan ng refund ng {name}",
  platformRefundHelpLink: "Buksan ang refund help page ng {name}",
  platformHumanHeading: "Paano makausap ang totoong tao",
  platformHumanLaw:
    "Kung hindi malutas ng automated na tulong ang problema mo, dapat kang payagan ng app na makausap agad ang tao (§ 22599.1(f)).",
  platformHumanLabel: "Paano makausap ang tao sa {name}",
  platformSupportLink: "Buksan ang support ng {name}",
  platformFileIntro:
    "Gusto mo bang kami ang sumulat nito? Ginagawa ng kit na hiling na refund para sa {name} at reklamo sa California Attorney General ang nangyaring mali.",
  platformFileLegal:
    "Hindi ito legal na payo. Wala kaming kaugnayan sa Estado ng California o sa anumang delivery company.",

  evidenceHeading: "Gawing PDF ang mga screenshot mo",
  evidenceIntro:
    "Tumatanggap ang complaint form ng PDF, Word, o Excel na file, hindi larawan. Piliin ang mga screenshot mo, lagyan ng caption ang bawat isa kung gusto mo, at i-download ang PDF na handa nang i-attach. Nangyayari ang lahat sa device mo. Walang ina-upload.",
  evidenceAddImages: "Magdagdag ng screenshot",
  evidenceAddMore: "Magdagdag pa ng screenshot",
  evidenceImageCount: "{count} larawan",
  evidenceCaptionLabel: "Caption para sa {name}",
  evidenceCaptionHint:
    "Iginuguhit ang caption sa larawan, sa kahit anong wika.",
  evidenceCaptionPlaceholder: "Halimbawa: hindi ito ang inorder ko",
  evidenceMoveEarlier: "Iusog pauna ang {name}",
  evidenceMoveLater: "Iusog pahuli ang {name}",
  evidenceRemoveImage: "Alisin ang {name}",
  evidenceBuild: "Gawin ang PDF",
  evidenceBuilding: "Ginagawa ang PDF",
  evidenceCompressingProgress: "Kino-compress ang larawan {done} sa {total}",
  evidenceAssemblingProgress: "Binubuo ang PDF, pahina {done} sa {total}",
  evidenceResultHeading: "Handa na ang evidence PDF mo",
  evidenceResultPages: "{pages} pahina",
  evidenceResultSize: "Laki ng file: {size}",
  evidenceOverBudgetWarning:
    "Lampas sa 4 MB na limit ang PDF na ito. Mag-alis ng isa o dalawang screenshot at gawin itong muli.",
  evidenceDownload: "I-download ang {filename}",
  evidenceSkippedFiles:
    "Hindi isinama dahil hindi ito mabasa ng browser na ito: {names}. Baka mabuksan ito ng ibang browser.",
  evidenceBuildFailed:
    "Hindi magawa ang PDF. Subukan ulit, o gumamit ng mas kaunti o mas maliliit na screenshot.",
  evidenceEmptyHint: "Pinakamaganda ang JPEG o PNG na screenshot.",

  kitTitle: "Ang kit mo sa pagrereklamo",
  kitAsksHeading: "Ang hinihingi mo",
  kitAskLabelSettled: "Hinihingi ito ng batas",
  kitAskLabelArgued: "Suportado ng batas ng California, ayon sa pagbasa namin",
  kitAskLabelPlain: "Simpleng hiling sa ilalim ng sariling patakaran ng app",
  kitFloorLine: "Sa pinakamababa, utang sa iyo ang {amount}",
  kitFloorFallback: "Sa pinakamababa: {fallback}",
  kitWhyLink: "Bakit?",
  kitEstimateHeading: "Tantiyang refund",
  kitOutgoingLanguage: "Wika ng mga mensaheng ipinapadala mo",
  kitSendInLanguage: "Ipadala sa {language}",
  kitSendInEnglish: "Ipadala sa English",
  kitTranslationLabel: "Salin",
  kitPlatformCardTitle: "Bawiin ang refund mo mula sa {platform}",
  kitPlatformFallbackName: "ang delivery app",
  kitMessageShortLabel: "Maikling bersyon, para sa chat",
  kitMessageLongLabel: "Mahabang bersyon, para sa email o web form",
  kitCopy: "Kopyahin",
  kitCopied: "Nakopya",
  kitCopyLabel: "Kopyahin ang {what}",
  kitShare: "Ibahagi ang mensahe",
  kitOpenSupport: "Buksan ang support ng {platform}",
  kitHumanTipsHeading: "Paano makausap ang totoong tao",
  kitAgCardTitle: "I-report sa California Attorney General",
  kitAgIntro:
    "Kopyahin ang bawat sagot sa online form ng estado, sa ganitong pagkakasunod. Nasa English ang form.",
  kitAgOpenForm: "Buksan ang form ng AG",
  kitAgUploadHeading: "I-attach ang ebidensya mo",
  kitAgUploadGuidance:
    "Puwede kang mag-attach ng hanggang {count} file ({types}), bawat isa ay wala pang {limit} MB. Gumawa ng PDF gamit ang tool sa ibaba at i-attach iyon.",
  kitAgUploadLink: "Pumunta sa evidence tool",
  kitAgMailInNote:
    "Puwede ka ring mag-print ng complaint form sa {language} at ipadala ito sa koreo.",
  kitAgMailInLink: "I-download ang mail-in form sa {language} (PDF)",
  kitAgFillHeading: "Hayaang ang computer mo ang magpuno",
  kitAgFillIntro:
    "Pupunan ng isang bookmark ang form ng AG gamit ang mga sagot mo at ia-attach ang evidence PDF mo. Isang beses mo lang itong ise-set up.",
  kitAgFillStep1: "I-drag ang button na ito pataas sa bookmarks bar mo:",
  kitAgFillBookmarkName: "Punan ang AG form",
  kitAgFillBarHint:
    "Walang bookmarks bar? Pindutin ang Ctrl+Shift+B, o ⌘+Shift+B sa Mac.",
  kitAgFillStep2:
    "Opsyonal: gawin ang evidence PDF mo sa hakbang 3 sa ibaba. Ang bookmark ang mag-a-attach nito para sa iyo.",
  kitAgFillCopy: "Kopyahin ang mga sagot ko",
  kitAgFillStep3:
    "Buksan ang form ng AG, tapos i-click ang bookmark mong Punan ang AG form.",
  kitAgFillStep4:
    "Suriin ang mga sagot, sagutin ang mga tanong sa ibaba at pindutin ang Submit.",
  kitAgFillDragHint:
    "I-drag ang button na ito sa bookmarks bar mo. Walang mangyayari kung i-click mo ito dito.",
  kitAgFillNoContact:
    "Idagdag ang contact details mo sa itaas para mapunan din nito ang pangalan at address mo.",
  kitAgManualSummary: "Kopyahin na lang ang mga sagot isa-isa",
  agFillPrompt:
    "Hindi mabuksan ang kit mo. Kopyahin ang mga sagot mo mula sa kit, tapos i-paste dito gamit ang Ctrl+V (⌘+V sa Mac).",
  agFillPasteLabel: "I-paste dito ang mga sagot mo",
  agFillWrongPage:
    "Buksan muna ang complaint form ng Attorney General, tapos i-click ulit ang bookmark na ito.",
  agFillOpenForm: "Buksan ang complaint form ng AG",
  agFillNotKit:
    "Mukhang hindi iyan ang mga sagot mo. Bumalik sa kit mo, i-click ang Kopyahin ang mga sagot ko, at i-paste ulit.",
  agFillDone:
    "Tapos na. {count} sagot ang napunan. Suriin ang mga ito, i-attach ang ebidensya mo, sagutin ang mga tanong sa ibaba at pindutin ang Submit.",
  agFillClose: "Isara",
  kitAgFillEvidenceLink: "Pumunta sa hakbang 3",
  kitAgFillEvidenceReady: "Handa na: ia-attach ang {filename}.",
  kitAgFillFallback:
    "Walang nangyari, o hinarang ng browser mo ang isang popup? Kopyahin ang mga sagot mo, i-click ulit ang bookmark at i-paste.",
  agFillWaiting: "Kinukuha ang mga sagot mo mula sa kit mo…",
  agFillNoHandoff:
    "Hindi nakita ang mga sagot mo sa computer na ito. Kopyahin ang mga ito mula sa kit mo, tapos i-paste dito gamit ang Ctrl+V (⌘+V sa Mac).",
  agFillDoneFile:
    "Tapos na. {count} sagot ang napunan at na-attach ang evidence PDF mo. Suriin ang mga ito, sagutin ang mga tanong sa ibaba at pindutin ang Submit.",
  agfillPageTitle: "Ipinapadala ang mga sagot mo",
  agfillPageSending: "Ipinapadala ang mga sagot mo sa form ng AG…",
  agfillPageSent: "Naipadala na. Magsasara ang window na ito.",
  agfillPageNoData:
    "Walang nakitang sagot sa computer na ito. Buksan muna ang complaint kit mo sa browser na ito, tapos i-click ulit ang bookmark.",
  agfillPageNoOpener:
    "Buksan ang complaint form ng Attorney General, tapos i-click doon ang bookmark mong Punan ang AG form.",
  agfillPageOpenKit: "Buksan ang complaint kit mo",
  privacyP4:
    'Para mapunan ang form ng AG para sa iyo, itinatabi ng kit ang mga sagot mo at ang evidence PDF mo sa browser na ito nang dalawang oras. Ibinibigay lang ito ng bookmark na Punan ang AG form sa pahina ng form ng Attorney General. Agad itong binubura ng "Burahin ang data ko".',
  kitMoreCardTitle: "Iba pang paraan para kumilos",
  kitMoreCardHint: "Ang district attorney mo, ang FTC, at small claims court",
  kitDestDa: "Hanapin ang district attorney o city attorney mo",
  kitDestDaNote:
    "Sila ang nagpapatupad ng mga batas ng California para sa consumer sa county mo.",
  kitDestFtc: "I-report sa FTC",
  kitDestFtcNote:
    "Napupunta ang report mo sa pederal na database na ibinabahagi sa mga tagapagpatupad ng batas.",
  kitDestSmallClaims: "Idemanda ang app sa small claims court",
  kitDestSmallClaimsNote:
    "Ang opisyal na self-help guide ng California. Inaasahan ng korte na hiningi mo muna ang pera bago ka magsampa.",
  kitDemandLetterHeading: "Demand letter na puwedeng i-print",
  kitDemandLetterIntro:
    "Ipadala ito sa app bago ka magsampa. Sinasabi nito kung magkano ang utang sa iyo at bakit.",
  kitSaveHeading: "Magtabi ng rekord",
  kitSaveIntro: "Magtabi ng kopyang may petsa ng kit na ito para sa rekord mo.",
  kitPrint: "I-print ang kit na ito",
  kitDownloadRecord: "I-download ang rekord",
  kitClipboardFallbackHeading: "Kopyahin nang mano-mano",
  kitClipboardFallbackIntro:
    "Hinarang ng browser na ito ang awtomatikong pagkopya. Naka-select na ang text sa ibaba. Ikaw na ang kumopya.",
  kitClipboardFallbackLabel: "Text na kokopyahin nang mano-mano",
  kitCitationsHeading: "Ang batas sa likod ng kit na ito",
  kitCitationVerified: "Na-verify noong {date}.",
  kitCitationArgued:
    "Ipinaglalabang pagbasa. Ang malinaw na sahig ay {section}.",
  kitCitationSource: "Basahin ang seksyon",

  kitRecordTitle: "Rekord ng AB 578 kit sa pagrereklamo",
  kitRecordSaved: "Itinabi noong {date}",
  kitRecordAsks: "Ang hinihingi mo",
  kitRecordPlatformMessage: "Mensahe sa app",
  kitRecordAgForm: "Reklamo sa Attorney General",
  kitRecordAgFormUrl: "Form: {url}",
  kitRecordDemandLetter: "Demand letter",
  kitRecordDestinations: "Saan pa magrereklamo",
  kitRecordCitations: "Ang batas sa likod ng kit na ito",

  notFoundTitle: "Hindi nakita ang pahina",
  notFoundHeading: "Hindi nakita ang pahina",
  notFoundBody: "Wala ang pahinang iyon.",
  notFoundHome: "Pumunta sa home page",

  footerNavLabel: "Menu ng site",
  footerAbout: "Tungkol",
  footerFaq: "Mga madalas itanong",
  footerPrivacy: "Privacy",
  footerDisclaimer:
    "Hindi ito legal na payo. Wala kaming kaugnayan sa Estado ng California o sa anumang delivery company.",
  footerTranslatedNote: "Isinalin ng makina. Ang bersyong English ang opisyal.",
};
