/* =====================================================================
   CHAPTER 4 — 藥袋危機！ Med-bag crisis (medication reconciliation)
   ===================================================================== */
const SRC={A:['A醫院 新陳代謝科 2/18','Hosp A · Endocrine 2/18','รพ.A ต่อมไร้ท่อ 18/2'], B:['B醫院 免疫風濕科 3/1','Hosp B · Rheum 3/1','รพ.B รูมาโตฯ 1/3'], E:['耳鼻喉診所 3/20','ENT clinic 3/20','คลินิก ENT 20/3']};
const DRUGS=[
 {id:'hyzaar', src:'A', img:'hyzaar', n:'Hyzaar 好悅您', g:'losartan 100 mg + HCTZ 12.5 mg', sig:['1 粒・每日 1 次・早餐後','1 tab · once daily · after breakfast','1 เม็ด · วันละครั้ง · หลังอาหารเช้า'], cls:['降血壓（ARB＋利尿劑）','Antihypertensive (ARB + thiazide)','ลดความดัน (ARB + ขับปัสสาวะ)']},
 {id:'glucobay', src:'A', img:'glucobay', n:'GLUcobay 醣祿', g:'acarbose 50 mg', sig:['1 粒・每日 3 次・三餐飯前','1 tab · TID · before meals','1 เม็ด · วันละ 3 ครั้ง · ก่อนอาหาร'], cls:['降血糖（α-葡萄糖苷酶抑制劑）','Antidiabetic (α-glucosidase inhibitor)','ลดน้ำตาล (α-glucosidase inhibitor)']},
 {id:'glucophage', src:'A', img:'glucophage', n:'Glucophage 庫魯化', g:'metformin 500 mg', sig:['1 粒・每日 3 次・三餐飯後','1 tab · TID · after meals','1 เม็ด · วันละ 3 ครั้ง · หลังอาหาร'], cls:['降血糖（雙胍類）','Antidiabetic (biguanide)','ลดน้ำตาล (biguanide)']},
 {id:'amaryl', src:'A', img:'amaryl', n:'Amaryl 瑪爾胰', g:'glimepiride 2 mg', sig:['2 粒・每日 1 次・晚餐後','2 tabs · once daily · after dinner','2 เม็ด · วันละครั้ง · หลังอาหารเย็น'], cls:['降血糖（磺醯尿素類）','Antidiabetic (sulfonylurea)','ลดน้ำตาล (sulfonylurea)']},
 {id:'peace', src:'A', img:'peace', n:'Peace 鼻福錠', g:'triprolidine 2.5 mg + pseudoephedrine 60 mg', sig:['1 粒・每日 1 次・睡前','1 tab · at bedtime','1 เม็ด · ก่อนนอน'], cls:['抗組織胺＋鼻塞藥','Antihistamine + decongestant','ยาแก้แพ้ + ลดน้ำมูก']},
 {id:'ponstan', src:'A', img:'ponstan', n:'Ponstan 博疏痛', g:'mefenamic acid 250 mg', sig:['2 粒・每日 2 次・早晚餐後','2 caps · BID · after meals','2 แคปซูล · วันละ 2 ครั้ง · หลังอาหาร'], cls:['非類固醇消炎止痛（NSAID）','NSAID painkiller','ยาแก้ปวดกลุ่ม NSAID']},
 {id:'finska', src:'B', img:'finska', n:'Finska LP 康瑞斯', g:'loratadine 5 mg + pseudoephedrine 120 mg', sig:['1 粒・每日 2 次・早晚餐後','1 tab · BID · after meals','1 เม็ด · วันละ 2 ครั้ง · หลังอาหาร'], cls:['抗組織胺＋鼻塞藥（長效）','Antihistamine + decongestant (SR)','ยาแก้แพ้ + ลดน้ำมูก (ออกฤทธิ์นาน)']},
 {id:'allopurinol', src:'B', img:'allopurinol', n:'Allopurinol 安樂普利諾', g:'allopurinol 100 mg', sig:['1 粒・每日 1 次・早餐後','1 tab · once daily · after breakfast','1 เม็ด · วันละครั้ง · หลังอาหารเช้า'], cls:['降尿酸','Urate-lowering','ลดกรดยูริก']},
 {id:'keflex', src:'E', img:'ent_receipt', n:'Keflex', g:'cephalexin 500 mg', sig:['1 粒・每日 3 次・7 天','1 cap · TID · 7 days','1 แคปซูล · วันละ 3 ครั้ง · 7 วัน'], cls:['抗生素（第一代頭孢菌素）','Antibiotic (1st-gen cephalosporin)','ยาปฏิชีวนะ (cephalosporin รุ่น 1)']},
 {id:'clarinase', src:'E', img:'ent_receipt', n:'Clarinase', g:'loratadine 5 mg + pseudoephedrine 120 mg', sig:['1 粒・每日 1 次・7 天','1 tab · once daily · 7 days','1 เม็ด · วันละครั้ง · 7 วัน'], cls:['抗組織胺＋鼻塞藥（長效）','Antihistamine + decongestant (SR)','ยาแก้แพ้ + ลดน้ำมูก (ออกฤทธิ์นาน)']},
 {id:'danzen', src:'E', img:'ent_receipt', n:'Danzen', g:'serrapeptase 10 mg', sig:['1 粒・每日 3 次・7 天','1 tab · TID · 7 days','1 เม็ด · วันละ 3 ครั้ง · 7 วัน'], cls:['消炎酵素','Anti-inflammatory enzyme','เอนไซม์ลดการอักเสบ']},
];
const MISSIONS=[
 {id:'m1', p:'P14', ans:['peace','finska','clarinase'], tag:['重複','Duplicate','ซ้ำ'],
  q:['重複用藥警報！找出所有含「偽麻黃鹼 pseudoephedrine」的藥（三家醫院開的）。','Duplication alert! Find every drug containing pseudoephedrine — from all three prescribers.','เตือนยาซ้ำ! หายาทุกตัวที่มี pseudoephedrine จากทั้งสามแหล่ง'],
  x:[['三家醫院各開了一種偽麻黃鹼複方：Peace、Finska LP、Clarinase！一天可能吃到 420 mg，超過上限 240 mg。','Three prescribers, three pseudoephedrine combos: Peace, Finska LP and Clarinase — up to 420 mg a day, above the 240 mg maximum.','สามแหล่งสั่ง pseudoephedrine คนละตัว: Peace, Finska LP, Clarinase — อาจได้ถึง 420 มก./วัน เกินขีดสูงสุด 240 มก.'],
     ['偽麻黃鹼會升高血壓，造成心悸、失眠、排尿困難；抗組織胺也重複了，而且腎功能差會累積。就是神明桌那罐「秘方」！','Pseudoephedrine raises BP and causes palpitations, insomnia and urinary retention; the antihistamines are duplicated too and accumulate in CKD. That\'s the "secret recipe" jar!','pseudoephedrine ทำให้ความดันสูง ใจสั่น นอนไม่หลับ ปัสสาวะลำบาก ยาแก้แพ้ก็ซ้ำและสะสมเมื่อไตเสื่อม นี่แหละ "สูตรลับ" ในโหลบนโต๊ะบูชา!']]},
 {id:'m2', p:'P15', ans:['glucophage','glucobay'], tag:['腎禁用','Renal ✗','ไตห้าม'],
  q:['eGFR 只剩約 23！哪些「降血糖藥」在這個腎功能下應停用或不建議使用？','eGFR is only ~23! Which antidiabetic drugs should be stopped or avoided at this kidney function?','eGFR เหลือแค่ ~23! ยาเบาหวานตัวไหนควรหยุดหรือไม่แนะนำที่ระดับไตนี้?'],
  x:[['Metformin 在 eGFR<30 禁用，會增加乳酸中毒風險；Acarbose 在嚴重腎功能不全時也不建議使用。','Metformin is contraindicated below eGFR 30 because of lactic acidosis risk; acarbose is not recommended in severe renal impairment.','Metformin ห้ามใช้เมื่อ eGFR<30 เพราะเสี่ยงภาวะกรดแลคติก Acarbose ก็ไม่แนะนำในไตเสื่อมรุนแรง'],
     ['你看藥袋：庫魯化的副作用寫著「食慾不振、金屬味」——陳伯沒胃口，可能就跟它有關！','Look at the bag: Glucophage lists "loss of appetite, metallic taste" — that may explain Uncle Chen\'s poor appetite!','ดูที่ซองยา: Glucophage เขียนผลข้างเคียงว่า "เบื่ออาหาร รสโลหะ" — อาจเป็นเหตุที่ลุงไม่อยากกินข้าว!']]},
 {id:'m3', p:'P16', ans:['ponstan'], tag:['傷腎','Nephrotoxic','ทำร้ายไต'],
  q:['找出會傷腎、升血壓，還會和降血壓藥「打架」的止痛藥。','Find the painkiller that harms the kidneys, raises BP and clashes with the blood-pressure drug.','หายาแก้ปวดที่ทำร้ายไต เพิ่มความดัน และตีกับยาลดความดัน'],
  x:[['Ponstan（mefenamic acid）是 NSAID：會傷腎、升高血壓，和 Hyzaar（ARB＋利尿劑）一起用更容易發生急性腎損傷。','Ponstan (mefenamic acid) is an NSAID: it harms the kidneys and raises BP, and with Hyzaar (ARB + diuretic) the risk of acute kidney injury climbs.','Ponstan (mefenamic acid) เป็น NSAID ทำร้ายไต เพิ่มความดัน และเมื่อใช้กับ Hyzaar (ARB + ขับปัสสาวะ) เสี่ยงไตวายเฉียบพลัน'],
     ['藥袋上寫「經血過多」只是通用用途。關節痛要先查原因，止痛可考慮 acetaminophen 並請醫師評估。','"Heavy menstrual bleeding" on the bag is just generic text. Find the cause of the joint pain first; acetaminophen with a doctor\'s review is a safer option.','"ประจำเดือนมามาก" บนซองเป็นแค่ข้อความทั่วไป ต้องหาสาเหตุปวดข้อก่อน ยาแก้ปวดอาจพิจารณา acetaminophen ร่วมกับให้แพทย์ประเมิน']]},
 {id:'m4', p:'P17', ans:['amaryl'], tag:['低血糖','Hypo risk','น้ำตาลต่ำ'],
  q:['腎功能差＋常喝酒＋三餐不規律：哪一個藥最容易造成嚴重低血糖？','Poor kidneys + heavy drinking + irregular meals: which drug most easily causes severe hypoglycemia?','ไตไม่ดี + ดื่มหนัก + กินไม่เป็นเวลา: ยาตัวไหนทำให้น้ำตาลต่ำรุนแรงได้ง่ายที่สุด?'],
  x:[['Glimepiride 在腎功能不全時容易累積，加上喝酒、外食不規律、又時吃時停，低血糖風險很高。','Glimepiride accumulates in kidney failure; with alcohol, irregular meals and on-off dosing, hypoglycemia risk is high.','Glimepiride สะสมเมื่อไตเสื่อม ร่วมกับเหล้า กินไม่เป็นเวลา หยุดๆ กินๆ จึงเสี่ยงน้ำตาลต่ำสูง'],
     ['同時 HbA1c 從 7.1 升到 8.3，控制越來越差。整個降血糖方案都需要和醫師依腎功能重新規劃。','Meanwhile HbA1c rose from 7.1 to 8.3. The whole diabetes regimen needs re-planning with the doctor around kidney function.','ขณะเดียวกัน HbA1c ขึ้นจาก 7.1 เป็น 8.3 ต้องวางแผนยาเบาหวานใหม่กับแพทย์ตามการทำงานของไต']]},
 {id:'m5', p:'P18', ans:['keflex','danzen'], tag:['不適當','Inappropriate','ไม่เหมาะสม'],
  q:['只是過敏性鼻炎，耳鼻喉診所卻開了哪些「不適當」的藥？','It\'s only allergic rhinitis — which inappropriate drugs did the ENT clinic prescribe?','แค่ภูมิแพ้จมูก แต่คลินิกหู คอ จมูก กลับจ่ายยาที่ไม่เหมาะสมตัวไหนบ้าง?'],
  x:[['沒有細菌感染證據時，鼻炎不需要抗生素 Keflex；就算要用，腎功能差也要減量。','Without evidence of bacterial infection, rhinitis needs no antibiotic like Keflex — and if one is needed, it must be renally dosed.','หากไม่มีหลักฐานติดเชื้อแบคทีเรีย ภูมิแพ้จมูกไม่ต้องใช้ยาปฏิชีวนะ Keflex และถ้าจำเป็นต้องปรับขนาดตามไต'],
     ['Danzen（serrapeptase 消炎酵素）療效證據不足，在日本已經下市。','Danzen (serrapeptase) lacks evidence of benefit and has been withdrawn in Japan.','Danzen (serrapeptase) ขาดหลักฐานว่าได้ผล และถูกถอนออกจากตลาดในญี่ปุ่นแล้ว']]},
 {id:'m6', p:'P19', ans:['hyzaar'], tag:['升尿酸','↑ Urate','เพิ่มยูริก'],
  q:['陳伯尿酸高、血糖高：哪個藥的成分可能讓尿酸和血糖都上升？','Uncle Chen has high uric acid and high glucose: which drug contains an ingredient that can raise both?','ลุงเฉินกรดยูริกและน้ำตาลสูง ยาตัวไหนมีส่วนประกอบที่ทำให้ทั้งสองค่าสูงขึ้น?'],
  x:[['Hyzaar 裡的利尿劑 HCTZ 會升高尿酸和血糖，在 eGFR<30 時降壓效果也變差，可以和醫師討論調整。','The HCTZ in Hyzaar raises uric acid and glucose and works poorly below eGFR 30 — worth discussing with the doctor.','HCTZ ใน Hyzaar เพิ่มกรดยูริกและน้ำตาล และลดความดันได้ไม่ดีเมื่อ eGFR<30 ควรปรึกษาแพทย์เพื่อปรับยา'],
     ['Allopurinol 100 mg 以腎功能來說劑量合理；但台灣人使用前建議檢測 HLA-B*5801，出現皮疹要立刻停藥就醫。','Allopurinol 100 mg is reasonable for his kidney function, but HLA-B*5801 screening is advised in Taiwan, and any rash means stop and seek care.','Allopurinol 100 mg เหมาะกับระดับไตนี้ แต่ในไต้หวันแนะนำตรวจ HLA-B*5801 ก่อน และหากมีผื่นต้องหยุดยาแล้วไปพบแพทย์ทันที']]},
];
function labPanelHTML(){
  const rows=[['GLU-AC','mg/dL','155 → 168 → 150','h'],['HbA1c','%','7.1 → 7.8 → 8.3','h'],['CREA','mg/dL','3.0 → 3.2 → 2.9','h'],['eGFR','mL/min','≈ 23','l'],['MicroALB','','2.8','h'],['Uric acid','','↑','h'],['LDL / HDL','mg/dL','102 / 59','']];
  return `<h3>${T('labPanel')}</h3>${rows.map(r=>`<div class="lrow"><b>${r[0]} <small>${r[1]}</small></b><span class="v ${r[3]}">${r[2]}</span></div>`).join('')}
   <p style="font-size:13px;color:#b9b4d6;margin:8px 0">65 y · ♂ · 173 cm · 90 kg</p><button class="gbtn blue" id="mrSheet" style="font-size:17px;padding:8px 18px">${T('viewSheet')}</button>`;
}
function missionUI(m, i, n){
  return new Promise(res=>{
    let host=$('#medrev'); if(!host){ host=document.createElement('div'); host.id='medrev'; $('#stage').appendChild(host); }
    const sel=new Set(), list=DRUGS.slice(); if(EXAM()) for(let a=list.length-1;a>0;a--){ const b=Math.floor(Math.random()*(a+1)); [list[a],list[b]]=[list[b],list[a]]; }
    host.innerHTML=`<div class="mr-main"><div class="mr-head"><span class="no">🚨 ${T('mission')} ${i+1}/${n}</span><span class="tx">${esc(L(m.q))}</span><span id="mrTimer"></span></div>
      <div class="mr-grid">${list.map((d,j)=>`<button class="dcard s${d.src}" data-d="${d.id}" style="animation-delay:${j*.03}s"><span class="src">${esc(L(SRC[d.src]))}</span><b>${esc(d.n)}</b><span class="g">${esc(d.g)}</span><span class="sig">${esc(L(d.sig))}</span><span class="cls">${esc(L(d.cls))}</span><span class="zoom" data-z="${d.img}" title="photo">🔍</span>${S.mr.tags[d.id]&&!EXAM()?`<span class="badge" title="${esc(S.mr.tags[d.id].join(', '))}">⚠️</span>`:''}</button>`).join('')}</div>
      <div class="mr-act"><span class="hint">${T('tapBag')} · ${T('selected')}: <b id="mrCount">0</b></span><button class="gbtn" id="mrOk">${T('confirmDx')}</button></div></div>
      <div class="mr-side">${labPanelHTML()}</div>`;
    host.classList.remove('hidden'); host.style.animation='none'; void host.offsetWidth; host.style.animation='';
    $('#mrSheet').onclick=()=>zoomImg(IMG.labs);
    let done=false, iv=null;
    host.querySelectorAll('.dcard').forEach(c=>c.onclick=e=>{
      const z=e.target.closest('.zoom'); if(z){ e.stopPropagation(); sfx.paper(); zoomImg(IMG[z.dataset.z]); return; }
      if(done) return; const id=c.dataset.d; if(sel.has(id)){ sel.delete(id); c.classList.remove('sel'); } else { sel.add(id); c.classList.add('sel'); } sfx.select(); $('#mrCount').textContent=sel.size; });
    const fin=()=>{ if(done) return; done=true; clearInterval(iv); D.choiceFinish=null; $('#mrTimer').innerHTML='';
      const ans=new Set(m.ans), hit=[...sel].filter(x=>ans.has(x)), extra=[...sel].filter(x=>!ans.has(x)), missed=m.ans.filter(x=>!sel.has(x));
      host.querySelectorAll('.dcard').forEach(c=>{ const id=c.dataset.d; if(EXAM()){ if(!sel.has(id)) c.style.opacity='.45'; return; } c.classList.remove('sel'); if(ans.has(id)) c.classList.add(sel.has(id)?'ok':'miss'); else if(sel.has(id)) c.classList.add('bad'); });
      const perfect=!extra.length&&!missed.length, partial=!perfect&&hit.length>0; res({sel:[...sel], hit, extra, missed, perfect, partial}); };
    $('#mrOk').onclick=()=>{ if(!sel.size){ sfx.error(); toast('🩺 '+L(['至少選一個藥','Select at least one drug','เลือกยาอย่างน้อย 1 ตัว'])); return; } fin(); };
    if(S.qte){ const T0=performance.now(), LIM=75; let last=LIM; $('#mrTimer').innerHTML=`<div id="qte" style="--p:100%">${LIM}</div>`;
      iv=setInterval(()=>{ const rem=Math.max(0,LIM-(performance.now()-T0)/1000), q=$('#mrTimer #qte'); if(q){ q.textContent=Math.ceil(rem); q.style.setProperty('--p',(rem/LIM*100)+'%'); }
        if(rem<=5&&Math.ceil(rem)!==last){ last=Math.ceil(rem); sfx.tick(); } if(rem<=0){ sfx.error(); fin(); } },100); }
  });
}
/* ---- kidney function: eGFR via calculator (inputs only) + CrCl by hand ---- */
async function kidneyTask(){
  await say('yeh','think',['先看檢驗紀錄：肌酸酐 3.0 → 3.2 → 2.9 mg/dL……腎功能到底剩多少？','First, the lab record: creatinine 3.0 → 3.2 → 2.9 mg/dL… how much kidney function is left?','ดูผลแล็บก่อน: ครีเอตินิน 3.0 → 3.2 → 2.9 mg/dL… ไตเหลือการทำงานเท่าไร?']);
  await say('yeh','neutral',['腎功能有兩種常用指標：eGFR（CKD-EPI）用來分期，要靠計算工具；CrCl（Cockcroft–Gault）可以手算。兩個都來試試！','Two common measures: eGFR (CKD-EPI) for staging — needs a calculator tool; CrCl (Cockcroft–Gault) — you can do by hand. Let\'s try both!','ดัชนีการทำงานของไตที่ใช้บ่อยมี 2 แบบ: eGFR (CKD-EPI) ใช้แบ่งระยะ ต้องใช้เครื่องคิด และ CrCl (Cockcroft–Gault) คิดมือได้ ลองทั้งสองแบบเลย!']); hideText();
  const e=await calcPanel(CALC_EGFR); const eg=Math.round(e.r); S.calc.egfr={ok:e.ok, tries:e.tries, value:eg};
  const c=await choose([{t:['G2（60–89）','G2 (60–89)','G2 (60–89)']},{t:['G3a（45–59）','G3a (45–59)','G3a (45–59)']},{t:['G3b（30–44）','G3b (30–44)','G3b (30–44)']},{t:['G4（15–29）','G4 (15–29)','G4 (15–29)']},{t:['G5（< 15）','G5 (< 15)','G5 (< 15)']}],
    {timer:20, id:'ckdStage', label:[`eGFR ≈ ${eg}：慢性腎臟病第幾期？`,`eGFR ≈ ${eg}: which CKD stage?`,`eGFR ≈ ${eg}: โรคไตเรื้อรังระยะไหน?`]});
  S.mr.egfr=c===3&&e.ok; logEvent({type:'egfr', pick:c, ok:c===3, value:eg});
  if(c===3){ await splash('gotcha','gold','slam'); await say('yeh','happy',[`沒錯！eGFR 約 ${eg}，是 CKD 第 4 期（G4），還有微量白蛋白尿。`,`Exactly! eGFR about ${eg} — CKD stage 4 (G4), with albuminuria.`,`ถูกต้อง! eGFR ประมาณ ${eg} คือ CKD ระยะ 4 (G4) และมีอัลบูมินในปัสสาวะ`]); }
  else await say('yeh','think',[`eGFR 約 ${eg}，落在 15–29，是 CKD 第 4 期（G4），還有微量白蛋白尿。`,`eGFR about ${eg} falls in 15–29 — CKD stage 4 (G4), with albuminuria.`,`eGFR ประมาณ ${eg} อยู่ในช่วง 15–29 คือ CKD ระยะ 4 (G4) และมีอัลบูมินในปัสสาวะ`]);
  hideText();
  const k=await calcPanel(CALC_CRCL); const cr=k.r, scr=k.v.scr; S.calc.crcl={ok:k.ok, tries:k.tries, value:+cr.toFixed(1), wt:k.v.wt};
  const usedTBW=Math.abs(k.v.wt-90)<1;
  if(usedTBW){
    const q=await choose([{t:['高估（算出來比實際好）','Overestimate it (looks better than it is)','ประเมินสูงเกินจริง (ดูดีกว่าความจริง)']},{t:['低估（算出來比實際差）','Underestimate it (looks worse than it is)','ประเมินต่ำเกินจริง (ดูแย่กว่าความจริง)']},{t:['不影響','No effect','ไม่มีผล']}],
      {timer:20, shuffle:true, id:'crclObese', label:['陳伯 BMI≈30（肥胖）。用「實際體重」算 CrCl 會……？','Uncle Chen\'s BMI is ≈30 (obese). Using ACTUAL body weight, CrCl will…','ลุงเฉิน BMI≈30 (อ้วน) ถ้าใช้ "น้ำหนักจริง" คำนวณ CrCl จะ…?']});
    S.calc.crclObese=q===0; logEvent({type:'crclObese', pick:q, ok:q===0}); if(q===0) sfx.get(); else sfx.error();
    const ibw=50+2.3*(173/2.54-60), adj=ibw+0.4*(90-ibw), cra=(140-65)*adj/(72*scr);
    await say('yeh',q===0?'happy':'think',[`${q===0?'對！':''}脂肪組織不太產生肌酸酐，用實際體重會「高估」。肥胖時常改用調整體重：理想體重 ≈ ${ibw.toFixed(1)} kg，調整體重 ≈ ${ibw.toFixed(1)} + 0.4 × (90 − ${ibw.toFixed(1)}) ≈ ${adj.toFixed(1)} kg → CrCl ≈ ${cra.toFixed(0)} mL/min。`,`${q===0?'Right! ':''}Fat tissue makes little creatinine, so actual weight OVERestimates. In obesity we often use adjusted weight: IBW ≈ ${ibw.toFixed(1)} kg, AdjBW ≈ ${ibw.toFixed(1)} + 0.4 × (90 − ${ibw.toFixed(1)}) ≈ ${adj.toFixed(1)} kg → CrCl ≈ ${cra.toFixed(0)} mL/min.`,`${q===0?'ถูกต้อง! ':''}เนื้อเยื่อไขมันสร้างครีเอตินินน้อย ใช้น้ำหนักจริงจึง "ประเมินสูงเกิน" คนอ้วนมักใช้น้ำหนักปรับ: IBW ≈ ${ibw.toFixed(1)} กก. AdjBW ≈ ${ibw.toFixed(1)} + 0.4 × (90 − ${ibw.toFixed(1)}) ≈ ${adj.toFixed(1)} กก. → CrCl ≈ ${cra.toFixed(0)} mL/min`]);
    S.calc.crclAdj=+cra.toFixed(1);
  } else await say('yeh','happy',[`很好，你用了理想／調整體重——肥胖病人這樣比實際體重準。CrCl ≈ ${cr.toFixed(0)} mL/min。`,`Nice — you used an ideal/adjusted weight, which is more accurate than actual weight in obesity. CrCl ≈ ${cr.toFixed(0)} mL/min.`,`ดีมาก ใช้น้ำหนักในอุดมคติ/น้ำหนักปรับ ซึ่งแม่นกว่าน้ำหนักจริงในคนอ้วน CrCl ≈ ${cr.toFixed(0)} mL/min`]);
  await say('yeh','smug',['整理：eGFR 用來做 CKD 分期，metformin 的仿單也看 eGFR；但很多腎功能劑量表——例如 allopurinol、cephalexin（Keflex）——用的是 CrCl。查藥時先看它用哪一個指標！兩個都接近或低於 30，很多藥要調整。','To sum up: eGFR is for CKD staging, and the metformin label uses eGFR; but many renal dosing tables — e.g. allopurinol, cephalexin (Keflex) — use CrCl. Always check which measure the reference uses! Both are around or below 30 here, so many drugs need adjusting.','สรุป: eGFR ใช้แบ่งระยะ CKD และฉลากยา metformin ก็ใช้ eGFR แต่ตารางปรับขนาดยาตามไตหลายตัว เช่น allopurinol, cephalexin (Keflex) ใช้ CrCl ต้องดูว่าแหล่งอ้างอิงของยานั้นใช้ค่าไหน! ทั้งสองค่าของลุงใกล้หรือต่ำกว่า 30 ยาหลายตัวจึงต้องปรับ']);
}
async function chapter4(){
  S.chStart=realSec(); hideAll(); playTheme('tense'); S.medsSeen=true;
  await chapterCard(4);
  show('me','L','neutral'); show('yeh','R','smug');
  const missing=['endo_bag','hospB_bag','report'].filter(k=>!hasEv(k));
  if(missing.length){ show('wife','C','happy'); await say('wife','happy',['這些也是他的藥袋和報告，我都找出來了，你們一起看吧！','I found the rest of his med bags and reports — please take a look!','ป้าเจอซองยากับผลตรวจที่เหลือแล้ว ดูด้วยกันเลย!']); missing.forEach(k=>{ S.evidence.push(k); if(ITEMS[k].labs) S.notes.labsUnlocked=true; }); logEvent({type:'autoBags', items:missing}); hide('wife'); }
  S.notes.labsUnlocked=true;
  await say('yeh','smug',['最後一塊拼圖：把所有藥袋和檢驗報告攤開來，做「藥物整合」——這才是藥師真正的戰場！','The last piece of the puzzle: lay out every med bag and lab report and reconcile them — this is a pharmacist\'s real battlefield!','จิ๊กซอว์ชิ้นสุดท้าย: กางซองยาและผลแล็บทั้งหมดแล้วทำ "การทบทวนยา" นี่คือสนามรบจริงของเภสัชกร!']);
  await kidneyTask();
  reveal('P13');
  if(S.fl.kidney&&!EXAM()) await say('yeh','happy',['你在訪談時就問了腎臟的事——很有遠見！','You asked about his kidneys back in the interview — great foresight!','คุณถามเรื่องไตตั้งแต่ตอนสัมภาษณ์ — มองการณ์ไกลมาก!']);
  await say('yeh','angry',['可是看看這 11 種藥……三家醫院，沒有一位醫師依腎功能調整過！','But look at these 11 drugs… three prescribers, and not one adjusted anything for his kidneys!','แต่ดูยา 11 ตัวนี้สิ… สามแหล่ง ไม่มีหมอคนไหนปรับยาตามไตเลย!']);
  await say('pilly','shock',['藥袋危機！一共 6 個任務：點選有問題的藥（可以複選），再按「確認診斷」！','Med-bag crisis! 6 missions: tap the problem drugs (several may apply), then press "Confirm"!','วิกฤตซองยา! มี 6 ภารกิจ: แตะเลือกยาที่มีปัญหา (เลือกได้หลายตัว) แล้วกด "ยืนยัน"!']);
  for(let i=0;i<MISSIONS.length;i++){
    if(S.visit<=0){ S.fl.mrCut=i; break; }
    const m=MISSIONS[i]; hideAll(); hideText();
    const r=await missionUI(m,i,MISSIONS.length);
    S.mr.ans.push({id:m.id, sel:r.sel, perfect:r.perfect, partial:r.partial}); logEvent({type:'medrev', m:m.id, sel:r.sel, perfect:r.perfect, partial:r.partial});
    if(r.perfect) S.mr.perfect++; else if(r.partial) S.mr.partial++; else { S.mr.wrong++; spend(CONFIG.COST_WRONG); }
    if(EXAM()){ sfx.select(); toast(T('examNoted')); }
    else if(r.perfect) splash('perfect','gold','crit'); else if(r.partial){ sfx.hit(); toast('🔸 '+T('partial')); } else { sfx.error(); toast('❌ '+T('wrongDx')); }
    m.ans.forEach(id=>{ (S.mr.tags[id]=S.mr.tags[id]||[]).push(L(m.tag)); });
    await sleep(EXAM()?900:2300); $('#medrev').classList.add('hidden');
    if(!EXAM()){ show('yeh','R', r.perfect?'happy':r.partial?'think':'sad'); show('me','L','neutral');
      for(const x of m.x) await say('yeh','neutral',x); }
    reveal(m.p);
  }
  hideAll(); show('chen','C','sad'); show('me','L','neutral'); show('yeh','R','smug');
  await say('chen','shock',['原、原來我吃的藥有這麼多問題……難怪越吃越累、越沒胃口……','S-so my medicines had this many problems… no wonder I keep getting more tired with no appetite…','ยะ…ยาที่ลุงกินมีปัญหาเยอะขนาดนี้เลยเหรอ… มิน่าถึงเหนื่อยและไม่อยากกินข้าวขึ้นเรื่อยๆ…']);
  await say('yeh','smug',['別擔心，我們會把這些整理成「藥事照護建議」交給您的醫師。不過在那之前……','Don\'t worry — we\'ll write all this into a pharmaceutical care report for your doctors. But before that…','ไม่ต้องห่วง เราจะสรุปทั้งหมดเป็นข้อเสนอแนะให้แพทย์ของลุง แต่ก่อนอื่น…']);
  chapterDone(4);
}
