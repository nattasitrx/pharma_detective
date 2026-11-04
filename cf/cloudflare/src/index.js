/* =====================================================================
   Pharma Detective · results & settings server (Cloudflare Worker + D1)

   Students' games send their progress here, so nobody has to download
   and hand in a report file (handy on iPads and phones). Instructors
   publish their edited version of the game here, so the students' link
   picks it up without sending anyone a new file.

   Routes (all under /api/):
     GET    health                       is the server and its database up?
     POST   submit                       a student's game snapshot (text/plain JSON)
     GET    config?class=ph2026a         published settings for a class (falls back to "all links")
     GET    sessions?class=&after=       instructor: stored games, 60 per page
     DELETE sessions?class=…[&id=…]       instructor: delete one game or a whole class
     GET    configs                      instructor: which versions are published
     PUT    config?class=…|*             instructor: publish settings (* = every link)
     DELETE config?class=…|*             instructor: withdraw a published version
   Instructor routes need the X-Teacher-Key header to match the TEACHER_KEY secret.

   Tables are created on first use, so there are no migrations to run.
   This file has no imports: it can also be pasted into the Cloudflare
   dashboard editor as it is.
   ===================================================================== */

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, X-Teacher-Key",
  "Access-Control-Max-Age": "86400",
};
const HEADERS = { ...CORS, "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" };
const PAGE = 60;                 // games per page for the instructor dashboard
const MAX_SESSION = 1_800_000;   // characters; a D1 row holds at most 2 MB
const MAX_CONFIG = 15_000_000;   // characters; settings plus uploaded pictures
const CHUNK = 600_000;           // characters per stored piece (≤ 1.8 MB in UTF-8)
const ALL = "*";                 // published for every link

const json = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: HEADERS });
const raw = (text, status = 200) => new Response(text, { status, headers: HEADERS });
const cleanClass = (s) => String(s ?? "").trim().toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 40) || "main";
const cleanId = (s) => String(s ?? "").replace(/[^A-Za-z0-9_-]/g, "").slice(0, 64);
const targetClass = (s) => { const t = String(s ?? "").trim().toLowerCase(); return t === "*" || t === "all" || t === "" ? ALL : cleanClass(t); };

function keyOk(given, secret) {
  if (!given || !secret) return false;
  const enc = new TextEncoder(), a = enc.encode(given), b = enc.encode(secret);
  if (a.length !== b.length) return false;
  if (crypto.subtle && crypto.subtle.timingSafeEqual) return crypto.subtle.timingSafeEqual(a, b);
  let d = 0; for (let i = 0; i < a.length; i++) d |= a[i] ^ b[i]; return d === 0;
}

/* split text into pieces without cutting a surrogate pair in half */
function chunks(text) {
  const out = []; let i = 0;
  while (i < text.length) {
    let j = Math.min(text.length, i + CHUNK);
    if (j < text.length) { const c = text.charCodeAt(j - 1); if (c >= 0xd800 && c <= 0xdbff) j--; }
    out.push(text.slice(i, j)); i = j;
  }
  return out.length ? out : [""];
}

let ready = null;
function init(db) {
  if (!ready) {
    ready = db.batch([
      db.prepare(`CREATE TABLE IF NOT EXISTS sessions (cls TEXT NOT NULL, id TEXT NOT NULL, updated TEXT NOT NULL DEFAULT '', name TEXT, sid TEXT,
        done INTEGER NOT NULL DEFAULT 0, server_at TEXT, data TEXT NOT NULL, PRIMARY KEY (cls, id))`),
      db.prepare(`CREATE TABLE IF NOT EXISTS configs (cls TEXT NOT NULL, part INTEGER NOT NULL, rev TEXT NOT NULL, note TEXT, size INTEGER,
        data TEXT NOT NULL, PRIMARY KEY (cls, part))`),
    ]).catch((e) => { ready = null; throw e; });
  }
  return ready;
}

