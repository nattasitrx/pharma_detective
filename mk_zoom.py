"""Pictures (drug bags, receipts, labs) zoom inside the game; the page itself does not zoom (10 Nov 2026).
usage: python3 mk_zoom.py FILE [FILE...]   (a built case: A, C or D; in place, after mk_mobile.py)

Students said the game "kicks them out" when they zoom a drug-bag picture. On 9 Nov, 9 of the 13 reloads in Case C came
at the step where they search the evidence pictures for Mrs. Wang's old height, some 3-4 times in a row. Pinch-zooming
the whole page makes a phone redraw the scaled game stage at several times its size, which can run the page out of memory.

zoomImg(src) used to show the picture in a modal inside the stage; it now opens a full-screen viewer outside the stage:
two-finger pinch, drag, double tap, mouse wheel, and + / - / fit / close buttons, up to 6x. Only the picture is scaled.
mk_mobile.py stops the page itself from zooming."""
import sys

CSS = """
/* picture viewer (mk_zoom.py) */
#imgZoom{position:fixed;inset:0;z-index:100001;background:rgba(18,14,30,.95);display:flex;flex-direction:column;touch-action:none;-webkit-user-select:none;user-select:none}
#imgZoom .iz-pic{flex:1;min-height:0;overflow:hidden;display:flex;align-items:center;justify-content:center;touch-action:none;cursor:grab}
#imgZoom img{max-width:96vw;max-height:100%;transform-origin:center center;will-change:transform;touch-action:none;pointer-events:none}
#imgZoom .iz-bar{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;padding:8px 10px 4px}
#imgZoom .iz-bar button{border:0;border-radius:99px;padding:9px 16px;min-width:52px;font:800 17px/1.2 system-ui,-apple-system,'Noto Sans Thai',sans-serif;background:#fff;color:#2a2140;cursor:pointer}
#imgZoom .iz-bar button[data-z="x"]{background:#ff5c7a;color:#fff}
#imgZoom .iz-tip{color:#cfc6ff;text-align:center;font:600 13px/1.3 system-ui,-apple-system,'Noto Sans Thai',sans-serif;padding:2px 10px 10px}
"""

