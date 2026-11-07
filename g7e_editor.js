/* =====================================================================
   INSTRUCTOR GAME EDITOR — extra questions · text edits · settings · publish
   All changes live in GAME_CFG (draft in localStorage); "publish" bakes them
   into a brand-new single .html file that can be sent to students.
   ===================================================================== */
const ED={
 tQ:['➕ 加分題','➕ Extra questions','➕ คำถามเพิ่ม'], tTexts:['🔤 修改文字','🔤 Edit text','🔤 แก้ข้อความ'], tSet:['⚙️ 遊戲設定','⚙️ Settings','⚙️ ตั้งค่าเกม'], tPub:['📦 發布新版','📦 Publish','📦 เผยแพร่'],
 qIntro:['在遊戲中加入你自己的題目。題目會在你選的時間點出現，學生的答案會記錄在「學生紀錄」。','Add your own questions. They pop up at the point you choose, and students\' answers are saved under Sessions.','เพิ่มคำถามของคุณเองได้ คำถามจะโผล่ในจุดที่เลือก และคำตอบของนักศึกษาจะบันทึกไว้ในแท็บบันทึกนักศึกษา'],
 qAdd:['➕ 新增題目','➕ Add a question','➕ เพิ่มคำถามใหม่'], qNone:['還沒有題目，按「新增題目」開始。','No questions yet — press "Add a question".','ยังไม่มีคำถาม กด "เพิ่มคำถามใหม่" เพื่อเริ่ม'],
 qEdit:['✏️ 編輯','✏️ Edit','✏️ แก้'], qTry:['▶ 試玩','▶ Try it','▶ ลองเล่น'], qDup:['⧉ 複製','⧉ Copy','⧉ คัดลอก'], qDel:['🗑 刪除','🗑 Delete','🗑 ลบ'], qOn:['✔ 啟用中','✔ On','✔ เปิดใช้'], qOff:['⏸ 已停用','⏸ Off','⏸ ปิดไว้'],
 qDelConfirm:['確定刪除這一題？','Delete this question?','ลบคำถามนี้?'], ptsU:['分','pts','คะแนน'],
 fBack:['← 回到題目列表','← Back to the list','← กลับไปหน้ารายการ'], fKind:['① 題型','① Question type','① ชนิดคำถาม'], fWhen:['② 什麼時候出現？','② When does it appear?','② โผล่ตอนไหน?'], fWho:['③ 誰來問？','③ Who asks?','③ ใครเป็นคนถาม?'],
 fLang:['④ 內容 —— 可以只填一種語言，沒填的語言會顯示已填的內容','④ Content — one language is enough; empty languages show what you filled in','④ เนื้อหา — กรอกภาษาเดียวก็ได้ ภาษาที่ว่างจะแสดงภาษาที่กรอกไว้'],
 fQ:['題目','Question','คำถาม'], fImg:['圖片（選填）','Picture (optional)','รูปประกอบ (ไม่ใส่ก็ได้)'], fImgAdd:['🖼 上傳圖片','🖼 Upload a picture','🖼 อัปโหลดรูป'], fImgDel:['移除圖片','Remove picture','ลบรูป'],
 fOpts:['選項 —— 勾選正確答案','Choices — tick the correct answer','ตัวเลือก — ติ๊กข้อที่ถูก'], fOptAdd:['＋ 新增選項','+ Add a choice','+ เพิ่มตัวเลือก'], fCorrect:['正確','Correct','ถูก'], fOptPh:['選項','Choice','ตัวเลือก'],
 fKw:['關鍵字（選填，用逗號分隔）—— 答案裡有這些字就自動給分','Keywords (optional, separate with commas) — the answer scores automatically if it contains them','คำสำคัญ (ไม่ใส่ก็ได้ คั่นด้วยจุลภาค) — ถ้าคำตอบมีคำเหล่านี้จะได้คะแนนอัตโนมัติ'],
 fKwPh:['例如：腎, 停藥, kidney, ไต','e.g. kidney, stop, 腎, ไต','เช่น ไต, หยุดยา, kidney, 腎'], fKwMin:['至少要包含幾個關鍵字才算對','How many keywords are needed','ต้องมีคำสำคัญอย่างน้อยกี่คำจึงนับว่าถูก'],
 fKwNote:['沒填關鍵字的話，不自動給分，請到「學生紀錄」看答案。','Without keywords nothing is auto-scored — read the answers under Sessions.','ถ้าไม่ใส่คำสำคัญ ระบบจะไม่ให้คะแนนอัตโนมัติ อาจารย์อ่านคำตอบได้ในแท็บบันทึกนักศึกษา'],
 fAns:['正確答案（數字）','Correct answer (number)','คำตอบที่ถูก (ตัวเลข)'], fTol:['可接受誤差 ±（空白 = 1%）','Allowed error ± (blank = 1%)','ยอมคลาดเคลื่อน ± (ว่าง = 1%)'], fUnit:['單位','Unit','หน่วย'],
 fClues:['數字線索 —— 學生可以點來放進計算機（可以放幾個用不到的來考驗判斷力）','Number clues — students tap them into the calculator (add a few unneeded ones to test judgement)','ตัวเลขเบาะแส — นศ.แตะใส่เครื่องคิดเลขได้ (ใส่ตัวหลอกที่ไม่ต้องใช้ไว้ด้วยก็ได้)'],
 fClueAdd:['＋ 新增線索','+ Add a clue','+ เพิ่มเบาะแส'], fClueV:['數字','Number','ตัวเลข'], fClueL:['這個數字是什麼','What the number is','ตัวเลขนี้คืออะไร'],
 fFormula:['提示公式（選填，會顯示給學生）','Formula hint (optional, shown to students)','สูตรใบ้ (ไม่ใส่ก็ได้ จะแสดงให้นศ.เห็น)'],
 fEx:['解說／參考答案（作答後顯示）','Explanation / model answer (shown after answering)','คำอธิบาย / เฉลย (แสดงหลังตอบ)'], fPts:['分數','Points','คะแนน'], fTimer:['限時秒數（0 = 不限時）','Time limit in seconds (0 = none)','จับเวลา วินาที (0 = ไม่จับ)'],
 fSave:['💾 儲存','💾 Save','💾 บันทึก'], fCancel:['取消','Cancel','ยกเลิก'],
 errQ:['請輸入題目','Please write the question','กรุณาพิมพ์คำถาม'], errOpts:['至少要有 2 個有內容的選項，並勾選正確答案','Need at least 2 filled-in choices and a correct one ticked','ต้องมีตัวเลือกที่กรอกแล้วอย่างน้อย 2 ข้อ และติ๊กข้อที่ถูก'], errAns:['請輸入正確答案（數字）','Enter the correct answer as a number','ใส่คำตอบที่ถูกเป็นตัวเลข'],
 k_single:['單選題','Single choice','เลือกตอบข้อเดียว'], kd_single:['只有一個正確答案','One correct answer','มีข้อถูกข้อเดียว'], k_multi:['複選題','Multiple choice','เลือกได้หลายข้อ'], kd_multi:['可以有好幾個正確答案','Several may be correct','ข้อถูกมีได้หลายข้อ'],
 k_text:['問答題','Written answer','พิมพ์ตอบ'], kd_text:['學生自己打字，老師在後台看','Students type; you read it later','นศ.พิมพ์เอง อาจารย์อ่านภายหลัง'], k_num:['計算題','Calculation','คำนวณ'], kd_num:['答案是數字，附計算機','Numeric answer, calculator provided','คำตอบเป็นตัวเลข มีเครื่องคิดเลขให้'],
 cp_pre:['序章後、進門前','After the prologue, before entering','หลังบทนำ ก่อนเข้าบ้าน'], cp_c1:['第一章（訪談）結束後','After Ch.1 (interview)','หลังบทที่ 1 (สัมภาษณ์)'], cp_c2:['第二章（搜查）結束後','After Ch.2 (house search)','หลังบทที่ 2 (ค้นบ้าน)'],
 cp_c3:['第三章（矛盾對決）結束後','After Ch.3 (contradictions)','หลังบทที่ 3 (จับโกหก)'], cp_c4:['第四章（藥物整合）結束後','After Ch.4 (medication review)','หลังบทที่ 4 (ทบทวนยา)'], cp_c5:['最終章結束後、結算前','After the final chapter, before results','หลังบทสุดท้าย ก่อนสรุปผล'],
 w_yeh:['葉藥師','Pharmacist Yeh','เภสัชกรเย่'], w_pilly:['Pilly','Pilly','พิลลี่'], w_chen:['陳伯','Uncle Chen','ลุงเฉิน'], w_wife:['陳太太','Mrs. Chen','ป้าเฉิน'], w_sys:['旁白（老師）','Narrator (you)','ผู้บรรยาย (อาจารย์)'],
 txIntro:['搜尋想修改的文字，直接改，會自動儲存。也可以開「邊玩邊改」，在遊戲的對話框或選項上按 ✏️ 修改。','Search for any text and edit it directly — it saves automatically. Or switch on "Edit while playing" and press ✏️ on a dialogue box or choice in the game.','ค้นหาข้อความที่ต้องการแล้วแก้ได้เลย ระบบบันทึกอัตโนมัติ หรือเปิด "แก้ระหว่างเล่น" แล้วกด ✏️ บนกล่องบทพูดหรือตัวเลือกในเกม'],
 txSearch:['🔍 搜尋文字（任何語言都可以）','🔍 Search text (any language)','🔍 ค้นหาข้อความ (ภาษาใดก็ได้)'], txAll:['全部','All','ทั้งหมด'], txEdited:['只看已修改','Edited only','เฉพาะที่แก้แล้ว'], txReset:['↺ 還原','↺ Restore','↺ คืนค่าเดิม'],
 txMore:['顯示更多','Show more','แสดงเพิ่ม'], txCount:['共 {n} 筆','{n} lines','{n} รายการ'], txNone:['找不到符合的文字','No matching text','ไม่พบข้อความที่ตรงกัน'],
 txTips:['小提示：⟦ ⟧ 包住的字會變成黃色重點；「ค่ะ/ครับ」會依學生選的性別自動切換；{name} 會換成學生名字；<br> 是換行。','Tips: words inside ⟦ ⟧ become a yellow highlight; "ค่ะ/ครับ" switches with the student\'s chosen gender; {name} becomes the student\'s name; <br> is a line break.','เคล็ดลับ: คำใน ⟦ ⟧ จะเป็นไฮไลต์สีเหลือง · "ค่ะ/ครับ" เปลี่ยนตามเพศที่นศ.เลือกอัตโนมัติ · {name} จะเปลี่ยนเป็นชื่อนักศึกษา · <br> คือขึ้นบรรทัดใหม่'],
 txPlay:['✏️ 邊玩邊改','✏️ Edit while playing','✏️ แก้ระหว่างเล่น'], txPlayOn:['已開啟：關掉這個視窗回到遊戲，在對話框或選項上按 ✏️ 就能修改。','On: close this window and press ✏️ on any dialogue box or choice to edit it.','เปิดแล้ว: ปิดหน้าต่างนี้กลับไปที่เกม แล้วกด ✏️ บนกล่องบทพูดหรือตัวเลือกเพื่อแก้'],
 txEditT:['修改這句','Edit this line','แก้ข้อความนี้'], txNotEditable:['這句包含遊戲中會變動的數字，不能在這裡修改。','This line contains numbers that change during play, so it can\'t be edited here.','ข้อความนี้มีตัวเลขที่เปลี่ยนระหว่างเล่น จึงแก้ตรงนี้ไม่ได้'],
 cat_ui:['按鈕與系統文字','Buttons & system text','ปุ่มและข้อความระบบ'], cat_chars:['角色介紹','Character cards','การ์ดตัวละคร'], cat_items:['證物','Evidence','หลักฐาน'], cat_final:['最後總結的評分','Final summary checklist','เช็กลิสต์สรุปท้ายเกม'],
 cat_case:['個案資料・問題・檢驗','Case data, problems, labs','ข้อมูลเคส ปัญหา ผลแล็บ'], cat_ch2:['第二章 搜查','Ch.2 House search','บท 2 ค้นบ้าน'], cat_sys:['系統訊息','System messages','ข้อความระบบเกม'], cat_calc:['計算題','Calculations','โจทย์คำนวณ'],
 cat_prologue:['序章','Prologue','บทนำ'], cat_ch1:['第一章 訪談','Ch.1 Interview','บท 1 สัมภาษณ์'], cat_ch3:['第三章 矛盾對決','Ch.3 Contradictions','บท 3 จับโกหก'], cat_ch4:['第四章 藥物整合','Ch.4 Medication review','บท 4 ทบทวนยา'],
 cat_ch5:['最終章 大魔王','Ch.5 Myth Overlord','บท 5 จอมมาร'], cat_epi:['後記・結局・徽章','Epilogue, endings & badges','บทส่งท้าย ตอนจบ และเหรียญ'], cat_results:['結算畫面','Results screen','หน้าสรุปผล'], cat_pages:['案件檔案・後台','Case file & dashboard','แฟ้มคดีและหน้าอาจารย์'],
 stIntro:['這些設定在「開始新遊戲」時生效。','These take effect when a new game starts.','การตั้งค่าเหล่านี้มีผลเมื่อเริ่มเกมใหม่'], stVisit:['拜訪時間（分鐘）','Visit time (minutes)','เวลาเยี่ยมบ้าน (นาที)'], stHearts:['矛盾對決的愛心數','Hearts in the contradiction duel','จำนวนหัวใจตอนจับโกหก'],
 stCharges:['搜查時的放大鏡次數','Magnifier uses in the search','จำนวนครั้งที่ใช้แว่นขยายตอนค้นบ้าน'], stQte:['限時選項預設開啟','Timed choices on by default','เปิดตัวเลือกจับเวลาเป็นค่าเริ่มต้น'], stLang:['預設語言','Default language','ภาษาเริ่มต้น'],
 stServer:['結果伺服器網址','Results server address','ที่อยู่เซิร์ฟเวอร์รับผล'], stServerNote:['留空＝不自動上傳（學生要自己下載報告繳交）。預設：','Leave blank to switch automatic hand-in off (students then download their report). Default: ','เว้นว่าง = ปิดการส่งอัตโนมัติ (นักศึกษาต้องดาวน์โหลดรายงานส่งเอง) ค่าเริ่มต้น: '],
 stClass:['預設班級代碼','Default class code','รหัสห้องเริ่มต้น'], stClassNote:['連結裡有 ?class=… 時以連結為準','A ?class=… in the link takes priority','ถ้าลิงก์มี ?class=… จะใช้ค่าจากลิงก์'],
 stPin:['教師後台密碼','Instructor PIN','รหัสเข้าหน้าอาจารย์'], stPinWarn:['密碼只能防止學生不小心進來，不是真正的保密。','The PIN only keeps students out casually — it is not real security.','รหัสนี้กันนักศึกษาเข้ามาโดยไม่ตั้งใจเท่านั้น ไม่ใช่ระบบความปลอดภัยจริง'],
 stNote:['版本說明（顯示在標題畫面，讓學生確認拿到的是新版）','Version note (shown on the title screen so students know they have the new file)','หมายเหตุเวอร์ชัน (แสดงที่หน้าแรก ให้นศ.รู้ว่าได้ไฟล์ใหม่)'], stNotePh:['例如：2026 下學期・王老師','e.g. Spring 2026 · Dr. Wang','เช่น ภาค 2/2569 · อ.สมศรี'], stDefault:['預設','Default','ค่าเดิม'],
 pbSteps:['① 修改 → ② 試玩 → ③ 下載新版 → ④ 把新檔案傳給學生','① Edit → ② Try it → ③ Download the new version → ④ Send the new file to students','① แก้ไข → ② ทดลองเล่น → ③ ดาวน์โหลดเวอร์ชันใหม่ → ④ ส่งไฟล์ใหม่ให้นักศึกษา'],
 pbSummary:['目前的修改：加分題 {q} 題・修改文字 {t} 處・設定 {s} 項','Current changes: {q} extra questions · {t} text edits · {s} settings','การแก้ไขตอนนี้: คำถามเพิ่ม {q} ข้อ · แก้ข้อความ {t} จุด · ตั้งค่า {s} อย่าง'],
 pbPlay:['▶ 從頭試玩這個版本','▶ Play this version from the start','▶ ทดลองเล่นเวอร์ชันนี้ตั้งแต่ต้น'], pbDl:['⬇️ 下載新版遊戲（.html）','⬇️ Download the new game (.html)','⬇️ ดาวน์โหลดเกมเวอร์ชันใหม่ (.html)'],
 pbDlNote:['下載的檔案已經包含所有修改（也包含「素材」分頁上傳的圖片），直接傳給學生就好：Google Drive、LINE、教學平台都可以。學生下載後用瀏覽器（Chrome、Edge、Safari）打開。','The downloaded file already contains every change (and pictures from the Media tab). Send it to students by Google Drive, LINE or your LMS; they download it and open it in a browser (Chrome, Edge, Safari).','ไฟล์ที่ดาวน์โหลดมีการแก้ไขครบแล้ว (รวมรูปจากแท็บสื่อ) ส่งให้นักศึกษาทาง Google Drive, LINE หรือระบบ LMS ได้เลย นักศึกษาดาวน์โหลดแล้วเปิดด้วยเบราว์เซอร์ (Chrome, Edge, Safari)'],
 pbExp:['⬇️ 匯出修改包（.json）','⬇️ Export my changes (.json)','⬇️ ส่งออกชุดการแก้ไข (.json)'], pbImp:['⬆️ 匯入修改包','⬆️ Import changes','⬆️ นำเข้าชุดการแก้ไข'],
 pbShare:['修改包可以分享給其他老師：對方匯入後，再下載自己的新版。','Share a changes file with colleagues: they import it, then download their own new version.','ชุดการแก้ไขแชร์ให้อาจารย์ท่านอื่นได้ อีกฝ่ายนำเข้าแล้วดาวน์โหลดเวอร์ชันของตัวเอง'],
 pbReset:['↺ 清除所有修改（回到原版）','↺ Clear all changes (back to the original)','↺ ล้างการแก้ไขทั้งหมด (กลับเป็นต้นฉบับ)'], pbResetQ:['確定清除所有修改？已經下載的檔案不受影響。','Clear all changes? Files you already downloaded are not affected.','ล้างการแก้ไขทั้งหมด? ไฟล์ที่ดาวน์โหลดไปแล้วไม่ได้รับผลกระทบ'],
 pbDirty:['⚠️ 有修改還沒下載成新版','⚠️ Some changes are not in a downloaded file yet','⚠️ มีการแก้ไขที่ยังไม่ได้ดาวน์โหลดเป็นไฟล์ใหม่'], pbClean:['✅ 目前和這個檔案一樣，沒有新的修改','✅ No changes compared with this file','✅ ยังไม่มีการแก้ไขใหม่จากไฟล์นี้'],
 pbDone:['已下載新版！把這個檔案傳給學生就可以了。舊檔案請不要再發。','New version downloaded! Send this file to your students and stop sharing the old one.','ดาวน์โหลดเวอร์ชันใหม่แล้ว! ส่งไฟล์นี้ให้นักศึกษา และเลิกแจกไฟล์เก่า'],
 pbImported:['已匯入修改包','Changes imported','นำเข้าชุดการแก้ไขแล้ว'], pbBad:['這個檔案不是修改包','This file is not a changes file','ไฟล์นี้ไม่ใช่ชุดการแก้ไข'], pbThisFile:['這個檔案的版本','This file\'s version','เวอร์ชันของไฟล์นี้'], pbOrig:['原版','Original','ต้นฉบับ'],
 pbStepsOn:['① 修改 → ② 試玩 → ③ 發布給學生 → 學生的連結自動更新','① Edit → ② Try it → ③ Publish to students → their link updates by itself','① แก้ไข → ② ทดลองเล่น → ③ เผยแพร่ให้นักศึกษา → ลิงก์ของนักศึกษาอัปเดตเอง'],
 pbOnH:['☁️ 發布給學生（用原本的連結）','☁️ Publish to students (same link as before)','☁️ เผยแพร่ให้นักศึกษา (ใช้ลิงก์เดิม)'],
 pbOnIntro:['按下發布，學生打開原本的遊戲連結就是這個版本，不用再傳檔案。已經開著遊戲的學生，重新整理頁面就會更新。','Press Publish and students who open the usual game link get this version — no new file to send. Students who already have the game open just reload the page.','กดเผยแพร่แล้ว นักศึกษาที่เปิดลิงก์เกมเดิมจะได้เวอร์ชันนี้ ไม่ต้องส่งไฟล์ใหม่ ใครเปิดเกมค้างไว้ให้โหลดหน้าใหม่'],
 pbTarget:['發布給','Publish for','เผยแพร่ให้'], pbAll:['所有連結','Every link','ทุกลิงก์'], pbOneCls:['只給班級','Only class','เฉพาะห้อง'], pbOtherCls:['其他班級代碼…','Another class code…','รหัสห้องอื่น…'],
 pbOnline:['☁️ 發布給學生','☁️ Publish to students','☁️ เผยแพร่ให้นักศึกษา'], pbOnDone:['已發布！學生打開連結就是新版本。','Published! Students get this version when they open the link.','เผยแพร่แล้ว! นักศึกษาเปิดลิงก์ก็ได้เวอร์ชันนี้เลย'],
 pbLinkCls:['學生用的連結','The link students use','ลิงก์ที่นักศึกษาใช้'], pbOnNow:['目前線上的版本','Published now','เวอร์ชันที่เผยแพร่อยู่ตอนนี้'], pbOnNone:['還沒有發布過，學生看到的是原版遊戲。','Nothing published yet — students see the original game.','ยังไม่เคยเผยแพร่ นักศึกษาเห็นเกมต้นฉบับ'],
 pbOnNeedKey:['輸入教師金鑰後，這裡會列出已發布的版本。','Enter the instructor key to see what is published.','ใส่รหัสอาจารย์แล้วจะเห็นรายการเวอร์ชันที่เผยแพร่'],
 pbOnWithdraw:['撤回','Withdraw','ถอนออก'], pbOnWithdrawn:['已撤回','Withdrawn','ถอนออกแล้ว'], pbOnWithdrawQ:['撤回「{c}」的線上版本？學生會改為看到{f}。','Withdraw the online version for "{c}"? Students will see {f} instead.','ถอนเวอร์ชันออนไลน์ของ "{c}"? นักศึกษาจะกลับไปเห็น{f}'],
 pbFAll:['「所有連結」的版本','the every-link version','เวอร์ชันของทุกลิงก์'], pbFOrig:['原版遊戲','the original game','เกมต้นฉบับ'],
 pbOnErr:['發布失敗：','Could not publish: ','เผยแพร่ไม่สำเร็จ: '], pbTooBig:['太大了（圖片太多），請刪掉一些圖片','too large (too many pictures) — remove some pictures','ใหญ่เกินไป (รูปเยอะเกิน) ลองลบรูปออกบ้าง'],
 pbKeyNeed:['發布需要教師金鑰','Publishing needs the instructor key','การเผยแพร่ต้องใช้รหัสอาจารย์'],
 pbDirtyOn:['⚠️ 有修改還沒發布，學生還看不到','⚠️ Some changes are not published yet — students cannot see them','⚠️ มีการแก้ไขที่ยังไม่เผยแพร่ นักศึกษายังไม่เห็น'], pbCleanOn:['✅ 學生看到的就是這個版本','✅ Students see exactly this version','✅ นักศึกษาเห็นเวอร์ชันนี้อยู่แล้ว'],
 pbOnStudents:['學生目前的版本','What students have now','เวอร์ชันที่นักศึกษาใช้อยู่'], pbBar:['有修改還沒發布給學生','Changes not published to students yet','มีการแก้ไขที่ยังไม่ได้เผยแพร่ให้นักศึกษา'],
 pbFileH:['或：下載成檔案（離線也能玩）','Or: download as a file (plays offline too)','หรือ: ดาวน์โหลดเป็นไฟล์ (เล่นแบบออฟไลน์ได้)'],
 pbResetOn:['↺ 清除還沒發布的修改','↺ Discard unpublished changes','↺ ล้างการแก้ไขที่ยังไม่เผยแพร่'], pbResetOnQ:['清除還沒發布的修改，回到學生目前看到的版本？','Discard the changes you have not published and go back to the version students see now?','ล้างการแก้ไขที่ยังไม่เผยแพร่ กลับไปเป็นเวอร์ชันที่นักศึกษาเห็นอยู่ตอนนี้?'],
 tCustom:['老師的加分題','Instructor questions','คำถามจากอาจารย์'],
 cp_pp:['📊 前測＋後測（序章後、最後各問一次）','📊 Pre- & post-test (after the prologue AND at the end)','📊 ก่อน+หลังเรียน (ถามหลังบทนำ และอีกครั้งตอนจบ)'], cp_refl:['💭 反思題（遊戲最後）','💭 Reflection (end of the game)','💭 คำถามสะท้อนคิด (ท้ายเกม)'],
 ppNote:['同一題會問兩次：前測不顯示對錯、不計分；後測顯示解答。到「全班概況」比較前後測。','Each question is asked twice: the pre-test shows no answers and isn\'t scored; the post-test shows answers. Compare them in Class overview.','ถามข้อเดียวกันสองครั้ง: ก่อนเรียนไม่เฉลยและไม่นับคะแนน หลังเรียนมีเฉลย เปรียบเทียบได้ในแท็บภาพรวมชั้นเรียน'],
 reflNote:['反思題不計分，學生的回答在「學生紀錄」和「全班概況」。','Reflection answers aren\'t scored — read them under Sessions and Class overview.','คำถามสะท้อนคิดไม่นับคะแนน อ่านคำตอบได้ในแท็บบันทึกนักศึกษาและภาพรวมชั้นเรียน'],
 defNote:['已預先放好 6 題前後測和 3 題反思題，可以直接修改、停用或刪除。','6 pre/post-test questions and 3 reflection questions are preloaded — edit, switch off or delete them as you like.','มีคำถามก่อน/หลังเรียน 6 ข้อ และคำถามสะท้อนคิด 3 ข้อเตรียมไว้แล้ว แก้ ปิด หรือลบได้ตามต้องการ'],
 qRestore:['↺ 放回預設的前後測／反思題','↺ Restore the default pre/post & reflection questions','↺ ใส่คำถามก่อน/หลังเรียนและสะท้อนคิดตั้งต้นกลับ'], qRestored:['已放回預設題目','Default questions restored','ใส่คำถามตั้งต้นกลับแล้ว'],
 stMode:['遊戲模式','Game mode','โหมดเกม'], stModeChoose:['學生自己選','Students choose','ให้นักศึกษาเลือกเอง'],
 stModeNote:['練習：有提示和解說。考試：沒有提示、選項隨機、「接近」的證物也算錯、解說留到最後。','Practice: hints and explanations. Exam: no hints, shuffled options, "close" evidence counts as wrong, explanations at the end.','ฝึกซ้อม: มีคำใบ้และคำอธิบาย · สอบ: ไม่มีคำใบ้ ตัวเลือกสุ่ม หลักฐานที่ "ใกล้เคียง" นับว่าผิด คำอธิบายรอตอนท้าย'],
};
/* default questions: 6 pre/post-test items (same items asked twice) + 3 reflection prompts — instructors can edit them */
const DQ=(id,q,opts,ex)=>({id, kind:'single', cp:'pp', who:'sys', q, img:'', opts:opts.map((t,i)=>({t, ok:i===0})), ex, pts:0, timer:0, kw:'', kwMin:1, ans:'', tol:'', unit:'', clues:[], formula:['','',''], off:false});
const DR=(id,q)=>({id, kind:'text', cp:'refl', who:'yeh', q, img:'', opts:[], ex:['','',''], pts:0, timer:0, kw:'', kwMin:1, ans:'', tol:'', unit:'', clues:[], formula:['','',''], off:false});
const DEFAULT_QUESTIONS=[
 Object.assign(DQ('pp_door',['到病人家做居家訪視，進門後「第一件事」最適合做什麼？','On a home visit, what is the best FIRST thing to do after entering the home?','เมื่อไปเยี่ยมบ้านผู้ป่วย สิ่ง "แรก" ที่ควรทำหลังเข้าบ้านคืออะไร?'],[
  ['向病人問好、自我介紹，說明來意與時間並取得同意','Greet him, introduce yourself, explain why and how long, ask his consent','ทักทาย แนะนำตัว บอกจุดประสงค์และเวลา แล้วขอความยินยอมจากผู้ป่วย'],
  ['先檢查屋內所有藥品，掌握病人每天實際的用藥','Check every medicine in the house first to see what he really takes','ตรวจยาทั้งหมดในบ้านก่อน เพื่อดูว่าผู้ป่วยใช้ยาอะไรจริงในแต่ละวัน'],
  ['先請家屬到一旁，私下了解病人平常的服藥習慣','Take the family member aside first and ask how he takes his pills','ขอคุยกับญาติเป็นการส่วนตัวก่อน เพื่อทราบพฤติกรรมการกินยาของผู้ป่วย'],
  ['馬上開始問用藥史，把握有限的拜訪時間不浪費','Start the medication history at once so no visit time is wasted','เริ่มซักประวัติการใช้ยาทันที เพื่อไม่ให้เสียเวลาเยี่ยมที่มีจำกัด']],
  ['居家訪視時藥師是「客人」：先建立關係、說明目的並取得同意，之後才問診、經同意看藥、邀請家屬參與。','In a home visit the pharmacist is a guest: build rapport, explain the purpose and get consent first — then interview, look at medicines with permission and involve the family.','ในการเยี่ยมบ้าน เภสัชกรเป็น "แขก" ต้องสร้างสัมพันธภาพ บอกจุดประสงค์ และขอความยินยอมก่อน จากนั้นจึงซักประวัติ ขออนุญาตดูยา และชวนญาติร่วมคุย']),{off:true}),
 DQ('pp_metformin',['65 歲男性糖尿病人，eGFR 約 23 mL/min/1.73m²，正在吃 metformin 500 mg 一天三次。最適當的建議是？','A 65-year-old man with diabetes has an eGFR of about 23 mL/min/1.73m² and takes metformin 500 mg three times a day. The most appropriate recommendation is:','ชายอายุ 65 ปีเป็นเบาหวาน eGFR ประมาณ 23 mL/min/1.73m² กิน metformin 500 mg วันละ 3 ครั้ง ข้อเสนอแนะที่เหมาะสมที่สุดคือ'],[
  ['建議停用 metformin（eGFR < 30 禁用）並調整治療','Stop metformin (contraindicated below eGFR 30) and re-plan therapy','เสนอหยุด metformin (ห้ามใช้เมื่อ eGFR < 30) และปรับแผนการรักษา'],
  ['劑量減半成一天 750 mg，繼續使用並定期監測腎功能','Halve it to 750 mg a day, continue it and monitor kidney function','ลดขนาดครึ่งหนึ่งเหลือ 750 mg/วัน ใช้ต่อและติดตามการทำงานของไต'],
  ['維持原本劑量，因為 metformin 本身不會傷害腎臟','Keep the same dose, because metformin itself does not harm the kidneys','ใช้ขนาดเดิมต่อไปได้ เพราะ metformin ไม่ได้ทำลายไตโดยตรงเลย'],
  ['改成飯前服用，減少腸胃不適等副作用，其他照舊','Switch to taking it before meals to cut down stomach side effects','เปลี่ยนเป็นกินก่อนอาหาร เพื่อลดผลข้างเคียงต่อกระเพาะก็พอ']],
  ['Metformin 在 eGFR < 30 禁用（乳酸中毒風險）；eGFR 30–45 不建議新開始，已使用者要減量。','Metformin is contraindicated below eGFR 30 (lactic acidosis risk); between 30 and 45 don\'t start it, and reduce the dose if already taking it.','Metformin ห้ามใช้เมื่อ eGFR < 30 (เสี่ยงภาวะกรดแลคติก) ช่วง 30–45 ไม่ควรเริ่มใหม่ และถ้าใช้อยู่ต้องลดขนาด']),
 DQ('pp_triple',['下列哪一個「藥物組合」最會增加急性腎損傷的風險？','Which drug combination most increases the risk of acute kidney injury?','การใช้ยาร่วมกันแบบใดเพิ่มความเสี่ยงไตวายเฉียบพลันมากที่สุด?'],[
  ['ARB ＋ 利尿劑 ＋ NSAID 止痛藥','ARB + diuretic + NSAID painkiller','ARB + ยาขับปัสสาวะ + ยาแก้ปวด NSAID'],
  ['ARB ＋ 鈣離子阻斷劑 ＋ acetaminophen','ARB + calcium-channel blocker + acetaminophen','ARB + ยากลุ่ม CCB + acetaminophen'],
  ['Metformin ＋ acarbose ＋ glimepiride','Metformin + acarbose + glimepiride','Metformin + acarbose + glimepiride'],
  ['抗組織胺 ＋ 偽麻黃鹼 ＋ 鼻用類固醇','Antihistamine + pseudoephedrine + nasal steroid','ยาแก้แพ้ + pseudoephedrine + สเตียรอยด์พ่นจมูก']],
  ['「三重打擊」(triple whammy)：ARB/ACEI 擴張出球小動脈、利尿劑減少血容量、NSAID 收縮入球小動脈——腎臟灌流驟降。','The "triple whammy": an ARB/ACEI dilates the efferent arteriole, a diuretic lowers volume and an NSAID constricts the afferent arteriole — renal perfusion collapses.','"Triple whammy": ARB/ACEI ขยายหลอดเลือดขาออก ยาขับปัสสาวะลดปริมาตรเลือด และ NSAID หดหลอดเลือดขาเข้า — เลือดไปเลี้ยงไตลดฮวบ']),
 Object.assign(DQ('pp_pseudo',['病人同時從三位醫師拿到含 pseudoephedrine 的鼻炎藥。最需要擔心的是？','A patient gets pseudoephedrine-containing allergy pills from three doctors at once. The main concern is:','ผู้ป่วยได้รับยาภูมิแพ้ที่มี pseudoephedrine จากแพทย์ 3 คนพร้อมกัน สิ่งที่น่ากังวลที่สุดคือ'],[
  ['重複用藥超量：血壓升高、心悸、失眠、排尿困難','Duplicate overdose: high BP, palpitations, insomnia, urinary retention','ได้ยาซ้ำเกินขนาด: ความดันสูง ใจสั่น นอนไม่หลับ ปัสสาวะลำบาก'],
  ['一起吃效果比較強，鼻炎症狀可以控制得更好','Taking them together works better, so the symptoms are controlled','กินรวมกันได้ผลแรงขึ้น อาการภูมิแพ้จึงควบคุมได้ดีกว่าเดิม'],
  ['主要副作用是嗜睡，提醒他不要開車就可以了','The main problem is drowsiness — just remind him not to drive','ปัญหาหลักคือง่วงซึม แค่เตือนผู้ป่วยไม่ให้ขับรถก็เพียงพอ'],
  ['會讓血糖下降，需要增加降血糖藥物的劑量','It lowers blood sugar, so his diabetes drugs need to be increased','ทำให้น้ำตาลในเลือดต่ำลง จึงต้องเพิ่มขนาดยาเบาหวาน']],
  ['Pseudoephedrine 每日上限 240 mg，重複處方很容易超量，對高血壓病人特別危險。','Pseudoephedrine tops out at 240 mg a day; duplicate prescriptions easily exceed it — especially dangerous with hypertension.','Pseudoephedrine ขนาดสูงสุด 240 mg/วัน ใบสั่งยาซ้ำซ้อนทำให้เกินขนาดได้ง่าย อันตรายมากในผู้ป่วยความดันสูง']),{off:true}),
 DQ('pp_crcl',['肥胖病人（BMI 30）用「實際體重」算 Cockcroft–Gault CrCl，結果通常會？','In an obese patient (BMI 30), using ACTUAL body weight in the Cockcroft–Gault CrCl usually:','ในผู้ป่วยอ้วน (BMI 30) ถ้าใช้ "น้ำหนักจริง" คำนวณ CrCl ด้วย Cockcroft–Gault ผลมักจะเป็นอย่างไร?'],[
  ['高估腎功能，所以常改用理想或調整體重','Overestimates kidney function, so ideal or adjusted weight is used','ประเมินไตสูงเกินจริง จึงมักใช้น้ำหนักในอุดมคติหรือน้ำหนักปรับ'],
  ['低估腎功能，所以用實際體重才最準確','Underestimates kidney function, so actual weight is the most accurate','ประเมินการทำงานของไตต่ำเกินจริง จึงควรใช้น้ำหนักจริงที่แม่นที่สุด'],
  ['沒有影響，因為公式裡根本沒有用到體重','Makes no difference, because weight is not in the formula at all','ไม่มีผลอะไรเลย เพราะสูตร Cockcroft–Gault ไม่ได้ใช้น้ำหนัก'],
  ['結果和 eGFR 完全一樣，兩者可以互相替換','Gives exactly the eGFR value, so the two are interchangeable','ได้ค่าเท่ากับ eGFR พอดี จึงใช้แทนกันได้ในทุกกรณีของผู้ป่วย']],
  ['脂肪組織產生的肌酸酐少，用實際體重會高估；肥胖時常用調整體重（AdjBW）。','Fat tissue makes little creatinine, so actual weight overestimates; adjusted body weight (AdjBW) is often used in obesity.','เนื้อเยื่อไขมันสร้างครีเอตินินน้อย ใช้น้ำหนักจริงจึงประเมินสูงเกิน คนอ้วนมักใช้น้ำหนักปรับ (AdjBW)']),
 Object.assign(DQ('pp_teach',['衛教結束前，確認病人真的聽懂的最好方法是？','Before ending your counselling, the best way to confirm the patient really understood is to:','ก่อนจบการให้คำแนะนำ วิธีที่ดีที่สุดในการยืนยันว่าผู้ป่วยเข้าใจจริงคือ'],[
  ['請他用自己的話說一次回家要怎麼吃藥','Ask him to say in his own words how he will take his medicines','ให้ผู้ป่วยอธิบายด้วยคำของตัวเองว่ากลับบ้านจะกินยาอย่างไร'],
  ['問他「這樣清楚嗎？」，點頭就代表懂了','Ask "Is that clear?" — if he nods, he has understood it','ถามว่า "เข้าใจไหม?" ถ้าผู้ป่วยพยักหน้าแปลว่าเข้าใจแล้ว'],
  ['把所有資訊印成一份詳細的書面資料給他','Hand him a detailed printed sheet that has all the information','ให้เอกสารที่พิมพ์ข้อมูลทั้งหมดไว้อย่างละเอียดกลับไปอ่าน'],
  ['請家屬簽名，保證之後會負責提醒病人','Have a family member sign that they will remind him every day','ให้ญาติเซ็นรับรองว่าจะช่วยเตือนผู้ป่วยกินยาทุกวัน']],
  ['Teach-back：請病人用自己的話複述，是確認理解最有效的方法；點頭不等於聽懂。','Teach-back — the patient restates the plan in his own words — is the most reliable check of understanding; a nod is not understanding.','Teach-back ให้ผู้ป่วยพูดทวนด้วยคำของตัวเอง เป็นวิธียืนยันความเข้าใจที่ดีที่สุด การพยักหน้าไม่ได้แปลว่าเข้าใจ']),{off:true}),
 DR('rf_moment',['回想這次訪視：哪一個「關鍵時刻」讓你發現了重要問題？你當時是怎麼想的？','Looking back on the visit: which key moment led you to an important problem, and what were you thinking at the time?','ย้อนนึกถึงการเยี่ยมครั้งนี้: ช่วงเวลาสำคัญไหนที่ทำให้คุณพบปัญหาสำคัญ และตอนนั้นคุณคิดอย่างไร?']),
 Object.assign(DR('rf_redo',['如果重來一次，有哪一件事你會「做得不一樣」？為什麼？','If you could do the visit again, what is one thing you would do differently, and why?','ถ้าได้เยี่ยมใหม่อีกครั้ง มีอะไรหนึ่งอย่างที่คุณจะทำต่างออกไป และเพราะอะไร?']),{off:true}),
 Object.assign(DR('rf_apply',['這次學到的哪一點，你會用在真實的居家訪視或藥局工作上？','Which lesson from this case will you use on a real home visit or in the pharmacy?','บทเรียนข้อไหนจากเคสนี้ที่คุณจะนำไปใช้ในการเยี่ยมบ้านจริงหรือในร้านยา?']),{off:true}),
];
const gameQuestions=()=>Array.isArray(GAME_CFG.questions)?GAME_CFG.questions:DEFAULT_QUESTIONS;
const TE=k=>ED[k]?(ED[k][LI()]||ED[k][0]):k;
const QKIND_IC={single:'🔘',multi:'☑️',text:'✍️',num:'🧮'}, QCPS=['pp','pre','c1','c2','c3','c4','c5','refl'], QWHO=['yeh','pilly','chen','wife','sys'];
const WHO_IC={yeh:'👩‍⚕️',pilly:'💊',chen:'👴',wife:'👵',sys:'📝'};
const ED_ST={work:null, editQ:null, lang:0, txQuery:'', txCat:'all', txEdited:false, txLimit:40, txList:[]};
const clone=o=>JSON.parse(JSON.stringify(o));
/* ---------- working copy (draft) ---------- */
function cfgNorm(c){ c=c||{}; const s={}; Object.entries(c.settings||{}).forEach(([k,v])=>{ if(v!==''&&v!=null) s[k]=v; }); return JSON.stringify({t:c.texts||{}, s, q:Array.isArray(c.questions)?c.questions:DEFAULT_QUESTIONS}); }
function edWork(){
  if(!ED_ST.work){ let d=null; try{ d=JSON.parse(localStorage.getItem(CFG_DRAFT_KEY)||'null'); }catch(e){}
    const w=d||clone(GAME_CFG_BASE); delete w.media; delete w.meta; w.texts=w.texts||{}; w.settings=w.settings||{}; if(!Array.isArray(w.questions)) w.questions=clone(DEFAULT_QUESTIONS);
    ED_ST.work=w; ED_ST.lang=LI(); try{ sessionStorage.setItem('phd_usedraft','1'); }catch(e){}
    GAME_CFG=Object.assign({}, w, {media:GAME_CFG_BASE.media, meta:GAME_CFG_BASE.meta}); loadOverrides(); }
  return ED_ST.work;
}
function edSave(){ const w=ED_ST.work; try{ localStorage.setItem(CFG_DRAFT_KEY, JSON.stringify(w)); }catch(e){ toast('⚠️ '+e.name); }
  GAME_CFG=Object.assign({}, w, {media:GAME_CFG_BASE.media, meta:GAME_CFG_BASE.meta}); loadOverrides(); applyCfgSettings(); }
