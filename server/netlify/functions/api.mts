// Pharma Detective — results server.
// Students' games POST their session snapshot here; the instructor dashboard reads them back with a key.
//   POST   /api/submit                    open: save/overwrite one student's snapshot (latest wins)
//   GET    /api/health                    open: liveness check
//   GET    /api/sessions?class=&offset=    instructor key: list snapshots (paged)
//   DELETE /api/sessions?class=&id=        instructor key: delete one snapshot, or a whole class
// The game is served from GitHub Pages (and sometimes opened as a local file), so every
// response carries CORS headers for any origin. Nothing here uses cookies.
import { getStore } from "@netlify/blobs";
import type { Config, Context } from "@netlify/functions";
import { timingSafeEqual } from "node:crypto";

const CORS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, X-Teacher-Key",
  "Access-Control-Max-Age": "86400",
};
const MAX_BODY = 1_500_000;   // one snapshot is ~20–60 KB; refuse anything absurd
const PAGE = 60;              // snapshots per GET page (keeps responses well under 6 MB)

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS, "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });

const cleanClass = (s: unknown) =>
  String(s ?? "").trim().toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 40) || "main";
const cleanId = (s: unknown) => String(s ?? "").replace(/[^A-Za-z0-9_-]/g, "").slice(0, 64);

function keyOk(given: string, secret: string) {
  if (!secret || !given) return false;
  const a = Buffer.from(given), b = Buffer.from(secret);
  return a.length === b.length && timingSafeEqual(a, b);
}

const sessions = () => getStore({ name: "sessions", consistency: "strong" });

async function submit(req: Request, url: URL) {
  const text = await req.text();
  if (text.length > MAX_BODY) return json({ ok: false, error: "too_large" }, 413);
  let s: any;
  try { s = JSON.parse(text); } catch { return json({ ok: false, error: "bad_json" }, 400); }
  if (!s || typeof s !== "object" || Array.isArray(s)) return json({ ok: false, error: "bad_json" }, 400);
  const id = cleanId(s.id);
  if (!id) return json({ ok: false, error: "no_id" }, 400);
  const cls = cleanClass(s.classCode ?? url.searchParams.get("class"));
  s.id = id;
  s.classCode = cls;
  s.serverAt = new Date().toISOString();
  const key = `${cls}/${id}`;
  const store = sessions();
  // A slow, older request must not overwrite a newer snapshot of the same game.
  const prev = await store.getMetadata(key);
  const prevUpdated = String(prev?.metadata?.updated ?? "");
  if (prevUpdated && s.updated && prevUpdated > String(s.updated)) return json({ ok: true, stale: true });
  await store.setJSON(key, s, {
    metadata: {
      updated: String(s.updated ?? ""),
      name: String(s.student?.name ?? "").slice(0, 60),
      sid: String(s.student?.sid ?? "").slice(0, 40),
      done: !!s.done,
    },
  });
  return json({ ok: true, key });
}

async function list(url: URL) {
  const cls = url.searchParams.get("class");
  const offset = Math.max(0, parseInt(url.searchParams.get("offset") || "0", 10) || 0);
  const store = sessions();
  const { blobs } = await store.list(cls ? { prefix: cleanClass(cls) + "/" } : {});
  const keys = blobs.map((b) => b.key).sort();
  const classes: Record<string, number> = {};
  for (const k of keys) { const c = k.split("/")[0]; classes[c] = (classes[c] || 0) + 1; }
  const slice = keys.slice(offset, offset + PAGE);
  const out = (await Promise.all(slice.map((k) => store.get(k, { type: "json" })))).filter(Boolean);
  const next = offset + PAGE < keys.length ? offset + PAGE : null;
  return json({ ok: true, total: keys.length, offset, next, classes, sessions: out });
}

async function remove(url: URL) {
  const cls = url.searchParams.get("class");
  const id = cleanId(url.searchParams.get("id"));
  if (!cls) return json({ ok: false, error: "class_required" }, 400);
  const store = sessions();
  if (id) { await store.delete(`${cleanClass(cls)}/${id}`); return json({ ok: true, deleted: 1 }); }
  const { blobs } = await store.list({ prefix: cleanClass(cls) + "/" });
  await Promise.all(blobs.map((b) => store.delete(b.key)));
  return json({ ok: true, deleted: blobs.length });
}

export default async (req: Request, context: Context) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  const url = new URL(req.url);
  const route = context.params.route;
  try {
    if (route === "health") return json({ ok: true, time: new Date().toISOString() });
    if (route === "submit" && req.method === "POST") return await submit(req, url);
    if (route === "sessions") {
      if (!keyOk(req.headers.get("x-teacher-key") || "", Netlify.env.get("TEACHER_KEY") || ""))
        return json({ ok: false, error: "unauthorized" }, 401);
      if (req.method === "GET") return await list(url);
      if (req.method === "DELETE") return await remove(url);
    }
    return json({ ok: false, error: "not_found" }, 404);
  } catch (e) {
    console.error("api error", route, e);
    return json({ ok: false, error: "server_error" }, 500);
  }
};

export const config: Config = { path: "/api/:route" };
