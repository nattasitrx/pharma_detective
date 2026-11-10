"""Case D: published questions use the instructor's inhaler wording (10 Nov 2026).
usage: python3 mk_live_d.py FILE   (site/case-d/index.html, in place, after mk_resume.py and mk_clarity.py)

On 10 Nov the instructor changed 保養 to 長期控制 in Case D's texts. The pre/post question pp_rescue still said 保養 in
one answer option and in its explanation, and a published version carries its own copy of the questions, so changing
the defaults does not reach students. Questions in a published version are read with the new wording (only these two
exact strings change); the instructor's editor shows the new wording too, so publishing again keeps it."""
import sys

FIX = r"""/* questions published before the 長期控制 wording (mk_live_d.py) */
const CFG_WORD_D=[['綠色 Spiolto 是每天用的保養藥','綠色 Spiolto 是每天用的長期控制藥'],['Spiolto 是長效 LAMA＋LABA 保養藥，','Spiolto 是長效 LAMA＋LABA 長期控制藥物，']];
function cfgWordD(q){ if(!Array.isArray(q)) return q; try{ let j=JSON.stringify(q); if(!CFG_WORD_D.some(([a])=>j.includes(a))) return q; CFG_WORD_D.forEach(([a,b])=>{ j=j.split(a).join(b); }); return JSON.parse(j); }catch(e){ return q; } }
"""

def patch(path):
    s = open(path, encoding='utf-8').read()
    if 'function cfgWordD(' in s: print(path, 'already applied'); return
    def sub(old, new):
        nonlocal s
        assert s.count(old) == 1, (path, old[:80], s.count(old)); s = s.replace(old, new)
    assert "CASE_ID='d'" in s or 'CASE_ID="d"' in s or "phd_lee_" in s, 'not Case D'
    a = "function cfgFromOnline(o){ if(!o||!o.config||typeof o.config!=='object') return null; const c=Object.assign({}, o.config),"
    sub(a, FIX + a)
    sub("  c.meta={rev:o.rev, note:o.note||'', online:o.cls}; return c; }",
        "  c.questions=cfgWordD(c.questions); c.meta={rev:o.rev, note:o.note||'', online:o.cls}; return c; }")
    open(path, 'w', encoding='utf-8').write(s); print(path, 'live Case D patched')

for p in sys.argv[1:]: patch(p)
