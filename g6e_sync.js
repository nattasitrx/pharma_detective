
/* =====================================================================
   ONLINE RESULTS
   Every saved game is also sent to the results server, so students never have to download
   and hand in a file (this matters on iPads and phones). If the device is offline or the
   server is down, snapshots wait in an outbox and are retried; the manual report stays.
   The instructor dashboard pulls everything back with an instructor key (not the PIN).
   Server records are held in memory only — they are never written into this device's storage.
   The same server also hands out the version of the game the instructor published (below).
   ===================================================================== */
const SYNC={busy:false, state:'idle', last:0, lastTry:0, timer:null, fail:0, OUTBOX:'phd_outbox_v1', KEY:'phd_tkey', remote:[], classes:{}, pulled:0, pulling:false};
function serverURL(){ const s=GAME_CFG.settings||{}; const u=(s.server!=null?s.server:CONFIG.SERVER_URL)||''; return String(u).trim().replace(/\/+$/,''); }
const isMine=s=>((s&&s.case)||'a')===CASE_ID;   // games saved by this case (older games have no case: they are case A)
const normClass=c=>String(c||'').trim().toLowerCase().replace(/[^a-z0-9_-]/g,'').slice(0,40);
function classCode(){ let c=''; try{ c=new URLSearchParams(location.search).get('class')||''; }catch(e){} if(!normClass(c)) c=(GAME_CFG.settings||{}).classCode||''; return normClass(c)||'main'; }
function gameLink(cls){ let base=CONFIG.GAME_URL; try{ if(/^https?:/.test(location.protocol)) base=location.origin+location.pathname; }catch(e){}
  const c=normClass(cls); return base+(c&&c!=='main'?'?class='+encodeURIComponent(c):''); }
const outbox=()=>store.get(SYNC.OUTBOX)||{};
const setOutbox=o=>store.set(SYNC.OUTBOX,o);
/* called by saveSession(): queue the newest snapshot; send now (chapter ends) or at most every ~45 s */
function syncQueue(snap, now){
  if(!serverURL()||!snap||!snap.id) return;
  const o=outbox(); o[snap.id]=snap; setOutbox(o);
  if(SYNC.state==='idle'||SYNC.state==='ok') SYNC.state='pending';
  clearTimeout(SYNC.timer); SYNC.timer=setTimeout(syncFlush, now?50:Math.max(1500, 45000-(Date.now()-SYNC.lastTry)));
  syncBadge();
}
async function syncFlush(){
  const url=serverURL(); if(!url||SYNC.busy) return;
  const o=outbox(), ids=Object.keys(o); if(!ids.length){ if(SYNC.state!=='ok') SYNC.state='idle'; syncBadge(); return; }
  SYNC.busy=true; SYNC.lastTry=Date.now(); SYNC.state='sending'; syncBadge(); let bad=false;
  for(const id of ids){
    const body=JSON.stringify(o[id]);
    try{
      const r=await fetch(url+'/api/submit',{method:'POST', headers:{'Content-Type':'text/plain;charset=UTF-8'}, body, keepalive:body.length<60000, cache:'no-store'});
      const j=await r.json().catch(()=>({}));
      if(r.ok&&j.ok){ const cur=outbox(); if(cur[id]&&cur[id].updated===o[id].updated){ delete cur[id]; setOutbox(cur); } }
      else bad=true;
    }catch(e){ bad=true; }
  }
  SYNC.busy=false; clearTimeout(SYNC.timer);
  if(bad){ SYNC.state='error'; SYNC.fail++; SYNC.timer=setTimeout(syncFlush, Math.min(120000, 8000*SYNC.fail)); }
  else { SYNC.fail=0; SYNC.last=Date.now(); SYNC.state='ok'; if(Object.keys(outbox()).length){ SYNC.state='pending'; SYNC.timer=setTimeout(syncFlush, 800); } }
  syncBadge();
}
/* leaving the page: hand anything still queued to the browser so it can finish sending */
function syncBeacon(){ const url=serverURL(); if(!url||!navigator.sendBeacon) return; const o=outbox();
  Object.keys(o).forEach(id=>{ const body=JSON.stringify(o[id]); if(body.length<60000){ try{ navigator.sendBeacon(url+'/api/submit', new Blob([body],{type:'text/plain;charset=UTF-8'})); }catch(e){} } }); }