JS = r"""/* ---------- picture viewer: zoom the picture, not the page (mk_zoom.py) ---------- */
const ZV={fit:['整張','Fit','พอดีจอ'], close:['關閉','Close','ปิด'], tip:['兩指放大縮小 · 拖曳移動 · 點兩下放大','Pinch to zoom · drag to move · double-tap to zoom','ใช้สองนิ้วซูม · ลากเพื่อเลื่อน · แตะสองครั้งเพื่อขยาย']};
function zoomImg(src){ if(!src) return;
  document.querySelectorAll('#imgZoom').forEach(e=>e.remove());
  const o=document.createElement('div'); o.id='imgZoom';
  o.innerHTML=`<div class="iz-pic"><img alt="" draggable="false"></div><div class="iz-bar"><button type="button" data-z="out">➖</button><button type="button" data-z="fit">⤢ ${esc(L(ZV.fit))}</button><button type="button" data-z="in">➕</button><button type="button" data-z="x">✕ ${esc(L(ZV.close))}</button></div><div class="iz-tip">${esc(L(ZV.tip))}</div>`;
  document.body.appendChild(o); try{ sfx.paper(); }catch(e){}
  const pic=o.querySelector('.iz-pic'), im=o.querySelector('img'); im.src=src;
  let k=1, x=0, y=0, g=null, d=null, lastTap=0, moved=0; const P=new Map();
  const clamp=()=>{ k=Math.max(1,Math.min(6,k)); const w=im.offsetWidth*k, h=im.offsetHeight*k, mx=Math.max(0,(w-pic.clientWidth)/2), my=Math.max(0,(h-pic.clientHeight)/2);
    x=Math.max(-mx,Math.min(mx,x)); y=Math.max(-my,Math.min(my,y)); if(k===1){ x=0; y=0; } im.style.transform=`translate(${x}px,${y}px) scale(${k})`; };
  const zoomAt=(nk,cx,cy)=>{ const r=pic.getBoundingClientRect(), ox=cx-(r.left+r.width/2), oy=cy-(r.top+r.height/2), f=Math.max(1,Math.min(6,nk))/k;
    x=ox-(ox-x)*f; y=oy-(oy-y)*f; k*=f; clamp(); };
  const two=()=>{ const [a,b]=[...P.values()]; return {dist:Math.hypot(a.x-b.x,a.y-b.y)||1, cx:(a.x+b.x)/2, cy:(a.y+b.y)/2}; };
  pic.addEventListener('pointerdown',e=>{ e.preventDefault(); try{ pic.setPointerCapture(e.pointerId); }catch(_){} P.set(e.pointerId,{x:e.clientX,y:e.clientY});
    if(P.size===2){ const t=two(); g={dist:t.dist, k, cx:t.cx, cy:t.cy}; d=null; } else if(P.size===1){ d={sx:e.clientX, sy:e.clientY, x, y}; moved=0; } });
  pic.addEventListener('pointermove',e=>{ if(!P.has(e.pointerId)) return; P.set(e.pointerId,{x:e.clientX,y:e.clientY});
    if(P.size>=2&&g){ const t=two(); zoomAt(g.k*t.dist/g.dist, t.cx, t.cy); moved=99; }
    else if(d){ const dx=e.clientX-d.sx, dy=e.clientY-d.sy; moved=Math.max(moved,Math.abs(dx)+Math.abs(dy)); if(k>1){ x=d.x+dx; y=d.y+dy; clamp(); } } });
  const up=e=>{ P.delete(e.pointerId); if(P.size<2) g=null;
    if(P.size===0){ if(d&&moved<8){ const now=performance.now(); if(now-lastTap<320){ zoomAt(k>1.2?1:2.5, e.clientX, e.clientY); lastTap=0; } else lastTap=now; } d=null; }
    else if(P.size===1){ const [p]=[...P.values()]; d={sx:p.x, sy:p.y, x, y}; } };
  pic.addEventListener('pointerup',up); pic.addEventListener('pointercancel',up);
  pic.addEventListener('wheel',e=>{ e.preventDefault(); zoomAt(k*(e.deltaY<0?1.15:1/1.15), e.clientX, e.clientY); },{passive:false});
  const close=()=>{ o.remove(); document.removeEventListener('keydown',key,true); try{ sfx.click(); }catch(_){} };
  const key=e=>{ if(e.key==='Escape'){ e.stopPropagation(); close(); } else if(e.key==='+'||e.key==='='){ zoomAt(k*1.5,innerWidth/2,innerHeight/2); } else if(e.key==='-'){ zoomAt(k/1.5,innerWidth/2,innerHeight/2); } };
  document.addEventListener('keydown',key,true);
  o.querySelector('.iz-bar').addEventListener('click',e=>{ const b=e.target.closest('button'); if(!b) return; const r=pic.getBoundingClientRect(), cx=r.left+r.width/2, cy=r.top+r.height/2;
    ({in:()=>zoomAt(k*1.5,cx,cy), out:()=>zoomAt(k/1.5,cx,cy), fit:()=>{ k=1; clamp(); }, x:close})[b.dataset.z](); });
  im.onload=clamp; }
"""

def patch(path):
    s = open(path, encoding='utf-8').read()
    if "o.id='imgZoom'" in s: print(path, 'already applied'); return
    def sub(old, new):
        nonlocal s
        assert s.count(old) == 1, (path, old[:80], s.count(old)); s = s.replace(old, new)
    sub("""function zoomImg(src){ showModal(`<img src="${src}" style="width:100%;border-radius:12px;box-shadow:0 0 0 2px #eee">`,[{t:T('close')}],null,'wide'); }""",
        JS.strip())
    sub("</style>\n</head>", CSS + "</style>\n</head>")
    open(path, 'w', encoding='utf-8').write(s); print(path, 'picture viewer patched')

for p in sys.argv[1:]: patch(p)
