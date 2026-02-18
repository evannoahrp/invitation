import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, "data");
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
  const chunks = [];

  for await (const chunk of req) {
    chunks.push(chunk);
  }

  const rawBody = Buffer.concat(chunks).toString("utf8");
  return rawBody ? JSON.parse(rawBody) : {};
}

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(payload));
}

function createRsvpApiPlugin() {
  const handler = async (req, res, next) => {
    const url = new URL(req.url || "", "http://localhost");

    if (url.pathname !== "/api/rsvp") {
      next();
      return;
    }

    try {
      if (req.method === "GET") {
        const entries = await readRsvpEntries();
        const sortedEntries = [...entries].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        sendJson(res, 200, sortedEntries);
        return;
      }

      if (req.method === "POST") {
        const payload = await readBody(req);
        const entry = normalizeEntry(payload);

        if (!entry) {
          sendJson(res, 400, { message: "Name and attendance are required." });
          return;
        }

        const entries = await readRsvpEntries();
        const updatedEntries = [entry, ...entries].slice(0, 200);
        await writeRsvpEntries(updatedEntries);
        sendJson(res, 201, entry);
        return;
      }

      sendJson(res, 405, { message: "Method not allowed." });
    } catch {
      sendJson(res, 500, { message: "Failed to process RSVP request." });
    }
  };

  return {
    name: "local-rsvp-api",
    configureServer(server) {
      server.middlewares.use(handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler);
    }
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), createRsvpApiPlugin()],
  esbuild: {
    jsx: "automatic",
    jsxImportSource: "react"
  }
});
