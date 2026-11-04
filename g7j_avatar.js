/* =====================================================================
   CHARACTER CUSTOMISER · the student's own pharmacist
   Hairstyle (7 women's cuts for the ♀ body, 8 men's cuts for the ♂ body, plus each original), hair colour, skin tone, eye colour and glasses,
   saved on this device for each of the two bodies (♀ me / ♂ me2). The default look is the original art.
   Drawing: the original body, face, eyes and expressions are reused; only the hair layers, the colours
   and the glasses change, so every expression and scene keeps working.
   ===================================================================== */
const LK_HC={   // natural hair colours: [top, mid, deep], highlight, outline
  black:{n:['黑','Black','ดำ'], hair:['#4a4552','#27232d','#121016'], hl:'#9a94a6', hO:'#0a080e'},
  dbrown:{n:['深棕','Dark brown','น้ำตาลเข้ม'], hair:['#6e4c3a','#3f2a1f','#20130c'], hl:'#b48c70', hO:'#140a06'},
  choco:{n:['巧克力棕','Chocolate','น้ำตาลช็อกโกแลต'], hair:['#93603f','#5f3a25','#361e11'], hl:'#d4a47a', hO:'#1e0f07'},
  caramel:{n:['焦糖','Caramel','คาราเมล'], hair:['#c99060','#925c34','#5c351a'], hl:'#f2cc9c', hO:'#3a1f0c'},
  honey:{n:['蜂蜜金','Honey blonde','บลอนด์น้ำผึ้ง'], hair:['#f0d092','#c99c56','#8c6430'], hl:'#fff3d0', hO:'#5a3c14'},
  ash:{n:['霧灰','Ash grey','เทาหม่น'], hair:['#bdb9c2','#86828e','#4f4b58'], hl:'#f0eef4', hO:'#2c2a32'},
  wine:{n:['酒紅','Burgundy','แดงไวน์'], hair:['#94404f','#5e1f2e','#330c17'], hl:'#d27c8a', hO:'#1e060c'},
  ink:{n:['墨藍','Midnight blue','น้ำเงินเข้ม'], hair:['#4b5a86','#28304e','#121628'], hl:'#9aa8d6', hO:'#0a0c18'},
};
const LK_SKIN={ fair:{n:['白皙','Fair','ขาว'], skin:'#ffeadf', sh:'#f4c6b0'}, light:{n:['自然','Light','ขาวเหลือง'], skin:'#fde0cb', sh:'#efb99c'},
  wheat:{n:['小麥','Wheat','สองสี'], skin:'#f3cba6', sh:'#dca07a'}, tan:{n:['健康','Tan','แทน'], skin:'#e2a97e', sh:'#c3875c'}, deep:{n:['深色','Deep','เข้ม'], skin:'#bd8158', sh:'#975c38'} };
const LK_EYE={ dark:{n:['深棕','Dark brown','น้ำตาลเข้ม'], iris:['#1c0e06','#4e2a14','#94643c']}, brown:{n:['棕','Brown','น้ำตาล'], iris:['#3a1a08','#7a4620','#c8925a']},
  hazel:{n:['淺褐','Hazel','น้ำตาลอ่อน'], iris:['#3e2a0c','#8a6a28','#d6c07a']}, grey:{n:['灰','Grey','เทา'], iris:['#22262e','#5c6676','#b4bece']} };
