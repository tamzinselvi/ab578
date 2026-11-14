import { useEffect, useState } from "preact/hooks";
import { pickSuggestedLocale } from "../i18n/suggest";
import { LANGUAGE_STORAGE_KEY, type Locale } from "../i18n";

export interface LanguageAlternate {
  locale: Locale;
  label: string;
  url: string;
}

interface Props {
  currentLocale: Locale;
  alternates: LanguageAlternate[];
  /** Prompt template containing a {language} placeholder. */
  prompt: string;
  dismissLabel: string;
  regionLabel: string;
}

/**
 * First-visit language suggestion. Suggests, never redirects: the visitor
 * taps the language name to switch. Any recorded choice (switch, dismiss, or
 * a picker tap anywhere on the site) suppresses the bar for later visits.
 */
export default function LanguageSuggest(props: Props) {
  const [alternate, setAlternate] = useState<LanguageAlternate | null>(null);
  useEffect(() => {
    let stored: string | null;
    try {
      stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    } catch {
      return; // Storage unavailable: never suggest.
    }
    if (stored !== null) return;
    const languages =
      typeof navigator !== "undefined"
        ? (navigator.languages ?? [navigator.language])
        : [];
    const suggested = pickSuggestedLocale(languages, props.currentLocale);
    const match =
      suggested && props.alternates.find((a) => a.locale === suggested);
    if (match) setAlternate(match);
  }, []);

  if (!alternate) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, props.currentLocale);
    } catch {
      // Ignore: the bar just reappears next visit.
    }
    setAlternate(null);
  };

  return (
    <aside class="lang-suggest" aria-label={props.regionLabel}>
      <p>{props.prompt.replace("{language}", alternate.label)}</p>
      <a
        class="lang-suggest-accept"
        href={alternate.url}
        data-locale-link={alternate.locale}
        lang={alternate.locale}
      >
        {alternate.label}
      </a>
      <button type="button" class="lang-suggest-dismiss" onClick={dismiss}>
        {props.dismissLabel}
      </button>
    </aside>
  );
}
