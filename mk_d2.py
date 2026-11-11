"""Case D preview ("D2"): a fresher third case for students who already played A and C (from 11 Nov 2026).
usage: python3 mk_d2.py SRC DST     (SRC = site/case-d/index.html, fully built; DST = site/preview-d/index.html)

The live Case D is not touched. The preview keeps its own saves (phd_lee2_*), is never locked and sends no results.

Step 1 (this file so far): open with the event, cut the how-to-play parts.
  - the pre-test comes first, then a short prologue that ends on the coughing fit behind the door
  - chapter 1 opens with the breathlessness scene (the old "question 3" cough event) and goes straight into the
    hands-on inhaler lesson (it used to sit in chapter 4); then the first-move question and the interview
  - no character intro cards, one line instead of the interview tutorial
Step 2: teach-back in place of the myth boss (cd/d2_teachback.js): he shows the inhaler again and the student stops
  him at the wrong steps; then he reads out his memo, the student circles the wrong lines (the old myths) and picks
  the correction for each. S.boss keeps its shape, so the summary, ending and results are unchanged.
Chapter 3 has no contradiction duel (it plays the same in Cases A and C; dropped 11 Nov): the student's finds are laid
  out one by one and he owns up (the same admissions, the same problems revealed); the heart lock (his secret) stays.
The timeline, prescriber map and variable ending were dropped (11 Nov): they would feel like the same game again."""
import sys, re, os
HERE = os.path.dirname(os.path.abspath(__file__))

