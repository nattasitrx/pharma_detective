/* =====================================================================
   FINAL CHAPTER — Myth Overlord boss battle · Results
   ===================================================================== */
const MYTHS=[
 {"p":"P6","m":["不同醫生的藥混在一起吃，效果比較強啦！","Mixing different doctors' pills makes them stronger!","ผสมยาหลายหมอกินรวมกัน ได้ผลแรงกว่า!"],"c":[[2,["同類藥重複吃可能過量。請把所有藥袋帶給同一位醫師或藥師整合，不要自己混著吃。","Duplicates can add up to an overdose. Bring every med bag to one doctor or pharmacist to sort out — never mix them yourself.","ยาซ้ำกันอาจเกินขนาด เอาซองยาทั้งหมดให้หมอหรือเภสัชกรคนเดียวช่วยจัด อย่าผสมกินเอง"]],[1,["混著吃可能太多，那就每次只抓一半的量，再觀察幾天身體有沒有不舒服就好。","Mixing might be too much, so just take half of every pill from now on and watch for a few days whether you feel unwell.","ผสมกันอาจมากไป งั้นลดเหลือครึ่งเดียวทุกตัว แล้วสังเกตอาการสักสองสามวันว่าไม่สบายไหม"]],[0,["不同醫生開的成分不一樣，混在一起剛好互補；記得飯後吃、多喝水，就不會傷胃。","Different doctors prescribe different ingredients, so mixing complements them — take them after meals with water and they won't upset you.","หมอแต่ละคนให้ตัวยาต่างกัน ผสมกันก็เสริมกันพอดี แค่กินหลังอาหารและดื่มน้ำตามก็ไม่กัดกระเพาะ"]]],"x":["重複的抗組織胺或鼻塞藥，可能造成嗜睡、口乾，甚至血壓上升。","Duplicated antihistamines or decongestants can cause drowsiness, dry mouth, even higher blood pressure.","ยาแก้แพ้หรือยาลดน้ำมูกที่ซ้ำกัน อาจทำให้ง่วง ปากแห้ง หรือความดันสูงขึ้น"]},
 {"p":"P8","m":["那方面不行，一定是吃藥害的！停掉就好！","Problems in bed? It's the medicine! Just stop it!","เรื่องบนเตียงไม่ไหว ต้องเป็นเพราะยา! หยุดยาไปเลย!"],"c":[[2,["自己停藥會讓血壓、血糖失控；原因也可能是菸酒或糖尿病，我們幫您和醫師討論換藥。","Stopping on your own lets BP and sugar run wild. Smoking, alcohol or diabetes may be the cause — we'll help you ask the doctor about switching.","หยุดยาเองทำให้ความดันและน้ำตาลคุมไม่อยู่ สาเหตุอาจมาจากบุหรี่ เหล้า หรือเบาหวาน เราจะช่วยคุยกับหมอเรื่องเปลี่ยนยา"]],[1,["有些降壓藥確實會影響性功能。先照常吃藥，等五月回診的時候再跟醫生提這件事就好。","Some BP pills really can affect sexual function. Keep taking everything for now and simply mention it to the doctor at your May visit.","ยาลดความดันบางตัวมีผลต่อสมรรถภาพทางเพศจริง ตอนนี้กินยาตามปกติไปก่อน แล้วค่อยบอกหมอตอนไปตามนัดเดือนพฤษภาคม"]],[0,["偶爾停一兩天沒關係，血壓血糖不會馬上變化；隔天記得把漏掉的份量一起補吃回來。","Skipping a day or two is fine — BP and sugar don't change right away. The next day, just make up the missed doses all together.","หยุดยาสักวันสองวันไม่เป็นไร ความดันกับน้ำตาลไม่เปลี่ยนทันทีหรอก วันรุ่งขึ้นก็กินยาที่ขาดไปชดเชยรวมกันได้เลย"]]],"x":["性功能障礙可能與部分降壓藥有關，也和吸菸、飲酒、糖尿病有關；不可自行停藥，也不能補吃兩倍。","Sexual dysfunction can relate to some antihypertensives, smoking, alcohol and diabetes — never stop on your own, and never double up.","ปัญหาสมรรถภาพทางเพศอาจเกี่ยวกับยาลดความดัน บุหรี่ เหล้า เบาหวาน ห้ามหยุดยาเองและห้ามกินเบิ้ล"]},
 {"p":"P1","m":["多看幾家醫院比較保險啦！","Seeing lots of hospitals is safer!","ไปหลายโรงพยาบาลปลอดภัยกว่า!"],"c":[[2,["固定一位家庭醫師，看診時帶健保卡和用藥清單，就能避免重複檢查和重複用藥。","Stick with one family doctor and bring your NHI card and medicine list — that prevents duplicate tests and duplicate drugs.","มีหมอประจำคนเดียว พกบัตรประกันและรายการยาไปทุกครั้ง จะช่วยกันการตรวจซ้ำและยาซ้ำได้"]],[1,["多看幾家也可以，只要每次都跟醫生說「我在別家也有拿藥」，醫生就會幫您注意。","Seeing several is okay, as long as you tell every doctor \"I also get medicine elsewhere\" — then they'll watch out for you.","ไปหลายที่ก็ได้ ขอแค่บอกหมอทุกครั้งว่า \"ได้ยาจากที่อื่นด้วย\" หมอก็จะช่วยระวังให้เอง"]],[0,["醫院和診所各有專長，每個症狀都找不同專科，雖然跑得比較多，但治得最快。","Hospitals and clinics each have specialties — see a different specialist for every symptom. More trips, but the fastest cure.","โรงพยาบาลกับคลินิกต่างก็มีความเชี่ยวชาญ อาการไหนก็ไปหาหมอเฉพาะทาง ถึงเดินทางเยอะแต่หายเร็วที่สุด"]]],"x":["健保雲端藥歷可以讓醫師看到所有用藥，固定醫師能整合全部問題。","The NHI cloud record shows doctors every medicine; a regular doctor can integrate all your problems.","ประวัติยาบนคลาวด์ช่วยให้หมอเห็นยาทั้งหมด และแพทย์ประจำช่วยดูแลทุกปัญหาแบบองค์รวม"]},
 {"p":"P13","m":["腎臟又不會痛，藥照吃就好啦！","My kidneys don't hurt — I'll just keep taking everything!","ไตไม่เห็นเจ็บ กินยาต่อไปเหมือนเดิมก็ได้!"],"c":[[2,["您的腎功能只剩約五分之一，有些藥會傷腎或累積。我們會請醫師依腎功能調整劑量。","Your kidneys work at about a fifth of normal, so some drugs harm them or build up. We'll ask your doctor to adjust the doses.","ไตของลุงทำงานเหลือราวหนึ่งในห้า ยาบางตัวทำร้ายไตหรือสะสมได้ เราจะขอให้หมอปรับขนาดยาตามไต"]],[1,["腎功能不好的確要小心，以後止痛藥改吃普拿疼就好，其他的藥照原本方式繼續吃。","Weak kidneys do need care — switch your painkiller to paracetamol from now on, and keep taking all the other medicines as before.","ไตไม่ดีต้องระวังจริง ต่อไปเปลี่ยนยาแก้ปวดเป็นพาราเซตามอล ส่วนยาอื่นกินแบบเดิมต่อไปได้"]],[0,["腎臟又不會痛，表示還很健康；真的壞了也可以洗腎，所以現在藥照吃不用擔心。","Your kidneys don't hurt, so they're still healthy — and if they ever fail there's dialysis, so keep taking everything.","ไตไม่เจ็บแสดงว่ายังดีอยู่ ถ้าวันหนึ่งไตวายก็ฟอกไตได้ ตอนนี้กินยาทุกตัวต่อไปไม่ต้องกังวล"]]],"x":["慢性腎臟病常常沒有症狀，等到不舒服時往往已經很嚴重；用藥一定要依 eGFR 調整。","CKD is often silent until it is advanced — doses must be adjusted to eGFR.","โรคไตเรื้อรังมักไม่มีอาการจนกว่าจะรุนแรง ต้องปรับยาตาม eGFR เสมอ"]},
 {"p":"P9","m":["痠痛又不嚴重，藥拿了丟掉就好。","The aches aren't serious — just collect the pills and toss them.","ปวดเมื่อยไม่หนัก รับยามาแล้วทิ้งก็ได้"],"c":[[2,["用不到的藥請醫生別再開，剩藥拿回藥局回收；也要查清楚關節痛是不是痛風。","Ask doctors not to prescribe what you won't use, return leftovers to a pharmacy — and let's check whether the joint pain is gout.","ขอหมอไม่ต้องจ่ายยาที่ไม่ได้ใช้ เอายาเหลือคืนร้านยา และตรวจดูว่าปวดข้อเป็นเกาต์หรือเปล่า"]],[1,["不想吃也不用勉強，但藥不要丟進垃圾桶，拿到藥局回收比較環保，也比較安全。","No need to force yourself to take them, but don't bin the medicine — taking it back to a pharmacy is greener and safer.","ไม่อยากกินก็ไม่ต้องฝืน แต่อย่าทิ้งยาลงถังขยะ เอาไปคืนร้านยาจะดีต่อสิ่งแวดล้อมและปลอดภัยกว่า"]],[0,["年紀大了痠痛很正常，藥先留著，真的很痛的時候再一次多吃幾顆，效果比較快。","Aches are normal at your age — keep the pills, and when it really hurts take a few extra at once so they work faster.","อายุมากปวดเมื่อยเป็นเรื่องปกติ เก็บยาไว้ก่อน ตอนปวดมากค่อยกินทีละหลายเม็ด จะได้ผลเร็วกว่า"]]],"x":["尿酸高可能引起關節痛，需要好好評估；止痛藥一次多吃會傷胃傷腎。","High uric acid can cause joint pain and needs evaluation; overdosing painkillers harms the stomach and kidneys.","กรดยูริกสูงอาจทำให้ปวดข้อ ต้องประเมิน และการกินยาแก้ปวดเกินขนาดทำร้ายกระเพาะกับไต"]},
 {"p":"P3","m":["啤酒不是酒啦，喝了解渴又不會怎樣！","Beer isn't really alcohol — it's just thirst-quenching!","เบียร์ไม่ใช่เหล้าหรอก ดื่มแก้กระหายไม่เป็นไร!"],"c":[[2,["啤酒含普林，會讓尿酸升高、誘發痛風，也影響血糖和肝臟。我們一起慢慢減量吧！","Beer contains purines — it raises uric acid and triggers gout, and affects sugar and the liver. Let's cut down together!","เบียร์มีพิวรีน ทำให้กรดยูริกสูงและกระตุ้นเกาต์ ยังกระทบน้ำตาลและตับ มาค่อยๆ ลดด้วยกันนะ"]],[1,["啤酒熱量很高，喝的時候配點下酒菜、不要空腹喝，對血糖和胃都會比較好一點。","Beer is high in calories — have some snacks with it and never drink on an empty stomach; it's kinder to sugar and stomach.","เบียร์แคลอรีสูง ดื่มแล้วกินกับแกล้มด้วย อย่าดื่มตอนท้องว่าง จะดีต่อน้ำตาลและกระเพาะกว่า"]],[0,["啤酒酒精濃度低，又能利尿把尿酸排出去，所以一天兩箱其實還在安全範圍內。","Beer is low in alcohol and makes you pee out uric acid, so two cases a day is actually still within a safe range.","เบียร์แอลกอฮอล์ต่ำ แถมขับปัสสาวะช่วยขับกรดยูริก วันละสองลังจึงยังอยู่ในเกณฑ์ปลอดภัย"]]],"x":["每天兩箱啤酒會讓尿酸、血糖、肝功能都受影響。","Two cases of beer a day affects uric acid, blood sugar and liver function.","เบียร์วันละสองลังส่งผลต่อกรดยูริก น้ำตาล และการทำงานของตับ"]},
 {"p":"P2","m":["抽了幾十年，現在戒也沒用了！","I've smoked for decades — quitting now is pointless!","สูบมาหลายสิบปี ตอนนี้เลิกก็ไม่มีประโยชน์!"],"c":[[2,["什麼時候戒都有好處！可打免付費戒菸專線 0800-636-363，或去戒菸門診。","Quitting helps at any age! Call Taiwan's free quitline 0800-636-363 or get help at a smoking-cessation clinic.","เลิกเมื่อไหร่ก็มีประโยชน์! โทรสายด่วนเลิกบุหรี่ไต้หวัน 0800-636-363 ฟรี หรือไปคลินิกเลิกบุหรี่"]],[1,["一下子戒掉太難了，先改抽淡菸或電子菸，之後再慢慢減少根數，就能自然地戒掉。","Quitting at once is too hard — switch to light or e-cigarettes first, then cut down slowly until you stop for good.","เลิกทีเดียวยากเกินไป เปลี่ยนไปสูบบุหรี่ไลท์หรือบุหรี่ไฟฟ้าก่อน แล้วค่อยๆ ลดจำนวนลงจนเลิกได้เอง"]],[0,["抽了幾十年身體早就習慣了，突然戒掉反而對心臟不好，所以維持現在的量比較安全。","After decades your body is used to it — quitting suddenly strains the heart, so keeping your current amount is safer.","สูบมาหลายสิบปีร่างกายชินแล้ว เลิกกะทันหันจะไม่ดีต่อหัวใจ สูบเท่าเดิมต่อไปจะปลอดภัยกว่า"]]],"x":["戒菸能降低心血管疾病風險，也有助血壓、血糖控制；淡菸也沒有比較安全。台灣戒菸專線：0800-636-363（免付費）。","Quitting lowers cardiovascular risk and helps BP and glucose; \"light\" cigarettes are not safer. Taiwan quitline: 0800-636-363 (free). (In Thailand the national quitline is 1600.)","การเลิกบุหรี่ลดความเสี่ยงโรคหัวใจ ช่วยคุมความดันและน้ำตาล บุหรี่ไลท์ไม่ได้ปลอดภัยกว่า · 🇹🇼 เคสนี้อยู่ไต้หวัน: สายด่วน 0800-636-363 (โทรฟรี) · 🇹🇭 ถ้าผู้ป่วยอยู่ในไทย: สายด่วนเลิกบุหรี่ 1600"]},
 {"p":"P4","m":["外食比較方便，吃什麼都一樣啦！","Eating out is easier — food is food!","กินข้าวนอกบ้านสะดวกกว่า กินอะไรก็เหมือนกัน!"],"c":[[2,["外食也能吃得健康：少油、少鹽、少糖，多點青菜、份量減少，對血壓血糖都好。","You can eat out healthily: less oil, salt and sugar, more vegetables, smaller portions — good for BP and sugar.","กินข้างนอกก็ดีต่อสุขภาพได้: ลดมัน เค็ม หวาน เพิ่มผัก ลดปริมาณ ดีต่อความดันและน้ำตาล"]],[1,["外食沒關係，吃完多走路、多喝水就能消耗掉，記得晚上八點以後不要再吃東西。","Eating out is fine — just walk more and drink water afterwards to burn it off, and don't eat anything after 8 pm.","กินข้างนอกไม่เป็นไร กินแล้วเดินเยอะๆ ดื่มน้ำมากๆ ก็เผาผลาญได้ แค่อย่ากินอะไรหลังสองทุ่ม"]],[0,["素食便當一定比較健康，不管是不是油炸、醬汁多不多，選素的就對血糖沒影響。","A vegetarian lunchbox is always healthier — fried or not, whatever the sauce, going vegetarian won't touch your sugar.","ข้าวกล่องมังสวิรัติดีกว่าเสมอ จะทอดหรือราดซอสเยอะแค่ไหน ถ้าเป็นเจก็ไม่กระทบน้ำตาล"]]],"x":["BMI 約 30，飲食調整是控制慢性病的基礎。","With BMI around 30, diet changes are the foundation of chronic-disease control.","BMI ประมาณ 30 การปรับอาหารคือพื้นฐานของการคุมโรคเรื้อรัง"]},
 {"p":"P10","m":["會累就是老了，買補品吃就好！","Tired? That's just age — buy some supplements!","เหนื่อยก็เพราะแก่ ซื้ออาหารเสริมกินก็พอ!"],"c":[[2,["疲倦和沒胃口可能和血糖、酒精、藥物或自行停藥有關，請醫師幫您抽血檢查。","Fatigue and poor appetite may come from sugar levels, alcohol, medicines or stopping them — let's get blood tests.","เหนื่อยและเบื่ออาหารอาจเกี่ยวกับน้ำตาล เหล้า ยา หรือการหยุดยาเอง ควรให้หมอเจาะเลือดตรวจ"]],[1,["應該是最近太累了，多休息、早點睡、三餐正常吃，過一兩個禮拜就會好轉了。","You're probably just worn out lately — rest more, sleep earlier and eat regular meals; it should pass in a week or two.","คงเหนื่อยสะสมช่วงนี้ พักเยอะๆ นอนเร็วขึ้น กินข้าวให้ตรงเวลา อีกสักสัปดาห์สองสัปดาห์ก็ดีขึ้น"]],[0,["這是體虛，買人蔘和雞精來補比吃藥自然安全，也不會和您現在的藥起衝突。","That's just weakness — ginseng and chicken essence are more natural than medicine and won't clash with your pills.","แค่ร่างกายอ่อนแอ ซื้อโสมกับซุปไก่สกัดมาบำรุง ธรรมชาติกว่ายาและไม่ตีกับยาที่กินอยู่"]]],"x":["症狀可能是多個問題交互造成，需要系統性評估；補品也可能和藥物交互作用。","Symptoms may come from several interacting problems; supplements can also interact with medicines.","อาการอาจเกิดจากหลายปัญหาร่วมกัน และอาหารเสริมก็อาจตีกับยาได้"]}
];
/* v10: a myth only breaks with the BEST card. A surviving myth can still be broken in the closing summary if the
   student addresses it (keywords below); whatever survives has a consequence two weeks later. */
