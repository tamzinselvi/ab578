import { useEffect, useRef, useState } from "preact/hooks";
import { agFormFacts } from "../../data/destinations";
import { localePath, locales, t, type Locale } from "../../i18n";
import type { MessageKey } from "../../i18n/en";
import type { ComplaintKit, LocalizedText } from "../../lib/complaint/types";
import EvidenceBundler from "../evidence/EvidenceBundler";
import {
  agMailInForm,
  askKind,
  buildRecordText,
  cardDestinations,
  floorLine,
  kitHasTranslation,
  kitPlatformName,
  languageName,
  outgoingText,
  pageLocale,
  recordFilename,
  sideText,
  type AskKind,
} from "./derive";
import "./kit.css";

/**
 * The kit screen: everything the user needs to act on their complaint, one
 * tap per action. Card 1 sends the refund demand to the platform, Card 2
 * fills the Attorney General's form field by field, Card 3 holds the
 * collapsed long-shot routes, and the evidence bundler builds the PDF the
 * AG form asks for.
 *
 * Props stay exactly { kit } so the wizard can drop this in unchanged. The
 * UI locale is the page's <html lang>; the outgoing language starts at the
 * kit's own outgoing locale and can be toggled to the side-by-side
 * translation. Copy buttons always copy the outgoing text, never the
 * side-by-side translation.
 */
