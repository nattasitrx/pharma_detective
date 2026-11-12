/* ---- hands-on inhaler simulator: the student operates a drawn device with their own hands ----
   devices: 'mdi' (Berotec), 'spacer' (Berotec + spacer), 'resp' (Spiolto Respimat, 2 puffs)
   gestures (one pointer, mouse or touch): drag the device (up-down = shake, onto the mouth = lips on), tap the cap,
   drag across the clear base = turn, press the canister / dose button AND keep sliding = press while breathing in,
   hold the side buttons = breathe out / hold your breath. */
const SIMX={
  hdr:{mdi:['🫁 實作 1：藍色 Berotec','🫁 Hands-on 1: blue Berotec','🫁 ลงมือ 1: Berotec สีฟ้า'], spacer:['🫁 實作 2：加上吸藥輔助器','🫁 Hands-on 2: with a spacer','🫁 ลงมือ 2: ใช้กับกระบอกช่วยสูด'], resp:['🫁 實作 3：綠色 Spiolto Respimat','🫁 Hands-on 3: green Spiolto Respimat','🫁 ลงมือ 3: Spiolto Respimat สีเขียว']},
  task:{mdi:['用這支示範吸入器，親手做一次正確的 1 噴給李伯伯看。','Use this demo inhaler to show Uncle Lee one correct puff — with your own hands.','ใช้ยาพ่นตัวอย่างนี้ สาธิตการพ่นที่ถูกต้อง 1 ครั้งให้ลุงหลี่ดู ด้วยมือคุณเอง'],
    spacer:['裝上吸藥輔助器，再做 1 噴。','Fit the spacer and do one puff with it.','ต่อกระบอกช่วยสูด แล้วพ่นอีก 1 ครั้ง'],
    resp:['示範 Spiolto 的一次劑量（2 噴）。','Demonstrate one dose of Spiolto (2 puffs).','สาธิต Spiolto หนึ่งโดส (2 พัฟ)']},
  steps:['步驟','Steps','ขั้นตอน'], you:['你（示範）','You (demo)','คุณ (สาธิต)'],
  out:['😮‍💨 吐氣','😮‍💨 Breathe out','😮‍💨 หายใจออก'], hold:['⏱️ 閉氣','⏱️ Hold breath','⏱️ กลั้นหายใจ'], press:['按住','press & hold','กดค้าง'],
  lungs:['肺','Lungs','ปอด'], flow:['吸氣速度','Breath speed','ความเร็วการสูด'],
  slow:['剛好','good','พอดี'], fast:['太快','too fast','เร็วไป'],
  slide:['按住不放，慢慢滑開 ＝ 一邊吸氣','keep pressing and slide away slowly = breathe in','กดค้างแล้วค่อยๆ ลากออก = หายใจเข้า'],
  slideSp:['按住霧，慢慢滑開 ＝ 把藥霧吸進去','press the mist and slide away slowly = breathe it in','กดที่ละอองแล้วค่อยๆ ลากออก = สูดยาเข้าไป'],
  done:['✅ 完成','✅ Done','✅ เสร็จแล้ว'], again:['↺ 再做一次','↺ Try again','↺ ลองอีกครั้ง'], cont:['繼續','Continue','ไปต่อ'],
  puff2:['第 2 噴：整套動作再做一次！','Puff 2: the whole routine again!','พัฟที่ 2: ทำทั้งขั้นตอนอีกรอบ!'], puff:['第 {n} 噴','Puff {n}','พัฟที่ {n}'],
  perfect:['完美示範！','Perfect demonstration!','สาธิตได้สมบูรณ์!'], fixes:['要修正的地方','What to fix','สิ่งที่ต้องแก้'],
  click:['喀！','Click!','คลิก!'], loaded:['已上膛','loaded','พร้อมพ่น'], cough:['咳咳！','*cough*','แค่กๆ!'],
  nothing:['……什麼都沒噴出來','…nothing came out','…ไม่มีอะไรออกมา'], examNote:['照你教病人的方式，自己完整做一次。','Do it exactly as you would teach a patient.','ทำให้ครบเหมือนที่คุณจะสอนผู้ป่วย'],
  shakeHint:['把吸入器上下拖動來搖勻','drag the inhaler up and down to shake it','ลากยาพ่นขึ้นลงเพื่อเขย่า'],
  ctrl:['操作：拖動＝移動／搖　點蓋子＝開／關　按住藥罐或按鈕再滑開＝邊按邊吸　右邊按鈕＝點一下','Controls: drag = move / shake · tap the cap · press the canister or button and slide = press while breathing in · side buttons = tap','วิธีควบคุม: ลาก = ย้าย/เขย่า · แตะฝา · กดกระป๋องหรือปุ่มแล้วลาก = กดพร้อมหายใจเข้า · ปุ่มด้านข้าง = แตะ'],
  capFirst:['先拔蓋子','Cap off first','ถอดฝาก่อน'],
  scoreT:['技術評分','Technique score','คะแนนเทคนิค'], scoreNote:['分數以第一次示範為準','The score counts your first demonstration','คะแนนนับจากการสาธิตครั้งแรก'],
};
const SIM_STEPS={
  mdi:[['cap',['拔掉蓋子','Cap off','ถอดฝาครอบ'],'🧢'],['shake',['上下搖勻（4 下）','Shake it (4×)','เขย่า (4 ครั้ง)'],'👋'],['out',['離開吸嘴，把氣吐乾淨','Breathe out fully, away from it','หายใจออกให้สุด ห่างจากกระบอก'],'😮‍💨'],
    ['lips',['吸嘴放進嘴裡、嘴唇包緊','Mouthpiece in, lips sealed','อมปากกระบอก ปิดริมฝีปาก'],'👄'],['press',['開始吸氣的同時按壓','Press as you start breathing in','กดพร้อมเริ่มหายใจเข้า'],'👆'],
    ['slow',['慢慢深吸 3–5 秒','Breathe in slowly, 3–5 s','สูดช้าๆ ลึกๆ 3–5 วินาที'],'🐢'],['hold',['閉氣數到 10','Hold for a count of 10','กลั้นหายใจนับถึง 10'],'⏱️'],['recap',['蓋回蓋子','Cap back on','ปิดฝาครอบ'],'🧢']],
  spacer:[['cap',['拔掉蓋子','Cap off','ถอดฝาครอบ'],'🧢'],['shake',['上下搖勻（4 下）','Shake it (4×)','เขย่า (4 ครั้ง)'],'👋'],['attach',['插進輔助器','Push it into the spacer','เสียบเข้ากระบอกช่วยสูด'],'🔌'],
    ['out',['離開吸嘴，把氣吐乾淨','Breathe out fully, away from it','หายใจออกให้สุด ห่างจากกระบอก'],'😮‍💨'],['lips',['含住輔助器的吸嘴','Lips on the spacer mouthpiece','อมปากกระบอกช่วยสูด'],'👄'],
    ['press',['按 1 下，把藥噴進輔助艙','Press once into the chamber','กด 1 ครั้งให้ยาเข้ากระบอก'],'👆'],['slow',['馬上慢慢深吸','Breathe in slowly, right away','สูดช้าๆ ลึกๆ ทันที'],'🐢'],['hold',['閉氣數到 10','Hold for a count of 10','กลั้นหายใจนับถึง 10'],'⏱️']],
  resp:[['turn',['蓋子蓋著，轉底座到「喀」','Cap closed: turn the base until it clicks','ปิดฝาไว้ หมุนฐานจนคลิก'],'🔄'],['open',['打開蓋子','Flip the cap open','เปิดฝา'],'🔓'],['out',['離開吸嘴，把氣吐乾淨','Breathe out fully, away from it','หายใจออกให้สุด ห่างจากกระบอก'],'😮‍💨'],
    ['lips',['含住吸嘴（不擋住通氣孔）','Lips on (vents uncovered)','อมปากกระบอก (ไม่บังรูอากาศ)'],'👄'],['press',['慢慢吸氣的同時按按鈕','Press the button as you breathe in','กดปุ่มพร้อมหายใจเข้า'],'👆'],
    ['slow',['慢慢深吸 3–5 秒','Breathe in slowly, 3–5 s','สูดช้าๆ ลึกๆ 3–5 วินาที'],'🐢'],['hold',['閉氣數到 10','Hold for a count of 10','กลั้นหายใจนับถึง 10'],'⏱️'],['close',['蓋上蓋子','Close the cap','ปิดฝา'],'🧢']],
};
const SIM_ERR={
  capOn:['蓋子還沒拔，按了藥也出不來','The cap was still on — no medicine could come out','ยังไม่ถอดฝา กดไปยาก็ไม่ออก'],
  noShake:['沒先搖勻：每一噴前都要上下搖 4–5 下','Not shaken: shake 4–5 times before every puff','ไม่ได้เขย่า: ต้องเขย่า 4–5 ครั้งก่อนพ่นทุกครั้ง'],
  noOut:['沒先吐氣：肺還是滿的，吸不深','Didn\'t breathe out first — lungs still full, so the breath in is shallow','ไม่ได้หายใจออกก่อน ปอดยังเต็มจึงสูดได้ไม่ลึก'],
  outIn:['對著吸嘴吐氣：濕氣會讓藥結塊，要先離開吸嘴再吐','Breathed out into the mouthpiece — moisture clogs it; turn away first','หายใจออกใส่ปากกระบอก ความชื้นทำให้ยาจับตัว ต้องหันออกก่อน'],
  air:['吸嘴不在嘴裡就按：藥全噴到空氣中','Pressed with the mouthpiece out of the mouth — the dose went into the air','กดตอนปากกระบอกไม่ได้อยู่ในปาก ยาพ่นไปในอากาศหมด'],
  early:['先按了才吸（跟李伯伯一樣）：藥打到喉嚨，咳出來了','Pressed first, breathed later (just like Uncle Lee) — the spray hit the throat','กดก่อนแล้วค่อยสูด (เหมือนลุงหลี่) ยาไปกระแทกคอแล้วไอออกหมด'],
  fast:['吸太快：藥撞在喉嚨，要慢慢吸 3–5 秒','Breathed in too fast — the drug hits the throat; take 3–5 s','สูดเร็วเกินไป ยาไปติดคอ ต้องสูดช้าๆ 3–5 วินาที'],
  short:['吸太短：要一口氣慢慢吸到底','Breath too short — keep breathing in until the lungs are full','สูดสั้นไป ต้องสูดช้าๆ จนเต็มปอด'],
  noHold:['沒有閉氣：吸完藥要閉氣約 10 秒，藥才留在肺裡','No breath-hold — after the dose, hold the breath about 10 s so the drug settles in the lungs','ไม่ได้กลั้นหายใจ หลังสูดยาต้องกลั้นราว 10 วินาทีให้ยาค้างในปอด'],
  noRecap:['用完沒蓋回蓋子','Cap not put back afterwards','ใช้เสร็จไม่ปิดฝาครอบ'],
  noDose:['還沒有成功吸進一劑藥','No dose actually reached the lungs','ยังไม่มียาเข้าปอดสักโดส'],
  openTurn:['蓋子打開才轉：要蓋著轉到「喀」一聲，再打開','Turned with the cap open — turn with the cap CLOSED until it clicks, then open','หมุนตอนเปิดฝา ต้องปิดฝาไว้แล้วหมุนจนคลิก แล้วค่อยเปิด'],
  noTurn:['沒先轉底座：按了什麼都沒噴出來（李伯伯的問題！）','Didn\'t turn the base — press and nothing comes out (Uncle Lee\'s problem!)','ไม่ได้หมุนฐานก่อน กดแล้วไม่มีอะไรออกมา (ปัญหาของลุงหลี่!)'],
  capShut:['蓋子沒打開就按：軟霧噴進蓋子裡','Pressed with the cap shut — the mist went into the cap','กดตอนยังไม่เปิดฝา ละอองพ่นเข้าฝา'],
  onePuff:['Spiolto 每次是 2 噴：整套動作要做兩次','Spiolto is 2 puffs: the whole routine twice','Spiolto ใช้ครั้งละ 2 พัฟ: ต้องทำทั้งขั้นตอน 2 รอบ'],
  noClose:['用完沒蓋上蓋子','Cap not closed afterwards','ใช้เสร็จไม่ปิดฝา'],
  noSpacer:['沒接上輔助器就按：藥噴到外面','Pressed without the spacer attached — the spray went outside','กดก่อนต่อกระบอกช่วยสูด ยาพ่นออกไปข้างนอก'],
  twoPuff:['一次只噴 1 下進輔助艙，吸完再噴下一下','One puff into the spacer at a time — breathe it in before the next','พ่นเข้ากระบอกทีละ 1 พัฟ สูดเสร็จก่อนค่อยพ่นครั้งต่อไป'],
  late:['噴進輔助艙後等太久：藥霧會沉到管壁上，要馬上吸','Waited too long after the puff — the mist settles on the walls; breathe in right away','รอนานเกินไปหลังพ่นเข้ากระบอก ละอองยาเกาะผนัง ต้องสูดทันที'],
};
/* ---- technique score (asked for by the course professor): 8 checklist steps per inhaler.
   A step scores if the FIRST demonstration has no mistake on it; each hint costs 1 point. ---- */
