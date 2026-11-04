/* =====================================================================
   BOSS · Pilly fights alongside the student
   The pill fairy stands on the battlefield and turns each counselling card into an attack:
   best card → charged golden capsule shot · partly right → blue orb · wrong → the orb fizzles · too slow → no shot.
   The final summary becomes Pilly's ultimate beam. Pure presentation: scores and the boss logic are unchanged.
   ===================================================================== */
const PF={
  start:['把正確的衛教卡交給我，我來發射！','Hand me the right counselling card — I\'ll fire it!','ส่งการ์ดคำแนะนำที่ถูกมาให้ฉัน เดี๋ยวฉันยิงเอง!'],
  q2:[['完美劑量！💊⚡','Perfect dose! 💊⚡','โดสพอดีเป๊ะ! 💊⚡'],['正中要害！','Right on target!','เข้าเป้าเต็มๆ!'],['迷思破碎！','Myth shattered!','ความเชื่อผิดแตกกระจาย!']],
  q1:[['打中了，但還不夠完整！','A hit — but not the whole story!','โดนแล้ว แต่ยังไม่ครบ!'],['它晃了一下……再完整一點！','It wobbled… make it more complete!','มันโยกนิดหน่อย… ให้ครบกว่านี้!']],
  q0:[['咦？沒效……','Huh? It fizzled…','เอ๊ะ? ไม่ได้ผล…'],['這張卡打不動它！','That card can\'t touch it!','การ์ดนี้ทำอะไรมันไม่ได้!']],
  none:['來不及了！','Too slow!','ไม่ทันแล้ว!'],
  ult:['集合所有建議——最終一擊！','All the advice together — final strike!','รวมพลังคำแนะนำทั้งหมด — ท่าไม้ตาย!'],
  win:['我們贏了！','We did it!','เราชนะแล้ว!'], esc:['被它逃走了……下次再來！','It got away… next time!','มันหนีไปได้… คราวหน้าเอาใหม่!'],
};
const PF_AT={x:380, y:378}, PF_MON={x:800, y:310};   // Pilly's centre and the monster's, in stage pixels
function pfCss(){ if($('#pfCss')) return; const st=document.createElement('style'); st.id='pfCss'; st.textContent=`
#bossPilly{position:absolute;left:290px;top:270px;width:180px;height:216px;z-index:3;pointer-events:none}
#bossPilly .body{position:absolute;inset:0;animation:float 2.4s ease-in-out infinite}
#bossPilly .body svg{width:100%;height:100%;overflow:visible}
#bossPilly .aura{position:absolute;left:50%;top:52%;width:160px;height:160px;margin:-80px 0 0 -80px;border-radius:50%;background:radial-gradient(circle,rgba(255,224,122,.6),rgba(255,224,122,0) 70%);opacity:.3;transform:scale(.75);animation:pfPulse 1.6s ease-in-out infinite}
#bossPilly.lv1 .aura{background:radial-gradient(circle,rgba(120,190,255,.7),rgba(120,190,255,0) 70%)}
#bossPilly.lv0 .aura{background:radial-gradient(circle,rgba(200,200,215,.6),rgba(200,200,215,0) 70%)}
#bossPilly.charge .aura{animation:pfCharge .5s ease-out forwards}
#bossPilly.charge .body{animation:pfJitter .1s linear infinite}
#bossPilly.ult .aura{animation:pfCharge 1s ease-out forwards}
#bossPilly.cast .body{animation:pfRecoil .35s ease-out}
#bossPilly.sad .body{animation:pfSag .6s ease-out forwards}
#bossPilly .ring{position:absolute;left:50%;top:52%;width:120px;height:120px;margin:-60px 0 0 -60px;border-radius:50%;border:6px solid rgba(255,224,122,.9);opacity:0}
#bossPilly.ult .ring{animation:pfRing .5s ease-out infinite}#bossPilly.ult .ring.r2{animation-delay:.25s}
#bossPilly .say{position:absolute;left:50%;bottom:96%;transform:translateX(-50%);white-space:nowrap;background:#fff;color:#3a1a5a;font-weight:900;font-size:22px;padding:8px 16px;border-radius:16px;box-shadow:0 0 0 4px #ffb3cf,0 6px 16px rgba(0,0,0,.35);opacity:0}
#bossPilly .say.on{animation:pfSay 2s forwards}
@keyframes pfPulse{50%{transform:scale(.9);opacity:.45}}
@keyframes pfCharge{from{opacity:.35;transform:scale(.7)}to{opacity:1;transform:scale(2)}}
@keyframes pfRing{from{opacity:.9;transform:scale(1.8)}to{opacity:0;transform:scale(.4)}}
@keyframes pfJitter{0%{transform:translate(0,0)}25%{transform:translate(-3px,1px)}50%{transform:translate(3px,-1px)}75%{transform:translate(-1px,-3px)}}
@keyframes pfRecoil{0%{transform:translate(-14px,4px) rotate(-8deg)}100%{transform:none}}
@keyframes pfSag{to{transform:translateY(16px) rotate(8deg)}}
@keyframes pfSay{0%{opacity:0;transform:translate(-50%,10px) scale(.8)}10%{opacity:1;transform:translate(-50%,0) scale(1)}80%{opacity:1}100%{opacity:0}}
.pfShot{position:absolute;z-index:4;pointer-events:none}
.pfShot.lv2{width:140px;height:62px;border-radius:31px;background:linear-gradient(90deg,#ff4f86 0 50%,#fff 50% 100%);box-shadow:0 0 0 4px #fff,0 0 30px 12px rgba(255,214,90,.9)}
.pfShot.lv1{width:64px;height:64px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#fff,#6fc3ff 55%,#2f6be0);box-shadow:0 0 24px 8px rgba(111,195,255,.8)}
.pfShot.lv0{width:44px;height:44px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#fff,#b9b4c8 60%,#7a7590)}
.pfBoom{position:absolute;z-index:4;width:220px;height:220px;margin:-110px 0 0 -110px;border-radius:50%;pointer-events:none;background:radial-gradient(circle,rgba(255,255,255,.95),rgba(255,214,90,.7) 40%,rgba(255,214,90,0) 70%)}
.pfBoom.lv1{background:radial-gradient(circle,rgba(255,255,255,.9),rgba(111,195,255,.6) 40%,rgba(111,195,255,0) 70%)}
.pfBoom.lv0{width:90px;height:90px;margin:-45px 0 0 -45px;background:radial-gradient(circle,rgba(220,220,230,.9),rgba(160,160,180,0) 70%)}
.pfBeam{position:absolute;z-index:4;height:96px;margin-top:-48px;transform-origin:0 50%;border-radius:48px;pointer-events:none;background:linear-gradient(90deg,rgba(255,79,134,.95),rgba(255,224,122,.97) 55%,rgba(255,255,255,.98));box-shadow:0 0 40px 18px rgba(255,214,90,.75)}
`; document.head.appendChild(st); }
function pfEnsure(){ const boss=$('#boss'); if(!boss) return null; let el=$('#bossPilly'); if(el) return el; pfCss();
  el=document.createElement('div'); el.id='bossPilly'; el.innerHTML='<div class="aura"></div><div class="ring"></div><div class="ring r2"></div><div class="body"></div><div class="say"></div>'; boss.appendChild(el); pfFace('smug'); return el; }
