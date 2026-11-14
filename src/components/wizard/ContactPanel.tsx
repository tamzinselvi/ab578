import { useState } from "preact/hooks";
import { t, type Locale } from "../../i18n/index";
import type { ContactInfo } from "../../lib/complaint/types";

interface Props {
  locale: Locale;
  /** Contact already on file (remembered on this device), if any. */
  contact: ContactInfo | null;
  remember: boolean;
  /** Persist (remember) or drop (do not remember) the saved contact. */
  onSave: (contact: ContactInfo, remember: boolean) => void;
}

interface ContactForm {
  firstName: string;
  lastName: string;
  street: string;
  street2: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  phone: string;
}

function emptyForm(): ContactForm {
  return {
    firstName: "",
    lastName: "",
    street: "",
    street2: "",
    city: "",
    state: "CA",
    zip: "",
    email: "",
    phone: "",
  };
}

function prefill(contact: ContactInfo | null): ContactForm {
  if (!contact) return emptyForm();
  return { ...emptyForm(), ...contact };
}

/**
 * Contact details for the AG form, asked once on the kit step. Saving is
 * what triggers storage: the parent persists only when "Remember on this
 * device" is checked and removes any saved copy otherwise.
 */
export default function ContactPanel({
  locale,
  contact,
  remember,
  onSave,
}: Props) {
  const [form, setForm] = useState<ContactForm>(() => prefill(contact));
  const [rememberLocal, setRememberLocal] = useState(remember);
  const [error, setError] = useState(false);

  const set = (field: keyof ContactForm) => (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submit = (event: Event) => {
    event.preventDefault();
    const missing =
      !form.firstName.trim() ||
      !form.lastName.trim() ||
      !form.street.trim() ||
      !form.city.trim() ||
      !form.zip.trim();
    if (missing) {
      setError(true);
      return;
    }
    setError(false);
    const saved: ContactInfo = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      street: form.street.trim(),
      street2: form.street2.trim() || undefined,
      city: form.city.trim(),
      state: form.state.trim() || "CA",
      zip: form.zip.trim(),
      email: form.email.trim() || undefined,
      phone: form.phone.trim() || undefined,
    };
    onSave(saved, rememberLocal);
  };

  return (
    <section class="wizard-contact" aria-labelledby="wizard-contact-heading">
      <h2 id="wizard-contact-heading">{t(locale, "wizardContactHeading")}</h2>
      <p class="wizard-hint">{t(locale, "wizardContactIntro")}</p>
      <form class="wizard-contact-grid" onSubmit={submit} novalidate>
        <div class="wizard-field">
          <label htmlFor="contact-first">
            {t(locale, "wizardContactFirstName")}
          </label>
          <input
            id="contact-first"
            type="text"
            autocomplete="given-name"
            value={form.firstName}
            onInput={set("firstName")}
            aria-invalid={error && !form.firstName.trim() ? "true" : undefined}
          />
        </div>
        <div class="wizard-field">
          <label htmlFor="contact-last">
            {t(locale, "wizardContactLastName")}
          </label>
          <input
            id="contact-last"
            type="text"
            autocomplete="family-name"
            value={form.lastName}
            onInput={set("lastName")}
            aria-invalid={error && !form.lastName.trim() ? "true" : undefined}
          />
        </div>
        <div class="wizard-field">
          <label htmlFor="contact-street">
            {t(locale, "wizardContactStreet")}
          </label>
          <input
            id="contact-street"
            type="text"
            autocomplete="street-address"
            value={form.street}
            onInput={set("street")}
            aria-invalid={error && !form.street.trim() ? "true" : undefined}
          />
        </div>
        <div class="wizard-field">
          <label htmlFor="contact-street2">
            {t(locale, "wizardContactStreet2")}
          </label>
          <input
            id="contact-street2"
            type="text"
            autocomplete="address-line2"
            value={form.street2}
            onInput={set("street2")}
          />
        </div>
        <div class="wizard-field">
          <label htmlFor="contact-city">{t(locale, "wizardContactCity")}</label>
          <input
            id="contact-city"
            type="text"
            autocomplete="address-level2"
            value={form.city}
            onInput={set("city")}
            aria-invalid={error && !form.city.trim() ? "true" : undefined}
          />
        </div>
        <div class="wizard-field">
          <label htmlFor="contact-state">
            {t(locale, "wizardContactState")}
          </label>
          <input
            id="contact-state"
            type="text"
            autocomplete="address-level1"
            value={form.state}
            onInput={set("state")}
          />
        </div>
        <div class="wizard-field">
          <label htmlFor="contact-zip">{t(locale, "wizardContactZip")}</label>
          <input
            id="contact-zip"
            type="text"
            inputmode="numeric"
            autocomplete="postal-code"
            value={form.zip}
            onInput={set("zip")}
            aria-invalid={error && !form.zip.trim() ? "true" : undefined}
          />
        </div>
        <div class="wizard-field">
          <label htmlFor="contact-email">
            {t(locale, "wizardContactEmail")}
          </label>
          <input
            id="contact-email"
            type="email"
            autocomplete="email"
            value={form.email}
            onInput={set("email")}
          />
        </div>
        <div class="wizard-field">
          <label htmlFor="contact-phone">
            {t(locale, "wizardContactPhone")}
          </label>
          <input
            id="contact-phone"
            type="tel"
            autocomplete="tel"
            value={form.phone}
            onInput={set("phone")}
          />
        </div>
        <label class="wizard-check">
          <input
            type="checkbox"
            checked={rememberLocal}
            onChange={(event) =>
              setRememberLocal((event.target as HTMLInputElement).checked)
            }
          />
          <span>
            {t(locale, "wizardContactRemember")}
            <span class="choice-note">
              {t(locale, "wizardContactRememberNote")}
            </span>
          </span>
        </label>
        {error ? (
          <p class="field-error" role="alert">
            {t(locale, "wizardContactError")}
          </p>
        ) : null}
        <button type="submit" class="button">
          {t(locale, "wizardContactAdd")}
        </button>
      </form>
    </section>
  );
}
