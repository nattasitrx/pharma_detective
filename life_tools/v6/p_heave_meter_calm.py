import sys
f=sys.argv[1]; s=open(f,encoding='utf-8').read()
def sub(a,b,n=1):
    global s; assert s.count(a)==n,(a[:90],s.count(a)); s=s.replace(a,b)
# ---- CSS
sub("#holdL{font:400 14px/1.4 'Sarabun',sans-serif;color:var(--soft);text-align:center;min-height:1.4em}",
"#holdL{font:400 14px/1.4 'Sarabun',sans-serif;color:var(--soft);text-align:center;min-height:1.4em;order:-3}\n.mtw{order:-2;display:flex;align-items:center;gap:8px;font:600 12px/1 'Sarabun',sans-serif;color:var(--soft)}.mtw span{min-width:22px;text-align:right}.mtw div{width:210px;height:10px;border-radius:9px;background:#ecdcc0;overflow:hidden}.mtw i{display:block;height:100%;width:0;border-radius:9px;background:var(--terra)}#mb i{background:#e9a646;width:100%}\n#app.calm *,#app.calm *::before,#app.calm *::after{animation-duration:.01s!important;animation-iteration-count:1!important}")
# ---- helpers + calm
sub("const FF=()=>RQ.length>0, QUICK=()=>FAST||FF();",
"const FF=()=>RQ.length>0, QUICK=()=>FAST||FF();\nlet CALM=false; try{ const c=localStorage.getItem('lee7calm'); CALM=c==='1'||(c==null&&matchMedia('(prefers-reduced-motion: reduce)').matches); }catch(e){}\nfunction setCalm(v){ CALM=!!v; try{ localStorage.setItem('lee7calm',CALM?'1':'0'); }catch(e){} $('#app').classList.toggle('calm',CALM); const b=$('#pCalm'); if(b) b.textContent='ลดการเคลื่อนไหว: '+(CALM?'เปิดอยู่':'ปิดอยู่'); if(S&&S.pic) camera(S.pic); }\n/* progress shown above the button, where a finger does not cover it */\nconst MT=(lab,two)=>`<div class=\"mtw\"><span>${lab||''}</span><div id=\"mt\"><i></i></div></div>`+(two?`<div class=\"mtw\"><span>ลม</span><div id=\"mb\"><i></i></div></div>`:'');\nconst mt=(p,q)=>{ const e=$('#mt i'); if(e) e.style.width=(Math.max(0,Math.min(1,p))*100)+'%'; if(q!=null){ const g=$('#mb i'); if(g){ g.style.width=(Math.max(0,Math.min(1,q))*100)+'%'; g.style.background=q<.35?'#e0435a':'#e9a646'; } } };")
sub("if(camAnim) camAnim.cancel();\n  camAnim=","if(camAnim) camAnim.cancel(); if(CALM){ $('#cam').style.transform=f(c[0]); camAnim=null; return; } $('#cam').style.transform='';\n  camAnim=")
sub("nx.style.transitionDuration=(QUICK()?30:(ms||2000))+'ms';","nx.style.transitionDuration=(QUICK()?30:CALM?Math.min(ms||2000,500):(ms||2000))+'ms';")
sub("async function black(on,ms){ const b=$('#black');","async function black(on,ms){ if(CALM) ms=Math.min(ms||1600,600); const b=$('#black');")
sub("return (prog,k,bob,sx,rot)=>{ z.style.transform=","return (prog,k,bob,sx,rot)=>{ if(CALM) bob=sx=rot=0; z.style.transform=")
sub("function hearts(x,y){ if(FF()) return;","function hearts(x,y){ if(FF()||CALM) return;")
sub("const bob=Math.sin(ph)*1.1*(down?1:.25), sx=","const bob=CALM?0:Math.sin(ph)*1.1*(down?1:.25), sx=CALM?0:")
sub("rot=night?Math.sin(now/1300)*2.4*(.3+prog):0; z.style.transform=","rot=night&&!CALM?Math.sin(now/1300)*2.4*(.3+prog):0; z.style.transform=")
# ---- hold / holdFail meters
sub("a.innerHTML=`<div id=\"holdW\"><button id=\"hold\"><span>${label}</span></button><div id=\"holdL\">${hint||''}</div></div>`;\n  const b=$('#hold'); let p=0, down=false, last=performance.now(), done=false;",
    "a.innerHTML=`<div id=\"holdW\">${MT('')}<button id=\"hold\"><span>${label}</span></button><div id=\"holdL\">${hint||''}</div></div>`;\n  const b=$('#hold'); let p=0, down=false, last=performance.now(), done=false;")
