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
  go:['🐕 接著玩《李伯伯的四層樓》：同一個家，從小黑的紅色牽繩看三天','🐕 Play next: "Uncle Lee\\'s Four Floors" — the same home, three days around Blackie\\'s red lead (in Chinese or Thai)','🐕 เล่นต่อ: "สี่ชั้นของลุงหลี่" บ้านหลังเดิม สามวันรอบสายจูงสีแดงของเจ้าดำ'],
  btn:['🐕 接著玩：李伯伯的四層樓 →','🐕 Play next: Four Floors →','🐕 เล่นต่อ: สี่ชั้นของลุงหลี่ →']};
const floorsHTML=()=>`<div class="rfloors"><p>「${esc(L(FLOORS.line))}」</p><a class="gbtn gold" href="${FLOORS.url()}" target="_blank" rel="noopener">${esc(L(FLOORS.go))}</a></div>`;
/* the results page is engine code (merged from Case A), so the band is added after it is drawn, not in its template */
{ const r0=results; results=async function(){ await r0.apply(this,arguments); try{ const b=$('#rRep'); if(b&&!$('#results .rfloors')) b.parentNode.insertAdjacentHTML('beforebegin',floorsHTML()); }catch(e){} }; }""")
sub("function renderTitleBtns(){ const st=badgeStore(), n=BADGES.filter(x=>st[x.id]).length; const bb=$('#btnBadges'), cb=$('#btnChSel');",
    "function renderTitleBtns(){ const st=badgeStore(), n=BADGES.filter(x=>st[x.id]).length; const bb=$('#btnBadges'), cb=$('#btnChSel');\n"
    "  const lg=$('#logo'); if(lg&&cleared()){ let fb=$('#btnFloors'); if(!fb){ fb=document.createElement('a'); fb.id='btnFloors'; fb.className='gbtn gold'; fb.target='_blank'; fb.rel='noopener'; lg.appendChild(fb); } fb.href=FLOORS.url(); fb.textContent=L(FLOORS.btn); }")
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
#btnFloors{position:absolute;left:calc(100% + 26px);top:0;font-size:21px;padding:9px 20px;text-decoration:none;white-space:nowrap}
.rfloors{margin-top:12px;padding:10px 16px;border-radius:18px;background:linear-gradient(90deg,#fff6dc,#ffeef0);display:flex;gap:14px;align-items:center;justify-content:space-between}
.rfloors p{margin:0;font-family:var(--tc);font-weight:900;font-size:21px;line-height:1.3;color:#7a3a12}
.rfloors a{flex:0 0 auto;max-width:56%;font-size:18px;line-height:1.3;padding:10px 18px;text-decoration:none;text-align:center}""")
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
