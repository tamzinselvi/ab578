/**
 * The three delivery platforms the app ships with: support channels, refund
 * paths, legal entities and the small-claims position of each company's
 * current consumer terms.
 *
 * Everything below was verified against official pages (the platform's own
 * help center, terms, or privacy policy) on 2026-11-14. Quoted text inside
 * notes is copied exactly from those pages, including their apostrophe
 * style. None of the three platforms published a California or AB 578
 * refund page as of that date, so caRefundPageUrl is absent everywhere; the
 * searches that established this are listed in docs/sources.md.
 *
 * This module must not import from outside src/data/.
 */

import type { Platform } from './types';

const VER = '2026-11-14';

export const platforms: readonly Platform[] = [
  {
    id: 'doordash',
    name: 'DoorDash',
    subsidiaries: ['Caviar'],
    legalName: 'DoorDash, Inc.',
    mailingAddress: 'DoorDash, Inc., 303 2nd Street, Suite 800, San Francisco, CA 94107',
    phone: '855-431-0459',
    website: 'https://www.doordash.com',
    supportUrl: 'https://help.doordash.com/en-us/consumers',
    refundHelpUrl:
      'https://help.doordash.com/en-us/consumers/article/my-order-was-missing-an-item-incorrect-order',
    inAppRefundPath:
      'Mobile app: open Orders, select the order, tap Help, then under Order Issues choose Missing or incorrect items and follow the prompts. Desktop: open the menu (three lines, top left), choose Orders, select the order, select Help on the right, then under Order Issues choose Missing items or Items made incorrectly. Caviar orders: sign in at www.trycaviar.com or in the Caviar app, open Orders, select the order, select Help, choose the issue(s) under Order Issues and submit.',
    humanContact:
      'Chat and phone support 24/7 (DoorDash: "Our chat and call support are available 24/7"). Chat starts at doordash.com/orders/help?chat=true; guided help at doordash.com/orders/help. Phone: 855-431-0459.',
    smallClaimsAllowed: true,
    smallClaimsNote:
      'Yes. Consumer Terms and Conditions effective October 16, 2026, Section 14(a)(i): "You may assert claims in small claims court or tribunal if your claims qualify, so long as the matter remains in such court and advances only on an individual (non-class, non-representative) basis." (https://help.doordash.com/en-us/legal/article/cx-terms-and-conditions). Arbitration-bound disputes first require an informal resolution conference (Informal.Resolution@doordash.com). Section 21(a) sets venue for US consumers permitted to litigate in San Francisco County for California residents. Mailing address and phone are from Terms Section 26.',
    verifiedOn: VER,
  },
  {
    id: 'ubereats',
    name: 'Uber Eats',
    subsidiaries: ['Postmates'],
    legalName: 'Uber Technologies, Inc.',
    mailingAddress: 'Uber Technologies, Inc., Attn: Legal Department, 1725 3rd Street, San Francisco, CA 94158',
    website: 'https://www.ubereats.com',
    supportUrl: 'https://help.uber.com/ubereats',
    refundHelpUrl:
      'https://help.uber.com/ubereats/restaurants/article/wrong-or-missing-items?nodeId=c2248362-09f4-45f4-98a8-d0b6816c3a61',
    inAppRefundPath:
      'In the Uber Eats app or website, open the order in order history and use its help flow: select the order, report what was wrong or missing, describe the issue and add photos. Uber\u2019s Terms of Use (Section 7, Refunds) direct refund requests to the "Help" tab in your Account within the timeframe specified in the app, otherwise within 30 days of the charge; help articles recommend reporting within 48 hours. Postmates orders are handled in the same Uber systems (help.uber.com/postmates).',
    humanContact:
      'No published phone number for Uber Eats order support: "While we don\u2019t offer a customer service phone number for Uber Eats, you can log in to your account to get personalized support" (help.uber.com/ubereats). Support is in-app and available anytime by tapping HELP; Diamond-tier customers get an in-app Call us line. 1-800-276-3392 is published for US privacy requests only, not order problems.',
    smallClaimsAllowed: true,
    smallClaimsNote:
      'Yes. US Terms of Use (last modified 11/4/2026), Section 2(b) Exceptions to Arbitration: the arbitration agreement "shall not require arbitration of the following claims: (i) individual claims brought in small claims court so long as the matter remains in such court and advances only on an individual basis" and "Such claims may be brought and litigated in a court of competent jurisdiction by you on an individual basis only." (https://www.uber.com/us/en/legal/general-terms-of-use/). Starting arbitration first requires written notice of an informal dispute resolution conference to the Legal Department address above.',
    verifiedOn: VER,
  },
  {
    id: 'grubhub',
    name: 'Grubhub',
    subsidiaries: ['Seamless'],
    legalName: 'Grubhub Holdings Inc.',
    mailingAddress: 'Grubhub, Attn: Dispute Resolutions, 222 W Merchandise Mart Plaza, Suite 800, Chicago, IL 60654',
    phone: '1-877-585-7878',
    website: 'https://www.grubhub.com',
    supportUrl: 'https://www.grubhub.com/help/contact-us',
    refundHelpUrl: 'https://www.grubhub.com/answers/how-do-i-get-a-refund-from-grubhub',
    inAppRefundPath:
      'Sign in to your Grubhub account, open your order history, select the order, and use its help flow to report the issue and request a refund ("If you would like to request a refund on an order, sign in to your Grubhub account and select the order you need help with"). Refunds may take up to 5 business days to process, longer at some banks. Seamless works the same way at seamless.com.',
    humanContact:
      'Chat with Customer Care around the clock from the help center (grubhub.com/help/contact-us, then Need more help: "Our Customer Care team is staffed around the clock"). Phone, from the Terms of Use: "If you require assistance, please call our Customer Care team at 1-877-585-7878." The help center shows chat first; the phone number is published in the terms (also in the Seamless copy).',
    smallClaimsAllowed: true,
    smallClaimsNote:
      'Yes. Terms of Use effective December 17, 2024 (Dispute Resolution, section II, Mutual Arbitration Agreement): "each party retains the right to (1) elect (at any time prior to the appointment of an arbitrator) to have any claims heard in small claims court on an individual basis for disputes and actions within the scope of such court\u2019s jurisdiction, provided the proceeding remains in small claims court and is not removed or appealed to a court of general jurisdiction" (https://www.grubhub.com/legal/terms-of-use; identical at seamless.com/legal/terms-of-use). Dispute notices by mail go to the Chicago address above or by email to disputeresolution@grubhub.com.',
    verifiedOn: VER,
  },
] as const;

/** Look up a platform record by id. */
export function getPlatform(id: Platform['id']): Platform {
  const found = platforms.find((p) => p.id === id);
  if (!found) {
    throw new Error(`Unknown platform: ${id}`);
  }
  return found;
}
