/* =====================================================================
   📜 MY ROUNDS on the title screen — every game of this case played on this device:
   how it went, what you asked and what you answered. Read-only, built from the saved session list.
   Missed problems stay hidden until a game is finished; right/wrong marks of an unfinished EXAM stay hidden too.
   ===================================================================== */
const HST={ btn:['📜 我的紀錄','📜 My past games','📜 ประวัติการเล่น'], title:['📜 我玩過的紀錄','📜 My past games','📜 ประวัติการเล่นของฉัน'],
  pick:['哪一場：','Which game:','เกมไหน:'],
  none:['這台裝置上還沒有玩過的紀錄。按「開始」玩一場，回來這裡就看得到。','No games on this device yet. Play one, then come back here.','ยังไม่มีประวัติในเครื่องนี้ เล่นสักเกมแล้วกลับมาดูที่นี่ได้'],
  tSum:['📊 總覽','📊 Overview','📊 ภาพรวม'], tAsk:['💬 我問了什麼','💬 What I asked','💬 ที่ถามไป'], tAns:['✍️ 我答了什麼','✍️ What I answered','✍️ ที่ตอบไป'],
  done:['✅ 已破關','✅ Finished','✅ เล่นจบแล้ว'], playing:['⏳ 還沒玩完','⏳ Not finished','⏳ ยังเล่นไม่จบ'],
  time:['時間','Time','เวลา'], found:['找到的問題','Problems found','ปัญหาที่เจอ'], mode:['模式','Mode','โหมด'], ending:['結局','Ending','ตอนจบ'],
  hints:['用了提示','Hints used','ใช้คำใบ้'], asked:['提問','Questions asked','ถามไป'], items:['🔍 搜到的證物','🔍 Evidence found','🔍 หลักฐานที่ค้นเจอ'],
  probs:['🧩 問題清單','🧩 Problems','🧩 รายการปัญหา'], missedN:['還沒找到 {n} 個（玩完才會顯示是哪些）','{n} not found yet (shown once you finish)','ยังไม่เจออีก {n} ข้อ (จะแสดงเมื่อเล่นจบ)'],
  examHid:['考試還沒結束：對錯要玩完才會顯示。','Exam not finished: right and wrong show once you finish.','การสอบยังไม่จบ: ถูก/ผิดจะแสดงเมื่อเล่นจบ'],
  card:['提問卡','Question card','การ์ดคำถาม'], typed:['自己打的','Typed','พิมพ์เอง'], press:['追問','Pressed','ถามจี้'], heart:['心鎖','Heart lock','กุญแจหัวใจ'],
  first:['🚪 進門第一步','🚪 First move','🚪 ก้าวแรกในบ้าน'], choice:['☑️ 選擇','☑️ Choices','☑️ ตัวเลือก'], calc:['🧮 計算與實作','🧮 Calculations & hands-on','🧮 คำนวณและลงมือ'],
  key:['正確答案','Answer','คำตอบ'], final:['🏁 最後的總結衛教','🏁 Your closing summary','🏁 สรุปคำแนะนำตอนท้าย'], fb:['💌 我的意見','💌 My feedback','💌 ความเห็นของฉัน'],
  nothing:['這一場還沒有這部分的紀錄。','Nothing recorded here for this game yet.','เกมนี้ยังไม่มีบันทึกส่วนนี้'],
  tDoc:['📁 案件資料','📁 Case documents','📁 เอกสารในคดี'],
  docLocked:['玩完這一場，就能在這裡看所有案件資料：病人資料、證物、藥袋和檢驗報告。','Finish this game to open all the case documents here: patient profile, evidence, medicine bags and lab results.','เล่นรอบนี้ให้จบก่อน แล้วจะเปิดดูเอกสารทั้งหมดได้ที่นี่: ข้อมูลผู้ป่วย หลักฐาน ซองยา และผลแล็บ'],
  dProf:['🪪 病人資料','🪪 Patient profile','🪪 ข้อมูลผู้ป่วย'], dEv:['🔍 證物','🔍 Evidence','🔍 หลักฐาน'], dMeds:['💊 藥袋','💊 Medicine bags','💊 ซองยา'], dLabs:['🧪 檢驗報告','🧪 Lab results','🧪 ผลแล็บ'],
  dFound:['✅ 這一場有找到','✅ Found this game','✅ รอบนี้เจอแล้ว'], dMiss:['這一場沒找到','Not found this game','รอบนี้ไม่ได้เจอ'],
  dZoom:['點圖片可以放大','Tap a picture to enlarge it','แตะรูปเพื่อขยาย'], dPics:['原始文件','Original documents','เอกสารต้นฉบับ'],
  close:['✕ 關閉','✕ Close','✕ ปิด'], ro:['只在這台裝置上；換手機或電腦就看不到。','Kept on this device only; another phone or computer won\'t have it.','เก็บไว้ในเครื่องนี้เท่านั้น เปลี่ยนเครื่องจะไม่เห็น'] };
