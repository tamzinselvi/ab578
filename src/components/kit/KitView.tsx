import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import { agFormFacts } from "../../data/destinations";
import { localePath, locales, t, type Locale } from "../../i18n";
import type { MessageKey } from "../../i18n/en";
import { bookmarkletHref } from "../../lib/agfill/bookmarklet";
import { saveHandoffAnswers } from "../../lib/agfill/handoff";
import {
  agFillPairs,
  buildAgFillPayload,
  isContactField,
} from "../../lib/agfill/payload";
import { loadRememberedContact } from "../wizard/state";
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
  // The fill-the-form bookmark needs a mouse and a bookmarks bar; on phones
  // and tablets the kit shows the field-by-field copy list instead.
  const [canBookmark] = useState(
    () =>
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(min-width: 48rem)").matches &&
      !window.matchMedia("(pointer: coarse)").matches,
  );
  const [dragHint, setDragHint] = useState(false);
  const [evidenceReady, setEvidenceReady] = useState<string | null>(null);
  const [handoffHasContact, setHandoffHasContact] = useState(false);

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
  const agFillPayload = useMemo(
    () => buildAgFillPayload(kit.agForm.fields),
    [kit],
  );
  const agFillHref = useMemo(() => {
    // The bookmark fetches answers from the site that made it, so a
    // preview or test build hands off to itself, never to production.
    const origin =
      typeof window === "undefined"
        ? "https://ab578.com"
        : window.location.origin;
    const handoffUrl = new URL(
      `${import.meta.env.BASE_URL.replace(/\/$/, "")}/agfill/`,
      origin,
    ).href;
    return bookmarkletHref(
      {
        waiting: t(locale, "agFillWaiting"),
        prompt: t(locale, "agFillPrompt"),
        noHandoff: t(locale, "agFillNoHandoff"),
        pasteLabel: t(locale, "agFillPasteLabel"),
        wrongPage: t(locale, "agFillWrongPage"),
        openForm: t(locale, "agFillOpenForm"),
        notKit: t(locale, "agFillNotKit"),
        done: t(locale, "agFillDone"),
        doneFile: t(locale, "agFillDoneFile"),
        close: t(locale, "agFillClose"),
      },
      { handoffUrl },
    );
  }, [locale]);

  // Keep the AG answers on this device for the bookmark's one-click handoff.
  // Name, address, email and phone are only included when the person chose
  // "Remember on this device"; otherwise contact details never touch storage.
  useEffect(() => {
    const remembered = loadRememberedContact() !== null;
    const fields = remembered
      ? kit.agForm.fields
      : kit.agForm.fields.filter((field) => !isContactField(field.order));
    saveHandoffAnswers(agFillPairs(fields));
    setHandoffHasContact(
      remembered && kit.agForm.fields.some((field) => field.order === 1),
    );
  }, [kit]);
  const hasContact = kit.agForm.fields.some((field) => field.order === 1);

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

  /** The AG form's answers in form order, one copy button each. */
  const agFieldList = () => (
    <div class="kit-ag-list">
      <p>{tt("kitAgIntro")}</p>
      <p class="kit-noprint">
        <a
          class="kit-secondary"
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
            <div class="kit-ag-field-text">
              <p class="kit-ag-label">
                <span class="kit-ag-label-en">{field.label}</span>
                {field.labelTranslation && (
                  <span class="kit-ag-label-ui">{field.labelTranslation}</span>
                )}
              </p>
              <p class="kit-ag-value">{outgoing(field.value)}</p>
              {side(field.value) && (
                <p class="kit-translation">
                  <span class="kit-translation-tag">
                    {tt("kitTranslationLabel")}
                  </span>
                  {side(field.value)}
                </p>
              )}
            </div>
            {copyButton(
              `kit-ag-${field.order}`,
              field.label,
              outgoing(field.value),
            )}
          </li>
        ))}
      </ol>
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

      <section class="kit-card kit-step" aria-labelledby="kit-platform-heading">
        <h2 id="kit-platform-heading" class="kit-heading">
          {tt("kitPlatformCardTitle", { platform })}
        </h2>
        {message(
          "kit-copy-short",
          tt("kitMessageShortLabel"),
          kit.platformRequest.short,
        )}
        {kit.platformRequest.supportUrl && (
          <p class="kit-noprint">
            <a
              class="kit-primary"
              href={kit.platformRequest.supportUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {tt("kitOpenSupport", { platform })}
            </a>
          </p>
        )}
        <details class="kit-fold">
          <summary>{tt("kitMessageLongLabel")}</summary>
          {message(
            "kit-copy-long",
            tt("kitMessageLongLabel"),
            kit.platformRequest.long,
            { ownHeading: false },
          )}
        </details>
        <details class="kit-fold">
          <summary>{tt("kitHumanTipsHeading")}</summary>
          <ul class="kit-tips">
            {kit.platformRequest.humanTips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </details>
      </section>

      <section class="kit-card kit-step" aria-labelledby="kit-ag-heading">
        <h2 id="kit-ag-heading" class="kit-heading">
          {tt("kitAgCardTitle")}
        </h2>

        {canBookmark && (
          <div class="kit-agfill kit-noprint">
            <h3 class="kit-agfill-title">{tt("kitAgFillHeading")}</h3>
            <p class="kit-agfill-intro">{tt("kitAgFillIntro")}</p>
            <ol class="kit-agfill-steps">
              <li>
                <p>{tt("kitAgFillStep1")}</p>
                <a
                  class="kit-bookmarklet"
                  href={agFillHref}
                  draggable
                  onClick={(event) => {
                    event.preventDefault();
                    setDragHint(true);
                  }}
                >
                  {tt("kitAgFillBookmarkName")}
                </a>
                <p
                  class="kit-agfill-hint"
                  role={dragHint ? "alert" : undefined}
                >
                  {dragHint ? tt("kitAgFillDragHint") : tt("kitAgFillBarHint")}
                </p>
              </li>
              <li>
                <p>{tt("kitAgFillStep2")}</p>
                {evidenceReady ? (
                  <p class="kit-agfill-ready" role="status">
                    {tt("kitAgFillEvidenceReady", { filename: evidenceReady })}
                  </p>
                ) : (
                  <a class="kit-agfill-link" href="#kit-evidence">
                    {tt("kitAgFillEvidenceLink")}
                  </a>
                )}
              </li>
              <li>
                <p>{tt("kitAgFillStep3")}</p>
                <a
                  class="kit-primary"
                  href={kit.agForm.formUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {tt("kitAgOpenForm")}
                </a>
                {!hasContact && (
                  <p class="kit-agfill-hint">{tt("kitAgFillNoContact")}</p>
                )}
                {hasContact && !handoffHasContact && (
                  <p class="kit-agfill-hint">{tt("kitAgFillRememberHint")}</p>
                )}
              </li>
              <li>
                <p>{tt("kitAgFillStep4")}</p>
              </li>
            </ol>
            <div class="kit-agfill-fallback">
              <p class="kit-agfill-hint">{tt("kitAgFillFallback")}</p>
              <button
                type="button"
                class="kit-secondary"
                data-payload={agFillPayload}
                onClick={() => void copy("kit-agfill-copy", agFillPayload)}
              >
                {copiedId === "kit-agfill-copy"
                  ? tt("kitCopied")
                  : tt("kitAgFillCopy")}
              </button>
            </div>
          </div>
        )}

        {canBookmark ? (
          <details class="kit-fold kit-ag-manual">
            <summary>{tt("kitAgManualSummary")}</summary>
            {agFieldList()}
          </details>
        ) : (
          agFieldList()
        )}

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

      <div id="kit-evidence" class="kit-evidence kit-step">
        <EvidenceBundler
          platform={platform}
          locale={locale}
          onPdfReady={setEvidenceReady}
        />
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
