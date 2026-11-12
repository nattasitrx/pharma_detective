"""Rank gates scale with the number of medicine-review missions (10 Nov 2026).
usage: python3 mk_rank.py FILE [FILE...]   (a built case: A, C or D; in place, after mk_mobile.py)

The S gate needed >= 5 perfect missions and the A gate >= 4 in every case. Cases A and D have 6 missions; Case C has 5,
so S meant all 5 perfect and 29 of 30 finished games on 9 Nov missed it. Now S needs all but one and A all but two
(6 missions: 5 and 4 as before; 5 missions: 4 and 3; Case D has 4 since 12 Nov 2026: 3 and 2). The gate's label shows the number for the case."""
import sys, re

def patch(path):
    s = open(path, encoding='utf-8').read()
    if 'S.mr.perfect>=MISSIONS.length-1' in s: print(path, 'already applied'); return
    def sub(old, new):
        nonlocal s
        assert s.count(old) == 1, (path, old[:80], s.count(old)); s = s.replace(old, new)
    i = s.index('const MISSIONS='); j = s.index('\nconst ', i + 10)
    n = len(re.findall(r"\{id:'m\d+'", s[i:j])); assert n in (4, 5, 6), (path, n)
    sub("['g_mr',S.mr.perfect>=5]", "['g_mr',S.mr.perfect>=MISSIONS.length-1]")
    sub("found>=17&&S.mr.perfect>=4&&", "found>=17&&S.mr.perfect>=MISSIONS.length-2&&")
    sub("g_mr:['藥物整合 ≥ 5 題完全正確','≥ 5 med-review missions perfect','ทบทวนยาถูกครบ ≥ 5 ภารกิจ']",
        f"g_mr:['藥物整合 ≥ {n-1} 題完全正確','≥ {n-1} med-review missions perfect','ทบทวนยาถูกครบ ≥ {n-1} ภารกิจ']")
    open(path, 'w', encoding='utf-8').write(s); print(path, f'rank gates patched ({n} missions)')

for p in sys.argv[1:]: patch(p)
