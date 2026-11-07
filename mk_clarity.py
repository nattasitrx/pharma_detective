"""Clear right / wrong (students' feedback, 5 Nov 2026: "right and wrong aren't intuitive, and it jumps away too fast").
usage: python3 mk_clarity.py FILE [FILE...]   (a built game: Case A, C, D or the main link; in place, after mk_resume.py)

1. Medicine-review missions (and Case D's anticholinergic sort): after "Confirm", the screen stays until the student
   presses Continue. The right-hand panel shows a big verdict, a legend for the marks on the cards, the right answer and
   the explanation (it used to vanish after 2.3 s with a small toast, then the explanation came as dialogue).
2. Myth boss: a wrong card said "Myth holds!" in green with a healing sound; now ❌ in red. Partly right says so.
3. Questions (post-test, extra questions): Continue appears where Submit was, so a quick double tap skipped the
   answer and explanation; Continue now ignores taps for 0.6 s.
Exam mode is unchanged (answers are still shown only at the end).
4. The instructor note on preloaded questions says 3 pre/post + 1 reflection are on (fewer questions, 7 Nov 2026)."""
import sys

CSS = """
/* clear right / wrong (mk_clarity.py) */
.dcard,.acard{position:relative}
.dcard.ok::after,.dcard.miss::after,.dcard.bad::after,.acard.ok::after,.acard.bad::after{position:absolute;top:-12px;left:-10px;width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:900;color:#fff;box-shadow:0 0 0 3px #fff,0 3px 8px rgba(0,0,0,.25);z-index:2}
.dcard.ok::after,.acard.ok::after{content:'✓';background:#18b07f}
.dcard.miss::after{content:'!';background:#f0a000}
.dcard.bad::after,.acard.bad::after{content:'✕';background:#ff3d5c}
.mr-side.mr-res{background:#fff;color:#2a2140;display:flex;flex-direction:column;gap:10px}
.mr-res .mr-v{font-family:var(--tc);font-weight:900;font-size:30px;line-height:1.2;padding:12px 14px;border-radius:18px;text-align:center}
.mr-res.ok .mr-v{background:#e6fbf2;color:#0f7a55}
.mr-res.part .mr-v{background:#fff6dc;color:#9a6400}
.mr-res.bad .mr-v{background:#ffecee;color:#c0213d}
.mr-res .mr-lg{display:flex;flex-direction:column;gap:4px;font-size:16px;font-weight:700}
.mr-res .mr-lg span{display:flex;gap:8px;align-items:center}
.mr-res .mr-lg i{font-style:normal;width:26px;height:26px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:15px;flex:0 0 auto}
.mr-res .mr-ans{font-size:17px;font-weight:800;color:#0f7a55;background:#f2fbf7;border-radius:14px;padding:8px 12px}
.mr-res .mr-x{flex:1;overflow:auto;font-size:17px;line-height:1.55;background:#f7f4ff;border-radius:14px;padding:10px 12px}
.mr-res .mr-x p{margin:0 0 8px}
.mr-res #mrNext{align-self:stretch;font-size:22px}
"""

JS = r"""
/* ---------- mission result: stays until Continue (mk_clarity.py) ---------- */
const MRV={ ok:['✅ 全部正確！','✅ All correct!','✅ ถูกทั้งหมด!'], part:['🔸 部分正確','🔸 Partly right','🔸 ถูกบางส่วน'], bad:['❌ 不正確','❌ Not right','❌ ยังไม่ถูก'],
  lOk:['選對了','Right choice','เลือกถูก'], lMiss:['應該選，但沒選','Should have picked','ควรเลือก แต่ไม่ได้เลือก'], lBad:['不該選','Should not pick','ไม่ควรเลือก'],
  lOkA:['放對籃子','Right basket','ใส่ถูกตะกร้า'], lBadA:['放錯籃子','Wrong basket','ใส่ผิดตะกร้า'], ans:['正確答案','Answer','คำตอบที่ถูก'], why:['💡 解說','💡 Why','💡 คำอธิบาย'] };
function mrVerdict(m, r){ return new Promise(res=>{
  const host=$('#medrev'); if(!host){ res(); return; }
  const side=host.querySelector('.mr-side'), act=host.querySelector('.mr-act'), acb=!!host.querySelector('.acard');
  const has=c=>!!host.querySelector('.dcard.'+c+',.acard.'+c), k=r.perfect?'ok':r.partial?'part':'bad';
  const dot=(c,bg,t)=>`<span><i style="background:${bg}">${c}</i>${esc(L(t))}</span>`;
  const lg=[has('ok')?dot('✓','#18b07f',acb?MRV.lOkA:MRV.lOk):'', has('miss')?dot('!','#f0a000',MRV.lMiss):'', has('bad')?dot('✕','#ff3d5c',acb?MRV.lBadA:MRV.lBad):''].join('');
  const name=id=>{ const d=DRUGS.find(x=>x.id===id); return d?d.n.split(' ')[0]:id; };
  const ans=!acb&&!r.perfect&&(m.ans||[]).length?`<div class="mr-ans">${esc(L(MRV.ans))}: ${(m.ans||[]).map(name).map(esc).join(', ')}</div>`:'';
  const why=(m.x||[]).map(x=>`<p>${kpHTML(L(x))}</p>`).join('');
  const box=side||document.createElement('div'); box.className='mr-side mr-res '+k;
  box.innerHTML=`<div class="mr-v">${esc(L(MRV[k]))}</div>${lg?`<div class="mr-lg">${lg}</div>`:''}${ans}${why?`<div class="mr-x"><b>${esc(L(MRV.why))}</b>${why}</div>`:''}<button class="gbtn" id="mrNext">${esc(T('cqNext'))}</button>`;
  if(!side) host.appendChild(box); if(act) act.style.visibility='hidden';
  const t0=performance.now(); $('#mrNext').onclick=()=>{ if(performance.now()-t0<600) return; sfx.click(); res(); };
}); }
"""

