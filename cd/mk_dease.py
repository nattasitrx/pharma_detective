"""Case D, 17 Nov 2026: story lines that tie it to the Four Floors game, a link to that game, and an easier chapter 4.
Run on d_orig.html after mk_dlite.py (rebuild_cd.sh does). The inhaler simulator's own changes are in d_isim.js.

1. Story (the dog, Blackie). Facts from the course document are untouched (ages, wife, 4th floor, drugs, the missed
   Tuesday/Thursday doses, the fall, the secret). Changed lines:
   - the dog came from Ah-Mei eight years ago (was "with me over ten years"); he used to go down with Lee every morning,
     now the boy in 406 takes him on the days Lee cannot manage the stairs (was "every morning", which contradicted
     "some mornings" in the profile);
   - the first time the student asks about the dog, he brings the red lead to the student ("he does that to everyone
     with good legs");
   - Lee's hope adds walking Blackie down himself; the mentor's note follows;
   - the night of the fall: Blackie lay beside him; Ah-Mei's lead is the red one;
   - good ending: down the four floors to the park himself.
2. Results page: the closing line of Four Floors and a link to it; the title page shows the link once the case has been
   finished on this device (phd_lee_cleared).
3. Chapter 4, med bags. The 20 medicines were one wall of 20 small cards in every mission. Now: one overview of the four
   bags (names and classes only, nothing to answer), then each mission lays out six medicines (its two answers and four
   near misses) on large cards -- the same idea as the red-basket mission (six cards since 12 Nov).
4. Settings: patience 10 -> 13 (as Case C since 9 Nov), visit time 60 -> 70 minutes (20 medicines against Case C's 9)."""
import os
H = os.path.dirname(os.path.abspath(__file__)); f = f'{H}/d_orig.html'
s = open(f, encoding='utf-8').read()
if '/* mk_dease */' in s: print('already applied'); raise SystemExit
def sub(old, new, n=1):
    global s
    assert s.count(old) == n, (old[:90], s.count(old)); s = s.replace(old, new)

# ---------- 1. story ----------
sub("await say('chen','happy',['小黑啊？跟我十幾年了，比人還懂事！每天早上陪我去公園。','Blackie? He\\'s been with me over ten years — smarter than most people! Comes with me to the park every morning.','เจ้าดำเหรอ? อยู่กับลุงมาสิบกว่าปีแล้ว รู้ความกว่าคนอีก! ทุกเช้าไปสวนเป็นเพื่อนลุง']);",
    "await say('chen','happy',['小黑啊？八年前阿梅抱回來的，說這樣我就不會一個人。比人還懂事！','Blackie? Ah-Mei brought him home eight years ago — said I wouldn\\'t be on my own then. Smarter than most people!','เจ้าดำเหรอ? อาเหมยพามาให้เมื่อแปดปีก่อน บอกว่าลุงจะได้ไม่ต้องอยู่คนเดียว รู้ความกว่าคนอีก!']);\n"
    "  await say('chen','neutral',['以前牠每天早上跟我下樓去公園。現在哪天我爬不動這四層樓，就是 406 那個孩子幫我牽下去。','He used to come down to the park with me every morning. These days, when I can\\'t manage the four floors, the boy in 406 takes him down for me.','เมื่อก่อนมันลงไปสวนกับลุงทุกเช้า เดี๋ยวนี้วันไหนลุงลงสี่ชั้นไม่ไหว เด็กห้อง 406 ก็ช่วยพาไป']);")
sub("  if(!S.fl.dogTalk){ S.fl.dogTalk=1; addTrust(1); } };",
    "  if(!S.fl.dogTalk){ S.fl.dogTalk=1;   /* mk_dease: the red lead */\n"
    "    await say('sys','neutral',['（小黑嗅夠了你的鞋子，慢慢走到門邊，把掛在那裡的紅色牽繩叼過來，放在你腳邊，抬頭看著你。）','(Having sniffed your shoes long enough, Blackie pads over to the door, takes the red lead that hangs there in his mouth, lays it at your feet and looks up at you.)','(เจ้าดำดมรองเท้าคุณจนพอใจ แล้วเดินช้าๆ ไปที่ประตู คาบสายจูงสีแดงที่แขวนอยู่มาวางไว้ที่เท้าคุณ แล้วเงยหน้ามอง)']);\n"
    "    await say('chen','embarrassed',['哈，別理牠。腿腳好的人來，牠都這樣。','Ha, don\\'t mind him. He does that to everyone with good legs.','ฮ่า อย่าไปสนใจมัน มันทำแบบนี้กับทุกคนที่ขาดี']);\n"
    "    addTrust(1); } };")
