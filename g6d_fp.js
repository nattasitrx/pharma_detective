
/* =====================================================================
   FIRST-PERSON VIEW (optional)
   The player's own sprite is never drawn — you face the patient through your own eyes.
   Your hands appear when you show your ID, present evidence and search the house.
   Stored per device in localStorage 'phd_view' ('fp' | 'tp'); third person is the default.
   ===================================================================== */
const VIEW={fp:(()=>{ try{ return localStorage.getItem('phd_view')==='fp'; }catch(e){ return false; } })(), n:0};
function applyView(){
  const st=$('#stage'); if(st) st.classList.toggle('fp',VIEW.fp);
  const b=$('#viewBtn'); if(b) b.textContent='👁 '+T('view')+': '+T(VIEW.fp?'view_fp':'view_tp');
}
function setView(fp){
  VIEW.fp=!!fp; try{ localStorage.setItem('phd_view',VIEW.fp?'fp':'tp'); }catch(e){}
  if(VIEW.fp){ const c=CH.me; if(c){ delete CH.me; c.el.classList.add('exit'); setTimeout(()=>c.el.remove(),330); } }
  else { fpHide(true); if(D.meWant&&!CH.me&&Object.keys(CH).length) show('me',D.meWant.slot,D.meWant.e); }
  applyView(); if(typeof logEvent==='function'&&S.t0) logEvent({type:'view', view:VIEW.fp?'fp':'tp'});
}
/* ---------- drawing ---------- */
function fpPal(){ const p=PAL[S.avatar==='me2'?'me2':'me']||PAL.me; return {sk:p.skin, sh:p.sh}; }
function fpDefs(P){ const c=fpPal(); return `<defs><linearGradient id="${P}k" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c.sk}"/><stop offset="1" stop-color="${c.sh}" stop-opacity=".55"/></linearGradient>
  <linearGradient id="${P}c" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#d6deef"/></linearGradient></defs>`; }
function fpLayer(inner, mirror){ return `<svg class="fpL" viewBox="-800 -800 1600 1600" width="1600" height="1600"><g${mirror?' transform="scale(-1 1)"':''}>${inner}</g></svg>`; }
/* pinch grip at the right edge of a held card (origin = grip point) */
function fpPinchBack(P){ const c=fpPal(), O=OUTL; return `${fpDefs(P)}
  <path d="M-30 -60 C-5 -78 40 -80 75 -60 C110 -40 150 30 171 105 L191 139 L109 189 L89 155 C70 110 45 92 15 84 C-5 79 -20 74 -30 66 Z" fill="url(#${P}k)" stroke="${O}" stroke-width="5" stroke-linejoin="round"/>
  <path d="M60 60 C80 85 92 112 100 150 L150 150 C140 110 120 70 95 45 Z" fill="${c.sh}" opacity=".5"/>
  <path d="M8 -46 C36 -44 58 -28 70 2" fill="none" stroke="${c.sh}" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M191 106 Q125 105 85 170 C150 420 260 700 374 907 L666 733 C520 520 340 300 191 106 Z" fill="url(#${P}c)" stroke="${O}" stroke-width="5.5" stroke-linejoin="round"/>
  <path d="M85 170 C150 420 260 700 374 907 L430 873 C320 680 210 420 128 158 Z" fill="#c8d2e8" opacity=".55"/>
  <path d="M208 135 Q142 134 102 199" fill="none" stroke="${O}" stroke-width="4" stroke-linecap="round"/>
  <path d="M240 300 C262 330 300 340 330 332 M300 440 C318 470 350 482 384 476" fill="none" stroke="#b9c3dc" stroke-width="4" stroke-linecap="round"/>`; }
function fpPinchThumb(P){ const c=fpPal(), O=OUTL; return `${fpDefs(P)}
  <path d="M58 18 C20 -2 -20 -26 -48 -30 C-72 -32 -82 -6 -66 8 C-40 26 10 52 70 72 Z" fill="url(#${P}k)"/>
  <path d="M58 18 C20 -2 -20 -26 -48 -30 C-72 -32 -82 -6 -66 8 C-40 26 10 52 70 72" fill="none" stroke="${O}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  <ellipse cx="-50" cy="-10" rx="17" ry="11" transform="rotate(22 -50 -10)" fill="#fff4ee" stroke="${c.sh}" stroke-width="2.5"/>`; }
