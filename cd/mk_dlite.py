"""Case D, lighter final battle (12 Nov 2026). Run on d_orig.html after mk_dacb.py.
1. Drop the myths that repeat an earlier hands-on task: P2 (blue vs green inhaler = the inhaler demo),
   P8 (doubling missed doses = mission 3, glipizide) and P13 ("normal" creatinine = the CrCl calculation).
2. Two short cards per myth (right / wrong) instead of three long ones with a half-right card, in bigger type.
3. (later the same day) Chapter 4 drops the two missions that repeat Cases A and C: m1 (Peace + Clarinase, double
   pseudoephedrine = Case A m1) and m3 (sulfonylurea hypo = Case A m4, Case C m3). Ms Yeh names both problems at the
   start of the chapter and they are counted as found (P14, P16), so the problem list and the ranks still add up.
   With m3 gone, myth P8 (doubling missed doses at night: the secret) no longer repeats anything and is back.
   The epilogue no longer asks for m1 / m3.
4. (tester's notes, same day) Timed choices get at least the time it takes to read the options (zh 7, en 15, th 11
   characters a second, plus 3 s): the long Thai options had 8-25 s however long they were. In the room search the
   clues no longer light up under the mouse, and the magnifier cursor covers the whole picture, not just the clues,
   so the student has to judge what looks wrong."""
import os, json
H = os.path.dirname(os.path.abspath(__file__)); f = f'{H}/d_orig.html'
s = open(f, encoding='utf-8').read()
if '/* mk_dlite */' in s: print('already applied'); raise SystemExit
def sub(old, new, n=1):
    global s
    assert s.count(old) == n, (old[:90], s.count(old)); s = s.replace(old, new)

