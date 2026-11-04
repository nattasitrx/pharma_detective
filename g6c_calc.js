/* =====================================================================
   FORMULA CALCULATOR — clue chips → formula slots → keypad → "=" check
   cfg: {id,title,intro,note,chips:[{v,l}],formula:[html|{s,l}|{tog,opts:[{v,l}]}],
         calc(v), unit, dp, check(v,r)→null|hint[3], answer:{}, solution[3]}
   ===================================================================== */
function ckdEpi2021(scr, age, female){ const k=female?0.7:0.9, a=female?-0.241:-0.302;
  return 142*Math.pow(Math.min(scr/k,1),a)*Math.pow(Math.max(scr/k,1),-1.2)*Math.pow(0.9938,age)*(female?1.012:1); }
const approx=(x,y,tol)=>Math.abs(x-y)<=(tol||0.001);
function calcPanel(cfg){
  return new Promise(res=>{
    const box=$('#calcBox'); let tries=0, active=null, done=false;
    D.calcId=cfg.id; D.calcAns=cfg.answer;
    $('#cTitle').textContent=L(cfg.title); $('#cIntro').innerHTML=esc(L(cfg.intro)); $('#cCluesLbl').textContent=T('calcClues');
    $('#cNote').innerHTML=cfg.note?esc(L(cfg.note)):''; $('#cNote').classList.toggle('hidden',!cfg.note);
    $('#cChips').innerHTML=cfg.chips.map(c=>`<button class="cchip" data-v="${c.v}"><b>${esc(c.v)}</b><small>${esc(L(c.l))}</small></button>`).join('');
    $('#cFormula').innerHTML=cfg.formula.map(t=>{
      if(typeof t==='string') return `<span class="ct">${t}</span>`;
      if(t.s) return `<label class="cslot"><input data-s="${t.s}" inputmode="decimal" autocomplete="off" spellcheck="false"><small>${esc(L(t.l))}</small></label>`;
      return `<span class="ctog" data-t="${t.tog}">${t.opts.map((o,i)=>`<button data-v="${o.v}" class="${i===0?'on':''}">${esc(L(o.l))}</button>`).join('')}</span>`;
    }).join('');
    $('#cPad').innerHTML=['7','8','9','⌫','4','5','6','C','1','2','3','.','0'].map(k=>`<button data-k="${k}" class="${k==='0'?'w2':''}${/[⌫C]/.test(k)?' fn':''}">${k}</button>`).join('')+`<button data-k="=" class="eq">＝</button>`;
    $('#cRes').textContent='—'; $('#cUnit').textContent=cfg.unit||''; $('#cMsg').className=''; $('#cMsg').textContent=''; $('#cTries').textContent='';
    $('#cGo').textContent=T('calcGo'); $('#cHint').textContent=T('calcHow');
    const ins=()=>Array.from(box.querySelectorAll('input[data-s]'));
    const setActive=i=>{ active=i; ins().forEach(x=>x.parentElement.classList.toggle('act',x===i)); };
    const nextEmpty=()=>ins().find(x=>!x.value.trim());
    ins().forEach(i=>{ i.onfocus=()=>setActive(i); i.oninput=()=>{ i.value=i.value.replace(/[^\d.]/g,''); }; i.onkeydown=e=>{ if(e.key==='Enter'){ e.preventDefault(); go(); } }; });
    setActive(ins()[0]);
    box.querySelectorAll('.cchip').forEach(b=>b.onclick=()=>{ if(done) return; const t=(active&&!active.value.trim())?active:(nextEmpty()||active); if(!t) return;
      t.value=b.dataset.v; sfx.select(); b.classList.add('used'); t.parentElement.animate([{transform:'scale(1.15)'},{transform:'none'}],{duration:220}); const n=nextEmpty(); setActive(n||t); (n||t).focus(); });
    box.querySelectorAll('.ctog').forEach(g=>g.querySelectorAll('button').forEach(b=>b.onclick=()=>{ if(done) return; g.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b)); sfx.click(); }));
    $('#cPad').querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{ if(done) return; const k=b.dataset.k; if(k==='='){ go(); return; } if(!active) return; sfx.click();
      if(k==='⌫') active.value=active.value.slice(0,-1); else if(k==='C') active.value=''; else if(!(k==='.'&&active.value.includes('.'))) active.value+=k; active.focus(); });
    const vals=()=>{ const v={}; ins().forEach(i=>v[i.dataset.s]=parseFloat(i.value)); box.querySelectorAll('.ctog').forEach(g=>v[g.dataset.t]=g.querySelector('.on').dataset.v); return v; };
    const fmtR=r=>!isFinite(r)?'Error':(r!==0&&Math.abs(r)<1)?r.toPrecision(2):r.toFixed(cfg.dp==null?1:cfg.dp);
    const msg=(t,c)=>{ const m=$('#cMsg'); m.textContent=t; m.className=c||''; m.animate([{opacity:0,transform:'translateY(6px)'},{opacity:1,transform:'none'}],{duration:250}); };
    const finish=(ok,v,r)=>{ box.classList.add('hidden'); D.calcGo=null; res({ok, tries, v, r}); };
    const go=()=>{ if(done) return;
      if(ins().some(i=>!i.value.trim()||isNaN(parseFloat(i.value)))){ sfx.error(); msg('✋ '+T('calcFill'),'warn'); (nextEmpty()||ins()[0]).focus(); return; }
      const v=vals(), r=cfg.calc(v); $('#cRes').textContent=fmtR(r); $('#cLcd').animate([{filter:'brightness(1.8)'},{filter:'none'}],{duration:350});
      const hint=cfg.check(v,r); tries++; $('#cTries').textContent=T('calcTry')+' '+tries+'/3';
      logEvent({type:'calc', id:cfg.id, vals:v, result:isFinite(r)?+r.toFixed(2):null, ok:!hint, attempt:tries});
      if(!hint){ done=true; sfx.get(); msg('✅ '+T('calcOk')+'  '+fmtR(r)+' '+(cfg.unit||''),'ok'); setTimeout(()=>finish(true,v,r),1500); return; }
      sfx.error(); spend(1); hud(); msg(EXAM()?'❌ '+L(['還不對——再檢查一次數字放的位置和單位。','Not right yet — check where each number goes and the units.','ยังไม่ถูก — ตรวจอีกครั้งว่าใส่ตัวเลขถูกช่องและหน่วยถูกไหม']):'💡 '+L(hint),'bad');
      if(tries>=3){ done=true; const a=cfg.answer;
        setTimeout(()=>{ ins().forEach(i=>{ if(a[i.dataset.s]!=null) i.value=a[i.dataset.s]; }); box.querySelectorAll('.ctog').forEach(g=>g.querySelectorAll('button').forEach(b=>b.classList.toggle('on',b.dataset.v===a[g.dataset.t])));
          const r2=cfg.calc(a); $('#cRes').textContent=fmtR(r2); msg('📘 '+L(cfg.solution),'sol'); $('#cGo').textContent=T('calcCont'); $('#cGo').onclick=()=>{ sfx.click(); finish(false,a,r2); }; D.calcGo=()=>finish(false,a,r2); },900); }
    };
    $('#cGo').onclick=go; D.calcGo=go;
    box.classList.remove('hidden'); setTimeout(()=>ins()[0]&&ins()[0].focus(),100);
  });
}
/* ---------- the three calculations used in the story ---------- */
const CLUE_AGE={v:'65', l:['年齡（歲）','Age (years)','อายุ (ปี)']},
      CLUE_HT={v:'173', l:['身高（cm）','Height (cm)','ส่วนสูง (ซม.)']}, CLUE_WT={v:'90', l:['體重（kg）','Weight (kg)','น้ำหนัก (กก.)']},
      CLUE_CR={v:'2.9', l:['肌酸酐 mg/dL（最新 2021/02/18）','Creatinine mg/dL (latest, 18 Feb 2021)','ครีเอตินิน mg/dL (ล่าสุด 18 ก.พ. 2021)']},
      CLUE_A1C={v:'8.3', l:['HbA1c（%）','HbA1c (%)','HbA1c (%)']};