/* hand curled around a handle, arm running along +y (origin = grip point) */
function fpGrip(P){ const c=fpPal(), O=OUTL; return `${fpDefs(P)}
  <path d="M-44 96 C-66 86 -82 56 -76 34 C-72 20 -58 18 -50 30 C-44 42 -40 60 -30 74 Z" fill="url(#${P}k)" stroke="${O}" stroke-width="5" stroke-linejoin="round"/>
  <ellipse cx="-66" cy="34" rx="8" ry="6" transform="rotate(-60 -66 34)" fill="#fff4ee" stroke="${c.sh}" stroke-width="2"/>
  <path d="M-50 34 C-52 4 -50 -22 -38 -24 C-28 -26 -25 -18 -25 -10 C-25 -26 -20 -31 -12 -31 C-2 -31 1 -22 0 -10 C0 -24 6 -28 13 -28 C22 -28 26 -20 25 -8 C27 -16 32 -18 38 -17 C47 -15 50 -4 49 20 C52 62 58 100 56 150 L-40 162 C-48 112 -54 70 -50 34 Z" fill="url(#${P}k)" stroke="${O}" stroke-width="5" stroke-linejoin="round"/>
  <path d="M-25 -8 C-25 6 -26 18 -27 30 M0 -8 C0 6 0 18 -1 30 M25 -6 C25 6 25 18 24 30" fill="none" stroke="${c.sh}" stroke-width="3.2" stroke-linecap="round"/>
  <path d="M-44 44 q7 6 14 0 M-19 42 q7 6 14 0 M6 42 q7 6 14 0 M31 44 q6 5 12 0" fill="none" stroke="${c.sh}" stroke-width="3" stroke-linecap="round"/>
  <path d="M-34 -18 q5 -3 8 2 M-9 -25 q5 -3 8 2 M15 -22 q5 -3 8 2 M37 -11 q4 -2 6 2" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".85"/>
  <path d="M30 60 C40 90 44 120 44 150 L56 150 C58 110 54 80 48 50 Z" fill="${c.sh}" opacity=".55"/>
  <path d="M-62 150 Q2 118 70 146 C96 420 128 800 160 1300 L-160 1300 C-118 800 -86 420 -62 150 Z" fill="url(#${P}c)" stroke="${O}" stroke-width="5.5" stroke-linejoin="round"/>
  <path d="M-62 150 C-86 420 -118 800 -160 1300 L-104 1300 C-70 800 -48 420 -32 156 Z" fill="#c8d2e8" opacity=".55"/>
  <path d="M-56 176 Q4 146 78 172" fill="none" stroke="${O}" stroke-width="4" stroke-linecap="round"/>
  <path d="M30 300 C44 318 66 322 90 316" fill="none" stroke="#b9c3dc" stroke-width="4" stroke-linecap="round"/>`; }
const fpSpark=(x,y,s)=>`<path d="M${x} ${y-14*s} l${4*s} ${10*s} l${10*s} ${4*s} l${-10*s} ${4*s} l${-4*s} ${10*s} l${-4*s} ${-10*s} l${-10*s} ${-4*s} l${10*s} ${-4*s}Z" fill="#fffbe0" stroke="#ffb300" stroke-width="1.5" stroke-linejoin="round"/>`;
function fpIdCard(){
  const por=charSVG('me','happy').replace('viewBox="0 0 400 560"','viewBox="78 28 244 300" preserveAspectRatio="xMidYMin slice"');
  return `<div class="fpCard fpId" style="left:0;top:-150px;width:300px;height:190px">
    <div class="hd"><i>✚</i><div><b>${esc(T('idTitle'))}</b><small>${esc(T('idFac'))}</small></div></div>
    <div class="nm">${esc(S.student.name||T('you'))}</div><div class="rl">${esc(T('idRole'))}</div>
    <div class="no">ID ${esc(S.student.sid||'— — —')}</div><div class="bc"></div>
    <div class="ph">${por}</div></div>`;
}
function fpEvCard(id){ const it=ITEMS[id]; if(!it) return '';
  return `<div class="fpCard fpEv" style="left:-310px;top:-280px;width:310px;height:350px">
    <div class="hd">${it.req?'★ ':''}${esc(T('evHdr'))}</div><div class="nm">${esc(L(it.n))}</div>
    <div class="ic">${itemIcon(id,190)}</div></div>`; }
