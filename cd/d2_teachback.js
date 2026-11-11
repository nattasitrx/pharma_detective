/* ---------- D2 step 2: teach-back in place of the myth boss (mk_d2.py; cd/d2_teachback.js) ----------
   1. Uncle Lee shows the blue inhaler with the spacer once more. Three of the eight steps go wrong (drawn at random);
      the student stops him at the wrong ones.
   2. He reads out the memo he wrote. The wrong lines are the old myths (MYTHS), mixed with lines that are right;
      the student circles the wrong ones, then picks the correction for each one caught (the same counsel cards).
   S.boss keeps its shape (answers {p,q,text}, alive, crit/ok/miss), so the closing summary, the ending and the
   results work as before. A wrong line that was not circled is recorded with q:-1 and stays alive. */
const TB={
  demoH:['🫁 回覆示教：請李伯伯再做一次','🫁 Teach-back: Uncle Lee shows it once more','🫁 Teach-back: ให้ลุงหลี่ทำให้ดูอีกครั้ง'],
  demoS:['他做錯的那一步，馬上喊停；做對了就讓他繼續。','Stop him at a step he gets wrong; let him carry on when it is right.','ขั้นไหนลุงทำผิด ให้หยุดทันที ถ้าทำถูกก็ให้ทำต่อ'],
  step:['步驟','Step','ขั้นที่'], stop:['✋ 等一下！這一步不對','✋ Wait! That step is wrong','✋ เดี๋ยวก่อน! ขั้นนี้ไม่ถูก'], ok:['👍 做得對，繼續','👍 That is right, go on','👍 ถูกแล้ว ทำต่อ'],
  next:['繼續 ▶','Continue ▶','ต่อไป ▶'],
  hit:['✅ 抓到了！','✅ You caught it!','✅ จับได้!'], miss:['⚠️ 漏掉了——這一步他做錯了：','⚠️ Missed — he got this step wrong:','⚠️ พลาดไป ขั้นนี้ลุงทำผิด:'],
  fa:['🤔 這一步他其實做對了。打斷太多次，長輩會失去信心。','🤔 He did this step right. Stopping him too often shakes an older person\'s confidence.','🤔 ขั้นนี้ลุงทำถูกแล้ว ขัดจังหวะบ่อยไปผู้สูงอายุจะเสียความมั่นใจ'],
  fix:['正確做法：','The right way: ','วิธีที่ถูก: '],
  noteH:['📝 李伯伯的備忘錄','📝 Uncle Lee\'s memo','📝 บันทึกช่วยจำของลุงหลี่'],
  noteS:['把「寫錯」的圈起來（不只一條），再按「圈好了」。','Circle the lines that are WRONG (more than one), then press Done.','วงข้อที่ "เขียนผิด" (มีมากกว่าหนึ่งข้อ) แล้วกด "วงเสร็จแล้ว"'],
  noteN:['已圈 {n} 條','{n} circled','วงแล้ว {n} ข้อ'], noteGo:['✅ 圈好了','✅ Done','✅ วงเสร็จแล้ว'], noteNone:['至少圈一條寫錯的。','Circle at least one wrong line.','วงข้อที่ผิดอย่างน้อยหนึ่งข้อ'],
  lgHit:['圈對了','caught','วงถูก'], lgMiss:['漏掉了','missed','พลาดไป'], lgFa:['這條是對的','this one is right','ข้อนี้ถูกอยู่แล้ว'],
  fixH:['✍️ 幫他改過來','✍️ Put it right for him','✍️ ช่วยลุงแก้ให้ถูก'], fixS:['選最完整、最正確的說法。','Pick the most complete, correct wording.','เลือกคำอธิบายที่ครบและถูกที่สุด'],
};
/* slips he can make with the blue Berotec + spacer (k = the step in SIM_STEPS.spacer; f = the correction) */
const TB_SLIPS=[
 {k:'shake', t:['拔了蓋子就直接插進輔助器，沒有搖','Cap off and straight into the spacer — no shaking','ถอดฝาแล้วเสียบเข้ากระบอกช่วยสูดเลย ไม่ได้เขย่า'], f:SIM_ERR.noShake},
 {k:'out', t:['沒有先吐氣，直接含住吸嘴','Doesn\'t breathe out first — lips straight onto the mouthpiece','ไม่หายใจออกก่อน อมปากกระบอกเลย'], f:SIM_ERR.noOut},
 {k:'press', t:['連按兩下，兩噴一起噴進輔助艙','Presses twice — two puffs into the chamber at once','กดสองครั้งติดกัน พ่นสองพัฟเข้ากระบอกพร้อมกัน'], f:SIM_ERR.twoPuff},
 {k:'slow', t:['噴完先放下來喘口氣，過了好一會兒才吸','Puts it down to catch his breath and breathes in a good while later','พ่นแล้ววางลงพักหายใจก่อน สักพักใหญ่ค่อยสูด'], f:SIM_ERR.late},
 {k:'hold', t:['吸完馬上吐氣，沒有閉氣','Breathes straight out again — no breath-hold','สูดเสร็จหายใจออกทันที ไม่กลั้นหายใจ'], f:SIM_ERR.noHold},
];
/* memo lines that are right (taught earlier in the visit) */
const TB_TRUE=[
 {id:'t1', t:['藍色那支要接輔助器，一次只噴一下，慢慢吸。','The blue one goes on the spacer: one puff at a time, breathe in slowly.','อันสีฟ้าต้องต่อกระบอกช่วยสูด พ่นทีละหนึ่งครั้ง แล้วสูดช้าๆ']},
 {id:'t2', t:['綠色那支：蓋子蓋著，先把底座轉到「喀」一聲，再打開。','The green one: cap closed, turn the base until it clicks, then open it.','อันสีเขียว: ปิดฝาไว้ หมุนฐานจนดัง "คลิก" ก่อน แล้วค่อยเปิดฝา']},
 {id:'t3', t:['看病、領藥都要帶健保卡和所有的藥袋。','Take my NHI card and all my medicine bags to every doctor and pharmacy.','ไปหาหมอหรือรับยาทุกครั้ง ต้องเอาบัตรประกันสุขภาพกับซองยาทั้งหมดไปด้วย']},
];
function tbHost(){ let o=$('#tback'); if(!o){ o=document.createElement('div'); o.id='tback'; o.className='hidden'; $('#stage').appendChild(o); } return o; }
function tbHide(){ const o=$('#tback'); if(o){ o.classList.add('hidden'); } }
function tbLines(){ const my=MYTHS.filter(m=>m.p!=='P8'||S.found.P8), tr=TB_TRUE.slice(), out=[];
  my.forEach((m,i)=>{ out.push({p:m.p, t:m.m}); if((i===1||i===4||i===6)&&tr.length) out.push(tr.shift()); }); return out; }

