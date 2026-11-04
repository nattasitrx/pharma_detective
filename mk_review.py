"""Online review sheet for the professor: review/index.html (Traditional Chinese by default; English and Thai on a switch).
Each question shows its picture with the answers right beside it (desktop) or right under it (phone), plus reference links.
Answers save to the results server (class "profreview", case "review", ignored by every game dashboard);
the team reads them at review/?results with the results key."""
import json, os, urllib.parse
SP = os.path.dirname(os.path.abspath(__file__))
def T(zh, en, th): return {'zh': zh, 'en': en, 'th': th}
def o(id, t, cur=False, inp=False):
    d = {'id': id, 't': t}
    if cur: d['cur'] = True
    if inp: d['inp'] = True
    return d
def R(label, url): return {'l': label, 'u': urllib.parse.quote(url, safe=':/?=&%#')}
AG = T('資料上', 'In the documents', 'ในเอกสาร')
GM = T('遊戲目前', 'In the game now', 'ในเกมตอนนี้')
FD = T('查到的資料', 'What we found', 'ข้อมูลที่ค้นเจอ')

REF = {
 'clar_tw': R('臺大醫院新竹分院 · CLARINASE 康瑞斯持續性藥效錠（loratadine 5 mg + pseudoephedrine 120 mg）', 'https://shmc.ntu.edu.tw/en/medicine/detail/sn/145'),
 'pse': R('Drugs.com (AHFS) · Pseudoephedrine: max 240 mg / 24 h', 'https://www.drugs.com/ppa/pseudoephedrine.html'),
 'fosa_tw': R('Organon 台灣 · 福善美保骨錠 70 mg/5600 IU 用藥安全指引', 'https://www.organon.com/taiwan/wp-content/uploads/sites/49/2023/07/FOSAMAX-PLUS-福善美保骨錠用藥安全指引.pdf'),
 'fosa_use': R('中國醫藥大學附設醫院 · Fosamax Plus 用藥指導', 'https://cmuh.cmu.edu.tw/HealthEdus/Detail_EN?no=6262'),
 'kdigo': R('KDIGO 2024 CKD Guideline', 'https://kdigo.org/kdigo-announces-publication-of-2024-ckd-guideline/'),
 'spiolto': R('Spiolto Respimat SmPC (Boehringer Ingelheim, emc)', 'https://www.medicines.org.uk/emc/product/6902/smpc'),
 'spiolto_tw': R('花蓮慈濟醫院藥學部 · Spiolto 適倍樂 使用說明', 'https://hlm.tzuchi.com.tw/drug/images/files/Spiolto.pdf'),
 'royamet': R('藥品許可證 · ROYAMET F.C. TABLETS (CIMETIDINE) 皇胃佳膠衣錠', 'https://drugs.olc.tw/licenses/view/54a2d991-14f0-4b06-b5dc-4a63d38a10d1/'),
 'kudona': R('元氣網藥物百科 · 骨多能膠囊 KUDONA CAPSULES 250 mg', 'https://health.udn.com/health/pharma/62d0f5d29953135a5f1d18ad'),
 'crcl': R('Am J Health-Syst Pharm 2009 · CrCl estimation in morbidly obese patients', 'https://read.qxmd.com/read/19299371/estimation-of-creatinine-clearance-in-morbidly-obese-patients'),
 'hypo': R('CDC · Treatment of low blood sugar (15-15 rule)', 'https://www.cdc.gov/diabetes/treatment/treatment-low-blood-sugar-hypoglycemia.html'),
 'acarbose': R('PRECOSE (acarbose) label · use oral glucose instead of sucrose', 'https://drugcentral.org/label/c85bc02a-bf18-4690-84b8-2c256bce5f9f/view'),
 'mdi': R('HealthLinkBC · Using a metered-dose inhaler with a spacer', 'https://www.healthlinkbc.ca/healthwise/using-metered-dose-inhaler-spacer-adult'),
 'acb': R('ACB Calculator (Anticholinergic Burden)', 'https://acbcalc.com/pages/about'),
 'cc_deed': R('Creative Commons · 姓名標示─非商業性─相同方式分享 4.0 國際（CC BY-NC-SA 4.0）授權說明', 'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hant'),
 'kmu_cv': R('高雄醫學大學藥學系 · 陳崇鈺老師英文簡歷（Chung-Yu Chen）', 'https://pharm.kmu.edu.tw/images/教師英文CV/陳崇鈺.pdf'),
 'beers': R('AGS 2023 Beers Criteria (J Am Geriatr Soc)', 'https://pubmed.ncbi.nlm.nih.gov/37139824/'),
}

AGE = {'head': [T('案例', 'Case', 'เคส'), T('藥袋年齡', 'Age on bags', 'อายุบนซอง'), T('收據出生日期（調劑日年齡）', 'Birth date on receipt (age on dispensing date)', 'วันเกิดในใบเสร็จ (อายุ ณ วันจ่ายยา)'), T('遊戲目前', 'Game now', 'เกมใช้')],
       'rows': [[T('A 陳伯', 'A Uncle Chen', 'A ลุงเฉิน'), '61', T('1955/11/07（2021/2/18 時 65 歲）', '1955/11/07 (65 on 2021/2/18)', '1955/11/07 (65 ปี ณ 18/2/2021)'), '61'],
                [T('C 王太太', 'C Mrs. Wang', 'C ป้าหวัง'), '58', T('1960/11/07（2022/2/18 時 61 歲）', '1960/11/07 (61 on 2022/2/18)', '1960/11/07 (61 ปี ณ 18/2/2022)'), '61'],
                [T('D 李伯伯', 'D Uncle Lee', 'D ลุงหลี่'), T('85（原圖）', '85 (original)', '85 (รูปเดิม)'), T('1933/05/01（2022/4/28 時 88 歲）', '1933/05/01 (88 on 2022/4/28)', '1933/05/01 (88 ปี ณ 28/4/2022)'), '88']],
       'note': T('不論選哪一個，CKD 分期都不變。', 'Whichever you choose, the CKD stage does not change.', 'ไม่ว่าเลือกแบบไหน ระยะ CKD ไม่เปลี่ยน')}

