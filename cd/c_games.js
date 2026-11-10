/* ===== Case C hands-on games: shared panel · Fosamax Wednesday morning · hypo rescue · calcium & height · med-bag board ===== */
const CGX={
  done:['✅ 完成','✅ Done','✅ เสร็จแล้ว'], again:['↺ 再做一次','↺ Try again','↺ ลองอีกครั้ง'], cont:['繼續','Continue','ไปต่อ'],
  perfect:['完美！','Perfect!','สมบูรณ์แบบ!'], fixes:['要修正的地方','What to fix','สิ่งที่ต้องแก้'], steps:['步驟','Steps','ขั้นตอน'],
  examNote:['照你在現場會做的方式完成。','Do it the way you would on a real visit.','ทำให้ครบเหมือนตอนเยี่ยมบ้านจริง'],
  drag:['拖到目標上（或點一下再點目標）','drag onto the target (or tap, then tap the target)','ลากไปวางที่เป้าหมาย (หรือแตะ แล้วแตะเป้าหมาย)'],
};
function cgCss(){ if($('#cgCss')) return; const st=document.createElement('style'); st.id='cgCss'; st.textContent=`
#cgame{position:absolute;left:34px;right:34px;top:94px;bottom:16px;z-index:24;display:flex;flex-direction:column;background:rgba(255,255,255,.98);border-radius:28px;padding:12px 16px;box-shadow:0 0 0 5px #fff,0 0 0 10px #c47a2c,0 16px 40px rgba(0,0,0,.35);animation:enterC .4s cubic-bezier(.2,1.2,.4,1);touch-action:none;-webkit-user-select:none;user-select:none}
#cgame .cg-head{display:flex;gap:14px;align-items:center;background:linear-gradient(90deg,#fff1dc,#fff8ec);border-radius:18px;padding:8px 14px;min-height:58px}
#cgame .cg-head .no{flex:0 0 auto;background:#b4621a;color:#fff;font-weight:900;border-radius:14px;padding:6px 12px;font-size:19px}
#cgame .cg-head .tx{flex:1;font-family:var(--tc);font-weight:900;font-size:23px;line-height:1.3;color:#4a2a0c}
#cgame .cg-head .pf:empty{display:none}
#cgame .cg-head .pf{flex:0 0 auto;font-weight:900;font-size:20px;color:#2d7a3d;background:#e7f8ec;border-radius:12px;padding:4px 12px}
#cgame .cg-body{flex:1;display:flex;gap:12px;min-height:0;margin-top:10px}
#cgame .cg-steps{width:286px;flex:0 0 auto;display:flex;flex-direction:column;gap:6px;overflow:auto}
#cgame .cg-steps h4{margin:2px 4px 4px;font-size:18px;color:#b4621a}
#cgame .st{display:flex;gap:8px;align-items:center;padding:7px 10px;border-radius:12px;background:#f8f5f0;font-weight:800;font-size:17px;line-height:1.25;color:#55524a}
#cgame .st i{font-style:normal;flex:0 0 26px;text-align:center;font-size:20px}
#cgame .st.nx{background:#fff3cf;box-shadow:inset 0 0 0 3px #ffb21f;color:#3b3a12}
#cgame .st.ok{background:#e6f8ee;color:#1f7a4a}
#cgame .st.bad{background:#ffeaee;color:#b4203c}
#cgame .cg-scene{flex:1;position:relative;border-radius:20px;background:linear-gradient(180deg,#fff8ee 0,#fff3e2 58%,#e9d3b3 58%,#dfc29a 100%);overflow:hidden;min-width:0}
#cgame .cg-side{width:250px;flex:0 0 auto;display:flex;flex-direction:column;gap:10px}
#cgame .cg-side>.box{background:#f8f4ee;border-radius:18px;padding:10px;display:flex;flex-direction:column;align-items:center;gap:6px}
#cgame .cg-hint{position:absolute;left:50%;bottom:8px;transform:translateX(-50%);background:rgba(74,42,12,.82);color:#fff;font-weight:800;font-size:17px;border-radius:99px;padding:6px 16px;white-space:nowrap;pointer-events:none;z-index:4}
#cgame .cg-hint:empty{display:none}
#cgame .tile{position:absolute;display:flex;flex-direction:column;align-items:center;gap:2px;width:118px;padding:8px 6px 6px;border-radius:18px;background:#fff;box-shadow:0 0 0 3px #ead9c2,0 6px 14px rgba(0,0,0,.12);font-weight:800;font-size:14.5px;line-height:1.2;text-align:center;color:#3a2a1c;cursor:grab;touch-action:none;transition:box-shadow .15s,transform .15s,opacity .3s}
#cgame .tile svg{width:76px;height:76px;display:block;pointer-events:none}
#cgame #cgGlass svg{width:132px;height:188px}
#cgame .tile.sel{box-shadow:0 0 0 5px #13a39a,0 8px 18px rgba(0,0,0,.18);transform:scale(1.05)}
#cgame .tile.want{animation:cgWant .5s infinite alternate;box-shadow:0 0 0 6px #ff3d5c,0 0 22px #ff3d5c}
#cgame .tile.gone{opacity:.25;pointer-events:none}
#cgame .tile.used{opacity:.4}
#cgame .cg-src{opacity:.45}
.cg-ghost{opacity:.92;filter:drop-shadow(0 12px 18px rgba(0,0,0,.3))}
#cgame [data-drop].cg-over{box-shadow:0 0 0 6px #13a39a,0 0 24px rgba(19,163,154,.6)!important}
#cgame .zone{position:absolute;border-radius:22px;border:4px dashed #c9a77a;background:rgba(255,255,255,.55);display:flex;align-items:flex-start;justify-content:center;font-weight:900;font-size:16px;color:#8a6a40;padding-top:6px;text-align:center}
#cgame .who{position:absolute;border-radius:24px;background:radial-gradient(circle at 50% 40%,#fff,#f6e6d2);box-shadow:0 0 0 4px #ead9c2;overflow:hidden;transition:transform .8s cubic-bezier(.4,1.4,.5,1)}
#cgame .who .art{position:absolute;left:50%;bottom:-6px;width:260px;transform:translateX(-50%)}
#cgame .who .art svg{width:100%;height:auto;display:block}
#cgame .who.tilt{transform:rotate(-58deg) translate(-40px,70px)}
#cgame .who .bed{position:absolute;inset:0;opacity:0;transition:opacity .45s;pointer-events:none}
#cgame .who .bed>svg{width:100%;height:100%;display:block}
#cgame .who.lying .bed{opacity:1}
#cgame .who .art{transition:opacity .3s}
#cgame .who.lying .art{opacity:0}
#cgame .who .bed .zz{animation:cgZz 1.6s ease-in-out infinite}
@keyframes cgZz{0%{transform:translate(0,0);opacity:.2}50%{opacity:1}100%{transform:translate(10px,-16px);opacity:.2}}
#cgame .bub{position:absolute;left:12px;right:12px;top:10px;background:#fff;border-radius:16px;padding:6px 10px;font-weight:800;font-size:16px;line-height:1.3;box-shadow:0 0 0 3px #ffb21f;z-index:2}
#cgame .bub:empty{display:none}
#cgame .cg-sum{position:absolute;inset:0;z-index:6;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.88);border-radius:20px}
#cgame .cg-sum .card{width:min(760px,92%);background:#fff;border-radius:22px;padding:18px 24px;box-shadow:0 0 0 4px #c47a2c,0 12px 30px rgba(0,0,0,.2)}
#cgame .cg-sum h3{margin:0 0 10px;font-family:var(--tc);font-size:28px}
#cgame .cg-sum li{font-size:19px;line-height:1.45;margin:4px 0;font-weight:700}
#cgame .cg-sum .act{display:flex;gap:12px;justify-content:flex-end;margin-top:12px}
#cgame .meter{width:100%;height:26px;border-radius:99px;background:#f0e6da;overflow:hidden;position:relative;box-shadow:inset 0 0 0 3px #e2d2bd}
#cgame .meter b{position:absolute;left:0;top:0;bottom:0;background:linear-gradient(90deg,#ffd166,#18b07f);transition:width .3s}
#cgame .meter i{position:absolute;top:-4px;bottom:-4px;width:4px;background:#b4203c}
@keyframes cgWant{from{transform:translateY(0) rotate(-2deg)}to{transform:translateY(-6px) rotate(2deg)}}`; document.head.appendChild(st); }
/* panel + checklist + summary; o: {title, task, steps:[[k,t,ic]], errs:{k:[zh,en,th]}, err2step:{}, scene, side} */
function cgPanel(o){
  cgCss(); const ex=EXAM();
  let h=$('#cgame'); if(!h){ h=document.createElement('div'); h.id='cgame'; $('#stage').appendChild(h); }
  h.innerHTML=`<div class="cg-head"><span class="no">${esc(L(o.title))}</span><span class="tx" id="cgTx"></span><span class="pf" id="cgPf"></span></div>
    <div class="cg-body">${ex||!o.steps?'':'<div class="cg-steps" id="cgSteps"></div>'}<div class="cg-scene" id="cgScene">${o.scene}<div class="cg-hint" id="cgHint"></div></div>
    <div class="cg-side">${o.side||''}<button class="gbtn green" id="cgDone" style="font-size:20px;padding:12px 10px;margin-top:auto">${esc(L(CGX.done))}</button></div></div>`;
  h.classList.remove('hidden'); typeof audioDuck==='function'&&audioDuck(1);
  const C={ex, errs:new Set(), done:new Set(), finished:false, sel:null, timers:[]};
  C.paint=()=>{ const box=$('#cgSteps'); if(!box||!o.steps) return; const nx=o.steps.find(x=>!C.done.has(x[0])), bad=new Set(); C.errs.forEach(k=>o.err2step&&o.err2step[k]&&bad.add(o.err2step[k]));
    box.innerHTML=`<h4>${esc(L(CGX.steps))}</h4>`+o.steps.map(([k,t,ic])=>`<div class="st ${C.done.has(k)?'ok':bad.has(k)?'bad':nx&&nx[0]===k?'nx':''}"><i>${C.done.has(k)?'✔️':bad.has(k)?'❗':ic}</i><span>${esc(L(t))}</span></div>`).join(''); };
  C.text=()=>{ const nx=o.steps&&o.steps.find(x=>!C.done.has(x[0])); $('#cgTx').textContent=ex?L(o.task)+' '+L(CGX.examNote):(nx?nx[2]+' '+L(nx[1]):L(o.task)); };
  C.hint=t=>{ $('#cgHint').textContent=t||''; };
  C.err=k=>{ if(!C.errs.has(k)){ C.errs.add(k); if(!ex) toast('⚠️ '+L(o.errs[k])); } sfx.error(); C.paint(); };
  C.mark=k=>{ if(!C.done.has(k)){ C.done.add(k); if(!ex) sfx.select(); C.paint(); C.text(); } };
  C.later=(fn,ms)=>{ const t=setTimeout(()=>{ if(!C.finished) fn(); },ms); C.timers.push(t); return t; };
  C.result=new Promise(res=>{ C._res=res; });
  C.finish=(extra)=>{ if(C.finished) return; C.finished=true; C.timers.forEach(clearTimeout); if(C.raf) cancelAnimationFrame(C.raf);
    const errs=[...C.errs], ok=!errs.length; const out=Object.assign({ok, errs}, extra||{}, C.extraOut?C.extraOut():{});
    if(ex){ sfx.select(); setTimeout(()=>{ typeof audioDuck==='function'&&audioDuck(0); h.classList.add('hidden'); h.innerHTML=''; C._res(out); },500); return; }
    if(ok) sfx.get(); else sfx.error();
    const sum=document.createElement('div'); sum.className='cg-sum';
    sum.innerHTML=`<div class="card"><h3>${ok?'🎉 '+esc(L(CGX.perfect)):'🔧 '+esc(L(CGX.fixes))}</h3>${ok?'':`<ul>${errs.map(k=>`<li>${esc(L(o.errs[k]))}</li>`).join('')}</ul>`}${o.sumExtra?o.sumExtra(out):''}${C.note?C.note(out):''}
      <div class="act"><button class="gbtn green" id="cgCont">${esc(L(CGX.cont))}</button></div></div>`;
    $('#cgScene').appendChild(sum);
    $('#cgCont').onclick=()=>{ sfx.click(); typeof audioDuck==='function'&&audioDuck(0); h.classList.add('hidden'); h.innerHTML=''; C._res(out); }; };
  $('#cgDone').onclick=()=>{ if(C.finished) return; sfx.click(); o.onDone?o.onDone():C.finish(); };
  /* drag (or tap-then-tap) any [data-item] onto any [data-drop]; o.drop(item, zone) decides */
  C.drag=(el, opt)=>{ opt=opt||{};
    el.addEventListener('pointerdown',e=>{ if(C.finished||(opt.can&&!opt.can())) return; e.preventDefault();
      const st=$('#stage').getBoundingClientRect(), k=st.width/1600, r=el.getBoundingClientRect();
      const g=el.cloneNode(true); g.classList.add('cg-ghost'); g.classList.remove('sel','want');
      g.style.cssText+=`;position:absolute;left:${(r.left-st.left)/k}px;top:${(r.top-st.top)/k}px;width:${r.width/k}px;margin:0;pointer-events:none;z-index:80;transition:none`;
      $('#stage').appendChild(g); el.classList.add('cg-src'); try{ el.setPointerCapture(e.pointerId); }catch(_){}
      const x0=e.clientX, y0=e.clientY; let moved=0, over=null;
      const mv=ev=>{ const dx=(ev.clientX-x0)/k, dy=(ev.clientY-y0)/k; moved=Math.max(moved,Math.hypot(dx,dy)); g.style.transform=`translate(${dx}px,${dy}px)`;
        const t=document.elementsFromPoint(ev.clientX,ev.clientY).find(n=>n!==el&&n.dataset&&n.dataset.drop&&$('#cgame').contains(n));
        if(t!==over){ over&&over.classList.remove('cg-over'); over=t; over&&over.classList.add('cg-over'); } opt.move&&opt.move(over); };
      const up=()=>{ el.removeEventListener('pointermove',mv); el.removeEventListener('pointerup',up); el.removeEventListener('pointercancel',up);
        g.remove(); el.classList.remove('cg-src'); over&&over.classList.remove('cg-over'); opt.move&&opt.move(null);
        if(C.finished) return;
        if(moved<8){ if(opt.tap&&opt.tap()) return; C.select(el); return; }
        if(over) o.drop(el, over); };
      el.addEventListener('pointermove',mv); el.addEventListener('pointerup',up); el.addEventListener('pointercancel',up); }); };
  C.select=el=>{ if(C.sel) C.sel.classList.remove('sel'); C.sel=C.sel===el?null:el; if(C.sel){ C.sel.classList.add('sel'); sfx.select(); } };
  C.zone=z=>z.addEventListener('click',()=>{ if(C.finished||!C.sel||z===C.sel) return; const it=C.sel; C.sel.classList.remove('sel'); C.sel=null; o.drop(it, z); });
  return C;
}
const CG_O='#3a2e22';
const CG_ICON={
  water:`<svg viewBox="0 0 80 80"><path d="M30 8 h20 v10 q12 6 12 20 v34 q0 4 -4 4 h-36 q-4 0 -4 -4 v-34 q0 -14 12 -20Z" fill="#d9f0ff" stroke="${CG_O}" stroke-width="3.5"/><rect x="28" y="4" width="24" height="9" rx="3" fill="#3d7bff" stroke="${CG_O}" stroke-width="3"/><path d="M22 44 h36 v28 h-36Z" fill="#9fd6ff" opacity=".7"/></svg>`,
  coffee:`<svg viewBox="0 0 80 80"><path d="M16 26 h40 v30 q0 14 -14 14 h-12 q-14 0 -14 -14Z" fill="#fff" stroke="${CG_O}" stroke-width="3.5"/><path d="M56 32 q14 0 14 10 q0 10 -14 10" fill="none" stroke="${CG_O}" stroke-width="3.5"/><ellipse cx="36" cy="28" rx="18" ry="4" fill="#6b3e1e"/><path d="M28 8 q6 6 0 12 M40 6 q6 6 0 12" stroke="#b9a08a" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`,
  milk:`<svg viewBox="0 0 80 80"><path d="M22 22 l8 -14 h20 l8 14 v50 h-36Z" fill="#fff" stroke="${CG_O}" stroke-width="3.5" stroke-linejoin="round"/><path d="M22 22 h36" stroke="${CG_O}" stroke-width="3"/><rect x="26" y="36" width="28" height="22" rx="4" fill="#4fa3ff"/><text x="40" y="52" text-anchor="middle" font-size="11" font-weight="900" fill="#fff" font-family="sans-serif">MILK</text></svg>`,
  juice:`<svg viewBox="0 0 80 80"><rect x="20" y="16" width="40" height="56" rx="5" fill="#ffb21f" stroke="${CG_O}" stroke-width="3.5"/><path d="M48 16 l6 -10" stroke="${CG_O}" stroke-width="4" stroke-linecap="round"/><circle cx="40" cy="44" r="12" fill="#ff7a00" stroke="${CG_O}" stroke-width="2.5"/><path d="M40 32 v24 M28 44 h24" stroke="#ffd08a" stroke-width="2"/></svg>`,
  fosa:`<svg viewBox="0 0 80 80"><rect x="8" y="18" width="64" height="44" rx="8" fill="#e8edf3" stroke="${CG_O}" stroke-width="3.5"/><ellipse cx="40" cy="40" rx="20" ry="13" fill="#fff" stroke="${CG_O}" stroke-width="3"/><text x="40" y="44" text-anchor="middle" font-size="9" font-weight="900" fill="#7a6a5a" font-family="sans-serif">70 mg</text><text x="40" y="74" text-anchor="middle" font-size="10" font-weight="900" fill="#18b07f" font-family="sans-serif">WED</text></svg>`,
  food:`<svg viewBox="0 0 80 80"><ellipse cx="40" cy="62" rx="32" ry="8" fill="#fff" stroke="${CG_O}" stroke-width="3"/><path d="M14 56 q2 -26 26 -28 q24 2 26 28Z" fill="#fff6e6" stroke="${CG_O}" stroke-width="3.5"/><path d="M30 34 q10 -8 20 0" stroke="#e9d3b3" stroke-width="3" fill="none"/><rect x="56" y="18" width="18" height="30" rx="3" fill="#fff9e8" stroke="${CG_O}" stroke-width="3"/></svg>`,
  pills:`<svg viewBox="0 0 80 80"><rect x="12" y="14" width="56" height="52" rx="8" fill="#fff" stroke="${CG_O}" stroke-width="3.5"/><circle cx="30" cy="34" r="7" fill="#ff8aa8" stroke="${CG_O}" stroke-width="2.5"/><rect x="42" y="27" width="16" height="14" rx="7" fill="#7fb1e3" stroke="${CG_O}" stroke-width="2.5"/><circle cx="34" cy="52" r="6" fill="#ffd166" stroke="${CG_O}" stroke-width="2.5"/><text x="52" y="58" text-anchor="middle" font-size="9" font-weight="900" fill="#7a6a5a" font-family="sans-serif">AM</text></svg>`,
  meter:`<svg viewBox="0 0 80 80"><rect x="18" y="8" width="44" height="64" rx="12" fill="#5b6b7d" stroke="${CG_O}" stroke-width="3.5"/><rect x="25" y="16" width="30" height="22" rx="4" fill="#d9f5e6" stroke="${CG_O}" stroke-width="2.5"/><text x="40" y="32" text-anchor="middle" font-size="12" font-weight="900" fill="#1f5a3a" font-family="sans-serif">mg/dL</text><circle cx="40" cy="52" r="7" fill="#9fb0c2" stroke="${CG_O}" stroke-width="2.5"/><rect x="36" y="70" width="8" height="10" fill="#fff" stroke="${CG_O}" stroke-width="2"/></svg>`,
  gluc:`<svg viewBox="0 0 80 80"><rect x="18" y="16" width="44" height="58" rx="10" fill="#fff" stroke="${CG_O}" stroke-width="3.5"/><rect x="16" y="6" width="48" height="14" rx="5" fill="#ff6b81" stroke="${CG_O}" stroke-width="3"/><rect x="24" y="30" width="32" height="20" rx="4" fill="#ffe6ea"/><text x="40" y="44" text-anchor="middle" font-size="10" font-weight="900" fill="#c0172f" font-family="sans-serif">GLUCOSE</text><text x="40" y="66" text-anchor="middle" font-size="10" font-weight="900" fill="#7a6a5a" font-family="sans-serif">4 g / tab</text></svg>`,
  candy:`<svg viewBox="0 0 80 80"><path d="M14 32 l-8 -10 v36 l8 -10 M66 32 l8 -10 v36 l-8 -10" fill="#ff8aa8" stroke="${CG_O}" stroke-width="3"/><ellipse cx="40" cy="40" rx="27" ry="18" fill="#ff5d8f" stroke="${CG_O}" stroke-width="3.5"/><path d="M26 34 q14 -10 28 0" stroke="#ffd0dd" stroke-width="4" fill="none" stroke-linecap="round"/></svg>`,
  bread:`<svg viewBox="0 0 80 80"><path d="M12 36 q0 -20 28 -20 q28 0 28 20 q0 6 -6 8 v22 q0 4 -4 4 h-36 q-4 0 -4 -4 v-22 q-6 -2 -6 -8Z" fill="#f2c27a" stroke="${CG_O}" stroke-width="3.5"/><path d="M24 30 q16 -8 32 0" stroke="#ffe2ad" stroke-width="4" fill="none" stroke-linecap="round"/></svg>`,
};
/* the empty glass with a fill level; kind: water | bad */
function cgGlassSVG(ml,kind){ const h=Math.min(1,ml/300)*150, col=kind==='bad'?'#b97a46':'#9fd6ff';
  return `<svg viewBox="0 0 140 200"><path d="M22 18 h96 l-10 170 q-1 6 -7 6 h-62 q-6 0 -7 -6Z" fill="rgba(235,247,255,.6)" stroke="${CG_O}" stroke-width="4"/>
    <clipPath id="cgGl"><path d="M22 18 h96 l-10 170 q-1 6 -7 6 h-62 q-6 0 -7 -6Z"/></clipPath>
    <rect x="0" y="${194-h}" width="140" height="${h}" fill="${col}" clip-path="url(#cgGl)"/>
    ${[100,200,300].map(v=>`<path d="M104 ${194-v/2} h12" stroke="${CG_O}" stroke-width="3"/><text x="98" y="${199-v/2}" text-anchor="end" font-size="13" font-weight="900" fill="#5a4a3a" font-family="sans-serif">${v}</text>`).join('')}
    <rect x="26" y="${194-240/2}" width="78" height="${(240-180)/2}" fill="#18b07f" opacity=".14"/></svg>`; }