sub("['只要還能自己走、自己煮，要我怎麼配合都行！','As long as I can still walk and cook for myself, I\\'ll go along with whatever you say!','ขอแค่ยังเดินเองได้ ทำกินเองได้ จะให้ลุงทำยังไงก็ยอม!']",
    "['只要還能自己走、自己煮，還能自己牽小黑下樓走走，要我怎麼配合都行！','As long as I can still walk and cook for myself — and take Blackie down for his walk myself — I\\'ll go along with whatever you say!','ขอแค่ยังเดินเองได้ ทำกินเองได้ พาเจ้าดำลงไปเดินเองได้ จะให้ลุงทำยังไงก็ยอม!']")
sub("['這就是他的動機——保持獨立、留在自己的家、陪著小黑。最後衛教時，從他自己的理由出發。','That\\'s his motivation — staying independent, staying in his own home, staying with Blackie. In your final counselling, build on his own reasons.','นี่แหละแรงจูงใจของลุง — พึ่งตัวเองได้ อยู่บ้านตัวเอง อยู่กับเจ้าดำ ตอนให้คำแนะนำท้ายเกม ให้เริ่มจากเหตุผลของลุงเอง']",
    "['這就是他的動機——保持獨立、留在自己的家、自己牽小黑走下那四層樓。最後衛教時，從他自己的理由出發。','That\\'s his motivation — staying independent, staying in his own home, and walking Blackie down those four floors himself. In your final counselling, build on his own reasons.','นี่แหละแรงจูงใจของลุง — พึ่งตัวเองได้ อยู่บ้านตัวเอง และพาเจ้าดำลงสี่ชั้นไปเดินเองได้ ตอนให้คำแนะนำท้ายเกม ให้เริ่มจากเหตุผลของลุงเอง']")
sub("在地上躺了好久才爬起來。誰都沒講。','Last Thursday, in the middle of the night, I got dizzy, broke out in a cold sweat, my hands shaking… I fell in the bathroom down the corridor and lay on the floor a long time before I could get up. I told no one.','คืนวันพฤหัสที่แล้วตอนดึก ลุงเวียนหัว เหงื่อเย็นแตก มือสั่นไม่หยุด… หกล้มในห้องน้ำสุดทางเดิน นอนอยู่บนพื้นนานกว่าจะลุกขึ้นได้ ไม่ได้บอกใครเลย'",
    "在地上躺了好久才爬起來，小黑就趴在我旁邊守著。誰都沒講。','Last Thursday, in the middle of the night, I got dizzy, broke out in a cold sweat, my hands shaking… I fell in the bathroom down the corridor and lay on the floor a long time before I could get up, with Blackie lying beside me the whole while. I told no one.','คืนวันพฤหัสที่แล้วตอนดึก ลุงเวียนหัว เหงื่อเย็นแตก มือสั่นไม่หยุด… หกล้มในห้องน้ำสุดทางเดิน นอนอยู่บนพื้นนานกว่าจะลุกขึ้นได้ เจ้าดำมานอนเฝ้าอยู่ข้างๆ ไม่ได้บอกใครเลย'")
sub("['（阿梅幫小黑扣上牽繩，", "['（阿梅幫小黑扣上那條紅色牽繩，")
sub("'(Ah-Mei clips on Blackie\\'s lead and", "'(Ah-Mei clips on Blackie\\'s red lead and")
sub("'(พี่เหมยคล้องสายจูงให้เจ้าดำ", "'(พี่เหมยคล้องสายจูงสีแดงให้เจ้าดำ")
sub("也比較有力氣，又可以帶小黑去公園了！','The pharmacists climbed all the way up again! I follow that big-print chart now — less dizzy, more strength, and I can walk Blackie to the park again!','เภสัชกรปีนขึ้นมาอีกแล้ว! ตอนนี้ลุงกินยาตามตารางตัวหนังสือใหญ่นั่น เวียนหัวน้อยลง มีแรงขึ้น พาเจ้าดำไปสวนได้อีกแล้ว!'",
    "也比較有力氣，又可以自己牽著小黑走下四層樓去公園了！','The pharmacists climbed all the way up again! I follow that big-print chart now — less dizzy, more strength, and I can walk Blackie down the four floors to the park myself again!','เภสัชกรปีนขึ้นมาอีกแล้ว! ตอนนี้ลุงกินยาตามตารางตัวหนังสือใหญ่นั่น เวียนหัวน้อยลง มีแรงขึ้น ลงบันไดสี่ชั้นพาเจ้าดำไปสวนเองได้อีกแล้ว!'")
