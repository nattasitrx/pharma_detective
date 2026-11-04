/* =====================================================================
   STORY — Chapter 3 (contradiction duel + heart lock)
   ===================================================================== */
/* Each statement has ONE ⟦key phrase⟧ and exactly ONE item that directly contradicts it (need).
   near = related items that do not directly disprove the key phrase → no heart lost, a hint instead. */
const TESTI=[
 {id:'s1', need:['calendar'], near:['hospB_bag','endo_bag','pilljar','trash_bags'], p:'P1',
  st:['三月？我⟦幾乎天天都在店裡顧店⟧，哪有空到處跑醫院！','March? I was ⟦minding the shop practically every day⟧ — no time to run around to hospitals!','เดือนมีนาฯ เหรอ? ลุง⟦เฝ้าร้านแทบทุกวัน⟧ จะเอาเวลาที่ไหนไปตระเวนหาหมอ!'],
  press:[['chen','smug',['每天都一樣：開店、顧店、關店。日子規律到連牆上的月曆都不用看！','Every day\'s the same: open up, mind the shop, close. So regular I never even look at the wall calendar!','ทุกวันเหมือนเดิม เปิดร้าน เฝ้าร้าน ปิดร้าน ปกติจนไม่ต้องดูปฏิทินบนผนังเลย!']]],
  hint:['這證明他有去看醫生，但他說的是⟦幾乎天天⟧都在店裡。有沒有證物能看出他三月「每一天」的行程？','That proves he saw a doctor, but his claim is about ⟦practically every day⟧. Which evidence shows his whole March, day by day?','อันนี้พิสูจน์ว่าลุงไปหาหมอ แต่ลุงพูดว่า "⟦แทบทุกวัน⟧" หลักฐานไหนที่เห็นตารางทั้งเดือนมีนาฯ แบบรายวัน?'],
  solve:[['chen','shock',['呃——！那、那個月曆……','Uh—! Th-that calendar…','เอ๊ะ—! ปะ…ปฏิทินนั่น…']],['chen','embarrassed',['好啦……其實大大小小醫院診所都有去，一個月四十幾次……','Okay… actually I go to all kinds of hospitals and clinics. Forty-something times a month…','ก็ได้… จริงๆ ลุงไปทั้งโรงพยาบาลใหญ่ คลินิกเล็ก เดือนละสี่สิบกว่าครั้ง…']],['yeh','angry',['多重就醫最大的風險，就是重複用藥和藥物交互作用！','The biggest danger of doctor-shopping is duplicate drugs and interactions!','อันตรายที่สุดของการไปหาหมอหลายที่คือยาซ้ำซ้อนและยาตีกัน!']]]},
 {id:'s2', need:['pilljar'], near:['pillbox','endo_bag','hospB_bag'], p:'P6',
  st:['鼻子過敏的藥，A 醫院、B 醫院、診所都有開，但我⟦絕對分開吃，從來不混在一起⟧！','My allergy medicine comes from Hospital A, Hospital B and the clinic — but I ⟦keep them strictly separate, never mixed together⟧!','ยาภูมิแพ้จมูกได้มาจาก รพ.A รพ.B และคลินิก แต่ลุง⟦แยกกินเด็ดขาด ไม่เคยผสมรวมกัน⟧!'],
  press:[['chen','smug',['嘿嘿，不過我有自己的「秘方」，收在神明桌，神明會保佑的啦！','Heh heh, but I have my own "secret recipe" — kept at the altar, the gods will bless it!','เหะๆ แต่ลุงมี "สูตรลับ" เก็บไว้ที่โต๊ะบูชา เทพจะคุ้มครอง!']]],
  hint:['這個證物看不出「不同醫生的藥混在一起」。他說⟦絕對分開、不混⟧——你在哪裡看過各種顏色的藥丸全倒在一起？','This doesn\'t show different doctors\' pills mixed together. His claim is ⟦strictly separate, never mixed⟧ — where did you see pills of every color jumbled up?','หลักฐานนี้ไม่ได้แสดงว่ายาจากหลายหมอถูกผสมกัน ลุงพูดว่า "⟦แยกกินเด็ดขาด ไม่ผสม⟧" เคยเห็นยาหลากสีเทรวมกันอยู่ที่ไหน?'],
  solve:[['chen','shock',['啊！我的秘方罐！','Ah! My secret-recipe jar!','อ๊ะ! โหลสูตรลับของลุง!']],['chen','embarrassed',['不同醫生的藥混在一起吃，效果比較強嘛……醫生？沒跟他們說啦。','Mixing different doctors\' pills makes them stronger, right…? The doctors? I didn\'t tell them.','ผสมยาหลายหมอกินรวมกันได้ผลแรงกว่านี่นา… หมอเหรอ? ไม่ได้บอกหรอก']],['yeh','shock',['混著吃可能重複用藥、過量！而且醫生完全不知道！','Mixing them risks duplication and overdose — and none of the doctors know!','ผสมกินเสี่ยงยาซ้ำและเกินขนาด! แถมหมอไม่รู้เลย!']]]},
 {id:'s3', need:['trash_bags'], near:['pillbox','endo_bag','hospB_bag','pilljar'], p:'P9',
  st:['骨科、家醫科開的⟦關節痛藥⟧，我每一包都吃得乾乾淨淨！','The ⟦joint-pain medicine⟧ from the orthopedic and family clinics? I finished every last bag!','⟦ยาแก้ปวดข้อ⟧ที่คลินิกกระดูกกับเวชฯ ครอบครัวให้มา ลุงกินหมดเกลี้ยงทุกซอง!'],
  press:[['chen','neutral',['吃完的空藥袋當然就丟垃圾桶啦，家裡才乾淨嘛。','Of course the empty bags go in the trash — keeps the house tidy.','ซองเปล่าที่กินหมดแล้วก็ต้องทิ้งถังขยะสิ บ้านจะได้สะอาด']]],
  hint:['這裡面沒有骨科、家醫科的關節痛藥喔。他說的是⟦關節痛藥⟧——找找那些診所的藥袋最後去了哪裡。','That doesn\'t contain the orthopedic or family-clinic joint-pain medicine. His claim is about the ⟦joint-pain medicine⟧ — find out where those clinics\' bags ended up.','ในนี้ไม่มียาปวดข้อจากคลินิกกระดูกหรือเวชฯ ครอบครัวนะ ลุงพูดถึง "⟦ยาแก้ปวดข้อ⟧" ลองตามดูว่าซองยาจากคลินิกพวกนั้นไปอยู่ไหน'],
  solve:[['chen','shock',['那、那是……還沒拆的……','Th-those are… unopened…','นั่น…นั่นมัน… ยังไม่ได้แกะ…']],['chen','sad',['關節痠痛的藥啦……骨科、家醫科、內科都有拿，可是我覺得不嚴重，就丟了。','Joint-pain medicine… from orthopedics, family medicine, internal medicine. I didn\'t think it was serious, so I tossed it.','ยาปวดข้อน่ะ… ได้มาจากคลินิกกระดูก ครอบครัว อายุรกรรม แต่ลุงว่าไม่หนัก เลยทิ้งไป']],['yeh','think',['拿了不吃又丟掉——浪費資源，而且關節痛的原因也還沒查清楚。','Collected, not taken, thrown away — wasteful, and the cause of the joint pain is still unknown.','รับมาแต่ไม่กินแล้วทิ้ง สิ้นเปลือง และยังไม่รู้สาเหตุของอาการปวดข้อเลย']]]},
 {id:'s4', need:['takeout'], near:['beer'], p:'P4',
  st:['我們家⟦三餐都自己煮⟧，冰箱裡都是新鮮青菜！','We ⟦cook all three meals at home⟧ — the fridge is full of fresh vegetables!','บ้านเรา⟦ทำกับข้าวกินเองทุกมื้อ⟧ ตู้เย็นมีแต่ผักสดๆ!'],
  press:[['chen','happy',['我太太手藝很好喔！雖然最近……比較少開火啦。','My wife\'s a great cook! Though lately… the stove hasn\'t been on much.','ภรรยาลุงทำอาหารเก่งนะ! ถึงช่วงนี้… จะไม่ค่อยได้เปิดเตาก็เถอะ']]],
  hint:['啤酒是另一個問題。他說⟦三餐都自己煮⟧——冰箱上層放的「食物」是什麼？','Beer is a separate problem. His claim is ⟦cooking all three meals at home⟧ — what FOOD is on the fridge\'s top shelf?','เบียร์เป็นอีกปัญหาหนึ่ง ลุงพูดว่า "⟦ทำกับข้าวกินเองทุกมื้อ⟧" ตู้เย็นชั้นบนมี "อาหาร" อะไรอยู่?'],
  solve:[['wife','sad',['……唉。','…Sigh.','…เฮ้อ']],['chen','embarrassed',['好啦好啦……其實都在外面吃，餐廳、小吃攤，方便嘛。','Fine, fine… we actually eat out all the time — restaurants, food stalls. It\'s convenient.','ก็ได้ๆ… จริงๆ กินข้างนอกตลอด ร้านอาหาร แผงลอย สะดวกดี']]]},
 {id:'s5', need:['beer'], near:['takeout'], p:'P3',
  st:['酒？我⟦一天頂多喝一瓶⟧，很節制的！','Alcohol? ⟦One bottle a day, tops⟧ — I\'m very moderate!','เหล้าเหรอ? ลุง⟦ดื่มวันละขวดเดียวเท่านั้น⟧ พอประมาณมาก!'],
  press:[['chen','smug',['冰箱那幾瓶是招待客人的啦。空瓶？那是……要拿去回收的。','The bottles in the fridge are for guests. The empties? Those are… for recycling.','ที่อยู่ในตู้เย็นไว้รับแขก ขวดเปล่าเหรอ? นั่น… เก็บไว้ขายของเก่า']]],
  hint:['那是食物和含糖飲料，不是酒。他說⟦一天頂多一瓶⟧——冰箱下層和牆角堆的是什麼？','Those are food and sugary drinks, not alcohol. He claims ⟦one bottle a day, tops⟧ — what\'s packed in the bottom of the fridge and piled in the corner?','นั่นเป็นอาหารกับน้ำหวาน ไม่ใช่เหล้า ลุงบอกว่า "⟦วันละขวดเดียว⟧" ตู้เย็นชั้นล่างกับมุมห้องมีอะไรกองอยู่?'],
  solve:[['chen','shock',['那、那麼多……','Th-that many…','เยอะ…เยอะขนาดนั้น…']],['chen','sad',['……一天大概兩箱台啤。我也知道太多了，想戒啦……','…About two cases of Taiwan Beer a day. I know it\'s too much — I want to quit…','…วันละประมาณสองลัง ลุงก็รู้ว่าเยอะไป อยากเลิกนะ…']],['yeh','neutral',['啤酒會讓尿酸升高，也會影響血糖和肝臟喔。','Beer raises uric acid and also affects blood sugar and the liver.','เบียร์ทำให้กรดยูริกสูง และยังส่งผลต่อน้ำตาลกับตับด้วย']]]},
 {id:'s6', need:['cigs'], near:[], p:'P2',
  st:['店裡那些菸⟦全部都是要賣給客人的⟧，我自己一天才幾根！咳咳……','Those cigarettes in the shop are ⟦all stock for customers⟧ — I only smoke a few a day! *cough*…','บุหรี่ในร้าน⟦เป็นของขายลูกค้าทั้งหมด⟧ ลุงเองสูบวันละไม่กี่มวน! แค่กๆ…'],
  press:[['chen','cough',['咳……這是感冒啦！不信你去貨架上看看，每一條都是商品！','*cough*… it\'s just a cold! Go check the shelf — every carton is merchandise!','แค่ก… แค่หวัดเอง! ไม่เชื่อไปดูที่ชั้นวางสิ ทุกคอตตอนเป็นสินค้า!']]],
  hint:['','',''],
  solve:[['chen','shock',['「自己的」……我寫的……','"Mine"… I wrote that…','"ของฉัน"… ลุงเขียนเอง…']],['chen','sad',['好啦……長壽一天三包。我真的想戒，可是好難……','Okay… three packs of Long Life a day. I really want to quit, but it\'s so hard…','ก็ได้… Long Life วันละสามซอง ลุงอยากเลิกจริงๆ แต่มันยาก…']]]},
];
const WRONG_LINES=[['這跟我說的有什麼關係？','What does that have to do with what I said?','มันเกี่ยวอะไรกับที่ลุงพูด?'],['你在找我麻煩喔？','Are you trying to pick on me?','จะมาหาเรื่องลุงเหรอ?'],['蛤？聽不懂啦！','Huh? I don\'t get it!','หา? ไม่เข้าใจ!']];
const NEAR_LINES=[['嗯？這個……跟我剛剛說的那句不太一樣吧？','Hm? That\'s… not exactly what I just said, is it?','หือ? อันนี้… ไม่ตรงกับที่ลุงเพิ่งพูดนะ?'],['哼，那又怎樣？證明不了我剛剛說的啦！','Hmph, so what? That doesn\'t disprove what I said!','ฮึ แล้วไง? มันไม่ได้หักล้างที่ลุงพูดสักหน่อย!']];
const presentAs=ev=>[`請看這個——「${ITEMS[ev].n[0]}」！`,`Take a look at this — "${ITEMS[ev].n[1]}"!`,`ดูนี่สิ — "${ITEMS[ev].n[2]}"!`];
const presentUm=ev=>[`呃……請看「${ITEMS[ev].n[0]}」！`,`Um… look at "${ITEMS[ev].n[1]}"!`,`เอ่อ… ดู "${ITEMS[ev].n[2]}"!`];
/* evidence tray — o.claim: the statement being challenged · o.tried: items already tried on it */
function openTray(o){ o=o||{}; return new Promise(res=>{
  $('#trayTitle').textContent=T('trayTitle');
  const cl=$('#trayClaim'); cl.classList.toggle('hidden',!o.claim);
  if(o.claim) cl.innerHTML=`<div class="who">💬 ${T('claimLbl')}</div><div class="st">「${kpHTML(L(o.claim))}」</div><div class="ct">🔎 ${T('claimTip')}</div>`;
  const tried=o.tried||[];
  $('#trayItems').innerHTML=S.evidence.map((id,i)=>{ const used=S.usedEv.includes(id), tr=!used&&tried.includes(id);
    return `<button class="ecard${used?' used':''}${tr?' tried':''}" data-e="${id}" style="animation-delay:${i*.03}s"><div class="ic">${itemIcon(id,52)}</div><b>${esc(L(ITEMS[id].n))}</b><span class="loc">📍 ${esc(L(ITEMS[id].loc))}</span>${used?`<span class="stamp">${T('usedTag')}</span>`:tr?`<span class="stamp">${T('triedTag')}</span>`:''}</button>`; }).join('')||`<p style="color:#fff">${T('noEvidence')}</p>`;
  $('#tray').classList.remove('hidden'); sfx.paper();
  const done=v=>{ $('#tray').classList.add('hidden'); res(v); };
  $('#trayItems').querySelectorAll('[data-e]').forEach(b=>b.onclick=()=>{ if(b.classList.contains('used')||b.classList.contains('tried')){ sfx.error(); b.animate([{transform:'translateX(-6px)'},{transform:'translateX(6px)'},{transform:'none'}],{duration:220}); return; } sfx.select(); done(b.dataset.e); });
  $('#trayClose').onclick=()=>{ sfx.click(); done(null); };
}); }
async function sayLines(arr){ for(const [w,e,t] of arr){ if(w==='wife'&&!CH.wife) show('wife','R',e); if(w==='yeh'&&!CH.yeh) show('yeh','R',e); await say(w,e,t); } }
async function loseHeart(){
  S.hearts--; S.wrong++; sfx.heartLose(); spend(CONFIG.COST_WRONG); hud(); shakeStage();
  if(S.hearts<=0){ await say('chen','angry',['我累了……不想講了啦！','I\'m tired… I don\'t want to talk anymore!','ลุงเหนื่อยแล้ว… ไม่อยากคุยแล้ว!']);
    await say('yeh','think',[`${nm()}，冷靜。重新整理證據，想想哪一句話跟哪個證物矛盾。`,`${nm()}, calm down. Re-check the evidence: which statement contradicts which item?`,`${nm()} ใจเย็นๆ ทบทวนหลักฐานใหม่ ประโยคไหนขัดกับหลักฐานชิ้นไหน?`]);
    S.hearts=3; S.resets++; spend(5); hud(); logEvent({type:'reset'}); }
}
function showStatement(i, solved, lost){
  const s=TESTI[i]; D.cur={who:'chen', text:s.st}; D.res=null; D.waiting=false; D.lastAsk=null; lost=lost||{};
  const tb=$('#tbox'); tb.classList.remove('hidden','me','sys'); tb.classList.add('testi'); $('#tName').innerHTML=esc(T('chen')+'  〔'+(i+1)+'/'+TESTI.length+'〕'+(solved[s.id]?' ✓':''))+(lost[s.id]?`<span class="np">${T('notProvable')}</span>`:''); D.lastName='';
  pillyHide(); ['yeh','wife'].forEach(k=>CH[k]&&hide(k)); focusSpeaker('chen'); emo('chen', solved[s.id]?'embarrassed':'smug'); startTyping();
  $('#testiDots').innerHTML=TESTI.map((x,j)=>`<span class="${solved[x.id]?'ok':''} ${j===i?'on':''}" style="${lost[x.id]?'opacity:.35':''}"></span>`).join('');
}
async function chapter3(){
  S.chStart=realSec(); hideAll(); playTheme('tense'); S.hearts=CONFIG.HEARTS; $('#hHearts').classList.remove('hidden'); hud();
  await chapterCard(3);
  $('#bgCam').classList.add('dark'); bgFx('testi'); show('me','L','smug'); show('chen','C','smug');
  await say('chen','smug',['什麼證據不證據的！我跟你們說，我的生活可是很規律的！','Evidence, schmevidence! Let me tell you — my life is perfectly in order!','หลักฐานอะไรกัน! ลุงจะบอกให้ ชีวิตลุงเป็นระเบียบมาก!']);
  await say('pilly','smug',['證言開始！每句話裡的⟦黃色字⟧就是關鍵。「追問」可以問細節；找到能「直接」推翻黃色字的證物，就「出示證物」！','Testimony time! The ⟦yellow words⟧ are the key part of each claim. "Press" for details; when you find evidence that DIRECTLY contradicts them, "Present" it!','เริ่มคำให้การ! ⟦ข้อความสีเหลือง⟧ คือจุดสำคัญของแต่ละประโยค กด "ซักต่อ" เพื่อถามรายละเอียด เจอหลักฐานที่ "หักล้างตรงๆ" ก็ "แสดงหลักฐาน"!']);
  await say('pilly','neutral',['每句只有「一個」證物能直接推翻它。完全無關的證物會扣❤️；有關但不夠直接的，葉藥師會給提示。用過的證物會變灰，不能再用！','Each claim has exactly ONE item that directly disproves it. Unrelated items cost ❤️; related-but-indirect ones get a hint from Pharmacist Yeh. Used items turn grey and can\'t be reused!','แต่ละประโยคมีหลักฐานที่หักล้างตรงๆ ได้ "ชิ้นเดียว" หลักฐานที่ไม่เกี่ยวจะเสีย ❤️ ส่วนที่เกี่ยวแต่ยังไม่ตรง เภสัชกรเย่จะใบ้ให้ หลักฐานที่ใช้แล้วจะเป็นสีเทา ใช้ซ้ำไม่ได้!']);
  $('#testiTitle').textContent=T('testiTitle'); $('#testiBanner').classList.remove('hidden'); $('#testiDots').classList.remove('hidden');
  $('#tPress').textContent=T('press'); $('#tPresent').textContent=T('present');
  const solved={}, tried={}, lost={}; TESTI.forEach(t=>{ tried[t.id]=[]; if(!t.need.some(hasEv)) lost[t.id]=1; });
  const nLost=Object.keys(lost).length; if(nLost){ logEvent({type:'unprovable', st:Object.keys(lost)});
    await say('pilly','sad',[`糟糕……有 ${nLost} 句話，我們手上沒有能直接推翻的證物（搜查時漏掉了）。那幾句只能先放過了。`,`Uh-oh… for ${nLost} of his claims we have no evidence that directly disproves them (we missed it in the search). We'll have to let those go.`,`แย่แล้ว… มี ${nLost} ประโยคที่เราไม่มีหลักฐานหักล้างตรงๆ (พลาดไปตอนค้นบ้าน) ข้อพวกนั้นต้องปล่อยผ่านไป`]); }
  const open=()=>TESTI.filter(t=>!solved[t.id]&&!lost[t.id]).length;
  const nextUnsolved=from=>{ for(let k=1;k<=TESTI.length;k++){ const j=(from+k)%TESTI.length; if(!solved[TESTI[j].id]&&!lost[TESTI[j].id]) return j; } return from; };
  let i=lost[TESTI[0].id]?nextUnsolved(0):0;
  while(open()>0){
    if(S.visit<=0){ S.fl.duelCut=1; break; }
    showStatement(i, solved, lost); $('#testiUI').classList.remove('hidden');
    const act=await new Promise(res=>{ $('#tPrev').onclick=()=>{sfx.click();res('prev');}; $('#tNextS').onclick=()=>{sfx.click();res('next');}; $('#tPress').onclick=()=>{sfx.select();res('press');}; $('#tPresent').onclick=()=>{sfx.select();res('present');}; D.testiAct=res; });
    D.testiAct=null; $('#testiUI').classList.add('hidden');
    const s=TESTI[i];
    if(act==='prev'){ i=(i+TESTI.length-1)%TESTI.length; continue; }
    if(act==='next'){ i=(i+1)%TESTI.length; continue; }
    if(act==='press'){ logEvent({type:'press', st:s.id}); await say('me','neutral',['請等一下，可以再說清楚一點嗎？','Wait — could you tell me more about that?','เดี๋ยวก่อน ช่วยเล่าให้ละเอียดกว่านี้ได้ไหม?']); await sayLines(s.press); continue; }
    if(solved[s.id]){ await say('pilly','neutral',['這句已經揭穿囉，換下一句吧！','Already exposed — try another statement!','ข้อนี้เปิดโปงไปแล้ว ลองข้ออื่น!']); i=nextUnsolved(i); continue; }
    if(lost[s.id]){ await say('pilly','sad',['這句我們沒有證物可以推翻……換下一句吧。','We have nothing that disproves this one… try another statement.','ข้อนี้เราไม่มีหลักฐานหักล้าง… ลองข้ออื่นเถอะ']); i=nextUnsolved(i); continue; }
    const ev=await openTray({claim:s.st, tried:tried[s.id]}); if(!ev) continue;
    const isNear=(s.near||[]).includes(ev), ok=s.need.includes(ev), near=!ok&&!EXAM()&&isNear; logEvent({type:'present', st:s.id, item:ev, ok, near, nearX:!ok&&EXAM()&&isNear});
    if(ok){ await fpShow('item',ev,async()=>{ await splash('objection','','objection'); await say('me','smug',presentAs(ev)); await sayLines(s.solve.slice(0,1)); });
      await sayLines(s.solve.slice(1)); reveal(s.p); solved[s.id]=1; S.usedEv.push(ev); i=nextUnsolved(i); }
    else if(near){ tried[s.id].push(ev); await fpShow('item',ev,async()=>{ await say('me','neutral',presentUm(ev)); await say('chen','think',NEAR_LINES[tried[s.id].length%2]); });
      await sayLines([['yeh','think',s.hint]]); hide('yeh'); spend(1); hud(); }
    else { tried[s.id].push(ev); await fpShow('item',ev,async()=>{ await say('me','neutral',presentUm(ev)); await say('chen','angry',WRONG_LINES[S.wrong%3]); }); await loseHeart(); }
  }
  $('#testiBanner').classList.add('hidden'); $('#testiDots').classList.add('hidden'); hideText();
  if(S.visit>0) await heartLock(); else S.fl.lockSkipped=1;
  $('#bgCam').classList.remove('dark'); bgFx('motes'); $('#hHearts').classList.add('hidden');
  chapterDone(3);
}
function drawLocks(n, broken){
  let h=`<svg viewBox="0 0 1600 900"><g stroke="#cfd3e6" stroke-width="22" fill="none" class="chainL"><path d="M380 150 L1220 700"/><path d="M1220 150 L380 700"/><path d="M300 420 L1300 420"/></g>`;
  for(let k=0;k<n;k++){ const x=800+(k-(n-1)/2)*170, y=420; h+=`<g class="lockI ${k<broken?'broken':''}" style="transform-origin:${x}px ${y}px"><rect x="${x-56}" y="${y-30}" width="112" height="92" rx="18" fill="#ff4f86" stroke="#fff" stroke-width="8"/><path d="M${x-34} ${y-30} v-28 a34 34 0 0 1 68 0 v28" fill="none" stroke="#fff" stroke-width="14"/><path d="M${x} ${y+4} l-14 14 l14 16 l14 -16Z" fill="#fff"/></g>`; }
  $('#locks').innerHTML=h+'</svg>'; $('#locks').classList.remove('hidden');
}
async function breakLock(n,k){ sfx.shatter(); flash(); drawLocks(n,k); await sleep(700); }
const LOCK_ST=['血壓、血糖藥我⟦每天都有吃，一天都沒漏⟧！我可以發誓！','My blood-pressure and sugar pills? ⟦Every single day — never missed one⟧! I swear!','ยาความดันกับเบาหวาน ลุง⟦กินทุกวัน ไม่เคยขาดสักวัน⟧! สาบานได้!'];
/* low trust → he refuses to talk: one last chance to make him feel safe, otherwise the secret stays hidden */
const OPEN_RX=/為什麼|怎麼了|擔心|困擾|願意|可以跟我說|why|what happened|worr|concern|tell me|ทำไม|เกิดอะไร|กังวล|เล่าให้/;
const HEART_CHIPS=[['我知道有些事很難開口，','I know some things are hard to talk about. ','รู้ว่าบางเรื่องพูดยากนะคะ/ครับ '],['您跟我們說的，我們都會保密。','Whatever you tell us stays confidential. ','อะไรที่ลุงเล่า เราจะเก็บเป็นความลับ '],['可以跟我說說，是什麼讓您擔心嗎？','Could you tell me what has been worrying you?','ลุงเล่าให้ฟังได้ไหมว่ากังวลเรื่องอะไรอยู่?']];
function heartText(txt){ const r=matchIntent(txt), open=OPEN_RX.test(txt.toLowerCase()); return !r.blame&&(r.emp||r.priv||open); }
async function refuseEnd(why){
  S.refused=why; logEvent({type:'refused', why, trust:S.trust}); $('#locks').classList.add('hidden'); $('#testiBanner').classList.add('hidden');
  emo('chen','angry'); await say('chen','angry',['……今天就先這樣吧。我累了。','…Let\'s leave it there for today. I\'m tired.','…วันนี้พอแค่นี้เถอะ ลุงเหนื่อยแล้ว']);
  show('yeh','R','sad');
  await say('yeh','sad',why==='trust'?['信任不是一瞬間建立的：從進門的第一步、每一句同理和保密開始。這次，陳伯沒有說出他停藥的真正原因。','Trust isn\'t built in an instant — it starts with your first move at the door, every empathetic word and every promise of confidentiality. This time, Uncle Chen never told us why he really stops his medicines.','ความไว้ใจไม่ได้เกิดขึ้นในพริบตา มันเริ่มจากก้าวแรกที่เข้าบ้าน ทุกคำพูดที่เห็นใจ และการรับปากเก็บความลับ ครั้งนี้ลุงเฉินไม่ได้บอกเหตุผลจริงที่หยุดยา']
    :['沒有證據，我們沒辦法證明他哪幾天沒吃藥……搜查時漏掉的東西，現在要付出代價了。這次，陳伯沒有說出他停藥的真正原因。','Without evidence we can\'t show which days he skipped… what we missed in the search has a cost. This time, Uncle Chen never told us why he really stops his medicines.','ไม่มีหลักฐาน เราพิสูจน์ไม่ได้ว่าลุงขาดยาวันไหน… สิ่งที่พลาดไปตอนค้นบ้านมีราคาที่ต้องจ่าย ครั้งนี้ลุงเฉินไม่ได้บอกเหตุผลจริงที่หยุดยา']);
  hide('yeh');
}
async function heartLock(){
  show('yeh','R','think');
  await say('yeh','think',['最後一件事……陳伯的血壓、血糖一直控制不好。我們來確認他到底有沒有好好吃藥。','One last thing… Uncle Chen\'s blood pressure and sugar are still poorly controlled. Let\'s check whether he really takes those pills.','เหลืออีกเรื่อง… ความดันกับน้ำตาลของลุงเฉินยังคุมไม่ได้ มาเช็กกันว่าลุงกินยาพวกนั้นจริงไหม']);
  await say('chen','angry',LOCK_ST,{testi:true});
  if(S.trust<CONFIG.TRUST_TALK){ logEvent({type:'lowTrust', trust:S.trust});
    await say('chen','angry',['而且……我跟你們又不熟，幹嘛什麼都要跟你們講？','Besides… I barely know you. Why should I tell you everything?','อีกอย่าง… ลุงไม่ได้สนิทกับพวกหนูสักหน่อย ทำไมต้องเล่าทุกอย่างให้ฟัง?']);
    await say('yeh','think',EXAM()?['（小聲）他把心門關上了。只剩一次機會。','(whisper) He has shut the door. You have one chance.','(กระซิบ) ลุงปิดใจแล้ว เหลือโอกาสเดียว']:['（小聲）信任度太低了（💗 不到 4），他把心門關上了。只剩一次機會：用你自己的話讓他安心。','(whisper) Trust is too low (💗 under 4), so he has shut the door. One chance: use your own words to make him feel safe.','(กระซิบ) ความไว้ใจต่ำเกินไป (💗 ไม่ถึง 4) ลุงเลยปิดใจ เหลือโอกาสเดียว: พูดด้วยคำของคุณเองให้ลุงสบายใจ']);
    const txt=await input(['💗 最後一次機會：讓陳伯願意再聽你說','💗 Last chance: get Uncle Chen to listen again','💗 โอกาสสุดท้าย: ทำให้ลุงยอมฟังอีกครั้ง'],EXAM()?'':['提示：先道歉或同理，再保證保密，最後用開放式問題。','Tip: apologise or empathise first, promise confidentiality, then ask an open question.','คำแนะนำ: ขอโทษหรือแสดงความเห็นใจก่อน รับปากเก็บความลับ แล้วถามปลายเปิด'],null,EXAM()?{}:{chips:HEART_CHIPS});
    const okk=heartText(txt); logEvent({type:'lockText', text:txt, ok:okk, last:true}); await say('me','neutral',txt);
    if(!okk) return refuseEnd('trust');
    addTrust(2); await say('chen','sad',['……好啦，你都這樣說了。','…Alright. Since you put it that way.','…ก็ได้ ในเมื่อพูดแบบนี้']); }
  if(!hasEv('pillbox')) return refuseEnd('noEvidence');
  const n=Math.max(1,(S.trust>=7?2:3)-(S.fl.adh?1:0)); let k=0; $('#testiTitle').textContent=T('lockTitle'); $('#testiBanner').classList.remove('hidden'); drawLocks(n,0); sfx.slam();
  await say('pilly','shock',[`是「心鎖」！陳伯的心被 ${n} 道鎖鎖住了！${S.fl.adh?'（他之前承認過會停藥，少了一道鎖！）':n===3?'（信任度不夠高，多了一道鎖……）':''}`,`A Heart Lock! Uncle Chen's heart is sealed by ${n} lock${n>1?'s':''}! ${S.fl.adh?'(He already admitted skipping doses — one lock fewer!)':n===3?'(Trust wasn\'t high enough — one extra lock…)':''}`,`กุญแจหัวใจ! ใจของลุงถูกล็อกไว้ ${n} ชั้น! ${S.fl.adh?'(ลุงเคยยอมรับว่าหยุดยา ล็อกเลยลดลงหนึ่งชั้น!)':n===3?'(ความไว้ใจไม่พอ เลยมีเพิ่มอีกชั้น…)':''}`]);
  const tried=[];
  while(true){ await say('pilly','neutral',['用證據證明：他的血壓、血糖藥⟦哪幾天⟧沒吃？','Prove it with evidence: on ⟦which days⟧ did he skip his BP & sugar pills?','พิสูจน์ด้วยหลักฐาน: ลุงไม่ได้กินยาความดัน-เบาหวาน⟦วันไหน⟧บ้าง?']);
    const ev=await openTray({claim:LOCK_ST, tried}); if(!ev) continue;
    const ok=ev==='pillbox', near=!ok&&!EXAM()&&['report','endo_bag','hospB_bag'].includes(ev); logEvent({type:'present', st:'lock', item:ev, ok, near});
    if(ok){ await fpShow('item',ev,async()=>{ await splash('gotcha','gold','slam'); await say('me','smug',['藥盒裡週三和週六的血壓、血糖藥，一顆都沒少喔。','Wednesday\'s and Saturday\'s BP and sugar pills are all still in the box.','ยาความดันกับเบาหวานของวันพุธและวันเสาร์ยังอยู่ในกล่องครบทุกเม็ดเลยนะ']); await say('chen','shock',['……！','…!','…!']); }); S.usedEv.push('pillbox'); k++; await breakLock(n,k); break; }
    tried.push(ev); await fpShow('item',ev,()=>say('me','neutral',presentUm(ev)));
    if(near){ await say('chen','smug',['那只能看出醫生開了什麼、數字怎麼樣，又不能證明我哪天沒吃！','That only shows what was prescribed or what the numbers are — it doesn\'t prove which day I skipped!','อันนั้นบอกได้แค่หมอสั่งยาอะไร หรือตัวเลขเป็นยังไง ไม่ได้พิสูจน์ว่าลุงไม่กินยาวันไหน!']);
      await say('yeh','think',['這個證物只能「間接」說明控制不好，看不出他漏了⟦哪幾天⟧。有沒有證物能直接看到漏掉的日子？','This only suggests poor control INDIRECTLY — it can\'t show ⟦which days⟧ he missed. Is there evidence where you can see the missed days directly?','หลักฐานนี้บอกได้แค่ "ทางอ้อม" ว่าคุมไม่ดี แต่ไม่เห็นว่าขาดยา⟦วันไหน⟧ มีหลักฐานที่เห็นวันที่ขาดยาตรงๆ ไหม?']); spend(1); hud(); continue; }
    await say('chen','angry',WRONG_LINES[(S.wrong+1)%3]); await loseHeart(); }
  if(k<n){ await say('chen','embarrassed',['那、那是……我不想在這裡講啦……','Th-that\'s… I don\'t want to talk about it here…','นั่น…นั่นมัน… ลุงไม่อยากพูดตรงนี้…']);
  while(true){ const c=await choose([
      {t:['（請陳太太去泡茶）「這裡只剩我們，您說的話我們都會保密。」','(Ask Mrs. Chen to make tea) "It\'s just us now — what you say stays private."','(ขอให้ป้าไปชงชา) "ตอนนี้เหลือแค่เรา อะไรที่ลุงเล่าจะเป็นความลับนะ"']},
      {t:['「您一定是忘了吃吧？漏吃血壓藥很危險，以後要記得喔！」','"You must have forgotten! Missing BP pills is dangerous — remember next time!"','"ลุงลืมกินแน่ๆ เลย ขาดยาความดันอันตรายนะ ครั้งหน้าต้องจำให้ได้!"']},
      {t:['（轉向陳太太）「您知道陳伯為什麼週三、週六沒吃藥嗎？」','(Turn to Mrs. Chen) "Do you know why he skips Wednesdays and Saturdays?"','(หันไปหาป้า) "ป้ารู้ไหมว่าทำไมลุงไม่กินยาวันพุธกับวันเสาร์?"']},
    ],{timer:15, shuffle:true, id:'lock2', label:['怎麼讓他安心？','How do you reassure him?','จะทำให้ลุงสบายใจยังไง?']});
    if(c===0){ show('wife','RC','happy'); await say('yeh','happy',['陳太太，可以麻煩您幫我們再泡一壺茶嗎？','Mrs. Chen, could we trouble you for another pot of tea?','ป้าเฉิน รบกวนช่วยชงชาให้อีกกาได้ไหมคะ?']); await say('wife','happy',['好啊，你們慢慢聊！','Sure, take your time!','ได้เลย คุยกันตามสบายนะ!']); hide('wife');
      addTrust(1); k++; await breakLock(n,k); break; }
    await say('chen','angry',c===1?['你看，又在怪我了……','See? You\'re blaming me again…','เห็นไหม มาโทษลุงอีกแล้ว…']:['欸！不要問她啦！','Hey! Don\'t ask her!','เฮ้ย! อย่าไปถามป้าเขา!']); await loseHeart(); } }
  if(k<n){ while(true){ const txt=await input(['💗 用你自己的話，溫柔地打開他的心','💗 In your own words, gently open his heart','💗 พูดด้วยคำพูดของคุณเอง เพื่อเปิดใจลุงอย่างอ่อนโยน'],EXAM()?'':['提示：① 同理他的感受 ② 保證保密 ③ 用開放式的問題（為什麼／怎麼了）。','Tip: ① acknowledge his feelings ② promise confidentiality ③ ask an open question (why / what happened).','คำแนะนำ: ① แสดงความเห็นใจ ② รับปากเก็บความลับ ③ ถามปลายเปิด (ทำไม / เกิดอะไรขึ้น)'],null,EXAM()?{}:{chips:HEART_CHIPS});
      const okk=heartText(txt); logEvent({type:'lockText', text:txt, ok:okk});
      await say('me','neutral',txt);
      if(okk){ k++; await breakLock(n,k); break; }
      await say('chen','sad',['……我還是說不出口。','…I still can\'t say it.','…ลุงยังพูดไม่ออก']); await loseHeart(); } }
  $('#locks').classList.add('hidden'); await splash('unlock','blue','shatter'); $('#testiBanner').classList.add('hidden');
  await say('chen','embarrassed',['……我偷偷跟你們講喔，不要給我太太知道。','…I\'ll tell you quietly. Don\'t let my wife know.','…ลุงจะบอกแบบลับๆ นะ อย่าให้ภรรยารู้']);
  await say('chen','sad',['最近那方面……性功能變差很多。我想一定是吃藥害的。','Lately, in that department… my sexual function has gotten much worse. It must be the medicines.','ช่วงนี้เรื่องนั้นน่ะ… สมรรถภาพทางเพศแย่ลงมาก ลุงว่าต้องเป็นเพราะยาแน่ๆ']);
  S.fl.trustAtLock=S.trust; await say('chen','cry',['所以……知道晚上會「那個」的時候，我就把藥全部停掉……','So… whenever I know there\'ll be "that" at night, I stop ALL my medicines…','เพราะงั้น… วันไหนรู้ว่าคืนนั้นจะ "อย่างว่า" ลุงก็หยุดยาทั้งหมด…']); reveal('P8');
  await say('yeh','neutral',['謝謝您願意告訴我們。這很重要，我們一定會幫您。','Thank you for trusting us. This is important, and we\'ll help you.','ขอบคุณที่ไว้ใจเรานะคะ เรื่องนี้สำคัญมาก เราจะช่วยลุงแน่นอน']);
}
