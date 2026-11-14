/**
 * English source catalog. Every user-facing string on the site starts here.
 * Other locale catalogs fall back to these strings for any missing key.
 *
 * Copy rules: no em dashes (U+2014, including the Chinese double dash) in any
 * locale. The arrow character in homeCta is allowed. Every statute citation
 * written as a section marker must match a section id in src/data/law.ts;
 * tests/unit/content.test.ts enforces it.
 *
 * The About copy and the owner's story are approved copy: keep them verbatim.
 */
const source = {
  siteName: "AB 578 Complaint Kit",
  metaDescription:
    "File a food delivery refund complaint under California AB 578 in about a minute. Free, private, no account.",
  skipToContent: "Skip to content",
  languageLabel: "Languages",
  languageSuggestRegion: "Language suggestion",
  languageSuggestPrompt: "Prefer {language}?",
  languageSuggestDismiss: "Dismiss",

  // Home. Keep it this simple: headline, subhead, one button, one link.
  homeHeadline: "Get your delivery order money back",
  homeSubhead: "Demand the AG enforce AB 578",
  homeCta: "File a complaint →",
  homeHow: "How?",

  // File (wizard page; strings below drive the wizard island).
  fileTitle: "File a complaint",
  fileHeading: "File a complaint",

  // Wizard: progress, navigation and data controls.
  wizardProgressLabel: "Complaint steps",
  wizardStepLabel: "Step {current} of {total}",
  wizardStepIssues: "What went wrong",
  wizardStepPlatform: "Which app",
  wizardStepDetails: "Order details",
  wizardStepKit: "Your kit",
  wizardBack: "Back",
  wizardNext: "Next",
  wizardContinue: "Continue",
  wizardStartOver: "Start over",
  wizardClearData: "Clear my data",
  wizardClearedNote: "Cleared everything this site saved on your device.",
  wizardDraftRestored: "Welcome back. Your earlier answers are still here.",

  // Wizard step 1: what went wrong.
  wizardIssuesHeading: "What went wrong?",
  wizardIssuesHint:
    "Choose everything that happened. You can change this later.",
  wizardIssueNotDelivered: "It never arrived",
  wizardIssueWrongOrder: "The whole order was wrong",
  wizardIssueWrongItems: "Some items were wrong",
  wizardIssueMissingItems: "Some items were missing",
  wizardIssueUnusableItems:
    "Items arrived unusable (spilled, crushed or opened)",
  wizardIssueCredits: "I was offered only app credit",
  wizardIssueRefundDenied: "My refund was denied",
  wizardIssueNoHuman: "I couldn't reach a human",
  wizardIssueNotCovered: "It was late, cold or poor quality",
  wizardIssueNotCoveredNote: "Not covered by AB 578, but we'll help you ask",
  wizardIssuesError: "Choose at least one thing that went wrong.",

  // Wizard step 2: which app.
  wizardPlatformHeading: "Which app was your order on?",
  wizardPlatformHint: "Tap your app. We'll write the complaint for it.",
  wizardPlatformOther: "Another app",
  wizardPlatformOtherLabel: "App name",
  wizardPlatformOtherError: "Type the app's name, or pick a listed app.",

  // Wizard step 3: order details.
  wizardDetailsHeading: "Order details",
  wizardOrderDateLabel: "Order date",
  wizardOrderTotalLabel: "Order total",
  wizardMoneyExampleHint: "Numbers only, like 24.50",
  wizardKeypadLabel: "Order total keypad",
  wizardKeypadDelete: "Delete",
  wizardRefundedHeading: "Refunded so far",
  wizardRefundNone: "Nothing yet",
  wizardRefundCredits: "Only app credit",
  wizardRefundPartial: "Part of it",
  wizardRefundFull: "All of it",
  wizardRefundedAmountLabel: "How much came back?",
  wizardOptionalSummary: "Optional details that strengthen the complaint",
  wizardAffectedTotalLabel: "Price of the missing, wrong or unusable items",
  wizardAffectedTotalHint: "Used for the refund estimate",
  wizardOrderNumberLabel: "Order number",
  wizardRestaurantLabel: "Restaurant",
  wizardItemsLabel: "What was wrong, missing or unusable?",
  wizardItemsPlaceholder: "For example: 2 x chicken teriyaki, no sauce",
  wizardContactedLabel: "I contacted the app about this order",
  wizardContactedDateLabel: "Contact date",
  wizardContactedMethodLabel: "How did you contact them?",
  wizardMethodChat: "Chat",
  wizardMethodPhone: "Phone",
  wizardMethodEmail: "Email",
  wizardMethodOther: "Other",
  wizardContactedResultLabel: "What happened?",
  wizardContactedResultPlaceholder:
    "For example: they offered 5 dollars in credit",
  wizardContactedResultError:
    "Write a line about what happened, or untick the box.",
  wizardDetailsErrorTotal: "Enter the order total, like 24.50",
  wizardDetailsErrorDate: "Enter a valid date.",

  // Wizard step 4: the kit and its contact panel.
  wizardKitHeading: "Your complaint kit",
  wizardKitIntro:
    "Copy each part where you need it. Everything stays on your device.",
  wizardKitIncomplete: "Finish the earlier steps to see your kit.",
  wizardKitIncompleteBack: "Go back to the questions",
  wizardContactHeading: "Your contact details",
  wizardContactIntro:
    "The Attorney General's form asks for your name and address. Fill this in and your kit fills those answers too.",
  wizardContactFirstName: "First name",
  wizardContactLastName: "Last name",
  wizardContactStreet: "Street address",
  wizardContactStreet2: "Apartment or suite (optional)",
  wizardContactCity: "City",
  wizardContactState: "State",
  wizardContactZip: "ZIP code",
  wizardContactEmail: "Email (optional)",
  wizardContactPhone: "Phone (optional)",
  wizardContactRemember: "Remember on this device",
  wizardContactRememberNote:
    "Saved only on this device, never sent anywhere, until you clear it.",
  wizardContactAdd: "Add my contact details",
  wizardContactSavedNote: "Your contact details are in the kit.",
  wizardContactError:
    "First name, last name, street, city and ZIP code are needed.",

  // No-JavaScript fallback on /file.
  wizardNoJsHeading: "The wizard needs JavaScript",
  wizardNoJsBody:
    "This tool works entirely in your browser. Without JavaScript, go straight to the California Attorney General's complaint form:",
  wizardNoJsLink: "Open the AG complaint form",

  // About. Approved copy from the design doc, plus the owner's story.
  aboutTitle: "About",
  aboutHeading: "About",
  aboutMetaDescription:
    "How this free complaint kit works, why we ask for a full refund, and what California's AB 578 says delivery apps must do when an order goes wrong.",
  aboutHowHeading: "How it works",
  aboutHowStep1:
    "Tell us what went wrong with your order. It takes about a minute.",
  aboutHowStep2:
    "We write a refund demand you can paste straight into DoorDash, Uber Eats or Grubhub support.",
  aboutHowStep3:
    "We fill out your complaint to the California Attorney General. You copy each answer into the AG's form and hit submit.",
  aboutHowNote:
    "There's no account and no database. Nothing you type leaves your phone.",
  aboutWhyHeading: "Why we ask for a full refund",
  aboutWhyP1:
    "When a delivery app messes up your order, they usually refund the one item they got wrong, sometimes only as app credit. That doesn't cut it.",
  aboutWhyP2:
    "If part of your food is missing or wrong, you still don't have dinner. Getting it means ordering again, paying another delivery fee, another service fee and another tip, and waiting all over again. A partial refund covers none of that. And if the missing meal was your kid's or your partner's, they just don't eat tonight.",
  aboutWhyP3:
    "A wrong order can also be dangerous. Someone with a peanut allergy gets the wrong dish. Someone with celiac gets gluten. Someone with diabetes gets a regular soda instead of a diet one. Someone who keeps halal or kosher gets meat they can't eat. People put these notes on their orders for a reason, and ignoring them can put someone in the hospital.",
  aboutWhyP4:
    "This is the delivery company's mess and the restaurant's mess. It shouldn't be yours. Delivery apps are required to have a contract with every restaurant they deliver for, and California law makes them tell each restaurant how the cost of order mistakes gets split between them (Business and Professions Code § 22599(a) and (d)). If the app wants its money back, it can collect from the restaurant. Not from you.",
  aboutLawHeading: "California law is on your side",
  aboutLawP1:
    "AB 578 took effect on January 1, 2026. When the wrong order is delivered, the delivery app has to give you a full refund, including taxes, fees and the tip (Business and Professions Code § 22599.2(a)). The driver still keeps their tip. The app eats the cost.",
  aboutLawP2:
    "The law doesn't define \"wrong order,\" so we go with the obvious meaning: if what showed up isn't what you ordered, it's the wrong order. That includes missing items, wrong items and food that arrived ruined. California courts read consumer protection laws broadly, in favor of the consumer, and that's exactly how we read this one. Every request we write demands a full refund to your original payment method, not app credit.",
  aboutLawP3:
    "The law also sets a floor. You can't be charged for anything you didn't get (§ 22599.2(d)). We put that in every request too, so the app can't just brush you off.",
  aboutImpactHeading: "Why the complaint matters",
  aboutImpactP1:
    "Delivery apps count on people giving up. One refund request is easy to ignore. Hundreds of complaints to the Attorney General are not. The AG uses complaints to decide which companies to investigate.",
  aboutImpactP2:
    "Get your money back, then file the complaint. It takes a minute.",
  aboutStoryHeading: "Why did you build this?",
  aboutStoryP1:
    "I'm a vegetarian. More than once, a delivery order showed up with meat in a dish I ordered without it, and I took a bite before I noticed. It might sound extreme, but I felt violated. The delivery app couldn't have cared less. It sent me around an automated loop that made it impossible to get compensated.",
  aboutStoryP2:
    "I built this so anyone can file a complaint with the Attorney General and hold these companies accountable. It's unacceptable that these corporations abuse us.",
  aboutNotLegalAdvice:
    "Not legal advice. We're not affiliated with the State of California, DoorDash, Uber Eats, Grubhub or any other company.",

  // FAQ.
  faqTitle: "FAQ",
  faqHeading: "FAQ",
  faqMetaDescription:
    "Credits or a refund, what happens to the tip, why we ask for a full refund, what the Attorney General does, and the account-removal risk.",
  faqCreditsQuestion: "What's the difference between app credit and a refund?",
  faqCreditsAnswer:
    "App credit only works inside that app, and it expires with your account. A refund goes back to the card or other method you paid with. California law says a delivery app must give you a way to ask that your refund go back to your original payment method (Business and Professions Code § 22599.2(e)). Every request we write asks for that, not credit.",
  faqTipsQuestion: "What happens to the tip?",
  faqTipsAnswer:
    "When your order is refunded, the tip you paid comes back to you too, and the app can't take it back out of the driver's pay (§ 22599.2(b)). If your order was only partly fulfilled, the app must also let you lower a tip you added before the delivery (§ 22599.2(d)).",
  faqFullRefundQuestion:
    "Why do you ask for a full refund when only one item was wrong or missing?",
  faqFullRefundAnswer:
    "Because the order that arrived isn't the order you paid for, and we read that as the wrong order, which the law says deserves a full refund (§ 22599.2(a)). That reading is argued, not settled, so we also state the floor you're owed no matter what: you can't be charged for items you didn't get (§ 22599.2(d)).",
  faqFullRefundLink: "Why we ask for a full refund",
  faqAgQuestion: "What does the Attorney General do with my complaint?",
  faqAgAnswer:
    "The AG's consumer office reads complaints and uses them to decide which companies to investigate. It may send your complaint to the company. It doesn't act as your lawyer and it doesn't settle your individual dispute. That's why the kit helps you demand your refund first, then report.",
  faqAccountQuestion: "Can the app close my account over this?",
  faqAccountAnswer:
    "It can. The law lets a delivery app remove a customer it reasonably suspects of fraud (§ 22599.2(f)). Asking for a refund the law owes you isn't fraud. A truthful complaint, backed by your receipts, photos and the app's own messages, is the best protection.",
  faqLegalQuestion: "Is this legal advice?",
  faqLegalAnswer:
    "No. This site explains the law and helps you write a complaint. It isn't a law firm, and it isn't affiliated with the State of California or any delivery company. For advice on your own situation, talk to a lawyer or a legal aid office.",
  faqEnglishQuestion: "Why is my complaint in English?",
  faqEnglishAnswer:
    "You can read this site in seven languages. The complaint you send is still in English by default, because the AG's online form is in English. Your kit shows the English next to your language. A toggle can switch the message to your language when you write to the delivery app.",

  // Privacy.
  privacyTitle: "Privacy",
  privacyHeading: "Privacy",
  privacyMetaDescription:
    "Nothing you type leaves your device. No accounts, no database, no analytics.",
  privacyP1: "Nothing you type leaves your device.",
  privacyP2:
    'This site has no accounts and no database. It saves a draft of your complaint in your browser so you can come back to it. Your contact details are saved only if you ask to remember them. "Clear my data" deletes everything, including your language choice.',
  privacyP3:
    "When you open the Attorney General's form or a delivery app's support page, you send your complaint yourself. Nobody here sees it.",

  // Platform pages. {name} is the platform's own name from src/data/platforms.ts.
  platformMetaDescription:
    "How to demand a {name} refund to your original payment method, reach a real person, and file an AB 578 complaint with the California Attorney General.",
  platformHeading: "Get your {name} money back",
  platformIntro:
    "When a {name} order goes wrong, you can demand money back, not just app credit. We write the demand for you. Here's what {name} documents, and how to reach a person if the app stonewalls you.",
  platformRefundHeading: "How to demand a refund to your card",
  platformRefundLaw:
    "Ask for the refund on your original payment method, not app credit. Alongside any other option, the app must give you a way to request that (§ 22599.2(e)).",
  platformRefundPathLabel: "{name}'s documented refund path",
  platformRefundHelpLink: "Open {name}'s refund help page",
  platformHumanHeading: "How to reach a real person",
  platformHumanLaw:
    "If the automated help can't fix your problem, the app must let you promptly connect with a person (§ 22599.1(f)).",
  platformHumanLabel: "Reaching a human at {name}",
  platformSupportLink: "Open {name} support",
  platformFileIntro:
    "Want it written for you? The kit turns what went wrong into a refund demand for {name} and a complaint to the California Attorney General.",
  platformFileLegal:
    "Not legal advice. Not affiliated with the State of California or any delivery company.",

  // 404.
  notFoundTitle: "Page not found",
  notFoundHeading: "Page not found",
  notFoundBody: "That page does not exist.",
  notFoundHome: "Go to the home page",

  // Footer.
  footerNavLabel: "Site menu",
  footerAbout: "About",
  footerFaq: "FAQ",
  footerPrivacy: "Privacy",
  footerDisclaimer:
    "Not legal advice. Not affiliated with the State of California or any delivery company.",
  footerTranslatedNote:
    "Translated automatically. The English version is the official one.",
} as const;

/** All keys a catalog may define. Values are plain strings in every locale. */
export type Messages = { readonly [K in keyof typeof source]: string };

/** A message key, shared by every locale catalog. */
export type MessageKey = keyof Messages;

export const en: Messages = source;