const MYTH_FX={
 P6:{n:['「混著吃比較強」','"Mixing makes them stronger"','"ผสมยาหลายหมอแรงกว่า"'],
   kw:['混','重複','藥袋','整合','一起吃','同類','mix','duplicate','double up','same kind','all your bags','all the bags','med bag','medicine bag','ผสม','ซ้ำ','ซองยา','รวมยา','จัดยา','กินรวม'],
   fx:['把舊藥袋的鼻炎藥也一起吃。','Took the nose pills from the old bags as well.','กินยาภูมิแพ้จากซองเก่าปนไปด้วย']},
 P8:{n:['「那方面不行就停藥」','"Bedroom trouble? Stop the pills"','"มีปัญหาเรื่องบนเตียงก็หยุดยา"'],
   kw:['停藥','自己停','不要停','別停','性功能','那方面',"don't stop",'do not stop','never stop','stop taking','stopping','skip','sexual','bedroom','erection','หยุดยา','หยุดเอง','อย่าหยุด','ห้ามหยุด','สมรรถภาพ','เรื่องบนเตียง'],
   fx:['還是覺得是吃藥害的，照樣偷偷停藥。','Still blames the pills and keeps secretly stopping them.','ยังโทษว่าเป็นเพราะยา และแอบหยุดยาเหมือนเดิม']},
 P1:{n:['「多看幾家比較保險」','"More hospitals is safer"','"ไปหลายโรงพยาบาลปลอดภัยกว่า"'],
   kw:['固定','同一位','同一家','一位醫師','一家醫院','家庭醫師','健保卡','雲端','one doctor','one hospital','same doctor','same hospital','family doctor','regular doctor','one clinic','nhi card','medicine list','หมอประจำ','หมอคนเดียว','โรงพยาบาลเดียว','ที่เดียว','บัตรประกัน','รายการยา'],
   fx:['又去了兩家診所，拿回感冒藥和止痛藥，重複用藥又出現了。','Visited two more clinics and came home with cold medicine and painkillers. The duplicates are back.','ไปอีกสองคลินิก ได้ยาแก้หวัดกับยาแก้ปวดกลับมา ยาซ้ำกลับมาอีกแล้ว']},
 P13:{n:['「腎不痛，藥照吃」','"My kidneys don\'t hurt"','"ไตไม่เจ็บ กินยาต่อได้"'],
   kw:['腎','腎功能','egfr','kidney','renal','ไต'],
   fx:['以為腎不痛就沒事，自己買止痛藥吃。','Thought painless kidneys were healthy ones and bought painkillers himself.','คิดว่าไตไม่เจ็บก็ไม่เป็นไร เลยซื้อยาแก้ปวดกินเอง']},
 P9:{n:['「痠痛藥拿了丟掉」','"Collect the pills, then toss them"','"รับยามาแล้วทิ้ง"'],
   kw:['痛風','尿酸','止痛','回收','剩藥','關節','gout','uric','painkiller','pain killer','leftover','return','joint','เกาต์','ยูริก','ยาแก้ปวด','ยาเหลือ','คืนยา','ปวดข้อ','ปวดเข่า'],
   fx:['膝蓋又痛，一次吞了三顆止痛藥，胃痛整晚；痛風也還沒查。','His knee flared and he swallowed three painkillers at once: stomach pain all night, and the gout is still unchecked.','เข่ากำเริบ กินยาแก้ปวดทีเดียว 3 เม็ด ปวดท้องทั้งคืน และยังไม่ได้ตรวจเกาต์']},
 P3:{n:['「啤酒不是酒」','"Beer isn\'t alcohol"','"เบียร์ไม่ใช่เหล้า"'],
   kw:['啤酒','喝酒','酒精','飲酒','beer','alcohol','booze','liquor','เบียร์','เหล้า','แอลกอฮอล์','สุรา'],
   fx:['照樣喝啤酒，有時還空腹喝。','Kept drinking beer, sometimes on an empty stomach.','ดื่มเบียร์เหมือนเดิม บางทีดื่มตอนท้องว่าง']},
 P2:{n:['「戒菸也沒用」','"Too late to quit smoking"','"เลิกบุหรี่ตอนนี้ไม่มีประโยชน์"'],
   kw:['菸','戒菸','抽菸','香菸','smok','cigarette','quitline','nicotine','บุหรี่','เลิกสูบ','สูบ','นิโคติน'],
   fx:['「都抽幾十年了」，菸一樣多。','"Decades of smoking anyway": same number of cigarettes.','"สูบมาหลายสิบปีแล้ว" บุหรี่เท่าเดิม']},
 P4:{n:['「外食吃什麼都一樣」','"Food is food"','"กินอะไรก็เหมือนกัน"'],
   kw:['飲食','外食','少油','少鹽','少糖','青菜','便當','清淡','diet','eat out','eating out','salt','salty','less sugar','sugary','fried','vegetable','lunchbox','portion','healthy food','healthy meal','ลดหวาน','ของหวาน','ลดเค็ม','เค็ม','ของทอด','ผัก','ข้าวกล่อง','กินข้าวนอกบ้าน','อาหารนอกบ้าน','ลดมัน','ไขมัน','ปรับอาหาร','ควบคุมอาหาร','คุมอาหาร'],
   fx:['每天還是炸排骨便當，體重還是 90 公斤。','Still a fried pork-chop lunchbox every day; still 90 kg.','ยังกินข้าวกล่องหมูทอดทุกวัน น้ำหนักยัง 90 กก.']},
 P10:{n:['「累就吃補品」','"Tired? Buy supplements"','"เหนื่อยก็กินอาหารเสริม"'],
   kw:['累','疲倦','補品','人蔘','人參','雞精','抽血','tired','fatigue','exhaust','supplement','ginseng','tonic','chicken essence','blood test','เหนื่อย','อ่อนเพลีย','อาหารเสริม','โสม','ซุปไก่','เจาะเลือด','ตรวจเลือด'],
   fx:['花了三千元買人蔘雞精，還是很累，也還沒抽血。','Spent NT$3,000 on ginseng and chicken essence; still exhausted, still no blood test.','จ่ายไป 3,000 ดอลลาร์ไต้หวันกับโสมและซุปไก่สกัด ยังเหนื่อยอยู่ และยังไม่ได้เจาะเลือด']},
};
const MYTH_SEVERITY=['P13','P3','P6','P8','P2','P1','P9','P10','P4'];
const mythOf=p=>MYTHS.find(m=>m.p===p);
function mythHit(txt,p){ const f=MYTH_FX[p]; if(!f||!txt) return false; const li=LI(); let own=txt;
  RUBRIC_SUM.forEach(r=>{ own=own.split(r.st[li]).join(' '); });
  own=own.replace(/ไต้หวัน/g,' ').replace(/เบาหวาน/g,' ');                      // "Taiwan" contains ไต, "diabetes" contains หวาน
  const low=' '+own.toLowerCase()+' '; return f.kw.some(k=>low.includes(k.toLowerCase())); }
