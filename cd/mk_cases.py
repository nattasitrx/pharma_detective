"""Build Cases C and D on the current engine: 3-way merge of (Case A at 22601ab -> Case A now) into each case,
take the engine side of the known conflicts, then rename Case A's storage keys to the case's own.
usage: python3 mk_cases.py A_NOW_HTML OUT_DIR"""
import re, subprocess, sys, shutil, os
HERE = os.path.dirname(os.path.abspath(__file__))
a_now, out = sys.argv[1], sys.argv[2]
CASES = {
  'c': dict(src='c_orig.html', pre='phd_wang_', sess='phd_wang_sessions_v1', media='phd_wang_media_v1', file='Wang'),
  'd': dict(src='d_orig.html', pre='phd_lee_', sess='phd_lee_sessions_v1', media='phd_lee_media_v1', file='Lee'),
}
for cid, c in CASES.items():
    work = f'{HERE}/{cid}_work.html'; shutil.copy(f'{HERE}/{c["src"]}', work)
    r = subprocess.run(['git', 'merge-file', '-L', cid, '-L', 'base', '-L', 'anow', work, f'{HERE}/a_base.html', a_now])
    s = open(work, encoding='utf-8').read()
    n = len(re.findall(r'^<<<<<<< ', s, re.M))
    # the debrief guide's 'before class' steps: keep the case's own lines, swap in the automatic hand-in wording
    HANDIN = [
      ("""['學生個人玩 45–60 分鐘；用自己的電腦玩，最後按「下載我的報告」交 JSON。','Students play alone for 45–60 min; on their own devices they press "Download my report" and hand in the JSON.','นักศึกษาเล่นคนเดียว 45–60 นาที ถ้าใช้เครื่องตัวเองให้กด "ดาวน์โหลดรายงาน" แล้วส่งไฟล์ JSON'],""",
       """['學生用遊戲連結各自玩 45–60 分鐘，結果會自動傳給老師（沒有網路時，可以按「下載我的報告」交 JSON）。','Students play alone for 45–60 min from the game link; their results reach you automatically (without internet they can press "Download my report" and hand in the JSON).','นักศึกษาเล่นคนเดียว 45–60 นาทีผ่านลิงก์เกม ผลจะส่งถึงอาจารย์อัตโนมัติ (ถ้าไม่มีอินเทอร์เน็ต กด "ดาวน์โหลดรายงาน" แล้วส่งไฟล์ JSON ได้)'],"""),
      ("['到「工具」匯入 JSON，再打開「📊 全班概況」和這一頁。", "['在「☁️ 線上結果」按「⬇️ 載入最新結果」（或在「工具」匯入 JSON），再打開「📊 全班概況」和這一頁。"),
      ("'Import the JSON under Tools, then open 📊 Class overview and this page.", "'Press ⬇️ Load latest results under ☁️ Online results (or import JSON files under Tools), then open 📊 Class overview and this page."),
      ("'นำเข้า JSON ที่แท็บเครื่องมือ แล้วเปิด 📊 ภาพรวมชั้นเรียนและหน้านี้", "'กด ⬇️ โหลดผลล่าสุด ในแท็บ ☁️ ผลออนไลน์ (หรือนำเข้า JSON ที่แท็บเครื่องมือ) แล้วเปิด 📊 ภาพรวมชั้นเรียนและหน้านี้"),
    ]
    def resolve(m):
        ours, theirs = m.group(1), m.group(2)
        if 'hand in the JSON' in ours:
            for a, b in HANDIN:
                assert a in ours, ('handin', a[:40]); ours = ours.replace(a, b)
            return ours
        return theirs
    s = re.sub(r'<<<<<<< ' + cid + r'\n(.*?\n)=======\n(.*?\n)>>>>>>> anow\n', resolve, s, flags=re.S)
    assert '<<<<<<<' not in s and '>>>>>>>' not in s and '\n=======\n' not in s, 'unresolved conflict'
    subs = [
      ("const CASE_ID='a';", f"const CASE_ID='{cid}';"),
      ("'phd_cfg_draft_'", f"'{c['pre']}cfg_draft_'"),
      ("'phd_usedraft'", f"'{c['pre']}usedraft'"),
      ("'phd_cfg_online_v1'", f"'{c['pre']}cfg_online_v1'"),
      ("'phd_chen_sessions_v3'", f"'{c['sess']}'"),
      ("'phd_chen_media_v2'", f"'{c['media']}'"),
      ("PharmaDetective_Chen_", f"PharmaDetective_{c['file']}_"),
      ("https://nattasitrx.github.io/pharma_detective/case-a/", f"https://nattasitrx.github.io/pharma_detective/case-{cid}/"),
    ]
    for old, new in subs:
        k = s.count(old); assert k >= 1, f'{cid}: {old} not found'; s = s.replace(old, new)
    for bad in ["'phd_usedraft'", "'phd_cfg_draft_'", "'phd_chen_", "'phd_badges'", "'phd_cleared'", "'phd_editplay'", "PharmaDetective_Chen", "CASE_ID='a'"]:
        assert bad not in s, f'{cid}: leftover {bad}'
    os.makedirs(f'{out}/case-{cid}', exist_ok=True)
    open(f'{out}/case-{cid}/index.html', 'w', encoding='utf-8').write(s)
    sc = re.findall(r'<script>(.*?)</script>', s, re.S); js = f'{HERE}/{cid}_all.js'; open(js, 'w', encoding='utf-8').write('\n;\n'.join(sc))
    chk = subprocess.run(['node', '--check', js], capture_output=True, text=True)
    print(cid, 'conflicts resolved:', n, '| syntax', 'OK' if chk.returncode == 0 else chk.stderr[:400], '| bytes', len(s.encode()))
