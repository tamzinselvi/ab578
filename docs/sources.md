# Sources and open questions

Every URL below was loaded and read on **2026-11-14** unless noted. leginfo.legislature.ca.gov returns 403 to plain HTTP fetches, so those pages were read in a real (headless Chromium) browser.

## The statute (Business and Professions Code, Division 8, Chapter 22.4, Food Delivery Platforms)

Chapter display page:

- https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?lawCode=BPC&division=8.&title=&part=&chapter=22.4.&article= (whole chapter, §§ 22598 to 22599.6)

Per-section pages used as `sourceUrl` in `src/data/law.ts`:

- § 22598 (definitions): https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=22598
- § 22599 (platform and restaurant agreements): https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=22599
- § 22599.1 (prices, tips, disclosures, human support): https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=22599.1
- § 22599.2 (refunds; added by AB 578): https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=22599.2

Enactment credits as printed on those pages: §§ 22598 and 22599 amended by Stats. 2024, Ch. 898, Sec. 1 and 2 (SB 1490), effective January 1, 2025; § 22599.1 amended by Stats. 2025, Ch. 341, Sec. 1 (AB 578), effective January 1, 2026; § 22599.2 added by Stats. 2025, Ch. 341, Sec. 2 (AB 578), effective January 1, 2026. The chapter's remaining sections (22598.5 does not exist in the chapter display; 22599.3 driver disclosures and 22599.6 severability) were read in full on the chapter page; the chapter contains no enforcement section and no private right of action (see open question 2).

Bill context (secondary, read 2026-11-14): LegiScan chaptered text https://legiscan.com/CA/text/AB578/id/3272256 and leginfo bill page https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB578.

## Other statutes consulted (verbatim text read on leginfo, 2026-11-14)

- Health and Safety Code § 113789 ("food facility" definition): https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=HSC&sectionNum=113789
- Code of Civil Procedure § 1859 (particular provision controls the general): https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CCP&sectionNum=1859
- Business and Professions Code § 17200 (unfair competition defined): https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=17200
- Business and Professions Code § 17203 (injunctions and restitution to any person in interest): https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=17203
- Business and Professions Code § 17204 (who may prosecute UCL actions): https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=17204
- Business and Professions Code § 17206 (civil penalties; who may recover): https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=17206
- Business and Professions Code § 17002 (Unfair Practices Act express liberal-construction clause): https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=17002

## California Attorney General complaint form