/* 1 — he shows the inhaler again: stop him at the wrong steps */
async function tbDemo(){ const B=S.boss, steps=SIM_STEPS.spacer;
  if(!B.demo) B.demo={slips:TB_SLIPS.map(x=>x.k).sort(()=>Math.random()-.5).slice(0,3), ans:[]};
  const d=B.demo, o=tbHost();
  const dots=()=>steps.map((s,i)=>{ const a=d.ans[i]; return `<i class="${!a?'':a.slip&&a.stop?'hit':a.slip?'miss':a.stop?'fa':'okd'}${i===d.ans.length?' cur':''}"></i>`; }).join('');
  for(let i=d.ans.length;i<steps.length;i++){ resumePoint();
    const [k,t,e]=steps[i], slip=d.slips.includes(k)?TB_SLIPS.find(x=>x.k===k):null;
    o.className='demo'; o.innerHTML=`<div class="tb-head"><b>${esc(L(TB.demoH))}</b><span class="tb-sub">${esc(L(TB.demoS))}</span><span class="tb-dots">${dots()}</span></div>
      <div class="tb-main"><div class="tb-face">${charSVG('chen',slip?'smug':'happy')}</div>
        <div class="tb-step"><div class="tb-n">${esc(L(TB.step))} ${i+1}/${steps.length}</div><div class="tb-e">${e}</div><div class="tb-t">${esc(L(slip?slip.t:t))}</div><div class="tb-fb"></div></div></div>
      <div class="tb-btns"><button type="button" class="tb-b stop" data-a="stop">${esc(L(TB.stop))}</button><button type="button" class="tb-b ok" data-a="ok">${esc(L(TB.ok))}</button></div>`;
    sfx.paper();
    const a=await new Promise(res=>o.querySelectorAll('.tb-b').forEach(b=>b.onclick=()=>res(b.dataset.a)));
    const stop=a==='stop'; d.ans.push({k, slip:!!slip, stop});
    const fb=o.querySelector('.tb-fb'), face=o.querySelector('.tb-face'); o.querySelector('.tb-dots').innerHTML=dots();
    if(!slip&&!stop){ sfx.select(); await sleep(260); continue; }
    if(slip&&stop){ sfx.get(); fb.className='tb-fb hit'; fb.innerHTML=`<b>${esc(L(TB.hit))}</b> ${esc(L(TB.fix))}${esc(L(slip.f))}`; face.innerHTML=charSVG('chen','embarrassed'); }
    else if(slip){ sfx.error(); fb.className='tb-fb miss'; fb.innerHTML=`<b>${esc(L(TB.miss))}</b> ${esc(L(slip.f))}`; face.innerHTML=charSVG('chen','think'); }
    else { sfx.error(); fb.className='tb-fb fa'; fb.innerHTML=esc(L(TB.fa)); face.innerHTML=charSVG('chen','think'); }
    o.querySelector('.tb-btns').innerHTML=`<button type="button" class="tb-b go">${esc(L(TB.next))}</button>`;
    saveMid(); await new Promise(res=>o.querySelector('.tb-b.go').onclick=()=>{ sfx.click(); res(); });
  }
  if(!d.done){ d.found=d.ans.filter(a=>a.slip&&a.stop).length; d.fa=d.ans.filter(a=>!a.slip&&a.stop).length; d.done=1;
    logEvent({type:'teachback', found:d.found, of:d.slips.length, falseAlarm:d.fa, slips:d.slips.slice()});
    if(d.found===d.slips.length&&!d.fa) addTrust(1); }
  tbHide();
}
/* 2a — the memo: circle the wrong lines */
function tbNote(lines){ return new Promise(res=>{ const o=tbHost(), sel=new Set(), rows=Math.ceil(lines.length/2);
  o.className='note'; o.innerHTML=`<div class="tb-head"><b>${esc(L(TB.noteH))}</b><span class="tb-sub">${esc(L(TB.noteS))}</span></div>
    <div class="tb-note" style="grid-template-rows:repeat(${rows},1fr)">${lines.map((l,i)=>`<button type="button" class="tb-line" data-i="${i}"><span class="tb-no">${i+1}.</span><span>${esc(L(l.t))}</span><em></em></button>`).join('')}</div>
    <div class="tb-btns"><span class="tb-cnt"></span><button type="button" class="tb-b go">${esc(L(TB.noteGo))}</button></div>`;
  const cnt=()=>o.querySelector('.tb-cnt').textContent=L(TB.noteN).replace('{n}',sel.size); cnt(); sfx.paper();
  o.querySelectorAll('.tb-line').forEach(b=>b.onclick=()=>{ const i=+b.dataset.i; if(sel.has(i)) sel.delete(i); else sel.add(i); b.classList.toggle('on',sel.has(i)); sfx.click(); cnt(); });
  o.querySelector('.tb-b.go').onclick=()=>{ if(!sel.size){ sfx.error(); toast(L(TB.noteNone)); return; }
    o.querySelectorAll('.tb-line').forEach(b=>{ const l=lines[+b.dataset.i], on=sel.has(+b.dataset.i); b.onclick=null; b.disabled=true;
      const c=l.p?(on?'hit':'miss'):(on?'fa':''); if(c){ b.classList.add(c); b.querySelector('em').textContent=L(c==='hit'?TB.lgHit:c==='miss'?TB.lgMiss:TB.lgFa); } });
    const hit=lines.filter((l,i)=>l.p&&sel.has(i)).length; (hit?sfx.get:sfx.error)();
    o.querySelector('.tb-btns').innerHTML=`<button type="button" class="tb-b go">${esc(L(TB.next))}</button>`;
    o.querySelector('.tb-b.go').onclick=()=>{ sfx.click(); res([...sel]); }; }; }); }
