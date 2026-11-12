import sys,re
f=sys.argv[1]; s=open(f,encoding='utf-8').read()
def sub(a,b,n=1):
    global s; assert s.count(a)==n,(a[:90],s.count(a)); s=s.replace(a,b)
# ---- sound: more samples, looping room sounds
sub("['cough','bark','pant','grunt'].forEach(k=>fetch('snd/'+k+'.mp3').then(r=>r.ok?r.arrayBuffer():Promise.reject()).then(b=>AC.decodeAudioData(b,buf=>{ SMP[k]=buf; },()=>{})).catch(()=>{}));",
    "['cough','bark','pant','grunt','knock','gulp','creak','tick','drip','birds'].forEach(k=>fetch('snd/'+k+'.mp3').then(r=>r.ok?r.arrayBuffer():Promise.reject()).then(b=>AC.decodeAudioData(b,buf=>{ SMP[k]=buf; ambSync(); },()=>{})).catch(()=>{}));")
sub("function pant(v){","/* looping room sounds (clock, dripping tap, birds): amb(name, volume) fades one in, amb(name,0) fades it out */\nconst AMB={}, AMBW={};\nfunction amb(k,v){ AMBW[k]=v||0; ambSync(); }\nfunction ambOff(){ Object.keys(AMBW).forEach(k=>AMBW[k]=0); ambSync(); }\nfunction ambSync(){ if(!AC) return; for(const k in AMBW){ const want=FF()?0:AMBW[k], a=AMB[k];\n  if(want>0&&!a&&SMP[k]){ const s=AC.createBufferSource(), g=AC.createGain(); s.buffer=SMP[k]; s.loop=true; g.gain.value=0; s.connect(g); g.connect(master); s.start(); AMB[k]={s,g}; ramp(g,want,1.2); }\n  else if(a&&want>0) ramp(a.g,want,1);\n  else if(a&&!want){ ramp(a.g,0,.8); const o=a.s; delete AMB[k]; setTimeout(()=>{ try{ o.stop(); }catch(e){} },1000); } } }\nfunction pant(v){")
sub("function ffEnd(){ if(!RQ.length) $('#ffw').classList.remove('on'); }","function ffEnd(){ if(!RQ.length){ $('#ffw').classList.remove('on'); if(typeof ambSync==='function') ambSync(); } }")
sub("Object.assign(sfx,{ ring(){ for(let k=0;k<12;k++){ note(1320,.07,.05,'square',k*.09); note(1650,.07,.04,'square',k*.09+.045); } },",
    "Object.assign(sfx,{ ring(){ /* two gongs struck in turn, like the bell of an old dial telephone */ for(let k=0;k<30;k++){ const f=k%2?1865:1568, t=k*.043; note(f,.2,.03,'sine',t); note(f*2.76,.11,.011,'sine',t); note(f*5.4,.05,.004,'sine',t); } },\n  creak(){ smp('creak',.5,.95+Math.random()*.1)||note(1700,.03,.035,'square'); },")
sub("knock(){ for(let k=0;k<3;k++) burst(220,2,.5,.09,k*.34); }","knock(){ if(smp('knock',.8)) return; for(let k=0;k<3;k++) burst(220,2,.5,.09,k*.34); }")
sub("b.onclick=()=>{ k++; note(520+k*40,.18,.05); if(k>=n){ a.innerHTML=''; res(); return; } b.textContent='กลืนเม็ดที่'+W7[k]; };","b.onclick=()=>{ k++; smp('gulp',.55,.92+Math.random()*.16)||note(520+k*40,.18,.05); if(k>=n){ a.innerHTML=''; res(); return; } b.textContent='กลืนเม็ดที่'+W7[k]; };")
# the telephone: the clock is loud while he waits
sub("function ringGame(){ return new Promise(res=>{ const a=$('#acts'); let n=0, done=false, t=null;\n  const fin=r=>{ if(done) return; done=true; clearTimeout(t); a.innerHTML=''; res(r); };",
    "function ringGame(){ return new Promise(res=>{ const a=$('#acts'); let n=0, done=false, t=null; amb('tick',.45);\n  const fin=r=>{ if(done) return; done=true; clearTimeout(t); a.innerHTML=''; amb('tick',0); res(r); };")
