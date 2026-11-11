"""Case D preview ("D2"): a fresher third case for students who already played A and C (from 11 Nov 2026).
usage: python3 mk_d2.py SRC DST     (SRC = site/case-d/index.html, fully built; DST = site/preview-d/index.html)

The live Case D is not touched. The preview keeps its own saves (phd_lee2_*), is never locked and sends no results.

Step 1 (this file so far): open with the event, cut the how-to-play parts.
  - the pre-test comes first, then a short prologue that ends on the coughing fit behind the door
  - chapter 1 opens with the breathlessness scene (the old "question 3" cough event) and goes straight into the
    hands-on inhaler lesson (it used to sit in chapter 4); then the first-move question and the interview
  - no character intro cards, one line instead of the interview tutorial
Later steps (spot-the-mistake demo, timeline, prescriber map, variable ending) are added here one by one."""
import sys, re

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
    sub("</style>\n</head>", "#d2tag{position:fixed;left:8px;bottom:8px;z-index:99998;background:#ffd36b;color:#2a1030;font:800 13px/1 system-ui,sans-serif;padding:5px 10px;border-radius:99px;pointer-events:none;opacity:.9}\n</style>\n</head>")
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
    open(dst, 'w', encoding='utf-8').write(s); print(dst, 'D2 preview built')

main(sys.argv[1], sys.argv[2])
