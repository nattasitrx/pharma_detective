/* =====================================================================
   PAGES (outside the stage): case file · settings · instructor dashboard
   ===================================================================== */
const P={cur:null, tab:null};
const PAGES={ case:{title:'caseFile', tabs:['tProfile','tProblems','tEvidence','tMeds','tLabs','tMemo']}, menu:{title:'menu'}, teacher:{title:'tTitle', tabs:['tHome','tSessions','tClass','tDebrief','tCustom','tAdv']} };
function openPage(name, tab){ if(name==='teacher'&&!P.teacherOK) return teacherLogin(); P.cur=name; P.tab=tab||(PAGES[name].tabs?PAGES[name].tabs[0]:null); $('#page').classList.remove('hidden'); sfx.paper(); renderPage(); if(name==='teacher') serverAutoPull(); }
function closePage(){ P.cur=null; $('#page').classList.add('hidden'); sfx.click(); saveSession(); applyI18n(); showVerNote(); }
function renderPage(){
  const pg=PAGES[P.cur]; if(!pg) return;
  $('#pTitle').textContent=({case:'📁 ',menu:'⚙️ ',teacher:'👩‍🏫 '}[P.cur])+T(pg.title);
  $('#pTabs').innerHTML=(pg.tabs||[]).map(t=>`<button class="tab${P.tab===t?' on':''}" data-pt="${t}">${t==='tDebrief'?L(DEBRIEF.tab):TT[t]?L(TT[t]):UI[t]?T(t):CL[t]?TC(t):TE(t)}</button>`).join('');
  $$('[data-pt]').forEach(b=>b.onclick=()=>{ P.tab=b.dataset.pt; ED_ST.editQ=null; sfx.click(); renderPage(); });
  const b=$('#pBody'); b.scrollTop=0; ({case:renderCase, menu:renderMenu, teacher:renderTeacher2})[P.cur](b);
  b.querySelectorAll('img[data-zs], .egrid a img').forEach(im=>{ im.onclick=e=>{ e.preventDefault(); zoomImg(im.src); }; });
}
function renderCase(b){
  if(P.tab==='tProfile') b.innerHTML=`<div class="box"><div class="kv">${PROFILE.map(f=>`<b>${esc(L(f.l))}</b><span>${(f.open||S.profile.has(f.k))?esc(L(f.v)):`<span class="unk">${T('unknown')}</span>`}</span>`).join('')}</div></div>`;
  else if(P.tab==='tProblems') b.innerHTML=PROBLEMS.map((p,i)=>{ const f=S.found[p.id]; return `<div class="prob${f?' f':''}"><div class="n">${f?p.icon:i+1}</div><div><b>${f?esc(L(p.t)):`<span class="unk">${T('unknown')}</span>`}</b>${f?`<div class="muted">${esc(L(p.d))}</div><div class="muted">${T('foundAt')} ${fmt(f.t)}</div>`:''}</div></div>`; }).join('');
  else if(P.tab==='tEvidence') b.innerHTML=S.evidence.length?`<div class="egrid">${S.evidence.map(id=>`<div class="ev"><div class="ic">${itemIcon(id,56)}</div><b>${esc(L(ITEMS[id].n))}</b><div class="muted">📍 ${esc(L(ITEMS[id].loc))}${S.usedEv.includes(id)?' · '+T('usedTag'):''}</div><div class="muted">${esc(L(ITEMS[id].d))}</div><div class="row" style="margin-top:6px">${itemImages(id).map(s=>`<img src="${s}" data-zs="1" style="height:70px;border-radius:8px;cursor:zoom-in;box-shadow:0 0 0 2px #ffe08a">`).join('')}</div></div>`).join('')}</div>`:`<p class="muted">${T('noEvidence')}</p>`;
  else if(P.tab==='tMeds'){
    if(!S.medsSeen){ b.innerHTML=`<p style="font-size:17px;padding:30px;text-align:center">💊 ${T('medsLocked')}</p>`; return; }
    b.innerHTML=`<table class="tbl"><tr><th></th><th>${L(['藥品','Drug','ยา'])}</th><th>${L(['用法','Directions','วิธีใช้'])}</th><th>${L(['類別','Class','กลุ่มยา'])}</th><th>${L(['來源','Source','แหล่ง'])}</th><th>${L(['用藥問題','DRP','ปัญหา'])}</th></tr>${DRUGS.map(d=>`<tr><td><img src="${IMG[d.img]}" data-zs="1" style="height:54px;border-radius:6px;cursor:zoom-in"></td><td><b>${esc(d.n)}</b><br><span class="muted">${esc(d.g)}</span></td><td>${esc(L(d.sig))}</td><td>${esc(L(d.cls))}</td><td>${esc(L(SRC[d.src]))}</td><td>${(S.mr.tags[d.id]||[]).map(t=>`<span class="pill no">${esc(t)}</span>`).join('')}</td></tr>`).join('')}</table>`;
  }
  else if(P.tab==='tLabs'){
    if(!S.notes.labsUnlocked){ b.innerHTML=`<p style="font-size:17px;padding:30px;text-align:center">🧪 ${T('labsLocked')}</p>`; return; }
    const imgs=labImages();
    b.innerHTML=`<table class="tbl"><tr><th>${T('labItem')}</th><th>${T('labRef')}</th>${LAB_DATES.map(d=>`<th>${d}</th>`).join('')}<th>${T('labNote')}</th></tr>${LABS2.map((r,i)=>`<tr><td><b>${esc(r.item)}</b> <span class="muted">${esc(r.unit)}</span></td><td>${esc(r.ref)}</td>${r.v.map(v=>`<td style="font-weight:700;color:${r.f==='H'&&v!=='—'?'#d0203e':r.f==='L'?'#2856b8':'inherit'}">${esc(v)}${r.f==='H'&&v!=='—'&&!String(v).includes('↑')?' ↑':r.f==='L'?' ↓':''}</td>`).join('')}<td><input data-ln="${i}" value="${esc(S.notes.labs['n'+i]||'')}"></td></tr>`).join('')}</table><p class="muted" style="margin-top:6px">${L(['eGFR 以 CKD-EPI 2021（65 歲男性）估算。','eGFR estimated with CKD-EPI 2021 (65-year-old man).','eGFR ประมาณด้วยสูตร CKD-EPI 2021 (ชาย 65 ปี)'])}</p>
      <h4 style="margin:12px 0 6px">${T('labImgs')}</h4>${imgs.length?`<div class="egrid">${imgs.map(s=>`<a href="${esc(s)}" target="_blank"><img src="${esc(s)}" style="width:100%;border-radius:10px"></a>`).join('')}</div>`:`<p class="muted">${T('labNoImg')}</p>`}`;
    b.querySelectorAll('[data-ln]').forEach(x=>x.oninput=()=>{ S.notes.labs['n'+x.dataset.ln]=x.value; saveSession(); });
  } else { b.innerHTML=`<textarea class="memo" id="memo" placeholder="${T('memoPh')}">${esc(S.notes.memo)}</textarea>`; $('#memo').oninput=e=>{ S.notes.memo=e.target.value; saveSession(); }; }
}
function renderMenu(b){
  const tg=(k,v)=>`<button class="sbtn ${v?'g':''}" data-tg="${k}">${T(k)}: ${v?T('on'):T('off')}</button>`;
  b.innerHTML=`<div class="box"><b>${T('language')}</b><div class="row" style="margin-top:6px">${LANGS.map((l,i)=>`<button class="sbtn ${S.lang===l?'on':''}" data-l="${l}">${['中文','English','ไทย'][i]}</button>`).join('')}</div></div>
   <div class="box"><b>☁️ ${T('syncH')}</b><div class="row" style="margin-top:6px;align-items:center"><span class="syncSt hidden" style="margin:0;text-align:left;font-size:14px"></span>${serverURL()&&S.sessionId?`<button class="sbtn" id="mSync">${T('syncNow')}</button>`:''}</div>${serverURL()?'':`<p class="muted">${T('syncOff')}</p>`}</div>
   <div class="box"><b>👁 ${T('view')}</b><div class="row" style="margin-top:6px"><button class="sbtn ${VIEW.fp?'':'on'}" data-view="tp">${T('view_tpL')}</button><button class="sbtn ${VIEW.fp?'on':''}" data-view="fp">${T('view_fpL')}</button></div><p class="muted" style="margin-top:4px">${T('viewHelp')}</p></div>
   <div class="box"><b>🎨 ${T('gfx')}</b><div class="row" style="margin-top:6px">${['auto','high','low'].map(k=>`<button class="sbtn ${GFX.pref===k?'on':''}" data-gfx="${k}">${T('gfx_'+k)}${k==='auto'?` (${T('gfxNow')}: ${T(GFX.low?'gfx_low':'gfx_high')})`:''}</button>`).join('')}</div><p class="muted" style="margin-top:4px">${T('gfxHelp')}</p></div>
   <div class="box"><b>${T('textSpeed')}</b><div class="row" style="margin-top:6px">${['slow','normal','fast'].map(k=>`<button class="sbtn ${S.textSpeed===k?'on':''}" data-spd="${k}">${T('spd_'+k)}</button>`).join('')}</div></div>
   <div class="box"><div class="row">${tg('sound',S.sound)}${tg('music',S.music)}${tg('qte',S.qte)}${tg('motion',S.motion)}</div></div>
   <div class="box"><div class="row"><button class="sbtn b" id="mRep">${T('report')}</button><button class="sbtn" id="mT">${T('teacherBtn')}</button><button class="sbtn r" id="mRe">${T('restart')}</button></div><p class="muted" style="margin-top:6px">${esc(S.student.name)} · ${esc(S.student.sid)} · ${esc(S.sessionId||'-')}</p></div>`;
  b.querySelectorAll('[data-l]').forEach(x=>x.onclick=()=>setLang(x.dataset.l));
  b.querySelectorAll('[data-view]').forEach(x=>x.onclick=()=>{ setView(x.dataset.view==='fp'); sfx.click(); renderPage(); });
  b.querySelectorAll('[data-gfx]').forEach(x=>x.onclick=()=>{ setGfx(x.dataset.gfx); sfx.click(); renderPage(); });
  b.querySelectorAll('[data-spd]').forEach(x=>x.onclick=()=>{ S.textSpeed=x.dataset.spd; sfx.click(); renderPage(); });
  b.querySelectorAll('[data-tg]').forEach(x=>x.onclick=()=>{ const k=x.dataset.tg; S[k]=!S[k]; applyAudio(); applyMotion(); sfx.click(); renderPage(); });
  syncBadge(); if($('#mSync')) $('#mSync').onclick=()=>{ sfx.click(); saveSession(true); SYNC.fail=0; syncFlush(); };
  $('#mRep').onclick=downloadReport; $('#mT').onclick=()=>openPage('teacher');
  $('#mRe').onclick=()=>showModal(`<h3>${T('restart')}</h3><p>${T('confirmRestart')}</p>`,[{t:T('restart'),cls:'r',fn:()=>{ saveSession(true); location.reload(); }},{t:T('cancel'),cls:''}]);
}
/* ---------- graphics quality: auto (measures FPS) · high · light ---------- */
/* iPhone / iPad Safari runs out of memory on the full effects (filters on animated characters at 3x screens): start them in light mode */
const GFX_IOS=(()=>{ try{ return /iP(hone|ad|od)/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1); }catch(e){ return false; } })();
const GFX={pref:(()=>{ try{ return localStorage.getItem('phd_gfx')||'auto'; }catch(e){ return 'auto'; } })(), autoLow:GFX_IOS, low:false, bad:0};
function applyGfx(){ GFX.low=GFX.pref==='low'||(GFX.pref==='auto'&&GFX.autoLow); const st=$('#stage'); st.classList.toggle('lowfx',GFX.low);
  if(GFX.low){ st.style.setProperty('--px',0); st.style.setProperty('--py',0); }
  const b=$('#gfxBtn'); if(b) b.textContent='🎨 '+T('gfx')+': '+T('gfx_'+GFX.pref)+(GFX.pref==='auto'?` (${T(GFX.low?'gfx_low':'gfx_high')})`:''); }