TB_CSS = r'''
/* teach-back (mk_d2.py) */
#tback{position:absolute;left:60px;right:60px;top:92px;bottom:30px;z-index:24;display:flex;flex-direction:column;gap:14px;background:rgba(255,255,255,.97);border-radius:28px;padding:18px 24px;box-shadow:0 0 0 5px #fff,0 0 0 10px #8c9a3e,0 16px 40px rgba(0,0,0,.35);animation:enterC .4s cubic-bezier(.2,1.2,.4,1)}
#tback .tb-head{display:flex;gap:16px;align-items:center;background:linear-gradient(90deg,#f3f1dc,#fff1dc);border-radius:18px;padding:10px 18px;font-size:26px}
#tback .tb-head b{font-family:var(--tc);font-weight:900;color:#4a5a12;white-space:nowrap}
#tback .tb-sub{flex:1;font-size:22px;font-weight:700;color:#5a4a3a}
#tback .tb-dots{display:flex;gap:8px}
#tback .tb-dots i{width:22px;height:22px;border-radius:50%;background:#e4e0d0;box-shadow:inset 0 0 0 2px rgba(0,0,0,.08)}
#tback .tb-dots i.cur{box-shadow:0 0 0 4px #ffb21f}
#tback .tb-dots i.okd{background:#bfe6cf}#tback .tb-dots i.hit{background:#18b07f}#tback .tb-dots i.miss{background:#ff9d00}#tback .tb-dots i.fa{background:#6aa0ff}
#tback .tb-main{flex:1;min-height:0;display:flex;gap:26px;align-items:stretch}
#tback .tb-face{width:330px;flex:none;border-radius:24px;background:linear-gradient(#fdf3d7,#f6dfb0);overflow:hidden;display:flex;align-items:flex-end;justify-content:center}
#tback .tb-face svg{width:100%;height:100%}
#tback .tb-face.sm{width:150px;height:150px;border-radius:50%}
#tback .tb-step{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;border-radius:24px;background:#f7f8ee;box-shadow:inset 0 0 0 4px #dfe4c0;padding:18px 30px;text-align:center}
#tback .tb-n{font-size:24px;font-weight:800;color:#8c9a3e}
#tback .tb-e{font-size:110px;line-height:1.1}
#tback .tb-t{font-size:40px;font-weight:900;line-height:1.35;color:var(--ink)}
#tback .tb-fb{min-height:70px;font-size:26px;font-weight:700;line-height:1.4;border-radius:16px;padding:10px 18px}
#tback .tb-fb.hit{background:#dff6ea;color:#0d6a4c}#tback .tb-fb.miss{background:#fff0d6;color:#8a4b00}#tback .tb-fb.fa{background:#e4eeff;color:#23427a}
#tback .tb-btns{display:flex;gap:22px;justify-content:center;align-items:center}
#tback .tb-b{border:0;border-radius:99px;padding:18px 40px;font-size:30px;font-weight:900;color:#fff;cursor:pointer;box-shadow:0 6px 0 rgba(0,0,0,.18)}
#tback .tb-b:active{transform:translateY(4px);box-shadow:0 2px 0 rgba(0,0,0,.18)}
#tback .tb-b.stop{background:#e0435a}#tback .tb-b.ok{background:#18b07f}#tback .tb-b.go{background:#3d7bff}
#tback .tb-cnt{font-size:24px;font-weight:800;color:#5a4a3a}
#tback .tb-note{flex:1;min-height:0;display:grid;grid-template-columns:1fr 1fr;grid-auto-flow:column;gap:8px 22px;padding:16px 20px;border-radius:20px;background:#fff8cf;box-shadow:inset 0 0 0 3px #ecd98a}
#tback .tb-line{position:relative;display:flex;gap:10px;align-items:center;text-align:left;font-size:25px;font-weight:700;line-height:1.3;color:#3a2e22;background:transparent;border:4px solid transparent;border-radius:44px;padding:4px 18px;cursor:pointer}
#tback .tb-line .tb-no{flex:none;color:#b08a2a;font-weight:900}
#tback .tb-line.on{border-color:#e0435a;background:#ffeef0}
#tback .tb-line em{position:absolute;right:14px;top:-10px;font-style:normal;font-size:18px;font-weight:900;color:#fff;border-radius:99px;padding:2px 12px}
#tback .tb-line em:empty{display:none}
#tback .tb-line.hit{border-color:#18b07f;background:#e6f8ef}#tback .tb-line.hit em{background:#18b07f}
#tback .tb-line.miss{border-color:#ff9d00;border-style:dashed;background:#fff3dc}#tback .tb-line.miss em{background:#ff9d00}
#tback .tb-line.fa{border-color:#6aa0ff;background:#eaf1ff}#tback .tb-line.fa em{background:#6aa0ff}
#tback .tb-quote{display:flex;gap:22px;align-items:center;justify-content:center;flex:1;min-height:0}
#tback .tb-q{max-width:1000px;font-size:34px;font-weight:900;line-height:1.4;background:#fff8cf;border-radius:26px;padding:20px 30px;box-shadow:0 0 0 5px #ecd98a}
#tback .tb-cards{display:flex;gap:30px;justify-content:center;padding:0 14px 14px}
#tback .tb-cards .ccard{width:auto;flex:1;min-height:270px;font-size:25px}
'''

