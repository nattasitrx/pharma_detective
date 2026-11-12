/* ---- mission 2, hands-on: pick the medicines the Beers Criteria say to avoid (strongly anticholinergic) into one red basket.
   Simplified 12 Nov 2026: one basket, six cards (was three baskets, ten cards, every card graded). ---- */
const ACB_RED=['benamine','peace'];
const ACB_IDS=['benamine','clarinase','peace','spiolto','mopride','amtrel'];
const ACB_G={peace:'triprolidine + pseudoephedrine', spiolto:'tiotropium + olodaterol (inhaled)', clarinase:'loratadine + pseudoephedrine', amtrel:'amlodipine + benazepril'};
const ACB_WHY={
  benamine:['第一代抗組織胺：嗜睡、強烈抗膽鹼','1st-gen antihistamine: sedating, strongly anticholinergic','ยาแก้แพ้รุ่นแรก: ง่วง ต้านโคลิเนอร์จิกแรง'],
  peace:['triprolidine 也是第一代抗組織胺','triprolidine is a 1st-gen antihistamine too','triprolidine ก็เป็นยาแก้แพ้รุ่นแรก'],
  clarinase:['loratadine 是不嗜睡的第二代（問題在偽麻黃鹼重複）','loratadine is a non-sedating 2nd-gen (its problem is the doubled pseudoephedrine)','loratadine เป็นรุ่นสอง ไม่ง่วง (ปัญหาของมันคือ pseudoephedrine ซ้ำ)'],
  spiolto:['吸入劑，主要作用在肺','inhaled, works mainly in the lungs','ยาพ่น ออกฤทธิ์เฉพาะที่ปอดเป็นหลัก'],
  mopride:['腸胃蠕動藥，沒有抗膽鹼作用','a gut-motility drug, not anticholinergic','ยากระตุ้นลำไส้ ไม่ต้านโคลิเนอร์จิก'],
  amtrel:['降血壓藥，沒有抗膽鹼作用','a blood-pressure drug, not anticholinergic','ยาลดความดัน ไม่ต้านโคลิเนอร์จิก']};