const INH_STEP_OF={capOn:'cap',capShut:'open',noShake:'shake',noOut:'out',outIn:'out',air:'lips',early:'press',twoPuff:'press',noDose:'press',onePuff:'press',fast:'slow',short:'slow',late:'slow',noHold:'hold',noRecap:'recap',noClose:'close',openTurn:'turn',noTurn:'turn',noSpacer:'attach'};
const INH_FLOW_OF={cap:'cap',shake:'shake',attach:'attach',out:'out',lips:'mouth',press:'press',slow:'in',hold:'hold',recap:'recap',turn:'turn',open:'open',close:'close'};   // checklist step → simulator action
/* a step is lost if a mistake was made on it, or if it was never done (ever = the actions done in this demonstration) */
function inhScore(dev, errs, hints, ever){ const st=SIM_STEPS[dev].map(x=>x[0]), done=ever?new Set(ever):null,
    bad=st.filter(k=>(errs||[]).some(e=>INH_STEP_OF[e]===k)||(done&&!done.has(INH_FLOW_OF[k]))), ok=st.length-bad.length;
  return {ok, max:st.length, hints:hints||0, pts:Math.max(0,ok-(hints||0)), bad}; }
const INH_DV=[['mdi','🔵'],['spacer','🫙'],['resp','🟢']], INH_PT=10;      // 10 game points per checklist step
const INH_T={tab:['吸入器衛教','Inhaler teaching','สอนใช้ยาพ่น'], tot:['吸入器技術總分','Inhaler technique total','คะแนนเทคนิคยาพ่นรวม'],
  h:['親手示範三種吸入器，每種 8 個步驟。第一次示範就做對的步驟才得分；每用一次提示扣 1 分。每 1 分＝遊戲分數 +10。','You demonstrated three inhalers, 8 steps each. A step scores only if it was right in your first demonstration; each hint costs 1 point. Each point = +10 game score.','สาธิตยาพ่น 3 แบบด้วยตัวเอง แบบละ 8 ขั้นตอน ได้คะแนนเฉพาะขั้นที่ทำถูกในการสาธิตครั้งแรก ใช้คำใบ้หนึ่งครั้งหัก 1 คะแนน · 1 คะแนน = +10 คะแนนเกม']};
function inhTotal(){ const sc=(S.inh&&S.inh.sc)||{}; return INH_DV.reduce((a,[d])=>a+((sc[d]&&sc[d].pts)||0),0); }
function inhMax(){ return INH_DV.reduce((a,[d])=>a+SIM_STEPS[d].length,0); }
function inhPoints(){ const i=S.inh; if(!i) return 0; return (i.rescue?25:0)+(i.sc?inhTotal()*INH_PT:[i.steps,i.order,i.dose].filter(Boolean).length*25); }
function inhPane(){ const sc=(S.inh&&S.inh.sc)||{};
  return `<style>.ihgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.ihc{background:#fff;border-radius:14px;padding:10px 12px;box-shadow:inset 0 0 0 2px #e6dff5}.ihc b{font-size:15px}.ihc .ihs{font-size:26px;font-weight:900;color:#2b6b2b;margin:2px 0 4px}.ihc .ihs small{font-size:14px;color:#a8620e}.ihc ul{margin:0;padding:0;list-style:none}.ihc li{font-size:14px;line-height:1.45}.ihc li.no{color:#b3261e;font-weight:800}</style>
    <p class="muted" style="margin:0 0 8px;font-size:14px">${esc(L(INH_T.h))}</p><div class="ihgrid">${INH_DV.map(([d])=>{ const r=sc[d];
      if(!r) return `<div class="ihc"><b>${esc(L(SIMX.hdr[d]))}</b><div class="ihs">—</div></div>`;
      return `<div class="ihc"><b>${esc(L(SIMX.hdr[d]))}</b><div class="ihs">${r.pts}/${r.max}${r.hints?` <small>💡 −${r.hints}</small>`:''}</div><ul>${SIM_STEPS[d].map(([k,l])=>`<li class="${r.bad.includes(k)?'no':'ok'}">${r.bad.includes(k)?'❌':'✅'} ${esc(L(l))}</li>`).join('')}</ul></div>`; }).join('')}</div>
    <p style="font-weight:900;margin:10px 0 0;font-size:17px">${esc(L(INH_T.tot))}: ${inhTotal()}/${inhMax()} → +${inhTotal()*INH_PT}</p>`; }
