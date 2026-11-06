/* 4–7 Nov 2026: the age chip in the eGFR/CrCl panels showed 65 instead of 61, so students who used it were marked wrong.
   Regrade from the logged attempts: an attempt that used age 65 and is right with 61 counts as right (score +80 for CrCl, rank redone). */
function fixAgeChip(s){
  if(!s||!s.calc||s.ageChipFix) return s; s.ageChipFix=1; const log=s.log||[]; let gain=0;
  [['egfr',CALC_EGFR,r=>Math.round(r)],['crcl',CALC_CRCL,r=>+r.toFixed(1)]].forEach(([k,cfg,fmt])=>{
    const c=s.calc[k]; if(!c||(c.ok&&c.tries===1)) return;
    const att=log.filter(e=>e&&e.type==='calc'&&e.id===k&&e.vals);
    for(const e of att){ if(e.ok) break; const v=e.vals; if(!approx(+v.age,65,.01)) continue;
      const v2={...v,age:61}, r=cfg.calc(v2); if(cfg.check(v2,r)) continue;
      if(!c.ok&&k==='crcl') gain+=80;
      c.ok=true; c.tries=Math.min(c.tries||e.attempt||1, e.attempt||1); c.value=fmt(r); c.ageChipFix=true; break; }
  });
  if(gain&&typeof s.score==='number'){ s.score+=gain;
    if(s.gate&&s.rank){ const RK='SABCD', sc=s.score, sr=sc>=4600?'S':sc>=3800?'A':sc>=3000?'B':sc>=2200?'C':'D';
      s.gate.score=sr; s.rank=RK[Math.max(RK.indexOf(sr),RK.indexOf(s.gate.cap||'S'))]; } }
  return s;
}