/* ---------- students ---------- */
async function submit(req, url, db) {
  const text = await req.text();
  if (text.length > MAX_SESSION) return json({ ok: false, error: "too_large" }, 413);
  let s; try { s = JSON.parse(text); } catch { return json({ ok: false, error: "bad_json" }, 400); }
  if (!s || typeof s !== "object" || Array.isArray(s)) return json({ ok: false, error: "bad_json" }, 400);
  const id = cleanId(s.id); if (!id) return json({ ok: false, error: "no_id" }, 400);
  const cls = cleanClass(s.classCode ?? url.searchParams.get("class"));
  s.classCode = cls; s.serverAt = new Date().toISOString();
  const st = s.student && typeof s.student === "object" ? s.student : {};
  const r = await db.prepare(`INSERT INTO sessions (cls, id, updated, name, sid, done, server_at, data) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)
      ON CONFLICT (cls, id) DO UPDATE SET updated = excluded.updated, name = excluded.name, sid = excluded.sid, done = excluded.done,
        server_at = excluded.server_at, data = excluded.data
      WHERE excluded.updated >= sessions.updated`)
    .bind(cls, id, String(s.updated || ""), String(st.name || "").slice(0, 80), String(st.sid || "").slice(0, 40), s.done ? 1 : 0, s.serverAt, JSON.stringify(s))
    .run();
  const changes = r && r.meta && typeof r.meta.changes === "number" ? r.meta.changes : 1;
  return json({ ok: true, key: `${cls}/${id}`, stale: changes === 0 });
}

async function getConfig(url, db) {
  const want = cleanClass(url.searchParams.get("class"));
  const exact = url.searchParams.get("exact") === "1";
  const look = exact ? [targetClass(url.searchParams.get("class"))] : [want, ALL];
  const { results } = await db.prepare(`SELECT cls, part, rev, note, data FROM configs WHERE cls IN (?1, ?2) ORDER BY part`)
    .bind(look[0], look[1] ?? look[0]).all();
  const pick = look.find((c) => results.some((r) => r.cls === c));
  if (!pick) return json({ ok: true, cls: null, rev: null, note: null, config: null });
  const rows = results.filter((r) => r.cls === pick);
  return raw(`{"ok":true,"cls":${JSON.stringify(pick)},"rev":${JSON.stringify(rows[0].rev)},"note":${JSON.stringify(rows[0].note || "")},"config":${rows.map((r) => r.data).join("")}}`);
}

/* ---------- instructors ---------- */
async function listSessions(url, db) {
  const cls = url.searchParams.get("class");
  const after = String(url.searchParams.get("after") || url.searchParams.get("offset") || "");
  const cut = after.indexOf("/");
  const binds = [], where = [];
  if (cls) { binds.push(cleanClass(cls)); where.push(`cls = ?${binds.length}`); }
  if (cut > 0) { binds.push(after.slice(0, cut), after.slice(cut + 1)); where.push(`(cls, id) > (?${binds.length - 1}, ?${binds.length})`); }
  const { results } = await db.prepare(`SELECT cls, id, data FROM sessions ${where.length ? "WHERE " + where.join(" AND ") : ""} ORDER BY cls, id LIMIT ${PAGE + 1}`)
    .bind(...binds).all();
  const more = results.length > PAGE, page = results.slice(0, PAGE), last = page[page.length - 1];
  let classes = null;
  if (cut <= 0) {   // first page: also say how many games each class has
    const c = await db.prepare(`SELECT cls, COUNT(*) AS n FROM sessions GROUP BY cls`).all();
    classes = {}; c.results.forEach((r) => { classes[r.cls] = r.n; });
  }
  const next = more && last ? `${last.cls}/${last.id}` : null;
  return raw(`{"ok":true,"next":${JSON.stringify(next)},${classes ? `"classes":${JSON.stringify(classes)},` : ""}"sessions":[${page.map((r) => r.data).join(",")}]}`);
}

async function deleteSessions(url, db) {
  const c = url.searchParams.get("class"); if (!c) return json({ ok: false, error: "no_class" }, 400);
  const cls = cleanClass(c), id = cleanId(url.searchParams.get("id"));
  const r = id ? await db.prepare(`DELETE FROM sessions WHERE cls = ?1 AND id = ?2`).bind(cls, id).run()
               : await db.prepare(`DELETE FROM sessions WHERE cls = ?1`).bind(cls).run();
  return json({ ok: true, deleted: (r.meta && r.meta.changes) || 0 });
}

