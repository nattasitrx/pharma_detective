/* =====================================================================
   📝 MY NOTES on the title screen — read the drug notes and free notes without starting the game
   Every game saved on this device (this case) keeps its notes in the session list; this window lists the games
   that have notes, shows the drug table / by-group view / free notes read-only, and can print or save them as a PDF.
   Editing stays in the game (📁 Case file → 📝), so the notes never get out of step with a game in progress.
   ===================================================================== */
const MNT={ btn:['📝 我的筆記','📝 My notes','📝 โน้ตของฉัน'], title:['📝 我的筆記','📝 My notes','📝 โน้ตของฉัน'],
  pick:['哪一場遊戲的筆記：','Notes from which game:','โน้ตจากเกมไหน:'],
  done:['已破關','finished','เล่นจบแล้ว'], playing:['進行中','in progress','ยังเล่นไม่จบ'],
  none:['這台裝置上還沒有筆記。在遊戲中打開「📁 案件檔案 → 📝 筆記」寫下的內容，會出現在這裡。','No notes on this device yet. What you write in the game under 📁 Case file → 📝 Notes shows up here.','ยังไม่มีโน้ตในเครื่องนี้ ที่จดไว้ในเกม (📁 แฟ้มคดี → 📝 โน้ต) จะมาขึ้นที่นี่'],
  empty:['這一場還沒有寫這一類的筆記。','Nothing written here in this game yet.','เกมนี้ยังไม่ได้จดส่วนนี้'],
  ro:['這裡只能看；要修改請進遊戲：📁 案件檔案 → 📝 筆記。','Read-only here — to edit, open the game: 📁 Case file → 📝 Notes.','หน้านี้ดูได้อย่างเดียว ถ้าจะแก้ให้เข้าเกม: 📁 แฟ้มคดี → 📝 โน้ต'],
  print:['🖨️ 列印 / 存成 PDF','🖨️ Print / save as PDF','🖨️ พิมพ์ / บันทึกเป็น PDF'], close:['✕ 關閉','✕ Close','✕ ปิด'],
  popup:['瀏覽器擋住了列印視窗，請允許彈出視窗後再試一次。','The browser blocked the print window — allow pop-ups and try again.','เบราว์เซอร์บล็อกหน้าต่างพิมพ์ อนุญาตป๊อปอัปแล้วลองใหม่'] };
const MNS={id:null, sub:'drugs'};
const mnTxt=v=>String(v==null?'':v).trim();
/* one game's notes, older formats included: [{id, n, g, sig, img, src, own, grp, note}], free memo */
function mnRead(s){ const n=s&&s.notes||{}, dn=n.drugs||{}, own=n.own||[], groups=n.groups||[];
  const rows=Object.entries(dn).map(([id,x])=>{ x=x||{};
      const note=mnTxt(x.note!=null?x.note:[x.warn,x.more].map(mnTxt).filter(Boolean).join(' · ')), grp=mnTxt(x.grp||(groups.find(g=>(g.ids||[]).includes(id))||{}).name);
      const d=DRUGS.find(z=>z.id===id), o=own.find(z=>z.id===id); if(!d&&!o) return null;
      return Object.assign({}, d||{id, n:o.n, own:true}, {grp, note}); })
    .filter(r=>r&&(r.note||r.grp));
  own.forEach(o=>{ if(!rows.some(r=>r.id===o.id)) rows.push({id:o.id, n:o.n, own:true, grp:'', note:''}); });
  return {rows, memo:mnTxt(n.memo)}; }
const mnHas=s=>{ const r=mnRead(s); return r.rows.length>0||!!r.memo; };
function mnGames(){ const all=(store.get(CONFIG.STORAGE_KEY)||[]).filter(s=>s&&s.id&&mnHas(s));
  return all.sort((a,b)=>String(b.updated||'').localeCompare(String(a.updated||''))); }
