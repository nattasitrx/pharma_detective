# Pharma Detective server (Cloudflare Worker + D1)

This server does two jobs for the game at https://nattasitrx.github.io/pharma_detective/ :

- **Collects results.** Students' games send their progress here, so nobody has to download and hand in a report file (handy on iPads and phones). The instructor reads everything back in the game's dashboard (☁️ Online results tab).
- **Publishes the instructor's version.** When the instructor edits the game (extra questions, text, settings, pictures) and presses **☁️ Publish to students**, the students' usual link loads that version. It can be published for every link, or for one class link such as `?class=ph2026a`.

It runs on the Cloudflare Workers free plan (no credit card). One class of about 60 students uses a few percent of the daily free limits.

## Deploy (once)

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/nattasitrx/pharma_detective/tree/cloudflare-server/cloudflare)

1. Press the button and sign in to Cloudflare (or create a free account).
2. Connect GitHub when asked. Cloudflare copies this folder into a new repository in your account and deploys it.
3. The database (`pharma-detective`) is created automatically. Its tables are created on first use, so there are no migrations to run.
4. Set the secret **`TEACHER_KEY`** (the instructor key). If the setup page does not ask for it: Worker → Settings → Variables and Secrets → Add → type **Secret**.
5. Open `https://pharma-detective-api.<your-subdomain>.workers.dev/api/health`. It should say `"ok":true` and `"keySet":true`.
6. Put that address in the game: `CONFIG.SERVER_URL` in `index.html`.

### Without the button (dashboard only)

1. Workers & Pages → Create → Start with Hello World → name it `pharma-detective-api` → Deploy → Edit code → replace everything with `src/index.js` → Deploy.
2. Storage & Databases → D1 → Create database → `pharma-detective`.
3. The Worker → Settings → Bindings → Add → D1 database → variable name **`DB`** → choose `pharma-detective`.
4. The Worker → Settings → Variables and Secrets → Add → Secret → `TEACHER_KEY`.

## API

| Route | Who | What |
|---|---|---|
| `GET /api/health` | anyone | server and database status |
| `POST /api/submit` | game | one student's game snapshot (JSON sent as `text/plain`); a newer snapshot replaces an older one |
| `GET /api/config?class=…` | game | the published version for that class, or the every-link version |
| `GET /api/sessions?class=…&after=…` | instructor | stored games, 60 per page (`next` is the cursor for the following page) |
| `DELETE /api/sessions?class=…[&id=…]` | instructor | delete one game or a whole class |
| `GET /api/configs` | instructor | which versions are published |
| `PUT /api/config?class=…\|*&note=…` | instructor | publish a version (`*` = every link) |
| `DELETE /api/config?class=…\|*` | instructor | withdraw a published version |

Instructor routes need the header `X-Teacher-Key` to match the `TEACHER_KEY` secret. To change the key, change the secret in Cloudflare; no redeploy is needed.

`src/index.js` has no imports and no build step.
