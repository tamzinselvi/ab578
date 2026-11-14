import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import KitView from "../kit/KitView";
import Keypad from "./Keypad";
import ContactPanel from "./ContactPanel";
import "./wizard.css";
import {
  clearAllWizardData,
  clearRememberedContact,
  draftToIncident,
  initialDraft,
  isWizardStep,
  loadDraft,
  loadRememberedContact,
  parseISODate,
  parseMoney,
  saveDraft,
  saveRememberedContact,
  STEPS,
  withPreselectedPlatform,
  type ContactedDraft,
  type ContactMethod,
  type WizardDraft,
  type WizardStep,
} from "./state";
import {
  generateKit,
  ISSUE_ORDER,
  type ContactInfo,
  type Issue,
  type PlatformId,
  type RefundStatus,
} from "../../lib/complaint";
import { platforms } from "../../data/platforms";
import { t, type Locale } from "../../i18n/index";
import { formatMoney } from "../../i18n/format";
import type { MessageKey } from "../../i18n/en";

const STEP_NAME_KEY: Record<WizardStep, MessageKey> = {
  issues: "wizardStepIssues",
  platform: "wizardStepPlatform",
  details: "wizardStepDetails",
  kit: "wizardStepKit",
};

const ISSUE_LABEL_KEY: Record<Issue, MessageKey> = {
  not_delivered: "wizardIssueNotDelivered",
  wrong_order: "wizardIssueWrongOrder",
  wrong_items: "wizardIssueWrongItems",
  missing_items: "wizardIssueMissingItems",
  unusable_items: "wizardIssueUnusableItems",
  credits_only: "wizardIssueCredits",
  refund_denied: "wizardIssueRefundDenied",
  no_human: "wizardIssueNoHuman",
  not_covered: "wizardIssueNotCovered",
};

const REFUND_LABEL_KEY: Record<RefundStatus, MessageKey> = {
  none: "wizardRefundNone",
  credits: "wizardRefundCredits",
  partial: "wizardRefundPartial",
  full: "wizardRefundFull",
};

const METHOD_LABEL_KEY: Record<ContactMethod, MessageKey> = {
  chat: "wizardMethodChat",
  phone: "wizardMethodPhone",
  email: "wizardMethodEmail",
  other: "wizardMethodOther",
};

const REFUND_STATUSES: readonly RefundStatus[] = [
  "none",
  "credits",
  "partial",
  "full",
];

interface DetailErrors {
  total?: boolean;
  date?: boolean;
  contactResult?: boolean;
}

/**
 * The one-minute complaint wizard. Four steps behind a per-step URL hash
 * (#issues, #platform, #details, #kit) so browser back and forward work.
 * Answers autosave to localStorage as a draft; contact details persist only
 * through the explicit "Remember on this device" opt-in.
 */