function syncText(){
  if(!serverURL()) return T('syncOff');
  const hm=t=>new Date(t).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
  if(SYNC.state==='sending'||SYNC.state==='pending') return T('syncSending');
  if(SYNC.state==='error') return T('syncErr');
  if(SYNC.state==='ok') return T('syncOk')+(SYNC.last?' · '+hm(SYNC.last):'');
  return '';
}
function syncBadge(){ const t=syncText(); $$('.syncSt').forEach(el=>{ el.textContent=t; el.classList.toggle('hidden',!t); el.classList.toggle('err',SYNC.state==='error'||!serverURL()); el.classList.toggle('ok',SYNC.state==='ok'); }); }
function syncNoteTitle(){ const el=$('#syncNote'); if(!el) return; const c=classCode();
  el.textContent=serverURL()?'☁️ '+T('syncNote')+(c!=='main'?' · '+T('syncClass')+': '+c:''):''; el.classList.toggle('hidden',!serverURL()); }
function initSync(){
  addEventListener('online', ()=>{ SYNC.fail=0; syncFlush(); });
  addEventListener('pagehide', syncBeacon);
  document.addEventListener('visibilitychange', ()=>{ if(document.visibilityState==='hidden') syncBeacon(); else if(Object.keys(outbox()).length) syncFlush(); });
  if(Object.keys(outbox()).length){ SYNC.state='pending'; setTimeout(syncFlush, 2500); }
  syncNoteTitle();
}
/* ---------- instructor side ---------- */
const teacherKey=()=>{ try{ return localStorage.getItem(SYNC.KEY)||''; }catch(e){ return SYNC.memKey||''; } };
function setTeacherKey(k){ k=String(k||'').trim(); SYNC.memKey=k; SYNC.badKey=false; try{ if(k) localStorage.setItem(SYNC.KEY,k); else localStorage.removeItem(SYNC.KEY); }catch(e){} }
async function serverPull(){
  const url=serverURL(), key=teacherKey();
  if(!url) return {ok:false, error:'nourl'}; if(!key) return {ok:false, error:'nokey'};
  SYNC.pulling=true;
  try{
    let offset=0, got=[], classes={};
    while(offset!=null){
      const r=await fetch(`${url}/api/sessions?after=${encodeURIComponent(offset)}`,{headers:{'X-Teacher-Key':key}, cache:'no-store'});
      if(r.status===401){ SYNC.badKey=true; return {ok:false, error:'badkey'}; }   // the saved key no longer matches (it may have been changed in Cloudflare)
      if(!r.ok) return {ok:false, error:'http'};
      const j=await r.json(); got=got.concat(j.sessions||[]); classes=j.classes||classes; offset=j.next;
    }
    got=got.filter(isMine); got.forEach(s=>{ s.fromServer=true; }); classes={}; got.forEach(s=>{ const c=s.classCode||'main'; classes[c]=(classes[c]||0)+1; });
    SYNC.remote=got; SYNC.classes=classes; SYNC.pulled=Date.now(); SYNC.badKey=false;
    return {ok:true, n:got.length, classes};
  }catch(e){ return {ok:false, error:'net'}; }
  finally{ SYNC.pulling=false; }
}
/* a class on the server can hold games from several cases: delete only this case's games, one by one */
async function serverDelete(cls, id){
  const url=serverURL(), key=teacherKey(); if(!url||!key) return {ok:false};
  if(!id){ const ids=(SYNC.remote||[]).filter(s=>(s.classCode||'main')===cls).map(s=>s.id); let n=0, bad=false;
    for(const x of ids){ const r=await serverDelete(cls, x); if(r.ok) n+=r.n||0; else bad=true; } return {ok:!bad, n}; }
  try{ const r=await fetch(`${url}/api/sessions?class=${encodeURIComponent(cls)}${id?'&id='+encodeURIComponent(id):''}`,{method:'DELETE', headers:{'X-Teacher-Key':key}});
    const j=await r.json().catch(()=>({})); if(r.ok&&j.ok){ SYNC.remote=SYNC.remote.filter(s=>!((s.classCode||'main')===cls&&(!id||s.id===id))); return {ok:true, n:j.deleted}; } return {ok:false}; }
  catch(e){ return {ok:false}; }
}
async function serverHealth(){ const url=serverURL(); if(!url) return false; try{ const r=await fetch(url+'/api/health',{cache:'no-store'}); const j=await r.json(); return !!(r.ok&&j.ok); }catch(e){ return false; } }
/* opening the dashboard with a saved key quietly refreshes the server results */
async function serverAutoPull(){
  if(!serverURL()||!teacherKey()||SYNC.pulling||Date.now()-SYNC.pulled<60000) return;
  const r=await serverPull();
  if(r.ok){ toast('☁️ '+T('onPulled').replace('{n}',r.n)); if(P.cur==='teacher'&&['tHome','tOnline','tSessions','tClass','tDebrief'].includes(P.tab)) renderPage(); }
  else if(r.error==='badkey'){ toast('⚠️ '+T('onBadKey')); if(P.cur==='teacher'&&P.tab==='tHome') renderPage(); }
}
function renderOnline(b){
  const url=serverURL(), key=teacherKey(), cls=Object.entries(SYNC.classes||{}).sort((a,c)=>a[0].localeCompare(c[0]));
  const hm=t=>new Date(t).toLocaleString([], {month:'short', day:'numeric', hour:'2-digit', minute:'2-digit'});
  b.innerHTML=`<p class="edintro">${T('onIntro')}</p>
   ${url?`<div class="box casesw"><b>🚦 ${T('swH')}</b><span class="st" id="swSt">…</span><button class="sbtn" id="swBtn" disabled>…</button><p class="muted" style="flex-basis:100%;margin:0">${T('swNote')}</p></div>`:''}
   <div class="box"><b>${T('onServer')}</b><div class="row" style="margin-top:6px;align-items:center"><code style="font-size:13px">${esc(url||'—')}</code><button class="sbtn" id="onTest">${T('onTest')}</button><span id="onTestR" class="muted"></span></div></div>
   <div class="box"><b>${T('onKey')}</b><div class="row" style="margin-top:6px"><input class="ein" id="onKeyIn" type="password" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" value="${esc(key)}" placeholder="••••••••" style="max-width:300px"><button class="sbtn" id="onKeySave">${T('onSave')}</button></div><p class="muted" style="margin-top:4px">🔑 ${T('onKeyNote')}</p></div>
   <div class="box"><div class="row" style="align-items:center"><button class="sbtn g" id="onPull">${T('onPull')}</button><span class="muted">${SYNC.pulled?T('onLast')+': '+hm(SYNC.pulled)+' · '+SYNC.remote.length+' '+T('onRecords'):T('onAuto')}</span></div>
     ${cls.length?`<table class="tbl" style="margin-top:8px"><tr><th>${T('onClasses')}</th><th>${T('onRecords')}</th><th>${T('onLinkH')}</th><th></th></tr>${cls.map(([c,n])=>`<tr><td><b>${esc(c)}</b></td><td>${n}</td><td><code style="font-size:12px">${esc(gameLink(c))}</code></td><td><button class="sbtn" data-cp="${esc(gameLink(c))}">${T('onCopy')}</button><button class="sbtn r" data-dc="${esc(c)}" data-dn="${n}">${T('onDelCls')}</button></td></tr>`).join('')}</table>`:''}
     <p class="muted" style="margin-top:6px">${T('onLocalNote')}</p></div>
   <div class="box"><b>${T('onLinkH')}</b><p class="muted" style="margin:4px 0">${T('onLinkNote')}</p><div class="row" style="align-items:center"><input class="ein" id="onCls" placeholder="ph2026a" style="max-width:180px"><code id="onLink" style="font-size:13px">${esc(gameLink(''))}</code><button class="sbtn" id="onCopyLink">${T('onCopy')}</button></div></div>`;
  const copy=t=>{ const done=()=>toast('📋 '+T('onCopied')); try{ navigator.clipboard.writeText(t).then(done,()=>prompt('',t)); }catch(e){ prompt('',t); } };
  const swPaint=()=>{ const st=$('#swSt'), bt=$('#swBtn'); if(!st) return; st.className='st '+(LOCK.closed?'off':'on'); st.textContent=LOCK.known?T(LOCK.closed?'swClosed':'swOpen'):T('swUnknown');
    bt.textContent=T(LOCK.closed?'swOpenBtn':'swClose'); bt.className='sbtn '+(LOCK.closed?'g':'r'); bt.disabled=!LOCK.known; };
  if($('#swBtn')){ swPaint(); statusFetch(url).then(swPaint,swPaint);
    $('#swBtn').onclick=async()=>{ setTeacherKey($('#onKeyIn').value); if(!teacherKey()){ toast('⚠️ '+T('onNoKey')); $('#onKeyIn').focus(); return; }
      const bt=$('#swBtn'); bt.disabled=true; const r=await setCaseClosed(!LOCK.closed);
      if(r.ok){ sfx.get(); toast(T(LOCK.closed?'swClosed':'swOpen')); } else toast('⚠️ '+T(r.error==='badkey'?'onBadKey':r.error==='nokey'?'onNoKey':'onDown')); swPaint(); }; }
  $('#onTest').onclick=async()=>{ $('#onTestR').textContent='…'; const ok=await serverHealth(); $('#onTestR').textContent=ok?T('onUp'):T('onDown'); };
  $('#onKeySave').onclick=()=>{ setTeacherKey($('#onKeyIn').value); sfx.click(); toast('🔑 '+T('saved')); };
  $('#onPull').onclick=async()=>{ setTeacherKey($('#onKeyIn').value); if(!teacherKey()){ toast('⚠️ '+T('onNoKey')); return; }
    $('#onPull').disabled=true; $('#onPull').textContent='…'; const r=await serverPull();
    if(r.ok){ sfx.get(); toast('☁️ '+T('onPulled').replace('{n}',r.n)); } else toast('⚠️ '+T(r.error==='badkey'?'onBadKey':r.error==='nokey'?'onNoKey':'onDown'));
    if(P.cur==='teacher'&&P.tab==='tOnline') renderPage(); };
  $('#onCls').oninput=e=>{ $('#onLink').textContent=gameLink(e.target.value); };
  $('#onCopyLink').onclick=()=>copy($('#onLink').textContent);
  b.querySelectorAll('[data-cp]').forEach(x=>x.onclick=()=>copy(x.dataset.cp));
  b.querySelectorAll('[data-dc]').forEach(x=>x.onclick=()=>{ const c=x.dataset.dc;
    showModal(`<h3>${T('onDelCls')}</h3><p>${esc(T('onDelQ').replace('{c}',c).replace('{n}',x.dataset.dn))}</p>`,[{t:T('onDelCls'),cls:'r',fn:async()=>{ const r=await serverDelete(c); if(r.ok){ toast('🗑️ '+r.n); delete SYNC.classes[c]; } else toast('⚠️ '+T('onDown')); renderPage(); }},{t:T('cancel'),cls:''}]); });
}
/* ---------- the instructor's published version of the game ----------
   Every game asks the server which version the instructor published for its class link
   (or for every link). It is cached, so the next visit starts with it straight away; if it
   arrives while the student is still on the title screen it is applied there and then. */
