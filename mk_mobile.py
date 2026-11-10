"""Phones: no zooming in by accident, and a way back if it happens (9 Nov 2026: in Case C several students tapped the
height scale over and over, the page zoomed in, and they could not get back).
usage: python3 mk_mobile.py FILE [FILE...]   (a built case: A, C or D; in place, after mk_lock.py)

1. html, body: touch-action pan-x pan-y, and on iPhone Safari (which ignores maximum-scale) the pinch gesture is cancelled,
   so neither a double tap nor a pinch zooms the page. Pinch-zooming the scaled stage could crash the page on phones
   (10 Nov 2026); pictures zoom in their own viewer instead (mk_zoom.py).
2. If the page is zoomed in anyway (scale > 1.05 for 0.6 s), a button at the top left of what is on screen offers to go
   back to normal size; where the browser does not allow that, it says to pinch with two fingers instead."""
import sys

CSS = """
/* phones: the page does not zoom (double tap or pinch); pictures zoom in their own viewer (mk_mobile.py, mk_zoom.py) */
html,body{touch-action:pan-x pan-y}
"""
JS = r"""/* iPhone Safari ignores maximum-scale: cancel the page pinch (pictures zoom in zoomImg's viewer) (mk_mobile.py) */
['gesturestart','gesturechange'].forEach(t=>document.addEventListener(t,e=>{ if(!(window.visualViewport&&visualViewport.scale>1.01)) e.preventDefault(); },{passive:false}));   // already zoomed in somehow: let a pinch take it back out
/* ---------- zoomed in by accident: a way back (mk_mobile.py) ---------- */
(function(){ const vv=window.visualViewport; if(!vv) return; let b=null, t=0;
  const ZM={back:['🔍 回到正常大小','🔍 Back to normal size','🔍 กลับขนาดปกติ'], pinch:['🤏 用兩指往內捏，縮回正常大小','🤏 Pinch with two fingers to zoom back out','🤏 ใช้สองนิ้วบีบเข้าหากันเพื่อย่อกลับ']};
  const place=()=>{ if(!b||b.style.display==='none') return; b.style.left=(vv.offsetLeft+10)+'px'; b.style.top=(vv.offsetTop+10)+'px'; b.style.transform=`scale(${1/vv.scale})`; };
  const reset=()=>{ const m=document.querySelector('meta[name=viewport]'); if(m){ const c=m.getAttribute('content');
      m.setAttribute('content','width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'); setTimeout(()=>m.setAttribute('content',c),400); }
    setTimeout(()=>{ if(b&&vv.scale>1.05){ b.textContent=L(ZM.pinch); place(); } },700); };
  const check=()=>{ clearTimeout(t); if(vv.scale<=1.05){ if(b) b.style.display='none'; return; }
    t=setTimeout(()=>{ if(vv.scale<=1.05) return;
      if(!b){ b=document.createElement('button'); b.id='pinchBack'; b.type='button'; b.onclick=reset; document.body.appendChild(b);
        b.style.cssText='position:fixed;z-index:99999;transform-origin:0 0;border:0;border-radius:99px;padding:10px 16px;font:800 16px/1.2 system-ui,sans-serif;background:#2a2140;color:#fff;box-shadow:0 0 0 3px #fff,0 6px 16px rgba(0,0,0,.35)'; }
      b.textContent=L(ZM.back); b.style.display=''; place(); },600); };
  vv.addEventListener('resize',()=>{ check(); place(); }); vv.addEventListener('scroll',place); })();
"""

def patch(path):
    s = open(path, encoding='utf-8').read()
    if "b.id='pinchBack'" in s: print(path, 'already applied'); return
    def sub(old, new):
        nonlocal s
        assert s.count(old) == 1, (path, old[:80], s.count(old)); s = s.replace(old, new)
    sub("</style>\n</head>", CSS + "</style>\n</head>")
    sub("function bindUI(){", JS + "function bindUI(){")
    open(path, 'w', encoding='utf-8').write(s); print(path, 'mobile patched')

for p in sys.argv[1:]: patch(p)