DROP = {'P2', 'P13'}
CARDS = {
 'P8': (['千萬不要加倍：早上的藥晚上才想起來，就跳過，明天照常吃。', 'Never double up: if you only remember the morning pills at night, skip them and carry on tomorrow.', 'ห้ามกินเบิ้ลเด็ดขาด ยาเช้าที่นึกได้ตอนกลางคืนให้ข้ามไป พรุ่งนี้กินตามปกติ'],
        ['睡前一起吞就好，配一大杯熱牛奶護胃，一天的藥量還是一樣。', 'Swallow them all at bedtime with a big glass of warm milk — the daily total is the same.', 'กลืนรวมกันก่อนนอนได้เลย ดื่มนมอุ่นแก้วใหญ่ช่วยเคลือบกระเพาะ ปริมาณยาทั้งวันก็เท่าเดิม']),
 'P1': (['固定一家醫院、一位醫師、一家藥局，看病時帶齊所有藥袋。', 'One hospital, one doctor, one pharmacy — and bring every med bag.', 'มีหมอประจำ โรงพยาบาลเดียว ร้านยาที่เดียว และพกซองยาทุกซองไปหาหมอ'],
        ['越多科越好，各科開的藥全部一起吃就對了。', 'More specialists, better care — just take everything they give you.', 'ยิ่งหลายแผนกยิ่งดี ยาจากทุกที่กินรวมกันได้เลย']),
 'P3': (['有酸味就是壞了，煮滾也沒用：丟掉，煮少一點、加蓋冷藏。', 'A sour smell means it has gone off, and boiling won\'t fix it: throw it out, cook less, keep it covered in the fridge.', 'กลิ่นเปรี้ยวแปลว่าบูดแล้ว ต้มใหม่ก็ไม่หาย ทิ้งไป ทำทีละน้อย ปิดฝาแช่ตู้เย็น'],
        ['加點醋或辣椒殺菌就好，丟掉太浪費了。', 'Add vinegar or chilli to kill the germs — throwing it out is a waste.', 'ใส่น้ำส้มสายชูหรือพริกฆ่าเชื้อ ทิ้งไปเสียดายเปล่าๆ']),
 'P4': (['太熱會脫水、頭暈、更喘：冷氣開 26–28 度配電扇，電費不多。', 'Heat brings dehydration, dizziness and more breathlessness: AC at 26–28 °C with a fan costs little.', 'ร้อนจัดทำให้ขาดน้ำ เวียนหัว หอบมากขึ้น เปิดแอร์ 26–28 องศาคู่พัดลม ค่าไฟไม่มาก'],
        ['流汗可以排毒；少喝水，就不用一直走去廁所。', 'Sweat flushes out toxins — drink less so you needn\'t walk to the toilet so often.', 'เหงื่อช่วยขับพิษ ดื่มน้ำน้อยๆ จะได้ไม่ต้องเดินไปห้องน้ำบ่อย']),
 'P6': (['每天用軟毛刷刷假牙，晚上拿下來泡著，定期看牙醫。', 'Brush the dentures every day with a soft brush, soak them overnight, and see the dentist.', 'แปรงฟันปลอมทุกวันด้วยแปรงขนนุ่ม ถอดแช่ตอนกลางคืน และไปหาหมอฟัน'],
        ['一週泡一次滾水或漂白水就好，戴著睡也沒關係。', 'Boil or bleach them once a week; sleeping in them is fine.', 'แช่น้ำเดือดหรือน้ำยาฟอกขาวสัปดาห์ละครั้งพอ ใส่นอนทั้งคืนก็ได้']),
 'P9': (['這些保健品證據很少，錢留著開冷氣、吃好一點。', 'There is little evidence for these supplements — spend the money on the AC and good food.', 'อาหารเสริมพวกนี้มีหลักฐานน้อย เก็บเงินไว้ค่าแอร์และค่าอาหารดีกว่า'],
        ['買大罐比較划算，天然的吃兩倍更快見效。', 'Buy the big bottle and take a double dose — natural things can\'t hurt.', 'ซื้อขวดใหญ่คุ้มกว่า ของธรรมชาติกินสองเท่าจะได้ผลเร็ว']),
 'P10': (['吃藥的是您，知道每顆藥做什麼才安全。我們來做一張大字藥表。', 'You are the one taking them — knowing what each is for keeps you safe. We\'ll make a big-print chart.', 'คนกินยาคือลุง รู้ว่ายาแต่ละตัวไว้ทำอะไรถึงจะปลอดภัย เราจะทำตารางยาตัวใหญ่ให้'],
         ['醫生給什麼就吃什麼，別的診所再給也一起吃，不用多問。', 'Take whatever you are given — other clinics\' pills too. No need to ask.', 'หมอให้อะไรก็กิน คลินิกอื่นให้มาก็กินรวมไป ไม่ต้องถาม']),
}
a = s.index('const MYTHS=['); b = s.index('];', a) + 1
my = json.loads(s[a + len('const MYTHS='):b])
my = [m for m in my if m['p'] not in DROP]
assert {m['p'] for m in my} == set(CARDS), [m['p'] for m in my]
for m in my: m['c'] = [[2, CARDS[m['p']][0]], [0, CARDS[m['p']][1]]]
s = s[:a] + 'const MYTHS=' + json.dumps(my, ensure_ascii=False, separators=(',', ':')) + s[b:]
sub("const MYTH_SEVERITY=['P8','P2','P13','P1','P3','P4','P9','P6','P10'];", "const MYTH_SEVERITY=['P8','P1','P3','P4','P9','P6','P10']; /* mk_dlite */")
sub(".ccard.fly{animation:flyUp .5s forwards}", ".ccard.fly{animation:flyUp .5s forwards}\n#bossCards{gap:36px}#bossCards .ccard{width:640px;min-height:150px;font-size:30px;line-height:1.4;padding:20px 26px}")
sub("'注意：只有「最佳」衛教卡才能打破迷思。", "'注意：選對衛教卡才能打破迷思。")
sub("'Heads up: only the BEST card breaks a myth.", "'Heads up: only the right card breaks a myth.")
sub("'ระวัง: มีแต่การ์ดที่ดีที่สุดเท่านั้นที่ทลายความเชื่อได้", "'ระวัง: ต้องเลือกการ์ดที่ถูกเท่านั้นถึงจะทลายความเชื่อได้")
sub("選最完整、最正確的建議！", "選對的那張！")
sub("Pick the most complete, correct advice!", "Pick the right one!")
sub("เลือกคำแนะนำที่ครบและถูกที่สุด!", "เลือกใบที่ถูก!")
# 3. the missions that repeat earlier cases
import re
tags = {}
for mid, nxt in (('m1', 'm2'), ('m3', 'm4')):
    a = s.index("\n {id:'%s'," % mid); b = s.index("\n {id:'%s'," % nxt); blk = s[a:b]
    ans = re.search(r"ans:(\[[^\]]*\])", blk).group(1); tag = re.search(r"tag:(\[[^\]]*\])", blk).group(1); tags[mid] = (ans, tag)
    s = s[:a] + s[b:]
