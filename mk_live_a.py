"""Case A (age 65) as the live Case A, from 8 Nov 2026, when the case chooser became the main link.
usage: python3 mk_live_a.py FILE   (site/case-a/index.html, in place, after mk_resume.py and mk_clarity.py)

Case A shares its saves and its published settings with the old main link (age 61), so:
1. Instructor pages regrade the main-link games of 4–7 Nov 2026 marked wrong only because the age chip said 65
   (assets/main_regrade_age_chip.js, as on the old main link).
2. Questions in a version the instructor published before the change (29 Oct 2026) still say "a 61-year-old man"
   in pp_metformin; they are read as 65 so they match the case. Nothing else in a published version is changed."""
import sys, os
SP = os.path.dirname(os.path.abspath(__file__))
REGRADE = open(f'{SP}/assets/main_regrade_age_chip.js', encoding='utf-8').read()
AGE_Q = r"""/* questions published while Case A said 61 (mk_live_a.py): read them with the case's age, 65 */
const CFG_AGE65=[['61 歲男性糖尿病人，eGFR 約 23','65 歲男性糖尿病人，eGFR 約 23'],['A 61-year-old man with diabetes has an eGFR of about 23','A 65-year-old man with diabetes has an eGFR of about 23'],['ชายอายุ 61 ปีเป็นเบาหวาน eGFR ประมาณ 23','ชายอายุ 65 ปีเป็นเบาหวาน eGFR ประมาณ 23']];
function cfgAge65(q){ if(!Array.isArray(q)) return q; try{ let j=JSON.stringify(q); if(!CFG_AGE65.some(([a])=>j.includes(a))) return q; CFG_AGE65.forEach(([a,b])=>{ j=j.split(a).join(b); }); return JSON.parse(j); }catch(e){ return q; } }
"""

def patch(path):
    s = open(path, encoding='utf-8').read()
    if 'function fixAgeChip(' in s: print(path, 'already applied'); return
    def sub(old, new):
        nonlocal s
        assert s.count(old) == 1, (path, old[:80], s.count(old)); s = s.replace(old, new)
    assert "const CLUE_AGE={v:'65'," in s and 'answer:{age:65,wt:90,scr:2.9,sex:\'m\'}' in s, 'not the age-65 Case A'
    sub("function allSessions(){", REGRADE + "function allSessions(){")
    sub("  return [...m.values()].sort((a,b)=>(b.updated||'').localeCompare(a.updated||'')); }",
        "  return [...m.values()].map(fixAgeChip).sort((a,b)=>(b.updated||'').localeCompare(a.updated||'')); }")
    a = "function cfgFromOnline(o){ if(!o||!o.config||typeof o.config!=='object') return null; const c=Object.assign({}, o.config),"
    sub(a, AGE_Q + a)
    sub("  c.meta={rev:o.rev, note:o.note||'', online:o.cls}; return c; }",
        "  c.questions=cfgAge65(c.questions); c.meta={rev:o.rev, note:o.note||'', online:o.cls}; return c; }")
    open(path, 'w', encoding='utf-8').write(s); print(path, 'live Case A patched')

for p in sys.argv[1:]: patch(p)