def main(src, dst):
    s = open(src, encoding='utf-8').read()
    def sub(old, new, n=1):
        nonlocal s
        assert s.count(old) == n, (old[:90], s.count(old)); s = s.replace(old, new)
    def rsub(pat, new):
        nonlocal s
        m = re.findall(pat, s, re.S); assert len(m) == 1, (pat[:90], len(m)); s = re.sub(pat, lambda _: new, s, count=1, flags=re.S)

    # ---------- the preview stands apart from the live case ----------
    assert s.count('phd_lee_') >= 10; s = s.replace('phd_lee_', 'phd_lee2_')
    sub("const isLocked=()=>LOCK.closed&&!LOCK.tryOK;", "const isLocked=()=>false;   // preview: never locked (mk_d2.py)")
    sub("async function syncFlush(){\n  const url=serverURL(); if(!url||SYNC.busy) return;",
        "async function syncFlush(){ return;   // preview: results are not sent (mk_d2.py)\n  const url=serverURL(); if(!url||SYNC.busy) return;")
    sub("OUTBOX:'phd_outbox_v1',", "OUTBOX:'phd_outbox_d2',")   # its queue is its own too: the live case must never send preview results
    sub("</style>\n</head>", "#d2tag{position:fixed;left:8px;bottom:8px;z-index:99998;background:#ffd36b;color:#2a1030;font:800 10px/1 system-ui,sans-serif;padding:4px 8px;border-radius:99px;pointer-events:none;opacity:.9}\n</style>\n</head>")
    i = s.index('<body>'); s = s[:i] + '<body>\n<div id="d2tag">PREVIEW · D2</div>' + s[i+6:]   # the page's own body (a second <body> sits in a print template)

    # ---------- step 1: pre-test first, short prologue, cold open ----------
    sub("const STEPS=[()=>prologue(),()=>runCheckpoint('pre'),", "const STEPS=[()=>{ setBg('ext'); hideAll(); return runCheckpoint('pre'); },()=>prologue(),")
    rsub(r"  await chapterCard\(0\);\n  await introCard\('pilly'\);.*?\n  chapterDone\(0\);\n\}",
r"""  await chapterCard(0);
  show('me','L','neutral'); show('yeh','R','smug');
  await say('yeh','neutral',[`${nm()}，今天的個案：李伯伯，88 歲，退伍老兵，獨居。去年看病、拿藥一共「93 次」，健保署轉介我們來做居家訪視。`,`${nm()}, today's patient: Uncle Lee, 88, an army veteran who lives alone. Last year he had "93" healthcare visits, so the NHI Administration referred him to us for a home visit.`,`${nm()} เคสวันนี้คือลุงหลี่ อายุ 88 ปี ทหารผ่านศึก อยู่คนเดียว ปีที่แล้วไปหาหมอและรับยารวม "93 ครั้ง" สำนักงานประกันสุขภาพฯ จึงส่งต่อให้เราไปเยี่ยมบ้าน`]);
  await say('yeh','smug',['規則你都熟了：建立信任、仔細觀察、用證據說話。拜訪時間 60 分鐘。走吧。','You know the drill by now: build trust, observe carefully, let the evidence speak. Sixty minutes of visit time. Let\'s go.','กติกาคุณรู้ดีแล้ว: สร้างความไว้ใจ สังเกตให้ละเอียด พูดด้วยหลักฐาน มีเวลาเยี่ยม 60 นาที ไปกันเลย']);
  hide('yeh');
  await say('sys','neutral',['——星期五下午兩點半，高雄橋頭，精忠新村。33 度，老公寓沒有電梯，你們一階一階爬上四樓。','— Friday, 2:30 PM. Jingzhong New Village, Qiaotou, Kaohsiung. It is 33 °C and the old block has no lift; you climb to the fourth floor.','— วันศุกร์ บ่ายสองโมงครึ่ง หมู่บ้านจิงจงซินชุน เขตเฉียวโถว เกาสง อากาศ 33 องศา อาคารเก่าไม่มีลิฟต์ พวกคุณเดินขึ้นบันไดไปชั้นสี่']);
  sfx.cough(3);
  await say('sys','neutral',['你剛舉起手要敲門——門後傳來一陣撕心裂肺的咳嗽，接著是東西掉在地上的聲音。「汪！汪汪！」','You raise your hand to knock — from behind the door comes a tearing fit of coughing, then something clatters to the floor. "Woof! Woof-woof!"','คุณเพิ่งยกมือจะเคาะประตู ก็มีเสียงไอโขลกรุนแรงดังมาจากข้างใน ตามด้วยเสียงของหล่นกระแทกพื้น "โฮ่ง! โฮ่งๆ!"']);
  emo('me','shock');
  await say('sys','neutral',['門猛地打開。一位穿著T恤和拖鞋的女士：「你們是藥師？快進來——老頭子剛從走廊盡頭的廁所走回來，就喘成這樣！」','The door flies open. A woman in a T-shirt and slippers: "You\'re the pharmacists? Come in, quick — the old man just walked back from the toilet down the corridor and he can\'t get his breath!"','ประตูเปิดผาง ผู้หญิงใส่เสื้อยืดกับรองเท้าแตะ: "เภสัชกรใช่ไหม? เข้ามาเร็ว ตาแก่เพิ่งเดินกลับจากห้องน้ำสุดทางเดิน ก็หอบเป็นแบบนี้เลย!"']);
  chapterDone(0);
}""")
    # chapter 4 no longer repeats the lesson
    sub("  await part('inh', inhalerTask, true);\n  await part('kid', kidneyTask);", "  if(!S.inh) await part('inh', inhalerTask, true);\n  await part('kid', kidneyTask);")
    # chapter 1: straight into the breathlessness scene and the lesson
    rsub(r"  show\('wife','R','happy'\); await introCard\('wife'\);\n.*?(?=  await part\('fm', firstMove\);)",
r"""  S.met.wife=1; S.met.chen=1; show('wife','R','shock'); show('chen','C','cough'); show('me','L','shock');
  if(!S.seg.d2a){ await say('sys','neutral',['五坪的房間又悶又熱。李伯伯坐在床邊，白色汗衫濕透了，肩膀一聳一聳地喘。床頭的層架上放著一支藍色、一支綠色的吸入器。','The 16-square-metre room is hot and airless. Uncle Lee sits on the edge of the bed, his white vest soaked, shoulders heaving. On the bedside shelf stand two inhalers, one blue and one green.','ห้อง 16 ตารางเมตรร้อนอบอ้าว ลุงหลี่นั่งอยู่ขอบเตียง เสื้อกล้ามขาวเปียกชุ่ม ไหล่ยกขึ้นลงตามแรงหอบ บนชั้นข้างเตียงมียาพ่นสองตัว สีฟ้ากับสีเขียว']); S.seg.d2a=1; }
  S.asked.cough=1; await part('cough', coughEvent);
  if(!S.inh){ show('yeh','R','neutral'); await say('yeh','neutral',['好險。問診之前，先把這兩支吸入器弄清楚。','That was close. Before any questions, let\'s get these two inhalers straight.','เกือบไปแล้ว ก่อนจะถามอะไร มาทำความเข้าใจยาพ่นสองตัวนี้กันก่อน']); }
  await part('inh', inhalerTask, true);
  hide('yeh'); show('chen','C','happy'); show('me','L','neutral');
  await say('pilly','think',['他穩定下來了。現在才是正式開始——進到病人家裡，第一步是什麼？','He has settled. Now the visit really begins — what is your first move in a patient\'s home?','ลุงอาการคงที่แล้ว ตอนนี้ถึงจะเริ่มเยี่ยมบ้านจริงๆ ก้าวแรกในบ้านผู้ป่วยคืออะไร?']);
""")
    rsub(r"  await say\('pilly','happy',EXAM\(\)\?\['提問時間！✨ 點「提問卡」或用自己的話問。'.*?\n  await say\('pilly','think',\['不過李伯伯 88 歲了，天氣又熱，☕ 耐心有限.*?\]\);\n",
r"""  await say('pilly','happy',['提問時間！✨ ☕ 耐心有限，先問最重要的。','Question time! ✨ His ☕ patience is limited — ask what matters most first.','ได้เวลาถาม! ✨ ☕ ความอดทนของลุงมีจำกัด ถามเรื่องสำคัญที่สุดก่อน']);
""")
    # the lesson's first lines: it now follows the real attack
    rsub(r"    await say\('yeh','smug',\['在處理這一大堆文件之前——李伯伯，先示範一下.*?\]\);\n    await say\('chen','happy',\['吸入器？這個簡單！.*?\]\);\n",
r"""    await say('yeh','neutral',['李伯伯，剛才喘起來的時候，您第一個伸手拿的是綠色那支。為什麼？','Uncle Lee — when you couldn\'t breathe just now, the first one you reached for was the green one. Why?','ลุงหลี่ เมื่อกี้ตอนหอบ ลุงเอื้อมไปหยิบตัวสีเขียวก่อน ทำไมล่ะ?']);
""")
    rsub(r"    await say\('yeh','neutral',\['假設您正在爬樓梯回四樓，突然喘不過氣來——您會拿哪一支？'.*?\]\);\n", "")
    # wording that assumed the old order
    sub("['當然是這支綠的！看起來比較高級，一定比較強。藍的那支我每天早上都會吸好幾下啦。','This green one, of course! It looks fancier, so it must be stronger. The blue one I puff a few times every morning anyway.','ก็อันสีเขียวนี่สิ! ดูหรูกว่า ต้องแรงกว่าแน่ๆ ส่วนอันสีฟ้าลุงก็พ่นหลายทีทุกเช้าอยู่แล้ว']",
        "['綠的比較貴、看起來比較高級，喘的時候當然要用最強的！藍的那支我每天早上都會吸好幾下啦。','The green one costs more and looks fancier — when I can\\'t breathe I want the strongest! The blue one I puff a few times every morning anyway.','อันสีเขียวแพงกว่า ดูหรูกว่า เวลาหอบก็ต้องใช้ตัวที่แรงที่สุดสิ! ส่วนอันสีฟ้าลุงก็พ่นหลายทีทุกเช้าอยู่แล้ว']")
    sub("['先暫停訪談，打開窗戶讓空氣流通，陪在他身邊等他喘過來','Pause the interview, open the window for fresh air, and stay with him until he recovers','พักการสัมภาษณ์ไว้ก่อน เปิดหน้าต่างให้อากาศถ่ายเท",
        "['先不急著問診，打開窗戶讓空氣流通，陪在他身邊等他喘過來','Hold your questions, open the window for fresh air, and stay with him until he recovers','ยังไม่ต้องรีบถามอะไร เปิดหน้าต่างให้อากาศถ่ายเท")
    sub("],{timer:8, shuffle:true, id:'cough_event',", "],{timer:14, shuffle:true, id:'cough_event',")   # it is now the first thing a student does: time to read four options

    # ---------- step 2: teach-back (inhaler demo + his memo) in place of the myth boss ----------
    i = s.index('async function chapter5(){'); j = s.index('/* ---------------- Time-out', i); assert s.count('async function chapter5(){') == 1
    s = s[:i] + open(os.path.join(HERE, 'cd', 'd2_teachback.js'), encoding='utf-8').read() + s[j:]
    def tsub(key, arr):
        nonlocal s
        pat = r"\b" + key + r":\[[^\]]*\]"; assert len(re.findall(pat, s)) == 1, key
        s = re.sub(pat, lambda _: key + ':[' + ','.join("'" + x.replace("'", "\\'") + "'" for x in arr) + ']', s, count=1)
    tsub('ch5t', ['回覆示教', 'Teach-back', 'Teach-back: ให้ลุงทวนกลับ'])
    tsub('ch5s', ['他做一次、說一次，你來抓錯！', 'He shows and tells — you spot the mistakes!', 'ลุงทำและพูดให้ดู คุณจับจุดผิด!'])
    tsub('tBoss', ['回覆示教（衛教卡）', 'Teach-back (counsel cards)', 'Teach-back (การ์ดคำแนะนำ)'])
    tsub('mythSurv', ['這個錯誤觀念還沒改過來，最後總結時要再提到它！', 'This wrong idea is still standing. Bring it up again in your closing summary!', 'ความเชื่อผิดข้อนี้ยังไม่ได้แก้ ตอนสรุปปิดท้ายต้องพูดถึงอีกครั้ง!'])
    tsub('mythListH', ['📝 還沒改過來的錯誤觀念：在總結裡說清楚，就能改過來', '📝 Wrong ideas still standing: make each one clear in your summary to put it right', '📝 ความเชื่อผิดที่ยังไม่ได้แก้: พูดให้ชัดในสรุปเพื่อแก้ให้ถูก'])
    tsub('mythWarn', ['還有 {n} 個錯誤觀念沒在總結裡提到，李伯伯會照著舊想法做。要繼續修改，還是直接送出？', '{n} wrong ideas are not in your summary yet, and Uncle Lee will go on as before. Keep editing, or send anyway?', 'ยังมีความเชื่อผิดอีก {n} ข้อที่ยังไม่อยู่ในสรุป ลุงหลี่จะทำแบบเดิมต่อไป จะแก้ต่อ หรือส่งเลย?'])
    sub("</style>\n</head>", TB_CSS + "</style>\n</head>")

    # ---------- chapter 3 without the contradiction duel (same as Cases A and C): he owns up as the finds are laid out ----------
    i = s.index("  await say('chen','smug',['什麼證據不證據的！"); j = s.index("  $('#testiBanner').classList.add('hidden'); $('#testiDots').classList.add('hidden'); hideText();\n  if(S.visit>0){ resumePoint(); await heartLock(); }", i)
    assert 'while(open()>0){' in s[i:j] and s.count("  await say('chen','smug',['什麼證據不證據的！") == 1
    s = s[:i] + r"""  const T3=((S.seg||(S.seg={})).t3=S.seg.t3||{solved:{},tried:{},lost:{}}), solved=T3.solved, lost=T3.lost; TESTI.forEach(t=>{ if(!t.need.some(hasEv)) lost[t.id]=1; });
  if(!T3.intro){
    await say('chen','smug',['什麼證據不證據的！我當了一輩子兵，生活跟營區一樣，樣樣都有規矩！','Evidence? Hmph! I was a soldier all my life — I run things like a barracks, everything in order!','หลักฐานอะไรกัน! ลุงเป็นทหารมาทั้งชีวิต ใช้ชีวิตเหมือนอยู่ในค่าย ทุกอย่างมีระเบียบ!']);
    show('yeh','R','neutral');
    await say('yeh','neutral',['李伯伯，我們不是來挑毛病的。我們把剛才看到的東西一樣一樣放在桌上，您跟我們說說是怎麼回事，好嗎？','Uncle Lee, we are not here to find fault. We will put what we saw on the table, one thing at a time — will you tell us the story behind each?','ลุงหลี่ เราไม่ได้มาจับผิดนะ เราจะวางของที่เห็นเมื่อกี้บนโต๊ะทีละอย่าง ลุงช่วยเล่าให้ฟังหน่อยได้ไหมว่าเป็นมายังไง?']);
    hide('yeh'); T3.intro=1; }
  for(const s of TESTI){ if(solved[s.id]||lost[s.id]) continue; resumePoint(); if(S.visit<=0){ S.fl.duelCut=1; break; }
    const ev=s.need.find(hasEv); emo('chen','shock');
    await fpShow('item',ev,async()=>{ await say('me','neutral',presentAs(ev)); });
    await sayLines(s.solve.slice(1)); reveal(s.p); solved[s.id]=1; S.usedEv.push(ev); logEvent({type:'present', st:s.id, item:ev, ok:true, auto:true}); }
  const nLost=Object.keys(lost).length; if(nLost&&!T3.lostSaid){ T3.lostSaid=1; logEvent({type:'unprovable', st:Object.keys(lost)});
    await say('pilly','sad',[`可惜……還有 ${nLost} 件事，我們搜查時沒找到相關的東西，他就沒有提起。`,`A pity… there ${nLost>1?'are':'is'} ${nLost} more thing${nLost>1?'s':''} we found nothing about in the search, so he never brought ${nLost>1?'them':'it'} up.`,`น่าเสียดาย… ยังมีอีก ${nLost} เรื่องที่เราหาของที่เกี่ยวข้องไม่เจอตอนค้นห้อง ลุงเลยไม่ได้พูดถึง`]); }
""" + s[j:]
    tsub('ch3t', ['攤開來說', 'Out in the open', 'เปิดใจคุยกัน'])
    tsub('ch3s', ['把找到的東西放在桌上，聽他怎麼說', 'Lay out what you found and hear his side', 'วางสิ่งที่พบบนโต๊ะ แล้วฟังลุงเล่า'])
    open(dst, 'w', encoding='utf-8').write(s); print(dst, 'D2 preview built')

main(sys.argv[1], sys.argv[2])