const CFGS={state:'idle', promise:null, at:0, langPicked:!!URL_LANG};
const CFG_NS=CASE_ID==='a'?'':CASE_ID+'--';
const cfgKey=cls=>cls==='*'?(CFG_NS?CFG_NS+'all':'*'):CFG_NS+cls;   // server key for one class link, or '*' = every link
const cfgLabel=k=>{ k=String(k||''); if(CFG_NS){ if(!k.startsWith(CFG_NS)) return null; k=k.slice(CFG_NS.length); return k==='all'?'*':k; } return k.includes('--')?null:k; };   // null = another case
const cfgOnlineRev=c=>(c&&c.meta&&c.meta.online)?(c.meta.rev||null):null;
function cfgCacheSave(o){ try{ const all=JSON.parse(localStorage.getItem(CFG_ONLINE_KEY)||'{}'); if(o) all[CFG_REQ_CLASS]=o; else delete all[CFG_REQ_CLASS]; localStorage.setItem(CFG_ONLINE_KEY, JSON.stringify(all)); }
  catch(e){ try{ localStorage.removeItem(CFG_ONLINE_KEY); }catch(_){} } }
function applyGameCfg(c){ GAME_CFG=c; loadOverrides(); applyCfgSettings(); S.visit=CONFIG.VISIT_MIN; S.hearts=CONFIG.HEARTS; S.charges=CONFIG.SEARCH_CHARGES; MODE_FORCED=modeForced(); if(MODE_FORCED) S.mode=MODE_FORCED;
  if(!CFGS.langPicked){ const l=(c.settings||{}).lang; S.lang=LANGS.includes(l)?l:'zh'; } }
