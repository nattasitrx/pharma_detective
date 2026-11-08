# Pharma Detective · 藥師偵探 — source files

> **ภาษาไทยสั้นๆ:** branch นี้เก็บไฟล์ต้นฉบับและสคริปต์ที่ใช้สร้างเกม ส่วนเว็บที่ใช้จริงอยู่ใน branch `main`
> ถ้าจะสร้างใหม่ ให้รัน 3 คำสั่งในหัวข้อ "Rebuild" แล้วคัดลอกไฟล์ที่ได้ไปไว้ใน `main`
> ไฟล์ที่สร้างจาก branch นี้ (ณ 8 พ.ย. 2026) ตรงกับที่ deploy อยู่ทุกไบต์
> ตั้งแต่ 8 พ.ย. 2026 ลิงก์หลักคือหน้าเลือกเคส (A อายุ 65, C, D) ลิงก์ `/preview/` เดิมพาไปหน้าเดียวกันบนลิงก์หลัก
> ถ้าจะแก้เนื้อหาเคส ให้อ่านหัวข้อ "Where the content lives" กับ "Rules" ก่อน
> **ถ้าแก้ไฟล์บนเว็บ (branch `main`) ตรงๆ ต้องแก้ที่ branch นี้ด้วย** ไม่อย่างนั้นการสร้างใหม่ครั้งถัดไปจะทับสิ่งที่แก้ไว้

This branch holds everything needed to rebuild the game files on `main`. Nothing here is served to
students. The live site is on `main` (GitHub Pages):

| On `main` | What it is |
|---|---|
| `index.html`, `img/` | the main link: the case chooser, with the instructor hub (open/close cases, counts, links) |
| `case-a/`, `case-c/`, `case-d/` | the three cases |
| `preview/`, `preview/case-a|c|d/` | redirects: the old preview links go to the same page on the main link, keeping `?class=` and `?lang=` |
| `review/` | the professor's review form (finished; results stay on the server) |
| `cloudflare/` | the results & settings server (Cloudflare Worker + D1) |
| `LICENSE.md` | terms of use (course use only, no open licence) |

The layout of `main` may have changed after this branch was saved, so check `main` before copying
files over.

## Rebuild

Needs bash, python3 with Pillow, node (used only for syntax checks) and git (the merge uses `git merge-file`).

```bash
bash build.sh                       # Case A: engine parts → build/pharma_detective_chen.html
bash rebuild_cd.sh                  # Cases C and D (merge, see below) + Case A with save-anywhere → site/case-{a,c,d}/index.html
```

Where the outputs go (from 8 Nov 2026):

- `site/case-a|c|d/index.html` → `main:case-a|c|d/index.html`.
- `root/` is not built: the chooser (`root/index.html`, `root/img/`) and the redirect pages (`root/preview/`) are
  copied to `main` as they are. The chooser's case list (titles, ages, pictures) is in its `CASES` array.

Until 8 Nov 2026 the main link (`main:index.html`) was Case A alone with its original content (age 61), built by
`python3 mk_main.py build/main.html`, and the three cases were under `main:preview/`. `mk_main.py` is kept for the record only.

`rebuild_cd.sh` also runs `sync_t.sh`. That makes a test copy (`site_t/`) that talks to a local results server
instead of the real one.

## How the build works

**Case A is the engine.** `build.sh` joins the parts in this order: `g1_head.html`, `g2_body.html`, `g3*`, `g4*`, `g5*`,
`g6*`, `g7a…g7n`, then `g8_pages.js`.

**Cases C and D are full HTML sources.** They are `cd/c_orig_pregames.html` and `cd/d_orig_presim.html`. Both were
built on an older Case A, kept as `cd/a_base.html`. `rebuild_cd.sh` builds them in four steps:

1. It applies the case add-ons to fresh copies:
   - `cd/mk_cgames.py` + `cd/c_games.js`: Case C hands-on games (hypo rescue, Fosamax morning, height).
   - `cd/mk_dsim.py` + `cd/d_isim.js`: Case D inhaler demos (MDI, spacer, Respimat) with technique scores.
   - `cd/mk_dacb.py` + `cd/d_acb.js`: Case D anticholinergic sort.
   - `cd/mk_teach.py` + `cd/c_teach.js` / `cd/d_teach.js`: instructor keys and the debrief.
2. `cd/mk_cases.py` does a three-way merge of *(cd/a_base.html → current Case A)* into each case. This way every
   engine change reaches C and D. Conflicts are resolved to the engine side; C = 3 and D = 4 conflicts are expected.
   It then renames the storage keys to each case's own.
3. `mk_resume.py` adds save-anywhere to all three, then `mk_clarity.py` makes right and wrong clear. Students said right/wrong
   wasn't obvious and vanished too fast (Nov 2026). With it:
   - mission results stay until Continue, with a verdict, marks on the cards, the answer and the explanation;
   - boss cards say ✅ / 🔸 / ❌;
   - Continue ignores taps for 0.6 s.
   On Case A, `mk_live_a.py` then adds two things, because Case A shares its saves and published settings with the
   old main link (age 61):
   - the instructor pages regrade the 4–7 Nov 2026 main-link games that were marked wrong only because the age
     chip said 65 (`assets/main_regrade_age_chip.js`, see step 4);
   - questions in a version the instructor published while Case A said 61 (29 Oct 2026) still say "a 61-year-old
     man" in `pp_metformin`; they are read as 65. Nothing else in a published version is changed.
   Last, `mk_lock.py` (all three cases) makes a closed case look closed to the instructor too. Opening Customise turns on
   draft mode for the tab, and draft mode used to skip the lock; now the lock box shows, with a "try it as instructor"
   button in that tab only (8 Nov 2026).
