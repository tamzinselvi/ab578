/**
 * The one-click handoff between the kit and the AG form.
 *
 * The kit saves the AG answers (and, once built, the evidence PDF) on this
 * device. The fill-the-form bookmark, clicked on the AG page, opens this
 * site's /agfill page in a small popup. That page reads the saved handoff and
 * posts it to window.opener with the AG's exact origin as the target, so no
 * other site can receive it. Nothing is ever sent to a server.
 *
 * Answers live in localStorage; the PDF lives in IndexedDB (too large for
 * localStorage). Both expire after HANDOFF_TTL_MS and are removed by
 * "Clear my data".
 */

export const HANDOFF_ANSWERS_KEY = "ab578.agfill.answers";
export const HANDOFF_TTL_MS = 2 * 60 * 60 * 1000;
/** The only origin the handoff page will post to. */
export const AG_ORIGIN = "https://oag.ca.gov";
/** Message type shared by the handoff page and the bookmark. */
export const HANDOFF_MESSAGE_TYPE = "ab578-agfill";

const DB_NAME = "ab578";
const DB_STORE = "handoff";
const EVIDENCE_KEY = "evidence";

export interface HandoffEvidence {
  name: string;
  bytes: ArrayBuffer;
  savedAt: number;
}

export interface HandoffAnswers {
  v: 1;
  savedAt: number;
  pairs: [string, string][];
}

/** What the handoff page posts to the AG page. */
export interface HandoffMessage {
  type: typeof HANDOFF_MESSAGE_TYPE;
  v: 1;
  pairs?: [string, string][];
  evidence?: { name: string; bytes: ArrayBuffer } | null;
  error?: "no-data";
}

type KeyValueStore = Pick<Storage, "getItem" | "setItem" | "removeItem">;

function defaultStore(): KeyValueStore | null {
  try {
    return typeof localStorage === "undefined" ? null : localStorage;
  } catch {
    return null;
  }
}

export function saveHandoffAnswers(
  pairs: [string, string][],
  now = Date.now(),
  store: KeyValueStore | null = defaultStore(),
): void {
  if (!store) return;
  const record: HandoffAnswers = { v: 1, savedAt: now, pairs };
  try {
    store.setItem(HANDOFF_ANSWERS_KEY, JSON.stringify(record));
  } catch {
    // Storage full or blocked: the paste fallback still works.
  }
}

export function loadHandoffAnswers(
  now = Date.now(),
  store: KeyValueStore | null = defaultStore(),
): HandoffAnswers | null {
  if (!store) return null;
  let record: HandoffAnswers | null;
  try {
    const raw = store.getItem(HANDOFF_ANSWERS_KEY);
    record = raw ? (JSON.parse(raw) as HandoffAnswers) : null;
  } catch {
    record = null;
  }
  if (
    !record ||
    record.v !== 1 ||
    !Array.isArray(record.pairs) ||
    typeof record.savedAt !== "number"
  ) {
    return null;
  }
  if (now - record.savedAt > HANDOFF_TTL_MS || now < record.savedAt) {
    try {
      store.removeItem(HANDOFF_ANSWERS_KEY);
    } catch {
      // Ignore.
    }
    return null;
  }
  return record;
}

function openDb(): Promise<IDBDatabase | null> {
  if (typeof indexedDB === "undefined") return Promise.resolve(null);
  return new Promise((resolve) => {
    try {
      const request = indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = () => {
        if (!request.result.objectStoreNames.contains(DB_STORE)) {
          request.result.createObjectStore(DB_STORE);
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => resolve(null);
      request.onblocked = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

async function withStore<T>(
  mode: IDBTransactionMode,
  run: (store: IDBObjectStore) => IDBRequest<T> | null,
): Promise<T | null> {
  const db = await openDb();
  if (!db) return null;
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(DB_STORE, mode);
      const request = run(tx.objectStore(DB_STORE));
      tx.oncomplete = () => {
        db.close();
        resolve(request ? (request.result ?? null) : null);
      };
      tx.onerror = () => {
        db.close();
        resolve(null);
      };
      tx.onabort = () => {
        db.close();
        resolve(null);
      };
    } catch {
      db.close();
      resolve(null);
    }
  });
}

export async function saveHandoffEvidence(
  blob: Blob,
  name: string,
  now = Date.now(),
): Promise<void> {
  const bytes = await blob.arrayBuffer();
  const record: HandoffEvidence = { name, bytes, savedAt: now };
  await withStore("readwrite", (store) => store.put(record, EVIDENCE_KEY));
}

export async function loadHandoffEvidence(
  now = Date.now(),
): Promise<HandoffEvidence | null> {
  const record = await withStore<HandoffEvidence>("readonly", (store) =>
    store.get(EVIDENCE_KEY),
  );
  if (!record || !(record.bytes instanceof ArrayBuffer)) return null;
  if (now - record.savedAt > HANDOFF_TTL_MS || now < record.savedAt) {
    await withStore("readwrite", (store) => store.delete(EVIDENCE_KEY));
    return null;
  }
  return record;
}

/** Remove everything the handoff saved. Backs "Clear my data". */
export function clearHandoff(
  store: KeyValueStore | null = defaultStore(),
): void {
  try {
    store?.removeItem(HANDOFF_ANSWERS_KEY);
  } catch {
    // Ignore.
  }
  void withStore("readwrite", (s) => s.delete(EVIDENCE_KEY));
}

/** Build the message the handoff page posts to the AG page. */
export async function buildHandoffMessage(
  now = Date.now(),
): Promise<HandoffMessage> {
  const answers = loadHandoffAnswers(now);
  if (!answers) {
    return { type: HANDOFF_MESSAGE_TYPE, v: 1, error: "no-data" };
  }
  const evidence = await loadHandoffEvidence(now);
  return {
    type: HANDOFF_MESSAGE_TYPE,
    v: 1,
    pairs: answers.pairs,
    evidence: evidence ? { name: evidence.name, bytes: evidence.bytes } : null,
  };
}
