import sys
f=sys.argv[1]; s=open(f,encoding='utf-8').read()
def sub(a,b,n=1):
    global s; assert s.count(a)==n,(a[:100],s.count(a)); s=s.replace(a,b)
# ================= hypo rescue =================
sub("""  noRecheck:['處理後要再測一次，確定回到 70 以上',""","""  tooLong:['等太久才重測：15 分鐘就該再測一次，還低的話才能及時再給糖','Waited too long — recheck at 15 minutes, so a second dose is not delayed if she is still low','รอนานเกินไป ควรวัดซ้ำที่ 15 นาที ถ้ายังต่ำจะได้ให้น้ำตาลซ้ำได้ทัน'],
  noRecheck:['處理後要再測一次，確定回到 70 以上',""")
sub("""['wait',['點「⏩ 等 15 分鐘」','Tap "⏩ Wait 15 min"','แตะ "⏩ รอ 15 นาที"'],'⏱️','#cgWait15',""","""['wait',['選「⏩ 15 分鐘」：等 15 分鐘再重測','Choose "⏩ 15 min": wait 15 minutes, then recheck','เลือก "⏩ 15 นาที": รอ 15 นาทีแล้วค่อยวัดซ้ำ'],'⏱️','#cgWaitBox button[data-m="15"]',""")
# the wait is a decision the student makes (5 / 15 / 30 min), shown in the middle of the table once sugar has been given
sub("""<span id="cgWait" style="font-size:32px;color:#3a2a1c">+0 ${esc(L(FLOWG.min))}</span><br><button class="gbtn gray" id="cgWait15" style="font-size:19px;padding:8px 16px;margin-top:6px">${esc(L(FLOWG.wait15))}</button></div>""",
"""<span id="cgWait" style="font-size:32px;color:#3a2a1c">+0 ${esc(L(FLOWG.min))}</span></div>
    <div class="cg-read" id="cgWaitBox" style="left:350px;top:150px;width:520px;display:none"><div style="font-weight:900;font-size:25px;color:#5a4a3a;margin-bottom:12px">⏱️ ${esc(L(['給糖之後，等多久再重測血糖？','After the sugar: how long until you recheck?','ให้น้ำตาลแล้ว รอนานเท่าไรค่อยวัดซ้ำ?']))}</div><div style="display:flex;gap:14px;justify-content:center">${[5,15,30].map(m=>`<button class="gbtn gold" data-m="${m}" style="font-size:27px;padding:14px 20px">⏩ ${m} ${esc(L(FLOWG.min))}</button>`).join('')}</div></div>""")
sub("const G={bg:58, g:0, roundG:0, waited:-1, checked:false,","const G={bg:58, g:0, roundG:0, waited:0, checked:false,")
sub("""    wonder:['15 分鐘了……我的血糖上來了沒？',""","""    just:['才剛吃下去，數值還不會變……要等多久再測呢？','I only just had it — the reading won\\'t have moved yet… how long shall we wait?','เพิ่งกินไปเอง ค่ายังไม่เปลี่ยนหรอก… รอนานเท่าไรดี?'],
    ago:['這是 {m} 分鐘前的數值','That was {m} minutes ago','ค่านี้วัดเมื่อ {m} นาทีที่แล้ว'],
    wonder:['15 分鐘了……我的血糖上來了沒？',""")
sub("""  const glowMeter=()=>{ if(!C.ex) tile('meter').classList.add('cg-glow'); };""",
"""  const glowMeter=()=>{ if(!C.ex) tile('meter').classList.add('cg-glow'); };
  const box=$('#cgWaitBox'), boxOn=on=>{ box.style.display=on?'':'none'; if(!on) box.classList.remove('cg-glow'); };
  const gave=()=>{ boxOn(true); if(G.roundG>=15) C.mark('treat'); };   // enough sugar is in: the next decision is the wait
  let juiceT=0;   // a double tap on the juice is not a second half cup""")
sub("""    if(G.waited<15){ C.err('tooSoon'); show(60); return; }""",
"""    if(G.waited<=0){ show(G.bg); bub(L(HY.just),2600); if(!C.ex) box.classList.add('cg-glow'); return; }   // no time has passed yet: nothing to read, nothing to mark down
    if(G.waited<15){ C.err('tooSoon'); show(62); bub(L(['還是有點暈……','Still a bit dizzy…','ยังเวียนหัวอยู่นิด…']),2000); return; }""")
sub("""G.roundG=0; G.waited=-1; $('#cgWait').textContent='+0 '+L(FLOWG.min); C.unmark('treat','wait','recheck'); } });""",
    """G.roundG=0; G.waited=0; boxOn(false); $('#cgClock').innerHTML=cgClockSVG(0); $('#cgWait').textContent='+0 '+L(FLOWG.min); C.unmark('treat','wait','recheck'); } });""")
sub("""    G.g+=4; G.roundG+=4; $('#cgG').textContent=G.g; sfx.chew(); bub(L(['（嚼一顆葡萄糖錠）','(chews a glucose tablet)','(เคี้ยวเม็ดกลูโคส)']),900);
    if(G.roundG>24) C.err('tooMuch'); C.guide(); });""","""    G.g+=4; G.roundG+=4; $('#cgG').textContent=G.g; sfx.chew(); bub(L(['（嚼一顆葡萄糖錠）','(chews a glucose tablet)','(เคี้ยวเม็ดกลูโคส)']),900);
    if(G.roundG>24) C.err('tooMuch'); gave(); C.guide(); });""")