sub("每天早上又帶小黑去公園散步。','Small fresh portions, no more sour porridge, and veterans\\' meal delivery arranged; dentures brushed daily, gums no longer swollen — he can chew meat again. Every morning he walks Blackie to the park.',",
    "每天早上又自己牽著小黑下樓去公園散步。','Small fresh portions, no more sour porridge, and veterans\\' meal delivery arranged; dentures brushed daily, gums no longer swollen — he can chew meat again. Every morning he walks Blackie down to the park himself.',")
sub("กลับมาเคี้ยวเนื้อได้ ทุกเช้าพาเจ้าดำไปเดินเล่นที่สวน'", "กลับมาเคี้ยวเนื้อได้ ทุกเช้าพาเจ้าดำลงไปเดินเล่นที่สวนเอง'")

# ---------- 2. Four Floors: closing line + link on the results page, link on the title page once the case is finished ----------
sub("const cleared=()=>{ try{ return localStorage.getItem('phd_lee_cleared')==='1'; }catch(e){ return false; } };",
    """const cleared=()=>{ try{ return localStorage.getItem('phd_lee_cleared')==='1'; }catch(e){ return false; } };
/* mk_dease */
const FLOORS={url:()=>'../four-floors/?lang='+(S.lang==='th'?'th':'zh'),
  name:['李伯伯的四層樓','Uncle Lee\\'s Four Floors','สี่ชั้นของลุงหลี่'],
  line:['問他吃什麼藥之前，先問他，是為了誰醒來。','Before you ask what medicines he takes, ask who he wakes up for.','ก่อนถามว่าเขากินยาอะไร ถามก่อนว่า เขาตื่นมาเพื่อใคร'],
  tag:['🔓 解鎖隱藏遊戲！','🔓 Secret game unlocked!','🔓 ปลดล็อกเกมลับ!'],
  sub:['這次換你當李伯伯：三天、四層樓、一條紅色牽繩。','This time you are Uncle Lee: three days, four floors and one red lead.','คราวนี้คุณเป็นลุงหลี่: สามวัน สี่ชั้น กับสายจูงสีแดงของเจ้าดำ'],
  free:['有空再玩 · 不算分數','For a free moment · not scored · in Chinese or Thai','เล่นตอนว่างๆ · ไม่นับคะแนน'], play:['▶ 去玩','▶ Play','▶ เล่นเลย']};
/* one card for both places (title page once the case is finished, results page): it has to read as another game, unlocked */
const floorsCard=(id,row)=>{ const tag=`<em>${esc(L(FLOORS.tag))}</em>`, img='<img src="../four-floors/img/leash.jpg" alt="" onerror="this.remove()">', nm=`<b>${esc(L(FLOORS.name))}</b>`;
  return `<a class="fcard${row?' row':''}" ${id?`id="${id}" `:''}href="${FLOORS.url()}" target="_blank" rel="noopener">${row?'':tag}${img}<span class="ft">${row?`<span class="top">${tag}${nm}</span><q>${esc(L(FLOORS.line))}</q><small>${esc(L(FLOORS.sub))} ${esc(L(FLOORS.free))}</small>`:`${nm}<span>${esc(L(FLOORS.sub))}</span><small>${esc(L(FLOORS.free))}</small>`}</span><i>${esc(L(FLOORS.play))}</i></a>`; };
const floorsHTML=()=>`<div class="rfloors">${floorsCard('',1)}</div>`;
/* the results page is engine code (merged from Case A), so the band is added after it is drawn, not in its template */
{ const r0=results; results=async function(){ await r0.apply(this,arguments); try{ const b=$('#rRep'); if(b&&!$('#results .rfloors')) b.parentNode.insertAdjacentHTML('beforebegin',floorsHTML()); }catch(e){} }; }""")
sub("function renderTitleBtns(){ const st=badgeStore(), n=BADGES.filter(x=>st[x.id]).length; const bb=$('#btnBadges'), cb=$('#btnChSel');",
    "function renderTitleBtns(){ const st=badgeStore(), n=BADGES.filter(x=>st[x.id]).length; const bb=$('#btnBadges'), cb=$('#btnChSel');\n"
    "  const lg=$('#logo'); if(lg&&cleared()){ const old=$('#btnFloors'); if(old) old.remove(); lg.insertAdjacentHTML('beforeend',floorsCard('btnFloors',0)); }")