function cgClockSVG(min, from, to){ const a=min/60*360, ha=(6+min/60)*30;   // min = minutes after 6:00; from..min shaded (time since the dose), to = target tick
  const pt=m=>{ const r=m/60*2*Math.PI; return (60+48*Math.sin(r)).toFixed(1)+' '+(60-48*Math.cos(r)).toFixed(1); };
  const wedge=from!=null&&min>from?`<path d="M60 60 L${pt(from)} A48 48 0 ${min-from>30?1:0} 1 ${pt(min)} Z" fill="#18b07f" opacity=".28"/><path d="M60 60 L${pt(from)}" stroke="#18b07f" stroke-width="3"/>`:'';
  const goal=to!=null?`<path d="M60 60 L${pt(to)}" stroke="#ff9d1f" stroke-width="3" stroke-dasharray="5 4"/><circle cx="${pt(to).split(' ')[0]}" cy="${pt(to).split(' ')[1]}" r="6" fill="#ff9d1f" stroke="${CG_O}" stroke-width="2"/>`:'';
  return `<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="54" fill="#fff" stroke="${CG_O}" stroke-width="5"/>${wedge}${goal}${[...Array(12)].map((_,i)=>`<path d="M60 12 v8" stroke="${CG_O}" stroke-width="3" transform="rotate(${i*30} 60 60)"/>`).join('')}
    <path d="M60 60 V34" stroke="${CG_O}" stroke-width="6" stroke-linecap="round" transform="rotate(${ha} 60 60)"/><path d="M60 60 V18" stroke="#c0172f" stroke-width="4" stroke-linecap="round" transform="rotate(${a} 60 60)"/><circle cx="60" cy="60" r="5" fill="${CG_O}"/></svg>`; }
