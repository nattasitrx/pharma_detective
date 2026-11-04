"""Case-only teacher-page lines: insert CASE_TEACH for C or D and refresh the outdated debrief sentence in C. usage: mk_teach.py c|d"""
import sys, os
HERE = os.path.dirname(os.path.abspath(__file__)); cid = sys.argv[1]
p = f'{HERE}/{cid}_orig.html'; s = open(p, encoding='utf-8').read()
js = open(f'{HERE}/{cid}_teach.js', encoding='utf-8').read()
anchor = 'function renderBoard(){'; assert s.count(anchor) == 1
s = s.replace(anchor, js + anchor)
if cid == 'c':
    rep = [('把藥排成她的一天後，哪些藥落在她常不吃的那一餐？週三早上的演練中，她在那 30 分鐘裡想做哪些事？',
            '她常不吃早餐和午餐，哪些藥和這兩餐綁在一起？週三早上的演練中，那 30 分鐘裡她提出的要求，哪些不行、哪些其實可以？'),
           ('Laid out as her day, which drugs land on meals she skips? In the Wednesday rehearsal, what did she try to do during those 30 minutes?',
            'She often skips breakfast and lunch — which drugs are tied to those meals? In the Wednesday rehearsal, which of her requests during the 30 minutes had to wait, and which were actually fine?'),
           ('เมื่อเรียงยาเป็นหนึ่งวันของป้า ยาไหนตกอยู่ในมื้อที่ป้ามักไม่กิน? ตอนซ้อมเช้าวันพุธ ป้าพยายามทำอะไรใน 30 นาทีนั้น?',
            'ป้ามักไม่กินมื้อเช้าและกลางวัน ยาไหนผูกอยู่กับสองมื้อนี้? ตอนซ้อมเช้าวันพุธ คำขอของป้าระหว่าง 30 นาที ข้อไหนต้องห้าม ข้อไหนทำได้จริง?')]
    for a, b in rep:
        assert s.count(a) == 1, a[:40]; s = s.replace(a, b)
open(p, 'w', encoding='utf-8').write(s); print(cid, 'teacher lines added')
