/* =====================================================================
   💌 A QUICK SECRET QUESTION at the very end (after the reflection questions): how was the game,
   what kind of game next, and any comments. Everything is optional and unscored; "Skip" leaves no record.
   Stored in the session as fb = {rate, next[], other, comment, at}; shown in My past games and on the instructor pages.
   ===================================================================== */
const FBT={ head:['💌 偷偷問一下','💌 A quick secret question','💌 ขอแอบถามหน่อย'],
  note:['不計分；做遊戲的人和老師會讀你寫的內容。每一題都可以不填。','Not scored — the game makers and your instructor will read it. Every part is optional.','ไม่คิดคะแนน คนทำเกมกับอาจารย์จะได้อ่าน ทุกข้อไม่ตอบก็ได้'],
  pilly:['快結束了！走之前偷偷問你一下 🤫 不計分，想答多少都可以～','Almost done! Before you go, a quick secret question 🤫 It doesn\'t count — answer as much as you like~','ใกล้จบแล้ว! ก่อนไปขอแอบถามหน่อย 🤫 ไม่คิดคะแนน ตอบแค่ไหนก็ได้~'],
  thx:['收到了！謝謝你，我們會認真看 💖','Got it — thank you! We\'ll read every word 💖','ได้รับแล้ว ขอบคุณมาก! เราจะอ่านทุกคำเลย 💖'],
  rateQ:['這個遊戲玩起來怎麼樣？','How was this game for you?','เกมนี้เป็นยังไงบ้าง?'],
  rates:[['😫','很無聊','Boring','น่าเบื่อ'],['😕','普通偏無聊','Meh','งั้นๆ'],['😐','還可以','OK','พอได้'],['🙂','好玩','Fun','สนุก'],['😍','超好玩','Loved it','สนุกมาก']],
  nextQ:['如果有下一個遊戲，你想玩哪一種？（可以複選）','If there\'s a next game, what kind would you like? (pick any)','ถ้ามีเกมต่อไป อยากได้แนวไหน? (เลือกได้หลายข้อ)'],
  genres:[
    {k:'home', ic:'🏠', t:['再來一個居家訪視推理案','Another home-visit mystery like this','เคสสืบสวนเยี่ยมบ้านแบบนี้อีก']},
    {k:'ward', ic:'🏥', t:['醫院病房：跟醫療團隊一起查房','Hospital ward rounds with the care team','วอร์ดโรงพยาบาล ราวด์กับทีมแพทย์']},
    {k:'shop', ic:'💊', t:['社區藥局櫃檯：客人一個接一個','Community pharmacy counter, one customer after another','เคาน์เตอร์ร้านยา ลูกค้าเดินเข้ามาเรื่อยๆ']},
    {k:'er', ic:'🚑', t:['急診：跟時間賽跑','Emergency room: a race against time','ห้องฉุกเฉิน แข่งกับเวลา']},
    {k:'talk', ic:'🗣️', t:['溝通練習：難搞的病人和家屬','Talking with difficult patients and families','ฝึกคุยกับผู้ป่วยและญาติที่รับมือยาก']},
    {k:'escape', ic:'🧩', t:['藥學密室逃脫解謎','Pharmacy escape-room puzzles','ไขปริศนาหนีออกจากห้องธีมเภสัช']},
    {k:'battle', ic:'⚔️', t:['跟同學對戰的搶答','A quiz battle against classmates','ควิซแข่งกับเพื่อนในห้อง']} ],
  otherPh:['其他想法？（可以不填）','Another idea? (optional)','ไอเดียอื่น? (ไม่ใส่ก็ได้)'],
  cmtQ:['對這個遊戲有什麼建議或想吐槽的嗎？','Any suggestions or complaints about this game?','มีข้อติชมหรือข้อเสนอแนะเรื่องเกมนี้ไหม?'],
  cmtPh:['哪裡好玩、哪裡卡住、哪裡想改……都可以寫（可以不填）','What was fun, where you got stuck, what to change… (optional)','ตรงไหนสนุก ติดตรงไหน อยากให้แก้อะไร… เขียนได้หมด (ไม่ใส่ก็ได้)'],
  send:['送出 💌','Send 💌','ส่ง 💌'], skip:['跳過','Skip','ข้าม'],
  /* instructor pages */
  cls:['💌 學生意見回饋','💌 Student feedback','💌 ความเห็นจากนักศึกษา'], clsNote:['{n} 人回答（不計分，可以跳過）','{n} answered (optional, unscored)','ตอบ {n} คน (ไม่บังคับ ไม่คิดคะแนน)'],
  avg:['平均','Average','เฉลี่ย'], fun:['好玩程度','How fun','ความสนุก'], nextH:['想玩的下一款','Next game wanted','เกมต่อไปที่อยากได้'], cmtH:['建議與想法','Comments & ideas','ข้อติชมและไอเดีย'],
  other:['其他','Other','อื่นๆ'], none:['還沒有人回答。','No answers yet.','ยังไม่มีใครตอบ'] };
