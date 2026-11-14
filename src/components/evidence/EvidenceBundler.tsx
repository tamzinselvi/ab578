import { useEffect, useRef, useState } from "preact/hooks";
import {
  buildEvidencePdf,
  formatBytes,
  type BuiltEvidencePdf,
} from "../../lib/evidence";
import { evidenceStrings as s } from "./strings";
import "./evidence.css";

export interface EvidenceBundlerProps {
  /** Platform name used in the filename, for example "DoorDash". */
  platform?: string;
  /** Incident date as YYYY-MM-DD; defaults to today when omitted. */
  date?: string;
}

interface EvidenceItem {
  id: string;
  file: File;
  caption: string;
  previewUrl: string;
}

const FILE_INPUT_ID = "evidence-file-input";

/**
 * In-browser evidence PDF bundler: pick screenshots, reorder, remove and
 * caption them, then download one PDF under the 4 MB upload limit. All work
 * happens on the device; nothing is uploaded.
 */
export default function EvidenceBundler(props: EvidenceBundlerProps) {
  const [items, setItems] = useState<EvidenceItem[]>([]);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState("");
  const [result, setResult] = useState<BuiltEvidencePdf | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  // Every object URL ever created, so unmount can release them all.
  const objectUrls = useRef<Set<string>>(new Set());

  useEffect(
    () => () => {
      for (const url of objectUrls.current) URL.revokeObjectURL(url);
      objectUrls.current.clear();
    },
    [],
  );

  const trackObjectUrl = (file: File): string => {
    const url = URL.createObjectURL(file);
    objectUrls.current.add(url);
    return url;
  };

  const addFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setItems((current) => [
      ...current,
      ...Array.from(files, (file) => ({
        id: crypto.randomUUID(),
        file,
        caption: "",
        previewUrl: trackObjectUrl(file),
      })),
    ]);
    setError(null);
  };

  const removeItem = (id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  const moveItem = (index: number, offset: -1 | 1) => {
    setItems((current) => {
      const next = [...current];
      const target = index + offset;
      if (target < 0 || target >= next.length) return current;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const setCaption = (id: string, caption: string) => {
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, caption } : item)),
    );
  };

  const build = async () => {
    if (busy || items.length === 0) return;
    setBusy(true);
    setError(null);
    setResult(null);
    setProgress(
      s.compressingProgress
        .replace("{done}", "0")
        .replace("{total}", String(items.length)),
    );
    try {
      const date = props.date ? new Date(`${props.date}T00:00:00`) : new Date();
      const built = await buildEvidencePdf(
        items.map((item) => ({ file: item.file, caption: item.caption })),
        {
          platform: props.platform ?? "",
          date: Number.isNaN(date.getTime()) ? new Date() : date,
          onProgress: (event) => {
            const template =
              event.phase === "rendering"
                ? s.compressingProgress
                : s.assemblingProgress;
            setProgress(
              template
                .replace("{done}", String(event.done))
                .replace("{total}", String(event.total)),
            );
          },
        },
      );
      if (resultUrl) URL.revokeObjectURL(resultUrl);
      const url = URL.createObjectURL(built.blob);
      objectUrls.current.add(url);
      setResultUrl(url);
      setResult(built);
    } catch (cause) {
      setError(
        cause instanceof Error && cause.message.length > 0
          ? `${s.buildFailed} (${cause.message})`
          : s.buildFailed,
      );
    } finally {
      setBusy(false);
      setProgress("");
    }
  };

  return (
    <section class="evidence" aria-labelledby="evidence-heading">
      <h2 id="evidence-heading">{s.heading}</h2>
      <p class="evidence-intro">{s.intro}</p>

      <label class="evidence-add button" htmlFor={FILE_INPUT_ID}>
        {items.length === 0 ? s.addImages : s.addMore}
        <input
          id={FILE_INPUT_ID}
          class="evidence-file-input"
          type="file"
          accept="image/jpeg,image/png,image/heic,image/heif"
          multiple
          onChange={(event) => {
            addFiles(event.currentTarget.files);
            event.currentTarget.value = "";
          }}
        />
      </label>
      {items.length === 0 && <p class="evidence-hint">{s.emptyHint}</p>}

      {items.length > 0 && (
        <>
          <p class="evidence-count" data-evidence-count={items.length}>
            {s.imageCount.replace("{count}", String(items.length))}
          </p>
          <ol class="evidence-list">
            {items.map((item, index) => (
              <li class="evidence-item" key={item.id}>
                <img
                  class="evidence-thumb"
                  src={item.previewUrl}
                  alt=""
                  loading="lazy"
                />
                <div class="evidence-item-body">
                  <p class="evidence-item-name">{item.file.name}</p>
                  <label class="evidence-caption-label">
                    <span class="evidence-caption-label-text">
                      {s.captionLabel.replace("{name}", item.file.name)}
                    </span>
                    <input
                      class="evidence-caption-input"
                      type="text"
                      value={item.caption}
                      placeholder={s.captionPlaceholder}
                      onInput={(event) =>
                        setCaption(item.id, event.currentTarget.value)
                      }
                    />
                  </label>
                  <p class="evidence-caption-hint">{s.captionHint}</p>
                </div>
                <div class="evidence-item-actions">
                  <button
                    type="button"
                    class="evidence-move"
                    aria-label={s.moveEarlier.replace("{name}", item.file.name)}
                    disabled={index === 0 || busy}
                    onClick={() => moveItem(index, -1)}
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    class="evidence-move"
                    aria-label={s.moveLater.replace("{name}", item.file.name)}
                    disabled={index === items.length - 1 || busy}
                    onClick={() => moveItem(index, 1)}
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    class="evidence-remove"
                    aria-label={s.removeImage.replace("{name}", item.file.name)}
                    disabled={busy}
                    onClick={() => removeItem(item.id)}
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ol>
        </>
      )}

      {items.length > 0 && (
        <button
          type="button"
          class="evidence-build button"
          disabled={busy}
          onClick={() => void build()}
        >
          {busy ? s.building : s.build}
        </button>
      )}

      {busy && (
        <p class="evidence-progress" role="status">
          {progress}
        </p>
      )}

      {error && (
        <p class="evidence-error" role="alert">
          {error}
        </p>
      )}

      {result && (
        <div
          class="evidence-result"
          role="status"
          data-evidence-pages={result.pages}
          data-evidence-bytes={result.bytes}
        >
          <h3>{s.resultHeading}</h3>
          <p>
            {s.resultPages.replace("{pages}", String(result.pages))} ·{" "}
            {s.resultSize.replace("{size}", formatBytes(result.bytes))}
          </p>
          {result.overBudget && (
            <p class="evidence-overbudget" role="alert">
              {s.overBudgetWarning}
            </p>
          )}
          {result.skipped.length > 0 && (
            <p class="evidence-skipped">
              {s.skippedFiles.replace("{names}", result.skipped.join(", "))}
            </p>
          )}
          {resultUrl && (
            <a
              class="evidence-download button"
              href={resultUrl}
              download={result.filename}
            >
              {s.download.replace("{filename}", result.filename)}
            </a>
          )}
        </div>
      )}
    </section>
  );
}
