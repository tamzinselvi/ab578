/**
 * Complaint destinations: where the app sends people, with verified URLs.
 *
 * Everything here was read from the live destination on 2026-11-14. The AG
 * complaint form was inspected field by field in a real browser (form id
 * webform-client-form-572546, a single-page Drupal webform, details[page_count]
 * = 1). Re-check the field list in each release's QA pass, since the AG can
 * change it without notice.
 *
 * This module must not import from outside src/data/.
 */

import type { Destination, AgFormField } from "./types";

const VER = "2026-11-14";

const AG_FORM_URL =
  "https://oag.ca.gov/contact/consumer-complaint-against-business-or-company";

export const destinations: readonly Destination[] = [
  {
    id: "ca-ag-complaint-form",
    name: "California Attorney General: consumer complaint against a business or company (online form)",
    url: AG_FORM_URL,
    role: "state-complaint",
    notes:
      "Single page, no login, English only. Includes a reCAPTCHA (captcha_sid, captcha_token and g-recaptcha-response fields are present, so automated or pasted submission is not possible). URL query prefill does NOT work: loading the form with ?submitted[enter_your_information][first_name]=... and with ?first_name=... left the fields empty when tested on the verified date. Uploads accept up to 5 files (pdf, doc, docx, xls, xlsx), each with a description. The page states two different size limits; see agFormFacts.uploadLimitStatements. The form asks people not to include social security numbers or bank account numbers.",
    verifiedOn: VER,
  },
  {
    id: "ca-ag-complaint-form-pdf-en",
    name: "California AG consumer complaint form (print and mail, English)",
    url: "https://oag.ca.gov/sites/all/files/agweb/pdfs/contact/business_corpform.pdf",
    role: "mail-in-form",
    notes:
      'Linked from the online form page as "If you prefer to contact us by regular mail, download this form, then print, fill in, and mail."',
    verifiedOn: VER,
  },
  {
    id: "ca-ag-complaint-form-pdf-es",
    name: "California AG consumer complaint form (print and mail, Spanish)",
    url: "https://oag.ca.gov/sites/all/files/pdfs/contact/business_corpform_sp.pdf",
    role: "mail-in-form",
    notes:
      'Spanish mail-in PDF, linked from the online form page ("En español").',
    verifiedOn: VER,
  },
  {
    id: "ca-ag-complaint-form-pdf-zh",
    name: "California AG consumer complaint form (print and mail, Chinese)",
    url: "https://oag.ca.gov/sites/all/files/pdfs/contact/business_corpform_chin.pdf",
    role: "mail-in-form",
    notes: 'Chinese mail-in PDF, linked from the online form page ("中文").',
    verifiedOn: VER,
  },
  {
    id: "ca-ag-complaint-form-pdf-vi",
    name: "California AG consumer complaint form (print and mail, Vietnamese)",
    url: "https://oag.ca.gov/sites/all/files/pdfs/contact/business_corpform_viet.pdf",
    role: "mail-in-form",
    notes:
      'Vietnamese mail-in PDF, linked from the online form page ("Tiếng Việt").',
    verifiedOn: VER,
  },
  {
    id: "ca-ag-public-inquiry-unit",
    name: "California Attorney General, Public Inquiry Unit",
    url: "https://oag.ca.gov/contact",
    role: "state-complaint-phone",
    notes:
      'Phone (800) 952-5225; mail is addressed "Attn: Public Inquiry Unit". Can take complaints about a business and answer questions; per the complaint page, the AG cannot provide legal advice or act as a personal lawyer.',
    verifiedOn: VER,
  },
  {
    id: "cdaa-da-roster",
    name: "California District Attorneys Association: California prosecutors roster",
    url: "https://www.cdaa.org/CDAAweb/CDAAweb/About-Us/California-District-Attorney-Offices.aspx",
    role: "local-enforcement",
    notes:
      'Roster of all 58 county district attorneys (plus several city attorneys) with links to each office. District attorneys can enforce the Unfair Competition Law (Business and Professions Code sections 17204 and 17206), which is the enforcement route for Business and Professions Code Chapter 22.4. Note: cdaa.org/da-roster returns 404; the .aspx URL above is the live roster page ("California Prosecutors").',
    verifiedOn: VER,
  },
  {
    id: "ftc-reportfraud",
    name: "FTC ReportFraud",
    url: "https://reportfraud.ftc.gov/",
    role: "federal-complaint",
    notes:
      'Federal complaint site ("Protect your community by reporting fraud, scams, and bad business practices"). Reports go into the federal database shared with law enforcement; the FTC does not resolve individual complaints.',
    verifiedOn: VER,
  },
  {
    id: "ca-courts-small-claims",
    name: "California Courts: the small claims process (self-help guide)",
    url: "https://selfhelp.courts.ca.gov/small-claims",
    role: "small-claims",
    notes:
      'Official self-help guide. Confirms the ask-first rule: "The court wants you to ask the other side for the money you think they owe you before you start a small claims case." (selfhelp.courts.ca.gov/small-claims/ask-for-money, "another step you must take before filing a court case"; no need to ask when a restraining order makes contact dangerous). Limits: an individual can sue for up to $12,500, a business up to $6,250. The courts also publish a demand letter tool at selfhelp.courts.ca.gov/form/demand-letter.',
    verifiedOn: VER,
  },
] as const;

