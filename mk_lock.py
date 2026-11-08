"""A closed case looks closed to everyone, the instructor too (8 Nov 2026).
usage: python3 mk_lock.py FILE [FILE...]   (a built case: A, C or D; in place, after mk_clarity.py)

Before: opening Customise turns on draft mode for the rest of the tab, and draft mode skipped the lock, so on the
instructor's own device a closed case could still be played and looked open. Students were always locked out.
Now the lock box shows in draft mode too; there it has an extra button to try the case as instructor (this tab only)."""
import sys

def patch(path):
    s = open(path, encoding='utf-8').read()
    if "id=\"lockTry\"" in s: print(path, 'already applied'); return
    def sub(old, new):
        nonlocal s
        assert s.count(old) == 1, (path, old[:80], s.count(old)); s = s.replace(old, new)
    sub("const isLocked=()=>!CFG_DRAFTMODE&&LOCK.closed;",
        "const isLocked=()=>LOCK.closed&&!LOCK.tryOK;   // draft mode no longer skips the lock: the instructor taps 'try as instructor' (mk_lock.py)")
    sub("  t.classList.toggle('locked',L); box.classList.toggle('hidden',!L); if(!L&&typeof fitTitle==='function') fitTitle(); }",
        "  t.classList.toggle('locked',L); box.classList.toggle('hidden',!L); const tr=$('#lockTry'); if(tr) tr.classList.toggle('hidden',!CFG_DRAFTMODE); if(!L&&typeof fitTitle==='function') fitTitle(); }")
    sub("function initLock(){ const tb=$('#lockTeacher'); if(tb) tb.onclick=()=>openPage('teacher'); applyLock(); }",
        "function initLock(){ const tb=$('#lockTeacher'); if(tb) tb.onclick=()=>openPage('teacher');\n"
        "  const tr=$('#lockTry'); if(tr) tr.onclick=()=>{ if(!CFG_DRAFTMODE) return; LOCK.tryOK=true; sfx.click(); applyLock(); toast(T('lockTried')); };\n"
        "  applyLock(); }")
    sub('<div class="lk-alt"><button class="sbtn" id="lockTeacher" data-i18n="teacherBtn"></button></div>',
        '<div class="lk-alt"><button class="sbtn" id="lockTeacher" data-i18n="teacherBtn"></button> <button class="sbtn g hidden" id="lockTry" data-i18n="lockTry"></button></div>')
    sub("lockP:[",
        "lockTry:['▶ 老師試玩（學生仍不能進入）','▶ Try it as instructor (students still cannot enter)','▶ ทดลองเล่นแบบอาจารย์ (นักศึกษายังเข้าไม่ได้)'],\n"
        "  lockTried:['🔒 這個案例仍是關閉的：只有這個分頁可以試玩','🔒 The case is still closed: only this tab can play it','🔒 เคสนี้ยังปิดอยู่: เล่นได้เฉพาะแท็บนี้ นักศึกษายังเข้าไม่ได้'],\n"
        "  lockP:[")
    open(path, 'w', encoding='utf-8').write(s); print(path, 'lock patched')

for p in sys.argv[1:]: patch(p)