const HS={id:null, tab:'sum'};
const hsT=k=>L(HST[k]);
function hsGames(){ return (store.get(CONFIG.STORAGE_KEY)||[]).filter(s=>s&&s.id&&(s.log||[]).length)
  .sort((a,b)=>String(b.updated||b.created||'').localeCompare(String(a.updated||a.created||''))); }
const hsWhen=s=>{ try{ return new Date(s.created||s.updated).toLocaleString(S.lang==='zh'?'zh-TW':S.lang==='th'?'th-TH':'en-GB',{day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}); }catch(e){ return ''; } };
const hsLabel=s=>`${hsWhen(s)} · ${s.student&&s.student.name||'?'} · ${s.done?hsT('done')+(s.rank?' '+s.rank:''):hsT('playing')}`;
const hsCh=c=>T('ch'+Math.max(0,Math.min(5,+c||0)));
const hsItem=id=>{ const it=(typeof ITEMS!=='undefined')&&ITEMS[id]; return it?L(it.n):String(id||''); };
const hsDrug=id=>{ const d=(typeof DRUGS!=='undefined')&&DRUGS.find(x=>x.id===id); return d?d.n:String(id||''); };
const hsQ=v=>esc(KP(Array.isArray(v)?L(v):String(v==null?'':v)));
function hsCss(){ if($('#hsCss')) return; const st=document.createElement('style'); st.id='hsCss'; st.textContent=`
#hsUI{position:fixed;inset:0;z-index:240;background:rgba(15,10,35,.62);display:flex;align-items:center;justify-content:center;padding:12px}
#hsUI .card{position:relative;width:min(1040px,100%);height:min(760px,100%);display:flex;flex-direction:column;border-radius:24px;overflow:hidden;background:#fff;box-shadow:0 0 0 5px #fff,0 0 0 10px #c8b4ff,0 20px 50px rgba(0,0,0,.5);animation:enterC .3s}
#hsUI .hd{display:flex;align-items:center;gap:10px;padding:9px 14px;background:linear-gradient(90deg,#7a5cff,#d45cff);color:#fff}
#hsUI .hd b{font-size:19px;font-weight:900;flex:1}
#hsUI .hd .x{width:34px;height:34px;border-radius:50%;background:#fff;color:#6a3ad6;font-weight:900;font-size:18px}
#hsUI .bd{flex:1;overflow:auto;padding:12px 16px 16px;-webkit-overflow-scrolling:touch;font-size:15px;line-height:1.55;color:#2a2140}
#hsUI .gp{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:10px;font-weight:800;color:#3a3a6a;font-size:14.5px}
#hsUI .gp select{font:inherit;font-weight:700;padding:6px 10px;border-radius:12px;border:2px solid #e2d8ff;background:#faf8ff;max-width:100%}
#hsUI .tabs{display:flex;gap:6px;flex-wrap:wrap;margin:0 0 10px}
#hsUI .tabs button{padding:7px 16px;border-radius:99px;font-weight:800;font-size:15px;background:#f1edfb;color:#4a3a7a}
#hsUI .tabs button.on{background:#6a3ad6;color:#fff}
#hsUI .tiles{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px;margin-bottom:12px}
#hsUI .tiles div{background:#f7f4ff;border-radius:14px;padding:8px 12px}
#hsUI .tiles b{display:block;font-size:20px;font-weight:900;color:#3a2a7a}
#hsUI .tiles span{font-size:12.5px;color:#7a7090;font-weight:700}
#hsUI h4{margin:14px 0 6px;font-size:16px;color:#4a2aa0}
#hsUI h5{margin:12px 0 4px;font-size:13.5px;color:#8a7aa8;font-weight:900;letter-spacing:.02em}
#hsUI .hrow{padding:6px 10px;border-radius:12px;background:#faf9fd;margin:4px 0;box-shadow:inset 0 0 0 1px #eee8f8}
#hsUI .hrow .mk{font-weight:900;margin-right:4px}
#hsUI .hrow .sm{display:block;font-size:13px;color:#7a7090;margin-top:2px}
#hsUI .hrow.tx{white-space:pre-wrap}
#hsUI .pill{display:inline-block;margin:3px 4px 3px 0;padding:4px 10px;border-radius:99px;font-size:13.5px;font-weight:700;background:#eef9f2;color:#1d6b45}
#hsUI .pill.no{background:#fdf0f1;color:#a33a48}
#hsUI .muted{color:#8a8aa0;font-size:13px}
#hsUI .msg{color:#5a5070;font-size:15px;line-height:1.6;padding:18px 6px}
#hsUI .ft{display:flex;gap:8px;align-items:center;padding:8px 14px;border-top:1px solid #edf0f8;flex-wrap:wrap}
#hsUI .ft .ro{flex:1;color:#7a7090;font-size:12.5px;min-width:180px}
#hsUI .ft button{padding:8px 16px;border-radius:99px;font-weight:900;font-size:14.5px;background:#f1edfb;color:#4a3a7a}
@media (max-height:460px){#hsUI .card{height:100%}#hsUI .bd{padding:8px 12px 12px}}
#hsUI .dnav{display:flex;gap:6px;flex-wrap:wrap;margin:0 0 6px}
#hsUI .dnav a{padding:4px 12px;border-radius:99px;background:#f7f4ff;color:#4a3a7a;font-weight:800;font-size:13.5px;text-decoration:none;cursor:pointer}
#hsUI .kv{display:grid;grid-template-columns:minmax(110px,190px) 1fr;gap:4px 12px;background:#faf9fd;border-radius:14px;padding:10px 12px}
#hsUI .kv b{color:#6a5a8a;font-size:13.5px}
#hsUI .dgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:10px}
#hsUI .dcard{background:#faf9fd;border-radius:14px;padding:10px 12px;box-shadow:inset 0 0 0 1px #eee8f8;font-size:14px;line-height:1.5}
#hsUI .dcard.miss{opacity:.62}
#hsUI .dcard .dh{display:flex;gap:8px;align-items:center;margin-bottom:4px}
#hsUI .dcard .dh b{font-size:15px}
#hsUI .dcard .tag{font-size:12px;font-weight:800;color:#1d6b45}
#hsUI .dcard.miss .tag{color:#8a7090}
#hsUI .dcard img.z{max-height:90px;max-width:100%;border-radius:8px;margin:6px 6px 0 0;cursor:zoom-in;box-shadow:0 0 0 2px #e6dcf5}
#hsUI .bag{display:flex;flex-direction:column}
#hsUI .bag img.z{max-height:none;width:100%;height:150px;object-fit:cover;object-position:top;margin:0 0 6px}
#hsUI .ltbl{border-collapse:collapse;font-size:13.5px;width:100%}
#hsUI .ltbl th{background:#f1edfb;color:#3a2a7a;text-align:left;padding:6px 8px;white-space:nowrap}
#hsUI .ltbl td{border-top:1px solid #eee8f8;padding:6px 8px}
#hsUI .wrapx{overflow-x:auto}
#hsUI img.z{max-width:100%;cursor:zoom-in}
#hsZoom{position:absolute;inset:0;z-index:5;background:rgba(15,10,35,.86);display:flex;align-items:center;justify-content:center;padding:14px;cursor:zoom-out}
#hsZoom img{max-width:100%;max-height:100%;border-radius:10px;background:#fff}
#btnHist{position:absolute;right:28px;top:22px;z-index:3;padding:10px 22px;border-radius:99px;background:rgba(255,255,255,.92);color:#5a3a9a;font-weight:900;font-size:24px;box-shadow:0 0 0 4px #fff,0 6px 16px rgba(40,20,60,.25);cursor:pointer}
#btnHist:hover{transform:translateY(-2px)}
#title.locked #btnHist{display:none}
`; document.head.appendChild(st); }
/* ---------- overview ---------- */
function hsSum(s){ const found=Object.keys(s.found||{}), log=s.log||[], asks=log.filter(e=>e.type==='ask').length, reveal=s.done;
  const hints=typeof hintsOf==='function'?hintsOf(s):0, end=s.ending&&s.ending.tier?T('end_'+s.ending.tier):'';
  const tiles=[[s.done?hsT('done'):hsT('playing')+(s.chapter!=null?' · '+hsCh(s.chapter):''),''],
    s.rank?[s.rank+' · '+(s.score||0),T('rank')+' · '+T('score')]:null, [fmt(s.realTime||0),hsT('time')], [found.length+'/'+PROBLEMS.length,hsT('found')],
    [String(asks),hsT('asked')], [T('mode_'+(s.mode==='exam'?'exam':'practice')),hsT('mode')], end?[end,hsT('ending')]:null, hints?[String(hints),hsT('hints')]:null].filter(Boolean);
  const items=[...new Set(log.filter(e=>e.type==='item').map(e=>e.item))];
  const pp=s.pp&&s.pp.pre&&Object.keys(s.pp.pre).length?(()=>{ const pre=Object.values(s.pp.pre), post=Object.values(s.pp.post||{});
    return `<div class="hrow">📊 ${esc(T('ppStat'))}: <b>${pre.filter(x=>x.ok).length}/${pre.length}</b>${post.length?` → <b>${post.filter(x=>x.ok).length}/${post.length}</b>`:''}</div>`; })():'';
  return `<div class="tiles">${tiles.map(([v,l])=>`<div><b>${esc(v)}</b>${l?`<span>${esc(l)}</span>`:''}</div>`).join('')}</div>${pp}
    <h4>${hsT('probs')}</h4><div>${PROBLEMS.filter(p=>s.found&&s.found[p.id]).map(p=>`<span class="pill">${p.icon} ${esc(KP(L(p.t)))}</span>`).join('')}
      ${reveal?PROBLEMS.filter(p=>!(s.found&&s.found[p.id])).map(p=>`<span class="pill no">${p.icon} ${esc(KP(L(p.t)))}</span>`).join(''):''}</div>
    ${!reveal&&found.length<PROBLEMS.length?`<p class="muted">${esc(hsT('missedN').replace('{n}',PROBLEMS.length-found.length))}</p>`:''}
    ${items.length?`<h4>${hsT('items')}</h4><div>${items.map(i=>`<span class="pill" style="background:#f1f4ff;color:#2a3a7a">${esc(hsItem(i))}</span>`).join('')}</div>`:''}`; }
