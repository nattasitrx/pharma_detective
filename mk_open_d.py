"""Case D on a separate, unlisted page that is open while the main Case D stays closed (12 Nov 2026).
usage: python3 mk_open_d.py SRC DST    (SRC = the deployed case-d/index.html; DST = main:case-d-open/index.html)

The page is the live Case D, unchanged, except that it does not obey the instructor's "closed" switch. Everything
else is the same: the published texts and questions, the class links (?class=...), and results go to the teacher
server as usual. The chooser does not link to it. Delete the folder on main to close it again."""
import sys
s = open(sys.argv[1], encoding='utf-8').read()
a = "const isLocked=()=>LOCK.closed&&!LOCK.tryOK;"
assert s.count(a) == 1, s.count(a)
s = s.replace(a, "const isLocked=()=>false;   // separate open page (mk_open_d.py)")
open(sys.argv[2], 'w', encoding='utf-8').write(s); print(sys.argv[2], 'open Case D page built')