const CALC_BMI={ id:'bmi', title:['🧮 計算陳伯的 BMI','🧮 Work out Uncle Chen\'s BMI','🧮 คำนวณ BMI ของลุงเฉิน'],
  intro:['把剛剛問到的數字放進公式正確的位置。點「線索」會填進目前選取的空格；也可以用鍵盤或右邊的按鍵修改。','Put the numbers you just heard into the right places. Tapping a clue fills the selected box; you can edit with the keyboard or the keypad.','นำตัวเลขที่เพิ่งถามได้ใส่ในสูตรให้ถูกช่อง แตะ "เบาะแส" เพื่อเติมลงช่องที่เลือก แก้ไขได้ด้วยคีย์บอร์ดหรือปุ่มกดด้านขวา'],
  chips:[CLUE_AGE,CLUE_HT,CLUE_WT],
  formula:['BMI =',{s:'w',l:['體重 kg','weight kg','น้ำหนัก กก.']},'÷','(',{s:'h',l:['身高 m','height m','ส่วนสูง ม.']},')²'],
  calc:v=>v.w/(v.h*v.h), unit:'kg/m²', dp:1, answer:{w:90,h:1.73},
  check:v=>{ if(approx(v.w,173,1)||approx(v.w,1.73,.01)) return ['體重和身高是不是放反了？','Are weight and height swapped?','สลับน้ำหนักกับส่วนสูงหรือเปล่า?'];
    if(!approx(v.w,90,.5)) return ['分子（÷ 前面）要放「體重（公斤）」。','The number before ÷ must be the weight in kg.','ตัวเลขหน้า ÷ ต้องเป็น "น้ำหนัก (กก.)"'];
    if(approx(v.h,173,1)) return ['單位！身高要換成「公尺」：173 cm = ? m','Units! Height must be in metres: 173 cm = ? m','หน่วย! ส่วนสูงต้องเป็น "เมตร": 173 ซม. = ? ม.'];
    if(!approx(v.h,1.73,.006)) return ['括號裡要放「身高（公尺）」，再平方。','The bracket needs the height in metres, then squared.','ในวงเล็บต้องใส่ "ส่วนสูง (เมตร)" แล้วยกกำลังสอง'];
    return null; },
  solution:['BMI = 體重(kg) ÷ 身高(m)² = 90 ÷ 1.73² = 90 ÷ 2.99 ≈ 30.1 kg/m²','BMI = weight (kg) ÷ height (m)² = 90 ÷ 1.73² = 90 ÷ 2.99 ≈ 30.1 kg/m²','BMI = น้ำหนัก (กก.) ÷ ส่วนสูง (ม.)² = 90 ÷ 1.73² = 90 ÷ 2.99 ≈ 30.1 kg/m²'] };
