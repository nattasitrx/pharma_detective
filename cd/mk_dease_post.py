"""Case D, after the three-way merge (21 Nov 2026). usage: python3 cd/mk_dease_post.py site/case-d/index.html
`mk_cases.py` merges the Case D source with the current engine and, where both changed the same lines, keeps the
engine's. That silently dropped one change of `mk_dease.py`: VISIT_MIN stayed 60 while the title page and Pilly said
70 minutes (found in the audit of 21 Nov). This script (1) re-applies what the merge can drop, on the built page, and
(2) fails the build if any Case D change is missing from the built page."""
import sys, os, re
p = sys.argv[1]; s = open(p, encoding='utf-8').read()
if '/* mk_dease_post */' in s: print(p, 'already applied'); raise SystemExit
def sub(old, new, n=1):
    global s
    assert s.count(old) == n, (old[:90], s.count(old)); s = s.replace(old, new)
# 1. nothing of the Case D patches may be missing: every line they added or changed must be in the built page,
#    apart from the few that later build steps rewrite on purpose
H = os.path.dirname(os.path.abspath(__file__))
src = open(f'{H}/d_orig.html', encoding='utf-8').read().split('\n'); pre = set(open(f'{H}/d_orig_presim.html', encoding='utf-8').read().split('\n'))
OKLOST = ("const r={rescue:false, steps:false, spacer:false, order:false, dose:true", "/* 2 — his Berotec demo", "/* 3 — Spiolto Respimat, hands-on", "  VISIT_MIN:70,")
lost = [l for l in src if l.strip() and l not in pre and l not in s and not l.strip().startswith(OKLOST) and not l.startswith(OKLOST)]
assert not lost, ('Case D lines lost in the merge', len(lost), [l.strip()[:120] for l in lost[:5]])
# 2. the visit is 70 minutes; the number on the title page and in Pilly's line follows the setting (an instructor can change it)
sub("  VISIT_MIN:60,   ", "  VISIT_MIN:70,   /* mk_dease_post */")
sub("replace(/<b>60(?=\\s*(分鐘|minutes|นาที))/,'<b>'+CONFIG.VISIT_MIN)", "replace(/<b>70(?=\\s*(分鐘|minutes|นาที))/,'<b>'+CONFIG.VISIT_MIN)")
m = re.search(r"await say\('pilly','neutral',(\['拜訪時間只有 70 分鐘喔！[^\]]*\])\);", s); assert m, 'pilly 70'
s = s.replace(m.group(0), "await say('pilly','neutral'," + m.group(1) + ".map(t=>t.replace('70',CONFIG.VISIT_MIN)));")
# 3. the search can also end because the visit time ran out (super magnifier pressed too often). Ms Yeh then said
#    "we have the evidence … let's hear Uncle Lee's side" although key items were missing and the visit was over.
old = "show('yeh','L','smug'); await say('yeh','smug',[`證據齊了。額外線索 ${bonus}/4。接下來……讓李伯伯自己說說看吧。`,`We have the evidence. Bonus clues: ${bonus}/4. Now… let's hear Uncle Lee's side.`,`หลักฐานครบแล้ว เบาะแสเพิ่ม ${bonus}/4 ต่อไป… ให้ลุงหลี่เล่าเองดีกว่า`]);"
new = ("const keyN=KEY_ITEMS.filter(hasEv).length;\n"
       "  if(keyN<KEY_ITEMS.length){ show('yeh','L','sad'); await say('yeh','sad',[`時間到了。關鍵證據只找到 ${keyN}/${KEY_ITEMS.length}，今天只能先到這裡。`,`Time is up. We found only ${keyN} of the ${KEY_ITEMS.length} key items. We have to stop here for today.`,`หมดเวลาแล้ว เจอหลักฐานสำคัญแค่ ${keyN}/${KEY_ITEMS.length} ชิ้น วันนี้ต้องพอแค่นี้ก่อน`]); }\n"
       "  else { " + old + " }")
sub(old, new)
open(p, 'w', encoding='utf-8').write(s); print(p, 'Case D post-merge: visit 70 min, time-out line in the search, nothing lost')