const SIM_O='#3a2e22';
function simDevSVG(dev){
  const O=SIM_O;
  /* Spiolto Respimat, drawn lying along +x with the mouthpiece tip at (0,0): green hinged cap · mouthpiece with air vents ·
     grey upper housing with the grey dose-release button and the safety catch · clear base with the cartridge inside.
     The simulator stands it upright (rotate -90) at home and lays it level at the mouth. */
  if(dev==='resp') return `<g class="sd-dev" data-dev="resp">
    <defs><linearGradient id="rsBody" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f5f7f9"/><stop offset=".5" stop-color="#dde2e7"/><stop offset="1" stop-color="#aab3bc"/></linearGradient>
      <linearGradient id="rsCap" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a6dd6e"/><stop offset=".55" stop-color="#6db33f"/><stop offset="1" stop-color="#4b8f2c"/></linearGradient>
      <linearGradient id="rsClear" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eef6fb" stop-opacity=".9"/><stop offset=".5" stop-color="#d4e5f1" stop-opacity=".55"/><stop offset="1" stop-color="#a9c4d8" stop-opacity=".8"/></linearGradient>
      <linearGradient id="rsCart" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eef0f2"/><stop offset=".5" stop-color="#bfc6cd"/><stop offset="1" stop-color="#8d969f"/></linearGradient></defs>
    <g data-p="base" class="sd-base">
      <path d="M-148 -38 H-228 Q-266 -38 -266 0 Q-266 38 -228 38 H-148 Z" fill="url(#rsClear)" stroke="${O}" stroke-width="4"/>
      <rect x="-252" y="-19" width="106" height="38" rx="11" fill="url(#rsCart)" stroke="#6c7680" stroke-width="2"/>
      <rect x="-252" y="-19" width="16" height="38" rx="6" fill="#7d8790" opacity=".8"/>
      <g class="sd-stripes"><path d="M-254 -29 H-160" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".85"/><path d="M-246 28 H-170" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".5"/></g>
      <path d="M-228 50 q24 10 48 0" stroke="${O}" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M-186 44 l6 6 l-8 3" stroke="${O}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
    <path d="M-150 -40 H-62 Q-42 -40 -38 -30 L-35 -26 V26 L-38 30 Q-42 40 -62 40 H-150 Z" fill="url(#rsBody)" stroke="${O}" stroke-width="4" stroke-linejoin="round" data-p="body"/>
    <path d="M-146 -31 H-62" stroke="#fff" stroke-width="3.5" stroke-linecap="round" opacity=".8" pointer-events="none"/>
    <rect x="-147" y="-11" width="100" height="22" rx="5" fill="#fff" stroke="#9aa3ab" stroke-width="1.5" pointer-events="none"/>
    <text x="-97" y="4.5" text-anchor="middle" font-size="10.5" font-weight="800" fill="#3d8a2a" font-family="sans-serif" pointer-events="none">Spiolto Respimat</text>
    <rect x="-158" y="22" width="12" height="18" rx="3" fill="#8b949d" stroke="${O}" stroke-width="2.5" data-p="body"/>
    <g data-p="btn" class="sd-btn"><rect x="-120" y="-53" width="52" height="16" rx="8" fill="#8f99a3" stroke="${O}" stroke-width="3.5"/><path d="M-108 -45 h28" stroke="#c9d0d6" stroke-width="3" stroke-linecap="round"/></g>
    <path d="M-36 -26 H-9 Q3 -26 3 -12 V12 Q3 26 -9 26 H-36 Z" fill="#eef1f4" stroke="${O}" stroke-width="3.5" stroke-linejoin="round" data-p="body"/>
    <rect x="-31" y="-22" width="12" height="5" rx="2" fill="#5b6570" pointer-events="none"/><rect x="-31" y="17" width="12" height="5" rx="2" fill="#5b6570" pointer-events="none"/>
    <g data-p="cap" class="sd-cap"><path d="M-46 -43 H-4 Q19 -43 19 -16 V16 Q19 43 -4 43 H-46 Q-52 43 -52 37 V-37 Q-52 -43 -46 -43 Z" fill="url(#rsCap)" stroke="${O}" stroke-width="4"/>
      <path d="M-40 -32 H-4" stroke="#dcf5c4" stroke-width="4" stroke-linecap="round" opacity=".85"/><circle cx="-46" cy="37" r="3.5" fill="${O}"/></g>
  </g>`;
  const mdi=`<g class="sd-mdi">
    <g data-p="can" class="sd-can"><rect x="-126" y="-292" width="54" height="120" rx="12" fill="#d5dbe2" stroke="${O}" stroke-width="5"/><rect x="-120" y="-280" width="12" height="96" rx="6" fill="#f3f6f9"/><rect x="-126" y="-206" width="54" height="16" fill="#aab3bd" stroke="${O}" stroke-width="3"/></g>
    <path d="M-136 -196 h74 v150 h56 q18 0 18 18 v44 q0 18 -18 18 h-112 q-18 0 -18 -18 Z" fill="#3a7cc4" stroke="${O}" stroke-width="5" stroke-linejoin="round" data-p="body"/>
    <path d="M-120 -170 v110" stroke="#9cc6ee" stroke-width="7" stroke-linecap="round" data-p="body"/>
    <rect x="-112" y="-120" width="34" height="26" rx="5" fill="#fff" stroke="${O}" stroke-width="3" data-p="body"/><text class="sd-cnt" x="-95" y="-101" text-anchor="middle" font-size="15" font-weight="900" fill="#c62828" font-family="sans-serif" data-p="body">12</text>
    <text x="-99" y="-140" text-anchor="middle" font-size="12.5" font-weight="900" fill="#fff" font-family="sans-serif" data-p="body">Berotec</text>
    <g data-p="cap" class="sd-cap"><path d="M-60 -54 h56 q32 0 32 48 q0 48 -32 48 h-56 Z" fill="#2c5f97" stroke="${O}" stroke-width="5"/><path d="M-46 -36 v58" stroke="#7fb1e3" stroke-width="6" stroke-linecap="round"/></g>
  </g>`;
  if(dev==='spacer') return `<g class="sd-dev" data-dev="spacer">
    <g class="sd-sp" data-p="spacer"><rect x="-330" y="-62" width="272" height="124" rx="56" fill="rgba(220,236,250,.75)" stroke="${O}" stroke-width="5"/>
      <path d="M-58 -26 h40 q14 0 14 14 v24 q0 14 -14 14 h-40 Z" fill="#f2c94c" stroke="${O}" stroke-width="5"/><rect x="-350" y="-40" width="26" height="80" rx="10" fill="#f2c94c" stroke="${O}" stroke-width="5"/>
      <g class="sd-chmist"></g><path d="M-300 -40 q130 -16 230 0" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".8"/></g>
    <g class="sd-mdiw">${mdi}</g></g>`;
  return `<g class="sd-dev" data-dev="mdi">${mdi}</g>`;
}
function simFaceSVG(){ const O=SIM_O, SK='#e2ab80', SH='#c08458', HR='#d2d5dc', HO='#6a6e7a', JK='#9a9560', JD='#7c7848';
  /* Uncle Lee, 88, in profile facing left (same look as his portrait: grey crew cut, white brows, olive jacket over a white shirt) */
  return `<g class="sd-face"><defs><linearGradient id="sdHair" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f2f3f6"/><stop offset="1" stop-color="#b9bcc6"/></linearGradient>
      <linearGradient id="sdJk" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#aaa56e"/><stop offset="1" stop-color="${JD}"/></linearGradient></defs>
    <path d="M396 600 C410 528 462 474 556 450 C600 440 650 438 704 442 C752 446 792 458 820 474 V600 Z" fill="url(#sdJk)" stroke="${O}" stroke-width="5" stroke-linejoin="round"/>
    <path d="M470 600 C488 532 530 484 588 456 C606 486 614 540 606 600 Z" fill="#fbf9f1" stroke="${O}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M588 456 C612 500 620 552 612 600" fill="none" stroke="${O}" stroke-width="4"/>
    <path d="M598 440 C640 428 696 430 732 446 L722 476 C686 462 640 460 606 468 Z" fill="${JD}" stroke="${O}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M556 520 C548 548 546 576 548 600" fill="none" stroke="#d8d2bf" stroke-width="3"/>
    <rect x="660" y="508" width="60" height="54" rx="6" fill="${JK}" stroke="${O}" stroke-width="3.5"/><path d="M660 524 h60" stroke="${O}" stroke-width="3"/><path d="M676 494 v32" stroke="#3d6fc0" stroke-width="5" stroke-linecap="round"/>
    <path d="M582 344 C586 380 584 414 594 452 C630 466 690 466 720 450 C716 404 720 330 744 268 L700 284 Z" fill="${SK}" stroke="${O}" stroke-width="4.5" stroke-linejoin="round"/>
    <path d="M600 352 C620 380 650 392 700 388" fill="none" stroke="${SH}" stroke-width="3" opacity=".7"/>
    <path d="M592 386 q-8 10 2 20" fill="none" stroke="${SH}" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M600 414 q22 8 48 4 M604 432 q24 8 52 2" fill="none" stroke="${SH}" stroke-width="3" stroke-linecap="round" opacity=".8"/>
    <path d="M600 96 C560 100 532 128 530 160 C528 178 524 190 521 200 C519 206 524 212 527 216 C520 232 504 248 490 262 C486 268 492 274 502 273 C508 273 514 271 518 274 C516 280 512 286 513 291 C514 295 518 297 517 299 C513 303 514 309 521 312 C526 314 527 318 524 324 C518 334 520 346 534 352 C552 360 572 362 588 360 L600 352 C630 340 652 324 664 304 C700 300 730 290 744 260 C760 220 750 150 712 116 C684 96 640 90 600 96 Z" fill="${SK}" stroke="${O}" stroke-width="5" stroke-linejoin="round"/>
    <path d="M664 304 C650 330 628 346 600 356 C632 352 656 336 664 304 Z" fill="${SH}" opacity=".45"/>
    <ellipse cx="578" cy="262" rx="24" ry="18" fill="#e8846e" opacity=".28"/>
    <path d="M538 166 q18 -7 36 -3 M536 180 q20 -7 40 -2" fill="none" stroke="${SH}" stroke-width="3" stroke-linecap="round"/>
    <path d="M506 262 C512 254 522 256 525 266 C523 271 516 273 510 271" fill="none" stroke="${SH}" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M524 266 C536 278 542 292 541 308" fill="none" stroke="${SH}" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M548 322 C558 336 570 344 584 348" fill="none" stroke="${SH}" stroke-width="3" stroke-linecap="round" opacity=".85"/>
    <path d="M546 214 C552 210 562 209 570 213 C564 220 554 221 546 216 Z" fill="#fff" stroke="${O}" stroke-width="2.5"/>
    <ellipse cx="550" cy="215" rx="4.5" ry="5" fill="#3a2414"/>
    <path d="M540 211 C550 204 564 204 574 211" fill="none" stroke="${O}" stroke-width="4" stroke-linecap="round"/>
    <path d="M546 226 C554 231 564 230 572 224" fill="none" stroke="${SH}" stroke-width="3" stroke-linecap="round"/>
    <path d="M580 208 l13 -5 M581 216 l13 1 M580 223 l12 6" stroke="${SH}" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M530 196 C542 184 568 182 592 190 C584 199 560 199 532 205 Z" fill="#eef0f4" stroke="${HO}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M540 194 l6 -5 M552 191 l5 -6 M564 190 l5 -6 M576 190 l4 -5" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M532 150 C534 112 570 86 624 84 C690 82 742 112 756 170 C764 210 758 250 746 280 C738 296 724 304 712 304 C712 280 700 262 690 250 C686 222 676 202 662 198 C650 196 640 202 634 212 C630 196 624 176 614 166 C590 158 560 160 532 150 Z" fill="url(#sdHair)" stroke="${HO}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M560 128 l8 -8 M590 112 l8 -8 M622 104 l7 -9 M656 104 l6 -9 M690 116 l6 -9 M718 136 l6 -8 M740 168 l7 -6 M742 206 l8 -4 M736 244 l8 -2 M610 140 l7 -8 M646 136 l6 -9 M682 146 l6 -8 M712 170 l6 -7 M716 214 l7 -4" stroke="#a6aab6" stroke-width="3" stroke-linecap="round"/>
    <path d="M664 214 C684 204 704 218 702 248 C702 272 690 290 670 288 C660 287 655 276 660 266 C664 258 666 252 662 244 C656 232 656 220 664 214 Z" fill="${SK}" stroke="${O}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M674 228 C688 230 692 248 682 262" fill="none" stroke="${SH}" stroke-width="3.5" stroke-linecap="round"/>
    <g class="sd-mouth"><path class="m-closed" d="M511 296 C516 299 521 299 526 296" stroke="#9a4a3a" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      <ellipse class="m-open" cx="516" cy="297" rx="8" ry="9" fill="#6a2230" stroke="${O}" stroke-width="3.5"/>
      <path class="m-seal" d="M526 278 q-20 18 0 38" stroke="#c0645a" stroke-width="9" fill="none" stroke-linecap="round"/></g>
    <g class="sd-throat"><path d="M528 300 q40 22 64 100" stroke="#ff8f7a" stroke-width="16" fill="none" stroke-linecap="round" opacity=".75"/></g>
    <text class="sd-bub" x="470" y="110" text-anchor="middle" font-size="34" font-weight="900" fill="#c0172f" font-family="sans-serif"></text>
    <text class="sd-count" x="545" y="578" text-anchor="middle" font-size="64" font-weight="900" fill="#3d7bff" stroke="#fff" stroke-width="6" paint-order="stroke" font-family="sans-serif"></text>
  </g>`; }
/* ===== v2: guided flow — one instruction at a time; in practice the part to touch glows and a hand points at it.
   Taps on the device (cap · canister · body · spacer · base · dose button) + four body buttons (shake · breathe out · breathe in · hold breath).
   The breath in is slow and automatic; the press must land in its first moment (green zone). ===== */
