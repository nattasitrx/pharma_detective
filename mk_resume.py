"""Save anywhere: add mid-chapter save points to a built game file (Case A, C or D), in place.
usage: python3 mk_resume.py FILE [FILE...]

The game already saves at the start of every chapter. This adds a save at every hub action
(each interview question, each search, each testimony statement, each med-review mission,
each boss card, each hands-on task) and resumes there: the chapter re-runs with the saved state,
dialogue already seen is fast-forwarded, and parts already done are skipped.
Applied after the build (and after the C/D merge) so the case-specific story lines are never touched."""
import sys

MODULE = r'''
/* ---------- save anywhere: a save at every question, search, statement, mission, boss card and hands-on task ----------
   Resuming re-runs that chapter with the saved state: dialogue already seen is fast-forwarded and finished parts are skipped,
   so the student lands where they left off. Chapter-start saves (and checkpoints) work as before. */
const RS={ff:false, step:-1, badgeAt:0, bt:0};
function ff(on){ RS.ff=!!on; }
function saveMid(){ if(RS.step<1||!S.sessionId||S.practice||S.done) return; saveResume(RS.step, true); savedBadge(); }
function resumePoint(){ ff(false); saveMid(); }
async function part(id, fn, keepFF){ const g=S.seg||(S.seg={}); if(g[id]) return; if(!keepFF) ff(false); const r=await fn(); g[id]=1; saveMid(); return r; }
function savedBadge(){ const now=Date.now(); if(now-RS.badgeAt<12000) return; RS.badgeAt=now;
  let b=document.getElementById('rsSaved'); const stg=document.getElementById('stage'); if(!stg) return;
  if(!b){ b=document.createElement('div'); b.id='rsSaved'; stg.appendChild(b); const st=document.createElement('style');
    st.textContent='#rsSaved{position:absolute;right:22px;top:98px;z-index:85;padding:5px 14px;border-radius:99px;background:rgba(17,115,77,.9);color:#fff;font-weight:900;font-size:17px;pointer-events:none;opacity:0;transition:opacity .35s;white-space:nowrap}#rsSaved.on{opacity:1}';
    document.head.appendChild(st); }
  b.textContent='💾 '+T('rsSaved'); b.classList.add('on'); clearTimeout(RS.bt); RS.bt=setTimeout(()=>b.classList.remove('on'),1700);
  if(!S.fl.saveTip){ S.fl.saveTip=1; toast('💾 '+T('rsTip')); } }
/* fast-forward: skip what was already seen until the first part still to play */
{ const f=say; say=function(who,e,text,o){ if(RS.ff){ if(CH[who]&&e) emo(who,e); return Promise.resolve(); } return f(who,e,text,o); }; }
{ const f=chapterCard; chapterCard=async function(n){ if(RS.ff){ D.lastAsk=null; S.chapter=n; hud(); return; } return f(n); }; }
{ const f=introCard; introCard=async function(w){ if(RS.ff){ S.met[w]=1; return; } return f(w); }; }
{ const f=splash; splash=async function(){ if(RS.ff) return; return f.apply(this, arguments); }; }
{ const f=wipe; wipe=async function(fn){ if(RS.ff){ if(fn) await fn(); return; } return f(fn); }; }
Object.assign(UI,{
  rsSaved:['已存檔','Saved','บันทึกแล้ว'],
  rsTip:['遊戲會自動存檔：關掉之後再打開，可以從離開的地方繼續玩','The game saves itself: close it any time and continue from where you left off','เกมบันทึกให้อัตโนมัติ ปิดไปแล้วกลับมาเล่นต่อจากจุดที่ออกได้เลย'],
  resumedMid:['已從離開的地方繼續 ▶','Continuing from where you left off ▶','เล่นต่อจากจุดที่ออกไปแล้ว ▶'],
  resumeMidTag:['離開的地方','where you left off','จุดที่ออกไป'],
});
'''