export default function Wizard({ locale }: { locale: Locale }) {
  const [draft, setDraft] = useState<WizardDraft>(initialDraft);
  const [mounted, setMounted] = useState(false);
  const [restored, setRestored] = useState(false);
  const [contact, setContact] = useState<ContactInfo | null>(null);
  const [remember, setRemember] = useState(false);
  const [note, setNote] = useState("");
  const [issueError, setIssueError] = useState(false);
  const [platformError, setPlatformError] = useState(false);
  const [detailErrors, setDetailErrors] = useState<DetailErrors>({});

  const stepRef = useRef<WizardStep>(draft.step);
  stepRef.current = draft.step;
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  // Restore the draft (or the ?platform= preselect) once, on mount only, so
  // server-rendered HTML and hydration start from the same state.
  useEffect(() => {
    const { draft: saved, restored: hadDraft } = loadDraft();
    const params = new URLSearchParams(window.location.search);
    const merged = withPreselectedPlatform(saved, params.get("platform"));
    const hash = window.location.hash.replace(/^#/, "");
    const step = isWizardStep(hash) ? hash : merged.step;
    setDraft({ ...merged, step });
    setRestored(hadDraft);
    if (window.location.hash !== `#${step}`) {
      window.history.replaceState(null, "", `#${step}`);
    }
    const remembered = loadRememberedContact();
    if (remembered) {
      setContact(remembered);
      setRemember(true);
    }
    setMounted(true);
  }, []);

  // Draft autosave: every answer change lands in localStorage. Clearing
  // skips one save so "Clear my data" really empties storage instead of
  // immediately writing a fresh empty draft back.
  const skipNextAutosave = useRef(false);
  useEffect(() => {
    if (!mounted) return;
    if (skipNextAutosave.current) {
      skipNextAutosave.current = false;
      return;
    }
    saveDraft(draft);
  }, [draft, mounted]);

  // Browser back/forward: follow the hash without losing state.
  useEffect(() => {
    const onHashChange = () => {
      const raw = window.location.hash.replace(/^#/, "");
      if (isWizardStep(raw) && raw !== stepRef.current) {
        setNote("");
        setIssueError(false);
        setPlatformError(false);
        setDetailErrors({});
        setDraft((current) => ({ ...current, step: raw }));
      }
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // Move focus to the step heading on every step change, for keyboard and
  // screen-reader users. The first render does not steal focus.
  const previousStep = useRef<WizardStep | null>(null);
  useEffect(() => {
    if (previousStep.current != null && previousStep.current !== draft.step) {
      headingRef.current?.focus();
    }
    previousStep.current = draft.step;
  }, [draft.step]);

  const clearFeedback = () => {
    setNote("");
    setIssueError(false);
    setPlatformError(false);
    setDetailErrors({});
  };

  const go = (step: WizardStep) => {
    clearFeedback();
    setDraft((current) => ({ ...current, step }));
    if (window.location.hash !== `#${step}`) {
      window.location.hash = `#${step}`;
    }
  };

  const patch = (changes: Partial<WizardDraft>) =>
    setDraft((current) => ({ ...current, ...changes }));

  const patchContacted = (changes: Partial<ContactedDraft>) =>
    setDraft((current) => ({
      ...current,
      contacted: { ...current.contacted, ...changes },
    }));

  const toggleIssue = (issue: Issue) => {
    setIssueError(false);
    setDraft((current) => ({
      ...current,
      issues: current.issues.includes(issue)
        ? current.issues.filter((kept) => kept !== issue)
        : [...current.issues, issue],
    }));
  };

  const submitIssues = () => {
    if (draft.issues.length === 0) {
      setIssueError(true);
      document.getElementById(`issue-${ISSUE_ORDER[0]}`)?.focus();
      return;
    }
    go("platform");
  };

  // Tapping a named platform selects it and advances immediately; "other"
  // reveals the free-text name field and waits for Continue.
  const choosePlatform = (id: PlatformId) => {
    setPlatformError(false);
    patch({ platform: id });
    if (id !== "other") go("details");
  };

  const submitOtherPlatform = () => {
    if (!draft.otherPlatformName.trim()) {
      setPlatformError(true);
      document.getElementById("other-platform-name")?.focus();
      return;
    }
    go("details");
  };

  const keyTotal = (key: string) => {
    setDetailErrors((current) => ({ ...current, total: false }));
    setDraft((current) => {
      let value = current.orderTotal;
      if (key === "del") {
        value = value.slice(0, -1);
      } else if (key === ".") {
        value = value.includes(".") ? value : `${value}.`;
      } else {
        const fraction = value.split(".")[1];
        if (value.length < 7 && (fraction == null || fraction.length < 2)) {
          value += key;
        }
      }
      return { ...current, orderTotal: value };
    });
  };

  const submitDetails = () => {
    const errors: DetailErrors = {};
    if (parseMoney(draft.orderTotal) == null) errors.total = true;
    if (parseISODate(draft.orderDate) == null) errors.date = true;
    if (draft.contacted.done && !draft.contacted.result.trim()) {
      errors.contactResult = true;
    }
    setDetailErrors(errors);
    if (errors.total) {
      document.getElementById("order-total")?.focus();
    } else if (errors.date) {
      document.getElementById("order-date")?.focus();
    } else if (errors.contactResult) {
      document.getElementById("contacted-result")?.focus();
    } else {
      go("kit");
    }
  };

  const handleContactSave = (saved: ContactInfo, wantRemember: boolean) => {
    setContact(saved);
    setRemember(wantRemember);
    // Storage follows the checkbox exactly: remembered when checked, gone
    // the moment it is not.
    if (wantRemember) saveRememberedContact(saved);
    else clearRememberedContact();
    setNote(t(locale, "wizardContactSavedNote"));
  };

  const clearMyData = () => {
    clearAllWizardData();
    skipNextAutosave.current = true;
    setDraft(initialDraft());
    setContact(null);
    setRemember(false);
    setRestored(false);
    setNote(t(locale, "wizardClearedNote"));
    window.history.replaceState(null, "", "#issues");
  };

  const startOver = () => {
    setDraft(initialDraft());
    go("issues");
  };

  const incident = useMemo(() => draftToIncident(draft), [draft]);
  const kit = useMemo(
    () =>
      incident
        ? generateKit(incident, contact ?? undefined, {
            uiLocale: locale,
            outgoingLocale: "en",
          })
        : null,
    [incident, contact, locale],
  );

  const stepIndex = STEPS.indexOf(draft.step);
  const parsedTotal = parseMoney(draft.orderTotal);

  return (
    <div class="wizard">
      <nav
        class="wizard-progress"
        aria-label={t(locale, "wizardProgressLabel")}
      >
        <p class="wizard-note">
          {t(locale, "wizardStepLabel", {
            current: `${stepIndex + 1}`,
            total: `${STEPS.length}`,
          })}
        </p>
        <ol>
          {STEPS.map((step) => (
            <li
              key={step}
              aria-current={step === draft.step ? "step" : undefined}
            >
              {t(locale, STEP_NAME_KEY[step])}
            </li>
          ))}
        </ol>
      </nav>

      <p role="status" aria-live="polite">
        {note}
      </p>
      {restored && draft.step !== "kit" ? (
        <p class="wizard-note">{t(locale, "wizardDraftRestored")}</p>
      ) : null}

      {draft.step === "issues" ? (
        <section aria-labelledby="wizard-heading">
          <h1 id="wizard-heading" tabIndex={-1} ref={headingRef}>
            {t(locale, "wizardIssuesHeading")}
          </h1>
          <p class="wizard-hint">{t(locale, "wizardIssuesHint")}</p>
          <fieldset class="wizard-choices">
            <legend class="visually-hidden">
              {t(locale, "wizardIssuesHeading")}
            </legend>
            {ISSUE_ORDER.map((issue) => (
              <label
                key={issue}
                class="wizard-choice"
                htmlFor={`issue-${issue}`}
              >
                <input
                  id={`issue-${issue}`}
                  type="checkbox"
                  checked={draft.issues.includes(issue)}
                  onChange={() => toggleIssue(issue)}
                />
                <span>
                  {t(locale, ISSUE_LABEL_KEY[issue])}
                  {issue === "not_covered" ? (
                    <span class="choice-note">
                      {t(locale, "wizardIssueNotCoveredNote")}
                    </span>
                  ) : null}
                </span>
              </label>
            ))}
          </fieldset>
          {draft.issues.includes("not_delivered") ? (
            <label class="wizard-choice" htmlFor="wizard-at-address">
              <input
                id="wizard-at-address"
                type="checkbox"
                checked={draft.atAddress === true}
                onChange={() => patch({ atAddress: draft.atAddress !== true })}
              />
              <span>{t(locale, "wizardAtAddress")}</span>
            </label>
          ) : null}
          {issueError ? (
            <p class="field-error" role="alert">
              {t(locale, "wizardIssuesError")}
            </p>
          ) : null}
          <div class="wizard-nav">
            <button type="button" class="button" onClick={submitIssues}>
              {t(locale, "wizardNext")}
            </button>
          </div>
        </section>
      ) : null}

      {draft.step === "platform" ? (
        <section aria-labelledby="wizard-heading">
          <h1 id="wizard-heading" tabIndex={-1} ref={headingRef}>
            {t(locale, "wizardPlatformHeading")}
          </h1>
          <p class="wizard-hint">{t(locale, "wizardPlatformHint")}</p>
          <div
            class="wizard-options"
            role="group"
            aria-label={t(locale, "wizardPlatformHeading")}
          >
            {platforms.map((platform) => (
              <button
                key={platform.id}
                type="button"
                class="wizard-option"
                data-selected={draft.platform === platform.id}
                onClick={() => choosePlatform(platform.id)}
              >
                <span>{platform.name}</span>
                {draft.platform === platform.id ? (
                  <span class="option-check" aria-hidden="true">
                    ✓
                  </span>
                ) : null}
              </button>
            ))}
            <button
              type="button"
              class="wizard-option"
              data-selected={draft.platform === "other"}
              onClick={() => choosePlatform("other")}
            >
              <span>{t(locale, "wizardPlatformOther")}</span>
              {draft.platform === "other" ? (
                <span class="option-check" aria-hidden="true">
                  ✓
                </span>
              ) : null}
            </button>
          </div>
          {draft.platform === "other" ? (
            <div class="wizard-fields">
              <div class="wizard-field">
                <label htmlFor="other-platform-name">
                  {t(locale, "wizardPlatformOtherLabel")}
                </label>
                <input
                  id="other-platform-name"
                  type="text"
                  autocomplete="off"
                  value={draft.otherPlatformName}
                  onInput={(event) =>
                    patch({
                      otherPlatformName: (event.target as HTMLInputElement)
                        .value,
                    })
                  }
                />
              </div>
              {platformError ? (
                <p class="field-error" role="alert">
                  {t(locale, "wizardPlatformOtherError")}
                </p>
              ) : null}
              <button
                type="button"
                class="button"
                onClick={submitOtherPlatform}
              >
                {t(locale, "wizardContinue")}
              </button>
            </div>
          ) : null}
        </section>
      ) : null}

      {draft.step === "details" ? (
        <section aria-labelledby="wizard-heading">
          <h1 id="wizard-heading" tabIndex={-1} ref={headingRef}>
            {t(locale, "wizardDetailsHeading")}
          </h1>
          <div class="wizard-fields">
            <div class="wizard-field">
              <label htmlFor="order-date">
                {t(locale, "wizardOrderDateLabel")}
              </label>
              <input
                id="order-date"
                type="date"
                value={draft.orderDate}
                onInput={(event) =>
                  patch({ orderDate: (event.target as HTMLInputElement).value })
                }
                aria-invalid={detailErrors.date ? "true" : undefined}
              />
            </div>
            <div class="wizard-field">
              <label htmlFor="order-total">
                {t(locale, "wizardOrderTotalLabel")}
              </label>
              <input
                id="order-total"
                type="text"
                inputmode="decimal"
                autocomplete="off"
                value={draft.orderTotal}
                onInput={(event) => {
                  setDetailErrors((current) => ({ ...current, total: false }));
                  patch({
                    orderTotal: (event.target as HTMLInputElement).value,
                  });
                }}
                aria-describedby="order-total-hint"
                aria-invalid={detailErrors.total ? "true" : undefined}
              />
              <p id="order-total-hint" class="field-hint">
                {parsedTotal != null
                  ? formatMoney(locale, parsedTotal)
                  : t(locale, "wizardMoneyExampleHint")}
              </p>
            </div>
            <Keypad
              groupLabel={t(locale, "wizardKeypadLabel")}
              deleteLabel={t(locale, "wizardKeypadDelete")}
              onKey={keyTotal}
            />
            <fieldset class="wizard-radios">
              <legend>{t(locale, "wizardRefundedHeading")}</legend>
              {REFUND_STATUSES.map((status) => (
                <label
                  key={status}
                  class="wizard-radio"
                  htmlFor={`refund-${status}`}
                >
                  <input
                    id={`refund-${status}`}
                    type="radio"
                    name="refund-status"
                    checked={draft.refundStatus === status}
                    onChange={() => patch({ refundStatus: status })}
                  />
                  {t(locale, REFUND_LABEL_KEY[status])}
                </label>
              ))}
            </fieldset>
            {draft.refundStatus === "partial" ? (
              <div class="wizard-field">
                <label htmlFor="refunded-amount">
                  {t(locale, "wizardRefundedAmountLabel")}
                </label>
                <input
                  id="refunded-amount"
                  type="text"
                  inputmode="decimal"
                  autocomplete="off"
                  value={draft.refundedAmount}
                  onInput={(event) =>
                    patch({
                      refundedAmount: (event.target as HTMLInputElement).value,
                    })
                  }
                />
              </div>
            ) : null}
            <details class="wizard-optional">
              <summary>{t(locale, "wizardOptionalSummary")}</summary>
              <div class="wizard-fields">
                <div class="wizard-field">
                  <label htmlFor="affected-total">
                    {t(locale, "wizardAffectedTotalLabel")}
                  </label>
                  <input
                    id="affected-total"
                    type="text"
                    inputmode="decimal"
                    autocomplete="off"
                    value={draft.affectedItemsTotal}
                    onInput={(event) =>
                      patch({
                        affectedItemsTotal: (event.target as HTMLInputElement)
                          .value,
                      })
                    }
                    aria-describedby="affected-total-hint"
                  />
                  <p id="affected-total-hint" class="field-hint">
                    {t(locale, "wizardAffectedTotalHint")}
                  </p>
                </div>
                <div class="wizard-field">
                  <label htmlFor="order-number">
                    {t(locale, "wizardOrderNumberLabel")}
                  </label>
                  <input
                    id="order-number"
                    type="text"
                    autocomplete="off"
                    value={draft.orderNumber}
                    onInput={(event) =>
                      patch({
                        orderNumber: (event.target as HTMLInputElement).value,
                      })
                    }
                  />
                </div>
                <div class="wizard-field">
                  <label htmlFor="restaurant">
                    {t(locale, "wizardRestaurantLabel")}
                  </label>
                  <input
                    id="restaurant"
                    type="text"
                    value={draft.restaurant}
                    onInput={(event) =>
                      patch({
                        restaurant: (event.target as HTMLInputElement).value,
                      })
                    }
                  />
                </div>
                <div class="wizard-field">
                  <label htmlFor="items-affected">
                    {t(locale, "wizardItemsLabel")}
                  </label>
                  <textarea
                    id="items-affected"
                    rows={2}
                    placeholder={t(locale, "wizardItemsPlaceholder")}
                    value={draft.itemsAffected}
                    onInput={(event) =>
                      patch({
                        itemsAffected: (event.target as HTMLTextAreaElement)
                          .value,
                      })
                    }
                  />
                </div>
                <label class="wizard-check">
                  <input
                    type="checkbox"
                    checked={draft.contacted.done}
                    onChange={(event) =>
                      patchContacted({
                        done: (event.target as HTMLInputElement).checked,
                      })
                    }
                  />
                  <span>{t(locale, "wizardContactedLabel")}</span>
                </label>
                {draft.contacted.done ? (
                  <>
                    <div class="wizard-field">
                      <label htmlFor="contacted-date">
                        {t(locale, "wizardContactedDateLabel")}
                      </label>
                      <input
                        id="contacted-date"
                        type="date"
                        value={draft.contacted.date}
                        onInput={(event) =>
                          patchContacted({
                            date: (event.target as HTMLInputElement).value,
                          })
                        }
                      />
                    </div>
                    <div class="wizard-field">
                      <label htmlFor="contacted-method">
                        {t(locale, "wizardContactedMethodLabel")}
                      </label>
                      <select
                        id="contacted-method"
                        value={draft.contacted.method}
                        onChange={(event) =>
                          patchContacted({
                            method: (event.target as HTMLSelectElement)
                              .value as ContactMethod,
                          })
                        }
                      >
                        {(Object.keys(METHOD_LABEL_KEY) as ContactMethod[]).map(
                          (method) => (
                            <option key={method} value={method}>
                              {t(locale, METHOD_LABEL_KEY[method])}
                            </option>
                          ),
                        )}
                      </select>
                    </div>
                    <div class="wizard-field">
                      <label htmlFor="contacted-result">
                        {t(locale, "wizardContactedResultLabel")}
                      </label>
                      <textarea
                        id="contacted-result"
                        rows={2}
                        placeholder={t(
                          locale,
                          "wizardContactedResultPlaceholder",
                        )}
                        value={draft.contacted.result}
                        onInput={(event) =>
                          patchContacted({
                            result: (event.target as HTMLTextAreaElement).value,
                          })
                        }
                        aria-invalid={
                          detailErrors.contactResult ? "true" : undefined
                        }
                      />
                    </div>
                  </>
                ) : null}
              </div>
            </details>
            {detailErrors.total ? (
              <p class="field-error" role="alert">
                {t(locale, "wizardDetailsErrorTotal")}
              </p>
            ) : null}
            {detailErrors.date ? (
              <p class="field-error" role="alert">
                {t(locale, "wizardDetailsErrorDate")}
              </p>
            ) : null}
            {detailErrors.contactResult ? (
              <p class="field-error" role="alert">
                {t(locale, "wizardContactedResultError")}
              </p>
            ) : null}
            <div class="wizard-nav">
              <button type="button" class="button" onClick={submitDetails}>
                {t(locale, "wizardContinue")}
              </button>
            </div>
          </div>
        </section>
      ) : null}

      {draft.step === "kit" ? (
        <section aria-labelledby="wizard-heading">
          <h1 id="wizard-heading" tabIndex={-1} ref={headingRef}>
            {t(locale, "wizardKitHeading")}
          </h1>
          <p class="wizard-hint">{t(locale, "wizardKitIntro")}</p>
          {kit ? (
            <>
              <KitView kit={kit} />
              <ContactPanel
                locale={locale}
                contact={contact}
                remember={remember}
                onSave={handleContactSave}
              />
              <div class="wizard-actions">
                <button type="button" class="button" onClick={startOver}>
                  {t(locale, "wizardStartOver")}
                </button>
              </div>
            </>
          ) : (
            <>
              <p>{t(locale, "wizardKitIncomplete")}</p>
              <div class="wizard-nav">
                <button
                  type="button"
                  class="button"
                  onClick={() => go("details")}
                >
                  {t(locale, "wizardKitIncompleteBack")}
                </button>
              </div>
            </>
          )}
        </section>
      ) : null}

      <div class="wizard-footer">
        {stepIndex > 0 ? (
          <button
            type="button"
            class="wizard-link"
            onClick={() => go(STEPS[stepIndex - 1])}
          >
            {t(locale, "wizardBack")}
          </button>
        ) : (
          <span />
        )}
        <button type="button" class="wizard-link" onClick={clearMyData}>
          {t(locale, "wizardClearData")}
        </button>
      </div>
    </div>
  );
}