sub("p=Math.max(0,Math.min(1,p+(down?dt/(FAST?60:ms):-dt/(ms*.7)))); b.style.setProperty('--p',p);\n    if(p>=1){ done=true; sfx.warm();","p=Math.max(0,Math.min(1,p+(down?dt/(FAST?60:ms):-dt/(ms*.7)))); b.style.setProperty('--p',p); mt(p);\n    if(p>=1){ done=true; sfx.warm();")
sub("function holdFail(label, ms, at){ return new Promise(res=>{ const a=$('#acts'); a.innerHTML=`<div id=\"holdW\"><button","function holdFail(label, ms, at){ return new Promise(res=>{ const a=$('#acts'); a.innerHTML=`<div id=\"holdW\">${MT('ลุก')}<button")
sub("    b.style.setProperty('--p',p); requestAnimationFrame(loop); })(last); }); }\nfunction reportCard","    b.style.setProperty('--p',p); mt(p); requestAnimationFrame(loop); })(last); }); }\nfunction reportCard")
# ---- steps / feel / rush / walk meters
sub("a.innerHTML=`<div id=\"holdW\"><div id=\"feet\">","a.innerHTML=`<div id=\"holdW\">${MT('ทาง')}<div id=\"feet\">")
sub("    set(prog,K,bobv*1.6,shake*Math.sin(now/36)*1.5,0); requestAnimationFrame(loop);","    mt((prog-from)/Math.max(.001,1-from)); set(prog,K,bobv*1.6,shake*Math.sin(now/36)*1.5,0); requestAnimationFrame(loop);")
sub("a.innerHTML=`<div id=\"holdW\"><div id=\"rail\">","a.innerHTML=`<div id=\"holdW\">${MT('ทาง')}<div id=\"rail\">")
sub("knob.style.left=(prog*100)+'%'; fill.style.width=(prog*100)+'%';","knob.style.left=(prog*100)+'%'; fill.style.width=(prog*100)+'%'; mt(prog);")
sub("a.innerHTML=`<div id=\"holdW\"><button id=\"hold\"><span>แตะรัวๆ<br>เพื่อรีบ</span></button>","a.innerHTML=`<div id=\"holdW\">${MT('ทาง',1)}<button id=\"hold\"><span>แตะรัวๆ<br>เพื่อรีบ</span></button>")
sub("b.style.setProperty('--p',breath); vig.style.opacity=Math.pow(1-breath,1.3).toFixed(2);","b.style.setProperty('--p',breath); mt(prog,breath); vig.style.opacity=Math.pow(1-breath,1.3).toFixed(2);")
sub("a.innerHTML=`<div id=\"holdW\"><button id=\"hold\"><span>กดค้าง<br>เพื่อเดิน</span></button>","a.innerHTML=`<div id=\"holdW\">${MT('ทาง',1)}<button id=\"hold\"><span>กดค้าง<br>เพื่อเดิน</span></button>")
sub("b.style.setProperty('--p',breath); vig.style.opacity=Math.pow(1-breath,1.4).toFixed(2);","b.style.setProperty('--p',breath); mt(prog,breath); vig.style.opacity=Math.pow(1-breath,1.4).toFixed(2);")
# ---- heave
sub("function card(k,extra){","""/* getting up: heave, run out of strength, sink back a little, heave again */
function heave(label, ms, hintT, glow){ return new Promise(res=>{ const a=$('#acts'); a.innerHTML=`<div id="holdW">${MT('ลุก')}<button id="hold"><span>${label}</span></button><div id="holdL">${hintT||'กดค้างเพื่อยันตัว · แรงหมดให้ปล่อยพัก'}</div></div>`;
  const b=$('#hold'), L=$('#holdL'), bl=$('#black'); let p=0, s=1, down=false, last=performance.now(), done=false, gave=false, n=0; if(glow) bl.style.transitionDuration='120ms';
  if(FAST){ setTimeout(()=>{ a.innerHTML=''; res(1); },30); return; }
  b.onpointerdown=e=>{ e.preventDefault(); if(done) return; if(s<.3){ L.textContent='ยังไม่มีแรง… หายใจก่อน'; return; } down=true; gave=false; n++; b.classList.add('down'); burst(240,.7,.1,.4); L.textContent=n===1?'ฮึบ…':n===2?'ฮึ้บบ…':'ฮึ้บบบบ…'; };
  b.onpointerup=b.onpointerleave=b.onpointercancel=()=>{ if(down&&!done) L.textContent=p>.7?'อีกนิดเดียว… หายใจ แล้วฮึบอีกที':'ตัวเอนกลับลงไป… หายใจ แล้วฮึบอีกที'; down=false; b.classList.remove('down'); };
  (function loop(now){ if(done) return; const dt=Math.min(60,now-last); last=now;
    if(down){ if(s>0){ p+=dt/(ms*.55)*(.35+.65*s); s=Math.max(0,s-dt/1000); } else { if(!gave){ gave=true; sfx.low(); b.classList.add('lock'); L.textContent='แขนสั่น… ปล่อยมือก่อน'; } p-=dt/900; } }
    else { s=Math.min(1,s+dt/850); if(s>=.3) b.classList.remove('lock'); p-=dt/(ms*1.7); }
    p=Math.max(0,Math.min(1,p)); b.style.setProperty('--p',s); mt(p); if(glow) bl.style.opacity=(1-p*.6).toFixed(3); if(gave&&down&&!CALM) b.style.transform=`translateX(${(Math.sin(now/30)*2).toFixed(1)}px)`; else b.style.transform='';
    if(p>=1){ done=true; sfx.warm(); a.innerHTML=''; res(n); return; } requestAnimationFrame(loop); })(last); }); }
function card(k,extra){""")
sub("async function rise(ms, hint){ await say('หนึ่ง… สอง…',{stay:1,q:1}); await hold('กดค้าง<br>เพื่อลุก', ms, hint||''); await show('dawn',60);","async function rise(ms, hint){ await show('dawn',60); await say('หนึ่ง… สอง…',{stay:1,q:1}); await heave('กดค้าง<br>เพื่อลุก', ms, hint||'', 1);")
sub("  await hold('กดค้าง<br>เพื่อลุก', 3600, 'ถ้าปล่อยมือ ลุงจะเอนกลับลงไป');\n  await show('dawn',60); clock('05:52');","  await show('dawn',60); await heave('กดค้าง<br>เพื่อลุก', 3600, '', 1);\n  clock('05:52');")
sub("await hold('กดค้าง<br>เพื่อลุก',5600,'ช้าๆ… เกาะขอบอ่าง');","await heave('กดค้าง<br>เพื่อลุก',4400,'ช้าๆ… เกาะขอบอ่าง');")
sub("['choose','hold','holdFail',","['choose','hold','heave','holdFail',")
# ---- pause overlay toggle
sub("<button class=\"btn\" id=\"pHome\">กลับหน้าแรก</button>","<button class=\"btn\" id=\"pCalm\"></button><button class=\"btn\" id=\"pHome\">กลับหน้าแรก</button>")
sub("$('#pGo').onclick=","$('#pCalm').onclick=()=>setCalm(!CALM); setCalm(CALM);\n$('#pGo').onclick=")
sub("lee7run3","lee7run4",s.count("lee7run3"))
open(f,'w',encoding='utf-8').write(s); print('p1 ok')