/* ---------- show / hide ---------- */
const FP_ANIM=()=>S.motion&&!GFX.low;
function fpHold(kind, id, o){
  if(!VIEW.fp) return; o=o||{}; fpHide(true); const P='fp'+(++VIEW.n), host=$('#fpHand'); if(!host) return;
  const left=kind==='id';
  const x=o.x!=null?o.x:(left?235:1340), y=o.y!=null?o.y:(left?470:560), rot=o.rot!=null?o.rot:(left?6:-7);
  const card=left?fpIdCard():fpEvCard(id);
  const spark=o.sparkle?`<svg class="fpL" viewBox="-800 -800 1600 1600" width="1600" height="1600">${fpSpark(-330,-250,1.5)}${fpSpark(-40,-300,1.1)}${fpSpark(-350,40,.9)}${fpSpark(30,-160,.8)}</svg>`:'';
  host.innerHTML=`<div class="fpH${left?' L':''}" style="left:${x}px;top:${y}px"><div class="fpR" style="transform:rotate(${rot}deg)">
    ${o.sparkle?'<div class="fpGlow"></div>':''}${fpLayer(fpPinchBack(P+'a'),left)}${card}${fpLayer(fpPinchThumb(P+'b'),left)}${spark}</div></div>`;
  const h=host.firstElementChild; VIEW.cur=h;
  if(FP_ANIM()) h.animate([{transform:'translateY(560px)'},{transform:'translateY(-10px)',offset:.75},{transform:'translateY(0)'}],{duration:420,easing:'cubic-bezier(.2,.9,.3,1)'});
}
function fpHide(now){
  const h=VIEW.cur; VIEW.cur=null; if(!h) return;
  if(now||!FP_ANIM()){ h.remove(); return; }
  const a=h.animate([{transform:'translateY(0)'},{transform:'translateY(600px)'}],{duration:280,easing:'cubic-bezier(.5,0,.8,.4)',fill:'forwards'});
  a.onfinish=()=>h.remove(); setTimeout(()=>h.remove(),600);
}
/* reach out and pull/open something at stage point (x,y); fire-and-forget */
function fpReach(x, y){
  if(!VIEW.fp) return; const host=$('#fpHand'); if(!host) return; const P='fp'+(++VIEW.n);
  const left=x<600, bx=left?Math.max(100,Math.min(700,x-300)):Math.max(900,Math.min(1500,x+300)), by=1150;
  const dx=bx-x, dy=Math.max(120,by-y), rot=Math.atan2(-dx,dy)*180/Math.PI, ux=dx/Math.hypot(dx,dy), uy=dy/Math.hypot(dx,dy);
  const el=document.createElement('div'); el.className='fpH reach';
  el.style.left=x+'px'; el.style.top=(y+6)+'px';
  el.innerHTML=`<div class="fpR" style="transform:rotate(${rot}deg)">${fpLayer(fpGrip(P),left)}</div>`; host.appendChild(el);
  const off=(k)=>`translate(${ux*k}px,${uy*k}px)`;
  if(FP_ANIM()){
    const a=el.animate([{transform:off(420)},{transform:off(0),offset:.28},{transform:off(0),offset:.62},{transform:off(26),offset:.72},{transform:off(26),offset:.8},{transform:off(460)}],{duration:1150,easing:'ease-in-out',fill:'forwards'});
    a.onfinish=()=>el.remove(); setTimeout(()=>el.remove(),1600);
  } else setTimeout(()=>el.remove(),700);
}
/* run a short exchange while the hand holds up an item / the ID card */
async function fpShow(kind, id, fn, o){
  if(!VIEW.fp) return fn();
  fpHold(kind, id, o); if(FP_ANIM()) await sleep(260);
  try{ return await fn(); } finally { fpHide(); }
}