sub("'藥袋危機！一共 6 個任務", "'藥袋危機！一共 4 個任務"); sub("'Med-bag crisis! 6 missions", "'Med-bag crisis! 4 missions"); sub("'วิกฤตซองยา! มี 6 ภารกิจ", "'วิกฤตซองยา! มี 4 ภารกิจ")
sub("""แล้วกด "ยืนยัน"!']);
  for(let i=0;i<MISSIONS.length;i++){""", """แล้วกด "ยืนยัน"!']);
  /* mk_dlite: two problems the student already caught in Cases A and C are named, not asked again */
  show('yeh','R','smug'); await say('yeh','smug',['有兩個問題你在前面的案例已經抓過了，這裡直接記下來：Peace 加 Clarinase 是兩份偽麻黃鹼（攝護腺肥大更尿不出來）；glipizide 這類磺醯尿素，老人家很容易低血糖。','Two problems you already caught in earlier cases, so we just note them: Peace plus Clarinase is a double dose of pseudoephedrine (even harder to pee with his BPH), and glipizide, a sulfonylurea, easily causes hypos in older people.','มีสองเรื่องที่คุณเคยจับได้แล้วในเคสก่อน จดไว้เลย: Peace กับ Clarinase มี pseudoephedrine ซ้ำสองต่อ (ต่อมลูกหมากโตยิ่งปัสสาวะไม่ออก) และ glipizide กลุ่ม sulfonylurea ทำให้ผู้สูงอายุน้ำตาลต่ำได้ง่าย']);
  [[%s,%s,'P14'],[%s,%s,'P16']].forEach(([ids,tg,p])=>{ ids.forEach(id=>(S.mr.tags[id]=S.mr.tags[id]||[]).push(L(tg))); reveal(p); }); await sleep(1400);
  for(let i=0;i<MISSIONS.length;i++){""" % (tags['m1'][0], tags['m1'][1], tags['m3'][0], tags['m3'][1]))
sub("'6 個藥物任務全部完全正確','All 6 med-review missions perfect','ภารกิจทบทวนยาถูกครบทั้ง 6'", "'4 個藥物任務全部完全正確','All 4 med-review missions perfect','ภารกิจทบทวนยาถูกครบทั้ง 4'")
sub("{k:'hypo', ok:mr('m3')&&!alive('P8'),", "{k:'hypo', ok:!!S.found.P8&&!alive('P8'),")
sub("b:mr('m3')?['🚑',['夜間低血糖跌倒住院'", "b:S.found.P8?['🚑',['夜間低血糖跌倒住院'")
sub("{k:'urine', ok:mr('m1')&&mr('m2'),", "{k:'urine', ok:mr('m2'),")
sub("mr('m1')?['Clarinase 停了", "1?['Clarinase 停了")
assert "mr('m1')" not in s and "mr('m3')" not in s
# 4. reading time for timed choices; no clue glow in the search
sub("    const box=$('#choices'); let h=''; const timed=o.timer&&S.qte&&!D.editPlay;",
    "    if(o&&o.timer){ const rate={zh:7,en:15,th:11}[S.lang]||11, n=opts.reduce((a,op)=>a+L(op.t).length,0); o={...o, timer:Math.max(o.timer,Math.ceil(n/rate)+3)}; }   /* mk_dlite: time to read */\n    const box=$('#choices'); let h=''; const timed=o.timer&&S.qte&&!D.editPlay;")
sub("#stage.searching #bg .hs:hover{filter:drop-shadow(0 0 10px #fff) drop-shadow(0 0 4px #ffe46b) brightness(1.15)}", "")
import re as _re
_m = _re.search(r'#stage\.searching #bg \.hs\{cursor:([^}]*)\}', s); assert _m
s = s.replace(_m.group(0), _m.group(0) + '\n#stage.searching #bg{cursor:' + _m.group(1) + '}', 1)
open(f, 'w', encoding='utf-8').write(s); print('lighter boss in;', len(my), 'myths')