const CALC_EGFR={ id:'egfr', title:['📱 eGFR 計算工具（CKD-EPI 2021）','📱 eGFR calculator (CKD-EPI 2021)','📱 เครื่องคิด eGFR (CKD-EPI 2021)'],
  intro:['eGFR 公式有小數次方，臨床上不用手算——檢驗報告會印出來，或用計算工具。你的任務：判斷工具需要「哪些」數字，放進去。','The eGFR equation has fractional exponents — nobody does it by hand; the lab prints it or you use a calculator. Your job: decide WHICH numbers the tool needs and enter them.','สูตร eGFR มีเลขยกกำลังทศนิยม ในทางปฏิบัติไม่มีใครคิดมือ แล็บจะพิมพ์ค่ามาให้หรือใช้เครื่องคิด หน้าที่ของคุณ: เลือกว่าเครื่องต้องใช้ตัวเลข "อะไรบ้าง" แล้วใส่ให้ถูก'],
  note:['公式：142 × min(Scr/κ,1)^α × max(Scr/κ,1)^−1.200 × 0.9938^年齡 × 1.012［女性］（男 κ=0.9, α=−0.302）','Equation: 142 × min(Scr/κ,1)^α × max(Scr/κ,1)^−1.200 × 0.9938^age × 1.012 [female] (male κ=0.9, α=−0.302)','สูตร: 142 × min(Scr/κ,1)^α × max(Scr/κ,1)^−1.200 × 0.9938^อายุ × 1.012 [หญิง] (ชาย κ=0.9, α=−0.302)'],
  chips:[CLUE_WT,CLUE_AGE,CLUE_A1C,CLUE_CR,CLUE_HT],
  formula:['eGFR = CKD-EPI (',{s:'age',l:['年齡','age','อายุ']},',',{tog:'sex',opts:[{v:'m',l:['男','Male','ชาย']},{v:'f',l:['女','Female','หญิง']}]},',',{s:'scr',l:['Scr mg/dL','Scr mg/dL','Scr mg/dL']},')'],
  calc:v=>ckdEpi2021(v.scr,v.age,v.sex==='f'), unit:'mL/min/1.73m²', dp:0, answer:{age:65,sex:'m',scr:2.9},
  check:v=>{ if(approx(v.age,1955,1)) return ['年齡不是出生年喔！','Age, not birth year!','ใส่อายุ ไม่ใช่ปีเกิด!'];
    if(approx(v.age,90,.5)||approx(v.scr,90,.5)||approx(v.age,173,1)||approx(v.scr,173,1)) return ['eGFR 公式不需要體重或身高！它只用年齡、性別和肌酸酐。','The eGFR equation needs no weight or height — only age, sex and creatinine.','สูตร eGFR ไม่ใช้น้ำหนักหรือส่วนสูง ใช้แค่อายุ เพศ และครีเอตินิน'];
    if(!approx(v.age,65,.5)) return ['年齡填對了嗎？陳伯今年 65 歲。','Check the age — Uncle Chen is 65.','อายุถูกไหม? ลุงเฉินอายุ 65'];
    if(v.sex!=='m') return ['性別選對了嗎？','Check the sex.','เลือกเพศถูกไหม?'];
    if(![2.9,3,3.2].some(x=>approx(v.scr,x,.01))) return ['Scr 是檢驗報告上的「肌酸酐」(mg/dL)。','Scr is the creatinine from the lab report (mg/dL).','Scr คือ "ครีเอตินิน" จากใบผลแล็บ (mg/dL)'];
    return null; },
  solution:['需要：年齡 65、男性、Scr 2.9 → eGFR ≈ 23 mL/min/1.73m²（體重、身高都不用）','Inputs: age 65, male, Scr 2.9 → eGFR ≈ 23 mL/min/1.73m² (no weight, no height)','ต้องใช้: อายุ 65, ชาย, Scr 2.9 → eGFR ≈ 23 mL/min/1.73m² (ไม่ใช้น้ำหนักและส่วนสูง)'] };