function mythsAlive(){ return (S.boss.alive||[]).filter(p=>p!=='P8'||S.found.P8); }
const BOSS_HP=1000;
function bossCards(myth){ return new Promise(res=>{
  const cards=myth.c.map((c,i)=>({q:c[0], t:c[1], i})).sort(()=>Math.random()-.5);
  $('#bossCards').innerHTML=cards.map((c,j)=>`<button class="ccard" data-j="${j}" style="animation-delay:${j*.1}s"><div class="ct">🃏 ${T('cardBest')} ${j+1}</div>${esc(L(c.t))}</button>`).join('');
  let done=false, iv=null; const fin=j=>{ if(done) return; done=true; clearInterval(iv); D.choiceFinish=null; $('#bossTimer').innerHTML='';
    if(j>=0){ const el=$('#bossCards').children[j]; el.classList.add('fly'); } setTimeout(()=>{ $('#bossCards').innerHTML=''; res(j>=0?cards[j]:null); }, j>=0?450:100); };
  $('#bossCards').querySelectorAll('.ccard').forEach(b=>b.onclick=()=>{ sfx.select(); fin(+b.dataset.j); }); D.choiceFinish=j=>{ if(j<3){ sfx.select(); fin(j); } };
  if(S.qte){ const t0=performance.now(); let last=CONFIG.BOSS_SEC; $('#bossTimer').innerHTML=`<div id="qte" style="--p:100%">${CONFIG.BOSS_SEC}</div>`;
    iv=setInterval(()=>{ const rem=Math.max(0,CONFIG.BOSS_SEC-(performance.now()-t0)/1000); const q=$('#bossTimer #qte'); if(q){ q.textContent=Math.ceil(rem); q.style.setProperty('--p',(rem/CONFIG.BOSS_SEC*100)+'%'); }
      if(rem<=5&&Math.ceil(rem)!==last){ last=Math.ceil(rem); sfx.tick(); } if(rem<=0){ sfx.error(); fin(-1); } },100); }
}); }
function setMonster(state){ $('#monster').innerHTML=monsterSVG(state); }
function dmgNum(text, color){ const d=document.createElement('div'); d.className='dmg'; d.textContent=text; d.style.left=(760+rand(-80,80))+'px'; d.style.top=(220+rand(-40,40))+'px'; if(color) d.style.webkitTextStrokeColor=color; $('#stage').appendChild(d); setTimeout(()=>d.remove(),1200); }
function chenMini(e){ $('#chenMini').innerHTML=charSVG('chen',e); }
/* guided finisher: 5-step checklist with examples, opener chips and live coverage lights */
function finalInput(alive){
  alive=alive||[];
  return new Promise(res=>{
    const box=$('#finalBox'), ta=$('#fText'), warn=$('#fWarn'); let last=[], warned=false; box.classList.toggle('exam',EXAM());
    $('#fTitle').textContent=T('finalT'); $('#fSub').textContent=EXAM()?L(['用你自己的話，對陳伯做最後的衛教與總結（4–6 句）。','In your own words, give Uncle Chen your closing counselling and summary (4–6 sentences).','พูดสรุปและให้คำแนะนำปิดท้ายกับลุงเฉินด้วยคำพูดของคุณเอง (4–6 ประโยค)']):T('finalH'); ta.placeholder=EXAM()?L(['在這裡寫下你要對陳伯說的話……','Write what you will say to Uncle Chen…','เขียนสิ่งที่คุณจะพูดกับลุงเฉินที่นี่…']):T('finalPh'); ta.value=''; $('#fFmt').textContent=T('finalFmt'); $('#fSend').textContent=T('send');
    const mythPanel=alive.length?`<div id="fMyths"><div class="fmh">${esc(T('mythListH'))}</div>${alive.map(p=>`<div class="fmq" data-p="${p}"><span>${esc(L(MYTH_FX[p].n))}</span><i>✓</i></div>`).join('')}</div>`:'';
    $('#fSteps').innerHTML=mythPanel+SUM_ORDER.map((ri,n)=>{ const r=RUBRIC_SUM[ri]; return `<div class="fstep" data-ri="${ri}"><div class="fnum">${n+1}</div><div class="fbody"><div class="fhd"><b>${r.ic} ${esc(L(r.k))}</b><button class="fchip" data-st="${ri}">${T('addStarter')}</button></div><div class="fg">${esc(L(r.g))}</div><div class="fex">${T('stepEx')}${S.lang==='zh'?'：「'+esc(L(r.ex))+'」':': “'+esc(L(r.ex))+'”'}</div></div><div class="fck">✓</div></div>`; }).join('');
    const upd=()=>{ const cov=sumCoverage(ta.value), n=cov.filter(Boolean).length;
      $$('#fSteps .fstep').forEach(el=>{ const i=+el.dataset.ri; el.classList.toggle('ok',cov[i]); if(cov[i]&&!last[i]) sfx.select(); });
      let mh=0; alive.forEach(p=>{ const ok=mythHit(ta.value,p); if(ok) mh++; const el=$(`#fMyths .fmq[data-p="${p}"]`); if(el){ if(ok&&!el.classList.contains('ok')) sfx.select(); el.classList.toggle('ok',ok); } }); D.mythLeft=alive.length-mh;
      $('#fCov').innerHTML=`${T('covLbl')} ${n}/${RUBRIC_SUM.length} `+SUM_ORDER.map(i=>`<i class="${cov[i]?'on':''}"></i>`).join('')+(alive.length?` <span class="fcm">👿 ${mh}/${alive.length}</span>`:'');
      const len=S.lang==='en'?ta.value.trim().split(/\s+/).filter(Boolean).length:ta.value.replace(/\s/g,'').length; $('#fCount').textContent=len?(len+' '+L(['字','words','ตัวอักษร'])):'';
      last=cov; if(warned&&n>=3&&!D.mythLeft){ warn.classList.add('hidden'); warned=false; } return n; };
    $$('#fSteps .fchip').forEach(b=>b.onclick=()=>{ const st=L(RUBRIC_SUM[+b.dataset.st].st); const v=ta.value.replace(/\s+$/,''); ta.value=(v?v+'\n':'')+st; sfx.click(); ta.focus(); ta.setSelectionRange(ta.value.length,ta.value.length); upd(); });
    ta.oninput=upd; upd(); warn.classList.add('hidden'); box.classList.remove('hidden'); setTimeout(()=>ta.focus(),80);
    const finish=()=>{ box.classList.add('hidden'); warn.classList.add('hidden'); D.finalGo=null; sfx.select(); res(ta.value.trim()); };
    const go=()=>{ const v=ta.value.trim(); if(!v){ sfx.error(); ta.focus(); return; } const n=upd();
      if((n<3||D.mythLeft>0)&&!warned&&!EXAM()){ warned=true; sfx.error(); warn.innerHTML=`⚠️ ${esc(n<3?T('finalWarn').replace('{n}',n):T('mythWarn').replace('{n}',D.mythLeft))}<div class="acts"><button class="sbtn" id="fKeep">${T('keepEdit')}</button><button class="sbtn p" id="fAnyway">${T('sendAnyway')}</button></div>`; warn.classList.remove('hidden');
        $('#fKeep').onclick=()=>{ sfx.click(); warn.classList.add('hidden'); warned=false; ta.focus(); }; $('#fAnyway').onclick=finish; return; }
      finish(); };
    $('#fSend').onclick=go; D.finalGo=go;
  });
}
async function chapter5(){
  S.chStart=realSec(); hideAll(); playTheme('boss');
  await chapterCard(5);
  $('#boss').classList.remove('hidden'); $('#bossBg').innerHTML=Array.from({length:14},(_,i)=>`<div class="fpill" style="left:${i*7.3}%;animation-duration:${8+i%5*2}s;animation-delay:${-i*1.3}s">${['💊','💊','🧪','🍺','🚬','💊','🥡'][i%7]}</div>`).join('');
  $('#bossName').textContent='👿 '+T('bossName');
  const B=S.boss; B.combo=0; B.alive=[]; B.byFinal=[];
  const myths=MYTHS.filter(m=>m.p!=='P8'||S.found.P8), mhp={}; myths.forEach(m=>mhp[m.p]=100);
  const TOT=myths.length*100, hpNow=()=>Object.values(mhp).reduce((a,b)=>a+b,0), setHP=()=>$('#bossHPv').style.width=(hpNow()/TOT*100)+'%'; setHP(); setMonster('laugh');
  const ma=$('#mythAlive'); const drawAlive=()=>{ ma.innerHTML=B.alive.length?`<div class="mh">${esc(T('mythAliveH'))} ${B.alive.length}</div>`+B.alive.map(p=>`<div class="ma${mhp[p]===0?' gone':mhp[p]<100?' weak':''}">${esc(L(MYTH_FX[p].n))}</div>`).join(''):''; }; drawAlive();
  chenMini('think'); let confusion=0; const setConf=()=>$('#confuse').textContent=confusion?T('confusion')+' '+'❓'.repeat(confusion):''; setConf(); $('#combo').textContent=''; $('#myth').textContent='';
  await say('pilly','shock',['陳伯腦中的錯誤觀念……變成「迷思大魔王」了！','Uncle Chen\'s misconceptions turned into the Myth Overlord!','ความเชื่อผิดๆ ในหัวลุงเฉิน… กลายเป็น "จอมมารความเชื่อผิด" แล้ว!']);
  await say('yeh','smug',[`${nm()}，用正確的衛教卡擊敗它！選最完整、最正確的建議！`,`${nm()}, defeat it with the right counseling cards! Pick the most complete, correct advice!`,`${nm()} ใช้การ์ดคำแนะนำที่ถูกต้องล้มมัน! เลือกคำแนะนำที่ครบและถูกที่สุด!`]);
  await say('pilly','think',T('mythRule'));
  hideText(); setMonster('normal');
  for(let i=0;i<myths.length;i++){
    const m=myths[i]; $('#myth').getAnimations().forEach(a=>a.cancel()); $('#myth').textContent='「'+L(m.m)+'」'; $('#myth').animate([{opacity:0,transform:'scale(.8)'},{opacity:1,transform:'none'}],{duration:350,easing:'cubic-bezier(.2,1.4,.4,1)'}); sfx.slam(); setMonster('normal');
    const card=await bossCards(m); const q=card?card.q:-1;
    B.answers.push({p:m.p, q, text:card?L(card.t):'(timeout)'}); logEvent({type:'boss', p:m.p, q});
    const mon=$('#monster');
    if(q===2){ B.crit++; B.combo++; B.maxCombo=Math.max(B.maxCombo,B.combo); const d=100+B.combo*5; mhp[m.p]=0; sfx.crit(); flash(); setMonster('hit'); mon.classList.remove('hit'); void mon.offsetWidth; mon.classList.add('hit');
      dmgNum('−'+d+'  '+T('critical')); $('#combo').textContent=B.combo>1?B.combo+' '+T('combo')+'!':''; $('#myth').animate([{transform:'none',opacity:1},{transform:'scale(1.25) rotate(-3deg)',opacity:0}],{duration:600,easing:'ease-in',fill:'forwards'}); }
    else if(q===1){ B.ok++; B.combo=0; mhp[m.p]=60; B.alive.push(m.p); sfx.hit(); setMonster('hit'); mon.classList.remove('hit'); void mon.offsetWidth; mon.classList.add('hit'); dmgNum(T('mythShaken'),'#ff9d00'); $('#combo').textContent=''; drawAlive(); }
    else { B.miss++; B.combo=0; B.alive.push(m.p); sfx.heal(); setMonster('laugh'); dmgNum(T('mythHolds'),'#18b07f'); confusion++; setConf(); $('#combo').textContent=''; chenMini('shock'); drawAlive(); }
    setHP(); await sleep(700); chenMini(q===2?'happy':'think');
    const sv=q<2?' '+T('mythSurv'):'';
    if(!EXAM()) await say('yeh', q===2?'happy':q===1?'think':'sad', [ (q===2?'完美！':q===1?'方向對，但不夠完整。':'不對喔！')+m.x[0]+sv, (q===2?'Perfect! ':q===1?'Right idea, but incomplete. ':'Nope! ')+m.x[1]+sv, (q===2?'เยี่ยม! ':q===1?'มาถูกทาง แต่ยังไม่ครบ ':'ไม่ใช่นะ! ')+m.x[2]+sv ]);
    hideText();
  }
  $('#myth').getAnimations().forEach(a=>a.cancel());
  $('#myth').textContent='「'+L(['……可是我還是記不住啦！','…but I still can\'t remember it all!','…แต่ลุงยังจำไม่ได้หมดเลย!'])+'」';
  if(B.alive.length) await say('pilly','shock',T('mythLastCall').replace('{n}',B.alive.length));
  else await say('pilly','happy',['最後一擊！用你自己的話幫陳伯「總結」——讓他記得住！','Final strike! Summarize everything for Uncle Chen in your own words — make it stick!','โจมตีสุดท้าย! สรุปทุกอย่างให้ลุงฟังด้วยคำพูดของคุณ — ให้ลุงจำได้!']);
  hideText();
  const txt=await finalInput(B.alive.slice());
  S.finalText=txt; S.finalCov=sumCoverage(txt);
  const hit=B.alive.filter(p=>mythHit(txt,p)), pre=hpNow(); B.byFinal=hit; B.alive=B.alive.filter(p=>!hit.includes(p)); hit.forEach(p=>mhp[p]=0);
  logEvent({type:'final', text:txt, cov:S.finalCov, mythsHit:hit, mythsLeft:B.alive.slice()});
  await say('me','smug',txt);
  const cov=S.finalCov.filter(Boolean).length;
  if(!B.alive.length){
    sfx.crit(); flash(); shakeStage(); dmgNum((pre?'−'+pre+'  ':'')+'ULTIMATE!!','#ffb21f'); setHP(); drawAlive(); setMonster('dead'); await sleep(900);
    await splash('victory','gold','fanfare'); $('#boss').classList.add('hidden');
    bgFx('rays'); show('chen','C','happy'); show('me','L','happy'); show('yeh','R','happy');
  await say('chen',cov>=3?'happy':'think',['原來是這樣！我終於懂每種藥是做什麼的了。我會照你說的做！','I see now! I finally understand what each medicine is for. I\'ll do what you said!','อ๋อ อย่างนี้นี่เอง! ลุงเข้าใจแล้วว่ายาแต่ละตัวไว้ทำอะไร ลุงจะทำตามที่หนูบอก!']);
  } else {
    if(hit.length){ sfx.hit(); flash(); dmgNum('−'+(pre-hpNow()),'#ffb21f'); setHP(); drawAlive(); await sleep(700); }
    setMonster('laugh'); sfx.heal(); await sleep(400);
    const fl=$('#monster').animate([{transform:'none',opacity:1},{transform:'translateY(-260px) scale(.4)',opacity:0}],{duration:900,easing:'ease-in',fill:'forwards'}); await sleep(750);
    await splash('escaped','blue','heartLose'); $('#boss').classList.add('hidden'); fl.cancel();
    show('chen','C','think'); show('me','L','neutral'); show('yeh','R','think');
    const p0=MYTH_SEVERITY.find(p=>B.alive.includes(p))||B.alive[0];
    await say('chen','think',T('chenStill').replace('{q}',L(mythOf(p0).m)));
    if(!EXAM()) await say('yeh','sad',T('mythEscYeh').replace('{n}',B.alive.length));
  }
  if(!EXAM()) await say('yeh','smug',[`總結涵蓋了 ${cov}/${RUBRIC_SUM.length} 個重點。${cov>=4?'非常專業！':cov>=2?'不錯，下次記得請他複述、約好追蹤喔。':'下次試著總結重點、請他複述、並約好追蹤。'}`,`Your summary covered ${cov}/${RUBRIC_SUM.length} key elements. ${cov>=4?'Very professional!':cov>=2?'Good — next time also ask him to repeat back and set a follow-up.':'Next time: summarize, use teach-back, and set a follow-up.'}`,`สรุปครอบคลุม ${cov}/${RUBRIC_SUM.length} ประเด็น ${cov>=4?'มืออาชีพมาก!':cov>=2?'ดีนะ ครั้งหน้าให้ลุงทวนกลับและนัดติดตามด้วย':'ครั้งหน้าลองสรุปประเด็น ให้ทวนกลับ และนัดติดตาม'}`]);
  chapterDone(5);
}
/* ---------------- Time-out: Mrs. Chen has to reopen the shop ---------------- */
async function timeoutEnd(atCh){
  S.timeout={ch:atCh, t:Math.round(realSec()), visit:S.visit}; logEvent({type:'timeout', ch:atCh});
  ['#board','#searchHud','#testiBanner','#testiDots','#testiUI','#medrev','#boss','#locks'].forEach(q=>{ const e=$(q); if(e) e.classList.add('hidden'); });
  await wipe(()=>{ setBg('liv'); hideAll(); hideText(); bgFx('motes'); $('#bgCam').classList.remove('dark'); }); playTheme('calm');
  show('wife','R','sad'); show('chen','C','neutral'); show('me','L','shock');
  await say('wife','sad',['不好意思……三點了，我要開店了，客人已經在外面等。今天先到這裡好嗎？','Sorry… it\'s three o\'clock and I have to open the shop — customers are already waiting outside. Can we stop here for today?','ขอโทษนะ… บ่ายสามแล้ว ป้าต้องเปิดร้าน ลูกค้ารออยู่ข้างนอกแล้ว วันนี้พอแค่นี้ได้ไหม?']);
  await say('chen','neutral',['對啊，我也要顧店了。','Right, I need to mind the shop too.','ใช่ ลุงก็ต้องไปเฝ้าร้านแล้ว']);
  hide('wife'); show('yeh','R','think');
  await say('yeh','think',['居家訪視的時間，是跟病人和家屬「借」來的。我們只剩一兩分鐘——把最重要的事交代清楚吧。','Home-visit time is borrowed from the patient and the family. We have a minute or two left — make the most important points count.','เวลาเยี่ยมบ้านเป็นเวลาที่ "ยืม" มาจากผู้ป่วยและครอบครัว เหลืออีกแค่นาทีสองนาที — พูดเรื่องที่สำคัญที่สุดให้ชัด']);
  hide('yeh'); hideText();
  const txt=await finalInput([]); S.finalText=txt; S.finalCov=sumCoverage(txt);
  S.boss.alive=MYTHS.filter(m=>(m.p!=='P8'||S.found.P8)&&!(S.boss.answers||[]).some(a=>a.p===m.p&&a.q===2)).map(m=>m.p).filter(p=>!mythHit(txt,p));
  logEvent({type:'final', text:txt, cov:S.finalCov, quick:true, mythsLeft:S.boss.alive.slice()});
  await say('me','neutral',txt);
  await say('chen','neutral',['好……我盡量記住。','Alright… I\'ll try to remember.','โอเค… ลุงจะพยายามจำ']);
  chapterDone(S.chapter);
}
/* ---------------- Epilogue: two weeks later — outcomes follow the advice ---------------- */
function epiOutcomes(){
  const mr=id=>{ const a=(S.mr.ans||[]).find(x=>x.id===id); return !!(a&&a.perfect); };
  const alive=p=>(S.boss.alive||[]).includes(p);
  const tb=!!S.finalCov[1], fu=!!S.finalCov[2];
  return [
   {k:'aki', ok:mr('m3')&&!alive('P13'), g:['🫘',['停用 Ponstan，腎功能穩定','Ponstan stopped — kidneys stable','หยุด Ponstan ไตคงที่'],['醫師看了你的建議，停掉 NSAID，肌酸酐 2.8 mg/dL，沒有惡化。','The doctor read your note and stopped the NSAID; creatinine 2.8 mg/dL, no worse.','แพทย์อ่านข้อเสนอแนะแล้วหยุด NSAID ครีเอตินิน 2.8 mg/dL ไม่แย่ลง']],
     b:mr('m3')?['🚑',['急性腎損傷住院','Admitted with acute kidney injury','นอนโรงพยาบาลด้วยไตวายเฉียบพลัน'],['醫師停了 Ponstan，但他覺得「腎又不會痛」，自己去藥局買止痛藥：肌酸酐升到 4.1，住院 5 天。','The doctor stopped Ponstan, but "my kidneys don\'t hurt", so he bought painkillers over the counter. Creatinine 4.1; five days in hospital.','หมอหยุด Ponstan แล้ว แต่ลุงคิดว่า "ไตไม่เห็นเจ็บ" เลยซื้อยาแก้ปวดกินเอง ครีเอตินินขึ้นเป็น 4.1 นอนโรงพยาบาล 5 วัน']]
      :['🚑',['急性腎損傷住院','Admitted with acute kidney injury','นอนโรงพยาบาลด้วยไตวายเฉียบพลัน'],['膝蓋痛又吃了 Ponstan，加上 Hyzaar——肌酸酐升到 4.1，住院 5 天。','Took Ponstan for knee pain on top of Hyzaar — creatinine rose to 4.1; five days in hospital.','กิน Ponstan แก้ปวดเข่าร่วมกับ Hyzaar ครีเอตินินขึ้นเป็น 4.1 นอนโรงพยาบาล 5 วัน']], v:['Cr','2.8','4.1']},
   {k:'hypo', ok:mr('m4')&&!alive('P3'), g:['🩸',['沒有再低血糖','No more hypoglycaemia','ไม่มีน้ำตาลต่ำอีก'],['Glimepiride 依腎功能減量，飯前血糖 130 左右，不再發抖冒冷汗。','Glimepiride was reduced for his kidneys; fasting glucose around 130, no more shakes or cold sweats.','ลดขนาด glimepiride ตามไต น้ำตาลก่อนอาหารราว 130 ไม่มีอาการสั่นเหงื่อออกอีก']],
     b:mr('m4')?['😵',['喝酒後低血糖昏倒','Fainted from hypoglycaemia after drinking','หมดสติจากน้ำตาลต่ำหลังดื่มเหล้า'],['Glimepiride 已減量，但他覺得「啤酒不是酒」，空腹喝了半箱：在店裡昏倒，血糖 45 mg/dL。','Glimepiride was reduced, but "beer isn\'t alcohol": half a case on an empty stomach. He collapsed in the shop, glucose 45 mg/dL.','ลดขนาด glimepiride แล้ว แต่ลุงว่า "เบียร์ไม่ใช่เหล้า" ดื่มไปครึ่งลังตอนท้องว่าง ล้มหมดสติในร้าน น้ำตาล 45 mg/dL']]
      :['😵',['喝酒後低血糖昏倒','Fainted from hypoglycaemia after drinking','หมดสติจากน้ำตาลต่ำหลังดื่มเหล้า'],['在店裡昏倒，血糖 45 mg/dL，送急診。','Collapsed in the shop with glucose 45 mg/dL — rushed to the ER.','ล้มหมดสติในร้าน น้ำตาล 45 mg/dL ถูกส่งห้องฉุกเฉิน']], v:['GLU','130','45']},
   {k:'nose', ok:mr('m1')&&!alive('P6'), g:['🤧',['鼻炎藥整合成一種','Nose medicines cut down to one','รวมยาภูมิแพ้เหลือตัวเดียว'],['不再同時吃三種含偽麻黃鹼的藥，血壓 138/84，晚上睡得著。','No more triple pseudoephedrine; BP 138/84 and he sleeps through the night.','เลิกกิน pseudoephedrine ซ้ำ 3 ตัว ความดัน 138/84 นอนหลับได้']],
     b:mr('m1')?['💓',['血壓飆高、心悸','BP spike and palpitations','ความดันพุ่ง ใจสั่น'],['醫師把鼻炎藥整合成一種，但他覺得「混著吃比較強」，把舊藥袋的也一起吃：血壓 172/96。','The doctor cut the nose medicines to one, but "mixing makes them stronger", so he took the old bags too. BP 172/96.','หมอรวมยาภูมิแพ้เหลือตัวเดียวแล้ว แต่ลุงคิดว่า "ผสมกินแรงกว่า" เลยกินยาซองเก่าด้วย ความดัน 172/96']]
      :['💓',['血壓飆高、心悸','BP spike and palpitations','ความดันพุ่ง ใจสั่น'],['「秘方罐」還在吃，血壓 172/96，晚上心悸睡不著。','Still taking the "secret jar": BP 172/96, palpitations at night.','ยังกิน "โหลสูตรลับ" อยู่ ความดัน 172/96 ใจสั่นนอนไม่หลับ']], v:['BP','138/84','172/96']},
   {k:'secret', ok:!!S.found.P8&&!alive('P8'), g:['🤝',['不再自己停藥','No more stopping his medicines','ไม่หยุดยาเองอีกแล้ว'],['醫師和他討論了性功能問題、調整用藥；他不再整天停藥。','The doctor discussed his sexual health and adjusted his medicines; he no longer skips whole days.','แพทย์คุยเรื่องสมรรถภาพทางเพศและปรับยา ลุงไม่หยุดยาทั้งวันอีกแล้ว']],
     b:S.found.P8?['🙈',['還是偷偷停藥','Still secretly stopping medicines','ยังแอบหยุดยาอยู่'],['秘密說出來了，但衛教沒說服他——他還是會整天停藥。','He told you his secret, but the counselling didn\'t convince him — he still skips whole days.','ลุงเล่าความลับแล้ว แต่คำแนะนำยังไม่โน้มน้าวพอ ลุงยังหยุดยาทั้งวัน']]
       :['🔒',['停藥的原因沒人知道','Nobody knows why he stops','ไม่มีใครรู้ว่าทำไมลุงหยุดยา'],['他還是每週偷偷停藥兩天，血壓血糖時好時壞。','He still secretly stops everything two days a week; his BP and sugar swing up and down.','ลุงยังแอบหยุดยาสัปดาห์ละ 2 วัน ความดันกับน้ำตาลขึ้นๆ ลงๆ']]},
   {k:'teach', ok:tb, g:['🔁',['新的吃法記得清清楚楚','Clear on his new regimen','จำวิธีกินยาใหม่ได้ชัดเจน'],['因為你請他複述，他能把新的吃法講給太太聽。','Because you used teach-back, he can explain his new regimen to his wife.','เพราะคุณให้ลุงทวนกลับ ลุงอธิบายวิธีกินยาใหม่ให้ภรรยาฟังได้']],
     b:['😵‍💫',['新舊藥袋搞混','Mixed up old and new bags','สับสนซองยาเก่ากับใหม่'],['他沒完全聽懂新的吃法，新舊藥袋混在一起吃。','He never fully understood the new plan and mixed old and new bags.','ลุงไม่เข้าใจวิธีใหม่ทั้งหมด เลยกินยาซองเก่ากับใหม่ปนกัน']]},
   {k:'follow', ok:fu, g:['📞',['追蹤電話接通了','Your follow-up call went through','โทรติดตามผลได้ตามนัด'],['你約好的兩週追蹤，讓藥師和醫師能及時調整。','The two-week follow-up you arranged let the pharmacist and doctor adjust things in time.','การนัดติดตาม 2 สัปดาห์ที่คุณนัดไว้ ทำให้เภสัชกรกับแพทย์ปรับแผนได้ทันเวลา']],
     b:['📵',['沒有人追蹤','Nobody followed up','ไม่มีใครติดตาม'],['沒有約好追蹤，問題要等到出事才會被發現。','No follow-up was arranged, so problems only surface when something goes wrong.','ไม่ได้นัดติดตาม ปัญหาจะถูกพบก็ต่อเมื่อเกิดเรื่องขึ้นแล้ว']]},
   {k:'life', ok:!alive('P2')&&(!!S.fl.ready||!alive('P3')), g:['🌱',['開始減菸減酒','Cutting down cigarettes & beer','เริ่มลดบุหรี่และเบียร์'],['他照你說的打了戒菸專線，菸從 3 包減到 1 包，啤酒也少了一半。','He called the quitline as you suggested: down from 3 packs to 1, and half the beer.','ลุงโทรสายด่วนเลิกบุหรี่ตามที่แนะนำ ลดจาก 3 ซองเหลือ 1 ซอง เบียร์ก็ลดลงครึ่งหนึ่ง']],
     b:['🚬',['菸酒照舊','Still smoking and drinking','ยังสูบและดื่มเหมือนเดิม'],['「都抽幾十年了」——菸和啤酒一樣多。','"I\'ve smoked for decades anyway" — same cigarettes, same beer.','"สูบมาหลายสิบปีแล้ว" — บุหรี่กับเบียร์เท่าเดิม']], v:['🚬','1','3']},
   (()=>{ const left=mythsAlive(); return {k:'myths', ok:!left.length, g:['🧠',UI.mythRowG,UI.mythRowGd],
     b:['👿',T('mythRowB').replace('{n}',left.length), MYTH_SEVERITY.filter(p=>left.includes(p)).map(p=>L(MYTH_FX[p].n)+' → '+L(MYTH_FX[p].fx)).join('\n')], wide:true}; })(),
  ];
}
function epiTier(out){ const good=out.filter(o=>o.ok).length, hosp=!out[0].ok||!out[1].ok;
  return (!out[0].ok&&!out[1].ok)?'bad':good===out.length?'best':(good>=out.length-2&&!hosp)?'good':good>=3?'mixed':'bad'; }