# ---------- 3. chapter 4: the four bags at a glance, then six large cards per mission ----------
sub("const MISSIONS=[", """/* mk_dease: each mission lays out six medicines (its answers and four near misses), not all twenty */
const MR_SHORT={m4:['kudona','sketa','famo','actibest','ponstan','mopride'], m5:['mopride','famo','galvusmet','ponstan','royamet','actibest'], m6:['benamine','artelac','dermalin','clarinase','sinbaby','karyuni']};
const BAGX={no:['🧺 藥袋總覽','🧺 All the bags','🧺 ซองยาทั้งหมด'], tx:['20 種藥，來自 4 個地方——從來沒有人把它們放在一起看。','20 medicines from 4 places — nobody has ever looked at them together.','ยา 20 รายการ จาก 4 ที่ — ไม่เคยมีใครดูรวมกันเลย'],
  n:['{n} 種','{n} items','{n} รายการ'], hint:['不用背。接下來一次只看一個問題，每次只擺出相關的 6 種藥。點藥名可以看藥袋。','No need to memorise them. Next we take one question at a time, with only the 6 related medicines on the table. Tap a name to see its bag.','ไม่ต้องจำ ต่อไปจะดูทีละเรื่อง แต่ละครั้งวางเฉพาะยาที่เกี่ยวข้อง 6 ตัว แตะชื่อยาเพื่อดูซองยาได้'], go:['開始 →','Start →','เริ่ม →']};
function bagOverview(){
  return new Promise(res=>{
    let host=$('#medrev'); if(!host){ host=document.createElement('div'); host.id='medrev'; $('#stage').appendChild(host); }
    host.innerHTML=`<div class="mr-main"><div class="mr-head"><span class="no">${esc(L(BAGX.no))}</span><span class="tx">${esc(L(BAGX.tx))}</span></div>
      <div class="bag-grid">${Object.keys(SRC).map(k=>{ const ds=DRUGS.filter(d=>d.src===k); return `<div class="bag s${k}"><h4>${esc(L(SRC[k]))}<small>${esc(L(BAGX.n).replace('{n}',ds.length))}</small></h4><ul>${ds.map(d=>`<li data-z="${d.img}"><b>${esc(d.n)}</b><span>${esc(L(d.cls))}</span></li>`).join('')}</ul></div>`; }).join('')}</div>
      <div class="mr-act"><span class="hint">${esc(L(BAGX.hint))}</span><button class="gbtn" id="bagGo">${esc(L(BAGX.go))}</button></div></div>
      <div class="mr-side">${labPanelHTML()}</div>`;
    host.classList.remove('hidden'); host.style.animation='none'; void host.offsetWidth; host.style.animation='';
    $('#mrSheet').onclick=()=>zoomImg(IMG.labs);
    host.querySelectorAll('.bag li').forEach(li=>li.onclick=()=>{ sfx.paper(); zoomImg(IMG[li.dataset.z]); });
    $('#bagGo').onclick=()=>{ sfx.click(); host.classList.add('hidden'); res(); };
  });
}
const MISSIONS=[""")
sub("const sel=new Set(), list=DRUGS.slice(); if(EXAM())", "const few=MR_SHORT[m.id], sel=new Set(), list=few?few.map(id=>DRUGS.find(d=>d.id===id)):DRUGS.slice(); if(EXAM())")
sub("""      <div class="mr-grid">${list.map((d,j)=>""", """      <div class="mr-grid${few?' few':''}">${list.map((d,j)=>""")
sub('.dcard .badge{position:absolute;right:5px;bottom:3px;font-size:16px}',
    """.dcard .badge{position:absolute;right:5px;bottom:3px;font-size:16px}
.mr-grid.few{grid-template-columns:repeat(3,1fr);gap:18px;padding:12px;align-content:stretch}
.mr-grid.few .dcard{padding:16px 20px;font-size:22px;line-height:1.35;border-radius:22px;display:flex;flex-direction:column;justify-content:center}
.mr-grid.few .dcard .src{align-self:flex-start;font-size:17px;padding:3px 12px;margin-bottom:8px;max-width:calc(100% - 56px)}
.mr-grid.few .dcard b{font-size:32px;line-height:1.2}.mr-grid.few .dcard .g{font-size:19px;line-height:1.3;margin-top:2px}
.mr-grid.few .dcard .sig{font-size:22px;margin-top:8px}.mr-grid.few .dcard .cls{font-size:21px;line-height:1.3;margin-top:4px}
.mr-grid.few .dcard .zoom{width:50px;height:50px;font-size:25px;line-height:50px;right:10px;top:10px}.mr-grid.few .dcard .badge{font-size:30px}
#medrev .bag-grid{flex:1;display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin:12px 0;padding:6px;min-height:0}
#medrev .bag{--c:#3d7bff;border-radius:20px;background:#fff;box-shadow:0 0 0 4px var(--c);display:flex;flex-direction:column;overflow:hidden;min-height:0}
#medrev .bag.sB{--c:#18b07f}#medrev .bag.sD{--c:#8b5cf6}#medrev .bag.sE{--c:#ff8a1f}
#medrev .bag h4{margin:0;padding:9px 14px;background:var(--c);color:#fff;font-size:21px;line-height:1.25}
#medrev .bag h4 small{display:block;font-size:16px;font-weight:800;opacity:.92}
#medrev .bag ul{list-style:none;margin:0;padding:4px 10px;overflow:auto;flex:1}
#medrev .bag li{padding:8px 4px;border-bottom:2px dashed #ebe8f5;cursor:pointer}#medrev .bag li:last-child{border-bottom:0}
#medrev .bag li b{display:block;font-size:23px;line-height:1.2;color:#2a2140}
#medrev .bag li span{display:block;font-size:16.5px;line-height:1.25;color:#8a4fb8;font-weight:700}
#medrev .mr-main:has(.mr-grid.few) .mr-head .tx,#medrev .mr-main:has(.bag-grid) .mr-head .tx{font-size:24px}
#medrev .mr-main:has(.bag-grid) .mr-act .hint{font-size:20px;line-height:1.3}
.fcard{position:relative;display:flex;align-items:center;gap:16px;text-decoration:none;color:#fff;border-radius:24px;padding:14px 18px 14px 14px;background:linear-gradient(135deg,#2a2150,#4b2f72 60%,#7c3a5c);box-shadow:0 0 0 4px #ffcf4d,0 10px 24px rgba(30,20,60,.4);--fs:1.06;transform-origin:center;animation:fpop .5s ease-out,fpulse 1.5s ease-in-out .5s infinite}
@keyframes fpop{0%{transform:scale(.88) rotate(-2deg);opacity:0}60%{transform:scale(1.04)}100%{transform:none;opacity:1}}
/* the card breathes: grows and shrinks with a glow, so it reads as something new to tap (owner, 18 Nov 2026) */
@keyframes fpulse{0%,100%{transform:scale(1)}50%{transform:scale(var(--fs));box-shadow:0 0 0 4px #ffe27a,0 0 30px 10px rgba(255,207,77,.75)}}
.fcard.row{--fs:1.022}
@media (prefers-reduced-motion:reduce){.fcard{animation:none}}
.fcard img{width:118px;height:118px;border-radius:18px;object-fit:cover;flex:0 0 auto;box-shadow:0 0 0 3px rgba(255,255,255,.75)}
.fcard .ft{flex:1;display:flex;flex-direction:column;min-width:0;line-height:1.25;text-align:left}
.fcard em{position:absolute;left:16px;top:-20px;font-style:normal;font-weight:900;font-size:21px;line-height:1.2;color:#4a2a00;background:linear-gradient(#ffe88a,#ffb300);padding:5px 16px;border-radius:999px;box-shadow:0 3px 0 #c98500;transform:rotate(-3deg);white-space:nowrap}
.fcard b{font-family:var(--tc);font-size:29px;line-height:1.2;color:#ffe9a8}
.fcard .ft span{font-size:18.5px;font-weight:700;color:#f3ecff;margin-top:2px}
.fcard q{font-size:17px;font-weight:700;font-style:italic;color:#ffd9a8;margin-top:2px}
.fcard small{font-size:17px;font-weight:900;color:#ffc2d2;margin-top:4px}
.fcard i{font-style:normal;flex:0 0 auto;font-weight:900;font-size:22px;color:#4a2a00;background:linear-gradient(#ffe88a,#ffb300);padding:10px 18px;border-radius:999px;box-shadow:0 4px 0 #c98500;white-space:nowrap}
#btnFloors{position:absolute;left:calc(100% + 26px);top:64px;width:520px}
#btnFloors i{position:absolute;right:16px;bottom:-18px}
.rfloors{margin-top:12px}.fcard.row{padding:9px 18px 9px 10px;gap:14px}.fcard.row img{width:78px;height:78px;border-radius:14px}
.fcard.row .top{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin:0}.fcard.row em{position:static;transform:none;font-size:17px;padding:3px 12px;box-shadow:0 2px 0 #c98500}
.fcard.row b{font-size:25px}.fcard.row q{font-size:17.5px;margin-top:3px}.fcard.row small{font-size:15.5px;margin-top:2px;color:#e9dcff;font-weight:700}""")
sub("""  await say('pilly','shock',['藥袋危機！一共 4 個任務：點選有問題的藥（可以複選），再按「確認診斷」！','Med-bag crisis! 4 missions: tap the problem drugs (several may apply), then press "Confirm"!','วิกฤตซองยา! มี 4 ภารกิจ: แตะเลือกยาที่มีปัญหา (เลือกได้หลายตัว) แล้วกด "ยืนยัน"!']);""",
    """  hideAll(); hideText(); await bagOverview(); show('me','L','neutral'); show('yeh','R','smug');   /* mk_dease */
  await say('pilly','shock',['藥袋危機！一共 4 個任務，一次只看一個問題、只擺出相關的 6 種藥：點選有問題的藥（可以複選），再按「確認診斷」！','Med-bag crisis! 4 missions, one question at a time with only the 6 related medicines on the table: tap the problem drugs (several may apply), then press "Confirm"!','วิกฤตซองยา! มี 4 ภารกิจ ดูทีละเรื่อง วางเฉพาะยาที่เกี่ยวข้อง 6 ตัว: แตะเลือกยาที่มีปัญหา (เลือกได้หลายตัว) แล้วกด "ยืนยัน"!']);""")