Object.assign(SIM_ERR,{
  late2:['按得太晚：氣快吸完才按，藥大多沒吸進去','Pressed too late — the breath was nearly over, so most of the dose missed','กดช้าไป หายใจเข้าเกือบสุดแล้วค่อยกด ยาเข้าไปได้น้อย'],
  noPress:['吸了氣卻沒按：這一口沒有藥','Breathed in but never pressed — that breath carried no medicine','สูดหายใจแต่ไม่ได้กด ลมหายใจนั้นไม่มียา'],
});
const FLOWX={
  shake:['👋 搖一搖','👋 Shake','👋 เขย่า'], out:['😮‍💨 吐氣','😮‍💨 Breathe out','😮‍💨 หายใจออก'], inn:['🌬️ 慢慢吸氣','🌬️ Breathe in slowly','🌬️ สูดหายใจช้าๆ'], hold:['🤐 閉氣','🤐 Hold breath','🤐 กลั้นหายใจ'],
  ph:['點一下','tap','แตะ'], step:['第 {i}/{n} 步','Step {i}/{n}','ขั้นที่ {i}/{n}'], now:['就是現在！','NOW!','ตอนนี้!'],
  exam:['照你教病人的方式，完整示範一次——沒有提示。','Demonstrate it the way you would teach a patient — no hints.','สาธิตให้ครบเหมือนที่สอนผู้ป่วย — ไม่มีคำใบ้'],
  finish:['✅ 示範完成','✅ Finish','✅ จบการสาธิต'], breath:['吸氣','Breath in','หายใจเข้า'], keep:['繼續按住，吐到肺空為止','Keep holding until the lungs are empty','กดค้างต่อจนปอดว่าง'],
  mouthFirst:['先把吸嘴放進嘴裡','Mouthpiece in first','อมปากกระบอกก่อน'], nothingHold:['還沒吸到藥，先不用閉氣','No dose in yet — nothing to hold','ยังไม่มียาเข้าไป ยังไม่ต้องกลั้น'],
  capFirst:['蓋子還沒拔','The cap is still on','ยังไม่ได้ถอดฝา'], openFirst:['先打開蓋子','Open the cap first','เปิดฝาก่อน'], noShakeR:['Respimat 不用搖','Respimat needs no shaking','Respimat ไม่ต้องเขย่า'],
  redo:['這一噴沒成功——從搖勻開始再做一次','That puff failed — start again from shaking','พัฟนี้ไม่สำเร็จ เริ่มใหม่ตั้งแต่เขย่า'], redoR:['這一噴沒成功——從轉底座開始再做一次','That puff failed — start again from turning the base','พัฟนี้ไม่สำเร็จ เริ่มใหม่ตั้งแต่หมุนฐาน'],
  inChamber:['輔助艙裡有藥霧：{s} 秒內吸進去','Mist in the chamber: breathe it in within {s} s','มีละอองยาในกระบอก: สูดภายใน {s} วินาที'], good:['好！藥進到肺裡了','Good — the dose reached the lungs','ดีมาก! ยาเข้าปอดแล้ว'],
  notNow:['先從嘴裡拿開再搖','Take it out of your mouth to shake it','เอาออกจากปากก่อนค่อยเขย่า'],
  puff2:['第 2 噴：整套再做一次！','Puff 2: the whole routine once more!','พัฟที่ 2: ทำทั้งชุดอีกรอบ!'],
  hintB:['💡 提示','💡 Hint','💡 คำใบ้'], next:['下一步呢？','what next?','ต่อไปทำอะไร?'], hintsUsed:['用了提示','Hints used','ใช้คำใบ้'],
  takeOut:['先從嘴裡拿出來','Take it out of his mouth first','เอาออกจากปากก่อน'], outAway:['別對著吸嘴吐氣！先拿開再吐','Not into the mouthpiece! Take it out, then breathe out','อย่าหายใจออกใส่ปากกระบอก! เอาออกก่อนแล้วค่อยหายใจออก'],
  holdNow:['嘴巴閉緊，點「閉氣」數到 10','Lips closed — tap "Hold breath" and count to 10','ปิดปากให้สนิท แตะ "กลั้นหายใจ" นับถึง 10'],
  puffOut:['（還沒閉氣就拿出來，一口氣吐掉了）','(taken out before holding — the breath came straight out)','(เอาออกก่อนกลั้นหายใจ ลมหายใจออกมาหมด)'],
  how:{mdi:['兩種操作：👆 點圖上有標籤的部位（蓋子、藥罐、吸入器）；右邊的按鈕控制李伯伯的呼吸。照你教病人的順序做，卡住了按「💡 提示」。','Two kinds of controls: 👆 tap the labelled parts of the picture (cap, canister, inhaler); the buttons on the right control Uncle Lee\'s breathing. Go in the order you would teach a patient; stuck? Tap "💡 Hint".','ควบคุมได้ 2 แบบ: 👆 แตะส่วนที่มีป้ายบนภาพ (ฝา กระป๋องยา ตัวยาพ่น) และปุ่มด้านขวาคุมการหายใจของลุง ทำตามลำดับที่จะสอนผู้ป่วย ติดตรงไหนกด "💡 คำใบ้"'],
    spacer:['兩種操作：👆 點圖上有標籤的部位（蓋子、藥罐、吸入器、輔助器）；右邊的按鈕控制呼吸。照你教病人的順序做，卡住了按「💡 提示」。','Two kinds of controls: 👆 tap the labelled parts of the picture (cap, canister, inhaler, spacer); the buttons on the right control breathing. Go in the order you would teach a patient; stuck? Tap "💡 Hint".','ควบคุมได้ 2 แบบ: 👆 แตะส่วนที่มีป้ายบนภาพ (ฝา กระป๋องยา ตัวยาพ่น กระบอกช่วยสูด) และปุ่มด้านขวาคุมการหายใจ ทำตามลำดับที่จะสอนผู้ป่วย ติดตรงไหนกด "💡 คำใบ้"'],
    resp:['兩種操作：👆 點圖上有標籤的部位（綠色蓋子、透明底座、灰色按鈕、吸入器）；右邊的按鈕控制呼吸。要做 2 噴，卡住了按「💡 提示」。','Two kinds of controls: 👆 tap the labelled parts of the picture (green cap, clear base, grey button, inhaler); the buttons on the right control breathing. Two puffs; stuck? Tap "💡 Hint".','ควบคุมได้ 2 แบบ: 👆 แตะส่วนที่มีป้ายบนภาพ (ฝาเขียว ฐานใส ปุ่มเทา ตัวยาพ่น) และปุ่มด้านขวาคุมการหายใจ ต้องทำ 2 พัฟ ติดตรงไหนกด "💡 คำใบ้"']},
  pic:['👆 點圖：吸入器','👆 Tap the picture: the inhaler','👆 แตะที่ภาพ: ยาพ่น'], btns:['按鈕：李伯伯的呼吸','Buttons: Uncle Lee\'s breathing','ปุ่ม: การหายใจของลุง'],
};
const SIM_TAG={cap:['蓋子','cap','ฝา'], can:['藥罐（按）','canister (press)','กระป๋องยา (กด)'], body:['吸入器（含住／拿出）','inhaler (in / out of mouth)','ตัวยาพ่น (อม / เอาออก)'], bodyS:['吸入器（插進輔助器）','inhaler (into the spacer)','ตัวยาพ่น (เสียบกระบอก)'],
  sp:['輔助器（含住／拿出）','spacer (in / out of mouth)','กระบอกช่วยสูด (อม / เอาออก)'], capG:['綠色蓋子（開／關）','green cap (open / close)','ฝาเขียว (เปิด / ปิด)'], base:['透明底座（轉）','clear base (turn)','ฐานใส (หมุน)'], btn:['灰色按鈕（按）','grey button (press)','ปุ่มเทา (กด)']};
/* which parts get a label, where the label sits (b below · t above · l left · r right) and when it shows */
const SIM_TAGS={mdi:[['.sd-cap','cap','b',s=>!s.atMouth],['.sd-can','can','t'],['path[data-p="body"]','body','l']],
  spacer:[['.sd-cap','cap','b',s=>!s.atMouth],['.sd-can','can','t'],['.sd-mdi path[data-p="body"]','bodyS','l',s=>!s.attached],['.sd-sp rect','sp','b']],
  resp:[['.sd-cap','capG','r',s=>!s.atMouth],['.sd-base','base','b',s=>!s.atMouth],['.sd-btn','btn','t'],['path[data-p="body"]','body','b']]};
const DIDX={cap:['拔掉蓋子','Cap off','ถอดฝาแล้ว'], shake:['搖勻了','Shaken','เขย่าแล้ว'], attach:['裝上輔助器','Spacer fitted','ต่อกระบอกช่วยสูดแล้ว'], out:['吐完氣','Breathed out','หายใจออกแล้ว'], mouth:['含住吸嘴','Mouthpiece in','อมปากกระบอกแล้ว'],
  in:['開始吸氣','Breathing in','เริ่มสูดหายใจ'], press:['藥吸進去了','Dose breathed in','ยาเข้าไปแล้ว'], hold:['閉氣 10 秒','Breath held','กลั้นหายใจแล้ว'], remove:['從嘴裡拿出來','Out of his mouth','เอาออกจากปากแล้ว'],
  recap:['蓋回蓋子','Cap on','ปิดฝาแล้ว'], turn:['底座轉好了','Base turned','หมุนฐานแล้ว'], open:['打開蓋子','Cap open','เปิดฝาแล้ว'], close:['蓋上蓋子','Cap closed','ปิดฝาแล้ว'],
  spPress:['藥霧噴進輔助艙','Puff in the chamber','ละอองยาเข้ากระบอกแล้ว'], spIn:['把藥霧吸進去了','Mist breathed in','สูดละอองยาแล้ว']};
