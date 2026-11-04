<script>
/* =====================================================================
   藥師偵探：陳伯的秘密 · Pharma Detective: The Secret of Uncle Chen
   Case Report Exercise A (2021/04/01) — single-file anime mystery game
   ===================================================================== */
/* ---- instructor configuration: edited in-game (teacher page), baked into the file on "publish" ---- */
/* ---- which case this file plays: every case runs this same engine and keeps its own saves ---- */
const CASE_ID='a';
const URL_LANG=(()=>{ try{ const l=new URLSearchParams(location.search).get('lang'); return ['zh','en','th'].includes(l)?l:''; }catch(e){ return ''; } })();
const __SELF_HTML='<!DOCTYPE html>\n'+document.documentElement.outerHTML;   // snapshot of this file, before anything changes the page
const GAME_CFG_BAKED=(()=>{ try{ return JSON.parse((document.getElementById('gameConfig')||{}).textContent||'{}')||{}; }catch(e){ return {}; } })();
const CFG_DRAFT_KEY='phd_cfg_draft_'+((GAME_CFG_BAKED.meta&&GAME_CFG_BAKED.meta.rev)||'orig');
/* the version the instructor published online for this link (cached from the last visit, refreshed by cfgRefresh) */
const CFG_ONLINE_KEY='phd_cfg_online_v1';
const CFG_REQ_CLASS=(()=>{ try{ return String(new URLSearchParams(location.search).get('class')||'').trim().toLowerCase().replace(/[^a-z0-9_-]/g,'').slice(0,40)||'main'; }catch(e){ return 'main'; } })();
function cfgFromOnline(o){ if(!o||!o.config||typeof o.config!=='object') return null; const c=Object.assign({}, o.config), bm=GAME_CFG_BAKED.media||{}, om=c.media||{};
  c.media={labImages:[...new Set([].concat(bm.labImages||[], om.labImages||[]))], medBagImages:Object.assign({}, bm.medBagImages||{}, om.medBagImages||{})};
  c.meta={rev:o.rev, note:o.note||'', online:o.cls}; return c; }