/* ---------- what I asked: interview, the contradiction duel, the heart lock (in order, by chapter) ---------- */
function hsAsk(s){ const ok=s.done||s.mode!=='exam', mk=(o,n)=>!ok?'':o?'✅':n?'🔸':'❌';
  const st=id=>{ const t=(typeof TESTI!=='undefined')&&TESTI.find(x=>x.id===id); return t?hsQ(t.st):esc(id); };
  const rows=(s.log||[]).map(e=>{
    if(e.type==='ask'&&e.mode==='card'){ const t=typeof topicById==='function'&&topicById(e.topic); return [e.ch,`<span class="mk">💬</span>${t?hsQ(t.q):esc(e.topic)}<span class="sm">${t&&t.ico?t.ico+' ':''}${t?hsQ(t.l):''} · ${hsT('card')}</span>`]; }
    if(e.type==='ask') return [e.ch,`<span class="mk">⌨️</span>“${esc(e.text)}”<span class="sm">${hsT('typed')}</span>`];
    if(e.type==='press') return [e.ch,`<span class="mk">🗣️</span>${hsT('press')}: ${st(e.st)}`];
    if(e.type==='present'&&e.st!=='lock') return [e.ch,`<span class="mk">📂</span>${st(e.st)}<span class="sm">← ${esc(hsItem(e.item))} ${mk(e.ok,e.near)}</span>`];
    if(e.type==='present') return [e.ch,`<span class="mk">💗</span>${hsT('heart')} ← ${esc(hsItem(e.item))} ${mk(e.ok,e.near)}`];
    if(e.type==='lockText') return [e.ch,`<span class="mk">💗</span>“${esc(e.text)}” ${mk(e.ok)}<span class="sm">${hsT('heart')}</span>`];
    return null; }).filter(Boolean);
  if(!rows.length) return `<p class="msg">${hsT('nothing')}</p>`;
  let last=null; return (ok?'':`<p class="muted">${hsT('examHid')}</p>`)+rows.map(([c,h])=>{ const head=c!==last?`<h5>${esc(hsCh(c))}</h5>`:''; last=c; return head+`<div class="hrow">${h}</div>`; }).join(''); }