function refreshTitle(){ if($('#title').classList.contains('hidden')) return; $('#qteToggle').checked=(GAME_CFG.settings||{}).qte!==false; showVerNote(); applyI18n(); applyLock(); }
function cfgRefresh(){
  const url=serverURL(); if(!url) return Promise.resolve(false); if(CFGS.promise) return CFGS.promise;
  CFGS.state='loading'; const ac=typeof AbortController!=='undefined'?new AbortController():null, tm=setTimeout(()=>{ try{ ac&&ac.abort(); }catch(e){} },20000);
  CFGS.promise=(async()=>{ const stP=statusFetch(url, ac?ac.signal:undefined).catch(()=>null); try{
      const get=async q=>{ const r=await fetch(`${url}/api/config?${q}`,{cache:'no-store', signal:ac?ac.signal:undefined}); const j=await r.json(); if(!r.ok||!j||!j.ok) throw new Error('http'); return j; };
      let j;
      if(!CFG_NS) j=await get(`class=${encodeURIComponent(CFG_REQ_CLASS)}`);
      else { j=await get(`class=${encodeURIComponent(cfgKey(CFG_REQ_CLASS))}&exact=1`); if(!j.config) j=await get(`class=${encodeURIComponent(cfgKey('*'))}&exact=1`); }
      CFGS.state='ok'; CFGS.at=Date.now();
      if((j.rev||null)===cfgOnlineRev(GAME_CFG_BASE)) return false;
      const next=j.config?cfgFromOnline(j):GAME_CFG_BAKED; if(!next) return false;
      cfgCacheSave(j.config?{cls:j.cls, rev:j.rev, note:j.note||'', config:j.config}:null);
      GAME_CFG_BASE=next;
      const idle=!CFG_DRAFTMODE&&!(typeof ED_ST!=='undefined'&&ED_ST.work)&&!S.sessionId&&!$('#title').classList.contains('hidden');
      if(idle){ applyGameCfg(next); refreshTitle(); if(j.config) toast(T('cfgNew')); }
      return true;
    }catch(e){ CFGS.state='error'; return false; }
    finally{ await stP; applyLock(); clearTimeout(tm); CFGS.promise=null; } })();
  return CFGS.promise;
}
/* starting a game waits (briefly) for the instructor's version, so a first-time visitor plays the right one */
async function cfgReady(){ if(!CFGS.promise) return; const t=setTimeout(()=>toast(T('cfgWait')),350); try{ await Promise.race([CFGS.promise, sleep(6000)]); } finally{ clearTimeout(t); } }
/* uploaded pictures that students do not have yet */
function mediaPending(){ const lm=mediaStore(), bm=GAME_CFG_BASE.media||{}, flat=m=>[].concat(m.labImages||[], ...Object.values(m.medBagImages||{}).map(v=>[].concat(v)));
  const have=new Set(flat(bm)); return flat(lm).some(x=>!have.has(x)); }
