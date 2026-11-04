/* =====================================================================
   STORY — Prologue · Chapter 1 (interview) · Chapter 2 (search)
   ===================================================================== */
const nm=()=>S.student.name||T('you');
async function prologue(){
  S.chapter=0; S.chStart=realSec(); setBg('ext'); hideAll(); playTheme('calm'); hud();
  await chapterCard(0);
  await introCard('pilly');
  await say('pilly','happy',['嗨嗨～我是藥丸精靈 Pilly！✨ 今天是你第一次居家訪視對吧？','Hi hi~ I\'m Pilly the Pill! ✨ It\'s your very first home visit today, right?','ไฮไฮ~ พิลลี่ภูตเม็ดยามาแล้ว! ✨ วันนี้เป็นการเยี่ยมบ้านครั้งแรกของคุณใช่ไหม?']);
  await introCard('me'); show('me','L','happy');
  await say('me','happy',['嗯！我準備好了！……應該吧。','Yes! I\'m ready! …I think.','ใช่! พร้อมแล้ว! …มั้งนะ']);
  await introCard('yeh'); show('yeh','R','smug');
  await say('yeh','smug',[`${nm()}，今天的個案是陳伯，65 歲。`,`${nm()}, today's patient is Uncle Chen, 65.`,`${nm()} เคสวันนี้คือลุงเฉิน อายุ 65`]);
  await say('yeh','neutral',['上個月他在不同醫院和診所看了「四十幾次」病，藥多到滿出來——身體卻越來越差。','Last month he visited different hospitals and clinics "over forty times". Piles of medicine — yet he keeps getting worse.','เดือนที่แล้วเขาไปโรงพยาบาลและคลินิก "สี่สิบกว่าครั้ง" ยาล้นมือ แต่อาการกลับแย่ลง']);
  await say('me','shock',['四、四十幾次？！一個月？！','F-forty times?! In one month?!','สี่…สี่สิบกว่าครั้ง?! ในเดือนเดียว?!']);
  await say('yeh','smug',['所以我們要找出他「全部」的健康與用藥問題。一個都不能漏。','So we must uncover ALL of his health and medication problems. Don\'t miss a single one.','เราต้องหาปัญหาสุขภาพและการใช้ยา "ทั้งหมด" ของเขา ห้ามพลาดแม้แต่ข้อเดียว']);
  await say('yeh','neutral',['記住三件事：建立信任、仔細觀察、用證據說話。','Remember three things: build trust, observe carefully, and let the evidence speak.','จำไว้ 3 ข้อ: สร้างความไว้ใจ สังเกตให้ละเอียด และพูดด้วยหลักฐาน']);
  await say('pilly','neutral',['拜訪時間只有 60 分鐘喔！每問一題、每搜一個地方都會用掉時間⏰','You only have 60 minutes of visit time! Every question and every search spends time ⏰','มีเวลาเยี่ยมแค่ 60 นาทีนะ! ทุกคำถามและทุกการค้นจะใช้เวลา ⏰']);
  hide('yeh'); emo('me','neutral');
  await say('sys','neutral',['——叮咚。雜貨店的鐵捲門半開著，裡面傳來電視和電風扇的聲音。','— Ding-dong. The grocery shutter is half open; you hear a TV and an electric fan inside.','— ติ๊งต่อง ประตูม้วนของร้านเปิดครึ่งหนึ่ง ได้ยินเสียงทีวีกับพัดลมดังมาจากข้างใน']);
  await say('sys','neutral',['「來了來了～」裡面傳來陳太太的聲音，鐵捲門嘩啦啦地拉了上去。','"Coming~!" calls Mrs. Chen, and the shutter rattles up.','"มาแล้วจ้า~" เสียงป้าเฉินดังมาจากข้างใน ประตูม้วนถูกดึงขึ้นดังครืดคราด']);
  chapterDone(0);
}
/* ---------------- Chapter 1: interview ---------------- */
const TOPICS1=[
 {id:'basic', ico:'🪪', l:['基本資料','Basic info','ข้อมูลพื้นฐาน'], q:['可以跟我說說您的年紀、身高體重和工作嗎？','Could you tell me your age, height, weight and job?','ขอทราบอายุ ส่วนสูง น้ำหนัก และอาชีพหน่อยได้ไหม?']},
 {id:'history', ico:'📖', l:['過去病史','Medical history','ประวัติการเจ็บป่วย'], q:['您以前生過什麼病，或住過院嗎？','Have you had any illnesses or hospital stays?','เคยป่วยเป็นอะไร หรือเคยนอนโรงพยาบาลไหม?']},
 {id:'body', ico:'🤒', l:['最近身體','How you feel','ช่วงนี้รู้สึกยังไง'], q:['您最近身體有哪裡不舒服嗎？','Is anything bothering you physically lately?','ช่วงนี้ไม่สบายตรงไหนไหม?']},
 {id:'checkup', ico:'🧪', l:['健康檢查','Health check-up','ตรวจสุขภาพ'], q:['您最近有做過健康檢查嗎？結果怎麼樣？','Any recent health check? What were the results?','ช่วงนี้ไปตรวจสุขภาพมาไหม? ผลเป็นยังไง?']},
 {id:'family', ico:'👨‍👩‍👦', l:['家庭狀況','Family','ครอบครัว'], q:['可以聊聊您的家人嗎？','Could we talk about your family?','ขอคุยเรื่องครอบครัวหน่อยได้ไหม?']},
 {id:'meds', ico:'💊', l:['目前用藥','Current medicines','ยาที่ใช้อยู่'], q:['您現在都吃哪些藥呢？','What medicines are you taking now?','ตอนนี้กินยาอะไรอยู่บ้าง?']},
 {id:'life', ico:'🧭', l:['生活習慣','Lifestyle','พฤติกรรม'], q:['您平常的飲食、抽菸、喝酒習慣怎麼樣？','How about your eating, smoking and drinking habits?','ปกติเรื่องกิน สูบบุหรี่ ดื่มเหล้า เป็นยังไงบ้าง?']},
 {id:'rhin', ico:'🤧', l:['鼻子過敏','Allergic nose','ภูมิแพ้จมูก'], q:['您的鼻子過敏是怎麼治療的？','How is your nasal allergy treated?','ภูมิแพ้จมูกรักษายังไงอยู่?']},
 {id:'hope', ico:'🙏', l:['希望我們幫什麼','What you hope for','อยากให้ช่วยอะไร'], q:['您希望我們今天幫您什麼忙？','What would you like us to help with today?','วันนี้อยากให้เราช่วยอะไร?']},
];
/* follow-up cards: appear only after their parent card has been asked */
const FOLLOW1=[
 {id:'meds2', parent:'meds', ico:'⏸️', l:['有沒有漏吃或自己停藥？','Ever skip or stop doses?','เคยขาดยาหรือหยุดยาเองไหม?'], q:['藥這麼多，有時候會不會忘記吃，或自己先停一停？','With so many medicines, do you sometimes forget them or stop some yourself?','ยาเยอะขนาดนี้ มีบางทีลืมกินหรือหยุดเองบ้างไหม?']},
 {id:'checkup2', parent:'checkup', ico:'🫘', l:['報告有提到腎臟嗎？','Anything about the kidneys?','ผลตรวจพูดถึงไตไหม?'], q:['健檢報告上，醫生有沒有提到腎臟，或「肌酸酐」這個數字？','On the check-up report, did the doctor mention your kidneys or a number called "creatinine"?','ในผลตรวจสุขภาพ หมอพูดถึงไต หรือค่า "ครีเอตินิน" บ้างไหม?']},
 {id:'life2', parent:'life', ico:'🌱', l:['想不想減少菸酒？','Want to cut down?','อยากลดบุหรี่เหล้าไหม?'], q:['如果我們陪您一起，您會想試著少抽一點、少喝一點嗎？','If we support you, would you want to try smoking and drinking a bit less?','ถ้าเราช่วยอยู่ข้างๆ ลุงอยากลองลดบุหรี่กับเหล้าลงบ้างไหม?']},
 {id:'family2', parent:'family', ico:'🤝', l:['誰幫忙管藥？','Who helps with his medicines?','ใครช่วยดูแลเรื่องยา?'], q:['在家裡，有人幫陳伯整理藥、提醒他吃藥嗎？','At home, does anyone help sort his medicines or remind him to take them?','ที่บ้าน มีใครช่วยจัดยาหรือเตือนลุงกินยาไหม?']},
 {id:'rhin2', parent:'rhin', ico:'🫙', l:['「秘方」是什麼？','What "secret recipe"?','"สูตรลับ" คืออะไร?'], q:['您說的「秘方」吃法，是怎麼吃的呢？','That "secret recipe" way of taking them — how does it work?','"สูตรลับ" ที่ลุงว่า กินยังไงเหรอ?']},
 {id:'body2', parent:'body', ico:'🦶', l:['關節痛詳細一點','More about the joint pain','เล่าเรื่องปวดข้อเพิ่ม'], q:['膝蓋、手指是怎麼樣的痛？有沒有紅腫，或半夜痛醒過？','What is the knee and finger pain like? Any redness, swelling, or waking up at night?','ปวดเข่ากับนิ้วแบบไหน? มีบวมแดงหรือปวดจนตื่นกลางดึกไหม?']},
];
const HIDDEN1=['allergy','storage','otc'];               // only reachable by typing your own question
const topicById=id=>TOPICS1.find(x=>x.id===id)||FOLLOW1.find(x=>x.id===id);
const boardTopics=()=>TOPICS1.concat(FOLLOW1.filter(f=>S.asked[f.parent]));
const CH1_NEED=['P5','P7','P10','P11','P12'];
function addSpot(id){ if(!S.hintSpots.includes(id)){ S.hintSpots.push(id); logEvent({type:'spot', id}); } }
/* patience: information questions cost patience; kindness restores a little */
function patSpend(n){ if(!n) return; S.pat=Math.max(0,S.pat-n); S.fl.patSpent=(S.fl.patSpent||0)+n; floaty('☕ −'+n, 1300, 120, '#b5651d'); }
function patGain(n){ const b=S.pat; S.pat=Math.min(CONFIG.PAT_MAX,S.pat+n); if(S.pat>b) floaty('☕ +'+(S.pat-b), 1300, 120, '#13a37c'); }
const PAT_COST={tease:1, blame:2, fallback:0, greet:0, empathy:0, privacy:0, visits:1};
const ANSWERS={
 async basic(){ await say('chen','happy',['我 1955 年 11 月 7 號生的，今年 65 歲啦！','Born November 7, 1955 — 65 this year!','ลุงเกิด 7 พฤศจิกายน 1955 ปีนี้ 65 แล้ว!']);
   await say('chen','embarrassed',['身高 173，體重……90 公斤啦，哈哈，肚子大一點。以前做生意的，高中畢業。','173 cm and… 90 kilos, haha, a bit of a belly. I was a businessman; high-school education.','สูง 173 หนัก… 90 กิโล ฮ่าๆ พุงใหญ่หน่อย เมื่อก่อนทำธุรกิจ จบ ม.ปลาย']);
   await bmiTask(); },
 async history(){ await say('chen','neutral',['2018 年 8 月我出車禍，在區域醫院住了十天左右。','In August 2018 I had a traffic accident and stayed in a regional hospital about ten days.','สิงหาคม 2018 ลุงประสบอุบัติเหตุรถ นอนโรงพยาบาลราวสิบวัน']);
   await say('chen','sad',['醫生說我可能有高血壓、血糖也高，我就在同一家醫院的新陳代謝科開始吃藥了。','The doctor said I might have high blood pressure and high sugar, so I started medicine at that hospital\'s endocrinology clinic.','หมอบอกว่าอาจมีความดันสูง น้ำตาลก็สูง ลุงเลยเริ่มกินยาที่แผนกต่อมไร้ท่อของ รพ.เดิม']); reveal('P5');
   await say('chen','neutral',['喔還有，我從小就有過敏性鼻炎——哈啾！','Oh, and I\'ve had allergic rhinitis since I was a kid — achoo!','อ้อ แล้วลุงเป็นภูมิแพ้จมูกตั้งแต่เด็ก — ฮัดชิ่ว!'],{sfx:'sneeze'}); },
 async body(){ await say('chen','sad',['最近喔……常常覺得好累，吃東西也沒胃口。這個你們一定要幫我！','Lately… I\'m always tired and have no appetite. You\'ve got to help me with this!','ช่วงนี้นะ… เหนื่อยบ่อยมาก กินข้าวไม่ลง เรื่องนี้ต้องช่วยลุงนะ!']); reveal('P10');
   await say('chen','neutral',['膝蓋跟手指也會痠痛啦，不過不嚴重。','My knees and fingers ache too, but it\'s not serious.','เข่ากับนิ้วก็ปวดเมื่อยนะ แต่ไม่หนักหรอก']); },
 async checkup(){ await say('chen','neutral',['今年初我跟太太去 B 教學醫院做健康檢查。','Early this year my wife and I had check-ups at Teaching Hospital B.','ต้นปีนี้ลุงกับภรรยาไปตรวจสุขภาพที่ รพ.มหาวิทยาลัย B']);
   await say('chen','sad',['報告說尿酸太高，風濕科醫生又開了降尿酸的藥給我，現在還在吃。','The report said my uric acid was too high, so a rheumatologist gave me yet another medicine. Still taking it.','ผลบอกว่ากรดยูริกสูง หมอรูมาโตฯ เลยจ่ายยาลดกรดยูริกเพิ่มอีก ตอนนี้ยังกินอยู่']); reveal('P7');
   await say('pilly','think',['又多一家醫院、又多一種藥……檢查報告說不定收在店裡？','Another hospital, another drug… maybe the lab report is somewhere in the shop?','อีกโรงพยาบาล อีกยาหนึ่ง… ผลตรวจอาจเก็บอยู่ในร้าน?']); },
 async family(){ show('wife','R','sad'); await introCard('wife');
   await say('wife','sad',['我來說吧……我們家老二是智能障礙，每個月照顧的開銷很大。','Let me… our second child has an intellectual disability. Caring for him costs a lot every month.','ป้าเล่าเองนะ… ลูกคนที่สองมีภาวะบกพร่องทางสติปัญญา ค่าดูแลแต่ละเดือนสูงมาก']);
   await say('wife','sad',['他爸又一直跑醫院，掛號費、交通費也都是錢啊……','And his dad keeps running to hospitals — registration and transport fees add up…','พ่อเขาก็ไปโรงพยาบาลบ่อย ค่าลงทะเบียน ค่าเดินทางก็เงินทั้งนั้น…']); reveal('P11'); },
 async meds(){ await say('chen','sad',['唉，血壓的好悅您、血糖的庫魯化、醣祿、瑪爾胰，鼻子的、尿酸的……一大堆，每家醫院的藥袋都長得不一樣。','Sigh — Hyzaar for blood pressure, Glucophage, Glucobay and Amaryl for sugar, plus nose and uric-acid pills… every hospital\'s bags look different.','เฮ้อ ยาความดัน Hyzaar ยาเบาหวาน Glucophage, Glucobay, Amaryl ยาจมูก ยากรดยูริก… ซองยาแต่ละที่ไม่เหมือนกันเลย']);
   await say('chen','embarrassed',['不、不過我每天都有按時吃喔！真的！','B-but I take them on time every day! Really!','แต่…แต่ลุงกินตรงเวลาทุกวันนะ! จริงๆ!']);
   await say('pilly','think',['嗯？他的眼神飄了一下……記下來！','Hm? His eyes darted away just now… note that!','หืม? เมื่อกี้ลุงหลบตานะ… จดไว้!']); S.flag_meds=true; },
 async life(){ await say('chen','happy',['我生活很健康啦！三餐都自己煮，菸酒也控制得很好！','My lifestyle is very healthy! We cook every meal at home, and I keep smoking and drinking under control!','ลุงใช้ชีวิตสุขภาพดีมาก! ทำกับข้าวกินเองทุกมื้อ บุหรี่เหล้าก็คุมได้ดี!']);
   if(!CH.wife){ show('wife','R','angry'); await introCard('wife'); } else emo('wife','angry');
   await say('wife','angry',['……（陳太太用力地清了清喉嚨）','…(Mrs. Chen clears her throat loudly)','…(ป้าเฉินกระแอมเสียงดัง)']);
   await say('pilly','smug',['陳太太好像不太同意喔～說不定屋子裡有「證據」？','Mrs. Chen doesn\'t seem to agree~ Maybe there\'s "evidence" in the house?','ดูเหมือนป้าเฉินไม่เห็นด้วยนะ~ บางทีในบ้านอาจมี "หลักฐาน"?']); S.flag_life=true; },
 async rhin(){ await say('chen','sad',['從小鼻子就過敏——哈啾！看過好多醫生，每個開的藥形狀顏色都不一樣。','Allergic since I was little — achoo! Seen so many doctors; every one gives pills of different shapes and colors.','ภูมิแพ้ตั้งแต่เด็ก — ฮัดชิ่ว! ไปหาหมอมาหลายคน ยาแต่ละคนรูปร่างสีไม่เหมือนกันเลย'],{sfx:'sneeze'});
   await say('chen','smug',['不過我有我的「秘方」吃法啦，嘿嘿。','But I\'ve got my own "secret recipe" for taking them, heh heh.','แต่ลุงมี "สูตรลับ" ในการกินนะ เหะๆ']); },
 async hope(){ await say('chen','sad',['我感覺一天到晚都在吃藥，吃那麼多，問題也沒解決……','I feel like I\'m always taking medicine — so much — and nothing gets solved…','ลุงรู้สึกว่ากินยาทั้งวัน กินเยอะขนาดนี้ ปัญหาก็ไม่หาย…']);
   await say('chen','neutral',['我只想知道每種藥是做什麼的、有沒有不好的副作用、生活上要注意什麼。最近又累又沒胃口……拜託了！','I just want to know what each medicine does, any harmful side effects, and what to watch out for. And lately I\'m tired with no appetite… please help!','ลุงแค่อยากรู้ว่ายาแต่ละตัวทำอะไร มีผลข้างเคียงไหม ต้องระวังอะไรบ้าง ช่วงนี้ก็เหนื่อย เบื่ออาหาร… ช่วยด้วยนะ!']); reveal('P10'); },
};
function freeNode(main){ if(!main) return null;
  const R={adherence:S.asked.meds?'meds2':'tease', kidney:S.asked.checkup?'checkup2':'checkup', readiness:S.asked.life?'life2':'life', support:S.asked.family?'family2':'family',
    joints:S.asked.body?'body2':'body', rhinitis_how:S.asked.rhin?'rhin2':'rhin'};
  return R[main]||FREE_MAP[main]||null; }