def patch(path):
    s = open(path, encoding='utf-8').read()
    if 'function mrVerdict(' in s: print(path, 'already applied'); return
    def sub(old, new):
        nonlocal s
        assert s.count(old) == 1, (path, old[:80], s.count(old)); s = s.replace(old, new)
    # 1. missions: verdict panel instead of toast + 2.3 s + dialogue
    sub("""    if(EXAM()){ sfx.select(); toast(T('examNoted')); }
    else if(r.perfect) splash('perfect','gold','crit'); else if(r.partial){ sfx.hit(); toast('🔸 '+T('partial')); } else { sfx.error(); toast('❌ '+T('wrongDx')); }""",
        """    if(EXAM()){ sfx.select(); toast(T('examNoted')); }
    else { if(r.perfect) splash('perfect','gold','crit'); else if(r.partial) sfx.hit(); else sfx.error(); await mrVerdict(m,r); }""")
    sub("""    await sleep(EXAM()?900:2300); $('#medrev').classList.add('hidden');
    if(!EXAM()){ show('yeh','R', r.perfect?'happy':r.partial?'think':'sad'); show('me','L','neutral');
      for(const x of m.x) await say('yeh','neutral',x); }""",
        """    if(EXAM()) await sleep(900); $('#medrev').classList.add('hidden');""")
    sub("function missionUI(m, i, n){", JS.strip() + "\nfunction missionUI(m, i, n){")
    # 2. boss: say right / partly right / wrong plainly; wrong is red with an error sound
    sub("critical:['會心一擊！','CRITICAL!','คริติคอล!']", "critical:['✅ 正確！','✅ Right!','✅ ถูก!']")
    sub("mythShaken:['動搖了…但還沒破！','Shaken… not broken!','สั่นคลอน… แต่ยังไม่แตก!']", "mythShaken:['🔸 部分正確','🔸 Partly right','🔸 ถูกบางส่วน']")
    sub("mythHolds:['迷思還在！','Myth holds!','ความเชื่อยังอยู่!']", "mythHolds:['❌ 不對！','❌ Wrong!','❌ ผิด!']")
    sub("sfx.heal(); setMonster('laugh'); dmgNum(T('mythHolds'),'#18b07f');", "sfx.error(); setMonster('laugh'); dmgNum(T('mythHolds'),'#e0435a');")
    # 3. questions: Continue ignores taps for 0.8 s after Submit
    sub("const finish=r=>{ clearInterval(iv); done=true; go.textContent=T('cqNext'); go.onclick=()=>{ sfx.click(); box.classList.add('hidden'); D.cqGo=null; res(r); };",
        "const finish=r=>{ clearInterval(iv); done=true; go.textContent=T('cqNext'); const tFin=performance.now(); go.onclick=()=>{ if(performance.now()-tFin<600) return; sfx.click(); box.classList.add('hidden'); D.cqGo=null; res(r); };")
    # 4. the instructor note about the preloaded questions (3 pre/post + 1 reflection are on; the rest are kept, switched off)
    sub("defNote:['已預先放好 6 題前後測和 3 題反思題，可以直接修改、停用或刪除。','6 pre/post-test questions and 3 reflection questions are preloaded — edit, switch off or delete them as you like.','มีคำถามก่อน/หลังเรียน 6 ข้อ และคำถามสะท้อนคิด 3 ข้อเตรียมไว้แล้ว แก้ ปิด หรือลบได้ตามต้องการ']",
        "defNote:['已預先放好前後測和反思題：預設啟用 3 題前後測和 1 題反思，其他題目先停用。可以直接修改、啟用、停用或刪除。','Pre/post-test and reflection questions are preloaded: 3 pre/post questions and 1 reflection are on, the others are kept but switched off. Edit, switch on or off, or delete them as you like.','มีคำถามเตรียมไว้แล้ว: เปิดใช้คำถามก่อน/หลังเรียน 3 ข้อ และสะท้อนคิด 1 ข้อ ข้ออื่นเก็บไว้แต่ปิดอยู่ แก้ เปิด ปิด หรือลบได้ตามต้องการ']")
    sub("</style>\n</head>", CSS + "</style>\n</head>")
    open(path, 'w', encoding='utf-8').write(s); print(path, 'clarity patched')

for p in sys.argv[1:]: patch(p)