function setGfx(pref){ GFX.pref=pref; try{ localStorage.setItem('phd_gfx',pref); }catch(e){} if(pref==='auto'){ GFX.autoLow=GFX_IOS; GFX.bad=0; } applyGfx(); }
function fpsProbe(ms){ return new Promise(res=>{ let n=0; const t0=performance.now(); const f=()=>{ n++; const dt=performance.now()-t0; if(dt<ms) requestAnimationFrame(f); else res(n*1000/dt); }; requestAnimationFrame(f); }); }
async function gfxWatch(){
  try{ if(navigator.deviceMemory&&navigator.deviceMemory<=2) GFX.autoLow=true; }catch(e){}
  applyGfx(); await sleep(1500);
  while(true){ if(GFX.pref==='auto'&&!GFX.autoLow&&!document.hidden){ const fps=await fpsProbe(2000);
      if(fps<34){ GFX.bad++; if(GFX.bad>=2){ GFX.autoLow=true; applyGfx(); toast('🎨 '+T('gfxAutoLow')); } } else GFX.bad=0; }
    await sleep(5000); }
}
function applyMotion(){ const st=$('#stage'); st.classList.toggle('nomotion',!S.motion); if(!S.motion){ st.style.setProperty('--px',0); st.style.setProperty('--py',0); } }
function downloadReport(){ saveSession(true); const s=snapshot(); download(`PharmaDetective_${(s.student.sid||'student').replace(/\W+/g,'_')}_${(s.student.name||'').replace(/\s+/g,'_')}.json`, JSON.stringify(s,null,2)); }
function teacherLogin(){
  showModal(`<div style="font-size:50px">👩‍🏫</div><h3>${T('tTitle')}</h3><p>${T('tPin')}</p><input id="pinIn" type="password" inputmode="numeric" style="font-size:22px;text-align:center;border-radius:12px;border:none;padding:8px;width:170px;box-shadow:inset 0 0 0 3px #ffc4d8">`,
   [{t:T('ok'), keep:true, fn:(c)=>{ if(c.querySelector('#pinIn').value===CONFIG.TEACHER_PIN){ P.teacherOK=true; MQ.length=0; nextModal(); openPage('teacher'); } else { sfx.error(); toast(T('tWrong')); } }},{t:T('cancel'),cls:''}]);
  setTimeout(()=>{ const i=$('#pinIn'); if(i){ i.focus(); i.onkeydown=e=>{ if(e.key==='Enter') $('#mCard [data-mb="0"]').click(); }; } },60);
}
function allSessions(){ if(S.sessionId) saveSession(true); const m=new Map(); (store.get(CONFIG.STORAGE_KEY)||[]).forEach(s=>{ if(s&&s.id) m.set(s.id,s); });
  (SYNC.remote||[]).forEach(s=>{ if(!s||!s.id) return; const o=m.get(s.id); if(!o||(o.updated||'')<=(s.updated||'')) m.set(s.id,s); });
  return [...m.values()].sort((a,b)=>(b.updated||'').localeCompare(a.updated||'')); }
