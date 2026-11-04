"""Case D: no BMI calculator; mission 2 becomes a hands-on anticholinergic-load sort. Run on d_orig.html (after mk_dsim.py)."""
import os, shutil
H = os.path.dirname(os.path.abspath(__file__)); f = f'{H}/d_orig.html'
s = open(f, encoding='utf-8').read()
if 'function acbSortUI(' in s: print('already applied'); raise SystemExit
if not os.path.exists(f'{H}/d_orig_preacb.html'): shutil.copy(f, f'{H}/d_orig_preacb.html')
def sub(old, new, n=1):
    global s
    assert s.count(old) == n, (old[:90], s.count(old)); s = s.replace(old, new)
sub("async function inhalerTask(){", open(f'{H}/d_acb.js', encoding='utf-8').read().rstrip() + "\nasync function inhalerTask(){")
sub("    const r=await missionUI(m,i,MISSIONS.length);", "    const r=m.id==='m2'?await acbSortUI(m,i,MISSIONS.length):await missionUI(m,i,MISSIONS.length);")
a = s.index("async function bmiTask(){"); b = s.index("\n}\n", a) + 3
old = s[a:b]; ex = old[old.index("  await say('chen','neutral',['運動喔？"):old.index("  reveal('P12');")]
s = s[:a] + """async function bmiTask(){
  if(S.fl.exAsked){ reveal('P12'); return; } S.fl.exAsked=1;
  await coach('think',['167 公分、62 公斤——88 歲、肌肉不多。等一下看腎功能時要記得這一點！','167 cm and 62 kg — at 88, with little muscle. Remember that when we look at his kidneys!','167 ซม. 62 กก. — อายุ 88 กล้ามเนื้อน้อย จำไว้ตอนดูการทำงานของไตนะ!']);
""" + ex + """  reveal('P12');
}
""" + s[b:]
sub("+(S.calc.bmi&&S.calc.bmi.ok?60:0)+(S.calc.bmiClass?30:0)", "+(S.calc.acb&&S.calc.acb.ok?60:0)")
sub("""<div><span>${T('calcStat')}</span> ${['bmi','egfr','crcl'].map(k=>S.calc[k]?(S.calc[k].ok?'✅':'📘'):'—').join(' ')}</div>""",
    """<div><span>${T('calcStat')}</span> ${['egfr','crcl'].map(k=>S.calc[k]?(S.calc[k].ok?'✅':'📘'):'—').join(' ')}</div><div><span>🖐️ ${esc(L(['實作','Hands-on','ลงมือทำ']))}</span> ${S.inh?(S.inh.sc?INH_DV.map(([d,ic])=>ic+(S.inh.sc[d]?S.inh.sc[d].pts:'—')+'/8').join(' '):['🔵'+(S.inh.steps?'✅':'📘'),'🫙'+(S.inh.spacer?'✅':'📘'),'🟢'+(S.inh.order?'✅':'📘')].join(' ')):'—'} · 🧠${S.calc.acb?(S.calc.acb.ok?'✅':'📘'):'—'}</div>""")
sub("calcStat:['計算題（BMI／eGFR／CrCl）','Calculations (BMI / eGFR / CrCl)','โจทย์คำนวณ (BMI / eGFR / CrCl)'", "calcStat:['計算題（eGFR／CrCl）','Calculations (eGFR / CrCl)','โจทย์คำนวณ (eGFR / CrCl)'")
sub("R.calc={}; ['bmi','egfr','crcl'].forEach(", "R.calc={}; ['egfr','crcl'].forEach(")
sub("+sec(TC('clCalc'),['bmi','egfr','crcl'].map(", "+sec(TC('clCalc'),['egfr','crcl'].map(")
sub(" clBmiClass:['BMI 分類（台灣標準）','BMI category (Taiwan)','จัดกลุ่ม BMI (เกณฑ์ไต้หวัน)'],",
    " clBmiClass:['抗膽鹼負擔分類','Anticholinergic-load sort','จัดกลุ่มภาระต้านโคลิเนอร์จิก'], clInhM:['藍色 MDI 親手示範','Blue MDI, hands-on','MDI สีฟ้า ลงมือ'], clInhS:['MDI＋輔助器 親手示範','MDI + spacer, hands-on','MDI + กระบอกช่วยสูด ลงมือ'], clInhPts:['吸入器技術評分（全班合計／滿分）','Inhaler technique score (class total / maximum)','คะแนนเทคนิคยาพ่น (รวมทั้งชั้น / เต็ม)'], clInhR:['綠色 Respimat 親手示範','Green Respimat, hands-on','Respimat สีเขียว ลงมือ'],")
sub("const bc=list.filter(s=>s.calc&&'bmiClass' in s.calc),", "const bc=list.filter(s=>s.calc&&s.calc.acb), ih=k=>list.filter(s=>(s.log||[]).some(e=>e.type==='inhaler')).map(s=>(s.log||[]).filter(e=>e.type==='inhaler').pop()),")
sub("R.concept=[[TC('clBmiClass'),bc.filter(s=>s.calc.bmiClass).length,bc.length],",
    "R.concept=[[TC('clBmiClass'),bc.filter(s=>s.calc.acb.ok).length,bc.length],[TC('clInhM'),ih().filter(e=>e.steps).length,ih().length],[TC('clInhS'),ih().filter(e=>e.spacer).length,ih().length],[TC('clInhR'),ih().filter(e=>e.order).length,ih().length],...(ih().some(e=>e.sc)?[[TC('clInhPts'),ih().filter(e=>e.sc).reduce((a,e)=>a+['mdi','spacer','resp'].reduce((b,d)=>b+((e.sc[d]&&e.sc[d].pts)||0),0),0),ih().filter(e=>e.sc).length*24]]:[]),")
open(f, 'w', encoding='utf-8').write(s); print('acb sort in; bytes', len(s.encode()))
