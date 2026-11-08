/* 4–7 Nov 2026: on the main link (Case A, age 61) the age chip in the eGFR/CrCl panels showed 65, so students who used it were marked wrong.
   Regrade from the logged attempts: an attempt that used age 65 and is otherwise right counts as right (value with 61, score +80 for CrCl, rank redone).
   Works in the age-61 build (old main link) and in the age-65 build (Case A from 8 Nov 2026), whose instructor pages still show those games:
   the attempt is checked with this build's own age (cfg.answer.age), so only the age is let off. */
function fixAgeChip(s){
  if(!s||!s.calc||s.ageChipFix) return s; s.ageChipFix=1; const log=s.log||[]; let gain=0;
  [['egfr',CALC_EGFR,r=>Math.round(r)],['crcl',CALC_CRCL,r=>+r.toFixed(1)]].forEach(([k,cfg,fmt])=>{
    const c=s.calc[k]; if(!c||(c.ok&&c.tries===1)) return;
    const att=log.filter(e=>e&&e.type==='calc'&&e.id===k&&e.vals);
    for(const e of att){ if(e.ok) break; const v=e.vals; if(!approx(+v.age,65,.01)) continue;
      const vt={...v,age:cfg.answer.age}; if(cfg.check(vt,cfg.calc(vt))) continue;
      const r=cfg.calc({...v,age:61});
      if(!c.ok&&k==='crcl') gain+=80;
      c.ok=true; c.tries=Math.min(c.tries||e.attempt||1, e.attempt||1); c.value=fmt(r); c.ageChipFix=true; break; }
  });
  if(gain&&typeof s.score==='number'){ s.score+=gain;
    if(s.gate&&s.rank){ const RK='SABCD', sc=s.score, sr=sc>=4600?'S':sc>=3800?'A':sc>=3000?'B':sc>=2200?'C':'D';
      s.gate.score=sr; s.rank=RK[Math.max(RK.indexOf(sr),RK.indexOf(s.gate.cap||'S'))]; } }
  return s;
}