let GAME_CFG_BASE=(()=>{ try{ const all=JSON.parse(localStorage.getItem(CFG_ONLINE_KEY)||'{}'); return cfgFromOnline(all[CFG_REQ_CLASS])||GAME_CFG_BAKED; }catch(e){ return GAME_CFG_BAKED; } })();
const CFG_DRAFTMODE=(()=>{ try{ return sessionStorage.getItem('phd_usedraft')==='1'; }catch(e){ return false; } })();
let GAME_CFG=(()=>{ try{ if(CFG_DRAFTMODE){ const dr=JSON.parse(localStorage.getItem(CFG_DRAFT_KEY)||'null'); if(dr) return Object.assign({}, dr, {media:GAME_CFG_BASE.media, meta:GAME_CFG_BASE.meta}); } }catch(e){} return GAME_CFG_BASE; })();
const CONFIG = {
  TEACHER_PIN:'1234',              // รหัสหน้าอาจารย์ / instructor PIN
  STORAGE_KEY:'phd_chen_sessions_v3', MEDIA_KEY:'phd_chen_media_v2',
  SERVER_URL:'https://pharma-detective-api.nattasitrx.workers.dev',   // results & settings server (Cloudflare Worker + D1); '' = off
  GAME_URL:'https://nattasitrx.github.io/pharma_detective/case-a/', // public link of this case (the site root lets students choose a case)
  VISIT_MIN:60,                     // in-game visit time (minutes) — spent by actions, not real time
  COST_ASK:2, COST_SEARCH:1, COST_WRONG:3, COST_HINT:5,
  SEARCH_CHARGES:16, HEARTS:5, QTE_SEC:12, BOSS_SEC:25, TRUST_START:3,
  PATIENCE:10, PAT_MAX:14, TRUST_TALK:4  // patience = how many information questions Uncle Chen tolerates · trust needed before he shares his secret
};
const CONFIG_DEF=Object.assign({},CONFIG);
function applyCfgSettings(){ const s=GAME_CFG.settings||{}; ['VISIT_MIN','HEARTS','SEARCH_CHARGES'].forEach(k=>{ const v=Math.round(+s[k]); CONFIG[k]=v>0?v:CONFIG_DEF[k]; }); CONFIG.TEACHER_PIN=s.TEACHER_PIN?String(s.TEACHER_PIN):CONFIG_DEF.TEACHER_PIN; }
applyCfgSettings();
/* ใส่รูปภาพถาวรได้ที่นี่ — item id → [images] (filled below from embedded IMG) */
const MEDIA = { labImages:[], medBagImages:{} };
const LANGS=['zh','en','th'];
const UI = {
  ribbon:['居家藥事照護 × 推理冒險','Home-care pharmacy × Mystery adventure','เภสัชกรรมเยี่ยมบ้าน × ผจญภัยไขปริศนา'],
  t1:['藥師偵探','Pharma Detective','นักสืบเภสัช'], t2:['陳伯的秘密','The Secret of Uncle Chen','ความลับของลุงเฉิน'],
  brief:['🏠 2021/4/1・台灣鄉下的雜貨店<br>陳伯上個月看醫生 <b>40 多次</b>，吃了一大堆藥，身體卻越來越糟。他一定藏著什麼秘密……<br>🎯 訪談 → 搜查 → 揭穿矛盾 → 藥物整合 → 擊敗「迷思大魔王」→ 兩週後見真章！拜訪時間只有 <b>60 分鐘</b>，時間到陳太太就要開店了！',
    '🏠 April 1, 2021 · a grocery-house in rural Taiwan<br>Uncle Chen saw doctors <b>40+ times</b> last month and takes piles of medicine, yet he keeps getting worse. He is hiding something…<br>🎯 Interview → Search → Expose lies → Med review → Defeat the <b>Myth Overlord</b> → see what happens two weeks later! Only <b>60 minutes</b> — then Mrs. Chen must reopen the shop!',
    '🏠 1 เม.ย. 2021 · บ้านร้านโชห่วยในชนบทไต้หวัน<br>เดือนที่แล้วลุงเฉินไปหาหมอ <b>40 กว่าครั้ง</b> กินยาเพียบแต่อาการกลับแย่ลง เขาต้องซ่อนความลับอยู่แน่…<br>🎯 สัมภาษณ์ → ค้นบ้าน → จับโกหก → ทบทวนยา → ล้ม <b>จอมมารความเชื่อผิด</b> → ดูผล 2 สัปดาห์ต่อมา! มีเวลาเยี่ยมแค่ <b>60 นาที</b> หมดเวลาป้าเฉินต้องเปิดร้าน!'],
  stuName:['學生姓名','Student name','ชื่อนักศึกษา'], stuId:['學號','Student ID','รหัสนักศึกษา'], chooseAv:['角色性別','Gender','เลือกเพศ'], female:['女生','Female','หญิง'], male:['男生','Male','ชาย'], genderT:['性別','Gender','เพศ'],
  start:['開始調查 ▶','Start ▶','เริ่มสืบ ▶'], teacherBtn:['👩‍🏫 教師後台','👩‍🏫 Instructor','👩‍🏫 หน้าอาจารย์'],
  qteOpt:['限時選項（取消勾選＝不限時）','Timed choices (uncheck = no limit)','ตัวเลือกจับเวลา (ไม่ติ๊ก = ไม่จำกัด)'],
  nameNeeded:['請輸入姓名與學號，老師才看得到你的紀錄喔！','Enter your name and student ID so your instructor can see your record!','กรอกชื่อและรหัสนักศึกษาก่อน อาจารย์จะได้เห็นผลของคุณ!'],
  min:['分','min','นาที'], you:['你','You','คุณ'], trust:['信任度','Trust','ความไว้ใจ'],
  chen:['陳伯','Uncle Chen','ลุงเฉิน'], wife:['陳太太','Mrs. Chen','ป้าเฉิน'], yeh:['葉藥師','Pharmacist Yeh','เภสัชกรเย่'], pilly:['藥丸精靈 Pilly','Pilly the Pill','พิลลี่ ภูตเม็ดยา'], sys:['旁白','Narrator','ผู้บรรยาย'],
  ch0:['序章','PROLOGUE','บทนำ'], ch0t:['到府！','House Call!','ถึงบ้านแล้ว!'], ch0s:['第一次居家訪視','Your first home visit','การเยี่ยมบ้านครั้งแรก'],
  ch1:['第一章','CHAPTER 1','บทที่ 1'], ch1t:['初次見面','First Contact','พบกันครั้งแรก'], ch1s:['建立信任，問出線索','Build trust, collect clues','สร้างความไว้ใจ เก็บเบาะแส'],
  ch2:['第二章','CHAPTER 2','บทที่ 2'], ch2t:['屋內大搜查','House Search','ค้นบ้าน!'], ch2s:['藥藏在哪裡？','Where are the medicines hiding?','ยาถูกซ่อนไว้ที่ไหน?'],
  ch3:['第三章','CHAPTER 3','บทที่ 3'], ch3t:['矛盾對決','Contradiction Duel','ดวลจับโกหก'], ch3s:['用證物揭穿謊言','Expose the lies with evidence','ใช้หลักฐานเปิดโปงคำโกหก'],
  ch4:['第四章','CHAPTER 4','บทที่ 4'], ch4t:['藥袋危機！','Med-Bag Crisis!','วิกฤตซองยา!'], ch4s:['整合所有藥物，找出用藥問題','Reconcile every drug, find the DRPs','รวบรวมยาทั้งหมด หาปัญหาจากยา'],
  ch5:['最終章','FINAL CHAPTER','บทสุดท้าย'], ch5t:['迷思大魔王','The Myth Overlord','จอมมารความเชื่อผิด'], ch5s:['用正確的衛教擊敗它！','Defeat it with correct counseling!','ล้มมันด้วยคำแนะนำที่ถูกต้อง!'],
  boardTitle:['🗂️ 提問卡（每問 −2 分）','🗂️ Question cards (−2 min each)','🗂️ การ์ดคำถาม (−2 นาที/ข้อ)'], boardNext:['前往搜查 ▶','Go search ▶','ไปค้นบ้าน ▶'], freeSend:['問！','Ask!','ถาม!'],
  freePh:['用自己的話問問看…（中文 / English / ไทย）','Ask in your own words… (Chinese / English / Thai)','ถามด้วยคำพูดของคุณเอง… (จีน / อังกฤษ / ไทย)'],
  freeHint:['💡 溫柔、同理、保證保密的話會提升信任度；指責會降低信任度。','💡 Empathy and promises of confidentiality raise trust; blaming lowers it.','💡 คำพูดที่เห็นใจและรับปากเก็บความลับช่วยเพิ่มความไว้ใจ คำตำหนิทำให้ลดลง'],
  sHint:['💡 超級放大鏡（−5 分）','💡 Super magnifier (−5 min)','💡 แว่นขยายพิเศษ (−5 นาที)'], sDone:['結束搜查 ▶','Finish search ▶','จบการค้น ▶'],
  zoomBack:['↩ 退後看整個房間','↩ Step back','↩ ถอยออกมาดูทั้งห้อง'], zoomHint:['點選家具靠近調查','Click furniture to take a closer look','คลิกเฟอร์นิเจอร์เพื่อเข้าไปดูใกล้ๆ'],
  zTV:['電視櫃','TV cabinet','ตู้ทีวี'], zAltar:['神明桌','Altar table','โต๊ะบูชา'], zKitchen:['冰箱・廚房角落','Fridge corner','มุมตู้เย็น'], zShelf:['雜貨貨架','Shop shelf','ชั้นวางสินค้า'], zTable:['餐桌','Dining table','โต๊ะกินข้าว'],
  nothing:['什麼都沒有…','Nothing here…','ไม่มีอะไร…'], noCharge:['放大鏡用完了！','Out of magnifier charges!','แว่นขยายหมดแล้ว!'],
  get:['證物 GET！','EVIDENCE GET!','ได้หลักฐาน!'], keyEv:['★ 關鍵證物','★ KEY EVIDENCE','★ หลักฐานสำคัญ'], optEv:['＋ 額外線索','+ BONUS CLUE','+ เบาะแสเพิ่ม'],
  press:['🔍 追問','🔍 Press','🔍 ซักต่อ'], present:['📂 出示證物','📂 Present','📂 แสดงหลักฐาน'], trayTitle:['要出示哪一個證物？','Which evidence will you present?','จะแสดงหลักฐานชิ้นไหน?'],
  testiTitle:['～ 證言：我的生活很規律！ ～','~ Testimony: My life is perfectly in order! ~','~ คำให้การ: ชีวิตลุงเป็นระเบียบมาก! ~'],
  lockTitle:['～ 心鎖：血壓血糖藥一天都沒漏！ ～','~ Heart Lock: "Never missed a day of my BP & sugar pills!" ~','~ กุญแจหัวใจ: "ยาความดัน-เบาหวาน ไม่เคยขาดสักวัน!" ~'],
  claimLbl:['陳伯的說法','Uncle Chen\'s claim','คำพูดของลุง'], claimTip:['找出能「直接」推翻黃色字的證物','Find the evidence that DIRECTLY contradicts the highlighted words','หาหลักฐานที่ "หักล้างตรงๆ" กับข้อความสีเหลือง'],
  usedTag:['✓ 已用過','✓ Used','✓ ใช้แล้ว'], triedTag:['✗ 試過了','✗ Tried','✗ ลองแล้ว'], foundLoc:['發現地點','Found at','พบที่'],
  objection:['等一下！','HOLD IT!','เดี๋ยวก่อน!'], gotcha:['找到了！','GOTCHA!','เจอแล้ว!'], unlock:['心鎖解除！','UNLOCKED!','ปลดล็อก!'],
  critical:['會心一擊！','CRITICAL!','คริติคอล!'], victory:['完全勝利！','VICTORY!','ชนะแล้ว!'], escaped:['逃走了……','ESCAPED…','หนีไปแล้ว…'],
  mythAliveH:['👿 存活的迷思','👿 Myths still alive','👿 ความเชื่อที่ยังรอด'], mythListH:['👿 還沒破的迷思：在總結裡提到它，就能把它打倒','👿 Myths still alive: mention each one in your summary to break it','👿 ความเชื่อที่ยังไม่แตก: พูดถึงในสรุปเพื่อทลายมัน'],
  mythShaken:['動搖了…但還沒破！','Shaken… not broken!','สั่นคลอน… แต่ยังไม่แตก!'], mythHolds:['迷思還在！','Myth holds!','ความเชื่อยังอยู่!'],
  mythSurv:['這個迷思還沒破，最後總結時要再提到它！','This myth survived. Bring it up again in your closing summary!','ความเชื่อนี้ยังไม่แตก ตอนสรุปปิดท้ายต้องพูดถึงอีกครั้ง!'],
  mythRule:['注意：只有「最佳」衛教卡才能打破迷思。沒打破的迷思會留在陳伯腦中，兩週後就會看到後果！','Heads up: only the BEST card breaks a myth. Any myth left standing stays in Uncle Chen\'s head, and two weeks later you\'ll see what it does!','ระวัง: มีแต่การ์ดที่ดีที่สุดเท่านั้นที่ทลายความเชื่อได้ ความเชื่อที่ยังไม่แตกจะติดอยู่ในหัวลุง แล้วอีกสองสัปดาห์จะเห็นผลของมัน!'],
  mythLastCall:['還有 {n} 個迷思沒破！最後的總結要把它們都說清楚，不然大魔王會帶著它們逃走！','{n} myths are still standing! Your closing summary has to address them, or the Overlord escapes with them!','ยังมีความเชื่อที่ไม่แตกอีก {n} ข้อ! สรุปปิดท้ายต้องพูดถึงให้ครบ ไม่งั้นจอมมารจะหนีไปพร้อมมัน!'],
  mythEscYeh:['大魔王帶著 {n} 個迷思逃走了。兩週後，我們就會看到它們造成了什麼。','The Overlord escaped with {n} myths. Two weeks from now we\'ll see what they did.','จอมมารหนีไปพร้อมความเชื่อ {n} ข้อ อีกสองสัปดาห์เราจะได้เห็นว่ามันทำอะไรไว้'],
  mythWarn:['還有 {n} 個存活的迷思沒在總結裡提到，大魔王會帶著它們逃走。要繼續修改，還是直接送出？','{n} surviving myths are not in your summary yet. The Overlord will escape with them. Keep editing, or send anyway?','ยังมีความเชื่ออีก {n} ข้อที่สรุปยังไม่ได้พูดถึง จอมมารจะหนีไปพร้อมมัน จะแก้ต่อหรือส่งเลย?'],
  mythLeftStat:['存活迷思','Myths left','ความเชื่อที่รอด'], mythRowG:['迷思都破除了','Every myth busted','ความเชื่อผิดถูกทลายหมด'], mythRowGd:['他現在會說：「藥師說的有道理。」','He now says, "The pharmacist has a point."','ตอนนี้ลุงพูดว่า "เภสัชกรพูดมีเหตุผล"'],
  mythRowB:['還有 {n} 個迷思','{n} myths still alive','ความเชื่อผิดยังอยู่ {n} ข้อ'],
  chenStill:['我大概懂了……不過我還是覺得：「{q}」','I get most of it… but still, "{q}"','ลุงพอเข้าใจแล้วล่ะ… แต่ลุงก็ยังคิดว่า "{q}" อยู่ดีนะ'],
  chenStill2:['……不過我還是覺得：「{q}」','…but I still think, "{q}"','…แต่ลุงก็ยังคิดว่า "{q}" อยู่ดีนะ'], perfect:['完美診斷！','Perfect call!','วินิจฉัยเป๊ะ!'], partial:['部分正確','Partly right','ถูกบางส่วน'], wrongDx:['再想想……','Not quite…','ยังไม่ใช่…'],
  problemFound:['發現問題！','PROBLEM FOUND!','พบปัญหา!'],
  bossName:['迷思大魔王','The Myth Overlord','จอมมารความเชื่อผิด'], combo:['連擊','Combo','คอมโบ'], confusion:['陳伯的困惑','Chen\'s confusion','ความงงของลุง'], cardBest:['衛教卡','Counsel card','การ์ดคำแนะนำ'],
  finalT:['✨ 必殺技：最後的衛教 ✨','✨ Finisher: your closing counsel ✨','✨ ท่าไม้ตาย: คำแนะนำปิดท้าย ✨'],
  finalH:['照著左邊 5 個步驟，對陳伯說 4–6 句話。每完成一步就會亮燈 ✓（中文 / English / ไทย 都可以）','Follow the 5 steps on the left and say 4–6 sentences to Uncle Chen. Each step lights up ✓ when covered. (Any language is fine)','ทำตาม 5 ขั้นทางซ้าย พูดกับลุง 4–6 ประโยค ทำครบขั้นไหนไฟจะติด ✓ (ใช้ภาษาไหนก็ได้)'],
  stepEx:['例','e.g.','ตัวอย่าง'], addStarter:['✏️ 用這句開頭','✏️ Start with this line','✏️ ใช้ประโยคนี้ขึ้นต้น'], finalFmt:['📝 像真的在跟陳伯說話一樣寫：一個重點一句，換行或寫成一段都可以，不用加「+」或編號。','📝 Write it the way you would say it to him: one sentence per point, on new lines or as one paragraph. No "+" signs or numbering needed.','📝 พิมพ์เหมือนพูดกับลุงจริง ๆ ประเด็นละ 1 ประโยค ขึ้นบรรทัดใหม่หรือพิมพ์ต่อกันก็ได้ ไม่ต้องใส่ + หรือเลขข้อ'], covLbl:['已涵蓋','Covered','ครอบคลุมแล้ว'],
  finalPh:['在這裡寫下你要對陳伯說的話……\n不知道怎麼開頭？點左邊的「✏️ 用這句開頭」，再把句子接完。','Write what you will say to Uncle Chen…\nNot sure how to begin? Tap "✏️ Start with this line" on the left, then finish the sentence.','พิมพ์สิ่งที่จะพูดกับลุงที่นี่…\nไม่รู้จะเริ่มยังไง? กด "✏️ ใช้ประโยคนี้ขึ้นต้น" ทางซ้าย แล้วพิมพ์ต่อให้จบประโยค'],
  finalWarn:['目前只涵蓋 {n}/5 個步驟。再補幾句會更完整——還是要直接送出？','Only {n}/5 steps covered so far. Add a bit more — or send anyway?','ตอนนี้ครอบคลุมแค่ {n}/5 ขั้น เติมอีกนิดจะครบกว่านี้ หรือจะส่งเลย?'],
  keepEdit:['繼續修改','Keep editing','แก้ต่อ'], sendAnyway:['直接送出','Send anyway','ส่งเลย'], chipLbl:['💡 不知道怎麼說？點一句當開頭：','💡 Stuck? Tap a phrase to start:','💡 ไม่รู้จะพูดยังไง? แตะประโยคเพื่อเริ่ม:'],
  mission:['任務','Mission','ภารกิจ'], confirmDx:['🩺 確認診斷','🩺 Confirm','🩺 ยืนยัน'], selected:['已選','Selected','เลือกแล้ว'],
  labPanel:['🧪 檢驗監視器','🧪 Lab monitor','🧪 จอติดตามแล็บ'], viewSheet:['📄 看原始報告','📄 View lab sheet','📄 ดูใบผลแล็บ'], tapBag:['點 🔍 看藥袋照片','Tap 🔍 for the bag photo','แตะ 🔍 เพื่อดูภาพซองยา'],
  send:['送出','Send','ส่ง'], ok:['好','OK','ตกลง'], close:['關閉','Close','ปิด'], cancel:['取消','Cancel','ยกเลิก'], skip:['點一下繼續 ▶','Click to continue ▶','คลิกเพื่อไปต่อ ▶'],
  rank:['評價','Rank','ระดับ'], score:['分數','Score','คะแนน'], realTime:['實際用時','Real time','เวลาจริง'], visitLeft:['剩餘拜訪時間','Visit time left','เวลาเยี่ยมที่เหลือ'],
  heartsLeft:['剩餘心數','Hearts left','หัวใจที่เหลือ'], trustEnd:['最終信任度','Final trust','ความไว้ใจสุดท้าย'], bossAcc:['衛教正確率','Counsel accuracy','ความแม่นยำการแนะนำ'],
  maxCombo:['最高連擊','Max combo','คอมโบสูงสุด'], hintsUsed:['提示次數','Hints used','คำใบ้ที่ใช้'], bonusEv:['額外線索','Bonus clues','เบาะแสเพิ่ม'], mrStat:['藥物整合（完美／6）','Med review (perfect/6)','ทบทวนยา (เป๊ะ/6)'],
  report:['⬇️ 下載我的報告','⬇️ Download my report','⬇️ ดาวน์โหลดรายงาน'], again:['🔄 再玩一次','🔄 Play again','🔄 เล่นอีกครั้ง'],
  caseFile:['案件檔案','Case file','แฟ้มคดี'], tProfile:['個案資料','Profile','ข้อมูลผู้ป่วย'], tProblems:['問題清單','Problems','รายการปัญหา'], tEvidence:['證物','Evidence','หลักฐาน'],
  tMeds:['用藥清單','Med list','รายการยา'], tLabs:['檢驗數據','Labs','ผลแล็บ'], tMemo:['筆記','Memo','บันทึก'],
  medsLocked:['第四章開始後會整理出完整用藥清單。','The full medication list appears from Chapter 4.','รายการยาครบจะปรากฏตั้งแต่บทที่ 4'],
  unknown:['？？？','???','???'], memoPh:['記下你的觀察與推理…','Write your observations and deductions…','จดข้อสังเกตและการอนุมาน…'],
  labsLocked:['還沒拿到檢驗報告……說不定藏在店裡某個盒子？','No lab report yet… maybe it\'s in a box in the shop?','ยังไม่ได้ผลตรวจ… อาจอยู่ในกล่องบนชั้นวางของ?'],
  labItem:['項目','Test','รายการ'], labRef:['參考值','Ref.','ค่าอ้างอิง'], labNote:['判讀','Note','แปลผล'],
  labImgs:['報告影像','Report images','ภาพรายงาน'], labNoImg:['（尚無影像，教師可於後台上傳）','(No images yet — instructor can upload in the dashboard)','(ยังไม่มีภาพ อาจารย์อัปโหลดได้ในหน้าอาจารย์)'],
  noEvidence:['還沒有證物','No evidence yet','ยังไม่มีหลักฐาน'], foundAt:['發現於','found at','พบเมื่อ'],
  menu:['設定','Settings','ตั้งค่า'], language:['語言','Language','ภาษา'], textSpeed:['文字速度','Text speed','ความเร็วข้อความ'],
  spd_slow:['慢','Slow','ช้า'], spd_normal:['普通','Normal','ปกติ'], spd_fast:['快','Fast','เร็ว'],
  sound:['音效','Sound','เสียง'], music:['音樂','Music','เพลง'], qte:['限時選項','Timed choices','จับเวลาตัวเลือก'], motion:['畫面動態','Motion effects','เอฟเฟกต์เคลื่อนไหว'], on:['開','On','เปิด'], off:['關','Off','ปิด'],
  restart:['🔄 重新開始','🔄 Restart','🔄 เริ่มใหม่'], confirmRestart:['確定重新開始？目前進度已存檔。','Restart? Progress so far is saved.','เริ่มใหม่? ความคืบหน้าถูกบันทึกแล้ว'],
  dlgLog:['對話紀錄','Dialogue log','บันทึกบทสนทนา'], youSaid:['你剛剛說','You said','คุณพูดว่า'],
  tTitle:['教師後台','Instructor dashboard','หน้าอาจารย์'], tPin:['請輸入教師密碼','Enter instructor PIN','กรอกรหัสอาจารย์'], tWrong:['密碼錯誤','Wrong PIN','รหัสไม่ถูกต้อง'],
  tSessions:['學生紀錄','Sessions','บันทึกนักศึกษา'], tMedia:['素材','Media','สื่อ'], tTools:['工具','Tools','เครื่องมือ'],
  tExportJ:['⬇️ 匯出 JSON','⬇️ Export JSON','⬇️ ส่งออก JSON'], tExportC:['⬇️ 匯出文字作答 CSV','⬇️ Export text answers CSV','⬇️ ส่งออกคำตอบ CSV'],
  tImport:['⬆️ 匯入學生 JSON','⬆️ Import student JSON','⬆️ นำเข้า JSON'], tClear:['🗑️ 清除全部','🗑️ Clear all','🗑️ ล้างทั้งหมด'],
  tConfirmClear:['確定清除本機所有紀錄？','Delete ALL records on this device?','ลบบันทึกทั้งหมดในเครื่องนี้?'],
  tNone:['目前沒有紀錄。同一台電腦遊玩會自動記錄；不同電腦請匯入學生下載的 JSON。','No records yet. Play on this computer is saved automatically; for other computers, import the students\' JSON reports.','ยังไม่มีบันทึก การเล่นในเครื่องนี้บันทึกอัตโนมัติ ถ้าต่างเครื่องให้นำเข้าไฟล์ JSON ของนักศึกษา'],
  tFree:['文字作答（自由提問／心鎖／總結）','Typed answers (free questions / heart lock / finisher)','คำตอบที่พิมพ์ (ถามอิสระ / กุญแจหัวใจ / สรุป)'],
  tChoices:['選擇與出示紀錄','Choices & presents','บันทึกการเลือกและแสดงหลักฐาน'], tBoss:['大魔王戰（衛教卡）','Boss battle (counsel cards)','การต่อสู้บอส (การ์ดคำแนะนำ)'], tMR:['藥袋危機（藥物整合）','Med-bag crisis (med review)','วิกฤตซองยา (ทบทวนยา)'],
  tFound:['問題發現時間','Problem discovery times','เวลาที่พบปัญหา'], tAll:['完整紀錄','Full log','บันทึกทั้งหมด'], tDel:['刪除','Delete','ลบ'],
  tLabUp:['上傳檢驗報告影像','Upload lab images','อัปโหลดภาพแล็บ'], tBagUp:['上傳證物照片（藥袋等）','Upload evidence photos (med bags…)','อัปโหลดภาพหลักฐาน (ซองยา…)'],
  calcClues:['📋 線索（不一定全部用得到）','📋 Clues (not all are needed)','📋 เบาะแส (ไม่จำเป็นต้องใช้ทุกตัว)'], calcGo:['＝ 計算並確認','＝ Calculate & check','＝ คำนวณและตรวจ'],
  calcHow:['點空格 → 點線索或用按鍵輸入','Tap a box → tap a clue or use the keypad','แตะช่อง → แตะเบาะแสหรือกดปุ่มตัวเลข'], calcFill:['每個空格都要填數字','Fill every box with a number','ต้องใส่ตัวเลขให้ครบทุกช่อง'],
  calcTry:['嘗試','Try','ครั้งที่'], calcOk:['算對了！','Correct!','ถูกต้อง!'], calcCont:['看懂了，繼續 ▶','Got it, continue ▶','เข้าใจแล้ว ไปต่อ ▶'], calcStat:['計算題（BMI／eGFR／CrCl）','Calculations (BMI / eGFR / CrCl)','โจทย์คำนวณ (BMI / eGFR / CrCl)'],
  tCalc:['計算題','Calculations','โจทย์คำนวณ'], firstMoveT:['進門第一步','First move at the door','ก้าวแรกในบ้าน'],
  cqTitle:['老師的加分題','Instructor\'s question','คำถามจากอาจารย์'], cqIntro:['老師出的加分題來了！認真作答喔～','Bonus questions from your instructor! Do your best~','คำถามพิเศษจากอาจารย์มาแล้ว! ตั้งใจตอบนะ~'],
  cqSubmit:['送出答案','Submit','ส่งคำตอบ'], cqNext:['繼續 ▶','Continue ▶','ไปต่อ ▶'], cqPickOne:['選一個答案','Pick one answer','เลือก 1 คำตอบ'], cqPickMany:['可以選好幾個','You may pick several','เลือกได้หลายข้อ'],
  cqRight:['答對了！','Correct!','ถูกต้อง!'], cqPartial:['部分正確','Partly correct','ถูกบางส่วน'], cqWrong:['答錯了','Not quite','ยังไม่ถูก'], cqSaved:['已送出，老師會看你的答案。','Submitted — your instructor will read it.','ส่งแล้ว อาจารย์จะอ่านคำตอบของคุณ'],
  cqAnsPh:['在這裡輸入答案…','Type your answer…','พิมพ์คำตอบที่นี่…'], cqYour:['你的答案','Your answer','คำตอบของคุณ'], cqUse:['↓ 用這個結果','↓ Use this result','↓ ใช้ผลนี้'], cqAgain:['還不對，再試一次','Not yet — try again','ยังไม่ถูก ลองอีกครั้ง'],
  cqAnswerIs:['正確答案：','Correct answer: ','คำตอบที่ถูก: '], cqStat:['老師的加分題','Instructor questions','คำถามจากอาจารย์'], cqPick:['請先作答','Answer first','กรุณาตอบก่อน'], cqTimeUp:['時間到！','Time\'s up!','หมดเวลา!'],
  draftBadge:['👩‍🏫 試玩中：尚未發布的修改版','👩‍🏫 Preview: unpublished changes','👩‍🏫 ทดลองเล่น: ฉบับแก้ไขที่ยังไม่เผยแพร่'],
  syncNote:['遊玩結果會自動傳給老師（需要網路）','Your results go to your instructor automatically (needs internet)','ผลการเล่นจะส่งให้อาจารย์อัตโนมัติ (ต้องมีอินเทอร์เน็ต)'], syncClass:['班級','Class','ห้อง'], caseBack:['🗂 換案例','🗂 Choose a case','🗂 เลือกเคส'],
  lockH:['這個案例還沒開放','This case is not open yet','เคสนี้ยังไม่เปิดให้เล่น'], lockP:['老師開放之後就能玩了，可以先選其他案例。','Your instructor will open it soon — you can choose another case for now.','อาจารย์จะเปิดให้เล่นเร็วๆ นี้ ระหว่างนี้เลือกเคสอื่นก่อนได้'],
  swH:['學生可以玩這個案例嗎？','Can students play this case?','นักศึกษาเล่นเคสนี้ได้ไหม'], swOpen:['🔓 開放中：學生可以玩','🔓 Open — students can play','🔓 เปิดอยู่ — นักศึกษาเล่นได้'], swClosed:['🔒 關閉中：學生還不能進入','🔒 Closed — students cannot enter yet','🔒 ปิดอยู่ — นักศึกษายังเข้าไม่ได้'],
  swClose:['🔒 關閉這個案例','🔒 Close this case','🔒 ปิดเคสนี้'], swOpenBtn:['🔓 開放這個案例','🔓 Open this case','🔓 เปิดเคสนี้'], swUnknown:['（讀不到狀態）','(status unavailable)','(อ่านสถานะไม่ได้)'],
  swNote:['按下就生效，所有班級的連結都一樣。已經在玩的學生可以玩完。','Takes effect at once for every class link. Students who are already playing can finish.','มีผลทันทีกับลิงก์ของทุกห้อง ใครที่กำลังเล่นอยู่เล่นต่อจนจบได้'],
  cfgWait:['⏳ 正在載入老師設定的版本…','⏳ Loading your instructor\'s version…','⏳ กำลังโหลดเวอร์ชันของอาจารย์…'], cfgNew:['📥 已更新為老師最新發布的版本','📥 Updated to your instructor\'s latest version','📥 อัปเดตเป็นเวอร์ชันล่าสุดของอาจารย์แล้ว'],
  syncSending:['☁️ 正在把結果傳給老師…','☁️ Sending your results to your instructor…','☁️ กำลังส่งผลให้อาจารย์…'], syncOk:['☁️ 結果已傳給老師 ✓','☁️ Results sent to your instructor ✓','☁️ ส่งผลให้อาจารย์แล้ว ✓'],
  syncErr:['⚠️ 還沒傳出去，有網路時會自動重試；也可以按「下載我的報告」自己繳交','⚠️ Not sent yet — it retries automatically when you are online. You can also download your report and hand it in.','⚠️ ยังส่งไม่ได้ จะลองใหม่อัตโนมัติเมื่อมีอินเทอร์เน็ต หรือกดดาวน์โหลดรายงานส่งเองก็ได้'],
  syncOff:['這個檔案沒有設定結果伺服器，請下載報告繳交','No results server is set for this file — please download your report and hand it in','ไฟล์นี้ไม่ได้ตั้งเซิร์ฟเวอร์รับผล กรุณาดาวน์โหลดรายงานส่งเอง'], syncNow:['立即傳送','Send now','ส่งตอนนี้'], syncH:['自動繳交','Automatic hand-in','การส่งผลอัตโนมัติ'],
  tOnline:['☁️ 線上結果','☁️ Online results','☁️ ผลออนไลน์'],
  onIntro:['學生玩的時候，結果會自動傳到伺服器，不用再交檔案。在這裡載入後，「學生紀錄」「全班概況」「Debrief 指引」都會一起更新。','While students play, their results go to the server by themselves — nobody hands in files. Load them here and Sessions, Class overview and the Debrief guide all update.','ระหว่างที่นักศึกษาเล่น ผลจะส่งเข้าเซิร์ฟเวอร์เอง ไม่ต้องส่งไฟล์ โหลดผลที่นี่แล้วแท็บบันทึกนักศึกษา ภาพรวมชั้นเรียน และคู่มือ Debrief จะอัปเดตตาม'],
  onServer:['結果伺服器','Results server','เซิร์ฟเวอร์รับผล'], onTest:['測試連線','Test connection','ทดสอบการเชื่อมต่อ'], onUp:['連線正常 ✓','Connected ✓','เชื่อมต่อได้ ✓'], onDown:['連不上伺服器','Cannot reach the server','เชื่อมต่อเซิร์ฟเวอร์ไม่ได้'],
  onKey:['教師金鑰','Instructor key','รหัสอาจารย์สำหรับเซิร์ฟเวอร์'], onSave:['儲存','Save','บันทึก'],
  onKeyNote:['每台裝置輸入一次就好，會記在這台裝置上。金鑰和後台密碼不一樣，請不要給學生。','Enter it once per device; it is remembered on this device. It is not the dashboard PIN — never give it to students.','ใส่ครั้งเดียวต่อเครื่อง ระบบจะจำไว้ในเครื่องนี้ รหัสนี้ไม่ใช่รหัสเข้าหน้าอาจารย์ และห้ามให้นักศึกษา'],
  onPull:['⬇️ 載入最新結果','⬇️ Load latest results','⬇️ โหลดผลล่าสุด'], onPulled:['已載入 {n} 筆紀錄','Loaded {n} records','โหลดแล้ว {n} รายการ'], onBadKey:['收結果密碼不正確','The results key is not correct','รหัสรับผลไม่ถูกต้อง'], onNoKey:['請先輸入收結果密碼','Enter the results key first','กรุณาใส่รหัสรับผลก่อน'],
  onLast:['上次載入','Last loaded','โหลดล่าสุด'], onAuto:['之後打開教師後台時會自動載入','After this it loads by itself whenever you open the dashboard','ครั้งต่อไปจะโหลดให้อัตโนมัติเมื่อเปิดหน้าอาจารย์'], onClasses:['班級','Class','ห้อง'], onRecords:['筆','records','รายการ'],
  onLinkH:['給學生的連結','Link for students','ลิงก์สำหรับนักศึกษา'], onCopy:['複製','Copy','คัดลอก'], onCopied:['已複製','Copied','คัดลอกแล้ว'],
  onLinkNote:['輸入班級代碼（英文或數字，例如 ph2026a）就能把各班分開。學生打開連結就能玩，結果會自動歸到這個班。','Type a class code (letters or numbers, e.g. ph2026a) to keep classes apart. Students just open the link and their results are filed under that class.','ใส่รหัสห้อง (ตัวอักษรหรือตัวเลข เช่น ph2026a) เพื่อแยกแต่ละห้อง นักศึกษาเปิดลิงก์แล้วเล่นได้เลย ผลจะเข้าห้องนั้นเอง'],
  onDelCls:['🗑️ 刪除','🗑️ Delete','🗑️ ลบ'], onDelQ:['確定要刪除伺服器上「{c}」班的 {n} 筆結果？刪除後無法復原。','Delete {n} records of class "{c}" from the server? This cannot be undone.','ลบผล {n} รายการของห้อง "{c}" บนเซิร์ฟเวอร์? ลบแล้วกู้คืนไม่ได้'],
  onLocalNote:['伺服器上的紀錄只在這個畫面開著時顯示，不會存進這台裝置；想留一份請到「工具」匯出 JSON。','Server records are shown while this page is open; they are not saved on this device. To keep a copy, export JSON under Tools.','ผลจากเซิร์ฟเวอร์แสดงเฉพาะตอนเปิดหน้านี้ ไม่ได้บันทึกลงเครื่อง ถ้าต้องการเก็บสำเนาให้ส่งออก JSON ที่แท็บเครื่องมือ'],
  onDelOne:['也從伺服器刪除了','Also deleted from the server','ลบจากเซิร์ฟเวอร์ด้วยแล้ว'], clAllCls:['全部班級','All classes','ทุกห้อง'],
  view:['視角','View','มุมมอง'], view_tp:['第三人稱','3rd person','บุคคลที่ 3'], view_fp:['第一人稱','1st person','บุคคลที่ 1'],
  view_tpL:['第三人稱（看得到自己的角色）','3rd person (see your character)','บุคคลที่ 3 (เห็นตัวละครของเรา)'], view_fpL:['第一人稱（用自己的眼睛看）','1st person (through your own eyes)','บุคคลที่ 1 (มองผ่านสายตาเรา)'],
  viewHelp:['第一人稱：畫面上不會出現你的角色，就像自己和病人面對面；出示證件、證物和搜查時會看到你的手。隨時可以切換。','1st person: your own character is not drawn — you face the patient yourself, and you see your hands when you show your ID, present evidence or search. You can switch any time.','บุคคลที่ 1: จะไม่เห็นตัวละครของเราบนจอ เหมือนนั่งคุยกับผู้ป่วยเอง และจะเห็นมือเราตอนยื่นบัตร ยื่นหลักฐาน และค้นของ สลับได้ตลอดเวลา'],
  idTitle:['學生證','STUDENT ID','บัตรนักศึกษา'], idFac:['藥學系','School of Pharmacy','คณะเภสัชศาสตร์'], idRole:['藥學系實習生','Pharmacy intern','นักศึกษาฝึกงานเภสัชฯ'], evHdr:['證物','EVIDENCE','หลักฐาน'],
  gfx:['畫面','Graphics','กราฟิก'], gfx_auto:['自動','Auto','อัตโนมัติ'], gfx_high:['精緻','High','สวยเต็มที่'], gfx_low:['省電','Light','ประหยัด'], gfxNow:['目前','now','ตอนนี้'],
  gfxAutoLow:['偵測到裝置較慢，已自動切換為省電畫面（可在 ⚙️ 設定更改）','This device seems slow — switched to light graphics (change it in ⚙️ Settings)','เครื่องค่อนข้างช้า ปรับเป็นกราฟิกแบบประหยัดอัตโนมัติ (เปลี่ยนได้ที่ ⚙️ ตั้งค่า)'],
  gfxHelp:['省電模式會關掉背景動畫、角色晃動和陰影，讓舊手機或筆電也能順順玩。','Light mode turns off background animation, character idle motion and shadows so older phones and laptops run smoothly.','โหมดประหยัดจะปิดแอนิเมชันฉากหลัง การขยับของตัวละคร และเงา ให้มือถือหรือโน้ตบุ๊กรุ่นเก่าเล่นได้ลื่น'],
  resumeQ:['有一場還沒玩完的遊戲','You have an unfinished game','มีเกมที่เล่นค้างไว้'], resumeGo:['▶ 繼續玩','▶ Continue','▶ เล่นต่อ'], resumeDel:['捨棄','Discard','ทิ้ง'],
  resumeNewQ:['開始新遊戲會捨棄還沒玩完的那一場，確定嗎？','Starting a new game discards the unfinished one. Start anyway?','เริ่มเกมใหม่จะลบเกมที่เล่นค้างไว้ ต้องการเริ่มใหม่ไหม?'], resumeAt:['從這裡繼續','Resume at','เล่นต่อที่'],
  minsAgo:['{n} 分鐘前','{n} min ago','{n} นาทีที่แล้ว'], hrsAgo:['{n} 小時前','{n} h ago','{n} ชั่วโมงที่แล้ว'], resumed:['已從章節開頭繼續 ▶','Resumed from the start of the chapter ▶','เล่นต่อจากต้นบทแล้ว ▶'], startNew:['開始新遊戲','Start new','เริ่มใหม่'],
  bonusQ:['加分題','Extra questions','คำถามเพิ่ม'],
  saved:['已儲存','Saved','บันทึกแล้ว'], imported:['已匯入','Imported','นำเข้าแล้ว'], chapterTimes:['各章用時','Chapter times','เวลาแต่ละบท'],
};
Object.assign(UI,{
  patLbl:['陳伯的耐心','Uncle Chen\'s patience','ความอดทนของลุง'], patTip:['每問一個問題都會用掉一點耐心——沒辦法全部問完，挑重點！','Every question uses up some patience — you can\'t ask everything, so choose!','ทุกคำถามใช้ความอดทนของลุง ถามได้ไม่หมดทุกข้อ ต้องเลือก!'],
  patLow:['陳伯打了個哈欠……耐心快用完了，問題要挑重點！','Uncle Chen yawns… his patience is running low — choose carefully!','ลุงหาวแล้ว… ความอดทนใกล้หมด เลือกคำถามดีๆ นะ!'],
  fuTag:['追問','Follow-up','ถามต่อ'], hiddenQ:['🗝️ 隱藏提問 {n}/3：有些事卡片上沒有，要自己打字問','🗝️ Hidden questions {n}/3: some things aren\'t on any card — type them yourself','🗝️ คำถามลับ {n}/3: บางเรื่องไม่มีในการ์ด ต้องพิมพ์ถามเอง'],
  hiddenFound:['🗝️ 發現隱藏提問！','🗝️ Hidden question found!','🗝️ เจอคำถามลับ!'],
  endAskQ:['確定要結束訪談、開始搜查嗎？','End the interview and start the search?','จบการสัมภาษณ์แล้วไปค้นบ้านเลยไหม?'], endAskMiss:['還有 {n} 個重要面向沒問到，結束後就問不到了。','{n} important areas are still unasked — you can\'t come back to them.','ยังมีอีก {n} เรื่องสำคัญที่ยังไม่ได้ถาม ถ้าจบแล้วจะกลับมาถามไม่ได้'],
  keepAsk:['繼續問','Keep asking','ถามต่อ'], endAsk:['結束訪談','End interview','จบการสัมภาษณ์'],
  ch6:['後記','EPILOGUE','บทส่งท้าย'], ch6t:['兩週後','Two Weeks Later','สองสัปดาห์ต่อมา'], ch6s:['你的建議帶來了什麼改變？','What did your advice change?','คำแนะนำของคุณเปลี่ยนอะไรไปบ้าง?'],
  modeLbl:['模式','Mode','โหมด'], mode_practice:['📘 練習','📘 Practice','📘 ฝึกซ้อม'], mode_exam:['📝 考試','📝 Exam','📝 สอบ'],
  modeH_practice:['有提示和詳細解說，第一次玩選這個。','Hints and detailed explanations — choose this for your first run.','มีคำใบ้และคำอธิบายละเอียด เหมาะกับการเล่นครั้งแรก'],
  modeH_exam:['沒有提示、選項隨機、只「沾上邊」的證物也算錯，解說留到最後。','No hints, shuffled options, "close but not direct" evidence counts as wrong; explanations wait until the end.','ไม่มีคำใบ้ ตัวเลือกสุ่ม หลักฐานที่แค่ "ใกล้เคียง" นับว่าผิด คำอธิบายรอดูตอนท้าย'],
  modeLocked:['🔒 老師指定','🔒 Set by your instructor','🔒 อาจารย์กำหนด'], examNoted:['📝 已記錄——解說在結算畫面','📝 Recorded — explanations are on the results screen','📝 บันทึกแล้ว — ดูคำอธิบายได้ที่หน้าสรุปผล'],
  rankWhy:['離 S 還差','What stands between you and S','สิ่งที่ยังขาดสำหรับระดับ S'], rankCap:['分數評價 {a} · 臨床條件最高 {b}','Score rank {a} · clinical cap {b}','ระดับจากคะแนน {a} · เพดานทางคลินิก {b}'],
  g_found:['找出全部 19 個問題','Find all 19 problems','หาปัญหาครบ 19 ข้อ'], g_hints:['不用任何提示','Use no hints','ไม่ใช้คำใบ้เลย'], g_tb:['總結時請陳伯複述（teach-back）','Use teach-back in your summary','ให้ลุงทวนกลับ (teach-back) ตอนสรุป'],
  g_mr:['藥物整合 ≥ 5 題完全正確','≥ 5 med-review missions perfect','ทบทวนยาถูกครบ ≥ 5 ภารกิจ'], g_boss:['迷思全部破除（沒有存活）','Every myth busted (none left alive)','ทลายความเชื่อผิดครบ (ไม่มีรอด)'], g_time:['在拜訪時間內完成','Finish within the visit time','จบภายในเวลาเยี่ยม'], g_trust:['結束時信任度 ≥ 7（關係夠好）','End with trust ≥ 7 (strong rapport)','จบด้วยความไว้ใจ ≥ 7 (สัมพันธภาพดี)'],
  ppPre:['前測','Pre-test','ก่อนเรียน'], ppPost:['後測','Post-test','หลังเรียน'], reflT:['反思','Reflection','สะท้อนคิด'], ppSaved:['📝 已記錄——答案最後揭曉','📝 Saved — answers are revealed at the end','📝 บันทึกแล้ว — เฉลยตอนท้ายเกม'],
  ppStat:['前測 → 後測','Pre → post test','ก่อน → หลังเรียน'], reflSaved:['📝 已記錄，謝謝你的分享！','📝 Saved — thank you for sharing!','📝 บันทึกแล้ว ขอบคุณที่แบ่งปัน!'], reflPh:['沒有標準答案，寫下你真實的想法……','There is no right answer — write what you really think…','ไม่มีคำตอบที่ถูกหรือผิด เขียนสิ่งที่คิดจริงๆ…'],
  badgeT:['徽章','Badges','เหรียญตรา'], badgeNew:['獲得新徽章！','New badge!','ได้เหรียญใหม่!'], badgeColl:['🏅 我的徽章','🏅 My badges','🏅 เหรียญของฉัน'], badgeCount:['已收集 {n}/{m}','Collected {n}/{m}','สะสมแล้ว {n}/{m}'], badgeLocked:['尚未獲得','Not earned yet','ยังไม่ได้รับ'],
  chSel:['📚 章節練習','📚 Chapter practice','📚 ฝึกรายบท'], chSelIntro:['選一章單獨練習。不會記錄成績，也不會影響正式紀錄。','Practise any single chapter on its own. Nothing is recorded and your real record is untouched.','เลือกฝึกบทใดก็ได้ ไม่บันทึกคะแนนและไม่กระทบบันทึกจริง'],
  chSelLock:['🔒 破關一次就能解鎖章節練習','🔒 Finish the game once to unlock chapter practice','🔒 เล่นจบ 1 ครั้งเพื่อปลดล็อกการฝึกรายบท'], pracDone:['章節練習完成！','Chapter practice complete!','ฝึกบทนี้เสร็จแล้ว!'], pracBack:['回到標題','Back to the title','กลับหน้าแรก'], pracAgain:['再練一次','Practice again','ฝึกอีกครั้ง'], pracTag:['練習中・不記錄','Practice · not recorded','กำลังฝึก · ไม่บันทึก'],
  endStat:['結局','Ending','ตอนจบ'], end_best:['🌟 最佳結局','🌟 Best ending','🌟 ตอนจบที่ดีที่สุด'], end_good:['😊 好結局','😊 Good ending','😊 ตอนจบที่ดี'], end_mixed:['😐 普通結局','😐 Mixed ending','😐 ตอนจบกลางๆ'], end_bad:['🚑 壞結局','🚑 Bad ending','🚑 ตอนจบที่แย่'],
  epiT:['📋 兩週後追蹤報告','📋 Two-week follow-up report','📋 รายงานติดตามผล 2 สัปดาห์'], epiGo:['看看陳伯怎麼樣了 ▶','See how Uncle Chen is doing ▶','ไปดูว่าลุงเฉินเป็นยังไงบ้าง ▶'],
  timeoutStat:['拜訪提早結束','Visit ended early','การเยี่ยมจบก่อนเวลา'], refusedStat:['陳伯不肯說出秘密','Uncle Chen kept his secret','ลุงไม่ยอมเล่าความลับ'],
  hintSpot:['📌 陳伯提過的地方','📌 Places Uncle Chen mentioned','📌 จุดที่ลุงเคยพูดถึง'], notProvable:['❔ 缺少能推翻這句的證物','❔ You have no evidence that disproves this','❔ ไม่มีหลักฐานที่หักล้างข้อนี้'],
  modeStat:['模式','Mode','โหมด'], patStat:['訪談','Interview','สัมภาษณ์']
});
/* ---------- character profile cards (anime intro) ---------- */
const CHAR_INFO={
  pilly:{c:['#ff8fb6','#a98bff'], role:['你的導航精靈','Your guide fairy','ภูตนำทางของคุณ'], q:['「交給我吧～✨」','"Leave it to me~ ✨"','"ไว้ใจพิลลี่ได้เลย~ ✨"'], tags:[['膠囊型','Capsule-shaped','รูปแคปซูล'],['超愛提示','Loves giving hints','ชอบใบ้มาก']]},
  me:{c:['#5ab8ff','#7ff0c8'], role:['藥學系實習生','Pharmacy intern','นักศึกษาฝึกงานเภสัชฯ'], q:['「我一定會找出所有問題！」','"I\'ll find every single problem!"','"ฉัน/ผมจะหาปัญหาให้ครบทุกข้อ!"'], tags:[['第一次居家訪視','First home visit','เยี่ยมบ้านครั้งแรก'],['觀察力 ★★★','Observation ★★★','ช่างสังเกต ★★★']]},
  yeh:{c:['#3d4f9a','#1fa89c'], role:['社區藥局資深藥師・你的指導老師','Senior community pharmacist · your preceptor','เภสัชกรชุมชนอาวุโส · อาจารย์พี่เลี้ยง'], q:['「真相，就藏在藥袋裡。」','"The truth is hidden in the med bags."','"ความจริงซ่อนอยู่ในซองยา"'], tags:[['冷靜','Calm','สุขุม'],['藥物整合達人','Med-review expert','เซียนทบทวนยา'],['其實很怕貓','Secretly scared of cats','แอบกลัวแมว']]},
  chen:{c:['#ff9a3d','#ff5c8f'], role:['65 歲・雜貨店老闆','65 · grocery-shop owner','65 ปี · เจ้าของร้านโชห่วย'], q:['「我很關心自己的身體啦！」','"I care a LOT about my health!"','"ลุงห่วงสุขภาพมากนะ!"'], tags:[['一個月看醫生 40+ 次','40+ clinic visits a month','หาหมอ 40+ ครั้ง/เดือน'],['長壽菸 3 包/天','3 packs a day','บุหรี่ 3 ซอง/วัน'],['台啤 2 箱/天','2 cases of beer a day','เบียร์ 2 ลัง/วัน']]},
  wife:{c:['#ff8fb1','#ffb21f'], role:['陳伯的太太・一家的支柱','Uncle Chen\'s wife · the family\'s backbone','ภรรยาลุงเฉิน · เสาหลักของบ้าน'], q:['「他的藥喔，我都搞不清楚……」','"His medicines? I can never keep track…"','"ยาของเขาน่ะ ป้าก็งงไปหมด…"'], tags:[['顧店又顧家','Runs the shop & the home','เฝ้าร้านและดูแลบ้าน'],['觀察入微','Notices everything','สังเกตเก่ง']]},
};
/* =====================================================================
   EVIDENCE ITEMS  (req = key evidence needed for Chapter 3)
   ===================================================================== */
