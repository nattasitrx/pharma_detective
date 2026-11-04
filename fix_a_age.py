"""Case A: age 61 -> 65 (birth date 1955/11/7, as on the clinic receipt). eGFR 24 -> 23, CrCl 34.1 -> 32.3 (adjusted 29.2 -> 27.7).
The same edits go into the merge base (cd/a_base.html) so they do not leak into Cases C and D."""
E=[
 ('g3_data.js', "role:['61 歲・雜貨店老闆','61 · grocery-shop owner','61 ปี · เจ้าของร้านโชห่วย']", "role:['65 歲・雜貨店老闆','65 · grocery-shop owner','65 ปี · เจ้าของร้านโชห่วย']"),
 ('g3b_case.js', "v:['1959/11/7（61 歲）','7 Nov 1959 (61 y)','7 พ.ย. 1959 (61 ปี)']", "v:['1955/11/7（65 歲）','7 Nov 1955 (65 y)','7 พ.ย. 1955 (65 ปี)']"),
 ('g3b_case.js', "v:['≈23','≈21','≈24'], f:'L'}", "v:['≈22','≈21','≈23'], f:'L'}"),
 ('g6c_calc.js', "answer:{age:61,sex:'m',scr:2.9}", "answer:{age:65,sex:'m',scr:2.9}"),
 ('g6c_calc.js', "if(!approx(v.age,61,.5)) return ['年齡填對了嗎？陳伯今年 61 歲。','Check the age — Uncle Chen is 61.','อายุถูกไหม? ลุงเฉินอายุ 61'];", "if(!approx(v.age,65,.5)) return ['年齡填對了嗎？陳伯今年 65 歲。','Check the age — Uncle Chen is 65.','อายุถูกไหม? ลุงเฉินอายุ 65'];"),
 ('g6c_calc.js', "solution:['需要：年齡 61、男性、Scr 2.9 → eGFR ≈ 24 mL/min/1.73m²（體重、身高都不用）','Inputs: age 61, male, Scr 2.9 → eGFR ≈ 24 mL/min/1.73m² (no weight, no height)','ต้องใช้: อายุ 61, ชาย, Scr 2.9 → eGFR ≈ 24 mL/min/1.73m²", "solution:['需要：年齡 65、男性、Scr 2.9 → eGFR ≈ 23 mL/min/1.73m²（體重、身高都不用）','Inputs: age 65, male, Scr 2.9 → eGFR ≈ 23 mL/min/1.73m² (no weight, no height)','ต้องใช้: อายุ 65, ชาย, Scr 2.9 → eGFR ≈ 23 mL/min/1.73m²"),
 ('g6c_calc.js', "answer:{age:61,wt:90,scr:2.9,sex:'m'}", "answer:{age:65,wt:90,scr:2.9,sex:'m'}"),
 ('g6c_calc.js', "if(approx(v.age,1959,1)) return ['年齡不是出生年喔！'", "if(approx(v.age,1955,1)) return ['年齡不是出生年喔！'"),
 ('g6c_calc.js', "if(approx(v.age,90,.5)&&approx(v.wt,61,.5))", "if(approx(v.age,90,.5)&&approx(v.wt,65,.5))"),
 ('g6c_calc.js', "if(!approx(v.age,61,.5)) return ['(140 − 年齡)：陳伯 61 歲。','(140 − age): Uncle Chen is 61.','(140 − อายุ): ลุงเฉินอายุ 61'];", "if(!approx(v.age,65,.5)) return ['(140 − 年齡)：陳伯 65 歲。','(140 − age): Uncle Chen is 65.','(140 − อายุ): ลุงเฉินอายุ 65'];"),
 ('g6c_calc.js', "solution:['CrCl = (140 − 61) × 90 ÷ (72 × 2.9) = 7110 ÷ 208.8 ≈ 34.1 mL/min','CrCl = (140 − 61) × 90 ÷ (72 × 2.9) = 7110 ÷ 208.8 ≈ 34.1 mL/min','CrCl = (140 − 61) × 90 ÷ (72 × 2.9) = 7110 ÷ 208.8 ≈ 34.1 mL/min']", "solution:['CrCl = (140 − 65) × 90 ÷ (72 × 2.9) = 6750 ÷ 208.8 ≈ 32.3 mL/min','CrCl = (140 − 65) × 90 ÷ (72 × 2.9) = 6750 ÷ 208.8 ≈ 32.3 mL/min','CrCl = (140 − 65) × 90 ÷ (72 × 2.9) = 6750 ÷ 208.8 ≈ 32.3 mL/min']"),
 ('g7a_story.js', "`${nm()}，今天的個案是陳伯，61 歲。`,`${nm()}, today's patient is Uncle Chen, 61.`,`${nm()} เคสวันนี้คือลุงเฉิน อายุ 61`", "`${nm()}，今天的個案是陳伯，65 歲。`,`${nm()}, today's patient is Uncle Chen, 65.`,`${nm()} เคสวันนี้คือลุงเฉิน อายุ 65`"),
 ('g7a_story.js', "['我 1959 年 11 月 7 號生的，今年 61 歲啦！','Born November 7, 1959 — 61 this year!','ลุงเกิด 7 พฤศจิกายน 1959 ปีนี้ 61 แล้ว!']", "['我 1955 年 11 月 7 號生的，今年 65 歲啦！','Born November 7, 1955 — 65 this year!','ลุงเกิด 7 พฤศจิกายน 1955 ปีนี้ 65 แล้ว!']"),
 ('g7d_medrev.js', '>61 y · ♂ · 173 cm · 90 kg<', '>65 y · ♂ · 173 cm · 90 kg<'),
 ('g7d_medrev.js', 'cra=(140-61)*adj/(72*scr)', 'cra=(140-65)*adj/(72*scr)'),
 ('g7e_editor.js', "['61 歲男性糖尿病人，eGFR 約 23", "['65 歲男性糖尿病人，eGFR 約 23"),
 ('g7e_editor.js', "'A 61-year-old man with diabetes has an eGFR of about 23", "'A 65-year-old man with diabetes has an eGFR of about 23"),
 ('g7e_editor.js', "'ชายอายุ 61 ปีเป็นเบาหวาน eGFR ประมาณ 23", "'ชายอายุ 65 ปีเป็นเบาหวาน eGFR ประมาณ 23"),
 ('g8_pages.js', "['eGFR 以 CKD-EPI 2021（61 歲男性）估算。','eGFR estimated with CKD-EPI 2021 (61-year-old man).','eGFR ประมาณด้วยสูตร CKD-EPI 2021 (ชาย 61 ปี", "['eGFR 以 CKD-EPI 2021（65 歲男性）估算。','eGFR estimated with CKD-EPI 2021 (65-year-old man).','eGFR ประมาณด้วยสูตร CKD-EPI 2021 (ชาย 65 ปี"),
 ('g8_pages.js', "['個案：陳伯（61 歲，", "['個案：陳伯（65 歲，"),
 ('g8_pages.js', "'Case: Uncle Chen (61, doctor", "'Case: Uncle Chen (65, doctor"),
 ('g8_pages.js', "'เคส: ลุงเฉิน (61 ปี ", "'เคส: ลุงเฉิน (65 ปี "),
]
import sys
base=open('cd/a_base.html',encoding='utf-8').read(); nb=0
for f,a,b in E:
    s=open(f,encoding='utf-8').read(); n=s.count(a)
    if n!=1: print('!! ', f, n, a[:60]); continue
    open(f,'w',encoding='utf-8').write(s.replace(a,b))
    c=base.count(a); 
    if c: base=base.replace(a,b); nb+=c
    print('ok', f, '| in base:', c, '|', a[:50])
open('cd/a_base.html','w',encoding='utf-8').write(base); print('base edits', nb)
