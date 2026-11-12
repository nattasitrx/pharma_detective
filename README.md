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
   Then `mk_mobile.py` (all three cases): a double tap no longer zooms the page (`touch-action: manipulation`), and if
   the page is zoomed in anyway a button offers to go back to normal size, or says to pinch where the browser does not
   allow it (9 Nov 2026: students zoomed in on Case C's height game and could not get back).
   Then `mk_rank.py` (all three cases): the rank gates scale with the number of medicine-review missions (S: all but one
   perfect, A: all but two). Case C has 5 missions, so its S gate is 4 (A and D: 5 of 6, unchanged) (10 Nov 2026).
   Case C's interview patience is 13 (max 17) in `cd/c_orig_pregames.html` (the other cases: 10 / 14).
   Last, `mk_zoom.py` (all three cases): pictures (evidence photos, drug bags, labs) open in a full-screen viewer with
   pinch / drag / buttons, and `mk_mobile.py` stops the page itself from zooming. Students said the game kicked them
   out when they zoomed a drug bag; pinch-zooming the scaled stage can run a phone out of memory (10 Nov 2026).
   On Case D, `mk_live_d.py`: questions in a published version are read with the instructor's 長期控制 wording (10 Nov 2026;
   a published version keeps its own copy of the questions, so changing the defaults alone does not reach students).
   Note for wording changes: the Customise "texts" list skips sentences with a variable part (e.g. one that starts with
   "Well said!" only after a right answer) and the questions live in their own tab, so check both.
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

## `mk_d2.py` — Case D preview "D2" (from 11 Nov 2026)

**Dropped on 11 Nov 2026** (it still felt like the same game). The page `main:preview-d/` was deleted and
`rebuild_cd.sh` no longer builds it; the files stay here for reference. To build it by hand:
`python3 mk_d2.py site/case-d/index.html site/preview-d/index.html`.

Students said the three cases feel the same. `mk_d2.py site/case-d/index.html site/preview-d/index.html` (run by
`rebuild_cd.sh`) makes a different Case D from the built one; copy it to `main:preview-d/index.html` (unlisted). The
live Case D is not touched. The preview has its own saves (`phd_lee2_*`), is never locked and sends no results.
The pre/post test and the professor's content stay. Steps, added one by one:

1. (done) Pre-test first; a short prologue that ends on coughing behind the door; chapter 1 opens with the
   breathlessness scene and the hands-on inhaler lesson (it used to be in chapter 4); no intro cards or tutorial lines.
2. (done) Teach-back in place of the myth boss (`cd/d2_teachback.js`): Uncle Lee shows the blue inhaler with the
   spacer again and the student stops him at the 3 wrong steps (drawn from 5); then he reads out his memo and the
   student circles the wrong lines (the old myths, mixed with 3 right lines) and picks the correction for each one
   caught. A wrong line left uncircled stays alive (q -1) and can still be fixed in the closing summary.
   `D2_MISS=1` makes the test miss one of each.
3. (done) Chapter 3 has no contradiction duel (it plays the same in Cases A and C): the student's finds are laid out
   one by one and he owns up, with the same admissions and the same problems revealed; the heart lock stays.

Dropped on 11 Nov (they would feel like the same game again): timeline of the night he fell, prescriber map,
variable ending.

Test: `D2=1 CASE=d GAME_URL=http://localhost:8110/preview-d/?class=ph2026a python3 test_case.py zh practice`.

## `ghost/` — Case D "Blackout Night" (prototype, 10 Nov 2026)

**Dropped on 10 Nov 2026**; the page `main:ghost-d/` was deleted on 11 Nov. The file stays here for reference.

`ghost/index.html` is a stand-alone escape-room prototype of Case D (one room, three knowledge locks, a ghost that
pressures and hints). It is not built from the engine: copy it to `main:ghost-d/index.html`. It is not linked from the
case chooser, uses no server and saves nothing.

## `life/` — "Seven Days of Uncle Lee" (new game, from 11 Nov 2026)

A separate, small game: the player IS Uncle Lee for a week (one day per sitting). It is about feeling an old man's
life, not about teaching the home visit; the pharmacist's visit is planned for day 4. Thai only for now. No build:
copy the folder `life/` to `main:uncle-lee/` (unlisted). Day 1 (Tuesday) is done. The story is invented on purpose
(not from the course materials): his late wife Xiulan, Ah-Mei on the 2nd floor who phones every morning except after
a night shift, and the nightly "daily report" to his wife that always ends "nothing to report".