function epiPanel(out,tier){ return new Promise(res=>{
  let box=$('#epiBox'); if(!box){ box=document.createElement('div'); box.id='epiBox'; $('#stage').appendChild(box); }
  const vit=out.filter(o=>o.v).map(o=>`<span>${o.v[0]} ${o.ok?o.v[1]:o.v[2]}</span>`).join('');
  box.innerHTML=`<h3><span>${T('epiT')}</span><span class="etier">${T('end_'+tier)}</span></h3><div class="vit">${vit}</div>
    <div class="erows">${out.map((o,i)=>{ const x=o.ok?o.g:o.b; return `<div class="er${o.ok?'':' bad'}${o.wide?' wide':''}" style="animation:enterC .4s ${i*.12}s backwards"><span class="ei">${x[0]}</span><div><b>${esc(L(x[1]))}</b><small>${esc(L(x[2]))}</small></div></div>`; }).join('')}</div>
    ${S.timeout?`<p class="muted" style="margin:0 0 6px">⏰ ${T('timeoutStat')}</p>`:''}<div class="act"><button class="gbtn" id="epiOk">${T('cqNext')}</button></div>`;
  box.classList.remove('hidden'); sfx[tier==='bad'?'heartLose':tier==='mixed'?'paper':'fanfare']();
  const ok=()=>{ box.classList.add('hidden'); D.getOk=null; sfx.click(); res(); }; $('#epiOk').onclick=ok; D.getOk=ok;
}); }
async function epilogue(){
  S.chStart=realSec(); hideAll(); hideText(); $('#boss').classList.add('hidden');
  await wipe(()=>{ setBg('ext'); hideAll(); bgFx('motes'); $('#bgCam').style.filter=''; }); playTheme('calm');
  await chapterCard(6);
  const out=epiOutcomes(), tier=epiTier(out);
  S.ending={tier, items:out.map(o=>({k:o.k, ok:o.ok}))}; logEvent({type:'ending', tier, items:S.ending.items}); saveSession(true);
  show('me','L','neutral'); show('yeh','R','neutral');
  await say('yeh','neutral',['兩週後，我們打了電話，也再去了陳伯家一趟。','Two weeks later, we phoned and dropped by Uncle Chen\'s place again.','สองสัปดาห์ต่อมา เราโทรหาและแวะไปบ้านลุงเฉินอีกครั้ง']);
  if(S.timeout) await say('yeh','sad',['那天拜訪提早結束，很多問題都沒來得及處理……','That visit ended early, and many problems were never dealt with…','วันนั้นการเยี่ยมจบก่อนเวลา หลายปัญหาจึงไม่ได้รับการแก้ไข…']);
  hideText(); await epiPanel(out,tier);
  const hosp=!out[0].ok||!out[1].ok;
  if(hosp){ show('wife','C','sad');
    await say('wife','sad',!out[0].ok?['他住院了……醫生說是腎臟突然變差，跟止痛藥和血壓藥一起吃有關。','He\'s in hospital… the doctor said his kidneys suddenly got worse — it\'s linked to taking the painkiller with his blood-pressure pill.','เขานอนโรงพยาบาล… หมอบอกว่าไตแย่ลงกะทันหัน เกี่ยวกับการกินยาแก้ปวดร่วมกับยาความดัน']
      :['上禮拜他在店裡突然昏倒，醫生說是低血糖……','Last week he suddenly collapsed in the shop — the doctor said it was low blood sugar…','สัปดาห์ก่อนเขาล้มหมดสติในร้าน หมอบอกว่าน้ำตาลต่ำ…']);
    hide('wife'); }
  else { show('chen','C',tier==='best'?'happy':'neutral');
    await say('chen',tier==='best'?'happy':'neutral',tier==='best'||tier==='good'?['藥師來啦！我現在每天照著吃，人比較有精神，胃口也回來一點了！','The pharmacists are here! I take everything properly now — more energy, and my appetite is coming back!','เภสัชกรมาแล้ว! ตอนนี้ลุงกินยาตามที่บอกทุกวัน มีแรงขึ้น เริ่มอยากกินข้าวแล้ว!']
      :['還好啦……有些有改，有些我還是搞不太清楚。','So-so… some things changed, some I still don\'t really get.','ก็พอได้… บางอย่างก็เปลี่ยน บางอย่างลุงก็ยังงงอยู่']);
    const left=mythsAlive(), p0=MYTH_SEVERITY.find(p=>left.includes(p)); if(p0) await say('chen','think',T('chenStill2').replace('{q}',L(mythOf(p0).m))); }
  const msg={best:['每一個建議都落實了。這就是藥師在社區裡能帶來的改變。','Every piece of advice was put into practice. That\'s the difference a community pharmacist can make.','ทุกคำแนะนำถูกนำไปใช้จริง นี่แหละความเปลี่ยนแปลงที่เภสัชกรชุมชนทำได้'],
    good:['大部分問題都改善了。剩下的，就靠下一次追蹤。','Most problems improved. The rest is for the next follow-up.','ปัญหาส่วนใหญ่ดีขึ้นแล้ว ที่เหลือค่อยตามต่อในการติดตามครั้งหน้า'],
    mixed:['有改善，也有漏掉的。回頭看看：哪些地方如果早一點注意到，結果會不一樣？','Some things improved, some slipped through. Look back: what, noticed earlier, would have changed the outcome?','มีทั้งที่ดีขึ้นและที่หลุดไป ลองย้อนดูว่า ถ้าสังเกตเห็นเร็วกว่านี้ อะไรจะเปลี่ยนผลลัพธ์ได้?'],
    bad:['我們漏掉的問題，最後變成了病人的傷害。這就是為什麼每一個細節都重要。','The problems we missed turned into real harm for the patient. That\'s why every detail matters.','ปัญหาที่เราพลาดไป กลายเป็นอันตรายจริงต่อผู้ป่วย นี่คือเหตุผลที่ทุกรายละเอียดสำคัญ']}[tier];
  show('yeh','R',tier==='bad'?'sad':tier==='mixed'?'think':'happy'); await say('yeh',tier==='bad'?'sad':tier==='mixed'?'think':'happy',msg);
  if(tier==='best'){ hideAll(); show('chen','C','happy'); bgFx('rays');
    await say('sys','neutral',['——三個月後——','— Three months later —','— สามเดือนต่อมา —']);
    await say('chen','happy',['藥師！醫生說我的 HbA1c 從 8.3 降到 7.4 了！菸也只剩一天半包！','Pharmacist! The doctor says my HbA1c went from 8.3 down to 7.4! And I\'m down to half a pack a day!','เภสัชกร! หมอบอกว่า HbA1c ของลุงลดจาก 8.3 เหลือ 7.4 แล้ว! บุหรี่ก็เหลือวันละครึ่งซอง!']); }
  hideText(); chapterDone(6);
}
/* ---------------- Badges (kept on this device) ---------------- */
const BADGES=[
 {id:'door', ic:'🚪', n:['好的開始','First impression','เปิดตัวสวย'], d:['進門第一步就選對','Right first move at the door','เลือกก้าวแรกในบ้านถูกตั้งแต่ครั้งแรก'], ok:()=>!!(S.first&&S.first.ok)},
 {id:'curious', ic:'🗝️', n:['好奇寶寶','Curious mind','ช่างสงสัย'], d:['找到 3 個隱藏提問','Found all 3 hidden questions','เจอคำถามลับครบ 3 ข้อ'], ok:()=>S.hiddenQ.length>=3},
 {id:'deep', ic:'↪️', n:['追根究柢','Dig deeper','ถามเจาะลึก'], d:['問了 4 個以上的追問','Asked 4+ follow-up questions','ถามต่อ 4 ข้อขึ้นไป'], ok:()=>FOLLOW1.filter(f=>S.asked[f.id]).length>=4},
 {id:'eagle', ic:'🦅', n:['鷹眼','Eagle eye','ตาเหยี่ยว'], d:['搜查時找到全部 11 件證物','Found all 11 items in the search','ค้นเจอหลักฐานครบ 11 ชิ้น'], ok:()=>S.log.filter(e=>e.type==='item').length>=Object.keys(ITEMS).length},
 {id:'objection', ic:'⚖️', n:['異議成立','Objection sustained','คัดค้านสำเร็จ'], d:['矛盾對決一次都沒出錯','Never presented wrong evidence','ดวลจับโกหกไม่พลาดเลยสักครั้ง'], ok:()=>!!S.found.P8&&!S.log.some(e=>e.type==='present'&&!e.ok)},
 {id:'heart', ic:'💗', n:['打開心門','Heart opener','เปิดใจสำเร็จ'], d:['信任度 7 以上時讓陳伯說出秘密','Uncovered his secret with trust 7+','ทำให้ลุงเล่าความลับขณะความไว้ใจ 7+'], ok:()=>!!S.found.P8&&(S.fl.trustAtLock||0)>=7},
 {id:'calc', ic:'🧮', n:['人體計算機','Human calculator','เครื่องคิดเลขมนุษย์'], d:['三題計算都一次就算對','All 3 calculations right first time','คำนวณถูกทั้ง 3 ข้อตั้งแต่ครั้งแรก'], ok:()=>['bmi','egfr','crcl'].every(k=>S.calc[k]&&S.calc[k].ok&&S.calc[k].tries===1)},
 {id:'medrec', ic:'💊', n:['藥物整合大師','Med-rec master','เซียนทบทวนยา'], d:['6 個藥物任務全部完全正確','All 6 med-review missions perfect','ภารกิจทบทวนยาถูกครบทั้ง 6'], ok:()=>S.mr.perfect===MISSIONS.length},
 {id:'myth', ic:'👿', n:['迷思終結者','Myth buster','ผู้ทลายความเชื่อผิด'], d:['每張衛教卡都選到最佳','Best card for every myth','เลือกการ์ดดีที่สุดทุกใบ'], ok:()=>S.boss.answers.length>=MYTHS.length&&S.boss.answers.every(a=>a.q===2)},
 {id:'teach', ic:'🔁', n:['衛教達人','Counselling pro','นักให้คำแนะนำ'], d:['最後總結 5 個步驟全部涵蓋','Final summary covered all 5 steps','สรุปท้ายเกมครบทั้ง 5 ขั้น'], ok:()=>S.finalCov.length>0&&S.finalCov.every(Boolean)},
 {id:'time', ic:'⏱️', n:['時間管理大師','Time master','บริหารเวลาเก่ง'], d:['剩 20 分鐘以上完成拜訪','Finished with 20+ minutes to spare','จบการเยี่ยมโดยเหลือเวลา 20 นาทีขึ้นไป'], ok:()=>!S.timeout&&S.visit>=20},
 {id:'happy', ic:'🌟', n:['最佳結局','Happy ending','ตอนจบแสนสุข'], d:['看到最佳結局','Reached the best ending','ได้ตอนจบที่ดีที่สุด'], ok:()=>!!(S.ending&&S.ending.tier==='best')},
];
const BADGE_KEY='phd_badges';
function badgeStore(){ try{ return JSON.parse(localStorage.getItem(BADGE_KEY)||'{}')||{}; }catch(e){ return {}; } }
function awardBadges(){ const st=badgeStore(), earned=BADGES.filter(b=>{ try{ return b.ok(); }catch(e){ return false; } }).map(b=>b.id), fresh=earned.filter(id=>!st[id]);
  fresh.forEach(id=>st[id]=new Date().toISOString()); try{ localStorage.setItem(BADGE_KEY,JSON.stringify(st)); }catch(e){}
  S.badges=earned; if(earned.length) logEvent({type:'badges', earned, fresh}); return {earned, fresh}; }