const LK_GL={ none:['無','None','ไม่ใส่'], round:['圓框','Round','กรอบกลม'], rect:['方框','Square','กรอบเหลี่ยม'], half:['半框','Half-rim','ครึ่งกรอบ'] };
/* --- hairstyles: each returns {back, bangs, front, mid?, defs?} in the 400×560 character box (face 124–276 × 104–338) --- */
const lkStrands=(c,d,w,o)=>`<path d="${d}" fill="none" stroke="${c.hair[2]}" stroke-width="${w||2}" opacity="${o||.4}" stroke-linecap="round"/>`;
const lkShine=(c,d,w,o)=>`<path d="${d}" fill="none" stroke="${c.hl}" stroke-width="${w||6}" opacity="${o||.55}" stroke-linecap="round"/>`;
const lkFill=(c,H,d,cls,sw)=>`<path${cls?` class="${cls}"`:''} d="${d}" fill="${H}" stroke="${c.hO}" stroke-width="${sw||3}" stroke-linejoin="round"/>`;
const lkMirror=d=>d.replace(/(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)/g,(m,x,y)=>`${Math.round((400-(+x))*10)/10} ${y}`);
const HAIRS={
  /* ♀ long, straight, centre-parted curtain bangs */
  long:{g:'f', n:['長直髮','Long straight','ผมยาวตรง'], draw:(c,H,P)=>{
    const back=`<path class="sway-b" d="M200 78 C124 78 92 134 94 212 C96 300 90 400 92 500 C106 512 120 506 132 514 C150 504 164 514 180 508 L220 508 C236 514 250 504 268 514 C280 506 294 512 308 500 C310 400 304 300 306 212 C308 134 276 78 200 78Z" fill="url(#${P}hb)" stroke="${c.hO}" stroke-width="3"/>`
      +lkStrands(c,'M112 300 Q106 400 110 490 M288 300 Q294 400 290 490 M132 330 Q128 420 134 500 M268 330 Q272 420 266 500',2,.35);
    const L='M200 86 C150 86 118 122 116 180 C115 210 118 236 124 262 C132 226 146 196 170 174 C186 160 196 138 200 112Z';
    const bangs=L+' '+lkMirror(L);
    const lock='M124 198 C112 262 112 340 118 410 C122 448 128 474 136 490 C134 452 136 406 138 358 C140 304 140 250 134 212Z';
    const front=lkFill(c,H,bangs)+lkShine(c,'M146 128 Q170 104 196 98 M254 128 Q230 104 204 98',7,.5)
      +lkStrands(c,'M200 92 L200 112 M176 104 Q150 140 140 200 M224 104 Q250 140 260 200 M160 120 Q138 160 132 220 M240 120 Q262 160 268 220')
      +lkFill(c,H,lock,'sway')+lkFill(c,H,lkMirror(lock),'sway s2')+lkStrands(c,'M128 240 Q120 330 128 440 M272 240 Q280 330 272 440',2,.4);
    return {back, bangs, front}; }},
  /* ♀ chin-length bob with a soft straight fringe */
  bob:{g:'f', n:['鮑伯頭','Bob','บ๊อบ'], draw:(c,H,P)=>{
    const back=`<path d="M200 80 C128 80 98 132 98 204 C98 250 100 292 108 324 C128 338 158 340 178 334 L222 334 C242 340 272 338 292 324 C300 292 302 250 302 204 C302 132 272 80 200 80Z" fill="url(#${P}hb)" stroke="${c.hO}" stroke-width="3"/>`;
    const bangs='M118 214 C112 144 148 88 200 88 C252 88 288 144 282 214 C276 206 272 202 266 204 C262 196 256 194 250 198 C244 190 236 190 230 196 C222 188 214 188 208 196 C200 188 192 188 186 196 C178 190 170 190 164 198 C158 194 150 194 144 202 C138 198 130 200 126 206 C122 206 120 210 118 214Z';
    const side='M120 186 C106 236 106 292 116 330 C130 342 150 344 166 338 C150 312 142 280 142 240 C142 214 136 198 128 188Z';
    const front=lkFill(c,H,side,'sway')+lkFill(c,H,lkMirror(side),'sway s2')+lkFill(c,H,bangs)
      +lkShine(c,'M140 134 Q200 104 262 134',8,.45)+lkStrands(c,'M170 100 Q160 150 164 196 M200 92 L200 192 M230 100 Q240 150 236 196 M146 130 Q132 170 132 206 M254 130 Q268 170 268 206 M120 240 Q118 290 128 330 M280 240 Q282 290 272 330');
    return {back, bangs, front}; }},
  /* ♀ high ponytail, side-swept fringe, face-framing wisps */
  pony:{g:'f', n:['高馬尾','High ponytail','หางม้าสูง'], draw:(c,H,P)=>{
    const tail=`<path class="sway-b" d="M248 92 C300 84 334 124 330 188 C326 252 336 304 352 352 C330 344 312 318 304 280 C296 240 300 196 290 160 C282 132 266 112 246 106Z" fill="url(#${P}hb)" stroke="${c.hO}" stroke-width="3"/>`
      +lkStrands(c,'M300 120 Q318 180 314 240 Q314 290 334 336 M286 130 Q300 190 300 250',2,.4);
    const back=tail+`<path d="M200 82 C130 82 102 134 104 206 C106 250 112 280 124 298 L276 298 C288 280 294 250 296 206 C298 134 270 82 200 82Z" fill="url(#${P}hb)" stroke="${c.hO}" stroke-width="3"/>`;
    const bangs='M118 214 C112 146 148 90 206 88 C258 88 290 128 286 186 C274 158 252 138 224 132 C196 128 170 136 150 158 C136 174 126 194 118 214Z';
    const wisp='M126 190 C116 228 118 266 130 298 C132 270 134 240 140 214Z';
    const front=lkFill(c,H,bangs)+lkFill(c,H,wisp,'sway')+lkFill(c,H,'M276 186 C286 222 284 258 274 288 C272 262 270 236 264 210Z','sway s2')
      +`<g transform="rotate(-24 252 100)"><rect x="236" y="90" width="32" height="20" rx="10" fill="#2a2030" stroke="${OUTL}" stroke-width="2.4"/></g>`
      +lkShine(c,'M150 120 Q196 96 248 108',7,.5)+lkStrands(c,'M206 94 Q170 112 150 158 M226 98 Q196 116 178 140 M248 110 Q232 120 214 132 M268 136 Q278 156 284 180');
    return {back, bangs, front}; }},
  /* ♀ top bun with loose strands */
  bun:{g:'f', n:['丸子頭','Top bun','มวยสูง'], draw:(c,H,P)=>{
    const bun=`<circle cx="200" cy="66" r="38" fill="url(#${P}h)" stroke="${c.hO}" stroke-width="3"/>`+lkStrands(c,'M172 58 Q200 34 228 58 M168 74 Q200 52 232 74 M178 90 Q204 72 226 88',2.2,.45)+lkShine(c,'M178 48 Q196 36 214 40',5,.5);
    const back=bun+`<path d="M200 86 C132 86 104 136 106 206 C108 248 112 274 122 290 L278 290 C288 274 292 248 294 206 C296 136 268 86 200 86Z" fill="url(#${P}hb)" stroke="${c.hO}" stroke-width="3"/>`;
    const bangs='M118 216 C112 150 148 96 200 94 C252 96 288 150 282 216 C276 184 262 156 240 140 C226 130 212 124 200 122 C188 124 174 130 160 140 C138 156 124 184 118 216Z';
    const wisp='M128 176 C114 214 116 256 132 292 C128 264 130 236 140 208Z';
    const front=lkFill(c,H,bangs)+lkFill(c,H,wisp,'sway')+lkFill(c,H,lkMirror(wisp),'sway s2')
      +`<rect x="178" y="88" width="44" height="12" rx="6" fill="#2a2030" stroke="${OUTL}" stroke-width="2"/>`
      +lkShine(c,'M152 130 Q200 106 248 130',7,.45)+lkStrands(c,'M200 100 L200 122 M182 104 Q160 124 146 160 M218 104 Q240 124 254 160 M164 116 Q144 140 134 176 M236 116 Q256 140 266 176');
    return {back, bangs, front}; }},
  /* ♀ long soft waves, side part */
  wavy:{g:'f', n:['長捲髮','Long waves','ลอนยาว'], draw:(c,H,P)=>{
    const back=`<path class="sway-b" d="M200 78 C124 78 92 132 94 208 C92 254 82 282 90 316 C98 348 82 378 90 410 C98 444 84 474 98 504 C122 512 140 500 160 510 L240 510 C260 500 278 512 302 504 C316 474 302 444 310 410 C318 378 302 348 310 316 C318 282 308 254 306 208 C308 132 276 78 200 78Z" fill="url(#${P}hb)" stroke="${c.hO}" stroke-width="3"/>`
      +lkStrands(c,'M106 320 Q96 360 106 400 Q114 440 104 480 M294 320 Q304 360 294 400 Q286 440 296 480',2.2,.38);
    const bangs='M118 222 C110 150 146 90 210 88 C262 90 292 132 286 196 C276 162 254 140 226 134 C202 130 180 138 162 156 C142 176 128 198 118 222Z';
    const lock='M126 196 C108 238 128 272 114 312 C102 346 124 380 112 416 C130 402 136 370 132 340 C128 310 142 284 138 250 C136 228 132 210 128 198Z';
    const front=lkFill(c,H,bangs)+lkFill(c,H,lock,'sway')+lkFill(c,H,'M276 186 C294 230 276 266 290 306 C302 342 280 376 292 412 C272 398 266 366 270 336 C274 306 262 280 264 246 C266 222 270 202 274 188Z','sway s2')
      +lkShine(c,'M150 124 Q196 98 250 110',7,.5)+lkStrands(c,'M214 94 Q178 114 160 156 M236 100 Q206 120 190 146 M258 116 Q268 142 276 170 M120 260 Q128 300 118 340 M282 260 Q274 300 284 340');
    return {back, bangs, front}; }},
  /* ♀ shoulder-length layered cut with see-through curtain bangs and flicked ends */
  lob:{g:'f', n:['層次鎖骨髮','Layered lob','ประบ่าเลเยอร์'], draw:(c,H,P)=>{
    const back=`<path class="sway-b" d="M200 80 C126 80 96 134 98 210 C98 280 96 326 90 366 C102 382 120 376 132 388 C142 378 154 384 164 376 L236 376 C246 384 258 378 268 388 C280 376 298 382 310 366 C304 326 302 280 302 210 C304 134 274 80 200 80Z" fill="url(#${P}hb)" stroke="${c.hO}" stroke-width="3"/>`
      +lkStrands(c,'M108 300 Q104 340 100 366 M292 300 Q296 340 300 366 M126 320 Q124 350 132 380 M274 320 Q276 350 268 380',2,.35);
    const L='M200 88 C150 88 118 124 116 184 C116 214 120 240 128 266 C132 236 142 210 160 192 C170 200 176 200 180 196 C176 182 180 164 190 146 C196 134 199 118 200 104Z';
    const bangs=L+' '+lkMirror(L);
    const lock='M122 202 C108 250 108 318 114 362 C120 380 134 390 150 388 C140 374 134 354 134 330 C134 288 140 248 136 216Z';
    const front=lkFill(c,H,bangs)+lkFill(c,H,lock,'sway')+lkFill(c,H,lkMirror(lock),'sway s2')
      +lkShine(c,'M148 128 Q172 104 196 98 M252 128 Q228 104 204 98',7,.5)
      +lkStrands(c,'M200 92 L200 108 M178 104 Q152 140 142 196 M222 104 Q248 140 258 196 M160 196 Q150 210 144 230 M240 196 Q250 210 256 230 M124 250 Q118 310 128 370 M276 250 Q282 310 272 370');
    return {back, bangs, front}; }},
  /* ♀ loose side braid over one shoulder, side-swept fringe */
  braid:{g:'f', n:['側邊麻花辮','Side braid','เปียข้าง'], draw:(c,H,P)=>{
    /* hair behind: the right side tucks in behind the ear, the left side gathers into the braid */
    const back=`<path d="M200 82 C130 82 102 134 104 206 C106 256 112 292 128 322 L196 336 C232 326 262 304 278 274 C292 248 296 226 296 206 C298 134 270 82 200 82Z" fill="url(#${P}hb)" stroke="${c.hO}" stroke-width="3"/>`;
    const bangs='M118 214 C112 146 150 90 208 88 C262 90 292 134 286 196 C274 162 252 142 224 136 C198 132 174 140 156 160 C140 176 128 196 118 214Z';
    const sweep='M118 190 C104 236 106 290 122 326 C128 340 138 350 152 354 C162 344 164 332 160 320 C144 292 136 258 138 222 C138 206 134 196 128 190Z';
    /* the plait: overlapping lobes, drawn bottom-up so each one sits over the next, thinning towards the tie */
    const N=7, pts=[...Array(N)].map((_,i)=>{ const t=i/(N-1); return {x:150-t*16+Math.sin(t*3)*3, y:356+t*118, rx:23-t*7, ry:16-t*3, a:i%2?30:-30}; });
    let pl=''; for(let i=N-1;i>=0;i--){ const q=pts[i], x=q.x.toFixed(1), y=q.y.toFixed(1);
      pl+=`<ellipse cx="${x}" cy="${y}" rx="${q.rx.toFixed(1)}" ry="${q.ry.toFixed(1)}" transform="rotate(${q.a} ${x} ${y})" fill="${H}" stroke="${c.hO}" stroke-width="2.8"/>`
        +`<path d="M${(q.x-q.rx*.55).toFixed(1)} ${(q.y+(q.a>0?2:-2)).toFixed(1)} Q${x} ${(q.y+(q.a>0?-7:7)).toFixed(1)} ${(q.x+q.rx*.55).toFixed(1)} ${(q.y+(q.a>0?-2:2)).toFixed(1)}" fill="none" stroke="${c.hl}" stroke-width="3" opacity=".5" stroke-linecap="round"/>`; }
    const e=pts[N-1], tx=e.x, ty=e.y+e.ry-2;
    const tie=`<rect x="${(tx-10).toFixed(1)}" y="${ty.toFixed(1)}" width="20" height="10" rx="5" fill="#d9546f" stroke="${OUTL}" stroke-width="2"/>`;
    const tuft=lkFill(c,H,`M${(tx-9).toFixed(1)} ${(ty+9).toFixed(1)} C${(tx-16).toFixed(1)} ${(ty+24).toFixed(1)} ${(tx-11).toFixed(1)} ${(ty+38).toFixed(1)} ${(tx-4).toFixed(1)} ${(ty+46).toFixed(1)} L${tx.toFixed(1)} ${(ty+34).toFixed(1)} L${(tx+5).toFixed(1)} ${(ty+46).toFixed(1)} C${(tx+12).toFixed(1)} ${(ty+36).toFixed(1)} ${(tx+13).toFixed(1)} ${(ty+22).toFixed(1)} ${(tx+9).toFixed(1)} ${(ty+9).toFixed(1)}Z`,'',2.4);
    const front=`<g class="sway">${tuft}${pl}${tie}</g>`+lkFill(c,H,sweep)+lkFill(c,H,bangs)
      +lkFill(c,H,'M276 186 C286 222 284 258 274 288 C272 262 270 236 264 210Z','sway s2')
      +lkShine(c,'M150 120 Q196 96 250 110',7,.5)+lkStrands(c,'M210 94 Q174 114 156 158 M234 100 Q204 120 186 146 M258 116 Q268 140 276 168 M124 220 Q118 270 132 316 M134 232 Q132 280 148 330');
    return {back, bangs, front}; }},
  /* ♂ two-block: soft fringe, short sides */
  twoblock:{g:'m', n:['韓系兩側推','Two-block','ทูบล็อก'], draw:(c,H,P)=>{
    const back=`<path d="M200 82 C134 82 108 128 108 190 C108 214 112 232 118 244 L282 244 C288 232 292 214 292 190 C292 128 266 82 200 82Z" fill="url(#${P}hb)" stroke="${c.hO}" stroke-width="3"/>`;
    const bangs='M114 206 C106 144 140 86 200 84 C260 86 294 144 286 206 C280 190 270 180 258 176 L260 200 C248 184 232 176 218 174 L214 198 C204 182 190 174 176 176 L172 198 C162 184 148 178 138 182 C128 188 120 196 114 206Z';
    const sides=`<path d="M116 196 C112 218 114 236 122 248 L134 240 C128 224 128 210 132 196Z M284 196 C288 218 286 236 278 248 L266 240 C272 224 272 210 268 196Z" fill="${c.hair[2]}" opacity=".55"/>`;
    const front=sides+lkFill(c,H,bangs)+lkShine(c,'M148 118 Q200 94 254 118',7,.5)
      +lkStrands(c,'M176 92 Q166 140 172 194 M200 88 Q198 140 214 196 M226 92 Q240 140 258 198 M152 112 Q140 150 138 180 M248 112 Q262 150 262 180');
    return {back, bangs, front}; }},
  /* ♂ classic side part */
  sidepart:{g:'m', n:['紳士旁分','Side part','แสกข้าง'], draw:(c,H,P)=>{
    const back=`<path d="M200 80 C134 80 106 128 106 192 C106 216 110 234 116 246 L284 246 C290 234 294 216 294 192 C294 128 266 80 200 80Z" fill="url(#${P}hb)" stroke="${c.hO}" stroke-width="3"/>`;
    const bangs='M116 210 C108 146 140 90 192 84 C252 78 296 120 288 192 C282 174 270 162 254 154 C266 170 274 188 276 206 C262 178 238 158 206 152 C180 148 164 138 158 118 C148 136 138 154 130 174 C124 188 120 198 116 210Z';
    const front=`<path d="M116 196 C112 218 114 236 122 248 L134 240 C128 224 128 210 132 196Z M284 196 C288 218 286 236 278 248 L266 240 C272 224 272 210 268 196Z" fill="${c.hair[2]}" opacity=".5"/>`
      +lkFill(c,H,bangs)+`<path d="M158 118 C150 134 140 152 132 172" fill="none" stroke="${c.hO}" stroke-width="2.6" opacity=".8"/>`
      +lkShine(c,'M176 106 Q230 92 270 126',7,.5)+lkStrands(c,'M170 116 Q214 120 250 150 M168 104 Q220 102 262 136 M200 130 Q240 140 266 174 M146 140 Q136 162 130 186');
    return {back, bangs, front}; }},
  /* ♂ undercut quiff: volume swept up and back, forehead open */
  quiff:{g:'m', n:['油頭飛機頭','Quiff','อันเดอร์คัตปัดขึ้น'], draw:(c,H,P)=>{
    const back=`<path d="M200 60 C148 56 116 88 112 138 C110 178 112 214 120 242 L280 242 C288 214 290 178 288 138 C284 88 252 56 200 60Z" fill="url(#${P}hb)" stroke="${c.hO}" stroke-width="3"/>`;
    const bangs='M118 180 C112 124 140 74 196 62 C242 54 288 78 292 130 C294 152 288 168 282 180 C274 158 258 144 236 138 C214 132 188 130 166 134 C146 140 128 154 118 180Z';
    const front=`<path d="M118 180 C114 206 116 228 122 246 L136 238 C130 220 130 202 134 186Z M282 180 C286 206 284 228 278 246 L264 238 C270 220 270 202 266 186Z" fill="${c.hair[2]}" opacity=".5"/>`
      +lkFill(c,H,bangs)+lkShine(c,'M160 96 Q206 66 258 86',8,.55)
      +lkStrands(c,'M150 140 Q170 96 214 72 M176 134 Q196 96 238 78 M204 132 Q222 100 262 92 M232 136 Q252 112 280 112 M134 160 Q150 120 184 92');
    return {back, bangs, front}; }},
  /* ♂ short crew cut */
  crew:{g:'m', n:['平頭短髮','Crew cut','รองทรงสั้น'], draw:(c,H,P)=>{
    const back=`<path d="M200 92 C142 92 118 130 118 184 C118 208 120 226 124 238 L276 238 C280 226 282 208 282 184 C282 130 258 92 200 92Z" fill="url(#${P}hb)" stroke="${c.hO}" stroke-width="3"/>`;
    const bangs='M122 188 C120 136 152 100 200 98 C248 100 280 136 278 188 C270 164 254 150 232 146 C214 142 186 142 168 146 C146 150 130 164 122 188Z';
    const dots=[...Array(26)].map((_,i)=>{ const a=Math.PI*(.12+.76*(i%13)/12), r=i<13?70:52; return `<circle cx="${(200-Math.cos(a)*r).toFixed(1)}" cy="${(170-Math.sin(a)*r*.9).toFixed(1)}" r="1.6"/>`; }).join('');
    const front=lkFill(c,H,bangs)+`<g fill="${c.hair[2]}" opacity=".45">${dots}</g>`+lkShine(c,'M160 118 Q200 104 240 118',6,.45);
    return {back, bangs, front}; }},
  /* ♂ wolf cut: layered, collar length, centre part */
  wolf:{g:'m', n:['狼尾剪','Wolf cut','วูล์ฟคัท'], draw:(c,H,P)=>{
    const back=`<path class="sway-b" d="M200 80 C132 80 102 128 102 196 C102 252 106 292 114 322 L130 304 L140 330 L156 308 L168 324 L232 324 L244 308 L260 330 L270 304 L286 322 C294 292 298 252 298 196 C298 128 268 80 200 80Z" fill="url(#${P}hb)" stroke="${c.hO}" stroke-width="3"/>`;
    const L='M200 88 C152 88 120 124 116 182 C114 200 116 216 120 230 C128 206 140 190 158 180 L156 202 C168 184 184 168 196 148 L200 116Z';
    const bangs=L+' '+lkMirror(L);
    const lock='M122 196 C112 230 114 270 124 302 L132 288 L138 304 C136 278 138 250 142 220Z';
    const front=lkFill(c,H,bangs)+lkFill(c,H,lock,'sway')+lkFill(c,H,lkMirror(lock),'sway s2')
      +lkShine(c,'M150 122 Q172 100 196 94 M250 122 Q228 100 204 94',6,.5)+lkStrands(c,'M200 92 L200 114 M178 102 Q156 136 146 180 M222 102 Q244 136 254 180 M128 240 Q124 270 130 296 M272 240 Q276 270 270 296');
    return {back, bangs, front}; }},
  /* ♂ soft textured crop (curly perm) */
  perm:{g:'m', n:['韓系燙捲','Soft perm','ดัดลอนเกาหลี'], draw:(c,H,P)=>{
    const back=`<path d="M200 74 C130 72 100 124 102 192 C104 220 110 238 118 250 L282 250 C290 238 296 220 298 192 C300 124 270 72 200 74Z" fill="url(#${P}hb)" stroke="${c.hO}" stroke-width="3"/>`;
    const bangs='M114 210 C104 176 108 146 122 126 C118 108 132 92 150 92 C158 78 176 72 192 78 C204 68 226 70 236 82 C254 80 270 92 274 110 C290 120 296 150 288 180 C288 192 287 202 286 210 C280 196 272 188 262 186 C258 202 246 206 238 196 C230 210 214 210 208 196 C200 210 184 210 178 196 C170 208 154 206 150 192 C140 190 130 194 124 202 C120 204 116 206 114 210Z';
    const curls=[[150,112],[176,98],[204,94],[232,102],[258,118],[136,146],[164,132],[192,124],[220,126],[248,140],[270,158],[146,170],[176,160],[206,156],[236,164],[262,182]].map(([x,y])=>`M${x-8} ${y+2} q2 -10 10 -8 q8 2 6 10 q-2 6 -8 4`).join(' ');
    const front=lkFill(c,H,bangs)+lkStrands(c,curls,2.4,.5)+lkShine(c,'M160 100 Q196 80 236 92',6,.5)+lkShine(c,'M136 140 q6 -6 12 -4 M196 118 q6 -6 12 -4 M246 132 q6 -6 12 -4',3,.6);
    return {back, bangs, front}; }},
  /* ♂ curtain hair: centre part, fringe falling to both sides */
  curtain:{g:'m', n:['中分瀏海','Curtain fringe','ผมม่านแสกกลาง'], draw:(c,H,P)=>{
    const back=`<path d="M200 80 C134 80 106 128 106 192 C106 218 110 236 116 248 L284 248 C290 236 294 218 294 192 C294 128 266 80 200 80Z" fill="url(#${P}hb)" stroke="${c.hO}" stroke-width="3"/>`;
    const L='M200 88 C154 86 120 118 114 172 C112 194 114 214 120 230 C126 206 138 190 152 182 C160 198 170 202 178 198 C172 182 174 162 184 144 C192 128 198 112 200 100Z';
    const bangs=L+' '+lkMirror(L);
    const front=`<path d="M116 200 C112 222 114 238 122 250 L134 242 C128 226 128 212 132 200Z M284 200 C288 222 286 238 278 250 L266 242 C272 226 272 212 268 200Z" fill="${c.hair[2]}" opacity=".55"/>`
      +lkFill(c,H,bangs)+lkShine(c,'M150 120 Q174 100 196 96 M250 120 Q226 100 204 96',7,.5)
      +lkStrands(c,'M200 94 L200 108 M182 104 Q156 132 146 178 M218 104 Q244 132 254 178 M168 112 Q140 140 130 196 M232 112 Q260 140 270 196 M186 132 Q170 160 174 194 M214 132 Q230 160 226 194');
    return {back, bangs, front}; }},
  /* ♂ slicked back with a side part, short faded sides */
  slick:{g:'m', n:['側分油頭','Slick back','เสยเรียบ'], draw:(c,H,P)=>{
    const back=`<path d="M200 70 C140 68 112 104 110 156 C108 196 112 224 118 242 L282 242 C288 224 292 196 290 156 C288 104 260 68 200 70Z" fill="url(#${P}hb)" stroke="${c.hO}" stroke-width="3"/>`;
    const bangs='M116 198 C110 130 144 80 200 76 C256 80 290 128 284 198 C278 178 270 164 258 156 C242 148 222 144 200 146 C178 144 158 148 142 156 C130 164 122 178 116 198Z';
    const front=`<path d="M116 186 C112 212 114 232 122 248 L136 240 C130 222 130 204 134 188Z M284 186 C288 212 286 232 278 248 L264 240 C270 222 270 204 266 188Z" fill="${c.hair[2]}" opacity=".55"/>`
      +lkFill(c,H,bangs)+`<path d="M156 150 C150 126 156 104 170 86" fill="none" stroke="${c.hO}" stroke-width="2.6" opacity=".8"/>`
      +lkShine(c,'M178 128 Q196 96 236 82 M206 134 Q228 104 262 104',7,.55)
      +lkStrands(c,'M170 146 Q176 112 200 88 M188 144 Q198 108 226 86 M208 144 Q220 110 250 96 M230 148 Q244 120 268 116 M250 154 Q262 134 278 136 M146 154 Q140 128 150 104',2.2,.45);
    return {back, bangs, front}; }},
};
/* women's and men's cuts are separate lists: the ♀ body only offers women's styles, the ♂ body only men's */
const LK_ORDER={me:['orig','long','lob','bob','wavy','pony','bun','braid'], me2:['orig','twoblock','curtain','sidepart','quiff','slick','crew','wolf','perm']};
const LK_ORIG={me:['雙馬尾（原本）','Twin tails (original)','แกละแคปซูล (เดิม)'], me2:['蓬鬆亂髮（原本）','Messy (original)','ผมฟู (เดิม)']};
/* glasses over the eyes (E = eye anchors from the body drawing) */
const LK_GLASS={
  round:E=>{ const r=E.sc>1?33:31, y=E.y+2; return `<g fill="rgba(255,255,255,.12)" stroke="#a9874a" stroke-width="3.2"><circle cx="${E.L}" cy="${y}" r="${r}"/><circle cx="${E.R}" cy="${y}" r="${r}"/></g><path d="M${E.L+r} ${y-4} Q200 ${y-14} ${E.R-r} ${y-4} M${E.L-r} ${y-6} L${E.L-r-14} ${y-12} M${E.R+r} ${y-6} L${E.R+r+14} ${y-12}" fill="none" stroke="#a9874a" stroke-width="3"/><path d="M${E.L-14} ${y-18} l10 -6 M${E.R-14} ${y-18} l10 -6" stroke="#fff" stroke-width="3" opacity=".7" stroke-linecap="round"/>`; },
  rect:E=>{ const w=E.sc>1?66:62, h=46, y=E.y+2; return `<g fill="rgba(255,255,255,.1)" stroke="#2a2230" stroke-width="5"><rect x="${E.L-w/2}" y="${y-h/2}" width="${w}" height="${h}" rx="10"/><rect x="${E.R-w/2}" y="${y-h/2}" width="${w}" height="${h}" rx="10"/></g><path d="M${E.L+w/2} ${y-8} Q200 ${y-16} ${E.R-w/2} ${y-8} M${E.L-w/2} ${y-12} L${E.L-w/2-12} ${y-16} M${E.R+w/2} ${y-12} L${E.R+w/2+12} ${y-16}" fill="none" stroke="#2a2230" stroke-width="4.5"/><path d="M${E.L-20} ${y-12} l12 -6 M${E.R-20} ${y-12} l12 -6" stroke="#fff" stroke-width="3" opacity=".7" stroke-linecap="round"/>`; },
  half:E=>{ const w=E.sc>1?64:60, y=E.y+2; return `<path d="M${E.L-w/2} ${y-6} Q${E.L} ${y-24} ${E.L+w/2} ${y-6} M${E.R-w/2} ${y-6} Q${E.R} ${y-24} ${E.R+w/2} ${y-6}" fill="none" stroke="#5a5f6e" stroke-width="5" stroke-linecap="round"/><path d="M${E.L-w/2} ${y-6} Q${E.L-w/2+4} ${y+20} ${E.L} ${y+22} Q${E.L+w/2-4} ${y+20} ${E.L+w/2} ${y-6} M${E.R-w/2} ${y-6} Q${E.R-w/2+4} ${y+20} ${E.R} ${y+22} Q${E.R+w/2-4} ${y+20} ${E.R+w/2} ${y-6}" fill="rgba(255,255,255,.1)" stroke="#9aa0ae" stroke-width="1.6"/><path d="M${E.L+w/2} ${y-8} Q200 ${y-16} ${E.R-w/2} ${y-8} M${E.L-w/2} ${y-8} L${E.L-w/2-12} ${y-12} M${E.R+w/2} ${y-8} L${E.R+w/2+12} ${y-12}" fill="none" stroke="#5a5f6e" stroke-width="3.6"/>`; },
};
/* --- saved looks: one per body, on this device --- */
const LK_DEF={hair:'orig', hc:'orig', skin:'orig', eye:'orig', gl:'none'};
const LOOKS=(()=>{ let o={}; try{ o=JSON.parse(localStorage.getItem('phd_look')||'{}')||{}; }catch(e){}
  const r={me:Object.assign({},LK_DEF,o.me||{}), me2:Object.assign({},LK_DEF,o.me2||{})};
  ['me','me2'].forEach(b=>{ if(!LK_ORDER[b].includes(r[b].hair)) r[b].hair='orig'; }); return r; })();