const FREE_MAP={allergy:'allergy', storage:'storage', otc:'otc', greet:'greet', basic:'basic', history:'history', symptoms:'body', joints:'body', checkup:'checkup', family:'family', meds:'meds', visits:'visits', lifestyle:'life', smoking:'life', drinking:'life', diet:'life', rhinitis:'rhin', rhinitis_how:'rhin', expectation:'hope', adherence:'tease', side_effects:'tease', sexual:'tease', privacy:'privacy'};
ANSWERS.greet=async()=>{ await say('chen','happy',['呵呵，你好你好！年輕人有禮貌，我喜歡！','Ho ho, hello hello! A polite young one — I like that!','โฮะๆ สวัสดีๆ เด็กสมัยนี้มีมารยาท ลุงชอบ!']); if(!S.asked.greetFree){ S.asked.greetFree=1; if(!(S.first&&S.first.ok)) addTrust(1); } };
ANSWERS.visits=async()=>{ await say('chen','smug',['看病喔？我都在固定一家醫院啦，很單純！','Doctors? I only go to one hospital — nice and simple!','หาหมอเหรอ? ลุงไปโรงพยาบาลเดียวประจำ ง่ายๆ!']); await say('pilly','think',['……真的嗎？牆上好像有什麼東西？','…Really? Is there something on the wall?','…จริงเหรอ? บนผนังมีอะไรอยู่นะ?']); };
ANSWERS.tease=async()=>{ await say('chen','shock',['欸？！沒、沒有啦！我每天都有按時吃！','Eh?! N-no way! I take everything on time every day!','เอ๊ะ?! ไม่…ไม่มีหรอก! ลุงกินตรงเวลาทุกวัน!']); await say('yeh','think',['（小聲）他有難言之隱。先累積信任，之後用證據慢慢打開他的心。','(whisper) He\'s hiding something sensitive. Build trust now, then open his heart with evidence later.','(กระซิบ) เขามีเรื่องพูดยาก สะสมความไว้ใจไว้ก่อน แล้วค่อยใช้หลักฐานเปิดใจเขาทีหลัง']); };
ANSWERS.privacy=async()=>{ await say('chen','happy',['真的喔？會幫我保密喔……那我就放心了。','Really? You\'ll keep it confidential… That\'s a relief.','จริงเหรอ? จะเก็บเป็นความลับใช่ไหม… โล่งใจเลย']); if(!S.privacy){ S.privacy=true; addTrust(2); patGain(1); } };
ANSWERS.fallback=async()=>{ await say('chen','think',['啊？你是說……？可以講清楚一點嗎？','Huh? You mean…? Could you say that more clearly?','หา? หมายถึง…? พูดให้ชัดอีกหน่อยได้ไหม?']); };
const coach=(e,t)=>EXAM()?Promise.resolve():yehSays(e,t);   // teaching asides are skipped in exam mode
ANSWERS.meds2=async()=>{
  if(S.trust>=5){ await say('chen','embarrassed',['……老實說，有幾天我會整天都不吃，連血壓、血糖的也一起停。','…Honestly, on some days I skip everything — even the blood-pressure and sugar pills.','…บอกตรงๆ บางวันลุงไม่กินเลยทั้งวัน รวมยาความดันกับเบาหวานด้วย']);
    await say('chen','sad',['為什麼喔？那個……你先不要問啦。','Why? Well… don\'t ask me that yet.','ทำไมน่ะเหรอ? เอ่อ… อย่าเพิ่งถามเลย']);
    if(!EXAM()) await say('pilly','happy',['他承認會「整天停藥」了！之後要打開他的心會容易一點 💗','He admitted skipping whole days! Opening his heart later will be easier 💗','ลุงยอมรับว่า "หยุดยาทั้งวัน" แล้ว! ต่อไปจะเปิดใจลุงได้ง่ายขึ้น 💗']);
    S.fl.adh=1; return true; }
  await say('chen','angry',['沒有啦！我每天都有吃，你不要亂猜！','No! I take them every day — stop guessing!','ไม่มี! ลุงกินทุกวัน อย่ามาเดาส่ง!']);
  await coach('think',['（小聲）信任還不夠，他不想講。多累積一點信任（💗 5 以上）再問一次。','(whisper) Not enough trust yet, so he won\'t say. Build more trust (💗 5 or more) and ask again.','(กระซิบ) ความไว้ใจยังไม่พอ ลุงเลยไม่อยากพูด สะสมความไว้ใจให้ถึง 💗 5 ขึ้นไปแล้วค่อยถามใหม่']); return false; };