/* ---------- what I answered ---------- */
function hsAns(s){ const ok=s.done||s.mode!=='exam', mk=(o,p)=>!ok?'':o?'✅':p?'🔸':'❌', log=s.log||[], out=[];
  const sec=(h,body)=>{ if(body) out.push(`<h4>${h}</h4>${body}`); }, row=(h,cls)=>`<div class="hrow${cls?' '+cls:''}">${h}</div>`;
  if(s.first&&s.first.picks&&s.first.picks.length&&typeof FIRST_MOVES!=='undefined')
    sec(hsT('first'), s.first.picks.map(k=>{ const f=FIRST_MOVES.find(x=>x.k===k); return row(`${mk(k==='intro')} ${f?hsQ(f.t):k==='timeout'?'⏰':esc(k)}`); }).join(''));
  const isFirst=t=>typeof FIRST_MOVES!=='undefined'&&FIRST_MOVES.some(f=>(f.t||[]).includes(t));
  sec(hsT('choice'), log.filter(e=>e.type==='choice'&&!isFirst(e.text)).map(e=>row(`${e.q?`<span class="sm" style="margin:0 0 3px">${esc(e.q)}</span>`:''}☑️ ${esc(e.text)}`)).join(''));
  const HK={bmiClass:['BMI 分級','BMI class','ระดับ BMI'], crclAdj:['CrCl（調整體重）','CrCl (adjusted weight)','CrCl (น้ำหนักปรับ)'], crclObese:['肥胖時用哪個體重算 CrCl','Which weight for CrCl in obesity','อ้วนแล้วใช้น้ำหนักไหนคำนวณ CrCl'], crTrap:['Cr「正常」的陷阱','The "normal creatinine" trap','กับดัก Cr "ปกติ"']};
  const calc=[], C=s.calc||{}, hk=k=>typeof TT!=='undefined'&&TT.hk&&TT.hk[k]?L(TT.hk[k]):HK[k]?L(HK[k]):k, er=k=>typeof errText==='function'?errText(k):k;
  Object.keys(C).forEach(k=>{ const c=C[k]; if(c==null) return;
    if(typeof c!=='object'){ calc.push(row(`${mk(c)} ${esc(hk(k))}`)); return; }
    calc.push(row(`${mk(c.ok)} <b>${esc(hk(k))}</b>${c.value!=null?` = ${esc(String(c.value))}`:''}${c.tries>1?` <span class="muted">×${c.tries}</span>`:''}${c.hints?` <span class="muted">💡${c.hints}</span>`:''}`
      +(ok?(c.errs||[]).map(e=>`<span class="sm">• ${esc(er(e))}</span>`).join(''):''))); });
  (typeof INH_DEVS!=='undefined'?INH_DEVS:[]).forEach(dev=>{ const f=log.filter(e=>e.type==='inhSim'&&e.dev===dev)[0]; if(!f) return;
    calc.push(row(`${mk(f.ok)} <b>${esc(hk(dev))}</b>${f.pts!=null?` 📋 ${f.pts}/${f.max||8}`:''}`+(ok?(f.errs||[]).map(e=>`<span class="sm">• ${esc(er(e))}</span>`).join(''):''))); });
  sec(hsT('calc'), calc.join(''));
  if(s.mr&&(s.mr.ans||[]).length&&typeof MISSIONS!=='undefined') sec(esc(T('tMR')), s.mr.ans.map(a=>{ const m=MISSIONS.find(x=>x.id===a.id);
    return row(`${mk(a.perfect,a.partial)} ${m?hsQ(m.q):esc(a.id)}<span class="sm">→ ${(a.sel||[]).map(hsDrug).map(esc).join(', ')||'—'}</span>${s.done&&m&&!a.perfect?`<span class="sm">${hsT('key')}: ${(m.ans||[]).map(hsDrug).map(esc).join(', ')}</span>`:''}`); }).join(''));
  const B=s.boss&&s.boss.answers||[]; if(B.length) sec(esc(T('tBoss')), B.map(a=>{ const m=(typeof MYTHS!=='undefined')&&MYTHS.find(x=>x.p===a.p);
    return row(`${ok?(['❌','🔸','✅'][a.q]||'⏰'):''} ${m?'「'+hsQ(m.m)+'」':''}<span class="sm">→ ${esc(a.text)}</span>`); }).join(''));
  const fin=log.filter(e=>e.type==='final').pop(); if(fin&&fin.text) sec(hsT('final'), row(esc(fin.text),'tx'));
  if(s.pp&&(Object.keys(s.pp.pre||{}).length||Object.keys(s.pp.post||{}).length)){ const qt={}; log.forEach(e=>{ if(e.type==='pp') qt[e.qid]=e.q; });
    const ids=[...new Set(Object.keys(s.pp.pre||{}).concat(Object.keys(s.pp.post||{})))];
    sec('📊 '+esc(T('ppStat')), ids.map(id=>{ const a=(s.pp.pre||{})[id], b=(s.pp.post||{})[id];
      return row(`${esc(KP(qt[id]||id))}${a?`<span class="sm">${esc(T('ppPre'))}: ${a.ok?'✅':'❌'} ${esc(a.ans||'')}</span>`:''}${b?`<span class="sm">${esc(T('ppPost'))}: ${b.ok?'✅':'❌'} ${esc(b.ans||'')}</span>`:''}`); }).join('')); }
  if(s.custom&&(s.custom.list||[]).length) sec('➕ '+esc(typeof TE==='function'?TE('tCustom'):''), s.custom.list.map(a=>row(`${a.kind==='text'&&!a.auto?'📝':mk(a.ok,a.partial)} <b>${esc(KP(a.q))}</b><span class="sm">→ “${esc(a.ans)}”</span>`)).join(''));
  if((s.refl||[]).length) sec('💭 '+esc(T('reflT')), s.refl.map(a=>row(`<b>${esc(KP(a.q))}</b><span class="sm" style="white-space:pre-wrap">“${esc(a.ans)}”</span>`)).join(''));
  if(s.fb&&typeof fbHTML==='function') sec(hsT('fb'), fbHTML(s.fb));
  return out.length?(ok?'':`<p class="muted">${hsT('examHid')}</p>`)+out.join(''):`<p class="msg">${hsT('nothing')}</p>`; }