sub("""tile(k).addEventListener('click',()=>{ if(C.finished||G.ok) return; if(G.waited>=15){ bub(L(FLOWG.recheckFirst),1400); return; }
    G.g+=g; G.roundG+=g; $('#cgG').textContent=G.g; k==='juice'?sfx.sip():sfx.chew(); bub(L(say),900);
    if(G.roundG>24) C.err('tooMuch'); C.guide(); }));""","""tile(k).addEventListener('click',()=>{ if(C.finished||G.ok) return; if(G.waited>=15){ bub(L(FLOWG.recheckFirst),1400); return; }
    if(k==='juice'){ const n=performance.now(); if(n-juiceT<700) return; juiceT=n; }
    G.g+=g; G.roundG+=g; $('#cgG').textContent=G.g; k==='juice'?sfx.sip():sfx.chew(); bub(L(say),900);
    if(G.roundG>24) C.err('tooMuch'); gave(); C.guide(); }));""")
a=s.index("  $('#cgWait15').onclick=()=>{"); b=s.index("  function done(){   // a step still missing: she says so once per step (practice), the next Done ends the game")
s=s[:a]+"""  box.querySelectorAll('button').forEach(wb=>wb.onclick=()=>{ if(C.finished||G.busy) return; if(!G.roundG){ bub(L(FLOWG.treatFirst),1400); sfx.error(); return; }
    if(G.waited>=15){ bub(L(FLOWG.recheckFirst),1400); glowMeter(); return; }
    const end=G.waited+(+wb.dataset.m); C.mark('treat'); G.busy=true; sfx.whoosh(); box.classList.remove('cg-glow'); let m=G.waited;
    const iv=setInterval(()=>{ m++; $('#cgClock').innerHTML=cgClockSVG(m); $('#cgWait').textContent='+'+m+' '+L(FLOWG.min); if(m%5===0) sfx.tick(); if(m<end) return;
      clearInterval(iv); G.waited=end; G.busy=false; const e=$('#cgBg'); e.style.color='#b8aca0';
      if(end>=30) C.err('tooLong');
      if(end>=15){ C.mark('wait'); $('#cgBgOld').textContent=L(HY.old); bub(L(C.ex?HY.passed:HY.wonder)); glowMeter(); }
      else { $('#cgBgOld').textContent=L(HY.ago).replace('{m}',end); bub(L(['（過了 '+end+' 分鐘）','('+end+' minutes later)','(ผ่านไป '+end+' นาที)']),1800); } },70); });
"""+s[b:]
# ================= Fosamax morning =================
# tapping the tablet before any water is poured is not "swallowing it dry": she picks it up and asks what to take it with
sub("""  function swallow(){ if(G.swallowed||G.pouring) return; if(!G.ml) C.err('dry'); else if(G.kind==='bad') C.err('wrongDrink');""",
"""  function swallow(){ if(G.swallowed||G.pouring) return;
    if(!G.ml){ sfx.blip('chen'); bub(L(['（拿起藥）要配什麼喝呢？','(picks up the tablet) What shall I take it with?','(หยิบยาขึ้นมา) จะกินกับอะไรดีล่ะ?']),2600); return; }
    if(G.kind==='bad') C.err('wrongDrink');""")
# saying "wait" to something harmless (plain water, sitting, walking) is over-caution, not a mistake: a tip, kept in the result as strict:true
sub("""    if(OKW.has(ev)){ if(ch==='stop'){ C.err('tooStrict'); bub(""","""    if(OKW.has(ev)){ if(ch==='stop'){ if(!G.strict&&!C.ex) toast('💡 '+L(FOSA_ERR.tooStrict)); G.strict=true; bub(""")
sub("C.finish({min:G.min})","C.finish({min:G.min, strict:!!G.strict})",s.count("C.finish({min:G.min})"))
sub("""  const G={ml:0, kind:'water', swallowed:false, wait:false, after:false, min:30, doseAt:null, want:null, wantT:0, gone:new Set(), pouring:false};""",
"""  const G={ml:0, kind:'water', swallowed:false, wait:false, after:false, min:30, doseAt:null, want:null, wantT:0, gone:new Set(), pouring:false, strict:false};
  { const n0=C.note; C.note=out=>(G.strict?`<p class="cg-hn">💡 ${esc(L(FOSA_ERR.tooStrict))}</p>`:'')+(n0?n0(out):''); }""")
open(f,'w',encoding='utf-8').write(s); print('games patched')
# the story script that records the result
g=sys.argv[2]; t=open(g,encoding='utf-8').read()
a="S.calc.fosa={ok:fz.ok, errs:fz.errs}; logEvent({type:'fosaGame', ok:fz.ok, errs:fz.errs});"
assert t.count(a)==1,t.count(a)
t=t.replace(a,"S.calc.fosa={ok:fz.ok, errs:fz.errs, strict:!!fz.strict}; logEvent({type:'fosaGame', ok:fz.ok, errs:fz.errs, strict:!!fz.strict});")
open(g,'w',encoding='utf-8').write(t); print('mk_cgames patched')
