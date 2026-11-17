"""Case C: hands-on games (hypo rescue, height, Fosamax morning), myths/titles that no longer echo Case A.
Run on c_orig.html (keeps a backup c_orig_pregames.html the first time). Idempotent guard: refuses if already applied."""
import os, re, json, shutil
H = os.path.dirname(os.path.abspath(__file__)); f = f'{H}/c_orig.html'
s = open(f, encoding='utf-8').read()
if 'function hypoGame()' in s: print('already applied'); raise SystemExit
if not os.path.exists(f'{H}/c_orig_pregames.html'): shutil.copy(f, f'{H}/c_orig_pregames.html')
def sub(old, new, n=1):
    global s
    assert s.count(old) == n, (old[:90], s.count(old)); s = s.replace(old, new)

games = open(f'{H}/c_games.js', encoding='utf-8').read().rstrip() + '\n'

# 1) game code goes in right after the dizzy event (case-only region)
sub("function renderBoard(){", games + "function renderBoard(){")

# 2) dizzy event → quick decision, then the hands-on rescue
a = s.index("  if(c===0){ addTrust(1); patGain(1); S.fl.dizzyAte=1;"); b = s.index("\n}\n", a)
s = s[:a] + r"""  const HYPO_Y=['發抖、冒冷汗、午餐沒吃——這是低血糖！休息不會好，要馬上處理。','Shaky, sweaty, no lunch — that\'s a hypo! Rest won\'t fix it; treat it now.','มือสั่น เหงื่อแตก ไม่ได้กินข้าวเที่ยง นี่คือน้ำตาลต่ำ! พักเฉยๆ ไม่หาย ต้องแก้ทันที'];
  if(c===0){ addTrust(1); patGain(1); await coach('happy',['反應很快！接下來照正確的方法處理，直到她安全為止。','Quick thinking! Now do it properly, right until she\'s safe.','ไวมาก! ต่อไปดูแลให้ถูกวิธีจนป้าปลอดภัย']); }
  else if(c===1){ addTrust(1); await say('chen','sad',['……還是好暈，手一直抖……','…Still so dizzy, my hands won\'t stop shaking…','…ยังเวียนหัวอยู่เลย มือสั่นไม่หยุด…']); await coach('think',HYPO_Y); }
  else if(c===2){ addTrust(-1); patSpend(1); await say('chen','angry',['我都暈成這樣了，你還在問藥……','I\'m this dizzy and you\'re still asking about pills…','ป้าเวียนหัวขนาดนี้ ยังมาถามเรื่องยาอีก…']); await coach('think',['先救人，再問藥！她看起來是低血糖。','Treat her first, ask later — this looks like a hypo.','ช่วยป้าก่อน ค่อยถามทีหลัง ดูเหมือนน้ำตาลต่ำ']); }
  else { await say('chen','sad',['……我、我坐一下就好……','…I-I\'ll just sit for a bit…','…ขะ…ขอนั่งพักแป๊บนึง…']); await coach('think',HYPO_Y); }
  hideText(); const hr=await hypoGame(); S.calc.hypo={ok:hr.ok, errs:hr.errs, g:hr.g}; S.fl.dizzyAte=1; logEvent({type:'hypoGame', ok:hr.ok, errs:hr.errs, g:hr.g, checks:hr.checks});
  if(EXAM()){ sfx.select(); toast(T('examNoted')); }
  await say('chen','happy',['呼……好多了。今天中午太忙，忘了吃飯……謝謝你。','Phew… much better. I was so busy at lunch that I forgot to eat… thank you.','เฮ้อ… ดีขึ้นเยอะ เที่ยงนี้ยุ่งจนลืมกินข้าว… ขอบใจนะ']);
  if(!EXAM()) await say('pilly','think',['沒吃飯＋發抖、冒冷汗……記住這一幕！','No lunch + shaking and cold sweat… remember this moment!','ไม่ได้กินข้าว + มือสั่น เหงื่อแตก… จำเหตุการณ์นี้ไว้!']);""" + s[b:]

