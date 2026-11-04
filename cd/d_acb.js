/* ---- mission 2, hands-on: sort his medicines by anticholinergic load (strong · some/local · none) ---- */
const ACB_KEY={benamine:['strong'], peace:['strong'], royamet:['some'], spiolto:['some'], clarinase:['none','some'], famo:['none','some'], sketa:['none','some'], mopride:['none'], minidiab:['none'], amtrel:['none']};
const ACB_G={peace:'triprolidine + pseudoephedrine', spiolto:'tiotropium + olodaterol (inhaled)', clarinase:'loratadine + pseudoephedrine', sketa:'chlorzoxazone + acetaminophen', amtrel:'amlodipine + benazepril'};
const ACB_BINS=[['strong',['🔴 強烈抗膽鹼（Beers：長者避免）','🔴 Strongly anticholinergic (Beers: avoid)','🔴 ต้านโคลิเนอร์จิกแรง (Beers: เลี่ยง)'],3],['some',['🟡 有一些／局部','🟡 Some / mainly local','🟡 มีบ้าง / เฉพาะที่'],1],['none',['⚪ 幾乎沒有','⚪ Little or none','⚪ แทบไม่มี'],0]];
const ACB_FX=[['👄',['口乾','dry mouth','ปากแห้ง']],['🚽',['尿不出來','urinary retention','ปัสสาวะไม่ออก']],['💩',['便秘','constipation','ท้องผูก']],['🌀',['混亂、嗜睡','confusion, drowsiness','สับสน ง่วง']],['🧍',['跌倒','falls','หกล้ม']]];
function acbCss(){ if($('#acbCss')) return; const st=document.createElement('style'); st.id='acbCss'; st.textContent=`
#medrev .acb-tray{display:flex;flex-wrap:wrap;gap:8px;min-height:64px;padding:8px;border-radius:16px;background:#f6f4fb;margin-top:10px}
#medrev .acb-bins{flex:1;display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:10px 0 8px;min-height:0}
#medrev .acb-bin{border-radius:18px;border:4px dashed #d9d3ea;background:#fbfaff;padding:8px;display:flex;flex-direction:column;gap:6px;overflow:auto;cursor:pointer;min-height:0}
#medrev .acb-bin[data-bin=strong]{border-color:#ff9db0;background:#fff4f6}#medrev .acb-bin[data-bin=some]{border-color:#ffd77a;background:#fffaee}
#medrev .acb-bin h4{margin:0 0 4px;font-size:16px;line-height:1.25;color:#3a2a4a}
#medrev .acb-bin.over{box-shadow:0 0 0 5px #13a39a}
#medrev .acard{display:flex;align-items:center;gap:6px;border-radius:12px;padding:6px 10px;background:#fff;font-weight:800;font-size:15px;line-height:1.2;box-shadow:0 0 0 2px #e6e9f5;cursor:grab;touch-action:none;text-align:left}
#medrev .acard small{color:#6a6585;font-weight:700;font-size:12px}
#medrev .acard .acls{display:block;font-style:normal;color:#8a4fb8;font-weight:700;font-size:11.5px;line-height:1.2;margin-top:2px}
#medrev .acard.sel{box-shadow:0 0 0 4px #13a39a;background:#e8fbf8}
#medrev .acard.ok{box-shadow:0 0 0 4px #18b07f;background:#eafff6}#medrev .acard.bad{box-shadow:0 0 0 4px #ff3d5c;background:#ffecee}
#medrev .acb-load{display:flex;align-items:center;gap:10px;margin-top:6px}
#medrev .acb-load .meter{flex:1;height:22px;border-radius:99px;background:#f0ecf8;overflow:hidden;box-shadow:inset 0 0 0 2px #e2dbf2}
#medrev .acb-load .meter b{display:block;height:100%;width:0;background:linear-gradient(90deg,#ffd166,#ff3d5c);transition:width .3s}
#medrev .acb-fx span{display:inline-block;margin-left:4px;font-size:20px;opacity:.2;transition:opacity .3s,transform .3s}#medrev .acb-fx span.on{opacity:1;transform:scale(1.15)}`; document.head.appendChild(st); }
function acbSortUI(m, i, n){
  return new Promise(res=>{ acbCss();
    let host=$('#medrev'); if(!host){ host=document.createElement('div'); host.id='medrev'; $('#stage').appendChild(host); }
    const ex=EXAM(), ids=Object.keys(ACB_KEY), byId=Object.fromEntries(DRUGS.map(d=>[d.id,d])), at={};
    if(ex) for(let a=ids.length-1;a>0;a--){ const b=Math.floor(Math.random()*(a+1)); [ids[a],ids[b]]=[ids[b],ids[a]]; }
    const card=id=>{ const d=byId[id]; return `<button class="acard" data-d="${id}"><span>${esc(d.n.split(' ')[0])}<br><small>${esc(ACB_G[id]||d.g.split(/[ (]/)[0])}</small>${d.cls?`<i class="acls">${esc(L(d.cls))}</i>`:''}</span></button>`; };
    host.innerHTML=`<div class="mr-main"><div class="mr-head"><span class="no">🚨 ${T('mission')} ${i+1}/${n}</span><span class="tx">${esc(L(['把李伯伯的藥依「抗膽鹼負擔」分類：拖進（或點選再點）下面三個籃子。','Sort Uncle Lee\'s medicines by anticholinergic load: drag them (or tap, then tap a basket) into the three baskets.','จัดยาของลุงหลี่ตาม "ภาระฤทธิ์ต้านโคลิเนอร์จิก": ลาก (หรือแตะแล้วแตะตะกร้า) ลงตะกร้าทั้งสามใบ']))}</span><span id="mrTimer"></span></div>
      <div class="acb-tray" id="acbTray">${ids.map(card).join('')}</div>
      <div class="acb-bins">${ACB_BINS.map(([k,t])=>`<div class="acb-bin" data-bin="${k}"><h4>${esc(L(t))}</h4></div>`).join('')}</div>
      <div class="acb-load"><b style="white-space:nowrap">🧠 ${esc(L(['總負擔','Total load','ภาระรวม']))}</b><div class="meter"><b id="acbBar"></b></div><span class="acb-fx" id="acbFx">${ACB_FX.map(([e,t])=>`<span title="${esc(L(t))}">${e}</span>`).join('')}</span></div>
      <div class="mr-act"><span class="hint">${esc(L(['88 歲＋攝護腺肥大＋常頭暈：負擔越重越危險','88 + BPH + dizzy spells: the heavier the load, the greater the danger','อายุ 88 + ต่อมลูกหมากโต + เวียนหัวบ่อย: ภาระยิ่งมากยิ่งอันตราย']))} · ${T('selected')}: <b id="mrCount">0</b>/${ids.length}</span><button class="gbtn" id="mrOk">${T('confirmDx')}</button></div></div>
      <div class="mr-side">${labPanelHTML()}</div>`;
    host.classList.remove('hidden'); host.style.animation='none'; void host.offsetWidth; host.style.animation='';
    $('#mrSheet').onclick=()=>zoomImg(IMG.labs);
    let done=false, iv=null, sel=null;
    const load=()=>{ const v=Object.values(at).reduce((a,b)=>a+(ACB_BINS.find(x=>x[0]===b)[2]),0); $('#acbBar').style.width=Math.min(100,v/10*100)+'%';
      [...$('#acbFx').children].forEach((e,j)=>e.classList.toggle('on',v>=[1,3,4,6,7][j])); $('#mrCount').textContent=Object.keys(at).length; };
    const put=(el,bin)=>{ if(done) return; const id=el.dataset.d; if(bin){ at[id]=bin; host.querySelector(`.acb-bin[data-bin="${bin}"]`).appendChild(el); } else { delete at[id]; $('#acbTray').appendChild(el); } el.classList.remove('sel'); sel=null; sfx.select(); load(); };
    host.querySelectorAll('.acb-bin').forEach(b=>b.addEventListener('click',e=>{ if(e.target.closest('.acard')) return; if(sel) put(sel,b.dataset.bin); }));
    $('#acbTray').addEventListener('click',e=>{ if(e.target.closest('.acard')) return; if(sel) put(sel,null); });
    host.querySelectorAll('.acard').forEach(c=>c.addEventListener('pointerdown',e=>{ if(done) return; e.preventDefault();
      const st=$('#stage').getBoundingClientRect(), k=st.width/1600, x0=e.clientX, y0=e.clientY; let moved=0, over=null; try{ c.setPointerCapture(e.pointerId); }catch(_){}
      const mv=ev=>{ moved=Math.max(moved,Math.hypot(ev.clientX-x0,ev.clientY-y0)/k); if(moved<8) return; c.style.transform=`translate(${(ev.clientX-x0)/k}px,${(ev.clientY-y0)/k}px)`; c.style.zIndex=50; c.style.position='relative';
        const t=document.elementsFromPoint(ev.clientX,ev.clientY).find(nd=>nd.classList&&(nd.classList.contains('acb-bin')||nd.id==='acbTray')); if(t!==over){ over&&over.classList.remove('over'); over=t; over&&over.classList.add('over'); } };
      const up=()=>{ c.removeEventListener('pointermove',mv); c.removeEventListener('pointerup',up); c.removeEventListener('pointercancel',up); c.style.transform=''; c.style.zIndex=''; over&&over.classList.remove('over');
        if(moved<8){ if(sel===c){ c.classList.remove('sel'); sel=null; } else { sel&&sel.classList.remove('sel'); sel=c; c.classList.add('sel'); sfx.select(); } return; }
        if(over) put(c, over.id==='acbTray'?null:over.dataset.bin); };
      c.addEventListener('pointermove',mv); c.addEventListener('pointerup',up); c.addEventListener('pointercancel',up); }));
    const fin=()=>{ if(done) return; done=true; clearInterval(iv); D.choiceFinish=null; $('#mrTimer').innerHTML='';
      const strong=ids.filter(id=>at[id]==='strong'), ans=new Set(m.ans), hit=strong.filter(x=>ans.has(x)), extra=strong.filter(x=>!ans.has(x)), missed=m.ans.filter(x=>at[x]!=='strong');
      const wrong=ids.filter(id=>!(ACB_KEY[id]||[]).includes(at[id]||'—'));
      host.querySelectorAll('.acard').forEach(c=>{ const id=c.dataset.d; if(ex){ c.style.opacity='.6'; return; } c.classList.add(wrong.includes(id)?'bad':'ok'); });
      const perfect=!extra.length&&!missed.length&&!wrong.length, partial=!perfect&&hit.length>0;
      S.calc.acb={ok:perfect, wrong:wrong.length}; res({sel:strong, hit, extra, missed, perfect, partial, bins:Object.assign({},at), wrong}); };
    $('#mrOk').onclick=()=>{ const left=ids.filter(id=>!at[id]); if(left.length){ sfx.error(); toast('🧠 '+L(['每個藥都要放進籃子','Put every medicine in a basket','ใส่ยาทุกตัวลงตะกร้า'])+` (${left.length})`); return; } fin(); };
    if(S.qte){ const T0=performance.now(), LIM=90; let last=LIM; $('#mrTimer').innerHTML=`<div id="qte" style="--p:100%">${LIM}</div>`;
      iv=setInterval(()=>{ const rem=Math.max(0,LIM-(performance.now()-T0)/1000), q=$('#mrTimer #qte'); if(q){ q.textContent=Math.ceil(rem); q.style.setProperty('--p',(rem/LIM*100)+'%'); }
        if(rem<=5&&Math.ceil(rem)!==last){ last=Math.ceil(rem); sfx.tick(); } if(rem<=0){ sfx.error(); fin(); } },100); }
    load();
  });
}
