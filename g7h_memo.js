/* =====================================================================
   CASE FILE · 📝 MEMO v3 — a drug notebook laid out like the lab notes
   💊 Drug notes: one table row per medicine already seen, with a "Group" box (free text, earlier names suggested)
      and a "Notes" box — what to watch out for, what else to check or ask
   🗂 By group: the same drugs and notes gathered under the student's own group names (rename a group in one go)
   📝 Free notes: the original free-text memo
   Only drugs the student has seen are listed (named in evidence already found, or the full list once Chapter 4 opens it),
   so nothing is given away. Everything lives in S.notes and goes to the instructor with the game.
   ===================================================================== */
const MM={
  mDrugs:['💊 藥物筆記','💊 Drug notes','💊 โน้ตยา'], mGroups:['🗂 依分組看','🗂 By group','🗂 ดูตามกลุ่ม'], mFree:['📝 自由筆記','📝 Free notes','📝 โน้ตอิสระ'],
  dIntro:['像檢驗數據的筆記一樣，每個藥一行：「分組」自己取名（例如 糖尿病、要問醫師），「筆記」寫要注意什麼、還要查什麼。只會出現你已經看過的藥。','Like the lab notes: one row per medicine. Give it a group of your own (e.g. diabetes, ask the doctor) and note what to watch out for and what else to check. Only medicines you have already seen are listed.','เหมือนบันทึกผลแล็บ: ยาหนึ่งตัวหนึ่งแถว ตั้ง "กลุ่ม" เอง (เช่น เบาหวาน ต้องถามหมอ) และจด "บันทึก" ว่าต้องระวังอะไร ต้องดูอะไรเพิ่ม จะแสดงเฉพาะยาที่เคยเห็นแล้ว'],
  dNone:['還沒看到任何藥。找到藥袋之後，藥會出現在這裡；也可以在下面自己新增。','No medicines seen yet. Once you find med bags they appear here — or add one yourself below.','ยังไม่เห็นยาเลย พอเจอซองยาแล้วยาจะขึ้นที่นี่ หรือเพิ่มเองด้านล่างก็ได้'],
  dMore:['找到更多藥袋，清單會變長。','Find more med bags and the list grows.','เจอซองยาเพิ่ม รายการจะยาวขึ้น'],
  cDrug:['藥品','Drug','ยา'], cSig:['用法','Directions','วิธีใช้'], cSrc:['來源','Source','แหล่ง'], cGrp:['分組','Group','กลุ่ม'], cNote:['筆記','Notes','บันทึก'],
  phGrp:['例如：糖尿病','e.g. diabetes','เช่น เบาหวาน'], phNote:['要注意什麼？還要查／問什麼？','What to watch out for? What else to check or ask?','ต้องระวังอะไร? ต้องดู/ถามอะไรเพิ่ม?'],
  own:['自己新增','added by you','เพิ่มเอง'], addOwn:['＋ 新增一項（例如保健品、自己買的藥）','+ Add an item (e.g. a supplement or an over-the-counter medicine)','+ เพิ่มรายการ (เช่น อาหารเสริม ยาที่ซื้อเอง)'],
  ownPh:['名稱','Name','ชื่อ'], del:['🗑 刪除','🗑 Delete','🗑 ลบ'], delQ:['刪除這一項和它的筆記？','Delete this item and its notes?','ลบรายการนี้และบันทึกของมัน?'],
  search:['🔎 搜尋藥名或分組','🔎 Search drugs or groups','🔎 ค้นหาชื่อยาหรือกลุ่ม'],
  gIntro:['同一個分組名稱的藥會排在一起。要改分組，到「💊 藥物筆記」改那一欄就好。','Drugs with the same group name are gathered here. To change a group, edit that box in 💊 Drug notes.','ยาที่ใส่ชื่อกลุ่มเดียวกันจะมารวมกันที่นี่ จะเปลี่ยนกลุ่มให้แก้ช่อง "กลุ่ม" ในแท็บ 💊 โน้ตยา'],
  gNone:['還沒有分組。在「💊 藥物筆記」的「分組」欄填名稱就會出現在這裡。','No groups yet. Type a name in the Group box in 💊 Drug notes and it shows up here.','ยังไม่มีกลุ่ม ใส่ชื่อในช่อง "กลุ่ม" ที่แท็บ 💊 โน้ตยา แล้วจะขึ้นที่นี่'],
  loose:['還沒分組','No group yet','ยังไม่ได้จัดกลุ่ม'], gRename:['✏️ 改名','✏️ Rename','✏️ เปลี่ยนชื่อ'], nDrugs:['{n} 個藥','{n} drugs','ยา {n} ตัว'],
  tDrugNotes:['藥物筆記','Drug notes','โน้ตยา'],
};
const MX=k=>L(MM[k]);
const M={sub:'drugs', q:''};
/* notes per drug: {grp, note}. Earlier versions (tags / two boxes / separate groups) are folded in once. */
function memoData(){ const n=S.notes||(S.notes={}); n.drugs=n.drugs||{}; n.own=n.own||[];
  if(!n.v3){ const tagName={warn:'⚠️',dup:'🔁',ddi:'💥',kid:'🫘',use:'❔',ask:'❓',stop:'✋',ok:'✅'};
    Object.values(n.drugs).forEach(x=>{ if(x&&x.note==null){ x.note=[(x.tags||[]).map(t=>tagName[t]||'').join(''), x.warn, x.more].map(s=>String(s||'').trim()).filter(Boolean).join(' · '); } });
    (n.groups||[]).forEach(g=>(g.ids||[]).forEach(id=>{ const x=n.drugs[id]||(n.drugs[id]={note:''}); if(!x.grp) x.grp=g.name; }));
    n.v3=1; }
  return n; }