function cgTile(k, name, x, y, extra){ return `<div class="tile" data-item="${k}" style="left:${x}px;top:${y}px" ${extra||''}>${CG_ICON[k]||''}<span>${esc(L(name))}</span></div>`; }

/* Mrs. Wang lying in bed (seen from above): her portrait turned on its side, head on the pillow, under a blanket */
function cgBedSVG(who, emo){ const art=charSVG(who, emo||'happy').replace('<svg ','<svg x="0" y="0" width="220" height="308" ');
  return `<svg viewBox="0 0 290 430" preserveAspectRatio="xMidYMid slice"><rect width="290" height="430" fill="#efe6f6"/><rect y="380" width="290" height="50" fill="#d9c3a5"/>
    <rect x="6" y="132" width="24" height="262" rx="10" fill="#a8703f" stroke="${CG_O}" stroke-width="4"/>
    <rect x="22" y="142" width="262" height="240" rx="22" fill="#fffdf8" stroke="${CG_O}" stroke-width="4"/>
    <rect x="30" y="180" width="128" height="166" rx="40" fill="#eef1ff" stroke="${CG_O}" stroke-width="3.5"/>
    <g transform="translate(-9 372) rotate(-90)">${art}</g>
    <path d="M182 150 h92 q10 0 10 12 v208 q0 10 -10 10 h-92 q-12 -56 -4 -116 q-6 -60 4 -114Z" fill="#ffb3c4" stroke="${CG_O}" stroke-width="4"/>
    <path d="M182 150 q-10 54 -4 114 q-8 60 4 116 l16 0 q-12 -56 -4 -116 q-6 -58 4 -114Z" fill="#fff" stroke="${CG_O}" stroke-width="3"/>
    ${[0,1,2].map(i=>`<path d="M${216+i*26} 162 v206" stroke="#ff8fa8" stroke-width="5" opacity=".7"/>`).join('')}
    <g class="zz" font-family="sans-serif" font-weight="900" fill="#7b61ff"><text x="150" y="132" font-size="32">Z</text><text x="176" y="108" font-size="24">z</text><text x="196" y="88" font-size="17">z</text></g></svg>`; }
/* ---------- medicine games: the student decides every step. Practice mode adds a "💡 Hint" button that shows the current step,
   makes its target glow and points a hand at it (hints are counted). Exam mode has no hints. ---------- */
function cgFlowCss(){ if($('#cgFlowCss')) return; const st=document.createElement('style'); st.id='cgFlowCss'; st.textContent=`
#cgame .cg-head .sn{flex:0 0 auto;font-weight:900;font-size:16px;color:#b4621a;background:#fff;border-radius:99px;padding:4px 12px;box-shadow:inset 0 0 0 2px #f0d2a8}
#cgame .cg-head .sn:empty{display:none}
#cgame.flow .cg-head .tx{font-size:25px}
#cgame.flow .cg-head .tx.how{font-size:20px;color:#6a4a2a}
#cgame.flow .tile{cursor:pointer}
#cgame .cg-glow{animation:cgGlow 1s ease-in-out infinite!important;z-index:3}
#cgame .cg-hand{position:absolute;z-index:9;font-size:56px;pointer-events:none;filter:drop-shadow(0 4px 4px rgba(0,0,0,.3));animation:cgHand .8s ease-in-out infinite;transition:left .35s,top .35s}
#cgame .cg-hand.hidden{display:none}
#cgame .cg-hb{font-size:20px;padding:10px 8px}
#cgame .cg-hb.nudge{animation:cgNudge .6s ease-in-out infinite alternate}
#cgame .cg-hb:disabled{opacity:.35}
#cgame .cg-ask{position:absolute;z-index:8;display:flex;flex-direction:column;gap:14px;width:210px;animation:cgPop .25s ease-out}
#cgame .cg-ask.hidden{display:none}
#cgame .cg-ask button{border-radius:24px;padding:14px 10px;font-weight:900;font-size:28px;line-height:1.15;color:#fff}
#cgame .cg-ask .no-b{background:linear-gradient(180deg,#ff7a8e,#e0213f);box-shadow:0 0 0 5px #fff,0 6px 0 #a3142c,0 10px 24px rgba(224,33,63,.4)}
#cgame .cg-ask .ok-b{background:linear-gradient(180deg,#5fe0a8,#18b07f);box-shadow:0 0 0 5px #fff,0 6px 0 #0d7a55,0 10px 24px rgba(24,176,127,.35)}
#cgame .cg-ask .tm{height:10px;border-radius:99px;background:#f0e6da;overflow:hidden;box-shadow:0 0 0 3px #fff}
#cgame .cg-ask .tm b{display:block;height:100%;width:100%;background:#ffb21f}
#cgame .cg-hn{margin:10px 0 0;font-weight:800;font-size:18px;color:#8a6a1a}
#cgame .cg-read{position:absolute;background:#fff;border-radius:20px;padding:10px 14px;text-align:center;box-shadow:0 0 0 4px #ead9c2}
#cgame .cg-read b{display:block;font-size:46px;line-height:1.1}
@keyframes cgGlow{0%,100%{box-shadow:0 0 0 3px #ead9c2,0 0 0 0 rgba(255,196,0,.9)}50%{box-shadow:0 0 0 3px #ffc400,0 0 0 10px rgba(255,196,0,.75)}}
@keyframes cgHand{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
@keyframes cgNudge{from{transform:scale(1);filter:drop-shadow(0 0 0 rgba(255,196,0,0))}to{transform:scale(1.07);filter:drop-shadow(0 0 10px #ffc400)}}
@keyframes cgPop{from{transform:scale(.6);opacity:0}to{transform:scale(1);opacity:1}}`; document.head.appendChild(st); }
/* add to a cgPanel: FL = [[key, hint text, icon, selector or (()=>selector), done label]]; how = the opening line (how to play) */
function cgFlow(C, FL, how){ cgFlowCss(); const h=$('#cgame'); h.classList.add('flow');
  $('#cgame .cg-head .no').insertAdjacentHTML('afterend','<span class="sn" id="cgSn"></span>'); h.insertAdjacentHTML('beforeend','<div class="cg-hand hidden" id="cgHand">👆</div>');
  if(!C.ex) $('#cgDone').insertAdjacentHTML('beforebegin',`<button class="gbtn gold cg-hb" id="cgHintBtn">${esc(L(FLOWG.hint))}</button>`);
  const hinted=new Set(); let hintOn=null, last=null, miss=0, idleT=0;
  const cur=()=>FL.find(x=>!C.done.has(x[0])), tx=(t,cls)=>{ const e=$('#cgTx'); e.textContent=t; e.classList.toggle('how',!!cls); };
  const nudge=on=>{ const b=$('#cgHintBtn'); if(b) b.classList.toggle('nudge',!!on); };
  const idle=()=>{ clearTimeout(idleT); if(!C.ex) idleT=C.later(()=>nudge(1),15000); };
  C.status=null;
  C.guide=()=>{ h.querySelectorAll('.cg-glow').forEach(e=>e.classList.remove('cg-glow')); const nx=cur(), hand=$('#cgHand'); hand.classList.add('hidden');
    if(C.ex){ $('#cgSn').textContent=''; return; }
    if(!nx){ $('#cgSn').textContent=''; tx(''); const b=$('#cgHintBtn'); if(b){ b.disabled=true; nudge(0); } return; }
    $('#cgSn').textContent=L(FLOWG.step).replace('{i}',FL.indexOf(nx)+1).replace('{n}',FL.length);
    if(hintOn!==nx[0]){ if(C.status) tx(L(C.status)); else if(last&&L(last[4])) tx('✓ '+L(last[4])+' — '+L(FLOWG.next)); else tx(L(how),1); return; }
    tx('💡 '+nx[2]+' '+L(nx[1]));
    const sel=typeof nx[3]==='function'?nx[3]():nx[3], els=sel?[...h.querySelectorAll(sel)].filter(e=>!e.classList.contains('gone')&&!e.classList.contains('hidden')):[];
    els.forEach(e=>e.classList.add('cg-glow')); const el=els[0]; if(!el) return;
    requestAnimationFrame(()=>{ const r=el.getBoundingClientRect(), hr=h.getBoundingClientRect(), k=hr.width/h.offsetWidth; if(!r.width) return; hand.classList.remove('hidden');
      hand.style.left=((r.left-hr.left)/k+r.width/k/2-26)+'px'; hand.style.top=((r.bottom-hr.top)/k-4)+'px'; }); };
  C.showHint=()=>{ const nx=cur(); if(!nx||C.finished) return; sfx.click(); hinted.add(nx[0]); hintOn=nx[0]; nudge(0); C.guide(); };
  const mk=C.mark; C.mark=k=>{ const was=C.done.has(k); mk(k); if(!was){ const f=FL.find(x=>x[0]===k); if(f) last=f; miss=0; nudge(0); idle(); } C.guide(); };
  C.unmark=(...ks)=>{ ks.forEach(k=>C.done.delete(k)); C.guide(); };
  const er=C.err; C.err=k=>{ er(k); if(++miss>=2) nudge(1); };
  C.extraOut=()=>({hints:hinted.size});
  C.note=out=>out.hints?`<p class="cg-hn">💡 ${esc(L(FLOWG.hintsUsed))}: ${out.hints}</p>`:'';
  if(!C.ex) $('#cgHintBtn').onclick=C.showHint;
  C.guide(); idle(); }
const FLOWG={ min:['分鐘','min','นาที'], step:['第 {i}/{n} 步','Step {i}/{n}','ขั้นที่ {i}/{n}'], hint:['💡 提示','💡 Hint','💡 คำใบ้'], next:['下一步呢？','what next?','ต่อไปทำอะไร?'],
  hintsUsed:['用了提示','Hints used','ใช้คำใบ้'],
  how:['先想一想再動手：點桌上的東西或按鈕來處理。卡住了就按「💡 提示」。','Think first, then act: tap the things on the table or the buttons. Stuck? Tap "💡 Hint".','คิดก่อนแล้วค่อยลงมือ: แตะของบนโต๊ะหรือปุ่ม ถ้าติดอยู่ แตะ "💡 คำใบ้"'],
  stop:['✋ 等一下！','✋ Wait!','✋ เดี๋ยวก่อน!'], ok:['👍 可以','👍 OK','👍 ได้'], wait15:['⏩ 等 15 分鐘','⏩ Wait 15 min','⏩ รอ 15 นาที'],
  waiting:['⏳ 時間在走……她想做什麼，由你決定','⏳ Time is passing… whatever she wants to do, you decide','⏳ เวลาผ่านไป… ป้าอยากทำอะไร คุณเป็นคนตัดสิน'],
  treatFirst:['她還在低血糖，等之前要先處理','She\'s still low — treat her before you wait','ป้ายังน้ำตาลต่ำอยู่ ต้องแก้ก่อนรอ'], recheckFirst:['先重測血糖','Recheck first','วัดซ้ำก่อน'] };