/* 2b — the correction for one line that was caught */
function tbCards(m, n, of){ return new Promise(res=>{ const o=tbHost(), cards=m.c.map(c=>({q:c[0], t:c[1]})).sort(()=>Math.random()-.5);
  o.className='fix'; o.innerHTML=`<div class="tb-head"><b>${esc(L(TB.fixH))} ${n}/${of}</b><span class="tb-sub">${esc(L(TB.fixS))}</span></div>
    <div class="tb-quote"><div class="tb-face sm">${charSVG('chen','smug')}</div><div class="tb-q">「${esc(L(m.m))}」</div></div>
    <div class="tb-cards">${cards.map((c,j)=>`<button type="button" class="ccard" data-j="${j}" style="animation-delay:${j*.1}s"><div class="ct">🃏 ${T('cardBest')} ${j+1}</div>${esc(L(c.t))}</button>`).join('')}</div>`;
  sfx.slam(); o.querySelectorAll('.ccard').forEach(b=>b.onclick=()=>{ sfx.select(); o.querySelectorAll('.ccard').forEach(x=>x.onclick=null); b.classList.add('fly'); setTimeout(()=>res(cards[+b.dataset.j]),420); }); }); }

async function chapter5(){
  S.chStart=realSec(); hideAll(); playTheme('calm');
  await chapterCard(5);
  setBg('liv'); const B=S.boss; if(!B.answers.length&&!B.demo){ B.combo=0; B.alive=[]; B.byFinal=[]; }
  show('chen','C','happy'); show('me','L','neutral'); show('yeh','R','smug');
  if(!B.demo||!B.demo.done){
    if(!B.demo){
      await say('yeh','smug',[`${nm()}，最後一步是「回覆示教」（teach-back）。衛教講完不算數——要他自己做一次、說一次，我們親眼看到才算。`,`${nm()}, the last step is teach-back. Telling him is not enough — he has to do it and say it himself, and we have to see it.`,`${nm()} ขั้นสุดท้ายคือ teach-back สอนจบยังไม่นับ ต้องให้ลุงทำเองและพูดเองให้เราเห็นกับตา`]);
      await say('yeh','neutral',['李伯伯，藍色那支接上輔助器，再做一次給我們看好嗎？','Uncle Lee, would you fit the blue one to the spacer and show us once more?','ลุงหลี่ ช่วยต่ออันสีฟ้าเข้ากับกระบอกช่วยสูด แล้วทำให้ดูอีกครั้งได้ไหม?']);
      await say('chen','smug',['沒問題！老兵學過的操典不會忘。看我的！','No problem! An old soldier doesn\'t forget his drill. Watch me!','ไม่มีปัญหา! ทหารแก่ฝึกแล้วไม่ลืมหรอก ดูลุงนะ!']);
      await say('pilly','think',['盯著他的每一步：做錯就按「✋ 等一下」，做對就讓他繼續。','Watch every step: press "✋ Wait" when it is wrong, and let him go on when it is right.','จับตาดูทุกขั้น: ทำผิดกด "✋ เดี๋ยวก่อน" ทำถูกก็ให้ลุงทำต่อ']);
    }
    hideText(); await tbDemo(); const d=B.demo;
    await say('yeh', d.found===d.slips.length&&!d.fa?'happy':'think', [
      `三個失誤你抓到了 ${d.found} 個。${d.fa?`有 ${d.fa} 步他其實做對了，你卻喊停。`:''}${d.found===d.slips.length&&!d.fa?'看得很仔細！':'回覆示教就是要一步一步看，漏掉的地方當場再教一次。'}`,
      `You caught ${d.found} of his 3 slips. ${d.fa?`You stopped him at ${d.fa} step${d.fa>1?'s':''} he had right. `:''}${d.found===d.slips.length&&!d.fa?'Sharp eyes!':'Teach-back means watching step by step, and teaching the missed part again on the spot.'}`,
      `ลุงพลาด 3 จุด คุณจับได้ ${d.found} จุด ${d.fa?`มี ${d.fa} ขั้นที่ลุงทำถูกแล้วแต่คุณสั่งหยุด `:''}${d.found===d.slips.length&&!d.fa?'สังเกตละเอียดมาก!':'teach-back คือการดูทีละขั้น จุดที่พลาดต้องสอนซ้ำทันที'}`]);
    await say('chen','happy',['再來一次……搖一搖、插進去、吐氣、含住、按一下、慢慢吸、憋住……呼！這次對了吧？','Once more… shake, push it in, breathe out, lips on, one press, slow breath in, hold… phew! Right this time?','อีกครั้ง… เขย่า เสียบ หายใจออก อม กดหนึ่งที สูดช้าๆ กลั้นไว้… ฟู่! คราวนี้ถูกแล้วใช่ไหม?']);
    saveMid();
  }
  const lines=tbLines(), myths=lines.filter(l=>l.p).map(l=>mythOf(l.p));
  if(!B.note){
    await say('chen','smug',['你們講的我都抄在備忘錄上了，要貼在床頭每天看！我唸給你們聽——','I wrote down everything you said in my memo — it goes up by the bed, to read every day! Let me read it out —','ที่พวกคุณพูด ลุงจดไว้ในบันทึกช่วยจำหมดแล้ว จะแปะไว้หัวเตียงอ่านทุกวัน! ลุงอ่านให้ฟังนะ —']);
    await say('yeh','think',['（小聲）他寫的不一定都對。把寫錯的圈出來，我們當場幫他改。','(quietly) Not everything he wrote is right. Circle the wrong lines and we will put them right here and now.','(กระซิบ) ที่ลุงจดไม่ได้ถูกทุกข้อ วงข้อที่ผิดไว้ แล้วเราจะช่วยแก้ตรงนี้เลย']);
    hideText(); resumePoint(); const sel=await tbNote(lines); tbHide();
    const caught=lines.filter((l,i)=>l.p&&sel.includes(i)).map(l=>l.p), missed=lines.filter((l,i)=>l.p&&!sel.includes(i)).map(l=>l.p), fa=lines.filter((l,i)=>!l.p&&sel.includes(i)).length;
    B.note={caught, missed, fa}; missed.forEach(p=>{ B.answers.push({p, q:-1, text:'(not circled)'}); B.miss++; B.alive.push(p); });
    logEvent({type:'memo', caught, missed, falseAlarm:fa});
    await say('yeh', !missed.length&&!fa?'happy':'think', [
      `${myths.length} 條寫錯的，你圈出了 ${caught.length} 條。${missed.length?`漏掉的 ${missed.length} 條還留在備忘錄上，最後總結時要再說清楚。`:''}${fa?`另外有 ${fa} 條其實寫對了。`:''}${caught.length?'現在一條一條幫他改。':''}`,
      `${myths.length} lines were wrong and you circled ${caught.length}. ${missed.length?`The ${missed.length} you missed ${missed.length>1?'are':'is'} still on the memo — make ${missed.length>1?'them':'it'} clear in your closing summary. `:''}${fa?`${fa} line${fa>1?'s':''} you circled ${fa>1?'were':'was'} in fact right. `:''}${caught.length?'Now put them right, one by one.':''}`,
      `มีข้อที่เขียนผิด ${myths.length} ข้อ คุณวงได้ ${caught.length} ข้อ ${missed.length?`อีก ${missed.length} ข้อที่พลาดยังอยู่ในบันทึก ตอนสรุปปิดท้ายต้องพูดให้ชัด `:''}${fa?`และมี ${fa} ข้อที่จริงๆ เขียนถูกแล้ว `:''}${caught.length?'ทีนี้ช่วยลุงแก้ทีละข้อ':''}`]);
    saveMid();
  }
  const todo=B.note.caught.map(p=>mythOf(p));
  for(let i=0;i<todo.length;i++){ const m=todo[i]; if(B.answers.some(a=>a.p===m.p)) continue;
    resumePoint(); hideText(); const card=await tbCards(m, i+1, todo.length), q=card.q; tbHide();
    B.answers.push({p:m.p, q, text:L(card.t)}); logEvent({type:'boss', p:m.p, q});
    if(q===2){ B.crit++; B.combo++; B.maxCombo=Math.max(B.maxCombo||0,B.combo); sfx.crit(); emo('chen','happy'); }
    else if(q===1){ B.ok++; B.combo=0; B.alive.push(m.p); sfx.hit(); emo('chen','think'); }
    else { B.miss++; B.combo=0; B.alive.push(m.p); sfx.error(); emo('chen','smug'); }
    const sv=q<2?' '+T('mythSurv'):'';
    await say('yeh', q===2?'happy':q===1?'think':'sad', [ (q===2?'完美！':q===1?'方向對，但不夠完整。':'不對喔！')+m.x[0]+sv, (q===2?'Perfect! ':q===1?'Right idea, but incomplete. ':'Nope! ')+m.x[1]+sv, (q===2?'เยี่ยม! ':q===1?'มาถูกทาง แต่ยังไม่ครบ ':'ไม่ใช่นะ! ')+m.x[2]+sv ]);
  }
  emo('chen','think');
  await say('chen','think',['……可是這麼多，我還是記不住啦！','…but that is a lot — I still can\'t remember it all!','…แต่เยอะขนาดนี้ ลุงก็ยังจำไม่ได้หมดหรอก!']);
  if(B.alive.length) await say('pilly','shock',[`還有 ${B.alive.length} 個錯誤觀念沒改過來！最後的總結要把它們說清楚，不然李伯伯會照著舊想法做。`,`${B.alive.length} wrong idea${B.alive.length>1?'s are':' is'} still standing! Make ${B.alive.length>1?'them':'it'} clear in your closing summary, or Uncle Lee will go on as before.`,`ยังมีความเชื่อผิดอีก ${B.alive.length} ข้อที่ยังไม่ได้แก้! สรุปปิดท้ายต้องพูดให้ชัด ไม่งั้นลุงหลี่จะทำแบบเดิมต่อไป`]);
  else await say('pilly','happy',['最後一步！用你自己的話幫李伯伯「總結」——讓他記得住！','One last step! Summarise everything for Uncle Lee in your own words — make it stick!','ขั้นสุดท้าย! สรุปทุกอย่างให้ลุงหลี่ฟังด้วยคำพูดของคุณ ให้ลุงจำได้!']);
  hideText();
  resumePoint(); const txt=await finalInput(B.alive.slice());
  S.finalText=txt; S.finalCov=sumCoverage(txt);
  const hit=B.alive.filter(p=>mythHit(txt,p)); B.byFinal=hit; B.alive=B.alive.filter(p=>!hit.includes(p));
  logEvent({type:'final', text:txt, cov:S.finalCov, mythsHit:hit, mythsLeft:B.alive.slice()});
  await say('me','smug',txt);
  const cov=S.finalCov.filter(Boolean).length;
  if(!B.alive.length){
    await splash('victory','gold','fanfare'); bgFx('rays'); show('chen','C','happy'); show('me','L','happy'); show('yeh','R','happy');
    await say('chen',cov>=3?'happy':'think',['原來是這樣！我終於懂每種藥是做什麼的了。備忘錄我重抄一張，照你說的做！','I see now! I finally understand what each medicine is for. I\'ll write the memo out again and do what you said!','อ๋อ อย่างนี้นี่เอง! ลุงเข้าใจแล้วว่ายาแต่ละตัวไว้ทำอะไร ลุงจะจดบันทึกใหม่แล้วทำตามที่หนูบอก!']);
  } else {
    show('chen','C','think'); show('me','L','neutral'); show('yeh','R','think');
    const p0=MYTH_SEVERITY.find(p=>B.alive.includes(p))||B.alive[0];
    await say('chen','think',T('chenStill').replace('{q}',L(mythOf(p0).m)));
    await say('yeh','sad',[`還有 ${B.alive.length} 個錯誤觀念留在他心裡。兩週後，我們就會看到後果。`,`${B.alive.length} wrong idea${B.alive.length>1?'s are':' is'} still in his head. Two weeks from now we will see what ${B.alive.length>1?'they do':'it does'}.`,`ยังมีความเชื่อผิด ${B.alive.length} ข้อค้างอยู่ในใจลุง อีกสองสัปดาห์เราจะได้เห็นผลของมัน`]);
  }
  await say('yeh','smug',[`總結涵蓋了 ${cov}/${RUBRIC_SUM.length} 個重點。${cov>=4?'非常專業！':cov>=2?'不錯，下次記得請他複述、約好追蹤喔。':'下次試著總結重點、請他複述、並約好追蹤。'}`,`Your summary covered ${cov}/${RUBRIC_SUM.length} key elements. ${cov>=4?'Very professional!':cov>=2?'Good — next time also ask him to repeat back and set a follow-up.':'Next time: summarize, use teach-back, and set a follow-up.'}`,`สรุปครอบคลุม ${cov}/${RUBRIC_SUM.length} ประเด็นหลัก ${cov>=4?'มืออาชีพมาก!':cov>=2?'ดีแล้ว ครั้งหน้าอย่าลืมให้ลุงทวนซ้ำและนัดติดตามนะ':'ครั้งหน้าลองสรุปประเด็น ให้ลุงทวนซ้ำ และนัดติดตาม'}`]);
  chapterDone(5);
}