/**
 * Facts about the AG online form that the kit needs beyond the field list.
 * uploadLimitStatements are verbatim from the form page; the page shows the
 * 4 MB instruction near the upload section and a 50 MB line inside each
 * upload widget. The app designs for the smaller limit.
 */
export const agFormFacts = {
  formUrl: AG_FORM_URL,
  singlePage: true,
  loginRequired: false,
  recaptchaPresent: true,
  queryPrefillWorks: false,
  uploadMaxFiles: 5,
  uploadAllowedTypes: ["pdf", "doc", "docx", "xls", "xlsx"] as const,
  uploadLimitStatements: [
    "Files must be less than 4 MB. Allowed file types: pdf, doc, docx, xls, xlsx. Do not include any personal or confidential information, such as your social security number or bank account number. If you have additional documentation, list and detail them in your complaint.",
    "Files must be less than 50 MB. Allowed file types: pdf doc docx xls xlsx.",
  ] as const,
  designUploadLimitMb: 4,
  verifiedOn: VER,
} as const;

/**
 * The AG complaint form's fields in the form's own order, as read from the
 * live page on 2026-11-14. Labels are the text shown on the form; the
 * asterisk that marks required fields is carried by `required` instead.
 *
 * Conditional fields are included in their DOM position: the contact-history
 * fields (order 30 to 38 and 40 to 43) appear after answering Yes to the
 * preceding question, and each upload pair appears after answering Yes to its
 * "Do you want to upload supporting documents?" question. The hidden
 * representative sub-block that opens when "Are you submitting this complaint
 * on behalf of someone else?" is Yes (relationship options Attorney, Advocate,
 * Family member or friend, Housing or credit counselor, Other authorized
 * representative, plus the consumer's identity fields) is not listed because
 * its question text never renders for a customer filing their own complaint;
 * see docs/sources.md.
 *
 * Some labels intentionally repeat (Zip Code, Area Code, Phone Number, Email
 * Address, (+4)) because the form uses the same labels in the consumer block
 * and the company block; position in this list tells them apart.
 */
