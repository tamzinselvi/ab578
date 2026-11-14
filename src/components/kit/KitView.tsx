import type { ComplaintKit } from "../../lib/complaint/types";

/**
 * Kit stub: renders a ComplaintKit as plain, copyable sections in the DOM.
 *
 * This is the stable render contract the wizard and kit tasks build against:
 * given a kit, every outgoing message is visible as text a user can select
 * and copy. The kit task replaces the internals (cards, copy buttons, i18n
 * labels, the evidence bundler hook) without changing the props.
 */
export default function KitView({ kit }: { kit: ComplaintKit }) {
  return (
    <article class="kit">
      <section class="kit-asks">
        <h2>What to ask for</h2>
        <ul>
          {kit.asks.map((ask) => (
            <li key={ask.issue}>
              {ask.request}
              {ask.basis ? ` (${ask.basis})` : null}
              {ask.settled ? null : " (our reading of the law)"}
              {ask.fallback ? <small>At minimum: {ask.fallback}</small> : null}
            </li>
          ))}
        </ul>
        {kit.refundEstimate ? <p>{kit.refundEstimate.note}</p> : null}
      </section>

      <section class="kit-platform-request">
        <h2>Send this to the platform</h2>
        <h3>Short version (chat)</h3>
        <p>{kit.platformRequest.short.text}</p>
        {kit.platformRequest.short.translation ? (
          <p>{kit.platformRequest.short.translation}</p>
        ) : null}
        <h3>Long version (email or web form)</h3>
        <p>{kit.platformRequest.long.text}</p>
        {kit.platformRequest.long.translation ? (
          <p>{kit.platformRequest.long.translation}</p>
        ) : null}
        {kit.platformRequest.supportUrl ? (
          <p>
            <a
              href={kit.platformRequest.supportUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open support
            </a>
          </p>
        ) : null}
        <ul>
          {kit.platformRequest.humanTips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </section>

      <section class="kit-ag-form">
        <h2>California Attorney General complaint</h2>
        <p>
          <a
            href={kit.agForm.formUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open the form
          </a>
        </p>
        <dl>
          {kit.agForm.fields.map((field, index) => (
            <div key={`${field.label}-${index}`}>
              <dt>
                {field.label}
                {field.labelTranslation ? ` (${field.labelTranslation})` : null}
              </dt>
              <dd>{field.value.text}</dd>
              {field.value.translation ? (
                <dd>{field.value.translation}</dd>
              ) : null}
            </div>
          ))}
        </dl>
      </section>

      <section class="kit-demand-letter">
        <h2>Small-claims demand letter</h2>
        <pre>{kit.demandLetter.text}</pre>
        {kit.demandLetter.translation ? (
          <pre>{kit.demandLetter.translation}</pre>
        ) : null}
      </section>

      <section class="kit-evidence">
        <h2>Evidence checklist</h2>
        <ul>
          {kit.evidenceChecklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section class="kit-destinations">
        <h2>Where else to complain</h2>
        <ul>
          {kit.otherDestinations.map((destination) => (
            <li key={destination.id}>
              <a
                href={destination.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {destination.name}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section class="kit-citations">
        <h2>The law behind this</h2>
        <ul>
          {kit.citations.map((citation) => (
            <li key={citation.id}>
              <a
                href={citation.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {citation.section}
              </a>
              {citation.argued ? " (our reading)" : ""}
              {citation.floorSection
                ? `, floor at ${citation.floorSection}`
                : ""}
              , verified {citation.verifiedOn}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