const lkSaveAll=()=>{ try{ localStorage.setItem('phd_look', JSON.stringify(LOOKS)); }catch(e){} };
const lkIsDefault=lk=>Object.keys(LK_DEF).every(k=>lk[k]===LK_DEF[k]);
function lkPal(base, lk){ const o=PAL[base], c=Object.assign({}, o, {hair:o.hair.slice(), iris:o.iris.slice()});
  const h=LK_HC[lk.hc]; if(h){ c.hair=h.hair.slice(); c.hl=h.hl; c.hO=h.hO; c.brow=h.hair[2]; c.lash=h.hO; }
  const s=LK_SKIN[lk.skin]; if(s){ c.skin=s.skin; c.sh=s.sh; }
  const e=LK_EYE[lk.eye]; if(e) c.iris=e.iris.slice();
  return c; }
/* draw the player with a given look (base = 'me' or 'me2') */
function lkDraw(base, lk, emo, origCharSVG){ const keepP=PAL[base], keepD=DRAW[base]; PAL[base]=lkPal(base, lk);
  DRAW[base]=(e,P)=>{ const d=keepD(e,P), c=PAL[base];
    if(lk.hair&&lk.hair!=='orig'&&HAIRS[lk.hair]&&LK_ORDER[base].includes(lk.hair)){ const h=HAIRS[lk.hair].draw(c,`url(#${P}h)`,P); d.back=h.back||''; d.bangs=h.bangs||''; d.front=h.front||''; d.mid=h.mid||''; if(base==='me2') d.extraFace=''; if(base==='me') d.post=''; }
    const g=LK_GLASS[lk.gl]; if(g) d.acc=(d.acc||'')+g(d.eyes); return d; };
  const keepAv=S.avatar; S.avatar=base;
  try{ return origCharSVG('me', emo); } finally { PAL[base]=keepP; DRAW[base]=keepD; S.avatar=keepAv; } }