sub("t=setTimeout(go,FAST?20:1200);","t=setTimeout(go,FAST?20:2600);")
sub("async function phone(){ clock('06:58');","async function phone(){ clock('06:58'); amb('tick',.4);")
sub("'ผมวางหูลงเบาๆ\\nยังเหลือเสียงไว้ให้โทรศัพท์ดัง หากเธอตื่นขึ้นมาพอดี']);\n}","'ผมวางหูลงเบาๆ\\nยังเหลือเสียงไว้ให้โทรศัพท์ดัง หากเธอตื่นขึ้นมาพอดี']); amb('tick',0);\n}")
sub("while(k<T.length){ clock(T[k][0]); sfx.tick(); await W(520); sfx.tick(); await W(520); sfx.tick(); if(T[k][2])","while(k<T.length){ clock(T[k][0]); if(!SMP.tick){ sfx.tick(); await W(520); sfx.tick(); await W(520); sfx.tick(); } else await W(1400); if(T[k][2])")
sub("await show('dusk',3000); clock('17:30'); sfx.knock();","await show('dusk',3000); clock('17:30'); sfx.creak();")
sub("await say(['เสียงเคาะประตู']); await show('door',1800); sfx.bark();","await say(['เสียงเคาะประตู']); sfx.creak(); await show('door',1800); sfx.bark();")
sub("await show('floor',60); clock('02:19'); await black(false,5000);","await show('floor',60); clock('02:19'); amb('drip',.5); await black(false,5000);")
sub("'ขากลับ ผมไม่ได้นับก้าว',","'ขากลับ ผมไม่ได้นับก้าว',") ; i=s.index("'ขากลับ ผมไม่ได้นับก้าว',"); j=s.index("await black(true,2600); clearTxt(); await W(500); P.money=S.money;",i); s=s[:j]+"amb('drip',0); "+s[j:]
sub("card('exitdoor'); await flick('up','ปัดนิ้วขึ้น เพื่อผลักประตู'); cardOff(); sfx.warm();","card('exitdoor'); await flick('up','ปัดนิ้วขึ้น เพื่อผลักประตู'); cardOff(); sfx.creak(); amb('birds',.35);")
sub("await black(true,1600); ramp(fanG,.05,1); await show('dusk',60); fx('Sun Dust'); clock('16:00'); await black(false,2400);","amb('birds',0); await black(true,1600); ramp(fanG,.05,1); await show('dusk',60); fx('Sun Dust'); clock('16:00'); card('radio'); await black(false,2400);")
sub("await say('เพลงเดิมดังขึ้น\\nผมหลับตา และเห็นลานบ้านที่ชิงเต่าในฤดูหนาว',{stay:1,q:1}); await show('yard_mom',4200);","await say('เพลงเดิมดังขึ้น\\nผมหลับตา และเห็นลานบ้านที่ชิงเต่าในฤดูหนาว',{stay:1,q:1}); cardOff(); await show('yard_mom',4200);")
sub("await show('hands',5200); fx('Sun Dust'); hearts(.5,.5);","await show('hands',5200); fx('Sun Dust');")
sub("function newDay(name){ DAY=name;","function newDay(name){ ambOff(); DAY=name;")
sub("async function day1(){\n  DAY='วันอังคาร';","async function day1(){ ambOff();\n  DAY='วันอังคาร';")
# closing picture: the clock ticks while the telephone rings
sub("dn.textContent='เช้าวันอังคาร · 07:00\\nจดหมายพับวางรออยู่ข้างโทรศัพท์'; dn.classList.add('on');","amb('tick',.4); dn.textContent='เช้าวันอังคาร · 07:00\\nจดหมายพับวางรออยู่ข้างโทรศัพท์'; dn.classList.add('on');")
sub("sfx.soft(); dn.textContent='\"เหล่าหลี่ กินยาเช้าหรือยังคะ\"';","amb('tick',0); sfx.soft(); dn.textContent='\"เหล่าหลี่ กินยาเช้าหรือยังคะ\"';")
# ---- text that did not match its picture / the rest of the story
sub("await say('วันนี้ไม่มีสายจูง มือว่างทั้งสองข้าง',{stay:1,q:1});","await say('วันนี้ไม่มีสายจูง\\nมือหนึ่งถือถุงผ้าใส่บัตรนัด อีกมือเกาะราว',{stay:1,q:1});")
sub("'ศุกร์นี้มีคนนัดจะมา\\nผมยังไม่รู้ว่าจะถามอะไรเขา'","'อีกสามวัน จะมีคนมาเคาะประตูห้องนี้\\nผมยังไม่รู้'")
# ---- pictures: load only the day being played, not all 68 at once
sub("Object.keys(IMG).forEach(k=>{ const i=new Image(); i.src=src(k); });","const LOADED={}; function preload(fs){ const t=fs.map(f=>String(f)).join(' ')+\" 'dawn' 'lee_resp_closed' 'lee_resp_open' 'night' 'letter'\"; (t.match(/'[a-z_0-9]+'/g)||[]).forEach(q=>{ const k=q.slice(1,-1); if(IMG[k]&&!LOADED[k]){ LOADED[k]=1; const i=new Image(); i.src=src(k); } }); }\n['dusk','dawn','morning'].forEach(k=>{ LOADED[k]=1; const i=new Image(); i.src=src(k); });")
sub("RUNDAY=n; LOG=[];","preload(n===1||!DAYS[n]?[day1,morning,phone,pot,toilet,noon,radio,evening,dinner,night,report]:[DAYS[n],greenRoutine]); RUNDAY=n; LOG=[];")
# ---- questions to think about, at the end of the notebook once day 7 is done
sub("+'</div>'; }).join(''); $('#arch').classList.add('on');","+'</div>'; }).join('')+((P.done||0)>=7?'<div class=\"pg\"><b>ชวนคิดหลังเล่นจบ</b><p>ช่วงไหนที่คุณยังจำภาพหรือเสียงได้</p><p>&nbsp;</p><p>คุณรู้สึกอย่างไร ตอนลุงหลี่ถูกถามเรื่องยาข้ามหัว</p><p>&nbsp;</p><p>ถ้าได้ไปเยี่ยมบ้านคนไข้จริง คุณจะทำอะไรต่างจากเดิม</p></div>':''); $('#arch').classList.add('on');")
sub("lee7run5","lee7run6",s.count("lee7run5"))
open(f,'w',encoding='utf-8').write(s)
open(sys.argv[2],'w').write('\n'.join(re.findall(r'<script>(.*?)</script>',s,re.S))); print('p3 ok')
