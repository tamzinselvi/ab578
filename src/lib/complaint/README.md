# Complaint engine

Turns an `Incident` into a ready-to-send `ComplaintKit`: platform refund
demand (short and long), AG form fields, small-claims demand letter, refund
estimate, evidence checklist, destinations and citations. Pure functions, no
I/O, no state; safe to run in the browser on device.

## Public API

Import from `src/lib/complaint` (or the specific modules):

```ts
import { generateKit, ISSUE_ORDER } from "../lib/complaint";
import type {
  AgKitField,
  Ask,
  Citation,
  ComplaintKit,
  ContactInfo,
  Incident,
  Issue,
  KitOptions,
  LocalizedText,
  Locale,
  PlatformId,
  RefundEstimate,
  RefundStatus,
} from "../lib/complaint";
```

- `generateKit(incident: Incident, contact?: ContactInfo, options?: KitOptions): ComplaintKit`
  in `generate.ts`. The one cross-task contract: the wizard produces the
  `Incident`, `KitView` renders the `ComplaintKit`.
- `ISSUE_ORDER: readonly Issue[]` — canonical issue order used for asks and
  narrative clauses. The wizard should offer issues in this order.
- `getTemplates(locale)` / `templateFiles` in `templates/index.ts` — the
  template registry (used by tests and the translation task).
- `KitView` in `src/components/kit/KitView.tsx` — stub renderer; props are
  `{ kit: ComplaintKit }`.

Both `KitOptions` fields default to `'en'`. Outgoing messages render in
`outgoingLocale`; when `uiLocale` differs and has templates, every message
also carries `translation` in `uiLocale` (side by side), and AG labels carry
`labelTranslation`. A missing or empty locale template falls back to English
and yields no translation field. `refundEstimate.note` and
`evidenceChecklist` are user-facing: they render in `uiLocale` with English
fallback.

## How wording stays honest

- Legal structure (basis, settled, floor) is decided in `generate.ts` from
  `src/data/law.ts`. Templates own words only, so a translation can never
  change what the law is claimed to say.
- The only quoted statute text in any message is `ctx.refundQuote`: the
  generator copies § 22599.2(a) verbatim from `law.ts` (subsection marker
  moved into the citation). Tests fail if any curly-quoted span of generated
  text is not a verbatim substring of `law.ts`.
- Argued asks (`wrong_items`, `missing_items`, `unusable_items`) are worded
  as the customer's firm claim, always carry `settled: false` and a floor
  (§ 22599.2(d)), and every message that makes the claim states the floor.
  Missing items always mention the option to lower the tip.
- `not_covered` (late, cold, poor quality) never cites a section. Neither
  does `refund_denied` unless a delivery issue supplies the basis.
- Every refund-claiming message demands the original payment method, not app
  credit (§ 22599.2(e)).
- Generated text never contains an em dash (U+2014) and never mentions or
  asks for Social Security numbers or bank account numbers. Both are tested
  over every string in the kit.
- The generator is deterministic: no clocks, no randomness. The demand
  letter carries `[Date]` and, without contact info, bracketed placeholders.

## Translation task notes

Add `src/lib/complaint/templates/<locale>.ts` exporting
`<locale>Templates: Partial<ComplaintTemplates>` (see `types.ts` there),
then register it in `templates/index.ts`. Rules enforced by
`tests/unit/complaint-templates.test.ts`:

- keys must exist in the English template (per-key fallback to English);
- `askRequest` and `issueClause`, if present, must cover every issue;
- `askFallback`, if present, must cover the three argued issues;
- no em dashes anywhere;
- keep `ctx.refundQuote` (the statute) in English beside your translation,
  labeled an unofficial translation; `ctx.ruleGlosses` are English too.

## Tests

- `tests/unit/complaint.test.ts` — issue × platform matrix, refund statuses,
  missing optional fields, side-by-side output, floors, honesty scans.
- `tests/unit/complaint-snapshots.test.ts` — English output snapshots for
  canonical incidents.
- `tests/unit/complaint-templates.test.ts` — template structure and
  fallback, picks up new locale files automatically.