Q = [
 {'code': 'Q1', 'grp': 'all', 'fig': 'f1_age.png', 'age': True,
  't': T('年齡要以哪一份資料為準？', 'Which source should set the patient\'s age?', 'ยึดอายุจากเอกสารไหน'),
  'info': [[AG, T('三個案例藥袋上的年齡，都和收據上的出生日期（換算到調劑日）不一致。', 'In all three cases, the age printed on the bags does not match the birth date on the receipt (age counted to the dispensing date).', 'อายุบนซองยาไม่ตรงกับวันเกิดในใบเสร็จทั้ง 3 เคส (นับอายุถึงวันที่บนซอง)')],
           [GM, T('三個案例做法不同：A 依藥袋（出生日期改為 1959/11/7，但收據圖片仍是 1955）；C 依出生日期（學生用藥袋的 58 歲算 CrCl 會被判錯）；D 依出生日期（藥袋已改成 88）。',
                  'Each case is handled differently: A follows the bags (birth date changed to 1959/11/7, but the receipt image still says 1955); C follows the birth date (students who use 58 from the bag for CrCl are marked wrong); D follows the birth date (the bags were already changed to 88).',
                  'ตอนนี้แต่ละเคสใช้คนละหลัก: A ยึดซอง (รูปใบเสร็จยังเป็น 1955) · C ยึดวันเกิด (นักศึกษาที่ใช้อายุ 58 จากซองจะถูกบอกว่าผิด) · D ยึดวันเกิด (แก้ซองเป็น 88 แล้ว)')]],
  'opts': [o('birth', T('以收據的出生日期為準：A 改為 65 歲（eGFR ≈ 23、CrCl ≈ 32.3），修改 A、C 藥袋圖片上的年齡', 'Use the receipt birth date: Case A becomes 65 (eGFR ≈ 23, CrCl ≈ 32.3); change the ages on the A and C bag images', 'ยึดวันเกิดในใบเสร็จ: A เป็น 65 ปี (eGFR ≈ 23, CrCl ≈ 32.3) แก้อายุบนรูปซองของ A และ C')),
           o('bag', T('以藥袋的年齡為準：C 改為 58 歲（eGFR ≈ 52.5、CrCl ≈ 42.8）、D 改回 85 歲（CrCl ≈ 59），修改 A、C 收據上的出生日期', 'Use the age on the bags: Case C becomes 58 (eGFR ≈ 52.5, CrCl ≈ 42.8) and Case D goes back to 85 (CrCl ≈ 59); change the birth dates on the A and C receipts', 'ยึดอายุบนซอง: C เป็น 58 ปี (eGFR ≈ 52.5, CrCl ≈ 42.8) · D กลับเป็น 85 ปี (CrCl ≈ 59) · แก้วันเกิดในรูปใบเสร็จของ A และ C')),
           o('keep', T('維持目前做法（各案例不同），只把 A 收據改成 1959/11/07', 'Keep the current approach (different per case); only change Case A\'s receipt to 1959/11/07', 'คงแบบปัจจุบัน แค่แก้รูปใบเสร็จ A เป็น 1959/11/07'), cur=True)]},
 {'code': 'A2', 'grp': 'A', 'fig': 'f2_clarinase.png', 't': T('Clarinase 的含量是多少？', 'What strength is Clarinase?', 'Clarinase ความแรงเท่าไร'),
  'info': [[AG, T('三個案例的收據都只寫「Clarinase 7 粒，1 天 1 次，7 天」，沒有含量。', 'All three receipts only say "Clarinase, 7 tablets, once daily, 7 days", with no strength.', 'ใบเสร็จทั้ง 3 เคสเขียนแค่ Clarinase 7 เม็ด วันละครั้ง 7 วัน ไม่มีความแรง')],
           [GM, T('視為 loratadine 5 mg + pseudoephedrine 120 mg，每日一次。Case A 重複用藥任務：pseudoephedrine 每日合計 420 mg（Peace 60 + Finska LP 240 + Clarinase 120），超過上限 240 mg。',
                  'Treated as loratadine 5 mg + pseudoephedrine 120 mg once daily. Case A\'s duplication mission says pseudoephedrine totals 420 mg/day (Peace 60 + Finska LP 240 + Clarinase 120), above the 240 mg maximum.',
                  'ถือเป็น loratadine 5 + pseudoephedrine 120 มก. วันละครั้ง ภารกิจยาซ้ำ Case A บอกว่ารวม 420 มก./วัน เกินขีดสูงสุด 240 มก.')],
           [FD, T('台灣的 Clarinase（康瑞斯持續性藥效錠）為 loratadine 5 mg + pseudoephedrine 120 mg；pseudoephedrine 每日上限 240 mg。', 'Clarinase in Taiwan (康瑞斯持續性藥效錠) is loratadine 5 mg + pseudoephedrine 120 mg; the pseudoephedrine maximum is 240 mg/day.', 'Clarinase ในไต้หวันคือ loratadine 5 + pseudoephedrine 120 มก. · pseudoephedrine สูงสุด 240 มก./วัน')]],
  'opts': [o('5_120', T('5 mg／120 mg，每日一次，合計 420 mg', '5 mg/120 mg once daily, total 420 mg/day', 'แบบ 5/120 มก. วันละครั้ง รวม 420 มก./วัน'), cur=True),
           o('10_240', T('Clarinase 24 小時錠 10 mg／240 mg，合計 540 mg', 'Clarinase 24-hour tablet 10 mg/240 mg, total 540 mg/day', 'แบบ 24 ชม. 10/240 มก. รวม 540 มก./วัน'))],
  'refs': ['clar_tw', 'pse']},
 {'code': 'A3', 'grp': 'A', 'fig': 'f3_ponstan.png', 't': T('Ponstan 藥袋用途寫「經血過多」，但病人是男性', 'The Ponstan bag lists "heavy menstrual bleeding" as a use, but the patient is a man', 'ซอง Ponstan มีข้อบ่งใช้ "ประจำเดือนมามาก" แต่ผู้ป่วยเป็นชาย'),
  'info': [[AG, T('用途：消炎、解熱、鎮痛、經血過多及其他相關症狀。', 'Uses: anti-inflammatory, fever, pain, heavy menstrual bleeding and related symptoms.', 'ข้อบ่งใช้บนซอง: ลดอักเสบ ลดไข้ แก้ปวด ประจำเดือนมามาก')],
           [GM, T('任務說明告訴學生：這是藥袋上的通用文字，不是開藥的原因。', 'The mission tells students this is generic text printed on the bag, not the reason it was prescribed.', 'ภารกิจอธิบายว่าเป็นข้อความทั่วไปบนซอง ไม่ใช่เหตุผลที่สั่งยา')]],
  'opts': [o('keep', T('保留，當作教學點', 'Keep it as a teaching point', 'เก็บไว้เป็นจุดสอน'), cur=True), o('remove', T('從圖片刪除「經血過多」', 'Remove "heavy menstrual bleeding" from the image', 'ลบคำนี้ออกจากรูป'))]},
 {'code': 'C1', 'grp': 'C', 'fig': 'f4_fosamax.png', 't': T('Fosamax Plus 含多少維生素 D？', 'How much vitamin D is in Fosamax Plus?', 'Fosamax Plus มีวิตามินดีเท่าไร'),
  'info': [[AG, T('B醫院骨科藥袋只寫「FOSAMAX PLUS (Alendronate) 70MG」，沒有維生素 D。', 'Hospital B\'s orthopaedic bag only says "FOSAMAX PLUS (Alendronate) 70MG", with no vitamin D.', 'ซอง รพ.B เขียนแค่ alendronate 70 มก. ไม่มีวิตามินดี')],
           [GM, T('alendronate 70 mg + vitamin D3 2800 IU；和問題 P7（鈣與維生素 D 是否足夠）有關。', 'alendronate 70 mg + vitamin D3 2800 IU; this matters for problem P7 (enough calcium and vitamin D?).', 'เกมใส่เป็น alendronate 70 มก. + D3 2800 IU เกี่ยวกับปัญหา P7 (แคลเซียม/วิตามินดีพอไหม)')],
           [FD, T('台灣上市的福善美保骨錠為 70 mg／5600 IU。', 'In Taiwan, Fosamax Plus is sold as 70 mg/5600 IU.', 'ในไต้หวัน Fosamax Plus มีความแรง 70 มก./5600 IU')]],
  'opts': [o('2800', T('70 mg + D3 2800 IU', '70 mg + D3 2800 IU', '70 มก. + D3 2800 IU'), cur=True),
           o('5600', T('70 mg + D3 5600 IU（台灣上市的含量）', '70 mg + D3 5600 IU (the strength sold in Taiwan)', '70 มก. + D3 5600 IU (ความแรงที่ขายในไต้หวัน)')),
           o('none', T('只當作 alendronate，刪除遊戲中的維生素 D', 'Treat it as alendronate only and remove vitamin D from the game', 'ถือเป็น alendronate อย่างเดียว เอาวิตามินดีออกจากเกม'))],
  'refs': ['fosa_tw']},
 {'code': 'C2', 'grp': 'C', 'fig': 'f5_microalb.png', 't': T('微量白蛋白 2.8 可以判定為 A2 嗎？', 'Can a microalbumin of 2.8 be called A2?', 'ไมโครอัลบูมิน 2.8 สรุปว่าเป็น A2 ได้ไหม'),
  'info': [[AG, T('MicroALB 2.8（參考值 <1.9），只在 2021/9/20 測一次，沒有單位，也沒有 ACR。', 'MicroALB 2.8 (reference <1.9), measured once on 2021/9/20, with no unit and no ACR.', 'MicroALB 2.8 (ค่าอ้างอิง <1.9) วัดครั้งเดียว ไม่มีหน่วย ไม่มี ACR')],
           [GM, T('問題 P13 寫「eGFR ≈ 52（G3a）、尿微白蛋白 2.8（A2）」。', 'Problem P13 says "eGFR ≈ 52 (G3a), urine microalbumin 2.8 (A2)".', 'ปัญหา P13 เขียนว่า eGFR ≈ 52 (G3a) ไมโครอัลบูมิน 2.8 (A2)')]],
  'opts': [o('a2', T('可以，維持 A2', 'Yes, keep A2', 'ได้ คง A2 ไว้'), cur=True), o('nograde', T('改成只寫「微量白蛋白尿」，不分級', 'Just say "albuminuria", without a category', 'เขียนแค่ "มีอัลบูมินในปัสสาวะ" ไม่ระบุระดับ'))],
  'refs': ['kdigo']},
 {'code': 'C3', 'grp': 'C', 'fig': 'f6_labs_ac.png', 'wide': True, 't': T('Case C 的檢驗數值和 Case A 幾乎相同', 'Case C\'s lab values are almost the same as Case A\'s', 'ค่าแล็บ Case C แทบเหมือน Case A'),
  'info': [[AG, T('GLU-AC、HbA1c（7.1/7.8/8.3）、TC、LDL、HDL、MicroALB 都和 Case A 相同；只有 TG（每個值多 100）、Cr、T-score 不同。A醫院藥袋也是同一套（同醫師、領藥號碼 5845、同調劑時間），只少了 Peace。',
                  'GLU-AC, HbA1c (7.1/7.8/8.3), TC, LDL, HDL and MicroALB are identical to Case A; only TG (100 higher each time), Cr and T-score differ. Hospital A\'s bags are the same set too (same doctor, pick-up number 5845, same dispensing time), just without Peace.',
                  'GLU, HbA1c, TC, LDL, HDL, MicroALB เท่ากับ Case A ทุกค่า ต่างแค่ TG (มากกว่า 100), Cr, T-score และซอง รพ.A ก็เป็นชุดเดียวกับ Case A')],
           [GM, T('照原圖使用；兩個案例都玩的學生會看到相同的數字。', 'Used as given; students who play both cases will see the same numbers.', 'ใช้ตามรูป นักศึกษาที่เล่นทั้งสองเคสจะเห็นตัวเลขซ้ำกัน')]],
  'opts': [o('keep', T('保留（原始教材就是如此）', 'Keep (the original materials are like this)', 'คงไว้ (เอกสารต้นฉบับเป็นแบบนี้)'), cur=True), o('change', T('修改 Case C 的數值（請在備註寫下）', 'Change Case C\'s values (please write them in the notes)', 'เปลี่ยนค่าของ Case C (เขียนในหมายเหตุ)'))]},
 {'code': 'D1', 'grp': 'D', 'fig': 'f7_freq.png', 't': T('四個藥袋的「每日次數」和「服用時間」不一致', 'On four bags, the times per day don\'t match the dosing times', 'ซอง 4 ซอง จำนวนครั้งต่อวันไม่ตรงกับเวลากิน'),
  'info': [[AG, T('Galvus MET 每日 2 次／三餐飯前 · Minidiab 每日 2 次／早飯後 · Actibest 每日 3 次、每次 2 粒／晚飯後 · Sketa 每日 3 次／晚飯後。', 'Galvus MET twice daily / before three meals · Minidiab twice daily / after breakfast · Actibest three times daily, 2 tablets / after dinner · Sketa three times daily / after dinner.', 'Galvus MET วันละ 2 / ก่อน 3 มื้อ · Minidiab วันละ 2 / หลังเช้า · Actibest วันละ 3 / หลังเย็น · Sketa วันละ 3 / หลังเย็น')],
           [GM, T('照藥袋顯示，不當作學生要找的問題（Debrief 手冊有註記）。', 'Shown as printed and not a problem students must find (noted in the debrief guide).', 'แสดงตามซอง ไม่ได้เป็นปัญหาที่ต้องหา (มีหมายเหตุในคู่มือ debrief)')]],
  'opts': [o('teach', T('刻意設計：加入成為學生要找的問題', 'Intentional: add it as a problem for students to find', 'ตั้งใจ: เพิ่มเป็นปัญหาให้นักศึกษาหา')),
           o('typo', T('印刷錯誤：修正圖片（請在備註寫下正確用法）', 'Printing error: fix the images (write the correct directions in the notes)', 'พิมพ์ผิด: แก้รูป (เขียนวิธีใช้ที่ถูกในหมายเหตุ)')),
           o('keep', T('維持現狀：只顯示、不計分', 'Leave as is: shown only, not scored', 'คงไว้: แสดงอย่างเดียว ไม่นับคะแนน'), cur=True)]},
 {'code': 'D2', 'grp': 'D', 'fig': 'f8_spiolto.png', 't': T('Spiolto 藥袋寫「每日 2 次、每次 2 噴」是刻意的錯誤嗎？', 'Is "2 puffs twice daily" on the Spiolto bag an intentional error?', 'Spiolto บนซอง "วันละ 2 ครั้ง ครั้งละ 2 พ่น" เป็นข้อผิดที่ตั้งใจไหม'),
  'info': [[AG, T('1 支 60 噴，標示「共 28 天份」；但每日 4 噴只夠 15 天（標準劑量每日一次 2 噴可用 30 天）。', 'One inhaler with 60 puffs, labelled "28 days", but 4 puffs a day lasts only 15 days (the standard 2 puffs once daily lasts 30 days).', '1 หลอด 60 พ่น เขียนว่า 28 วัน แต่วันละ 4 พ่นใช้ได้แค่ 15 วัน (ขนาดมาตรฐานวันละครั้ง 2 พ่นใช้ได้ 30 วัน)')],
           [GM, T('列為問題 P2 的一部分，答案是「與處方醫師聯繫確認」。', 'Part of problem P2; the answer is "check with the prescriber".', 'เป็นส่วนหนึ่งของปัญหา P2 เฉลย: ปรึกษาแพทย์ผู้สั่งยา')],
           [FD, T('仿單劑量：每日一次，每次 2 噴。', 'Labelled dose: 2 puffs once daily.', 'ขนาดตามฉลาก: วันละครั้ง ครั้งละ 2 พ่น')]],
  'opts': [o('teach', T('是刻意的錯誤，維持', 'Yes, it is intentional; keep it', 'ตั้งใจ คงไว้'), cur=True), o('typo', T('是印刷錯誤：改成每日一次 2 噴，並刪除這一點', 'A printing error: change it to 2 puffs once daily and drop this point', 'พิมพ์ผิด: แก้เป็นวันละครั้ง 2 พ่น และเอาประเด็นนี้ออก'))],
  'refs': ['spiolto', 'spiolto_tw']},
 {'code': 'D3', 'grp': 'D', 'fig': 'f9_receipt.png', 't': T('Royamet 200 mg 是 cimetidine 嗎？', 'Is Royamet 200 mg cimetidine?', 'Royamet 200 mg คือ cimetidine ใช่ไหม'),
  'info': [[GM, T('視為 cimetidine → 與 Famo（famotidine）重複使用 H2 阻斷劑（P18）。', 'Treated as cimetidine → a duplicate H2 blocker with Famo (famotidine) (P18).', 'ถือเป็น cimetidine → H2 blocker ซ้ำกับ Famo (P18)')],
           [FD, T('台灣藥品許可證：皇胃佳膠衣錠 ROYAMET F.C. TABLETS (CIMETIDINE)，含量 200。', 'Taiwan drug licence: ROYAMET F.C. TABLETS (CIMETIDINE), strength 200.', 'ทะเบียนยาไต้หวัน: ROYAMET = cimetidine 200')]],
  'opts': [o('yes', T('是', 'Yes', 'ใช่'), cur=True), o('no', T('不是，正確成分：', 'No, it is:', 'ไม่ใช่ ตัวยาที่ถูกคือ'), inp=True)], 'refs': ['royamet']},
 {'code': 'D4', 'grp': 'D', 'fig': 'f9_receipt.png', 't': T('Kudona（自費）是 glucosamine 嗎？', 'Is Kudona (self-paid) glucosamine?', 'Kudona (จ่ายเอง) คือ glucosamine ใช่ไหม'),
  'info': [[GM, T('視為 glucosamine sulfate，自費保健食品（P9）。', 'Treated as glucosamine sulfate, a self-paid supplement (P9).', 'ถือเป็น glucosamine sulfate อาหารเสริมจ่ายเงินเอง (P9)')],
           [FD, T('骨多能膠囊 KUDONA CAPSULES 250 mg，成分為結晶型硫酸鹽葡萄糖胺。', 'KUDONA CAPSULES 250 mg: crystalline glucosamine sulfate.', 'KUDONA 250 มก. คือ glucosamine sulfate')]],
  'opts': [o('yes', T('是', 'Yes', 'ใช่'), cur=True), o('no', T('不是，正確成分：', 'No, it is:', 'ไม่ใช่ ตัวยาที่ถูกคือ'), inp=True)], 'refs': ['kudona']},
 {'code': 'D5', 'grp': 'D', 'fig': 'f10_cr.png', 't': T('Cr 0.5 是真實數值還是打錯？', 'Is the Cr of 0.5 real or a typo?', 'Cr 0.5 เป็นค่าจริงหรือพิมพ์ผิด'),
  'info': [[AG, T('Cr 1.0（2021/11/20）→ 0.5（2022/01/20）→ 0.8（2022/4/22）。', 'Cr 1.0 (2021/11/20) → 0.5 (2022/01/20) → 0.8 (2022/4/22).', 'Cr 1.0 → 0.5 → 0.8')],
           [GM, T('用 0.8 計算：CrCl ≈ 56、eGFR ≈ 85（P13：famotidine 20 mg 每日 2 次劑量過高）。', '0.8 is used: CrCl ≈ 56, eGFR ≈ 85 (P13: famotidine 20 mg twice daily is too high).', 'ใช้ 0.8 คำนวณ CrCl ≈ 56, eGFR ≈ 85 (P13: famotidine เกินขนาด)')]],
  'opts': [o('real', T('真實數值，保留', 'A real value; keep it', 'ค่าจริง คงไว้'), cur=True), o('typo', T('打字錯誤，改為：', 'A typo; change it to:', 'พิมพ์ผิด แก้เป็น'), inp=True)]},
 {'code': 'D6', 'grp': 'D', 'fig': 'f11_minor.png', 't': T('藥袋上的小錯誤要修正嗎？', 'Should the small errors on the bags be fixed?', 'แก้จุดเล็กๆ บนซองไหม'),
  'info': [[AG, T('Berotec「總領藥量 11 粒」（吸入劑用「粒」）；胸腔內科多個藥袋的「注意事項」編號是 4–6、7–9、10–12、13–15，不是 1–3。', 'Berotec says "total dispensed 11 tablets" (tablets, for an inhaler); several chest-clinic bags number their notes 4–6, 7–9, 10–12, 13–15 instead of 1–3.', 'Berotec จ่าย "11 เม็ด" (หน่วยไม่เข้ากับยาพ่น) · หลายซองเลขข้อหมายเหตุเป็น 4–6, 7–9, 10–12, 13–15 แทน 1–3')],
           [GM, T('照原圖使用，不影響答案。', 'Used as printed; no effect on the answers.', 'ใช้ตามรูป ไม่กระทบเฉลย')]],
  'opts': [o('fix', T('修正（11 粒 → 1 支；編號改回 1–3）', 'Fix them (11 tablets → 1 inhaler; numbering back to 1–3)', 'แก้ (11 เม็ด → 1 หลอด; เลขข้อเป็น 1–3)')), o('keep', T('保留原樣', 'Leave as printed', 'คงไว้ตามเดิม'), cur=True)]},
 {'code': 'D7', 'grp': 'D', 'fig': 'f12_fixed.png', 't': T('已經修改的圖片，請確認', 'Images we have already corrected — please confirm', 'รูปที่แก้ไปแล้ว ขอให้ยืนยัน'),
  'info': [[T('已修改', 'Already changed', 'ที่แก้แล้ว'), T('Case D 藥袋年齡 85 → 88；Dermalin 品項數「3-1」（與 Benamine 重複）→「3-3」；三個案例檢驗報告的 TG／TC 參考值對調更正（TG 35–160、TC 140–200）。',
            'Case D bag ages 85 → 88; Dermalin item number "3-1" (same as Benamine) → "3-3"; the TG/TC reference ranges on the lab sheets of all three cases swapped back (TG 35–160, TC 140–200).',
            'Case D อายุบนซอง 85 → 88 · Dermalin เลขรายการ 3-1 → 3-3 · ค่าอ้างอิง TG/TC บนใบแล็บทั้ง 3 เคสสลับกลับให้ถูก')]],
  'opts': [o('agree', T('同意', 'Agree', 'เห็นด้วย')), o('disagree', T('不同意（請在備註說明）', 'Disagree (please explain in the notes)', 'ไม่เห็นด้วย (เขียนในหมายเหตุ)'))]},
 # ---- licence & credits (the About card in the game) ----
 {'code': 'L1', 'grp': 'L', 'fig': 'f13_license.png', 't': T('案例內容可以用 CC BY-NC-SA 4.0 公開分享嗎？', 'May the case content be shared openly under CC BY-NC-SA 4.0?', 'เนื้อหาเคสเปิดให้ใช้ภายใต้ CC BY-NC-SA 4.0 ได้ไหม'),
  'info': [[GM, T('遊戲首頁右下角有一行署名（圖 ①），點開是「關於與授權」卡片（圖 ②）。目前整個遊戲，包括老師提供的案例內容，都標示為 CC BY-NC-SA 4.0。',
                  'A credits line sits at the bottom right of the game\'s title screen (picture ①); it opens the "About & licence" card (picture ②). Right now the whole game, including the case content you provided, is marked CC BY-NC-SA 4.0.',
                  'มีบรรทัดเครดิตมุมขวาล่างของหน้าแรกเกม (รูป ①) กดแล้วเปิดการ์ด "เกี่ยวกับและสัญญาอนุญาต" (รูป ②) ตอนนี้ทั้งเกม รวมเนื้อหาเคสของอาจารย์ ติดป้าย CC BY-NC-SA 4.0')],
           [T('CC BY-NC-SA 是什麼？', 'What is CC BY-NC-SA?', 'CC BY-NC-SA คืออะไร'),
            T('這是「創用 CC」公開授權的一種：作者事先公開說明別人可以怎麼使用作品，別人就不必每次都來詢問。<br>'
              '• <b>CC</b>：創用 CC（Creative Commons）授權<br>'
              '• <b>BY 姓名標示</b>：使用時必須寫出作者和案例來源（老師的名字）<br>'
              '• <b>NC 非商業性</b>：不可以用來賺錢，例如收費課程、出版販售<br>'
              '• <b>SA 相同方式分享</b>：修改後的版本也必須用同樣的授權公開<br>'
              '簡單說：其他學校的老師或學生可以免費使用、修改這個遊戲來教學，但一定要標示出處，而且不能商用。',
              'It is one of the Creative Commons public licences: the author states up front how others may use the work, so they do not have to ask each time.<br>'
              '• <b>CC</b>: a Creative Commons licence<br>'
              '• <b>BY (Attribution)</b>: anyone using it must name the author and the source of the cases (your name)<br>'
              '• <b>NC (NonCommercial)</b>: it may not be used to make money, such as paid courses or selling it<br>'
              '• <b>SA (ShareAlike)</b>: modified versions must be shared under the same licence<br>'
              'In short: teachers and students elsewhere may use and adapt the game for teaching free of charge, but must credit the source and may not use it commercially.',
              'เป็นสัญญาอนุญาตแบบเปิดของครีเอทีฟคอมมอนส์ ผู้สร้างประกาศไว้ก่อนว่าคนอื่นใช้งานได้แค่ไหน คนอื่นจึงไม่ต้องมาขออนุญาตทุกครั้ง<br>'
              '• <b>CC</b>: สัญญาอนุญาตครีเอทีฟคอมมอนส์<br>'
              '• <b>BY (แสดงที่มา)</b>: ผู้ใช้ต้องระบุชื่อผู้สร้างและที่มาของเคส (ชื่ออาจารย์)<br>'
              '• <b>NC (ไม่ใช้เพื่อการค้า)</b>: ห้ามใช้หารายได้ เช่น คอร์สที่เก็บเงิน หรือนำไปขาย<br>'
              '• <b>SA (อนุญาตแบบเดียวกัน)</b>: ฉบับที่ดัดแปลงต้องเปิดด้วยสัญญาอนุญาตเดียวกัน<br>'
              'สรุปคือ อาจารย์หรือนักศึกษาที่อื่นนำเกมไปใช้หรือดัดแปลงเพื่อการสอนได้ฟรี แต่ต้องให้เครดิตและห้ามใช้เชิงการค้า')],
           [T('需要注意', 'Worth knowing', 'ข้อควรรู้'),
            T('CC 授權不能撤回：已經依授權取得遊戲的人可以繼續使用。若選擇保留案例的權利，別人要使用案例必須先取得老師同意。',
              'A CC licence cannot be withdrawn: anyone who already has the game under it may keep using it. If you keep the rights to the cases, others must ask your permission before using them.',
              'สัญญาอนุญาต CC ถอนคืนไม่ได้ คนที่ได้เกมไปแล้วภายใต้สัญญานี้ใช้ต่อได้ ถ้าเลือกสงวนสิทธิ์เนื้อหาเคส คนอื่นต้องขออนุญาตอาจารย์ก่อนใช้')]],
  'opts': [o('open', T('同意：整個遊戲（包括案例）都用 CC BY-NC-SA 4.0', 'Agree: the whole game, cases included, under CC BY-NC-SA 4.0', 'เห็นด้วย: ทั้งเกมรวมเคส ใช้ CC BY-NC-SA 4.0'), cur=True),
           o('keep', T('遊戲用 CC BY-NC-SA 4.0，但案例內容保留權利（別人使用前需經老師同意）', 'The game under CC BY-NC-SA 4.0, but keep the rights to the case content (others need your permission)', 'ตัวเกมใช้ CC BY-NC-SA 4.0 แต่สงวนสิทธิ์เนื้อหาเคส (คนอื่นต้องขออนุญาตอาจารย์)')),
           o('none', T('先不要公開授權，只寫「僅供本課程教學使用」', 'No open licence for now; just "for teaching in this course only"', 'ยังไม่เปิดสัญญาอนุญาต เขียนแค่ "ใช้สอนในวิชานี้เท่านั้น"'))],
  'refs': ['cc_deed']},
 {'code': 'L2', 'grp': 'L', 'fig': 'f13_license.png', 't': T('遊戲裡要怎麼列出老師？', 'How should you be listed in the game?', 'จะใส่ชื่ออาจารย์ในเกมแบบไหน'),
  'info': [[GM, T('目前寫「陳崇鈺 教授（Prof. Chung-Yu Chen），高雄醫學大學 藥學系」，沒有老師的聯絡方式；「聯絡」只放製作者的 Email。',
                  'It now says "Prof. Chung-Yu Chen (陳崇鈺), School of Pharmacy, Kaohsiung Medical University", with no contact details for you; "Contact" lists only the developer\'s e-mail.',
                  'ตอนนี้เขียนว่า "Prof. Chung-Yu Chen (陳崇鈺) School of Pharmacy, Kaohsiung Medical University" ไม่มีช่องทางติดต่ออาจารย์ ช่อง "ติดต่อ" มีแค่อีเมลผู้สร้าง')],
           [T('說明', 'Note', 'หมายเหตุ'), T('遊戲放在公開網站上，列出老師的 Email 可能會收到外界的詢問或垃圾郵件；也可以改成連結到老師在學校網站的個人頁面。',
                  'The game is on a public website, so listing your e-mail may bring outside enquiries or spam. Linking your name to your university profile page is another option.',
                  'เกมอยู่บนเว็บสาธารณะ ถ้าใส่อีเมลอาจารย์อาจมีคนนอกติดต่อมาหรือมีสแปม อีกทางคือลิงก์ชื่อไปหน้าประวัติอาจารย์บนเว็บมหาวิทยาลัย')]],
  'opts': [o('name', T('只寫姓名與單位', 'Name and department only', 'แค่ชื่อและสังกัด'), cur=True),
           o('page', T('姓名連結到老師在高醫藥學系網站的個人頁面', 'Name linked to your profile page on the KMU School of Pharmacy website', 'ชื่อลิงก์ไปหน้าประวัติอาจารย์บนเว็บคณะเภสัชฯ KMU')),
           o('email', T('另外列出老師的 Email：', 'Also list your e-mail:', 'ใส่อีเมลอาจารย์ด้วย:'), inp=True)]},
 {'code': 'L3', 'grp': 'L', 'fig': 'f13_license.png', 't': T('署名中的職稱、英文姓名和團隊名稱正確嗎？', 'Are the title, English name and team name correct?', 'ตำแหน่ง ชื่ออังกฤษ และชื่อทีม ถูกต้องไหม'),
  'info': [[GM, T('「陳崇鈺 教授」／「Prof. Chung-Yu Chen」；所屬單位：「高雄醫學大學 藥學系 陳崇鈺教授研究團隊」',
                  '"陳崇鈺 教授" / "Prof. Chung-Yu Chen"; affiliation: "Prof. Chung-Yu Chen\'s research team, School of Pharmacy, Kaohsiung Medical University"',
                  '"陳崇鈺 教授" / "Prof. Chung-Yu Chen" · สังกัด: "ทีมวิจัยของ Prof. Chung-Yu Chen, School of Pharmacy, Kaohsiung Medical University"')],
           [FD, T('英文姓名依照高醫藥學系網站上的老師英文簡歷；我們找到的簡歷版本較舊，職稱可能已經不同。',
                  'The English name follows your English CV on the KMU School of Pharmacy website; the version we found is older, so the title may have changed.',
                  'ชื่ออังกฤษอิงตามประวัติภาษาอังกฤษบนเว็บคณะ ฉบับที่เจอเป็นฉบับเก่า ตำแหน่งอาจเปลี่ยนแล้ว')]],
  'opts': [o('ok', T('正確', 'Correct', 'ถูกต้อง'), cur=True),
           o('fix', T('請更正：', 'Please correct:', 'ขอแก้เป็น:'), inp=True)],
  'refs': ['kmu_cv']},
]
E = [
 {'id': 'e1', 'c': 'A', 't': T('CrCl 用實際體重 90 kg（BMI ≈ 30）算出 34.1，再問學生用實際體重會不會高估（調整體重後 ≈ 29.2）', 'CrCl uses the actual weight of 90 kg (BMI ≈ 30) to get 34.1, then asks students whether actual weight overestimates it (≈ 29.2 with adjusted weight)', 'CrCl ใช้น้ำหนักจริง 90 กก. ได้ 34.1 แล้วถามว่าประเมินสูงเกินไหม (น้ำหนักปรับ ≈ 29.2)'), 'refs': ['crcl']},
 {'id': 'e2', 'c': 'A', 't': T('Pseudoephedrine 每日上限以 240 mg 計算', 'The pseudoephedrine maximum is taken as 240 mg/day', 'ใช้ขีดสูงสุด pseudoephedrine 240 มก./วัน'), 'refs': ['pse']},
 {'id': 'e3', 'c': 'C', 't': T('一月因低血糖跌倒（同事的便條）；身高 162 → 158 cm，懷疑脊椎壓迫性骨折；Fosamax 配三合一咖啡後躺回床上；藥盒週三到週五沒吃；骨科醫師請她先看牙', 'Fell in January from low blood sugar (a co-worker\'s note); height 162 → 158 cm, suspected vertebral fracture; takes Fosamax with 3-in-1 coffee and lies back down; pill box Wed–Fri untouched; the orthopaedist asked her to see a dentist first', 'หกล้มเพราะน้ำตาลต่ำ · ส่วนสูง 162 → 158 · กิน Fosamax กับกาแฟแล้วนอนต่อ · กล่องยาพุธ–ศุกร์เต็ม · หมอให้ตรวจฟันก่อน')},
 {'id': 'e4', 'c': 'C', 't': T('低血糖處理：測 58 → 葡萄糖錠 15–20 g → 等 15 分鐘 → 再測 94 → 吃蘇打餅乾；因為服用 acarbose，給糖果或柳橙汁算錯', 'Low blood sugar care: check 58 → glucose tablets 15–20 g → wait 15 min → recheck 94 → crackers; candy or orange juice is marked wrong because she takes acarbose', 'แก้น้ำตาลต่ำ: วัด 58 → กลูโคส 15–20 ก. → รอ 15 นาที → วัด 94 → ขนมปังกรอบ (ลูกอม/น้ำส้มผิดเพราะกิน acarbose)'), 'refs': ['hypo', 'acarbose']},
 {'id': 'e5', 'c': 'C', 't': T('Fosamax 服藥後 30 分鐘：不可以躺回床、喝咖啡、吃包子、吃其他藥；可以再喝白開水、坐著看電視、澆花', '30 minutes after Fosamax: no lying down, coffee, steamed bun or other medicines; allowed: more plain water, sitting watching TV, watering plants', '30 นาทีหลังกิน Fosamax: ห้ามนอน กาแฟ ซาลาเปา ยาอื่น · ได้: น้ำเปล่า นั่งดูทีวี รดน้ำต้นไม้'), 'refs': ['fosa_use']},
 {'id': 'e6', 'c': 'D', 't': T('秘密 P8：太太值夜班那天沒人提醒，早上的藥忘了吃，晚上把早晚的藥一起吃（glipizide 兩倍），在公共浴室跌倒', 'Secret P8: on days his wife works nights nobody reminds him, so he misses the morning dose, takes morning and evening doses together at night (double glipizide), and fell in the shared bathroom', 'ความลับ P8: ลืมยาเช้าแล้วกินรวมตอนกลางคืน (glipizide สองเท่า) ล้มในห้องน้ำรวม')},
 {'id': 'e7', 'c': 'D', 't': T('吸入劑步驟：Berotec MDI 8 個步驟；吸藥輔助器在 5 秒內吸入；Respimat 轉–開–壓 2 噴（第 2 噴要先關蓋再轉）', 'Inhaler steps: Berotec MDI in 8 steps; with a spacer, inhale within 5 seconds; Respimat turn–open–press, 2 puffs (close the cap and turn again before the 2nd puff)', 'ขั้นตอนยาพ่น: MDI 8 ขั้น · spacer สูดภายใน 5 วินาที · Respimat หมุน–เปิด–กด 2 พัฟ'), 'refs': ['mdi', 'spiolto_tw']},
 {'id': 'e8', 'c': 'D', 't': T('抗膽鹼負擔分類依 ACB scale 與 Beers；Clarinase、Famo、Sketa、Sinbaby 兩種答案都接受', 'Anticholinergic sorting follows the ACB scale and Beers; Clarinase, Famo, Sketa and Sinbaby accept either answer', 'จัดกลุ่ม anticholinergic ตาม ACB + Beers · 4 ตัวรับได้สองคำตอบ'), 'refs': ['acb', 'beers']},
]
F = [{'id': 'add', 't': T('想新增', 'To add', 'อยากเพิ่ม'), 'eg': T('例如：新的問題、情節、活動', 'e.g. new problems, story details, activities', 'เช่น ปัญหา เนื้อเรื่อง หรือกิจกรรมใหม่')},
     {'id': 'adjust', 't': T('想調整', 'To adjust', 'อยากปรับ'), 'eg': T('例如：難度、時間、提示、計分', 'e.g. difficulty, timing, hints, scoring', 'เช่น ความยาก เวลา คำใบ้ การให้คะแนน')},
     {'id': 'fix', 't': T('需要修改', 'To fix', 'ต้องแก้'), 'eg': T('例如：文字、答案、藥袋或檢驗資料', 'e.g. wording, answers, bag or lab data', 'เช่น ข้อความ เฉลย ข้อมูลบนซองหรือผลแล็บ')}]

DATA = json.dumps({'Q': Q, 'E': E, 'F': F, 'REF': REF, 'AGE': AGE}, ensure_ascii=False)
html = open(SP + '/review_tpl.html', encoding='utf-8').read().replace('/*__DATA__*/null', DATA)
os.makedirs(SP + '/review', exist_ok=True)
open(SP + '/review/index.html', 'w', encoding='utf-8').write(html)
print('review/index.html', len(html))
