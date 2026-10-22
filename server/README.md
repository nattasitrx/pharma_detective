# Pharma Detective results server

A small Netlify function that collects students' game results, so nobody has to download and hand in a report file (handy on iPads and phones). The game itself stays on GitHub Pages:
https://nattasitrx.github.io/pharma_detective/

## How it works

- While a student plays, the game sends a snapshot of the session to `POST /api/submit` at every save (immediately at chapter ends, otherwise at most every ~45 s). If the device is offline, snapshots wait on the device and are sent later. The manual "Download my report" button still works.
- Each game is stored once in Netlify Blobs as `<class code>/<session id>`; a newer snapshot replaces the older one.
- The instructor dashboard (☁️ Online results tab) reads everything back from `GET /api/sessions` with the instructor key in the `X-Teacher-Key` header. `DELETE /api/sessions?class=…[&id=…]` removes one game or a whole class.
- Class codes come from the link: `https://nattasitrx.github.io/pharma_detective/?class=ph2026a`. Without `?class=` results go to `main`.

## Setup (once)

1. Netlify project: `pharma-detective-api` (team nattasitrx). Link it to this repository with **base directory `server`**; `netlify.toml` here sets the publish folder and functions folder. No build command is needed.
2. Environment variable `TEACHER_KEY` (secret, Functions scope) holds the instructor key. Change it in Netlify and redeploy to rotate it.
3. Production is public; Deploy Previews are protected by Netlify team login.

## Files

- `netlify/functions/api.mts`: the API (`/api/health`, `/api/submit`, `/api/sessions`)
- `public/index.html`: a placeholder page that points visitors to the game
- `netlify.toml`, `package.json`: Netlify settings and the `@netlify/blobs` dependency
