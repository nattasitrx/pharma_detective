#!/bin/bash
# restore the pre-game case sources, re-apply the game scripts, rebuild C/D and refresh the local test copies
SP="$(cd "$(dirname "$0")" && pwd)"; cd $SP/cd || exit 1
node --check c_games.js && node --check d_acb.js || exit 1
cp c_orig_pregames.html c_orig.html && python3 mk_cgames.py && python3 mk_teach.py c || exit 1
cp d_orig_presim.html d_orig.html && python3 mk_dsim.py && python3 mk_dacb.py && python3 mk_teach.py d || exit 1
cd $SP && python3 cd/mk_cases.py $SP/build/pharma_detective_chen.html site 2>&1 | tail -2 && python3 mk_resume.py site/case-c/index.html site/case-d/index.html && python3 mk_clarity.py site/case-c/index.html site/case-d/index.html || exit 1
# Case A in the three-case site: the current build plus save-anywhere
mkdir -p site/case-a && cp $SP/build/pharma_detective_chen.html site/case-a/index.html && python3 mk_resume.py site/case-a/index.html && python3 mk_clarity.py site/case-a/index.html || exit 1
./sync_t.sh >/dev/null && echo REBUILT