function pfFace(e){ const b=$('#bossPilly .body'); if(b) b.innerHTML=pillySVG(e); }
function pfSay(t){ const s=$('#bossPilly .say'); if(!s) return; s.textContent=t; s.classList.remove('on'); void s.offsetWidth; s.classList.add('on'); }
const pfPick=(arr,k)=>Array.isArray(arr[0])?arr[k%arr.length]:arr;
function pfFx(cls, x, y, kf, ms, easing){ const d=document.createElement('div'); d.className=cls; d.style.left=x+'px'; d.style.top=y+'px'; $('#boss').appendChild(d);
  const a=d.animate(kf,{duration:ms, easing:easing||'ease-out', fill:'forwards'}); setTimeout(()=>d.remove(), ms+80); return a; }
/* one counselling card → one attack */
async function pfCast(q){ const el=pfEnsure(); if(!el) return; const k=(S.boss&&S.boss.answers||[]).length;
  el.classList.remove('lv0','lv1','lv2','sad','cast');
  if(q<0){ pfFace('shock'); pfSay(L(PF.none)); el.classList.add('sad'); await sleep(650); el.classList.remove('sad'); pfFace('smug'); return; }
  el.classList.add('lv'+q,'charge'); pfFace(q===0?'think':'smug'); sfx.select(); await sleep(q===2?560:420);
  el.classList.remove('charge'); el.classList.add('cast'); sfx.whoosh();
  const w=q===2?140:q===1?64:44, h=q===2?62:w, sx=PF_AT.x-w/2+40, sy=PF_AT.y-h/2-10, dx=PF_MON.x-PF_AT.x-40, dy=PF_MON.y-PF_AT.y+10;
  if(q===0){ await pfFx('pfShot lv0', sx, sy, [{transform:'translate(0,0)',opacity:1},{transform:`translate(${dx*.5}px,${dy*.5-30}px)`,opacity:1,offset:.6},{transform:`translate(${dx*.62}px,${dy*.5+90}px) scale(.4)`,opacity:0}], 560).finished.catch(()=>{});
    pfFx('pfBoom lv0', PF_AT.x+dx*.6, PF_AT.y+dy*.5+60, [{transform:'scale(.3)',opacity:1},{transform:'scale(1.3)',opacity:0}], 380);
    el.classList.add('sad'); pfFace('shock'); pfSay(L(pfPick(PF.q0,k))); await sleep(380); el.classList.remove('sad','cast'); return; }
  await pfFx('pfShot lv'+q, sx, sy, [{transform:'translate(0,0) scale(.6) rotate(-8deg)'},{transform:`translate(${dx}px,${dy}px) scale(1.15) rotate(-8deg)`}], q===2?380:430, 'cubic-bezier(.5,0,.9,.6)').finished.catch(()=>{});
  pfFx('pfBoom lv'+q, PF_MON.x, PF_MON.y, [{transform:'scale(.3)',opacity:1},{transform:'scale(1.6)',opacity:0}], 420);
  pfFace(q===2?'happy':'smug'); pfSay(L(pfPick(PF['q'+q],k))); el.classList.remove('cast'); }
