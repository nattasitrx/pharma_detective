/* =====================================================================
   VISUAL-NOVEL ENGINE (promise based: await say(...), await choose(...))
   with fluid layer: crossfading emotions, lip-sync, idle motion, parallax
   ===================================================================== */
document.head.insertAdjacentHTML('beforeend','<style>'+CHAR_CSS+`
#stage.searching .bgl.kb svg,#stage.nomotion .bgl.kb svg{animation:none}
#stage.nomotion .cs *{animation:none!important}
</style>`);
const D={cur:null, typing:false, shown:0, iv:null, waiting:false, res:null, lastClick:0, hist:[], lastAsk:null, choiceFinish:null, lastName:''};
const CH={};
const SLOTX={L:30, C:540, R:1050, LC:280, RC:800};
const SPEED={slow:80, normal:50, fast:22};
/* keep the title panel inside the 1600x900 stage whatever the screen, language or font:
   move the panel up and shrink the logo first, then scale the panel a little, and only as a last resort let it scroll */
const FIT={scale:!!(window.CSS&&CSS.supports&&CSS.supports('scale','1'))};
function fitScale(el,s){ s=Math.round(s*1000)/1000; if(FIT.scale){ el.style.scale=s===1?'':String(s); } else { el.style.transform=s===1?'':`scale(${s})`; } }
function fitTitle(){
  const t=$('#title'), lg=$('#logo'), p=$('#tPanel'); if(!t||!lg||!p||t.classList.contains('hidden')) return;
  p.style.maxHeight=''; p.classList.remove('fitScroll');
  const BOT=886, TOP0=318, GAP=22, LT=lg.offsetTop, L=lg.offsetHeight||1, h=p.offsetHeight; if(!h) return;
  let top=Math.min(TOP0, BOT-h), sl=Math.min(1,(top-GAP-LT)/L), sp=1;
  if(sl<.62){ sl=.62; top=Math.round(LT+L*sl+GAP); sp=Math.max(.8,(BOT-top)/h);
    if(h*sp>BOT-top+1){ p.style.maxHeight=Math.floor((BOT-top)/sp)+'px'; p.classList.add('fitScroll'); } }
  fitScale(lg,sl); fitScale(p,sp); p.style.top=Math.round(top)+'px';
}
function initFitTitle(){
  if(window.ResizeObserver){ const ro=new ResizeObserver(()=>requestAnimationFrame(fitTitle)); ro.observe($('#tPanel')); ro.observe($('#logo')); }
  if(document.fonts&&document.fonts.ready) document.fonts.ready.then(fitTitle);
  addEventListener('load', fitTitle); fitTitle();
}
function scaleStage(){ const k=Math.min(innerWidth/1600, innerHeight/900); $('#stage').style.transform=`translate(${(innerWidth-1600*k)/2}px,${(innerHeight-900*k)/2}px) scale(${k})`; D.k=k; }
function stagePt(ev){ const r=$('#stage').getBoundingClientRect(), k=r.width/1600; return {x:(ev.clientX-r.left)/k, y:(ev.clientY-r.top)/k}; }
/* ---------- backgrounds: crossfade + Ken Burns + motes ---------- */
function setBg(name){
  const host=$('#bg'), old=host.querySelector('.bgl.cur');
  if(old&&old.dataset.name===name) return;
  const l=document.createElement('div'); l.className='bgl'+(name==='liv'||name==='ext'?' kb':''); l.dataset.name=name;
  l.innerHTML = name==='ext'?bgExterior():name==='liv'?bgLiving():''; host.appendChild(l);
  void l.offsetWidth; l.classList.add('cur');
  if(old){ old.classList.remove('cur'); old.querySelectorAll('[data-hs],[data-zone],#sparkLayer').forEach(e=>{ e.removeAttribute('data-hs'); e.removeAttribute('data-zone'); e.removeAttribute('id'); }); setTimeout(()=>old.remove(),850); }
  $('#bgCam').classList.remove('dark'); $('#stage').classList.remove('searching','overview'); camReset(true);
  bgFx(name==='liv'||name==='ext'?'motes':'');
}
function curBg(){ return $('#bg .bgl.cur'); }
function bgFx(name){
  const fx=$('#bgfx');
  if(name==='testi') fx.innerHTML='<div class="redglow"></div><div class="speedlines"></div>';
  else if(name==='rays') fx.innerHTML='<div class="rays" style="opacity:1"></div>';
  else if(name==='motes') fx.innerHTML='<div class="motes">'+Array.from({length:14},(_,i)=>`<i style="left:${5+i*6.7}%;top:${55+(i*37)%40}%;animation-duration:${7+(i%5)*2}s;animation-delay:${-i*1.1}s"></i>`).join('')+'</div>';
  else fx.innerHTML='';
}
/* parallax follows the pointer for depth */
function bindParallax(){
  /* the scene no longer follows the mouse (it made the picture flicker); only the search torch tracks the pointer */
  $('#stage').addEventListener('pointermove',e=>{
    if(!$('#stage').classList.contains('searching')) return;
    const p=stagePt(e); $('#torch').style.setProperty('--mx',p.x+'px'); $('#torch').style.setProperty('--my',p.y+'px');
  });
}
/* ---------- characters ---------- */
function frameHTML(who,e){ return `<div class="fr">${charSVG(who,e)}</div>`; }
function show(who, slot, e){
  if(who==='me'){ D.meWant={slot, e:e||(D.meWant&&D.meWant.e)||'neutral'}; if(typeof VIEW!=='undefined'&&VIEW.fp) return; }
  let c=CH[who];
  if(!c){ const el=document.createElement('div'); el.className='char enter'+(slot==='L'||slot==='LC'?'L':slot==='R'||slot==='RC'?'R':'C');
    el.style.setProperty('--blink',(3.8+Math.random()*2.4).toFixed(2)+'s'); el.style.setProperty('--bd',(-Math.random()*3).toFixed(2)+'s');
    el.innerHTML=`<div class="frwrap">${frameHTML(who,e||'neutral')}</div>`; $('#chars').appendChild(el); c=CH[who]={el, emo:e||'neutral'}; setTimeout(()=>el.classList.remove('enterL','enterR','enterC'),600); }
  else emo(who,e||c.emo);
  c.slot=slot; c.el.style.left=SLOTX[slot]+'px';
}
function hide(who){ if(who==='me') D.meWant=null; const c=CH[who]; if(!c) return; delete CH[who]; c.el.classList.add('exit'); setTimeout(()=>c.el.remove(),330); }
function hideAll(){ Object.keys(CH).forEach(hide); pillyHide(); D.meWant=null; if(typeof fpHide==='function') fpHide(true); }
function emo(who,e){
  const c=CH[who]; if(!c||!e||c.emo===e) return; c.emo=e;
  const wrap=c.el.querySelector('.frwrap'), olds=[...wrap.querySelectorAll('.fr')];
  wrap.insertAdjacentHTML('beforeend',frameHTML(who,e)); const nf=wrap.lastElementChild; nf.style.opacity=0; void nf.offsetWidth; nf.style.opacity=1;
  setTimeout(()=>olds.forEach(o=>o.remove()),260);
  c.el.classList.remove('epop'); void c.el.offsetWidth; c.el.classList.add('epop');
}
function act(who,a){ const c=CH[who]; if(!c) return; c.el.classList.remove('shake','hop'); void c.el.offsetWidth; c.el.classList.add(a); setTimeout(()=>c.el&&c.el.classList.remove(a),500); }
function focusSpeaker(who){ Object.keys(CH).forEach(k=>{ const c=CH[k]; c.el.classList.toggle('dim', !!CH[who]&&k!==who); c.el.classList.toggle('talk', k===who); }); }
function speaking(who,on){ Object.keys(CH).forEach(k=>CH[k].el.classList.toggle('speaking', on&&k===who)); $('#pilly').classList.toggle('speaking', on&&who==='pilly'); }
function pillyShow(e){ const p=$('#pilly'); const fresh=p.classList.contains('hidden'); p.innerHTML=pillySVG(e||'happy'); p.classList.remove('hidden','talk'); void p.offsetWidth; p.classList.add('talk'); if(fresh) p.animate([{opacity:0,transform:'translateY(40px) scale(.6)'},{opacity:1,transform:'none'}],{duration:420,easing:'cubic-bezier(.2,1.4,.4,1)'}); }
function pillyHide(){ $('#pilly').classList.add('hidden'); }
/* ---------- intro card (first appearance of each character) ---------- */
async function introCard(who){
  if(S.met[who]) return; S.met[who]=1; const info=CHAR_INFO[who]; if(!info) return; hideText();
  const name = who==='me'?(S.student.name||T('you')):T(who);
  const pose = who==='chen'?'happy':who==='yeh'?'smug':who==='wife'?'happy':'happy';
  $('#introHost').innerHTML=`<div id="intro"><div class="dim"></div><div class="slab" style="background:linear-gradient(90deg,${info.c[0]},${info.c[1]})"></div>
   <div class="por"${who==='pilly'?' style="width:460px;height:552px;bottom:120px;right:200px"':''}>${charSVG(who,pose)}</div>
   <div class="txt"><span class="role" style="color:${info.c[0]}">${esc(L(info.role))}</span><div class="nm">${esc(name)}</div><div class="q">${esc(L(info.q))}</div>
   <div class="tags">${(info.tags||[]).map(t=>`<span>${esc(L(t))}</span>`).join('')}</div><div style="margin-top:26px;font-weight:700;opacity:.85">${T('skip')}</div></div></div>`;
  sfx.intro(); logEvent({type:'intro', who});
  await new Promise(res=>{ const el=$('#intro'); let done=false; const fin=()=>{ if(done) return; done=true; D.introGo=null; el.classList.add('out'); setTimeout(()=>{ $('#introHost').innerHTML=''; res(); },340); };
    el.onclick=fin; D.introGo=fin; setTimeout(fin,4200); });
}
/* ---------- dialogue ---------- */
function say(who, e, text, o){
  o=o||{};
  return new Promise(res=>{
    if(CH[who]) emo(who,e); if(who==='me'&&D.meWant&&e) D.meWant.e=e;
    if(who==='pilly') pillyShow(e); else if(!o.keepPilly) pillyHide();
    focusSpeaker(who);
    const tb=$('#tbox'); const wasHidden=tb.classList.contains('hidden'); tb.classList.remove('hidden','me','sys','testi');
    if(wasHidden){ tb.classList.remove('in'); void tb.offsetWidth; tb.classList.add('in'); }
    if(who==='me') tb.classList.add('me'); else if(who==='sys'||who==='pilly') tb.classList.add('sys'); if(o.testi) tb.classList.add('testi');
    const nmTxt = who==='me'?(S.student.name||T('you')):T(who), nmEl=$('#tName');
    if(nmTxt!==D.lastName){ nmEl.classList.remove('swap'); void nmEl.offsetWidth; nmEl.classList.add('swap'); D.lastName=nmTxt; } nmEl.textContent=nmTxt;
    if(who==='me') D.lastAsk=text; else if(who==='sys') D.lastAsk=null;
    D.cur={who,text,e,pg:1}; D.pg=null; D.hist.push({who,text}); if(D.hist.length>400) D.hist.shift();
    D.res=res; D.waiting=false;
    if(o.sfx) sfx[o.sfx](); else if(e==='cough') sfx.cough(2);
    if(e==='shock'&&CH[who]) act(who,'hop'); if((e==='cough'||e==='angry')&&CH[who]) act(who,'shake');
    startTyping();
  });
}
function fullText(){ return D.cur?(Array.isArray(D.cur.text)?L(D.cur.text):D.cur.text):''; }
function lineText(){ const f=fullText(); if(!D.cur||!D.cur.pg) return f;
  const key=S.lang+'|'+$('#tbox').clientWidth+'|'+f; if(!D.pg||D.pg.key!==key) D.pg={key, list:paginate(f), i:0};
  return D.pg.list[Math.min(D.pg.i,D.pg.list.length-1)]; }
