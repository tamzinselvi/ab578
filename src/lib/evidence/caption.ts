/**
 * Caption line wrapping for drawing captions onto a canvas.
 *
 * Pure apart from an injected text measurer, so unit tests can pass a fake
 * measure function. Handles scripts that break at spaces (English,
 * Vietnamese) and scripts that break anywhere (Chinese, Korean): a single
 * unbreakable run longer than the line is split per character.
 */

/**
 * Split `text` into lines that each measure at most `maxWidth`.
 *
 * `measure` returns the rendered width of a string (for example
 * `ctx.measureText(s).width`). Leading and trailing whitespace is dropped,
 * so an all-whitespace caption wraps to no lines at all.
 */
export function wrapCaptionLines(
  text: string,
  maxWidth: number,
  measure: (line: string) => number,
): string[] {
  const lines: string[] = [];
  const usable = Math.max(1, maxWidth);
  let current = "";

  const flush = () => {
    if (current.length > 0) {
      lines.push(current);
      current = "";
    }
  };

  for (const word of text.split(/\s+/)) {
    if (word.length === 0) continue;
    if (measure(word) <= usable) {
      const candidate = current.length === 0 ? word : `${current} ${word}`;
      if (measure(candidate) <= usable) {
        current = candidate;
      } else {
        flush();
        current = word;
      }
    } else {
      // One unbreakable run (typical for CJK without spaces, or one very
      // long token): split it across lines character by character.
      if (current.length > 0 && measure(`${current} ${word}`) > usable) {
        flush();
      } else if (current.length > 0) {
        current += " ";
      }
      // Split the run across lines character by character, starting a new
      // line whenever the current one can no longer fit the next character.
      for (const char of word) {
        if (current.length > 0 && measure(current + char) > usable) {
          flush();
        }
        current += char;
      }
    }
  }
  flush();
  return lines;
}