const LK_CHAR=charSVG;
charSVG=function(who, emo){ if(who!=='me'||typeof S==='undefined') return LK_CHAR(who, emo);
  const base=S.avatar==='me2'?'me2':'me', lk=LOOKS[base]; if(!lk||lkIsDefault(lk)) return LK_CHAR(who, emo);
  return lkDraw(base, lk, emo, LK_CHAR); };
/* ---------- the customiser (title screen: ✨ button by the big character) ---------- */
const LKT={ btn:['✨ 打扮角色','✨ Customise','✨ แต่งตัวละคร'], title:['✨ 打扮你的藥師','✨ Your pharmacist','✨ แต่งตัวเภสัชกรของคุณ'],
  hair:['髮型','Hairstyle','ทรงผม'], hc:['髮色','Hair colour','สีผม'], skin:['膚色','Skin tone','สีผิว'], eye:['眼睛顏色','Eye colour','สีตา'], gl:['眼鏡','Glasses','แว่นตา'],
  orig:['原本','Original','แบบเดิม'], rand:['🎲 隨機','🎲 Random','🎲 สุ่ม'], reset:['↺ 恢復原本','↺ Original look','↺ กลับแบบเดิม'], done:['✅ 完成','✅ Done','✅ เสร็จ'],
  note:['只存在這台裝置上，下次打開還在。','Saved on this device — it will still be here next time.','บันทึกไว้ในเครื่องนี้ เปิดครั้งหน้าก็ยังอยู่'] };