# 3) no BMI calculator in Case C: the body-size line becomes a quick note, the calcium game sits with the bone story
a = s.index("async function bmiTask(){"); b = s.index("\n}\n", a) + 3
s = s[:a] + r"""async function bmiTask(){
  if(S.fl.exAsked){ reveal('P12'); return; } S.fl.exAsked=1;
  await coach('think',['158 公分、53 公斤——個子小、肌肉少。等一下看腎功能時要記得這一點！','158 cm and 53 kg — petite, with little muscle. Remember that when we look at her kidneys!','158 ซม. 53 กก. — ตัวเล็ก กล้ามเนื้อน้อย จำไว้ตอนดูการทำงานของไตนะ!']);
  await say('chen','neutral',['運動喔？好多年沒運動了啦。每天在工廠站一整天，這樣就算運動了吧？','Exercise? Not for years. I stand at the factory all day — that counts, right?','ออกกำลังกายเหรอ? ไม่ได้ทำมาหลายปีแล้ว ยืนทำงานในโรงงานทั้งวัน แบบนี้ก็นับว่าออกกำลังแล้วมั้ง?']);
  reveal('P12');
}
""" + s[b:]
if False: sub("""   await say('pilly','think',['又多一家醫院、又多一種藥……檢查報告說不定收在家裡哪個盒子？','Another hospital, another drug… maybe the lab report is in a box somewhere in the house?','อีกโรงพยาบาล อีกยาหนึ่ง… ผลตรวจอาจเก็บอยู่ในกล่องสักใบในบ้าน?']); },""",
    """   await say('pilly','think',['又多一家醫院、又多一種藥……檢查報告說不定收在家裡哪個盒子？','Another hospital, another drug… maybe the lab report is in a box somewhere in the house?','อีกโรงพยาบาล อีกยาหนึ่ง… ผลตรวจอาจเก็บอยู่ในกล่องสักใบในบ้าน?']);
   await calciumTask(); },""")

# 4) height: measured for real when the 2018 booklet is presented
sub(" {id:'s2', need:['pilljar'], near:['report','hospB_bag'], p:'P3',", " {id:'s2', need:['pilljar'], near:['report','hospB_bag'], p:'P3', game:'height',")
sub("""      await sayLines(s.solve.slice(1)); reveal(s.p); solved[s.id]=1; S.usedEv.push(ev); i=nextUnsolved(i); }""",
    """      if(s.game==='height'&&!S.calc.height){ $('#testiBanner').classList.add('hidden'); $('#testiDots').classList.add('hidden');
        await sayLines([['yeh','smug',['那我們現在就用正確的方法量一次！','Then let\\'s measure you properly — right now!','งั้นมาวัดให้ถูกวิธีกันตอนนี้เลย!']]]); hideText();
        const hr=await heightGame(); S.calc.height={ok:hr.ok, errs:hr.errs, cm:hr.cm}; logEvent({type:'height', ok:hr.ok, errs:hr.errs, cm:hr.cm, diff:hr.diff});
        if(EXAM()){ sfx.select(); toast(T('examNoted')); } $('#testiBanner').classList.remove('hidden'); $('#testiDots').classList.remove('hidden'); }
      await sayLines(s.solve.slice(1)); reveal(s.p); solved[s.id]=1; S.usedEv.push(ev); i=nextUnsolved(i); }""")

# 5) chapter 4: her day as a timeline; Wednesday-morning rehearsal at the end
if False: sub("""  await say('pilly','shock',['藥袋危機！一共 6 個任務：點選有問題的藥（可以複選），再按「確認診斷」！','Med-bag crisis! 6 missions: tap the problem drugs (several may apply), then press "Confirm"!','วิกฤตซองยา! มี 6 ภารกิจ: แตะเลือกยาที่มีปัญหา (เลือกได้หลายตัว) แล้วกด "ยืนยัน"!']);""",
    """  await say('pilly','shock',['把藥袋排成她的一天！6 個任務：在時間表上點出有問題的藥，送到「請醫師重新評估」，再按「確認診斷」！','Her day, laid out bag by bag! 6 missions: tap the problem drugs on her timeline to send them to "Ask the doctor", then press "Confirm"!','เรียงซองยาเป็นหนึ่งวันของป้า! 6 ภารกิจ: แตะยาที่มีปัญหาบนตารางเวลาเพื่อส่งไป "ส่งให้แพทย์ทบทวน" แล้วกด "ยืนยัน"!']);""")