function hsDocs(s){ if(!s.done) return `<p class="msg">${hsT('docLocked')}</p>`;
  const ev=new Set(s.evidence||[]), img=src=>`<img class="z" src="${esc(src)}" alt="">`, out=[];
  const sec=(id,h,body)=>{ if(body) out.push(`<h4 id="hsd_${id}">${hsT(h)}</h4>${body}`); };
  if(typeof PROFILE!=='undefined') sec('prof','dProf',`<div class="kv">${PROFILE.map(f=>`<b>${hsQ(f.l)}</b><span>${hsQ(f.v)}</span>`).join('')}</div>`);
  if(typeof ITEMS!=='undefined'){ const ids=Object.keys(ITEMS).sort((a,b)=>(ev.has(b)-ev.has(a)));
    sec('ev','dEv',`<div class="dgrid">${ids.map(id=>{ const it=ITEMS[id], has=ev.has(id), pics=typeof itemImages==='function'?itemImages(id):[];
      return `<div class="dcard${has?'':' miss'}"><div class="dh">${typeof itemIcon==='function'?itemIcon(id,40):''}<div><b>${hsQ(it.n)}</b><div class="tag">${hsT(has?'dFound':'dMiss')}</div></div></div>
        ${it.loc?`<div class="muted">📍 ${hsQ(it.loc)}</div>`:''}${it.d?`<div>${hsQ(it.d)}</div>`:''}${pics.map(img).join('')}</div>`; }).join('')}</div>`); }
  if(typeof DRUGS!=='undefined') sec('meds','dMeds',`<div class="dgrid">${DRUGS.map(d=>`<div class="dcard bag">${IMG[d.img]?img(IMG[d.img]):''}<b>${esc(d.n)}</b><span class="muted">${esc(d.g||'')}</span>
      <div>${d.sig?hsQ(d.sig):''}</div><div class="muted">${d.cls?hsQ(d.cls):''}${typeof SRC!=='undefined'&&SRC[d.src]?' · '+hsQ(SRC[d.src]):''}</div></div>`).join('')}</div>`);
  if(typeof LABS2!=='undefined'){ const pics=typeof labImages==='function'?labImages():[];
    sec('labs','dLabs',`<div class="wrapx"><table class="ltbl"><tr><th>${esc(T('labItem'))}</th><th>${esc(T('labRef'))}</th>${(typeof LAB_DATES!=='undefined'?LAB_DATES:[]).map(d=>`<th>${esc(d)}</th>`).join('')}</tr>
      ${LABS2.map(r=>`<tr><td><b>${esc(r.item)}</b> <span class="muted">${esc(r.unit||'')}</span></td><td>${esc(r.ref||'')}</td>${(r.v||[]).map(v=>{ const vv=Array.isArray(v)?L(v):String(v); const c=r.f==='H'&&vv!=='—'?'#d0203e':r.f==='L'?'#2856b8':'inherit'; return `<td style="font-weight:700;color:${c}">${esc(vv)}</td>`; }).join('')}</tr>`).join('')}</table></div>
      ${pics.length?`<h5>${hsT('dPics')}</h5><div>${pics.map(img).join('')}</div>`:''}`); }
  if(!out.length) return `<p class="msg">${hsT('nothing')}</p>`;
  return `<div class="dnav">${['prof','ev','meds','labs'].filter(k=>out.some(h=>h.includes('id="hsd_'+k+'"'))).map(k=>`<a data-hj="${k}">${hsT({prof:'dProf',ev:'dEv',meds:'dMeds',labs:'dLabs'}[k])}</a>`).join('')}</div>
    <p class="muted" style="margin:0 0 4px">${hsT('dZoom')}</p>${out.join('')}`; }
