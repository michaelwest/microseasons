import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { StoredDescription } from "@/lib/types";

function getDataDir() {
  return process.env.MICROSEASONS_DATA_DIR ?? path.join(process.cwd(), "data");
}

function getEntriesPath() {
  return path.join(getDataDir(), "entries.json");
}

async function ensureStore() {
  const dataDir = getDataDir();
  const entriesPath = getEntriesPath();

  await mkdir(dataDir, { recursive: true });

  try {
    await readFile(entriesPath, "utf8");
  } catch {
    await writeFile(entriesPath, "[]\n", "utf8");
  }
}

export async function readEntries(): Promise<StoredDescription[]> {
  await ensureStore();

  const raw = await readFile(getEntriesPath(), "utf8");
  const parsed = JSON.parse(raw) as StoredDescription[];

  return parsed.sort((left, right) => right.submittedAt.localeCompare(left.submittedAt));
}

export async function appendEntry(entry: StoredDescription): Promise<void> {
  await ensureStore();

  const existing = await readEntries();
  existing.unshift(entry);
  await writeFile(getEntriesPath(), `${JSON.stringify(existing, null, 2)}\n`, "utf8");
}
