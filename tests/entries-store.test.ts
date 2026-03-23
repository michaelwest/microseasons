import { mkdtemp, readFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { appendEntry, readEntries } from "@/lib/entries-store";
import { StoredDescription } from "@/lib/types";

const originalDataDir = process.env.MICROSEASONS_DATA_DIR;

afterEach(() => {
  if (originalDataDir) {
    process.env.MICROSEASONS_DATA_DIR = originalDataDir;
    return;
  }

  delete process.env.MICROSEASONS_DATA_DIR;
});

describe("entry storage", () => {
  it("persists and returns entries in reverse chronological order", async () => {
    const tempDir = await mkdtemp(path.join(os.tmpdir(), "microseasons-"));
    process.env.MICROSEASONS_DATA_DIR = tempDir;

    const older: StoredDescription = {
      id: "older",
      description: "The cicadas have only just started.",
      submittedAt: "2026-01-10T10:00:00.000Z",
      windowId: "window-02",
      windowIndex: 1,
      japaneseTitle: "Bush warblers begin singing",
      australiaTitle: "Cicadas begin their electric chorus",
    };

    const newer: StoredDescription = {
      ...older,
      id: "newer",
      submittedAt: "2026-01-11T10:00:00.000Z",
    };

    await appendEntry(older);
    await appendEntry(newer);

    await expect(readEntries()).resolves.toEqual([newer, older]);
    await expect(readFile(path.join(tempDir, "entries.json"), "utf8")).resolves.toContain("newer");
  });
});
