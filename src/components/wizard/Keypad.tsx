interface Props {
  /** Called with a digit, "." or "del". */
  onKey: (key: string) => void;
  /** Resolved i18n labels: group label and the delete key's name. */
  groupLabel: string;
  deleteLabel: string;
}

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "del"];

/**
 * On-screen numeric keypad for the order total. The paired text input stays
 * the accessible source of truth; the keypad only feeds it key events, so
 * keyboard and screen-reader users never depend on it.
 */
export default function Keypad({ onKey, groupLabel, deleteLabel }: Props) {
  return (
    <div class="wizard-keypad" role="group" aria-label={groupLabel}>
      {KEYS.map((key) =>
        key === "del" ? (
          <button
            key={key}
            type="button"
            aria-label={deleteLabel}
            onClick={() => onKey(key)}
          >
            ⌫
          </button>
        ) : (
          <button key={key} type="button" onClick={() => onKey(key)}>
            {key}
          </button>
        ),
      )}
    </div>
  );
}