const mnWhen=s=>{ try{ return new Date(s.updated||s.created).toLocaleString(S.lang==='zh'?'zh-TW':S.lang==='th'?'th-TH':'en-GB',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}); }catch(e){ return ''; } };
const mnLabel=s=>`${esc(s.student&&s.student.name||'?')} · ${esc(mnWhen(s))} · ${s.done?L(MNT.done)+(s.rank?' ('+esc(s.rank)+')':''):L(MNT.playing)+(s.chapter?' · '+T('ch'+Math.min(5,s.chapter)):'')}`;
const mnThumb=d=>d.own?`<span class="own">📝</span>`:(IMG[d.img]?`<img class="th" src="${IMG[d.img]}" alt="">`:'');
function mnCss(){ if($('#mnCss')) return; const st=document.createElement('style'); st.id='mnCss'; st.textContent=`
#mnUI{position:fixed;inset:0;z-index:240;background:rgba(15,10,35,.62);display:flex;align-items:center;justify-content:center;padding:12px}
#mnUI .card{width:min(1040px,100%);height:min(720px,100%);display:flex;flex-direction:column;border-radius:24px;overflow:hidden;background:#fff;box-shadow:0 0 0 5px #fff,0 0 0 10px #a9c8ff,0 20px 50px rgba(0,0,0,.5);animation:enterC .3s}
#mnUI .hd{display:flex;align-items:center;gap:10px;padding:9px 14px;background:linear-gradient(90deg,#4f8cff,#7a6bff);color:#fff}
#mnUI .hd b{font-size:19px;font-weight:900;flex:1}
#mnUI .hd .x{width:34px;height:34px;border-radius:50%;background:#fff;color:#3a5ad6;font-weight:900;font-size:18px}
#mnUI .bd{flex:1;overflow:auto;padding:12px 16px 16px;-webkit-overflow-scrolling:touch}
#mnUI .gp{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:10px;font-weight:800;color:#3a3a6a;font-size:14.5px}
#mnUI .gp select{font:inherit;font-weight:700;padding:6px 10px;border-radius:12px;border:2px solid #d6e0ff;background:#f7f9ff;max-width:100%}
#mnUI .tabs{display:flex;gap:6px;flex-wrap:wrap;margin:0 0 10px}
#mnUI .tabs button{padding:7px 16px;border-radius:99px;font-weight:800;font-size:15px;background:#eef2fb;color:#3a4a7a}
#mnUI .tabs button.on{background:#3a5ad6;color:#fff}
#mnUI .wrap{overflow-x:auto}
#mnUI table{width:100%;border-collapse:collapse;font-size:14.5px}
#mnUI th{background:#eef2fb;color:#2a3a6a;text-align:left;padding:7px 8px;font-size:13.5px;white-space:nowrap}
#mnUI td{border-top:1px solid #e6ebf6;padding:7px 8px;vertical-align:top}
#mnUI td.nt{white-space:pre-wrap;min-width:180px}
#mnUI .th{width:44px;height:44px;object-fit:cover;border-radius:8px;background:#f4f1fa}
#mnUI .own{font-size:22px}
#mnUI .muted{color:#8a8aa0;font-size:12.5px}
#mnUI .gt{display:inline-block;padding:2px 10px;border-radius:99px;background:#eaf1ff;color:#2a4a9a;font-weight:800;font-size:13px}
#mnUI .gbox{border-radius:16px;background:#f7faff;box-shadow:inset 0 0 0 2px #d6e4ff;padding:10px 12px;margin-bottom:10px}
#mnUI .gbox.loose{background:#fffaf0;box-shadow:inset 0 0 0 2px #ffe3a8}
#mnUI .gbox h4{margin:0 0 6px;font-size:16px;color:#1f3a7a}
#mnUI .memo{white-space:pre-wrap;background:#fffdf3;border-radius:14px;box-shadow:inset 0 0 0 2px #f3e3a8;padding:12px 14px;font-size:15.5px;line-height:1.6;min-height:120px}
#mnUI .msg{color:#5a5070;font-size:15px;line-height:1.6;padding:18px 6px}
#mnUI .ft{display:flex;gap:8px;align-items:center;padding:8px 14px;border-top:1px solid #edf0f8;flex-wrap:wrap}
#mnUI .ft .ro{flex:1;color:#7a7090;font-size:12.5px;min-width:180px}
#mnUI .ft button{padding:8px 16px;border-radius:99px;font-weight:900;font-size:14.5px;background:#eef2fb;color:#3a4a7a}
@media (max-height:460px){#mnUI .card{height:100%}#mnUI .bd{padding:8px 12px 12px}}
`; document.head.appendChild(st); }
function mnTable(r){ if(!r.rows.length) return `<p class="msg">${L(MNT.empty)}</p>`;
  const rows=r.rows.slice().sort((a,b)=>(a.grp||'~').localeCompare(b.grp||'~'));
  return `<div class="wrap"><table><tr><th></th><th>${MX('cDrug')}</th><th>${MX('cSig')}</th><th>${MX('cGrp')}</th><th>${MX('cNote')}</th></tr>${rows.map(d=>`<tr><td>${mnThumb(d)}</td><td><b>${esc(d.n)}</b>${d.g?`<br><span class="muted">${esc(d.g)}</span>`:''}${d.own?`<br><span class="muted">${MX('own')}</span>`:''}</td><td>${d.sig?esc(L(d.sig)):''}</td><td>${d.grp?`<span class="gt">${esc(d.grp)}</span>`:'<span class="muted">—</span>'}</td><td class="nt">${esc(d.note)||'<span class="muted">—</span>'}</td></tr>`).join('')}</table></div>`; }