async function teacherFetch(path, opt){ const url=serverURL(), key=teacherKey(); if(!url) return {ok:false, error:'nourl'}; if(!key) return {ok:false, error:'nokey'};
  try{ const o=Object.assign({cache:'no-store'}, opt||{}); o.headers=Object.assign({'X-Teacher-Key':key}, (opt&&opt.headers)||{});
    const r=await fetch(url+path, o); if(r.status===401){ SYNC.badKey=true; return {ok:false, error:'badkey'}; } if(r.status===413) return {ok:false, error:'big'};
    const j=await r.json().catch(()=>({})); return r.ok&&j.ok?j:{ok:false, error:'http'}; }catch(e){ return {ok:false, error:'net'}; } }
const serverConfigs=async()=>{ const r=await teacherFetch('/api/configs'); if(r.ok) r.configs=(r.configs||[]).filter(c=>cfgLabel(c.cls)!==null).map(c=>Object.assign({}, c, {key:c.cls, cls:cfgLabel(c.cls)})); return r; };
const serverPublish=(target,cfg)=>teacherFetch(`/api/config?class=${encodeURIComponent(cfgKey(target))}&note=${encodeURIComponent((cfg.meta&&cfg.meta.note)||'')}`,{method:'PUT', headers:{'Content-Type':'text/plain;charset=UTF-8'}, body:JSON.stringify(cfg)});
const serverUnpublish=target=>teacherFetch(`/api/config?class=${encodeURIComponent(cfgKey(target))}`,{method:'DELETE'});
/* ---------- back to the case list (site root) ---------- */
function caseHome(){ try{ if(!/^https?:/.test(location.protocol)||!/\/case-[a-z]\/(index\.html)?$/.test(location.pathname)) return '';
    const q=new URLSearchParams(); const c=new URLSearchParams(location.search).get('class'); if(c) q.set('class',c); q.set('lang',S.lang);
    return '../?'+q.toString(); }catch(e){ return ''; } }
