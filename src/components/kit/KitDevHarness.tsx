import { generateKit } from "../../lib/complaint";
import { isLocale } from "../../i18n";
import type {
  ComplaintKit,
  ContactInfo,
  Incident,
  Locale,
  LocalizedText,
} from "../../lib/complaint/types";
import KitView from "./KitView";

/**
 * Test-only harness for the dev page (src/pages/dev/kit.astro). Builds a
 * fixture kit with the real engine and renders the real KitView, so the
 * Playwright suite can exercise the kit screen before the wizard ships.
 *
 * Query parameters:
 *   ui=<locale>    UI locale; also set as the page's html lang (default en)
 *   out=<locale>   outgoing locale passed to generateKit (default en)
 *   translate=1    stamp fake side-by-side translations for the UI locale,
 *                  standing in for the translation task's template files
 *   stress=1       append a long unbroken CJK sentence to every stamped
 *                  translation, for the 320 px layout test
 */

const INCIDENT: Incident = {
  platform: "doordash",
  issues: ["missing_items", "no_human"],
  orderDate: "2026-11-12",
  orderTotal: 42.5,
  affectedItemsTotal: 18.25,
  refundStatus: "credits",
  refundedAmount: 5,
  orderNumber: "DD-98123",
  restaurant: "Rose's Taqueria",
  itemsAffected: "2 x chicken teriyaki",
  contactedPlatform: {
    date: "2026-11-12",
    method: "chat",
    result: "The chat bot offered 5 dollars in app credit and ended the chat.",
  },
  reachedHuman: false,
};

const CONTACT: ContactInfo = {
  firstName: "Maria",
  lastName: "Lopez",
  street: "1234 Palm Ave",
  street2: "Apt 5",
  city: "Los Angeles",
  state: "CA",
  zip: "90001",
  email: "maria@example.com",
  phone: "(213) 555-0142",
};

const CJK_STRESS =
  "外送平台送錯訂單而且漏掉兩樣餐點，依照加州法律我有權要求全額退款到原本的付款方式，包括稅金、費用和小費，而不是平台點數。";

function queryLocale(name: string): Locale | undefined {
  const raw = new URLSearchParams(window.location.search).get(name);
  return raw && isLocale(raw) ? raw : undefined;
}

/** Stamp side-by-side translations the engine cannot produce yet. */
function withFakeTranslations(
  kit: ComplaintKit,
  ui: Locale,
  stress: boolean,
): ComplaintKit {
  const tag = `[${ui}] `;
  const suffix = stress ? CJK_STRESS : "";
  const stamp = (item: LocalizedText): LocalizedText => ({
    text: item.text,
    translation: item.translation ?? `${tag}${item.text}${suffix}`,
  });
  return {
    ...kit,
    platformRequest: {
      ...kit.platformRequest,
      short: stamp(kit.platformRequest.short),
      long: stamp(kit.platformRequest.long),
    },
    agForm: {
      ...kit.agForm,
      fields: kit.agForm.fields.map((field) => ({
        ...field,
        labelTranslation: field.labelTranslation ?? `${tag}${field.label}`,
        value: stamp(field.value),
      })),
    },
    demandLetter: stamp(kit.demandLetter),
  };
}

export default function KitDevHarness() {
  const params = new URLSearchParams(window.location.search);
  const ui = queryLocale("ui") ?? "en";
  const outgoing = queryLocale("out") ?? "en";
  // KitView reads the UI locale from the page's html lang, exactly as it
  // will on the localized wizard routes.
  document.documentElement.lang = ui;

  let kit = generateKit(INCIDENT, CONTACT, {
    uiLocale: ui,
    outgoingLocale: outgoing,
  });
  if (params.get("translate") === "1" && ui !== outgoing) {
    kit = withFakeTranslations(kit, ui, params.get("stress") === "1");
  }
  return <KitView kit={kit} />;
}