const FB_GEN=k=>FBT.genres.find(g=>g.k===k);
/* the record of THIS game (kept with the session id, so a new game in the same page never inherits it) */
const fbOf=s=>s&&s.fb&&typeof s.fb==='object'?s.fb:null;
function fbHTML(fb){ if(!fb) return ''; const r=FBT.rates[(fb.rate||0)-1], g=(fb.next||[]).map(FB_GEN).filter(Boolean);
  return (r?`<div class="ll hrow">${r[0]} <b>${esc(r[LI()+1])}</b> <span class="muted">(${fb.rate}/5)</span></div>`:'')
    +(g.length||fb.other?`<div class="ll hrow">🎮 ${g.map(x=>x.ic+' '+esc(L(x.t))).join(' · ')}${fb.other?`${g.length?' · ':''}${esc(L(FBT.other))}: “${esc(fb.other)}”`:''}</div>`:'')
    +(fb.comment?`<div class="ll hrow free" style="white-space:pre-wrap">💬 “${esc(fb.comment)}”</div>`:''); }
function fbCss(){ if($('#fbCss')) return; const st=document.createElement('style'); st.id='fbCss'; st.textContent=`
#fbBox{position:absolute;inset:0;z-index:96;display:flex;align-items:flex-start;justify-content:center;padding-top:40px;background:rgba(20,14,45,.35)}
#fbBox .cqcard{box-shadow:0 0 0 5px #fff,0 0 0 10px #e05cb0,0 20px 50px rgba(0,0,0,.4);max-height:840px}
#fbBox .cqhead{color:#b0307a}
#fbBox .fbn{font-size:16px;font-weight:700;color:#8a83a3;margin:2px 0 10px}
#fbBox .fbq{font-size:22px;font-weight:900;color:#2a2140;margin:14px 0 8px}
#fbBox .fbr{display:flex;gap:10px}
#fbBox .fbr button{flex:1;display:flex;flex-direction:column;align-items:center;gap:2px;padding:8px 4px;border-radius:18px;background:#fff;box-shadow:inset 0 0 0 3px #eadff2;font-size:16px;font-weight:800;color:#5a4a7a}
#fbBox .fbr button b{font-size:40px;line-height:1.1}
#fbBox .fbr button.on{box-shadow:inset 0 0 0 4px #e05cb0;background:#fff0f8;color:#b0307a}
#fbBox .fbg{display:grid;grid-template-columns:1fr 1fr;gap:8px}
#fbBox .fbg button{display:flex;gap:10px;align-items:center;text-align:left;padding:10px 14px;border-radius:16px;background:#fff;box-shadow:inset 0 0 0 3px #e6dcef;font-size:19px;font-weight:700;color:#2a2140}
#fbBox .fbg button i{font-style:normal;font-size:26px}
#fbBox .fbg button.on{box-shadow:inset 0 0 0 4px #3d7bff;background:#f0f6ff}
#fbBox input,#fbBox textarea{width:100%;border:none;border-radius:16px;padding:10px 14px;font-size:19px;font-family:inherit;background:#f8f5ff;box-shadow:inset 0 0 0 3px #e2d8ff;outline:none}
#fbBox input{margin-top:8px}
#fbBox textarea{height:96px;resize:none}
#fbBox .cqfoot{display:flex;gap:12px;justify-content:flex-end;align-items:center;margin-top:14px}
#fbBox .cqfoot .sk{padding:10px 24px;border-radius:99px;background:#f1eef8;color:#6a5a8a;font-weight:900;font-size:19px}
`; document.head.appendChild(st); }
function askFeedback(){ return new Promise(res=>{ fbCss(); const host=$('#cqBox')&&$('#cqBox').parentElement||$('#stage'); if(!host){ res(null); return; }
  let box=$('#fbBox'); if(box) box.remove(); box=document.createElement('div'); box.id='fbBox'; host.appendChild(box);
  const A={rate:0, next:new Set()};
  box.innerHTML=`<div class="cqcard"><div class="cqhead"><span><span class="cqi">💌</span>${esc(L(FBT.head).replace(/^💌\s*/,''))}</span></div><div class="fbn">${esc(L(FBT.note))}</div>
    <div class="fbq">${esc(L(FBT.rateQ))}</div><div class="fbr">${FBT.rates.map((r,i)=>`<button data-r="${i+1}"><b>${r[0]}</b>${esc(r[LI()+1])}</button>`).join('')}</div>
    <div class="fbq">${esc(L(FBT.nextQ))}</div><div class="fbg">${FBT.genres.map(g=>`<button data-g="${g.k}"><i>${g.ic}</i><span>${esc(L(g.t))}</span></button>`).join('')}</div>
    <input id="fbOther" maxlength="200" placeholder="${esc(L(FBT.otherPh))}">
    <div class="fbq">${esc(L(FBT.cmtQ))}</div><textarea id="fbCmt" maxlength="2000" placeholder="${esc(L(FBT.cmtPh))}"></textarea>
    <div class="cqfoot"><button class="sk" id="fbSkip">${esc(L(FBT.skip))}</button><button class="gbtn blue" id="fbSend">${esc(L(FBT.send))}</button></div></div>`;
  box.querySelectorAll('[data-r]').forEach(b=>b.onclick=()=>{ const v=+b.dataset.r; A.rate=A.rate===v?0:v; sfx.select(); box.querySelectorAll('[data-r]').forEach(x=>x.classList.toggle('on',+x.dataset.r===A.rate)); });
  box.querySelectorAll('[data-g]').forEach(b=>b.onclick=()=>{ const k=b.dataset.g; A.next.has(k)?A.next.delete(k):A.next.add(k); sfx.select(); b.classList.toggle('on',A.next.has(k)); });
  box.querySelectorAll('input,textarea').forEach(x=>x.addEventListener('keydown',e=>e.stopPropagation()));
  const finish=fb=>{ box.remove(); res(fb); };
  $('#fbSkip').onclick=()=>{ sfx.click(); finish(null); };
  $('#fbSend').onclick=()=>{ const other=$('#fbOther').value.trim().slice(0,200), comment=$('#fbCmt').value.trim().slice(0,2000);
    if(!A.rate&&!A.next.size&&!other&&!comment){ sfx.click(); finish(null); return; }
    sfx.get(); finish({rate:A.rate||null, next:FBT.genres.map(g=>g.k).filter(k=>A.next.has(k)), other, comment, at:new Date().toISOString()}); };
}); }
/* after the reflection questions of the last checkpoint */
{ const f=runCheckpoint; runCheckpoint=async function(cp){ const r=await f.apply(this, arguments);
    if(cp==='post'&&!S.practice&&S.sessionId&&!(S.fb&&S.fb.sid===S.sessionId)){
      hideText(); await say('pilly','happy',FBT.pilly); hideText(); if(typeof pillyHide==='function') pillyHide();
      const fb=await askFeedback();
      if(fb){ S.fb=Object.assign({sid:S.sessionId}, fb); logEvent(Object.assign({type:'fb'}, fb)); saveSession(true); hideText(); await say('pilly','happy',FBT.thx); hideText(); }
      else { S.fb={sid:S.sessionId, skipped:true}; logEvent({type:'fb', skipped:true}); } }
    return r; }; }
{ const f=snapshot; snapshot=function(){ const o=f.apply(this, arguments);
    if(S.fb&&S.fb.sid===o.id&&!S.fb.skipped){ const {rate,next,other,comment,at}=S.fb; o.fb={rate,next,other,comment,at}; } return o; }; }