const edDirty=()=>cfgNorm(edWork())!==cfgNorm(GAME_CFG_BASE);
/* ---------- text catalog: every [中文, English, ไทย] line in this file ---------- */
let TEXT_CAT=null;
function buildTextCatalog(){
  if(TEXT_CAT) return TEXT_CAT;
  const src=__SELF_HTML, A=s=>s.replace('|','');
  const anchors=[['const |UI = {','ui'],['const |CHAR_INFO','chars'],['const |ITEMS = {','items'],['const |KEY_ITEMS','final'],['const |IMG={','skip'],['MEDIA.|labImages=','case'],['const |INTENTS','skip'],
    ['const |HOTSPOTS','ch2'],['const |S = {','sys'],['function |ckdEpi2021','calc'],['async function |prologue','prologue'],['const |TOPICS1','ch1'],['function |camReset','ch2'],['const |TESTI','ch3'],
    ['const |SRC','ch4'],['const |MYTHS','ch5'],['async function |timeoutEnd','epi'],['function |rankGate','results'],['const |ED={','skip'],['const |P={cur','pages']]
    .map(([a,c])=>[src.indexOf(A(a)),c]).filter(x=>x[0]>=0).sort((a,b)=>a[0]-b[0]);
  const rx=/\[\s*('(?:[^'\\\n]|\\.)*'|"(?:[^"\\\n]|\\.)*"|`(?:[^`\\]|\\.)*`)\s*,\s*('(?:[^'\\\n]|\\.)*'|"(?:[^"\\\n]|\\.)*"|`(?:[^`\\]|\\.)*`)\s*,\s*('(?:[^'\\\n]|\\.)*'|"(?:[^"\\\n]|\\.)*"|`(?:[^`\\]|\\.)*`)\s*\]/g;
  const ev=s=>{ if(s[0]==='`'){ s=s.replace(/\$\{nm\(\)\}/g,'{name}'); if(s.includes('${')) return null; } try{ return Function('"use strict";return ('+s+');')(); }catch(e){ return null; } };
  const out=[], seen=new Set(); let m;
  while((m=rx.exec(src))){
    let cat='other'; for(const [pos,c] of anchors){ if(pos<=m.index) cat=c; else break; } if(cat==='skip') continue;
    const v=[ev(m[1]),ev(m[2]),ev(m[3])]; if(v.some(x=>typeof x!=='string')) continue;
    if(!/[㐀-鿿]/.test(v[0])&&!/[฀-๿]/.test(v[2])) continue; if(seen.has(v[0])) continue; seen.add(v[0]);
    const pre=src.slice(Math.max(0,m.index-50),m.index); const sp=(pre.match(/'(chen|wife|yeh|me|pilly|sys)'\s*,\s*[^,]{1,40},\s*$/)||[])[1]||(/\bt:\s*$/.test(pre)?'choice':'');
    out.push({k:v[0], v, c:cat, w:sp});
  }
  return TEXT_CAT=out;
}
function setTextOverride(e, vals){ const w=edWork(); if(!vals||vals.every((x,i)=>x===e.v[i])) delete w.texts[e.k]; else w.texts[e.k]=vals.map((x,i)=>x===e.v[i]?'':x); edSave(); }
const curText=e=>{ const o=edWork().texts[e.k]; return [0,1,2].map(i=>o&&o[i]?o[i]:e.v[i]); };
/* ---------- edit while playing (✏️ on the dialogue box and on choices) ---------- */
D.editPlay=(()=>{ try{ return sessionStorage.getItem('phd_editplay')==='1'; }catch(e){ return false; } })();
function lineKey(a){ let k=a&&a[0]; const n=S.student.name; if(typeof k!=='string') return null; if(n&&k.includes(n)) k=k.split(n).join('{name}'); return k; }
function openLineEditor(a, onDone){
  const k=lineKey(a), e=k&&buildTextCatalog().find(x=>x.k===k); if(!e){ showModal(`<p>${TE('txNotEditable')}</p>`); return; }
  const cur=curText(e);
  showModal(`<h3>✏️ ${TE('txEditT')}</h3><div class="lmodal">${[0,1,2].map(i=>`<label><span>${['中文','English','ไทย'][i]}</span><textarea id="le${i}" rows="3">${esc(cur[i])}</textarea></label>`).join('')}</div><p class="muted" style="text-align:left">${esc(TE('txTips'))}</p>`,
    [{t:TE('fSave'),keep:true,fn:c=>{ setTextOverride(e,[0,1,2].map(i=>c.querySelector('#le'+i).value)); nextModal(); toast(T('saved')); onDone&&onDone(); }},
     {t:TE('txReset'),cls:'',keep:true,fn:()=>{ setTextOverride(e,null); nextModal(); onDone&&onDone(); }},{t:T('cancel'),cls:''}],null,'wide');
}
/* =====================================================================
   RUNTIME — instructor questions at checkpoints
   ===================================================================== */
async function runCheckpoint(cp){
  if(S.practice) return;
  const all=gameQuestions().filter(q=>!q.off);
  if(cp==='pre'){ const pp=all.filter(q=>q.cp==='pp');
    if(pp.length){ hideText(); await say('pilly','happy',['進門之前先暖身！這是「前測」，不計分，照你現在的想法作答就好。最後會再考一次同樣的題目，看看你進步多少～','A warm-up before we go in! This is a pre-test — it doesn\'t count toward your score, so just answer with what you know now. The same questions come back at the end to show your progress~','วอร์มอัพก่อนเข้าบ้าน! นี่คือแบบทดสอบก่อนเรียน ไม่นับคะแนน ตอบตามที่รู้ตอนนี้ได้เลย ตอนจบจะเจอคำถามชุดเดียวกันอีกครั้งเพื่อดูความก้าวหน้า~']); hideText(); pillyHide();
      for(let i=0;i<pp.length;i++) await askCustom(pp[i],i,pp.length,{phase:'pre'}); } }
  if(cp==='post'){ const pp=all.filter(q=>q.cp==='pp'), rf=all.filter(q=>q.cp==='refl');
    if(pp.length){ hideText(); await say('pilly','happy',['還記得一開始的暖身題嗎？同樣的題目再來一次——這次會告訴你答案和解說！','Remember the warm-up questions? Same questions again — this time you\'ll see the answers and explanations!','จำคำถามวอร์มอัพตอนแรกได้ไหม? คำถามชุดเดิมอีกครั้ง — คราวนี้มีเฉลยและคำอธิบาย!']); hideText(); pillyHide();
      for(let i=0;i<pp.length;i++) await askCustom(pp[i],i,pp.length,{phase:'post'}); }
    if(rf.length){ hideText(); await say('pilly','neutral',['最後，花兩分鐘想一想。沒有標準答案，老師會讀你寫的內容。','Finally, take two minutes to reflect. There are no right answers — your instructor will read what you write.','สุดท้าย ใช้เวลาสองนาทีสะท้อนคิด ไม่มีคำตอบถูกผิด อาจารย์จะอ่านสิ่งที่คุณเขียน']); hideText(); pillyHide();
      for(let i=0;i<rf.length;i++) await askCustom(rf[i],i,rf.length,{phase:'refl'}); }
    return; }
  const qs=all.filter(q=>q.cp===cp); if(!qs.length) return;
  hideText(); await say('pilly','happy',UI.cqIntro); hideText(); pillyHide();
  for(let i=0;i<qs.length;i++){ const q=qs[i];
    if(['chen','wife','yeh'].includes(q.who)){ if(!CH[q.who]) show(q.who,'R','neutral'); emo(q.who,'think'); } else if(q.who==='pilly') pillyShow('happy');
    await askCustom(q,i,qs.length); pillyHide(); }
}
function evalExpr(s){ const e=s.replace(/×/g,'*').replace(/÷/g,'/').replace(/−/g,'-').replace(/²/g,'**2'); if(!/^[\d.+\-*/() ]+$/.test(e)) return NaN; try{ const r=Function('"use strict";return ('+e+');')(); return typeof r==='number'?r:NaN; }catch(x){ return NaN; } }
function askCustom(q, i, n, opt){ opt=opt||{}; return new Promise(res=>{
  const box=$('#cqBox'), body=$('#cqBody'), fb=$('#cqFb'), go=$('#cqGo'); let done=false, tries=0, iv=null, picked=new Set();
  const ph=opt.phase||'', blind=ph==='pre', nameOf=w=>w==='sys'?T('cqTitle'):T(w);
  box.classList.toggle('pp',ph==='pre'||ph==='post'); box.classList.toggle('refl',ph==='refl');
  $('#cqWho').innerHTML=ph==='pre'||ph==='post'?`<span class="cqi">📊</span>${T(ph==='pre'?'ppPre':'ppPost')}`:ph==='refl'?`<span class="cqi">💭</span>${T('reflT')}`:`<span class="cqi">${WHO_IC[q.who]||'📝'}</span>${esc(nameOf(q.who))}`;
  $('#cqNum').textContent=ph?`${i+1}/${n}`:`${T('cqTitle')} ${i+1}/${n} · ${q.pts||0} ${TE('ptsU')}`;
  $('#cqQ').innerHTML=kpHTML(LQ(q.q)).replace(/\n/g,'<br>'); $('#cqImg').innerHTML=q.img?`<img src="${q.img}" alt="">`:''; const im=$('#cqImg img'); if(im) im.onclick=()=>zoomImg(q.img);
  fb.className=''; fb.innerHTML=''; go.textContent=T('cqSubmit'); box.classList.remove('hidden'); box.querySelector('.cqcard').scrollTop=0;
  if(q.kind==='single'||q.kind==='multi'){
    const ord=(q.opts||[]).map((_,j)=>j); if(ph==='pre'||ph==='post'||(EXAM()&&!opt.preview)) for(let a=ord.length-1;a>0;a--){ const b=Math.floor(Math.random()*(a+1)); [ord[a],ord[b]]=[ord[b],ord[a]]; }
    body.innerHTML=`<div class="cqhint">${q.kind==='single'?T('cqPickOne'):T('cqPickMany')}</div><div class="cqopts">${ord.map((j,pos)=>`<button class="cqo" data-j="${j}"><span class="mk">${String.fromCharCode(65+pos)}</span><span>${esc(LQ(q.opts[j].t))}</span></button>`).join('')}</div>`;
    body.querySelectorAll('.cqo').forEach(b=>b.onclick=()=>{ if(done) return; const j=+b.dataset.j; if(q.kind==='single'){ picked=new Set([j]); } else { picked.has(j)?picked.delete(j):picked.add(j); } sfx.select();
      body.querySelectorAll('.cqo').forEach(x=>x.classList.toggle('on',picked.has(+x.dataset.j))); });
  } else if(q.kind==='text'){ body.innerHTML=`<textarea id="cqText" placeholder="${esc(T(ph==='refl'?'reflPh':'cqAnsPh'))}"></textarea>`; setTimeout(()=>{ const t=$('#cqText'); t&&t.focus(); },120); }
  else { const clues=q.clues||[], f=LQ(q.formula||[]);
    body.innerHTML=`${clues.length?`<div class="cqclues">${clues.map(c=>`<button class="cchip" data-v="${esc(c.v)}"><b>${esc(c.v)}</b><small>${esc(LQ(c.l))}</small></button>`).join('')}</div>`:''}${f?`<div class="cqformula">📐 ${esc(f)}</div>`:''}
      <div class="cqcalc"><div class="cqscr"><div id="cqExpr"></div><div id="cqRes">=</div></div><div class="cqpad">${['7','8','9','÷','4','5','6','×','1','2','3','−','0','.','²','+','(',')','⌫','C'].map(k=>`<button data-k="${k}" class="${/[÷×−+²()]/.test(k)?'op':/[⌫C]/.test(k)?'fn':''}">${k}</button>`).join('')}<button data-k="=" class="eq">＝</button></div>
      <div class="cqans"><button class="sbtn b" id="cqUse">${T('cqUse')}</button><label>${T('cqYour')} <input id="cqNumIn" inputmode="decimal" autocomplete="off"> <b>${esc(q.unit||'')}</b></label></div></div>`;
    let expr=''; const updX=()=>{ $('#cqExpr').textContent=expr||'0'; }; updX();
    const calcNow=()=>{ const r=evalExpr(expr); $('#cqRes').textContent='= '+(isFinite(r)?+r.toFixed(6):'Error'); return r; };
    body.querySelectorAll('.cchip').forEach(b=>b.onclick=()=>{ if(done) return; expr+=b.dataset.v; sfx.select(); updX(); });
    body.querySelectorAll('.cqpad [data-k]').forEach(b=>b.onclick=()=>{ if(done) return; const k=b.dataset.k; sfx.click(); if(k==='=') calcNow(); else if(k==='C'){ expr=''; $('#cqRes').textContent='='; } else if(k==='⌫') expr=expr.slice(0,-1); else expr+=k; updX(); });
    $('#cqUse').onclick=()=>{ const r=calcNow(); if(isFinite(r)){ $('#cqNumIn').value=+r.toFixed(4); sfx.select(); } };
    $('#cqNumIn').onkeydown=e=>{ if(e.key==='Enter'){ e.preventDefault(); submit(); } };
  }
  const tl=+q.timer||0;
  if(tl>0&&S.qte&&!opt.preview&&!ph){ const t0=performance.now(); iv=setInterval(()=>{ const rem=Math.max(0,tl-(performance.now()-t0)/1000); $('#cqTimer').textContent='⏱ '+Math.ceil(rem); if(rem<=0){ clearInterval(iv); if(!done){ toast(T('cqTimeUp')); submit(true); } } },200); } else $('#cqTimer').textContent='';
  const finish=r=>{ clearInterval(iv); done=true; go.textContent=T('cqNext'); go.onclick=()=>{ sfx.click(); box.classList.add('hidden'); D.cqGo=null; res(r); }; D.cqGo=go.onclick;
    const ex=LQ(q.ex||[]); if(ex&&!blind) fb.innerHTML+=`<div class="cqex">💡 ${kpHTML(ex).replace(/\n/g,'<br>')}</div>`;
    if(opt.preview) return;
    if(ph==='pre'||ph==='post'){ S.pp[ph][q.id]={ok:!!r.ok, ans:r.ans}; logEvent({type:'pp', phase:ph, qid:q.id, q:r.q, ok:!!r.ok, ans:r.ans}); saveSession(); return; }
    if(ph==='refl'){ S.refl.push({qid:q.id, q:r.q, ans:r.ans}); logEvent({type:'refl', qid:q.id, q:r.q, ans:r.ans}); saveSession(); return; }
    S.custom.score+=r.pts; S.custom.max+=(+q.pts||0); S.custom.list.push(r); logEvent(Object.assign({type:'custom'},r)); saveSession(); };
  const verdict0=(cls,txt)=>{ fb.className=cls; fb.innerHTML=`<div class="cqv">${txt}</div>`; };
  const verdict=(cls,txt)=>blind?verdict0('saved',T('ppSaved')):ph==='refl'?verdict0('saved',T('reflSaved')):verdict0(cls,txt);
  const base={qid:q.id, cp:q.cp, kind:q.kind, q:LQ(q.q).slice(0,140), max:+q.pts||0};
  function submit(timeUp){ if(done) return; const P=+q.pts||0;
    if(q.kind==='single'||q.kind==='multi'){ if(!picked.size&&!timeUp){ sfx.error(); toast(T('cqPick')); return; }
      const corr=new Set((q.opts||[]).map((o,j)=>o.ok?j:-1).filter(j=>j>=0)); let hits=0, wrong=0; picked.forEach(j=>corr.has(j)?hits++:wrong++);
      const ok=hits===corr.size&&wrong===0, part=!ok&&q.kind==='multi'&&hits>0&&wrong===0, pts=ok?P:part?Math.round(P/2):0;
      body.querySelectorAll('.cqo').forEach(x=>{ const j=+x.dataset.j; x.classList.add(blind?(picked.has(j)?'on':'dim'):corr.has(j)?'right':picked.has(j)?'bad':'dim'); });
      blind?sfx.select():ok?sfx.get():part?sfx.hit():sfx.error(); verdict(ok?'ok':part?'part':'bad', ok?'✅ '+T('cqRight'):part?'🔸 '+T('cqPartial'):'❌ '+T('cqWrong'));
      finish(Object.assign(base,{ans:[...picked].map(j=>LQ(q.opts[j].t)).join(' | ')||'(—)', ok, partial:part, pts})); }
    else if(q.kind==='text'){ const v=($('#cqText').value||'').trim(); if(!v&&!timeUp){ sfx.error(); toast(T('cqPick')); return; } $('#cqText').disabled=true;
      const kws=String(q.kw||'').split(/[,，、;；\n]/).map(s=>s.trim().toLowerCase()).filter(Boolean), low=v.toLowerCase(), hit=kws.filter(k=>low.includes(k));
      const auto=kws.length>0, ok=auto&&hit.length>=Math.max(1,+q.kwMin||1), pts=ok?P:0;
      sfx.select(); verdict(auto?(ok?'ok':'part'):'saved', auto?(ok?'✅ '+T('cqRight'):'📝 '+T('cqSaved')):'📝 '+T('cqSaved'));
      finish(Object.assign(base,{ans:v||'(—)', ok, partial:false, auto, pts, kwHit:hit})); }
    else { const v=parseFloat(String($('#cqNumIn').value).replace(',','.')); if(isNaN(v)&&!timeUp){ sfx.error(); toast(T('cqPick')); return; }
      const A=+q.ans, tol=(q.tol===''||q.tol==null||isNaN(+q.tol))?Math.abs(A)*0.01:Math.abs(+q.tol), ok=!isNaN(v)&&Math.abs(v-A)<=tol+1e-9; tries++;
      if(!ok&&tries<3&&!timeUp&&!blind){ sfx.error(); verdict('bad','❌ '+T('cqAgain')+` (${tries}/3)`); return; }
      const pts=ok?(tries===1?P:Math.round(P/2)):0; $('#cqNumIn').disabled=true;
      ok?sfx.get():sfx.error(); verdict(ok?'ok':'bad', ok?'✅ '+T('cqRight')+` ${v} ${esc(q.unit||'')}`:'❌ '+T('cqAnswerIs')+`${A} ${esc(q.unit||'')}`);
      finish(Object.assign(base,{ans:isNaN(v)?'(—)':String(v), ok, partial:false, tries, pts})); }
  }
  go.onclick=()=>submit(false); D.cqGo=go.onclick;
}); }
/* =====================================================================
   TEACHER PAGE — editor tabs
   ===================================================================== */
function renderEditor(tab, b){ edWork(); ({tQ:edQuestions, tTexts:edTexts, tSet:edSettings, tPub:edPublish})[tab](b);
  if(tab!=='tPub'&&serverURL()&&(edDirty()||mediaPending())){ const bar=document.createElement('div'); bar.className='pubbar';
    bar.innerHTML=`<span>⚠️ ${TE('pbBar')}</span><button class="sbtn g">${TE('pbOnline')}</button>`; b.prepend(bar); bar.querySelector('button').onclick=()=>{ P.tab='tPub'; sfx.click(); renderPage(); }; } }
/* ---------- extra questions: list ---------- */
function newQ(){ return {id:'q'+Date.now().toString(36)+Math.random().toString(36).slice(2,5), kind:'single', cp:'c4', who:'yeh', q:['','',''], img:'', opts:[{t:['','',''],ok:true},{t:['','',''],ok:false},{t:['','',''],ok:false}], ex:['','',''], pts:100, timer:0, kw:'', kwMin:1, ans:'', tol:'', unit:'', clues:[], formula:['','',''], off:false}; }
function edQuestions(b){ if(ED_ST.editQ) return edQForm(b);
  const w=edWork(), qs=w.questions;
  const missingDef=DEFAULT_QUESTIONS.some(d=>!qs.some(q=>q.id===d.id));
  b.innerHTML=`<div class="edhead"><p class="edintro">${TE('qIntro')}<br><span class="muted">${TE('defNote')}</span></p><button class="ebtn" id="qAdd">${TE('qAdd')}</button></div>${missingDef?`<button class="sbtn" id="qRestore" style="margin-bottom:8px">${TE('qRestore')}</button>`:''}`+(qs.length?QCPS.map(cp=>{ const list=qs.filter(q=>q.cp===cp); if(!list.length) return '';
    return `<h4 class="edh">📍 ${TE('cp_'+cp)}</h4>${cp==='pp'?`<p class="muted" style="margin:-4px 0 6px">${TE('ppNote')}</p>`:cp==='refl'?`<p class="muted" style="margin:-4px 0 6px">${TE('reflNote')}</p>`:''}`+list.map(q=>{ const i=qs.indexOf(q);
      return `<div class="qrow${q.off?' off':''}"><span class="qk">${QKIND_IC[q.kind]}</span><div class="qt"><b>${esc(LQ(q.q))||'—'}</b><div class="muted">${TE('k_'+q.kind)} · ${WHO_IC[q.who]} ${TE('w_'+q.who)} · ${q.pts||0} ${TE('ptsU')}${q.img?' · 🖼':''}${q.timer>0?' · ⏱'+q.timer+'s':''}</div></div>
        <div class="qa"><button class="sbtn p" data-qe="${i}">${TE('qEdit')}</button><button class="sbtn b" data-qt="${i}">${TE('qTry')}</button><button class="sbtn" data-qm="${i}" data-d="-1" title="↑">↑</button><button class="sbtn" data-qm="${i}" data-d="1" title="↓">↓</button>
        <button class="sbtn" data-qc="${i}">${TE('qDup')}</button><button class="sbtn ${q.off?'':'g'}" data-qo="${i}">${q.off?TE('qOff'):TE('qOn')}</button><button class="sbtn r" data-qx="${i}">${TE('qDel')}</button></div></div>`; }).join(''); }).join('')
    :`<div class="edempty">📝<p>${TE('qNone')}</p></div>`);
  $('#qAdd').onclick=()=>{ sfx.select(); ED_ST.editQ={i:-1, q:newQ()}; renderPage(); };
  const qr=$('#qRestore'); if(qr) qr.onclick=()=>{ DEFAULT_QUESTIONS.forEach(d=>{ if(!qs.some(q=>q.id===d.id)) qs.push(clone(d)); }); edSave(); sfx.get(); toast(TE('qRestored')); renderPage(); };
  b.querySelectorAll('[data-qe]').forEach(x=>x.onclick=()=>{ sfx.click(); ED_ST.editQ={i:+x.dataset.qe, q:clone(qs[+x.dataset.qe])}; renderPage(); });
  b.querySelectorAll('[data-qt]').forEach(x=>x.onclick=()=>previewQ(qs[+x.dataset.qt]));
  b.querySelectorAll('[data-qm]').forEach(x=>x.onclick=()=>{ const i=+x.dataset.qm, d=+x.dataset.d; let j=i+d; while(j>=0&&j<qs.length&&qs[j].cp!==qs[i].cp) j+=d; if(j<0||j>=qs.length) return; [qs[i],qs[j]]=[qs[j],qs[i]]; edSave(); sfx.click(); renderPage(); });
  b.querySelectorAll('[data-qc]').forEach(x=>x.onclick=()=>{ const c=clone(qs[+x.dataset.qc]); c.id=newQ().id; qs.splice(+x.dataset.qc+1,0,c); edSave(); sfx.select(); renderPage(); });
  b.querySelectorAll('[data-qo]').forEach(x=>x.onclick=()=>{ const q=qs[+x.dataset.qo]; q.off=!q.off; edSave(); sfx.click(); renderPage(); });
  b.querySelectorAll('[data-qx]').forEach(x=>x.onclick=()=>showModal(`<h3>${TE('qDel')}</h3><p>${TE('qDelConfirm')}</p><p class="muted">${esc(LQ(qs[+x.dataset.qx].q))}</p>`,[{t:TE('qDel'),cls:'r',fn:()=>{ qs.splice(+x.dataset.qx,1); edSave(); renderPage(); }},{t:T('cancel'),cls:''}]));
}
function previewQ(q){ sfx.select(); const keep=P.cur, tab=P.tab; $('#page').classList.add('hidden'); P.cur=null;
  askCustom(q,0,1,{preview:true}).then(()=>{ openPage(keep,tab); }); }
/* ---------- extra questions: form ---------- */
const getP=(o,p)=>p.split('.').reduce((a,k)=>a==null?a:a[k],o);
function setP(o,p,v){ const ks=p.split('.'); const last=ks.pop(); const t=ks.reduce((a,k)=>a[k],o); t[last]=v; }
function edQForm(b){
  const st=ED_ST.editQ, q=st.q, li=ED_ST.lang, firstFilled=a=>(a||[]).find(x=>x&&x.trim())||'';
  const ml=(path,rows,ph)=>{ const a=getP(q,path)||['','','']; return rows>1?`<textarea class="ein" data-ml="${path}" rows="${rows}" placeholder="${esc(a[li]?'':firstFilled(a)||ph||'')}">${esc(a[li]||'')}</textarea>`:`<input class="ein" data-ml="${path}" value="${esc(a[li]||'')}" placeholder="${esc(a[li]?'':firstFilled(a)||ph||'')}">`; };
  const dots=i=>(q.q[i]&&q.q[i].trim())?'●':'○';
  let kindHTML='';
  if(q.kind==='single'||q.kind==='multi') kindHTML=`<label class="elab">${TE('fOpts')}</label>${q.opts.map((o,i)=>`<div class="orow${o.ok?' ok':''}"><label class="ock"><input type="${q.kind==='single'?'radio':'checkbox'}" name="okq" data-ok="${i}" ${o.ok?'checked':''}> ${TE('fCorrect')}</label><span class="omk">${String.fromCharCode(65+i)}</span>${ml('opts.'+i+'.t',1,TE('fOptPh')+' '+String.fromCharCode(65+i))}<button class="sbtn r" data-odel="${i}" ${q.opts.length<=2?'disabled':''}>✕</button></div>`).join('')}<button class="sbtn" id="oAdd" ${q.opts.length>=6?'disabled':''}>${TE('fOptAdd')}</button>`;
  else if(q.kind==='text') kindHTML=`<label class="elab">${TE('fKw')}</label><input class="ein" data-pl="kw" value="${esc(q.kw||'')}" placeholder="${esc(TE('fKwPh'))}"><div class="row"><label class="elab" style="margin:0">${TE('fKwMin')}</label><input class="enum" type="number" min="1" data-pl="kwMin" value="${q.kwMin||1}"></div><p class="muted">${TE('fKwNote')}</p>`;
  else kindHTML=`<div class="egrid3"><label class="elab">${TE('fAns')}<input class="ein" data-pl="ans" inputmode="decimal" value="${esc(q.ans)}"></label><label class="elab">${TE('fTol')}<input class="ein" data-pl="tol" inputmode="decimal" value="${esc(q.tol)}"></label><label class="elab">${TE('fUnit')}<input class="ein" data-pl="unit" value="${esc(q.unit||'')}" placeholder="kg/m², mg, mL/min…"></label></div>
    <label class="elab">${TE('fClues')}</label>${(q.clues||[]).map((c,i)=>`<div class="orow"><input class="ein cv" data-pl="clues.${i}.v" value="${esc(c.v)}" placeholder="${TE('fClueV')}">${ml('clues.'+i+'.l',1,TE('fClueL'))}<button class="sbtn r" data-cdel="${i}">✕</button></div>`).join('')}<button class="sbtn" id="cAdd">${TE('fClueAdd')}</button>
    <label class="elab">${TE('fFormula')}</label>${ml('formula',1,'BMI = kg ÷ m²')}`;
  b.innerHTML=`<div class="edform"><button class="sbtn" id="fBack">${TE('fBack')}</button>
    <h4 class="edh">${TE('fKind')}</h4><div class="ktiles">${(q.cp==='refl'?['text']:['single','multi','text','num']).map(k=>`<button class="ktile${q.kind===k?' on':''}" data-kind="${k}"><span>${QKIND_IC[k]}</span><b>${TE('k_'+k)}</b><small>${TE('kd_'+k)}</small></button>`).join('')}</div>
    <div class="egrid2"><div><h4 class="edh">${TE('fWhen')}</h4><select id="fCp" class="ein">${QCPS.map(c=>`<option value="${c}"${q.cp===c?' selected':''}>${TE('cp_'+c)}</option>`).join('')}</select></div>
      <div><h4 class="edh">${TE('fWho')}</h4><div class="whos">${QWHO.map(w=>`<button class="who${q.who===w?' on':''}" data-who="${w}">${WHO_IC[w]} ${TE('w_'+w)}</button>`).join('')}</div></div></div>
    <h4 class="edh">${TE('fLang')}</h4><div class="ltabs">${['中文','English','ไทย'].map((nm,i)=>`<button class="ltab${i===li?' on':''}" data-li="${i}">${nm} <i>${dots(i)}</i></button>`).join('')}</div>
    <div class="lpanel"><label class="elab">${TE('fQ')}</label>${ml('q',3)}
      <label class="elab">${TE('fImg')}</label><div class="row">${q.img?`<img src="${q.img}" class="eimg">`:''}<button class="sbtn b" id="fImgAdd">${TE('fImgAdd')}</button>${q.img?`<button class="sbtn r" id="fImgDel">${TE('fImgDel')}</button>`:''}</div>
      ${kindHTML}
      <label class="elab">${TE('fEx')}</label>${ml('ex',2)}</div>
    <div class="egrid2"><label class="elab">${TE('fPts')}<input class="ein" type="number" min="0" data-pl="pts" value="${q.pts}"></label><label class="elab">${TE('fTimer')}<input class="ein" type="number" min="0" data-pl="timer" value="${q.timer||0}"></label></div>
    <div class="factions"><button class="ebtn alt" id="fTry">${TE('qTry')}</button><button class="ebtn" id="fSave">${TE('fSave')}</button><button class="sbtn" id="fCancel">${TE('fCancel')}</button></div></div>`;
  const rerender=()=>{ const y=$('#pBody').scrollTop; renderPage(); $('#pBody').scrollTop=y; };
  b.querySelectorAll('[data-ml]').forEach(x=>x.oninput=()=>{ const p=x.dataset.ml; const a=getP(q,p)||['','','']; a[li]=x.value; setP(q,p,a); if(p==='q') b.querySelectorAll('.ltab i')[li].textContent=x.value.trim()?'●':'○'; });
  b.querySelectorAll('[data-pl]').forEach(x=>x.oninput=()=>setP(q,x.dataset.pl,x.type==='number'?(+x.value||0):x.value));
  b.querySelectorAll('[data-kind]').forEach(x=>x.onclick=()=>{ q.kind=x.dataset.kind; if(q.kind==='single'){ let f=false; q.opts.forEach(o=>{ if(o.ok&&!f) f=true; else o.ok=false; }); if(!f&&q.opts[0]) q.opts[0].ok=true; } sfx.click(); rerender(); });
  $('#fCp').onchange=e=>{ q.cp=e.target.value; if(q.cp==='refl'){ q.kind='text'; q.pts=0; rerender(); } else if(q.cp==='pp'&&q.kind==='text'){ q.kind='single'; rerender(); } };
  b.querySelectorAll('[data-who]').forEach(x=>x.onclick=()=>{ q.who=x.dataset.who; sfx.click(); b.querySelectorAll('[data-who]').forEach(y=>y.classList.toggle('on',y===x)); });
  b.querySelectorAll('[data-li]').forEach(x=>x.onclick=()=>{ ED_ST.lang=+x.dataset.li; sfx.click(); rerender(); });
  b.querySelectorAll('[data-ok]').forEach(x=>x.onchange=()=>{ const i=+x.dataset.ok; if(q.kind==='single') q.opts.forEach((o,j)=>o.ok=j===i); else q.opts[i].ok=x.checked; b.querySelectorAll('.orow').forEach((r,j)=>q.opts[j]&&r.classList.toggle('ok',q.opts[j].ok)); });
  b.querySelectorAll('[data-odel]').forEach(x=>x.onclick=()=>{ q.opts.splice(+x.dataset.odel,1); if(!q.opts.some(o=>o.ok)&&q.opts[0]) q.opts[0].ok=true; rerender(); });
  const oa=$('#oAdd'); if(oa) oa.onclick=()=>{ q.opts.push({t:['','',''],ok:false}); rerender(); };
  const ca=$('#cAdd'); if(ca) ca.onclick=()=>{ (q.clues=q.clues||[]).push({v:'',l:['','','']}); rerender(); };
  b.querySelectorAll('[data-cdel]').forEach(x=>x.onclick=()=>{ q.clues.splice(+x.dataset.cdel,1); rerender(); });
  $('#fImgAdd').onclick=()=>pickFiles(false,'image/*',async fs=>{ if(!fs[0]) return; const d=await resizeImage(fs[0],900); if(d){ q.img=d; rerender(); } });
  const idl=$('#fImgDel'); if(idl) idl.onclick=()=>{ q.img=''; rerender(); };
  const validate=()=>{ if(!q.q.some(s=>s&&s.trim())) return TE('errQ');
    if(q.kind==='single'||q.kind==='multi'){ const filled=q.opts.filter(o=>o.t.some(s=>s&&s.trim())); if(filled.length<2||!q.opts.some(o=>o.ok&&o.t.some(s=>s&&s.trim()))) return TE('errOpts'); }
    if(q.kind==='num'&&(q.ans===''||isNaN(+q.ans))) return TE('errAns'); return null; };
  $('#fTry').onclick=()=>{ const e=validate(); if(e){ sfx.error(); toast('⚠️ '+e); return; } previewQ(clone(q)); };
  $('#fSave').onclick=()=>{ const e=validate(); if(e){ sfx.error(); toast('⚠️ '+e); return; }
    if(q.kind==='single'||q.kind==='multi') q.opts=q.opts.filter(o=>o.t.some(s=>s&&s.trim()));
    if(q.kind==='num') q.clues=(q.clues||[]).filter(c=>String(c.v).trim());
    const qs=edWork().questions; if(st.i>=0) qs[st.i]=q; else qs.push(q); edSave(); ED_ST.editQ=null; sfx.get(); toast(T('saved')); renderPage(); };
  $('#fCancel').onclick=$('#fBack').onclick=()=>{ ED_ST.editQ=null; sfx.click(); renderPage(); };
}
/* ---------- edit text ---------- */
function edTexts(b){
  const cat=buildTextCatalog(), cats=['ui','chars','items','case','prologue','ch1','ch2','ch3','ch4','ch5','epi','calc','final','results','sys','pages'].filter(c=>cat.some(e=>e.c===c));
  const w=edWork(), editedN=Object.keys(w.texts).length;
  b.innerHTML=`<div class="edhead"><p class="edintro">${TE('txIntro')}</p><button class="ebtn ${D.editPlay?'':'alt'}" id="txPlay">${TE('txPlay')}: ${D.editPlay?T('on'):T('off')}</button></div>${D.editPlay?`<p class="ednote">✏️ ${TE('txPlayOn')}</p>`:''}
    <input class="ein txs" id="txQ" placeholder="${esc(TE('txSearch'))}" value="${esc(ED_ST.txQuery)}">
    <div class="catchips"><button class="cchip2${ED_ST.txCat==='all'?' on':''}" data-cat="all">${TE('txAll')}</button>${cats.map(c=>`<button class="cchip2${ED_ST.txCat===c?' on':''}" data-cat="${c}">${TE('cat_'+c)}</button>`).join('')}<button class="cchip2 ed${ED_ST.txEdited?' on':''}" id="txEd">✎ ${TE('txEdited')} (${editedN})</button></div>
    <p class="muted">${esc(TE('txTips'))}</p><div id="txList"></div>`;
  const draw=()=>{ const qv=ED_ST.txQuery.trim().toLowerCase();
    const list=cat.filter(e=>(ED_ST.txCat==='all'||e.c===ED_ST.txCat)&&(!ED_ST.txEdited||w.texts[e.k])&&(!qv||curText(e).some(x=>x.toLowerCase().includes(qv))||e.v.some(x=>x.toLowerCase().includes(qv))));
    ED_ST.txList=list; const L2=$('#txList');
    L2.innerHTML=`<p class="muted">${TE('txCount').replace('{n}',list.length)}</p>`+(list.length?list.slice(0,ED_ST.txLimit).map((e,i)=>{ const cur=curText(e), ed=!!w.texts[e.k];
      return `<div class="txrow${ed?' ed':''}" data-i="${i}"><div class="txm"><span class="txw">${e.w==='choice'?'☑️':e.w?(WHO_IC[e.w]||'🗨')+' '+esc(e.w==='me'?T('you'):e.w==='sys'?T('sys'):T(e.w)):''}</span><span class="muted">${TE('cat_'+e.c)}</span><button class="sbtn${ed?'':' hidden'}" data-txr="${i}">${TE('txReset')}</button></div>
        <div class="txg">${[0,1,2].map(l=>`<label><span>${['中文','EN','ไทย'][l]}</span><textarea data-txi="${l}" rows="1">${esc(cur[l])}</textarea></label>`).join('')}</div></div>`; }).join('')+(list.length>ED_ST.txLimit?`<button class="ebtn alt" id="txMore">${TE('txMore')} (${list.length-ED_ST.txLimit})</button>`:''):`<p class="edempty">${TE('txNone')}</p>`);
    const grow=t=>{ t.style.height='auto'; t.style.height=(t.scrollHeight+2)+'px'; };
    L2.querySelectorAll('textarea').forEach(t=>{ grow(t); let tm=null; t.oninput=()=>{ grow(t); clearTimeout(tm); tm=setTimeout(()=>{ const row=t.closest('.txrow'), e=ED_ST.txList[+row.dataset.i];
      setTextOverride(e,[0,1,2].map(l=>row.querySelector(`[data-txi="${l}"]`).value)); const ed=!!w.texts[e.k]; row.classList.toggle('ed',ed); row.querySelector('[data-txr]').classList.toggle('hidden',!ed); $('#txEd').textContent=`✎ ${TE('txEdited')} (${Object.keys(w.texts).length})`; },350); }; });
    L2.querySelectorAll('[data-txr]').forEach(x=>x.onclick=()=>{ setTextOverride(ED_ST.txList[+x.dataset.txr],null); sfx.click(); draw(); });
    const mo=$('#txMore'); if(mo) mo.onclick=()=>{ ED_ST.txLimit+=60; draw(); };
  };
  let qt=null; $('#txQ').oninput=e=>{ clearTimeout(qt); qt=setTimeout(()=>{ ED_ST.txQuery=e.target.value; ED_ST.txLimit=40; draw(); },250); };
  b.querySelectorAll('[data-cat]').forEach(x=>x.onclick=()=>{ ED_ST.txCat=x.dataset.cat; ED_ST.txLimit=40; sfx.click(); renderPage(); });
  $('#txEd').onclick=()=>{ ED_ST.txEdited=!ED_ST.txEdited; ED_ST.txLimit=40; sfx.click(); renderPage(); };
  $('#txPlay').onclick=()=>{ D.editPlay=!D.editPlay; try{ sessionStorage.setItem('phd_editplay',D.editPlay?'1':'0'); }catch(e){} sfx.click(); refreshEditButtons(); renderPage(); };
  draw();
}
function refreshEditButtons(){ const tb=$('#tEdit'); if(tb) tb.classList.toggle('hidden',!(D.editPlay&&D.cur&&Array.isArray(D.cur.text))); }
/* ---------- settings ---------- */
function edSettings(b){
  const s=edWork().settings, num=(k,lab)=>`<label class="srow"><span>${TE(lab)}</span><input class="ein enum" type="number" min="1" data-st="${k}" value="${esc(s[k]==null?'':s[k])}" placeholder="${CONFIG_DEF[k]}"><small class="muted">${TE('stDefault')}: ${CONFIG_DEF[k]}</small></label>`;
  b.innerHTML=`<p class="edintro">${TE('stIntro')}</p><div class="box">${num('VISIT_MIN','stVisit')}${num('HEARTS','stHearts')}${num('SEARCH_CHARGES','stCharges')}
      <label class="srow"><span>${TE('stQte')}</span><input type="checkbox" id="stQte" ${s.qte===false?'':'checked'}></label>
      <label class="srow"><span>${TE('stLang')}</span><select class="ein" id="stLang">${LANGS.map((l,i)=>`<option value="${l}"${(s.lang||'zh')===l?' selected':''}>${['中文','English','ไทย'][i]}</option>`).join('')}</select></label>
      <label class="srow"><span>${TE('stMode')}</span><select class="ein" id="stMode">${['choose','practice','exam'].map(m=>`<option value="${m}"${(s.mode||'choose')===m?' selected':''}>${m==='choose'?TE('stModeChoose'):T('mode_'+m)}</option>`).join('')}</select></label><p class="muted">${TE('stModeNote')}</p></div>
    <div class="box"><label class="srow"><span>${TE('stNote')}</span><input class="ein" id="stNote" value="${esc(s.note||'')}" placeholder="${esc(TE('stNotePh'))}"></label></div>
    <div class="box"><label class="srow"><span>${TE('stServer')}</span><input class="ein" id="stServer" value="${esc(s.server!=null?s.server:CONFIG.SERVER_URL)}"></label><p class="muted">${TE('stServerNote')}${esc(CONFIG.SERVER_URL)}</p>
      <label class="srow"><span>${TE('stClass')}</span><input class="ein" id="stClass" value="${esc(s.classCode||'')}" placeholder="main"></label><p class="muted">${TE('stClassNote')}</p></div>
    <div class="box"><label class="srow"><span>${TE('stPin')}</span><input class="ein enum" id="stPin" value="${esc(s.TEACHER_PIN||'')}" placeholder="${CONFIG_DEF.TEACHER_PIN}"></label><p class="muted">🔒 ${TE('stPinWarn')}</p></div>`;
  const save=()=>{ edSave(); toast(T('saved')); };
  b.querySelectorAll('[data-st]').forEach(x=>x.onchange=()=>{ const v=Math.round(+x.value); if(v>0) s[x.dataset.st]=v; else delete s[x.dataset.st]; save(); });
  $('#stQte').onchange=e=>{ if(e.target.checked) delete s.qte; else s.qte=false; save(); };
  $('#stLang').onchange=e=>{ s.lang=e.target.value; save(); };
  $('#stMode').onchange=e=>{ if(e.target.value==='choose') delete s.mode; else s.mode=e.target.value; save(); };
  $('#stNote').onchange=e=>{ s.note=e.target.value.trim(); if(!s.note) delete s.note; save(); };
  $('#stServer').onchange=e=>{ const v=e.target.value.trim(); if(v===CONFIG.SERVER_URL) delete s.server; else s.server=v; save(); };
  $('#stClass').onchange=e=>{ const v=normClass(e.target.value); if(v&&v!=='main') s.classCode=v; else delete s.classCode; e.target.value=v; save(); };
  $('#stPin').onchange=e=>{ const v=e.target.value.trim(); if(v) s.TEACHER_PIN=v; else delete s.TEACHER_PIN; save(); };
}
/* ---------- publish ---------- */
function buildPublishedHTML(){
  const w=edWork(), cfg=clone(w), lm=mediaStore(), bm=GAME_CFG_BASE.media||{};
  cfg.v=1; cfg.meta={rev:new Date().toISOString(), note:(w.settings&&w.settings.note)||''};
  const labs=[...new Set([].concat(bm.labImages||[], lm.labImages||[]))], bags=Object.assign({}, bm.medBagImages||{}, lm.medBagImages||{});
  if(labs.length||Object.keys(bags).length) cfg.media={labImages:labs, medBagImages:bags};
  const json=JSON.stringify(cfg).replace(/</g,'\\u003c');
  const rx=new RegExp('(<scr'+'ipt id="gameConfig" type="application/json">)[\\s\\S]*?(<\\/scr'+'ipt>)');
  return {html:__SELF_HTML.replace(rx,(m,a,z)=>a+json+z), cfg};
}
/* what goes online: the draft without the server address, plus pictures students do not have yet */
function onlinePayload(){ const w=edWork(), cfg=clone(w); delete cfg.media; delete cfg.meta; delete cfg._base; if(cfg.settings) delete cfg.settings.server;
  const bm=GAME_CFG_BAKED.media||{}, cur=GAME_CFG_BASE.media||{}, lm=mediaStore(), baked=new Set([].concat(bm.labImages||[]));
  const labs=[...new Set([].concat(cur.labImages||[], lm.labImages||[]))].filter(x=>!baked.has(x));
  const bags=Object.assign({}, cur.medBagImages||{}, lm.medBagImages||{}); Object.keys(bags).forEach(k=>{ if(JSON.stringify(bags[k])===JSON.stringify((bm.medBagImages||{})[k])) delete bags[k]; });
  if(labs.length||Object.keys(bags).length) cfg.media={labImages:labs, medBagImages:bags};
  cfg.v=1; cfg.meta={note:(w.settings&&w.settings.note)||''}; return cfg; }
async function edLoadPubList(){ const el=$('#pbOnList'); if(!el) return; if(!teacherKey()){ el.textContent=TE('pbOnNeedKey'); return; }
  const r=await serverConfigs(), box=$('#pbOnList'); if(!box) return;
  if(!r.ok){ box.textContent='⚠️ '+T(r.error==='badkey'?'onBadKey':'onDown'); return; }
  ED_ST.pubList=r.configs; const hm=t=>new Date(t).toLocaleString([], {month:'short', day:'numeric', hour:'2-digit', minute:'2-digit'});
  box.innerHTML=r.configs.length?`<b>${TE('pbOnNow')}</b><table class="tbl" style="margin-top:6px">${r.configs.map(c=>`<tr><td><b>${c.cls==='*'?TE('pbAll'):esc(c.cls)}</b></td><td>${hm(c.rev)}</td><td>${esc(c.note||'')}</td><td>${Math.max(1,Math.round((c.size||0)/1024))} KB</td><td><button class="sbtn r" data-wd="${esc(c.cls)}">${TE('pbOnWithdraw')}</button></td></tr>`).join('')}</table>`:TE('pbOnNone');
  box.querySelectorAll('[data-wd]').forEach(x=>x.onclick=()=>{ const c=x.dataset.wd;
    showModal(`<h3>${TE('pbOnWithdraw')}</h3><p>${esc(TE('pbOnWithdrawQ').replace('{c}',c==='*'?TE('pbAll'):c).replace('{f}',TE(c==='*'?'pbFOrig':'pbFAll')))}</p>`,[{t:TE('pbOnWithdraw'),cls:'r',fn:async()=>{
      const r2=await serverUnpublish(c); if(r2.ok){ toast('↩️ '+TE('pbOnWithdrawn')); await cfgRefresh(); } else toast('⚠️ '+T(r2.error==='badkey'?'onBadKey':'onDown')); if(P.cur==='teacher'&&P.tab==='tPub') renderPage(); }},{t:T('cancel'),cls:''}]); });
}
function edPublish(b){
  const w=edWork(), dirty=edDirty(), sN=Object.keys(w.settings).filter(k=>w.settings[k]!==''&&w.settings[k]!=null).length;
  const on=!!serverURL(), pend=on&&(dirty||mediaPending()), m=GAME_CFG_BASE.meta||{};
  const ver=m.rev?esc(localTS(m.rev))+(m.online?' ☁️':''):TE('pbOrig');
  const known=[...new Set([].concat(Object.keys(SYNC.classes||{}), (ED_ST.pubList||[]).map(c=>c.cls), CFG_REQ_CLASS!=='main'?[CFG_REQ_CLASS]:[]))].filter(c=>c&&c!=='*').sort();
  const dl=`<div class="pubgrid"><button class="ebtn alt" id="pbPlay">${TE('pbPlay')}</button><button class="ebtn big" id="pbDl">${TE('pbDl')}</button></div><p class="ednote">📤 ${TE('pbDlNote')}</p>`;
  b.innerHTML=`<div class="pubsteps">${TE(on?'pbStepsOn':'pbSteps')}</div>
    <div class="box"><b>${TE('pbSummary').replace('{q}',w.questions.length).replace('{t}',Object.keys(w.texts).length).replace('{s}',sN)}</b>
      <p class="${(on?pend:dirty)?'warnp':'okp'}">${on?(pend?TE('pbDirtyOn'):TE('pbCleanOn')):(dirty?TE('pbDirty'):TE('pbClean'))}</p><p class="muted">${TE(on?'pbOnStudents':'pbThisFile')}: ${ver}${m.note?' · '+esc(m.note):''}</p></div>
    ${on?`<div class="box onpub"><b>${TE('pbOnH')}</b><p class="muted" style="margin:4px 0 8px">${TE('pbOnIntro')}</p>
      <div class="row" style="align-items:center;gap:8px;flex-wrap:wrap"><span>${TE('pbTarget')}</span><select class="ein" id="pbTarget" style="max-width:280px"><option value="*">${TE('pbAll')}</option>${known.map(c=>`<option value="${esc(c)}">${TE('pbOneCls')}: ${esc(c)}</option>`).join('')}<option value="+">${TE('pbOtherCls')}</option></select><input class="ein hidden" id="pbCls" placeholder="ph2026a" style="max-width:170px"></div>
      ${teacherKey()?'':`<div class="row" style="margin-top:8px;align-items:center;gap:8px"><span>🔑 ${TE('pbKeyNeed')}</span><input class="ein" id="pbKey" type="password" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="••••••••" style="max-width:280px"></div>`}
      <div class="pubgrid"><button class="ebtn alt" id="pbPlay">${TE('pbPlay')}</button><button class="ebtn big" id="pbOnline">${TE('pbOnline')}</button></div>
      <div id="pbOnList" class="muted">…</div></div>
      <details class="box"><summary><b>${TE('pbFileH')}</b></summary><div class="row" style="margin-top:8px"><button class="ebtn" id="pbDl">${TE('pbDl')}</button></div><p class="ednote">📤 ${TE('pbDlNote')}</p></details>`:dl}
    <div class="box"><div class="row"><button class="sbtn b" id="pbExp">${TE('pbExp')}</button><button class="sbtn g" id="pbImp">${TE('pbImp')}</button></div><p class="muted" style="margin-top:6px">${TE('pbShare')}</p></div>
    <div class="box"><button class="sbtn r" id="pbReset">${TE(on?'pbResetOn':'pbReset')}</button></div>`;
  $('#pbPlay').onclick=()=>{ edSave(); try{ sessionStorage.setItem('phd_usedraft','1'); }catch(e){} saveSession(true); location.reload(); };
  $('#pbDl').onclick=()=>{ const {html,cfg}=buildPublishedHTML(); const t=cfg.meta.rev.replace(/[-:]/g,'').replace('T','_').slice(0,13);
    download(`PharmaDetective_Chen_${t}.html`, html, 'text/html'); sfx.fanfare(); showModal(`<div style="font-size:48px">📦</div><h3>${TE('pbDl')}</h3><p>${TE('pbDone')}</p><p class="muted">${TE('pbDlNote')}</p>`); };
  if(on){ const tSel=$('#pbTarget'), tIn=$('#pbCls');
    tSel.onchange=()=>{ tIn.classList.toggle('hidden',tSel.value!=='+'); if(tSel.value==='+') tIn.focus(); };
    tIn.onchange=()=>{ tIn.value=normClass(tIn.value); };
    $('#pbOnline').onclick=async()=>{ const k=$('#pbKey'); if(k&&k.value.trim()) setTeacherKey(k.value);
      if(!teacherKey()){ toast('⚠️ '+T('onNoKey')); if(k) k.focus(); return; }
      const target=tSel.value==='+'?normClass(tIn.value):tSel.value; if(!target){ tIn.classList.remove('hidden'); tIn.focus(); return; }
      edSave(); const btn=$('#pbOnline'); btn.disabled=true; btn.textContent='…';
      const r=await serverPublish(target, onlinePayload());
      if(r.ok){ sfx.fanfare(); await cfgRefresh(); renderPage(); showModal(`<div style="font-size:48px">☁️</div><h3>${TE('pbOnDone')}</h3><p>${TE('pbLinkCls')}:</p><p><code style="font-size:14px">${esc(gameLink(target==='*'?'':target))}</code></p>`); }
      else { btn.disabled=false; btn.textContent=TE('pbOnline'); sfx.error(); toast('⚠️ '+TE('pbOnErr')+(r.error==='big'?TE('pbTooBig'):T(r.error==='badkey'?'onBadKey':r.error==='nokey'?'onNoKey':'onDown'))); } };
    edLoadPubList(); }
  $('#pbExp').onclick=()=>{ const w2=clone(edWork()); w2.kind='pharma-detective-changes'; download('PharmaDetective_changes.json', JSON.stringify(w2,null,1)); };
  $('#pbImp').onclick=()=>pickFiles(false,'.json,application/json',async fs=>{ if(!fs[0]) return; try{ const d=JSON.parse(await fs[0].text()); if(!d||(!d.questions&&!d.texts&&!d.settings)) throw 0;
      const w2=edWork(); const ids=new Set(w2.questions.map(q=>q.id)); (d.questions||[]).forEach(q=>{ if(ids.has(q.id)) q.id=newQ().id; w2.questions.push(q); });
      Object.assign(w2.texts, d.texts||{}); Object.assign(w2.settings, d.settings||{}); edSave(); toast(TE('pbImported')); renderPage(); }catch(e){ sfx.error(); toast('⚠️ '+TE('pbBad')); } });
  $('#pbReset').onclick=()=>showModal(`<h3>${TE(on?'pbResetOn':'pbReset')}</h3><p>${TE(on?'pbResetOnQ':'pbResetQ')}</p>`,[{t:TE(on?'pbResetOn':'pbReset'),cls:'r',fn:()=>{ const w2=edWork(), bk=clone(GAME_CFG_BASE); w2.texts=bk.texts||{}; w2.settings=bk.settings||{}; w2.questions=Array.isArray(bk.questions)?bk.questions:clone(DEFAULT_QUESTIONS); edSave(); renderPage(); }},{t:T('cancel'),cls:''}]);
}