export const agFormFields: readonly AgFormField[] = [
  { order: 1, label: "First Name", required: true, type: "text" },
  { order: 2, label: "Middle Initial", required: false, type: "text" },
  { order: 3, label: "Last Name", required: true, type: "text" },
  { order: 4, label: "Address Line", required: true, type: "text" },
  { order: 5, label: "Address Line 2", required: false, type: "text" },
  { order: 6, label: "City", required: true, type: "text" },
  { order: 7, label: "State", required: true, type: "select" },
  { order: 8, label: "Zip Code", required: true, type: "text" },
  { order: 9, label: "(+4)", required: false, type: "text" },
  { order: 10, label: "Email Address", required: false, type: "email" },
  { order: 11, label: "Confirm Email Address", required: false, type: "email" },
  { order: 12, label: "Area Code", required: false, type: "text" },
  { order: 13, label: "Phone Number", required: false, type: "text" },
  {
    order: 14,
    label: "Are you submitting this complaint on behalf of someone else?",
    required: true,
    type: "radio",
  },
  { order: 15, label: "Company Name", required: true, type: "text" },
  { order: 16, label: "Company Address", required: false, type: "text" },
  { order: 17, label: "Company Address 2", required: false, type: "text" },
  { order: 18, label: "Company City", required: false, type: "text" },
  { order: 19, label: "Company State", required: false, type: "select" },
  { order: 20, label: "Zip Code", required: false, type: "text" },
  { order: 21, label: "(+4)", required: false, type: "text" },
  { order: 22, label: "Area Code", required: false, type: "text" },
  { order: 23, label: "Phone Number", required: false, type: "text" },
  { order: 24, label: "Email Address", required: false, type: "email" },
  { order: 25, label: "Website", required: false, type: "text" },
  { order: 26, label: "Amount in dispute", required: false, type: "text" },
  {
    order: 27,
    label: "Complaint description",
    required: true,
    type: "textarea",
  },
  {
    order: 28,
    label:
      "Briefly state what you would consider a reasonable resolution from the company",
    required: true,
    type: "text",
  },
  {
    order: 29,
    label: "Have you contacted the company about this issue?",
    required: false,
    type: "radio",
  },
  { order: 30, label: "Date of last contact", required: false, type: "text" },
  { order: 31, label: "E-mail", required: false, type: "checkbox" },
  { order: 32, label: "In-person", required: false, type: "checkbox" },
  { order: 33, label: "Phone", required: false, type: "checkbox" },
  { order: 34, label: "Postal mail", required: false, type: "checkbox" },
  { order: 35, label: "Other...", required: false, type: "checkbox" },
  {
    order: 36,
    label: "Communication means Other...",
    required: false,
    type: "text",
  },
  {
    order: 37,
    label: "Person communicated with",
    required: false,
    type: "text",
  },
  {
    order: 38,
    label: "Results of communication",
    required: false,
    type: "text",
  },
  {
    order: 39,
    label:
      "Have you previously contacted our Office or other agencies about this issue?",
    required: false,
    type: "radio",
  },
  { order: 40, label: "Agencies contacted", required: false, type: "text" },
  { order: 41, label: "Date agency contacted", required: false, type: "text" },
  {
    order: 42,
    label: "Do any of the following apply to you?",
    required: false,
    type: "radio",
  },
  {
    order: 43,
    label: "State what has happened",
    required: false,
    type: "textarea",
  },
  {
    order: 44,
    label: "Do you want to upload supporting documents?",
    required: true,
    type: "radio",
  },
  {
    order: 45,
    label: "Upload supporting documents",
    required: true,
    type: "file",
  },
  { order: 46, label: "Description of document", required: true, type: "text" },
  {
    order: 47,
    label: "Upload second supporting document",
    required: true,
    type: "file",
  },
  {
    order: 48,
    label: "Description of second document",
    required: true,
    type: "text",
  },
  {
    order: 49,
    label: "Upload third supporting document",
    required: true,
    type: "file",
  },
  {
    order: 50,
    label: "Description of third document",
    required: true,
    type: "text",
  },
  {
    order: 51,
    label: "Upload fourth supporting document",
    required: true,
    type: "file",
  },
  {
    order: 52,
    label: "Description of fourth document",
    required: true,
    type: "text",
  },
  {
    order: 53,
    label: "Upload fifth supporting document",
    required: true,
    type: "file",
  },
  {
    order: 54,
    label: "Description of fifth document",
    required: true,
    type: "text",
  },
  {
    order: 55,
    label: "Are you 65 years or older?",
    required: false,
    type: "radio",
  },
  {
    order: 56,
    label: "Do you have a disability?",
    required: false,
    type: "radio",
  },
  {
    order: 57,
    label: "What is your annual household income?",
    required: false,
    type: "select",
  },
  {
    order: 58,
    label:
      "Are you a current member of the U.S. Armed Forces or the immediate family of a service member?",
    required: false,
    type: "radio",
  },
  {
    order: 59,
    label: "Are you a former member of the U.S. Armed Forces?",
    required: false,
    type: "radio",
  },
  {
    order: 60,
    label: "Do you have limited English ability?",
    required: false,
    type: "radio",
  },
  {
    order: 61,
    label: "I affirm that the foregoing information is true and accurate",
    required: true,
    type: "radio",
  },
  {
    order: 62,
    label:
      "By filing this complaint, I authorize you to send this complaint to the party named, and for that party to communicate, including disclosure of non-public personal information, with the Attorney General\u2019s office concerning this complaint.",
    required: true,
    type: "radio",
  },
] as const;