/* instructor pages: the student's own card, and a section in the class overview (neutral bars: a share, not a grade) */
const fbBar=(l,n,d)=>cbar2(l,n,d).replace(/<i class="[a-z]*" style="/,'<i style="background:#a78bfa;');
{ const f=studentCard; studentCard=function(s){ const h=f.apply(this, arguments), fb=fbOf(s); if(!fb) return h;
    const mark='<details style="margin-top:10px">', i=h.lastIndexOf(mark); const add=`<h4>${esc(L(FBT.cls))}</h4>${fbHTML(fb)}`;
    return i<0?h:h.slice(0,i)+add+h.slice(i); }; }
{ const f=renderClass2; renderClass2=function(b){ const r=f.apply(this, arguments);
  try{ const more=b.querySelector('details.more'); if(!more) return r;
    const list=allSessions().filter(s=>(!CLS.fin||s.done)&&(CLS.ver==='__all'||(s.cfgRev||'')===CLS.ver)&&(CLS.mode==='all'||(s.mode||'practice')===CLS.mode)&&(CLS.cls==='__all'||(s.classCode||'main')===CLS.cls));
    const got=list.filter(s=>fbOf(s)), n=got.length, rated=got.filter(s=>s.fb.rate), who=s=>esc(s.student&&s.student.name||'?');
    let h=`<div class="clsec"><h4>${esc(L(FBT.cls))}</h4><p class="muted" style="margin:-2px 0 6px">${esc(L(FBT.clsNote).replace('{n}',n))}</p>`;
    if(!n) h+=`<p class="muted">${esc(L(FBT.none))}</p>`;
    else { if(rated.length){ const avg=rated.reduce((a,s)=>a+s.fb.rate,0)/rated.length;
        h+=`<h5>${esc(L(FBT.fun))} · ${esc(L(FBT.avg))} ${avg.toFixed(1)}/5</h5>`+FBT.rates.map((x,i)=>fbBar(x[0]+' '+esc(x[LI()+1]), rated.filter(s=>s.fb.rate===i+1).length, rated.length)).join(''); }
      const cnt=FBT.genres.map(g=>[g, got.filter(s=>(s.fb.next||[]).includes(g.k)).length]).filter(x=>x[1]).sort((a,c)=>c[1]-a[1]);
      if(cnt.length) h+=`<h5>${esc(L(FBT.nextH))}</h5>`+cnt.map(([g,k])=>fbBar(g.ic+' '+esc(L(g.t)), k, n)).join('');
      const txt=got.filter(s=>s.fb.other||s.fb.comment);
      if(txt.length) h+=`<h5>${esc(L(FBT.cmtH))}</h5>`+txt.map(s=>`<div class="refl"><b>${who(s)}</b>：${s.fb.other?`🎮 ${esc(s.fb.other)}${s.fb.comment?'<br>':''}`:''}${s.fb.comment?`💬 ${esc(s.fb.comment)}`:''}</div>`).join(''); }
    more.insertAdjacentHTML('beforebegin', h+'</div>'); }catch(e){}
  return r; }; }