- Online form (field order, required flags, upload limits, prefill test all from this page): https://oag.ca.gov/contact/consumer-complaint-against-business-or-company
  - Single-page Drupal webform, form id `webform-client-form-572546`, no login, `details[page_count]` = 1.
  - reCAPTCHA present (`captcha_sid`, `captcha_token`, `captcha_response`, `g-recaptcha-response` fields), so the app cannot submit on anyone's behalf; field-by-field copy is the right hand-off.
  - URL query prefill tested and does NOT work. Tested `?submitted[enter_your_information][first_name]=PrefillTest1&first_name=PrefillTest2`; both fields rendered empty.
  - Upload limits, both statements verbatim from the page: "Files must be less than 4 MB. Allowed file types: pdf, doc, docx, xls, xlsx. Do not include any personal or confidential information, such as your social security number or bank account number. If you have additional documentation, list and detail them in your complaint." and, per upload widget, "Files must be less than 50 MB. Allowed file types: pdf doc docx xls xlsx." The app designs for 4 MB.
  - Conditional-field note: the hidden sub-block for representatives ("Are you submitting this complaint on behalf of someone else?" = Yes; relationship options Attorney, Advocate, Family member or friend, Housing or credit counselor, Other authorized representative; plus the consumer's identity and address fields) stays hidden even after clicking Yes in a clean session, and its question text is not present in the served DOM, so `agFormFields` omits it. A customer filing their own complaint answers No and never sees it.
  - The complaint-description field carries on-form guidance: "Briefly describe your complaint, including: The product or service at issue and what the issue is; The date(s) of the transaction or issue; The names of the sales representative or other company representative you dealt with; If the product or service was not as advertised, what did the advertisement say, and when and where did you see it; If you signed a contract, when did you sign it."
- Mail-in PDFs, all linked from the form page:
  - English: https://oag.ca.gov/sites/all/files/agweb/pdfs/contact/business_corpform.pdf
  - Spanish: https://oag.ca.gov/sites/all/files/pdfs/contact/business_corpform_sp.pdf
  - Chinese: https://oag.ca.gov/sites/all/files/pdfs/contact/business_corpform_chin.pdf
  - Vietnamese: https://oag.ca.gov/sites/all/files/pdfs/contact/business_corpform_viet.pdf
- Public Inquiry Unit, phone (800) 952-5225, mail "Attn: Public Inquiry Unit": https://oag.ca.gov/contact
- Information Collection, Use and Access notice (linked from the form): https://oag.ca.gov/sites/all/files/agweb/pdfs/contact/business_info_cua.pdf

### Filling the AG form (read 2026-11-15)

- The form is a Drupal 7 Webform (`webform-client-form-572546`). It ignores URL query parameters, and browsers do not let one site fill another site's form, so the kit cannot open it pre-filled.
- On computers the kit offers a bookmark (a `javascript:` link) instead. The bookmark holds no personal data. The person copies their answers from the kit, clicks the bookmark on the AG page, and pastes. The bookmark sets each field by its exact `name` (see `agFormInputs` in `src/data/destinations.ts`), applying radios and checkboxes first so the form's conditional sections open. It never submits, never touches the upload, affirmation or authorization questions, and never writes HTML.
- Field limits read from the live form: address lines and company address 50 characters, the reasonable-resolution field 128, area code 3, phone 7, ZIP 5, ZIP+4 4; the amount in dispute is a number field. The kit's answers are fitted to these limits.
- Verified on the live form on 2026-11-15 with test data (28 answers filled, conditional contact-history fields opened, nothing submitted). `npm run check:ag-form` (run weekly by `.github/workflows/ag-form-check.yml`) fails if any mapped field name disappears.

## Other destinations

- CDAA roster of California prosecutors (all 58 county district attorneys plus several city attorneys): https://www.cdaa.org/CDAAweb/CDAAweb/About-Us/California-District-Attorney-Offices.aspx. Note: `cdaa.org/da-roster/` returns 404; the `.aspx` page above is the live roster ("California Prosecutors").
- FTC ReportFraud: https://reportfraud.ftc.gov/ ("Protect your community by reporting fraud, scams, and bad business practices").
- California Courts small claims self-help:
  - Overview: https://selfhelp.courts.ca.gov/small-claims (individual limit $12,500; business limit $6,250)
  - Ask-first rule, confirmed: https://selfhelp.courts.ca.gov/small-claims/before-you-start ("the first step is to you ask the person you're suing for the money or what you want. Once you've asked them, you can file a small claims case.") and https://selfhelp.courts.ca.gov/small-claims/ask-for-money ("The court wants you to ask the other side for the money you think they owe you before you start a small claims case." and "This is another step you must take before filing a court case." No need to ask when a restraining order makes contact dangerous.)
  - Courts' own demand letter tool: https://selfhelp.courts.ca.gov/form/demand-letter

## Platforms (all official pages, read 2026-11-14)

### DoorDash (including Caviar)

- Consumer Terms and Conditions, effective October 16, 2026 (legal entity, addresses, phones, small-claims carve-out Sections 14(a)(i) and 21(a), notice clause, Caviar language, Civil Code 1789.3 complaint-unit notice): https://help.doordash.com/en-us/legal/article/cx-terms-and-conditions. Note: legal.doordash.com does not resolve and doordash.com/us/en/terms/ returns 404; this help-center article is the live canonical TOS.
- Refund path article (mobile and desktop steps, plus the Caviar path): https://help.doordash.com/en-us/consumers/article/my-order-was-missing-an-item-incorrect-order
- Support landing (24/7 chat and call, phone 855-431-0459): https://help.doordash.com/en-us/consumers; chat entry https://doordash.com/orders/help?chat=true; guided help https://www.doordash.com/orders/help/
- Caviar: DoorDash's TOS and help articles cite www.trycaviar.com as the Caviar domain. caviar.com is an unrelated Shopify storefront and must not be linked as Caviar (checked 2026-11-14).
- No DoorDash California or AB 578 refund page found (web search of help.doordash.com for "AB 578" and California refund terms; California-specific help exists only for Dashers on Prop 22). Not proof of absence behind login or in-app surfaces.
- Also noted from the TOS, for the record: US orders may contract with "DoorDash, Inc. and/or its subsidiaries and affiliated companies, including DoorDash G&C, LLC (depending on the Merchant)"; the TOS refund policy outside California law says charges for delivered orders "are final and non-refundable" with discretionary credits, which is why every demand cites § 22599.2; TOS Section 25(e) points California consumers to the Department of Consumer Affairs Complaint Assistance Unit, (800) 952-5210.

### Uber Eats (including Postmates)

- US Terms of Use, last modified 11/4/2026 (counterparty Uber Technologies, Inc.; Legal Department notice address 1725 3rd Street, San Francisco, CA 94158; Section 2(b) small-claims exception; Section 7 Refunds "Help" tab / 30 days): https://www.uber.com/us/en/legal/general-terms-of-use/
- Help landing (no phone number for Eats): https://help.uber.com/ubereats (redirects to /restaurants)
- How to contact support (in-app HELP, Diamond "Call us" line): https://help.uber.com/ubereats/restaurants/article/how-to-contact-support?nodeId=7ad3ef19-012f-43e6-a711-113935b0cb7b
- Wrong or missing items: https://help.uber.com/ubereats/restaurants/article/wrong-or-missing-items?nodeId=c2248362-09f4-45f4-98a8-d0b6816c3a61
- My order is wrong (48-hour window): https://help.uber.com/ubereats/restaurants/article/my-order-is-wrong?nodeId=a1ed8786-fc09-4622-a9d1-ab9d9bf292d0
- Postmates ownership, in Uber's words: https://help.uber.com/driving-and-delivering/article/postmates-acquisition-faqs?nodeId=120c566e-7b6f-4c07-85bf-96f031c03122 ("Postmates has been acquired by Uber"); Postmates help lives at https://help.uber.com/postmates and postmates.com itself runs Uber's Eats web app (standalone postmates.com/terms, /legal/terms and /help all return 404).
- No Uber Eats California or AB 578 refund page found on help.uber.com (searches including the exact string "AB 578"). The only California-specific help pages cover driver Prop 22 benefits, the July 1, 2024 delivery fee display law, SB 1490 merchant fee disclosure, and CCPA privacy (the privacy page renders as "For United States users" and lists 1-800-276-3392 for US privacy requests only).
- Unconfirmed: whether a distinct Uber Portier entity contracts for any US Eats order; the current US Terms of Use name only Uber Technologies, Inc.

### Grubhub (including Seamless)

- Terms of Use, effective December 17, 2024 (entity "Grubhub Holdings Inc. and its subsidiaries and affiliates"; small-claims carve-out in Dispute Resolution section II; dispute notices "Grubhub, Attn: Dispute Resolutions, 222 W Merchandise Mart Plaza, Suite 800, Chicago, IL 60654" or disputeresolution@grubhub.com; Customer Care phone 1-877-585-7878): https://www.grubhub.com/legal/terms-of-use; identical Seamless copy at https://www.seamless.com/legal/terms-of-use
- Privacy Policy, effective January 5, 2026 (Grubhub Holdings Inc., 5 Bryant Park, 15th Floor, New York, NY 10018 for privacy inquiries; Wonder Group and Blue Apron logos in the footer): https://www.grubhub.com/legal/privacy-policy
- Help landing: https://www.grubhub.com/help/contact-us; refund help category https://www.grubhub.com/help/contact-us/billing-payments-and-refunds; 24/7 chat via Need more help https://www.grubhub.com/help/contact-us/need-more-help/7hGY8LzzVt6ljJ9rJCcDes
- Documented refund path ("sign in to your Grubhub account and select the order you need help with"): https://www.grubhub.com/answers/how-do-i-get-a-refund-from-grubhub; refund timing (up to 5 business days): https://www.grubhub.com/help/contact-us/havent-received-my-refund/3QSPM50VhSl77uxJ1dRhTr
- No Grubhub California or AB 578 refund page found. The help center's keyword search is a bot-gated JavaScript app, so the article corpus beyond the server-rendered categories could not be fully enumerated; absence is not proven.
- The former New York HQ address (1065 First Avenue) no longer appears in current Grubhub legal pages. Wonder ownership is signaled only by on-domain privacy-policy logos and holding-company language; not independently verified.

## Legal research for the open questions (secondary sources, read 2026-11-14)

- California's liberal construction of remedial consumer protection statutes:
  - Statutory example inside the same code: Bus. & Prof. Code § 17002 ("This chapter shall be liberally construed that its beneficial purposes may be subserved"), verbatim from leginfo (Unfair Practices Act; note it sits in Chapter 4, not the UCL chapter).
  - UCL case law describing the statute's sweeping, remedial breadth: Bank of the West v. Superior Court (1992) 2 Cal.4th 1254 (https://law.justia.com/cases/california/supreme-court/4th/2/1254.html); Cel-Tech Communications, Inc. v. Los Angeles Cellular Telephone Co. (1999) 20 Cal.4th 163 (https://www.courtlistener.com/opinion/1301891/cel-tech-communications-v-la-cellular/); Kasky v. Nike, Inc. (2002) 27 Cal.4th 939 (https://law.justia.com/cases/california/supreme-court/4th/27/939.html); earlier lineage in Barquis v. Merchants Collection Assn. (1972) 7 Cal.3d 94 and People v. McKale (1979) 25 Cal.3d 626.
  - Pinned primary authority for the About page's general claim (added 2026-11-14 by the content-pages task, read on leginfo in a real browser): Civil Code § 1760, the Consumers Legal Remedies Act's construction clause, reads verbatim "This title shall be liberally construed and applied to promote its underlying purposes, which are to protect consumers against unfair and deceptive business practices and to provide efficient and economical procedures to secure such protection." (https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1760; chapter heading "Construction and Definitions", added by Stats. 1970, Ch. 1550.) This is the strongest on-point statement that California consumer protection law is read liberally in the consumer's favor; it governs the CLRA, not Chapter 22.4.
- AG activity touching food delivery: AG Bonta's May 2026 comment letter to the FTC on food delivery fees praises California's consumer protections but does not interpret § 22599.2 (https://oag.ca.gov/news/press-releases/attorney-general-applauds-ftc%E2%80%99s-rulemaking-unfair-food-delivery-fees-harming).
- News coverage of AB 578 in effect (consumer-experience level, no enforcement reporting): Desert Sun explainer, 2026-06-05 (https://www.desertsun.com/story/news/nation/california/2026/06/05/ab-578-california-food-delivery-refund-law-explained/90423829007/).

## Open questions for the optional attorney review

1. **Grocery coverage: does Health and Safety Code § 113789 "food facility" include grocery stores (Instacart coverage)?** Partially answered from the primary text. § 113789(a) defines food facility as "an operation that stores, prepares, packages, serves, vends, or otherwise provides food for human consumption at the retail level, including, but not limited to" a list of examples; (b) adds more; (c) excludes a closed list (private homes, churches at limited events, commercial food processing establishments as defined in § 111955, producer outlets selling only their own whole produce or shell eggs, and others). A grocery store sells food at the retail level and appears nowhere in the (c) exclusions, so the plain text covers it, which supports treating a grocery-delivery intermediary as a "food delivery platform" under § 22598(b) and (c). Still open: no AG guidance or court decision applies § 113789 to Chapter 22.4, and Instacart-style shopping services may argue they do not "submit orders to a participating food facility" the way the definition contemplates. Keep grocery platforms out of the app until review; this matches the design's guardrail.
2. **Enforcement route and the absence of a private right of action.** Confirmed from the primary text: Chapter 22.4 (§§ 22598 to 22599.6, read in full on the chapter page) contains no enforcement section, no damages provision, and no express private right of action; its only remedy-like language is severability (§ 22599.6). The general-law route is the Unfair Competition Law: § 17200 (violating Chapter 22.4 is an "unlawful" practice), § 17204 (injunction actions by the AG, district attorneys, county counsel and qualifying city attorneys, exclusively), § 17206 (civil penalties up to $2,500 per violation, recovered by those officials), and § 17203 (courts may restore money to "any person in interest", the hook a private plaintiff with Prop 64 standing uses, and the basis for treating small claims as the practical individual route). This is general California law applied to a new chapter; the attorney review should confirm no one has located a narrower reading since January 2026.
3. **Any AG guidance, enforcement action or court decision interpreting § 22599.2 since January 2026.** None found as of 2026-11-14. Searches covered oag.ca.gov (press releases, consumer alerts), general web and legal-database searches for "22599.2" and "AB 578" with enforcement, guidance, and court-decision terms, and news coverage through mid-2026. The AG's May 2026 FTC comment letter discusses California food delivery law without mentioning § 22599.2. Practical effect: the app's readings of "the wrong order" and unusable items (see `readings` in `src/data/law.ts`) have no interpretive authority either way, which is why they are labeled as readings with floors. Re-run this search before launch.
4. **California's liberal-construction rule for remedial consumer statutes.** The About page's sentence "California courts read consumer protection laws broadly, in favor of the consumer" now has a pinned primary authority for the general proposition: Civil Code § 1760 (see the pinned bullet above), an express legislative instruction to construe a consumer protection title liberally to protect consumers, which courts apply; Bus. & Prof. Code § 17002 and the UCL cases (Bank of the West, Cel-Tech, Barquis) reinforce the same pattern. What remains open is only the application to this statute: Chapter 22.4 itself has no liberal-construction clause, and no located opinion applies the canon to § 22599.2 specifically. Review should pick the controlling formulation (general remedial-statute canon versus UCL case law reached through the § 17200 "unlawful" prong) and cite it precisely. The CCP § 1859 specific-over-general canon, which cuts against the missing-items reading, is verbatim in `src/data/law.ts` counter-arguments.