ANSWERS.checkup2=async()=>{ await say('chen','think',['有啦，說什麼「肌酸酐」太高、腎臟不太好……可是腎臟又不會痛，應該沒關係吧？','Yeah, something about "creatinine" being high and the kidneys not being great… but kidneys don\'t hurt, so it\'s fine, right?','มีสิ บอกว่า "ครีเอตินิน" สูง ไตไม่ค่อยดี… แต่ไตไม่ได้เจ็บนี่ คงไม่เป็นไรมั้ง?']);
  await coach('think',['腎功能會影響他吃的幾乎「每一種」藥的劑量。好問題——等一下整合藥物時會用到！','Kidney function affects the dose of almost EVERY drug he takes. Great question — we\'ll need it in the medication review!','การทำงานของไตมีผลต่อขนาดยาแทบ "ทุกตัว" ที่ลุงกิน ถามได้ดีมาก — เดี๋ยวตอนทบทวนยาจะได้ใช้!']); S.fl.kidney=1; };
ANSWERS.life2=async()=>{ await say('chen','sad',['……其實我也想啊。兒子還需要我，我想多活幾年。','…Actually, I do want to. My son still needs me — I want to live a few more years.','…จริงๆ ลุงก็อยากนะ ลูกยังต้องการลุง ลุงอยากอยู่ไปอีกหลายปี']);
  await say('chen','neutral',['只是不知道要從哪裡開始……','I just don\'t know where to start…','แค่ไม่รู้จะเริ่มตรงไหน…']);
  await coach('happy',['這就是「想改變的動機」！記住它——最後衛教時，從他自己的理由出發。','That\'s motivation to change! Remember it — in your final counselling, build on his own reasons.','นี่แหละ "แรงจูงใจที่จะเปลี่ยน"! จำไว้ ตอนให้คำแนะนำท้ายเกม ให้เริ่มจากเหตุผลของลุงเอง']); S.fl.ready=1; };
ANSWERS.family2=async()=>{ if(!CH.wife) show('wife','R','sad'); else emo('wife','sad');
  await say('wife','sad',['我要顧店又要照顧兒子，哪有時間管他的藥……他都自己亂放。','I mind the shop and our son — no time to manage his medicines… he puts them wherever.','ป้าต้องเฝ้าร้านแล้วยังต้องดูลูก ไม่มีเวลาดูยาให้เขาหรอก… เขาวางเกะกะเอง']);
  await say('wife','neutral',['兒子的補助申請表我也還沒填完，跟他的聯絡簿一起塞在電視櫃裡……','And I still haven\'t finished our son\'s subsidy form — it\'s stuffed in the TV cabinet with his school notebook…','ใบขอเงินช่วยเหลือของลูกป้าก็ยังกรอกไม่เสร็จ ยัดไว้ในตู้ทีวีกับสมุดของลูก…']);
  hide('wife'); await coach('think',['照顧者的負擔很重。除了藥，我們也可以幫他們連結社福資源。','The caregiver burden is heavy. Beyond medicines, we can link them to social-welfare resources.','ภาระผู้ดูแลหนักมาก นอกจากเรื่องยา เรายังช่วยเชื่อมต่อแหล่งช่วยเหลือทางสังคมได้']); S.fl.support=1; addSpot('tv_door'); };
ANSWERS.rhin2=async()=>{ await say('chen','smug',['嘿嘿，秘方就是……不能說！反正神明會保佑啦。','Heh heh, the secret recipe is… a secret! Anyway, the gods will bless it.','เหะๆ สูตรลับก็คือ… บอกไม่ได้! ยังไงเทพก็คุ้มครอง']);
  await say('sys','neutral',['（陳伯說完，眼睛偷偷瞄了一下神明桌。）','(As he says this, his eyes flick toward the altar table.)','(พูดจบ ลุงแอบเหลือบมองโต๊ะบูชา)']); S.fl.recipe=1; addSpot('altar_d'); };
