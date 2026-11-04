/* times are saved in UTC (ISO, 'Z'); show them in this device's own time zone */
function localTS(s){ if(!s) return ''; const d=new Date(s); if(isNaN(d)) return String(s).replace('T',' ').slice(0,16); const p=n=>String(n).padStart(2,'0'); return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`; }
/* =====================================================================
   TEACHER PAGE v2 — six plain-language tabs for instructors:
   🏠 Start · 👥 Students · 📊 Class overview · 📋 Debrief · ✏️ Customise · 🧰 Advanced
   The older panels (editors, sync, stats) are reused; this module re-routes and re-presents them.
   A case can add its own lines through CASE_TEACH = {prepExtra:[[zh,en,th]], handsQ:[[zh,en,th]]}.
   ===================================================================== */
const TT={
 allCases:['🗂 所有案例','🗂 All cases','🗂 ทุกเคส'],
 tHome:['🏠 開始','🏠 Start','🏠 เริ่มต้น'], tSessions:['👥 每位學生','👥 Students','👥 ผลรายคน'], tClass:['📊 全班概況','📊 Class overview','📊 ภาพรวมทั้งห้อง'],
 tCustom:['✏️ 調整遊戲','✏️ Customise','✏️ ปรับเกม'], tAdv:['🧰 進階','🧰 Advanced','🧰 ขั้นสูง'],
 /* start */
 hHello:['老師好！這一頁照 ①②③ 的順序用就可以。','Welcome! Use this page in the order ① ② ③.','ยินดีต้อนรับ ใช้หน้านี้ตามลำดับ ① ② ③ ได้เลย'],
 hCase:['🚦 這個個案現在','🚦 This case right now','🚦 สถานะเคสนี้'],
 hCaseNote:['關閉時，學生打開連結會看到「還沒開放」；正在玩的人可以玩完。對所有班級的連結都有效。','While closed, students who open the link see "not open yet"; anyone already playing can finish. Applies to every class link.','ถ้าปิด นักศึกษาที่เปิดลิงก์จะเห็นข้อความ "ยังไม่เปิด" ส่วนคนที่กำลังเล่นอยู่เล่นต่อจนจบได้ มีผลกับลิงก์ทุกห้อง'],
 h1:['① 把連結傳給學生','① Send students the link','① ส่งลิงก์ให้นักศึกษา'],
 h1Note:['每一班取一個代號（例如 ph2026a）。學生從這個連結玩，結果就會自動分到那一班。不想分班也可以留空。','Give each class a code (for example ph2026a). Students who play from that link are grouped under it automatically. Leave it empty if you do not need groups.','ตั้งรหัสห้องให้แต่ละกลุ่ม (เช่น ph2026a) นักศึกษาที่เล่นจากลิงก์นั้นจะถูกจัดเข้าห้องนั้นเอง ถ้าไม่ต้องแยกห้อง เว้นว่างได้'],
 hCode:['班級代號','Class code','รหัสห้อง'], hKnown:['已經有結果的班級','Classes with results','ห้องที่มีผลแล้ว'],
 h2:['② 看結果','② See the results','② ดูผล'],
 hAuto:['每次打開老師頁都會自動載入一次。','Results load by themselves each time you open this page.','ทุกครั้งที่เปิดหน้าอาจารย์ ระบบจะโหลดผลให้เองหนึ่งครั้ง'],
 hLast:['最後更新','Last updated','อัปเดตล่าสุด'], hPull:['🔄 載入最新結果','🔄 Get the latest results','🔄 โหลดผลล่าสุด'],
 nStud:['位學生','students','นักศึกษา'], nDone:['玩完','finished','เล่นจบ'], nPlaying:['還在玩','still playing','ยังเล่นไม่จบ'],
 goStudents:['👥 看每位學生','👥 Each student','👥 ดูผลรายคน'], goClass:['📊 看全班概況','📊 Class overview','📊 ดูภาพรวมทั้งห้อง'],
 h3:['③ 課後討論','③ Talk it through afterwards','③ คุยกับนักศึกษาหลังเล่น'],
 h3Note:['「課後討論」有提問順序、這一班的數據和解答，可以列印成一頁。','The Debrief guide has the question order, this class\'s data and the answer key — it prints on one page.','หน้า "คู่มือ Debrief" มีลำดับคำถาม ข้อมูลของห้องนี้ และเฉลย พิมพ์ได้ในหน้าเดียว'],
 goDebrief:['📋 打開課後討論指引','📋 Open the Debrief guide','📋 เปิดคู่มือ Debrief'],
 hMode:['學生玩的模式','Mode students play','โหมดที่นักศึกษาเล่น'], change:['更改','Change','เปลี่ยน'],
 kH:['🔑 先輸入「收結果密碼」','🔑 First, enter the results key','🔑 ใส่ "รหัสรับผล" ก่อน'],
 kBadH:['🔑 存著的收結果密碼不能用了','🔑 The saved results key no longer works','🔑 รหัสรับผลที่บันทึกไว้ใช้ไม่ได้แล้ว'],
 kBadNote:['如果剛在 Cloudflare 換了密碼，在這裡輸入新的密碼；每台電腦都要換一次。學生不受影響。','If the key was just changed in Cloudflare, enter the new one here; do this once on each computer. Students are not affected.','ถ้าเพิ่งเปลี่ยนรหัสใน Cloudflare ให้ใส่รหัสใหม่ที่นี่ ทำครั้งเดียวต่อเครื่อง นักศึกษาไม่ได้รับผลกระทบ'],
 kNote:['向設定系統的人索取，每台電腦輸入一次就好。這不是進老師頁的密碼，也不要給學生。','Ask whoever set up the system; enter it once on each computer. It is not the code for this page, and students must never have it.','ขอจากผู้ดูแลระบบ ใส่ครั้งเดียวต่อเครื่อง รหัสนี้ไม่ใช่รหัสเข้าหน้าอาจารย์ และห้ามให้นักศึกษา'],
 offNote:['這份遊戲沒有連到結果伺服器，結果只會留在每位學生自己的裝置上。','This copy is not connected to the results server, so results stay on each student\'s own device.','เกมชุดนี้ไม่ได้เชื่อมกับระบบรับผล ผลจึงอยู่ในเครื่องของนักศึกษาแต่ละคนเท่านั้น'],
 /* students */
 sIntro:['點一位學生看細節。可以用姓名或學號搜尋。','Click a student to see the details. Search by name or student ID.','คลิกที่ชื่อเพื่อดูรายละเอียด ค้นหาด้วยชื่อหรือรหัสนักศึกษาได้'],
 sSearch:['🔍 姓名或學號','🔍 Name or student ID','🔍 ชื่อหรือรหัสนักศึกษา'], sCount:['共 {n} 位','{n} students','{n} คน'],
 stAll:['全部','Everyone','ทุกคน'], stDone:['玩完的','Finished','เล่นจบแล้ว'], stPlay:['還在玩的','Still playing','ยังเล่นไม่จบ'],
 sortNew:['最新的在前','Newest first','ล่าสุดก่อน'], sortScore:['分數高的在前','Highest score first','คะแนนมากก่อน'], sortName:['依姓名','By name','เรียงตามชื่อ'],
 sNone:['還沒有學生的結果。到「🏠 開始」按「🔄 載入最新結果」，或確認學生已經開始玩。','No student results yet. Press 🔄 Get the latest results on 🏠 Start, or check that students have started.','ยังไม่มีผลของนักศึกษา กด 🔄 โหลดผลล่าสุด ที่แท็บ 🏠 เริ่มต้น หรือตรวจว่านักศึกษาเริ่มเล่นแล้ว'],
 done:['✅ 玩完','✅ Finished','✅ เล่นจบ'], playing:['⏳ 玩到 {p}%','⏳ {p}% through','⏳ เล่นถึง {p}%'],
 rank:['評價','Rank','ระดับ'], score:['分數','Score','คะแนน'], found:['找到的問題','Problems found','ปัญหาที่หาเจอ'], time:['實際時間','Real time','เวลาเล่นจริง'],
 hints:['用了提示','Hints used','ใช้คำใบ้'], ending:['結局','Ending','ตอนจบ'], hands:['🖐️ 動手做','🖐️ Hands-on','🖐️ ลงมือทำ'], calcs:['🧮 計算','🧮 Calculations','🧮 คำนวณ'],
 more:['看細節','Details','ดูรายละเอียด'],
 dFound:['🔎 找到的問題（找到的時間）','🔎 Problems found (when)','🔎 ปัญหาที่หาเจอ (เวลาที่เจอ)'], dCh:['⏱ 每一章花的時間','⏱ Time per chapter','⏱ เวลาที่ใช้แต่ละบท'],
 dHands:['🖐️ 動手做和計算','🖐️ Hands-on and calculations','🖐️ กิจกรรมลงมือทำและการคำนวณ'], ok:['做對了','correct','ถูกต้อง'], tries:['第 {n} 次才對','right on try {n}','ถูกในครั้งที่ {n}'], wrongC:['沒有做對','not correct','ยังไม่ถูก'],
 dMemo:['📝 學生自己的筆記','📝 The student\'s own notes','📝 บันทึกของนักศึกษา'], dRaw:['🔧 完整紀錄（給技術人員）','🔧 Full log (for technical staff)','🔧 บันทึกละเอียดทั้งหมด (สำหรับเจ้าหน้าที่เทคนิค)'],
 dDel:['🗑️ 刪除這位學生的結果','🗑️ Delete this student\'s result','🗑️ ลบผลของนักศึกษาคนนี้'],
 dDelQ:['確定刪除「{n}」的結果？伺服器上的也會一起刪除，無法復原。','Delete the result of "{n}"? The copy on the server is deleted too and cannot be recovered.','ลบผลของ "{n}"? สำเนาบนระบบรับผลจะถูกลบด้วย และกู้คืนไม่ได้'],
 chN:['第 {n} 章','Ch. {n}','บท {n}'], ch0:['序章','Prologue','บทนำ'],
 /* class */
 cIntro:['全班的整理。綠色長條＝大部分學生做對；紅色短條＝很適合拿來課後討論。','The whole class at a glance. Long green bars = most students got it; short red bars = good topics for the debrief.','สรุปทั้งห้องในหน้าเดียว แถบเขียวยาว = นักศึกษาส่วนใหญ่ทำได้ · แถบแดงสั้น = ประเด็นที่ควรคุยตอน debrief'],
 cVer:['遊戲版本','Game version','เวอร์ชันของเกม'],
 cTop:['🎯 最該先討論的 5 件事','🎯 Five things to discuss first','🎯 5 เรื่องที่ควรคุยก่อน'],
 cProb:['🔎 每個問題有多少人找到','🔎 How many students found each problem','🔎 ปัญหาแต่ละข้อมีนักศึกษาหาเจอกี่คน'],
 cHands:['🖐️ 動手做和計算','🖐️ Hands-on and calculations','🖐️ กิจกรรมลงมือทำและการคำนวณ'],
 cHandsNote:['計算題算「第一次就算對」；動手做算「整個過程沒有出錯」。','Calculations count "right on the first try"; hands-on counts "no mistakes at all".','โจทย์คำนวณนับ "ถูกตั้งแต่ครั้งแรก" · กิจกรรมลงมือทำนับ "ไม่มีข้อผิดพลาดเลย"'],
 cMist:['常見的錯誤','Common mistakes','ข้อผิดพลาดที่พบบ่อย'], cInterp:['判讀','Interpretation','การแปลผล'], cHintsAvg:['平均用了幾次提示','Average hints used','ใช้คำใบ้เฉลี่ย'],
 cMore:['更多細節（證物對決、第一步、結局、追問）','More detail (evidence duel, first move, endings, follow-ups)','รายละเอียดเพิ่มเติม (จับโกหก ก้าวแรก ตอนจบ คำถามต่อ)'],
 cCsv:['⬇️ 下載成 Excel 表格（CSV）','⬇️ Download as an Excel table (CSV)','⬇️ ดาวน์โหลดเป็นตาราง Excel (CSV)'],
 calcFirst:['第一次就算對','right first time','ถูกตั้งแต่ครั้งแรก'],
 /* debrief */
 dbFlow:['🗓️ 一堂課怎麼用','🗓️ How to run the session','🗓️ ลำดับการใช้ในคาบ'],
 dbBefore:['上課前','Before class','ก่อนเรียน'], dbDuring:['學生玩的時候（45–60 分鐘）','While they play (45–60 min)','ระหว่างนักศึกษาเล่น (45–60 นาที)'], dbAfter:['玩完之後（20–30 分鐘）','Afterwards (20–30 min)','หลังเล่น (20–30 นาที)'],
 prep:[['想調整遊戲（時間、題目、文字），到「✏️ 調整遊戲」改好後按「📤 傳給學生」；不改也可以直接用。','To adjust the game (time, questions, wording), make the changes in ✏️ Customise and press 📤 Send to students — or use it as it is.','ถ้าอยากปรับเกม (เวลา คำถาม ข้อความ) แก้ที่ ✏️ ปรับเกม แล้วกด 📤 ส่งให้นักศึกษา หรือใช้ตามเดิมเลยก็ได้'],
   ['在「🏠 開始」確認個案是開放的，把班級連結傳給學生。','On 🏠 Start, check that the case is open and send students the class link.','ที่ 🏠 เริ่มต้น ตรวจว่าเปิดเคสอยู่ แล้วส่งลิงก์ของห้องให้นักศึกษา'],
   ['前測、後測和反思題已經內建；想修改就到「✏️ 調整遊戲 → ➕ 自己的題目」。','Pre-test, post-test and reflection questions are built in; to change them go to ✏️ Customise → ➕ Your questions.','มีแบบทดสอบก่อน/หลังเรียนและคำถามสะท้อนคิดในตัว ถ้าจะแก้ ไปที่ ✏️ ปรับเกม → ➕ คำถามของอาจารย์']],
 during:[['每人用自己的電腦或手機玩，結果會自動傳給你。','Each student plays on their own computer or phone and results reach you automatically.','นักศึกษาเล่นคนละเครื่อง (คอมหรือมือถือ) ผลส่งถึงอาจารย์อัตโนมัติ'],
   ['動手做活動有「💡 提示」按鈕，用了幾次會記在結果裡。','The hands-on activities have a 💡 Hint button; how often it was used is recorded.','กิจกรรมลงมือทำมีปุ่ม "💡 คำใบ้" ระบบบันทึกว่าใช้ไปกี่ครั้ง'],
   ['想看進度就到「🏠 開始」按「🔄 載入最新結果」。','To check progress, press 🔄 Get the latest results on 🏠 Start.','อยากดูความคืบหน้า กด 🔄 โหลดผลล่าสุด ที่แท็บ 🏠 เริ่มต้น']],
 after:[['先看下面「這一班的資料」，從 2–3 個最多人漏掉的地方開始。','Look at "This class" below and start from the 2–3 points most students missed.','ดู "ข้อมูลของห้องนี้" ด้านล่าง แล้วเริ่มจาก 2–3 เรื่องที่พลาดกันมากที่สุด'],
   ['照 ① 蒐集 → ② 分析 → ③ 總結 的順序提問。','Ask in the order ① Gather → ② Analyze → ③ Summarize.','ถามตามลำดับ ① รวบรวม → ② วิเคราะห์ → ③ สรุป'],
   ['列印或存成 PDF：只會印出這份指引。','Print or save as PDF: only this guide is printed.','พิมพ์หรือบันทึกเป็น PDF ได้ จะพิมพ์เฉพาะคู่มือนี้']],
 dbHands:['🖐️ 動手做活動的討論','🖐️ Discussing the hands-on activities','🖐️ คุยเรื่องกิจกรรมลงมือทำ'], dbHandsRate:['動手做一次就全對','Hands-on with no mistakes','ลงมือทำถูกทั้งหมด'],
 /* customise */
 cuIntro:['在這裡調整遊戲。改完之後要按「📤 傳給學生」，學生的連結才會換成新版本。','Change the game here. Students get your changes only after you press 📤 Send to students.','ปรับเกมได้ที่นี่ แก้แล้วต้องกด "📤 ส่งให้นักศึกษา" ลิงก์ของนักศึกษาจึงจะเปลี่ยนเป็นเวอร์ชันใหม่'],
 suSet:['⚙️ 基本設定','⚙️ Basics','⚙️ ตั้งค่าพื้นฐาน'], suQ:['➕ 自己的題目','➕ Your questions','➕ คำถามของอาจารย์'], suTxt:['🔤 改遊戲裡的文字','🔤 Wording in the game','🔤 แก้ข้อความในเกม'], suImg:['🖼️ 圖片','🖼️ Pictures','🖼️ รูปภาพ'],
 puTry:['▶ 先自己試玩','▶ Try it yourself first','▶ ลองเล่นเองก่อน'], puSend:['📤 傳給學生','📤 Send to students','📤 ส่งให้นักศึกษา'], puTo:['傳給','Send to','ส่งให้'],
 puAll:['所有班級','All classes','ทุกห้อง'], puOne:['只有','Only','เฉพาะห้อง'], puOther:['其他班級代號…','Another class code…','รหัสห้องอื่น…'],
 puDirty:['⚠️ 有修改還沒傳給學生','⚠️ You have changes students cannot see yet','⚠️ มีการแก้ไขที่นักศึกษายังไม่เห็น'], puClean:['✅ 學生看到的就是這個版本','✅ Students see exactly this version','✅ นักศึกษาเห็นเวอร์ชันเดียวกับที่นี่แล้ว'],
 puNow:['學生目前的版本','What students have now','เวอร์ชันที่นักศึกษาใช้อยู่'], puOrig:['原版','the original','ต้นฉบับ'],
 puDone:['✅ 已經傳給學生了！他們重新打開連結就是新版本。','✅ Sent! Students get the new version the next time they open the link.','✅ ส่งแล้ว! นักศึกษาจะได้เวอร์ชันใหม่เมื่อเปิดลิงก์ครั้งถัดไป'],
 setModeNote:['練習：有提示和解說，可以慢慢學。考試：沒有提示、選項會打亂，結果可以拿來評分。「學生自己選」＝首頁讓學生選。','Practice: hints and explanations, good for learning. Exam: no hints, shuffled options, results suitable for grading. "Students choose" lets them pick on the title screen.','ฝึกซ้อม: มีคำใบ้และคำอธิบาย เหมาะกับการเรียนรู้ · สอบ: ไม่มีคำใบ้ สลับตัวเลือก ใช้ผลประเมินได้ · "ให้นักศึกษาเลือกเอง" = เลือกที่หน้าแรกของเกม'],
 setVisit:['家訪時間（分鐘，遊戲裡的時間）','Home-visit time (minutes of game time)','เวลาเยี่ยมบ้าน (นาที ตามเวลาในเกม)'], setHearts:['抓矛盾時的愛心數','Hearts in the contradiction duel','จำนวนหัวใจตอนจับโกหก'],
 setCharges:['搜查時放大鏡可以用幾次','Magnifier uses in the house search','จำนวนครั้งที่ใช้แว่นขยายตอนค้นบ้าน'], setQte:['一開始就開啟「限時選擇」','Timed choices switched on at the start','เปิด "ตัวเลือกจับเวลา" ไว้ตั้งแต่เริ่ม'],
 setLang:['學生第一次打開時的語言','Language when students first open the game','ภาษาที่ใช้ตอนนักศึกษาเปิดเกมครั้งแรก'], setNote:['給學生的一句話（顯示在首頁）','A note for students (shown on the title screen)','ข้อความถึงนักศึกษา (แสดงที่หน้าแรกของเกม)'],
 setDef:['原本','default','ค่าเดิม'], setGame:['遊戲難度','Difficulty','ความยากของเกม'],
 imgIntro:['可以換成真實的檢驗單和藥袋照片。上傳後記得按「📤 傳給學生」。','You can swap in real lab sheets and medicine-bag photos. After uploading, remember 📤 Send to students.','ใส่รูปใบแล็บหรือซองยาจริงแทนภาพในเกมได้ อัปโหลดแล้วอย่าลืมกด 📤 ส่งให้นักศึกษา'],
 /* advanced */
 aIntro:['平常用不到這一頁：收結果密碼、備份、刪除結果和老師密碼都在這裡。','You rarely need this page: the results key, backups, deleting results and the instructor code live here.','ปกติไม่ต้องใช้หน้านี้ เป็นที่รวมรหัสรับผล การสำรองผล การลบผล และรหัสเข้าหน้าอาจารย์'],
 aKey:['🔑 收結果密碼','🔑 Results key','🔑 รหัสรับผล'],
 aBackup:['💾 備份學生結果','💾 Back up student results','💾 สำรองผลของนักศึกษา'],
 aExpJ:['⬇️ 下載備份檔（.json）','⬇️ Download a backup file (.json)','⬇️ ดาวน์โหลดไฟล์สำรอง (.json)'], aExpC:['⬇️ 下載作答表（Excel／CSV）','⬇️ Download answers as a table (Excel / CSV)','⬇️ ดาวน์โหลดคำตอบเป็นตาราง (Excel / CSV)'],
 aImp:['⬆️ 打開學生交來的檔案（.json）','⬆️ Open files students sent you (.json)','⬆️ เปิดไฟล์ที่นักศึกษาส่งมา (.json)'], aClear:['🗑️ 清除這台電腦上的結果','🗑️ Clear the results on this computer','🗑️ ล้างผลที่เก็บในเครื่องนี้'],
 aBackupNote:['清除這台電腦不會影響伺服器上的結果。','Clearing this computer does not touch the results on the server.','การล้างผลในเครื่องนี้ไม่กระทบผลที่อยู่ในระบบรับผล'],
 aCls:['🏫 刪除整班的結果（伺服器上）','🏫 Delete a whole class\'s results (on the server)','🏫 ลบผลทั้งห้อง (ในระบบรับผล)'], aClsNone:['先在「🏠 開始」載入結果，這裡才會列出班級。','Load the results on 🏠 Start first; the classes are listed here afterwards.','โหลดผลที่แท็บ 🏠 เริ่มต้นก่อน รายชื่อห้องจึงจะแสดงที่นี่'],
 aOnline:['☁️ 目前傳給學生的版本','☁️ Versions students currently get','☁️ เวอร์ชันที่ส่งให้นักศึกษาอยู่'],
 aNone:['還沒有傳過，學生看到的是原版遊戲。','Nothing sent yet — students see the original game.','ยังไม่เคยส่ง นักศึกษาเห็นเกมต้นฉบับ'],
 aNeedKey:['輸入收結果密碼之後才看得到。','Enter the results key to see them.','ใส่รหัสรับผลก่อนจึงจะเห็นรายการ'],
 aReset:['↺ 清除還沒傳給學生的修改','↺ Discard changes not yet sent to students','↺ ล้างการแก้ไขที่ยังไม่ได้ส่งให้นักศึกษา'],
 aResetQ:['清除還沒傳給學生的修改，回到學生現在看到的版本？','Discard the changes you have not sent and go back to the version students see now?','ล้างการแก้ไขที่ยังไม่ได้ส่ง แล้วกลับไปใช้เวอร์ชันที่นักศึกษาเห็นอยู่ตอนนี้?'],
 aDl:['⬇️ 把這個版本下載成遊戲檔（.html）','⬇️ Download this version as a game file (.html)','⬇️ ดาวน์โหลดเกมเวอร์ชันนี้เป็นไฟล์ (.html)'],
 aExpChg:['⬇️ 把我的修改存成檔案','⬇️ Save my changes as a file','⬇️ บันทึกการแก้ไขของฉันเป็นไฟล์'], aImpChg:['⬆️ 載入別的老師的修改檔','⬆️ Load another instructor\'s changes file','⬆️ โหลดไฟล์การแก้ไขของอาจารย์ท่านอื่น'],
 aFileNote:['給沒有網路的教室用：把 .html 檔傳給學生，用瀏覽器打開就能玩（結果要用「下載我的報告」交回）。修改檔可以分享給其他老師。','For classrooms without internet: give students the .html file to open in a browser (they hand results back with "Download my report"). A changes file can be shared with other instructors.','สำหรับห้องที่ไม่มีอินเทอร์เน็ต: ส่งไฟล์ .html ให้นักศึกษาเปิดด้วยเบราว์เซอร์ (ส่งผลกลับด้วย "ดาวน์โหลดรายงาน") ส่วนไฟล์การแก้ไขแชร์ให้อาจารย์ท่านอื่นได้'],
 printTip:['列印時只會印出這份指引。','Printing outputs only this guide.','เมื่อพิมพ์ จะพิมพ์เฉพาะคู่มือนี้'],
 aFile:['📦 遊戲檔案（離線用）','📦 Game file (for offline use)','📦 ไฟล์เกม (สำหรับใช้แบบออฟไลน์)'],
 aConn:['🌐 連線和代號（通常不用改）','🌐 Connection and codes (usually leave as they are)','🌐 การเชื่อมต่อและรหัส (ปกติไม่ต้องแก้)'],
 aConnNote:['改了這一區要按「✏️ 調整遊戲」上方的「📤 傳給學生」才會生效。','Changes here take effect after 📤 Send to students (top of ✏️ Customise).','ถ้าแก้ส่วนนี้ ต้องกด 📤 ส่งให้นักศึกษา (ด้านบนของแท็บ ✏️ ปรับเกม) จึงจะมีผล'],
 aServer:['結果伺服器的網址','Results server address','ที่อยู่ระบบรับผล'], aPin:['進老師頁的密碼','Code to open this teacher page','รหัสเข้าหน้าอาจารย์'],
 aDefCls:['沒有班級代號時用的代號','Class code used when a link has none','รหัสห้องที่ใช้เมื่อลิงก์ไม่มีรหัสห้อง'],
 /* hands-on and calculation names */
 hk:{bmi:['BMI','BMI','BMI'], egfr:['eGFR','eGFR','eGFR'], crcl:['CrCl','CrCl','CrCl'], hypo:['🩸 低血糖急救','🩸 Hypo rescue','🩸 แก้น้ำตาลต่ำ'], height:['📏 量身高','📏 Measuring height','📏 วัดส่วนสูง'],
   fosa:['💊 週三早上的 Fosamax','💊 Wednesday Fosamax','💊 Fosamax เช้าวันพุธ'], acb:['🧠 抗膽鹼負擔分類','🧠 Anticholinergic sort','🧠 จัดกลุ่มยาต้านโคลิเนอร์จิก'],
   mdi:['🔵 Berotec 吸入器','🔵 Berotec inhaler','🔵 ยาพ่น Berotec'], spacer:['🫙 加上吸藥輔助器','🫙 With a spacer','🫙 ใช้กับกระบอกช่วยสูด'], resp:['🟢 Spiolto Respimat','🟢 Spiolto Respimat','🟢 Spiolto Respimat']},
};
const TX=k=>L(TT[k]);
const HANDS_KEYS=['hypo','height','fosa','acb'], INH_DEVS=['mdi','spacer','resp'], CALC_KEYS=['bmi','egfr','crcl'];
const caseTeach=()=>{ try{ return typeof CASE_TEACH!=='undefined'?CASE_TEACH:{}; }catch(e){ return {}; } };
/* readable text for a mistake key from any hands-on activity */
function errText(k){ const tabs=[]; try{ if(typeof HYPO_ERR!=='undefined') tabs.push(HYPO_ERR); }catch(e){} try{ if(typeof FOSA_ERR!=='undefined') tabs.push(FOSA_ERR); }catch(e){}
  try{ if(typeof HT_ERR!=='undefined') tabs.push(HT_ERR); }catch(e){} try{ if(typeof SIM_ERR!=='undefined') tabs.push(SIM_ERR); }catch(e){}
  for(const t of tabs) if(t[k]) return L(t[k]); return k; }
/* the first try of each inhaler device, per student */
const inhFirst=(s,dev)=>(s.log||[]).filter(e=>e.type==='inhSim'&&e.dev===dev)[0]||null;
const hintsOf=s=>{ let n=0; Object.values(s.calc||{}).forEach(v=>{ if(v&&typeof v==='object'&&v.hints) n+=v.hints; }); (s.log||[]).forEach(e=>{ if(e.type==='inhSim'&&e.try===1&&e.hints) n+=e.hints; }); return n; };
function handsOn(list){ const rows=[], mist={};
  HANDS_KEYS.forEach(k=>{ const has=list.filter(s=>s.calc&&s.calc[k]); if(!has.length) return; rows.push({k, n:has.filter(s=>s.calc[k].ok).length, d:has.length});
    has.forEach(s=>(s.calc[k].errs||[]).forEach(e=>{ mist[e]=(mist[e]||0)+1; })); });
  INH_DEVS.forEach(dev=>{ const f=list.map(s=>inhFirst(s,dev)).filter(Boolean); if(!f.length) return; rows.push({k:dev, n:f.filter(e=>e.ok).length, d:f.length});
    f.forEach(e=>(e.errs||[]).forEach(x=>{ mist[x]=(mist[x]||0)+1; })); });
  return {rows, mist:Object.entries(mist).sort((a,b)=>b[1]-a[1])}; }
function tCss(){ if($('#tCss2')) return; const st=document.createElement('style'); st.id='tCss2'; st.textContent=`
#pTitle .tAllCases{margin-left:10px;font-size:14px;font-weight:900;padding:5px 12px;border-radius:99px;background:#2b2f6b;color:#ffe07a;text-decoration:none;vertical-align:middle;white-space:nowrap}
#pBody .thello{font-size:17px;font-weight:800;color:#3a2a5a;margin:0 0 10px}
#pBody .tcard{border-radius:18px;padding:14px 16px;background:#fff;box-shadow:inset 0 0 0 2px #e6dff5;margin-bottom:12px}
#pBody .tcard h3{margin:0 0 6px;font-size:19px;color:#3a2a7a}
#pBody .tcard .tn{color:#5a5070;font-size:14.5px;line-height:1.5;margin:4px 0 8px}
#pBody .tcard.st{display:flex;flex-wrap:wrap;gap:10px;align-items:center;background:#f4fbf7;box-shadow:inset 0 0 0 2px #c9ecd9}
#pBody .tcard.st.off{background:#fff4f4;box-shadow:inset 0 0 0 2px #ffd0d0}
#pBody .tcard.key{background:#fff9e8;box-shadow:inset 0 0 0 2px #ffe19a}
#pBody .tbig{font-size:17px;font-weight:900}
#pBody .trow{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
#pBody .ttiles{display:flex;gap:10px;flex-wrap:wrap;margin:6px 0 10px}
#pBody .ttiles div{min-width:120px;border-radius:14px;background:#f6f3fc;padding:8px 14px}
#pBody .ttiles b{display:block;font-size:28px;color:#3a2a7a;line-height:1.1}
#pBody .ttiles span{font-size:13.5px;color:#6a6085}
#pBody .tlink{font-family:ui-monospace,Menlo,monospace;font-size:13.5px;background:#f4f2fa;border-radius:8px;padding:6px 10px;word-break:break-all}
#pBody .tsub{display:flex;gap:6px;flex-wrap:wrap;margin:4px 0 12px}
#pBody .tsub button{padding:8px 16px;border-radius:99px;font-weight:800;font-size:15px;background:#f1eef8;color:#4a3a6a}
#pBody .tsub button.on{background:#5a3fd6;color:#fff}
#pBody .tpub{border-radius:18px;padding:12px 14px;margin-bottom:12px;background:#f2f7ff;box-shadow:inset 0 0 0 2px #cfe0fb}
#pBody .tpub.dirty{background:#fff7ea;box-shadow:inset 0 0 0 2px #ffd28a}
#pBody .tpub .ts{font-weight:900;font-size:16px;margin-bottom:8px}
#pBody .tfil{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:10px}
#pBody .tfil .ein{max-width:220px}
#pBody .scard{border-radius:16px;background:#fff;box-shadow:inset 0 0 0 2px #eadcf5;margin-bottom:10px}
#pBody .scard>summary{list-style:none;cursor:pointer;padding:10px 14px}
#pBody .scard>summary::-webkit-details-marker{display:none}
#pBody .scard .s1{display:flex;flex-wrap:wrap;gap:8px;align-items:baseline}
#pBody .scard .nm{font-size:17px;font-weight:900;color:#2a1a4a}
#pBody .scard .chip{display:inline-block;padding:2px 10px;border-radius:99px;font-size:13px;font-weight:800;background:#f1eef8;color:#4a3a6a}
#pBody .scard .chip.ok{background:#e3f7ec;color:#16774a}#pBody .scard .chip.no{background:#ffe9ec;color:#b4203c}#pBody .scard .chip.ex{background:#fff1d6;color:#8a5a00}
#pBody .scard .s2{display:flex;flex-wrap:wrap;gap:4px 16px;margin-top:6px;font-size:14px;color:#4a4060}
#pBody .scard .s2 b{color:#2a1a4a}
#pBody .scard .s3{margin-top:6px;font-size:13.5px}
#pBody .scard .mo{color:#5a3fd6;font-weight:800;font-size:13.5px;margin-left:auto}
#pBody .scard[open] .mo{display:none}
#pBody .scard .in{padding:0 14px 14px}
#pBody .scard h4{margin:12px 0 4px;font-size:15.5px;color:#3d2a9a}
#pBody .scard .err{color:#b4203c;font-size:14px;margin:2px 0 2px 18px}
#pBody .cbar2{display:grid;grid-template-columns:minmax(0,1.6fr) minmax(120px,1fr) 96px;gap:10px;align-items:center;padding:5px 0;border-bottom:1px solid #f0efec;font-size:14.5px}
#pBody .cbar2 .t{height:14px;border-radius:99px;background:#eeebf3;overflow:hidden}
#pBody .cbar2 .t i{display:block;height:100%;border-radius:99px}
#pBody .cbar2 .t i.g{background:#18b07f}#pBody .cbar2 .t i.y{background:#f0a52a}#pBody .cbar2 .t i.r{background:#ff5c6b}
#pBody .cbar2 .v{text-align:right;font-weight:900}#pBody .cbar2 .v span{display:block;font-size:12px;color:#7a7090;font-weight:700}
#pBody details.more{margin-top:12px}#pBody details.more>summary{cursor:pointer;font-weight:800;color:#5a3fd6;padding:6px 0}
#pBody .mistl{margin:4px 0 0;padding-left:20px}#pBody .mistl li{margin:2px 0}
#pBody .dbflow{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px}
#pBody .dbflow h5{margin:0 0 4px;font-size:14.5px;color:#3d2a9a}
@media print{ #pBody .dbflow{gap:4px} }`; document.head.appendChild(st); }
/* ---------- router ---------- */
function renderTeacher2(b){ tCss();
  try{ sessionStorage.setItem('phd_tok', String(CONFIG.TEACHER_PIN)); }catch(e){}   // signed in for this browser tab: the case chooser's instructor page (and any case with the same code) opens without asking again
  if(P.wantTab){ const t=P.wantTab; P.wantTab=null; return openPage('teacher', t); }
  allCasesLink();
  if(P.tab==='tHome') return renderHome(b);
  if(P.tab==='tSessions') return renderStudents(b);
  if(P.tab==='tClass') return renderClass2(b);
  if(P.tab==='tDebrief') return renderDebrief2(b);
  if(P.tab==='tCustom') return renderCustom(b);
  if(P.tab==='tAdv') return renderAdv(b);
  return renderTeacher(b); }
const copyTxt=t=>{ const done=()=>toast('📋 '+T('onCopied')); try{ navigator.clipboard.writeText(t).then(done,()=>prompt('',t)); }catch(e){ prompt('',t); } };
const modeName=m=>m==='practice'||m==='exam'?T('mode_'+m):TE('stModeChoose');
/* ---------- 🏠 Start ---------- */
function renderHome(b){
  const url=serverURL(), key=teacherKey(), all=allSessions(), done=all.filter(s=>s.done).length, cls=Object.entries(SYNC.classes||{}).sort((a,c)=>a[0].localeCompare(c[0]));
  const hm=t=>new Date(t).toLocaleString([], {month:'short', day:'numeric', hour:'2-digit', minute:'2-digit'}), mode=(edWork().settings||{}).mode;
  b.innerHTML=`<p class="thello">${TX('hHello')}</p>
   ${url?`<div class="tcard st" id="hSt"><b class="tbig">${TX('hCase')}</b><span class="tbig" id="swSt">…</span><button class="sbtn" id="swBtn" disabled>…</button><p class="tn" style="flex-basis:100%;margin:0">${TX('hCaseNote')}</p></div>`:`<div class="tcard key"><p class="tn" style="margin:0">ℹ️ ${TX('offNote')}</p></div>`}
   ${url&&(!key||SYNC.badKey)?`<div class="tcard key"><h3>${TX(SYNC.badKey?'kBadH':'kH')}</h3><p class="tn">${TX(SYNC.badKey?'kBadNote':'kNote')}</p><div class="trow"><input class="ein" id="hKey" type="password" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="••••••••" style="max-width:300px"><button class="sbtn g" id="hKeySave">${T('onSave')}</button></div></div>`:''}
   <div class="tcard"><h3>${TX('h1')}</h3><p class="tn">${TX('h1Note')}</p>
     <div class="trow"><span>${TX('hCode')}</span><input class="ein" id="hCls" placeholder="ph2026a" style="max-width:180px"></div>
     <div class="trow" style="margin-top:8px"><span class="tlink" id="hLink">${esc(gameLink(''))}</span><button class="sbtn b" id="hCopy">📋 ${T('onCopy')}</button></div>
     ${cls.length?`<h4 style="margin:12px 0 4px">${TX('hKnown')}</h4><table class="tbl"><tr><th>${TX('hCode')}</th><th>${TX('nStud')}</th><th></th></tr>${cls.map(([c,n])=>`<tr><td><b>${esc(c)}</b></td><td>${n}</td><td><button class="sbtn" data-cp="${esc(gameLink(c))}">📋 ${T('onCopy')}</button></td></tr>`).join('')}</table>`:''}</div>
   <div class="tcard"><h3>${TX('h2')}</h3>
     <div class="ttiles"><div><b>${all.length}</b><span>${TX('nStud')}</span></div><div><b>${done}</b><span>${TX('nDone')}</span></div><div><b>${all.length-done}</b><span>${TX('nPlaying')}</span></div></div>
     <div class="trow">${url?`<button class="sbtn g" id="hPull">${TX('hPull')}</button>`:''}<button class="sbtn p" data-go="tSessions">${TX('goStudents')}</button><button class="sbtn p" data-go="tClass">${TX('goClass')}</button></div>
     <p class="tn" style="margin-bottom:0">${url?(SYNC.pulled?TX('hLast')+': '+hm(SYNC.pulled):TX('hAuto')):''}</p></div>
   <div class="tcard"><h3>${TX('h3')}</h3><p class="tn">${TX('h3Note')}</p><button class="sbtn p" data-go="tDebrief">${TX('goDebrief')}</button></div>
`;
  b.querySelectorAll('[data-go]').forEach(x=>x.onclick=()=>{ P.tab=x.dataset.go; sfx.click(); renderPage(); });
  b.querySelectorAll('[data-cp]').forEach(x=>x.onclick=()=>copyTxt(x.dataset.cp));
  $('#hCls').oninput=e=>{ $('#hLink').textContent=gameLink(e.target.value); };
  $('#hCopy').onclick=()=>copyTxt($('#hLink').textContent);
  if($('#hKeySave')) $('#hKeySave').onclick=async()=>{ setTeacherKey($('#hKey').value); if(!teacherKey()) return; sfx.click(); toast('🔑 '+T('saved')); const r=await serverPull(); if(!r.ok) toast('⚠️ '+T(r.error==='badkey'?'onBadKey':'onDown')); renderPage(); };
  if($('#hPull')) $('#hPull').onclick=async()=>{ if(!teacherKey()){ toast('⚠️ '+T('onNoKey')); const k=$('#hKey'); if(k) k.focus(); return; }
    const bt=$('#hPull'); bt.disabled=true; bt.textContent='…'; const r=await serverPull();
    if(r.ok){ sfx.get(); toast('☁️ '+T('onPulled').replace('{n}',r.n)); } else toast('⚠️ '+T(r.error==='badkey'?'onBadKey':r.error==='nokey'?'onNoKey':'onDown')); if(P.cur==='teacher'&&P.tab==='tHome') renderPage(); };
  const swPaint=()=>{ const st=$('#swSt'), bt=$('#swBtn'), card=$('#hSt'); if(!st) return; card.classList.toggle('off',LOCK.closed); st.textContent=LOCK.known?T(LOCK.closed?'swClosed':'swOpen'):T('swUnknown');
    bt.textContent=T(LOCK.closed?'swOpenBtn':'swClose'); bt.className='sbtn '+(LOCK.closed?'g':'r'); bt.disabled=!LOCK.known; };
  if($('#swBtn')){ swPaint(); statusFetch(url).then(swPaint,swPaint);
    $('#swBtn').onclick=async()=>{ if(!teacherKey()){ toast('⚠️ '+T('onNoKey')); const k=$('#hKey'); if(k) k.focus(); return; }
      const bt=$('#swBtn'); bt.disabled=true; const r=await setCaseClosed(!LOCK.closed);
      if(r.ok){ sfx.get(); toast(T(LOCK.closed?'swClosed':'swOpen')); } else toast('⚠️ '+T(r.error==='badkey'?'onBadKey':r.error==='nokey'?'onNoKey':'onDown')); swPaint(); }; }
}
/* ---------- 👥 Students ---------- */
const STU={q:'', cls:'__all', mode:'all', st:'all', sort:'new'};
function studentCard(s){
  const nm=s.student&&s.student.name||'?', sid=s.student&&s.student.sid||'', found=Object.keys(s.found||{}).length, B=s.boss||{answers:[]}, log=s.log||[], qn=['❌','🔸','✅'];
  const calcChip=k=>{ const c=s.calc&&s.calc[k]; if(!c) return ''; const first=HANDS_KEYS.includes(k)?c.ok:c.ok&&c.tries===1, late=!first&&c.ok; return `<span class="chip ${first?'ok':late?'ex':'no'}">${esc(L(TT.hk[k]))} ${first?'✓':late?'✓ ×'+c.tries:'✗'}</span>`; };
  const inhChip=dev=>{ const f=inhFirst(s,dev); return f?`<span class="chip ${f.ok?'ok':'no'}">${esc(L(TT.hk[dev]))} ${f.pts!=null?f.pts+'/'+(f.max||8):f.ok?'✓':'✗'}</span>`:''; };
  const hands=HANDS_KEYS.map(calcChip).join('')+INH_DEVS.map(inhChip).join(''), calcs=CALC_KEYS.map(calcChip).join(''), hints=hintsOf(s);
  const status=s.done?`<span class="chip ok">${TX('done')}</span>`:`<span class="chip ex">${TX('playing').replace('{p}',s.progress||0)}</span>`;
  const endTxt=s.ending?({best:'🌟',good:'😊',mixed:'😐',bad:'🚑'}[s.ending.tier]||'')+' '+T('end_'+s.ending.tier).replace(/^\S+\s/,''):'';
  /* details */
  const free=log.filter(e=>(e.type==='ask'&&e.mode==='free')||e.type==='lockText'||e.type==='final'), pres=log.filter(e=>e.type==='present'||e.type==='choice'||e.type==='calc');
  const handsDet=[...HANDS_KEYS, ...CALC_KEYS].filter(k=>s.calc&&s.calc[k]).map(k=>{ const c=s.calc[k], isH=HANDS_KEYS.includes(k);
      return `<div class="ll">${c.ok?'✅':'❌'} <b>${esc(L(TT.hk[k]))}</b> — ${c.ok?(isH||c.tries===1?TX('ok'):TX('tries').replace('{n}',c.tries)):TX('wrongC')}${c.value!=null?` · ${esc(String(c.value))}`:''}${c.hints?` · 💡 ${c.hints}`:''}</div>`+(c.errs||[]).map(e=>`<div class="err">• ${esc(errText(e))}</div>`).join(''); }).join('')
    +INH_DEVS.map(dev=>{ const all=log.filter(e=>e.type==='inhSim'&&e.dev===dev); if(!all.length) return ''; const f=all[0], last=all[all.length-1];
      return `<div class="ll">${f.ok?'✅':'❌'} <b>${esc(L(TT.hk[dev]))}</b>${f.pts!=null?` <b>📋 ${f.pts}/${f.max||8}</b>`:''} — ${f.ok?TX('ok'):last.ok?TX('tries').replace('{n}',last.try||all.length):TX('wrongC')}${f.hints?` · 💡 ${f.hints}`:''}</div>`+(f.errs||[]).map(e=>`<div class="err">• ${esc(errText(e))}</div>`).join(''); }).join('');
  const chT=[0,1,2,3,4,5].map(c=>`${c?TX('chN').replace('{n}',c):TX('ch0')} ${fmt((s.chT||{})[c]||0)}`).join(' · ');
  const pp=s.pp&&Object.keys(s.pp.pre||{}).length?(()=>{ const pre=s.pp.pre||{}, post=s.pp.post||{}, ids=[...new Set(Object.keys(pre).concat(Object.keys(post)))], qt={}; log.forEach(e=>{ if(e.type==='pp') qt[e.qid]=e.q; }); gameQuestions().forEach(x=>{ if(x.cp==='pp') qt[x.id]=LQ(x.q); });
      return `<h4>📊 ${T('ppStat')} ${Object.values(pre).filter(x=>x.ok).length}/${ids.length} → ${Object.values(post).filter(x=>x.ok).length}/${ids.length}</h4>`+ids.map(id=>`<div class="ll">${pre[id]?(pre[id].ok?'✅':'❌'):'·'} → ${post[id]?(post[id].ok?'✅':'❌'):'·'} ${esc(qt[id]||id)}</div>`).join(''); })():'';
  return `<details class="scard"><summary><div class="s1"><span class="nm">👤 ${esc(nm)}</span><span class="muted">${esc(sid)}</span>${status}${s.mode==='exam'?`<span class="chip">${T('mode_exam')}</span>`:''}${s.classCode&&s.classCode!=='main'?`<span class="chip">🏫 ${esc(s.classCode)}</span>`:''}<span class="muted">${esc(localTS(s.updated))}</span><span class="mo">${TX('more')} ▾</span></div>
    <div class="s2">${s.rank?`<span>${TX('rank')} <b>${esc(s.rank)}</b></span><span>${TX('score')} <b>${s.score}</b></span>`:''}<span>${TX('found')} <b>${found}/${PROBLEMS.length}</b></span><span>${TX('time')} <b>${fmt(s.realTime||0)}</b></span>${hints?`<span>💡 ${TX('hints')} <b>${hints}</b></span>`:''}${endTxt?`<span>${TX('ending')} <b>${esc(endTxt)}</b></span>`:''}</div>
    ${hands||calcs?`<div class="s3">${hands?`<b>${TX('hands')}</b> ${hands} `:''}${calcs?`<b>${TX('calcs')}</b> ${calcs}`:''}</div>`:''}</summary>
   <div class="in">
    <h4>${TX('dFound')}</h4><div>${PROBLEMS.map(p=>`<span class="pill ${s.found&&s.found[p.id]?'ok':'no'}" title="${esc(L(p.t))}">${p.icon} ${p.id} ${s.found&&s.found[p.id]?fmt(s.found[p.id].t):'—'}</span>`).join('')}</div>
    ${handsDet?`<h4>${TX('dHands')}</h4>${handsDet}`:''}
    <h4>${TX('dCh')}</h4><div class="muted">${chT}</div>
    <h4>${T('tFree')} (${free.length})</h4>${free.map(e=>`<div class="ll free">[${fmt(e.t)}] ${e.type==='final'?'🏁 '+(e.cov||[]).filter(Boolean).length+'/'+RUBRIC_SUM.length:e.type==='lockText'?'💗 '+(e.ok?'✅':'❌'):'✍️'} “${esc(e.text)}”</div>`).join('')||'<p class="muted">—</p>'}
    <h4>${T('tChoices')}</h4>${pres.map(e=>`<div class="ll">[${fmt(e.t)}] ${e.type==='present'?`📂 ${esc(e.st)} ← ${esc(e.item)} ${e.ok?'✅':e.near?'🔸':'❌'}`:e.type==='calc'?`🧮 ${esc(e.id)} #${e.attempt} ${esc(Object.entries(e.vals||{}).map(([k,v])=>k+'='+v).join(', '))} → ${e.result} ${e.ok?'✅':'❌'}`:`☑️ ${esc(e.text)}`}</div>`).join('')||'<p class="muted">—</p>'}
    <h4>${T('tMR')}</h4>${s.mr?`<div class="ll">✅${s.mr.perfect} 🔸${s.mr.partial} ❌${s.mr.wrong}</div>`+(s.mr.ans||[]).map(a=>`<div class="ll">${a.perfect?'✅':a.partial?'🔸':'❌'} ${esc(a.id)} — ${esc((a.sel||[]).join(', '))}</div>`).join(''):'<p class="muted">—</p>'}
    <h4>${T('tBoss')}</h4>${(B.answers||[]).map(a=>`<div class="ll">${qn[a.q+0]||'⏰'} ${esc(a.p)} — ${esc(a.text)}</div>`).join('')||'<p class="muted">—</p>'}
    ${pp}
    ${s.refl&&s.refl.length?`<h4>💭 ${T('reflT')}</h4>`+s.refl.map(a=>`<div class="ll free"><b>${esc(a.q)}</b><br>“${esc(a.ans)}”</div>`).join(''):''}
    ${s.custom&&s.custom.list&&s.custom.list.length?`<h4>${TE('tCustom')} (${s.custom.score}/${s.custom.max})</h4>`+s.custom.list.map(a=>`<div class="ll${a.kind==='text'?' free':''}">${a.ok?'✅':a.partial?'🔸':a.kind==='text'&&!a.auto?'📝':'❌'} <b>${esc(a.q)}</b> → “${esc(a.ans)}” <span class="muted">(${a.pts}/${a.max})</span></div>`).join(''):''}
    <h4>${TX('dMemo')}</h4><div class="ll" style="white-space:pre-wrap">${esc(s.notes&&s.notes.memo||'—')}</div>${typeof memoTeacherHTML==='function'?memoTeacherHTML(s):''}
    <details style="margin-top:10px"><summary class="muted">${TX('dRaw')} (${log.length})</summary>${log.map(e=>`<div class="ll">[${fmt(e.t)}] ${esc(JSON.stringify(e))}</div>`).join('')}</details>
    <button class="sbtn r" data-del="${esc(s.id)}" data-nm="${esc(nm)}" style="margin-top:10px">${TX('dDel')}</button></div></details>`;
}
function renderStudents(b){
  const all=allSessions(), clss=[...new Set(all.map(s=>s.classCode||'main'))].sort(), q=STU.q.trim().toLowerCase();
  let list=all.filter(s=>(STU.cls==='__all'||(s.classCode||'main')===STU.cls)&&(STU.mode==='all'||(s.mode||'practice')===STU.mode)&&(STU.st==='all'||(STU.st==='done'?s.done:!s.done))
    &&(!q||((s.student&&s.student.name||'')+' '+(s.student&&s.student.sid||'')).toLowerCase().includes(q)));
  if(STU.sort==='score') list=list.slice().sort((a,c)=>(c.score||0)-(a.score||0)); else if(STU.sort==='name') list=list.slice().sort((a,c)=>String(a.student&&a.student.name||'').localeCompare(String(c.student&&c.student.name||'')));
  const opt=(v,cur,t)=>`<option value="${esc(v)}"${cur===v?' selected':''}>${esc(t)}</option>`;
  b.innerHTML=`<p class="edintro">${TX('sIntro')}</p>
   <div class="tfil"><input class="ein" id="sQ" placeholder="${esc(TX('sSearch'))}" value="${esc(STU.q)}">
    ${clss.length>1?`<select class="ein" id="sCls">${opt('__all',STU.cls,T('clAllCls'))}${clss.map(c=>opt(c,STU.cls,'🏫 '+c)).join('')}</select>`:''}
    
    <select class="ein" id="sSt">${opt('all',STU.st,TX('stAll'))}${opt('done',STU.st,TX('stDone'))}${opt('play',STU.st,TX('stPlay'))}</select>
    <select class="ein" id="sSort">${opt('new',STU.sort,TX('sortNew'))}${opt('score',STU.sort,TX('sortScore'))}${opt('name',STU.sort,TX('sortName'))}</select>
    <span class="muted">${TX('sCount').replace('{n}',list.length)}</span></div>
   ${list.length?list.map(studentCard).join(''):`<p class="edempty">${TX('sNone')}</p>`}`;
  const re=()=>{ renderPage(); const i=$('#sQ'); if(i){ i.focus(); i.setSelectionRange(i.value.length,i.value.length); } };
  $('#sQ').oninput=e=>{ STU.q=e.target.value; clearTimeout(STU.t); STU.t=setTimeout(re,250); };
  [['#sCls','cls'],['#sMode','mode'],['#sSt','st'],['#sSort','sort']].forEach(([id,k])=>{ const el=$(id); if(el) el.onchange=e=>{ STU[k]=e.target.value; renderPage(); }; });
  b.querySelectorAll('[data-del]').forEach(x=>x.onclick=()=>showModal(`<h3>${TX('dDel')}</h3><p>${esc(TX('dDelQ').replace('{n}',x.dataset.nm))}</p>`,[{t:TX('dDel'),cls:'r',fn:async()=>{
    const id=x.dataset.del, rs=(SYNC.remote||[]).find(s=>s.id===id); store.set(CONFIG.STORAGE_KEY,(store.get(CONFIG.STORAGE_KEY)||[]).filter(s=>s.id!==id));
    if(rs){ const r=await serverDelete(rs.classCode||'main', id); toast(r.ok?'🗑️ '+T('onDelOne'):'⚠️ '+T('onDown')); } renderPage(); }},{t:T('cancel'),cls:''}]));
}
/* ---------- 📊 Class overview ---------- */
const cbar2=(label,n,d,note)=>{ const v=pct(n,d), c=v>=70?'g':v>=40?'y':'r'; return `<div class="cbar2" title="${esc(String(label).replace(/<[^>]+>/g,''))} — ${n}/${d}"><div>${label}${note?`<div class="muted" style="font-size:12.5px">${note}</div>`:''}</div><div class="t"><i class="${c}" style="width:${Math.max(v,2)}%"></i></div><div class="v">${v}%<span>${n}/${d}</span></div></div>`; };
function renderClass2(b){
  const all=allSessions(), vers=[...new Set(all.map(s=>s.cfgRev||''))], clss=[...new Set(all.map(s=>s.classCode||'main'))].sort();
  const list=all.filter(s=>(!CLS.fin||s.done)&&(CLS.ver==='__all'||(s.cfgRev||'')===CLS.ver)&&(CLS.mode==='all'||(s.mode||'practice')===CLS.mode)&&(CLS.cls==='__all'||(s.classCode||'main')===CLS.cls));
  const head=`<p class="edintro">${TX('cIntro')}</p><div class="tfil">
    ${clss.length>1||CLS.cls!=='__all'?`<select class="ein" id="clCls"><option value="__all">${T('clAllCls')}</option>${clss.map(c=>`<option value="${esc(c)}"${CLS.cls===c?' selected':''}>🏫 ${esc(c)}</option>`).join('')}</select>`:''}
    
    <label><input type="checkbox" id="clFin" ${CLS.fin?'checked':''}> ${TC('clFinished')}</label>
    ${vers.length>1||CLS.ver!=='__all'?`<select class="ein" id="clVer" title="${esc(TX('cVer'))}"><option value="__all">${TX('cVer')}: ${TC('clAllVer')}</option>${vers.map(v=>`<option value="${esc(v)}"${CLS.ver===v?' selected':''}>${v?esc(localTS(v)):TC('clOrig')}</option>`).join('')}</select>`:''}
    <button class="sbtn b" id="clCsv">${TX('cCsv')}</button></div>`;
  if(!list.length){ b.innerHTML=head+`<p class="edempty">${TX('sNone')}</p>`; bindClass2(b,null); return; }
  const R=classStats(list), H=handsOn(list), sec=(t,h,note)=>`<div class="clsec"><h4>${t}</h4>${note?`<p class="muted" style="margin:-2px 0 6px">${note}</p>`:''}${h}</div>`, rk=['S','A','B','C','D'];
  const handsLbls=new Set(['clHypo','clHeight','clFosa','clInhM','clInhR'].map(k=>CL[k]?TC(k):null).filter(Boolean)); if(list.some(s=>s.calc&&s.calc.acb)) handsLbls.add(TC('clBmiClass'));
  const concept=R.concept.filter(([l])=>!handsLbls.has(l));
  const calcRows=Object.keys(R.calc||{}).map(k=>[esc(L(TT.hk[k]||[k,k,k]))+` <span class="muted">(${TX('calcFirst')})</span>`,R.calc[k].n,R.calc[k].d]);
  const handRows=H.rows.map(x=>[esc(L(TT.hk[x.k])),x.n,x.d]);
  /* the five weakest points: problems, hands-on, calculations, med-review, counselling cards, summary */
  const pool=[].concat(R.prob.map(x=>({l:x.p.icon+' '+esc(L(x.p.t)),n:x.n,d:R.N})), handRows.map(([l,n,d])=>({l,n,d})), calcRows.map(([l,n,d])=>({l,n,d})),
    R.mr.map(x=>({l:'💊 '+esc(L(x.m.tag))+' · '+esc(KP(L(x.m.q)).slice(0,50))+'…',n:x.p,d:x.d})), R.boss.map(x=>({l:'🃏 「'+esc(L(x.m.m))+'」',n:x.c,d:x.d})), R.final.map(x=>({l:x.r.ic+' '+esc(L(x.r.k)),n:x.n,d:x.d})))
    .filter(x=>x.d>0).sort((a,c)=>pct(a.n,a.d)-pct(c.n,c.d)||c.d-a.d).slice(0,5);
  const calcWrong=Object.entries(R.calcWrong).sort((a,c)=>c[1]-a[1]).slice(0,5).map(([k,n])=>{ const [id,v]=k.split('|'); return `<li><b>${esc(L(TT.hk[id]||[id,id,id]))}</b> <code>${esc(v)}</code> <span class="muted">${n} ${TC('clTimes')}</span></li>`; }).join('');
  const mist=H.mist.slice(0,6).map(([k,n])=>`<li>${esc(errText(k))} <span class="muted">— ${n} ${TC('clPeople')}</span></li>`).join('');
  const hAvg=list.length?(list.reduce((a,s)=>a+hintsOf(s),0)/list.length):0;
  const ppHTML=R.pp.n?`<p class="muted">${TC('clPPavg')}: <b>${R.pp.avgPre.toFixed(1)}</b> → <b style="color:#0a7a0a">${R.pp.avgPost.toFixed(1)}</b> / ${R.pp.max} · n = ${R.pp.n} ${TC('clPeople')}</p>
      <div class="clg"><span><i class="pre" style="background:#a9c7ee"></i>${TC('clPre')}</span><span><i style="background:#2a78d6"></i>${TC('clPost')}</span></div>
      <div class="pplist">${R.pp.q.map(x=>{ const a=pct(x.pre,x.d), z=pct(x.post,x.d), dv=z-a; return `<div class="ppq"><div>${esc(x.q)}</div><div class="pb2"><i class="pre" style="width:${a}%"></i><i class="post" style="width:${z}%"></i></div><div class="dv${dv<0?' neg':''}">${a}→${z}%</div></div>`; }).join('')}</div>`:`<p class="muted">${TC('clPPnone')}</p>`;
  const reflHTML=Object.entries(R.refl).map(([q,arr])=>`<h5>${esc(q)}</h5>`+arr.slice(-12).map(a=>`<div class="refl"><b>${esc(a.who)}</b>：${esc(a.ans)}</div>`).join('')).join('');
  const endHTML=R.endN?clLegend([['g','🌟','end_best'],['g2','😊','end_good'],['y','😐','end_mixed'],['r','🚑','end_bad']].map(([c,ic,k])=>[c,'',k]))+clStack(TC('clEnding'),[[R.end.best,'g'],[R.end.good,'g2'],[R.end.mixed,'y'],[R.end.bad,'r']],R.endN):'';
  const wrongEv=Object.entries(R.wrongEv).sort((a,c)=>c[1]-a[1]).slice(0,6).map(([k,n])=>{ const [st,it]=k.split('|'), i=TESTI.findIndex(t=>t.id===st); return `<li><b>${ITEMS[it]?itemIcon(it,22)+' '+esc(L(ITEMS[it].n)):esc(it)}</b> → ${st==='lock'?'💗':'#'+(i+1)} <span class="muted">${n} ${TC('clTimes')}</span></li>`; }).join('');
  b.innerHTML=head+`<div class="cltiles"><div><b>${R.N}</b><span>${TC('clStudents')}</span></div><div><b>${R.done}</b><span>${TC('clDone')}</span></div><div><b>${R.avgScore||'—'}</b><span>${TC('clAvgScore')}</span></div><div><b>${R.avgTime?fmt(R.avgTime):'—'}</b><span>${TC('clAvgTime')}</span></div>
      <div class="rk"><span>${TC('clRanks')}</span><p>${rk.map(r=>`<em>${r} <b>${R.ranks[r]||0}</b></em>`).join('')}</p></div></div>`
    +sec(TX('cTop'),pool.map(x=>cbar2(x.l,x.n,x.d)).join(''))
    +sec(TX('cProb'),R.prob.slice().sort((a,c)=>a.n-c.n).map(x=>cbar2(x.p.id+' '+x.p.icon+' '+esc(L(x.p.t)),x.n,R.N)).join(''))
    +((handRows.length||calcRows.length||concept.length)?sec(TX('cHands'),handRows.map(([l,n,d])=>cbar2(l,n,d)).join('')+calcRows.map(([l,n,d])=>cbar2(l,n,d)).join('')
        +(concept.length?`<h5>${TX('cInterp')}</h5>`+concept.map(([l,n,d])=>cbar2(esc(l),n,d)).join(''):'')
        +(mist?`<h5>${TX('cMist')}</h5><ul class="mistl">${mist}</ul>`:'')+(calcWrong?`<h5>${TC('clCalcWrong')}</h5><ul class="clul">${calcWrong}</ul>`:'')
        +(hAvg?`<p class="muted">💡 ${TX('cHintsAvg')}: <b>${hAvg.toFixed(1)}</b></p>`:''),TX('cHandsNote')):'')
    +sec(TC('clMR'),clLegend([['g','✅','lgPerfect'],['y','🔸','lgPartial'],['r','❌','lgWrong']])+R.mr.map(x=>clStack(esc(L(x.m.tag))+' · '+esc(KP(L(x.m.q)).slice(0,46))+'…',[[x.p,'g'],[x.h,'y'],[x.w,'r']],x.d)).join(''))
    +sec(TC('clBoss'),clLegend([['g','✅','lgCrit'],['y','🔸','lgOk'],['r','❌','lgMiss']])+R.boss.map(x=>clStack('「'+esc(L(x.m.m))+'」',[[x.c,'g'],[x.o,'y'],[x.w,'r']],x.d)).join(''))
    +sec(TC('clFinal'),R.final.map(x=>cbar2(x.r.ic+' '+esc(L(x.r.k)),x.n,x.d)).join(''))
    +sec(TC('clPP'),ppHTML)
    +(R.custom.length?sec(TC('clCustom'),R.custom.map(c=>cbar2(esc(c.q),c.n,c.d)).join('')):'')
    +(reflHTML?sec(TC('clRefl'),reflHTML):'')
    +`<details class="more"><summary>${TX('cMore')}</summary>`
    +sec(TC('clDuel'),R.rows.filter(r=>r.sec==='duel').map(r=>cbar2(esc(r.label),r.n,r.d)).join('')+(wrongEv?`<h5>${TC('clWrongEv')}</h5><ul class="clul">${wrongEv}</ul>`:''))
    +sec(TC('clFirst'),FIRST_MOVES.map(f=>cbar2((f.k==='intro'?'✅ ':'')+esc(L(f.t)),R.first[f.k]||0,R.firstD)).join(''))
    +sec(TC('clConseq'),R.cons.map(([k,n,d])=>cbar2(TC(k),n,d)).join('')+endHTML)
    +sec(TC('clFollow'),R.fu.map(x=>cbar2(x.f.ico+' ↪ '+esc(L(x.f.l)),x.n,R.N)).join('')+R.hid.map(x=>cbar2(TC('clHidden')+' · '+esc(L((PROFILE.find(f=>f.k===x.h)||{l:[x.h,x.h,x.h]}).l)),x.n,R.N)).join(''))
    +`</details>`;
  bindClass2(b,R);
}
function bindClass2(b,R){
  $('#clFin').onchange=e=>{ CLS.fin=e.target.checked; renderPage(); }; 
  if($('#clVer')) $('#clVer').onchange=e=>{ CLS.ver=e.target.value; renderPage(); }; if($('#clCls')) $('#clCls').onchange=e=>{ CLS.cls=e.target.value; renderPage(); };
  $('#clCsv').onclick=()=>{ if(!R){ sfx.error(); return; } const rows=[['section','item','percent','n','total']].concat(R.rows.map(r=>[r.sec,KP(String(r.label)).replace(/<[^>]+>/g,''),r.p,r.n,r.d]));
    download('PharmaDetective_class_summary.csv','﻿'+rows.map(r=>r.map(c=>'"'+String(c==null?'':c).replace(/"/g,'""')+'"').join(',')).join('\n'),'text/csv'); };
}
/* ---------- 📋 Debrief ---------- */
function renderDebrief2(b){
  const all=allSessions(), R=all.length?classStats(all):null, li=a=>`<li>${esc(L(a))}</li>`, ct=caseTeach();
  let live=`<p>${esc(L(DEBRIEF.liveNone))}</p>`;
  if(R){ const miss=R.prob.filter(x=>x.n<R.N).sort((a,c)=>a.n-c.n).slice(0,5), done=all.filter(s=>s.done), pc=(n,d)=>d?Math.round(n/d*100)+'%':'—', H=handsOn(all);
    const hand=H.rows.length?`<p><b>${TX('dbHandsRate')}:</b> ${H.rows.map(x=>`${esc(L(TT.hk[x.k]))} ${pc(x.n,x.d)}`).join(' · ')}</p>`:'';
    const mist=H.mist.slice(0,4).map(([k,n])=>`<li>${esc(errText(k))} <span class="muted">(${n})</span></li>`).join('');
    live=`<p><b>n = ${R.N}</b> · ${TC('clDone')} ${R.done}${R.pp.n?` · ${T('ppStat')} ${R.pp.avgPre.toFixed(1)} → ${R.pp.avgPost.toFixed(1)} / ${R.pp.max}`:''} · ${esc(L(DEBRIEF.liveTb))} ${pc(done.filter(s=>s.finalCov&&s.finalCov[1]).length,done.length)} · ${esc(L(DEBRIEF.liveSecret))} ${pc(all.filter(s=>s.found&&s.found.P8).length,all.filter(s=>(s.chapter||0)>=4||s.done).length)} · ${esc(L(DEBRIEF.liveEnd))} ${pc(done.filter(s=>s.ending&&(s.ending.tier==='best'||s.ending.tier==='good')).length,done.filter(s=>s.ending).length)}</p>
      <b>${esc(L(DEBRIEF.liveMiss))}:</b>${miss.length?`<ol>${miss.map(x=>`<li>${x.p.icon} ${esc(L(x.p.t))} — ${esc(L(DEBRIEF.liveFound))} ${pct(x.n,R.N)}%</li>`).join('')}</ol>`:` ${esc(L(DEBRIEF.liveAll))}`}
      ${hand}${mist?`<b>${TX('cMist')}:</b><ul>${mist}</ul>`:''}`; }
  const prep=TT.prep.concat(ct.prepExtra||[]);
  b.innerHTML=`<div class="dbtools"><button class="sbtn b" id="dbPrintBtn">${esc(L(DEBRIEF.print))}</button><span class="muted">${TX('printTip')}</span></div>
   <div id="dbPrint"><h2>${esc(L(DEBRIEF.title))}</h2><div class="dsub">${esc(L(DEBRIEF.sub))}</div>
    <div class="dgrid"><section class="wide"><h4>${TX('dbFlow')}</h4><div class="dbflow"><div><h5>🕐 ${TX('dbBefore')}</h5><ul>${prep.map(li).join('')}</ul></div><div><h5>🎮 ${TX('dbDuring')}</h5><ul>${TT.during.map(li).join('')}</ul></div><div><h5>💬 ${TX('dbAfter')}</h5><ul>${TT.after.map(li).join('')}</ul></div></div></section>
     <section class="live wide"><h4>${esc(L(DEBRIEF.liveH))}</h4>${live}</section>
     <section><h4>${esc(L(DEBRIEF.gatherH))}</h4><ul>${DEBRIEF.gather.map(li).join('')}</ul></section>
     <section><h4>${esc(L(DEBRIEF.sumH))}</h4><ul>${DEBRIEF.sum.map(li).join('')}</ul></section>
     <section class="wide"><h4>${esc(L(DEBRIEF.analyzeH))}</h4><table>${DEBRIEF.analyze.map(([h,q])=>`<tr><th>${esc(L(h))}</th><td>${esc(L(q))}</td></tr>`).join('')}</table></section>
     ${ct.handsQ&&ct.handsQ.length?`<section class="wide"><h4>${TX('dbHands')}</h4><ul>${ct.handsQ.map(li).join('')}</ul></section>`:''}
     <section class="wide"><h4>${esc(L(DEBRIEF.keyH))}</h4><ol class="dkeys">${PROBLEMS.map(p=>`<li>${p.icon} ${esc(L(p.t))}</li>`).join('')}</ol></section></div></div>`;
  $('#dbPrintBtn').onclick=()=>{ sfx.click(); window.print(); };
}
/* ---------- ✏️ Customise ---------- */
function pubBar(b){
  const on=!!serverURL(), w=edWork(), pend=on?(edDirty()||mediaPending()):edDirty(), m=GAME_CFG_BASE.meta||{};
  const ver=m.rev?esc(localTS(m.rev)):TX('puOrig');
  const known=[...new Set([].concat(Object.keys(SYNC.classes||{}), (ED_ST.pubList||[]).map(c=>c.cls), CFG_REQ_CLASS!=='main'?[CFG_REQ_CLASS]:[]))].filter(c=>c&&c!=='*'&&c!=='main').sort();
  const el=document.createElement('div'); el.className='tpub'+(pend?' dirty':'');
  el.innerHTML=`<div class="ts">${pend?TX('puDirty'):TX('puClean')}</div>
    <div class="trow"><button class="sbtn" id="puTry">${TX('puTry')}</button>
    ${on?`<span>${TX('puTo')}</span><select class="ein" id="puTarget" style="max-width:220px"><option value="*">${TX('puAll')}</option>${known.map(c=>`<option value="${esc(c)}">${TX('puOne')} ${esc(c)}</option>`).join('')}<option value="+">${TX('puOther')}</option></select><input class="ein hidden" id="puCls" placeholder="ph2026a" style="max-width:150px">
      ${teacherKey()?'':`<input class="ein" id="puKey" type="password" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="🔑 ${esc(L(TT.aKey).replace(/^\S+\s/,''))}" style="max-width:200px">`}
      <button class="sbtn g" id="puSend">${TX('puSend')}</button>`:`<button class="sbtn g" id="puDl">${TE('pbDl')}</button>`}</div>
    <p class="muted" style="margin:6px 0 0">${TX('puNow')}: ${ver}${m.note?' · '+esc(m.note):''}</p>`;
  b.prepend(el);
  $('#puTry').onclick=()=>{ edSave(); try{ sessionStorage.setItem('phd_usedraft','1'); }catch(e){} saveSession(true); location.reload(); };
  if(!on){ $('#puDl').onclick=()=>{ const {html,cfg}=buildPublishedHTML(); const t=cfg.meta.rev.replace(/[-:]/g,'').replace('T','_').slice(0,13);
    download(`PharmaDetective_${CASE_ID.toUpperCase()}_${t}.html`, html, 'text/html'); sfx.fanfare(); showModal(`<div style="font-size:48px">📦</div><h3>${TE('pbDl')}</h3><p>${TE('pbDone')}</p><p class="muted">${TE('pbDlNote')}</p>`); }; return; }
  const tSel=$('#puTarget'), tIn=$('#puCls');
  tSel.onchange=()=>{ tIn.classList.toggle('hidden',tSel.value!=='+'); if(tSel.value==='+') tIn.focus(); };
  tIn.onchange=()=>{ tIn.value=normClass(tIn.value); };
  $('#puSend').onclick=async()=>{ const k=$('#puKey'); if(k&&k.value.trim()) setTeacherKey(k.value);
    if(!teacherKey()){ toast('⚠️ '+T('onNoKey')); if(k) k.focus(); return; }
    const target=tSel.value==='+'?normClass(tIn.value):tSel.value; if(!target){ tIn.classList.remove('hidden'); tIn.focus(); return; }
    edSave(); const btn=$('#puSend'); btn.disabled=true; btn.textContent='…';
    const r=await serverPublish(target, onlinePayload());
    if(r.ok){ sfx.fanfare(); await cfgRefresh(); renderPage(); showModal(`<div style="font-size:48px">📤</div><h3>${TX('puDone')}</h3><p>${TE('pbLinkCls')}:</p><p><code style="font-size:14px">${esc(gameLink(target==='*'?'':target))}</code></p>`); }
    else { btn.disabled=false; btn.textContent=TX('puSend'); sfx.error(); toast('⚠️ '+TE('pbOnErr')+(r.error==='big'?TE('pbTooBig'):T(r.error==='badkey'?'onBadKey':r.error==='nokey'?'onNoKey':'onDown'))); } };
}
function setBasics(b){
  const s=edWork().settings, def=k=>`<small class="muted">${TX('setDef')}: ${CONFIG_DEF[k]}</small>`;
  const num=(k,lab)=>`<label class="srow"><span>${TX(lab)}</span><input class="ein enum" type="number" min="1" data-st="${k}" value="${esc(s[k]==null?'':s[k])}" placeholder="${CONFIG_DEF[k]}">${def(k)}</label>`;
  b.innerHTML=`
    <div class="box"><b>${TX('setGame')}</b>${num('VISIT_MIN','setVisit')}${num('HEARTS','setHearts')}${num('SEARCH_CHARGES','setCharges')}
      <label class="srow"><span>${TX('setQte')}</span><input type="checkbox" id="stQte" ${s.qte===false?'':'checked'}></label></div>
    <div class="box"><label class="srow"><span>${TX('setLang')}</span><select class="ein" id="stLang">${LANGS.map((l,i)=>`<option value="${l}"${(s.lang||'zh')===l?' selected':''}>${['中文','English','ไทย'][i]}</option>`).join('')}</select></label>
      <label class="srow"><span>${TX('setNote')}</span><input class="ein" id="stNote" value="${esc(s.note||'')}" placeholder="${esc(TE('stNotePh'))}"></label></div>`;
  const save=()=>{ edSave(); toast(T('saved')); renderPage(); };
  b.querySelectorAll('[data-st]').forEach(x=>x.onchange=()=>{ const v=Math.round(+x.value); if(v>0) s[x.dataset.st]=v; else delete s[x.dataset.st]; save(); });
  $('#stQte').onchange=e=>{ if(e.target.checked) delete s.qte; else s.qte=false; save(); };
  $('#stLang').onchange=e=>{ s.lang=e.target.value; save(); };
  $('#stNote').onchange=e=>{ s.note=e.target.value.trim(); if(!s.note) delete s.note; save(); };
}
function setPictures(b){ const m=mediaStore();
  b.innerHTML=`<p class="edintro">${TX('imgIntro')}</p><div class="box"><b>${T('tLabUp')}</b><div class="row" style="margin:6px 0"><button class="sbtn b" id="upLab">⬆️</button></div><div class="egrid">${(m.labImages||[]).map((s,i)=>`<div class="ev"><img src="${s}" style="width:100%"><button class="sbtn r" data-dl="${i}">${T('tDel')}</button></div>`).join('')}</div></div>
   <div class="box"><b>${T('tBagUp')}</b><div class="egrid" style="margin-top:6px">${Object.keys(ITEMS).map(id=>`<div class="ev"><div class="ic">${itemIcon(id,44)}</div><b>${esc(L(ITEMS[id].n))}</b><div class="row">${itemImages(id).map(s=>`<img src="${s}" data-zs="1" style="height:48px;border-radius:6px">`).join('')}</div><div class="row"><button class="sbtn b" data-ub="${id}">⬆️</button>${m.medBagImages&&m.medBagImages[id]?`<button class="sbtn r" data-db="${id}">${T('tDel')}</button>`:''}</div></div>`).join('')}</div></div>`;
  $('#upLab').onclick=()=>pickFiles(true,'image/*',async fs=>{ const mm=mediaStore(); for(const f of fs){ const d=await resizeImage(f,1400); if(d) mm.labImages.push(d); } store.set(CONFIG.MEDIA_KEY,mm); toast(T('saved')); renderPage(); });
  b.querySelectorAll('[data-dl]').forEach(x=>x.onclick=()=>{ const mm=mediaStore(); mm.labImages.splice(+x.dataset.dl,1); store.set(CONFIG.MEDIA_KEY,mm); renderPage(); });
  b.querySelectorAll('[data-ub]').forEach(x=>x.onclick=()=>pickFiles(false,'image/*',async fs=>{ if(!fs[0]) return; const d=await resizeImage(fs[0],1100); if(!d) return; const mm=mediaStore(); mm.medBagImages=mm.medBagImages||{}; mm.medBagImages[x.dataset.ub]=d; store.set(CONFIG.MEDIA_KEY,mm); toast(T('saved')); renderPage(); }));
  b.querySelectorAll('[data-db]').forEach(x=>x.onclick=()=>{ const mm=mediaStore(); delete mm.medBagImages[x.dataset.db]; store.set(CONFIG.MEDIA_KEY,mm); renderPage(); }); }
function renderCustom(b){ edWork(); const subs=[['set','suSet'],['q','suQ'],['txt','suTxt'],['img','suImg']]; if(!subs.some(x=>x[0]===P.sub)) P.sub='set';
  const host=document.createElement('div');
  b.innerHTML=`<p class="edintro" style="margin-bottom:8px">${TX('cuIntro')}</p><div id="cuBar"></div><div class="tsub">${subs.map(([k,l])=>`<button data-sub="${k}" class="${P.sub===k?'on':''}">${TX(l)}</button>`).join('')}</div>`;
  b.appendChild(host);
  ({set:setBasics, q:edQuestions, txt:edTexts, img:setPictures})[P.sub](host);
  pubBar($('#cuBar'));
  b.querySelectorAll('[data-sub]').forEach(x=>x.onclick=()=>{ P.sub=x.dataset.sub; ED_ST.editQ=null; sfx.click(); renderPage(); });
  if(serverURL()&&teacherKey()&&!ED_ST.pubList) serverConfigs().then(r=>{ if(r.ok){ ED_ST.pubList=r.configs; } });
}
/* ---------- 🧰 Advanced ---------- */
async function advPubList(){ const el=$('#aPubList'); if(!el) return; if(!teacherKey()){ el.textContent=TX('aNeedKey'); return; }
  const r=await serverConfigs(), box=$('#aPubList'); if(!box) return;
  if(!r.ok){ box.textContent='⚠️ '+T(r.error==='badkey'?'onBadKey':'onDown'); return; }
  ED_ST.pubList=r.configs; const hm=t=>new Date(t).toLocaleString([], {month:'short', day:'numeric', hour:'2-digit', minute:'2-digit'});
  box.innerHTML=r.configs.length?`<table class="tbl">${r.configs.map(c=>`<tr><td><b>${c.cls==='*'?TX('puAll'):esc(c.cls)}</b></td><td>${hm(c.rev)}</td><td>${esc(c.note||'')}</td><td><button class="sbtn r" data-wd="${esc(c.cls)}">${TE('pbOnWithdraw')}</button></td></tr>`).join('')}</table>`:TX('aNone');
  box.querySelectorAll('[data-wd]').forEach(x=>x.onclick=()=>{ const c=x.dataset.wd;
    showModal(`<h3>${TE('pbOnWithdraw')}</h3><p>${esc(TE('pbOnWithdrawQ').replace('{c}',c==='*'?TX('puAll'):c).replace('{f}',TE(c==='*'?'pbFOrig':'pbFAll')))}</p>`,[{t:TE('pbOnWithdraw'),cls:'r',fn:async()=>{
      const r2=await serverUnpublish(c); if(r2.ok){ toast('↩️ '+TE('pbOnWithdrawn')); await cfgRefresh(); } else toast('⚠️ '+T(r2.error==='badkey'?'onBadKey':'onDown')); if(P.cur==='teacher'&&P.tab==='tAdv') renderPage(); }},{t:T('cancel'),cls:''}]); }); }
function renderAdv(b){ const url=serverURL(), key=teacherKey(), s=edWork().settings, cls=Object.entries(SYNC.classes||{}).sort((a,c)=>a[0].localeCompare(c[0]));
  b.innerHTML=`<p class="edintro">${TX('aIntro')}</p>
   ${url?`<div class="tcard"><h3>${TX('aKey')}</h3><p class="tn">${TX('kNote')}</p><div class="trow"><input class="ein" id="aKeyIn" type="password" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" value="${esc(key)}" placeholder="••••••••" style="max-width:300px"><button class="sbtn g" id="aKeySave">${T('onSave')}</button></div></div>`:''}
   <div class="tcard"><h3>${TX('aBackup')}</h3><div class="trow"><button class="sbtn b" id="eJ">${TX('aExpJ')}</button><button class="sbtn b" id="eC">${TX('aExpC')}</button></div></div>
   ${url?`<div class="tcard"><h3>${TX('aCls')}</h3>${cls.length?`<table class="tbl">${cls.map(([c,n])=>`<tr><td><b>${esc(c)}</b></td><td>${n} ${TX('nStud')}</td><td><button class="sbtn r" data-dc="${esc(c)}" data-dn="${n}">${T('onDelCls')}</button></td></tr>`).join('')}</table>`:`<p class="tn">${TX('aClsNone')}</p>`}</div>
     <div class="tcard"><h3>${TX('aOnline')}</h3><div id="aPubList" class="muted">…</div><button class="sbtn r" id="pbReset" style="margin-top:8px">${TX('aReset')}</button></div>`:''}
   <div class="tcard"><h3>🔒 ${TX('aPin')}</h3><p class="tn">${TX('aConnNote')}</p>
     <label class="srow"><span>${TX('aPin')}</span><input class="ein enum" id="stPin" value="${esc(s.TEACHER_PIN||'')}" placeholder="••••"></label><p class="muted">🔒 ${TE('stPinWarn')}</p></div>`;
  const save=()=>{ edSave(); toast(T('saved')); };
  if($('#aKeySave')) $('#aKeySave').onclick=()=>{ setTeacherKey($('#aKeyIn').value); sfx.click(); toast('🔑 '+T('saved')); renderPage(); };
  $('#eJ').onclick=()=>download('PharmaDetective_all.json', JSON.stringify(allSessions(),null,2));
  $('#eC').onclick=()=>{ const rows=[['session','name','student_id','class','rank','score','time_s','chapter','type','text','detail']];
    allSessions().forEach(s=>(s.log||[]).filter(e=>(e.type==='ask'&&e.mode==='free')||['lockText','final','present','medrev','calc','firstMove','custom','pp','refl','hidden','ending','refused','timeout','patienceOut','inhSim'].includes(e.type)).forEach(e=>rows.push([s.id,s.student&&s.student.name,s.student&&s.student.sid,s.classCode||'main',s.rank,s.score,e.t,e.ch,e.type,(e.type==='custom'||e.type==='pp'||e.type==='refl'?e.ans:e.text)||e.item||(e.sel||[]).join(' | ')||e.tier||e.why||e.id||e.dev||'',e.type==='inhSim'?((e.ok?'OK':'FIX')+' '+(e.errs||[]).join(' ')):e.type==='pp'?(e.phase+' · '+e.q+' · '+(e.ok?'OK':'WRONG')):e.type==='refl'?e.q:e.type==='calc'?(e.id+' try'+e.attempt+' '+JSON.stringify(e.vals)+' = '+e.result+' '+(e.ok?'OK':'WRONG')):e.type==='present'?(e.st+' '+(e.ok?'OK':e.near?'NEAR':'WRONG')):e.type==='custom'?(e.cp+' · '+e.q+' · '+e.pts+'/'+e.max):(e.intent||String(e.ok==null?'':e.ok))])));
    download('PharmaDetective_text_answers.csv','﻿'+rows.map(r=>r.map(c=>'"'+String(c==null?'':c).replace(/"/g,'""')+'"').join(',')).join('\n'),'text/csv'); };
  b.querySelectorAll('[data-dc]').forEach(x=>x.onclick=()=>{ const c=x.dataset.dc;
    showModal(`<h3>${T('onDelCls')}</h3><p>${esc(T('onDelQ').replace('{c}',c).replace('{n}',x.dataset.dn))}</p>`,[{t:T('onDelCls'),cls:'r',fn:async()=>{ const r=await serverDelete(c); if(r.ok){ toast('🗑️ '+r.n); delete SYNC.classes[c]; } else toast('⚠️ '+T('onDown')); renderPage(); }},{t:T('cancel'),cls:''}]); });
  if($('#pbReset')) $('#pbReset').onclick=()=>showModal(`<h3>${TX('aReset')}</h3><p>${TX('aResetQ')}</p>`,[{t:TX('aReset'),cls:'r',fn:()=>{ const w2=edWork(), bk=clone(GAME_CFG_BASE); w2.texts=bk.texts||{}; w2.settings=bk.settings||{}; w2.questions=Array.isArray(bk.questions)?bk.questions:clone(DEFAULT_QUESTIONS); edSave(); renderPage(); }},{t:T('cancel'),cls:''}]);
  $('#stPin').onchange=e=>{ const v=e.target.value.trim(); if(v) s.TEACHER_PIN=v; else delete s.TEACHER_PIN; save(); };
  if(url) advPubList(); }
/* editor notes that pointed at the old tab names */
Object.assign(ED,{
  qIntro:['加入你自己的題目，會在你選的時間點出現；學生的答案在「👥 每位學生」。','Add your own questions; they appear at the point you choose, and students\' answers show under 👥 Students.','เพิ่มคำถามของอาจารย์เองได้ คำถามจะขึ้นในจุดที่เลือก และคำตอบของนักศึกษาดูได้ที่แท็บ 👥 ผลรายคน'],
  fKwNote:['不填關鍵字就不會自動給分；答案可以在「👥 每位學生」閱讀。','Without keywords there is no automatic scoring; read the answers under 👥 Students.','ถ้าไม่ใส่คำสำคัญ ระบบจะไม่ให้คะแนนอัตโนมัติ อาจารย์อ่านคำตอบได้ที่แท็บ 👥 ผลรายคน'],
  ppNote:['同一題問兩次：課前不給答案、不算分，課後有解答；在「📊 全班概況」比較。','The same question twice: before (no answer shown, not scored) and after (with the answer). Compare them in 📊 Class overview.','ถามข้อเดียวกันสองครั้ง: ก่อนเรียนไม่เฉลยและไม่นับคะแนน หลังเรียนมีเฉลย เปรียบเทียบได้ที่แท็บ 📊 ภาพรวมทั้งห้อง'],
  reflNote:['反思題不算分；答案在「👥 每位學生」和「📊 全班概況」。','Reflection questions are not scored; read the answers under 👥 Students and 📊 Class overview.','คำถามสะท้อนคิดไม่นับคะแนน อ่านคำตอบได้ที่แท็บ 👥 ผลรายคน และ 📊 ภาพรวมทั้งห้อง'],
  pbDlNote:['下載的檔案已經包含所有修改和上傳的圖片。用 Google Drive、LINE 或教學平台傳給學生，學生用瀏覽器（Chrome、Edge、Safari）打開。','The downloaded file already contains every change and uploaded picture. Share it by Google Drive, LINE or your LMS; students open it in a browser (Chrome, Edge, Safari).','ไฟล์ที่ดาวน์โหลดมีการแก้ไขและรูปที่อัปโหลดครบแล้ว ส่งให้นักศึกษาทาง Google Drive, LINE หรือระบบ LMS ได้เลย นักศึกษาเปิดด้วยเบราว์เซอร์ (Chrome, Edge, Safari)'],
});

/* ---------- the case chooser's instructor page is the hub: link back to it, and arrive from it on a chosen tab (?teacher=<tab>) ---------- */
function allCasesLink(){ const h=(typeof caseHome==='function')?caseHome():'', t=$('#pTitle'); if(!h||!t) return;
  const a=document.createElement('a'); a.className='tAllCases'; a.id='tAllCases'; a.href=h+'&teacher=1'; a.textContent=L(TT.allCases); t.appendChild(a); }
async function teacherDeepLink(){ let t='';
  try{ const u=new URL(location.href); t=u.searchParams.get('teacher')||''; if(!t) return; u.searchParams.delete('teacher'); history.replaceState(history.state,'',u.pathname+u.search+u.hash); }catch(e){ return; }
  P.wantTab=PAGES.teacher.tabs.includes(t)?t:null;
  if(typeof CFGS!=='undefined'&&CFGS.promise) await Promise.race([CFGS.promise, sleep(6000)]);   // this case's own instructor code may come with the published version
  let tok=null; try{ tok=sessionStorage.getItem('phd_tok'); }catch(e){}
  if(tok&&tok===String(CONFIG.TEACHER_PIN)) P.teacherOK=true;
  openPage('teacher'); }
addEventListener('load', ()=>setTimeout(teacherDeepLink, 400));
