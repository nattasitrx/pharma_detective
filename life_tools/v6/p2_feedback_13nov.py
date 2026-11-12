import sys,re
f=sys.argv[1]; s=open(f,encoding='utf-8').read()
def sub(a,b,n=1):
    global s; assert s.count(a)==n,(a[:90],s.count(a)); s=s.replace(a,b)
def cut(a,b,new):
    global s; i=s.index(a); j=s.index(b,i); assert s.count(a)==1; s=s[:i]+new+s[j:]
# ---- green inhaler: two puffs, cap closed before the second turn
cut("async function greenRoutine(full){","\nfunction hearts(","""async function greenRoutine(full){ card('lee_resp_closed');
  for(let k=0;k<2;k++){
    await say(k?'พัฟที่สอง ฝาปิดแล้ว จึงหมุนอีกครั้ง\\nหมุน':full?'แถวพระอาทิตย์ จุดสีเขียวมาก่อน\\nหมุน':'หมุน',{stay:1,q:!full||k>0}); await rub('x',full&&!k?1.1:.6,'ลากนิ้วซ้าย-ขวาที่ฐานใส เพื่อหมุน'); note(1500,.06,.09,'square');
    await say('เปิด',{stay:1,q:1}); await flick('up','ปัดนิ้วขึ้น เพื่อเปิดฝา'); { const c2=$('#cimg2'); c2.src=src('lee_resp_open'); try{ await c2.decode(); }catch(e){} c2.style.transitionDuration='500ms'; c2.style.opacity=1; }
    await say('กด',{stay:1,q:1}); await breathPress();
    await say(k?'ปิด':'ปิดฝาก่อน',{stay:1,q:1}); await flick('down','ปัดนิ้วลง เพื่อปิดฝา'); $('#cimg2').style.opacity=0; sfx.tick(); }
  cardOff(); }
""")
# ---- heave: slower, button at the side, tall bars
cut("function heave(label, ms, hintT, glow){","function card(k,extra){","""function heave(label, ms, hintT, glow){ return new Promise(res=>{ const a=$('#acts'); a.innerHTML=`<div id="holdW"><div id="holdL">${hintT||'กดค้างเพื่อยันตัว · แรงหมดให้ปล่อยพัก'}</div><div id="hv"><div class="vm"><div><i id="vp"></i></div><span>ลุก</span></div><div class="vm s"><div><i id="vs"></i></div><span>แรง</span></div><button id="hold" class="flat"><span>${label}</span></button></div></div>`;
  const b=$('#hold'), L=$('#holdL'), vp=$('#vp'), vs=$('#vs'), bl=$('#black'); let p=0, s=1, down=false, last=performance.now(), done=false, gave=false, n=0; if(glow) bl.style.transitionDuration='160ms';
  if(FAST){ setTimeout(()=>{ a.innerHTML=''; res(1); },30); return; }
  b.onpointerdown=e=>{ e.preventDefault(); if(done) return; if(s<.3){ L.textContent='ยังไม่มีแรง… หายใจก่อน'; return; } down=true; gave=false; n++; b.classList.add('down'); smp('grunt',.5,.95+Math.random()*.1)||burst(240,.7,.1,.4); L.textContent=n===1?'ฮึบ…':n===2?'ฮึ้บบ…':'ฮึ้บบบบ…'; };
  b.onpointerup=b.onpointerleave=b.onpointercancel=()=>{ if(down&&!done) L.textContent=p>.7?'อีกนิดเดียว… หายใจ แล้วฮึบอีกที':'ตัวเอนกลับลงไป… หายใจ แล้วฮึบอีกที'; down=false; b.classList.remove('down'); };
  (function loop(now){ if(done) return; const dt=Math.min(60,now-last); last=now;
    if(down){ if(s>0){ p+=dt/(ms*.9)*(.4+.6*s); s=Math.max(0,s-dt/2400); } else { if(!gave){ gave=true; sfx.low(); b.classList.add('lock'); L.textContent='แขนสั่น… ปล่อยมือก่อน'; } p-=dt/1800; } }
    else { s=Math.min(1,s+dt/1600); if(s>=.3) b.classList.remove('lock'); p-=dt/(ms*2.6); }
    p=Math.max(0,Math.min(1,p)); vp.style.height=(p*100)+'%'; vs.style.height=(s*100)+'%'; vs.style.background=s<.3?'#e0435a':'#e9a646'; if(glow) bl.style.opacity=(1-p*.6).toFixed(3); b.style.transform=gave&&down&&!CALM?`translateX(${(Math.sin(now/30)*2).toFixed(1)}px)`:'';
    if(p>=1){ done=true; sfx.warm(); a.innerHTML=''; res(n); return; } requestAnimationFrame(loop); })(last); }); }
""")
sub("#app.calm *,","#hv{display:flex;align-items:flex-end;gap:16px}.vm{display:flex;flex-direction:column;align-items:center;gap:4px;font:600 12px/1 'Sarabun',sans-serif;color:var(--soft)}.vm div{position:relative;width:34px;height:112px;border-radius:12px;background:#ecdcc0;overflow:hidden}.vm.s div{width:16px}.vm i{position:absolute;left:0;right:0;bottom:0;height:0;border-radius:12px;background:var(--terra)}.vm.s i{background:#e9a646;height:100%}#hold.flat{background:#ecdcc0;margin-left:14px}\n#tr.on{position:absolute;right:12px;top:38px}\n#arch{position:absolute;inset:0;z-index:40;display:none;flex-direction:column;align-items:center;gap:20px;overflow-y:auto;background:#241a15;padding:18px 20px 50px}#arch.on{display:flex}#arch .pg{flex:none;width:100%;max-width:370px;background:repeating-linear-gradient(#fffaf0 0 31px,#e6d5b6 31px 32px);border-radius:4px;padding:16px 22px 22px;box-shadow:0 18px 50px rgba(0,0,0,.5);font:400 17.5px/32px 'Mali',cursive;text-align:left;color:var(--ink)}#arch .pg b{display:block;font-weight:600;color:var(--terra)}#arch .pg p{margin:0}#arch .pg p.last{font-weight:600}#arch .pg p.reply{font:400 21px/30px 'Charmonman','Mali',cursive;color:#3e5f8a;opacity:.88;margin-top:10px;transform:rotate(-2deg);white-space:pre-line}#arch .x{position:sticky;top:0;z-index:2;flex:none;opacity:1;transform:none;animation:none;text-align:center;min-width:200px}#arch h2{margin:6px 0 0;font:600 20px/1.4 'Noto Serif Thai',serif;color:#fff8ea}\n#archB{opacity:1;transform:none;animation:none;text-align:center;min-width:220px;display:none}\n#app.calm *,")
# ---- archive of the nightly reports
sub("function reportCard(title, lines, last, sign, next, extra, reply){ return new Promise(async res=>{","function reportCard(title, lines, last, sign, next, extra, reply){ if(RUNDAY){ P.rep=P.rep||{}; P.rep[RUNDAY]={title,lines,last,sign,reply:reply||''}; } return new Promise(async res=>{")
sub("<button class=\"btn go\" id=\"start\">เริ่มต้นวัน</button>","<button class=\"btn go\" id=\"start\">เริ่มต้นวัน</button>\n    <button class=\"btn\" id=\"archB\">📖 อ่านบันทึกย้อนหลัง</button>")
sub("<div id=\"pause\">","<div id=\"arch\"></div><div id=\"pause\">")
sub("$('#pCalm').onclick=","""function archive(){ const R=P.rep||{}, pl=t=>typeof t==='string'?t:`<s>${t.strike}</s>`; $('#arch').innerHTML='<button class="btn x">ปิดสมุด</button><h2>สมุดรายงานถึงแม่</h2>'+[1,2,3,4,5,6,7].filter(n=>R[n]).map(n=>{ const r=R[n]; return `<div class="pg"><b>${r.title}</b>`+r.lines.map(t=>`<p>${pl(t)}</p>`).join('')+`<p class="last">${r.last}</p><p style="white-space:pre-line">${r.sign}</p>`+(r.reply?`<p class="reply">${r.reply}</p>`:'')+'</div>'; }).join(''); $('#arch').classList.add('on'); $('#arch').scrollTop=0; $('#arch .x').onclick=()=>$('#arch').classList.remove('on'); }
if(P.rep&&Object.keys(P.rep).length) $('#archB').style.display='block'; $('#archB').onclick=archive;
$('#pCalm').onclick=""")
# ---- soy-milk seller is a man; Ah-Mei at the bus stop gets her own picture
sub("ไม่ได้ลงมาตั้งนานเลยนะคะ\"'","ไม่ได้ลงมาตั้งนานเลยนะครับ\"'")
sub("'ผมเงยหน้าขึ้นมอง\\nหน้าต่างชั้นสี่ ม่านสีอิฐ จากข้างล่าง มันเล็กนิดเดียว','ที่ป้ายรถเมล์ อาเหมยเพิ่งก้าวลงมา ยังสวมชุดทำงาน',","'ผมเงยหน้าขึ้นมอง\\nหน้าต่างชั้นสี่ ม่านสีอิฐ จากข้างล่าง มันเล็กนิดเดียว']);\n  await show('busstop',2600);\n  await say(['ที่ป้ายรถเมล์ อาเหมยเพิ่งก้าวลงมา ยังสวมชุดทำงาน',")
sub("const IMG={hands:1,","const IMG={busstop:1,hands:1,")
# ---- ending made plain
cut("  dn.textContent='จดหมายถูกพับวางไว้ข้างโทรศัพท์'; dn.classList.add('on'); await W(4200);","const DAYS={1:day1","""  dn.textContent='เช้าวันอังคาร · 07:00\\nจดหมายพับวางรออยู่ข้างโทรศัพท์'; dn.classList.add('on'); await W(4600);
  sfx.ring(); dn.textContent='กริ่งแรก\\nวันนี้ผมไม่ต้องแกล้งว่ากำลังยุ่ง'; await W(3400);
  sfx.ring(); dn.textContent='กริ่งที่สอง…\\n(แตะที่โทรศัพท์ เพื่อรับสาย)';
  await io(()=>new Promise(res=>{ const el=$('#endph'); const t=setInterval(()=>sfx.ring(),3200); const f=()=>{ clearInterval(t); el.onclick=null; res(0); }; el.onclick=f; if(FAST) setTimeout(f,20); }));
  sfx.soft(); dn.textContent='"เหล่าหลี่ กินยาเช้าหรือยังคะ"'; await W(3800);
  dn.textContent='"กินแล้ว"\\n"วันนี้ผมนั่งรอเธอโทรมา"'; await W(5200);
  dn.classList.remove('on'); await W(1400); pg.style.opacity=0; await W(2600); pg.style.display='none'; pg.style.background=''; pg.style.padding=''; dn.classList.add('big');
  for(const t of ['สำหรับคุณ\\nมันคือการเยี่ยมบ้านหนึ่งชั่วโมง','สำหรับเขา\\nมันคือเจ็ดวันนี้','และทุกเช้าหลังจากนี้ ที่เขารับโทรศัพท์']){ dn.textContent=t; dn.classList.add('on'); await W(4400); dn.classList.remove('on'); await W(2400); }
  dn.textContent='เจ็ดวันของลุงหลี่'; dn.classList.add('on'); await W(1500); }

""")
sub("lee7run4","lee7run5",s.count("lee7run4"))
open(f,'w',encoding='utf-8').write(s)
open(sys.argv[2],'w').write('\n'.join(re.findall(r'<script>(.*?)</script>',s,re.S))); print('p2 ok')