/* a medicine counts as seen once a found piece of evidence names it (brand or generic), or when the full list opens in Chapter 4 */
function memoItems(){ const n=memoData();
  const evTxt=(S.evidence||[]).map(k=>{ const it=ITEMS[k]; return it?JSON.stringify([it.n,it.d]).toLowerCase():''; }).join(' ');
  const keys=d=>[String(d.n||'').split(/[ 㐀-鿿]/)[0], String(d.g||'').split(/[ +\/]/)[0]].filter(x=>x&&x.length>3).map(x=>x.toLowerCase());
  const seen=DRUGS.filter(d=>S.medsSeen||memoHas(d.id)||keys(d).some(k=>evTxt.includes(k)));
  return seen.map(d=>Object.assign({}, d)).concat(n.own.map(o=>({id:o.id, n:o.n, own:true}))); }
const memoNote=id=>{ const n=memoData(); return n.drugs[id]||(n.drugs[id]={grp:'', note:''}); };
const memoHas=id=>{ const x=(S.notes&&S.notes.drugs||{})[id]; return !!(x&&(String(x.note||'').trim()||String(x.grp||'').trim())); };
const memoGroupNames=()=>[...new Set(Object.values(memoData().drugs).map(x=>String(x&&x.grp||'').trim()).filter(Boolean))].sort((a,b)=>a.localeCompare(b));
const memoSave=()=>{ if(typeof saveSession==='function') saveSession(); };
const memoRe=()=>{ if(P.cur==='case'&&P.tab==='tMemo') renderMemo($('#pBody')); };
function memoCss(){ if($('#memoCss')) return; const st=document.createElement('style'); st.id='memoCss'; st.textContent=`
#pBody .msub{display:flex;gap:6px;flex-wrap:wrap;margin:0 0 10px}
#pBody .msub button{padding:7px 16px;border-radius:99px;font-weight:800;font-size:15px;background:#f1eef8;color:#4a3a6a}
#pBody .msub button.on{background:#5a3fd6;color:#fff}
#pBody .mintro{color:#5a5070;font-size:14px;line-height:1.5;margin:0 0 8px}
#pBody .mbar{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:8px}
#pBody .mbar .ein{max-width:260px}
#pBody .mwrap{overflow-x:auto}
#pBody table.mtbl td{vertical-align:top}
#pBody table.mtbl .th{width:46px;height:46px;object-fit:cover;border-radius:8px;cursor:zoom-in;background:#f4f1fa}
#pBody table.mtbl .own{font-size:22px}
#pBody table.mtbl input.mg{width:100%;min-width:110px;max-width:180px}
#pBody table.mtbl textarea.mn{width:100%;min-width:200px;min-height:40px;resize:vertical;font-size:14.5px;line-height:1.4}
#pBody table.mtbl .del{padding:3px 9px;font-size:12.5px;margin-top:4px}
#pBody .mown{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:10px}
#pBody .mown .ein{max-width:260px}
#pBody .mgbox{border-radius:16px;background:#f7faff;box-shadow:inset 0 0 0 2px #d6e4ff;padding:10px 12px;margin-bottom:10px}
#pBody .mgbox.loose{background:#fffaf0;box-shadow:inset 0 0 0 2px #ffe3a8}
#pBody .mgbox h4{margin:0 0 6px;font-size:16.5px;color:#1f3a7a;display:flex;align-items:center;gap:8px;flex-wrap:wrap}
#pBody .mgbox h4 .sp{flex:1}#pBody .mgbox h4 .muted{font-weight:700;font-size:13px}
#pBody .mgbox table.tbl{margin:0}
#pBody textarea.memo{min-height:240px}
`; document.head.appendChild(st); }
function renderMemo(b){ memoCss(); memoData(); const keep=b.scrollTop;
  b.innerHTML=`<div class="msub">${['drugs','groups','free'].map(k=>`<button data-ms="${k}" class="${M.sub===k?'on':''}">${MX(k==='drugs'?'mDrugs':k==='groups'?'mGroups':'mFree')}</button>`).join('')}</div><div id="mBody"></div>`;
  b.querySelectorAll('[data-ms]').forEach(x=>x.onclick=()=>{ M.sub=x.dataset.ms; sfx.click(); renderMemo(b); b.scrollTop=0; });
  const host=$('#mBody'); (M.sub==='groups'?memoGroups:M.sub==='free'?memoFree:memoTable)(host, b);
  b.scrollTop=keep; }