function initCaseBack(){ const a=$('#caseBack'); if(!a) return; const go=caseHome(); a.classList.toggle('hidden',!go);
  a.onclick=e=>{ e.preventDefault(); const u=caseHome(); if(u) location.href=u; }; }
/* ---------- open / closed: the instructor can keep a case closed ("not this week") with one switch ----------
   The state is stored on the server under its own key (st--<case>), apart from published versions, and applies at once
   to every class link. Students see a "not open yet" card instead of the title panel; the dashboard stays reachable. */
const LOCK={closed:false, key:'phd_status_'+CASE_ID, sk:'st--'+CASE_ID, known:false};
try{ LOCK.closed=localStorage.getItem(LOCK.key)==='1'; }catch(e){}
const isLocked=()=>!CFG_DRAFTMODE&&LOCK.closed;
function applyLock(){ const t=$('#title'), box=$('#lockBox'); if(!t||!box) return; const L=isLocked();
  t.classList.toggle('locked',L); box.classList.toggle('hidden',!L); if(!L&&typeof fitTitle==='function') fitTitle(); }
async function statusFetch(url, signal){
  const r=await fetch(`${url}/api/config?class=${encodeURIComponent(LOCK.sk)}&exact=1`,{cache:'no-store', signal}); const j=await r.json(); if(!r.ok||!j||!j.ok) throw new Error('http');
  LOCK.closed=!!(j.config&&j.config.closed); LOCK.known=true; try{ localStorage.setItem(LOCK.key, LOCK.closed?'1':'0'); }catch(e){} return LOCK.closed; }
async function setCaseClosed(closed){ const r=await teacherFetch(`/api/config?class=${encodeURIComponent(LOCK.sk)}`,{method:'PUT', headers:{'Content-Type':'text/plain;charset=UTF-8'}, body:JSON.stringify({closed:!!closed, at:new Date().toISOString()})});
  if(r.ok){ LOCK.closed=!!closed; LOCK.known=true; try{ localStorage.setItem(LOCK.key, closed?'1':'0'); }catch(e){} applyLock(); } return r; }
function initLock(){ const tb=$('#lockTeacher'); if(tb) tb.onclick=()=>openPage('teacher'); applyLock(); }