function hsZoom(src){ const card=$('#hsUI .card'); if(!card) return; let z=$('#hsZoom'); if(z) z.remove();
  z=document.createElement('div'); z.id='hsZoom'; z.innerHTML=`<img src="${esc(src)}" alt="">`; z.onclick=()=>z.remove(); card.appendChild(z); sfx.click(); }
function hsOpen(){ hsCss(); sfx.paper(); let ui=$('#hsUI'); if(!ui){ ui=document.createElement('div'); ui.id='hsUI'; document.body.appendChild(ui); } HS.tab='sum'; hsRender(); }
function hsClose(){ const ui=$('#hsUI'); if(ui) ui.remove(); sfx.click(); }
document.addEventListener('keydown', e=>{ if(e.key==='Escape'&&$('#hsUI')){ e.stopPropagation(); const z=$('#hsZoom'); if(z) z.remove(); else hsClose(); } }, true);
function hsRender(){ const ui=$('#hsUI'); if(!ui) return; const games=hsGames();
  const s=games.find(g=>g.id===HS.id)||games[0]; HS.id=s?s.id:null;
  const body=!s?`<p class="msg">${hsT('none')}</p>`:
    `<div class="gp">${games.length>1?`${hsT('pick')} <select id="hsPick">${games.map(g=>`<option value="${esc(g.id)}"${g.id===s.id?' selected':''}>${esc(hsLabel(g))}</option>`).join('')}</select>`:esc(hsLabel(s))}</div>
     <div class="tabs">${[['sum','tSum'],['ask','tAsk'],['ans','tAns'],['doc','tDoc']].map(([k,l])=>`<button data-ht="${k}" class="${HS.tab===k?'on':''}">${hsT(l)}</button>`).join('')}</div>
     <div id="hsBody">${HS.tab==='ask'?hsAsk(s):HS.tab==='ans'?hsAns(s):HS.tab==='doc'?hsDocs(s):hsSum(s)}</div>`;
  if(!ui.querySelector('.card')){ ui.innerHTML=`<div class="card" role="dialog" aria-modal="true"><div class="hd"><b></b><button class="x" aria-label="close">✕</button></div><div class="bd"></div>
    <div class="ft"><span class="ro"></span><button id="hsX"></button></div></div>`;
    ui.querySelector('.hd .x').onclick=hsClose; $('#hsX').onclick=hsClose; ui.onclick=e=>{ if(e.target===ui) hsClose(); }; }
  ui.querySelector('.hd b').textContent=hsT('title'); ui.querySelector('.ft .ro').textContent=hsT('ro'); $('#hsX').textContent=hsT('close');
  const bd=ui.querySelector('.bd'); bd.innerHTML=body;
  const p=$('#hsPick'); if(p) p.onchange=e=>{ HS.id=e.target.value; sfx.click(); hsRender(); };
  ui.querySelectorAll('[data-ht]').forEach(b=>b.onclick=()=>{ HS.tab=b.dataset.ht; sfx.click(); hsRender(); bd.scrollTop=0; });
  bd.querySelectorAll('img.z').forEach(i=>i.onclick=()=>hsZoom(i.getAttribute('src')));
  bd.querySelectorAll('[data-hj]').forEach(x=>x.onclick=()=>{ const h=$('#hsd_'+x.dataset.hj); if(h) h.scrollIntoView({block:'start', behavior:'smooth'}); }); }
