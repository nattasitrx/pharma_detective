"""Case C hypo rescue: candy and juice now count as sugar (no acarbose penalty)."""
import os, time, json
os.environ.setdefault('PLAYWRIGHT_BROWSERS_PATH', '/opt/pw-browsers')
from playwright.sync_api import sync_playwright
fails=[]
def check(n,c,x=''):
    print(('PASS ' if c else 'FAIL ')+n, '' if c else x); (None if c else fails.append(n))
with sync_playwright() as p:
    b=p.chromium.launch()
    for name,taps in (('candy x4',[('candy',4)]),('juice x1',[('juice',1)]),('glucose x4',[('gluc',4)]),('candy x2 only',[('candy',2)])):
        pg=b.new_page(viewport={'width':1440,'height':810}); errs=[]; pg.on('pageerror',lambda e: errs.append(str(e))); pg.route('**/*fonts.g*/**', lambda r: r.abort())
        pg.goto('http://localhost:8100/case-c/?lang=zh'); time.sleep(2.5)
        pg.evaluate("()=>{ document.querySelector('#title').classList.add('hidden'); window.__hr=null; hypoGame().then(r=>window.__hr=r); }"); time.sleep(1.2)
        T=lambda k: pg.evaluate("(k)=>document.querySelector('#cgScene .tile[data-item=\"'+k+'\"]').click()", k)
        T('meter'); time.sleep(0.4)
        for k,n in taps:
            for _ in range(n): T(k); time.sleep(0.25)
        if name=='candy x4': pg.screenshot(path='t15/hypo_candy.png')
        grams=pg.inner_text('#cgG')
        pg.evaluate("()=>document.querySelector('#cgWait15').click()"); time.sleep(1.8); T('meter'); time.sleep(0.6); bg=pg.inner_text('#cgBg'); T('bread'); time.sleep(2.0)
        print('   ',name,'grams',grams,'recheck',bg)
        for _ in range(10):
            r=pg.evaluate("()=>window.__hr")
            if r: break
            # the result panel may need a tap to close
            btn=pg.locator('#cgame .gbtn, #cgDone, .cg-done').first
            try: btn.click(timeout=500)
            except Exception: pass
            time.sleep(0.6)
        r=pg.evaluate("()=>window.__hr")
        tx=pg.inner_text('body')
        check(f'{name}: no acarbose / sucrose message', 'acarbose' not in tx and '蔗糖' not in tx)
        v=int(bg.split()[0]) if bg.split()[0].isdigit() else 0
        if name=='candy x2 only': check(f'{name}: too little sugar → still low', v<70, bg)
        else: check(f'{name}: back above 70', v>=70, bg)
        check(f'{name}: no JS errors', not errs, errs)
        pg.close()
    b.close()
print('FAILS',fails)
