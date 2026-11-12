"""Case D, lighter final battle (12 Nov 2026). Run on d_orig.html after mk_dacb.py.
1. Drop the myths that repeat an earlier hands-on task: P2 (blue vs green inhaler = the inhaler demo),
   P8 (doubling missed doses = mission 3, glipizide) and P13 ("normal" creatinine = the CrCl calculation).
2. Two short cards per myth (right / wrong) instead of three long ones with a half-right card, in bigger type."""
import os, json
H = os.path.dirname(os.path.abspath(__file__)); f = f'{H}/d_orig.html'
s = open(f, encoding='utf-8').read()
if '/* mk_dlite */' in s: print('already applied'); raise SystemExit
def sub(old, new, n=1):
    global s
    assert s.count(old) == n, (old[:90], s.count(old)); s = s.replace(old, new)

DROP = {'P2', 'P8', 'P13'}
CARDS = {
 'P1': (['固定一家醫院、一位醫師、一家藥局，看病時帶齊所有藥袋。', 'One hospital, one doctor, one pharmacy — and bring every med bag.', 'มีหมอประจำ โรงพยาบาลเดียว ร้านยาที่เดียว และพกซองยาทุกซองไปหาหมอ'],
        ['越多科越好，各科開的藥全部一起吃就對了。', 'More specialists, better care — just take everything they give you.', 'ยิ่งหลายแผนกยิ่งดี ยาจากทุกที่กินรวมกันได้เลย']),
 'P3': (['有酸味就是壞了，煮滾也沒用：丟掉，煮少一點、加蓋冷藏。', 'A sour smell means it has gone off, and boiling won\'t fix it: throw it out, cook less, keep it covered in the fridge.', 'กลิ่นเปรี้ยวแปลว่าบูดแล้ว ต้มใหม่ก็ไม่หาย ทิ้งไป ทำทีละน้อย ปิดฝาแช่ตู้เย็น'],
        ['加點醋或辣椒殺菌就好，丟掉太浪費了。', 'Add vinegar or chilli to kill the germs — throwing it out is a waste.', 'ใส่น้ำส้มสายชูหรือพริกฆ่าเชื้อ ทิ้งไปเสียดายเปล่าๆ']),
 'P4': (['太熱會脫水、頭暈、更喘：冷氣開 26–28 度配電扇，電費不多。', 'Heat brings dehydration, dizziness and more breathlessness: AC at 26–28 °C with a fan costs little.', 'ร้อนจัดทำให้ขาดน้ำ เวียนหัว หอบมากขึ้น เปิดแอร์ 26–28 องศาคู่พัดลม ค่าไฟไม่มาก'],
        ['流汗可以排毒；少喝水，就不用一直走去廁所。', 'Sweat flushes out toxins — drink less so you needn\'t walk to the toilet so often.', 'เหงื่อช่วยขับพิษ ดื่มน้ำน้อยๆ จะได้ไม่ต้องเดินไปห้องน้ำบ่อย']),
 'P6': (['每天用軟毛刷刷假牙，晚上拿下來泡著，定期看牙醫。', 'Brush the dentures every day with a soft brush, soak them overnight, and see the dentist.', 'แปรงฟันปลอมทุกวันด้วยแปรงขนนุ่ม ถอดแช่ตอนกลางคืน และไปหาหมอฟัน'],
        ['一週泡一次滾水或漂白水就好，戴著睡也沒關係。', 'Boil or bleach them once a week; sleeping in them is fine.', 'แช่น้ำเดือดหรือน้ำยาฟอกขาวสัปดาห์ละครั้งพอ ใส่นอนทั้งคืนก็ได้']),
 'P9': (['這些保健品證據很少，錢留著開冷氣、吃好一點。', 'There is little evidence for these supplements — spend the money on the AC and good food.', 'อาหารเสริมพวกนี้มีหลักฐานน้อย เก็บเงินไว้ค่าแอร์และค่าอาหารดีกว่า'],
        ['買大罐比較划算，天然的吃兩倍更快見效。', 'Buy the big bottle and take a double dose — natural things can\'t hurt.', 'ซื้อขวดใหญ่คุ้มกว่า ของธรรมชาติกินสองเท่าจะได้ผลเร็ว']),
 'P10': (['吃藥的是您，知道每顆藥做什麼才安全。我們來做一張大字藥表。', 'You are the one taking them — knowing what each is for keeps you safe. We\'ll make a big-print chart.', 'คนกินยาคือลุง รู้ว่ายาแต่ละตัวไว้ทำอะไรถึงจะปลอดภัย เราจะทำตารางยาตัวใหญ่ให้'],
         ['醫生給什麼就吃什麼，別的診所再給也一起吃，不用多問。', 'Take whatever you are given — other clinics\' pills too. No need to ask.', 'หมอให้อะไรก็กิน คลินิกอื่นให้มาก็กินรวมไป ไม่ต้องถาม']),
}
a = s.index('const MYTHS=['); b = s.index('];', a) + 1
my = json.loads(s[a + len('const MYTHS='):b])
my = [m for m in my if m['p'] not in DROP]
assert {m['p'] for m in my} == set(CARDS), [m['p'] for m in my]
for m in my: m['c'] = [[2, CARDS[m['p']][0]], [0, CARDS[m['p']][1]]]
s = s[:a] + 'const MYTHS=' + json.dumps(my, ensure_ascii=False, separators=(',', ':')) + s[b:]
sub("const MYTH_SEVERITY=['P8','P2','P13','P1','P3','P4','P9','P6','P10'];", "const MYTH_SEVERITY=['P1','P3','P4','P9','P6','P10']; /* mk_dlite */")
sub(".ccard.fly{animation:flyUp .5s forwards}", ".ccard.fly{animation:flyUp .5s forwards}\n#bossCards{gap:36px}#bossCards .ccard{width:640px;min-height:150px;font-size:30px;line-height:1.4;padding:20px 26px}")
sub("'注意：只有「最佳」衛教卡才能打破迷思。", "'注意：選對衛教卡才能打破迷思。")
sub("'Heads up: only the BEST card breaks a myth.", "'Heads up: only the right card breaks a myth.")
sub("'ระวัง: มีแต่การ์ดที่ดีที่สุดเท่านั้นที่ทลายความเชื่อได้", "'ระวัง: ต้องเลือกการ์ดที่ถูกเท่านั้นถึงจะทลายความเชื่อได้")
sub("選最完整、最正確的建議！", "選對的那張！")
sub("Pick the most complete, correct advice!", "Pick the right one!")
sub("เลือกคำแนะนำที่ครบและถูกที่สุด!", "เลือกใบที่ถูก!")
open(f, 'w', encoding='utf-8').write(s); print('lighter boss in;', len(my), 'myths')