function sessHTML(s){
  const log=s.log||[]; const free=log.filter(e=>(e.type==='ask'&&e.mode==='free')||e.type==='lockText'||e.type==='final');
  const pres=log.filter(e=>e.type==='present'||e.type==='choice'||e.type==='calc'); const B=s.boss||{answers:[]}; const qn=['❌','🔸','✅'];
  return `<details class="sess"><summary>👤 ${esc(s.student&&s.student.name||'?')} <span class="muted">${esc(s.student&&s.student.sid||'')}</span>
   <span class="pill">${s.rank?('🏅 '+s.rank+' · '+s.score):(s.progress+'%')}</span><span class="pill">⏱ ${fmt(s.realTime)}</span><span class="pill">⏰ ${s.visitLeft}</span><span class="pill">💗 ${s.trust}</span><span class="pill">💡 ${s.hints}</span><span class="pill">${s.gender==='m'?'♂':'♀'}</span><span class="pill">🚪 ${s.first?(s.first.ok?'✅':'×'+s.first.tries):'—'}</span><span class="pill">🧮 ${['bmi','egfr','crcl'].map(k=>s.calc&&s.calc[k]?(s.calc[k].ok?'✓':'✗'):'·').join('')}</span><span class="pill">✖ ${s.wrong||0}</span><span class="pill">${s.mode==='exam'?'📝':'📘'}</span>${s.classCode&&s.classCode!=='main'?`<span class="pill">🏫 ${esc(s.classCode)}</span>`:''}${s.fromServer?'<span class="pill" title="server">☁️</span>':''}${s.view==='fp'?`<span class="pill" title="${esc(T('view_fpL'))}">👁 1</span>`:''}${s.pat!=null?`<span class="pill">☕ ${s.pat}</span>`:''}${s.hiddenQ?`<span class="pill">🗝️ ${s.hiddenQ.length}</span>`:''}${s.refused?'<span class="pill no">🔒</span>':''}${s.timeout?'<span class="pill no">⏰</span>':''}${s.ending?`<span class="pill">${{best:'🌟',good:'😊',mixed:'😐',bad:'🚑'}[s.ending.tier]||''}</span>`:''}${s.badges&&s.badges.length?`<span class="pill">🏅 ${s.badges.length}</span>`:''}<span class="muted">${esc(localTS(s.updated))}</span></summary><div class="in">
   <b>${T('tFound')}</b><div>${PROBLEMS.map(p=>`<span class="pill ${s.found&&s.found[p.id]?'ok':'no'}">${p.id} ${s.found&&s.found[p.id]?fmt(s.found[p.id].t):'—'}</span>`).join('')}</div>
   <b>${T('chapterTimes')}</b> <span class="muted">${[0,1,2,3,4,5].map(c=>'Ch'+c+' '+fmt((s.chT||{})[c]||0)).join(' · ')}</span>
   <h4 style="margin-top:8px">${T('tFree')} (${free.length})</h4>${free.map(e=>`<div class="ll free">[${fmt(e.t)}] ${e.type==='final'?'🏁 '+(e.cov||[]).filter(Boolean).length+'/'+RUBRIC_SUM.length:e.type==='lockText'?'💗 '+(e.ok?'✅':'❌'):'✍️ → '+esc(e.intent||'-')+(e.emp?' 💗':'')+(e.blame?' ⚠️':'')+(e.priv?' 🔒':'')} — “${esc(e.text)}”</div>`).join('')||'<p class="muted">—</p>'}
   <h4 style="margin-top:8px">${T('tChoices')}</h4>${pres.map(e=>`<div class="ll">[${fmt(e.t)}] ${e.type==='present'?`📂 ${esc(e.st)} ← ${esc(e.item)} ${e.ok?'✅':e.near?'🔸':'❌'}`:e.type==='calc'?`🧮 ${esc(e.id)} #${e.attempt} ${esc(Object.entries(e.vals||{}).map(([k,v])=>k+'='+v).join(', '))} → ${e.result} ${e.ok?'✅':'❌'}`:`☑️ ${esc(e.id)}: ${esc(e.text)}`}</div>`).join('')||'<p class="muted">—</p>'}
   ${s.pp&&Object.keys(s.pp.pre||{}).length?(()=>{ const pre=s.pp.pre||{}, post=s.pp.post||{}, ids=[...new Set(Object.keys(pre).concat(Object.keys(post)))], qt={}; log.forEach(e=>{ if(e.type==='pp') qt[e.qid]=e.q; }); gameQuestions().forEach(x=>{ if(x.cp==='pp') qt[x.id]=LQ(x.q); });
      return `<h4 style="margin-top:8px">📊 ${T('ppStat')} ${Object.values(pre).filter(x=>x.ok).length}/${ids.length} → ${Object.values(post).filter(x=>x.ok).length}/${ids.length}</h4>`+ids.map(id=>`<div class="ll">${pre[id]?(pre[id].ok?'✅':'❌'):'·'} → ${post[id]?(post[id].ok?'✅':'❌'):'·'} ${esc(qt[id]||id)}</div>`).join(''); })():''}
   ${s.refl&&s.refl.length?`<h4 style="margin-top:8px">💭 ${T('reflT')}</h4>`+s.refl.map(a=>`<div class="ll free"><b>${esc(a.q)}</b><br>“${esc(a.ans)}”</div>`).join(''):''}
   ${s.custom&&s.custom.list&&s.custom.list.length?`<h4 style="margin-top:8px">${TE('tCustom')} (${s.custom.score}/${s.custom.max})</h4>`+s.custom.list.map(a=>`<div class="ll${a.kind==='text'?' free':''}">${a.ok?'✅':a.partial?'🔸':a.kind==='text'&&!a.auto?'📝':'❌'} <b>${esc(a.q)}</b> → “${esc(a.ans)}” <span class="muted">(${a.pts}/${a.max})</span></div>`).join(''):''}
   <h4 style="margin-top:8px">${T('tMR')}</h4>${s.mr?`<div class="ll">eGFR ${s.mr.egfr?'✅':'❌'} · ✅${s.mr.perfect} 🔸${s.mr.partial} ❌${s.mr.wrong}</div>`+(s.mr.ans||[]).map(a=>`<div class="ll">${a.perfect?'✅':a.partial?'🔸':'❌'} ${esc(a.id)} — ${esc((a.sel||[]).join(', '))}</div>`).join(''):'<p class="muted">—</p>'}
   <h4 style="margin-top:8px">${T('tBoss')}</h4>${(B.answers||[]).map(a=>`<div class="ll">${qn[a.q+0]||'⏰'} ${esc(a.p)} — ${esc(a.text)}</div>`).join('')||'<p class="muted">—</p>'}
   <h4 style="margin-top:8px">📝 Memo</h4><div class="ll" style="white-space:pre-wrap">${esc(s.notes&&s.notes.memo||'—')}</div>
   <details style="margin-top:8px"><summary class="muted">${T('tAll')} (${log.length})</summary>${log.map(e=>`<div class="ll">[${fmt(e.t)}] ${esc(JSON.stringify(e))}</div>`).join('')}</details>
   <button class="sbtn r" data-del="${esc(s.id)}" style="margin-top:8px">${T('tDel')}</button></div></details>`;
}
function resizeImage(file,max){ return new Promise(res=>{ const fr=new FileReader(); fr.onload=()=>{ const im=new Image(); im.onload=()=>{ const k=Math.min(1,max/Math.max(im.width,im.height)); const c=document.createElement('canvas'); c.width=im.width*k; c.height=im.height*k; c.getContext('2d').drawImage(im,0,0,c.width,c.height); res(c.toDataURL('image/jpeg',.82)); }; im.onerror=()=>res(null); im.src=fr.result; }; fr.readAsDataURL(file); }); }
function pickFiles(multi,accept,cb){ const f=$('#fileIn'); f.value=''; f.multiple=!!multi; f.accept=accept||''; f.onchange=()=>cb(Array.from(f.files)); f.click(); }
function renderTeacher(b){
  if(P.tab==='tOnline') return renderOnline(b);
  if(P.tab==='tClass') return renderClass(b);
  if(P.tab==='tDebrief') return renderDebrief(b);
  if(['tQ','tTexts','tSet','tPub'].includes(P.tab)) return renderEditor(P.tab,b);
  if(P.tab==='tSessions'){ const all=allSessions(); b.innerHTML=all.length?all.map(sessHTML).join(''):`<p class="muted" style="padding:20px">${T('tNone')}</p>`;
    b.querySelectorAll('[data-del]').forEach(x=>x.onclick=async()=>{ const id=x.dataset.del, rs=(SYNC.remote||[]).find(s=>s.id===id); store.set(CONFIG.STORAGE_KEY,(store.get(CONFIG.STORAGE_KEY)||[]).filter(s=>s.id!==id));
      if(rs){ const r=await serverDelete(rs.classCode||'main', id); toast(r.ok?'🗑️ '+T('onDelOne'):'⚠️ '+T('onDown')); } renderPage(); }); }
  else if(P.tab==='tMedia'){ const m=mediaStore();
    b.innerHTML=`<div class="box"><b>${T('tLabUp')}</b><div class="row" style="margin:6px 0"><button class="sbtn b" id="upLab">⬆️</button></div><div class="egrid">${(m.labImages||[]).map((s,i)=>`<div class="ev"><img src="${s}" style="width:100%"><button class="sbtn r" data-dl="${i}">${T('tDel')}</button></div>`).join('')}</div></div>
     <div class="box"><b>${T('tBagUp')}</b><div class="egrid" style="margin-top:6px">${Object.keys(ITEMS).map(id=>`<div class="ev"><div class="ic">${itemIcon(id,44)}</div><b>${esc(L(ITEMS[id].n))}</b><div class="row">${itemImages(id).map(s=>`<img src="${s}" data-zs="1" style="height:48px;border-radius:6px">`).join('')}</div><div class="row"><button class="sbtn b" data-ub="${id}">⬆️</button>${m.medBagImages&&m.medBagImages[id]?`<button class="sbtn r" data-db="${id}">${T('tDel')}</button>`:''}</div></div>`).join('')}</div></div>`;
    $('#upLab').onclick=()=>pickFiles(true,'image/*',async fs=>{ const mm=mediaStore(); for(const f of fs){ const d=await resizeImage(f,1400); if(d) mm.labImages.push(d); } store.set(CONFIG.MEDIA_KEY,mm); toast(T('saved')); renderPage(); });
    b.querySelectorAll('[data-dl]').forEach(x=>x.onclick=()=>{ const mm=mediaStore(); mm.labImages.splice(+x.dataset.dl,1); store.set(CONFIG.MEDIA_KEY,mm); renderPage(); });
    b.querySelectorAll('[data-ub]').forEach(x=>x.onclick=()=>pickFiles(false,'image/*',async fs=>{ if(!fs[0]) return; const d=await resizeImage(fs[0],1100); if(!d) return; const mm=mediaStore(); mm.medBagImages=mm.medBagImages||{}; mm.medBagImages[x.dataset.ub]=d; store.set(CONFIG.MEDIA_KEY,mm); toast(T('saved')); renderPage(); }));
    b.querySelectorAll('[data-db]').forEach(x=>x.onclick=()=>{ const mm=mediaStore(); delete mm.medBagImages[x.dataset.db]; store.set(CONFIG.MEDIA_KEY,mm); renderPage(); }); }
  else { b.innerHTML=`<div class="box"><div class="row"><button class="sbtn b" id="eJ">${T('tExportJ')}</button><button class="sbtn b" id="eC">${T('tExportC')}</button><button class="sbtn g" id="iJ">${T('tImport')}</button><button class="sbtn r" id="cA">${T('tClear')}</button></div></div>`;
    $('#eJ').onclick=()=>download('PharmaDetective_all.json', JSON.stringify(allSessions(),null,2));
    $('#eC').onclick=()=>{ const rows=[['session','name','student_id','class','rank','score','time_s','chapter','type','text','detail']];
      allSessions().forEach(s=>(s.log||[]).filter(e=>(e.type==='ask'&&e.mode==='free')||['lockText','final','present','medrev','calc','firstMove','custom','pp','refl','hidden','ending','refused','timeout','patienceOut'].includes(e.type)).forEach(e=>rows.push([s.id,s.student&&s.student.name,s.student&&s.student.sid,s.classCode||'main',s.rank,s.score,e.t,e.ch,e.type,(e.type==='custom'||e.type==='pp'||e.type==='refl'?e.ans:e.text)||e.item||(e.sel||[]).join(' | ')||e.tier||e.why||e.id||'',e.type==='pp'?(e.phase+' · '+e.q+' · '+(e.ok?'OK':'WRONG')):e.type==='refl'?e.q:e.type==='ending'?(e.items||[]).map(x=>x.k+(x.ok?'+':'-')).join(' '):e.type==='medrev'?(e.m+' '+(e.perfect?'PERFECT':e.partial?'PARTIAL':'WRONG')):e.type==='present'?(e.st+' '+(e.ok?'OK':e.near?'NEAR':'WRONG')):e.type==='calc'?(e.id+' try'+e.attempt+' '+JSON.stringify(e.vals)+' = '+e.result+' '+(e.ok?'OK':'WRONG')):e.type==='firstMove'?('tries '+e.tries+' '+(e.picks||[]).join('>')):e.type==='custom'?(e.cp+' · '+e.q+' · '+e.pts+'/'+e.max+(e.ok?' OK':e.partial?' PARTIAL':e.kind==='text'&&!e.auto?' REVIEW':' WRONG')):e.type==='final'?(e.cov||[]).filter(Boolean).length+'/'+RUBRIC_SUM.length:(e.intent||String(e.ok==null?'':e.ok))])));
      download('PharmaDetective_text_answers.csv','﻿'+rows.map(r=>r.map(c=>'"'+String(c==null?'':c).replace(/"/g,'""')+'"').join(',')).join('\n'),'text/csv'); };
    $('#iJ').onclick=()=>pickFiles(true,'.json,application/json',async fs=>{ const all=store.get(CONFIG.STORAGE_KEY)||[]; let n=0; for(const f of fs){ try{ [].concat(JSON.parse(await f.text())).forEach(s=>{ if(s&&s.id){ const i=all.findIndex(x=>x.id===s.id); if(i>=0) all[i]=s; else all.push(s); n++; } }); }catch(e){ toast('⚠️ '+f.name); } } store.set(CONFIG.STORAGE_KEY,all); toast(T('imported')+': '+n); P.tab='tSessions'; renderPage(); });
    $('#cA').onclick=()=>showModal(`<h3>${T('tClear')}</h3><p>${T('tConfirmClear')}</p>`,[{t:T('tClear'),cls:'r',fn:()=>{ store.set(CONFIG.STORAGE_KEY,[]); if(P.cur) renderPage(); }},{t:T('cancel'),cls:''}]); }
}
/* =====================================================================
   DEBRIEF GUIDE — one printable page for the instructor (GAS: Gather · Analyze · Summarize)
   ===================================================================== */
const DEBRIEF={
 tab:['📋 Debrief 指引','📋 Debrief guide','📋 คู่มือ Debrief'],
 title:['藥師偵探・課後 Debrief 指引（20–30 分鐘）','Pharma Detective · Debrief guide (20–30 min)','Pharma Detective · คู่มือ Debrief หลังเล่น (20–30 นาที)'],
 sub:['個案：陳伯（65 歲，多重就醫、CKD 第 4 期、多重用藥）。架構：GAS——蒐集 Gather → 分析 Analyze → 總結 Summarize。','Case: Uncle Chen (65, doctor-shopping, CKD stage 4, polypharmacy). Structure: GAS — Gather → Analyze → Summarize.','เคส: ลุงเฉิน (65 ปี ไปหาหมอหลายที่ CKD ระยะ 4 ใช้ยาหลายขนาน) · โครงสร้าง GAS — รวบรวม → วิเคราะห์ → สรุป'],
 beforeH:['🕐 上課前','🕐 Before class','🕐 ก่อนเรียน'],
 before:[['在「⚙️ 遊戲設定」選模式：第一次用「練習」，評量用「考試」。','In ⚙️ Settings pick the mode: Practice for a first run, Exam for assessment.','ใน ⚙️ ตั้งค่า เลือกโหมด: ฝึกซ้อมสำหรับครั้งแรก, สอบสำหรับการประเมิน'],
   ['前測、後測和反思題已內建，可在「➕ 加分題」修改。','Pre-test, post-test and reflection questions are built in — edit them under ➕ Extra questions.','มีแบบทดสอบก่อน/หลังเรียนและคำถามสะท้อนคิดในตัว แก้ได้ที่ ➕ คำถามเพิ่ม'],
   ['學生用遊戲連結各自玩 45–60 分鐘，結果會自動傳給老師（沒有網路時，可以按「下載我的報告」交 JSON）。','Students play alone for 45–60 min from the game link; their results reach you automatically (without internet they can press "Download my report" and hand in the JSON).','นักศึกษาเล่นคนเดียว 45–60 นาทีผ่านลิงก์เกม ผลจะส่งถึงอาจารย์อัตโนมัติ (ถ้าไม่มีอินเทอร์เน็ต กด "ดาวน์โหลดรายงาน" แล้วส่งไฟล์ JSON ได้)'],
   ['在「☁️ 線上結果」按「⬇️ 載入最新結果」（或在「工具」匯入 JSON），再打開「📊 全班概況」和這一頁。','Press ⬇️ Load latest results under ☁️ Online results (or import JSON files under Tools), then open 📊 Class overview and this page.','กด ⬇️ โหลดผลล่าสุด ในแท็บ ☁️ ผลออนไลน์ (หรือนำเข้า JSON ที่แท็บเครื่องมือ) แล้วเปิด 📊 ภาพรวมชั้นเรียนและหน้านี้']],
 gatherH:['① 蒐集 Gather（5 分鐘）','① Gather (5 min)','① รวบรวม Gather (5 นาที)'],
 gather:[['這次訪視感覺如何？哪一刻最緊張、最意外？','How did the visit feel? Which moment was most tense or surprising?','รู้สึกอย่างไรกับการเยี่ยมครั้งนี้? ช่วงไหนตึงเครียดหรือน่าประหลาดใจที่สุด?'],
   ['如果陳伯要評價你，他會怎麼說？','If Uncle Chen rated you, what would he say?','ถ้าลุงเฉินให้คะแนนคุณ ลุงจะพูดว่าอะไร?'],
   ['你得到哪一種結局？你覺得是哪個決定造成的？','Which ending did you get, and which decision caused it?','คุณได้ตอนจบแบบไหน และการตัดสินใจใดเป็นสาเหตุ?']],
 analyzeH:['② 分析 Analyze（15 分鐘）——依章節提問','② Analyze (15 min) — questions by chapter','② วิเคราะห์ Analyze (15 นาที) — คำถามรายบท'],
 analyze:[[['進門・訪談','Opening & interview','เปิดการเยี่ยม · สัมภาษณ์'],['為什麼要先自我介紹、取得同意？耐心有限時，你怎麼決定先問什麼？哪些資訊只有自己想到才問得到（過敏、存放、保健品）？','Why introduce yourself and get consent first? With limited patience, how did you decide what to ask first? Which facts only came from questions you thought of yourself (allergies, storage, supplements)?','ทำไมต้องแนะนำตัวและขอความยินยอมก่อน? เมื่อความอดทนมีจำกัด เลือกถามอะไรก่อน? ข้อมูลใดได้มาจากคำถามที่คิดเองเท่านั้น (แพ้ยา การเก็บยา อาหารเสริม)?']],
   [['搜查','House search','ค้นบ้าน'],['家裡哪些線索和陳伯說的不一樣？觀察環境能補足哪些問不到的資訊？','Which clues in the house contradicted what he said? What does observing the home reveal that questions cannot?','เบาะแสใดในบ้านขัดกับที่ลุงพูด? การสังเกตบ้านให้ข้อมูลอะไรที่การถามให้ไม่ได้?']],
   [['矛盾・心鎖','Contradictions & heart lock','จับโกหก · กุญแจหัวใจ'],['怎麼指出矛盾而不讓病人覺得被責怪？信任度怎麼影響他說不說出停藥的真正原因？','How do you point out a contradiction without blaming? How did trust affect whether he told you why he stops his medicines?','จะชี้ความขัดแย้งโดยไม่ตำหนิได้อย่างไร? ความไว้ใจมีผลอย่างไรต่อการที่ลุงยอมเล่าเหตุผลที่หยุดยา?']],
   [['藥物整合','Medication review','ทบทวนยา'],['eGFR 和 CrCl 各用在哪裡？為什麼肥胖讓 CrCl 高估？三重打擊、偽麻黃鹼重複、eGFR < 30 的 metformin、glimepiride 低血糖——哪個最緊急？','Where do eGFR and CrCl each apply? Why does obesity inflate CrCl? Triple whammy, duplicated pseudoephedrine, metformin below eGFR 30, glimepiride hypoglycaemia — which is most urgent?','eGFR กับ CrCl ใช้ต่างกันอย่างไร? ทำไมความอ้วนทำให้ CrCl สูงเกิน? Triple whammy, pseudoephedrine ซ้ำ, metformin เมื่อ eGFR < 30, glimepiride กับน้ำตาลต่ำ — ข้อใดเร่งด่วนที่สุด?']],
   [['衛教・總結','Counselling & summary','ให้คำแนะนำ · สรุป'],['哪個迷思最難反駁？你的總結有沒有請她複述（teach-back）、有沒有約追蹤？','Which myth was hardest to counter? Did your summary include teach-back and a follow-up?','ความเชื่อผิดข้อไหนแย้งยากที่สุด? การสรุปมี teach-back และนัดติดตามหรือไม่?']],
   [['兩週後','Two weeks later','สองสัปดาห์ต่อมา'],['住院或低血糖的結局，是哪個漏掉的問題造成的？建議要怎麼寫，醫師才會採納？','Which missed problem led to a hospital or hypoglycaemia ending? How should a recommendation be written so the doctor acts on it?','ตอนจบที่ต้องนอนโรงพยาบาลหรือน้ำตาลต่ำ เกิดจากปัญหาใดที่พลาด? ควรเขียนข้อเสนอแนะอย่างไรให้แพทย์นำไปใช้?']]],
 sumH:['③ 總結 Summarize（5 分鐘）——帶走的重點','③ Summarize (5 min) — take-home points','③ สรุป Summarize (5 นาที) — ประเด็นที่ต้องจำ'],
 sum:[['居家訪視從「客人」的禮貌與同意開始；信任決定病人說多少。','A home visit starts with a guest\'s courtesy and consent; trust decides how much the patient tells you.','การเยี่ยมบ้านเริ่มจากมารยาทของแขกและการขอความยินยอม ความไว้ใจกำหนดว่าผู้ป่วยจะเล่ามากแค่ไหน'],
   ['多重就醫 → 一定要整合所有來源、所有藥袋。','Doctor-shopping → reconcile every bag from every source.','ไปหาหมอหลายที่ → ต้องทบทวนยาทุกซองจากทุกแหล่ง'],
   ['先看腎功能再看劑量：eGFR 用來分期與看仿單，CrCl 看劑量表；肥胖用調整體重。','Kidneys before doses: eGFR for staging and labels, CrCl for dosing tables, adjusted weight in obesity.','ประเมินไตก่อนดูขนาดยา: eGFR ใช้แบ่งระยะและตามฉลาก, CrCl ใช้กับตารางปรับขนาด, คนอ้วนใช้น้ำหนักปรับ'],
   ['自行停藥常有說不出口的原因（例如性功能）——要問、要保密、要找替代方案。','Self-stopping often hides an unspoken reason (e.g. sexual function) — ask, keep it confidential, find alternatives.','การหยุดยาเองมักมีเหตุผลที่พูดไม่ออก (เช่น สมรรถภาพทางเพศ) — ต้องถาม เก็บความลับ และหาทางเลือก'],
   ['衛教用 teach-back 收尾，並約好追蹤。','Close counselling with teach-back and a follow-up plan.','ปิดการให้คำแนะนำด้วย teach-back และนัดติดตามผล']],
 liveH:['📊 這一班的資料（自動更新）','📊 This class (updates automatically)','📊 ข้อมูลชั้นเรียนนี้ (อัปเดตอัตโนมัติ)'],
 liveNone:['匯入學生紀錄後，這裡會列出全班最常漏掉的問題，可以直接當討論題。','Once student records are imported, the most-missed problems appear here as ready-made discussion prompts.','เมื่อนำเข้าบันทึกนักศึกษาแล้ว ปัญหาที่พลาดบ่อยที่สุดจะแสดงที่นี่ ใช้เป็นประเด็นอภิปรายได้ทันที'],
 liveMiss:['最常漏掉','Most often missed','พลาดบ่อยที่สุด'], liveFound:['找到的人','found by','หาเจอ'], liveAll:['目前全班都找到了所有問題 🎉','So far every student found every problem 🎉','ตอนนี้ทุกคนหาปัญหาเจอครบทุกข้อ 🎉'], liveTb:['總結有 teach-back','Used teach-back','ใช้ teach-back'], liveSecret:['陳伯說出秘密','Uncle Chen told his secret','ลุงเล่าความลับ'], liveEnd:['好結局以上','Good or best ending','ตอนจบดีขึ้นไป'],
 keyH:['🔑 19 個問題（教師用簡要解答）','🔑 The 19 problems (instructor answer key)','🔑 ปัญหา 19 ข้อ (เฉลยย่อสำหรับอาจารย์)'],
 print:['🖨️ 列印／存成 PDF','🖨️ Print / save as PDF','🖨️ พิมพ์ / บันทึกเป็น PDF'], printTip:['列印時只會印出這份指引（A4 一頁）。','Printing outputs only this guide (one A4 page).','เมื่อพิมพ์ จะพิมพ์เฉพาะคู่มือนี้ (A4 หนึ่งหน้า)'],
};
function renderDebrief(b){
  const all=allSessions(), R=all.length?classStats(all):null, li=a=>`<li>${esc(L(a))}</li>`;
  let live=`<p>${esc(L(DEBRIEF.liveNone))}</p>`;
  if(R){ const miss=R.prob.filter(x=>x.n<R.N).sort((a,c)=>a.n-c.n).slice(0,5), done=all.filter(s=>s.done), pc=(n,d)=>d?Math.round(n/d*100)+'%':'—';
    live=`<p><b>n = ${R.N}</b> · ${TC('clDone')} ${R.done}${R.pp.n?` · ${T('ppStat')} ${R.pp.avgPre.toFixed(1)} → ${R.pp.avgPost.toFixed(1)} / ${R.pp.max}`:''} · ${esc(L(DEBRIEF.liveTb))} ${pc(done.filter(s=>s.finalCov&&s.finalCov[1]).length,done.length)} · ${esc(L(DEBRIEF.liveSecret))} ${pc(all.filter(s=>s.found&&s.found.P8).length,all.filter(s=>(s.chapter||0)>=4||s.done).length)} · ${esc(L(DEBRIEF.liveEnd))} ${pc(done.filter(s=>s.ending&&(s.ending.tier==='best'||s.ending.tier==='good')).length,done.filter(s=>s.ending).length)}</p>
      <b>${esc(L(DEBRIEF.liveMiss))}:</b>${miss.length?`<ol>${miss.map(x=>`<li>${x.p.icon} ${esc(L(x.p.t))} — ${esc(L(DEBRIEF.liveFound))} ${pct(x.n,R.N)}%</li>`).join('')}</ol>`:` ${esc(L(DEBRIEF.liveAll))}`}`; }
  b.innerHTML=`<div class="dbtools"><button class="sbtn b" id="dbPrintBtn">${esc(L(DEBRIEF.print))}</button><span class="muted">${esc(L(DEBRIEF.printTip))}</span></div>
   <div id="dbPrint"><h2>${esc(L(DEBRIEF.title))}</h2><div class="dsub">${esc(L(DEBRIEF.sub))}</div>
    <div class="dgrid"><section><h4>${esc(L(DEBRIEF.beforeH))}</h4><ul>${DEBRIEF.before.map(li).join('')}</ul></section>
     <section><h4>${esc(L(DEBRIEF.gatherH))}</h4><ul>${DEBRIEF.gather.map(li).join('')}</ul></section>
     <section class="wide"><h4>${esc(L(DEBRIEF.analyzeH))}</h4><table>${DEBRIEF.analyze.map(([h,q])=>`<tr><th>${esc(L(h))}</th><td>${esc(L(q))}</td></tr>`).join('')}</table></section>
     <section><h4>${esc(L(DEBRIEF.sumH))}</h4><ul>${DEBRIEF.sum.map(li).join('')}</ul></section>
     <section class="live"><h4>${esc(L(DEBRIEF.liveH))}</h4>${live}</section>
     <section class="wide"><h4>${esc(L(DEBRIEF.keyH))}</h4><ol class="dkeys">${PROBLEMS.map(p=>`<li>${p.icon} ${esc(L(p.t))}</li>`).join('')}</ol></section></div></div>`;
  $('#dbPrintBtn').onclick=()=>{ sfx.click(); window.print(); };
}
/* =====================================================================
   I18N · TITLE · BOOT
   ===================================================================== */
function applyI18n(){
  document.documentElement.lang=S.lang==='zh'?'zh-Hant':S.lang;
  $$('[data-i18n]').forEach(e=>e.textContent=T(e.dataset.i18n)); $$('[data-i18n-html]').forEach(e=>e.innerHTML=T(e.dataset.i18nHtml).replace(/<b>60(?=\s*(分鐘|minutes|นาที))/,'<b>'+CONFIG.VISIT_MIN));
  $$('.lbtn').forEach(b=>b.classList.toggle('on',b.dataset.lang===S.lang));
  if(S.sessionId) hud(); if(D.cur) renderLine(false); if(!$('#board').classList.contains('hidden')) renderBoard();
  if(!$('#searchHud').classList.contains('hidden')) updSearchHud();
  if(D.zoomed){ $('#zoomBack').textContent=T('zoomBack'); $('#zoomLbl').textContent='🔍 '+T(ZONES[D.zoomed].n); }
  if(!$('#testiBanner').classList.contains('hidden')){ $('#tPress').textContent=T('press'); $('#tPresent').textContent=T('present'); }
  applyGfx(); applyView(); syncNoteTitle(); syncBadge(); if(!$('#title').classList.contains('hidden')){ renderResume(); renderModeRow(); renderTitleBtns(); } if(P.cur) renderPage();
}
function setLang(l){ S.lang=l; CFGS.langPicked=true; sfx.click(); applyI18n(); saveSession(); }
function renderTitleChars(){
  $('#titleChars').innerHTML=`<div class="char enterR" style="left:300px;width:560px;height:784px">${charSVG('me','happy')}</div><div class="char enterR" style="left:-10px;width:470px;height:658px;bottom:-20px">${charSVG('yeh','smug')}</div><div style="position:absolute;right:30px;top:120px;width:190px;height:230px;animation:float 2.4s ease-in-out infinite">${pillySVG('happy')}</div>`;
}
/* mode: practice / exam (the instructor can lock it in Settings) */
function renderModeRow(){ $$('.msel').forEach(b=>{ b.classList.toggle('on',b.dataset.mode===S.mode); b.disabled=!!MODE_FORCED&&b.dataset.mode!==MODE_FORCED; b.textContent=T('mode_'+b.dataset.mode); });
  const h=$('#modeHelp'); if(h) h.innerHTML=(MODE_FORCED?`<span class="lk">${T('modeLocked')}</span> · `:'')+esc(T('modeH_'+S.mode)); }
const cleared=()=>{ try{ return localStorage.getItem('phd_cleared')==='1'; }catch(e){ return false; } };
function renderTitleBtns(){ const st=badgeStore(), n=BADGES.filter(x=>st[x.id]).length; const bb=$('#btnBadges'), cb=$('#btnChSel');
  if(bb) bb.textContent='🏅 '+n+'/'+BADGES.length; if(cb){ cb.textContent=T('chSel'); cb.classList.remove('lock'); } }
/* chapter practice (open from the start): jump into one chapter with a ready-made state; nothing is recorded */
function buildPracticeState(ch){
  S.practice=true; S.sessionId=null; S.student={name:$('#inName').value.trim()||T('you'), sid:''}; S.t0=Date.now(); S.qte=$('#qteToggle').checked; S.visit=CONFIG.VISIT_MIN; S.trust=5;
  const F=(ids,c)=>ids.forEach(p=>S.found[p]={t:0,ch:c}), prof=ks=>ks.forEach(k=>S.profile.add(k));
  if(ch>=2){ F(['P5','P7','P10','P11','P12'],1); prof(['dob','body','edu','pmh1','pmh3','cc','family']); ['basic','history','body','checkup','family','meds','life'].forEach(k=>S.asked[k]=1); S.first={tries:1,picks:['intro'],ok:true}; S.calc.bmi={ok:true,tries:1,value:30.1}; S.trust=6; S.visit=44; }
  if(ch>=3){ KEY_ITEMS.concat(['endo_bag','report']).forEach(id=>{ if(!S.evidence.includes(id)) S.evidence.push(id); }); S.notes.labsUnlocked=true; S.visit=32; }
  if(ch>=4){ F(['P1','P6','P9','P4','P3','P2','P8'],3); prof(['smoke','alcohol','diet','pmh2','secret','joint']); S.usedEv=['calendar','pilljar','trash_bags','takeout','beer','cigs','pillbox']; S.trust=7; S.visit=26; }
  if(ch>=5){ F(['P13','P14','P15','P16','P17','P18','P19'],4); prof(['renal']); S.medsSeen=true; MISSIONS.forEach(m=>{ S.mr.ans.push({id:m.id, sel:m.ans, perfect:true, partial:false}); m.ans.forEach(id=>(S.mr.tags[id]=S.mr.tags[id]||[]).push(L(m.tag))); }); S.mr.perfect=MISSIONS.length; S.mr.egfr=true; S.visit=20; }
}
async function practiceChapter(ch){
  const au=audioStart(); await cfgReady(); await au; if(isLocked()){ applyLock(); return; } buildPracticeState(ch); const before=new Set(Object.keys(S.found));
  $('#title').classList.add('hidden'); $('#hud').classList.remove('hidden'); hud(); logEvent({type:'practice', ch, mode:S.mode});
  if(ch>1) await wipe(()=>{ setBg('liv'); hideAll(); hideText(); });
  try{ await [null,chapter1,chapter2,chapter3,chapter4,chapter5][ch](); }catch(e){ console.error(e); }
  hideAll(); hideText(); ['#boss','#medrev','#locks','#testiBanner'].forEach(q=>{ const e=$(q); if(e) e.classList.add('hidden'); });
  const got=Object.keys(S.found).filter(p=>!before.has(p)), extra={1:`☕ ${S.pat} · ↪ ${FOLLOW1.filter(f=>S.asked[f.id]).length}/${FOLLOW1.length} · 🗝️ ${S.hiddenQ.length}/3`, 2:`🎒 ${KEY_ITEMS.filter(hasEv).length}/${KEY_ITEMS.length}`, 3:`❤️ ${S.hearts} · ✖ ${S.wrong}`, 4:`💊 ${S.mr.perfect}/${MISSIONS.length}`, 5:`👿 ${S.boss.crit}/${S.boss.answers.length} · ${T('mythLeftStat')} ${(S.boss.alive||[]).length} · ✍️ ${S.finalCov.filter(Boolean).length}/5`}[ch];
  sfx.fanfare(); showModal(`<div style="font-size:48px">📚</div><h3>${T('pracDone')}</h3><p><b>${T('ch'+ch)} · ${T('ch'+ch+'t')}</b> · ${T('mode_'+S.mode)}</p><p>${extra}</p>${got.length?`<div style="text-align:left">${got.map(id=>{ const p=PROBLEMS.find(x=>x.id===id); return `<div>✅ ${p.icon} ${esc(L(p.t))}</div>`; }).join('')}</div>`:''}`,[{t:T('pracBack'),fn:()=>location.reload()}],()=>{});
}
function showChapterSelect(){
  sfx.paper();
  showModal(`<h3>${T('chSel')}</h3><p class="muted">${T('chSelIntro')}</p><p>${T('modeLbl')}: <b>${T('mode_'+S.mode)}</b></p><div class="chgrid">${[1,2,3,4,5].map(c=>`<button data-pch="${c}"><span>${['','🗂️','🔦','⚖️','💊','👿'][c]}</span>${T('ch'+c)}<small>${T('ch'+c+'t')}</small></button>`).join('')}</div>`,[{t:T('cancel'),cls:''}],null,'wide');
  setTimeout(()=>$$('#mCard [data-pch]').forEach(x=>x.onclick=()=>{ const c=+x.dataset.pch; MQ.length=0; nextModal(); practiceChapter(c); }),30);
}
function showVerNote(){ const el=$('#verNote'); if(!el) return; const m=GAME_CFG_BASE.meta||{}, parts=[];
  if(m.note) parts.push('📌 '+esc(m.note)); if(m.rev) parts.push(esc(localTS(m.rev).slice(0,10))); if(cfgNorm(GAME_CFG)!==cfgNorm(GAME_CFG_BASE)) parts.push(`<b class="dr">${T('draftBadge')}</b>`);
  el.innerHTML=parts.join(' · '); el.classList.toggle('hidden',!parts.length); }
function showTitle(){
  setBg('ext'); $('#title').classList.remove('hidden'); renderTitleChars(); $('#qteToggle').checked=(GAME_CFG.settings||{}).qte!==false; showVerNote(); renderModeRow(); renderTitleBtns();
  $$('.gsel').forEach(b=>{ const keep=S.avatar; S.avatar=b.dataset.av; b.querySelector('.av').innerHTML=charSVG('me','happy'); S.avatar=keep; b.classList.toggle('on',b.dataset.av===S.avatar); });
  applyI18n();
}
/* ---------- story steps · save at the start of every chapter · resume ---------- */
const STEPS=[()=>prologue(),()=>runCheckpoint('pre'),()=>chapter1(),()=>runCheckpoint('c1'),()=>chapter2(),()=>runCheckpoint('c2'),()=>chapter3(),()=>runCheckpoint('c3'),()=>chapter4(),()=>runCheckpoint('c4'),()=>chapter5(),()=>runCheckpoint('c5'),()=>epilogue(),()=>runCheckpoint('post'),()=>results()];
const STEP_CH=[0,0,1,1,2,2,3,3,4,4,5,5,6,6,6], RESUME_KEY=CONFIG.STORAGE_KEY+'_resume';
const IN_HOME=new Set([4,6,8,10]), AFTER_VISIT=11;   // chapters 2–5 need the family's time; when it runs out the visit ends
const cfgRevNow=()=>(GAME_CFG.meta&&GAME_CFG.meta.rev)||'';
function saveResume(step){ try{ const s=JSON.parse(JSON.stringify(S,(k,v)=>v instanceof Set?[...v]:v)); localStorage.setItem(RESUME_KEY, JSON.stringify({v:2, step, at:Date.now(), elapsed:realSec(), rev:cfgRevNow(), S:s})); }catch(e){} }
function loadResume(){ try{ const r=JSON.parse(localStorage.getItem(RESUME_KEY)||'null'); if(r&&(r.v===1||r.v===2)&&r.S&&!r.S.done&&!r.S.practice&&r.step>=1&&r.step<STEPS.length-1&&r.rev===cfgRevNow()) return r; }catch(e){} return null; }
function clearResume(){ try{ localStorage.removeItem(RESUME_KEY); }catch(e){} }
async function runSteps(from){
  try{ for(let i=from;i<STEPS.length;i++){
      if(IN_HOME.has(i)&&S.visit<=0&&!S.timeout){ await timeoutEnd(S.chapter); i=AFTER_VISIT; }
      if(i>=1&&i<STEPS.length-1) saveResume(i); await STEPS[i](); } clearResume(); }
  catch(e){ console.error(e); toast('⚠️ '+e.message); }
}
function renderResume(){ const r=loadResume(), box=$('#resumeBox'); if(!box) return; box.classList.toggle('hidden',!r); $('#tBrief').classList.toggle('hidden',!!r); if(!r) return;
  const mins=Math.max(1,Math.round((Date.now()-r.at)/60000)), ago=mins<90?T('minsAgo').replace('{n}',mins):T('hrsAgo').replace('{n}',Math.round(mins/60)), ch=STEP_CH[r.step];
  box.innerHTML=`<div class="rq">📌 ${T('resumeQ')}</div><div class="rd"><b>${esc(r.S.student&&r.S.student.name||'?')}</b> · ${esc(r.S.student&&r.S.student.sid||'')} · ${T('resumeAt')}: <b>${T('ch'+ch)} ${T('ch'+ch+'t')}</b> · ${ago}</div>
    <div class="ra"><button class="gbtn green" id="btnResume">${T('resumeGo')}</button><button class="sbtn" id="btnDiscard">${T('resumeDel')}</button></div>`;
  $('#btnResume').onclick=()=>resumeGame(r); $('#btnDiscard').onclick=()=>{ clearResume(); sfx.click(); renderResume(); }; }
async function resumeGame(r){
  if(isLocked()){ applyLock(); return; }
  sfx.select(); await audioStart(); Object.assign(S, r.S); S.profile=new Set(r.S.profile||[]); S.t0=Date.now()-r.elapsed*1000; S.chStart=realSec(); S.done=false;
  applyI18n(); applyAudio(); applyMotion(); $('#title').classList.add('hidden'); $('#hud').classList.remove('hidden'); hud();
  logEvent({type:'resume', step:r.step}); saveSession(true);
  if(r.step>=2) await wipe(()=>{ setBg('liv'); hideAll(); hideText(); });
  toast(T('resumed')); playTheme('calm'); await runSteps(r.step);
}
async function startGame(){
  const name=$('#inName').value.trim(), sid=$('#inSid').value.trim();
  if(!name||!sid){ toast(T('nameNeeded')); (name?$('#inSid'):$('#inName')).focus(); return; }
  if(loadResume()&&!startGame.ok){ showModal(`<h3>${T('startNew')}</h3><p>${T('resumeNewQ')}</p>`,[{t:T('startNew'),cls:'r',fn:()=>{ clearResume(); startGame.ok=true; startGame(); }},{t:T('cancel'),cls:''}]); return; }
  const au=audioStart(); await cfgReady(); await au; if(isLocked()){ applyLock(); return; } S.qte=$('#qteToggle').checked;
  S.student={name,sid}; S.sessionId='PD'+Date.now().toString(36)+Math.random().toString(36).slice(2,6); S.created=new Date().toISOString(); S.t0=Date.now();
  $('#title').classList.add('hidden'); $('#hud').classList.remove('hidden'); hud(); logEvent({type:'start', qte:S.qte, avatar:S.avatar, gender:S.gender, mode:S.mode, view:VIEW.fp?'fp':'tp'}); saveSession(true);
  clearResume(); await runSteps(0);
}
function bindUI(){
  addEventListener('resize', scaleStage); scaleStage(); bindParallax(); initFitTitle();
  const st=$('#stage'); st.addEventListener('scroll',()=>{ st.scrollTop=0; st.scrollLeft=0; }); addEventListener('scroll',()=>{ if(scrollX||scrollY) scrollTo(0,0); });
  $$('.lbtn').forEach(b=>b.onclick=()=>{ audioStart(); setLang(b.dataset.lang); });
  $$('.gsel').forEach(b=>b.onclick=()=>{ S.avatar=b.dataset.av; S.gender=b.dataset.g; $$('.gsel').forEach(x=>x.classList.toggle('on',x===b)); renderTitleChars(); sfx.select(); });
  $('#btnStart').onclick=startGame; $('#inSid').onkeydown=e=>{ if(e.key==='Enter') startGame(); };
  $('#btnTeacher').onclick=()=>openPage('teacher');
  $$('.msel').forEach(b=>b.onclick=()=>{ if(MODE_FORCED) return; S.mode=b.dataset.mode; try{ localStorage.setItem('phd_mode',S.mode); }catch(e){} sfx.select(); renderModeRow(); });
  $('#btnBadges').onclick=showBadges; $('#btnChSel').onclick=showChapterSelect; $('#viewBtn').onclick=()=>{ setView(!VIEW.fp); sfx.click(); toast('👁 '+T('view')+': '+T(VIEW.fp?'view_fpL':'view_tpL')); }; $('#gfxBtn').onclick=()=>{ const o=['auto','high','low']; setGfx(o[(o.indexOf(GFX.pref)+1)%3]); sfx.click(); };
  $('#bCase').onclick=()=>openPage('case'); $('#bLog').onclick=showLog; $('#bMenu').onclick=()=>openPage('menu'); $('#pClose').onclick=closePage;
  $('#tbox').onclick=advance; $('#tEdit').onclick=e=>{ e.stopPropagation(); if(D.cur&&Array.isArray(D.cur.text)) openLineEditor(D.cur.text,()=>renderLine(false)); };
  $('#freeIn').onkeydown=e=>{ if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){ e.preventDefault(); D.boardGo&&D.boardGo(); } };
  $('#inText').onkeydown=e=>{ if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){ e.preventDefault(); D.inputGo&&D.inputGo(); } };
  addEventListener('keydown', e=>{
    if(modalOpen) return; const tag=(document.activeElement||{}).tagName||''; const typing=/INPUT|TEXTAREA/.test(tag);
    if(e.key==='Escape'&&P.cur){ closePage(); return; } if(P.cur||typing) return;
    if(e.key==='Escape'&&D.zoomed){ sfx.zoom(); camReset(); return; }
    if(D.introGo&&(e.key===' '||e.key==='Enter')){ e.preventDefault(); D.introGo(); return; }
    if(/^[1-4]$/.test(e.key)&&D.choiceFinish){ D.choiceFinish(+e.key-1); return; }
    if(D.testiAct&&e.key==='ArrowLeft'){ D.testiAct('prev'); return; } if(D.testiAct&&e.key==='ArrowRight'){ D.testiAct('next'); return; }
    if(e.key===' '||e.key==='Enter'){ if((!$('#getCard').classList.contains('hidden')||($('#epiBox')&&!$('#epiBox').classList.contains('hidden')))&&D.getOk){ e.preventDefault(); D.getOk(); return; }
      if(!$('#tbox').classList.contains('hidden')&&(D.typing||D.res)){ e.preventDefault(); advance(); } }
  });
  addEventListener('beforeunload', ()=>saveSession(true));
}
(async function main(){
  bindUI(); applyView(); initSync(); initCaseBack(); showTitle(); initLock(); gfxWatch(); cfgRefresh();
  window.__PD__={S, D, CH, ED_ST, edWork, askCustom, MISSIONS, DRUGS, ZONES, reveal, addEvidence, openPage, startGame, advance, HOTSPOTS, onHotspot, zoomTo, camReset, computeScore, FOLLOW1, BADGES, DEFAULT_QUESTIONS, practiceChapter, epiOutcomes};
})();
</script>
</body>
</html>