# ---------- 3b. the inhaler game is an ordering task now (d_isim.js, INH_ORDER): Ms Yeh's cue says so ----------
sub("這是示範用的吸入器——你親手做一次正確的給他看！", "這是示範用的吸入器——把正確的步驟排出來，示範給他看！")
sub("Here\\'s a demo inhaler — show him the right way with your own hands!", "Here\\'s a demo inhaler — put the steps in the right order and show him!")
sub("นี่คือยาพ่นตัวอย่าง ลองสาธิตวิธีที่ถูกให้ลุงดูด้วยมือคุณเอง!", "นี่คือยาพ่นตัวอย่าง เรียงขั้นตอนที่ถูก แล้วสาธิตให้ลุงดู!")
# ---------- 4. settings ----------
sub("  VISIT_MIN:60,   ", "  VISIT_MIN:70,   ")
sub("  PATIENCE:10, PAT_MAX:14, TRUST_TALK:4", "  PATIENCE:13, PAT_MAX:17, TRUST_TALK:4")
sub("拜訪時間只有 <b>60 分鐘</b>", "拜訪時間只有 <b>70 分鐘</b>"); sub("Only <b>60 minutes</b>", "Only <b>70 minutes</b>"); sub("แค่ <b>60 นาที</b>", "แค่ <b>70 นาที</b>")
sub("['拜訪時間只有 60 分鐘喔！", "['拜訪時間只有 70 分鐘喔！"); sub("'You only have 60 minutes of visit time!", "'You only have 70 minutes of visit time!"); sub("'มีเวลาเยี่ยมแค่ 60 นาทีนะ!", "'มีเวลาเยี่ยมแค่ 70 นาทีนะ!")
open(f, 'w', encoding='utf-8').write(s); print('case D eased: story, Four Floors link, bags, settings')