# (med review keeps the original drug cards)
sub("""  await say('yeh','smug',['別擔心，我們會把這些整理成「藥事照護建議」交給您的醫師。不過在那之前……',""",
    """  await say('chen','think',['對了，明天禮拜三，又要吃那顆骨頭的藥了……','Oh — tomorrow\\'s Wednesday, bone-pill day again…','จริงสิ พรุ่งนี้วันพุธ ต้องกินยากระดูกอีกแล้ว…']);
  await coach('smug',['那我們現在就一起演練一次週三早上！','Then let\\'s rehearse Wednesday morning together, right now!','งั้นมาซ้อมเช้าวันพุธด้วยกันเลย!']);
  hideAll(); hideText(); const fz=await fosaGame(); S.calc.fosa={ok:fz.ok, errs:fz.errs}; logEvent({type:'fosaGame', ok:fz.ok, errs:fz.errs});
  if(EXAM()){ sfx.select(); toast(T('examNoted')); }
  show('chen','C','happy'); show('me','L','neutral'); show('yeh','R','smug');
  await say('chen','happy',['原來吃一顆藥有這麼多眉角……我會照著做！','Who knew one pill came with so many rules… I\\'ll do it this way!','ใครจะรู้ว่ายาเม็ดเดียวมีกฎเยอะขนาดนี้… ป้าจะทำตามนี้นะ!']);
  await say('yeh','smug',['別擔心，我們會把這些整理成「藥事照護建議」交給您的醫師。不過在那之前……',""")

# 6) score, results, class dashboard
sub("+(S.calc.bmi&&S.calc.bmi.ok?60:0)+(S.calc.bmiClass?30:0)", "+['hypo','height','fosa'].filter(k=>S.calc[k]&&S.calc[k].ok).length*60")
sub("""<div><span>${T('calcStat')}</span> ${['bmi','egfr','crcl'].map(k=>S.calc[k]?(S.calc[k].ok?'✅':'📘'):'—').join(' ')}</div>""",
    """<div><span>${T('calcStat')}</span> ${['egfr','crcl'].map(k=>S.calc[k]?(S.calc[k].ok?'✅':'📘'):'—').join(' ')}</div><div><span>🖐️ ${esc(L(['實作','Hands-on','ลงมือทำ']))}</span> ${[['hypo','🩸'],['height','📏'],['fosa','💊']].map(([k,e])=>e+(S.calc[k]?(S.calc[k].ok?'✅':'📘'):'—')).join(' ')}</div>""")
sub("calcStat:['計算題（BMI／eGFR／CrCl）','Calculations (BMI / eGFR / CrCl)','โจทย์คำนวณ (BMI / eGFR / CrCl)'", "calcStat:['計算題（eGFR／CrCl）','Calculations (eGFR / CrCl)','โจทย์คำนวณ (eGFR / CrCl)'")
sub("R.calc={}; ['bmi','egfr','crcl'].forEach(", "R.calc={}; ['egfr','crcl'].forEach(")
sub("+sec(TC('clCalc'),['bmi','egfr','crcl'].map(", "+sec(TC('clCalc'),['egfr','crcl'].map(")
sub(" clBmiClass:['BMI 分類（台灣標準）','BMI category (Taiwan)','จัดกลุ่ม BMI (เกณฑ์ไต้หวัน)'],",
    " clBmiClass:['BMI 分類（台灣標準）','BMI category (Taiwan)','จัดกลุ่ม BMI (เกณฑ์ไต้หวัน)'], clHypo:['低血糖急救','Hypo rescue','แก้น้ำตาลต่ำ'], clHeight:['正確量身高','Measuring height properly','วัดส่วนสูงถูกวิธี'], clFosa:['Fosamax 週三早上','Fosamax on Wednesday morning','Fosamax เช้าวันพุธ'],")
sub("const bc=list.filter(s=>s.calc&&'bmiClass' in s.calc), ck=", "const hy=k=>list.filter(s=>s.calc&&s.calc[k]), ck=")
sub("R.concept=[[TC('clBmiClass'),bc.filter(s=>s.calc.bmiClass).length,bc.length],",
    "R.concept=[...[['clHypo','hypo'],['clHeight','height'],['clFosa','fosa']].map(([l,k])=>[TC(l),hy(k).filter(s=>s.calc[k].ok).length,hy(k).length]),")