def patch(path):
    s = open(path, encoding='utf-8').read()
    if 'function resumePoint()' in s:
        print(path, 'already patched'); return
    case = 'd' if 'async function inhalerTask' in s else 'c' if 'async function fosaGame' in s or 'function fosaGame' in s else 'a'
    P = []   # (old, new) — each old must occur exactly once
    # module, right before the story-step runner
    anchor = '/* ---------- story steps · save at the start of every chapter · resume ---------- */'
    P.append((anchor, MODULE.strip('\n') + '\n' + anchor))
    # runner / save / resume / title box
    P += [
        ("JSON.stringify({v:2, step, at:Date.now(),", "JSON.stringify({v:2, step, mid:!!arguments[1], at:Date.now(),"),
        ("if(IN_HOME.has(i)&&S.visit<=0&&!S.timeout){ await timeoutEnd(S.chapter);", "if(IN_HOME.has(i)&&S.visit<=0&&!S.timeout){ ff(false); await timeoutEnd(S.chapter);"),
        ("      if(i>=1&&i<STEPS.length-1) saveResume(i); await STEPS[i](); } clearResume(); }\n  catch(e){ console.error(e);",
         "      const mid=RS.ff&&i===from; RS.step=i; if(!mid) S.seg={}; if(i>=1&&i<STEPS.length-1) saveResume(i, mid); await STEPS[i](); ff(false); } clearResume(); }\n  catch(e){ ff(false); console.error(e);"),
        ("toast(T('resumed')); playTheme('calm'); await runSteps(r.step);", "toast(T(r.mid?'resumedMid':'resumed')); playTheme('calm'); ff(!!r.mid); await runSteps(r.step);"),
        ("<b>${T('ch'+ch)} ${T('ch'+ch+'t')}</b>", "<b>${T('ch'+ch)} ${T('ch'+ch+'t')}</b>${r.mid?' · '+T('resumeMidTag'):''}"),
        ("S.practice=true; S.sessionId=null;", "S.practice=true; S.sessionId=null; S.seg={};"),
    ]
    # chapter 1: first move, interview board
    P += [
        ("await firstMove();", "await part('fm', firstMove);"),
        ("  let announced=false;\n  while(true){\n    if(S.visit<=0) break;", "  let announced=!!S.fl.c1ann;\n  while(true){\n    resumePoint(); if(S.visit<=0) break;"),
        ("!announced&&CH1_NEED.every(p=>S.found[p])){ announced=true;", "!announced&&CH1_NEED.every(p=>S.found[p])){ announced=true; S.fl.c1ann=1;"),
    ]
    # chapter 2: search (save after every spot and every hint)
    P += [
        ("  const st=$('#stage'); st.classList.add('searching','overview');", "  resumePoint(); const st=$('#stage'); st.classList.add('searching','overview');"),
        ("  sparkHint(); updSearchHud();\n  if(S.visit<=0&&D.searchStop){ D.searchStop(); return; }", "  sparkHint(); updSearchHud(); saveMid();\n  if(S.visit<=0&&D.searchStop){ D.searchStop(); return; }"),
        ("logEvent({type:'hint', where:'search'});", "logEvent({type:'hint', where:'search'}); saveMid();"),
    ]
    # chapter 3: testimony (hearts and solved statements live in the save)
    P += [
        ("S.hearts=CONFIG.HEARTS; $('#hHearts').classList.remove('hidden');", "if(!RS.ff) S.hearts=CONFIG.HEARTS; $('#hHearts').classList.remove('hidden');"),
        ("const solved={}, tried={}, lost={}; TESTI.forEach(t=>{ tried[t.id]=[];",
         "const T3=((S.seg||(S.seg={})).t3=S.seg.t3||{solved:{},tried:{},lost:{}}), solved=T3.solved, tried=T3.tried, lost=T3.lost; TESTI.forEach(t=>{ tried[t.id]=tried[t.id]||[];"),
        ("let i=lost[TESTI[0].id]?nextUnsolved(0):0;", "let i=(lost[TESTI[0].id]||solved[TESTI[0].id])?nextUnsolved(0):0;"),
        ("  while(open()>0){\n    if(S.visit<=0){ S.fl.duelCut=1; break; }", "  while(open()>0){\n    resumePoint(); if(S.visit<=0){ S.fl.duelCut=1; break; }"),
        ("if(S.visit>0) await heartLock();", "if(S.visit>0){ resumePoint(); await heartLock(); }"),
    ]
    # chapter 4: kidney task, missions (+ case-specific hands-on tasks)
    P += [
        ("  await kidneyTask();", "  await part('kid', kidneyTask);"),
        ("  for(let i=0;i<MISSIONS.length;i++){\n    if(S.visit<=0){ S.fl.mrCut=i; break; }", "  for(let i=S.mr.ans.length;i<MISSIONS.length;i++){\n    resumePoint(); if(S.visit<=0){ S.fl.mrCut=i; break; }"),
        ("    reveal(m.p);\n  }\n", "    reveal(m.p);\n  }\n  resumePoint();\n"),
    ]
    if case == 'c':
        P.append(("hideAll(); hideText(); const fz=await fosaGame(); S.calc.fosa={ok:fz.ok, errs:fz.errs}; logEvent({type:'fosaGame', ok:fz.ok, errs:fz.errs});",
                  "if(!S.calc.fosa){ hideAll(); hideText(); const fz=await fosaGame(); S.calc.fosa={ok:fz.ok, errs:fz.errs}; logEvent({type:'fosaGame', ok:fz.ok, errs:fz.errs}); saveMid(); }"))
    if case == 'd':
        P += [
            ("  await inhalerTask();", "  await part('inh', inhalerTask, true);"),
            ("  const r={rescue:false, steps:false, spacer:false, order:false, dose:true, stepsSel:[], orderTries:0};",
             "  const r=((S.seg||(S.seg={})).inhR=S.seg.inhR||{rescue:false, steps:false, spacer:false, order:false, dose:true, stepsSel:[], orderTries:0});"),
            ("    /* 1 — ", "    if(!S.seg.i1){ ff(false); /* 1 — "),
            ("    /* 2 — ", "    S.seg.i1=1; saveMid(); }\n    if(!S.seg.i2){ ff(false); /* 2 — "),
            ("    hideText();\n    const sp=await inhSim('spacer');", "    S.seg.i2=1; saveMid(); }\n    if(!S.seg.i2b){ ff(false);\n    hideText();\n    const sp=await inhSim('spacer');"),
            ("    /* 3 — ", "    S.seg.i2b=1; saveMid(); }\n    if(!S.seg.i3){ ff(false); /* 3 — "),
            # (step 4, the "twice a day" bag, was removed after the professor's review)
            ("    /* teach-back */", "    S.seg.i3=1; saveMid(); }\n    ff(false); /* teach-back */"),
        ]
    # chapter 5: boss (answers so far rebuild the boss state)
    P += [
        ("const B=S.boss; B.combo=0; B.alive=[]; B.byFinal=[];", "const B=S.boss; if(!B.answers.length){ B.combo=0; B.alive=[]; B.byFinal=[]; }"),
        ("myths.forEach(m=>mhp[m.p]=100);", "myths.forEach(m=>mhp[m.p]=100); B.answers.forEach(a=>{ if(a.p in mhp) mhp[a.p]=a.q===2?0:a.q===1?60:100; });"),
        ("let confusion=0;", "let confusion=B.answers.filter(a=>a.q<1).length;"),
        ("  for(let i=0;i<myths.length;i++){", "  for(let i=B.answers.length;i<myths.length;i++){ resumePoint();"),
        ("const txt=await finalInput(B.alive.slice());", "resumePoint(); const txt=await finalInput(B.alive.slice());"),
    ]
    bad = []
    for old, new in P:
        n = s.count(old)
        if n != 1: bad.append((n, old[:70]))
        else: s = s.replace(old, new)
    if bad:
        for n, o in bad: print('  ANCHOR x%d: %r' % (n, o))
        raise SystemExit(f'{path}: {len(bad)} anchors not found exactly once — not written')
    open(path, 'w', encoding='utf-8').write(s)
    print(path, 'case', case, 'patched', len(P))

for f in sys.argv[1:]: patch(f)