const LKS={emo:'happy'};
function lkCss(){ if($('#lkCss')) return; const st=document.createElement('style'); st.id='lkCss'; st.textContent=`
#lkBtn{position:absolute;right:250px;bottom:46px;z-index:6;padding:12px 26px;border-radius:99px;font-family:var(--tc);font-weight:900;font-size:26px;color:#fff;background:linear-gradient(90deg,#ff6f9f,#8f6bff);box-shadow:0 0 0 4px #fff,0 8px 20px rgba(80,30,120,.35);animation:lkPulse 2.4s ease-in-out infinite}
#lkBtn:hover{transform:translateY(-3px) scale(1.04)}
@keyframes lkPulse{50%{box-shadow:0 0 0 4px #fff,0 8px 26px rgba(143,107,255,.7)}}
#lkUI{position:fixed;inset:0;z-index:240;background:rgba(15,10,35,.62);display:flex;align-items:center;justify-content:center;padding:12px}
#lkUI .card{width:min(1000px,100%);height:min(700px,100%);display:flex;flex-direction:column;border-radius:24px;overflow:hidden;background:#fff;box-shadow:0 0 0 5px #fff,0 0 0 10px #b9a3ff,0 20px 50px rgba(0,0,0,.5);animation:enterC .3s}
#lkUI .hd{display:flex;align-items:center;gap:10px;padding:8px 14px;background:linear-gradient(90deg,#ff7aa8,#8f7cff);color:#fff}
#lkUI .hd b{font-size:19px;font-weight:900;flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#lkUI .hd .bs{display:flex;gap:6px}#lkUI .hd .bs button{padding:5px 12px;border-radius:99px;font-weight:900;font-size:14px;background:rgba(255,255,255,.3);color:#fff}
#lkUI .hd .bs button.on{background:#fff;color:#5a3fd6}
#lkUI .hd .x{width:34px;height:34px;border-radius:50%;background:#fff;color:#5a3fd6;font-weight:900;font-size:18px}
#lkUI .mn{flex:1;display:flex;min-height:0}
#lkUI .pvw{width:38%;min-width:170px;display:flex;flex-direction:column;background:radial-gradient(circle at 50% 40%,#fff,#efe9fb)}
#lkUI .pv{flex:1;min-height:0;display:flex;align-items:flex-end;justify-content:center;overflow:hidden}
#lkUI .pv svg{height:100%;width:auto;max-width:100%}
#lkUI .emo{display:flex;gap:6px;justify-content:center;padding:6px}#lkUI .emo button{width:38px;height:38px;border-radius:50%;background:#fff;font-size:20px;box-shadow:inset 0 0 0 2px #e6dff5}
#lkUI .emo button.on{box-shadow:inset 0 0 0 3px #8f7cff}
#lkUI .op{flex:1;overflow:auto;padding:10px 14px 14px}
#lkUI h4{margin:10px 0 6px;font-size:15.5px;color:#3a2a7a}#lkUI h4:first-child{margin-top:2px}
#lkUI .hg{display:grid;grid-template-columns:repeat(auto-fill,minmax(86px,1fr));gap:8px}
#lkUI .hg button{border-radius:14px;background:#f6f3fc;padding:4px 4px 6px;box-shadow:inset 0 0 0 2px #e6dff5;display:flex;flex-direction:column;align-items:center}
#lkUI .hg button.on{background:#fff;box-shadow:inset 0 0 0 3px #5a3fd6}
#lkUI .hg .th{width:100%;height:84px;overflow:hidden;border-radius:10px;background:linear-gradient(#fff,#efe9fb)}#lkUI .hg .th svg{width:100%;height:100%;display:block}
#lkUI .hg .nm{font-size:12px;font-weight:800;color:#3a2a5a;line-height:1.2;margin-top:2px;text-align:center}
#lkUI .sw{display:flex;gap:10px;flex-wrap:wrap}
#lkUI .sw button{display:flex;flex-direction:column;align-items:center;gap:3px;font-size:11.5px;font-weight:700;color:#4a3a6a;background:none;min-width:52px}
#lkUI .sw i{width:34px;height:34px;border-radius:50%;box-shadow:inset 0 0 0 2px rgba(0,0,0,.12)}
#lkUI .sw button.on i{box-shadow:0 0 0 3px #fff,0 0 0 6px #5a3fd6}
#lkUI .gl{display:flex;gap:8px;flex-wrap:wrap}#lkUI .gl button{padding:6px 14px;border-radius:99px;font-weight:800;font-size:14px;background:#f6f3fc;color:#4a3a6a;box-shadow:inset 0 0 0 2px #e6dff5}
#lkUI .gl button.on{background:#5a3fd6;color:#fff;box-shadow:none}
#lkUI .ft{display:flex;gap:8px;align-items:center;padding:8px 14px;border-top:1px solid #efeaf6}
#lkUI .ft .nt{flex:1;color:#7a7090;font-size:12.5px}
#lkUI .ft button{padding:8px 16px;border-radius:99px;font-weight:900;font-size:14.5px;background:#f1eef8;color:#4a3a6a}
#lkUI .ft button.ok{background:#18b07f;color:#fff}
@media (max-height:460px){#lkUI .card{height:100%}#lkUI .hg .th{height:66px}#lkUI .emo button{width:32px;height:32px;font-size:17px}#lkUI h4{margin:6px 0 4px}}
@media (max-width:640px){#lkUI .pvw{min-width:130px}}
@media (max-width:560px) and (min-height:561px){#lkUI .mn{flex-direction:column}#lkUI .pvw{width:100%;height:36%;flex-direction:row}#lkUI .emo{flex-direction:column}#lkUI .hd .bs button{padding:5px 9px}}
`; document.head.appendChild(st); }
function lkRefreshTitle(){ if(typeof renderTitleChars==='function'&&$('#titleChars')) renderTitleChars();
  $$('.gsel').forEach(b=>{ const keep=S.avatar; S.avatar=b.dataset.av; const av=b.querySelector('.av'); if(av) av.innerHTML=charSVG('me','happy'); S.avatar=keep; b.classList.toggle('on',b.dataset.av===S.avatar); }); }