/* ---------- 1) Fosamax Plus, Wednesday morning (tap only) ---------- */
const FOSA_ERR={
  wrongDrink:['不能配咖啡、牛奶或果汁：藥幾乎吸收不到','Not with coffee, milk or juice — the drug is barely absorbed','ห้ามกินกับกาแฟ นม หรือน้ำผลไม้ ยาแทบไม่ถูกดูดซึม'],
  dry:['沒有水就吞：一定要配一大杯白開水，藥才不會卡在食道','Swallowed without water — a full glass of plain water keeps it from sticking in the oesophagus','กลืนโดยไม่มีน้ำ ต้องกินกับน้ำเปล่าเต็มแก้ว ยาจะได้ไม่ติดหลอดอาหาร'],
  notEmpty:['要空腹：吃藥前不能先吃早餐或其他藥','Empty stomach: no food or other pills before it','ต้องท้องว่าง ห้ามกินอาหารหรือยาอื่นก่อน'],
  lieDown:['吃完又躺下：藥會逆流傷食道，30 分鐘內要保持直立','She lay down — it can reflux and burn the oesophagus; stay upright for 30 min','ป้านอนลง ยาย้อนขึ้นมาทำร้ายหลอดอาหาร ต้องตัวตรง 30 นาที'],
  early:['30 分鐘還沒到就吃喝東西：藥吸收不好','She ate or drank before the 30 minutes were up — poor absorption','ป้ากินหรือดื่มก่อนครบ 30 นาที ยาดูดซึมได้ไม่ดี'],
  earlyPills:['30 分鐘內吃了其他藥：鈣片、制酸劑會擋住吸收','Other pills within 30 minutes — calcium or antacids block absorption','กินยาอื่นภายใน 30 นาที แคลเซียมหรือยาลดกรดขัดขวางการดูดซึม'],
  noAfter:['30 分鐘後別忘了吃早餐和其他藥（她有吃降血糖藥！）','After 30 minutes: breakfast and her other pills (she\'s on diabetes pills!)','ครบ 30 นาทีแล้วต้องกินมื้อเช้าและยาอื่น (ป้ากินยาเบาหวานอยู่!)'],
  noDose:['還沒有把藥吃下去','The tablet was never taken','ยังไม่ได้กินยา'],
  tooStrict:['管太多了：白開水可以喝，坐著、站著、走動都可以——只是不能躺、不能吃東西或喝別的、不能吃其他藥','Too strict — plain water, sitting, standing and walking are all fine; just no lying down, no food or other drinks, no other pills','เข้มงวดเกินไป น้ำเปล่า นั่ง ยืน เดิน ได้หมด แค่ห้ามนอน ห้ามกินอาหารหรือดื่มอย่างอื่น ห้ามกินยาอื่น'],
};
function fosaGame(){
  const FL=[['pour',['倒一大杯白開水（約 200 mL）：點「白開水」','Pour a full glass (≈200 mL) of plain water: tap the water','รินน้ำเปล่าเต็มแก้ว (ราว 200 มล.): แตะ "น้ำเปล่า"'],'💧','.tile[data-item="water"]',['倒好一大杯白開水','A full glass of plain water','รินน้ำเปล่าเต็มแก้วแล้ว']],
    ['swallow',['點藥錠：讓她配這杯水吞下去','Tap the tablet: she swallows it with that water','แตะเม็ดยา: ให้ป้ากลืนพร้อมน้ำแก้วนั้น'],'💊','.tile[data-item="fosa"]',['Fosamax 吞下去了','Fosamax swallowed','กลืน Fosamax แล้ว']],
    ['wait',['接下來 30 分鐘：坐、站、走動都可以，白開水也可以喝；不能躺、不能吃東西或喝別的、不能吃其他藥。她問的時候，按「✋ 等一下！」或「👍 可以」','Next 30 min: sitting, standing, walking and plain water are fine; no lying down, no food or other drinks, no other pills. When she asks, tap "✋ Wait!" or "👍 OK"','30 นาทีจากนี้: นั่ง ยืน เดิน และดื่มน้ำเปล่าได้ ห้ามนอน ห้ามกินอาหารหรือดื่มอย่างอื่น ห้ามกินยาอื่น เวลาป้าถาม แตะ "✋ เดี๋ยวก่อน!" หรือ "👍 ได้"'],'⏳','#cgAsk:not(.hidden) button',['7 點了','It\'s 7:00','เจ็ดโมงแล้ว']],
    ['after',['7 點了，滿 30 分鐘！她問能不能吃早餐和其他藥：按「👍 可以」（或點桌上的早餐和藥）','7:00 — 30 minutes are up! She asks for breakfast and her other pills: tap "👍 OK" (or tap them on the table)','เจ็ดโมงแล้ว ครบ 30 นาที! ป้าถามว่ากินข้าวเช้าและยาอื่นได้ไหม: แตะ "👍 ได้" (หรือแตะมื้อเช้าและยาบนโต๊ะ)'],'🥟',()=>G.askA?'#cgAsk:not(.hidden) .ok-b':'.tile[data-item="food"]:not(.gone),.tile[data-item="pills"]:not(.gone)',['','','']]];
  const scene=`<div style="position:absolute;left:20px;top:16px;width:120px" id="cgClock">${cgClockSVG(30)}</div><div style="position:absolute;left:150px;top:36px;font-weight:900;font-size:22px;color:#b4621a;line-height:1.3">🗓️ ${esc(L(['週三早上','Wednesday','เช้าวันพุธ']))}<br><span id="cgTime" style="font-size:34px;color:#3a2a1c">6:30</span></div>
    <div class="tile" data-item="glass" style="left:400px;top:16px;width:176px;cursor:default"><div id="cgGlass">${cgGlassSVG(0,'water')}</div><span id="cgMl" style="font-size:18px">0 mL</span></div>
    <div class="who" id="cgWho" style="right:16px;top:16px;width:290px;height:430px"><div class="bed" id="cgBed"></div><div class="bub" id="cgBub"></div><div class="art">${charSVG('chen','neutral')}</div></div>
    <div class="cg-read" id="cgDose" style="left:20px;top:168px;width:360px;text-align:left;display:none;font-weight:900;font-size:21px;line-height:1.55;color:#3a2a1c"></div>
    <div class="cg-ask hidden" id="cgAsk"><button class="no-b" id="cgStop">${esc(L(FLOWG.stop))}</button><button class="ok-b" id="cgOk">${esc(L(FLOWG.ok))}</button><div class="tm"><b id="cgAskT"></b></div></div>
    ${cgTile('water',['白開水','Plain water','น้ำเปล่า'],16,476)}${cgTile('coffee',['咖啡','Coffee','กาแฟ'],146,476)}${cgTile('milk',['牛奶','Milk','นม'],276,476)}${cgTile('juice',['柳橙汁','Orange juice','น้ำส้ม'],406,476)}
    ${cgTile('fosa',['Fosamax Plus 70 mg','Fosamax Plus 70 mg','Fosamax Plus 70 มก.'],536,476)}${cgTile('food',['早餐','Breakfast','มื้อเช้า'],666,476)}${cgTile('pills',['早上的其他藥','Other AM pills','ยาเช้าอื่นๆ'],796,476)}`;
  const fd=DRUGS.find(d=>d.id==='fosamax'), side=`<div class="box" style="align-items:stretch;text-align:left"><div style="font-weight:900;color:#18b07f;font-size:15px">🏷️ ${esc(L(['藥袋標示','Bag label','ฉลากซองยา']))}</div><b style="font-size:17px;line-height:1.25">${esc(fd.n)}</b><span style="font-size:14px;color:#6a6585">${esc(fd.g)}</span><span style="font-weight:800;font-size:16px;line-height:1.35">${esc(L(fd.sig))}</span></div>`;
  const C=cgPanel({title:['💊 實作：週三早上的骨鬆藥','💊 Hands-on: Wednesday\'s bone pill','💊 ลงมือ: ยากระดูกเช้าวันพุธ'], task:['陪王太太完成這週的 Fosamax：從起床到吃早餐。','Walk Mrs. Wang through this week\'s Fosamax — from waking up to breakfast.','พาป้าหวังกิน Fosamax ของสัปดาห์นี้ ตั้งแต่ตื่นนอนจนถึงมื้อเช้า'],
    errs:FOSA_ERR, scene, side, drop:()=>{}, onDone:()=>done()});
  cgFlow(C, FL, ['週三早上 6:30，她剛起床。陪她把這週的 Fosamax 吃對：點桌上的東西來用。卡住了就按「💡 提示」。','Wednesday, 6:30 — she\'s just up. Help her take this week\'s Fosamax the right way: tap things on the table to use them. Stuck? Tap "💡 Hint".','เช้าวันพุธ 6:30 ป้าเพิ่งตื่น พาป้ากิน Fosamax ของสัปดาห์นี้ให้ถูกวิธี: แตะของบนโต๊ะเพื่อใช้ ถ้าติดอยู่ แตะ "💡 คำใบ้"']);
  if(C.ex) $('#cgTx').textContent=L(['陪王太太完成這週的 Fosamax，從起床到吃早餐。','Walk Mrs. Wang through this week\'s Fosamax, from waking up to breakfast.','พาป้าหวังกิน Fosamax ของสัปดาห์นี้ ตั้งแต่ตื่นนอนจนถึงมื้อเช้า'])+' '+L(CGX.examNote);
  const G={ml:0, kind:'water', swallowed:false, wait:false, after:false, min:30, doseAt:null, want:null, wantT:0, gone:new Set(), pouring:false};
  const hm=m=>m>=60?'7:00':'6:'+String(m).padStart(2,'0');
  /* when she took it and how long ago (practice also shows when breakfast is allowed) */
  const doseCard=()=>{ const d=$('#cgDose'); if(G.doseAt==null){ d.style.display='none'; return; } d.style.display='';
    d.innerHTML=`${esc(L(['💊 吃藥時間','💊 Tablet taken at','💊 กินยาเมื่อ']))} <b style="display:inline;font-size:26px;color:#18b07f">${hm(G.doseAt)}</b><br>${esc(L(['⏱️ 已經過了','⏱️ Time since','⏱️ ผ่านไปแล้ว']))} <b style="display:inline;font-size:26px;color:#3d7bff">${G.min-G.doseAt}</b> ${esc(L(FLOWG.min))}`
      +(C.ex?'':`<br>${esc(L(['🍽️ 可以吃早餐和其他藥','🍽️ Breakfast & other pills from','🍽️ กินข้าวและยาอื่นได้ตอน']))} <b style="display:inline;font-size:26px;color:#ff9d1f">${hm(Math.min(60,G.doseAt+30))}</b>`);
    $('#cgClock').innerHTML=cgClockSVG(G.min, G.doseAt, C.ex?null:Math.min(60,G.doseAt+30)); };
  const bub=(t,ms)=>{ $('#cgBub').textContent=t; if(ms) C.later(()=>{ if($('#cgBub').textContent===t) $('#cgBub').textContent=''; },ms); };
  const tile=k=>$(`#cgScene .tile[data-item="${k}"]`), art=e=>{ $('#cgWho .art').innerHTML=charSVG('chen',e); };
  const glass=()=>{ $('#cgGlass').innerHTML=cgGlassSVG(G.ml,G.kind); $('#cgMl').textContent=Math.round(G.ml)+' mL'; };
  const consume=k=>{ if(k==='food'||k==='pills'){ G.gone.add(k); tile(k).classList.add('gone'); tile(k).classList.remove('want'); } };
  function pour(k){ if(G.pouring||G.swallowed||G.ml>=200) return; G.pouring=true; G.kind=k==='water'?'water':'bad'; G.pourH=sfxLoop('pour');
    const iv=setInterval(()=>{ G.ml=Math.min(220,G.ml+22); glass(); if(G.ml>=220){ clearInterval(iv); G.pouring=false; if(G.pourH){ G.pourH.stop(.12); G.pourH=null; }
      if(k==='water'){ C.mark('pour'); bub(L(['一大杯白開水，好。','A full glass of plain water — good.','น้ำเปล่าเต็มแก้ว ดีแล้ว']),1500); }
      else { C.err('wrongDrink'); bub(L(['配這個不行嗎？','Can\'t I take it with this?','กินกับอันนี้ไม่ได้เหรอ?']),1600); C.later(()=>{ if(!G.swallowed){ G.ml=0; G.kind='water'; glass(); } },1400); } } },45); }
  function swallow(){ if(G.swallowed||G.pouring) return; if(!G.ml) C.err('dry'); else if(G.kind==='bad') C.err('wrongDrink');
    G.swallowed=true; G.doseAt=G.min; doseCard(); consume('fosa'); tile('fosa').classList.add('gone'); G.ml=0; glass(); sfx.gulp(); C.mark('swallow'); bub(L(['好，吞下去了！','Done — swallowed!','กลืนแล้ว!']),1400); C.later(startWait,900); }
  /* the 30 minutes: she asks for four things (three not allowed, one allowed); the student taps Wait or OK for each.
     The clock stands still while she is asking (and briefly after), so there is time to read and decide. */
  const OKW=new Set(['water','sofa','plants']), SPAN=24000, WIN=C.ex?7000:10000, ASK_AT=[2000,7400,12800,18200];
  function startWait(){ G.wait=true; if(!C.ex) C.status=FLOWG.waiting; C.guide(); const rnd=()=>Math.random()-.5;
    const evs=[...['lie','coffee','food','pills'].sort(rnd).slice(0,3), ['water','sofa','plants'][Math.floor(Math.random()*3)]].sort(rnd);
    let last=performance.now(), next=0; G.free=0; G.hold=0;
    const clk=setInterval(()=>{ if(C.finished){ clearInterval(clk); return; } const now=performance.now(); if(!G.want&&now>=G.hold) G.free+=now-last; last=now;
      if(next<evs.length&&!G.want&&G.free>=ASK_AT[next]) want(evs[next++]);
      const m=Math.min(60,30+Math.floor(G.free/SPAN*30));
      if(m!==G.min){ G.min=m; doseCard(); $('#cgTime').textContent=hm(m); sfx.tick(); } if(m>=60){ clearInterval(clk); endWait(); } },200); }
  const WANT={lie:['好睏喔……我再躺一下就好。','So sleepy… just a little lie-down.','ง่วงจัง… ขอนอนต่อแป๊บนึงนะ'], coffee:['先喝口咖啡提神……','Just a sip of coffee to wake up…','ขอจิบกาแฟให้ตื่นหน่อย…'], food:['肚子好餓，先吃一口饅頭……','I\'m starving — one bite of my bun…','หิวจัง ขอกินซาลาเปาสักคำ…'], pills:['順便把其他藥一起吃一吃……','I\'ll take my other pills while I\'m at it…','กินยาอื่นไปพร้อมกันเลยดีกว่า…'],
    water:['我可以再喝點白開水嗎？','Can I have a bit more plain water?','ขอน้ำเปล่าอีกนิดได้ไหม?'], sofa:['我去沙發坐著看新聞喔。','I\'ll sit on the sofa and watch the news.','ไปนั่งดูข่าวที่โซฟานะ'], plants:['我去陽台澆個花。','I\'ll go and water the plants on the balcony.','ไปรดน้ำต้นไม้ที่ระเบียงนะ']};
  const WICON={lie:'🛏️', coffee:'☕', food:'🥟', pills:'💊', water:'💧', sofa:'🛋️', plants:'🪴'};
  function want(ev){ if(!G.wait||G.want) return; if(G.gone.has(ev)) return; G.want=ev; bub(WICON[ev]+' '+L(WANT[ev])); sfx.blip('chen');
    if(ev==='lie'){ $('#cgBed').innerHTML=cgBedSVG('chen','happy'); $('#cgWho').classList.add('lying'); } else if(tile(ev)) tile(ev).classList.add('want');
    const a=$('#cgAsk'), w=$('#cgWho'); a.dataset.want=ev; a.style.left=(w.offsetLeft-236)+'px'; a.style.top=(w.offsetTop+120)+'px'; a.classList.remove('hidden');
    const b=$('#cgAskT'); b.style.transition='none'; b.style.width='100%'; void b.offsetWidth; b.style.transition=`width ${WIN}ms linear`; b.style.width='0%';
    C.guide(); G.wantT=C.later(()=>resolveWant('timeout'),WIN); }
  function resolveWant(ch){ const ev=G.want; if(!ev) return; G.want=null; G.hold=performance.now()+1400; clearTimeout(G.wantT); $('#cgAsk').classList.add('hidden');
    if(ev==='lie'&&ch==='stop'){ $('#cgWho').classList.remove('lying'); art('neutral'); } else if(tile(ev)) tile(ev).classList.remove('want');
    if(OKW.has(ev)){ if(ch==='stop'){ C.err('tooStrict'); bub(L(['咦？連這個也不行嗎……','Oh — not even that?','อ้าว แค่นี้ก็ไม่ได้เหรอ…']),1700); }
      else { sfx.select(); art('happy'); bub(L(ev==='water'?['（喝了幾口白開水）','(sips some plain water)','(จิบน้ำเปล่า)']:['好～','Okay~','โอเค~']),1400); } }
    else if(ch==='stop'){ sfx.select(); if(ev==='lie') art('happy'); bub(L(ev==='lie'?['好啦，我坐著。','Fine — I\'ll sit up.','ก็ได้ นั่งก็ได้']:['好，等 7 點再說。','Okay, after seven then.','โอเค รอเจ็ดโมงก่อน']),1500); }
    else { C.err(ev==='lie'?'lieDown':ev==='pills'?'earlyPills':'early'); consume(ev); if(ev==='lie') C.later(()=>{ if(G.want!=='lie'){ $('#cgWho').classList.remove('lying'); art('neutral'); } },2600); bub(L(ev==='lie'?['呼……（躺下了）','Zzz… (lies down)','ครอก… (นอนลงแล้ว)']:['（她吃下去了）','(she has it)','(ป้ากินไปแล้ว)']),1500); }
    C.guide(); }
  $('#cgStop').onclick=()=>{ if(C.finished) return; if(G.askA) return afterAns('stop'); resolveWant('stop'); };
  $('#cgOk').onclick=()=>{ if(C.finished) return; if(G.askA) return afterAns('ok'); resolveWant('ok'); };
  function endWait(){ G.wait=false; G.after=true; if(G.want) resolveWant('timeout'); C.status=null; C.mark('wait'); if(C.ex) $('#cgTx').textContent=L(['7:00','7:00','7:00']); checkAfter(); askAfter(); }
  /* 7:00: she asks for what she still hasn't had (breakfast, her other pills), with the same Wait / OK buttons and no timer */
  const AFT={both:['7 點了！可以吃早餐和其他的藥了嗎？','Seven o\'clock! Can I have breakfast and my other pills now?','เจ็ดโมงแล้ว! กินข้าวเช้ากับยาอื่นได้หรือยัง?'], food:['7 點了！可以吃早餐了嗎？','Seven o\'clock! Can I have breakfast now?','เจ็ดโมงแล้ว! กินข้าวเช้าได้หรือยัง?'],
    pills:['7 點了！其他的藥可以吃了嗎？','Seven o\'clock! Can I take my other pills now?','เจ็ดโมงแล้ว! กินยาอื่นได้หรือยัง?'], no:['還不行喔？可是已經 30 分鐘了，我還有降血糖藥要吃……','Still not? It\'s been 30 minutes, and I have my diabetes pills to take…','ยังไม่ได้อีกเหรอ? ครบ 30 นาทีแล้วนะ ป้ายังต้องกินยาเบาหวานด้วย…'],
    ate:['（吃早餐、吃藥）好飽！','(breakfast and pills) All done!','(กินข้าวเช้าและยาแล้ว) อิ่มแล้ว!']};
  function askAfter(){ if(C.finished||!G.after||G.askA) return; const need=['food','pills'].filter(k=>!G.gone.has(k)); if(!need.length) return;
    G.askA=true; bub(L(need.length===2?AFT.both:AFT[need[0]])); sfx.blip('chen'); need.forEach(k=>tile(k).classList.add('want'));
    const a=$('#cgAsk'), w=$('#cgWho'); a.dataset.want='after'; a.style.left=(w.offsetLeft-236)+'px'; a.style.top=(w.offsetTop+120)+'px'; $('#cgAskT').parentElement.style.visibility='hidden'; a.classList.remove('hidden'); C.guide(); }
  function afterAns(ch){ G.askA=false; $('#cgAsk').classList.add('hidden'); ['food','pills'].forEach(k=>tile(k).classList.remove('want'));
    if(ch==='ok'){ ['food','pills'].forEach(k=>{ if(!G.gone.has(k)) consume(k); }); sfx.chew(); art('happy'); bub(L(AFT.ate),1600); checkAfter(); return; }
    C.err('noAfter'); art('sad'); bub(L(AFT.no)); C.guide(); C.later(askAfter,2200); }
  function checkAfter(){ if(G.gone.has('food')&&G.gone.has('pills')){ if(G.askA){ G.askA=false; $('#cgAsk').classList.add('hidden'); } C.mark('after'); C.later(()=>C.finish({min:G.min}),900); } }
  ['water','coffee','milk','juice'].forEach(k=>tile(k).addEventListener('click',()=>{ if(C.finished) return;
    if(!G.swallowed) return pour(k); if(G.wait){ if(k!=='water'){ C.err('early'); bub(L(['（她喝了一口）','(she takes a sip)','(ป้าจิบไปหนึ่งอึก)']),1300); } } }));
  tile('fosa').addEventListener('click',()=>{ if(!C.finished) swallow(); });
  ['food','pills'].forEach(k=>tile(k).addEventListener('click',()=>{ if(C.finished||G.gone.has(k)) return;
    if(!G.swallowed){ C.err('notEmpty'); consume(k); return; } if(G.wait){ C.err(k==='pills'?'earlyPills':'early'); consume(k); if(G.want===k) resolveWant('timeout'); return; }
    if(G.after){ consume(k); k==='food'?sfx.chew():sfx.gulp(); C.guide(); checkAfter(); } }));
  $('#cgWho').addEventListener('click',()=>{ if(G.want==='lie') resolveWant('stop'); });
  const FON={dose:['她還沒吃 Fosamax 喔……就這樣結束嗎？','She hasn\'t taken the Fosamax yet… finish now?','ป้ายังไม่ได้กินยา Fosamax เลย… จะจบแค่นี้เหรอ?'], wait:['還沒滿 30 分鐘喔……就這樣結束嗎？','The 30 minutes aren\'t up yet… finish now?','ยังไม่ครบ 30 นาทีเลย… จะจบแค่นี้เหรอ?'],
    after:['她還沒吃早餐和其他的藥喔……就這樣結束嗎？','She hasn\'t had breakfast or her other pills yet… finish now?','ป้ายังไม่ได้กินข้าวเช้ากับยาอื่นเลย… จะจบแค่นี้เหรอ?']}, fNudged=new Set();
  function done(){ const k=C.ex?null:!G.swallowed?'dose':!G.after?'wait':!(G.gone.has('food')&&G.gone.has('pills'))?'after':null;   // a step still missing: say so once (practice)
    if(k&&!fNudged.has(k)){ fNudged.add(k); sfx.error(); bub(L(FON[k]),2800); C.guide(); return; }
    if(!G.swallowed) C.errs.add('noDose'); else if(!(G.gone.has('food')&&G.gone.has('pills'))) C.errs.add('noAfter'); C.finish({min:G.min}); }
  return C.result;
}

