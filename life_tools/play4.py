"""Uncle Lee: every branch, several sizes. usage: python3 play4.py index.html OUTDIR"""
import sys, time, json
from playwright.sync_api import sync_playwright
SRC=sys.argv[1]; OUT=sys.argv[2]
RUNS=[  # name, pick, order of morning hotspots, ring
 ('first', '()=>0', None, 2),
 ('last', '(o)=>o.length-1', ['photo','calendar','slippers','window','radio','pillbox','dog','phone','pot'], 1),
 ('rnd1', '(o)=>Math.floor(Math.random()*o.length)', ['pillbox','slippers','pot','phone'], 5),
 ('rnd2', '(o)=>Math.floor(Math.random()*o.length)', ['window','dog','calendar','phone','pot'], 2),
 ('rnd3', '(o)=>Math.floor(Math.random()*o.length)', None, 1),
]
SIZES=[('phone',dict(viewport={'width':390,'height':780}, is_mobile=True, has_touch=True)),
       ('desk',dict(viewport={'width':1280,'height':800})),
       ('tablet',dict(viewport={'width':820,'height':1180}, is_mobile=True, has_touch=True))]
res={'errors':[], 'console':[], 'runs':{}}
with sync_playwright() as p:
    b=p.chromium.launch()
    for si,(sz,kw) in enumerate(SIZES):
        pg=b.new_page(device_scale_factor=1, **kw)
        pg.on('pageerror', lambda e,sz=sz: res['errors'].append(sz+': '+str(e)))
        pg.on('console', lambda m,sz=sz: m.type in ('error','warning') and res['console'].append(sz+': '+m.text[:200]))
        pg.route('**/*fonts.g*/**', lambda r: r.abort())
        runs=RUNS if sz=='phone' else RUNS[2:4]
        for name,pick,order,ring in runs:
            pg.goto('file://'+SRC+'?fast=1', wait_until='domcontentloaded'); pg.evaluate("()=>localStorage.clear()"); pg.reload(wait_until='domcontentloaded')
            out=[]
            for d in range(1,8):
                pg.evaluate(f"()=>{{window.__pick={pick}; window.__order={json.dumps(order)}; window.__ring={ring}; window.__done=null;}}")
                if d==1: pg.click('#start')
                else: pg.click(f'#dbtn .btn[data-go="{d}"]')
                pg.wait_for_function('()=>window.__done', timeout=180000); time.sleep(.5)
                dn=pg.evaluate('()=>window.__done'); out.append({k:dn.get(k) for k in ('meds','dbl','sour','ac','walked','ring','lie','clinic','sup','two','shout','hope','tell','honest','refuse','tbErr','sumErr','called','told','book','money') if k in dn})
                pg.screenshot(path=f'{OUT}/{sz}_{name}_d{d}.png')
            res['runs'][sz+'/'+name]=out
        # each day straight from the title, with no earlier days played
        if sz=='phone':
            for d in range(2,8):
                pg.goto('file://'+SRC+'?fast=1', wait_until='domcontentloaded'); pg.evaluate("()=>localStorage.clear()"); pg.reload(wait_until='domcontentloaded')
                pg.evaluate("()=>{window.__pick=null; window.__done=null;}")
                pg.click(f'#days button[data-n="{d}"]'); pg.click('#start')
                pg.wait_for_function('()=>window.__done', timeout=180000); time.sleep(.3)
                res['runs'][f'fresh/day{d}']='ok'
        pg.close()
    b.close()
json.dump(res, open(OUT+'/play4.json','w'), ensure_ascii=False, indent=0)
print('errors', res['errors']); print('console', res['console'][:20]); print('runs', len(res['runs']))
