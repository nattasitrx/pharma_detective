/* =====================================================================
   BACKGROUNDS — anime-style vector scenes (1600×900) with ambient life
   ===================================================================== */
const BGSTYLE=`<style>
.bgx-curtain{transform-box:fill-box;transform-origin:top center;animation:bgxSway 4s ease-in-out infinite}
.bgx-curtain.b{animation-delay:-1.7s}
@keyframes bgxSway{0%,100%{transform:skewX(0deg)}50%{transform:skewX(-6deg) scaleX(.96)}}
.bgx-beam{animation:bgxBeam 7s ease-in-out infinite}
@keyframes bgxBeam{50%{opacity:.32}}
.bgx-blades{transform-box:fill-box;transform-origin:center;animation:spin .35s linear infinite}
.bgx-fanhead{transform-box:fill-box;transform-origin:50% 100%;animation:bgxOsc 5s ease-in-out infinite}
@keyframes bgxOsc{0%,100%{transform:scaleX(1)}50%{transform:scaleX(.72)}}
.bgx-steam{animation:bgxSteam 3s ease-in infinite;opacity:0}
.bgx-steam.d1{animation-delay:-1s}.bgx-steam.d2{animation-delay:-2s}
@keyframes bgxSteam{0%{transform:translateY(0);opacity:0}30%{opacity:.75}100%{transform:translateY(-70px);opacity:0}}
.bgx-glow{animation:bgxGlow 2.4s ease-in-out infinite}
@keyframes bgxGlow{50%{opacity:.55}}
.bgx-dust{animation:bgxDust 9s linear infinite}
@keyframes bgxDust{0%{transform:translate(0,0);opacity:0}20%{opacity:.8}100%{transform:translate(60px,-120px);opacity:0}}
.bgx-cloud{animation:bgxCloud 60s linear infinite}
@keyframes bgxCloud{from{transform:translateX(-200px)}to{transform:translateX(1800px)}}
.bgx-lantern{transform-box:fill-box;transform-origin:top center;animation:bgxSwing 3s ease-in-out infinite}
@keyframes bgxSwing{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(4deg)}}
.bgx-cat{transform-box:fill-box;transform-origin:bottom;animation:bgxCat 2.4s ease-in-out infinite}
@keyframes bgxCat{50%{transform:scaleY(.94)}}
.bgx-tail{transform-box:fill-box;transform-origin:100% 100%;animation:bgxTail 1.6s ease-in-out infinite}
@keyframes bgxTail{50%{transform:rotate(18deg)}}
.bgx-petal{animation:bgxPetal linear infinite;opacity:0}
@keyframes bgxPetal{0%{transform:translate(0,-60px) rotate(0);opacity:0}10%{opacity:1}100%{transform:translate(-220px,820px) rotate(540deg);opacity:.2}}
.bgx-gecko{animation:bgxGecko 22s ease-in-out infinite}
@keyframes bgxGecko{0%,30%{transform:translate(0,0)}45%,70%{transform:translate(70px,-46px)}85%,100%{transform:translate(0,0)}}
.bgx-gtail{transform-box:fill-box;transform-origin:0% 50%;animation:bgxTail 1.2s ease-in-out infinite}
.bgx-bird{animation:bgxBird 26s linear infinite}
@keyframes bgxBird{from{transform:translate(-200px,0)}to{transform:translate(1900px,-80px)}}
.bgx-wing{transform-box:fill-box;transform-origin:center bottom;animation:bgxWing .4s ease-in-out infinite}
@keyframes bgxWing{50%{transform:scaleY(-.6)}}
</style>`;
function sparkle(x,y,s,c){ s=s||1; return `<path d="M${x} ${y-14*s} l${4*s} ${10*s} l${10*s} ${4*s} l${-10*s} ${4*s} l${-4*s} ${10*s} l${-4*s} ${-10*s} l${-10*s} ${-4*s} l${10*s} ${-4*s}Z" fill="${c||'#fff'}"/>`; }
function tung(x,y,s){ return `<g transform="translate(${x} ${y}) scale(${s||1})">${[0,72,144,216,288].map(a=>`<ellipse cx="0" cy="-7" rx="5" ry="8" fill="#fff" stroke="#e9d8e0" stroke-width="1" transform="rotate(${a})"/>`).join('')}<circle r="3.4" fill="#ff8fa3"/></g>`; }
function bgExterior(){
  const clouds=[[120,120,1],[700,80,1.3],[1250,150,1.1],[400,200,.8]].map(([x,y,s],i)=>`<g class="bgx-cloud" style="animation-delay:${-i*15}s"><g transform="translate(${x-800},${y}) scale(${s})" fill="#fff" opacity=".95"><ellipse cx="60" cy="30" rx="60" ry="30"/><ellipse cx="120" cy="22" rx="56" ry="36"/><ellipse cx="180" cy="34" rx="50" ry="26"/><rect x="40" y="30" width="160" height="30" rx="15"/></g></g>`).join('');
  const palm=(x,y,s)=>`<g transform="translate(${x},${y}) scale(${s})"><path d="M0 0 C-6 -120 6 -240 -4 -330" stroke="#8a6a44" stroke-width="16" fill="none"/>${[-70,-35,0,35,70,110,-110].map(a=>`<path d="M-4 -330 q${Math.sin(a/57)*120} -40 ${Math.sin(a/57)*190} ${40+Math.abs(a)/2}" stroke="#3f9e4a" stroke-width="14" fill="none" stroke-linecap="round"/>`).join('')}<circle cx="-4" cy="-326" r="14" fill="#5bbf55"/></g>`;
  const petals=Array.from({length:16},(_,i)=>`<g transform="translate(${80+i*103} ${-20+(i%4)*30})"><g class="bgx-petal" style="animation-duration:${9+(i%5)*2.2}s;animation-delay:${-i*1.3}s">${tung(0,0,.9+(i%3)*.2)}</g></g>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">${BGSTYLE}<defs>
  <linearGradient id="exSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5fb8ff"/><stop offset=".6" stop-color="#bfe7ff"/><stop offset="1" stop-color="#fff1d6"/></linearGradient>
  <radialGradient id="exSun" cx=".82" cy=".14" r=".4"><stop offset="0" stop-color="#fffbe0"/><stop offset="1" stop-color="#fffbe0" stop-opacity="0"/></radialGradient>
  <linearGradient id="exWall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff2d8"/><stop offset="1" stop-color="#ecd1a6"/></linearGradient>
  <linearGradient id="exIn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd896"/><stop offset="1" stop-color="#c47a3c"/></linearGradient></defs>
  <rect width="1600" height="900" fill="url(#exSky)"/><rect width="1600" height="900" fill="url(#exSun)"/>${clouds}
  <g class="bgx-bird"><g transform="translate(0 150)">${[0,40,80].map((d,i)=>`<g transform="translate(${d} ${i%2*18})"><path class="bgx-wing" d="M0 0 q10 -10 20 0 q10 -10 20 0" fill="none" stroke="#4a4a6a" stroke-width="3"/></g>`).join('')}</g></g>
  <path d="M0 520 L180 380 L330 470 L520 330 L760 480 L980 360 L1220 470 L1420 350 L1600 450 L1600 640 L0 640Z" fill="#8ccfb4"/><path d="M0 580 L260 470 L520 560 L800 450 L1080 560 L1360 470 L1600 560 L1600 680 L0 680Z" fill="#64b894"/>
  ${[[260,470],[560,520],[1180,500],[1420,470]].map(([x,y])=>`<g transform="translate(${x} ${y})"><circle r="46" fill="#7cc58a"/>${[[-20,-14],[10,-22],[24,4],[-6,10],[-26,8]].map(([a,b])=>tung(a,b,.7)).join('')}</g>`).join('')}
  <path d="M0 360 Q400 330 800 350 T1600 340" stroke="#333" stroke-width="2" fill="none"/><path d="M0 380 Q400 352 800 372 T1600 362" stroke="#333" stroke-width="2" fill="none"/>
  <rect x="1460" y="260" width="16" height="430" fill="#7a6a5a"/><rect x="1430" y="290" width="76" height="10" fill="#7a6a5a"/>
  ${palm(140,700,1)}${palm(1530,720,.9)}${palm(260,710,.75)}
  <rect x="0" y="690" width="1600" height="210" fill="#9a9aa4"/><rect x="0" y="690" width="1600" height="34" fill="#cfc6b6"/>${[0,1,2,3,4,5,6,7].map(i=>`<rect x="${60+i*210}" y="810" width="110" height="10" fill="#fff" opacity=".8"/>`).join('')}
  <rect x="360" y="190" width="880" height="510" fill="url(#exWall)" stroke="#5a3a2a" stroke-width="5"/>
  <path d="M330 200 L1270 200 L1230 140 L370 140Z" fill="#b5413a" stroke="#5a1a14" stroke-width="5"/>${[0,1,2,3,4,5,6,7,8,9,10,11,12].map(i=>`<path d="M${385+i*70} 142 L${370+i*72} 200" stroke="#8a2a24" stroke-width="3"/>`).join('')}
  <rect x="470" y="222" width="660" height="110" rx="10" fill="#d62f2f" stroke="#ffcf4a" stroke-width="8"/><text x="800" y="306" text-anchor="middle" font-size="82" font-weight="900" fill="#ffe27a" font-family="Noto Sans TC,serif" letter-spacing="14">陳記商行</text>
  <rect x="500" y="360" width="600" height="340" fill="url(#exIn)" stroke="#5a3a2a" stroke-width="5"/><rect x="490" y="350" width="620" height="34" rx="16" fill="#a9a9b4" stroke="#5a5a66" stroke-width="4"/>
  ${[0,1,2].map(r=>[0,1,2,3,4,5,6,7].map(c=>`<rect x="${530+c*68}" y="${420+r*80}" width="${40+((r+c)%3)*10}" height="${46-(c%2)*12}" rx="4" fill="${['#ff6b6b','#ffd166','#5fd6b4','#5ab8ff','#b48cff','#ff9e5e'][(r*8+c)%6]}" opacity=".9"/>`).join('')).join('')}
  <ellipse cx="800" cy="400" rx="60" ry="22" fill="#fff6c4" opacity=".7" class="bgx-glow"/>
  ${[440,1160].map(x=>`<g class="bgx-lantern"><path d="M${x} 330 v20" stroke="#333" stroke-width="3"/><ellipse cx="${x}" cy="384" rx="34" ry="38" fill="#e53935" stroke="#7a1010" stroke-width="4"/><rect x="${x-18}" y="342" width="36" height="10" fill="#ffc107"/><rect x="${x-18}" y="416" width="36" height="10" fill="#ffc107"/><path d="M${x} 426 v26" stroke="#ffc107" stroke-width="4"/></g>`).join('')}
  <g transform="translate(1180,600)"><ellipse cx="80" cy="96" rx="96" ry="10" fill="#000" opacity=".2"/><circle cx="20" cy="70" r="28" fill="#333"/><circle cx="150" cy="70" r="28" fill="#333"/><path d="M0 60 Q20 10 70 20 L130 20 Q170 30 170 60 Z" fill="#5ec6c0" stroke="#2a5a5a" stroke-width="4"/><rect x="60" y="0" width="70" height="20" rx="8" fill="#3a2a20"/><path d="M160 30 L176 -40" stroke="#5ec6c0" stroke-width="12"/><path d="M160 -42 h36" stroke="#333" stroke-width="6"/></g>
  <g transform="translate(410,640)"><g class="bgx-cat"><ellipse cx="30" cy="48" rx="34" ry="22" fill="#f6a24a" stroke="#6a3a10" stroke-width="3"/><circle cx="58" cy="26" r="20" fill="#f6a24a" stroke="#6a3a10" stroke-width="3"/><path d="M44 12 l4 -16 l10 12 M62 8 l10 -14 l4 16" fill="#f6a24a" stroke="#6a3a10" stroke-width="3"/><path d="M52 26 q3 3 6 0 M62 26 q3 3 6 0" stroke="#3a2010" stroke-width="2.5" fill="none"/></g><path class="bgx-tail" d="M-2 48 q-24 -6 -20 -30" stroke="#f6a24a" stroke-width="9" fill="none" stroke-linecap="round"/></g>
  ${[[380,620],[1110,620]].map(([x,y])=>`<g transform="translate(${x},${y})"><path d="M0 0 h70 l-8 70 h-54Z" fill="#c0643c" stroke="#5a2a10" stroke-width="3"/><circle cx="20" cy="-14" r="24" fill="#4caf50"/><circle cx="48" cy="-24" r="26" fill="#66bb6a"/><circle cx="34" cy="-44" r="20" fill="#43a047"/></g>`).join('')}
  ${petals}
  </svg>`;
}
/* ---------- living room (also the search scene) ---------- */
const HOTSPOTS = {
  calendar:{item:'calendar'}, altar_d:{item:'pilljar'}, tv_d1:{item:'endo_bag'}, tv_d2:{item:'pillbox'}, tv_door:{item:'school'},
  fridge_t:{item:'takeout'}, fridge_b:{item:'beer'}, shelf_t:{item:'hospB_bag'}, shelf_m:{item:'cigs'}, shelf_b:{item:'report'}, trash:{item:'trash_bags'},
  crates:{item:'beer', alias:true}, ashtray:{item:'cigs', alias:true}, bag:{item:'takeout', alias:true},
  tv:{t:['電視在播八點檔：主角又失憶了……','The TV is showing a soap opera. The hero lost his memory again…','ทีวีกำลังฉายละครหลังข่าว พระเอกความจำเสื่อมอีกแล้ว…']},
  scroll:{t:['紅色的「福」字掛軸。','A red scroll with the character 福 (fortune).','ภาพแขวนสีแดงตัวอักษร 福 (โชคดี)']},
  lamp:{t:['神明燈紅紅亮亮的。','The altar lamps glow red.','โคมไฟบูชาสีแดงส่องสว่าง']},
  clock:{t:['下午一點……時間快不夠了！','1 PM… time is ticking!','บ่ายโมง… เวลากำลังเดิน!']},
  window:{t:['窗外是稻田和檳榔樹，風好舒服。','Rice paddies and betel palms outside — nice breeze.','นอกหน้าต่างเป็นนาข้าวกับต้นหมาก ลมเย็นสบาย']},
  teapot:{t:['烏龍茶還溫溫的，好香。','The oolong tea is still warm. Smells great.','ชาอูหลงยังอุ่นๆ หอมมาก']},
  cooker:{t:['電鍋裡空空的，好像很久沒煮飯了……','The rice cooker is empty… looks like nobody cooks here.','หม้อหุงข้าวว่างเปล่า… ดูเหมือนไม่ค่อยมีใครทำกับข้าว']},
  goods:{t:['乖乖和泡麵，都是要賣的。','Snacks and instant noodles for sale.','ขนมและบะหมี่กึ่งสำเร็จรูป เอาไว้ขาย']},
  plant:{t:['盆栽裡只有土。','Just soil in the pot.','ในกระถางมีแต่ดิน']},
};
const ZONES = {
  tv:{x:110,y:292,w:380,h:358,n:'zTV', hs:['tv','tv_d1','tv_d2','tv_door']},
  altar:{x:600,y:244,w:400,h:404,n:'zAltar', hs:['altar_d','lamp']},
  kitchen:{x:1006,y:222,w:284,h:428,n:'zKitchen', hs:['fridge_t','fridge_b','cooker']},
  shelf:{x:1292,y:122,w:300,h:588,n:'zShelf', hs:['shelf_t','shelf_m','shelf_b','goods']},
  table:{x:520,y:680,w:560,h:200,n:'zTable', hs:['teapot','ashtray','bag']},
};
function hs(id, inner){ return `<g class="hs" data-hs="${id}">${inner}</g>`; }
function bgLiving(){
  const O='#4a2a1a';
  const floorV=[]; for(let x=-400;x<=2000;x+=120){ floorV.push(`<path d="M${x} 600 L${800+(x-800)*2.2} 900" stroke="#9c6430" stroke-width="2" opacity=".35"/>`); }
  const goods=[]; [[230,0],[370,1],[510,2],[650,3]].forEach(([y,r])=>{ for(let i=0;i<9;i++){ const x=1312+i*29; if((r===0&&x>1320&&x<1440)||(r===1&&x>1450&&x<1570)||(r===3&&x>1320&&x<1450)) continue;
      const h=30+((i*7+r*3)%4)*10; goods.push(`<rect x="${x}" y="${y-h}" width="24" height="${h}" rx="4" fill="${['#ff6b6b','#ffd166','#5fd6b4','#5ab8ff','#b48cff','#ff9e5e','#f78fb3'][(i+r*2)%7]}" stroke="${O}" stroke-width="1.5"/>`); } });
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">${BGSTYLE}<defs>
  <linearGradient id="lvWall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6dfb2"/><stop offset="1" stop-color="#e4c081"/></linearGradient>
  <linearGradient id="lvFloor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d79a5a"/><stop offset="1" stop-color="#b9783c"/></linearGradient>
  <linearGradient id="lvRed" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a8392a"/><stop offset="1" stop-color="#6e1d12"/></linearGradient>
  <linearGradient id="lvWood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b9824a"/><stop offset="1" stop-color="#8c5a2c"/></linearGradient>
  <linearGradient id="lvMint" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c9f0e0"/><stop offset="1" stop-color="#9fdcc6"/></linearGradient>
  <linearGradient id="lvSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7cc8ff"/><stop offset="1" stop-color="#e2f6ff"/></linearGradient>
  <radialGradient id="lvLight" cx=".15" cy=".3" r=".7"><stop offset="0" stop-color="#fff6d8" stop-opacity=".55"/><stop offset="1" stop-color="#fff6d8" stop-opacity="0"/></radialGradient>
  <radialGradient id="lvVig" cx=".5" cy=".55" r=".75"><stop offset=".6" stop-color="#3a1a10" stop-opacity="0"/><stop offset="1" stop-color="#3a1a10" stop-opacity=".35"/></radialGradient>
  <pattern id="lvTile" width="24" height="24" patternUnits="userSpaceOnUse"><rect width="24" height="24" fill="#f5f2e6"/><rect x="1" y="1" width="10" height="10" fill="#8fd0e0"/><rect x="13" y="13" width="10" height="10" fill="#a8dcb9"/></pattern></defs>
  <rect width="1600" height="600" fill="url(#lvWall)"/>${Array.from({length:26},(_,i)=>`<path d="M${i*64} 40 V470" stroke="#c99a58" stroke-width="2" opacity=".5"/>`).join('')}
  <rect y="470" width="1600" height="130" fill="url(#lvTile)"/><rect y="466" width="1600" height="8" fill="#8c5a2c"/>
  <rect width="1600" height="42" fill="#6e4322"/><rect y="40" width="1600" height="8" fill="#4a2a14"/>
  <path d="M0 600 H1600 V900 H0Z" fill="url(#lvFloor)"/>${[620,645,676,714,760,816,884].map(y=>`<path d="M0 ${y} H1600" stroke="#9c6430" stroke-width="2" opacity=".4"/>`).join('')}${floorV.join('')}
  ${hs('window',`<rect x="60" y="110" width="270" height="290" fill="url(#lvSky)" stroke="#6e4322" stroke-width="10"/><path d="M60 330 Q130 300 200 320 T330 310 V400 H60Z" fill="#7ccf6a"/><path d="M195 110 V400 M60 255 H330" stroke="#6e4322" stroke-width="7"/>
    <g class="bgx-curtain"><path d="M50 96 h120 v290 q-30 10 -60 0 q-30 10 -60 0Z" fill="#e8435a" stroke="#8a1a2a" stroke-width="3"/>${[0,1,2].map(i=>`<circle cx="${80+i*35}" cy="${150+i*60}" r="12" fill="#ffd1dc"/><circle cx="${95+i*20}" cy="${230+i*40}" r="9" fill="#fff6a8"/>`).join('')}</g>
    <g class="bgx-curtain b"><path d="M220 96 h120 v290 q-30 10 -60 0 q-30 10 -60 0Z" fill="#e8435a" stroke="#8a1a2a" stroke-width="3"/>${[0,1,2].map(i=>`<circle cx="${250+i*35}" cy="${170+i*55}" r="12" fill="#ffd1dc"/><circle cx="${300-i*20}" cy="${140+i*70}" r="9" fill="#fff6a8"/>`).join('')}</g>
    <rect x="40" y="88" width="310" height="14" rx="6" fill="#6e4322"/>`)}
  <path class="bgx-beam" d="M130 400 L330 400 L760 900 L330 900Z" fill="#fff6d0" opacity=".22" pointer-events="none"/>
  <g class="bgx-gecko" pointer-events="none"><g transform="translate(560 330) rotate(-30)"><ellipse cx="0" cy="0" rx="16" ry="6" fill="#9fc46a" stroke="#5a7a2a" stroke-width="2"/><circle cx="16" cy="0" r="6" fill="#9fc46a" stroke="#5a7a2a" stroke-width="2"/><circle cx="19" cy="-2" r="1.5" fill="#222"/><path class="bgx-gtail" d="M-16 0 q-14 -2 -22 8" stroke="#9fc46a" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M-8 -5 l-5 -7 M8 -5 l5 -7 M-8 5 l-5 7 M8 5 l5 7" stroke="#5a7a2a" stroke-width="2.5" stroke-linecap="round"/></g></g>
  ${hs('calendar',`<rect x="380" y="150" width="96" height="134" rx="4" fill="#fff" stroke="${O}" stroke-width="3"/><rect x="380" y="150" width="96" height="30" fill="#e53935"/><text x="428" y="172" text-anchor="middle" font-size="18" font-weight="900" fill="#fff">3月</text>${Array.from({length:28},(_,i)=>`<circle cx="${392+(i%7)*12.5}" cy="${194+Math.floor(i/7)*22}" r="5" fill="none" stroke="#e53935" stroke-width="2"/>`).join('')}`)}
  ${hs('scroll',`<rect x="730" y="66" width="140" height="210" fill="#c62828" stroke="#7a1010" stroke-width="4"/><rect x="722" y="58" width="156" height="12" rx="6" fill="#6e4322"/><text x="800" y="210" text-anchor="middle" font-size="110" font-weight="900" fill="#ffd54f" font-family="Noto Sans TC,serif">福</text>`)}
  ${hs('clock',`<circle cx="1185" cy="140" r="44" fill="#fffaf0" stroke="#6e4322" stroke-width="8"/><path d="M1185 140 L1185 108 M1185 140 L1205 152" stroke="${O}" stroke-width="6" stroke-linecap="round"/>`)}
  <ellipse cx="800" cy="640" rx="260" ry="20" fill="#000" opacity=".18"/>
  <rect x="600" y="380" width="400" height="24" rx="4" fill="url(#lvRed)" stroke="${O}" stroke-width="3"/><rect x="612" y="404" width="376" height="50" fill="#8e2a1c" stroke="${O}" stroke-width="3"/>
  ${[618,972].map(x=>`<rect x="${x}" y="454" width="16" height="160" fill="#6e1d12" stroke="${O}" stroke-width="2"/>`).join('')}
  ${hs('altar_d',`<rect x="730" y="408" width="140" height="40" fill="#5a120a"/><g class="mv slide"><rect x="730" y="408" width="140" height="40" rx="3" fill="#b8432c" stroke="${O}" stroke-width="3"/><rect x="784" y="422" width="32" height="10" rx="5" fill="#ffd54f" stroke="${O}" stroke-width="2"/></g>`)}
  <rect x="680" y="470" width="240" height="18" rx="3" fill="url(#lvRed)" stroke="${O}" stroke-width="3"/>${[690,900].map(x=>`<rect x="${x}" y="488" width="12" height="150" fill="#6e1d12"/>`).join('')}
  ${hs('lamp',[628,972].map(x=>`<rect x="${x-12}" y="300" width="24" height="80" rx="10" fill="#d32f2f" stroke="#6e1010" stroke-width="3"/><ellipse class="bgx-glow" cx="${x}" cy="300" rx="22" ry="16" fill="#ffcc80" opacity=".9"/>`).join(''))}
  <path d="M770 380 h60 l-8 -34 h-44Z" fill="#c9a227" stroke="#7a5a00" stroke-width="3"/>${[790,800,810].map(x=>`<path d="M${x} 346 V300" stroke="#c62828" stroke-width="3"/><circle cx="${x}" cy="300" r="3" fill="#ff7043"/>`).join('')}
  <path class="bgx-steam" d="M800 296 q-10 -20 0 -40 q10 -20 0 -40" stroke="#ddd" stroke-width="5" fill="none" stroke-linecap="round"/>
  <ellipse cx="900" cy="380" rx="40" ry="8" fill="#fff" stroke="${O}" stroke-width="2"/>${[[884,366],[904,360],[918,368]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="14" fill="#ff9800" stroke="#a85a00" stroke-width="2"/>`).join('')}
  <ellipse cx="300" cy="645" rx="200" ry="16" fill="#000" opacity=".18"/>
  ${hs('tv',`<rect x="190" y="300" width="220" height="172" rx="16" fill="#d8cfbd" stroke="${O}" stroke-width="4"/><rect x="208" y="316" width="164" height="132" rx="18" fill="#4aa3df"/><path d="M208 410 h164 v20 q0 18 -18 18 h-128 q-18 0 -18 -18Z" fill="#8bd450"/><circle cx="330" cy="350" r="14" fill="#fff59d"/><rect x="384" y="330" width="14" height="14" rx="7" fill="#777"/><path d="M270 300 l-40 -70 M330 300 l40 -70" stroke="#999" stroke-width="4"/>`)}
  <rect x="120" y="472" width="360" height="168" rx="6" fill="url(#lvWood)" stroke="${O}" stroke-width="4"/>
  ${hs('tv_d1',`<rect x="135" y="485" width="160" height="50" fill="#3a2010"/><g class="mv slide"><rect x="135" y="485" width="160" height="50" rx="4" fill="#c8894a" stroke="${O}" stroke-width="3"/><rect x="198" y="503" width="34" height="10" rx="5" fill="#ffd54f" stroke="${O}" stroke-width="2"/></g>`)}
  ${hs('tv_d2',`<rect x="305" y="485" width="160" height="50" fill="#3a2010"/><g class="mv slide"><rect x="305" y="485" width="160" height="50" rx="4" fill="#c8894a" stroke="${O}" stroke-width="3"/><rect x="368" y="503" width="34" height="10" rx="5" fill="#ffd54f" stroke="${O}" stroke-width="2"/></g>`)}
  ${hs('tv_door',`<rect x="135" y="545" width="330" height="84" fill="#3a2010"/><g class="mv doorL"><rect x="135" y="545" width="330" height="84" rx="4" fill="#b8793e" stroke="${O}" stroke-width="3"/><path d="M300 549 V625" stroke="${O}" stroke-width="3"/><circle cx="285" cy="587" r="6" fill="#ffd54f"/><circle cx="315" cy="587" r="6" fill="#ffd54f"/></g>`)}
  ${hs('trash',`<ellipse cx="545" cy="652" rx="44" ry="8" fill="#000" opacity=".2"/><path d="M508 572 h74 l-8 80 h-58Z" fill="#42a5f5" stroke="#0d47a1" stroke-width="4"/><path d="M518 590 v50 M545 590 v54 M572 590 v50" stroke="#1e88e5" stroke-width="4"/><g class="mv lid"><rect x="502" y="560" width="86" height="16" rx="8" fill="#1e88e5" stroke="#0d47a1" stroke-width="4"/></g>`)}
  ${hs('cooker',`<rect x="1022" y="560" width="72" height="80" fill="url(#lvWood)" stroke="${O}" stroke-width="3"/><rect x="1028" y="504" width="60" height="58" rx="14" fill="#7fcf8a" stroke="#2a6a3a" stroke-width="3"/><rect x="1036" y="496" width="44" height="12" rx="6" fill="#5fae6e" stroke="#2a6a3a" stroke-width="3"/>`)}
  <ellipse cx="1185" cy="642" rx="100" ry="12" fill="#000" opacity=".2"/>
  <rect x="1100" y="230" width="170" height="410" rx="16" fill="#ecf9f4" stroke="#2f6a5a" stroke-width="4"/><rect x="1110" y="244" width="150" height="160" fill="#f0fff9"/><rect x="1110" y="420" width="150" height="210" fill="#f0fff9"/>
  ${hs('fridge_t',`<g class="mv doorR"><rect x="1100" y="230" width="170" height="180" rx="16" fill="url(#lvMint)" stroke="#2f6a5a" stroke-width="4"/><rect x="1118" y="340" width="12" height="54" rx="6" fill="#fff" stroke="#2f6a5a" stroke-width="2"/><circle cx="1220" cy="270" r="9" fill="#ff7043"/><rect x="1180" y="300" width="22" height="22" fill="#5ab8ff"/><circle cx="1240" cy="330" r="8" fill="#ffd54f"/></g>`)}
  ${hs('fridge_b',`<g class="mv doorR"><rect x="1100" y="414" width="170" height="226" rx="16" fill="url(#lvMint)" stroke="#2f6a5a" stroke-width="4"/><rect x="1118" y="426" width="12" height="60" rx="6" fill="#fff" stroke="#2f6a5a" stroke-width="2"/></g>`)}
  <rect x="1296" y="132" width="290" height="572" fill="#8c5a2c" stroke="${O}" stroke-width="4"/><rect x="1306" y="140" width="270" height="556" fill="#5a3418"/>
  ${[230,370,510,650].map(y=>`<rect x="1300" y="${y}" width="282" height="14" fill="#c8894a" stroke="${O}" stroke-width="2"/>`).join('')}
  ${hs('goods',goods.join(''))}
  ${hs('shelf_t',`<g class="mv lift"><rect x="1328" y="168" width="108" height="62" rx="4" fill="#d9b071" stroke="${O}" stroke-width="3"/><path d="M1328 186 h108" stroke="#a87a3a" stroke-width="3"/><text x="1382" y="216" text-anchor="middle" font-size="16" font-weight="900" fill="#8a5a1a">雜物</text></g>`)}
  ${hs('shelf_m',`<g class="mv lift"><rect x="1458" y="306" width="110" height="64" rx="4" fill="#d9b071" stroke="${O}" stroke-width="3"/><path d="M1458 324 h110" stroke="#a87a3a" stroke-width="3"/><text x="1513" y="356" text-anchor="middle" font-size="16" font-weight="900" fill="#8a5a1a">私人</text></g>`)}
  ${hs('shelf_b',`<g class="mv lift"><rect x="1326" y="586" width="118" height="64" rx="4" fill="#d9b071" stroke="${O}" stroke-width="3"/><path d="M1326 604 h118" stroke="#a87a3a" stroke-width="3"/><text x="1385" y="636" text-anchor="middle" font-size="16" font-weight="900" fill="#8a5a1a">文件</text></g>`)}
  <ellipse cx="800" cy="860" rx="300" ry="28" fill="#000" opacity=".2"/>
  ${[[560,800],[1040,800]].map(([x,y])=>`<path d="M${x-40} ${y} h80 l-10 70 h-60Z" fill="#e53935" stroke="#7a1010" stroke-width="3"/><ellipse cx="${x}" cy="${y}" rx="42" ry="10" fill="#ef5350" stroke="#7a1010" stroke-width="3"/>`).join('')}
  <path d="M640 790 L600 880 M960 790 L1000 880 M800 800 V880" stroke="#6e4322" stroke-width="12"/>
  <ellipse cx="800" cy="770" rx="270" ry="64" fill="#8c5a2c"/><ellipse cx="800" cy="758" rx="270" ry="64" fill="#c58a4a" stroke="${O}" stroke-width="4"/>
  ${hs('teapot',`<ellipse cx="700" cy="736" rx="40" ry="32" fill="#f1ece0" stroke="${O}" stroke-width="3"/><path d="M738 728 q26 -10 30 -26" stroke="#f1ece0" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M664 724 q-26 6 -20 30" stroke="${O}" stroke-width="5" fill="none"/><ellipse cx="700" cy="706" rx="18" ry="6" fill="#2f5d9e"/>
    ${[[760,754],[800,770],[640,770]].map(([x,y],i)=>`<rect x="${x-12}" y="${y-18}" width="24" height="20" rx="6" fill="#fff" stroke="${O}" stroke-width="2.5"/><path class="bgx-steam d${i}" d="M${x} ${y-24} q-8 -14 0 -28 q8 -14 0 -28" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/>`).join('')}`)}
  ${hs('ashtray',`<ellipse cx="930" cy="756" rx="36" ry="12" fill="#9e9e9e" stroke="${O}" stroke-width="3"/>${[0,1,2,3,4].map(i=>`<rect x="${910+i*8}" y="${740-i%2*4}" width="5" height="16" rx="2" fill="${i%2?'#ffe0b2':'#fff'}" transform="rotate(${-30+i*14} ${912+i*8} 748)"/>`).join('')}
    <path class="bgx-steam d1" d="M930 736 q-6 -14 0 -26 q6 -12 0 -26" stroke="#bbb" stroke-width="4" fill="none"/>`)}
  ${hs('bag',`<path d="M820 724 q-10 -40 20 -44 q30 4 20 44Z" fill="#fff" stroke="#999" stroke-width="2" opacity=".9"/><rect x="806" y="716" width="68" height="34" rx="4" fill="#fffde7" stroke="${O}" stroke-width="2.5"/><path d="M806 728 h68" stroke="#ff7043" stroke-width="4"/>`)}
  ${hs('crates',`${[[30,760],[150,760],[90,676]].map(([x,y])=>`<rect x="${x}" y="${y}" width="120" height="84" rx="6" fill="#f2c12e" stroke="#7a5a00" stroke-width="4"/>${[0,1,2,3].map(i=>`<rect x="${x+12+i*26}" y="${y-22}" width="14" height="30" rx="6" fill="#2e7d32" stroke="#14451a" stroke-width="2"/>`).join('')}<path d="M${x} ${y+30} h120" stroke="#c99a00" stroke-width="3"/>`).join('')}`)}
  <g pointer-events="none"><path d="M1225 880 v-200" stroke="#ddd" stroke-width="12"/><ellipse cx="1225" cy="884" rx="60" ry="14" fill="#7ec8e3" stroke="#2a6a8a" stroke-width="3"/>
    <g class="bgx-fanhead"><circle cx="1225" cy="610" r="78" fill="#e8f7ff" fill-opacity=".35" stroke="#fff" stroke-width="6"/>${[0,30,60,90,120,150].map(a=>`<path d="M1225 532 V688" stroke="#fff" stroke-width="2.5" transform="rotate(${a} 1225 610)"/>`).join('')}
    <g class="bgx-blades">${[0,120,240].map(a=>`<ellipse cx="1225" cy="572" rx="22" ry="38" fill="#9be3ff" stroke="#2a6a8a" stroke-width="2.5" transform="rotate(${a} 1225 610)"/>`).join('')}<circle cx="1225" cy="610" r="14" fill="#2f5d9e"/></g></g></g>
  ${hs('plant',`<path d="M1500 800 h80 l-10 74 h-60Z" fill="#c0643c" stroke="#5a2a10" stroke-width="3"/><circle cx="1520" cy="780" r="30" fill="#4caf50"/><circle cx="1560" cy="770" r="32" fill="#66bb6a"/><circle cx="1540" cy="740" r="26" fill="#43a047"/>`)}
  <rect width="1600" height="900" fill="url(#lvLight)" pointer-events="none"/><rect width="1600" height="900" fill="url(#lvVig)" pointer-events="none"/>
  ${[[300,500],[420,560],[520,640],[360,700],[260,620],[470,480]].map(([x,y],i)=>`<circle class="bgx-dust" cx="${x}" cy="${y}" r="3" fill="#fff" style="animation-delay:${-i*1.6}s" pointer-events="none"/>`).join('')}
  ${Object.entries(ZONES).map(([k,z])=>`<rect class="zone" data-zone="${k}" x="${z.x}" y="${z.y}" width="${z.w}" height="${z.h}" rx="26"/>`).join('')}
  <g id="sparkLayer" pointer-events="none"></g>
  </svg>`;
}