function mnGroups(r){ const gs=[...new Set(r.rows.map(d=>d.grp).filter(Boolean))].sort((a,b)=>a.localeCompare(b)), loose=r.rows.filter(d=>!d.grp);
  if(!gs.length&&!loose.length) return `<p class="msg">${L(MNT.empty)}</p>`;
  const box=(name,list,isL)=>`<div class="gbox${isL?' loose':''}"><h4>${isL?'📥':'🗂'} ${esc(name)} <span class="muted">· ${MX('nDrugs').replace('{n}',list.length)}</span></h4><div class="wrap"><table>${list.map(d=>`<tr><td style="width:52px">${mnThumb(d)}</td><td style="width:32%"><b>${esc(d.n)}</b>${d.g?`<br><span class="muted">${esc(d.g)}</span>`:''}</td><td class="nt">${esc(d.note)||'<span class="muted">—</span>'}</td></tr>`).join('')}</table></div></div>`;
  return (gs.length?'':`<p class="msg" style="padding:0 0 8px">${MX('gNone')}</p>`)+gs.map(g=>box(g, r.rows.filter(d=>d.grp===g))).join('')+(loose.length?box(MX('loose'), loose, true):''); }
function mnOpen(){ mnCss(); sfx.paper(); let ui=$('#mnUI'); if(!ui){ ui=document.createElement('div'); ui.id='mnUI'; document.body.appendChild(ui); } mnRender(); }
function mnClose(){ const ui=$('#mnUI'); if(ui) ui.remove(); sfx.click(); }
document.addEventListener('keydown', e=>{ if(e.key==='Escape'&&$('#mnUI')){ e.stopPropagation(); mnClose(); } }, true);
function mnRender(){ const ui=$('#mnUI'); if(!ui) return; const games=mnGames();
  let s=games.find(g=>g.id===MNS.id)||games[0]; MNS.id=s?s.id:null;
  const r=s?mnRead(s):null;
  const body=!s?`<p class="msg">${L(MNT.none)}</p>`:
    `${games.length>1?`<div class="gp">${L(MNT.pick)} <select id="mnPick">${games.map(g=>`<option value="${esc(g.id)}"${g.id===s.id?' selected':''}>${mnLabel(g)}</option>`).join('')}</select></div>`:`<div class="gp">${mnLabel(s)}</div>`}
     <div class="tabs">${['drugs','groups','free'].map(k=>`<button data-mt="${k}" class="${MNS.sub===k?'on':''}">${MX(k==='drugs'?'mDrugs':k==='groups'?'mGroups':'mFree')}</button>`).join('')}</div>
     ${MNS.sub==='groups'?mnGroups(r):MNS.sub==='free'?(r.memo?`<div class="memo">${esc(r.memo)}</div>`:`<p class="msg">${L(MNT.empty)}</p>`):mnTable(r)}`;
  ui.innerHTML=`<div class="card"><div class="hd"><b>${L(MNT.title)}</b><button class="x" aria-label="close">✕</button></div><div class="bd">${body}</div>
    <div class="ft"><span class="ro">${s?L(MNT.ro):''}</span>${s?`<button data-act="print">${L(MNT.print)}</button>`:''}<button data-act="close">${L(MNT.close)}</button></div></div>`;
  ui.querySelector('.x').onclick=mnClose; ui.querySelector('[data-act="close"]').onclick=mnClose; ui.onclick=e=>{ if(e.target===ui) mnClose(); };
  const pk=$('#mnPick'); if(pk) pk.onchange=()=>{ MNS.id=pk.value; sfx.click(); mnRender(); };
  ui.querySelectorAll('[data-mt]').forEach(b=>b.onclick=()=>{ MNS.sub=b.dataset.mt; sfx.click(); mnRender(); });
  const pr=ui.querySelector('[data-act="print"]'); if(pr) pr.onclick=()=>mnPrint(s); }