async function listConfigs(db) {
  const { results } = await db.prepare(`SELECT cls, rev, note, size FROM configs WHERE part = 0 ORDER BY cls`).all();
  return json({ ok: true, configs: results.map((r) => ({ cls: r.cls, rev: r.rev, note: r.note || "", size: r.size || 0 })) });
}

async function putConfig(req, url, db) {
  const text = (await req.text()).trim();
  if (text.length > MAX_CONFIG) return json({ ok: false, error: "too_large" }, 413);
  if (!text.startsWith("{") || !text.endsWith("}")) return json({ ok: false, error: "bad_json" }, 400);
  const cls = targetClass(url.searchParams.get("class")), rev = new Date().toISOString();
  const note = String(url.searchParams.get("note") || "").slice(0, 120);
  const parts = chunks(text);
  await db.batch([
    db.prepare(`DELETE FROM configs WHERE cls = ?1`).bind(cls),
    ...parts.map((p, i) => db.prepare(`INSERT INTO configs (cls, part, rev, note, size, data) VALUES (?1, ?2, ?3, ?4, ?5, ?6)`).bind(cls, i, rev, note, i ? 0 : text.length, p)),
  ]);
  return json({ ok: true, cls, rev, size: text.length, parts: parts.length });
}

async function deleteConfig(url, db) {
  const cls = targetClass(url.searchParams.get("class"));
  const r = await db.prepare(`DELETE FROM configs WHERE cls = ?1`).bind(cls).run();
  return json({ ok: true, cls, deleted: (r.meta && r.meta.changes) ? 1 : 0 });
}

const HOME = `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Pharma Detective server</title>
<body style="font-family:system-ui,sans-serif;max-width:560px;margin:60px auto;padding:0 16px;line-height:1.6;color:#2a2140;background:#fff">
<h1 style="font-size:22px">🕵️ Pharma Detective · results server</h1><p>This address only stores game results and the instructor's published settings. To play, open the game:</p>
<p><a href="https://nattasitrx.github.io/pharma_detective/">nattasitrx.github.io/pharma_detective</a></p></body>`;

export default {
  async fetch(req, env) {
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
    const url = new URL(req.url);
    const m = url.pathname.match(/^\/api\/([a-z]+)\/?$/);
    if (!m) return url.pathname === "/" ? new Response(HOME, { headers: { "Content-Type": "text/html; charset=utf-8" } }) : json({ ok: false, error: "not_found" }, 404);
    const route = m[1], db = env.DB;
    try {
      if (route === "health") {
        let dbOk = false; if (db) { try { await init(db); dbOk = true; } catch (e) { console.error("db init", e); } }
        return json({ ok: dbOk, time: new Date().toISOString(), db: dbOk, keySet: !!env.TEACHER_KEY });
      }
      if (!db) return json({ ok: false, error: "no_database" }, 503);
      await init(db);
      if (route === "submit" && req.method === "POST") return await submit(req, url, db);
      if (route === "config" && req.method === "GET") return await getConfig(url, db);
      const teacherRoutes = { sessions: ["GET", "DELETE"], configs: ["GET"], config: ["PUT", "DELETE"] };
      if (teacherRoutes[route] && teacherRoutes[route].includes(req.method)) {
        if (!keyOk(req.headers.get("x-teacher-key") || "", env.TEACHER_KEY || "")) return json({ ok: false, error: env.TEACHER_KEY ? "unauthorized" : "no_key_set" }, 401);
        if (route === "sessions") return req.method === "GET" ? await listSessions(url, db) : await deleteSessions(url, db);
        if (route === "configs") return await listConfigs(db);
        return req.method === "PUT" ? await putConfig(req, url, db) : await deleteConfig(url, db);
      }
      return json({ ok: false, error: "not_found" }, 404);
    } catch (e) {
      console.error("api error", route, e && e.stack || e);
      return json({ ok: false, error: "server_error" }, 500);
    }
  },
};
