"""Case D: swap the click-the-steps inhaler UIs for the hands-on simulator (d_isim.js). Idempotent: run on d_orig.html."""
import os
H = os.path.dirname(os.path.abspath(__file__)); f = f'{H}/d_orig.html'
s = open(f, encoding='utf-8').read()
if 'function inhSim(dev)' in s: print('already applied'); raise SystemExit
sim = open(f'{H}/d_isim.js', encoding='utf-8').read().rstrip() + '\n'
# 1) old UIs out, simulator in
a = s.index('/* step 2: tap every step of his Berotec demo'); b = s.index('async function inhalerTask(){')
s = s[:a] + sim + s[b:]
# 2) inhaler task, steps 2 and 3
a = s.index("    /* 2 — watch his Berotec MDI demo, tap the wrong steps */"); b = s.index("    /* teach-back */")
L = s[a:b].split('\n')
mdiX = L[9].replace("await tch(m.perfect?'happy':'neutral',", "await tch(m.ok?'happy':'neutral',")
spX = L[10]; respX = L[19].replace("await tch(o.ok?'happy':'think',", "await tch(o.ok?'happy':'think',")
assert 'm.ok?' in mdiX and 'spacer' in spX and 'T-O-P' in respX
new = '\n'.join([
 "    /* 2 — his Berotec demo, then the student shows the right way on a demo inhaler (hands-on) */",
 L[1], L[2], L[3], L[4],
 "    await say('yeh','smug',['看出問題了嗎？這是示範用的吸入器——你親手做一次正確的給他看！','Spot the problems? Here\\'s a demo inhaler — show him the right way with your own hands!','เห็นปัญหาไหม? นี่คือยาพ่นตัวอย่าง ลองสาธิตวิธีที่ถูกให้ลุงดูด้วยมือคุณเอง!']);",
 "    hideText();",
 "    const m=await inhSim('mdi'); r.steps=m.ok; r.stepsSel=m.firstErrs; r.mdiErrs=m.errs; r.mdiTries=m.tries; (r.sc=r.sc||{}).mdi=m.score;",
 "    if(EXAM()){ sfx.select(); toast(T('examNoted')); await sleep(700); }",
 "    else if(m.ok) splash(m.tries===1?'perfect':'gotcha','gold','crit');",
 mdiX, spX,
 "    await say('yeh','neutral',['來，裝上輔助器再做一次——這次「先按、再吸」反而沒關係。','Now fit the spacer and do it again — this time pressing first, then breathing in, is fine.','มา ต่อกระบอกช่วยสูดแล้วลองอีกครั้ง คราวนี้กดก่อนแล้วค่อยสูดก็ไม่เป็นไร']);",
 "    hideText();",
 "    const sp=await inhSim('spacer'); r.spacer=sp.ok; r.spacerErrs=sp.errs; (r.sc=r.sc||{}).spacer=sp.score;",
 "    if(EXAM()){ sfx.select(); toast(T('examNoted')); await sleep(700); }",
 "    else if(sp.ok) splash('gotcha','gold','crit');",
 "    await tch(sp.ok?'happy':'think',['有了輔助器，按和吸不用同時：藥先噴進輔助艙，再慢慢吸。但要在幾秒內吸，而且一次只噴一下。','With a spacer, pressing and breathing don\\'t have to match: the puff waits in the chamber while he breathes in slowly. Just breathe in within a few seconds — and one puff at a time.','มีกระบอกช่วยสูดแล้ว การกดกับการสูดไม่ต้องพร้อมกัน ยาจะรออยู่ในกระบอกระหว่างที่ลุงสูดช้าๆ แค่ต้องสูดภายในไม่กี่วินาที และพ่นทีละครั้ง']);",
 "    /* 3 — Spiolto Respimat, hands-on: turn · open · press while breathing in, twice */",
 L[13],
 "    await say('yeh','neutral',['綠色這支是「軟霧吸入器」，用法和藍色的不一樣。換你示範一次完整的劑量給他看！','The green one is a soft-mist inhaler — it works differently from the blue one. Show him one full dose yourself!','อันสีเขียวเป็นยาพ่นชนิดละอองฝอย วิธีใช้ต่างจากอันสีฟ้า ลองสาธิตหนึ่งโดสเต็มให้ลุงดู!']);",
 "    hideText();",
 "    const o=await inhSim('resp'); r.order=o.ok; r.orderTries=o.tries; r.respErrs=o.errs; (r.sc=r.sc||{}).resp=o.score;",
 "    if(EXAM()){ sfx.select(); toast(T('examNoted')); await sleep(700); }",
 "    else if(o.ok) splash(o.tries===1?'perfect':'gotcha','gold','crit');",
 respX, ""])
s = s[:a] + new + s[b:]
s = s.replace("const r={rescue:false, steps:false, order:false, dose:false, stepsSel:[], orderTries:0};", "const r={rescue:false, steps:false, spacer:false, order:false, dose:true, stepsSel:[], orderTries:0};", 1)
# 3) debrief question
D = [("他的 MDI 示範錯了哪幾步？", "親手示範時哪一步最難做對（按和吸的時機、閉氣）？什麼時候該用輔助器？"),
     ("Which steps of his MDI demo were wrong?", "In the hands-on demo, which step was hardest to get right (timing the press with the breath, the breath-hold) — and when would a spacer help?"),
     ("ลุงสาธิตพ่น MDI ผิดขั้นไหนบ้าง?", "ตอนลงมือสาธิตเอง ขั้นไหนทำให้ถูกยากที่สุด (จังหวะกดกับหายใจ การกลั้นหายใจ) และเมื่อไรควรใช้กระบอกช่วยสูด?")]
for x, y in D: assert s.count(x) == 1, x; s = s.replace(x, y)
open(f, 'w', encoding='utf-8').write(s); print('inhaler simulator in; bytes', len(s.encode()))