/* the final summary → Pilly's ultimate beam */
async function pfUltimate(){ const el=pfEnsure(); if(!el) return; el.classList.remove('lv0','lv1','sad','cast'); el.classList.add('lv2','ult'); pfFace('smug'); pfSay(L(PF.ult)); sfx.select();
  await sleep(1000); el.classList.remove('ult'); el.classList.add('cast'); sfx.whoosh();
  const dx=PF_MON.x-PF_AT.x, dy=PF_MON.y-PF_AT.y, len=Math.hypot(dx,dy)+60, ang=Math.atan2(dy,dx)*180/Math.PI;
  await pfFx('pfBeam', PF_AT.x+30, PF_AT.y, [{width:len+'px',transform:`rotate(${ang}deg) scaleX(0)`,opacity:1},{width:len+'px',transform:`rotate(${ang}deg) scaleX(1)`,opacity:1,offset:.45},{width:len+'px',transform:`rotate(${ang}deg) scaleX(1) scaleY(.2)`,opacity:0}], 820).finished.catch(()=>{});
  el.classList.remove('cast'); }
{ const f=bossCards; bossCards=async function(m){ pillyHide(); const el=pfEnsure(); if(el&&!el.dataset.greeted){ el.dataset.greeted='1'; if(!el.dataset.shown){ el.dataset.shown='1'; el.animate([{transform:'translate(-120px,40px) scale(.5)',opacity:0},{transform:'none',opacity:1}],{duration:500,easing:'cubic-bezier(.2,1.3,.4,1)'}); } pfSay(L(PF.start)); }
  const card=await f(m); await pfCast(card?card.q:-1); return card; }; }
/* while the boss is on screen, Pilly speaks from the battlefield instead of the corner */
const pfBossOn=()=>{ const b=$('#boss'); return !!b&&!b.classList.contains('hidden'); };
{ const f=say; say=function(who,e,text,o){ const p=f(who,e,text,o);
  if(who==='pilly'&&pfBossOn()){ pillyHide(); const el=pfEnsure(); if(el){ if(!el.dataset.shown){ el.dataset.shown='1'; el.animate([{transform:'translate(-120px,40px) scale(.5)',opacity:0},{transform:'none',opacity:1}],{duration:500,easing:'cubic-bezier(.2,1.3,.4,1)'}); }
    pfFace(e==='shock'?'shock':e==='happy'?'happy':e==='sad'?'sad':'smug'); const bd=el.querySelector('.body'); if(bd) bd.animate([{transform:'translateY(0)'},{transform:'translateY(-14px)'},{transform:'translateY(0)'}],{duration:340}); } }
  if(who==='me'&&typeof text==='string'&&S.finalText&&text===S.finalText&&$('#boss')&&!$('#boss').classList.contains('hidden')) return Promise.resolve(p).then(()=>pfUltimate());
  return p; }; }
{ const f=splash; splash=async function(key){ if($('#bossPilly')&&$('#boss')&&!$('#boss').classList.contains('hidden')){
    if(key==='victory'){ pfFace('happy'); pfSay(L(PF.win)); } else if(key==='escaped'){ pfFace('shock'); pfSay(L(PF.esc)); $('#bossPilly').classList.add('sad'); } }
  return f.apply(this, arguments); }; }