4. (Retired 8 Nov 2026.) `mk_main.py` reverses `fix_a_age.py`, which changed the age 61 → 65 (birth date from the receipt). It also
   puts back the eight age-61 bag pictures from `assets/case_a_bags_age61.json`. It also sets the eGFR/CrCl age
   chip back to 61; that chip is set outside `fix_a_age.py` and showed 65 on the main link from 4 to 7 Nov 2026.
   Finally it adds `assets/main_regrade_age_chip.js`, so the instructor pages regrade attempts that were marked
   wrong only because of that chip. That gives the main link the original Case A content on the current engine. **Don't run `fix_a_age.py` again: it is already applied.**
   `mk_main.py` only reads its list of edits.

## Where the content lives

| What | Case A | Cases C / D |
|---|---|---|
| Profile, problems, labs | `g3b_case.js` | `cd/c_orig_pregames.html` / `cd/d_orig_presim.html` |
| Evidence items, UI text | `g3_data.js` | same files as above |
| Story, interview, duel | `g7a_story.js`, `g7b_story.js` | same files as above |
| Myth boss, med-review missions, drugs | `g7c_boss.js`, `g7d_medrev.js` | same files as above |
| Pre/post test, reflection questions | `DEFAULT_QUESTIONS` in `g7e_editor.js` | `DEFAULT_QUESTIONS` in the case file |
| Pictures (bags, labs, receipts) | `g3img.js` | inside the case file |

Engine features that are shared by all cases:

| File | Feature |
|---|---|
| `g7g_teacher.js` | instructor pages |
| `g7k_mynotes.js` | My notes |
| `g7l_license.js` | credits / About card |
| `g7m_history.js` | My past games, including case documents once a game is finished |
| `g7n_feedback.js` | the optional feedback question at the end |

Pictures: `imgsrc.py` reads and replaces the base64 images (`get(case, key)`, `put(case, key, image)`, `keys(case)`).
`glyph.py` is the helper that was used to edit printed text on bag pictures with the printer's own glyphs.

## Rules

- **Case A-specific edits** (text or pictures) must also go into `cd/a_base.html`. Otherwise the merge carries
  them into C and D.
- **Case C / D content** is edited in its own case file. Don't change the same lines on both sides (engine and
  case file): the conflict is resolved to the engine side and the case edit is lost.
- **Edits made straight to the live HTML on `main` must be copied here too.** Otherwise the next rebuild undoes them.
  After any change, rebuild and check that the outputs match the files on `main` byte for byte (`cmp`).
- **Pre/post and reflection questions (7 Nov 2026):** 3 pre/post questions and 1 reflection are on in every case. The
  others stay in `DEFAULT_QUESTIONS` with `{off:true}`, so an instructor can switch them back on. On Case A, published
  settings (Customise → Publish) replace these defaults on the live site: the version published on 29 Oct 2026 still has
  6 + 3 on, so the instructor switches the extra ones off in Customise and publishes again.
- Keep all three languages in every text: `['中文','English','ไทย']`.
- The instructor results key is a Cloudflare secret (`TEACHER_KEY`). Never put it in any file.

## Review form

`review_tpl.html` + `mk_review.py` → `review/index.html` (figures in `review/img/`). It is finished; it is kept here
for reference only.

## Tests (optional)

These need Playwright with Chromium, and node 22+ for the local results server.

- `servers.sh` starts the local web servers (8100 = `site_t`) and local results servers (8788/8789) through
  `cf/local_worker.mjs`, which runs `cf/cloudflare/src/index.js` on SQLite.
- `test_case.py` plays a whole case:
  ```bash
  CASE=c python3 test_case.py th practice
  ```
  It also takes `MOBILE=1`, `VIEW=fp` and `GAME_URL=…`. Screenshots and notes go to `t15/`.
- The other tests are smaller checks:

  | Test | Checks |
  |---|---|
  | `lic_test.py` | credits |
  | `hypo_test.py` | Case C hypo game |
  | `inhscore_test.py`, `hold_test.py` | Case D inhaler scoring |
  | `teacher_more.py CASE LANG` | instructor pages, using sessions saved by `test_case.py` |

## Content decisions (professor's review, Nov 2026)

**Case A**
- The receipt birth date means 65 years old. Live on the main link from 8 Nov 2026 (it showed 61 until then).
- Labs: TG/TC reference ranges corrected.

**Case C**
- Age 61.
- Fosamax counts as alendronate only (no vitamin D).
- Microalbumin is shown as a number only, with no A2 stage.
- Hypo rescue: candy is fine; the acarbose point was removed.
- Pre/post questions and reflection questions are case-specific.

**Case D**
- Spiolto is 2 puffs once daily.
- Berotec quantity is 1 inhaler.
- Dosing times on the bags match the times per day.
- Sinbaby is not counted in the anticholinergic sort and is not flagged for its diphenhydramine.
- The pre/post NSAID question is switched on; the pseudoephedrine question is an optional extra.

Credits: cases by Prof. Chung-Yu Chen (陳崇鈺), Kaohsiung Medical University; game by Nattasit Rattanaphanit
(ณัฐสิทธิ์ รัตนพาณิชย์). Course use only; see `LICENSE.md` on `main`.