const FLOW={ mdi:['cap','shake','out','mouth','in','press','hold','remove','recap'], spacer:['cap','shake','attach','out','mouth','press','in','hold','remove'], resp:['turn','open','out','mouth','in','press','hold','remove','close'] };
const FLOW_T={
  cap:['點一下藍色蓋子，把它拔掉','Tap the blue cap to take it off','แตะฝาสีน้ำเงินเพื่อถอดออก','🧢'],
  shake:['按「搖一搖」：每一噴前都要搖勻','Press "Shake" — shake well before every puff','กด "เขย่า" — ต้องเขย่าก่อนพ่นทุกครั้ง','👋'],
  attach:['點輔助器，把吸入器插進去','Tap the spacer to fit the inhaler into it','แตะกระบอกช่วยสูดเพื่อเสียบยาพ่นเข้าไป','🔌'],
  out:['點「吐氣」，把氣吐乾淨（臉別對著吸嘴）','Tap "Breathe out" to empty the lungs (face away from the mouthpiece)','แตะ "หายใจออก" ให้ลมออกจนสุด (หันหน้าออกจากปากกระบอก)','😮‍💨'],
  mouth:{mdi:['點吸入器：吸嘴放進嘴裡、嘴唇包緊','Tap the inhaler: mouthpiece in, lips sealed','แตะยาพ่น: อมปากกระบอก ปิดริมฝีปากให้สนิท','👄'], spacer:['點輔助器：含住它的吸嘴','Tap the spacer: lips around its mouthpiece','แตะกระบอกช่วยสูด: อมปากกระบอกของมัน','👄'], resp:['點吸入器：含住吸嘴，別擋住通氣孔','Tap the inhaler: lips on, air vents uncovered','แตะยาพ่น: อมปากกระบอก อย่าบังรูอากาศ','👄']},
  in:{mdi:['按「慢慢吸氣」——氣一開始吸，就要按藥罐！','Press "Breathe in slowly" — then press the canister as soon as the breath starts!','กด "สูดหายใจช้าๆ" — แล้วกดกระป๋องยาทันทีที่เริ่มสูด!','🌬️'], spacer:['馬上按「慢慢吸氣」，把輔助艙裡的藥霧吸進去','Right away, press "Breathe in slowly" to breathe the mist in','รีบกด "สูดหายใจช้าๆ" สูดละอองยาในกระบอกเข้าไป','🌬️'], resp:['按「慢慢吸氣」——氣一開始吸，就按綠色按鈕！','Press "Breathe in slowly" — then press the green button as soon as the breath starts!','กด "สูดหายใจช้าๆ" — แล้วกดปุ่มสีเขียวทันทีที่เริ่มสูด!','🌬️']},
  press:{mdi:['就是現在！點藥罐按下去','Now! Tap the canister to press it','ตอนนี้เลย! แตะกระป๋องยาเพื่อกด','👆'], spacer:['點藥罐按 1 下：藥霧噴進輔助艙','Tap the canister once — the puff fills the chamber','แตะกระป๋องยา 1 ครั้ง ละอองยาจะเข้าไปในกระบอก','👆'], resp:['就是現在！點灰色按鈕','Now! Tap the grey dose button','ตอนนี้เลย! แตะปุ่มสีเทา','👆']},
  hold:['點「閉氣」數到 10：含著吸入器，或拿出來閉緊嘴巴都可以','Tap "Hold breath" for a count of 10 — with the mouthpiece still in, or taken out with lips closed','แตะ "กลั้นหายใจ" นับถึง 10 จะอมไว้หรือเอาออกแล้วปิดปากให้สนิทก็ได้','🤐'],
  recap:['點蓋子，把它蓋回去','Tap the cap to put it back on','แตะฝาเพื่อปิดกลับ','🧢'],
  remove:{mdi:['閉完氣，點吸入器把它從嘴裡拿出來','Breath held — tap the inhaler to take it out of his mouth','กลั้นหายใจแล้ว แตะยาพ่นเพื่อเอาออกจากปาก','👋'], spacer:['閉完氣，點輔助器把它從嘴裡拿出來','Breath held — tap the spacer to take it out of his mouth','กลั้นหายใจแล้ว แตะกระบอกช่วยสูดเพื่อเอาออกจากปาก','👋'], resp:['閉完氣，點吸入器把它從嘴裡拿出來（下一噴要先蓋上、再轉底座）','Breath held — tap the inhaler to take it out of his mouth (the next puff starts with the cap closed and a turn)','กลั้นหายใจแล้ว แตะยาพ่นเพื่อเอาออกจากปาก (พัฟต่อไปต้องปิดฝาแล้วหมุนฐานใหม่)','👋']},
  turn:['蓋子蓋著，點透明底座：轉半圈到「喀」','Cap closed: tap the clear base to turn it until it clicks','ปิดฝาไว้ แตะฐานใสเพื่อหมุนจนได้ยินเสียงคลิก','🔄'],
  open:['點綠色蓋子，把它完全打開','Tap the green cap to flip it fully open','แตะฝาสีเขียวเพื่อเปิดให้สุด','🔓'],
  close:['點蓋子蓋上','Tap the cap to close it','แตะฝาเพื่อปิด','🧢'],
};
function inhSim(dev){
  if(!$('#isimCss2')){ const st=document.createElement('style'); st.id='isimCss2'; st.textContent=`
#isim{position:absolute;left:34px;right:34px;top:94px;bottom:16px;z-index:24;display:flex;flex-direction:column;background:rgba(255,255,255,.98);border-radius:28px;padding:12px 16px;box-shadow:0 0 0 5px #fff,0 0 0 10px #8c9a3e,0 16px 40px rgba(0,0,0,.35);animation:enterC .4s cubic-bezier(.2,1.2,.4,1);-webkit-user-select:none;user-select:none}
#isim .is-head{display:flex;gap:14px;align-items:center;background:linear-gradient(90deg,#f3f1dc,#fff1dc);border-radius:18px;padding:8px 14px;min-height:64px}
#isim .is-head .no{flex:0 0 auto;background:#6b7a2a;color:#fff;font-weight:900;border-radius:14px;padding:6px 12px;font-size:18px}
#isim .is-head .sn{flex:0 0 auto;font-weight:900;font-size:16px;color:#6b7a2a;background:#fff;border-radius:99px;padding:4px 12px;box-shadow:inset 0 0 0 2px #d9dcb0}
#isim .is-head .sn:empty{display:none}
#isim .is-head .tx{flex:1;font-family:var(--tc);font-weight:900;font-size:26px;line-height:1.3;color:#3b3a12}
#isim .is-head .pf:empty{display:none}
#isim .is-head .pf{flex:0 0 auto;font-weight:900;font-size:20px;color:#2d7a3d;background:#e7f8ec;border-radius:12px;padding:4px 12px}
#isim .is-body{flex:1;display:flex;gap:12px;min-height:0;margin-top:10px}
#isim .is-bench{flex:1;position:relative;border-radius:20px;background:linear-gradient(180deg,#eef6ff 0,#f8fbff 62%,#efe2c8 62%,#e7d4b0 100%);overflow:hidden;min-width:0}
#isim .is-bench svg{position:absolute;inset:0;width:100%;height:100%;display:block}
#isim .is-hint{position:absolute;left:50%;bottom:12px;transform:translateX(-50%);background:rgba(59,58,18,.88);color:#fff;font-weight:900;font-size:22px;border-radius:99px;padding:8px 20px;white-space:nowrap;pointer-events:none;transition:opacity .3s;z-index:3}
#isim .is-hint:empty{opacity:0}
#isim .is-side{width:250px;flex:0 0 auto;display:flex;flex-direction:column;gap:10px}
#isim .is-meter{height:150px;flex:0 0 auto;display:flex;gap:10px;background:#f4f7fb;border-radius:18px;padding:8px}
#isim .lung{flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;font-weight:900;font-size:15px;color:#4a4560}
#isim .lung .tube{position:relative;flex:1;width:70px;border-radius:24px;background:#fff;box-shadow:inset 0 0 0 4px #c9d3e0;overflow:hidden}
#isim .lung .tube b{position:absolute;left:0;right:0;bottom:0;background:linear-gradient(180deg,#8fd0ff,#3d7bff);transition:height .1s linear}
#isim .is-btn{position:relative;border-radius:18px;padding:12px 10px;font-weight:900;font-size:22px;color:#fff;background:linear-gradient(180deg,#7ab8ff,#3d7bff);box-shadow:0 5px 0 #2856b8;touch-action:none;overflow:hidden;line-height:1.2}
#isim .is-btn small{display:block;font-size:14px;opacity:.9;font-weight:800}
#isim .is-btn.sh{background:linear-gradient(180deg,#ffc56b,#ff9d1f);box-shadow:0 5px 0 #c26f00}
#isim .is-btn.in{background:linear-gradient(180deg,#6fe0c8,#13a39a);box-shadow:0 5px 0 #0b766f}
#isim .is-btn.hold{background:linear-gradient(180deg,#b9a6ff,#7b61ff);box-shadow:0 5px 0 #5a43d6}
#isim .is-btn.on{transform:translateY(4px);box-shadow:0 1px 0 rgba(0,0,0,.3)}
#isim .is-btn .pg{position:absolute;left:0;bottom:0;height:7px;background:#fff;opacity:.9}
#isim .fg-glow{animation:fgGlow 1s ease-in-out infinite}
#isim .is-btn.fg-glow{animation:fgGlowB 1s ease-in-out infinite}
#isim .fg-hand{position:absolute;z-index:6;font-size:54px;pointer-events:none;filter:drop-shadow(0 4px 4px rgba(0,0,0,.3));animation:fgHand .8s ease-in-out infinite;transition:left .35s,top .35s}
#isim .fg-hand.hidden{display:none}
#isim .sd-tag{position:absolute;z-index:4;pointer-events:none;transform:translate(-50%,-50%);background:rgba(255,255,255,.93);border:2px dashed #8c9a3e;border-radius:99px;padding:3px 11px;font-weight:900;font-size:17px;line-height:1.25;color:#4a4a12;white-space:nowrap;box-shadow:0 2px 6px rgba(0,0,0,.12)}
#isim .sd-tag.hidden{display:none}
#isim .sd-tag.flash{animation:tagF .45s ease-in-out 4 alternate}
@keyframes tagF{from{transform:translate(-50%,-50%) scale(1)}to{transform:translate(-50%,-50%) scale(1.15);background:#fff6c8;border-color:#ffb300}}
#isim .is-cap{position:absolute;left:12px;bottom:12px;z-index:2;font-weight:900;font-size:16px;color:#6b7a2a;background:rgba(255,255,255,.85);border-radius:10px;padding:3px 10px;pointer-events:none}
#isim .is-capb{font-weight:900;font-size:15px;color:#3d5f9a;margin:2px 2px -4px}
#isim .fg-tm{position:absolute;left:24px;right:24px;top:14px;z-index:3;pointer-events:none;display:flex;align-items:center;gap:10px;font-weight:900;font-size:20px;color:#0b766f}
#isim .fg-tm.hidden{display:none}
#isim .fg-tm .bar{position:relative;flex:1;height:30px;border-radius:99px;background:#fff;box-shadow:inset 0 0 0 3px #b9e6dc;overflow:hidden}
#isim .fg-tm .gz{position:absolute;left:0;top:0;bottom:0;background:#9df0c4}
#isim .fg-tm .gz b{position:absolute;left:8px;top:2px;font-size:16px;color:#0b6b3a;white-space:nowrap;animation:gzP .55s ease-in-out infinite alternate}
@keyframes gzP{from{transform:scale(1)}to{transform:scale(1.12)}}
#isim .fg-tm .mk{position:absolute;top:-4px;bottom:-4px;width:8px;border-radius:4px;background:#13a39a;left:0}
#isim .is-sum{position:absolute;inset:0;z-index:7;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.9);border-radius:20px}
#isim .is-sum .card{width:min(760px,92%);background:#fff;border-radius:22px;padding:18px 24px;box-shadow:0 0 0 4px #8c9a3e,0 12px 30px rgba(0,0,0,.2)}
#isim .is-sum h3{margin:0 0 10px;font-family:var(--tc);font-size:28px}
#isim .is-sum li{font-size:19px;line-height:1.45;margin:4px 0;font-weight:700}
#isim .is-score{margin:0 0 8px;padding:8px 12px;border-radius:14px;background:#f3faf0;box-shadow:inset 0 0 0 2px #cfe8c4}
#isim .is-score b{font-size:22px;color:#2b6b2b}#isim .is-score small{font-size:15px;color:#a8620e;font-weight:800;margin-left:6px}
#isim .is-score ul{display:grid;grid-template-columns:1fr 1fr;gap:0 16px;margin:6px 0 0;padding:0;list-style:none}
#isim .is-score li{font-size:16px;margin:1px 0;font-weight:700}#isim .is-score li.no{color:#b3261e}
#isim .is-sum .act{display:flex;gap:12px;justify-content:flex-end;margin-top:12px}
#isim [data-p]{cursor:pointer}
#isim .sd-cap{transition:opacity .3s}
#isim .sd-mouth .m-open,#isim .sd-mouth .m-seal{display:none}
#isim .face-open .sd-mouth .m-closed,#isim .face-seal .sd-mouth .m-closed{display:none}
#isim .face-open .sd-mouth .m-open{display:inline}
#isim .face-seal .sd-mouth .m-seal{display:inline}
#isim .face-cough .sd-face{animation:hitShake .4s}
#isim .sd-throat{opacity:0;transition:opacity .3s}
#isim .throat-hit .sd-throat{opacity:1}
#isim .mist circle{fill:#fff;stroke:#9fc3dc;stroke-width:2}
@keyframes fgGlow{0%,100%{filter:drop-shadow(0 0 0 rgba(255,196,0,0))}50%{filter:drop-shadow(0 0 14px #ffc400) drop-shadow(0 0 6px #ffc400)}}
@keyframes fgGlowB{0%,100%{box-shadow:0 5px 0 rgba(0,0,0,.25),0 0 0 0 rgba(255,196,0,.9)}50%{box-shadow:0 5px 0 rgba(0,0,0,.25),0 0 0 8px rgba(255,196,0,.9)}}
@keyframes fgHand{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
#isim .fg-hand.side{animation-name:fgHandX}
#isim .is-head .tx.how{font-size:20px;color:#55541f}
#isim .is-hb{font-size:20px;padding:10px 8px}
#isim .is-hb.nudge{animation:fgNudge .6s ease-in-out infinite alternate}
#isim .is-hn{margin:10px 0 0;font-weight:800;font-size:18px;color:#8a6a1a}
@keyframes fgNudge{from{transform:scale(1);filter:drop-shadow(0 0 0 rgba(255,196,0,0))}to{transform:scale(1.07);filter:drop-shadow(0 0 10px #ffc400)}}
@keyframes fgHandX{0%,100%{transform:translateX(0)}50%{transform:translateX(-12px)}}
@keyframes hitShake{0%,100%{transform:none}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}`; document.head.appendChild(st); }
  return new Promise(res=>{
    const ex=EXAM(), order=FLOW[dev], T=k=>{ const v=FLOW_T[k]; return Array.isArray(v)?v:v[dev]; };
    let host=$('#isim'); if(!host){ host=document.createElement('div'); host.id='isim'; $('#stage').appendChild(host); }
    host.innerHTML=`<div class="is-head"><span class="no">${esc(L(SIMX.hdr[dev]))}</span><span class="sn" id="simSn"></span><span class="tx" id="simTx"></span><span class="pf" id="simPf"></span></div>
      <div class="is-body"><div class="is-bench" id="simBench"><svg id="simSvg" viewBox="0 0 820 600" preserveAspectRatio="xMidYMid meet">${simFaceSVG()}<g id="simDevG">${simDevSVG(dev)}</g><g id="simFx" style="pointer-events:none"></g></svg><div id="simTags"></div><div class="is-cap">${esc(L(FLOWX.pic))}</div>
          <div class="fg-tm hidden" id="simTm"><span>🌬️ ${esc(L(FLOWX.breath))}</span><div class="bar"><div class="gz" id="simGz"><b>👆 ${esc(L(FLOWX.now))}</b></div><i class="mk" id="simMk"></i></div></div><div class="is-hint" id="simHint"></div></div>
        <div class="is-side"><div class="is-meter"><div class="lung"><span>🫁 ${esc(L(SIMX.lungs))}</span><div class="tube"><b id="simLung"></b></div></div></div>
          <div class="is-capb">${esc(L(FLOWX.btns))}</div><button class="is-btn sh" id="simShake">${esc(L(FLOWX.shake))}</button>
          <button class="is-btn" id="simOut">${esc(L(FLOWX.out))}<small>${esc(L(FLOWX.ph))}</small><span class="pg"></span></button>
          <button class="is-btn in" id="simIn">${esc(L(FLOWX.inn))}</button>
          <button class="is-btn hold" id="simHold">${esc(L(FLOWX.hold))}<small>${esc(L(FLOWX.ph))}</small><span class="pg"></span></button>
          ${ex?'':`<button class="gbtn gold is-hb" id="simHintBtn" style="margin-top:auto">${esc(L(FLOWX.hintB))}</button>`}<button class="gbtn green" id="simDone" style="font-size:19px;padding:10px 8px;${ex?'margin-top:auto':''}">${esc(L(FLOWX.finish))}</button></div></div>
      <div class="fg-hand hidden" id="simHand">👆</div>`;
    host.classList.remove('hidden'); typeof audioDuck==='function'&&audioDuck(1); host.style.animation='none'; void host.offsetWidth; host.style.animation='';
    const svg=$('#simSvg'), devG=$('#simDevG'), fx=$('#simFx'), bench=$('#simBench');
    const MOUTH={x:516,y:296}, SOCK=326, HOME={mdi:{x:250,y:430}, spacer:{x:170,y:250}, resp:{x:250,y:178}}[dev], SP_HOME={x:540,y:480};
    const WIN=ex?(dev==='resp'?3.4:3.0):(dev==='resp'?4.0:3.5), INHALE=7.0;   // seconds: a slow 7-second breath; the press must land in its first part
    let tries=0, allErrs=[], firstErrs=null, firstSc=null, hint0=0, finished=false, raf=0, s, timers=[], hintsN=0, idleT=0;
    const later=(fn,ms)=>{ const t=setTimeout(()=>{ if(!finished) fn(); },ms); timers.push(t); return t; };
    const reset=()=>{ timers.forEach(clearTimeout); timers=[]; cancelAnimationFrame(raf);
      s={capOn:dev!=='resp', capOpen:false, shaken:false, attached:false, exhaled:false, atMouth:false, inhaling:false, t0:0, pressed:false, good:false, held:false,
         turned:false, chamber:0, chamberN:0, puffs:0, puffNo:1, lungs:.55, busy:false, ever:new Set(), pos:{...HOME}, sp:{...SP_HOME}, done:new Set(), errs:new Set(), bubT:0, hintOn:null, hinted:new Set(), last:null, miss:0};
      hint0=hintsN; devG.innerHTML=simDevSVG(dev); wire(); draw(); guide(); idle(); };
    const nudge=on=>{ const b=$('#simHintBtn'); if(b) b.classList.toggle('nudge',!!on); };
    const idle=()=>{ clearTimeout(idleT); if(!ex) idleT=later(()=>nudge(1),15000); };
    const err=(k,soft)=>{ if(!s.errs.has(k)){ s.errs.add(k); if(!ex&&!soft) toast('⚠️ '+L(SIM_ERR[k])); } sfx.error(); if(++s.miss>=2) nudge(1); };
    const mark=k=>{ s.ever.add(k); if(!s.done.has(k)){ s.last=k; s.miss=0; nudge(0); idle(); } s.done.add(k); guide(); };
    const unmark=(...ks)=>{ ks.forEach(k=>s.done.delete(k)); guide(); };
    const bub=(t,ms)=>{ const b=svg.querySelector('.sd-bub'); b.textContent=t; clearTimeout(s.bubT); s.bubT=setTimeout(()=>{ b.textContent=''; },ms||1600); };
    const hint=t=>{ $('#simHint').textContent=t||''; };
    const ip=()=>dev==='spacer'?(s.attached?{x:s.sp.x-SOCK,y:s.sp.y}:s.pos):s.pos;      // inhaler origin (= its mouthpiece)
    function draw(){
      if(dev==='spacer'){ devG.querySelector('.sd-sp').setAttribute('transform',`translate(${s.sp.x},${s.sp.y})`); devG.querySelector('.sd-mdiw').setAttribute('transform',`translate(${ip().x},${ip().y})`); }
      else if(dev==='resp'){ const D0=Math.hypot(HOME.x-MOUTH.x,HOME.y-MOUTH.y), k=Math.max(0,Math.min(1,Math.hypot(s.pos.x-MOUTH.x,s.pos.y-MOUTH.y)/D0));   // upright at home, level at the mouth
        devG.querySelector('.sd-dev').setAttribute('transform',`translate(${s.pos.x},${s.pos.y}) rotate(${(-90*k).toFixed(1)}) scale(1.15)`); }
      else devG.querySelector('.sd-dev').setAttribute('transform',`translate(${s.pos.x},${s.pos.y})`);
      const cap=devG.querySelector('.sd-cap');
      if(dev==='resp') cap.setAttribute('transform',s.capOpen?'rotate(118 -46 37)':'');
      else { const p=ip(); cap.setAttribute('transform',s.capOn?'':`translate(${76-p.x},${548-p.y})`); }
      bench.classList.toggle('face-seal',s.atMouth); $('#simLung').style.height=Math.round(s.lungs*100)+'%';
      tags();
    }
    function tags(){ const box=$('#simTags'); if(!box) return; const br=bench.getBoundingClientRect(); if(!br.width) return; const k=br.width/bench.offsetWidth;
      if(!box.children.length) box.innerHTML=SIM_TAGS[dev].map(([,t])=>`<div class="sd-tag hidden">👆 ${esc(L(SIM_TAG[t]))}</div>`).join('');
      SIM_TAGS[dev].forEach(([sel,,side,when],i)=>{ const el=devG.querySelector(sel), tg=box.children[i]; if(!el||!tg) return;
        const r=el.getBoundingClientRect(); if(!r.width||(when&&!when(s))){ tg.classList.add('hidden'); return; } tg.classList.remove('hidden');
        const x=(r.left-br.left)/k, y=(r.top-br.top)/k, w=r.width/k, h=r.height/k, tw=tg.offsetWidth/2+8, th=tg.offsetHeight/2+6;
        const p=side==='t'?[x+w/2,y-th]:side==='l'?[x-tw,y+h/2]:side==='r'?[x+w+tw,y+h/2]:[x+w/2,y+h+th];
        tg.style.left=Math.max(tw-4,Math.min(bench.offsetWidth-tw+4,p[0]))+'px'; tg.style.top=Math.max(th,Math.min(bench.offsetHeight-th,p[1]))+'px'; }); }
    function tween(get,set,to,ms,done){ const from={...get()}, t0=performance.now(); s.busy=true;
      const f=now=>{ const k=Math.min(1,(now-t0)/ms), e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2; set({x:from.x+(to.x-from.x)*e,y:from.y+(to.y-from.y)*e}); draw(); if(k<1) raf=requestAnimationFrame(f); else { s.busy=false; done&&done(); } }; raf=requestAnimationFrame(f); }
    function mist(kind){ const t=kind==='chamber'?{x:s.sp.x-300,y:s.sp.y}:dev==='spacer'?s.sp:s.pos, g=document.createElementNS('http://www.w3.org/2000/svg','g'); g.setAttribute('class','mist'); fx.appendChild(g);
      for(let i=0;i<10;i++){ const c=document.createElementNS('http://www.w3.org/2000/svg','circle'); c.setAttribute('r',String(8+Math.random()*10)); c.setAttribute('cx',String(t.x-6)); c.setAttribute('cy',String(t.y+(Math.random()*20-10))); g.appendChild(c);
        const dx=kind==='air'?-40-Math.random()*80:kind==='chamber'?30+Math.random()*220:30+Math.random()*60, dy=kind==='air'?-80-Math.random()*60:kind==='lungs'?60+Math.random()*90:kind==='throat'?20:(Math.random()*30-15);
        c.animate([{transform:'translate(0,0)',opacity:.95},{transform:`translate(${dx}px,${dy}px)`,opacity:0}],{duration:kind==='chamber'?2400:900+Math.random()*500,easing:'ease-out',fill:'forwards'}); }
      setTimeout(()=>g.remove(),2600); if(!(dev==='spacer'&&kind==='lungs')) dev==='resp'?sfx.mist():sfx.puff(); }
    const cough=()=>{ bench.classList.add('throat-hit','face-cough'); bub(L(SIMX.cough)); sfx.cough&&sfx.cough(1); setTimeout(()=>bench.classList.remove('throat-hit','face-cough'),900); };
    // ---------- guidance (practice): instruction + glow + pointing hand ----------
    const targetOf=k=>({cap:'.sd-cap',recap:'.sd-cap',open:'.sd-cap',close:'.sd-cap',turn:'.sd-base',attach:'.sd-sp rect',mouth:dev==='spacer'?'.sd-sp rect':'[data-p="body"]',remove:dev==='spacer'?'.sd-sp rect':'[data-p="body"]',press:dev==='resp'?'.sd-btn':'.sd-can'})[k];
    const btnOf=k=>({shake:'#simShake',out:'#simOut',in:'#simIn',hold:'#simHold'})[k];
    const did=k=>dev==='spacer'&&k==='press'?DIDX.spPress:dev==='spacer'&&k==='in'?DIDX.spIn:DIDX[k];
    const tx=(t,how)=>{ const e=$('#simTx'); e.textContent=t; e.classList.toggle('how',!!how); };
    function guide(){
      host.querySelectorAll('.fg-glow').forEach(e=>e.classList.remove('fg-glow')); const hd=$('#simHand'); hd.classList.add('hidden');
      const nx=order.find(k=>!s.done.has(k)), i=nx?order.indexOf(nx)+1:order.length;
      $('#simPf').textContent=dev==='resp'?L(SIMX.puff).replace('{n}',s.puffNo)+' / 2':'';
      if(ex){ $('#simSn').textContent=''; tx(L(SIMX.task[dev])+' '+L(FLOWX.exam)); return; }
      $('#simSn').textContent=L(FLOWX.step).replace('{i}',i).replace('{n}',order.length);
      if(!nx){ tx(L(FLOWX.good)); const hb=$('#simHintBtn'); if(hb) nudge(0); return; }
      if(s.hintOn!==nx){ if(s.last) tx('✓ '+L(did(s.last))+' — '+L(FLOWX.next)); else if(s.puffNo>1) tx(L(FLOWX.puff2)); else tx(L(FLOWX.how[dev]),1); return; }
      const t=T(nx); tx('💡 '+t[3]+' '+L(t));
      const el=btnOf(nx)?$(btnOf(nx)):devG.querySelector(targetOf(nx));
      if(!el) return;
      const g=btnOf(nx)?el:(el.closest('g[data-p]')||el); g.classList.add('fg-glow');
      requestAnimationFrame(()=>{ const r=el.getBoundingClientRect(), hr=host.getBoundingClientRect(), k=hr.width/host.offsetWidth;
        if(!r.width) return; hd.classList.remove('hidden'); const sb=el.classList.contains('is-btn');
        hd.textContent=sb?'👉':'👆'; hd.classList.toggle('side',sb);
        if(sb){ hd.style.left=((r.left-hr.left)/k-66)+'px'; hd.style.top=((r.top-hr.top)/k+r.height/k/2-34)+'px'; }
        else { hd.style.left=((r.left-hr.left)/k+r.width/k/2-24)+'px'; hd.style.top=((r.bottom-hr.top)/k-4)+'px'; } });
    }
    function showHint(){ if(finished) return; const nx=order.find(k=>!s.done.has(k)); if(!nx) return; sfx.click(); const key=s.puffNo+':'+nx; if(!s.hinted.has(key)){ s.hinted.add(key); hintsN++; } s.hintOn=nx; nudge(0); guide(); }
    // ---------- actions ----------
    function shake(){ if(s.busy||finished) return; if(dev==='resp'){ bub(L(FLOWX.noShakeR)); return; } if(s.atMouth){ bub(L(FLOWX.notNow)); return; }
      const base=dev==='spacer'?null:{...s.pos}; let n=0; s.busy=true;
      const step=()=>{ n++; if(n<8) sfx.shake(n); const off=n%2?-22:22; if(dev==='spacer'){ const g=devG.querySelector(s.attached?'.sd-dev':'.sd-mdiw'); g.style.transform=`translateY(${n<8?off:0}px)`; } else { s.pos={x:base.x,y:base.y+(n<8?off:0)}; draw(); }
        if(n<8) setTimeout(step,85); else { s.busy=false; if(dev==='spacer') devG.querySelectorAll('.sd-dev,.sd-mdiw').forEach(g=>g.style.transform=''); s.shaken=true; mark('shake'); } };
      step(); }
    function tapCap(){ if(s.busy||finished) return;
      if(s.atMouth){ bub(L(FLOWX.takeOut)); sfx.error(); return; }
      if(dev==='resp'){ if(!s.capOpen){ s.capOpen=true; sfx.capOff(); draw(); mark('open'); return; }
        s.capOpen=false; sfx.capOn(); draw(); if(s.good){ if(holdIv) holdDone(); if(!s.held) err('noHold',1); mark('close'); endPuff(); } else unmark('open'); return; }
      if(s.capOn){ s.capOn=false; sfx.capOff(); draw(); mark('cap'); return; }
      s.capOn=true; sfx.capOn(); draw(); if(dev==='mdi'&&s.good){ if(holdIv) holdDone(); if(!s.held) err('noHold',1); mark('recap'); later(()=>finish(),700); } }
    function tapBase(){ if(s.busy||finished||dev!=='resp') return; if(s.atMouth){ bub(L(FLOWX.takeOut)); sfx.error(); return; } if(s.capOpen) err('openTurn');
      const st=devG.querySelector('.sd-stripes'); st.animate([{transform:'translateY(0)'},{transform:'translateY(14px)'},{transform:'translateY(-6px)'},{transform:'translateY(0)'}],{duration:500}); sfx.ratchet(); bub(L(SIMX.click),900); s.turned=true; mark('turn'); }
    function tapBody(){ if(s.busy||finished) return;
      if(dev==='spacer'&&!s.attached){ if(s.capOn){ bub(L(FLOWX.capFirst)); sfx.error(); return; } tween(()=>s.pos,p=>{ s.pos=p; },{x:SP_HOME.x-SOCK,y:SP_HOME.y},420,()=>{ s.attached=true; draw(); sfx.clack(); mark('attach'); }); return; }
      if(s.atMouth){ if(s.inhaling){ if(dev!=='spacer') press(); return; } return takeOut(); }
      if(dev!=='resp'&&s.capOn){ bub(L(FLOWX.capFirst)); err('capOn',1); return; }
      if(dev==='resp'&&!s.capOpen){ bub(L(FLOWX.openFirst)); sfx.error(); return; }
      const get=dev==='spacer'?()=>s.sp:()=>s.pos, set=dev==='spacer'?p=>{ s.sp=p; }:p=>{ s.pos=p; };
      tween(get,set,MOUTH,480,()=>{ s.atMouth=true; draw(); sfx.select(); mark('mouth'); }); }
    function takeOut(){ if(s.inhaling) return;
      away();
      if(s.good){ mark('remove');   // hold-then-remove and remove-then-hold (lips closed) are both correct
        if(s.held){ s.lungs=Math.min(s.lungs,.5); sfx.sigh(); if(dev==='spacer') later(()=>finish(),700); }
        else if(!holdIv&&!ex) hint(L(FLOWX.holdNow)); }
      else { s.lungs=Math.min(s.lungs,.5); sfx.sigh(); unmark('mouth','in','press'); } }
    function away(){ const get=dev==='spacer'?()=>s.sp:()=>s.pos, set=dev==='spacer'?p=>{ s.sp=p; }:p=>{ s.pos=p; }; s.atMouth=false; tween(get,set,dev==='spacer'?SP_HOME:HOME,420); }
    // breathe out: one tap (or press and hold)
    let outIv=0, outAuto=false;
    const stopOut=()=>{ clearInterval(outIv); outIv=0; outAuto=false; if(s.outH){ s.outH.stop(.25); s.outH=null; } $('#simOut').classList.remove('on'); bench.classList.remove('face-open'); $('#simOut .pg').style.width='0';
      if(s.exhaled) mark('out'); };
    const outDown=()=>{ if(s.busy||finished||s.inhaling) return; if(s.atMouth){ err('outIn'); bub(L(FLOWX.outAway),1800); return; } $('#simOut').classList.add('on'); bench.classList.add('face-open');
      if(outIv) return; outAuto=false; s.outH&&s.outH.stop(.1); s.outH=sfxLoop('out',{sec:Math.max(.6,(s.lungs-.12)/.009*.06)});
      outIv=setInterval(()=>{ s.lungs=Math.max(.06,s.lungs-.009); draw(); $('#simOut .pg').style.width=Math.round((1-(s.lungs-.06)/.94)*100)+'%'; if(s.lungs<=.12){ if(!s.exhaled&&s.outH) s.outH.ramp('gain',.03,.35); s.exhaled=true; if(outAuto) stopOut(); } },60); };
    const outUp=()=>{ if(!outIv) return; if(s.exhaled) stopOut(); else outAuto=true; };   // a short tap keeps going until the lungs are empty
    // breathe in: automatic slow breath; press must land early in it
    function breatheIn(){ if(s.busy||finished||s.inhaling) return;
      if(!s.atMouth){ bub(L(FLOWX.mouthFirst)); sfx.error(); return; }
      if(dev==='spacer'&&!s.chamberN){ bub(L(T('press'))); }
      if(s.lungs>.4) err('noOut',1);
      s.inhaling=true; s.pressed=false; s.t0=performance.now(); mark('in'); hint('');
      if(!ex&&dev!=='spacer') tx('👆 '+L(T('press')));   // the timed moment: say plainly what to do now (no pointing)
      const from=s.lungs, dur=INHALE*(1-from)/.94*1000, tm=$('#simTm'); s.inH&&s.inH.stop(.1); s.inH=sfxLoop('in',{sec:dur/1000}); tm.classList.remove('hidden'); $('#simGz').style.display=(ex||dev==='spacer')?'none':''; $('#simGz').style.width=(WIN/INHALE*100)+'%';
      if(dev==='spacer'&&s.chamberN&&(performance.now()-s.chamber)/1000>5) err('late');
      const f=now=>{ const el=(now-s.t0)/1000, k=Math.min(1,el*1000/dur); s.lungs=from+(1-from)*k; draw(); $('#simMk').style.left=Math.min(100,el/INHALE*100)+'%';
        if(k<1&&!finished) raf=requestAnimationFrame(f); else endInhale(); };
      raf=requestAnimationFrame(f); }
    function endInhale(){ s.inhaling=false; $('#simTm').classList.add('hidden'); if(s.inH){ s.inH.stop(.3); s.inH=null; }
      if(dev==='spacer'){ if(s.chamberN){ s.good=true; mist('lungs'); bub(L(FLOWX.good),1200); mark('in'); } else { err('noPress'); failPuff(); } return; }
      if(!s.pressed){ err('noPress'); failPuff(); return; }
      if(s.good){ bub(L(FLOWX.good),1200); mark('press'); } else failPuff(); }
    function press(){ if(s.busy||finished) return;
      const part=devG.querySelector(dev==='resp'?'.sd-btn':'.sd-can'); part.animate([{transform:'translateY(0)'},{transform:dev==='resp'?'translateY(5px)':'translateY(14px)'},{transform:'translateY(0)'}],{duration:220});
      if(dev==='resp'){ if(!s.turned){ err('noTurn'); bub(L(SIMX.nothing)); return; } s.turned=false;
        if(!s.capOpen){ err('capShut'); bub(L(SIMX.nothing)); failPuff(); return; } }
      else { if(s.capOn){ err('capOn'); bub(L(SIMX.nothing)); return; } if(!s.shaken) err('noShake'); }
      if(dev==='spacer'){ if(!s.attached){ err('noSpacer'); mist('air'); return; } if(s.chamberN&&!s.inhaling) err('twoPuff'); s.chamberN++; s.chamber=performance.now(); mist('chamber'); mark('press');
        if(!ex) hint(L(FLOWX.inChamber).replace('{s}',5)); return; }
      if(!s.atMouth){ err('air'); mist('air'); failPuff(); return; }
      if(!s.inhaling){ err('early'); cough(); mist('throat'); failPuff(); return; }
      if(s.pressed) return; s.pressed=true; const t=(performance.now()-s.t0)/1000;
      if(t<=WIN){ s.good=true; mist('lungs'); sfx.select(); } else { err('late2'); mist('throat'); } }
    function failPuff(){ // the dose is lost: back away and start that puff again
      s.good=false; s.exhaled=false; s.pressed=false; s.chamberN=0; s.turned=dev==='resp'?false:s.turned; if(dev!=='resp') s.shaken=false;
      later(()=>{ if(s.atMouth) away(); unmark(...(dev==='resp'?['turn','out','mouth','in','press']:['shake','out','mouth','in','press'])); if(!ex) hint(L(dev==='resp'?FLOWX.redoR:FLOWX.redo)); },900); }
    // hold breath: one tap counts to 10
    let holdIv=0, holdN=0;
    const holdDown=()=>{ if(s.busy||finished||s.inhaling) return; if(!s.good){ bub(L(FLOWX.nothingHold)); return; } if(s.held||holdIv) return;
      $('#simHold').classList.add('on'); holdN=0; const cnt=svg.querySelector('.sd-count');
      holdIv=setInterval(()=>{ holdN++; cnt.textContent=holdN; $('#simHold .pg').style.width=Math.min(100,holdN*10)+'%'; sfx.tock(holdN); if(holdN>=10) holdDone(); },420); };
    const holdUp=()=>{};   // releasing early is not counted against them: the count carries on to 10
    const holdDone=()=>{ if(!holdIv) return; clearInterval(holdIv); holdIv=0; $('#simHold').classList.remove('on'); setTimeout(()=>{ svg.querySelector('.sd-count').textContent=''; $('#simHold .pg').style.width='0'; },500);
      s.held=true; mark('hold'); if(!s.atMouth){ s.lungs=Math.min(s.lungs,.5); sfx.sigh(); if(dev==='spacer'&&s.good) later(()=>finish(),700); } draw(); };
    function endPuff(){ s.puffs++; if(s.puffs<2){ s.puffNo=2; s.good=false; s.held=false; s.exhaled=false; s.turned=false; s.done=new Set(); s.last=null; s.hintOn=null; bub(L(FLOWX.puff2),1800); guide(); } else later(()=>finish(),600); }
    function wire(){
      devG.querySelectorAll('.sd-cap').forEach(e=>e.addEventListener('click',ev=>{ ev.stopPropagation(); tapCap(); }));
      devG.querySelectorAll('.sd-can,.sd-btn').forEach(e=>e.addEventListener('click',ev=>{ ev.stopPropagation(); press(); }));
      devG.querySelectorAll('.sd-base').forEach(e=>e.addEventListener('click',ev=>{ ev.stopPropagation(); tapBase(); }));
      devG.querySelectorAll('[data-p="body"],.sd-sp').forEach(e=>e.addEventListener('click',ev=>{ ev.stopPropagation(); tapBody(); }));
    }
    bench.addEventListener('click',e=>{ if(finished||e.target.closest('[data-p],.is-sum,.sd-tag')) return; $$('#simTags .sd-tag').forEach(t=>{ t.classList.remove('flash'); void t.offsetWidth; t.classList.add('flash'); }); });
    $('#simShake').onclick=shake; $('#simIn').onclick=breatheIn; if($('#simHintBtn')) $('#simHintBtn').onclick=showHint;
    const hb=(el,d,u)=>{ el.addEventListener('pointerdown',e=>{ e.preventDefault(); try{ el.setPointerCapture(e.pointerId); }catch(_){} d(); }); ['pointerup','pointercancel','pointerleave'].forEach(t=>el.addEventListener(t,u)); };
    hb($('#simOut'),outDown,outUp); hb($('#simHold'),holdDown,holdUp);
    $('#simDone').onclick=()=>{ if(!finished) finish(); };
    function finish(){ if(finished) return; finished=true; timers.forEach(clearTimeout); cancelAnimationFrame(raf); clearInterval(outIv); clearInterval(holdIv); [s.outH,s.inH].forEach(h=>h&&h.stop(.2)); s.outH=s.inH=null; $('#simHand').classList.add('hidden');
      if(s.good&&!s.held&&!holdIv) err('noHold',1);
      if(dev==='resp'){ if(!s.puffs&&!s.good) err('noDose',1); else if(s.puffs<2) err('onePuff',1); if(s.capOpen) err('noClose',1); }
      else { if(!s.good) err('noDose',1); else if(dev==='mdi'&&!s.capOn) err('noRecap',1); }
      const errs=[...s.errs]; tries++; if(!firstErrs) firstErrs=errs.slice(); allErrs=errs; const ok=!errs.length;
      const sc=inhScore(dev, errs, hintsN-hint0, [...s.ever]); if(!firstSc) firstSc=sc;
      logEvent({type:'inhSim', dev, errs, ok, try:tries, puffs:s.puffs, good:s.good?1:0, hints:hintsN, pts:sc.pts, steps:sc.ok, max:sc.max});
      if(ex){ sfx.select(); setTimeout(()=>{ typeof audioDuck==='function'&&audioDuck(0); host.classList.add('hidden'); host.innerHTML=''; res({ok, errs, firstErrs, tries, hints:0, score:firstSc}); },500); return; }
      if(ok) sfx.get(); else sfx.error();
      const sum=document.createElement('div'); sum.className='is-sum';
      const shown=tries>1?firstSc:sc;
      sum.innerHTML=`<div class="card"><h3>${ok?'🎉 '+esc(L(SIMX.perfect)):'🔧 '+esc(L(SIMX.fixes))}</h3><div class="is-score"><b>📋 ${esc(L(SIMX.scoreT))} ${shown.pts}/${shown.max}</b>${shown.hints?`<small>💡 −${shown.hints}</small>`:''}${tries>1?`<small>${esc(L(SIMX.scoreNote))}</small>`:''}<ul>${SIM_STEPS[dev].map(([k,l])=>`<li class="${shown.bad.includes(k)?'no':'ok'}">${shown.bad.includes(k)?'❌':'✅'} ${esc(L(l))}</li>`).join('')}</ul></div>${ok?'':`<ul>${errs.map(k=>`<li>${esc(L(SIM_ERR[k]))}</li>`).join('')}</ul>`}${hintsN?`<p class="is-hn">💡 ${esc(L(FLOWX.hintsUsed))}: ${hintsN}</p>`:''}
        <div class="act">${ok||tries>=2?'':`<button class="gbtn gray" id="simAgain">${esc(L(SIMX.again))}</button>`}<button class="gbtn green" id="simCont">${esc(L(SIMX.cont))}</button></div></div>`;
      bench.appendChild(sum);
      const a=$('#simAgain'); if(a) a.onclick=()=>{ sfx.click(); sum.remove(); finished=false; reset(); };
      $('#simCont').onclick=()=>{ sfx.click(); typeof audioDuck==='function'&&audioDuck(0); host.classList.add('hidden'); host.innerHTML=''; res({ok, errs:allErrs, firstErrs, tries, hints:hintsN, score:firstSc}); }; }
    reset();
  });
}