function lkOpen(){ lkCss(); sfx.select(); let ui=$('#lkUI'); if(!ui){ ui=document.createElement('div'); ui.id='lkUI'; document.body.appendChild(ui); } ui.classList.remove('hidden'); lkRender(); }
function lkClose(){ const ui=$('#lkUI'); if(ui) ui.remove(); lkSaveAll(); lkRefreshTitle(); sfx.click(); }
document.addEventListener('keydown', e=>{ if(e.key==='Escape'&&$('#lkUI')){ e.stopPropagation(); lkClose(); } }, true);
function lkRender(){ const ui=$('#lkUI'); if(!ui) return; const base=S.avatar==='me2'?'me2':'me', lk=LOOKS[base], keepScroll=(ui.querySelector('.op')||{}).scrollTop||0;
  const pal=PAL[base], sw=(v,col,label,on)=>`<button data-v="${v}" class="${on?'on':''}" title="${esc(label)}"><i style="background:${col}"></i>${esc(label)}</button>`;
  const hcCol=k=>k==='orig'?`linear-gradient(160deg,${pal.hair[0]},${pal.hair[2]})`:`linear-gradient(160deg,${LK_HC[k].hair[0]},${LK_HC[k].hair[2]})`;
  ui.innerHTML=`<div class="card"><div class="hd"><b>${L(LKT.title)}</b><div class="bs"><button data-base="me" class="${base==='me'?'on':''}">♀ ${T('female')}</button><button data-base="me2" class="${base==='me2'?'on':''}">♂ ${T('male')}</button></div><button class="x" aria-label="close">✕</button></div>
    <div class="mn"><div class="pvw"><div class="pv">${charSVG('me', LKS.emo)}</div><div class="emo">${[['happy','😊'],['neutral','🙂'],['smug','😎'],['shock','😮'],['think','🤔']].map(([e,i])=>`<button data-emo="${e}" class="${LKS.emo===e?'on':''}">${i}</button>`).join('')}</div></div>
      <div class="op"><h4>💇 ${L(LKT.hair)}</h4><div class="hg">${LK_ORDER[base].map(k=>`<button data-hair="${k}" class="${lk.hair===k?'on':''}"><div class="th">${lkDraw(base, Object.assign({}, lk, {hair:k}), 'neutral', LK_CHAR).replace('viewBox="0 0 400 560"','viewBox="62 22 276 300" preserveAspectRatio="xMidYMin slice"')}</div><span class="nm">${esc(k==='orig'?L(LK_ORIG[base]):L(HAIRS[k].n))}</span></button>`).join('')}</div>
        <h4>🎨 ${L(LKT.hc)}</h4><div class="sw" data-k="hc">${sw('orig',hcCol('orig'),L(LKT.orig),lk.hc==='orig')}${Object.keys(LK_HC).map(k=>sw(k,hcCol(k),L(LK_HC[k].n),lk.hc===k)).join('')}</div>
        <h4>🧑 ${L(LKT.skin)}</h4><div class="sw" data-k="skin">${sw('orig',pal.skin,L(LKT.orig),lk.skin==='orig')}${Object.keys(LK_SKIN).map(k=>sw(k,LK_SKIN[k].skin,L(LK_SKIN[k].n),lk.skin===k)).join('')}</div>
        <h4>👁️ ${L(LKT.eye)}</h4><div class="sw" data-k="eye">${sw('orig',`radial-gradient(circle,${pal.iris[2]},${pal.iris[1]} 55%,${pal.iris[0]})`,L(LKT.orig),lk.eye==='orig')}${Object.keys(LK_EYE).map(k=>sw(k,`radial-gradient(circle,${LK_EYE[k].iris[2]},${LK_EYE[k].iris[1]} 55%,${LK_EYE[k].iris[0]})`,L(LK_EYE[k].n),lk.eye===k)).join('')}</div>
        <h4>👓 ${L(LKT.gl)}</h4><div class="gl">${Object.keys(LK_GL).map(k=>`<button data-gl="${k}" class="${lk.gl===k?'on':''}">${esc(L(LK_GL[k]))}</button>`).join('')}</div></div></div>
    <div class="ft"><span class="nt">${L(LKT.note)}</span><button data-act="rand">${L(LKT.rand)}</button><button data-act="reset">${L(LKT.reset)}</button><button class="ok" data-act="done">${L(LKT.done)}</button></div></div>`;
  const op=ui.querySelector('.op'); op.scrollTop=keepScroll;
  const set=(k,v)=>{ lk[k]=v; sfx.click(); lkSaveAll(); lkRender(); };
  ui.querySelector('.x').onclick=lkClose; ui.querySelector('[data-act="done"]').onclick=lkClose;
  ui.onclick=e=>{ if(e.target===ui) lkClose(); };
  ui.querySelectorAll('[data-base]').forEach(b=>b.onclick=()=>{ S.avatar=b.dataset.base; S.gender=S.avatar==='me2'?'m':'f'; sfx.select(); lkRender(); });
  ui.querySelectorAll('[data-emo]').forEach(b=>b.onclick=()=>{ LKS.emo=b.dataset.emo; sfx.click(); lkRender(); });
  ui.querySelectorAll('[data-hair]').forEach(b=>b.onclick=()=>set('hair', b.dataset.hair));
  ui.querySelectorAll('.sw').forEach(g=>g.querySelectorAll('[data-v]').forEach(b=>b.onclick=()=>set(g.dataset.k, b.dataset.v)));
  ui.querySelectorAll('[data-gl]').forEach(b=>b.onclick=()=>set('gl', b.dataset.gl));
  ui.querySelector('[data-act="reset"]').onclick=()=>{ Object.assign(lk, LK_DEF); sfx.click(); lkSaveAll(); lkRender(); };
  ui.querySelector('[data-act="rand"]').onclick=()=>{ const pick=a=>a[Math.floor(Math.random()*a.length)];
    Object.assign(lk, {hair:pick(LK_ORDER[base].slice(1)), hc:pick(Object.keys(LK_HC)), skin:pick(Object.keys(LK_SKIN)), eye:pick(Object.keys(LK_EYE)), gl:Math.random()<.3?pick(['round','rect','half']):'none'}); sfx.select(); lkSaveAll(); lkRender(); };
}
/* the ✨ button on the title screen */
function lkButton(){ const t=$('#title'); if(!t) return; let b=$('#lkBtn'); if(!b){ lkCss(); b=document.createElement('button'); b.id='lkBtn'; b.onclick=lkOpen; t.appendChild(b); } b.textContent=L(LKT.btn); }
{ const f=showTitle; showTitle=function(){ const r=f.apply(this, arguments); lkButton(); return r; }; }
{ const f=applyI18n; applyI18n=function(){ const r=f.apply(this, arguments); if($('#lkBtn')) $('#lkBtn').textContent=L(LKT.btn); return r; }; }