- Pictures: painted-look images made with Canva's image tool, in `life/img/*.jpg` (dawn, morning, pet, noon, dusk,
  night, corridor, stairs, pot, radio, dinner2, dinner1, pills). Since 12 Nov they are the real pictures, 1024 px on the long side (fetched from
  the owner's Canva account through her own browser, then re-saved as JPEG; rooms square, close-ups 4:3).
  Hotspot positions on the morning picture are in `HS` (percent of the picture) and need a check with the real file.
- Life in still pictures: slow camera drift per picture (`CAM`), dissolves between pictures (`show`), overlays
  (`fx`: sun, dust, heat, lamp), a first-person walk that zooms into the corridor/stairs picture while the button
  is held (`walk`), close-up cards with their own drift, steam, blur-to-focus.
- Days 1-4 are done (12 Nov 2026): Tuesday (nobody phones), Wednesday (Ah-Mei phones; the clinic; she walks the dog),
  Thursday (he sleeps through the radio, forgets again, falls in the bathroom at night and tells nobody), Friday (the
  pharmacists' visit seen from his side: the student kneels to his eye level, asks what he hopes for, lays out the 13
  bags, explains the green inhaler as "the night sentry"; he may or may not tell about the fall; he dances). Each day
  ends with the report to his wife; only Friday's ends "not normal". Days 5-7 are not written yet.
  Progress and each day's choices are kept in localStorage `lee7v1` (`P`); later days read earlier choices.
  More pictures: phone, clinic, drawer, street, corridor_night, floor, door, kneel, bags, chart, dance (placeholders too).
- Day 4 follows the home-visit game (Case D) step by step, seen from the bed (12 Nov): a wrong first move (the
  student talks to Ah-Mei about him), the right one (kneels, ID, purpose, time, asks leave, shoes), the interview
  (answers that stay locked until trust is high enough: `trust()`, `answer()` with `need`), a blaming "why" and its
  repair, "what do you hope for", looking round the room with permission (he can refuse), the 13 bags, the inhalers
  (spacer for the blue one; the soft-mist one: turn, open, press as the breath in begins), teach-back (he does it with
  no prompts; a mistake is taken as the teacher's), the secret, and the closing summary said back by the patient.
- More than "hold": `rub` (turn the base), `flick` (open/close the cap, put the chopsticks away), `shake`, `tapPic`,
  `lens` (old eyes: a clear circle follows the finger over a blurred picture), `breathPress` (press as the breath in
  begins), `ringGame` (answer on the second ring), `tapPills`, `holdFail`. All work on the close-up picture.
- 20 more pictures for sub-scenes (inhalers, photo, bill, leash, amei, doctor, dumplings, yellow, ceiling, intro,
  talkover, drawerask, resp_closed, resp_open, resp_demo, spacer, potfound, teachback, amei_cry, goodbye).
- All seven days are written (12 Nov): Saturday (fewer pills; the student phones with the doctors' answers; he may
  phone to tell about the fall; small pot, air-con, down to the 2nd floor), Sunday (he fills the pill box himself;
  Ah-Mei's reason for phoning every morning; the drawer is cleared; down to the front door), Monday (four floors, the
  street, soy milk, the bench, the whole song). Monday's report ends "normal" again, and now it is true. Then a short
  letter to the student and three closing lines for the player (`finale`).
- Moving is different each time: `walk` (hold; day 1 corridor), `steps` (left/right taps on the stairs; wrong foot =
  stumble, too quick = out of breath; `from`/`limit` for one floor at a time), `feel` (night: drag a hand along the
  wall, slowly), `rush` (day 4: tap fast, the breath runs out).
- 5 more pictures: exitdoor, outside, bench, fillbox, drawer_clean (49 in all, still placeholders).
- 12 Nov, after the first play-through on a phone: (1) the day-end buttons stayed clickable, invisibly, over the next
  day's text (a child with pointer-events:auto inside a hidden parent), so a tap to continue restarted or reloaded
  the game: they are now removed on click; (2) the ending shows one thing at a time (report, letter, three lines);
  (3) from Case D: the wall calendar full of circled appointments (day 1 he circles Wednesday; day 4 the student
  reads it as "the days you got out to meet people"; day 6 he circles only Friday) and the supplement bought in
  secret and kept in the biscuit tin (day 2; found with permission on day 4; day 6 he folds the flyers into a boat);
  (4) pictures redone: `kneel` (natural pose), and `radio`, `chart`, `bags` with the soft-mist inhaler drawn properly;
  new `calendar`, `tin`.
- 12 Nov, pictures matched to scenes: Lee's own hands on the soft-mist inhaler after the visit (`lee_resp_closed`,
  `lee_resp_open`; `resp_closed`/`resp_open` removed), the student listening without an inhaler in hand (`listen`,
  `listen2`), the right pill-box compartments for each day (`pills_am`, `pills_tue`, `pills_thu`, `pills_check`;
  `pills` removed), morning stairs (`stairs_am`, `stairs_am_dog`), the small pot, Ah-Mei at dinner (`dinner_amei`).
- 12 Nov, the wife thread (Xiulan) made stronger, five threads: (1) she used to look after his medicines (her
  circles on the calendar, she answered the doctor for him, her old hand-labelled bag in the drawer `oldbag`, the
  student's "what do you hope for" is the first such question since her, Sunday's pill box she filled for 40 years);
  (2) answering on the second ring was her habit (told on day 6); (3) from day 4 the nightly report gets a reply in
  her handwriting (`reportCard(..., reply)`, blue ink, font Charmonman); day 6's reply depends on (5); (4) day 7's
  dance: the kitchen of their young years (`kitchen_young`), she holds out her hand, they dance (`dance_young`), back
  to now with the dog; (5) her slippers and apron by the door (`slippers`, hotspot from day 1); on day 6 he keeps
  them or boxes them (`S.slip`), which shows in the report.
- Sound is made in code. `?fast=1` runs without waits (tests); `window.__pick` / `window.__order` choose answers
  and the order of things tapped in the morning.

## `mk_open_d.py` — Case D on a separate open page (12 Nov 2026)

`main:case-d-open/` is the live Case D with one change: it ignores the instructor's "closed" switch, so it can be
played while `case-d/` and the chooser still show Case D as closed. Same published texts/questions, same class links
(`case-d-open/?class=...`), results go to the teacher server as usual. Not linked from anywhere. Rebuild it after any
change to Case D: `python3 mk_open_d.py <main>/case-d/index.html <main>/case-d-open/index.html`. Delete the folder
to close it.
