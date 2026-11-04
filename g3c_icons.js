/* =====================================================================
   EVIDENCE ICONS — one distinct hand-drawn SVG per item (64×64)
   ===================================================================== */
const ICO_O='#3a2232';
const ICONS={
 calendar:`<rect x="7" y="10" width="50" height="48" rx="6" fill="#fff" stroke="${ICO_O}" stroke-width="3"/><path d="M7 16a6 6 0 0 1 6-6h38a6 6 0 0 1 6 6v8H7Z" fill="#e53935" stroke="${ICO_O}" stroke-width="3"/>
  <rect x="17" y="5" width="5" height="10" rx="2.5" fill="#888" stroke="${ICO_O}" stroke-width="2"/><rect x="42" y="5" width="5" height="10" rx="2.5" fill="#888" stroke="${ICO_O}" stroke-width="2"/>
  <text x="32" y="22" text-anchor="middle" font-size="9" font-weight="900" fill="#fff" font-family="sans-serif">3月</text>
  ${[0,1,2,3,4,5,6,7,8,9,10,11].map(i=>`<circle cx="${15+(i%4)*11.3}" cy="${32+Math.floor(i/4)*9}" r="3.4" fill="none" stroke="#e53935" stroke-width="2"/>`).join('')}`,
 pilljar:`<rect x="13" y="18" width="38" height="40" rx="9" fill="#dff4ff" stroke="${ICO_O}" stroke-width="3"/><rect x="15" y="9" width="34" height="11" rx="3" fill="#e53935" stroke="${ICO_O}" stroke-width="3"/>
  ${[[22,30,'#fff'],[32,28,'#ffd166'],[42,31,'#ff8fb1'],[25,41,'#5ab8ff'],[36,40,'#fff'],[44,45,'#7fe0b0'],[21,50,'#ffd166'],[31,50,'#ff8fb1'],[41,52,'#fff']].map(([x,y,c])=>`<ellipse cx="${x}" cy="${y}" rx="4.6" ry="3" fill="${c}" stroke="${ICO_O}" stroke-width="1.4" transform="rotate(${x*7} ${x} ${y})"/>`).join('')}
  <path d="M18 24 q2-3 6-3" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>`,
 trash_bags:`<path d="M14 28 h36 l-4 30 h-28Z" fill="#42a5f5" stroke="${ICO_O}" stroke-width="3" stroke-linejoin="round"/><path d="M22 34 v18 M32 34 v19 M42 34 v18" stroke="#1e6fc0" stroke-width="2.5"/>
  <g transform="rotate(-14 26 18)"><rect x="17" y="8" width="18" height="22" rx="2" fill="#fff" stroke="${ICO_O}" stroke-width="2.4"/><rect x="17" y="8" width="18" height="6" fill="#3f9a6a"/></g>
  <g transform="rotate(16 40 16)"><rect x="32" y="7" width="17" height="21" rx="2" fill="#fff" stroke="${ICO_O}" stroke-width="2.4"/><rect x="32" y="7" width="17" height="6" fill="#f0a030"/><path d="M36 18 l9 6 M45 18 l-9 6" stroke="#e53935" stroke-width="2"/></g>
  <rect x="11" y="25" width="42" height="6" rx="3" fill="#1e88e5" stroke="${ICO_O}" stroke-width="2.6"/>`,
 takeout:`<rect x="6" y="28" width="38" height="26" rx="4" fill="#fff" stroke="${ICO_O}" stroke-width="3"/><rect x="6" y="28" width="38" height="8" fill="#ff7043" stroke="${ICO_O}" stroke-width="3"/>
  <ellipse cx="18" cy="44" rx="7" ry="5" fill="#d9822b"/><ellipse cx="31" cy="45" rx="6" ry="4" fill="#ffd166"/><path d="M12 50 h26" stroke="#c46a2a" stroke-width="2"/>
  <path d="M44 22 h14 l-2 34 h-10Z" fill="#ffb3cf" stroke="${ICO_O}" stroke-width="3" stroke-linejoin="round"/><path d="M53 22 l4 -14" stroke="#5ab8ff" stroke-width="3.5" stroke-linecap="round"/><circle cx="49" cy="46" r="2" fill="${ICO_O}"/><circle cx="53" cy="50" r="2" fill="${ICO_O}"/><circle cx="50" cy="52" r="2" fill="${ICO_O}"/>`,
 beer:`<rect x="6" y="34" width="52" height="24" rx="3" fill="#f2c12e" stroke="${ICO_O}" stroke-width="3"/><path d="M6 44 h52" stroke="#b38a00" stroke-width="2.5"/>
  ${[14,26,38,50].map(x=>`<path d="M${x-4} 34 v-12 q0-4 2.5-6 v-8 h3 v8 q2.5 2 2.5 6 v12Z" fill="#2e7d32" stroke="${ICO_O}" stroke-width="2.2" stroke-linejoin="round"/><rect x="${x-3}" y="24" width="6" height="5" fill="#fff59d"/>`).join('')}`,
 cigs:`<rect x="9" y="18" width="34" height="40" rx="3" fill="#fff" stroke="${ICO_O}" stroke-width="3"/><rect x="9" y="18" width="34" height="15" fill="#d62f2f" stroke="${ICO_O}" stroke-width="3"/>
  <text x="26" y="30" text-anchor="middle" font-size="9" font-weight="900" fill="#ffd54f" font-family="sans-serif">長壽</text><path d="M14 44 h24 M14 50 h18" stroke="#bbb" stroke-width="2.5"/>
  <g transform="rotate(-30 48 30)"><rect x="38" y="27" width="22" height="6" rx="2" fill="#fff" stroke="${ICO_O}" stroke-width="2"/><rect x="38" y="27" width="7" height="6" fill="#f0a030"/><circle cx="60" cy="30" r="2.6" fill="#ff7043"/></g>
  <path d="M52 16 q-5-4 0-8 q5-4 0-8" stroke="#aaa" stroke-width="2.5" fill="none" stroke-linecap="round"/>`,
 pillbox:`<rect x="2" y="15" width="60" height="38" rx="6" fill="#b9e7ff" stroke="${ICO_O}" stroke-width="3"/>
  ${[0,1,2,3,4,5,6].map(i=>{ const x=4.6+i*8.2, full=i===2||i===5; return `<rect x="${x}" y="25" width="7.2" height="24" rx="2.5" fill="${full?'#fff':'#e4f4ff'}" stroke="${full?'#e53935':ICO_O}" stroke-width="${full?2.4:1.4}"/>${full?`<circle cx="${x+3.6}" cy="30.5" r="2.4" fill="#ff8fb1" stroke="${ICO_O}" stroke-width=".8"/><circle cx="${x+3.6}" cy="37" r="2.4" fill="#ffd166" stroke="${ICO_O}" stroke-width=".8"/><circle cx="${x+3.6}" cy="43.5" r="2.4" fill="#fff" stroke="${ICO_O}" stroke-width=".8"/>`:''}`; }).join('')}
  ${['一','二','三','四','五','六','日'].map((d,i)=>`<text x="${8.2+i*8.2}" y="22.6" text-anchor="middle" font-size="6.6" font-weight="900" fill="${i===2||i===5?'#e53935':'#355'}" font-family="sans-serif">${d}</text>`).join('')}
  <circle cx="54" cy="9" r="7" fill="#e53935" stroke="${ICO_O}" stroke-width="2"/><text x="54" y="13" text-anchor="middle" font-size="11" font-weight="900" fill="#fff" font-family="sans-serif">!</text>
  <path d="M14 58 h36" stroke="#7fb6d8" stroke-width="3" stroke-linecap="round"/>`,
 endo_bag:`<g transform="rotate(-6 32 34)"><rect x="12" y="8" width="40" height="50" rx="3" fill="#fff" stroke="${ICO_O}" stroke-width="3"/><rect x="12" y="8" width="40" height="13" fill="#3f9a6a" stroke="${ICO_O}" stroke-width="3"/>
  <text x="32" y="18.5" text-anchor="middle" font-size="9" font-weight="900" fill="#fff" font-family="sans-serif">A醫院</text>
  <circle cx="32" cy="36" r="9" fill="#e7f6ee" stroke="#3f9a6a" stroke-width="2.4"/><text x="32" y="40" text-anchor="middle" font-size="11" font-weight="900" fill="#2c7a50" font-family="sans-serif">A</text><path d="M18 50 h28" stroke="#bbb" stroke-width="2.5"/></g>`,
 hospB_bag:`<g transform="rotate(6 32 34)"><rect x="12" y="8" width="40" height="50" rx="3" fill="#fff" stroke="${ICO_O}" stroke-width="3"/><rect x="12" y="8" width="40" height="13" fill="#7b4fd6" stroke="${ICO_O}" stroke-width="3"/>
  <text x="32" y="18.5" text-anchor="middle" font-size="9" font-weight="900" fill="#fff" font-family="sans-serif">B醫院</text>
  <path d="M32 27 l9 4 v6 q0 7 -9 11 q-9 -4 -9 -11 v-6Z" fill="#efe6ff" stroke="#7b4fd6" stroke-width="2.4"/><text x="32" y="41" text-anchor="middle" font-size="11" font-weight="900" fill="#5a32b0" font-family="sans-serif">B</text><path d="M18 52 h28" stroke="#bbb" stroke-width="2.5"/></g>`,
 report:`<rect x="11" y="6" width="42" height="54" rx="3" fill="#fff" stroke="${ICO_O}" stroke-width="3"/><rect x="11" y="6" width="42" height="9" fill="#5ab8ff" stroke="${ICO_O}" stroke-width="3"/>
  ${[22,30,38,46].map(y=>`<path d="M16 ${y} h32" stroke="#ccd" stroke-width="2"/>`).join('')}<path d="M30 18 v34" stroke="#ccd" stroke-width="2"/>
  <ellipse cx="40" cy="34" rx="10" ry="6" fill="none" stroke="#e53935" stroke-width="2.6"/><text x="40" y="37" text-anchor="middle" font-size="8" font-weight="900" fill="#e53935" font-family="sans-serif">3.2↑</text>
  <path d="M16 54 l7-5 l6 3 l8-8" stroke="#ff7043" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
 school:`<rect x="12" y="8" width="40" height="50" rx="4" fill="#3f6fd6" stroke="${ICO_O}" stroke-width="3"/><rect x="12" y="8" width="8" height="50" rx="3" fill="#2a4fa8"/>
  <rect x="24" y="16" width="22" height="12" rx="2" fill="#fff"/><path d="M27 21 h16 M27 25 h11" stroke="#999" stroke-width="1.8"/>
  <path d="M35 34 l3 6.5 l7 1 l-5 5 l1.2 7 l-6.2-3.3 l-6.2 3.3 l1.2-7 l-5-5 l7-1Z" fill="#ffd166" stroke="${ICO_O}" stroke-width="2"/><path d="M46 8 v14 l-3-3 l-3 3 v-14" fill="#ff5c8f" stroke="${ICO_O}" stroke-width="1.6"/>`,
};
function itemIcon(id, px){ return `<svg class="ico" viewBox="0 0 64 64" width="${px||48}" height="${px||48}" xmlns="http://www.w3.org/2000/svg">${ICONS[id]||''}</svg>`; }