ANSWERS.body2=async()=>{ await say('chen','neutral',['有一次喝完酒隔天，腳的大拇趾又紅又腫，痛到睡不著。','Once, the day after drinking, my big toe went red and swollen — so painful I couldn\'t sleep.','มีครั้งหนึ่งหลังดื่มเหล้า วันรุ่งขึ้นนิ้วโป้งเท้าบวมแดง ปวดจนนอนไม่หลับ']);
  await say('chen','embarrassed',['醫生開的止痛藥喔？我覺得不嚴重，就……（瞄了垃圾桶一眼）','The painkillers the doctor gave me? I didn\'t think it was serious, so… (glances at the trash bin)','ยาแก้ปวดที่หมอให้เหรอ? ลุงว่าไม่หนัก ก็เลย… (เหลือบมองถังขยะ)']);
  await coach('think',['喝酒後大拇趾紅腫劇痛——很像痛風。記下來！','A red, swollen, very painful big toe after drinking — that sounds like gout. Note it!','นิ้วโป้งเท้าบวมแดงปวดมากหลังดื่มเหล้า — คล้ายเกาต์ จดไว้!']); S.fl.gout=1; addSpot('trash'); };
ANSWERS.allergy=async()=>{ await say('chen','think',['過敏喔？吃藥是沒有過敏啦……','Allergies? No drug allergies, as far as I know…','แพ้ยาเหรอ? ไม่เคยแพ้ยานะ…']);
  await say('chen','neutral',['不過 B 醫院的醫生說，那顆降尿酸的藥要注意「起紅疹」，還叫我去驗什麼基因。我沒去啦，很麻煩。','But the Hospital B doctor said to watch for a rash with the uric-acid pill, and told me to get some gene test. I didn\'t go — too much hassle.','แต่หมอ รพ.B บอกให้ระวัง "ผื่นแดง" จากยาลดกรดยูริก แล้วให้ไปตรวจยีนอะไรสักอย่าง ลุงไม่ได้ไป ยุ่งยาก']);
  await coach('think',['他說的是 allopurinol 和 HLA-B*5801 基因檢測——和嚴重皮膚過敏（SJS/TEN）有關。重要資訊！','He means allopurinol and the HLA-B*5801 gene test — linked to severe skin reactions (SJS/TEN). Important!','ลุงหมายถึง allopurinol กับการตรวจยีน HLA-B*5801 — เกี่ยวกับการแพ้ยารุนแรงทางผิวหนัง (SJS/TEN) ข้อมูลสำคัญ!']); S.profile.add('allergy'); };
ANSWERS.storage=async()=>{ await say('chen','happy',['藥喔？大部分都在電視櫃的抽屜裡啦，血壓血糖的還有分裝成一週一盒。','My medicines? Mostly in the TV-cabinet drawers — the BP and sugar ones are sorted into a weekly box.','ยาเหรอ? ส่วนใหญ่อยู่ในลิ้นชักตู้ทีวี ยาความดันกับเบาหวานแบ่งใส่กล่องรายสัปดาห์ไว้']);
  if(!CH.wife) show('wife','R','neutral'); await say('wife','neutral',['……還有很多是他看完醫生就隨手丟一邊的。','…And lots of them he just tosses aside after seeing the doctor.','…แล้วก็มีอีกเยอะที่เขาไปหาหมอมาแล้วโยนไว้ตรงไหนก็ได้']); hide('wife');
  S.profile.add('storage'); addSpot('tv_d1'); addSpot('tv_d2'); };
ANSWERS.otc=async()=>{ await say('chen','neutral',['成藥是沒有啦……不過我太太看我很累，買了一罐「保肝雞精」給我。','Over-the-counter? Not really… but my wife saw how tired I was and bought me some "liver-tonic chicken essence".','ยาซื้อเองไม่มีหรอก… แต่ภรรยาเห็นลุงเหนื่อย เลยซื้อ "ซุปไก่สกัดบำรุงตับ" มาให้']);
  await say('chen','sad',['喝了也沒比較有精神啦。','Drinking it hasn\'t given me any more energy, though.','กินแล้วก็ไม่เห็นมีแรงขึ้นเลย']);
  await coach('think',['疲倦的原因還沒找到，就先靠補品——這是常見的迷思。也要確認補品跟藥有沒有交互作用。','Reaching for tonics before the cause of the fatigue is known is a common myth. Always check supplements for interactions too.','ยังไม่รู้สาเหตุของความเหนื่อยก็หันไปพึ่งอาหารเสริม — เป็นความเชื่อผิดที่พบบ่อย และต้องเช็กว่าอาหารเสริมตีกับยาไหม']); S.profile.add('otc'); };