const ACB_BINS=[['strong',['🔴 該避免（Beers）：強烈抗膽鹼','🔴 Avoid (Beers): strongly anticholinergic','🔴 ควรเลี่ยง (Beers): ต้านโคลิเนอร์จิกแรง'],3]];
function acbCss(){ if($('#acbCss')) return; const st=document.createElement('style'); st.id='acbCss'; st.textContent=`
#medrev .acb-tray{display:flex;flex-wrap:wrap;gap:12px;min-height:90px;padding:12px;border-radius:18px;background:#f6f4fb;margin-top:12px;align-content:flex-start}
#medrev .acb-bins{flex:1;display:flex;margin:14px 0 8px;min-height:0}
#medrev .acb-bin{flex:1;border-radius:22px;border:5px dashed #ff9db0;background:#fff4f6;padding:12px;display:flex;flex-wrap:wrap;gap:12px;align-content:flex-start;overflow:auto;cursor:pointer;min-height:0}
#medrev .acb-bin h4{flex:0 0 100%;margin:0 0 2px;font-size:22px;line-height:1.25;color:#b0213f}
#medrev .acb-bin.over{box-shadow:0 0 0 5px #13a39a}
#medrev .acard{display:flex;align-items:center;gap:6px;border-radius:14px;padding:10px 14px;background:#fff;font-weight:800;font-size:19px;line-height:1.25;box-shadow:0 0 0 2px #e6e9f5;cursor:grab;touch-action:none;text-align:left;max-width:330px}
#medrev .acard small{color:#6a6585;font-weight:700;font-size:14px}
#medrev .acard .acls{display:block;font-style:normal;color:#8a4fb8;font-weight:700;font-size:14px;line-height:1.25;margin-top:3px}
#medrev .acard .awhy{display:block;font-style:normal;color:#5a4a20;font-weight:700;font-size:14px;line-height:1.25;margin-top:4px}
#medrev .acard.ok{box-shadow:0 0 0 4px #18b07f;background:#eafff6}#medrev .acard.bad{box-shadow:0 0 0 4px #ff3d5c;background:#ffecee}
#medrev .acard.miss{box-shadow:0 0 0 4px #f0a000;background:#fff6dc}#medrev .acard.rest{opacity:.55}
#medrev .acard.miss::after{position:absolute;top:-12px;left:-10px;width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:900;color:#fff;box-shadow:0 0 0 3px #fff,0 3px 8px rgba(0,0,0,.25);z-index:2;content:'!';background:#f0a000}
#medrev .acard{position:relative}#medrev .acard::after{left:auto!important;right:-12px}`; document.head.appendChild(st); }
function acbSortUI(m, i, n){
  return new Promise(res=>{ acbCss();
    let host=$('#medrev'); if(!host){ host=document.createElement('div'); host.id='medrev'; $('#stage').appendChild(host); }
    const ex=EXAM(), ids=ACB_IDS.slice(), byId=Object.fromEntries(DRUGS.map(d=>[d.id,d])), inRed=new Set();
    if(ex) for(let a=ids.length-1;a>0;a--){ const b=Math.floor(Math.random()*(a+1)); [ids[a],ids[b]]=[ids[b],ids[a]]; }
    const card=id=>{ const d=byId[id]; return `<button class="acard" data-d="${id}"><span>${esc(d.n.split(' ')[0])}<br><small>${esc(ACB_G[id]||d.g.split(/[ (]/)[0])}</small>${d.cls?`<i class="acls">${esc(L(d.cls))}</i>`:''}</span></button>`; };
    host.innerHTML=`<div class="mr-main"><div class="mr-head"><span class="no">🚨 ${T('mission')} ${i+1}/${n}</span><span class="tx">${esc(L(['哪些藥是 Beers 準則建議長者避免、抗膽鹼作用很強的？點一下放進紅色籃子（再點一下拿出來）。','Which of these are strongly anticholinergic drugs the Beers Criteria say older adults should avoid? Tap to put them in the red basket (tap again to take out).','ยาตัวไหนต้านโคลิเนอร์จิกแรง ที่ Beers Criteria ให้ผู้สูงอายุเลี่ยง? แตะเพื่อใส่ตะกร้าแดง (แตะอีกครั้งเพื่อเอาออก)']))}</span><span id="mrTimer"></span></div>
      <div class="acb-tray" id="acbTray">${ids.map(card).join('')}</div>
      <div class="acb-bins"><div class="acb-bin" data-bin="strong"><h4>${esc(L(ACB_BINS[0][1]))}</h4></div></div>
      <div class="mr-act"><span class="hint">${esc(L(['88 歲＋攝護腺肥大＋常頭暈','88 + BPH + dizzy spells','อายุ 88 + ต่อมลูกหมากโต + เวียนหัวบ่อย']))} · ${T('selected')}: <b id="mrCount">0</b></span><button class="gbtn" id="mrOk">${T('confirmDx')}</button></div></div>
      <div class="mr-side">${labPanelHTML()}</div>`;
    host.classList.remove('hidden'); host.style.animation='none'; void host.offsetWidth; host.style.animation='';
    $('#mrSheet').onclick=()=>zoomImg(IMG.labs);
    const bin=host.querySelector('.acb-bin');
    let done=false, iv=null;
    const put=(el,red)=>{ if(done) return; const id=el.dataset.d; if(red){ inRed.add(id); bin.appendChild(el); } else { inRed.delete(id); $('#acbTray').appendChild(el); } sfx.select(); $('#mrCount').textContent=inRed.size; };
    host.querySelectorAll('.acard').forEach(c=>c.addEventListener('pointerdown',e=>{ if(done) return; e.preventDefault();
      const st=$('#stage').getBoundingClientRect(), k=st.width/1600, x0=e.clientX, y0=e.clientY; let moved=0, over=null; try{ c.setPointerCapture(e.pointerId); }catch(_){}
      const mv=ev=>{ moved=Math.max(moved,Math.hypot(ev.clientX-x0,ev.clientY-y0)/k); if(moved<8) return; c.style.transform=`translate(${(ev.clientX-x0)/k}px,${(ev.clientY-y0)/k}px)`; c.style.zIndex=50;
        const t=document.elementsFromPoint(ev.clientX,ev.clientY).find(nd=>nd.classList&&(nd.classList.contains('acb-bin')||nd.id==='acbTray')); if(t!==over){ over&&over.classList.remove('over'); over=t; over&&over.classList.add('over'); } };
      const up=()=>{ c.removeEventListener('pointermove',mv); c.removeEventListener('pointerup',up); c.removeEventListener('pointercancel',up); c.style.transform=''; c.style.zIndex=''; over&&over.classList.remove('over');
        if(moved<8){ put(c,!inRed.has(c.dataset.d)); return; }
        if(over) put(c, over!==$('#acbTray')); };
      c.addEventListener('pointermove',mv); c.addEventListener('pointerup',up); c.addEventListener('pointercancel',up); }));
    const fin=()=>{ if(done) return; done=true; clearInterval(iv); D.choiceFinish=null; $('#mrTimer').innerHTML='';
      const strong=ids.filter(id=>inRed.has(id)), ans=new Set(m.ans), hit=strong.filter(x=>ans.has(x)), extra=strong.filter(x=>!ans.has(x)), missed=m.ans.filter(x=>!inRed.has(x));
      const wrong=extra.concat(missed);
      host.querySelectorAll('.acard').forEach(c=>{ const id=c.dataset.d; if(ex){ c.style.opacity='.6'; return; }
        const cls=extra.includes(id)?'bad':missed.includes(id)?'miss':inRed.has(id)?'ok':'rest'; c.classList.add(cls);
        if(cls!=='rest'&&ACB_WHY[id]) c.querySelector('span').insertAdjacentHTML('beforeend',`<i class="awhy">💡 ${esc(L(ACB_WHY[id]))}</i>`); });
      const perfect=!extra.length&&!missed.length, partial=!perfect&&hit.length>0;
      S.calc.acb={ok:perfect, wrong:wrong.length}; res({sel:strong, hit, extra, missed, perfect, partial, bins:Object.fromEntries(strong.map(x=>[x,'strong'])), wrong}); };
    $('#mrOk').onclick=()=>{ if(!inRed.size){ sfx.error(); toast('🔴 '+L(['先把藥放進紅色籃子','Put at least one medicine in the red basket','ใส่ยาลงตะกร้าแดงก่อนอย่างน้อยหนึ่งตัว'])); return; } fin(); };
    if(S.qte){ const T0=performance.now(), LIM=60; let last=LIM; $('#mrTimer').innerHTML=`<div id="qte" style="--p:100%">${LIM}</div>`;
      iv=setInterval(()=>{ const rem=Math.max(0,LIM-(performance.now()-T0)/1000), q=$('#mrTimer #qte'); if(q){ q.textContent=Math.ceil(rem); q.style.setProperty('--p',(rem/LIM*100)+'%'); }
        if(rem<=5&&Math.ceil(rem)!==last){ last=Math.ceil(rem); sfx.tick(); } if(rem<=0){ sfx.error(); fin(); } },100); }
  });
}
