/* ---------- credits & terms of use: one small line on the title screen, the details in a card ----------
   The case owner chose no open licence: the game is for teaching in this course only. */
const LIC={
  line:['ⓘ 案例：陳崇鈺 教授（高雄醫學大學）· 製作：Nattasit Rattanaphanit · 僅供本課程教學使用',
        'ⓘ Cases: Prof. Chung-Yu Chen (KMU) · Made by Nattasit Rattanaphanit · Course use only',
        'ⓘ เคส: Prof. Chung-Yu Chen (KMU) · ผู้สร้าง: ณัฐสิทธิ์ รัตนพาณิชย์ · ใช้สอนในวิชานี้เท่านั้น'],
  h:['關於與使用說明','About & terms of use','เกี่ยวกับเกมและเงื่อนไขการใช้'],
  rows:[
    [['遊戲設計與製作','Game design & development','ออกแบบและพัฒนาเกม'], ['Nattasit Rattanaphanit','Nattasit Rattanaphanit','ณัฐสิทธิ์ รัตนพาณิชย์ (Nattasit Rattanaphanit)']],
    [['案例提供','Case materials','ที่มาของเคส'], ['陳崇鈺 教授（Prof. Chung-Yu Chen），高雄醫學大學 藥學系。經同意改編為遊戲。',
       'Prof. Chung-Yu Chen (陳崇鈺), School of Pharmacy, Kaohsiung Medical University. Adapted into this game with permission.',
       'Prof. Chung-Yu Chen (陳崇鈺) School of Pharmacy, Kaohsiung Medical University ดัดแปลงเป็นเกมโดยได้รับอนุญาต'], '@prof'],
    [['所屬單位','Affiliation','สังกัด'], ['高雄醫學大學 藥學系 陳崇鈺教授研究團隊','Prof. Chung-Yu Chen\'s research team, School of Pharmacy, Kaohsiung Medical University','ทีมวิจัยของ Prof. Chung-Yu Chen, School of Pharmacy, Kaohsiung Medical University']],
    [['使用範圍','Use','การนำไปใช้'], ['© 2026 Nattasit Rattanaphanit。案例內容版權屬於陳崇鈺教授。僅供本課程教學使用；如需轉載、改作或在其他課程使用，請先來信取得同意。',
       '© 2026 Nattasit Rattanaphanit. The case content belongs to Prof. Chung-Yu Chen. For teaching in this course only; to copy, adapt or use it elsewhere, please write first and ask for permission.',
       '© 2026 ณัฐสิทธิ์ รัตนพาณิชย์ เนื้อหาเคสเป็นของ Prof. Chung-Yu Chen ใช้สอนในรายวิชานี้เท่านั้น ถ้าจะคัดลอก ดัดแปลง หรือนำไปใช้ที่อื่น กรุณาติดต่อขออนุญาตก่อน']],
    [['聯絡','Contact','ติดต่อ'], '@mail'],
  ],
  mailT:['遊戲相關問題或建議：','Questions or feedback about the game:','สอบถามหรือแนะนำเรื่องเกม:'],
  profT:['案例聯絡：','Contact for the cases:','ติดต่อเรื่องเคส:'],
  mail:()=>['nattasitrx','gmail.com'].join('@'),
  prof:()=>['jk2975525','kmu.edu.tw'].join('@'),
  note:['僅供教學使用，不構成醫療建議。案例經改編，人名與部分情節為虛構。文中藥品商品名屬於各自的權利人。',
        'For teaching only; not medical advice. The cases are adapted, and names and some story details are fictional. Medicine brand names belong to their owners.',
        'ใช้เพื่อการเรียนการสอนเท่านั้น ไม่ใช่คำแนะนำทางการแพทย์ เคสถูกดัดแปลง ชื่อคนและเนื้อเรื่องบางส่วนเป็นเรื่องแต่ง ชื่อการค้าของยาเป็นของเจ้าของสิทธิ์']
};
function licCss(){ if($('#licCss')) return; const s=document.createElement('style'); s.id='licCss'; s.textContent=`
#licBtn{position:absolute;right:24px;bottom:8px;z-index:4;max-width:740px;padding:5px 14px;border:none;border-radius:99px;background:rgba(255,255,255,.82);color:#4a3a6a;font-family:var(--tc);font-weight:700;font-size:14px;line-height:1.35;text-align:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;cursor:pointer;box-shadow:0 2px 8px rgba(40,20,60,.18)}
#licBtn:hover{background:#fff}
#verNote:not(.hidden) ~ #licBtn{right:auto;left:800px;max-width:520px}
#mCard.lic{width:min(640px,100%);text-align:left}
#mCard.lic h3{margin:0 0 10px;text-align:center;font-size:22px}
#mCard.lic .lr{display:grid;grid-template-columns:118px 1fr;gap:10px;padding:8px 0;border-top:1px dashed #e2dcef;font-size:15px;line-height:1.55}
#mCard.lic .lr:first-of-type{border-top:none}
#mCard.lic .lr b{color:#6a5a8a;font-size:14px}
#mCard.lic .lr a{color:#3d5bd9}
#mCard.lic .lr .sub{display:block;margin-top:2px;font-size:14px}
#mCard.lic .ln{margin:10px 0 0;padding:8px 10px;border-radius:12px;background:#f6f3fc;color:#5a4a7a;font-size:13.5px;line-height:1.5}
@media (max-width:560px){#mCard.lic .lr{grid-template-columns:1fr;gap:2px}}`; document.head.appendChild(s); }
function licOpen(){ licCss(); sfx.click();
  const mail=(t,m)=>`${esc(L(t))} <a href="mailto:${m}">${m}</a>`;
  const val=v=>v==='@mail'?mail(LIC.mailT, LIC.mail()):esc(L(v));
  const rows=LIC.rows.map(([k,v,x])=>`<div class="lr"><b>${esc(L(k))}</b><div>${val(v)}${x==='@prof'?`<span class="sub">${mail(LIC.profT, LIC.prof())}</span>`:''}</div></div>`).join('');
  showModal(`<h3>${esc(L(LIC.h))}</h3>${rows}<p class="ln">${esc(L(LIC.note))}</p>`, null, null, 'lic'); }
function licButton(){ const t=$('#title'); if(!t) return; licCss(); let b=$('#licBtn'); if(!b){ b=document.createElement('button'); b.id='licBtn'; b.onclick=licOpen; t.appendChild(b); } b.textContent=L(LIC.line); }
{ const f=showTitle; showTitle=function(){ const r=f.apply(this, arguments); licButton(); return r; }; }
{ const f=applyI18n; applyI18n=function(){ const r=f.apply(this, arguments); if($('#licBtn')) licButton(); return r; }; }