# 7) myths and problem titles that repeated Case A word for word
M = {
 'P1': {"m":["工廠旁邊的診所最快，小毛病就換一家看，省時間！","The clinic by the factory is quickest — a different one for every little thing saves time!","คลินิกข้างโรงงานเร็วที่สุด เป็นอะไรนิดหน่อยก็เปลี่ยนไปที่ใหม่ ประหยัดเวลา!"],
  "c":[[2,["固定一位家庭醫師，看病都帶齊藥袋——耳鼻喉不知道您血壓高，才開了升血壓的藥。","Keep one family doctor and take every med bag along — the ENT didn't know your BP, so it gave you a BP-raising pill.","มีหมอประจำคนเดียว ไปไหนก็พกซองยาครบ ENT ไม่รู้ว่าป้าความดันสูง เลยจ่ายยาที่ทำให้ความดันขึ้น"]],
       [1,["小毛病去附近診所沒關係，口頭跟醫師說您吃哪些藥就好，藥袋太多不用每次都帶。","Nearby clinics are fine for small things — just tell the doctor which pills you take; there are too many bags to carry each time.","เป็นนิดหน่อยไปคลินิกใกล้ๆ ก็ได้ แค่บอกหมอปากเปล่าว่ากินยาอะไรอยู่ ซองยาเยอะเกินไม่ต้องพกไปทุกครั้งหรอก"]],
       [0,["更快的方法是直接在工廠旁的藥房買感冒藥和止痛藥，掛號、排隊、等叫號全都省了。","Even quicker: buy cold and pain pills at the pharmacy next to the factory — no registration, no queue, no waiting at all.","เร็วกว่านั้นอีก ซื้อยาแก้หวัดแก้ปวดที่ร้านยาข้างโรงงานเลย ไม่ต้องลงทะเบียน ไม่ต้องต่อคิว ไม่ต้องรอเรียก"]]],
  "x":["每家診所只看得到自己開的藥：耳鼻喉的 Clarinase 會升血壓，止痛藥也從不同地方重複拿。固定醫師、帶齊藥袋（或用健保雲端藥歷），才看得到全貌。","Each clinic sees only its own prescriptions: the ENT's Clarinase raises BP, and painkillers came from several places. One regular doctor plus every bag (or the NHI cloud record) shows the whole picture.","แต่ละคลินิกเห็นแค่ยาที่ตัวเองจ่าย Clarinase จาก ENT ทำให้ความดันขึ้น ยาแก้ปวดก็ได้ซ้ำจากหลายที่ มีหมอประจำและพกซองยาครบ (หรือใช้ประวัติยาบนคลาวด์ของประกันสุขภาพ) จึงจะเห็นภาพรวม"]},
 'P9': {"m":["醫生開什麼我都收下，不吃也不好意思說，偷偷丟掉就好。","I accept every prescription to be polite — if I don't take them, I quietly throw them out.","หมอให้ยาอะไรป้าก็รับไว้ ไม่กินก็เกรงใจไม่กล้าบอก แอบทิ้งไปก็พอ"],
  "c":[[2,["跟醫師說實話：用不到的藥請他別開，剩藥拿回藥局；背痛還變矮，要請醫師照 X 光。","Tell the doctor honestly which pills you skip so they stop them, return leftovers — and get that back pain X-rayed.","บอกหมอตามจริงว่ายาไหนไม่ได้กิน หมอจะได้หยุดจ่าย เอายาเหลือคืนร้านยา และให้หมอเอกซเรย์อาการปวดหลัง"]],
       [1,["收下沒關係，只是不要丟進垃圾桶，拿去藥局回收比較環保，醫師那邊就不用特別講了。","Accepting them is fine — just don't bin them; take them back to a pharmacy, and there's no need to tell the doctor.","รับไว้ก็ไม่เป็นไร แค่อย่าทิ้งลงถังขยะ เอาไปคืนร้านยาจะดีต่อสิ่งแวดล้อมกว่า ส่วนหมอก็ไม่ต้องไปบอกให้ลำบากใจ"]],
       [0,["收下來存著，等先生或孩子哪天也感冒、腰痛的時候，就拿出來給他們吃，一點都不浪費。","Keep them in the drawer — when your husband or kids get a cold or a sore back, give them the pills so nothing's wasted.","เก็บไว้ในลิ้นชักก่อน วันไหนสามีหรือลูกเป็นหวัดหรือปวดหลังขึ้นมา ก็เอาให้เขากินได้เลย ไม่สิ้นเปลืองสักเม็ด"]]],
  "x":["不吃又不說，醫師會以為治療無效而加藥；把藥給家人吃也很危險。骨鬆病人新出現的背痛要排除脊椎骨折。","Skipping pills in silence makes doctors think the treatment failed and add more; sharing pills with family is risky too. New back pain in osteoporosis must be checked for a vertebral fracture.","ไม่กินแล้วไม่บอก หมอจะคิดว่ารักษาไม่ได้ผลแล้วเพิ่มยา เอายาให้คนในบ้านกินก็อันตราย ผู้ป่วยกระดูกพรุนที่ปวดหลังขึ้นใหม่ต้องตรวจแยกกระดูกสันหลังหัก"]},
 'P10': {"m":["累了、吃不下，就喝提神飲料撐過去嘛！","Tired with no appetite? An energy drink gets me through the shift!","เหนื่อยแล้วกินไม่ลง ดื่มเครื่องดื่มชูกำลังก็ทำงานต่อได้!"],
  "c":None,   # keep the counters, change the wrong one
  "c0":["提神飲料又甜又有咖啡因，發抖的時候喝一罐，還能順便把血糖拉上來，一舉兩得。","Energy drinks are sweet and full of caffeine — drink one when you're shaky and it lifts your sugar too. Two birds, one stone.","เครื่องดื่มชูกำลังทั้งหวานทั้งมีคาเฟอีน ดื่มสักขวดตอนมือสั่นก็ช่วยดึงน้ำตาลขึ้นมาด้วย ได้สองต่อเลยนะ"],
  "x":["症狀可能是多個問題交互造成，需要系統性評估；提神飲料的咖啡因會加重心悸和失眠。","Symptoms may come from several interacting problems and need a proper work-up; energy-drink caffeine worsens palpitations and sleep.","อาการอาจเกิดจากหลายปัญหาร่วมกัน ต้องประเมินอย่างเป็นระบบ คาเฟอีนในเครื่องดื่มชูกำลังทำให้ใจสั่น นอนไม่หลับ"]},
 'P13': {"m":["我尿尿正常、腳也沒腫，腎臟怎麼會有問題！","I pee normally and my legs aren't swollen — my kidneys can't be the problem!","ป้าฉี่ปกติ ขาก็ไม่บวม ไตจะมีปัญหาได้ยังไง!"],
  "c":None,
  "x":["腎功能下降早期常沒有症狀，肌酸酐又受肌肉量影響——要算 eGFR／CrCl，並依此檢視藥物。","Early kidney decline usually has no symptoms, and creatinine depends on muscle mass — always calculate eGFR/CrCl and review drugs against it.","ไตเสื่อมระยะแรกมักไม่มีอาการ และครีเอตินินขึ้นกับมวลกล้ามเนื้อ ต้องคำนวณ eGFR/CrCl เสมอ และทบทวนยาตามค่านั้น"]},
}
for p, d in M.items():
    k = s.index('{"p":"%s",' % p); e = s.index('\n', k); line = s[k:e]; tail = line[line.rindex('}') + 1:]
    obj = json.loads(line[:line.rindex('}') + 1])
    obj['m'] = d['m']; obj['x'] = d['x']
    if d.get('c'): obj['c'] = d['c']
    if d.get('c0'): obj['c'] = [[q, d['c0']] if q == 0 else [q, t] for q, t in obj['c']]
    s = s[:k] + json.dumps(obj, ensure_ascii=False, separators=(',', ':')) + tail + s[e:]