const CALC_CRCL={ id:'crcl', title:['✍️ 手算 CrCl（Cockcroft–Gault）','✍️ CrCl by hand (Cockcroft–Gault)','✍️ คิด CrCl ด้วยมือ (Cockcroft–Gault)'],
  intro:['很多腎功能劑量表用的是 CrCl。這個公式只有加減乘除，自己算得出來！把數字放進正確的位置。','Many renal dosing tables use CrCl. This one is plain arithmetic — you can do it yourself! Put each number in the right place.','ตารางปรับขนาดยาตามไตหลายตัวใช้ CrCl สูตรนี้มีแค่บวกลบคูณหาร คิดเองได้! ใส่ตัวเลขให้ถูกตำแหน่ง'],
  chips:[CLUE_HT,CLUE_AGE,CLUE_CR,CLUE_WT,CLUE_A1C],
  formula:['CrCl =','(140 −',{s:'age',l:['年齡','age','อายุ']},')','×',{s:'wt',l:['體重 kg','weight kg','น้ำหนัก กก.']},'÷','(72 ×',{s:'scr',l:['Scr mg/dL','Scr mg/dL','Scr mg/dL']},')',{tog:'sex',opts:[{v:'m',l:['男 ×1','Male ×1','ชาย ×1']},{v:'f',l:['女 ×0.85','Female ×0.85','หญิง ×0.85']}]}],
  calc:v=>(140-v.age)*v.wt/(72*v.scr)*(v.sex==='f'?0.85:1), unit:'mL/min', dp:1, answer:{age:65,wt:90,scr:2.9,sex:'m'},
  check:v=>{ if(approx(v.age,1955,1)) return ['年齡不是出生年喔！','Age, not birth year!','ใส่อายุ ไม่ใช่ปีเกิด!'];
    if(approx(v.wt,173,1)||approx(v.wt,1.73,.01)) return ['那是身高——這格要放體重（kg）。','That\'s the height — this box needs weight (kg).','นั่นคือส่วนสูง ช่องนี้ต้องใส่น้ำหนัก (กก.)'];
    if(approx(v.age,90,.5)&&approx(v.wt,65,.5)) return ['年齡和體重放反了？','Age and weight swapped?','สลับอายุกับน้ำหนักหรือเปล่า?'];
    if(!approx(v.age,65,.5)) return ['(140 − 年齡)：陳伯 65 歲。','(140 − age): Uncle Chen is 65.','(140 − อายุ): ลุงเฉินอายุ 65'];
    if(!(approx(v.wt,90,.5)||(v.wt>=68&&v.wt<=79))) return ['體重要用公斤（實際體重 90 kg，或調整體重）。','Weight in kg (actual 90 kg, or an adjusted weight).','น้ำหนักเป็นกิโลกรัม (น้ำหนักจริง 90 กก. หรือน้ำหนักปรับ)'];
    if(![2.9,3,3.2].some(x=>approx(v.scr,x,.01))) return ['分母要放肌酸酐 Scr（mg/dL）。','The denominator needs creatinine, Scr (mg/dL).','ตัวหารต้องใส่ครีเอตินิน Scr (mg/dL)'];
    if(v.sex!=='m') return ['陳伯是男性，不用 ×0.85。','Uncle Chen is male — no ×0.85.','ลุงเฉินเป็นผู้ชาย ไม่ต้อง ×0.85'];
    return null; },
  solution:['CrCl = (140 − 65) × 90 ÷ (72 × 2.9) = 6750 ÷ 208.8 ≈ 32.3 mL/min','CrCl = (140 − 65) × 90 ÷ (72 × 2.9) = 6750 ÷ 208.8 ≈ 32.3 mL/min','CrCl = (140 − 65) × 90 ÷ (72 × 2.9) = 6750 ÷ 208.8 ≈ 32.3 mL/min'] };