/* pages: only when the line would need < 27px; break at sentence ends, then clauses, then spaces — never inside ⟦…⟧ */
const PG_MIN=27, PG_ABBR=/(?:^|[\s(])(?:Dr|Mr|Mrs|Ms|St|No|vs|e\.g|i\.e)\.$/;
function pgEnd(lv,ch,nx,buf){
  if(lv===0) return /[。！？；…\n]/.test(ch)||(/[.!?]/.test(ch)&&nx===' '&&!PG_ABBR.test(buf));
  if(lv===1) return /[，、：—]/.test(ch)||(/[,;:]/.test(ch)&&nx===' ');
  return ch===' '; }
function paginate(full){
  const tb=$('#tbox'), t=$('#tText'); if(tb.classList.contains('hidden')||!tb.clientHeight) return [full];
  const cs=getComputedStyle(tb), avail=tb.clientHeight-parseFloat(cs.paddingTop)-parseFloat(cs.paddingBottom)+2, keepFs=t.style.fontSize;
  const fits=(s,fs)=>{ t.style.fontSize=fs+'px'; t.innerHTML=richLine(s,1e9,0); return t.scrollHeight<=avail; };
  const cut=(s,lv)=>{ const out=[]; let buf='', d=0; const a=Array.from(s);
    a.forEach((ch,i)=>{ buf+=ch; if(ch==='⟦') d++; else if(ch==='⟧') d=Math.max(0,d-1);
      if(!d&&i<a.length-1&&pgEnd(lv,ch,a[i+1],buf)){ out.push(buf); buf=''; } });
    if(buf) out.push(buf); return out; };
  try{
    if(fits(full,PG_MIN)) return [full];
    let atoms=[full];
    for(let lv=0;lv<3;lv++) atoms=atoms.flatMap(x=>fits(x.trim(),PG_MIN)?[x]:cut(x,lv));
    const pages=[]; let cur='';
    for(const a of atoms){ if(cur&&!fits((cur+a).trim(),31)){ pages.push(cur.trim()); cur=a; } else cur+=a; }
    if(cur.trim()) pages.push(cur.trim());
    return pages.length?pages:[full];
  } finally { t.style.fontSize=keepFs; D.fitKey=''; }
}
function startTyping(){
  const len=Array.from(KP(lineText())).length; D.shown=0; D.typing=true; $('#tNext').style.visibility='hidden'; clearInterval(D.iv);
  speaking(D.cur.who,true); refreshEditButtons();
  const step=S.lang==='zh'?1:2, ms=SPEED[S.textSpeed]||SPEED.normal;
  D.iv=setInterval(()=>{ D.shown=Math.min(len,D.shown+step); renderLine(true); if(D.shown%2===0||step>1) sfx.blip(D.cur.who); if(D.shown>=len) finishTyping(); }, ms);
  renderLine(true);
}
/* typewriter HTML: n visible characters, last k animated, ⟦key phrases⟧ highlighted */
function richLine(full, n, k){
  const out=[]; let kp=false;
  for(const ch of full){ if(ch==='⟦'){ kp=true; continue; } if(ch==='⟧'){ kp=false; continue; } if(out.length>=n) break; out.push([ch,kp]); }
  let h='', cls=null, buf='';
  const flush=()=>{ if(buf) h+=cls?`<span class="${cls}">${esc(buf)}</span>`:esc(buf); buf=''; };
  out.forEach(([ch,kp],i)=>{ const c=((kp?'kp ':'')+(k&&i>=out.length-k?'nc':'')).trim(); if(c!==cls){ flush(); cls=c; } buf+=ch; });
  flush(); return h;
}
function renderLine(anim){
  if(!D.cur) return; const full=lineText(), t=$('#tText');
  fitLine(t, full);
  const k=(D.typing&&anim&&D.shown>0)?(S.lang==='zh'?1:2):0;
  t.innerHTML=richLine(full, D.typing?D.shown:1e9, k);
  const a=$('#tAsk'), w=D.cur.who, showAsk=D.lastAsk&&w!=='me'&&w!=='sys'&&w!=='pilly';
  a.classList.toggle('hidden',!showAsk); if(showAsk) a.textContent='🗨 '+T('youSaid')+'：'+KP(Array.isArray(D.lastAsk)?L(D.lastAsk):D.lastAsk);
}
// shrink the font step by step until the WHOLE line fits the box (measured once per line, before typing starts)
function fitLine(t, full){
  const tb=$('#tbox'); if(tb.classList.contains('hidden')||!tb.clientHeight){ t.style.fontSize=''; D.fitKey=''; return; }
  const key=S.lang+'|'+tb.clientWidth+'|'+full; if(D.fitKey===key) return; D.fitKey=key;
  t.style.fontSize=''; t.innerHTML=richLine(full,1e9,0);
  const cs=getComputedStyle(tb), avail=tb.clientHeight-parseFloat(cs.paddingTop)-parseFloat(cs.paddingBottom)+2;
  let fs=parseFloat(getComputedStyle(t).fontSize)||31; while(t.scrollHeight>avail&&fs>19){ fs-=2; t.style.fontSize=fs+'px'; }
}
function finishTyping(){ clearInterval(D.iv); D.typing=false; renderLine(false); speaking(null,false); D.waiting=true; $('#tNext').style.visibility='visible'; }
function advance(){
  const now=performance.now(); if(now-D.lastClick<220) return; D.lastClick=now;
  if(D.typing){ finishTyping(); return; }
  if(D.waiting&&D.res&&D.cur&&D.cur.pg&&D.pg&&D.pg.i<D.pg.list.length-1){ D.waiting=false; D.pg.i++; sfx.click(); startTyping(); return; }
  if(D.waiting&&D.res){ D.waiting=false; const r=D.res; D.res=null; sfx.click(); r(); }
}
function hideText(){ $('#tbox').classList.add('hidden'); D.lastName=''; }
function fitChoices(box){
  const btns=[...box.querySelectorAll('.cbtn')], q=box.querySelector('#qte'); if(!btns.length||!box.clientHeight) return;
  const fits=()=>{ const kids=[...box.children]; return kids.reduce((a,k)=>a+k.offsetHeight,0)+(kids.length-1)*parseFloat(box.style.gap)<=box.clientHeight; };
  for(const [w,fs,pad,gap,qs] of [[960,28,20,18,120],[1240,28,20,18,120],[1240,26,16,14,96],[1240,24,13,10,84],[1240,22,10,8,76],[1240,20,8,6,68]]){
    btns.forEach(b=>{ b.style.width=w+'px'; b.style.fontSize=fs+'px'; b.style.paddingTop=b.style.paddingBottom=pad+'px'; });
    if(q){ q.style.width=q.style.height=qs+'px'; q.style.fontSize=Math.round(qs*.37)+'px'; }
    box.style.gap=gap+'px'; if(fits()) break; }
}
function choose(opts, o){
  o=o||{};
  return new Promise(res=>{
    const box=$('#choices'); let h=''; const timed=o.timer&&S.qte&&!D.editPlay;
    if(timed) h+=`<div id="qte">${o.timer}</div><div id="qteLbl">${esc(L(o.label||['快選！','Quick!','เลือกเร็ว!']))}</div>`;
    const order=opts.map((_,i)=>i); if(o.shuffle) for(let a=order.length-1;a>0;a--){ const b=Math.floor(Math.random()*(a+1)); [order[a],order[b]]=[order[b],order[a]]; }
    order.forEach((i,pos)=>{ const op=opts[i]; h+=`<button class="cbtn" data-i="${i}" style="animation-delay:${pos*.08}s"><span class="k">${pos+1}</span><span class="ctx">${esc(L(op.t))}</span>${D.editPlay?`<span class="cedit" data-ce="${i}" title="✏️">✏️</span>`:''}</button>`; });
    box.innerHTML=h; box.classList.remove('hidden'); fitChoices(box);
    let done=false, iv=null;
    const fin=i=>{ if(done) return; done=true; clearInterval(iv); D.choiceFinish=null; box.classList.add('hidden'); box.innerHTML='';
      logEvent({type:'choice', id:o.id||'', pick:i, text:i>=0?L(opts[i].t):'(timeout)'}); res(i); };
    box.querySelectorAll('.cbtn').forEach(b=>b.onclick=()=>{ sfx.select(); fin(+b.dataset.i); });
    box.querySelectorAll('.cedit').forEach(c=>c.onclick=e=>{ e.stopPropagation(); const i=+c.dataset.ce; openLineEditor(opts[i].t,()=>{ c.parentElement.querySelector('.ctx').textContent=L(opts[i].t); }); });
    D.choiceFinish=pos=>{ if(pos<order.length){ sfx.select(); fin(order[pos]); } };
    if(timed){ const q=$('#qte'), t0=performance.now(); let last=o.timer;
      iv=setInterval(()=>{ const rem=Math.max(0,o.timer-(performance.now()-t0)/1000); q.textContent=Math.ceil(rem); q.style.setProperty('--p',(rem/o.timer*100)+'%');
        if(rem<=3&&Math.ceil(rem)!==last){ last=Math.ceil(rem); sfx.tick(); } if(rem<=0){ sfx.error(); fin(-1); } },100); }
  });
}
function input(title, hint, ph, o){
  o=o||{};
  return new Promise(res=>{
    const b=$('#inputBox'), ta=$('#inText'); $('#inTitle').textContent=L(title); $('#inHint').textContent=L(hint||''); ta.placeholder=L(ph||UI.freePh); ta.value=''; $('#inSend').textContent=T('send');
    const cw=$('#inChips'); cw.classList.toggle('hidden',!o.chips);
    if(o.chips){ cw.innerHTML=`<span class="cl">${T('chipLbl')}</span>`+o.chips.map((c,i)=>`<button class="ichip" data-c="${i}">${esc(L(c))}</button>`).join('');
      cw.querySelectorAll('[data-c]').forEach(x=>x.onclick=()=>{ const add=L(o.chips[+x.dataset.c]); ta.value=(ta.value.trim()?ta.value.trim()+' ':'')+add; sfx.select(); x.classList.add('used'); ta.focus(); ta.setSelectionRange(ta.value.length,ta.value.length); }); }
    b.classList.remove('hidden'); setTimeout(()=>ta.focus(),80);
    const go=()=>{ const v=ta.value.trim(); if(!v){ sfx.error(); ta.focus(); return; } b.classList.add('hidden'); sfx.select(); D.inputGo=null; res(v); };
    $('#inSend').onclick=go; D.inputGo=go;
  });
}
async function wipe(fn){ const w=$('#wipe'); w.className='close'; sfx.whoosh(); await sleep(460); if(fn) await fn(); w.className='open'; await sleep(560); w.className=''; }
async function chapterCard(n){ D.lastAsk=null; S.chapter=n; hud(); const h=$('#chapterHost'); h.innerHTML=`<div id="chapter"><div class="band"><div class="n">${T('ch'+n)}</div><div class="t">${T('ch'+n+'t')}</div><div class="st">${T('ch'+n+'s')}</div></div></div>`; sfx.whoosh(); await sleep(2650); h.innerHTML=''; }
function flash(){ const f=$('#flash'); f.classList.remove('on'); void f.offsetWidth; f.classList.add('on'); }
function shakeStage(){ const s=$('#stage'); s.classList.remove('shake'); void s.offsetWidth; s.classList.add('shake'); }
async function splash(key, cls, snd){ const sp=$('#splash'); sp.innerHTML=`<div class="burst"></div><div class="s ${cls||''}">${esc(T(key))}</div>`; flash(); shakeStage(); sfx[snd||'objection'](); await sleep(1250); sp.innerHTML=''; }
function floaty(text, x, y, color){ const d=document.createElement('div'); d.className='floaty'; d.textContent=text; d.style.left=x+'px'; d.style.top=y+'px'; d.style.color=color||'#ff4f86'; $('#stage').appendChild(d); setTimeout(()=>d.remove(),1500); }
function stagePop(text, x, y){ const d=document.createElement('div'); d.className='pop'; d.textContent=text; d.style.left=x+'px'; d.style.top=y+'px'; $('#stage').appendChild(d); setTimeout(()=>d.remove(),1400); }
function zoomImg(src){ showModal(`<img src="${src}" style="width:100%;border-radius:12px;box-shadow:0 0 0 2px #eee">`,[{t:T('close')}],null,'wide'); }
function getCard(id, isNew){
  return new Promise(res=>{
    const it=ITEMS[id], imgs=itemImages(id); const g=$('#gcard');
    const gal=imgs.length?`<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin:8px 0">${imgs.map((s,i)=>`<img src="${s}" data-zi="${i}" title="🔍" style="height:${imgs.length>3?96:150}px;border-radius:10px;box-shadow:0 0 0 3px #ffd36b;cursor:zoom-in;background:#fff">`).join('')}</div><div class="hint">🔍 ${L(['點照片放大','Tap a photo to zoom','แตะภาพเพื่อขยาย'])}</div>`:'';
    g.innerHTML=`<div class="get">${isNew?T('get'):'📂'}</div><div class="icon">${itemIcon(id, imgs.length?96:132)}</div><h2>${esc(L(it.n))}</h2><div class="gloc">📍 ${T('foundLoc')}：${esc(L(it.loc))}</div><p>${esc(L(it.d))}</p>${gal}
      <div class="tag">${it.req?T('keyEv'):T('optEv')}</div><div style="margin-top:16px"><button class="gbtn green" id="gOk">${T('ok')}</button></div>`;
    $('#getCard').classList.remove('hidden'); if(isNew) sfx.get();
    g.querySelectorAll('[data-zi]').forEach(im=>im.onclick=()=>zoomImg(imgs[+im.dataset.zi]));
    const ok=()=>{ $('#getCard').classList.add('hidden'); D.getOk=null; sfx.click(); res(); }; $('#gOk').onclick=ok; D.getOk=ok;
  });
}
/* ---------- HUD & meters ---------- */
function hud(){
  $('#hChap').textContent=T('ch'+S.chapter)+'・'+T('ch'+S.chapter+'t');
  const hm=$('#hMode'); if(hm){ hm.textContent=S.practice?'📚 '+T('pracTag'):''; hm.classList.toggle('hidden',!S.practice); }
  $('#hClockV').textContent=S.visit; $('#hClockU').textContent=T('min'); $('#hClock').classList.toggle('warn',S.visit<=10);
  $('#hTrustBar').style.width=(S.trust*10)+'%'; $('#hTrust').title=T('trust')+' '+S.trust+'/10';
  $('#hHearts').innerHTML=Array.from({length:CONFIG.HEARTS},(_,i)=>`<span class="${i<S.hearts?'':'lost'}">❤️</span>`).join('');
  $('#hProgV').textContent=foundCount()+'/'+PROBLEMS.length; $('#hProgBar').style.width=(foundCount()/PROBLEMS.length*100)+'%';
}
function spend(m){
  if(!m) return; const before=S.visit; S.visit-=m; floaty('−'+m+' '+T('min'), 330, 92, '#e0304e');
  if(before>10&&S.visit<=10){ if(AU.theme) playTheme(AU.theme,true); if(!S.fl.warn10&&!S.practice){ S.fl.warn10=1; toast('👵 '+L(['陳太太：「我三點要開店喔，大概只剩十分鐘了！」','Mrs. Chen: "I have to open the shop at three — about ten minutes left!"','ป้าเฉิน: "บ่ายสามป้าต้องเปิดร้านนะ เหลืออีกประมาณสิบนาที!"'])); logEvent({type:'warn10'}); } }
  if(S.visit<=0&&!S.overtime){ S.overtime=true; toast('⏰ '+L(['拜訪時間到了！陳太太要開店，這段結束後就要告辭了。','Visit time is up! Mrs. Chen must open the shop — the visit ends after this part.','หมดเวลาเยี่ยมแล้ว! ป้าเฉินต้องเปิดร้าน จบช่วงนี้แล้วการเยี่ยมจะสิ้นสุด'])); }
  hud(); saveSession();
}
function addTrust(d){
  const b=S.trust; S.trust=Math.max(0,Math.min(10,S.trust+d)); if(S.trust===b) return;
  d>0?sfx.trustUp():sfx.trustDown(); floaty((d>0?'💗 +':'💔 ')+d, 520, 92, d>0?'#ff4f86':'#7a6a9a'); logEvent({type:'trust', d, v:S.trust}); hud();
}
const PROB_PROFILE={P2:['smoke'],P3:['alcohol'],P4:['diet'],P5:['pmh1'],P6:['pmh2'],P7:['pmh3'],P8:['secret'],P9:['joint'],P10:['cc'],P11:['family'],P12:['dob','body','edu'],P13:['renal']};
function reveal(pid){
  if(S.found[pid]) return false; const p=PROBLEMS.find(x=>x.id===pid);
  S.found[pid]={t:Math.round(realSec()), ch:S.chapter}; (PROB_PROFILE[pid]||[]).forEach(k=>S.profile.add(k));
  logEvent({type:'problem', pid}); sfx.problem();
  const d=document.createElement('div'); d.className='pfound'; d.innerHTML=`<div class="i">${p.icon}</div><div><div class="k">✨ ${T('problemFound')} ${foundCount()}/${PROBLEMS.length}</div><div class="tt">${esc(L(p.t))}</div></div>`;
  $('#stage').appendChild(d); setTimeout(()=>d.remove(),3500); hud(); saveSession(true); return true;
}
function addEvidence(id){ if(hasEv(id)) return false; S.evidence.push(id); if(ITEMS[id].labs) S.notes.labsUnlocked=true; logEvent({type:'item', item:id}); return true; }
function chapterDone(n){ S.chT[n]=Math.round(realSec()-S.chStart); S.chStart=realSec(); saveSession(true); }
/* ---------- overlays outside the stage ---------- */
const MQ=[]; let modalOpen=false;
function showModal(html, btns, onClose, cls){ MQ.push({html, btns:btns||[{t:T('ok')}], onClose, cls}); if(!modalOpen) nextModal(); }
function nextModal(){ const m=MQ.shift(); if(!m){ modalOpen=false; $('#modal').classList.add('hidden'); return; } modalOpen=true; const c=$('#mCard'); c.className=m.cls||'';
  c.innerHTML=m.html+`<div class="acts">${m.btns.map((b,i)=>`<button class="sbtn ${b.cls||'p'}" data-mb="${i}">${b.t}</button>`).join('')}</div>`; $('#modal').classList.remove('hidden');
  c.querySelectorAll('[data-mb]').forEach(el=>el.onclick=()=>{ const b=m.btns[+el.dataset.mb]; sfx.click(); if(b.keep&&b.fn){ b.fn(c); return; } m.onClose&&m.onClose(); nextModal(); b.fn&&b.fn(); }); }
function toast(msg){ const d=document.createElement('div'); d.className='toast'; d.textContent=msg; $('#toasts').appendChild(d); setTimeout(()=>d.remove(),3100); }
function showLog(){
  const col={me:'#3d7bff', yeh:'#2fa6a0', wife:'#d6668a', chen:'#b5651d', pilly:'#ff4f86', sys:'#7b61ff'};
  const h=D.hist.slice(-150).map(x=>`<div class="ll" style="text-align:left"><b style="color:${col[x.who]||'#555'}">${esc(x.who==='me'?(S.student.name||T('you')):T(x.who))}</b>：${kpHTML(Array.isArray(x.text)?L(x.text):x.text)}</div>`).join('');
  showModal(`<h3>📜 ${T('dlgLog')}</h3><div id="logBox" style="max-height:58vh;overflow:auto;text-align:left">${h||'—'}</div>`,[{t:T('close')}]);
  setTimeout(()=>{ const b=$('#logBox'); if(b) b.scrollTop=b.scrollHeight; },40);
}