FX = {'P1': ("[\'「多看幾家比較保險」\',\'\"More hospitals is safer\"\',\'\"ไปหลายโรงพยาบาลปลอดภัยกว่า\"\']", "['「小毛病就換診所」','\"A new clinic for every little thing\"','\"เป็นนิดหน่อยก็เปลี่ยนคลินิก\"']"),
      'P9': ("['「藥拿了丟掉」','\"Collect the pills, then toss them\"','\"รับยามาแล้วทิ้ง\"']", "['「不好意思說，拿了就丟」','\"Too polite to say — collect and toss\"','\"เกรงใจไม่บอก รับมาแล้วทิ้ง\"']"),
      'P10': ("['「累就吃補品」','\"Tired? Buy supplements\"','\"เหนื่อยก็กินอาหารเสริม\"']", "['「累就喝提神飲料」','\"Tired? Grab an energy drink\"','\"เหนื่อยก็ดื่มเครื่องดื่มชูกำลัง\"']"),
      'P13': ("['「肌酸酐正常，腎沒事」','\"Normal creatinine, healthy kidneys\"','\"ครีเอตินินปกติ ไตไม่เป็นไร\"']", "['「沒症狀，腎就沒事」','\"No symptoms, healthy kidneys\"','\"ไม่มีอาการ ไตก็ปกติ\"']")}
