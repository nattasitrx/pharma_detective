"""Main link (Case A only): the current engine and features, with Case A's ORIGINAL content kept (age 61, not 65).
Reverses fix_a_age.py's text edits on a copy of the current Case A build and puts back the age-61 bag pictures
from the version the main link had before. usage: python3 mk_main.py OUT_HTML"""
import sys, re, subprocess, os
SP = os.path.dirname(os.path.abspath(__file__))
src = open(f'{SP}/fix_a_age.py', encoding='utf-8').read(); ns = {}; exec(src[:src.index('\nimport sys')], ns)
s = open(f'{SP}/build/pharma_detective_chen.html', encoding='utf-8').read()
import json
OLD_BAGS = json.load(open(f'{SP}/assets/case_a_bags_age61.json'))   # the 8 bag pictures as on the main link before 2026-11-04 (commit ac4f39c)
old = ''
for f, a, b in ns['E']:
    n = s.count(b); assert n >= 1, (f, n, b[:60]); s = s.replace(b, a)
# the 8 bag pictures with age 61, as they were on the main link
BAGS = ['allopurinol', 'amaryl', 'finska', 'glucobay', 'glucophage', 'hyzaar', 'peace', 'ponstan']
for k in BAGS:
    pat = re.compile(r"(\b" + k + r":')(data:image/png;base64,[A-Za-z0-9+/=]+)(')")
    assert len(pat.findall(s)) == 1, (k, len(pat.findall(s)))
    s = pat.sub(lambda m: m.group(1) + OLD_BAGS[k] + m.group(3), s, count=1)
for bad in ['65 歲・雜貨店老闆', '(140-65)', 'age:65', '1955/11/7（65']:
    assert bad not in s, bad
open(sys.argv[1], 'w', encoding='utf-8').write(s)
r = subprocess.run(['python3', f'{SP}/mk_resume.py', sys.argv[1]], capture_output=True, text=True); print(r.stdout.strip()[-200:], r.stderr.strip()[-300:])
sc = re.findall(r'<script>(.*?)</script>', s, re.S); open(f'{SP}/main_all.js', 'w', encoding='utf-8').write('\n;\n'.join(sc))
c = subprocess.run(['node', '--check', f'{SP}/main_all.js'], capture_output=True, text=True); print('syntax', 'OK' if c.returncode == 0 else c.stderr[:300])