const badgeChip=(b,isNew)=>`<span class="bdg${isNew?' new':''}" title="${esc(L(b.d))}"><i>${b.ic}</i>${esc(L(b.n))}${isNew?' ✨':''}</span>`;
function badgeGridHTML(){ const st=badgeStore(), n=BADGES.filter(b=>st[b.id]).length;
  return `<p class="muted">${T('badgeCount').replace('{n}',n).replace('{m}',BADGES.length)}</p><div class="bgrid">${BADGES.map(b=>`<div class="bcard${st[b.id]?'':' off'}"><span class="bi">${b.ic}</span><div><b>${esc(L(b.n))}</b><small>${esc(L(b.d))}</small>${st[b.id]?'':`<small>🔒 ${T('badgeLocked')}</small>`}</div></div>`).join('')}</div>`; }
function showBadges(){ sfx.paper(); showModal(`<h3>${T('badgeColl')}</h3>${badgeGridHTML()}`,[{t:T('close')}],null,'wide'); }
/* ---------------- Results ---------------- */
function rankGate(){
  const found=foundCount(), tb=!!S.finalCov[1], fu=!!S.finalCov[2];
  const list=[['g_found',found===PROBLEMS.length],['g_hints',S.hints===0],['g_tb',tb],['g_trust',S.trust>=7],['g_mr',S.mr.perfect>=5],['g_boss',!mythsAlive().length],['g_time',!S.timeout&&S.visit>=0]];
  const gate=list.every(x=>x[1])?'S':(found>=17&&S.mr.perfect>=4&&(tb||fu)&&!S.timeout)?'A':found>=14?'B':found>=10?'C':'D';
  return {gate, list};
}
function computeScore(){
  const B=S.boss, bonus=Object.keys(ITEMS).filter(k=>!ITEMS[k].req&&hasEv(k)).length, cov=S.finalCov.filter(Boolean).length;
  let sc=1000+Math.max(0,S.visit)*15+Math.min(0,S.visit)*20+S.hearts*80+S.trust*40+B.crit*120+B.ok*40-B.miss*60+B.maxCombo*20+bonus*60-S.hints*80-S.resets*200+cov*60-S.wrong*20
    -mythsAlive().length*150+(B.byFinal||[]).length*60
    +S.mr.perfect*150+S.mr.partial*60-S.mr.wrong*40+(S.mr.egfr?100:0)
    +(S.custom?S.custom.score:0)+(S.first&&S.first.ok?100:0)+(S.calc.bmi&&S.calc.bmi.ok?60:0)+(S.calc.bmiClass?30:0)+(S.calc.crcl&&S.calc.crcl.ok?80:0)+(S.calc.crclObese?40:0)
    +FOLLOW1.filter(f=>S.asked[f.id]).length*25+S.hiddenQ.length*40+(S.fl.adh?60:0)-(S.refused?150:0)-(S.timeout?300:0);
  const rt=realSec(); if(rt<25*60) sc+=200; else if(rt<35*60) sc+=100;
  const RK='SABCD', scoreRank=sc>=4600?'S':sc>=3800?'A':sc>=3000?'B':sc>=2200?'C':'D', g=rankGate();
  S.score=Math.round(sc); S.rank=RK[Math.max(RK.indexOf(scoreRank),RK.indexOf(g.gate))]; S.gate={score:scoreRank, cap:g.gate, list:g.list.map(([k,v])=>({k,ok:v}))};
  return {bonus,cov,scoreRank,g};
}
async function results(){
  const {bonus,cov,scoreRank,g}=computeScore(); S.done=true; const bd=awardBadges();
  logEvent({type:'end', score:S.score, rank:S.rank, scoreRank, cap:g.gate, mode:S.mode}); saveSession(true);
  try{ localStorage.setItem('phd_cleared','1'); }catch(e){}
  await wipe(()=>{ hideAll(); hideText(); setBg('ext'); bgFx('rays'); });
  $('#bgCam').style.filter='hue-rotate(-25deg) saturate(1.2) brightness(1.02)'; playTheme('win'); $('#hud').classList.add('hidden');
  const B=S.boss, acc=B.answers.length?Math.round(B.crit/B.answers.length*100):0;
  const cmt={S:['完美的居家訪視！陳伯一定會很感謝你。','A perfect home visit! Uncle Chen will be so grateful.','การเยี่ยมบ้านที่สมบูรณ์แบบ! ลุงเฉินต้องขอบคุณมากแน่ๆ'],A:['非常好！再精進一點就是頂尖藥師。','Excellent! A little more polish and you\'re top-tier.','ยอดเยี่ยม! อีกนิดเดียวก็เป็นเภสัชกรระดับท็อป'],B:['表現穩定，多練習建立信任與衛教。','Solid work — keep practicing rapport and counseling.','ทำได้ดี ฝึกสร้างความไว้ใจและให้คำแนะนำต่อไปนะ'],C:['有找到問題，但效率和衛教還能更好。','You found the problems, but efficiency and counseling can improve.','หาปัญหาเจอ แต่ประสิทธิภาพและการแนะนำยังพัฒนาได้'],D:['別灰心！回顧案件檔案，再挑戰一次吧。','Don\'t give up! Review the case file and try again.','อย่าท้อนะ! ทบทวนแฟ้มคดีแล้วลองใหม่']}[S.rank];
  const ppN=Object.keys(S.pp.post).length, ppPre=Object.values(S.pp.pre).filter(x=>x.ok).length, ppPost=Object.values(S.pp.post).filter(x=>x.ok).length;
  const fuN=FOLLOW1.filter(f=>S.asked[f.id]).length, nFound=foundCount();
  const gateHTML=S.rank==='S'?'':`<div class="rgate"><b>🎯 ${T('rankWhy')}</b> <span class="muted">${T('rankCap').replace('{a}',scoreRank).replace('{b}',g.gate)}</span><ul>${g.list.map(([k,v])=>`<li class="${v?'ok':'no'}">${v?'✅':'⬜'} ${T(k)}</li>`).join('')}</ul></div>`;
  const newSet=new Set(bd.fresh);
  $('#results').innerHTML=`<div class="rpanel"><div class="row" style="justify-content:space-between;align-items:flex-start;flex-wrap:nowrap"><div><div class="hint" style="font-size:20px;font-weight:900">${T('rank')}</div><div class="rank">${S.rank}</div></div>
    <div style="flex:1;padding:18px 18px 0"><p style="font-size:21px;font-weight:900;color:#c2306a;margin:0 0 8px">「${esc(L(cmt))}」</p><div class="row" style="gap:8px">${S.ending?`<span class="pill" style="font-size:16px">${T('endStat')}: ${T('end_'+S.ending.tier)}</span>`:''}<span class="pill" style="font-size:16px">${T('mode_'+S.mode)}</span>${S.timeout?`<span class="pill no" style="font-size:16px">⏰ ${T('timeoutStat')}</span>`:''}${S.refused?`<span class="pill no" style="font-size:16px">🔒 ${T('refusedStat')}</span>`:''}</div></div>
    <div style="display:flex;gap:0"><div style="width:120px;height:168px">${charSVG('me',S.rank==='S'||S.rank==='A'?'happy':'smug')}</div><div style="width:136px;height:190px;margin-top:-16px">${charSVG('yeh',S.rank==='S'||S.rank==='A'?'happy':'smug')}</div></div></div>
    <div class="rtabs">${[['sum','📊 '+T('score')],['prob','🔎 '+T('tProblems')+` ${nFound}/${PROBLEMS.length}`],['bdg','🏅 '+T('badgeT')+` ${bd.earned.length}${bd.fresh.length?' ✨':''}`]].map(([k,t],i)=>`<button class="rtab${i?'':' on'}" data-rt="${k}">${t}</button>`).join('')}</div>
    <div class="rpane" data-rp="sum"><div class="rstats"><div><span>${T('score')}</span> ${S.score}</div><div><span>${T('realTime')}</span> ${fmt(realSec())}</div><div><span>${T('visitLeft')}</span> ${S.visit} ${T('min')}</div><div><span>${T('trustEnd')}</span> ${S.trust}/10</div>
    <div><span>${T('heartsLeft')}</span> ${S.hearts}</div><div><span>${T('bossAcc')}</span> ${acc}%</div><div><span>${T('mythLeftStat')}</span> 👿 ${mythsAlive().length}</div><div><span>${T('maxCombo')}</span> ${B.maxCombo}</div><div><span>${T('bonusEv')}</span> ${bonus}/4</div><div><span>${T('hintsUsed')}</span> ${S.hints}</div><div><span>${T('mrStat')}</span> ${S.mr.perfect}/6${S.mr.egfr?' · eGFR ✓':''}</div>
    <div><span>${T('firstMoveT')}</span> ${S.first?(S.first.ok?'✅':'🔁 ×'+S.first.tries):'—'}</div><div><span>${T('calcStat')}</span> ${['bmi','egfr','crcl'].map(k=>S.calc[k]?(S.calc[k].ok?'✅':'📘'):'—').join(' ')}</div>
    <div><span>${T('patStat')}</span> ☕${S.pat} · ↪${fuN}/${FOLLOW1.length} · 🗝️${S.hiddenQ.length}/3</div>${S.custom.max?`<div><span>${T('cqStat')}</span> ${S.custom.score}/${S.custom.max}</div>`:''}${ppN?`<div><span>${T('ppStat')}</span> ${ppPre}/${ppN} → <b style="color:#0a7a0a">${ppPost}/${ppN}</b></div>`:''}
    <div style="grid-column:1/4"><span>${T('chapterTimes')}</span> ${[1,2,3,4,5].map(c=>fmt(S.chT[c]||0)).join(' · ')}</div></div>${gateHTML}</div>
    <div class="rpane hidden" data-rp="prob"><div class="plist">${PROBLEMS.map(p=>`<div>${S.found[p.id]?'✅':'⬜'} ${p.icon} <b>${esc(L(p.t))}</b><div class="muted" style="font-size:13px;line-height:1.35">${esc(L(p.d))}</div></div>`).join('')}</div></div>
    <div class="rpane hidden" data-rp="bdg">${S.ending?`<div class="rbadges">${(S.ending.items||[]).map(it=>{ const o=epiOutcomes().find(x=>x.k===it.k); const x=o?(it.ok?o.g:o.b):null; return x?`<span class="pill ${it.ok?'ok':'no'}" style="font-size:15px">${x[0]} ${esc(L(x[1]))}</span>`:''; }).join('')}</div>`:''}
      <div class="rbadges">${bd.earned.length?BADGES.filter(b=>bd.earned.includes(b.id)).map(b=>badgeChip(b,newSet.has(b.id))).join(''):`<span class="muted">—</span>`}</div><div style="margin-top:10px">${badgeGridHTML()}</div></div>
    <div class="row" style="margin-top:14px;justify-content:center"><button class="gbtn blue" id="rRep">${T('report')}</button><button class="gbtn green" id="rCase">📁 ${T('caseFile')}</button><button class="gbtn" id="rAgain">${T('again')}</button></div><div class="syncSt hidden"></div></div>`;
  $('#results').classList.remove('hidden'); sfx.fanfare();
  $$('#results [data-rt]').forEach(b=>b.onclick=()=>{ sfx.click(); $$('#results [data-rt]').forEach(x=>x.classList.toggle('on',x===b)); $$('#results [data-rp]').forEach(p=>p.classList.toggle('hidden',p.dataset.rp!==b.dataset.rt)); });
  if(bd.fresh.length) setTimeout(()=>toast('🏅 '+T('badgeNew')+' '+BADGES.filter(b=>newSet.has(b.id)).map(b=>b.ic).join(' ')),900);
  syncBadge(); $('#rRep').onclick=downloadReport; $('#rCase').onclick=()=>openPage('case'); $('#rAgain').onclick=()=>{ saveSession(true); location.reload(); };
}