/* the 📜 pill sits at the top right of the title screen, left of "Choose a case" when that is shown */
function hsPlace(){ const b=$('#btnHist'), cb=$('#caseBack'); if(!b) return; b.style.right=(cb&&!cb.classList.contains('hidden')&&cb.offsetWidth?28+cb.offsetWidth+16:28)+'px'; }
function hsButton(){ const t=$('#title'); if(!t) return; hsCss(); let b=$('#btnHist');
  if(!b){ b=document.createElement('button'); b.id='btnHist'; b.onclick=hsOpen; t.appendChild(b); }
  b.textContent=hsT('btn'); hsPlace(); setTimeout(hsPlace,60); setTimeout(hsPlace,600); }
{ const f=showTitle; showTitle=function(){ const r=f.apply(this, arguments); hsButton(); return r; }; }
{ const f=applyI18n; applyI18n=function(){ const r=f.apply(this, arguments); if($('#btnHist')) hsButton(); if($('#hsUI')) hsRender(); return r; }; }
/* a choice is logged with the line that asked it (older games have no such line) */
let HS_LAST=null, HS_CHQ=null;   // the last line said, and the question label a choice may carry
{ const f=say; say=function(who, e, text){ HS_LAST=text; return f.apply(this, arguments); }; }
{ const f=choose; choose=function(opts, o){ HS_CHQ=o&&o.label||null; return f.apply(this, arguments); }; }
{ const f=logEvent; logEvent=function(o){ const q=o&&o.type==='choice'&&o.q==null?(HS_CHQ||HS_LAST):null;
    if(q){ try{ o.q=KP(Array.isArray(q)?L(q):String(q)).slice(0,240); }catch(e){} } return f.apply(this, arguments); }; }
