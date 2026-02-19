import fs from "node:fs/promises";
import path from "node:path";

const MAX_ENTRIES = 200;
const DATA_DIR = process.env.VERCEL ? "/tmp/invitation-data" : path.join(process.cwd(), "data");
const RSVP_FILE = path.join(DATA_DIR, "rsvp.json");

async function ensureStorageFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });

  try {
    await fs.access(RSVP_FILE);
  } catch {
    await fs.writeFile(RSVP_FILE, "[]", "utf8");
  }
}

async function readRsvpEntries() {
  await ensureStorageFile();

  try {
    const raw = await fs.readFile(RSVP_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeRsvpEntries(entries) {
  await ensureStorageFile();
  await fs.writeFile(RSVP_FILE, JSON.stringify(entries, null, 2), "utf8");
}

function normalizeEntry(input) {
  const name = String(input?.name || "").trim();
  const attendance = String(input?.attendance || "").trim();
  const message = String(input?.message || "").trim();

  if (!name || !attendance) {
    return null;
  }

  return {
    id: Date.now(),
    name,
    attendance,
    message,
    createdAt: new Date().toISOString()
  };
}

async function readBody(req) {
  if (req.body && typeof req.body === "object") {
    return req.body;
  }

  if (typeof req.body === "string" && req.body.trim()) {
    return JSON.parse(req.body);
  }

  const chunks = [];

  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  if (chunks.length === 0) {
    return {};
  }

  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function sendJson(res, statusCode, payload) {
  if (typeof res.status === "function" && typeof res.json === "function") {
    res.setHeader("Cache-Control", "no-store");
    return res.status(statusCode).json(payload);
  }

  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  return res.end(JSON.stringify(payload));
}

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const entries = await readRsvpEntries();
      const sortedEntries = [...entries].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return sendJson(res, 200, sortedEntries);
    }

    if (req.method === "POST") {
      const payload = await readBody(req);
      const entry = normalizeEntry(payload);

      if (!entry) {
        return sendJson(res, 400, { message: "Name and attendance are required." });
      }

      const entries = await readRsvpEntries();
      const updatedEntries = [entry, ...entries].slice(0, MAX_ENTRIES);
      await writeRsvpEntries(updatedEntries);
      return sendJson(res, 201, entry);
    }

    res.setHeader("Allow", "GET, POST");
    return sendJson(res, 405, { message: "Method not allowed." });
  } catch {
    return sendJson(res, 500, { message: "Failed to process RSVP request." });
  }
}