/* a clean page with all three parts, for printing or saving as a PDF */
function mnPrint(s){ const r=mnRead(s), w=window.open('', '_blank'); if(!w){ toast(L(MNT.popup)); return; }
  const rows=r.rows.slice().sort((a,b)=>(a.grp||'~').localeCompare(b.grp||'~'));
  const title=`${L(MNT.title).replace(/^📝\s*/,'')} — ${esc(document.title)}`;
  w.document.write(`<!doctype html><html lang="${document.documentElement.lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title>
<style>body{font-family:system-ui,-apple-system,"Noto Sans Thai","Noto Sans TC",sans-serif;margin:24px;color:#1d1d2b}h1{font-size:20px;margin:0 0 4px}.sub{color:#666;font-size:13px;margin-bottom:16px}
table{width:100%;border-collapse:collapse;font-size:13.5px;margin-bottom:18px}th,td{border:1px solid #ccd;padding:6px 8px;text-align:left;vertical-align:top}th{background:#eef2fb}td.nt{white-space:pre-wrap}
h2{font-size:16px;margin:18px 0 8px}.memo{white-space:pre-wrap;border:1px solid #ccd;border-radius:8px;padding:10px 12px;font-size:14px;line-height:1.6}.g{color:#666;font-size:12px}
@media print{body{margin:10mm}}</style></head><body>
<h1>${title}</h1><div class="sub">${mnLabel(s)}</div>
<h2>${MX('mDrugs')}</h2>${rows.length?`<table><tr><th>${MX('cDrug')}</th><th>${MX('cSig')}</th><th>${MX('cGrp')}</th><th>${MX('cNote')}</th></tr>${rows.map(d=>`<tr><td><b>${esc(d.n)}</b>${d.g?`<div class="g">${esc(d.g)}</div>`:''}</td><td>${d.sig?esc(L(d.sig)):''}</td><td>${esc(d.grp)||'—'}</td><td class="nt">${esc(d.note)||'—'}</td></tr>`).join('')}</table>`:`<p>${L(MNT.empty)}</p>`}
<h2>${MX('mFree')}</h2>${r.memo?`<div class="memo">${esc(r.memo)}</div>`:`<p>${L(MNT.empty)}</p>`}
<script>setTimeout(function(){ try{ window.focus(); window.print(); }catch(e){} }, 300);<\/script></body></html>`);
  w.document.close(); }
/* the 📝 button sits with 🏅 and 📚 under the start card */
function mnButton(){ const row=$('#btnChSel')&&$('#btnChSel').parentElement; if(!row) return; let b=$('#btnNotes');
  if(!b){ b=document.createElement('button'); b.id='btnNotes'; b.className='sbtn'; b.onclick=mnOpen; row.insertBefore(b, $('#btnChSel')); }
  b.textContent=L(MNT.btn); }
{ const f=showTitle; showTitle=function(){ const r=f.apply(this, arguments); mnButton(); return r; }; }
{ const f=applyI18n; applyI18n=function(){ const r=f.apply(this, arguments); if($('#btnNotes')) mnButton(); return r; }; }