/* ---------- 2) hypoglycaemia rescue (tap only): any fast sugar works ---------- */
const HYPO_ERR={
  slowCarb:['低血糖時先不要給餅乾：澱粉太慢，先給糖','Not crackers first — starch is too slow; give sugar first','อย่าเพิ่งให้ขนมปังกรอบตอนน้ำตาลต่ำ แป้งช้าไป ต้องให้น้ำตาลก่อน'],
  under:['糖不夠：一次要給 15–20 g（例如 3–4 顆糖果、半杯果汁或 4 顆葡萄糖錠）','Not enough sugar — give 15–20 g at a time (e.g. 3–4 candies, half a cup of juice or 4 glucose tablets)','น้ำตาลไม่พอ ต้องให้ครั้งละ 15–20 ก. (เช่น ลูกอม 3–4 เม็ด น้ำผลไม้ครึ่งแก้ว หรือเม็ดกลูโคส 4 เม็ด)'],
  tooMuch:['一次給太多：15–20 g 就好，給太多會讓血糖反彈太高','Too much at once — 15–20 g is enough; more overshoots','ให้มากไปในครั้งเดียว 15–20 ก. ก็พอ มากไปน้ำตาลจะพุ่งสูง'],
  tooSoon:['還沒等 15 分鐘就重測：數值還沒反應出來','Rechecked before 15 minutes — the reading hasn\'t caught up yet','วัดซ้ำก่อนครบ 15 นาที ค่ายังไม่ขึ้น'],
  noRecheck:['處理後要再測一次，確定回到 70 以上','Recheck after treating to make sure she\'s back above 70','หลังแก้ไขต้องวัดซ้ำให้แน่ใจว่ากลับมาเกิน 70'],
  noSnack:['回到 70 以上後，她還沒吃午餐：要吃點東西，避免再掉','Back above 70 — but she skipped lunch: she needs a snack so it doesn\'t drop again','กลับมาเกิน 70 แล้ว แต่ป้ายังไม่ได้กินข้าวเที่ยง ต้องกินอะไรรองท้อง ไม่ให้ตกอีก'],
};
function hypoGame(){
  const FL=[['check',['先點血糖機，量她的血糖','First tap the meter to check her sugar','แตะเครื่องวัดเพื่อวัดน้ำตาลก่อน'],'🩸','.tile[data-item="meter"]',['量了血糖','Sugar checked','วัดน้ำตาลแล้ว']],
    ['treat',['給她 15–20 g 的糖：糖果點 3–4 下、果汁點 1 下，或葡萄糖錠點 4 下','Give her 15–20 g of sugar: tap the candy 3–4 times, the juice once, or the glucose tablets 4 times','ให้น้ำตาล 15–20 ก.: แตะลูกอม 3–4 ครั้ง น้ำส้ม 1 ครั้ง หรือเม็ดกลูโคส 4 ครั้ง'],'🍬','.tile[data-item="candy"]',['給了糖','Sugar given','ให้น้ำตาลแล้ว']],
    ['wait',['點「⏩ 等 15 分鐘」','Tap "⏩ Wait 15 min"','แตะ "⏩ รอ 15 นาที"'],'⏱️','#cgWait15',['等了 15 分鐘','15 minutes passed','ผ่านไป 15 นาที']],
    ['recheck',['再點血糖機，重測一次','Tap the meter again to recheck','แตะเครื่องวัดอีกครั้งเพื่อวัดซ้ำ'],'🔁','.tile[data-item="meter"]',['重測：回到 70 以上','Rechecked: above 70','วัดซ้ำ: เกิน 70 แล้ว']],
    ['snack',['回到 70 以上了！她沒吃午餐：點蘇打餅乾給她墊肚子','Back above 70! She skipped lunch — tap the crackers for a snack','กลับมาเกิน 70 แล้ว! ป้ายังไม่ได้กินข้าวเที่ยง แตะขนมปังกรอบให้ป้ารองท้อง'],'🍞','.tile[data-item="bread"]',['','','']]];
  const scene=`<div class="who" id="cgWho" style="right:16px;top:16px;width:290px;height:440px"><div class="bub" id="cgBub"></div><div class="art">${charSVG('chen','sad')}</div></div>
    <div style="position:absolute;left:24px;top:20px;width:150px" id="cgClock">${cgClockSVG(0)}</div>
    <div style="position:absolute;left:190px;top:34px;font-weight:900;font-size:20px;color:#b4621a;line-height:1.4"><span id="cgWait" style="font-size:32px;color:#3a2a1c">+0 ${esc(L(FLOWG.min))}</span><br><button class="gbtn gray" id="cgWait15" style="font-size:19px;padding:8px 16px;margin-top:6px">${esc(L(FLOWG.wait15))}</button></div>
    <div class="cg-read" style="left:24px;top:210px;width:300px"><div style="font-weight:900;color:#5a4a3a">🩸 ${esc(L(['血糖','Blood sugar','น้ำตาลในเลือด']))}</div><b id="cgBg">— —</b><div id="cgBgOld" style="font-weight:800;font-size:16px;color:#8a7a6a;margin:-2px 0 4px"></div><div style="font-weight:900;color:#5a4a3a">🍬 ${esc(L(['已給的糖','Sugar given','ให้น้ำตาลแล้ว']))}: <b id="cgG" style="display:inline;font-size:26px">0</b> g</div></div>
    ${cgTile('meter',['血糖機','Glucose meter','เครื่องวัดน้ำตาล'],24,476)}${cgTile('gluc',['葡萄糖錠','Glucose tablets','เม็ดกลูโคส'],154,476)}${cgTile('candy',['硬糖','Hard candy','ลูกอมแข็ง'],284,476)}${cgTile('juice',['柳橙汁（半杯）','Orange juice (½ cup)','น้ำส้ม (ครึ่งแก้ว)'],414,476)}${cgTile('bread',['蘇打餅乾','Crackers','ขนมปังกรอบ'],544,476)}`;
  const gd=null, hside=gd?`<div class="box" style="align-items:stretch;text-align:left"><div style="font-weight:900;color:#c0392b;font-size:15px">💊 ${esc(L(['她在吃','She takes','ป้ากินยานี้อยู่']))}</div><b style="font-size:17px;line-height:1.25">${esc(gd.n)}</b><span style="font-size:14px;color:#6a6585">${esc(gd.g)}</span><span style="font-weight:800;font-size:15px;line-height:1.35;color:#8a4fb8">${esc(L(gd.cls))}</span></div>`:'';
  const C=cgPanel({title:['🩸 實作：低血糖急救','🩸 Hands-on: hypo rescue','🩸 ลงมือ: แก้น้ำตาลต่ำ'], task:['王太太在發抖冒冷汗，還沒吃午餐。處理到她安全為止。','Mrs. Wang is shaky and sweaty and hasn\'t had lunch. Handle it until she\'s safe.','ป้าหวังมือสั่นเหงื่อแตก ยังไม่ได้กินข้าวเที่ยง ดูแลจนป้าปลอดภัย'],
    errs:HYPO_ERR, scene, side:hside, drop:()=>{}, onDone:()=>done()});
  cgFlow(C, FL, ['王太太在發抖、冒冷汗。你會怎麼處理？點桌上的東西或按鈕。卡住了就按「💡 提示」。','Mrs. Wang is shaky and sweaty. What will you do? Tap things on the table or the button. Stuck? Tap "💡 Hint".','ป้าหวังมือสั่น เหงื่อแตก คุณจะทำอย่างไร? แตะของบนโต๊ะหรือปุ่ม ถ้าติดอยู่ แตะ "💡 คำใบ้"']); if(C.ex) $('#cgTx').textContent=L(['王太太在發抖冒冷汗，還沒吃午餐。處理到她安全為止。','Mrs. Wang is shaky and sweaty and hasn\'t had lunch. Handle it until she\'s safe.','ป้าหวังมือสั่นเหงื่อแตก ยังไม่ได้กินข้าวเที่ยง ดูแลจนป้าปลอดภัย'])+' '+L(CGX.examNote);
  const G={bg:58, g:0, roundG:0, waited:-1, checked:false, rechecked:false, ok:false, snack:false, checks:0, busy:false, nudged:new Set()};
  const bub=(t,ms)=>{ $('#cgBub').textContent=t; if(ms) C.later(()=>{ if($('#cgBub').textContent===t) $('#cgBub').textContent=''; },ms); };
  const tile=k=>$(`#cgScene .tile[data-item="${k}"]`);
  const show=v=>{ const e=$('#cgBg'); e.textContent=v+' mg/dL'; e.style.color=v<70?'#c0172f':'#18b07f'; $('#cgBgOld').textContent=''; sfx.beep(); };
  const HY={old:['這是 15 分鐘前的數值，現在呢？','That was 15 minutes ago — what is it now?','ค่านี้วัดเมื่อ 15 นาทีที่แล้ว ตอนนี้ล่ะ?'],
    wonder:['15 分鐘了……我的血糖上來了沒？','15 minutes now… is my sugar back up?','15 นาทีแล้ว… น้ำตาลป้าขึ้นหรือยังนะ?'], passed:['（過了 15 分鐘）','(15 minutes later)','(ผ่านไป 15 นาที)'],
    sure:['確定她安全了嗎？還沒重測血糖喔。','Sure she\'s safe? Her sugar hasn\'t been rechecked.','แน่ใจหรือว่าป้าปลอดภัยแล้ว? ยังไม่ได้วัดน้ำตาลซ้ำเลย'],
    lunch:['……不過我中午還沒吃飯呢。','…but I still haven\'t had lunch.','…ว่าแต่เที่ยงนี้ป้ายังไม่ได้กินข้าวเลยนะ'],
    none:['她還在發抖、冒冷汗……就這樣結束嗎？','She\'s still shaking and sweating… finish now?','ป้ายังมือสั่น เหงื่อออกอยู่เลย… จะจบแค่นี้เหรอ?'],
    snack:['血糖回來了，可是她中午還沒吃飯……就這樣結束嗎？','Her sugar is back, but she still hasn\'t had lunch… finish now?','น้ำตาลกลับมาแล้ว แต่ป้ายังไม่ได้กินข้าวเที่ยงเลย… จะจบแค่นี้เหรอ?']};
  const glowMeter=()=>{ if(!C.ex) tile('meter').classList.add('cg-glow'); };
  bub(L(['手好抖……頭暈……','My hands are shaking… so dizzy…','มือสั่นจัง… เวียนหัว…']));
  tile('meter').addEventListener('click',()=>{ if(C.finished||G.busy) return; G.checks++;
    if(!G.checked){ G.checked=true; show(G.bg); C.mark('check'); return; }
    if(!G.roundG&&!G.ok){ show(G.bg); return; }
    if(G.ok){ show(G.bg); return; }
    if(G.waited<15){ C.err('tooSoon'); show(60); return; }
    if(G.roundG<15) C.err('under'); G.bg=G.roundG>=15?(G.roundG>24?168:94):G.roundG>=8?66:60; G.rechecked=true; show(G.bg);
    if(G.bg>=70){ G.ok=true; C.mark('recheck'); $('#cgWho .art').innerHTML=charSVG('chen','happy'); bub(L(['好多了……手不抖了。','Much better… the shaking\'s gone.','ดีขึ้นเยอะ… มือหายสั่นแล้ว']),2200);
      C.later(()=>{ if(!G.snack&&!C.finished) bub(L(HY.lunch)); },2400); }
    else { bub(L(['還是有點暈……','Still a bit dizzy…','ยังเวียนหัวอยู่นิด…']),2000); G.roundG=0; G.waited=-1; $('#cgWait').textContent='+0 '+L(FLOWG.min); C.unmark('treat','wait','recheck'); } });
  tile('gluc').addEventListener('click',()=>{ if(C.finished||G.ok) return; if(G.waited>=15){ bub(L(FLOWG.recheckFirst),1400); return; }
    G.g+=4; G.roundG+=4; $('#cgG').textContent=G.g; sfx.chew(); bub(L(['（嚼一顆葡萄糖錠）','(chews a glucose tablet)','(เคี้ยวเม็ดกลูโคส)']),900);
    if(G.roundG>24) C.err('tooMuch'); C.guide(); });
  [['candy',5,['（含一顆糖果）','(sucks a candy)','(อมลูกอมหนึ่งเม็ด)']],['juice',15,['（喝了半杯柳橙汁）','(drinks half a cup of orange juice)','(ดื่มน้ำส้มครึ่งแก้ว)']]].forEach(([k,g,say])=>tile(k).addEventListener('click',()=>{ if(C.finished||G.ok) return; if(G.waited>=15){ bub(L(FLOWG.recheckFirst),1400); return; }
    G.g+=g; G.roundG+=g; $('#cgG').textContent=G.g; k==='juice'?sfx.sip():sfx.chew(); bub(L(say),900);
    if(G.roundG>24) C.err('tooMuch'); C.guide(); }));
  tile('bread').addEventListener('click',()=>{ if(C.finished) return; if(!G.ok&&G.waited>=15){ C.err('noRecheck'); bub(L(FLOWG.recheckFirst),1600); glowMeter(); return; } if(!G.ok){ C.err('slowCarb'); return; } if(G.snack) return; G.snack=true; C.mark('snack'); sfx.crunch();
    bub(L(['謝謝你，我中午都忘了吃飯……','Thank you — I forgot to eat lunch…','ขอบใจนะ เที่ยงนี้ลืมกินข้าวเลย…']),2000); C.later(()=>C.finish({g:G.g, bg:G.bg, checks:G.checks}),1200); });
  $('#cgWait15').onclick=()=>{ if(C.finished||G.busy) return; if(!G.roundG){ bub(L(FLOWG.treatFirst),1400); sfx.error(); return; } if(G.waited>=15) return;
    C.mark('treat'); G.busy=true; sfx.whoosh(); let m=0; const iv=setInterval(()=>{ m++; $('#cgClock').innerHTML=cgClockSVG(m); $('#cgWait').textContent='+'+m+' '+L(FLOWG.min); if(m%5===0) sfx.tick(); if(m>=15){ clearInterval(iv); G.waited=15; G.busy=false; C.mark('wait');
      const e=$('#cgBg'); e.style.color='#b8aca0'; $('#cgBgOld').textContent=L(HY.old); bub(L(C.ex?HY.passed:HY.wonder)); glowMeter(); } },70); };
  function done(){   // a step still missing: she says so once per step (practice), the next Done ends the game
    const k=C.ex?null:!G.g?'none':!G.rechecked?'sure':(G.ok&&!G.snack)?'snack':null;
    if(k&&!G.nudged.has(k)){ G.nudged.add(k); sfx.error(); bub(L(HY[k]),2800); if(k==='sure') glowMeter(); else if(k==='snack') tile('bread').classList.add('cg-glow'); return; }
    if(!G.g) C.errs.add('under'); else if(!G.rechecked) C.errs.add('noRecheck'); else if(G.ok&&!G.snack) C.errs.add('noSnack'); C.finish({g:G.g, bg:G.bg, checks:G.checks}); }
  return C.result;
}
/* ---------- 3) measuring her height properly, then comparing with the 2018 health booklet ---------- */
const HT_ERR={
  shoes:['穿著拖鞋量：多了約 2 公分','Measured in her slippers — about 2 cm too tall','วัดทั้งที่ใส่รองเท้าแตะ สูงเกินไปราว 2 ซม.'],
  level:['頭低著量：要平視前方（耳朵和眼角連線水平）','Head tipped down — she must look straight ahead (ear–eye line level)','ก้มหน้าตอนวัด ต้องมองตรงไปข้างหน้า (แนวหู–หางตาขนานพื้น)'],
  compare:['和 2018 年的身高相減算錯了','The subtraction from the 2018 height is off','คำนวณส่วนต่างกับส่วนสูงปี 2018 ผิด'],
  noRead:['還沒有讀出身高','The height was never read','ยังไม่ได้อ่านค่าส่วนสูง'],
};
function heightGame(){
  const steps=[['shoes',['脫掉拖鞋','Slippers off','ถอดรองเท้าแตะ'],'🩴'],['wall',['腳跟、臀部、背貼牆站直','Heels, hips and back against the wall','ส้นเท้า สะโพก หลัง ชิดผนัง'],'🧍‍♀️'],
    ['level',['平視前方','Look straight ahead','มองตรงไปข้างหน้า'],'👀'],['board',['頭板輕放到頭頂','Lower the headboard onto her head','เลื่อนแผ่นวัดลงแตะศีรษะ'],'📏'],
    ['read',['視線和刻度同高讀數','Read at eye level','อ่านค่าในระดับสายตา'],'🔎'],['compare',['和 2018 年健檢比較','Compare with the 2018 check-up','เทียบกับผลตรวจปี 2018'],'📒']];
  const K=3.4, FLOOR=650, POLE=640, X0=230, XW=POLE-62;   // px per cm; figure's back x at the wall
  const scale=[...Array(41)].map((_,i)=>{ const cm=140+i, y=FLOOR-cm*K, big=cm%10===0, mid=cm%5===0;
    return `<path d="M${POLE} ${y.toFixed(1)} h${big?-26:mid?-18:-10}" stroke="#3a2e22" stroke-width="${big?3:2}"/>${mid?`<text x="${POLE+24}" y="${(y+6).toFixed(1)}" font-size="${big?18:14}" font-weight="900" fill="#3a2e22" font-family="sans-serif">${cm}</text>`:''}`; }).join('');
  const scene=`<svg id="htSvg" viewBox="0 0 940 690" preserveAspectRatio="xMinYMin meet" style="position:absolute;inset:0;width:100%;height:100%;touch-action:none">
    <rect x="${POLE}" y="0" width="300" height="${FLOOR}" fill="#f1e2c9"/><rect x="0" y="${FLOOR}" width="940" height="40" fill="#d8bf98"/>
    <rect x="${POLE}" y="16" width="16" height="${FLOOR-16}" fill="#fff" stroke="#3a2e22" stroke-width="3"/>${scale}
    <g id="htBoard" style="cursor:grab"><rect x="${POLE-200}" y="-48" width="270" height="96" fill="#000" fill-opacity="0"/><rect x="${POLE-150}" y="-7" width="170" height="14" rx="4" fill="#5b8fd6" stroke="#3a2e22" stroke-width="3"/><rect x="${POLE-6}" y="-16" width="28" height="32" rx="5" fill="#3d6fb8" stroke="#3a2e22" stroke-width="3"/></g>
    <g id="htFig" style="cursor:grab"></g>
    <g id="htSlip" style="cursor:pointer"></g>
    <g id="htRead" style="display:none"><rect x="${POLE+70}" y="0" width="190" height="84" rx="16" fill="#fff" stroke="#18b07f" stroke-width="5"/><text id="htVal" x="${POLE+165}" y="56" text-anchor="middle" font-size="38" font-weight="900" fill="#1f5a3a" font-family="sans-serif"></text></g>
  </svg><div class="bub" id="cgBub" style="left:auto;right:12px;top:auto;bottom:56px;width:260px"></div>`;
  const side=`<div class="box" style="align-items:stretch;text-align:left"><div style="font-weight:900;color:#b4621a">📒 ${esc(L(['2018 工廠健檢手冊','2018 factory check-up','สมุดตรวจสุขภาพโรงงาน 2018']))}</div><div style="font-size:30px;font-weight:900">162.0 cm</div>
      <div style="font-weight:900;color:#3d7bff;margin-top:6px">📏 ${esc(L(['今天量到','Today','วันนี้วัดได้']))}</div><div id="htToday" style="font-size:30px;font-weight:900">— —</div>
      <div style="font-weight:900;margin-top:6px">${esc(L(['矮了幾公分？','How many cm shorter?','เตี้ยลงกี่ ซม.?']))}</div>
      <div style="display:flex;gap:6px;align-items:center"><input id="htDiff" type="number" step="0.1" inputmode="decimal" style="width:96px;font-size:22px;font-weight:900;padding:6px;border-radius:10px;border:3px solid #ead9c2" disabled> cm</div>
      <button class="gbtn blue" id="htCheck" style="font-size:17px;padding:8px 10px" disabled>${esc(L(['確認','Check','ตรวจ']))}</button></div>`;
  const C=cgPanel({title:['📏 實作：量身高','📏 Hands-on: measure her height','📏 ลงมือ: วัดส่วนสูง'], task:['用正確的方法量王太太的身高，再和 2018 年的紀錄比較。','Measure Mrs. Wang properly, then compare with her 2018 record.','วัดส่วนสูงป้าหวังให้ถูกวิธี แล้วเทียบกับบันทึกปี 2018'],
    steps, errs:HT_ERR, err2step:{shoes:'shoes',level:'level',compare:'compare',noRead:'read'}, scene, side, drop:()=>{}, onDone:()=>done(),
    sumExtra:out=>`<p style="font-size:18px;font-weight:800;line-height:1.45;margin:8px 0 0;color:#5a1030">🦴 ${esc(L(['骨鬆病人身高減少 ≥ 4 公分（或一年 ≥ 2 公分）、又有背痛：要懷疑脊椎壓迫性骨折，請醫師安排 X 光。','Height loss of ≥ 4 cm (or ≥ 2 cm in a year) plus back pain in osteoporosis: suspect a vertebral compression fracture — ask the doctor for an X-ray.','ผู้ป่วยกระดูกพรุนที่ส่วนสูงลดลง ≥ 4 ซม. (หรือ ≥ 2 ซม. ใน 1 ปี) ร่วมกับปวดหลัง: สงสัยกระดูกสันหลังยุบ ควรให้แพทย์ส่งเอกซเรย์']))}</p>`});
  const G={x:X0, slip:true, level:false, wall:false, boardY:30, touch:false, read:null};
  const svg=$('#htSvg'), fig=$('#htFig'), slip=$('#htSlip'), board=$('#htBoard');
  let lastTouch=0; svg.addEventListener('touchend',e=>{ const t=e.timeStamp; if(t-lastTouch<400) e.preventDefault(); lastTouch=t; },{passive:false});
  // tap/drag position in the picture's own units. Not getScreenCTM(): older iPhone Safari leaves out the stage's CSS scale
  // (WebKit bug 209220, fixed 2026), so taps on the scale missed. viewBox 940x690, xMinYMin meet.
  const pt=e=>{ const r=svg.getBoundingClientRect(), k=Math.min(r.width/940, r.height/690)||1; return {x:(e.clientX-r.left)/k, y:(e.clientY-r.top)/k}; };
  const bub=(t,ms)=>{ $('#cgBub').textContent=t; if(ms) C.later(()=>{ if($('#cgBub').textContent===t) $('#cgBub').textContent=''; },ms); };
  const hCm=()=>158+(G.slip?2:0)-(G.level?0:1.5), top=()=>FLOOR-hCm()*K;
  const NX={slip:['點她的拖鞋，把拖鞋脫掉','Tap her slippers to take them off','แตะรองเท้าแตะเพื่อถอดออก'], wall:['把她拖到右邊的牆邊（量尺旁）','Drag her right, to the wall by the scale','ลากป้าไปชิดผนังด้านขวา (ข้างไม้วัด)'],
    level:['點她的頭，讓她平視前方','Tap her head so she looks straight ahead','แตะศีรษะให้ป้ามองตรงไปข้างหน้า'], board:['點一下藍色頭板（或往下拖），讓它放到頭頂','Tap the blue headboard (or drag it down) onto her head','แตะแผ่นวัดสีฟ้า (หรือลากลง) ให้แตะศีรษะ'],
    read:['點量尺讀出身高','Tap the scale to read her height','แตะไม้วัดเพื่ออ่านค่าส่วนสูง'], diff:['在右邊填「矮了幾公分」，再按「確認」','Type how many cm shorter on the right, then tap Check','กรอกว่าเตี้ยลงกี่ ซม. ทางขวา แล้วแตะ "ตรวจ"']};
  const next=()=>{ if(C.ex||C.finished) return; C.hint(L(G.read!=null?NX.diff:G.slip?NX.slip:!G.wall?NX.wall:!G.level?NX.level:!G.touch?NX.board:NX.read)); };
  function drawFig(){ const H=158*K, lift=G.slip?2*K:0, tilt=G.level?0:-17;
    fig.setAttribute('transform',`translate(${G.x},${FLOOR-lift})`);
    fig.innerHTML=`<path d="M10 0 v-${H*.47} h44 v${H*.47} Z" fill="#3b4a7a" stroke="#3a2e22" stroke-width="4"/><path d="M6 -${H*.47} q-6 -${H*.18} 6 -${H*.33} h44 q10 ${H*.15} 6 ${H*.33}Z" fill="#3a6fb5" stroke="#3a2e22" stroke-width="4"/>
      <path d="M14 -${H*.75} q-24 ${H*.12} -14 ${H*.26}" stroke="#f6c9a8" stroke-width="16" fill="none" stroke-linecap="round"/><path d="M14 -${H*.75} q-24 ${H*.12} -14 ${H*.26}" stroke="#3a2e22" stroke-width="3" fill="none" opacity=".25"/>
      <rect x="22" y="-${H*.86}" width="20" height="${H*.07}" fill="#f6c9a8" stroke="#3a2e22" stroke-width="3"/>
      <g transform="rotate(${tilt} 32 -${H*.86})" id="htHead" style="cursor:pointer"><ellipse cx="30" cy="-${H*.93}" rx="40" ry="${H*.072}" fill="#f6c9a8" stroke="#3a2e22" stroke-width="4"/>
        <path d="M66 -${H*.97} q2 -${H*.06} -36 -${H*.035} q-30 0 -38 ${H*.05} q4 ${H*.04} 28 ${H*.02} q18 -${H*.025} 46 -${H*.035}Z" fill="#2b2233" stroke="#3a2e22" stroke-width="3"/><circle cx="62" cy="-${H*.955}" r="12" fill="#2b2233" stroke="#3a2e22" stroke-width="3"/>
        <circle cx="4" cy="-${H*.935}" r="5" fill="#3a2e22"/><path d="M-10 -${H*.92} l-8 6 l9 2" stroke="#3a2e22" stroke-width="3" fill="none" stroke-linejoin="round"/><path d="M-2 -${H*.895} q6 3 10 0" stroke="#b03a48" stroke-width="3" fill="none"/>
        <circle cx="40" cy="-${H*.925}" r="9" fill="#f2b394" stroke="#3a2e22" stroke-width="3"/>${G.level?`<path d="M40 -${H*.925} H-30" stroke="#18b07f" stroke-width="3" stroke-dasharray="6 5"/>`:''}</g>
      <path d="M8 0 h-26 q-6 0 -4 -8 l4 -6 h26Z" fill="#3a2e22"/>`;
    slip.innerHTML=G.slip?`<g transform="translate(${G.x},${FLOOR})"><rect x="-50" y="-70" width="130" height="110" fill="#000" fill-opacity="0"/><path d="M-24 0 h70 q6 0 6 -4 v-4 h-80 v4 q0 4 4 4Z" fill="#ff8aa8" stroke="#3a2e22" stroke-width="3"/><text x="11" y="-22" text-anchor="middle" font-size="30">🩴</text></g>`:`<path transform="translate(70,${FLOOR})" d="M0 0 h70 q6 0 6 -4 v-4 h-80 v4 q0 4 4 4Z" fill="#ff8aa8" stroke="#3a2e22" stroke-width="3" opacity=".8"/>`;
    $('#htHead').addEventListener('pointerdown',e=>{ e.stopPropagation(); if(C.finished||G.read) return; G.level=!G.level; sfx.select(); if(G.level){ C.mark('level'); bub(L(['眼睛看前面……這樣嗎？','Eyes straight ahead… like this?','มองตรงไปข้างหน้า… แบบนี้ใช่ไหม?']),1600); } else C.done.delete('level'), C.paint(); drawFig(); dropBoard(); next(); }); }
  function drawBoard(){ board.setAttribute('transform',`translate(0,${G.boardY})`); }
  function dropBoard(){ if(G.touch&&!G.read){ G.boardY=top(); drawBoard(); } }
  slip.addEventListener('pointerdown',e=>{ if(C.finished||G.read||!G.slip) return; e.stopPropagation(); G.slip=false; sfx.pop(); C.mark('shoes'); drawFig(); dropBoard(); next(); });
  // drag her to the wall
  fig.addEventListener('pointerdown',e=>{ if(C.finished||G.read||e.target.closest('#htHead')) return; e.preventDefault(); const p0=pt(e), x0=G.x; try{ fig.setPointerCapture(e.pointerId); }catch(_){}
    const mv=ev=>{ const p=pt(ev); G.x=Math.max(60,Math.min(XW,x0+p.x-p0.x)); drawFig(); };
    const up=()=>{ fig.removeEventListener('pointermove',mv); fig.removeEventListener('pointerup',up); fig.removeEventListener('pointercancel',up);
      if(G.x>XW-24){ G.x=XW; G.wall=true; C.mark('wall'); sfx.select(); bub(L(['靠好了。','Against the wall.','ชิดผนังแล้ว']),1200); } else { G.wall=false; C.done.delete('wall'); C.paint(); C.text(); } drawFig(); next(); };
    fig.addEventListener('pointermove',mv); fig.addEventListener('pointerup',up); fig.addEventListener('pointercancel',up); });
  // the headboard slides down the pole and stops on her head (only when she stands at the wall)
  const WALL1=['先讓她貼牆站好，頭板才量得到','Get her against the wall first','ให้ป้ายืนชิดผนังก่อน แผ่นวัดถึงจะวัดได้'];
  const lower=()=>{ G.touch=true; G.boardY=top(); drawBoard(); C.mark('board'); sfx.select(); next(); };
  board.addEventListener('pointerdown',e=>{ if(C.finished||G.read) return; e.preventDefault(); e.stopPropagation(); const p0=pt(e), y0=G.boardY; let moved=0; try{ board.setPointerCapture(e.pointerId); }catch(_){}
    const lim=()=>G.wall?top():FLOOR-20;
    const mv=ev=>{ const p=pt(ev); moved=Math.max(moved,Math.abs(p.y-p0.y)); G.boardY=Math.max(20,Math.min(lim(),y0+p.y-p0.y)); drawBoard(); };
    const up=()=>{ board.removeEventListener('pointermove',mv); board.removeEventListener('pointerup',up); board.removeEventListener('pointercancel',up);
      if(!G.wall){ G.boardY=30; drawBoard(); sfx.error(); C.hint(L(WALL1)); return; }
      if(moved<10){ if(G.touch) read(); else lower(); return; }
      if(G.boardY>=top()-6) lower(); else { G.touch=false; C.done.delete('board'); C.paint(); C.hint(L(['頭板要往下碰到頭頂','Bring the headboard down until it touches her head','เลื่อนแผ่นวัดลงจนแตะศีรษะ'])); } };
    board.addEventListener('pointermove',mv); board.addEventListener('pointerup',up); board.addEventListener('pointercancel',up); });
  // read: tap the scale once the board rests on her head (tapping it too early says what is missing)
  svg.addEventListener('pointerdown',e=>{ if(C.finished||G.read!=null||e.target.closest('#htFig,#htSlip,#htBoard')) return; const p=pt(e); if(p.x<POLE-90||p.x>POLE+110) return;
    if(!G.wall){ sfx.error(); C.hint(L(WALL1)); return; } if(!G.touch){ lower(); return; } read(); });
  function read(){ if(G.read!=null) return;
    G.read=+hCm().toFixed(1); if(G.slip) C.err('shoes'); if(!G.level) C.err('level'); C.mark('read'); sfx.get();
    $('#htRead').style.display=''; $('#htRead').setAttribute('transform',`translate(0,${Math.max(10,G.boardY-42)})`); $('#htVal').textContent=G.read.toFixed(1)+' cm'; $('#htToday').textContent=G.read.toFixed(1)+' cm';
    $('#htDiff').disabled=false; $('#htCheck').disabled=false; C.hint(''); next();
    if(matchMedia('(pointer:fine)').matches) try{ $('#htDiff').focus({preventScroll:true}); }catch(_){} }   // a phone keyboard popping up on its own covers the game
  $('#htCheck').onclick=()=>{ if(C.finished||G.read==null) return; const v=parseFloat(String($('#htDiff').value).replace(',','.')); if(isNaN(v)){ sfx.error(); return; }
    if(Math.abs(v)>=100){ sfx.error(); C.hint(L(['這格填「矮了幾公分」（2018 年 162 − 今天），不是今天的身高','This box is how many cm shorter (162 in 2018 − today), not today\'s height','ช่องนี้กรอก "เตี้ยลงกี่ ซม." (162 ปี 2018 − วันนี้) ไม่ใช่ส่วนสูงวันนี้'])); return; }   // 2 of 18 typed the height itself (9 Nov 2026)
    const want=+(162-G.read).toFixed(1); if(Math.abs(Math.abs(v)-want)>0.15) C.err('compare'); C.mark('compare'); $('#htCheck').disabled=true;
    bub(L(['……我真的變矮了？','…I really did get shorter?','…ป้าเตี้ยลงจริงๆ เหรอ?'])); C.later(()=>C.finish({cm:G.read, diff:v}),1100); };
  const HTN={read:['還沒讀出身高喔……就這樣結束嗎？','Her height hasn\'t been read yet… finish now?','ยังไม่ได้อ่านค่าส่วนสูงเลย… จะจบแค่นี้เหรอ?'], diff:['還沒算她矮了幾公分喔……就這樣結束嗎？','You haven\'t worked out how much shorter she is… finish now?','ยังไม่ได้บอกเลยว่าป้าเตี้ยลงกี่ ซม.… จะจบแค่นี้เหรอ?']};
  const nudged=new Set();
  function done(){ const k=C.ex?null:G.read==null?'read':!C.done.has('compare')?'diff':null;   // a step still missing: say so once (practice)
    if(k&&!nudged.has(k)){ nudged.add(k); sfx.error(); bub(L(HTN[k]),2800); next(); return; }
    if(G.read==null) C.errs.add('noRead'); else if(!C.done.has('compare')) C.errs.add('compare'); C.finish({cm:G.read}); }
  drawFig(); drawBoard(); C.paint(); C.text(); next();
  bub(L(['要量喔？我穿著拖鞋就好啦。','Measure me? I\'ll keep my slippers on.','จะวัดเหรอ? ใส่รองเท้าแตะไว้ก็ได้มั้ง']));
  return C.result;
}

