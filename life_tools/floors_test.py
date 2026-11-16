"""Four Floors: every branch, three sizes, plus resume. usage: python3 floors_test.py index.html OUTDIR"""
import sys, time, json
from playwright.sync_api import sync_playwright
SRC=sys.argv[1]; OUT=sys.argv[2]; LANG=sys.argv[3] if len(sys.argv)>3 else 'th'; Q='?fast=1&lang='+LANG
RUNS=[('first','()=>0',2),('last','(o)=>o.length-1',1),('rnd1','(o)=>Math.floor(Math.random()*o.length)',5),('rnd2','(o)=>Math.floor(Math.random()*o.length)',2)]
SIZES=[('phone',dict(viewport={'width':390,'height':780}, is_mobile=True, has_touch=True)),('small',dict(viewport={'width':360,'height':640}, is_mobile=True, has_touch=True)),('desk',dict(viewport={'width':1280,'height':800}))]
res={'errors':[], 'runs':{}, 'miss':[]}
with sync_playwright() as p:
    b=p.chromium.launch()
    for sz,kw in SIZES:
        pg=b.new_page(device_scale_factor=1, **kw)
        pg.on('pageerror', lambda e,sz=sz: res['errors'].append(sz+': '+str(e)[:300]))
        pg.route('**/*fonts.g*/**', lambda r: r.abort())
        for name,pick,ring in (RUNS if sz=='phone' else RUNS[2:3]):
            pg.goto('file://'+SRC+Q, wait_until='domcontentloaded'); pg.evaluate("()=>localStorage.clear()"); pg.reload(wait_until='domcontentloaded')
            out=[]
            for d in (1,2,3):
                pg.evaluate(f"()=>{{window.__pick={pick}; window.__ring={ring}; window.__done=null;}}")
                if d==1: pg.click('#start')
                else: pg.click(f'#dbtn .btn[data-go="{d}"]')
                pg.wait_for_function('()=>window.__done', timeout=120000); time.sleep(.4)
                dn=pg.evaluate('()=>window.__done'); out.append({k:dn.get(k) for k in ('lie','push','shout','ring','open','told','honest') if k in dn})
                pg.screenshot(path=f'{OUT}/{sz}_{name}_d{d}.png'); res['miss']=sorted(set(res['miss'])|set(pg.evaluate('()=>window.__miss||[]')))
            res['runs'][sz+'/'+name]=out
        if sz=='phone':   # each day straight from the title
            for d in (2,3):
                pg.goto('file://'+SRC+Q, wait_until='domcontentloaded'); pg.evaluate("()=>localStorage.clear()"); pg.reload(wait_until='domcontentloaded')
                pg.evaluate("()=>{window.__pick=()=>0; window.__done=null;}"); pg.click(f'#days button[data-n="{d}"]'); pg.click('#start')
                pg.wait_for_function('()=>window.__done', timeout=120000); res['runs'][f'direct{d}']='ok'
        pg.close()
    b.close()
print(json.dumps(res,ensure_ascii=False))
