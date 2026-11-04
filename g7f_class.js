/* =====================================================================
   CLASS OVERVIEW — aggregates every saved/imported session for debriefing
   ===================================================================== */
const CL={
 tClass:['📊 全班概況','📊 Class overview','📊 ภาพรวมชั้นเรียน'],
 clIntro:['彙整這台電腦上的所有紀錄（含匯入的 JSON），找出全班最常卡住的地方，方便課後討論。','Summarises every record on this computer (including imported JSON) to show where the class got stuck — ready for your debrief.','สรุปบันทึกทั้งหมดในเครื่องนี้ (รวมไฟล์ JSON ที่นำเข้า) เพื่อดูว่านักศึกษาทั้งชั้นติดตรงไหนบ่อย ใช้ debrief ได้ทันที'],
 clFinished:['只看玩完的','Finished only','เฉพาะที่เล่นจบ'], clAllVer:['所有版本','All versions','ทุกเวอร์ชัน'], clOrig:['原版','Original','ต้นฉบับ'], clCsv:['⬇️ 下載概況（CSV）','⬇️ Download summary (CSV)','⬇️ ดาวน์โหลดสรุป (CSV)'],
 clNone:['還沒有符合條件的紀錄。','No matching records yet.','ยังไม่มีบันทึกที่ตรงเงื่อนไข'],
 clStudents:['學生','Students','นักศึกษา'], clDone:['玩完','Finished','เล่นจบ'], clAvgScore:['平均分數','Avg score','คะแนนเฉลี่ย'], clAvgTime:['平均實際時間','Avg real time','เวลาจริงเฉลี่ย'], clRanks:['評價分布','Ranks','การกระจายระดับ'],
 clTop:['🎯 全班最常失分的地方（討論重點）','🎯 Where the class struggled most (debrief starters)','🎯 จุดที่นักศึกษาพลาดบ่อยที่สุด (ประเด็น debrief)'],
 clProblems:['找到各問題的比例','Problems found','สัดส่วนที่หาปัญหาเจอ'], clDuel:['矛盾對決：第一次就出示正確證物','Contradiction duel: right evidence on the first try','จับโกหก: แสดงหลักฐานถูกตั้งแต่ครั้งแรก'],
 clWrongEv:['常選錯的證物','Common wrong evidence','หลักฐานที่เลือกผิดบ่อย'], clFirst:['進門第一步（第一次的選擇）','First move at the door (first pick)','ก้าวแรกในบ้าน (สิ่งที่เลือกครั้งแรก)'],
 clCalc:['計算題：第一次就算對','Calculations: right on the first try','โจทย์คำนวณ: ถูกตั้งแต่ครั้งแรก'], clCalcWrong:['常見的錯誤輸入','Common wrong inputs','ค่าที่ใส่ผิดบ่อย'], clConcept:['判讀題','Interpretation','ข้อแปลผล'],
 clMR:['藥物整合任務','Medication-review missions','ภารกิจทบทวนยา'], clBoss:['大魔王衛教卡','Myth Overlord counselling cards','การ์ดคำแนะนำ (จอมมาร)'], clFinal:['最後總結涵蓋的項目','Final summary coverage','สิ่งที่ครอบคลุมในการสรุปท้ายเกม'],
 clCustom:['老師的加分題','Instructor questions','คำถามจากอาจารย์'], lgPerfect:['完全正確','Perfect','ถูกครบ'], lgPartial:['部分正確','Partly','ถูกบางส่วน'], lgWrong:['錯誤','Wrong','ผิด'],
 lgCrit:['最佳','Best','ดีที่สุด'], lgOk:['普通','Okay','พอใช้'], lgMiss:['錯誤','Wrong','ผิด'], clPeople:['人','students','คน'], clTimes:['次','×','ครั้ง'],
 clPP:['📊 前測 vs 後測（同一批學生）','📊 Pre-test vs post-test (same students)','📊 ก่อนเรียน vs หลังเรียน (นักศึกษากลุ่มเดียวกัน)'], clPPavg:['平均答對','Average correct','ตอบถูกเฉลี่ย'], clPre:['前測','Pre','ก่อน'], clPost:['後測','Post','หลัง'],
 clPPnone:['還沒有同時完成前測和後測的紀錄。','No records with both a pre-test and a post-test yet.','ยังไม่มีบันทึกที่ทำทั้งก่อนและหลังเรียน'],
 clRefl:['💭 反思題回答','💭 Reflection answers','💭 คำตอบสะท้อนคิด'], clConseq:['⚠️ 選擇帶來的後果','⚠️ Consequences of choices','⚠️ ผลที่ตามมาจากการตัดสินใจ'],
 clPatOut:['☕ 耐心用完、訪談被迫結束','☕ Ran out of patience (interview cut short)','☕ ความอดทนหมด (การสัมภาษณ์ถูกตัดจบ)'], clRefused:['🔒 陳伯沒說出秘密','🔒 Uncle Chen kept his secret','🔒 ลุงไม่ยอมเล่าความลับ'], clTimeout:['⏰ 時間到、拜訪提早結束','⏰ Time ran out — visit ended early','⏰ หมดเวลา — การเยี่ยมจบก่อนกำหนด'],
 clEnding:['兩週後的結局','Two-week outcome','ผลลัพธ์ 2 สัปดาห์ต่อมา'], clFollow:['↪ 追問與隱藏提問','↪ Follow-ups & hidden questions','↪ คำถามต่อและคำถามลับ'], clHidden:['🗝️ 隱藏提問','🗝️ Hidden question','🗝️ คำถามลับ'],
 clMode:['模式','Mode','โหมด'], clAllModes:['全部模式','All modes','ทุกโหมด'],
 clBmiClass:['BMI 分類（台灣標準）','BMI category (Taiwan)','จัดกลุ่ม BMI (เกณฑ์ไต้หวัน)'], clCkd:['CKD 分期','CKD staging','ระยะ CKD'], clObese:['肥胖時 CrCl 會高估','CrCl overestimates in obesity','CrCl ประเมินสูงเกินในคนอ้วน'],
};
const TC=k=>CL[k]?(CL[k][LI()]||CL[k][0]):UI[k]?T(k):TE(k);
const CLS={fin:false, ver:'__all', mode:'all', cls:'__all'};
const pct=(n,d)=>d?Math.round(n/d*100):0;
function clBar(label,n,d,note){ const v=pct(n,d); return `<div class="cbar" title="${esc(label)} — ${n}/${d}"><div class="cbl">${label}</div><div class="cbt"><i style="width:${v}%"></i></div><div class="cbv">${v}%<span>${n}/${d}</span></div>${note?`<div class="cbn">${note}</div>`:''}</div>`; }
function clStack(label,parts,d){ return `<div class="cbar" title="${esc(label)}"><div class="cbl">${label}</div><div class="cbt st">${parts.map(([n,cls])=>n?`<i class="${cls}" style="width:${pct(n,d)}%"></i>`:'').join('')}</div><div class="cbv">${pct(parts[0][0],d)}%<span>${parts[0][0]}/${d}</span></div></div>`; }
const clLegend=items=>`<div class="clg">${items.map(([cls,ic,k])=>`<span><i class="${cls}"></i>${ic} ${TC(k)}</span>`).join('')}</div>`;
function classStats(list){
  const N=list.length, R={N, done:list.filter(s=>s.done).length, rows:[]};
  const row=(sec,label,n,d)=>{ if(d) R.rows.push({sec,label,n,d,p:pct(n,d)}); };
  const fin=list.filter(s=>s.done); R.avgScore=fin.length?Math.round(fin.reduce((a,s)=>a+(s.score||0),0)/fin.length):0; R.avgTime=fin.length?fin.reduce((a,s)=>a+(s.realTime||0),0)/fin.length:0;
  R.ranks={}; fin.forEach(s=>R.ranks[s.rank]=(R.ranks[s.rank]||0)+1);
  R.prob=PROBLEMS.map(p=>({p, n:list.filter(s=>s.found&&s.found[p.id]).length})); R.prob.forEach(x=>row('prob',x.p.icon+' '+L(x.p.t),x.n,N));
  const sts=TESTI.map(t=>t.id).concat(['lock']); R.duel={}; R.wrongEv={};
  sts.forEach(st=>{ let first=0, firstOk=0; list.forEach(s=>{ const ev=(s.log||[]).filter(e=>e.type==='present'&&e.st===st); if(ev.length){ first++; if(ev[0].ok) firstOk++; } ev.filter(e=>!e.ok).forEach(e=>{ const k=st+'|'+e.item; R.wrongEv[k]=(R.wrongEv[k]||0)+1; }); }); R.duel[st]={n:firstOk,d:first}; });
  sts.forEach((st,i)=>row('duel',st==='lock'?'💗 '+T('lockTitle').replace(/[～~]/g,'').trim():`${i+1}. ${KP(L(TESTI[i].st))}`,R.duel[st].n,R.duel[st].d));
  R.first={}; let fd=0; list.forEach(s=>{ const f=s.first&&s.first.picks&&s.first.picks[0]; if(f){ fd++; R.first[f]=(R.first[f]||0)+1; } }); R.firstD=fd; row('first',TE('firstMoveT')+' ✓',R.first.intro||0,fd);
  R.calc={}; ['bmi','egfr','crcl'].forEach(k=>{ const has=list.filter(s=>s.calc&&s.calc[k]); R.calc[k]={n:has.filter(s=>s.calc[k].ok&&s.calc[k].tries===1).length, d:has.length}; row('calc',k.toUpperCase(),R.calc[k].n,R.calc[k].d); });
  R.calcWrong={}; list.forEach(s=>(s.log||[]).filter(e=>e.type==='calc'&&!e.ok).forEach(e=>{ const k=e.id+'|'+Object.entries(e.vals||{}).sort((x,y)=>x[0]<y[0]?-1:1).map(([a,b])=>a+'='+b).join(', '); R.calcWrong[k]=(R.calcWrong[k]||0)+1; }));
  const bc=list.filter(s=>s.calc&&'bmiClass' in s.calc), ck=list.filter(s=>(s.log||[]).some(e=>e.type==='egfr')), ob=list.filter(s=>s.calc&&'crclObese' in s.calc);
  R.concept=[[TC('clBmiClass'),bc.filter(s=>s.calc.bmiClass).length,bc.length],[TC('clCkd'),ck.filter(s=>(s.log||[]).find(e=>e.type==='egfr').ok).length,ck.length],[TC('clObese'),ob.filter(s=>s.calc.crclObese).length,ob.length]];
  R.concept.forEach(([l,n,d])=>row('concept',l,n,d));
  R.mr=MISSIONS.map(m=>{ const a=list.map(s=>(s.mr&&s.mr.ans||[]).find(x=>x.id===m.id)).filter(Boolean); return {m, p:a.filter(x=>x.perfect).length, h:a.filter(x=>!x.perfect&&x.partial).length, w:a.filter(x=>!x.perfect&&!x.partial).length, d:a.length}; });
  R.mr.forEach(x=>row('mr',`${L(x.m.tag)} · ${KP(L(x.m.q)).slice(0,40)}…`,x.p,x.d));
  R.boss=MYTHS.map(m=>{ const a=list.map(s=>(s.boss&&s.boss.answers||[]).find(x=>x.p===m.p)).filter(Boolean); return {m, c:a.filter(x=>x.q===2).length, o:a.filter(x=>x.q===1).length, w:a.filter(x=>x.q!==2&&x.q!==1).length, d:a.length}; });
  R.boss.forEach(x=>row('boss','「'+L(x.m.m)+'」',x.c,x.d));
  const fc=list.filter(s=>Array.isArray(s.finalCov)&&s.finalCov.length); R.final=RUBRIC_SUM.map((r,i)=>({r, n:fc.filter(s=>s.finalCov[i]).length, d:fc.length})); R.final.forEach(x=>row('final',x.r.ic+' '+L(x.r.k),x.n,x.d));
  const cq={}; list.forEach(s=>(s.custom&&s.custom.list||[]).forEach(a=>{ const c=cq[a.qid]=cq[a.qid]||{q:a.q,n:0,d:0}; c.d++; if(a.ok) c.n++; })); R.custom=Object.values(cq); R.custom.forEach(c=>row('custom',c.q,c.n,c.d));
  /* pre vs post: only students who did both */
  const both=list.filter(s=>s.pp&&Object.keys(s.pp.pre||{}).length&&Object.keys(s.pp.post||{}).length), qtext={};
  list.forEach(s=>(s.log||[]).forEach(e=>{ if(e.type==='pp'&&e.q) qtext[e.qid]=e.q; }));
  const ids=[...new Set([].concat(...both.map(s=>Object.keys(s.pp.post))))];
  const qOf=id=>{ const qq=gameQuestions().find(x=>x.id===id); return qq?LQ(qq.q):qtext[id]||id; };
  R.pp={n:both.length, q:ids.map(id=>{ const h=both.filter(s=>s.pp.pre[id]&&s.pp.post[id]); return {id, q:qOf(id), d:h.length, pre:h.filter(s=>s.pp.pre[id].ok).length, post:h.filter(s=>s.pp.post[id].ok).length}; })};
  R.pp.avgPre=both.length?both.reduce((a,s)=>a+Object.values(s.pp.pre).filter(x=>x.ok).length,0)/both.length:0;
  R.pp.avgPost=both.length?both.reduce((a,s)=>a+Object.values(s.pp.post).filter(x=>x.ok).length,0)/both.length:0;
  R.pp.max=ids.length; R.pp.q.forEach(x=>row('pp_post',x.q,x.post,x.d));
  R.refl={}; list.forEach(s=>(s.refl||[]).forEach(a=>{ const k=a.qid?qOf(a.qid):a.q; (R.refl[k]=R.refl[k]||[]).push({who:s.student&&s.student.name||'?', ans:a.ans}); }));
  /* consequences + epilogue */
  const fin2=list.filter(s=>s.done);
  R.cons=[['clPatOut',list.filter(s=>s.fl&&s.fl.patOut).length,list.filter(s=>(s.chapter||0)>=2||s.done).length],['clRefused',list.filter(s=>s.refused).length,list.filter(s=>(s.chapter||0)>=4||s.done).length],['clTimeout',list.filter(s=>s.timeout).length,fin2.length]];
  R.cons.forEach(([k,n,d])=>row('cons',TC(k),d-n,d));
  R.end={best:0,good:0,mixed:0,bad:0}; fin2.forEach(s=>{ if(s.ending) R.end[s.ending.tier]=(R.end[s.ending.tier]||0)+1; }); R.endN=fin2.filter(s=>s.ending).length;
  R.fu=FOLLOW1.map(f=>({f, n:list.filter(s=>(s.log||[]).some(e=>e.type==='ask'&&(e.topic===f.id||(e.nodes||[]).includes(f.id)))).length}));
  R.hid=HIDDEN1.map(h=>({h, n:list.filter(s=>(s.hiddenQ||[]).includes(h)).length}));
  return R;
}
function renderClass(b){
  const all=allSessions(), vers=[...new Set(all.map(s=>s.cfgRev||''))], clss=[...new Set(all.map(s=>s.classCode||'main'))].sort();
  const list=all.filter(s=>(!CLS.fin||s.done)&&(CLS.ver==='__all'||(s.cfgRev||'')===CLS.ver)&&(CLS.mode==='all'||(s.mode||'practice')===CLS.mode)&&(CLS.cls==='__all'||(s.classCode||'main')===CLS.cls));
  const head=`<p class="edintro">${TC('clIntro')}</p><div class="clf"><label><input type="checkbox" id="clFin" ${CLS.fin?'checked':''}> ${TC('clFinished')}</label>
    <select class="ein" id="clVer" style="max-width:260px"><option value="__all">${TC('clAllVer')}</option>${vers.map(v=>`<option value="${esc(v)}"${CLS.ver===v?' selected':''}>${v?esc(localTS(v)):TC('clOrig')}</option>`).join('')}</select>
    <select class="ein" id="clMode" style="max-width:180px"><option value="all">${TC('clAllModes')}</option>${['practice','exam'].map(m=>`<option value="${m}"${CLS.mode===m?' selected':''}>${T('mode_'+m)}</option>`).join('')}</select>
    ${clss.length>1||CLS.cls!=='__all'?`<select class="ein" id="clCls" style="max-width:180px"><option value="__all">${T('clAllCls')}</option>${clss.map(c=>`<option value="${esc(c)}"${CLS.cls===c?' selected':''}>🏫 ${esc(c)}</option>`).join('')}</select>`:''}
    <button class="sbtn b" id="clCsv">${TC('clCsv')}</button></div>`;
  if(!list.length){ b.innerHTML=head+`<p class="edempty">${TC('clNone')}</p>`; bindClass(b,null); return; }
  const R=classStats(list), sec=(t,h)=>`<div class="clsec"><h4>${t}</h4>${h}</div>`, rk=['S','A','B','C','D'];
  const top=R.rows.filter(r=>r.d>=1&&r.sec!=='first'&&r.sec!=='pp_post').sort((a,b)=>a.p-b.p||b.d-a.d).slice(0,6);
  const ppHTML=R.pp.n?`<p class="muted">${TC('clPPavg')}: <b>${R.pp.avgPre.toFixed(1)}</b> → <b style="color:#0a7a0a">${R.pp.avgPost.toFixed(1)}</b> / ${R.pp.max} · n = ${R.pp.n} ${TC('clPeople')}</p>
      <div class="clg"><span><i class="pre" style="background:#a9c7ee"></i>${TC('clPre')}</span><span><i style="background:#2a78d6"></i>${TC('clPost')}</span></div>
      <div class="pplist">${R.pp.q.map(x=>{ const a=pct(x.pre,x.d), z=pct(x.post,x.d), dv=z-a; return `<div class="ppq"><div>${esc(x.q)}</div><div class="pb2"><i class="pre" style="width:${a}%"></i><i class="post" style="width:${z}%"></i></div><div class="dv${dv<0?' neg':''}">${a}→${z}%</div></div>`; }).join('')}</div>`:`<p class="muted">${TC('clPPnone')}</p>`;
  const reflHTML=Object.entries(R.refl).map(([q,arr])=>`<h5>${esc(q)}</h5>`+arr.slice(-12).map(a=>`<div class="refl"><b>${esc(a.who)}</b>：${esc(a.ans)}</div>`).join('')).join('');
  const endHTML=R.endN?clLegend([['g','🌟','end_best'],['g2','😊','end_good'],['y','😐','end_mixed'],['r','🚑','end_bad']].map(([c,ic,k])=>[c,'',k]))+clStack(TC('clEnding'),[[R.end.best,'g'],[R.end.good,'g2'],[R.end.mixed,'y'],[R.end.bad,'r']],R.endN):'';
  const wrongEv=Object.entries(R.wrongEv).sort((a,b)=>b[1]-a[1]).slice(0,6).map(([k,n])=>{ const [st,it]=k.split('|'), i=TESTI.findIndex(t=>t.id===st); return `<li><b>${ITEMS[it]?itemIcon(it,22)+' '+esc(L(ITEMS[it].n)):esc(it)}</b> → ${st==='lock'?'💗':'#'+(i+1)} <span class="muted">${n} ${TC('clTimes')}</span></li>`; }).join('');
  const calcWrong=Object.entries(R.calcWrong).sort((a,b)=>b[1]-a[1]).slice(0,6).map(([k,n])=>{ const [id,v]=k.split('|'); return `<li><b>${id.toUpperCase()}</b> <code>${esc(v)}</code> <span class="muted">${n} ${TC('clTimes')}</span></li>`; }).join('');
  b.innerHTML=head+`<div class="cltiles"><div><b>${R.N}</b><span>${TC('clStudents')}</span></div><div><b>${R.done}</b><span>${TC('clDone')}</span></div><div><b>${R.avgScore||'—'}</b><span>${TC('clAvgScore')}</span></div><div><b>${R.avgTime?fmt(R.avgTime):'—'}</b><span>${TC('clAvgTime')}</span></div>
      <div class="rk"><span>${TC('clRanks')}</span><p>${rk.map(r=>`<em>${r} <b>${R.ranks[r]||0}</b></em>`).join('')}</p></div></div>`
    +sec(TC('clTop'),top.map(r=>clBar(esc(r.label),r.n,r.d)).join(''))
    +sec(TC('clProblems'),R.prob.slice().sort((a,b)=>a.n-b.n).map(x=>clBar(x.p.id+' '+x.p.icon+' '+esc(L(x.p.t)),x.n,R.N)).join(''))
    +sec(TC('clDuel'),R.rows.filter(r=>r.sec==='duel').map(r=>clBar(esc(r.label),r.n,r.d)).join('')+(wrongEv?`<h5>${TC('clWrongEv')}</h5><ul class="clul">${wrongEv}</ul>`:''))
    +sec(TC('clFirst'),FIRST_MOVES.map(f=>clBar((f.k==='intro'?'✅ ':'')+esc(L(f.t)),R.first[f.k]||0,R.firstD)).join(''))
    +sec(TC('clCalc'),['bmi','egfr','crcl'].map(k=>clBar(k.toUpperCase(),R.calc[k].n,R.calc[k].d)).join('')+`<h5>${TC('clConcept')}</h5>`+R.concept.map(([l,n,d])=>clBar(l,n,d)).join('')+(calcWrong?`<h5>${TC('clCalcWrong')}</h5><ul class="clul">${calcWrong}</ul>`:''))
    +sec(TC('clMR'),clLegend([['g','✅','lgPerfect'],['y','🔸','lgPartial'],['r','❌','lgWrong']])+R.mr.map(x=>clStack(esc(L(x.m.tag))+' · '+esc(KP(L(x.m.q)).slice(0,46))+'…',[[x.p,'g'],[x.h,'y'],[x.w,'r']],x.d)).join(''))
    +sec(TC('clBoss'),clLegend([['g','✅','lgCrit'],['y','🔸','lgOk'],['r','❌','lgMiss']])+R.boss.map(x=>clStack('「'+esc(L(x.m.m))+'」',[[x.c,'g'],[x.o,'y'],[x.w,'r']],x.d)).join(''))
    +sec(TC('clFinal'),R.final.map(x=>clBar(x.r.ic+' '+esc(L(x.r.k)),x.n,x.d)).join(''))
    +(R.custom.length?sec(TC('clCustom'),R.custom.map(c=>clBar(esc(c.q),c.n,c.d)).join('')):'')
    +sec(TC('clPP'),ppHTML)
    +sec(TC('clConseq'),R.cons.map(([k,n,d])=>clBar(TC(k),n,d)).join('')+endHTML)
    +sec(TC('clFollow'),R.fu.map(x=>clBar(x.f.ico+' ↪ '+esc(L(x.f.l)),x.n,R.N)).join('')+R.hid.map(x=>clBar(TC('clHidden')+' · '+esc(L((PROFILE.find(f=>f.k===x.h)||{l:[x.h,x.h,x.h]}).l)),x.n,R.N)).join(''))
    +(reflHTML?sec(TC('clRefl'),reflHTML):'');
  bindClass(b,R);
}
function bindClass(b,R){
  $('#clFin').onchange=e=>{ CLS.fin=e.target.checked; renderPage(); }; $('#clVer').onchange=e=>{ CLS.ver=e.target.value; renderPage(); }; $('#clMode').onchange=e=>{ CLS.mode=e.target.value; renderPage(); }; if($('#clCls')) $('#clCls').onchange=e=>{ CLS.cls=e.target.value; renderPage(); };
  $('#clCsv').onclick=()=>{ if(!R){ sfx.error(); return; } const rows=[['section','item','percent','n','total']].concat(R.rows.map(r=>[r.sec,KP(String(r.label)).replace(/<[^>]+>/g,''),r.p,r.n,r.d]));
    download('PharmaDetective_class_summary.csv','﻿'+rows.map(r=>r.map(c=>'"'+String(c==null?'':c).replace(/"/g,'""')+'"').join(',')).join('\n'),'text/csv'); };
}