fxs = s.index('const MYTH_FX')
for p, (old, new) in FX.items():
    old = old.replace("\\'", "'"); k = s.index(' %s:{n:' % p, fxs); assert s[k:k + 400].count(old) == 1, (p, old); s = s[:k] + s[k:k + 400].replace(old, new) + s[k + 400:]
for p, add in {'P1': "'藥袋','every bag','med bag','ซองยา',", 'P9': "'實話','說實話','tell the doctor','honest','บอกหมอ','ตามจริง',", 'P10': "'提神','energy drink','ชูกำลัง',"}.items():
    k = s.index(' %s:{n:' % p, fxs); j = s.index('kw:[', k) + 4; s = s[:j] + add + s[j:]
k = s.index(' P10:{n:', fxs); j = s.index('fx:[', k); e = s.index(']}', j)
s = s[:j] + "fx:['夜班還是靠提神飲料撐，一樣很累，也還沒抽血。','Still living on energy drinks through night shifts; still exhausted, still no blood test.','ยังพึ่งเครื่องดื่มชูกำลังตอนเข้ากะ ยังเหนื่อยเหมือนเดิม และยังไม่ได้เจาะเลือด'" + s[e:]
sub("t:['多重就醫（一個月就醫 >40 次）','Doctor-shopping (>40 visits in a month)','ไปหาหมอหลายที่ (>40 ครั้ง/เดือน)']",
    "t:['多重就醫：新陳代謝科、骨科、耳鼻喉……一個月 >40 次','Doctor-shopping: endocrine, orthopaedics, ENT… >40 visits a month','ไปหาหมอหลายที่: ต่อมไร้ท่อ กระดูก ENT… >40 ครั้ง/เดือน']")
sub("t:['疲倦、食慾差','Fatigue & poor appetite','อ่อนเพลีย เบื่ออาหาร']", "t:['疲倦、食慾差（她最想解決的困擾）','Fatigue & poor appetite — her top worry','อ่อนเพลีย เบื่ออาหาร (เรื่องที่ป้ากังวลที่สุด)']")

# 8) debrief questions follow the hands-on parts
sub("她頭暈冒冷汗時你怎麼反應？", "她頭暈冒冷汗時你怎麼處理——要給什麼、給幾克、多久後再測？")
sub("How did you respond when she turned dizzy and sweaty?", "When she turned dizzy and sweaty, what did you give, how many grams, and when did you recheck?")
sub("ตอนป้าเวียนหัวเหงื่อแตก คุณตอบสนองอย่างไร?", "ตอนป้าเวียนหัวเหงื่อแตก ให้อะไร กี่กรัม และวัดซ้ำเมื่อไร?")
sub("怎麼指出矛盾而不讓病人覺得被責怪？", "怎麼指出矛盾而不讓病人覺得被責怪？量身高時，哪些步驟會改變讀數（拖鞋、頭的角度）？為什麼矮 4 公分很重要？")
sub("How do you point out a contradiction without blaming?", "How do you point out a contradiction without blaming? When you measured her height, which steps change the reading (slippers, head position) — and why does a 4 cm loss matter?")
sub("จะชี้ความขัดแย้งโดยไม่ตำหนิได้อย่างไร?", "จะชี้ความขัดแย้งโดยไม่ตำหนิได้อย่างไร? ตอนวัดส่วนสูง ขั้นไหนทำให้ค่าเปลี่ยน (รองเท้าแตะ มุมศีรษะ) และทำไมการเตี้ยลง 4 ซม. จึงสำคัญ?")
sub("哪個最緊急？','Why is", "哪個最緊急？把藥排成她的一天後，哪些藥落在她常不吃的那一餐？週三早上的演練中，她在那 30 分鐘裡想做哪些事？','Why is")
sub("Fosamax technique — which is most urgent?'", "Fosamax technique — which is most urgent? Laid out as her day, which drugs land on meals she skips? In the Wednesday rehearsal, what did she try to do during those 30 minutes?'")
sub("วิธีกิน Fosamax — ข้อใดเร่งด่วนที่สุด?'", "วิธีกิน Fosamax — ข้อใดเร่งด่วนที่สุด? เมื่อเรียงยาเป็นหนึ่งวันของป้า ยาไหนตกอยู่ในมื้อที่ป้ามักไม่กิน? ตอนซ้อมเช้าวันพุธ ป้าพยายามทำอะไรใน 30 นาทีนั้น?'")

open(f, 'w', encoding='utf-8').write(s); print('case C games in; bytes', len(s.encode()))