async function bmiTask(){
  if(S.calc.bmi){ reveal('P12'); return; }
  await say('pilly','happy',['拿出計算機！🧮 用陳伯剛剛說的數字，自己算算他的 BMI。','Calculator time! 🧮 Use the numbers Uncle Chen just told you to work out his BMI.','หยิบเครื่องคิดเลข! 🧮 ใช้ตัวเลขที่ลุงเพิ่งบอก คำนวณ BMI ด้วยตัวเอง']); hideText();
  const r=await calcPanel(CALC_BMI); S.calc.bmi={ok:r.ok, tries:r.tries, value:+r.r.toFixed(1)};
  const c=await choose([{t:['過輕（< 18.5）','Underweight (< 18.5)','น้ำหนักน้อย (< 18.5)']},{t:['正常（18.5–24）','Normal (18.5–24)','ปกติ (18.5–23.9)']},{t:['過重（24–27）','Overweight (24–27)','น้ำหนักเกิน (24–26.9)']},{t:['肥胖（≥ 27）','Obese (≥ 27)','อ้วน (≥ 27)']}],
    {id:'bmiClass', label:['依台灣國健署標準，BMI 30.1 屬於？','By Taiwan\'s (HPA) cut-offs, BMI 30.1 is…','ตามเกณฑ์ของไต้หวัน (HPA) BMI 30.1 อยู่กลุ่มใด?']});
  S.calc.bmiClass=c===3; if(c===3) sfx.get(); else sfx.error();
  await yehSays(c===3?'happy':'think',[(c===3?'沒錯！':'是肥胖喔。')+'台灣標準 BMI ≥ 27 就是肥胖，30–35 屬於「中度肥胖」。肥胖會讓血壓、血糖、尿酸都更難控制。',(c===3?'Right! ':'It\'s obesity. ')+'Taiwan counts BMI ≥ 27 as obese (30–35 = moderate obesity); the WHO cut-off is ≥ 30 — he is obese either way. Obesity makes BP, glucose and uric acid harder to control.',(c===3?'ถูกต้อง! ':'อยู่ในกลุ่มอ้วนนะ ')+'เกณฑ์ไต้หวัน BMI ≥ 27 = อ้วน (30–35 = อ้วนปานกลาง) · 🇹🇭 ถ้าใช้เกณฑ์คนเอเชียแบบที่ไทยใช้: ≥ 25 = อ้วน (≥ 30 = อ้วนระดับ 2) ไม่ว่าเกณฑ์ไหนลุงก็อ้วน ทำให้คุมความดัน น้ำตาล และกรดยูริกยากขึ้น']);
  reveal('P12');
}
ANSWERS.empathy=async()=>{ await say('chen','happy',['謝謝你啦，你人真好，跟你講話很舒服。','Thank you — you\'re very kind. It\'s nice talking with you.','ขอบใจนะ หนูใจดีจัง คุยแล้วสบายใจ']); };
ANSWERS.blame=async()=>{ await say('chen','angry',['欸……你這樣講我就不高興了。我也很努力在照顧身體啊！','Hey… I don\'t like that. I\'m trying hard to take care of myself!','เฮ้… พูดแบบนี้ลุงไม่พอใจนะ ลุงก็พยายามดูแลตัวเองอยู่!']); addTrust(-1); };
function matchIntent(raw){
  const txt=' '+raw.toLowerCase().replace(/[，。？！、,.?!;:；：「」"]/g,' ')+' ', wt=k=>/[㐀-鿿]/.test(k)?k.length*2:k.length;
  const BOOST={adherence:2, side_effects:2, sexual:2, kidney:2, allergy:2, storage:2, otc:2, readiness:1.5, support:1.5, rhinitis_how:1.5};   // specific questions outrank generic topic words
  const sc={}; INTENTS.forEach(it=>sc[it.id]=it.kw.reduce((a,k)=>a+(txt.includes(k)?wt(k):0),0)*(BOOST[it.id]||1));
  let main=null,best=0; INTENTS.forEach(it=>{ if(it.id==='greet'||it.id==='privacy') return; if(sc[it.id]>best){best=sc[it.id]; main=it.id;} });
  return {main, greet:sc.greet>0, priv:sc.privacy>0, emp:EMPATHY.some(k=>txt.includes(k)), blame:BLAME.some(k=>txt.includes(k)), sc};
}
async function coughEvent(){
  emo('chen','cough'); act('chen','shake'); sfx.cough(3);
  await say('chen','cough',['咳咳咳咳——！咳、咳！','*cough cough cough*! *cough*!','แค่กๆๆๆ——! แค่ก!']);
  const c=await choose([
    {t:['遞上一杯溫熱的烏龍茶，請他慢慢喝','Hand him a cup of warm oolong tea to sip slowly','ยื่นชาอูหลงอุ่นๆ ให้ลุงค่อยๆ จิบ']},
    {t:['輕拍他的背，等他咳完再繼續聊','Gently pat his back and wait until he settles','ลูบหลังลุงเบาๆ รอจนไอหยุดแล้วค่อยคุยต่อ']},
    {t:['趁機追問：「您一天抽幾包菸？」','Seize the moment: "How many packs a day?"','ถือโอกาสถาม: "ลุงสูบวันละกี่ซอง?"']},
  ],{timer:8, shuffle:true, id:'cough_event', label:['陳伯咳得好厲害！','Uncle Chen is coughing hard!','ลุงไอหนักมาก!']});
  if(c===0||c===1){ addTrust(1); patGain(1); await say('chen','happy',['呼……謝謝你啊，好多了。你真貼心。','Phew… thank you, that\'s better. You\'re so thoughtful.','เฮ้อ… ขอบใจนะ ดีขึ้นแล้ว หนูใส่ใจจริงๆ']); }
  else if(c===2){ addTrust(-1); patSpend(1); await say('chen','angry',['咳……我都咳成這樣了你還問這個……','*cough*… I\'m choking here and you ask me THAT…','แค่ก… ลุงไอขนาดนี้ยังมาถามเรื่องนี้อีก…']); }
  else await say('chen','neutral',['咳……沒事沒事。','*cough*… I\'m fine, I\'m fine.','แค่ก… ไม่เป็นไรๆ']);
}
function renderBoard(){
  $('#boardTitle').textContent=T('boardTitle'); $('#freeSend').textContent=T('freeSend'); $('#freeIn').placeholder=T('freePh');
  $('#freeHint').textContent=T('freeHint')+(EXAM()?'':'  '+T('hiddenQ').replace('{n}',S.hiddenQ.length));
  $('#cards').innerHTML=boardTopics().map((t,i)=>`<button class="qcard${S.asked[t.id]?' done':''}${t.parent?' fu':''}${t.parent&&!S.fl['seen_'+t.id]?' fresh':''}" data-t="${t.id}" style="animation-delay:${i*.03}s"><span class="ic">${t.ico}</span><span class="qt">${t.parent?`<small class="fut">↪ ${T('fuTag')}</small>`:''}${esc(L(t.l))}</span></button>`).join('');
  boardTopics().forEach(t=>{ if(t.parent) S.fl['seen_'+t.id]=1; });
  const cap=Math.max(S.pat+(S.fl.patSpent||0),CONFIG.PATIENCE);
  $('#patRow').innerHTML=`<span class="pl">☕ ${T('patLbl')}</span><span class="pb">${Array.from({length:cap},(_,i)=>`<i class="${i<S.pat?'on':''}"></i>`).join('')}</span><b class="pv${S.pat<=3?' low':''}">${S.pat}</b><span class="pt">${T('patTip')}</span>`;
  const nb=$('#boardNext'); nb.textContent=T('boardNext'); nb.classList.toggle('hidden',S.questions<1);
}
function boardAction(){ return new Promise(res=>{
  renderBoard(); $('#board').classList.remove('hidden');
  $('#cards').querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{ sfx.select(); D.boardGo=null; res({type:'card', id:b.dataset.t}); });
  const go=()=>{ const v=$('#freeIn').value.trim(); if(!v){ sfx.error(); return; } $('#freeIn').value=''; D.boardGo=null; res({type:'free', text:v}); };
  $('#freeSend').onclick=go; D.boardGo=go; $('#boardNext').onclick=()=>{ sfx.select(); D.boardGo=null; res({type:'next'}); };
}); }
/* leaving the interview early is allowed — but whatever was not asked is lost */
function confirmEndAsk(){ return new Promise(res=>{
  const miss=CH1_NEED.filter(p=>!S.found[p]).length;
  if(!EXAM()&&!miss) return res(true);
  showModal(`<div style="font-size:44px">🗂️</div><h3>${T('endAskQ')}</h3>${!EXAM()?`<p>${T('endAskMiss').replace('{n}',miss)}</p>`:''}`,[{t:T('endAsk'),cls:'p',fn:()=>res(true)},{t:T('keepAsk'),cls:'',fn:()=>res(false)}],()=>{});
}); }
/* ---- the first move inside the patient's home ---- */
const FIRST_MOVES=[
 {k:'search', t:['走到電視櫃，拉開抽屜看看陳伯到底都吃哪些藥','Go to the TV cabinet and open the drawers to see which pills he takes','เดินไปที่ตู้ทีวี เปิดลิ้นชักดูว่าลุงกินยาอะไรอยู่บ้าง']},
 {k:'wife', t:['先請陳太太到廚房，問她陳伯平常是怎麼吃藥的','Take Mrs. Chen aside to the kitchen and ask how he takes his pills','ขอคุยกับป้าเฉินที่ครัวก่อน ถามว่าปกติลุงกินยายังไง']},
 {k:'intro', t:['向陳伯問好、出示證件，說明來意與時間並請他同意','Greet Uncle Chen, show your ID, say why and how long, ask his consent','ทักทายลุงเฉิน แสดงบัตร บอกจุดประสงค์กับเวลา แล้วขออนุญาต']},
 {k:'ask', t:['在陳伯旁邊坐下，直接問他：「您都吃哪些藥？」','Sit beside Uncle Chen and ask at once: "Which medicines do you take?"','นั่งข้างลุงเฉินแล้วถามทันที: "ลุงกินยาอะไรอยู่บ้าง?"']},
];
const FIRST_WRONG={
 search:{trust:-2, act:['sys',['（你走到電視櫃前，伸手拉開了抽屜……）','(You walk to the TV cabinet and pull a drawer open…)','(คุณเดินไปที่ตู้ทีวีแล้วดึงลิ้นชักออก…)']], chen:['angry',['欸欸欸！誰准你開我的抽屜？！你們到底是誰啊？','Hey hey hey! Who said you could open my drawers?! Who ARE you people?','เฮ้ๆๆ! ใครอนุญาตให้เปิดลิ้นชักลุง?! พวกนี้เป็นใครกันเนี่ย?']],
   yeh:['停。在病人家裡我們是「客人」——沒經過同意，什麼東西都不能翻。先打招呼、自我介紹、說明來意，取得同意。','Stop. In a patient\'s home we are GUESTS — never touch anything without permission. Greet, introduce yourself, explain why you\'re here, and get consent first.','หยุดก่อน ในบ้านผู้ป่วยเราเป็น "แขก" ห้ามค้นอะไรโดยไม่ได้รับอนุญาต ต้องทักทาย แนะนำตัว บอกจุดประสงค์ และขอความยินยอมก่อน']},
 wife:{trust:-1, act:['me',['陳太太，可以借一步說話嗎？陳伯平常都怎麼吃藥？','Mrs. Chen, could I have a quick word? How does he usually take his medicines?','ป้าเฉินคะ/ครับ ขอคุยแป๊บนึงได้ไหม ปกติลุงกินยายังไง?']], chen:['angry',['欸，我人就坐在這裡耶，怎麼都去問她？','Hey, I\'m sitting right here — why ask her instead of me?','เฮ้ ลุงนั่งอยู่ตรงนี้นะ ทำไมไปถามป้าเขาล่ะ?']],
   yeh:['陳伯才是主角。家屬的資訊很寶貴，但要先跟病人本人打招呼、取得他的同意，再邀請家屬一起參與。','Uncle Chen is the patient. Family input is valuable — but greet the patient himself and get his consent first, then invite the family in.','ลุงเฉินคือตัวผู้ป่วย ข้อมูลจากญาติมีค่า แต่ต้องทักทายและขออนุญาตตัวผู้ป่วยก่อน แล้วค่อยชวนญาติมาร่วมคุย']},
 ask:{trust:-1, act:['me',['陳伯，您現在都吃哪些藥？','Uncle Chen, which medicines are you taking?','ลุงเฉิน ตอนนี้กินยาอะไรอยู่บ้าง?']], chen:['shock',['啊？你……你是誰啊？一來就問我吃什麼藥……','Huh? Wh-who are you? Asking about my medicines out of nowhere…','หา? นะ…หนูเป็นใคร? มาถึงก็ถามเรื่องยาเลย…']],
   yeh:['他還不知道你是誰、為什麼要問——當然會防備。先自我介紹、說明目的和時間、取得同意，再開始問。','He doesn\'t know who you are or why you\'re asking — of course he\'s guarded. Introduce yourself, explain the purpose and time, get consent, THEN ask.','ลุงยังไม่รู้ว่าเราเป็นใคร ถามไปทำไม ก็ต้องระแวงเป็นธรรมดา แนะนำตัว บอกจุดประสงค์และเวลา ขออนุญาตก่อน แล้วค่อยถาม']},
 timeout:{trust:-1, chen:['think',['……？（陳伯疑惑地看著站在門口發呆的你）','…? (Uncle Chen squints at you frozen in the doorway)','…? (ลุงเฉินมองคุณที่ยืนนิ่งอยู่หน้าประตูอย่างงงๆ)']],
   yeh:['站著不動會讓氣氛很尷尬。進門第一件事：主動打招呼、自我介紹。','Standing frozen makes it awkward. First thing through the door: greet and introduce yourself.','ยืนนิ่งๆ ทำให้บรรยากาศอึดอัด สิ่งแรกเมื่อเข้าบ้าน: ทักทายและแนะนำตัวก่อน']},
};
async function yehSays(e, text){ const had=!!CH.wife; if(had) hide('wife'); show('yeh','R',e); await say('yeh',e,text); hide('yeh'); }
async function firstMove(){
  let left=FIRST_MOVES.slice(), tries=0; const picks=[];
  while(true){
    const c=await choose(left.map(o=>({t:o.t})),{timer:tries?0:25, shuffle:true, id:'firstMove', label:tries?['再想一次：進門該先做什麼？','Think again: what comes first?','คิดอีกที: เข้าบ้านแล้วควรทำอะไรก่อน?']:['進門第一步！','Your first move!','ก้าวแรกในบ้าน!']});
    tries++; const mv=c<0?{k:'timeout'}:left[c]; picks.push(mv.k);
    if(mv.k==='intro') break;
    const w=FIRST_WRONG[mv.k]; if(w.act) await say(w.act[0],'neutral',w.act[1]); if(mv.k==='search'){ act('me','hop'); fpReach(330,520); sfx.drawer(); } if(mv.k==='wife'&&CH.wife) emo('wife','shock');
    await say('chen',w.chen[0],w.chen[1]); addTrust(w.trust); spend(1); hud();
    await yehSays('think',w.yeh); if(mv.k!=='timeout') left=left.filter(o=>o!==mv);
  }
  S.first={tries, picks, ok:tries===1}; logEvent({type:'firstMove', tries, picks});
  if(tries===1) addTrust(2);
  await fpShow('id',null,async()=>{
  await say('me','happy',[`陳伯您好！我是藥學系實習生${nm()}，這是我的實習證。今天跟葉藥師一起來關心您的用藥和身體，大概一個小時，可以跟您聊聊嗎？`,`Hello Uncle Chen! I\'m ${nm()}, a pharmacy intern — here\'s my ID. Pharmacist Yeh and I are here to look at your medicines and health; it takes about an hour. May we talk with you?`,`สวัสดีค่ะ/ครับลุงเฉิน หนู/ผมชื่อ${nm()} เป็นนักศึกษาฝึกงานเภสัชฯ นี่บัตรนักศึกษาค่ะ/ครับ วันนี้มากับเภสัชกรเย่เพื่อดูแลเรื่องยาและสุขภาพของลุง ใช้เวลาประมาณหนึ่งชั่วโมง ขอคุยกับลุงได้ไหมคะ/ครับ?`]);
  await say('chen','happy',tries===1?['喔！藥師來了喔！好啊好啊，歡迎歡迎，坐啦坐啦，先喝茶！','Oh! The pharmacists are here! Sure, sure — welcome! Sit, sit, have some tea!','โอ้! เภสัชกรมาแล้ว! ได้สิๆ ยินดีต้อนรับ นั่งก่อนๆ ดื่มชาก่อนนะ!']:['……好啦，這樣講我就懂了。坐吧。','…Alright, now I get it. Have a seat.','…อ้อ พูดแบบนี้ค่อยเข้าใจหน่อย นั่งสิ']);
  });
  await yehSays(tries===1?'happy':'neutral',['居家訪視的開場：①打招呼、自我介紹（出示證件）②說明目的和時間 ③取得同意。之後再問診、經同意看藥，家屬也在病人同意下一起參與。','How a home visit opens: ① greet and introduce yourself (show ID) ② explain purpose and time ③ get consent. Only then interview, look at medicines with permission, and involve family with the patient\'s OK.','การเปิดการเยี่ยมบ้าน: ① ทักทาย แนะนำตัว (แสดงบัตร) ② บอกจุดประสงค์และเวลา ③ ขอความยินยอม จากนั้นจึงซักประวัติ ขออนุญาตก่อนดูยา และชวนญาติร่วมคุยเมื่อผู้ป่วยยินยอม']);
}
async function chapter1(){
  await wipe(()=>{ setBg('liv'); hideAll(); }); playTheme('calm'); S.chStart=realSec();
  await chapterCard(1);
  show('wife','R','happy'); await introCard('wife');
  await say('wife','happy',['請進請進！他在客廳看電視啦。','Come in, come in! He\'s in the living room watching TV.','เชิญเข้ามาเลยจ้ะ! เขาดูทีวีอยู่ในห้องนั่งเล่น']);
  show('chen','C','think'); await introCard('chen'); show('me','L','neutral'); emo('chen','think');
  await say('sys','neutral',['陳伯坐在藤椅上，一邊搖扇子一邊盯著電視，還沒注意到你們。電視櫃和餐桌上散著好幾包藥袋……','Uncle Chen sits in a rattan chair, fanning himself, eyes glued to the TV — he hasn\'t noticed you yet. Med bags lie scattered on the TV cabinet and the table…','ลุงเฉินนั่งพัดวีอยู่บนเก้าอี้หวาย ตาจ้องทีวี ยังไม่ทันเห็นพวกคุณ ซองยาวางกระจายอยู่บนตู้ทีวีและโต๊ะกินข้าว…']);
  await say('pilly','think',['進到病人家裡的第一步很重要！你會先做什麼？','Your first move inside a patient\'s home matters! What do you do first?','ก้าวแรกในบ้านผู้ป่วยสำคัญมาก! คุณจะทำอะไรก่อน?']);
  await firstMove();
  await say('chen','happy',['政府有這款服務，給藥師來厝裡看我們，我真歡喜啦！','The government sending pharmacists to our home — I\'m really happy about that!','รัฐบาลมีบริการให้เภสัชกรมาเยี่ยมถึงบ้าน ลุงดีใจมาก!']);
  await say('chen','sad',['不過……我感覺一天到晚都在吃藥，吃那麼多，身體的問題也沒解決……','But… I feel like I\'m taking medicine all day, and even so, my problems aren\'t solved…','แต่… ลุงรู้สึกว่ากินยาทั้งวัน กินเยอะขนาดนี้ ปัญหาก็ไม่หาย…']);
  if(!CH.wife) show('wife','R','sad');
  await say('wife','sad',['他喔，藥一大堆，自己到處亂放，我都搞不清楚。','He has piles of medicine scattered everywhere — I can\'t keep track.','เขามียาเต็มไปหมด วางเกะกะไปทั่ว ป้าก็งง']);
  hide('wife');
  await say('pilly','happy',EXAM()?['提問時間！✨ 點「提問卡」或用自己的話問。','Question time! ✨ Pick a question card or ask in your own words.','ได้เวลาถาม! ✨ เลือกการ์ดคำถามหรือพิมพ์ถามเอง']:['提問時間！✨ 點「提問卡」或用自己的話問。目標：找出這一章的 5 個問題！','Question time! ✨ Pick a question card or ask in your own words. Goal: uncover 5 problems in this chapter!','ได้เวลาถาม! ✨ เลือกการ์ดคำถามหรือพิมพ์ถามเอง เป้าหมาย: หาปัญหา 5 ข้อในบทนี้!']);
  await say('pilly','think',['不過陳伯很容易累，☕ 耐心有限——沒辦法全部問完！問了某些題目還會冒出「追問」卡；有些事卡片上沒有，要你自己想到、打字問。','But Uncle Chen tires easily and his ☕ patience is limited — you can\'t ask everything! Some answers unlock "follow-up" cards, and some things aren\'t on any card: you\'ll have to think of them and type the question yourself.','แต่ลุงเหนื่อยง่าย ☕ ความอดทนมีจำกัด — ถามได้ไม่หมดทุกข้อ! บางคำตอบจะปลดล็อกการ์ด "ถามต่อ" และบางเรื่องไม่มีในการ์ด ต้องคิดเองแล้วพิมพ์ถาม']);
  let announced=false;
  while(true){
    if(S.visit<=0) break;
    hideText(); pillyHide(); if(CH.wife) hide('wife'); emo('chen','neutral'); focusSpeaker('none');
    const a=await boardAction(); $('#board').classList.add('hidden');
    if(a.type==='next'){ if(await confirmEndAsk()) break; continue; }
    S.questions++; spend(CONFIG.COST_ASK); let cost=0; const before=FOLLOW1.filter(f=>S.asked[f.parent]).length;
    if(a.type==='card'){ const t=topicById(a.id); logEvent({type:'ask', mode:'card', topic:a.id, pat:S.pat, trust:S.trust}); await say('me','neutral',t.q); const ok=await ANSWERS[a.id](); if(ok!==false) S.asked[a.id]=1; cost=1; }
    else { const r=matchIntent(a.text); const seq=[];
      if(r.emp&&S.empathy<3){ S.empathy++; addTrust(1); if((S.fl.patEmp||0)<2){ S.fl.patEmp=(S.fl.patEmp||0)+1; patGain(1); } }
      if(r.blame) seq.push('blame');
      if(r.priv&&r.main){ if(!S.privacy){ S.privacy=true; addTrust(2); patGain(1); } } else if(r.priv) seq.push('privacy');
      if(r.greet&&!S.asked.greetFree&&!r.main) seq.push('greet');
      const m=freeNode(r.main); if(m) seq.push(m);
      if(!seq.length) seq.push(r.emp?'empathy':(r.greet?'greet':'fallback'));
      logEvent({type:'ask', mode:'free', text:a.text, intent:r.main, nodes:seq, emp:r.emp, blame:r.blame, priv:r.priv, trust:S.trust, pat:S.pat});
      await say('me','neutral',a.text);
      for(const k of seq){ const ok=await ANSWERS[k](); cost+=(k in PAT_COST)?PAT_COST[k]:1;
        if(topicById(k)&&ok!==false) S.asked[k]=1;
        if(HIDDEN1.includes(k)&&!S.hiddenQ.includes(k)){ S.hiddenQ.push(k); sfx.get(); toast(T('hiddenFound')+' ('+S.hiddenQ.length+'/3)'); logEvent({type:'hidden', id:k}); } } }
    patSpend(cost); hud();
    if(FOLLOW1.filter(f=>S.asked[f.parent]).length>before) toast('↪ '+T('fuTag')+' +1');
    if(S.questions===3&&!S.asked.cough){ S.asked.cough=1; await coughEvent(); }
    if(!EXAM()&&!announced&&CH1_NEED.every(p=>S.found[p])){ announced=true; await say('pilly','happy',['第一章的 5 個線索全部到手！可以「前往搜查」，也可以再多問幾題喔～','All 5 Chapter-1 clues collected! You can "Go search" now, or keep asking~','ได้เบาะแสบทที่ 1 ครบ 5 ข้อแล้ว! จะ "ไปค้นบ้าน" เลย หรือถามต่อก็ได้~']); }
    if(S.pat>0&&S.pat<=3&&!S.fl.patWarn){ S.fl.patWarn=1; toast('☕ '+T('patLow')); await say('sys','neutral',['（陳伯打了個大哈欠。）','(Uncle Chen lets out a big yawn.)','(ลุงเฉินหาวยาวๆ)']); }
    if(S.pat<=0){ emo('chen','sad'); await say('chen','sad',['唉……我有點累了，先讓我休息一下好不好？你們在家裡看看沒關係。','Sigh… I\'m worn out. Can I rest for a bit? Feel free to look around the house.','เฮ้อ… ลุงเหนื่อยแล้ว ขอพักก่อนได้ไหม? พวกหนูดูรอบๆ บ้านได้เลย']);
      S.fl.patOut=1; logEvent({type:'patienceOut', found:CH1_NEED.filter(p=>S.found[p])});
      const miss=CH1_NEED.filter(p=>!S.found[p]).length;
      if(miss&&!EXAM()) await say('pilly','sad',[`訪談結束了……還有 ${miss} 個重要面向沒問到，這些資訊這次拿不到了。下次先問最重要的！`,`The interview is over… ${miss} important areas were never asked, so that information is lost this time. Next time, ask the most important things first!`,`การสัมภาษณ์จบแล้ว… ยังมี ${miss} เรื่องสำคัญที่ไม่ได้ถาม ข้อมูลนั้นจึงหายไปในรอบนี้ ครั้งหน้าถามเรื่องสำคัญก่อนนะ!`]);
      break; }
  }
  show('yeh','R','smug'); await say('yeh','smug',['問得很好。不過陳伯說的話……有些跟這個家「對不上」。','Good interview. But some of what Uncle Chen said doesn\'t quite "match" this house.','สัมภาษณ์ได้ดี แต่บางอย่างที่ลุงเฉินพูด… ไม่ "ตรงกับ" บ้านหลังนี้']);
  chapterDone(1);
}
/* ---------------- Chapter 2: hidden-object search (zoom + torch + glints) ---------------- */
function camReset(instant){
  D.zoomed=null; const cam=$('#bgCam');
  if(instant){ cam.style.transition='none'; cam.style.transform=''; void cam.offsetWidth; cam.style.transition=''; } else cam.style.transform='';
  $('#torch').style.setProperty('--tr','150px'); $('#zoomBack').classList.add('hidden'); $('#zoomLbl').classList.add('hidden');
  if($('#stage').classList.contains('searching')) $('#stage').classList.add('overview');
}
function zoomTo(k){
  const z=ZONES[k]; if(!z) return; const s=Math.max(1.5,Math.min(1600/(z.w*1.25), 700/(z.h*1.08), 2.6)), cx=z.x+z.w/2, cy=z.y+z.h/2;
  const tx=Math.min(0,Math.max(1600-1600*s,800-cx*s)), ty=Math.min(0,Math.max(900-900*s,480-cy*s));
  $('#bgCam').style.transform=`translate(${tx}px,${ty}px) scale(${s})`; D.zoomed=k;
  const st=$('#stage'); st.classList.remove('overview'); st.style.setProperty('--px',0); st.style.setProperty('--py',0);
  $('#torch').style.setProperty('--tr','280px'); $('#zoomBack').textContent=T('zoomBack'); $('#zoomBack').classList.remove('hidden');
  const lb=$('#zoomLbl'); lb.textContent='🔍 '+T(z.n); lb.classList.remove('hidden'); lb.animate([{opacity:0,transform:'translate(-50%,10px)'},{opacity:1,transform:'translate(-50%,0)'}],{duration:400});
  sfx.zoom(); logEvent({type:'zoom', zone:k});
}
function updSearchHud(){ $('#sChargeV').textContent=S.charges; const k=KEY_ITEMS.filter(hasEv).length; $('#sKeyV').textContent=k+'/'+KEY_ITEMS.length; $('#sHint').textContent=T('sHint'); $('#sDone').textContent=T('sDone');
  $('#sHint').classList.toggle('hidden',EXAM()); $('#sDone').classList.toggle('hidden',EXAM()?false:k<KEY_ITEMS.length); }
function keyHotspots(){ return Object.keys(HOTSPOTS).filter(id=>{ const h=HOTSPOTS[id]; return h.item&&ITEMS[h.item].req&&!hasEv(h.item)&&!h.alias&&!S.opened[id]; }); }
function hsEl(id){ const l=curBg(); return l&&l.querySelector(`[data-hs="${id}"]`); }
/* 📌 places Uncle Chen / Mrs. Chen mentioned in the interview (earned by asking follow-ups / hidden questions) */
function memoHTML(){ let h=''; (S.hintSpots||[]).forEach(id=>{ if(S.opened[id]) return; const g=hsEl(id); if(!g) return; const b=g.getBBox(), cx=b.x+b.width/2, cy=b.y+b.height/2, r=Math.max(34,Math.min(90,Math.max(b.width,b.height)*.62));
    h+=`<g class="memo" data-memo="${id}"><circle class="ring" cx="${cx}" cy="${cy}" r="${r}"/><text class="pin" x="${cx+r*.55}" y="${cy-r*.55}">📌</text></g>`; }); return h; }
function sparkHint(){ const l=curBg(), layer=l&&l.querySelector('#sparkLayer'); if(!layer) return; let h=memoHTML();
  if(S.sparkOn) keyHotspots().forEach(id=>{ const g=hsEl(id); if(g){ const b=g.getBBox(); h+=`<g class="spark" style="transform-box:fill-box;transform-origin:center">${sparkle(b.x+b.width/2,b.y-6,1.6,'#fff')}${sparkle(b.x+b.width/2+18,b.y+8,.8,'#ffe07a')}</g>`; } });
  layer.innerHTML=h; }
function glintTick(){
  const l=curBg(), layer=l&&l.querySelector('#sparkLayer'); if(!layer||!$('#stage').classList.contains('searching')||EXAM()) return;
  let c=keyHotspots(); if(D.zoomed) c=c.filter(id=>ZONES[D.zoomed].hs.includes(id)); if(!c.length) return;
  const id=c[Math.floor(Math.random()*c.length)], g=hsEl(id); if(!g) return; const b=g.getBBox();
  const x=b.x+b.width*rand(.2,.8), y=b.y+b.height*rand(.1,.6);
  layer.insertAdjacentHTML('beforeend',`<g class="glint" style="transform-box:fill-box;transform-origin:${x}px ${y}px">${sparkle(x,y,1.1,'#fffbe0')}</g>`); sfx.glint();
  const el=layer.lastElementChild; setTimeout(()=>el&&el.remove(),1350);
}
function flyToBag(id, x, y){
  const chip=$('#bagChip'); if(!chip) return; const r=$('#stage').getBoundingClientRect(), k=r.width/1600, cr=chip.getBoundingClientRect();
  const tx=(cr.left-r.left)/k+20, ty=(cr.top-r.top)/k-10;
  const d=document.createElement('div'); d.className='flyItem'; d.innerHTML=itemIcon(id,72); d.style.left=(x-32)+'px'; d.style.top=(y-32)+'px'; $('#stage').appendChild(d);
  requestAnimationFrame(()=>requestAnimationFrame(()=>{ d.style.left=tx+'px'; d.style.top=ty+'px'; d.style.transform='scale(.35) rotate(-20deg)'; d.style.opacity='.4'; }));
  setTimeout(()=>{ d.remove(); chip.classList.remove('bump'); void chip.offsetWidth; chip.classList.add('bump'); sfx.bag(); },780);
}
async function onHotspot(id, ev){
  if(D.searchBusy) return; const hs=HOTSPOTS[id]; const g=hsEl(id); if(!g) return;
  const {x,y}=stagePt(ev);
  if(S.opened[id]){ if(hs.item) { D.searchBusy=true; await getCard(hs.item,false); D.searchBusy=false; } else stagePop(L(hs.t),x,y-20); return; }
  if(S.charges<=0){ sfx.error(); stagePop(T('noCharge'),x,y-20); return; }
  S.charges--; spend(CONFIG.COST_SEARCH); S.opened[id]=1; g.classList.add('open'); sfx.magnify(); logEvent({type:'search', spot:id});
  if(g.querySelector('.mv')) fpReach(x,y);
  if(hs.item){ const it=ITEMS[hs.item]; g.classList.add('done'); sfx.drawer();
    if(!hasEv(hs.item)){ D.searchBusy=true; await sleep(VIEW.fp?560:420); sfx[it.sfx||'paper'](); addEvidence(hs.item);
      if(VIEW.fp){ fpHold('item',hs.item,{x:1330,y:610,sparkle:true}); await sleep(FP_ANIM()?650:0); }
      await getCard(hs.item,true); fpHide(); flyToBag(hs.item,x,y); D.searchBusy=false; sparkHint();
      if(KEY_ITEMS.every(hasEv)&&!S.asked.allkeys){ S.asked.allkeys=1; toast('⭐ '+L(['7 個關鍵證物全部到手！可以結束搜查了','All 7 key items found! You can finish the search','ได้หลักฐานสำคัญครบ 7 ชิ้นแล้ว! จบการค้นได้'])); } }
    else stagePop('✓ '+L(it.n),x,y-20); }
  else stagePop(L(hs.t),x,y-20);
  sparkHint(); updSearchHud();
  if(S.visit<=0&&D.searchStop){ D.searchStop(); return; }
  if(S.charges<=0&&!KEY_ITEMS.every(hasEv)) toast('🔍 '+(EXAM()?L(['放大鏡用完了！搜查結束。','Out of magnifier charges — the search is over.','แว่นขยายหมดแล้ว — การค้นจบลง']):L(['放大鏡用完了！按「超級放大鏡」補充並顯示線索','Out of charges! Use the Super magnifier to refill and reveal clues','แว่นขยายหมด! กด "แว่นขยายพิเศษ" เพื่อเติมและดูเบาะแส'])));
}
async function chapter2(){
  S.chStart=realSec(); playTheme('mystery');
  await chapterCard(2);
  hideAll(); show('wife','R','sad'); show('chen','C','embarrassed'); show('yeh','L','smug');
  await say('wife','sad',['我先生的藥到處亂塞，你們幫忙找找看吧！','My husband stuffs his medicines everywhere — please help look!','สามีป้ายัดยาไว้ทั่วบ้าน ช่วยหาหน่อยนะ!']);
  await say('chen','embarrassed',['欸欸欸，不、不用找啦……','Hey hey hey, n-no need to look…','เฮ้ๆๆ ไม่…ไม่ต้องหาหรอก…']);
  await say('yeh','smug',[`我們會很小心的。${nm()}，交給你了！`,`We'll be careful. ${nm()}, it's all yours!`,`เราจะระวังค่ะ ${nm()} ฝากด้วยนะ!`]);
  await say('pilly','happy',EXAM()?['點家具可以「靠近調查」。關鍵證物有 7 個，放大鏡只有 16 次——每次也會花 1 分鐘，用完就結束搜查！','Click furniture to take a closer look. There are 7 key items and only 16 magnifier charges — each costs 1 minute, and when they run out the search ends!','คลิกเฟอร์นิเจอร์เพื่อเข้าไปดูใกล้ๆ มีหลักฐานสำคัญ 7 ชิ้น แว่นขยายใช้ได้ 16 ครั้ง ครั้งละ 1 นาที หมดแล้วการค้นจะจบ!']:['點家具可以「靠近調查」！用手電筒找找發光的地方 ✨ 關鍵證物有 7 個，放大鏡只有 16 次——每次也會花 1 分鐘喔！','Click furniture to take a closer look! Use the flashlight and watch for glints ✨ There are 7 key items and only 16 magnifier charges — each costs 1 minute!','คลิกเฟอร์นิเจอร์เพื่อเข้าไปดูใกล้ๆ! ส่องไฟฉายหาจุดที่มีประกาย ✨ มีหลักฐานสำคัญ 7 ชิ้น แว่นขยายใช้ได้ 16 ครั้ง ครั้งละ 1 นาที!']);
  if(S.hintSpots.length) await say('pilly','smug',[`剛剛訪談時，陳伯和陳太太提到了 ${S.hintSpots.length} 個地方——我用 📌 標起來了！問得好就有回報～`,`During the interview, Uncle Chen and Mrs. Chen mentioned ${S.hintSpots.length} places — I've marked them with 📌! Good questions pay off~`,`ตอนสัมภาษณ์ ลุงกับป้าพูดถึง ${S.hintSpots.length} จุด — พิลลี่ปัก 📌 ไว้ให้แล้ว! ถามดีก็ได้รางวัล~`]);
  hideAll(); hideText();
  const st=$('#stage'); st.classList.add('searching','overview'); $('#searchHud').classList.remove('hidden'); updSearchHud(); toast('🔦 '+T('zoomHint'));
  Object.keys(S.opened).forEach(id=>{ const g=hsEl(id); if(g) g.classList.add('open'); });
  const gl=setInterval(glintTick, 2600); sparkHint();
  await new Promise(res=>{
    D.searchStop=()=>{ D.searchStop=null; $('#bg').onclick=null; res(); };
    const bg=$('#bg'); bg.onclick=e=>{ if(!st.classList.contains('searching')) return; const z=e.target.closest('[data-zone]'); if(z&&!D.zoomed){ zoomTo(z.dataset.zone); return; } const g=e.target.closest('.hs'); if(g&&g.dataset.hs) onHotspot(g.dataset.hs, e); };
    $('#zoomBack').onclick=()=>{ sfx.zoom(); camReset(); };
    $('#sHint').onclick=()=>{ if(EXAM()) return; S.sparkOn=true; S.hints++; S.charges+=4; spend(CONFIG.COST_HINT); sfx.get(); sparkHint(); updSearchHud(); logEvent({type:'hint', where:'search'}); if(S.visit<=0&&D.searchStop) D.searchStop(); };
    $('#sDone').onclick=()=>{ sfx.select(); if(EXAM()&&KEY_ITEMS.some(k=>!hasEv(k))&&S.charges>0){ showModal(`<h3>${L(['結束搜查？','Finish the search?','จบการค้นบ้าน?'])}</h3><p>${L(['結束後就不能再回來找了。','You can\'t come back once you leave.','ออกไปแล้วจะกลับมาค้นอีกไม่ได้'])}</p>`,[{t:T('sDone'),cls:'p',fn:()=>{ D.searchStop&&D.searchStop(); }},{t:T('cancel'),cls:''}]); return; } D.searchStop&&D.searchStop(); };
    if(S.visit<=0) D.searchStop();
  });
  D.searchStop=null;
  clearInterval(gl); camReset(); st.classList.remove('searching','overview'); $('#searchHud').classList.add('hidden'); const sl=curBg()&&curBg().querySelector('#sparkLayer'); if(sl) sl.innerHTML='';
  const bonus=Object.keys(ITEMS).filter(k=>!ITEMS[k].req&&hasEv(k)).length;
  show('yeh','L','smug'); await say('yeh','smug',[`證據齊了。額外線索 ${bonus}/4。接下來……讓陳伯自己說說看吧。`,`We have the evidence. Bonus clues: ${bonus}/4. Now… let's hear Uncle Chen's side.`,`หลักฐานครบแล้ว เบาะแสเพิ่ม ${bonus}/4 ต่อไป… ให้ลุงเฉินเล่าเองดีกว่า`]);
  chapterDone(2);
}
