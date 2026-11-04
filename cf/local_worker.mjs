// Run the real Worker locally: D1 is replaced by node:sqlite with the same call shapes.
// usage: node local_worker.mjs PORT path/to/src/index.js [dbfile]
import http from "node:http";
import { DatabaseSync } from "node:sqlite";
import { pathToFileURL } from "node:url";

const [port = "8787", workerPath, dbFile = ":memory:"] = process.argv.slice(2);
const sql = new DatabaseSync(dbFile);
class Stmt {
  constructor(q) { this.q = q; this.args = []; }
  bind(...a) { a.forEach((v) => { if (v === undefined || typeof v === "boolean") throw new Error("D1_TYPE_ERROR: bad bind type " + typeof v); }); this.args = a; return this; }
  async run() { const r = sql.prepare(this.q).run(...this.args); return { success: true, meta: { changes: Number(r.changes) } }; }
  async all() { return { success: true, results: sql.prepare(this.q).all(...this.args).map((r) => ({ ...r })), meta: {} }; }
  async first(col) { const r = sql.prepare(this.q).get(...this.args); return r ? (col ? r[col] : { ...r }) : null; }
}
const DB = {
  prepare: (q) => new Stmt(q),
  async batch(list) { sql.exec("BEGIN"); try { const out = []; for (const s of list) out.push(await s.run()); sql.exec("COMMIT"); return out; } catch (e) { sql.exec("ROLLBACK"); throw e; } },
};
const env = { DB, TEACHER_KEY: process.env.TEACHER_KEY ?? "TEST-KEY" };
const worker = (await import(pathToFileURL(workerPath).href)).default;

http.createServer(async (req, res) => {
  const chunks = []; for await (const c of req) chunks.push(c);
  const body = chunks.length ? Buffer.concat(chunks) : undefined;
  const request = new Request(`http://localhost:${port}${req.url}`, { method: req.method, headers: req.headers, body: ["GET", "HEAD", "OPTIONS"].includes(req.method) ? undefined : body });
  try {
    const r = await worker.fetch(request, env, { waitUntil() {} });
    res.writeHead(r.status, Object.fromEntries(r.headers)); res.end(Buffer.from(await r.arrayBuffer()));
  } catch (e) { console.error(e); res.writeHead(500); res.end(String(e)); }
}).listen(+port, () => console.log("worker on", port));