const ITEMS = {
 calendar:{req:true, sfx:'paper', n:['畫滿紅圈的月曆','Calendar full of red circles','ปฏิทินที่วงแดงเต็มไปหมด'], loc:['客廳牆上','Living-room wall','ผนังห้องนั่งเล่น'],
  d:['三月幾乎「每一天」都圈起來：「耳鼻喉」「骨科」「A院」「B院」「家醫」…一天跑兩三家！','Almost EVERY day of March is circled: "ENT", "Ortho", "Hosp A", "Hosp B", "Family med"… two or three a day!','มีนาคม "แทบทุกวัน" ถูกวงไว้: "หู คอ จมูก" "กระดูก" "รพ.A" "รพ.B" "เวชฯครอบครัว"… วันละ 2-3 ที่!']},
 pilljar:{req:true, sfx:'rattle', n:['裝滿彩色藥丸的糖果罐','Candy jar of mixed pills','โหลขนมที่เต็มไปด้วยยาหลากสี'], loc:['神明桌抽屜','Altar-table drawer','ลิ้นชักโต๊ะบูชา'],
  d:['不同醫生開的各色藥丸，全部倒在同一個罐子裡混在一起！罐子旁還夾著一張耳鼻喉診所收據（110/03/20）：Keflex、Clarinase、Danzen。','Pills from DIFFERENT doctors, all poured into one jar and mixed together! Tucked beside it: an ENT clinic receipt (20 Mar 2021) for Keflex, Clarinase and Danzen.','ยาหลากสีจาก "หลายหมอ" ถูกเทรวมปนกันในโหลเดียว! ข้างโหลมีใบเสร็จคลินิกหู คอ จมูก (20 มี.ค. 2021): Keflex, Clarinase, Danzen']},
 trash_bags:{req:true, sfx:'plastic', n:['沒拆封就丟掉的藥袋','Unopened med bags in the trash','ซองยาที่ยังไม่แกะถูกทิ้ง'], loc:['垃圾桶','Trash bin','ถังขยะ'],
  d:['骨科、家醫科、內科診所開的「關節痛藥」，整包沒拆就丟進垃圾桶。','"Joint-pain" medicine from the orthopedic, family-medicine and internal-medicine clinics — thrown in the trash still sealed.','"ยาแก้ปวดข้อ" จากคลินิกกระดูก เวชฯครอบครัว อายุรกรรม ถูกทิ้งลงถังทั้งที่ยังไม่แกะ']},
 takeout:{req:true, sfx:'plastic', n:['外帶便當與剩菜','Takeout boxes & leftovers','กล่องข้าวซื้อกลับบ้าน'], loc:['冰箱上層','Fridge, top shelf','ตู้เย็นชั้นบน'],
  d:['冰箱裡只有外帶剩菜、炸雞和含糖飲料，完全沒有青菜。','The fridge holds only takeout leftovers, fried chicken and sugary drinks — no vegetables at all.','ในตู้เย็นมีแต่อาหารซื้อกลับบ้าน ไก่ทอด น้ำหวาน ไม่มีผักเลย']},
 beer:{req:true, sfx:'clink', n:['一整排台灣啤酒','Rows of Taiwan Beer','เบียร์ไต้หวันเรียงเป็นแถว'], loc:['冰箱下層・牆角','Fridge bottom & corner','ตู้เย็นชั้นล่าง・มุมห้อง'],
  d:['冰箱下層塞滿台啤，牆角還堆著好幾箱空瓶。','The bottom of the fridge is packed with beer, and empty crates are piled in the corner.','ชั้นล่างตู้เย็นอัดเบียร์เต็ม มุมห้องยังมีลังขวดเปล่ากองอยู่']},
 cigs:{req:true, sfx:'plastic', n:['好幾條長壽菸','Cartons of Long Life cigarettes','บุหรี่ Long Life หลายคอตตอน'], loc:['雜貨貨架','Shop shelf','ชั้นวางสินค้า'],
  d:['不是要賣的貨——盒子上寫著「自己的」。旁邊還有滿出來的菸灰缸。','Not stock for sale — labeled "mine". An overflowing ashtray sits next to them.','ไม่ใช่ของขาย เขียนว่า "ของฉัน" ข้างๆ มีที่เขี่ยบุหรี่ล้นออกมา']},
 pillbox:{req:true, sfx:'rattle', n:['一週分裝藥盒（血壓・血糖藥）','Weekly pill box (BP & diabetes pills)','กล่องแบ่งยารายสัปดาห์ (ยาความดัน・เบาหวาน)'], loc:['電視櫃抽屜','TV-cabinet drawer','ลิ้นชักตู้ทีวี'],
  d:['A 醫院同一張處方的血壓、血糖藥，分裝成週一到週日……但「週三」和「週六」的格子還是滿的！','Hospital A\'s blood-pressure and diabetes pills (one prescription), sorted Monday–Sunday… but the Wednesday and Saturday slots are still full!','ยาความดันและเบาหวานจากใบสั่งเดียวของ รพ.A แบ่งใส่ช่องจันทร์–อาทิตย์… แต่ช่อง "พุธ" กับ "เสาร์" ยังเต็มอยู่!']},
 endo_bag:{sfx:'plastic', n:['A醫院新陳代謝科藥袋（6 包）','Hospital A endocrinology bags (×6)','ซองยาแผนกต่อมไร้ท่อ รพ.A (6 ซอง)'], loc:['電視櫃抽屜','TV-cabinet drawer','ลิ้นชักตู้ทีวี'],
  d:['110/02/18 連續處方 28 天：好悅您 Hyzaar、醣祿 Glucobay、庫魯化 Glucophage、瑪爾胰 Amaryl、鼻福 Peace、博疏痛 Ponstan。','Refill prescription of 18 Feb 2021 (28 days): Hyzaar, Glucobay, Glucophage, Amaryl, Peace, Ponstan.','ใบสั่งยาต่อเนื่อง 18 ก.พ. 2021 (28 วัน): Hyzaar, Glucobay, Glucophage, Amaryl, Peace, Ponstan']},
 hospB_bag:{sfx:'plastic', n:['B醫院免疫風濕科藥袋（2 包）','Hospital B rheumatology bags (×2)','ซองยาแผนกรูมาโตฯ รพ.B (2 ซอง)'], loc:['貨架上層','Shop shelf, top','ชั้นวางสินค้าชั้นบน'],
  d:['110/03/01：康瑞斯 Finska LP（loratadine/pseudoephedrine）、安樂普利諾 Allopurinol 100 mg。下次回診 110/05/03。','1 Mar 2021: Finska LP (loratadine/pseudoephedrine) and Allopurinol 100 mg. Next visit 3 May 2021.','1 มี.ค. 2021: Finska LP (loratadine/pseudoephedrine) และ Allopurinol 100 mg นัดครั้งต่อไป 3 พ.ค. 2021']},
 report:{sfx:'paper', labs:true, n:['A醫院病人檢查紀錄表','Hospital A lab record','บันทึกผลตรวจ รพ.A'], loc:['貨架下層的文件盒','Document box, shop shelf','กล่องเอกสารบนชั้นวาง'],
  d:['三次抽血：飯前血糖 150–168、HbA1c 7.1→7.8→8.3 越來越高！肌酸酐 2.9–3.2（正常 <1.27），尿液微白蛋白 2.8。（已存入案件檔案 → 檢驗數據）','Three blood tests: fasting glucose 150–168, HbA1c rising 7.1→7.8→8.3! Creatinine 2.9–3.2 (normal <1.27), urine microalbumin 2.8. (Saved to Case file → Labs)','ตรวจเลือด 3 ครั้ง: น้ำตาลก่อนอาหาร 150–168, HbA1c สูงขึ้น 7.1→7.8→8.3! ครีเอตินิน 2.9–3.2 (ปกติ <1.27) ไมโครอัลบูมินในปัสสาวะ 2.8 (บันทึกในแฟ้มคดี → ผลแล็บ)']},
 school:{sfx:'paper', n:['特教聯絡簿','Special-education notebook','สมุดการศึกษาพิเศษ'], loc:['電視櫃門內','Inside the TV cabinet','ในตู้ทีวี'],
  d:['孩子的特教班聯絡簿，夾著身心障礙證明和沒填完的補助申請單。','The child\'s special-ed notebook with a disability certificate and an unfinished subsidy form.','สมุดชั้นเรียนพิเศษของลูก มีบัตรผู้พิการและใบขอเงินช่วยเหลือที่ยังกรอกไม่เสร็จ']},
};
const KEY_ITEMS = Object.keys(ITEMS).filter(k=>ITEMS[k].req);
/* final-summary rubric · kw = detection keywords · g = what to include · ex = example · st = sentence-starter chip */
const RUBRIC_SUM = [
 {k:['總結重點','Summarize key points','สรุปประเด็นสำคัญ'], ic:'📌',
  kw:['總結','重點','最重要','重要的','記得','第一','第二','三件事','兩件事','總之','簡單來說','summar','key point','important','remember','first','second','three things','two things','in short','to sum up','main','สรุป','สำคัญ','จำไว้','หนึ่ง','สอง','เรื่องหลัก'],
  g:['挑 2–3 個最重要的問題，用簡單的話講給他聽','Pick the 2–3 most important problems and say them in plain words','เลือก 2–3 ปัญหาที่สำคัญที่สุด แล้วพูดให้ลุงเข้าใจง่ายๆ'],
  ex:['今天最重要的有三件事：第一，藥不要混在一起吃；第二，您的腎臟功能不太好……','The three most important things today: first, don\'t mix your pills; second, your kidneys are weak…','วันนี้มีเรื่องสำคัญ 3 อย่าง: หนึ่ง อย่าเอายามาผสมกัน สอง ไตของลุงไม่ค่อยดี…'],
  st:['今天最重要的有三件事：第一，','The three most important things today: first, ','วันนี้มีเรื่องสำคัญ 3 อย่าง: หนึ่ง ']},
 {k:['請他複述（回覆示教）','Teach-back','ให้ผู้ป่วยทวนกลับ'], ic:'🔁',
  kw:['說說看','說一次','講一次','重複','複述','自己的話','說給我聽','解釋給我聽','teach back','teach-back','repeat','tell me back','in your own words','own words','say it back','explain back','tell me how','ทวน','พูดให้ฟัง','อธิบายกลับ','เล่าให้ฟัง','ช่วยเล่า','คำพูดของลุง'],
  g:['請陳伯用「自己的話」說一次，確認他真的懂了','Ask Uncle Chen to say it back in his own words to check he understood','ให้ลุงพูดทวนด้วย "คำพูดของตัวเอง" เพื่อเช็กว่าเข้าใจจริง'],
  ex:['為了確定我有講清楚，可以請您用自己的話說說看，回家後要怎麼吃藥嗎？','To make sure I explained it clearly, could you tell me in your own words how you\'ll take your medicines at home?','เพื่อให้แน่ใจว่าอธิบายชัด ลุงช่วยเล่าด้วยคำพูดของลุงเองได้ไหม ว่ากลับบ้านแล้วจะกินยายังไง?'],
  st:['為了確定我有講清楚，可以請您用自己的話說說看，','To make sure I explained clearly, could you tell me in your own words ','เพื่อให้แน่ใจว่าอธิบายชัด ลุงช่วยเล่าด้วยคำพูดของลุงเองได้ไหม ว่า']},
 {k:['追蹤與聯絡方式','Follow-up & contact','การติดตามและช่องทางติดต่อ'], ic:'📅',
  kw:['下次','追蹤','回訪','再來','電話','聯絡','兩週','一週','下週','打給','回診','再見面','follow up','follow-up','next visit','next week','call','contact','see you','visit again','check in','check on','appointment','phone','week','นัด','ติดตาม','ครั้งหน้า','โทร','สัปดาห์','อาทิตย์หน้า','มาเยี่ยม','ติดต่อ','ไลน์'],
  g:['約好下次見面或電話追蹤的時間，並留下聯絡方式','Set a time for the next visit or phone check-in, and leave your contact','นัดเวลาเยี่ยมครั้งหน้าหรือโทรติดตาม และให้ช่องทางติดต่อ'],
  ex:['我們兩週後再來看您，有問題隨時打藥局電話給我。','We\'ll visit again in two weeks — call the pharmacy anytime if you have questions.','อีกสองสัปดาห์เราจะมาเยี่ยมอีกนะ มีปัญหาโทรหาร้านยาได้ตลอด'],
  st:['我們下次','We\'ll follow up ','ครั้งหน้าเราจะ']},
 {k:['具體用藥建議','Concrete medication advice','คำแนะนำเรื่องยาที่ชัดเจน'], ic:'💊',
  kw:['藥袋','醫師','醫生','固定','停藥','混','回收','藥局','藥師','腎','藥盒','分裝','整理','同一家','自己停','doctor','stop','mix','pharmac','bag','kidney','organizer','one hospital','bring','prescri','pill box','หมอ','หยุด','ผสม','ไต','ซองยา','ร้านยา','กล่องยา','เภสัช'],
  g:['說清楚要「做什麼」：固定看診、藥袋帶來整理、不自己停藥或混藥、告訴醫師腎功能','Say exactly what to DO: one regular doctor, bring all med bags, don\'t stop or mix pills, tell doctors about the kidneys','บอกให้ชัดว่า "ต้องทำอะไร": หาหมอประจำ เอาซองยามาให้จัด ไม่หยุด/ไม่ผสมยาเอง บอกหมอเรื่องไต'],
  ex:['請把所有藥袋帶到藥局讓我們整理；不要自己停藥，擔心副作用先跟醫師說。','Please bring all your med bags to the pharmacy so we can sort them; don\'t stop any medicine yourself — tell the doctor your worries first.','เอาซองยาทั้งหมดมาที่ร้านยาให้เราช่วยจัดนะ อย่าหยุดยาเอง ถ้ากังวลผลข้างเคียงให้บอกหมอก่อน'],
  st:['關於藥：請您','About your medicines: please ','เรื่องยา: ขอให้ลุง']},
 {k:['生活型態建議','Lifestyle advice','คำแนะนำการใช้ชีวิต'], ic:'🥗',
  kw:['戒菸','菸','喝酒','酒','啤酒','飲食','運動','少鹽','少油','少糖','減量','青菜','quit','smok','cigarette','beer','alcohol','drink','diet','exercise','salt','sugar','vegetable','cut down','บุหรี่','เหล้า','เบียร์','อาหาร','ออกกำลัง','ผัก','หวาน','เค็ม','เลิก'],
  g:['挑 1–2 個生活習慣，給「小而做得到」的目標','Pick 1–2 habits and set a small, doable goal','เลือก 1–2 พฤติกรรม แล้วตั้งเป้า "เล็กๆ ที่ทำได้จริง"'],
  ex:['菸和啤酒我們先慢慢減量，也可以幫您轉介戒菸門診。','Let\'s cut down cigarettes and beer step by step — we can also refer you to a quit-smoking clinic.','ค่อยๆ ลดบุหรี่กับเบียร์ลงนะ เราช่วยส่งต่อคลินิกเลิกบุหรี่ให้ได้'],
  st:['生活上，我們先一起試試','For daily life, let\'s start by trying to ','เรื่องการใช้ชีวิต ลองเริ่มจาก']},
];
const SUM_ORDER=[0,3,4,1,2];   // display order: summarize → meds → lifestyle → teach-back → follow-up
/* coverage: a step counts if its keywords appear in the student's OWN words (starters removed),
   or if its starter chip was used AND completed with at least a few words */
function sumCoverage(txt){
  const li=LI(), starters=RUBRIC_SUM.map(r=>r.st[li]); let own=txt; starters.forEach(st=>{ own=own.split(st).join(' '); });
  const low=' '+own.toLowerCase()+' ';
  return RUBRIC_SUM.map((r,i)=>{
    if(r.kw.some(k=>low.includes(k.toLowerCase()))) return true;
    const st=starters[i], at=txt.indexOf(st); if(at<0) return false;
    const seg=txt.slice(at+st.length).split(/\n/)[0].replace(/[\s…\.。,，、:：!！?？]/g,'');
    return seg.length>=(S.lang==='zh'?4:8);
  });
}