export default function KitView({ kit }: { kit: ComplaintKit }) {
  const [locale] = useState<Locale>(() =>
    pageLocale(
      typeof document === "undefined"
        ? undefined
        : document.documentElement.lang,
    ),
  );
  const [sendInUi, setSendInUi] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [manualText, setManualText] = useState<string | null>(null);
  const manualRef = useRef<HTMLTextAreaElement | null>(null);
  const copiedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (copiedTimer.current) clearTimeout(copiedTimer.current);
    },
    [],
  );

  const platform = kitPlatformName(kit, locale);
  const canToggle = kitHasTranslation(kit);
  const canShare =
    typeof navigator !== "undefined" && typeof navigator.share === "function";
  const mailIn = agMailInForm(locale);
  const moreDestinations = cardDestinations(kit.otherDestinations);
  const outgoing = (item: LocalizedText) => outgoingText(item, sendInUi);
  const side = (item: LocalizedText) => sideText(item, sendInUi);
  const tt = (key: MessageKey, vars?: Record<string, string>) =>
    t(locale, key, vars);

  const markCopied = (id: string) => {
    setCopiedId(id);
    if (copiedTimer.current) clearTimeout(copiedTimer.current);
    copiedTimer.current = setTimeout(() => setCopiedId(null), 2500);
  };

  /** Copy through the Clipboard API; fall back to a selected textarea. */
  const copy = async (id: string, text: string) => {
    let copied = false;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        copied = true;
      } catch {
        copied = false;
      }
    }
    if (copied) {
      setManualText(null);
      markCopied(id);
      return;
    }
    setManualText(text);
    requestAnimationFrame(() => {
      const area = manualRef.current;
      if (!area) return;
      area.focus();
      area.select();
      area.scrollIntoView({ block: "center" });
      // Some browsers still honor this; if not, the text stays selected for
      // a manual copy.
      document.execCommand("copy");
    });
  };

  const share = async (text: string) => {
    try {
      await navigator.share({ title: tt("kitTitle"), text });
    } catch {
      // The user dismissed the share sheet, or sharing is unavailable.
    }
  };

  const print = () => {
    // A printed record must contain the collapsed sections too.
    document.querySelectorAll(".kit details").forEach((node) => {
      (node as HTMLDetailsElement).open = true;
    });
    window.print();
  };

  const download = () => {
    const iso = new Date().toISOString().slice(0, 10);
    const blob = new Blob([buildRecordText(kit, locale, iso)], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = recordFilename(iso);
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10_000);
  };

  const copyButton = (id: string, what: string, text: string) => (
    <button
      type="button"
      class="kit-copy"
      aria-label={tt("kitCopyLabel", { what })}
      onClick={() => void copy(id, text)}
    >
      {copiedId === id ? tt("kitCopied") : tt("kitCopy")}
    </button>
  );

  const message = (
    id: string,
    label: string,
    item: LocalizedText,
    options?: { ownHeading?: boolean },
  ) => (
    <div class="kit-message">
      {options?.ownHeading !== false && (
        <h3 class="kit-message-label">{label}</h3>
      )}
      <p class="kit-outgoing">{outgoing(item)}</p>
      {side(item) && (
        <p class="kit-translation">
          <span class="kit-translation-tag">{tt("kitTranslationLabel")}</span>
          {side(item)}
        </p>
      )}
      <div class="kit-message-actions kit-noprint">
        {copyButton(id, label, outgoing(item))}
        {canShare && (
          <button
            type="button"
            class="kit-copy"
            onClick={() => void share(outgoing(item))}
          >
            {tt("kitShare")}
          </button>
        )}
      </div>
    </div>
  );

  const askLabelLine = (kind: AskKind) =>
    kind === "settled"
      ? tt("kitAskLabelSettled")
      : kind === "argued"
        ? tt("kitAskLabelArgued")
        : tt("kitAskLabelPlain");

  return (
    <article class="kit" data-ui-locale={locale} data-send-in-ui={sendInUi}>
      <h2 class="kit-title">{tt("kitTitle")}</h2>
      <p class="kit-sr-only" role="status">
        {copiedId ? tt("kitCopied") : ""}
      </p>

      {canToggle && (
        <div class="kit-lang kit-noprint">
          <p class="kit-lang-label" id="kit-lang-label">
            {tt("kitOutgoingLanguage")}
          </p>
          <button
            type="button"
            class="kit-lang-toggle"
            aria-pressed={sendInUi}
            onClick={() => setSendInUi((value) => !value)}
          >
            {sendInUi
              ? languageName(kit.outgoingLocale) === "English"
                ? tt("kitSendInEnglish")
                : tt("kitSendInLanguage", {
                    language: languageName(kit.outgoingLocale),
                  })
              : tt("kitSendInLanguage", { language: languageName(locale) })}
          </button>
        </div>
      )}

      <section class="kit-card" aria-labelledby="kit-asks-heading">
        <h2 id="kit-asks-heading" class="kit-heading">
          {tt("kitAsksHeading")}
        </h2>
        <ul class="kit-asks">
          {kit.asks.map((ask) => {
            const kind = askKind(ask);
            const floor = floorLine(ask, kit, locale);
            return (
              <li class="kit-ask" key={ask.issue}>
                <p class="kit-ask-request">{ask.request}</p>
                <p class={`kit-ask-label kit-ask-label-${kind}`}>
                  {askLabelLine(kind)}
                  {ask.basis ? ` (${ask.basis})` : ""}
                </p>
                {floor && (
                  <p class="kit-ask-floor">
                    {floor}{" "}
                    <a href={localePath(locale, "/about#california-law")}>
                      {tt("kitWhyLink")}
                    </a>
                  </p>
                )}
              </li>
            );
          })}
        </ul>
        {kit.refundEstimate && (
          <div class="kit-estimate">
            <h3 class="kit-message-label">{tt("kitEstimateHeading")}</h3>
            <p class="kit-outgoing">{kit.refundEstimate.note}</p>
          </div>
        )}
      </section>

      <section class="kit-card" aria-labelledby="kit-platform-heading">
        <h2 id="kit-platform-heading" class="kit-heading">
          {tt("kitPlatformCardTitle", { platform })}
        </h2>
        {message(
          "kit-copy-short",
          tt("kitMessageShortLabel"),
          kit.platformRequest.short,
        )}
        {message(
          "kit-copy-long",
          tt("kitMessageLongLabel"),
          kit.platformRequest.long,
        )}
        {kit.platformRequest.supportUrl && (
          <p class="kit-noprint">
            <a
              class="kit-link-button"
              href={kit.platformRequest.supportUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {tt("kitOpenSupport", { platform })}
            </a>
          </p>
        )}
        <h3 class="kit-message-label">{tt("kitHumanTipsHeading")}</h3>
        <ul class="kit-tips">
          {kit.platformRequest.humanTips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </section>

      <section class="kit-card" aria-labelledby="kit-ag-heading">
        <h2 id="kit-ag-heading" class="kit-heading">
          {tt("kitAgCardTitle")}
        </h2>
        <p>{tt("kitAgIntro")}</p>
        <p class="kit-noprint">
          <a
            class="kit-link-button"
            href={kit.agForm.formUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {tt("kitAgOpenForm")}
          </a>
        </p>
        <ol class="kit-ag-fields">
          {kit.agForm.fields.map((field) => (
            <li class="kit-ag-field" key={field.order}>
              <p class="kit-ag-label">
                <span class="kit-ag-label-en">{field.label}</span>
                {field.labelTranslation && (
                  <span class="kit-ag-label-ui">{field.labelTranslation}</span>
                )}
              </p>
              <p class="kit-outgoing">{outgoing(field.value)}</p>
              {side(field.value) && (
                <p class="kit-translation">
                  <span class="kit-translation-tag">
                    {tt("kitTranslationLabel")}
                  </span>
                  {side(field.value)}
                </p>
              )}
              {copyButton(
                `kit-ag-${field.order}`,
                field.label,
                outgoing(field.value),
              )}
            </li>
          ))}
        </ol>
        <h3 class="kit-message-label">{tt("kitAgUploadHeading")}</h3>
        <p>
          {tt("kitAgUploadGuidance", {
            count: String(agFormFacts.uploadMaxFiles),
            types: agFormFacts.uploadAllowedTypes.join(", "),
            limit: String(agFormFacts.designUploadLimitMb),
          })}
        </p>
        <p class="kit-noprint">
          <a href="#kit-evidence">{tt("kitAgUploadLink")}</a>
        </p>
        {mailIn && (
          <p class="kit-mailin">
            {tt("kitAgMailInNote", { language: locales[locale].label })}{" "}
            <a href={mailIn.url} target="_blank" rel="noopener noreferrer">
              {tt("kitAgMailInLink", { language: locales[locale].label })}
            </a>
          </p>
        )}
      </section>

      <div id="kit-evidence" class="kit-evidence">
        <EvidenceBundler platform={platform} locale={locale} />
      </div>

      <details class="kit-card kit-more">
        <summary>
          <span class="kit-more-title">{tt("kitMoreCardTitle")}</span>
          <span class="kit-more-hint">{tt("kitMoreCardHint")}</span>
        </summary>
        <ul class="kit-destinations">
          {moreDestinations.map((destination, index) => (
            <li key={destination.id}>
              <a
                href={destination.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {index === 0
                  ? tt("kitDestDa")
                  : index === 1
                    ? tt("kitDestFtc")
                    : tt("kitDestSmallClaims")}
              </a>
              <p>
                {index === 0
                  ? tt("kitDestDaNote")
                  : index === 1
                    ? tt("kitDestFtcNote")
                    : tt("kitDestSmallClaimsNote")}
              </p>
            </li>
          ))}
        </ul>
        <h3 class="kit-message-label">{tt("kitDemandLetterHeading")}</h3>
        <p>{tt("kitDemandLetterIntro")}</p>
        {message(
          "kit-copy-letter",
          tt("kitDemandLetterHeading"),
          kit.demandLetter,
          { ownHeading: false },
        )}
      </details>

      {manualText !== null && (
        <section
          class="kit-card kit-clipboard-fallback kit-noprint"
          aria-labelledby="kit-manual-heading"
        >
          <h2 id="kit-manual-heading" class="kit-heading">
            {tt("kitClipboardFallbackHeading")}
          </h2>
          <p>{tt("kitClipboardFallbackIntro")}</p>
          <textarea
            ref={manualRef}
            class="kit-manual-text"
            readonly
            rows={8}
            aria-label={tt("kitClipboardFallbackLabel")}
            value={manualText}
          />
        </section>
      )}

      <section class="kit-card" aria-labelledby="kit-save-heading">
        <h2 id="kit-save-heading" class="kit-heading">
          {tt("kitSaveHeading")}
        </h2>
        <p>{tt("kitSaveIntro")}</p>
        <div class="kit-message-actions kit-noprint">
          <button type="button" class="kit-action" onClick={print}>
            {tt("kitPrint")}
          </button>
          <button type="button" class="kit-action" onClick={download}>
            {tt("kitDownloadRecord")}
          </button>
        </div>
      </section>

      <section class="kit-card" aria-labelledby="kit-citations-heading">
        <h2 id="kit-citations-heading" class="kit-heading">
          {tt("kitCitationsHeading")}
        </h2>
        <ul class="kit-citations">
          {kit.citations.map((citation) => (
            <li key={citation.id}>
              <span class="kit-citation-section">{citation.section}</span>{" "}
              {citation.argued && citation.floorSection && (
                <span class="kit-citation-argued">
                  {tt("kitCitationArgued", {
                    section: citation.floorSection,
                  })}{" "}
                </span>
              )}
              <span class="kit-citation-verified">
                {tt("kitCitationVerified", { date: citation.verifiedOn })}
              </span>{" "}
              <a
                href={citation.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {tt("kitCitationSource")}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