const memoThumb=d=>d.own?`<span class="own">📝</span>`:`<img class="th" src="${IMG[d.img]||''}" alt="" data-mz="1">`;
const memoSrc=d=>d.src&&typeof SRC!=='undefined'&&SRC[d.src]?esc(L(SRC[d.src])):d.own?`<span class="muted">${MX('own')}</span>`:'';
/* 💊 one table, like the lab notes */
function memoTable(host){ const n=memoData(), all=memoItems(), q=M.q.trim().toLowerCase();
  const rows=all.filter(d=>!q||(d.n+' '+(d.g||'')+' '+((n.drugs[d.id]||{}).grp||'')).toLowerCase().includes(q));
  host.innerHTML=`<p class="mintro">${MX('dIntro')}</p>
    ${all.length?`<div class="mbar"><input class="ein" id="mQ" placeholder="${esc(MX('search'))}" value="${esc(M.q)}"></div>`:''}
    ${all.length?`<div class="mwrap"><table class="tbl mtbl"><tr><th></th><th>${MX('cDrug')}</th><th>${MX('cSig')}</th><th>${MX('cSrc')}</th><th>${MX('cGrp')}</th><th>${MX('cNote')}</th></tr>
      ${rows.map(d=>{ const x=n.drugs[d.id]||{}; return `<tr data-id="${esc(d.id)}"><td>${memoThumb(d)}</td><td><b>${esc(d.n)}</b>${d.g?`<br><span class="muted">${esc(d.g)}</span>`:''}${d.own?`<br><button class="sbtn del" data-del="1">${MX('del')}</button>`:''}</td>
        <td>${d.sig?esc(L(d.sig)):''}</td><td>${memoSrc(d)}</td>
        <td><input class="ein mg" list="mgList" maxlength="40" value="${esc(x.grp||'')}" placeholder="${esc(MX('phGrp'))}"></td>
        <td><textarea class="ein mn" rows="2" placeholder="${esc(MX('phNote'))}">${esc(x.note||'')}</textarea></td></tr>`; }).join('')}</table></div>
      <datalist id="mgList">${memoGroupNames().map(g=>`<option value="${esc(g)}">`).join('')}</datalist>`:`<p class="mintro">${MX('dNone')}</p>`}
    ${!S.medsSeen&&all.length?`<p class="muted" style="margin:6px 2px 0">${MX('dMore')}</p>`:''}
    <div class="mown"><input class="ein" id="mOwn" placeholder="${esc(MX('ownPh'))}" maxlength="60"><button class="sbtn" id="mOwnAdd">${MX('addOwn')}</button></div>`;
  const qi=$('#mQ'); if(qi) qi.oninput=e=>{ M.q=e.target.value; const pos=e.target.selectionStart; memoTable(host); const i=$('#mQ'); i.focus(); try{ i.setSelectionRange(pos,pos); }catch(_){} };
  host.querySelectorAll('tr[data-id]').forEach(tr=>{ const id=tr.dataset.id;
    const im=tr.querySelector('img[data-mz]'); if(im) im.onclick=()=>{ if(typeof zoomImg==='function') zoomImg(im.src); };
    tr.querySelector('input.mg').oninput=e=>{ memoNote(id).grp=e.target.value.slice(0,40); memoSave(); };
    tr.querySelector('input.mg').onchange=()=>{ const dl=$('#mgList'); if(dl) dl.innerHTML=memoGroupNames().map(g=>`<option value="${esc(g)}">`).join(''); };
    tr.querySelector('textarea.mn').oninput=e=>{ memoNote(id).note=e.target.value; memoSave(); };
    const del=tr.querySelector('[data-del]'); if(del) del.onclick=()=>showModal(`<h3>${esc(MX('delQ'))}</h3>`,[{t:MX('del'), cls:'r', fn:()=>{ const n=memoData(); n.own=n.own.filter(o=>o.id!==id); delete n.drugs[id]; memoSave(); memoRe(); }},{t:T('cancel'), cls:''}]); });
  const addOwn=()=>{ const v=$('#mOwn').value.trim().slice(0,60); if(!v){ $('#mOwn').focus(); return; } memoData().own.push({id:'own'+Date.now().toString(36), n:v}); sfx.select(); memoSave(); memoTable(host); };
  $('#mOwnAdd').onclick=addOwn; $('#mOwn').onkeydown=e=>{ if(e.key==='Enter') addOwn(); };
}
/* 🗂 the same notes, gathered by the student's group names */
function memoGroups(host){ const n=memoData(), all=memoItems(), groups=memoGroupNames();
  const grpOf=d=>String((n.drugs[d.id]||{}).grp||'').trim(), loose=all.filter(d=>!grpOf(d));
  const box=(name, list, isLoose)=>`<div class="mgbox${isLoose?' loose':''}"${isLoose?'':` data-g="${esc(name)}"`}><h4>${isLoose?'📥':'🗂'} <span>${esc(name)}</span> <span class="muted">· ${MX('nDrugs').replace('{n}',list.length)}</span><span class="sp"></span>${isLoose?'':`<button class="sbtn" data-gren="1">${MX('gRename')}</button>`}</h4>
    <div class="mwrap"><table class="tbl mtbl">${list.map(d=>`<tr><td>${memoThumb(d)}</td><td><b>${esc(d.n)}</b>${d.g?`<br><span class="muted">${esc(d.g)}</span>`:''}</td><td style="white-space:pre-wrap">${esc((n.drugs[d.id]||{}).note||'')||'<span class="muted">—</span>'}</td></tr>`).join('')}</table></div></div>`;
  host.innerHTML=`<p class="mintro">${MX('gIntro')}</p>${groups.length?groups.map(g=>box(g, all.filter(d=>grpOf(d)===g))).join(''):`<p class="mintro">${MX('gNone')}</p>`}${loose.length?box(MX('loose'), loose, true):''}`;
  host.querySelectorAll('img[data-mz]').forEach(im=>im.onclick=()=>{ if(typeof zoomImg==='function') zoomImg(im.src); });
  host.querySelectorAll('.mgbox[data-g]').forEach(bx=>{ const old=bx.dataset.g; bx.querySelector('[data-gren]').onclick=()=>{
    showModal(`<h3>${MX('gRename')}</h3><input class="ein" id="gRenIn" maxlength="40" value="${esc(old)}" style="font-size:18px">`,[{t:T('ok'), keep:true, fn:c=>{ const v=c.querySelector('#gRenIn').value.trim().slice(0,40); if(!v) return;
      Object.values(memoData().drugs).forEach(x=>{ if(x&&String(x.grp||'').trim()===old) x.grp=v; }); memoSave(); MQ.length=0; nextModal(); memoRe(); }},{t:T('cancel'), cls:''}]);
    setTimeout(()=>{ const i=$('#gRenIn'); if(i){ i.focus(); i.select(); i.onkeydown=e=>{ if(e.key==='Enter') $('#mCard [data-mb="0"]').click(); }; } },60); }; });
}
/* 📝 free notes (the original memo) */
function memoFree(host){ host.innerHTML=`<textarea class="memo" id="memo" placeholder="${T('memoPh')}">${esc(S.notes.memo||'')}</textarea>`; $('#memo').oninput=e=>{ S.notes.memo=e.target.value; memoSave(); }; }
{ const f=renderCase; renderCase=function(b){ if(P.tab==='tMemo') return renderMemo(b); return f(b); }; }
/* for the instructor: the student's drug notes by group, read-only (older formats included) */
function memoTeacherHTML(s){ const n=s&&s.notes||{}, dn=n.drugs||{}, own=n.own||[], groups=n.groups||[];
  const name=id=>{ const d=DRUGS.find(x=>x.id===id); if(d) return d.n; const o=own.find(x=>x.id===id); return o?o.n:id; };
  const rows=Object.entries(dn).map(([id,x])=>{ x=x||{}; const note=x.note!=null?x.note:[x.warn,x.more].map(v=>String(v||'').trim()).filter(Boolean).join(' · ');
      const grp=x.grp||(groups.find(g=>(g.ids||[]).includes(id))||{}).name||''; return {id, note:String(note||'').trim(), grp:String(grp).trim()}; }).filter(r=>r.note||r.grp)
    .sort((a,b)=>(a.grp||'~').localeCompare(b.grp||'~'));
  if(!rows.length) return '';
  return `<h4>💊 ${esc(MX('tDrugNotes'))}</h4><table class="tbl"><tr><th>${MX('cGrp')}</th><th>${MX('cDrug')}</th><th>${MX('cNote')}</th></tr>${rows.map(r=>`<tr><td>${esc(r.grp)||'—'}</td><td><b>${esc(name(r.id))}</b></td><td style="white-space:pre-wrap">${esc(r.note)||'—'}</td></tr>`).join('')}</table>`; }
