/* =====================================================================
   ANIME CHARACTER ART v2 — layered SVG busts with built-in animation hooks
   .lid (blink) · .m-open/.m-closed (lip-sync) · .sway/.ahoge/.fan/.wing (idle)
   emotions: neutral happy laugh sad shock angry embarrassed think smug cry cough
   ===================================================================== */
let SVGN=0;
const OUTL='#3a2232';
const r1=n=>Math.round(n*10)/10;
function grad(id,a,b,vert,mid){ return `<linearGradient id="${id}" x1="0" y1="0" x2="${vert?0:1}" y2="${vert?1:0}"><stop offset="0" stop-color="${a}"/>${mid?`<stop offset=".55" stop-color="${mid}"/>`:''}<stop offset="1" stop-color="${b}"/></linearGradient>`; }
function rgrad(id,c,o){ return `<radialGradient id="${id}"><stop offset="0" stop-color="${c}" stop-opacity="${o}"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>`; }
/* ---------- eye (s=-1 viewer-left, +1 viewer-right; u=outward, v=down) ---------- */
function eyeSVG(cx,cy,s,o){
  const sc=o.sc||1, X=u=>r1(cx+s*u*sc), Y=v=>r1(cy+v*sc), p=(u,v)=>X(u)+' '+Y(v);
  const e=o.emo, lash=o.lash||OUTL, id=o.P+(s<0?'L':'R'), W=k=>r1(k*sc);
  if(e==='happy'||e==='laugh') return `<path d="M${p(-24,8)} C${p(-14,-15)} ${p(18,-17)} ${p(31,3)}" fill="none" stroke="${lash}" stroke-width="${W(6.5)}" stroke-linecap="round"/><path d="M${p(29,1)} L${p(37,-6)}" stroke="${lash}" stroke-width="${W(3.5)}" stroke-linecap="round"/>`;
  if(e==='cry') return `<path d="M${p(-24,-4)} C${p(-12,10)} ${p(16,10)} ${p(30,-6)}" fill="none" stroke="${lash}" stroke-width="${W(6)}" stroke-linecap="round"/><path d="M${p(-6,8)} q${s*-2*sc} ${r1(30*sc)} ${s*-6*sc} ${r1(62*sc)}" stroke="#8fd3ff" stroke-width="${W(9)}" fill="none" stroke-linecap="round" opacity=".85"/>`;
  if(e==='cough') return `<path d="M${p(-22,-14)} L${p(26,0)} L${p(-22,14)}" fill="none" stroke="${lash}" stroke-width="${W(6.5)}" stroke-linecap="round" stroke-linejoin="round"/>`;
  const sh=e==='shock', gz=o.gaze||[0,0];
  const ix=r1(cx+s*2*sc+gz[0]), iy=r1(cy+3*sc+gz[1]);
  const scl=`M${p(-22,6)} C${p(-20,-12)} ${p(-9,-25)} ${p(4,-25)} C${p(16,-25)} ${p(25,-17)} ${p(27,-7)} C${p(28,8)} ${p(18,24)} ${p(2,26)} C${p(-12,27)} ${p(-21,18)} ${p(-22,6)}Z`;
  const ir=sh?[10,13]:[17,22], pu=sh?[3.4,4.4]:[7.2,10];
  let lid=null; // [vInner, vOuter] upper-lid line
  if(e==='sad') lid=[-27,-12]; if(e==='angry') lid=[-9,-24]; if(e==='smug') lid=[-11,-15]; if(e==='embarrassed') lid=[-17,-16]; if(e==='think') lid=[-21,-20];
  if(o.lidBase&&!lid) lid=o.lidBase;
  let g=`<defs><clipPath id="${id}c"><path d="${scl}"/></clipPath><linearGradient id="${id}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${o.iris[0]}"/><stop offset=".5" stop-color="${o.iris[1]}"/><stop offset="1" stop-color="${o.iris[2]}"/></linearGradient>
    <linearGradient id="${id}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a3050" stop-opacity=".5"/><stop offset=".45" stop-color="#5a3050" stop-opacity="0"/></linearGradient></defs>`;
  g+=`<path d="${scl}" fill="#fffdfb"/><g clip-path="url(#${id}c)">`;
  g+=`<ellipse cx="${ix}" cy="${iy}" rx="${W(ir[0])}" ry="${W(ir[1])}" fill="url(#${id}g)" stroke="${o.iris[0]}" stroke-width="${W(1.6)}"/>`;
  if(!sh) g+=`<path d="M${r1(ix-W(12))} ${r1(iy+W(8))} Q${ix} ${r1(iy+W(22))} ${r1(ix+W(12))} ${r1(iy+W(8))} Q${ix} ${r1(iy+W(15))} ${r1(ix-W(12))} ${r1(iy+W(8))}Z" fill="${o.iris[2]}" opacity=".75"/>`;
  g+=`<ellipse cx="${ix}" cy="${r1(iy-W(1))}" rx="${W(pu[0])}" ry="${W(pu[1])}" fill="#1c0f22"/>`;
  g+=`<rect x="${r1(cx-W(40))}" y="${r1(cy-W(30))}" width="${W(80)}" height="${W(60)}" fill="url(#${id}s)"/>`;
  g+=`<ellipse cx="${r1(ix-W(6))}" cy="${r1(iy-W(9))}" rx="${W(sh?3.5:6.5)}" ry="${W(sh?4.5:8.5)}" fill="#fff" transform="rotate(-18 ${r1(ix-W(6))} ${r1(iy-W(9))})"/><circle cx="${r1(ix+W(7))}" cy="${r1(iy+W(10))}" r="${W(3)}" fill="#fff"/>`;
  if(!sh) g+=`<circle cx="${r1(ix+W(8))}" cy="${r1(iy-W(13))}" r="${W(1.7)}" fill="#fff" opacity=".9"/>`;
  if(o.wet||e==='sad') g+=`<path d="M${p(-16,16)} Q${p(2,25)} ${p(20,15)}" stroke="#bfe9ff" stroke-width="${W(3)}" fill="none" opacity=".9"/>`;
  if(lid) g+=`<path d="M${p(-40,-60)} L${p(46,-60)} L${p(46,lid[1])} L${p(-40,lid[0])}Z" fill="${o.skin}"/>`;
  g+=`</g>`;
  const up=sh?-5:0;
  if(lid){ g+=`<path d="M${p(-25,lid[0]+2)} L${p(32,lid[1]+1)}" stroke="${lash}" stroke-width="${W(6.5)}" stroke-linecap="round"/><path d="M${p(30,lid[1]+1)} L${p(39,lid[1]-6)}" stroke="${lash}" stroke-width="${W(3.5)}" stroke-linecap="round"/>`; }
  else g+=`<path d="M${p(-25,9+up)} C${p(-24,-11+up)} ${p(-11,-29+up)} ${p(4,-29+up)} C${p(18,-29+up)} ${p(28,-20+up)} ${p(31,-9+up)} L${p(39,-17+up)} C${p(37,-8+up)} ${p(35,-3+up)} ${p(32,1+up)} C${p(29,-12+up)} ${p(19,-22+up)} ${p(4,-22+up)} C${p(-8,-22+up)} ${p(-18,-12+up)} ${p(-21,9+up)}Z" fill="${lash}"/><path d="M${p(16,-27+up)} L${p(22,-35+up)}" stroke="${lash}" stroke-width="${W(2.6)}" stroke-linecap="round"/>`;
  g+=`<path d="M${p(-14,-35+up)} Q${p(6,-42+up)} ${p(26,-31+up)}" fill="none" stroke="${lash}" stroke-width="${W(1.8)}" opacity=".4" stroke-linecap="round"/>`;
  g+=`<path d="M${p(6,26)} Q${p(19,23)} ${p(27,12)}" fill="none" stroke="${lash}" stroke-width="${W(2.4)}" opacity=".55" stroke-linecap="round"/>`;
  if(o.lowerLine) g+=`<path d="M${p(-14,33)} Q${p(4,38)} ${p(20,31)}" fill="none" stroke="${o.lowerLine}" stroke-width="${W(2)}" opacity=".6" stroke-linecap="round"/>`;
  if(!lid&&!sh) g+=`<g class="lid"><path d="${scl}" fill="${o.skin}"/><path d="M${p(-23,8)} Q${p(4,20)} ${p(31,2)}" fill="none" stroke="${lash}" stroke-width="${W(5.5)}" stroke-linecap="round"/></g>`;
  return g;
}
function browSVG(cx,cy,s,emo,col,w,sc,bushy){
  sc=sc||1; const X=u=>r1(cx+s*u*sc), Y=v=>r1(cy+v*sc), p=(u,v)=>X(u)+' '+Y(v);
  let a=[-22,-50,2,-58,30,-50];
  if(emo==='happy'||emo==='laugh') a=[-22,-56,2,-64,30,-56];
  if(['sad','cry','embarrassed','cough'].includes(emo)) a=[-22,-60,2,-57,30,-45];
  if(emo==='angry') a=[-22,-40,2,-50,30,-58];
  if(emo==='shock') a=[-22,-64,2,-74,30,-64];
  if(emo==='think') a = s>0?[-22,-60,2,-70,30,-62]:[-22,-48,2,-53,30,-48];
  if(emo==='smug') a=[-22,-48,2,-56,30,-56];
  if(bushy) return `<path d="M${p(a[0],a[1]+5)} Q${p(a[2],a[3]+4)} ${p(a[4]+4,a[5]+3)} L${p(a[4]+2,a[5]-6)} Q${p(a[2],a[3]-9)} ${p(a[0]-2,a[1]-5)}Z" fill="${col}" stroke="${OUTL}" stroke-width="2" stroke-linejoin="round"/>${[0,1,2,3].map(i=>`<path d="M${p(a[0]+6+i*8,a[1]-2-i)} l${r1(s*5*sc)} ${r1(-4*sc)}" stroke="#fff" stroke-width="1.5" opacity=".35"/>`).join('')}`;
  return `<path d="M${p(a[0],a[1])} Q${p(a[2],a[3])} ${p(a[4],a[5])}" fill="none" stroke="${col}" stroke-width="${w||4}" stroke-linecap="round"/>`;
}
/* ---------- mouth: closed + open (lip-sync) ---------- */
function mouthSVG(emo,x,y,k,lip){
  k=k||1; const S=n=>r1(n*k), M='#a8324a', TG='#ff8fa3';
  const pair=(c,o)=>`<g class="m-closed">${c}</g><g class="m-open">${o}</g>`;
  const oval=(w,h,dy)=>`<path d="M${x-S(w)} ${y+S(dy||0)} Q${x} ${y-S(2)+S(dy||0)} ${x+S(w)} ${y+S(dy||0)} Q${x+S(w*.9)} ${y+S(h)} ${x} ${y+S(h+1)} Q${x-S(w*.9)} ${y+S(h)} ${x-S(w)} ${y+S(dy||0)}Z" fill="${M}" stroke="${OUTL}" stroke-width="2.4" stroke-linejoin="round"/><ellipse cx="${x}" cy="${y+S(h*.72)}" rx="${S(w*.55)}" ry="${S(h*.28)}" fill="${TG}"/>`;
  switch(emo){
    case 'happy': return pair(oval(15,15,-2)+`<path d="M${x-S(11)} ${y} h${S(22)}" stroke="#fff" stroke-width="${S(3)}" opacity=".85"/>`, oval(16,21,-3)+`<path d="M${x-S(12)} ${y-S(1)} h${S(24)}" stroke="#fff" stroke-width="${S(3)}" opacity=".85"/>`);
    case 'laugh': return pair(oval(21,24,-6), oval(22,29,-7));
    case 'sad': return pair(`<path d="M${x-S(11)} ${y+S(6)} Q${x} ${y-S(3)} ${x+S(11)} ${y+S(6)}" fill="none" stroke="${OUTL}" stroke-width="3.2" stroke-linecap="round"/>`, `<path d="M${x-S(10)} ${y+S(7)} Q${x} ${y-S(4)} ${x+S(10)} ${y+S(7)} Q${x} ${y+S(13)} ${x-S(10)} ${y+S(7)}Z" fill="${M}" stroke="${OUTL}" stroke-width="2.4"/>`);
    case 'cry': return pair(oval(15,16,0), oval(17,22,0));
    case 'shock': return pair(`<ellipse cx="${x}" cy="${y+S(5)}" rx="${S(8)}" ry="${S(10)}" fill="${M}" stroke="${OUTL}" stroke-width="2.6"/>`, `<ellipse cx="${x}" cy="${y+S(6)}" rx="${S(10)}" ry="${S(14)}" fill="${M}" stroke="${OUTL}" stroke-width="2.6"/><ellipse cx="${x}" cy="${y+S(14)}" rx="${S(6)}" ry="${S(4)}" fill="${TG}"/>`);
    case 'cough': return pair(`<ellipse cx="${x}" cy="${y+S(4)}" rx="${S(11)}" ry="${S(8)}" fill="${M}" stroke="${OUTL}" stroke-width="2.6"/>`, `<ellipse cx="${x}" cy="${y+S(5)}" rx="${S(12)}" ry="${S(11)}" fill="${M}" stroke="${OUTL}" stroke-width="2.6"/>`);
    case 'angry': return pair(`<path d="M${x-S(13)} ${y+S(1)} L${x+S(13)} ${y+S(1)} L${x+S(10)} ${y+S(9)} L${x-S(10)} ${y+S(9)}Z" fill="#fff" stroke="${OUTL}" stroke-width="2.6" stroke-linejoin="round"/><path d="M${x-S(11)} ${y+S(5)} H${x+S(11)}" stroke="${OUTL}" stroke-width="1.4"/>`, `<path d="M${x-S(15)} ${y} L${x+S(15)} ${y} L${x+S(11)} ${y+S(15)} L${x-S(11)} ${y+S(15)}Z" fill="${M}" stroke="${OUTL}" stroke-width="2.6" stroke-linejoin="round"/><path d="M${x-S(13)} ${y+S(2)} H${x+S(13)} V${y+S(5)} H${x-S(13)}Z" fill="#fff"/>`);
    case 'embarrassed': return pair(`<path d="M${x-S(13)} ${y+S(2)} q${S(4.3)} ${S(-6)} ${S(8.7)} 0 t${S(8.7)} 0 t${S(8.7)} 0" fill="none" stroke="${OUTL}" stroke-width="2.8" stroke-linecap="round"/>`, `<path d="M${x-S(12)} ${y+S(2)} q${S(4)} ${S(-6)} ${S(8)} 0 t${S(8)} 0 t${S(8)} 0 Q${x+S(6)} ${y+S(12)} ${x-S(1)} ${y+S(12)} Q${x-S(9)} ${y+S(12)} ${x-S(12)} ${y+S(2)}Z" fill="${M}" stroke="${OUTL}" stroke-width="2.4"/>`);
    case 'think': return pair(`<path d="M${x-S(2)} ${y+S(3)} Q${x+S(7)} ${y-S(1)} ${x+S(14)} ${y+S(3)}" fill="none" stroke="${OUTL}" stroke-width="2.8" stroke-linecap="round"/>`, `<ellipse cx="${x+S(7)}" cy="${y+S(4)}" rx="${S(6)}" ry="${S(6)}" fill="${M}" stroke="${OUTL}" stroke-width="2.4"/>`);
    case 'smug': return pair(`<path d="M${x-S(13)} ${y+S(1)} Q${x+S(3)} ${y+S(10)} ${x+S(15)} ${y-S(5)}" fill="none" stroke="${lip||OUTL}" stroke-width="3.2" stroke-linecap="round"/>`, `<path d="M${x-S(12)} ${y} Q${x+S(3)} ${y+S(2)} ${x+S(14)} ${y-S(5)} Q${x+S(8)} ${y+S(12)} ${x-S(3)} ${y+S(10)} Q${x-S(10)} ${y+S(8)} ${x-S(12)} ${y}Z" fill="${M}" stroke="${OUTL}" stroke-width="2.4"/>`);
    default: return pair(`<path d="M${x-S(10)} ${y} Q${x} ${y+S(7)} ${x+S(10)} ${y}" fill="none" stroke="${lip||OUTL}" stroke-width="3.2" stroke-linecap="round"/>`, oval(9,11,0));
  }
}
function fxSVG(emo,L,R,y,o){
  o=o||{}; let s='';
  const a=emo==='embarrassed'?.75:(['happy','laugh','smug'].includes(emo)?.55:.35);
  s+=`<ellipse cx="${L-6}" cy="${y+40}" rx="${o.br||25}" ry="11" fill="url(#${o.P}bl)" opacity="${a}"/><ellipse cx="${R+6}" cy="${y+40}" rx="${o.br||25}" ry="11" fill="url(#${o.P}bl)" opacity="${a}"/>`;
  if(emo==='embarrassed'||emo==='happy'||emo==='laugh') s+=[0,1,2].map(i=>`<path d="M${L-17+i*9} ${y+35} l-5 9 M${R-9+i*9} ${y+35} l-5 9" stroke="#ff5c86" stroke-width="2.2" stroke-linecap="round" opacity=".75"/>`).join('');
  if(['embarrassed','shock','sad'].includes(emo)) s+=`<path class="drop" d="M${R+58} ${y-64} q-14 22 0 28 q14 -6 0 -28Z" fill="#bfe9ff" stroke="#3a8fd0" stroke-width="2.5"/>`;
  if(emo==='angry') s+=`<g transform="translate(${R+42},${y-100})"><g stroke="#ff3d5c" stroke-width="5" stroke-linecap="round" fill="none" class="pulse"><path d="M0 9 Q9 9 9 0"/><path d="M15 0 Q15 9 24 9"/><path d="M0 15 Q9 15 9 24"/><path d="M24 15 Q15 15 15 24"/></g></g>`;
  if(emo==='sad'||emo==='cry') s+=`<g stroke="#8a7fb8" stroke-width="3" opacity=".45">${[0,1,2,3].map(i=>`<path d="M${L-46+i*14} ${y-140} v40"/>`).join('')}</g>`;
  if(emo==='happy'||emo==='laugh'||emo==='smug') s+=`<path class="twinkle" d="M${R+66} ${y-74} l5 14 l14 5 l-14 5 l-5 14 l-5 -14 l-14 -5 l14 -5Z" fill="#ffe07a" stroke="#e0a000" stroke-width="2"/>`;
  if(emo==='think') s+=`<text class="bob" x="${R+52}" y="${y-74}" font-size="56" font-weight="900" fill="#7b61ff" font-family="sans-serif">?</text>`;
  if(emo==='shock') s+=`<g stroke="${OUTL}" stroke-width="4" stroke-linecap="round"><path d="M${L-60} ${y-94} l-14 -16"/><path d="M${L-70} ${y-62} l-20 -6"/><path d="M${R+60} ${y-94} l14 -16"/><path d="M${R+70} ${y-62} l20 -6"/></g>`;
  return s;
}
/* ---------- character definitions ---------- */
const PAL={
  me:{skin:'#ffe8da', sh:'#f6c2ab', hair:['#f0a86e','#c06a3c','#8a4226'], hl:'#ffe0bf', hO:'#5a2412', iris:['#5e2408','#e08a2a','#ffe69a'], brow:'#8a4426', lash:'#3b1810'},
  me2:{skin:'#ffe4d2', sh:'#f2bea6', hair:['#6f86c8','#3a4a86','#1c2450'], hl:'#b8ccff', hO:'#141a3a', iris:['#3a1a08','#a8642e','#f6c890'], brow:'#26305a', lash:'#1a1422'},
  yeh:{skin:'#ffeadf', sh:'#f4c8b6', hair:['#5a78bc','#2c3e74','#141c40'], hl:'#a8c4ff', hO:'#0e1230', iris:['#0c3e48','#1fa89c','#bdfff0'], brow:'#1e2850', lash:'#141626'},
  wife:{skin:'#ffdfca', sh:'#eeb79c', hair:['#d0805a','#94462e','#5a2416'], hl:'#ffc4a0', hO:'#3a160c', iris:['#4a220e','#b06c34','#f8c890'], brow:'#5a2a1a', lash:'#2e1810'},
  chen:{skin:'#f8cba2', sh:'#e0a074', hair:['#e4e7ee','#aeb3c2','#7c8192'], hl:'#ffffff', hO:'#555a6a', iris:['#24140a','#6a4426','#c8a478'], brow:'#5a5a66', lash:'#2e2220'},
};
const FACE_STD='M124 196 C122 250 134 290 160 316 C176 330 190 337 200 338 C210 337 224 330 240 316 C266 290 278 250 276 196 C276 136 246 104 200 104 C154 104 124 136 124 196Z';
function defsFor(P,c){ return `${grad(P+'h',c.hair[0],c.hair[2],1,c.hair[1])}${grad(P+'hb',c.hair[1],c.hair[2],1)}${grad(P+'s',c.skin,c.sh,1)}${rgrad(P+'bl','#ff6f91',.9)}${grad(P+'coat','#ffffff','#dde4f2',1)}`; }
function faceBase(P,c,o){
  o=o||{}; const FACE=o.face||FACE_STD, ex=o.earX||[120,280], ey=o.earY||244, nk=o.neck||[182,218,300,382];
  return `<path d="M${nk[0]} ${nk[2]} L${nk[0]} ${nk[3]} Q200 ${nk[3]+10} ${nk[1]} ${nk[3]} L${nk[1]} ${nk[2]}Z" fill="${c.skin}" stroke="${OUTL}" stroke-width="3"/><path d="M${nk[0]} ${nk[2]+18} Q200 ${nk[2]+52} ${nk[1]} ${nk[2]+18} L${nk[1]} ${nk[2]+44} Q200 ${nk[2]+66} ${nk[0]} ${nk[2]+44}Z" fill="${c.sh}" opacity=".85"/>
  ${ex.map((x,i)=>`<ellipse cx="${x}" cy="${ey}" rx="12" ry="18" fill="${c.skin}" stroke="${OUTL}" stroke-width="3"/><path d="M${x+(i?-3:3)} ${ey-8} q${i?6:-6} 8 0 16" fill="none" stroke="${c.sh}" stroke-width="3"/>`).join('')}
  <path d="${FACE}" fill="url(#${P}s)" stroke="${OUTL}" stroke-width="3.4"/><clipPath id="${P}fc"><path d="${FACE}"/></clipPath>`;
}
function bangShadow(P,c,d){ return d?`<g clip-path="url(#${P}fc)"><path d="${d}" transform="translate(3 9)" fill="${c.sh}"/></g>`:''; }
function eyesAll(c,emo,P,o){
  const eo={P, iris:c.iris, skin:c.skin, emo, sc:o.sc||1, lash:c.lash, lidBase:o.lidBase, lowerLine:o.lowerLine,
    gaze: emo==='embarrassed'?[9,4]:emo==='think'?[-8,-7]:emo==='sad'?[0,4]:[0,0]};
  return eyeSVG(o.L,o.y,-1,eo)+eyeSVG(o.R,o.y,1,eo);
}
const coatBody=(P,y)=>`<path d="M56 560 C60 468 110 ${y+28} 172 ${y} L228 ${y} C290 ${y+28} 340 468 344 560Z" fill="url(#${P}coat)" stroke="${OUTL}" stroke-width="3.4"/>`;
/* ---- intern (girl) : twin tails tied with capsule bands ---- */
function drawMe(emo,P){
  const c=PAL.me, H=`url(#${P}h)`;
  const back=`<path d="M200 74 C120 74 86 134 90 212 C92 270 100 316 116 348 C124 362 138 368 150 364 L250 364 C262 368 276 362 284 348 C300 316 308 270 310 212 C314 134 280 74 200 74Z" fill="url(#${P}hb)" stroke="${c.hO}" stroke-width="3"/>`;
  const tail=(s)=>{ const m=x=>200+s*(x-200);
    return `<g class="sway ${s>0?'s2':''}"><path d="M${m(110)} 262 C${m(74)} 286 ${m(56)} 340 ${m(62)} 400 C${m(66)} 444 ${m(82)} 476 ${m(100)} 494 C${m(92)} 462 ${m(94)} 432 ${m(104)} 404 C${m(112)} 380 ${m(116)} 356 ${m(118)} 330 C${m(122)} 360 ${m(118)} 400 ${m(112)} 430 C${m(126)} 400 ${m(134)} 356 ${m(130)} 300Z" fill="${H}" stroke="${c.hO}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M${m(92)} 312 C${m(80)} 350 ${m(78)} 394 ${m(86)} 432" fill="none" stroke="${c.hl}" stroke-width="4" opacity=".6" stroke-linecap="round"/>
      <g transform="rotate(${s*-38} ${m(112)} 280)"><rect x="${m(112)-15}" y="271" width="30" height="17" rx="8.5" fill="#fff" stroke="${OUTL}" stroke-width="2.4"/><rect x="${s>0?m(112)-15:m(112)}" y="271" width="15" height="17" rx="0" fill="#ff5c8f"/><rect x="${m(112)-15}" y="271" width="30" height="17" rx="8.5" fill="none" stroke="${OUTL}" stroke-width="2.4"/></g></g>`; };
  const body=coatBody(P,384)+`
   <path d="M172 384 Q200 400 228 384 L222 432 Q200 442 178 432Z" fill="#a6ecd6" stroke="${OUTL}" stroke-width="3"/>
   <path d="M172 384 L188 412 L200 398Z M228 384 L212 412 L200 398Z" fill="#fff" stroke="${OUTL}" stroke-width="2.6" stroke-linejoin="round"/>
   <path d="M200 412 L184 402 L184 424Z M200 412 L216 402 L216 424Z" fill="#ff7fa8" stroke="${OUTL}" stroke-width="2.2" stroke-linejoin="round"/><circle cx="200" cy="412" r="4.5" fill="#ff5c8f" stroke="${OUTL}" stroke-width="2"/>
   <path d="M172 384 L142 402 L188 506 L196 446Z M228 384 L258 402 L212 506 L204 446Z" fill="#fff" stroke="${OUTL}" stroke-width="3" stroke-linejoin="round"/>
   <path d="M196 440 L180 560 M204 440 L220 560" stroke="#3d7bff" stroke-width="4"/><g transform="rotate(-6 250 500)"><rect x="230" y="480" width="46" height="60" rx="6" fill="#fff" stroke="${OUTL}" stroke-width="2.6"/><rect x="236" y="486" width="34" height="20" rx="3" fill="#ffd1e0"/><circle cx="253" cy="496" r="7" fill="${c.hair[1]}"/><path d="M238 514 h30 M238 522 h22" stroke="#999" stroke-width="2.5"/></g>
   <g transform="translate(108 462) rotate(-12)"><rect x="0" y="0" width="12" height="44" rx="4" fill="#ff7fa8" stroke="${OUTL}" stroke-width="2"/><rect x="0" y="0" width="12" height="10" rx="3" fill="#fff" stroke="${OUTL}" stroke-width="2"/></g>`;
  const bangs='M118 236 C106 160 142 92 204 90 C264 90 302 142 290 236 C284 214 276 196 266 186 C266 204 262 216 254 226 C252 202 246 184 236 172 C234 194 226 208 214 216 C214 194 208 178 198 166 C192 186 182 200 168 208 C172 192 172 176 166 162 C158 180 150 194 140 206 C140 192 136 182 132 176 C124 194 120 214 118 236Z';
  const front=`<path d="${bangs}" fill="${H}" stroke="${c.hO}" stroke-width="3" stroke-linejoin="round"/>
   <path d="M146 124 Q200 100 258 122 L252 136 L242 127 L232 138 L222 128 L210 139 L198 128 L186 139 L176 128 L164 138 L154 130Z" fill="${c.hl}" opacity=".75"/>
   <path d="M174 112 Q166 140 168 160 M222 108 Q232 136 238 160 M200 104 Q202 130 204 150 M150 150 Q142 170 140 190" fill="none" stroke="${c.hair[2]}" stroke-width="2" opacity=".45" stroke-linecap="round"/>
   <path class="sway" d="M126 188 C114 230 114 284 126 324 C130 336 138 344 144 346 C138 324 136 294 138 266 C140 238 140 212 134 194Z" fill="${H}" stroke="${c.hO}" stroke-width="3"/>
   <path class="sway s2" d="M274 188 C286 230 286 284 274 324 C270 336 262 344 256 346 C262 324 264 294 262 266 C260 238 260 212 266 194Z" fill="${H}" stroke="${c.hO}" stroke-width="3"/>
   <path class="ahoge" d="M206 94 C196 56 226 38 248 52 C230 50 214 62 214 94Z" fill="${H}" stroke="${c.hO}" stroke-width="2.6"/>
   <g transform="rotate(28 270 148)"><rect x="248" y="139" width="46" height="19" rx="9.5" fill="#fff" stroke="${OUTL}" stroke-width="2.6"/><path d="M248 148.5 a9.5 9.5 0 0 1 9.5 -9.5 h13.5 v19 h-13.5 a9.5 9.5 0 0 1 -9.5 -9.5Z" fill="#ff5c8f"/><path d="M254 144 h10" stroke="#fff" stroke-width="2.5" stroke-linecap="round" opacity=".8"/></g>`;
  return {back, body, mid:tail(-1)+tail(1), face:faceBase(P,c), bangs, front, eyes:{L:160,R:240,y:250,sc:1.1}, brow:{w:4,dy:2}, nose:'M199 280 L203 287 L198 288', mouth:[200,306]};
}
/* ---- intern (boy) : soft messy hair ---- */
function drawMe2(emo,P){
  const c=PAL.me2, H=`url(#${P}h)`;
  const back=`<path d="M200 78 C128 78 96 132 98 202 C100 242 106 268 118 284 L130 272 L140 292 L260 292 L270 272 L282 284 C294 268 300 242 302 202 C304 132 272 78 200 78Z" fill="url(#${P}hb)" stroke="${c.hO}" stroke-width="3"/>`;
  const body=coatBody(P,384)+`
   <path d="M174 384 L200 420 L226 384 L224 436 L200 452 L176 436Z" fill="#a6ecd6" stroke="${OUTL}" stroke-width="3" stroke-linejoin="round"/><path d="M174 384 L190 412 L200 400 L210 412 L226 384" fill="#d2f6ea" stroke="${OUTL}" stroke-width="2.6" stroke-linejoin="round"/>
   <path d="M174 384 L142 402 L190 506 L198 446Z M226 384 L258 402 L210 506 L202 446Z" fill="#fff" stroke="${OUTL}" stroke-width="3" stroke-linejoin="round"/>
   <path d="M196 446 L180 560 M204 446 L220 560" stroke="#3d7bff" stroke-width="4"/><g transform="rotate(5 252 500)"><rect x="232" y="480" width="46" height="60" rx="6" fill="#fff" stroke="${OUTL}" stroke-width="2.6"/><rect x="238" y="486" width="34" height="20" rx="3" fill="#cfe0ff"/><circle cx="255" cy="496" r="7" fill="${c.hair[1]}"/><path d="M240 514 h30 M240 522 h22" stroke="#999" stroke-width="2.5"/></g>
   <g transform="translate(112 456) rotate(-10)"><rect x="0" y="0" width="11" height="46" rx="4" fill="#3d7bff" stroke="${OUTL}" stroke-width="2"/><rect x="0" y="0" width="11" height="10" rx="3" fill="#fff" stroke="${OUTL}" stroke-width="2"/></g>`;
  const bangs='M114 232 C102 186 108 140 132 116 L122 98 C148 86 172 78 196 80 L198 62 C214 72 230 76 246 84 L264 72 C260 92 276 104 284 122 L302 126 C292 138 294 160 290 182 C292 206 290 222 286 234 C280 214 272 200 262 192 L266 224 C256 206 248 194 240 186 L238 216 C228 198 220 188 210 180 L204 212 C196 192 188 184 178 178 L170 208 C164 192 156 184 148 180 L140 206 C134 194 128 188 124 186 C118 202 116 216 114 232Z';
  const front=`<path d="${bangs}" fill="${H}" stroke="${c.hO}" stroke-width="3" stroke-linejoin="round"/>
   <path d="M144 118 Q200 96 262 118 L256 132 L246 123 L236 134 L226 124 L214 135 L202 124 L190 135 L180 124 L168 134 L156 126Z" fill="${c.hl}" opacity=".6"/>
   <path d="M172 104 Q166 130 170 150 M226 100 Q236 126 240 150" fill="none" stroke="${c.hair[2]}" stroke-width="2" opacity=".5" stroke-linecap="round"/>
   <path class="sway" d="M122 198 C112 226 114 256 124 278 L130 262 L136 270 C134 248 136 224 140 210Z" fill="${H}" stroke="${c.hO}" stroke-width="3" stroke-linejoin="round"/>
   <path class="sway s2" d="M278 198 C288 226 286 256 276 278 L270 262 L264 270 C266 248 264 224 260 210Z" fill="${H}" stroke="${c.hO}" stroke-width="3" stroke-linejoin="round"/>
   <path class="ahoge" d="M204 80 C194 52 206 34 226 32 C214 44 210 60 212 80Z" fill="${H}" stroke="${c.hO}" stroke-width="2.6"/>`;
  const face='M126 194 C124 252 138 292 164 318 C180 332 192 338 200 339 C208 338 220 332 236 318 C262 292 276 252 274 194 C274 136 246 104 200 104 C154 104 126 136 126 194Z';
  const band=`<g transform="rotate(-12 252 290)"><rect x="236" y="282" width="34" height="14" rx="6" fill="#ffe0b8" stroke="${OUTL}" stroke-width="2"/><path d="M247 286 v6 M253 286 v6 M259 286 v6" stroke="#d9a878" stroke-width="1.6"/></g>`;
  return {back, body, face:faceBase(P,c,{face}), bangs, extraFace:band, front, eyes:{L:162,R:238,y:252,sc:.98}, brow:{w:5.2,dy:2}, nose:'M199 282 L203 289 L198 290', mouth:[200,308]};
}
/* ---- Pharmacist Yeh : long hair, one side tucked behind the ear ---- */
function drawYeh(emo,P){
  const c=PAL.yeh, H=`url(#${P}h)`;
  const back=`<path class="sway-b" d="M200 72 C112 72 84 150 88 250 C90 350 82 450 72 560 L328 560 C318 450 312 350 314 250 C318 150 288 72 200 72Z" fill="url(#${P}hb)" stroke="${c.hO}" stroke-width="3"/>
   <path d="M110 300 Q104 420 96 540 M292 300 Q298 420 304 540" fill="none" stroke="${c.hl}" stroke-width="3" opacity=".35"/>`;
  const body=coatBody(P,384)+`
   <path d="M172 384 Q200 404 228 384 L224 452 L200 472 L176 452Z" fill="#2a3466" stroke="${OUTL}" stroke-width="3"/><path d="M178 390 Q200 408 222 390 L218 402 Q200 414 182 402Z" fill="#fff" stroke="${OUTL}" stroke-width="2"/>
   <circle cx="200" cy="424" r="7" fill="#ffd166" stroke="#a37a00" stroke-width="2"/>
   <path d="M172 384 L144 402 L192 512 L200 472Z M228 384 L256 402 L208 512 L200 472Z" fill="#fff" stroke="${OUTL}" stroke-width="3" stroke-linejoin="round"/>
   <rect x="232" y="456" width="44" height="54" rx="6" fill="#fff" stroke="${OUTL}" stroke-width="2.6"/><rect x="238" y="462" width="32" height="16" rx="3" fill="#9ad8ff"/><text x="254" y="500" font-size="12" font-weight="900" text-anchor="middle" fill="${OUTL}" font-family="Noto Sans TC,sans-serif">藥師</text>
   <path d="M144 450 l6 40" stroke="#ff5c8f" stroke-width="5" stroke-linecap="round"/><path d="M154 448 l5 42" stroke="#3d7bff" stroke-width="5" stroke-linecap="round"/>`;
  const bangs='M118 240 C104 156 146 92 206 90 C266 92 302 150 290 236 C284 214 278 198 268 188 C264 206 258 218 248 226 C250 206 244 188 232 174 C212 194 186 204 160 206 C170 196 176 182 178 168 C164 180 150 192 138 206 C136 192 134 182 132 176 C124 196 120 218 118 240Z';
  const front=`<path d="${bangs}" fill="${H}" stroke="${c.hO}" stroke-width="3" stroke-linejoin="round"/>
   <path d="M150 122 Q204 100 262 124 L256 136 L246 128 L236 139 L226 129 L214 139 L202 129 L190 139 L178 129 L166 139 L158 131Z" fill="${c.hl}" opacity=".55"/>
   <path d="M180 112 Q206 140 236 168 M196 106 Q226 130 252 160" fill="none" stroke="${c.hair[2]}" stroke-width="2" opacity=".45" stroke-linecap="round"/>
   <path class="sway" d="M126 192 C106 262 104 362 114 452 C120 492 134 518 146 526 C136 480 136 400 142 318 C144 268 142 226 134 200Z" fill="${H}" stroke="${c.hO}" stroke-width="3"/>
   <path d="M126 262 Q122 340 128 420" fill="none" stroke="${c.hl}" stroke-width="3" opacity=".45" stroke-linecap="round"/>
   <path d="M270 196 C282 214 290 236 288 260 C278 244 272 226 270 196Z" fill="${H}" stroke="${c.hO}" stroke-width="2.4"/>
   <rect x="146" y="150" width="30" height="7" rx="3.5" fill="#e8c35a" stroke="#8a6a1a" stroke-width="1.6" transform="rotate(-28 160 154)"/>`;
  const acc=`<g fill="rgba(210,240,255,.14)" stroke="#8a2f45" stroke-width="3.2"><path d="M124 226 Q124 216 136 216 L184 216 Q192 216 192 226 L190 256 Q188 270 174 270 L140 270 Q126 270 125 256Z"/><path d="M208 226 Q208 216 216 216 L264 216 Q276 216 276 226 L275 256 Q274 270 260 270 L226 270 Q212 270 210 256Z"/></g><path d="M192 230 Q200 224 208 230" fill="none" stroke="#8a2f45" stroke-width="3.2"/>
   <path d="M134 262 l24 -36 M150 264 l14 -20 M218 262 l24 -36 M234 264 l14 -20" stroke="#fff" stroke-width="3.2" opacity=".45" stroke-linecap="round"/>
   <circle cx="250" cy="290" r="2.6" fill="#3a2232"/><g transform="translate(281 262)"><path d="M0 0 v8" stroke="#c9a227" stroke-width="2"/><rect x="-5" y="8" width="10" height="20" rx="5" fill="#fff" stroke="${OUTL}" stroke-width="1.8"/><rect x="-5" y="8" width="10" height="10" rx="5" fill="#1fa89c"/></g>`;
  const face='M126 196 C124 252 136 292 162 318 C178 332 192 340 200 341 C208 340 222 332 238 318 C264 292 276 252 274 196 C274 136 246 104 200 104 C154 104 126 136 126 196Z';
  return {back, body, face:faceBase(P,c,{face}), bangs, front, acc, eyes:{L:160,R:240,y:246,lidBase:[-22,-20],sc:1.02}, brow:{w:3.6,dy:2}, nose:'M199 280 L203 287 L198 288', mouth:[200,308], lip:'#c74a5a'};
}
/* ---- Mrs. Chen : curly perm, floral blouse, apron ---- */
function scallop(cx,cy,rx,ry,a0,a1,n,b){
  let d=''; for(let i=0;i<=n;i++){ const t=(a0+(a1-a0)*i/n)*Math.PI/180, x=r1(cx+rx*Math.cos(t)), y=r1(cy+ry*Math.sin(t)); d+= i?` A${b} ${b} 0 0 1 ${x} ${y}`:`M${x} ${y}`; } return d;
}
function drawWife(emo,P){
  const c=PAL.wife, H=`url(#${P}h)`;
  const back=`<path d="${scallop(200,200,112,118,150,390,15,19)} L292 300 Q200 318 108 300Z" fill="url(#${P}hb)" stroke="${c.hO}" stroke-width="3"/>`;
  const flowers=[[96,470],[146,526],[300,478],[262,536],[318,548],[78,540],[120,424],[286,424]];
  const body=`<path d="M56 560 C62 466 114 412 172 384 L228 384 C286 412 338 466 344 560Z" fill="#f7a6bf" stroke="${OUTL}" stroke-width="3.4"/>
   ${flowers.map(([x,y])=>`<g transform="translate(${x} ${y})">${[0,72,144,216,288].map(a=>`<ellipse cx="0" cy="-6" rx="4.5" ry="6.5" fill="#fff" transform="rotate(${a})"/>`).join('')}<circle r="3.6" fill="#ffd166"/></g>`).join('')}
   <defs><pattern id="${P}gg" width="16" height="16" patternUnits="userSpaceOnUse"><rect width="16" height="16" fill="#fff4b8"/><rect width="8" height="16" fill="#ffe27a" opacity=".6"/><rect width="16" height="8" fill="#ffe27a" opacity=".6"/></pattern></defs>
   <path d="M146 414 Q200 430 254 414 L266 560 L134 560Z" fill="url(#${P}gg)" stroke="${OUTL}" stroke-width="3"/><path d="M146 414 L128 388 M254 414 L272 388" stroke="#f0c040" stroke-width="10" stroke-linecap="round"/>
   <rect x="170" y="476" width="60" height="40" rx="6" fill="#fff8d6" stroke="${OUTL}" stroke-width="2.4"/><path d="M170 486 h60" stroke="#f0c040" stroke-width="3"/>
   <path d="M172 384 Q200 406 228 384 L218 400 Q200 412 182 400Z" fill="#fff" stroke="${OUTL}" stroke-width="2.6"/>`;
  const bangs=`M124 222 C118 160 154 120 200 118 C246 120 282 160 276 222 ${scallop(200,162,80,30,15,165,5,19).replace(/^M[^A]+/,'L277 178 ')} L124 226Z`;
  const front=`<path d="${bangs}" fill="${H}" stroke="${c.hO}" stroke-width="3" stroke-linejoin="round"/>
   ${[[150,150],[184,136],[222,138],[256,156],[140,186],[268,190]].map(([x,y])=>`<path d="M${x-8} ${y+4} q8 -14 16 -2 q-4 8 -10 4" fill="none" stroke="${c.hO}" stroke-width="2" opacity=".55"/>`).join('')}
   <path d="M150 140 Q200 124 252 142" fill="none" stroke="${c.hl}" stroke-width="7" opacity=".5" stroke-linecap="round"/>
   <path d="M166 132 q8 -10 18 -3 M218 130 q10 -8 18 2" fill="none" stroke="#ece8f0" stroke-width="3" opacity=".85" stroke-linecap="round"/>
   <g transform="translate(266 138)"><g class="spin-slow">${[0,72,144,216,288].map(a=>`<ellipse cx="0" cy="-9" rx="7" ry="10" fill="#ff8fb1" stroke="${OUTL}" stroke-width="1.6" transform="rotate(${a})"/>`).join('')}</g><circle r="5.5" fill="#ffd166" stroke="${OUTL}" stroke-width="1.6"/></g>`;
  const acc=`<circle cx="122" cy="272" r="5.5" fill="#fff" stroke="#c8c8d0" stroke-width="2"/><circle cx="278" cy="272" r="5.5" fill="#fff" stroke="#c8c8d0" stroke-width="2"/>`;
  const face='M128 204 C126 256 138 292 164 316 C180 330 192 336 200 337 C208 336 220 330 236 316 C262 292 274 256 272 204 C272 148 244 116 200 116 C156 116 128 148 128 204Z';
  return {back, body, face:faceBase(P,c,{face, earY:252}), bangs, acc, front, eyes:{L:164,R:236,y:256,sc:.88,lowerLine:c.sh}, brow:{w:3.6,dy:8}, nose:'M199 286 Q204 292 198 294', mouth:[200,310], lip:'#d6455d'};
}
/* ---- Uncle Chen : tank top, towel round the neck, palm-leaf fan ---- */
function drawChen(emo,P){
  const c=PAL.chen; const fanUp=emo!=='cough';
  const body=`<path d="M24 560 C30 450 100 398 160 382 L240 382 C300 398 370 450 376 560Z" fill="url(#${P}s)" stroke="${OUTL}" stroke-width="3.4"/>
   <path d="M96 560 C98 480 118 432 146 408 C170 432 230 432 254 408 C282 432 302 480 304 560Z" fill="#fbfaf4" stroke="${OUTL}" stroke-width="3.4"/>
   <path d="M122 540 Q200 576 278 540" fill="none" stroke="#e2ddcc" stroke-width="3"/>
   <path d="M148 386 C118 420 122 470 132 560 L172 560 C164 480 164 432 184 400Z" fill="#f6fbff" stroke="${OUTL}" stroke-width="3" stroke-linejoin="round"/>
   <path d="M252 386 C282 420 278 470 268 560 L228 560 C236 480 236 432 216 400Z" fill="#f6fbff" stroke="${OUTL}" stroke-width="3" stroke-linejoin="round"/>
   <path d="M134 520 h38 M134 532 h38 M228 520 h38 M228 532 h38" stroke="#5ab8ff" stroke-width="4"/>
   <path d="M150 384 Q200 412 250 384" fill="none" stroke="#f6fbff" stroke-width="18" stroke-linecap="round"/><path d="M146 378 Q200 404 254 378" fill="none" stroke="${OUTL}" stroke-width="2.6" opacity=".6"/>
   <path d="M158 420 q6 20 0 40 M242 420 q-6 20 0 40" fill="none" stroke="#dbe6f0" stroke-width="2.4"/>`;
  const fan= fanUp?`<g class="fan"><path d="M320 466 L334 376" stroke="#8d6e48" stroke-width="8" stroke-linecap="round"/><path d="M334 380 C302 356 298 296 336 282 C374 296 372 356 338 380Z" fill="#f3e2a8" stroke="#8a6a2a" stroke-width="3"/>${[-18,-9,0,9,18].map(a=>`<path d="M336 376 L${336+a*1.4} 292" stroke="#c8a860" stroke-width="2"/>`).join('')}<ellipse cx="322" cy="468" rx="22" ry="18" fill="${c.skin}" stroke="${OUTL}" stroke-width="3"/></g>`
   :`<circle cx="232" cy="326" r="26" fill="${c.skin}" stroke="${OUTL}" stroke-width="3"/><path d="M214 318 h34 M214 330 h34" stroke="${OUTL}" stroke-width="2" opacity=".45"/><g stroke="${OUTL}" stroke-width="3" stroke-linecap="round" fill="none"><path d="M108 296 q-14 10 0 20"/><path d="M92 286 q-20 20 0 40"/></g>`;
  const face='M108 214 C106 274 122 318 156 342 C172 354 188 360 200 361 C212 360 228 354 244 342 C278 318 294 274 292 214 C292 146 252 110 200 110 C148 110 108 146 108 214Z';
  const front=`<path d="M114 228 C102 200 108 168 126 152 C124 176 128 202 138 224 C130 230 120 232 114 228Z M286 228 C298 200 292 168 274 152 C276 176 272 202 262 224 C270 230 280 232 286 228Z" fill="url(#${P}h)" stroke="${c.hO}" stroke-width="2.8"/>
   <path d="M118 210 l-8 4 M120 196 l-8 2 M282 210 l8 4 M280 196 l8 2" stroke="${c.hO}" stroke-width="2.4" stroke-linecap="round"/>
   <path d="M164 118 Q200 104 238 120 M172 126 Q204 114 230 128 M180 134 Q206 126 224 136" fill="none" stroke="#b6bbc8" stroke-width="3" stroke-linecap="round"/>
   <path class="ahoge" d="M206 112 C202 86 216 74 228 80 C218 84 212 94 212 112Z" fill="#d0d4de" stroke="${c.hO}" stroke-width="2.4"/>
   <ellipse cx="186" cy="138" rx="38" ry="13" fill="#fff" opacity=".6"/>`;
  const extra=`<path d="M146 330 Q200 380 254 330" fill="none" stroke="${c.sh}" stroke-width="3" opacity=".75"/><path d="M166 354 Q200 372 234 354" fill="none" stroke="${c.sh}" stroke-width="2.6" opacity=".7"/>
   <g fill="#8a6a5a" opacity=".45">${[[176,340],[186,346],[198,349],[210,346],[222,340],[170,328],[230,328],[192,336],[206,336]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="1.8"/>`).join('')}</g>
   <path d="M146 286 Q142 302 148 314 M254 286 Q258 302 252 314" fill="none" stroke="${c.sh}" stroke-width="2.6" opacity=".7"/>
   <ellipse cx="200" cy="284" rx="17" ry="13" fill="url(#${P}nose)" stroke="${OUTL}" stroke-width="2.6"/><ellipse cx="194" cy="279" rx="5.5" ry="3.5" fill="#fff" opacity=".65"/>`;
  return {back:'', body, face:faceBase(P,c,{face, earX:[102,298], earY:246, neck:[176,224,330,384]}), front, extraFace:extra, post:fan, eyes:{L:158,R:242,y:244,sc:.8,lidBase:[-19,-15]}, brow:{bushy:true, dy:6, sc:1.05}, nose:'', mouth:[200,316], mk:1.1, blushR:30, defsX:`<radialGradient id="${P}nose" cx=".4" cy=".35"><stop offset="0" stop-color="#ffb4a0"/><stop offset="1" stop-color="#e5735e"/></radialGradient>`};
}
const DRAW={me:drawMe, me2:drawMe2, yeh:drawYeh, wife:drawWife, chen:drawChen};
function charSVG(who, emo){
  emo=emo||'neutral'; const P='c'+(++SVGN);
  if(who==='pilly') return pillySVG(emo);
  if(who==='me'&&typeof S!=='undefined'&&S.avatar==='me2') who='me2';
  const c=PAL[who], d=DRAW[who](emo,P), E=d.eyes;
  const brows=browSVG(E.L,E.y+(d.brow.dy||0),-1,emo,c.brow,d.brow.w,d.brow.sc,d.brow.bushy)+browSVG(E.R,E.y+(d.brow.dy||0),1,emo,c.brow,d.brow.w,d.brow.sc,d.brow.bushy);
  const nose=d.nose?`<path d="${d.nose}" fill="none" stroke="${c.sh}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`:'';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 560" class="cs cs-${who}"><defs>${defsFor(P,c)}${d.defsX||''}</defs>
  <ellipse cx="200" cy="556" rx="170" ry="14" fill="#000" opacity=".12"/>
  ${d.back}<g class="breath">${d.body}</g>${d.mid||''}${d.face}${bangShadow(P,c,d.bangs)}${d.extraFace||''}${eyesAll(c,emo,P,E)}${nose}${mouthSVG(emo,d.mouth[0],d.mouth[1],d.mk||1,d.lip)}${fxSVG(emo,E.L,E.R,E.y,{P,br:d.blushR})}${d.front}${brows}${d.acc||''}${d.post||''}</svg>`;
}
function pillySVG(emo){
  emo=emo||'happy'; const P='p'+(++SVGN);
  const eyes = emo==='happy'||emo==='laugh' ? `<path d="M74 112 q10 -14 20 0 M106 112 q10 -14 20 0" fill="none" stroke="${OUTL}" stroke-width="5" stroke-linecap="round"/>`
    : emo==='shock' ? `<circle cx="84" cy="108" r="12" fill="#fff" stroke="${OUTL}" stroke-width="4"/><circle cx="116" cy="108" r="12" fill="#fff" stroke="${OUTL}" stroke-width="4"/><circle cx="84" cy="108" r="3.5" fill="${OUTL}"/><circle cx="116" cy="108" r="3.5" fill="${OUTL}"/>`
    : `<g><ellipse cx="84" cy="108" rx="10" ry="13" fill="#2a1630"/><ellipse cx="116" cy="108" rx="10" ry="13" fill="#2a1630"/><circle cx="80" cy="102" r="4.2" fill="#fff"/><circle cx="112" cy="102" r="4.2" fill="#fff"/><circle cx="88" cy="114" r="2" fill="#fff"/><circle cx="120" cy="114" r="2" fill="#fff"/></g>`;
  const mouth = emo==='shock' ? `<ellipse cx="100" cy="134" rx="7" ry="9" fill="#b8324f" stroke="${OUTL}" stroke-width="3"/>` : `<g class="m-closed"><path d="M90 128 q5 6 10 0 q5 6 10 0" fill="none" stroke="${OUTL}" stroke-width="3.5" stroke-linecap="round"/></g><g class="m-open"><path d="M90 127 q10 16 20 0Z" fill="#b8324f" stroke="${OUTL}" stroke-width="3"/></g>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240" class="cs cs-pilly"><defs>${grad(P+'k','#ffb3cf','#ff4f86',1)}${grad(P+'w','#ffffff','#eef3ff',1)}<clipPath id="${P}c"><rect x="54" y="40" width="92" height="166" rx="46"/></clipPath></defs>
  <g class="wing"><path d="M54 110 C20 80 6 110 22 130 C8 140 20 166 54 146Z" fill="#e6f6ff" stroke="#7ab8e0" stroke-width="3"/></g><g class="wing w2"><path d="M146 110 C180 80 194 110 178 130 C192 140 180 166 146 146Z" fill="#e6f6ff" stroke="#7ab8e0" stroke-width="3"/></g>
  <g clip-path="url(#${P}c)"><rect x="54" y="40" width="92" height="84" fill="url(#${P}k)"/><rect x="54" y="124" width="92" height="82" fill="url(#${P}w)"/></g>
  <rect x="54" y="40" width="92" height="166" rx="46" fill="none" stroke="${OUTL}" stroke-width="5"/><path d="M54 124 h92" stroke="${OUTL}" stroke-width="3.5"/>
  <path d="M70 78 q4 -22 24 -28" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".75"/>
  <path class="ahoge" d="M100 40 C96 20 110 10 122 16 C112 18 106 26 106 40Z" fill="#7fd99a" stroke="${OUTL}" stroke-width="2.5"/>
  ${eyes}<ellipse cx="72" cy="128" rx="9" ry="5" fill="#ff7d9c" opacity=".65"/><ellipse cx="128" cy="128" rx="9" ry="5" fill="#ff7d9c" opacity=".65"/>${mouth}
  <circle cx="46" cy="164" r="10" fill="#fffaf2" stroke="${OUTL}" stroke-width="4"/><circle cx="154" cy="150" r="10" fill="#fffaf2" stroke="${OUTL}" stroke-width="4"/>
  <path class="twinkle" d="M176 40 l4 11 l11 4 l-11 4 l-4 11 l-4 -11 l-11 -4 l11 -4Z" fill="#ffe07a" stroke="#e0a000" stroke-width="2"/><path class="twinkle t2" d="M24 56 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 l8 -3Z" fill="#9ad8ff" stroke="#3a8fd0" stroke-width="2"/></svg>`;
}
function monsterSVG(state){
  const P='m'+(++SVGN); state=state||'normal';
  const eyes = state==='hit' ? `<g stroke="#fff" stroke-width="10" stroke-linecap="round"><path d="M150 150 l40 40 M190 150 l-40 40 M290 150 l40 40 M330 150 l-40 40"/></g>`
    : state==='dead' ? `<g fill="none" stroke="#fff" stroke-width="7"><path d="M150 170 q20 -30 40 0 q-20 30 -40 0"/><path d="M290 170 q20 -30 40 0 q-20 30 -40 0"/></g>`
    : state==='laugh' ? `<path d="M140 176 q30 -36 60 0 M280 176 q30 -36 60 0" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round"/>`
    : `<path d="M136 150 L204 176 Q200 214 168 214 Q138 212 136 180Z" fill="#fff" stroke="#2a0f5a" stroke-width="5"/><path d="M344 150 L276 176 Q280 214 312 214 Q342 212 344 180Z" fill="#fff" stroke="#2a0f5a" stroke-width="5"/>
       <circle cx="172" cy="190" r="13" fill="#ff2d5f"/><circle cx="308" cy="190" r="13" fill="#ff2d5f"/><circle cx="168" cy="186" r="4" fill="#fff"/><circle cx="304" cy="186" r="4" fill="#fff"/>`;
  const mouth = state==='dead' ? `<path d="M190 280 q50 -24 100 0" fill="none" stroke="#2a0f5a" stroke-width="7" stroke-linecap="round"/>`
    : `<path d="M150 252 Q240 ${state==='laugh'?340:318} 330 252 Q240 284 150 252Z" fill="#2a0f5a"/><path d="M178 262 l12 22 l10 -18 M268 264 l12 20 l12 -24" fill="#fff"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 400"><defs><radialGradient id="${P}b" cx=".45" cy=".35" r=".7"><stop offset="0" stop-color="#c7a4ff"/><stop offset=".6" stop-color="#7a3ff0"/><stop offset="1" stop-color="#3d148f"/></radialGradient>
   <radialGradient id="${P}a"><stop offset="0" stop-color="#d9b8ff" stop-opacity=".7"/><stop offset="1" stop-color="#7a3ff0" stop-opacity="0"/></radialGradient></defs>
  <ellipse cx="240" cy="210" rx="240" ry="200" fill="url(#${P}a)"/>
  <g transform="rotate(-24 150 70)"><rect x="120" y="20" width="60" height="110" rx="30" fill="#fff" stroke="#2a0f5a" stroke-width="5"/><path d="M120 50 a30 30 0 0 1 60 0 v25 h-60Z" fill="#ff2d5f"/></g>
  <g transform="rotate(24 330 70)"><rect x="300" y="20" width="60" height="110" rx="30" fill="#fff" stroke="#2a0f5a" stroke-width="5"/><path d="M300 50 a30 30 0 0 1 60 0 v25 h-60Z" fill="#ffb21f"/></g>
  <path d="M240 60 C340 50 430 120 420 214 C440 300 360 372 250 362 C130 374 46 302 62 212 C40 124 130 60 240 60Z" fill="url(#${P}b)" stroke="#2a0f5a" stroke-width="7"/>
  <path d="M120 140 Q150 100 200 92" fill="none" stroke="#fff" stroke-width="10" opacity=".35" stroke-linecap="round"/>
  ${eyes}${mouth}
  <text x="40" y="120" font-size="54" font-weight="900" fill="#ffe07a" font-family="sans-serif" opacity=".9">?</text><text x="410" y="110" font-size="48" font-weight="900" fill="#ff8fb6" font-family="sans-serif" opacity=".9">!!</text></svg>`;
}
/* shared animation CSS for inline character SVGs */
const CHAR_CSS=`
.cs .lid{opacity:0;animation:blink var(--blink,4.6s) infinite;animation-delay:var(--bd,0s)}
@keyframes blink{0%,93%{opacity:0}94.5%,97%{opacity:1}98.5%,100%{opacity:0}}
.cs .m-open{opacity:0}
.speaking .cs .m-open{animation:mOpen .24s steps(1,end) infinite}
.speaking .cs .m-closed{animation:mClosed .24s steps(1,end) infinite}
@keyframes mOpen{0%{opacity:1}50%{opacity:0}}
@keyframes mClosed{0%{opacity:0}50%{opacity:1}}
.cs .sway{transform-box:fill-box;transform-origin:50% 0;animation:hairSway 4.2s ease-in-out infinite}
.cs .sway.s2{animation-delay:-2.1s}
.cs .sway-b{transform-box:fill-box;transform-origin:50% 0;animation:hairSwayB 5.4s ease-in-out infinite}
@keyframes hairSway{0%,100%{transform:rotate(0)}50%{transform:rotate(1.6deg) skewX(-1.5deg)}}
@keyframes hairSwayB{0%,100%{transform:scaleX(1)}50%{transform:scaleX(1.012) skewX(.8deg)}}
.cs .ahoge{transform-box:fill-box;transform-origin:20% 100%;animation:ahoge 2.6s ease-in-out infinite}
@keyframes ahoge{0%,100%{transform:rotate(0)}30%{transform:rotate(-7deg)}60%{transform:rotate(5deg)}}
.cs .breath{transform-box:fill-box;transform-origin:50% 100%;animation:breath 3.6s ease-in-out infinite}
@keyframes breath{0%,100%{transform:scale(1,1)}50%{transform:scale(1.008,1.018)}}
.cs .fan{transform-box:fill-box;transform-origin:30% 95%;animation:fanWave 1.1s ease-in-out infinite}
@keyframes fanWave{0%,100%{transform:rotate(-10deg)}50%{transform:rotate(12deg)}}
.cs .wing{transform-box:fill-box;transform-origin:100% 50%;animation:wing .5s ease-in-out infinite}
.cs .wing.w2{transform-origin:0% 50%}
@keyframes wing{50%{transform:scaleX(.7)}}
.cs .twinkle{transform-box:fill-box;transform-origin:center;animation:twk 1.4s ease-in-out infinite}
.cs .twinkle.t2{animation-delay:-.7s}
@keyframes twk{50%{transform:scale(.5) rotate(30deg);opacity:.4}}
.cs .drop{animation:drop 1.6s ease-in infinite}
@keyframes drop{0%{transform:translateY(-6px);opacity:0}25%{opacity:1}100%{transform:translateY(14px);opacity:0}}
.cs .pulse{transform-box:fill-box;transform-origin:center;animation:pulseM .7s ease-in-out infinite}
@keyframes pulseM{50%{transform:scale(1.25)}}
.cs .bob{animation:bobQ 1.2s ease-in-out infinite}
@keyframes bobQ{50%{transform:translateY(-8px)}}
.cs .spin-slow{animation:spin 12s linear infinite;transform-box:fill-box;transform-origin:center}
@keyframes spin{to{transform:rotate(360deg)}}
`;
